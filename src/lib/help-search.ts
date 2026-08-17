// Help Centre search index + matcher. Index-led, query-based, carrier-aware.
//
// The index is small static data (existing articles + one entry per carrier
// Claims policy), so search runs client-side with a tiny hand-rolled scorer —
// no Fuse.js / Algolia, no network. A query that names a carrier ("dhl claim",
// "evri damage") ranks that carrier's Claims policy to the top and deep-links
// straight to its section on the Claims hub.

import { CLAIMS_POLICIES } from "@/lib/help-claims";
import { INTEGRATION_GUIDES } from "@/lib/help-integrations";

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
// Billing + Account & admin are hidden from the Help hub (see
// HIDDEN_CATEGORY_SLUGS in src/app/help/page.tsx) — their docs are filtered
// out of search below. Restore both together.
const HIDDEN_HREF_PREFIXES = ["/help/billing", "/help/account"];

const ALL_ARTICLE_DOCS: SearchDoc[] = [
  {
    title: "Yodel is now InPost — what this means for your deliveries",
    summary:
      "Yodel and InPost have combined into a single delivery network. What changed on 17 July 2026, what carries over automatically, and where to go for support.",
    categoryLabel: "Carriers",
    href: "/help/yodel-inpost",
    keywords: [
      "yodel",
      "inpost",
      "takeover",
      "acquisition",
      "merger",
      "rebrand",
      "locker",
      "tracking",
      "what3words",
      "app",
      "delivery network",
    ],
    carrierSlug: "inpost",
  },
  {
    title: "Claims policies by carrier",
    summary:
      "Loss and damage claim windows, value limits, and exactly what to send — for every carrier ITD works with.",
    categoryLabel: "Account & admin",
    href: "/help/account/claims",
    keywords: [...CLAIM_TERMS, "carrier", "parcel", "policy", "evidence"],
  },
  {
    title: "Inviting users and setting permissions",
    summary:
      "Adding teammates, role-based access control, and managing child accounts under a parent contract.",
    categoryLabel: "Account & admin",
    href: "/help",
    keywords: ["users", "permissions", "roles", "access", "child account", "sso"],
  },
  {
    title: "Integration setup guides",
    summary:
      "Step-by-step guides for connecting Shopify, eBay, TikTok Shop, Selro, Linnworks, and Veeqo to ITD Global.",
    categoryLabel: "Integrations",
    href: "/help/integrations",
    keywords: ["integration", "integrations", "connect", "setup", "store", "marketplace", "wms", "oms"],
  },
  {
    title: "Setting up your Royal Mail account",
    summary:
      "Add Tracked 24, Tracked 48, Signed, First Class, and Second Class services to your dispatch flow.",
    categoryLabel: "Carriers",
    href: "/help",
    keywords: ["royal mail", "carrier", "services", "tracked 24", "tracked 48"],
  },
  {
    title: "How rate comparison works",
    summary:
      "Live API call on every shipment, rule-based carrier selection, and overrides for specific products or lanes.",
    categoryLabel: "Connexx platform",
    href: "/help",
    keywords: ["rate", "comparison", "rate engine", "pricing", "carrier selection"],
  },
  {
    title: "Generating customs documentation",
    summary:
      "HS codes from your product catalogue, EORI numbers, IOSS for EU under 150 EUR, and country-specific paperwork.",
    categoryLabel: "Connexx platform",
    href: "/help",
    keywords: ["customs", "hs code", "eori", "ioss", "documentation", "paperwork"],
  },
  {
    title: "Linking your ERP to Connexx",
    summary:
      "Order pull, label write-back, and tracking sync for the most common ERPs and WMSs.",
    categoryLabel: "Integrations",
    href: "/help/integrations",
    keywords: ["erp", "wms", "integration", "sync", "orders", "labels"],
  },
  {
    title: "Billing & Invoices — how weekly billing works",
    summary:
      "The Sat–Fri billing week, when your first invoice lands, payment terms, and how to raise an invoice query.",
    categoryLabel: "Billing",
    href: "/help/billing",
    keywords: ["invoice", "billing", "billing week", "weekly", "payment", "due date", "bacs", "account reference", "first invoice", "charges", "query"],
  },
  {
    title: "Understanding your weekly billing cycle",
    summary:
      "Billing weeks run Saturday to Friday — one weekly invoice covers every carrier you shipped with, issued in arrears.",
    categoryLabel: "Billing",
    href: "/help/billing#billing-cycle",
    keywords: ["billing cycle", "billing week", "weekly", "arrears", "first invoice", "payment terms", "due date", "invoice query"],
  },
  {
    title: "Reading your Ecommerce invoice (six tabs)",
    summary:
      "INVOICE, Summary, UK/Intl Consignments and Surcharge tabs — which page you pay from and where each charge lives.",
    categoryLabel: "Billing",
    href: "/help/billing#ecommerce-invoice",
    keywords: ["ecommerce invoice", "invoice tabs", "summary", "consignments", "surcharge", "fuel", "global energy", "fctotal", "relabelling", "underdeclared"],
  },
  {
    title: "Transport Charges invoice explained",
    summary:
      "The invoice for express / courier freight (FedEx, UPS, DHL) — INVOICE and Consignments tabs, one row per shipment.",
    categoryLabel: "Billing",
    href: "/help/billing#transport-charges",
    keywords: ["transport charges", "express", "courier freight", "awb", "freight amount", "fuel surcharge", "invoice"],
  },
  {
    title: "Courier Duty & VAT invoice explained",
    summary:
      "The customs duty and import VAT due on your imported goods — separate from carriage, with a Details tab per cleared shipment.",
    categoryLabel: "Billing",
    href: "/help/billing#duty-vat",
    keywords: ["duty", "vat", "customs", "import", "duty and vat", "clearance", "admin fee", "invoice"],
  },
  {
    title: "Demo invoice downloads",
    summary:
      "Download fictional demo workbooks of each invoice type and explore the tabs in Excel.",
    categoryLabel: "Billing",
    href: "/help/billing#demo-downloads",
    keywords: ["demo invoice", "example invoice", "sample invoice", "download", "xlsx", "workbook"],
  },
  {
    title: "Printing a label",
    summary:
      "Format options, printer setup, and what to do when label generation fails.",
    categoryLabel: "Connexx platform",
    href: "/help",
    keywords: ["label", "print", "printer", "format", "thermal"],
  },
  {
    title: "Handling a customs hold",
    summary:
      "What to do when a carrier flags a customs issue, how to upload missing documents, and how to prevent the same issue next time.",
    categoryLabel: "Carriers",
    href: "/help",
    keywords: ["customs hold", "carrier", "documents", "delay", "clearance"],
  },
  {
    title: "API authentication",
    summary:
      "Bearer token setup, key rotation, environment separation between staging and production.",
    categoryLabel: "API & developers",
    href: "/help",
    keywords: ["api", "authentication", "token", "key", "developers"],
  },
];

export const ARTICLE_DOCS: SearchDoc[] = ALL_ARTICLE_DOCS.filter(
  (d) => !HIDDEN_HREF_PREFIXES.some((p) => d.href.startsWith(p)),
);

function uniqueLower(values: string[]): string[] {
  return Array.from(new Set(values.map((v) => v.toLowerCase()).filter(Boolean)));
}

// The claims how-to guide. Surfaced in search even though /help/account is
// hidden from the Help hub — claims content is intentionally searchable, like
// the per-carrier policies below.
const CLAIM_HOWTO_DOC: SearchDoc = {
  title: "How to raise a claim on Connexx",
  summary:
    "Step-by-step: raise a lost or damaged parcel claim on Connexx — the eligibility checks, the four-step flow, the evidence to attach, and how to track the outcome.",
  categoryLabel: "Account & admin",
  href: "/help/account/how-to-raise-a-claim",
  keywords: uniqueLower([
    ...CLAIM_TERMS,
    "how to",
    "raise",
    "process",
    "denial of receipt",
    "dor",
    "proof of value",
    "support case",
    "eligibility",
    "parcel",
  ]),
};

// One search doc per carrier claims policy, deep-linking to its hub section.
const CLAIMS_DOCS: SearchDoc[] = CLAIMS_POLICIES.map((p) => ({
  title: `Claims policy — ${p.carrier}`,
  summary: `How to claim for a lost or damaged ${p.carrier} parcel — claim windows, value limits, and the evidence to send.`,
  categoryLabel: "Account & admin",
  href: `/help/account/claims#${p.slug}`,
  carrierSlug: p.slug,
  keywords: uniqueLower([
    ...p.aliases,
    ...p.carrier.split(/[^a-z0-9]+/i),
    ...CLAIM_TERMS,
  ]),
}));

// One search doc per integration setup guide, derived from the guide data.
const INTEGRATION_DOCS: SearchDoc[] = INTEGRATION_GUIDES.map((g) => ({
  title: `Connecting ${g.name} to ITD Global`,
  summary: g.metaDescription,
  categoryLabel: "Integrations",
  href: `/help/integrations/${g.slug}`,
  keywords: uniqueLower([
    g.name,
    g.slug,
    ...g.name.split(/[^a-z0-9]+/i),
    ...g.keywords,
    "integration",
    "connect",
    "setup",
  ]),
}));

export const HELP_INDEX: SearchDoc[] = [
  CLAIM_HOWTO_DOC,
  ...ARTICLE_DOCS,
  ...INTEGRATION_DOCS,
  ...CLAIMS_DOCS,
];

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
