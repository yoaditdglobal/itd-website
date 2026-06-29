// Help Centre search index + matcher. Index-led, query-based, carrier-aware.
//
// The index is small static data (existing articles + one entry per carrier
// Claims policy), so search runs client-side with a tiny hand-rolled scorer —
// no Fuse.js / Algolia, no network. A query that names a carrier ("dhl claim",
// "evri damage") ranks that carrier's Claims policy to the top and deep-links
// straight to its section on the Claims hub.

import { CLAIMS_POLICIES } from "@/lib/help-claims";

export type SearchDoc = {
  title: string;
  summary: string;
  categoryLabel: string;
  href: string;
  keywords: string[];
  carrierSlug?: string;
};

const CLAIM_TERMS = [
  "claim",
  "claims",
  "compensation",
  "loss",
  "lost",
  "damage",
  "damaged",
  "refund",
];

// Existing Help Centre articles. These have no detail pages yet, so they link
// back to the centre (as they do today); they are indexed so search covers the
// whole centre, not only claims. The first entry is the new Claims hub.
export const ARTICLE_DOCS: SearchDoc[] = [
  {
    title: "Claims policies by carrier",
    summary:
      "Loss and damage claim windows, value limits, and exactly what to send — for every carrier ITD works with.",
    categoryLabel: "Account & admin",
    href: "/help/centre/account/claims",
    keywords: [...CLAIM_TERMS, "carrier", "parcel", "policy", "evidence"],
  },
  {
    title: "Inviting users and setting permissions",
    summary:
      "Adding teammates, role-based access control, and managing child accounts under a parent contract.",
    categoryLabel: "Account & admin",
    href: "/help/centre",
    keywords: ["users", "permissions", "roles", "access", "child account", "sso"],
  },
  {
    title: "Connecting Shopify to Connexx",
    summary:
      "Set up the official Shopify app and route every order through multi-carrier comparison in under 10 minutes.",
    categoryLabel: "Integrations",
    href: "/help/centre",
    keywords: ["shopify", "ecommerce", "integration", "app", "orders"],
  },
  {
    title: "Setting up your Royal Mail account",
    summary:
      "Add Tracked 24, Tracked 48, Signed, First Class, and Second Class services to your dispatch flow.",
    categoryLabel: "Carriers",
    href: "/help/centre",
    keywords: ["royal mail", "carrier", "services", "tracked 24", "tracked 48"],
  },
  {
    title: "How rate comparison works",
    summary:
      "Live API call on every shipment, rule-based carrier selection, and overrides for specific products or lanes.",
    categoryLabel: "Connexx platform",
    href: "/help/centre",
    keywords: ["rate", "comparison", "rate engine", "pricing", "carrier selection"],
  },
  {
    title: "Generating customs documentation",
    summary:
      "HS codes from your product catalogue, EORI numbers, IOSS for EU under 150 EUR, and country-specific paperwork.",
    categoryLabel: "Connexx platform",
    href: "/help/centre",
    keywords: ["customs", "hs code", "eori", "ioss", "documentation", "paperwork"],
  },
  {
    title: "Linking your ERP to Connexx",
    summary:
      "Order pull, label write-back, and tracking sync for the most common ERPs and WMSs.",
    categoryLabel: "Integrations",
    href: "/help/centre",
    keywords: ["erp", "wms", "integration", "sync", "orders", "labels"],
  },
  {
    title: "Reading your monthly invoice",
    summary:
      "Line items by carrier, surcharges, fuel costs, and how to reconcile a Connexx invoice against your carrier invoices.",
    categoryLabel: "Billing",
    href: "/help/centre",
    keywords: ["invoice", "billing", "surcharge", "fuel", "reconcile", "charges"],
  },
  {
    title: "Printing a label",
    summary:
      "Format options, printer setup, and what to do when label generation fails.",
    categoryLabel: "Connexx platform",
    href: "/help/centre",
    keywords: ["label", "print", "printer", "format", "thermal"],
  },
  {
    title: "Handling a customs hold",
    summary:
      "What to do when a carrier flags a customs issue, how to upload missing documents, and how to prevent the same issue next time.",
    categoryLabel: "Carriers",
    href: "/help/centre",
    keywords: ["customs hold", "carrier", "documents", "delay", "clearance"],
  },
  {
    title: "API authentication",
    summary:
      "Bearer token setup, key rotation, environment separation between staging and production.",
    categoryLabel: "API & developers",
    href: "/help/centre",
    keywords: ["api", "authentication", "token", "key", "developers"],
  },
];

function uniqueLower(values: string[]): string[] {
  return Array.from(new Set(values.map((v) => v.toLowerCase()).filter(Boolean)));
}

// One search doc per carrier claims policy, deep-linking to its hub section.
const CLAIMS_DOCS: SearchDoc[] = CLAIMS_POLICIES.map((p) => ({
  title: `Claims policy — ${p.carrier}`,
  summary: `How to claim for a lost or damaged ${p.carrier} parcel — claim windows, value limits, and the evidence to send.`,
  categoryLabel: "Account & admin",
  href: `/help/centre/account/claims#${p.slug}`,
  carrierSlug: p.slug,
  keywords: uniqueLower([
    ...p.aliases,
    ...p.carrier.split(/[^a-z0-9]+/i),
    ...CLAIM_TERMS,
  ]),
}));

export const HELP_INDEX: SearchDoc[] = [...ARTICLE_DOCS, ...CLAIMS_DOCS];

/**
 * Rank the index against a free-text query. Whole-query and per-term matches
 * are scored; an exact keyword/alias hit (e.g. "dhl", "claim", "dpd europe")
 * weighs most, so a carrier name + "claim" floats that carrier's policy to the
 * top. Ambiguous stems ("dpd", "ups", "dhl") surface every matching variant.
 */
export function searchHelp(query: string, limit = 6): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = HELP_INDEX.map((doc) => {
    const title = doc.title.toLowerCase();
    const summary = doc.summary.toLowerCase();
    const keywords = doc.keywords; // already lower-case
    let score = 0;

    // Whole-query signals.
    if (title === q) score += 100;
    else if (title.includes(q)) score += 40;
    if (keywords.some((k) => k === q)) score += 60; // e.g. "dpd europe"
    else if (keywords.some((k) => k.includes(q) || q.includes(k))) score += 18;
    if (summary.includes(q)) score += 10;

    // Per-term signals.
    for (const t of terms) {
      if (keywords.includes(t)) score += 14; // exact keyword/alias word (e.g. "dhl", "claim")
      else if (keywords.some((k) => k.includes(t))) score += 4;
      if (title.includes(t)) score += 8;
      if (summary.includes(t)) score += 2;
    }

    // Carrier routing: a claims doc whose carrier alias was typed gets a nudge,
    // so "dhl claim" ranks DHL above generic claim articles.
    if (doc.carrierSlug && terms.some((t) => keywords.includes(t))) score += 6;

    return { doc, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.doc);
}
