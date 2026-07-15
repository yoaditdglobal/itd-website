import { z } from "zod";

/**
 * Server-only env access, validated per-feature and LAZILY: a feature whose
 * vars are absent returns `null` so the route can degrade gracefully instead of
 * crashing the whole app at boot. Never import this into client components.
 * `NEXT_PUBLIC_*` vars are deliberately kept out of here.
 */

function read(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

// ── Zoho CRM (EU data centre defaults) ──────────────────────────────────────
const zohoSchema = z.object({
  ZOHO_ACCOUNTS_HOST: z.string().url(),
  ZOHO_API_HOST: z.string().url(),
  ZOHO_CLIENT_ID: z.string().min(1),
  ZOHO_CLIENT_SECRET: z.string().min(1),
  ZOHO_REFRESH_TOKEN: z.string().min(1),
});
export type ZohoEnv = z.infer<typeof zohoSchema>;

/** Returns validated Zoho config, or null if not fully configured. */
export function getZohoEnv(): ZohoEnv | null {
  const parsed = zohoSchema.safeParse({
    ZOHO_ACCOUNTS_HOST: read("ZOHO_ACCOUNTS_HOST") ?? "https://accounts.zoho.eu",
    ZOHO_API_HOST: read("ZOHO_API_HOST") ?? "https://www.zohoapis.eu",
    ZOHO_CLIENT_ID: read("ZOHO_CLIENT_ID"),
    ZOHO_CLIENT_SECRET: read("ZOHO_CLIENT_SECRET"),
    ZOHO_REFRESH_TOKEN: read("ZOHO_REFRESH_TOKEN"),
  });
  return parsed.success ? parsed.data : null;
}

// ── Microsoft Graph (mail send) ─────────────────────────────────────────────
const graphSchema = z.object({
  MS_TENANT_ID: z.string().min(1),
  MS_CLIENT_ID: z.string().min(1),
  MS_CLIENT_SECRET: z.string().min(1),
  MS_SENDER_UPN: z.string().email(),
});
export type GraphEnv = z.infer<typeof graphSchema>;

/** Returns validated Graph config, or null if not fully configured. */
export function getGraphEnv(): GraphEnv | null {
  const parsed = graphSchema.safeParse({
    MS_TENANT_ID: read("MS_TENANT_ID"),
    MS_CLIENT_ID: read("MS_CLIENT_ID"),
    MS_CLIENT_SECRET: read("MS_CLIENT_SECRET"),
    MS_SENDER_UPN: read("MS_SENDER_UPN"),
  });
  return parsed.success ? parsed.data : null;
}

// ── Notification recipients ─────────────────────────────────────────────────
export function getNotifyEmails(): { leads?: string; support?: string } {
  return { leads: read("LEADS_NOTIFY_TO"), support: read("SUPPORT_NOTIFY_TO") };
}

// ── Lead webhook (Make.com → Zoho CRM) ──────────────────────────────────────
// The Make scenario behind this URL writes Contact Sales submissions into Zoho.
// Default is baked in so lead delivery works with zero platform config;
// LEAD_WEBHOOK_URL overrides it (set to empty is not supported — the read()
// helper treats blank as unset and the default applies).
const DEFAULT_LEAD_WEBHOOK_URL =
  "https://hook.eu2.make.com/ah4bi237fj53huqevp16cj568gj9d3ff";

export function getLeadWebhookUrl(): string {
  return read("LEAD_WEBHOOK_URL") ?? DEFAULT_LEAD_WEBHOOK_URL;
}
