import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { routeLead, type FunnelAnswers } from "@/lib/chat/funnel";
import Anthropic from "@anthropic-ai/sdk";

/**
 * POST /api/chat/lead — capture + route a lead from the ITD Global chat widget.
 *
 * Two entry shapes share this route:
 *   • Guided funnel  — carries the qualification (productType, direction, …,
 *     volumeBand, segment). We recompute the ICP journey + intent grade
 *     server-side via routeLead() so routing never trusts a client-stamped value.
 *   • Callback / free-text — name + email + consent only (requestedHuman=true).
 *
 * Persists to the Supabase `chat_leads` table with the service-role key
 * (server-only). When Supabase isn't configured (local dev) it logs and returns
 * success so the widget flow still completes end-to-end. De-dupes on email
 * within 24h. Zoho routing is stubbed (see routeToZoho) until the CRM is wired.
 *
 * Table (run in Supabase SQL editor):
 *   create table if not exists chat_leads (
 *     id uuid primary key default gen_random_uuid(),
 *     session_id text,
 *     name text not null,
 *     email text not null,
 *     company text,
 *     phone text,
 *     postcode text,
 *     current_carrier text,
 *     pain text,
 *     transcript jsonb,
 *     product_type text,
 *     direction text,
 *     trade_direction text,
 *     lanes jsonb,
 *     volume_band text,
 *     segment text,
 *     icp_journey int,
 *     journey_name text,
 *     route_to text,
 *     intent_grade text,
 *     requested_human boolean default false,
 *     source text default 'website-chat',
 *     created_at timestamptz default now()
 *   );
 *   -- If upgrading an existing table:
 *   -- alter table chat_leads add column if not exists phone text,
 *   --   add column if not exists postcode text,
 *   --   add column if not exists current_carrier text,
 *   --   add column if not exists product_type text,
 *   --   add column if not exists direction text,
 *   --   add column if not exists trade_direction text,
 *   --   add column if not exists lanes jsonb,
 *   --   add column if not exists volume_band text,
 *   --   add column if not exists segment text,
 *   --   add column if not exists icp_journey int,
 *   --   add column if not exists journey_name text,
 *   --   add column if not exists route_to text,
 *   --   add column if not exists intent_grade text,
 *   --   add column if not exists requested_human boolean default false;
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

/**
 * Push a qualified lead into Zoho CRM (lead create → ICP journey field →
 * BDM/queue routing → notify on `hot`). Stubbed until the Zoho app is wired:
 * needs ZOHO_* env (client id/secret/refresh token, org id) and the field map
 * from SPEC §9. No-op (and never throws) so lead capture is never blocked.
 */
async function routeToZoho(
  row: Record<string, unknown>,
): Promise<{ routed: boolean }> {
  if (!process.env.ZOHO_REFRESH_TOKEN) return { routed: false };
  try {
    // TODO: exchange refresh token → access token, POST /crm/v3/Leads with the
    // mapped fields, set Layout/Owner per row.route_to, trigger a hot alert.
    void row;
    return { routed: false };
  } catch {
    return { routed: false };
  }
}

// Free-text / callback leads carry no guided answers. Extract qualification from
// the chat transcript so the sales record still has volume / carrier / segment to
// route on (BRIEF: "save the chat as a lead with the commercial data"). Best-effort:
// returns {} when the AI key is absent or the response isn't usable.
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

  const row = {
    session_id: d.sessionId || null,
    name: d.name,
    email: d.email,
    company: d.company || null,
    phone: d.phone || null,
    postcode: d.postcode || null,
    current_carrier: currentCarrier,
    pain: d.pain || null,
    transcript: d.transcript ?? null,
    product_type: answers.productType ?? null,
    direction: answers.direction ?? null,
    trade_direction: answers.tradeDirection ?? null,
    lanes: answers.lanes ?? null,
    volume_band: answers.volumeBand ?? null,
    segment: answers.segment ?? null,
    icp_journey: routing?.icpJourney ?? null,
    journey_name: routing?.journeyName ?? null,
    route_to: routing?.routeTo ?? null,
    intent_grade: routing?.intentGrade ?? (d.requestedHuman ? "hot" : null),
    requested_human: d.requestedHuman ?? false,
    source: "website-chat",
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !serviceKey || url.includes("placeholder")) {
    // Not configured yet — don't lose the lead silently; log it for now.
    console.warn("[/api/chat/lead] Supabase not configured; lead not persisted:", {
      name: d.name,
      email: d.email,
      company: d.company,
      journey: routing?.journeyName ?? "(unqualified)",
      intent: row.intent_grade,
      routeTo: routing?.routeTo,
    });
    return NextResponse.json({ success: true, persisted: false, routing });
  }

  try {
    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });

    // De-dupe: skip a repeat insert from the same email within 24h.
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: existing } = await supabase
      .from("chat_leads")
      .select("id")
      .eq("email", d.email)
      .gte("created_at", since)
      .limit(1);
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: true, persisted: false, deduped: true, routing });
    }

    const { error } = await supabase.from("chat_leads").insert(row);
    if (error) {
      console.error("[/api/chat/lead] insert error:", error.message);
      return NextResponse.json({ error: "Could not save your details" }, { status: 500 });
    }

    // Fire-and-forget CRM routing (no-op until Zoho is wired). Never blocks the user.
    await routeToZoho(row);

    return NextResponse.json({ success: true, persisted: true, routing });
  } catch (err) {
    console.error("[/api/chat/lead] unexpected error:", err);
    return NextResponse.json({ error: "Could not save your details" }, { status: 500 });
  }
}
