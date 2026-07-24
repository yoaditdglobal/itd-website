import { getGraphEnv, getResendEnv, type GraphEnv } from "./env";

/**
 * Outbound mail with two providers behind one seam:
 *
 * - **Resend** (primary when RESEND_API_KEY is set) — plain fetch against
 *   https://api.resend.com/emails, no SDK. The from address (RESEND_FROM)
 *   must belong to a domain verified in the Resend account.
 * - **Microsoft Graph** (fallback) — client-credentials send as the configured
 *   shared mailbox (MS_SENDER_UPN). Token cached until ~5 min before expiry.
 *
 * `isEmailConfigured()` lets routes skip email and degrade when neither
 * provider is present.
 */

export function isEmailConfigured(): boolean {
  return getResendEnv() !== null || getGraphEnv() !== null;
}

export interface MailAttachment {
  name: string;
  contentType: string;
  /** Raw file bytes, base64-encoded (no data: prefix). */
  contentBase64: string;
}

export interface MailOptions {
  to: string | string[];
  subject: string;
  html: string;
  cc?: string | string[];
  /** Submitter's address on team notifications, so "Reply" answers the lead. */
  replyTo?: string;
  attachments?: MailAttachment[];
}

const asList = (v: string | string[] | undefined): string[] =>
  v == null ? [] : Array.isArray(v) ? v : [v];

export async function sendMail(opts: MailOptions): Promise<void> {
  if (getResendEnv()) return sendViaResend(opts);
  if (getGraphEnv()) return sendViaGraph(opts);
  throw new Error("Email not configured");
}

// ── Resend ───────────────────────────────────────────────────────────────────

async function sendViaResend({ to, subject, html, cc, replyTo, attachments }: MailOptions): Promise<void> {
  const env = getResendEnv();
  if (!env) throw new Error("Resend not configured");
  const ccList = asList(cc);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: asList(to),
      ...(ccList.length > 0 && { cc: ccList }),
      ...(replyTo && { reply_to: replyTo }),
      ...(attachments && attachments.length > 0 && {
        attachments: attachments.map((a) => ({ filename: a.name, content: a.contentBase64 })),
      }),
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend HTTP ${res.status}: ${detail.slice(0, 300)}`);
  }
}

// ── Microsoft Graph ──────────────────────────────────────────────────────────

let cached: { token: string; expiresAt: number } | null = null;

async function getGraphToken(env: GraphEnv): Promise<string> {
  if (cached && Date.now() < cached.expiresAt) return cached.token;
  const res = await fetch(
    `https://login.microsoftonline.com/${env.MS_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.MS_CLIENT_ID,
        client_secret: env.MS_CLIENT_SECRET,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    },
  );
  const body = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error_description?: string;
  };
  if (!res.ok || !body.access_token) {
    throw new Error(`Graph token failed (${res.status}): ${body.error_description ?? "unknown"}`);
  }
  cached = {
    token: body.access_token,
    expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 - 5 * 60_000,
  };
  return body.access_token;
}

async function sendViaGraph({ to, subject, html, cc, replyTo, attachments }: MailOptions): Promise<void> {
  const env = getGraphEnv();
  if (!env) throw new Error("Graph not configured");
  const token = await getGraphToken(env);
  const recipient = (address: string) => ({ emailAddress: { address } });
  const ccList = asList(cc);
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(env.MS_SENDER_UPN)}/sendMail`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: "HTML", content: html },
          toRecipients: asList(to).map(recipient),
          ...(ccList.length > 0 && { ccRecipients: ccList.map(recipient) }),
          ...(replyTo && { replyTo: [recipient(replyTo)] }),
          ...(attachments && attachments.length > 0 && {
            attachments: attachments.map((a) => ({
              "@odata.type": "#microsoft.graph.fileAttachment",
              name: a.name,
              contentType: a.contentType,
              contentBytes: a.contentBase64,
            })),
          }),
        },
        saveToSentItems: false,
      }),
    },
  );
  if (res.status !== 202) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Graph sendMail HTTP ${res.status}: ${detail.slice(0, 300)}`);
  }
}
