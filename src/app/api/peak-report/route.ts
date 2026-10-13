import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, clientIp } from "@/lib/server/rate-limit";
import { getNotifyEmails, getPeakWebhookUrl } from "@/lib/server/env";
import { emailTeam, emailSubmitter } from "@/lib/server/leads";
import { peakReportAckHtml, peakReportAckText } from "@/lib/server/email-templates";
import { postLeadToWebhook } from "@/lib/server/webhook";
import type { MailAttachment } from "@/lib/server/email";
import { PEAK } from "@/lib/peak-config";
import { SITE_URL } from "@/lib/site-config";

/**
 * POST /api/peak-report — the Peak report lead gate (/peak).
 *
 * Flow: rate limit → validate → honeypot → Make webhook (Zoho CRM) → team
 * notification + report email, degrading gracefully at every step. The visitor
 * ALWAYS gets the report (the response carries `reportUrl`) even if the webhook
 * and email both fail, and the lead is never lost: a failed webhook still
 * emails the team.
 *
 * CRM is handled entirely by the Make scenario behind PEAK_LEAD_WEBHOOK_URL,
 * so the route does not write to Zoho directly and never double-creates a Lead.
 */

export const runtime = "nodejs";

const short = (max: number) => z.string().trim().max(max);
const optShort = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

const peakSchema = z.object({
  firstName: short(80).min(1),
  lastName: short(80).min(1),
  email: z.string().trim().email().max(160),
  company: short(160).min(1),
  companyWebsite: short(200).min(1),
  weeklyVolume: z.string().trim().regex(/^\d{1,9}$/, "weeklyVolume must be a number"),
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

/**
 * Load the report PDF as an email attachment — best-effort. Fetched from the
 * same deployment's public path so it works on preview and prod alike; any
 * failure (or an oversized file) just falls back to the download link in the
 * email body, so it never blocks delivery.
 */
async function loadReportAttachment(request: Request): Promise<MailAttachment[]> {
  try {
    const proto = request.headers.get("x-forwarded-proto") || "https";
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
    const origin = host ? `${proto}://${host}` : SITE_URL;
    const res = await fetch(`${origin}${PEAK.reportPath}`, { signal: AbortSignal.timeout(6_000) });
    if (!res.ok) return [];
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.byteLength === 0 || bytes.byteLength > 9_000_000) return [];
    return [
      {
        name: `ITD Peak ${PEAK.edition} Report.pdf`,
        contentType: "application/pdf",
        contentBase64: bytes.toString("base64"),
      },
    ];
  } catch {
    return [];
  }
}

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

  const optIn = d.marketingOptIn ? "Yes" : "No";
  const submittedAt = new Date().toISOString();

  const description = [
    `Peak ${edition} report download`,
    `Weekly parcel volume: ${d.weeklyVolume}`,
    `Company website: ${d.companyWebsite}`,
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
  const teamRows: Record<string, unknown> = {
    "First name": d.firstName,
    "Last name": d.lastName,
    Company: d.company,
    "Company website": d.companyWebsite,
    Email: d.email,
    "Weekly parcel volume": d.weeklyVolume,
    "Marketing opt-in": optIn,
    "Report edition": edition,
    "Curve tab": ctx.curveTab,
    Trigger: ctx.trigger,
    Card: ctx.cardId,
    "UTM source": ctx.utmSource,
    "UTM medium": ctx.utmMedium,
    "UTM campaign": ctx.utmCampaign,
    "UTM content": ctx.utmContent,
    Submitted: submittedAt.replace("T", " ").slice(0, 16) + " UTC",
  };

  const notifyTeam = (extra?: { intro?: string; rows?: Record<string, unknown> }) =>
    emailTeam({
      to: notify.leads,
      cc: notify.leadsCc,
      replyTo: d.email,
      subject: "NEW Peak report lead",
      heading: `${d.company}: ${d.weeklyVolume} parcels/week`,
      intro: extra?.intro,
      rows: extra?.rows ?? teamRows,
      keepEmptyRows: true,
    });

  // The report itself — emailed to the visitor with the PDF attached (best
  // effort) and a download link in the body as the always-works fallback.
  const attachments = await loadReportAttachment(request);
  const ackFields = { firstName: d.firstName, year: edition, reportUrl };
  const sendReport = () =>
    emailSubmitter({
      to: d.email,
      subject: `Your Peak ${edition} report from ITD Global`,
      html: peakReportAckHtml(ackFields),
      text: peakReportAckText(ackFields),
      replyTo: notify.leads,
      attachments,
    });

  // CRM delivery: the Peak Make.com scenario (writes into Zoho). Flat keys for
  // its field mapping.
  const webhookDelivered = await postLeadToWebhook(
    {
      firstName: d.firstName,
      lastName: d.lastName,
      fullName: `${d.firstName} ${d.lastName}`,
      company: d.company,
      companyWebsite: d.companyWebsite,
      email: d.email,
      phone: "",
      weeklyVolume: d.weeklyVolume,
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
    },
    getPeakWebhookUrl(),
  );

  // Notify the team (so a dropped webhook never loses the lead) and email the
  // report. Both are best-effort; the visitor's download never depends on them.
  const [emailed, acknowledged] = await Promise.all([
    notifyTeam(
      webhookDelivered
        ? undefined
        : { intro: "Webhook delivery to the Peak CRM scenario failed — captured here as a fallback." },
    ),
    sendReport(),
  ]);

  return NextResponse.json(
    {
      success: true,
      reportUrl,
      persisted: webhookDelivered,
      webhookDelivered,
      fallbackEmailed: emailed,
      acknowledged,
    },
    { status: 201 },
  );
}
