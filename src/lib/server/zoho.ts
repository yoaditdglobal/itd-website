import { getZohoEnv, type ZohoEnv } from "./env";

/**
 * Minimal Zoho CRM (v8) server client for lead/case capture. Direct REST, no
 * SDK. Access tokens are cached in memory until ~5 min before expiry. Throws on
 * non-2xx with the Zoho error body captured (never the secrets). Callers catch
 * and degrade gracefully.
 *
 * `isZohoConfigured()` lets routes skip Zoho entirely (and fall back) when the
 * env isn't present (local dev / before Phase-0 secrets land).
 */

export function isZohoConfigured(): boolean {
  return getZohoEnv() !== null;
}

let cached: { token: string; expiresAt: number } | null = null;

async function getAccessToken(env: ZohoEnv): Promise<string> {
  if (cached && Date.now() < cached.expiresAt) return cached.token;
  const url = new URL(`${env.ZOHO_ACCOUNTS_HOST}/oauth/v2/token`);
  url.searchParams.set("refresh_token", env.ZOHO_REFRESH_TOKEN);
  url.searchParams.set("client_id", env.ZOHO_CLIENT_ID);
  url.searchParams.set("client_secret", env.ZOHO_CLIENT_SECRET);
  url.searchParams.set("grant_type", "refresh_token");

  const res = await fetch(url, { method: "POST" });
  const body = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
  };
  if (!res.ok || !body.access_token) {
    throw new Error(`Zoho token exchange failed (${res.status}): ${body.error ?? "unknown"}`);
  }
  const ttlMs = (body.expires_in ?? 3600) * 1000;
  cached = { token: body.access_token, expiresAt: Date.now() + ttlMs - 5 * 60_000 };
  return body.access_token;
}

async function zohoFetch(
  path: string,
  init: RequestInit & { method: string },
): Promise<{ status: number; json: unknown }> {
  const env = getZohoEnv();
  if (!env) throw new Error("Zoho not configured");
  const token = await getAccessToken(env);
  const res = await fetch(`${env.ZOHO_API_HOST}${path}`, {
    ...init,
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  // 204 = no content (e.g. COQL with no matches)
  const json = res.status === 204 ? null : await res.json().catch(() => null);
  return { status: res.status, json };
}

type RecordResult = { id: string };

function firstRecordId(json: unknown): string {
  const rec = (json as { data?: Array<{ code?: string; details?: { id?: string } }> })?.data?.[0];
  if (!rec || rec.code !== "SUCCESS" || !rec.details?.id) {
    throw new Error(`Zoho write rejected: ${JSON.stringify(rec ?? json)}`);
  }
  return rec.details.id;
}

/** Create a Lead. `fields` keys are Zoho Lead API names (e.g. Last_Name, Company). */
export async function createLead(fields: Record<string, unknown>): Promise<RecordResult> {
  const { status, json } = await zohoFetch("/crm/v8/Leads", {
    method: "POST",
    body: JSON.stringify({ data: [fields] }),
  });
  if (status < 200 || status >= 300) {
    throw new Error(`Zoho createLead HTTP ${status}: ${JSON.stringify(json)}`);
  }
  return { id: firstRecordId(json) };
}

/** Create a Case (support ticket). Returns the record id + case number. */
export async function createCase(
  fields: Record<string, unknown>,
): Promise<{ id: string; caseNumber?: string }> {
  const { status, json } = await zohoFetch("/crm/v8/Cases", {
    method: "POST",
    body: JSON.stringify({ data: [fields] }),
  });
  if (status < 200 || status >= 300) {
    throw new Error(`Zoho createCase HTTP ${status}: ${JSON.stringify(json)}`);
  }
  const id = firstRecordId(json);
  // Fetch the generated Case_Number for a human-facing reference.
  const got = await zohoFetch(`/crm/v8/Cases/${id}?fields=Case_Number`, { method: "GET" });
  const caseNumber = (got.json as { data?: Array<{ Case_Number?: string }> })?.data?.[0]
    ?.Case_Number;
  return { id, caseNumber };
}

/** True if a Lead with this email was created in the last `hours` (dedupe). */
export async function findRecentLeadByEmail(email: string, hours = 24): Promise<boolean> {
  if (email.includes("'")) return false; // never inject into COQL
  const since = new Date(Date.now() - hours * 60 * 60 * 1000)
    .toISOString()
    .replace("Z", "+00:00");
  const query = `select id from Leads where (Email = '${email}' and Created_Time >= '${since}') limit 1`;
  const { status, json } = await zohoFetch("/crm/v8/coql", {
    method: "POST",
    body: JSON.stringify({ select_query: query }),
  });
  if (status === 204) return false;
  const rows = (json as { data?: unknown[] })?.data;
  return Array.isArray(rows) && rows.length > 0;
}
