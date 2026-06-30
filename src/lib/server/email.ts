import { getGraphEnv, type GraphEnv } from "./env";

/**
 * Microsoft Graph mail sender (client-credentials). Sends as the configured
 * shared mailbox (MS_SENDER_UPN). Token cached in memory until ~5 min before
 * expiry. `isEmailConfigured()` lets routes skip email and fall back when the
 * env isn't present.
 */

export function isEmailConfigured(): boolean {
  return getGraphEnv() !== null;
}

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

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}): Promise<void> {
  const env = getGraphEnv();
  if (!env) throw new Error("Graph not configured");
  const token = await getGraphToken(env);
  const recipients = (Array.isArray(to) ? to : [to]).map((address) => ({
    emailAddress: { address },
  }));
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(env.MS_SENDER_UPN)}/sendMail`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: "HTML", content: html },
          toRecipients: recipients,
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
