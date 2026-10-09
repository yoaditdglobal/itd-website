import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, clientIp } from "@/lib/server/rate-limit";
import { createLead, findRecentLeadByEmail, isZohoConfigured } from "@/lib/server/zoho";
import { getNotifyEmails } from "@/lib/server/env";
import { emailTeam, emailSubmitter } from "@/lib/server/leads";
import { peakReportAckHtml, peakReportAckText } from "@/lib/server/email-templates";
import { postLeadToWebhook } from "@/lib/server/webhook";
import { PEAK, PEAK_VOLUME_BANDS } from "@/lib/peak-config";
import { SITE_URL } from "@/lib/site-config";

/**
 * POST /api/peak-report — the Peak report lead gate (/peak).
 *
 * Mirrors /api/contact: rate limit → validate → honeypot → webhook → Zoho →
 * emails, degrading gracefully at every step. The visitor ALWAYS gets the
 * report (the response carries `reportUrl`) even if CRM and email both fail,
 * and a lead is never lost: when the Zoho write fails the submission is
 * emailed to the team instead.
 *
 * Routing on "Do you ship with ITD today?":
 *  - "no"  (prospect): webhook + Zoho Lead (Lead_Source "Peak Report", skipped
 *           when the email already created a Lead in the last 24h) + leads
 *           inbox "NEW Peak report lead" + report email to the visitor.
 *  - "yes" (customer): webhook only (leadType existing_customer, NO Zoho
 *           Lead) + account-management inbox "Customer downloaded the Peak
 *           report" + report email to the visitor.
 */

export const runtime = "nodejs";

const short = (max: number) => z.string().trim().max(max);
const optShort = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

const peakSchema = z.object({
  firstName: short(80).min(1),
  lastName: short(80).min(1),
  email: z.string().trim().email().max(160),
  company: short(160).min(1),
  weeklyVolume: z.enum(PEAK_VOLUME_BANDS),
  shipsWithItd: z.enum(["yes", "no"]),
  marketingOptIn: z.boolean().optional(),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional(),
  context: z
    .object({
      reportEdition: optShort(16),
      curveTab: optShort(24),
      trigger: optShort(32),
      cardId: optShort(40),
      pagePath: optShort(120),
      utmSource: optShort(120),
      utmMedium: optShort(120),
      utmCampaign: optShort(160),
      utmContent: optShort(160),
    })
    .partial()
    .optional(),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (rateLimit(ip, { windowMs: 60_000, max: 10, bucket: "peak-report" })) {
    return NextResponse.json(
      { error: "Too many requests — please try again shortly." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = peakSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const d = parsed.data;
  const ctx = d.context ?? {};

  // The PDF location is server config — the client never chooses the path.
  const reportUrl = `${SITE_URL}${PEAK.reportPath}`;
  const edition = PEAK.edition;

  // Honeypot triggered — pretend success, do nothing.
  if (d.website && d.website.length > 0) {
    return NextResponse.json({ success: true, reportUrl }, { status: 201 });
  }

  const isCustomer = d.shipsWithItd === "yes";
  const leadType = isCustomer ? "existing_customer" : "prospect";
  const optIn = d.marketingOptIn ? "Yes" : "No";
  const submittedAt = new Date().toISOString();

  const description = [
    `Peak ${edition} report download`,
    `Ships with ITD today: ${isCustomer ? "Yes, I'm a customer" : "Not yet"}`,
    `Weekly parcel volume: ${d.weeklyVolume}`,
    `Marketing opt-in: ${optIn}`,
    ctx.curveTab && `Curve tab: ${ctx.curveTab}`,
    ctx.trigger && `Trigger: ${ctx.trigger}${ctx.cardId ? ` (${ctx.cardId})` : ""}`,
    ctx.utmSource && `UTM source: ${ctx.utmSource}`,
    ctx.utmMedium && `UTM medium: ${ctx.utmMedium}`,
    ctx.utmCampaign && `UTM campaign: ${ctx.utmCampaign}`,
    ctx.utmContent && `UTM content: ${ctx.utmContent}`,
    `Page: ${ctx.pagePath || "/peak"}`,
  ]
    .filter(Boolean)
    .join("\n");

  const notify = getNotifyEmails();
  const subject = isCustomer ? "Customer downloaded the Peak report" : "NEW Peak report lead";
  const heading = `${d.company}: ${d.weeklyVolume} parcels/week — ${isCustomer ? "existing customer" : "prospect"}`;
  const teamRows: Record<string, unknown> = {
    "First name": d.firstName,
    "Last name": d.lastName,
    Company: d.company,
    Email: d.email,
    "Weekly parcel volume": d.weeklyVolume,
    "Ships with ITD today": isCustomer ? "Yes, I'm a customer" : "Not yet",
    "Marketing opt-in": optIn,
    "Report edition": edition,
    "Curve tab": ctx.curveTab,
    Trigger: ctx.trigger,
    "Card": ctx.cardId,
    "UTM source": ctx.utmSource,
    "UTM medium": ctx.utmMedium,
    "UTM campaign": ctx.utmCampaign,
    "UTM content": ctx.utmContent,
    Submitted: submittedAt.replace("T", " ").slice(0, 16) + " UTC",
  };

  const notifyTeam = (extra?: { intro?: string; rows?: Record<string, unknown> }) =>
    emailTeam({
      to: isCustomer ? notify.peakAm : notify.leads,
      cc: isCustomer ? undefined : notify.leadsCc,
      replyTo: d.email,
      subject,
      heading,
      intro: extra?.intro,
      rows: extra?.rows ?? teamRows,
      keepEmptyRows: true,
    });

  // The report itself — fire-and-forget, never blocks the response.
  const ackFields = { firstName: d.firstName, year: edition, reportUrl };
  const sendReport = () =>
    emailSubmitter({
      to: d.email,
      subject: `Your Peak ${edition} report from ITD Global`,
      html: peakReportAckHtml(ackFields),
      text: peakReportAckText(ackFields),
      replyTo: notify.leads,
    });

  // Primary delivery: the Make.com lead webhook (flat keys for its mapping).
  const webhookDelivered = await postLeadToWebhook({
    firstName: d.firstName,
    lastName: d.lastName,
    fullName: `${d.firstName} ${d.lastName}`,
    company: d.company,
    email: d.email,
    phone: "",
    weeklyVolume: d.weeklyVolume,
    leadType,
    reportEdition: edition,
    curveTab: ctx.curveTab || "",
    trigger: ctx.trigger || "",
    cardId: ctx.cardId || "",
    marketingOptIn: Boolean(d.marketingOptIn),
    utmSource: ctx.utmSource || "",
    utmMedium: ctx.utmMedium || "",
    utmCampaign: ctx.utmCampaign || "",
    utmContent: ctx.utmContent || "",
    description,
    leadSource: "Peak Report",
    page: "/peak",
    submittedAt,
  });

  const softSuccess = (extra: Record<string, unknown>) =>
    NextResponse.json(
      { success: true, reportUrl, persisted: webhookDelivered, webhookDelivered, ...extra },
      { status: 201 },
    );

  // Existing customers: no Zoho Lead — notify account management + send the report.
  if (isCustomer) {
    const [emailed, acknowledged] = await Promise.all([notifyTeam(), sendReport()]);
    return softSuccess({ fallbackEmailed: emailed, acknowledged });
  }

  // Prospects — Zoho not configured (local dev / before secrets): the webhook
  // above is the delivery path; email remains a best-effort secondary channel.
  if (!isZohoConfigured()) {
    if (!webhookDelivered) {
      console.warn("[/api/peak-report] Zoho not configured; lead not persisted:", {
        email: d.email,
        company: d.company,
      });
    }
    const [emailed, acknowledged] = await Promise.all([notifyTeam(), sendReport()]);
    return softSuccess({ fallbackEmailed: emailed, acknowledged });
  }

  try {
    // Don't create a second Lead for someone who enquired in the last 24h.
    const deduped = await findRecentLeadByEmail(d.email, 24).catch(() => false);
    if (deduped) {
      const [emailed, acknowledged] = await Promise.all([
        notifyTeam({ intro: "Existing Zoho Lead for this email within 24h — no new Lead created." }),
        sendReport(),
      ]);
      return softSuccess({ deduped: true, fallbackEmailed: emailed, acknowledged });
    }

    const { id } = await createLead({
      Last_Name: d.lastName,
      First_Name: d.firstName,
      Company: d.company,
      Email: d.email,
      Lead_Source: "Peak Report",
      Description: description,
    });
    const [, acknowledged] = await Promise.all([
      notifyTeam({ rows: { ...teamRows, "Zoho lead ID": id } }),
      sendReport(),
    ]);
    return NextResponse.json(
      { success: true, reportUrl, id, webhookDelivered, acknowledged },
      { status: 201 },
    );
  } catch (err) {
    console.error(
      "[/api/peak-report] Zoho createLead failed:",
      err instanceof Error ? err.message : err,
    );
    // Soft success to the visitor; email the team so the lead is never lost.
    const [emailed, acknowledged] = await Promise.all([
      notifyTeam({ intro: "Zoho lead create failed — captured here as a fallback." }),
      sendReport(),
    ]);
    return softSuccess({ fallbackEmailed: emailed, acknowledged });
  }
}
