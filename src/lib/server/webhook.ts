import { getLeadWebhookUrl } from "@/lib/server/env";

/**
 * Deliver a lead payload to the external lead webhook (Make.com scenario that
 * writes into Zoho CRM). Fire-and-report: never throws — the caller decides
 * what to do with a `false` (the contact route soft-succeeds and logs, matching
 * the zoho.ts / leads.ts graceful-degradation convention).
 *
 * One retry on network failure or 5xx; 8s timeout per attempt. Make replies
 * 200 "Accepted" when the scenario queue takes the payload.
 */
export async function postLeadToWebhook(
  payload: Record<string, unknown>,
): Promise<boolean> {
  const url = getLeadWebhookUrl();
  const body = JSON.stringify(payload);

  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8_000);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: controller.signal,
      });
      if (res.ok) return true;
      // 4xx won't improve on retry (bad payload / revoked hook) — bail out.
      if (res.status < 500) {
        console.error(
          `[lead-webhook] delivery rejected (HTTP ${res.status}):`,
          (await res.text().catch(() => "")).slice(0, 200),
        );
        return false;
      }
      console.error(
        `[lead-webhook] attempt ${attempt} failed (HTTP ${res.status})`,
      );
    } catch (err) {
      console.error(
        `[lead-webhook] attempt ${attempt} failed:`,
        err instanceof Error ? err.message : err,
      );
    } finally {
      clearTimeout(timer);
    }
  }
  console.error("[lead-webhook] delivery failed after retry — lead payload:", {
    email: payload.email,
    company: payload.company,
  });
  return false;
}
