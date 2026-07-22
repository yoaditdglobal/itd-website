import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Contextual glossary deep-linking (GEO / internal siloing).
 *
 * `linkifyGlossaryTerms(text)` scans a plain prose string for known logistics
 * terms and wraps the FIRST occurrence of each in a subtle link to its
 * glossary definition (`/resources/glossary#slug`). Later occurrences stay
 * plain text so prose doesn't turn into a sea of links.
 *
 * Rules:
 * - Every slug below MUST exist verbatim in `src/lib/glossary.ts` — the
 *   glossary page's deep-link scroll handles the `#slug` on arrival.
 * - Acronyms match case-sensitively (EORI, CDS, WISMO…); phrases tolerate a
 *   capitalised first letter ("Customs broker" / "customs broker").
 * - Apply to informational prose only (FAQ answers, feature/body copy) —
 *   never to headings, buttons, or anything on the glossary page itself.
 */

const GLOSSARY_BASE = "/resources/glossary";

/** term (as written in prose) → glossary slug. Longest terms first so
 *  "Postponed VAT Accounting" wins over "PVA", "IOSS" over "OSS", etc. */
const TERM_TO_SLUG: Array<[term: string, slug: string]> = [
  ["Postponed VAT Accounting", "pva-postponed-vat-accounting"],
  ["Seller Fulfilled Prime", "seller-fulfilled-prime-sfp"],
  ["On-Time Delivery Rate", "on-time-delivery-rate-otdr"],
  ["Valid Tracking Rate", "valid-tracking-rate-vtr"],
  ["Late Shipment Rate", "late-shipment-rate-lsr"],
  ["dimensional weight", "dimensional-weight-dim-weight"],
  ["volumetric weight", "volumetric-weight"],
  ["UK Global Tariff", "uk-global-tariff"],
  ["commercial invoice", "commercial-invoice"],
  ["bonded warehouse", "bonded-warehouse"],
  ["customs broker", "customs-broker"],
  ["Bill of Lading", "bill-of-lading-bol"],
  ["duty deferment", "duty-deferment"],
  ["pallet network", "pallet-network"],
  ["Buy Shipping", "buy-shipping-amazon"],
  ["customs hold", "customs-hold"],
  ["commodity code", "hs-code-harmonised-system-code"],
  ["pre-clearance", "pre-clearance"],
  ["landed cost", "landed-cost"],
  ["air freight", "air-freight"],
  ["sea freight", "sea-freight"],
  ["multi-carrier", "multi-carrier"],
  ["consolidation", "consolidation"],
  ["Incoterms", "incoterms"],
  ["last mile", "last-mile"],
  ["last-mile", "last-mile"],
  ["HS codes", "hs-code-harmonised-system-code"],
  ["HS code", "hs-code-harmonised-system-code"],
  ["WISMO", "wismo-where-is-my-order"],
  ["EORI", "eori-economic-operators-registration-and-identification"],
  ["IOSS", "ioss-import-one-stop-shop"],
  ["HMRC", "hmrc"],
  ["OTDR", "on-time-delivery-rate-otdr"],
  ["SKUs", "sku-stock-keeping-unit"],
  ["SKU", "sku-stock-keeping-unit"],
  ["3PL", "3pl-third-party-logistics"],
  ["DDP", "ddp-delivered-duty-paid"],
  ["DDU", "ddu-delivered-duty-unpaid"],
  ["DAP", "dap-delivered-at-place"],
  ["FCL", "fcl--lcl-full--less-than-container-load"],
  ["LCL", "fcl--lcl-full--less-than-container-load"],
  ["CDS", "cds-customs-declaration-service"],
  ["PVA", "pva-postponed-vat-accounting"],
  ["FBA", "fba-fulfilled-by-amazon"],
  ["SFP", "seller-fulfilled-prime-sfp"],
  ["VTR", "valid-tracking-rate-vtr"],
  ["LSR", "late-shipment-rate-lsr"],
  ["WMS", "wms-warehouse-management-system"],
  ["OMS", "oms-order-management-system"],
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Acronyms (all-caps/digits) match exact case; phrases tolerate a
 *  capitalised first letter. */
const termPattern = (term: string) => {
  if (/^[A-Z0-9-]+s?$/.test(term)) return escape(term);
  const first = term[0];
  if (/[a-z]/i.test(first)) {
    return `[${first.toUpperCase()}${first.toLowerCase()}]${escape(term.slice(1))}`;
  }
  return escape(term);
};

const MASTER_RE = new RegExp(
  `\\b(${TERM_TO_SLUG.map(([t]) => termPattern(t)).join("|")})\\b`,
  "g",
);

const slugFor = (matched: string): string | undefined => {
  const lower = matched.toLowerCase();
  const hit = TERM_TO_SLUG.find(([t]) => t.toLowerCase() === lower);
  return hit?.[1];
};

/**
 * Returns the text with the first occurrence of each known glossary term
 * wrapped in a deep link. Safe in server and client components.
 */
export function linkifyGlossaryTerms(text: string): ReactNode {
  const seen = new Set<string>();
  const out: ReactNode[] = [];
  let cursor = 0;
  let m: RegExpExecArray | null;
  MASTER_RE.lastIndex = 0;

  while ((m = MASTER_RE.exec(text)) !== null) {
    const slug = slugFor(m[0]);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    if (m.index > cursor) out.push(text.slice(cursor, m.index));
    out.push(
      <Link
        key={`${slug}-${m.index}`}
        href={`${GLOSSARY_BASE}#${slug}`}
        className="underline decoration-dotted decoration-current/40 underline-offset-2 transition-colors hover:text-accent"
      >
        {m[0]}
      </Link>,
    );
    cursor = m.index + m[0].length;
  }

  if (out.length === 0) return text;
  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}
