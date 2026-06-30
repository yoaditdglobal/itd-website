import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, clientIp } from "@/lib/server/rate-limit";
import { createCase, isZohoConfigured } from "@/lib/server/zoho";
import { getNotifyEmails } from "@/lib/server/env";
import { emailTeam, emailSubmitter, esc } from "@/lib/server/leads";

/**
 * POST /api/support — capture a support request as a Zoho CRM Case.
 *
 * Previously this only console.log'd and returned a random SUP-xxxxxx ref while
 * promising the user a confirmation email that was never sent. Now it creates a
 * Zoho Case, uses the real Case_Number as the reference, sends the confirmation
 * email to the submitter, and notifies the support inbox. Degrades gracefully
 * when Zoho/Graph aren't configured (logs + emails the team; the UI promise only
 * claims a confirmation when one was actually sent).
 */

export const runtime = "nodejs";

const issueCategories = [
  "platform",
  "carrier",
  "billing",
  "onboarding",
  "integration",
  "other",
] as const;
const priorities = ["low", "medium", "high"] as const;

export const supportRequestSchema = z.object({
  fullName: z.string().min(2).max(100),
  workEmail: z.string().email(),
  companyName: z.string().min(2).max(100).optional().or(z.literal("")),
  accountId: z.string().max(40).optional().or(z.literal("")),
  issueCategory: z.enum(issueCategories),
  priority: z.enum(priorities),
  issueSummary: z.string().min(10).max(150),
  description: z.string().min(30).max(2000),
  consent: z.literal(true, { message: "Consent is required to process this request." }),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional(),
});

export type SupportRequest = z.infer<typeof supportRequestSchema>;

/** Fallback reference when no Zoho Case number is available. */
function fallbackTicketId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `SUP-${n}`;
}

const PRIORITY_MAP: Record<(typeof priorities)[number], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (rateLimit(ip, { windowMs: 60_000, max: 10, bucket: "support" })) {
    return NextResponse.json(
      { error: "Too many requests — please try again shortly." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = supportRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }
  const d = parsed.data;

  // Honeypot triggered — fake success so the bot doesn't retry.
  if (d.website && d.website.length > 0) {
    return NextResponse.json({ success: true, ticketId: fallbackTicketId() }, { status: 200 });
  }

  const notify = getNotifyEmails();
  const meta = [
    `Category: ${d.issueCategory}`,
    `Priority: ${d.priority}`,
    d.companyName ? `Company: ${d.companyName}` : null,
    d.accountId ? `Account ID: ${d.accountId}` : null,
    `Submitter: ${d.fullName} <${d.workEmail}>`,
  ].filter((l): l is string => l !== null);
  const description = `${d.description}\n\n${meta.join("\n")}`;

  let ticketId = fallbackTicketId();
  let persisted = false;

  if (isZohoConfigured()) {
    try {
      const result = await createCase({
        Subject: d.issueSummary,
        Description: description,
        Priority: PRIORITY_MAP[d.priority],
        Case_Origin: "Web",
        Email: d.workEmail,
      });
      persisted = true;
      if (result.caseNumber) ticketId = result.caseNumber;
    } catch (err) {
      console.error(
        "[/api/support] Zoho createCase failed:",
        err instanceof Error ? err.message : err,
      );
    }
  } else {
    console.warn("[/api/support] Zoho not configured; case not persisted:", {
      email: d.workEmail,
      summary: d.issueSummary,
    });
  }

  // Notify the support inbox (best-effort). On CRM failure this is the safety net.
  await emailTeam({
    to: notify.support,
    subject: `${persisted ? "" : "⚠ "}Support request ${ticketId} — ${d.issueSummary}`,
    intro: persisted ? undefined : "Zoho case create failed/unconfigured — captured here as a fallback.",
    rows: d,
  });

  // Confirmation email to the submitter — only claim it in the response if it sent.
  const confirmationSent = await emailSubmitter({
    to: d.workEmail,
    subject: `We've received your request — ${ticketId}`,
    html: `<p>Hi ${esc(d.fullName)},</p>
<p>Thanks for getting in touch with ITD Global support. We've logged your request and the team will be in touch.</p>
<p><strong>Your reference:</strong> ${esc(ticketId)}<br/>
<strong>Summary:</strong> ${esc(d.issueSummary)}</p>
<p>— ITD Global Support</p>`,
  });

  return NextResponse.json(
    {
      success: true,
      ticketId,
      message: confirmationSent
        ? "Request received. A confirmation email is on its way to the address you provided."
        : "Request received. Our team will be in touch shortly.",
    },
    { status: 200 },
  );
}
