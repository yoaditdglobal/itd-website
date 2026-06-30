import { NextResponse } from "next/server";
import { z } from "zod";
import { routeLead, type FunnelAnswers } from "@/lib/chat/funnel";
import Anthropic from "@anthropic-ai/sdk";
import { createLead, findRecentLeadByEmail, isZohoConfigured } from "@/lib/server/zoho";
import { getNotifyEmails } from "@/lib/server/env";
import { splitName, emailTeam } from "@/lib/server/leads";

/**
 * POST /api/chat/lead — capture + route a lead from the ITD Global chat widget.
 *
 * Two entry shapes share this route:
 *   • Guided funnel  — carries the qualification (productType, direction, …,
 *     volumeBand, segment). We recompute the ICP journey + intent grade
 *     server-side via routeLead() so routing never trusts a client-stamped value.
 *   • Callback / free-text — name + email + consent only (requestedHuman=true).
 *
 * Persists to Zoho CRM as a Lead (Lead_Source "Chat"). The funnel's ICP fields
 * have no dedicated Zoho columns, so they're packed into the Qualification field
 * (+ Current_Carrier). De-dupes on email within 24h via COQL (the Leads Email
 * field has no built-in dup-check). A "hot" / requested-human lead emails sales
 * immediately. Degrades gracefully when Zoho isn't configured (logs + emails the
 * team) so the widget flow always completes.
 */

export const runtime = "nodejs";

const leadSchema = z.object({
  sessionId: z.string().max(64).optional().or(z.literal("")),
  name: z.string().min(1).max(120),
  email: z.string().email(),
  company: z.string().max(160).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  postcode: z.string().max(16).optional().or(z.literal("")),
  pain: z.string().max(2000).optional().or(z.literal("")),
  transcript: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(8000) }))
    .max(60)
    .optional(),
  // Guided-funnel qualification — all optional (the callback path omits them).
  productType: z.enum(["parcels", "freight", "both"]).optional(),
  direction: z.enum(["domestic", "international", "both"]).optional(),
  tradeDirection: z.enum(["export", "import", "both"]).optional(),
  lanes: z.array(z.enum(["uk-eu", "uk-us", "uk-row", "china-uk", "other"])).max(5).optional(),
  volumeBand: z.enum(["u150", "150-500", "500-1000", "1000-5000", "5000+"]).optional(),
  segment: z
    .enum(["ecommerce", "marketplace", "3pl", "retail-b2b", "manufacturer", "other"])
    .optional(),
  currentCarrier: z.string().max(200).optional().or(z.literal("")),
  requestedHuman: z.boolean().optional(),
  consent: z.literal(true, { message: "Consent is required." }),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional(),
});

// Free-text / callback leads carry no guided answers. Extract qualification from
// the chat transcript so the sales record still has volume / carrier / segment to
// route on. Best-effort: returns {} when the AI key is absent or unusable.
const extractionSchema = z.object({
  productType: z.enum(["parcels", "freight", "both"]).optional(),
  direction: z.enum(["domestic", "international", "both"]).optional(),
  tradeDirection: z.enum(["export", "import", "both"]).optional(),
  volumeBand: z.enum(["u150", "150-500", "500-1000", "1000-5000", "5000+"]).optional(),
  segment: z
    .enum(["ecommerce", "marketplace", "3pl", "retail-b2b", "manufacturer", "other"])
    .optional(),
  currentCarrier: z.string().max(200).optional(),
});
type Extraction = z.infer<typeof extractionSchema>;

async function extractFromTranscript(
  transcript: { role: "user" | "assistant"; content: string }[],
): Promise<Extraction> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return {};
  try {
    const client = new Anthropic({ apiKey });
    const convo = transcript
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n")
      .slice(0, 6000);
    const msg = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 250,
      system:
        "You extract shipping-lead qualification from a sales chat. Reply with STRICT JSON only " +
        "(no prose, no code fences). Include only keys you can determine; omit the rest. Keys: " +
        'productType ("parcels"|"freight"|"both"); direction ("domestic"|"international"|"both"); ' +
        'tradeDirection ("export"|"import"|"both"); volumeBand (WEEKLY band, one of ' +
        '"u150"|"150-500"|"500-1000"|"1000-5000"|"5000+" — convert monthly figures to weekly); ' +
        'segment ("ecommerce"|"marketplace"|"3pl"|"retail-b2b"|"manufacturer"|"other"); ' +
        "currentCarrier (free text of carriers or platform they use today). Return {} if unclear.",
      messages: [{ role: "user", content: convo }],
    });
    const block = msg.content[0];
    const text = block && block.type === "text" ? block.text : "{}";
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) return {};
    const parsed = extractionSchema.safeParse(JSON.parse(text.slice(start, end + 1)));
    return parsed.success ? parsed.data : {};
  } catch {
    return {};
  }
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const d = parsed.data;

  // Honeypot triggered — pretend success.
  if (d.website && d.website.length > 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Guided answers when present; otherwise enrich a free-text lead from the transcript.
  const answers: FunnelAnswers = {
    productType: d.productType,
    direction: d.direction,
    tradeDirection: d.tradeDirection,
    lanes: d.lanes,
    volumeBand: d.volumeBand,
    segment: d.segment,
  };
  let currentCarrier = d.currentCarrier || null;
  let qualified = Boolean(d.productType || d.direction || d.volumeBand || d.segment);
  if (!qualified && d.transcript && d.transcript.length > 0) {
    const ex = await extractFromTranscript(d.transcript);
    answers.productType = answers.productType ?? ex.productType;
    answers.direction = answers.direction ?? ex.direction;
    answers.tradeDirection = answers.tradeDirection ?? ex.tradeDirection;
    answers.volumeBand = answers.volumeBand ?? ex.volumeBand;
    answers.segment = answers.segment ?? ex.segment;
    if (!currentCarrier && ex.currentCarrier) currentCarrier = ex.currentCarrier;
    qualified = Boolean(
      answers.productType || answers.direction || answers.volumeBand || answers.segment,
    );
  }
  // Recompute routing from the resolved answers — never trust a client-stamped journey.
  const routing = qualified ? routeLead(answers) : null;
  const intentGrade = routing?.intentGrade ?? (d.requestedHuman ? "hot" : null);

  // The funnel's ICP data has no dedicated Zoho fields — summarise into Qualification.
  const qualification = [
    routing && `ICP journey ${routing.icpJourney}: ${routing.journeyName}`,
    routing && `Route to: ${routing.routeTo}`,
    intentGrade && `Intent: ${intentGrade}`,
    answers.productType && `Product: ${answers.productType}`,
    answers.direction && `Direction: ${answers.direction}`,
    answers.tradeDirection && `Trade direction: ${answers.tradeDirection}`,
    answers.lanes?.length && `Lanes: ${answers.lanes.join(", ")}`,
    answers.volumeBand && `Weekly volume band: ${answers.volumeBand}`,
    answers.segment && `Segment: ${answers.segment}`,
    d.requestedHuman && "Requested a human",
    d.postcode && `Postcode: ${d.postcode}`,
    d.pain && `Pain: ${d.pain}`,
  ]
    .filter(Boolean)
    .join("\n");

  const { first, last } = splitName(d.name);
  const leadFields: Record<string, unknown> = {
    Last_Name: last,
    First_Name: first || undefined,
    Company: d.company || "(not provided)",
    Email: d.email,
    Phone: d.phone || undefined,
    Lead_Source: "Chat",
    Current_Carrier: currentCarrier || undefined,
    Qualification: qualification || undefined,
  };

  const notify = getNotifyEmails();
  const isHot = intentGrade === "hot" || d.requestedHuman === true;

  // Not configured (local dev / before Phase-0 secrets) — never lose the lead.
  if (!isZohoConfigured()) {
    console.warn("[/api/chat/lead] Zoho not configured; lead not persisted:", {
      name: d.name,
      email: d.email,
      company: d.company,
      journey: routing?.journeyName ?? "(unqualified)",
      intent: intentGrade,
      routeTo: routing?.routeTo,
    });
    await emailTeam({
      to: notify.leads,
      subject: `${isHot ? "🔥 Hot " : "New "}chat lead — ${d.company || d.email}`,
      rows: { ...d, qualification },
    });
    return NextResponse.json({ success: true, persisted: false, routing });
  }

  try {
    if (await findRecentLeadByEmail(d.email, 24)) {
      return NextResponse.json({ success: true, persisted: false, deduped: true, routing });
    }
    const { id } = await createLead(leadFields);
    if (isHot) {
      await emailTeam({
        to: notify.leads,
        subject: `🔥 Hot chat lead — ${d.company || d.email}`,
        intro: `Route to: ${routing?.routeTo ?? "sales"}. Zoho lead ${id}.`,
        rows: { name: d.name, email: d.email, company: d.company, phone: d.phone, qualification },
      });
    }
    return NextResponse.json({ success: true, persisted: true, routing });
  } catch (err) {
    console.error(
      "[/api/chat/lead] Zoho createLead failed:",
      err instanceof Error ? err.message : err,
    );
    const emailed = await emailTeam({
      to: notify.leads,
      subject: `⚠ Chat lead (CRM write failed) — ${d.company || d.email}`,
      intro: "Zoho lead create failed — captured here as a fallback.",
      rows: { ...d, qualification },
    });
    // Soft success to the user; lead preserved via email.
    return NextResponse.json({ success: true, persisted: false, fallbackEmailed: emailed, routing });
  }
}
