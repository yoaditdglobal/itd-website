// Central analytics helper — the single source of truth for the event
// vocabulary and the lead-conversion schema, so the contact form and the chat
// widget report consistently in GA4 (measurement ID G-V31LJTEG1R).
//
// Transport note: the chat widget fires via gtag (GA4 direct); the contact form
// additionally pushes to the GTM dataLayer (GTM-M6QJM8F6) to preserve any
// GTM-side tags (e.g. a Google Ads conversion). Both paths emit the SAME event
// name + params, so they aggregate in GA4 as one `generate_lead` conversion —
// each lead fires once per path, so there is no double counting.

type GtagWindow = Window & {
  gtag?: (command: "event", event: string, params?: Record<string, unknown>) => void;
  dataLayer?: Record<string, unknown>[];
};

/** GA4 recommended lead conversion. The ONE Key Event for both forms. */
export const LEAD_EVENT = "generate_lead";
export const LEAD_CURRENCY = "GBP";
/**
 * Estimated monetary value of a lead, for GA4 value-based reporting / bidding.
 * Left at 0 (value omitted from the event) until a real average is confirmed —
 * set this to your true average lead value and it is attached automatically.
 */
export const LEAD_VALUE_GBP = 0;

export type LeadSource = "contact_form" | "chat";

/**
 * Build the unified `generate_lead` parameter set. `lead_source` distinguishes
 * the two forms; register it (plus shipping_type / weekly_volume / journey) as
 * GA4 custom dimensions to segment leads in reports.
 */
export function leadParams(
  source: LeadSource,
  details: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    lead_source: source,
    ...details,
    ...(LEAD_VALUE_GBP > 0
      ? { value: LEAD_VALUE_GBP, currency: LEAD_CURRENCY }
      : {}),
  };
}

/** Fire a GA4 event via gtag. No-ops safely if gtag is absent (SSR / blocked). */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", event, params);
}

/** Fire the unified lead conversion via gtag (used by the chat widget). */
export function trackLead(source: LeadSource, details: Record<string, unknown> = {}): void {
  track(LEAD_EVENT, leadParams(source, details));
}
