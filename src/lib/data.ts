// Static data — will be replaced with PostgreSQL/Prisma queries later

// ─── Taxonomy ─────────────────────────────────────────────────────────────────
// Used to wire case studies (and other entities later) to the right touchpoints
// across the site. See plan: "Content Indexing System — taxonomy-driven content
// wiring". Helpers below resolve relationships at render time.

export type ShippingType =
  | "Domestic"
  | "International Export"
  | "International Import"
  | "Freight";

export type SolutionTag =
  | "eCommerce"
  | "3PL"
  | "Marketplace"
  | "B2B"
  | "Enterprise"
  | "Small Business"
  | "Export"
  | "Import";

export interface CaseStudyStat {
  /** Number → animated via CountUp. String → rendered as-is (display-md). */
  value: number | string;
  /** Eyebrow label below the value. */
  label: string;
  /** Optional prefix on numeric value (e.g. "+", "£"). */
  prefix?: string;
  /** Optional suffix on numeric value (e.g. "%", "x"). */
  suffix?: string;
  /** Optional one-line context under the label (e.g. "vs single-carrier setup"). */
  sub?: string;
  /** Promote this card with accent-light background. One per case study. */
  featured?: boolean;
}

export interface CaseStudyAtGlance {
  label: string;
  value: string;
}

export interface CaseStudyQuote {
  /** Quote text, without surrounding quotation marks. */
  quote: string;
  /** Attribution name, e.g. "Mark Baker". */
  name: string;
  /** Optional role/company line, e.g. "Head of Retail Operations, West Ham United". */
  title?: string;
  /** Optional author headshot. Relative to /public. */
  photo?: string;
  /** "feature" = large emphasised block; "inline" = lighter mid-body interjection. Defaults to "feature". */
  placement?: "feature" | "inline";
}

export interface CaseStudy {
  id: string;
  slug: string;
  brandName: string;
  industry: string;
  headline: string;
  metric: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  quote?: string;
  quoteAuthor?: string;
  /** Headshot photo of the quote author, rendered next to the attribution. Relative to /public. */
  quoteAuthorPhoto?: string;
  /** Full-bleed hero image, slotted between H1/lead and stats. Relative to /public. */
  heroImage?: string;
  /** Optional override for hero alt text. Defaults to `${brandName} case study hero`. */
  heroImageAlt?: string;
  /** Brand avatar logo. Replaces letter-fallback circle. Relative to /public. */
  logo?: string;
  /** Interactive headline stats. 3–4 entries optimal. */
  stats?: CaseStudyStat[];
  /** Compact key-value spec list. From Notion "At a Glance" sections. */
  atGlance?: CaseStudyAtGlance[];

  // ─── Taxonomy / content indexing ───
  /** Shipping types this business uses through ITD. */
  shippingTypes?: ShippingType[];
  /** Carrier slugs (lowercase) — match LINKED_ENTITIES keys. E.g. ["dpd", "evri"]. */
  carriers?: string[];
  /** Tech integration slugs — LINKED_ENTITIES keys. E.g. ["mintsoft", "connexx"]. */
  integrations?: string[];
  /** Solution category tags. A business can sit in multiple. */
  solutions?: SolutionTag[];

  // ─── Customer Stories library (/resources/case-studies) ───
  // Stories WITHOUT a primarySegment are excluded from the library page
  // (their detail pages still exist). Copy comes verbatim from the
  // Customer Stories build brief.
  /** Shelf placement on the library page: eCommerce | 3PL | Import | Export. */
  primarySegment?: LibrarySegment;
  /** All solution tags (a story can carry more than its shelf, e.g. PB = 3PL + Import). */
  segments?: LibrarySegment[];
  /** Outcome tags driving the "Browse by outcome" filter chips. */
  outcomes?: LibraryOutcome[];
  /** Bold metric/result line on the story card. */
  headlineResult?: string;
  /** Single-sentence summary on the story card. */
  oneLiner?: string;
  /** True → rendered as the spotlight above the index (and still shelved). */
  featured?: boolean;

  // ─── Detail page (/resources/case-studies/[slug]) ───
  /** Distributed pull quotes (1–3). When present, supersedes the legacy single
   *  `quote`/`quoteAuthor` fields. Each renders inline (mid-body) or as a feature block. */
  quotes?: CaseStudyQuote[];
  /** Manual related-story slugs for the "More stories" module. Omit to auto-select
   *  by shared primarySegment (see getRelatedStories). */
  relatedStories?: string[];
  /** ISO 8601 publish date for Article JSON-LD. Falls back to a site default. */
  datePublished?: string;
}

export type LibrarySegment =
  | "eCommerce"
  | "3PL"
  | "Import"
  | "Export"
  | "Freight";
export type LibraryOutcome =
  | "Save money"
  | "Go international"
  | "Get control"
  | "Win new business";

/** Shelf order on the Customer Stories library page. */
export const LIBRARY_SEGMENT_ORDER: LibrarySegment[] = [
  "eCommerce",
  "3PL",
  "Import",
  "Export",
  "Freight",
];

export const LIBRARY_OUTCOMES: LibraryOutcome[] = [
  "Save money",
  "Go international",
  "Get control",
  "Win new business",
];

/** Stories that belong to the Customer Stories library (have a shelf). */
export function getLibraryStories(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.primarySegment);
}

/** URL slug for each solution facet — the `?solution=` value on the library page. */
export const SOLUTION_SLUGS: Record<LibrarySegment, string> = {
  eCommerce: "ecommerce",
  "3PL": "3pl",
  Import: "import",
  Export: "export",
  Freight: "freight",
};

/** Resolve a `?solution=` slug back to its LibrarySegment, or null if unknown/empty. */
export function getSegmentBySolutionSlug(
  slug?: string | null,
): LibrarySegment | null {
  if (!slug) return null;
  const s = slug.toLowerCase();
  return (
    (Object.keys(SOLUTION_SLUGS) as LibrarySegment[]).find(
      (seg) => SOLUTION_SLUGS[seg] === s,
    ) ?? null
  );
}

/**
 * Library stories in a given segment. Matches against `segments[]` (so a
 * multi-segment story like PB Fulfilment appears under both 3PL and Import),
 * falling back to `primarySegment` for any story without an explicit array.
 */
export function getStoriesBySegment(seg: LibrarySegment): CaseStudy[] {
  return getLibraryStories().filter((s) =>
    (s.segments ?? (s.primarySegment ? [s.primarySegment] : [])).includes(seg),
  );
}

/**
 * Related stories for the "More stories" module on a detail page (max `limit`).
 * Selection order (BRIEF §5):
 *   1. Manual `relatedStories` overrides, in order.
 *   2. Stories sharing the current story's primarySegment, excluding self.
 *   3. Backfill with the remaining library stories (array order = most recent first).
 * Only library stories (those with a primarySegment) are ever returned, so
 * unpublished/placeholder entries never leak. De-duplicated; self always excluded.
 */
export function getRelatedStories(cs: CaseStudy, limit = 3): CaseStudy[] {
  const library = getLibraryStories();
  const picks: CaseStudy[] = [];
  const seen = new Set<string>([cs.slug]);

  const add = (story: CaseStudy | undefined) => {
    if (!story || seen.has(story.slug)) return;
    seen.add(story.slug);
    picks.push(story);
  };

  // 1. Manual overrides (must resolve to a library story).
  for (const slug of cs.relatedStories ?? []) {
    add(library.find((s) => s.slug === slug));
  }
  // 2. Same primary segment.
  for (const s of library) {
    if (picks.length >= limit) break;
    if (s.primarySegment && s.primarySegment === cs.primarySegment) add(s);
  }
  // 3. Backfill with most-recent library stories.
  for (const s of library) {
    if (picks.length >= limit) break;
    add(s);
  }
  return picks.slice(0, limit);
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  type: "tech" | "carrier";
  /** Primary region (drives the detail-page label). */
  region?: string;
  /** Optional explicit directory membership. Overrides `region` when present —
   *  e.g. FedEx / UPS belong in both Domestic and International groups. */
  regions?: string[];
  featured: boolean;
  description?: string;
  logo?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Headshot, relative to /public. */
  photo: string;
  /** Full LinkedIn profile URL. */
  linkedin?: string;
  /** Shown in the About-page gateway + the "Leadership" row on the team page. */
  leadership?: boolean;
  /** CSS object-position override for off-centre crops (e.g. "right", "30% top"). */
  objectPosition?: string;
  /** Zoom factor for wide/distant shots (e.g. 1.6). Anchored to objectPosition. */
  objectScale?: number;
  /** Leadership member shown on the team page but hidden from the About gateway. */
  hideFromGateway?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "tatti-lashes",
    primarySegment: "eCommerce",
    segments: ["eCommerce"],
    outcomes: ["Save money"],
    headlineResult: "60% volume shift",
    oneLiner:
      "Delivery choice at checkout and margin back on each order, after adding Evri alongside DPD.",
    featured: false,
    brandName: "Tatti Lashes",
    industry: "eCommerce",
    headline: "Tatti Lashes shifted 60% of volume to a cheaper carrier without losing the next-day option",
    metric: "60% volume shift",
    summary: "Adding Evri alongside DPD through Connexx gave Tatti Lashes a true multi-carrier setup, customer delivery choice at checkout, and immediate margin recovery on every order.",
    challenge: "Tatti Lashes were running their entire order base on a single next-day service through DPD. Every parcel went out at the same rate regardless of urgency, and the business was absorbing part of that cost to stay competitive. With no economy option and no data on how customers would react to a slower service, adding a second carrier felt like a risk the team couldn't quantify.",
    solution: "ITD Global introduced Evri alongside DPD via Connexx, giving Tatti Lashes a genuine multi-carrier setup with both 24hr and 48hr service options. Customers could now choose their delivery at checkout. The Mintsoft integration via Connexx was plug-and-play. Dedicated vans were allocated quickly, and the brand was live before peak trading season.",
    result: "60% of Tatti Lashes' volume transferred to Evri — a figure that surprised the team. Evri now handles the majority of their domestic parcel volume, with DPD retained for customers selecting the premium next-day service. Per-order shipping costs dropped significantly across the cheaper service, margins came back under control, and the brand entered peak with capacity already proven.",
    heroImage: "/case-studies/tatti-lashes/hero.jpg",
    logo: "/case-studies/tatti-lashes/logo.jpeg",
    stats: [
      { value: 60, suffix: "%", label: "Volume shifted to Evri", sub: "from a single-carrier DPD-only setup", featured: true },
      { value: "2", suffix: "×", label: "Active carriers", sub: "DPD next-day + Evri 24hr & 48hr" },
      { value: "Pre-peak", label: "Time to live", sub: "dedicated vans allocated before Q4" },
    ],
    atGlance: [
      { label: "Industry", value: "Beauty & Cosmetics" },
      { label: "ICP", value: "Retail / eCommerce" },
      { label: "Market", value: "UK Domestic" },
      { label: "Carriers", value: "DPD (24hr), Evri (24hr & 48hr)" },
      { label: "Integration", value: "Mintsoft via Connexx" },
      { label: "Key Feature", value: "Multi-carrier shipping + customer delivery choice" },
    ],
    shippingTypes: ["Domestic"],
    carriers: ["dpd", "evri"],
    integrations: ["mintsoft", "connexx"],
    solutions: ["eCommerce", "Enterprise"],
  },
  {
    id: "2",
    slug: "west-ham-united",
    primarySegment: "eCommerce",
    segments: ["eCommerce"],
    outcomes: ["Get control"],
    headlineResult: "One multi-carrier framework",
    oneLiner:
      "Steadier collections and a clear view of UK and international spend.",
    featured: false,
    brandName: "West Ham United FC",
    industry: "eCommerce",
    headline: "West Ham United stabilised collection reliability and gained multi-carrier control",
    metric: "Multi-carrier framework",
    summary: "Replacing fragmented carrier management with a managed multi-carrier framework gave West Ham consistent collections, peak-period stability, and consolidated visibility across UK and international shipping spend.",
    challenge: "Prior to ITD Global, West Ham managed shipping across multiple carriers directly. The structure was operationally functional but lacked centralised oversight and consistent commercial control — leading to collection variability, reactive issue management during peak trading, fragmented international shipping costs, and exposure to seasonal surcharges. During match-day and Christmas peaks, minor disruptions created dispatch pressure and unnecessary operational escalation.",
    solution: "ITD Global implemented a centrally managed multi-carrier framework aligned to West Ham's operational and commercial requirements across UK and international lanes. Rather than managing individual courier relationships, the club now operates inside a structured environment where ITD oversees collection planning, carrier performance, rate benchmarking, day-to-day operational support, international dispatch, and peak capacity alignment.",
    result: "Collection adherence stabilised into a consistently high-performance range across both standard and peak trading. International lane costs improved within a commercially meaningful range, surcharge volatility reduced through proactive capacity planning, and consolidated DHL/FedEx/UPS volume strengthened pricing alignment. Warehouse workflow interruptions linked to missed collections fell materially.",
    quote: "Since working with ITD Global, we have seen improved service reliability and greater visibility of delivery costs. Operationally, we now have more control over fulfilment processes, including collection times and the ability to adjust frequency during peak trading periods.",
    quoteAuthor: "Mark Baker, Head of Retail Operations at West Ham United",
    quoteAuthorPhoto: "/case-studies/west-ham-united/author.jpg",
    heroImage: "/case-studies/west-ham-united/hero.webp",
    logo: "/case-studies/west-ham-united/logo.png",
    stats: [
      { value: "Match-ready", label: "Collection reliability", sub: "stable across standard and peak trading", featured: true },
      { value: "DHL · FedEx · UPS", label: "Consolidated buying power", sub: "international lane rate alignment" },
      { value: "Lower", label: "Surcharge volatility", sub: "proactive peak capacity planning" },
    ],
    atGlance: [
      { label: "Industry", value: "Sports / Retail eCommerce" },
      { label: "Market", value: "UK + International" },
      { label: "Carriers", value: "DHL, FedEx, UPS via ITD framework" },
      { label: "Key Feature", value: "Managed multi-carrier oversight" },
      { label: "Services", value: "Collection planning, rate benchmarking, peak alignment" },
    ],
    shippingTypes: ["Domestic", "International Export"],
    carriers: ["dhl", "fedex", "ups"],
    integrations: ["connexx"],
    solutions: ["eCommerce", "Enterprise"],
  },
  {
    id: "3",
    slug: "delta-fulfilment",
    primarySegment: "3PL",
    segments: ["3PL"],
    outcomes: ["Save money", "Get control"],
    headlineResult: "Immediate margin uplift",
    oneLiner:
      "A better-fit carrier for their health and wellness client, with real SLAs and full MI.",
    featured: false,
    brandName: "Delta Fulfilment",
    industry: "3PL",
    headline: "Delta Fulfilment improved SLAs, MI reporting, and client profitability by switching to Evri",
    metric: "Immediate margin uplift",
    summary: "Moving from Royal Mail to Evri through ITD Global gave Delta real SLAs, full MI reporting, end-consumer tracking, and a unified workflow — and delivered an immediate margin uplift for their health and wellness client.",
    challenge: "Delta's primary carrier at the time, Royal Mail, created several operational limitations: no meaningful SLAs or KPI commitments, minimal MI reporting, low end-consumer visibility, and fragmented workflows across multiple portals. As Delta onboarded more eCommerce brands, these constraints directly impacted client experience, renewal confidence, and internal efficiency.",
    solution: "Through ITD Global, Delta gained access to competitive Evri rates and a far more tech-enabled delivery experience. Detailed MI reporting across scan events, delivery outcomes, exception categories, SLA performance, and zone-level insights. Rich tracking and branded customer updates that significantly reduced WISMO tickets. Real SLAs Delta could benchmark and pass on to clients. And a single unified flow through ITD for labels, reporting, and billing.",
    result: "Delta's health and wellness client saw an immediate margin uplift after shifting volume from Royal Mail to Evri — savings reinvested directly into customer acquisition. Delta now provides clients with weekly performance packs, delivery-level transparency, and actionable cost-reduction recommendations. Consistent reporting and a single workflow freed internal capacity to scale without adding headcount.",
    quote: "Connexx and ITD's Evri setup removed bottlenecks we'd been living with for years. The improved MI reporting, SLAs, and delivery visibility helped us tighten our operation — and our Health & Wellness client saw an immediate uplift in margin after moving from Royal Mail to Evri. It's been a genuine step-change for our fulfilment performance.",
    quoteAuthor: "Supervisor, Delta Fulfilment",
    heroImage: "/case-studies/delta-fulfilment/hero.jpg",
    logo: "/case-studies/delta-fulfilment/logo.jpg",
    stats: [
      { value: "Margin ↑", label: "Client profitability", sub: "Health & wellness client, post-switch", featured: true },
      { value: "RM → Evri", label: "Carrier upgrade", sub: "real SLAs, full MI, zone-level data" },
      { value: "Weekly", label: "Performance packs", sub: "delivered to every client" },
    ],
    atGlance: [
      { label: "Industry", value: "3PL / eCommerce fulfilment" },
      { label: "Market", value: "UK Domestic" },
      { label: "Carriers", value: "Evri (replacing Royal Mail)" },
      { label: "Key Feature", value: "MI reporting + SLA visibility" },
      { label: "Services", value: "Multi-client analytics, branded tracking, single workflow" },
    ],
    shippingTypes: ["Domestic"],
    carriers: ["evri"],
    integrations: ["connexx"],
    solutions: ["3PL"],
  },
  {
    id: "4",
    slug: "arlo-fulfilment",
    primarySegment: "Export",
    segments: ["Export"],
    outcomes: ["Go international", "Win new business"],
    headlineResult: "International, unlocked",
    oneLiner:
      "FedEx International Priority turned a gap in their offering into a competitive advantage.",
    featured: false,
    brandName: "Arlo Fulfilment",
    industry: "Export",
    headline: "Arlo Fulfilment unlocked international shipping for their clients without building it themselves",
    metric: "International unlocked",
    summary: "Adding FedEx International Priority through ITD Global gave Arlo a fully managed, commercially competitive international shipping proposition — turning a gap in their offering into a competitive advantage.",
    challenge: "Arlo's clients were increasingly demanding international shipping, but Arlo had no scalable, competitive solution to offer them. Going direct to carriers as a smaller 3PL meant unfavourable rates and limited service options. Turning clients away or pointing them elsewhere risked damaging relationships and losing accounts. The gap in their offering was beginning to limit Arlo's ability to grow their client base.",
    solution: "Partnering with ITD Global gave Arlo immediate access to a competitive, fully managed international shipping solution without the complexity of building it themselves. ITD introduced FedEx International Priority into Arlo's carrier mix, with the carrier relationship handled end-to-end by ITD — so Arlo's team could focus on fulfilment. ITD's consolidated buying power unlocked volume-backed rates that wouldn't have been accessible going direct.",
    result: "Arlo can now confidently offer a fast, reliable, and commercially competitive international shipping service as part of their core proposition, enabling their clients to sell into global markets and opening a new dimension of growth for the business.",
    heroImage: "/case-studies/arlo-fulfilment/hero.jpg",
    logo: "/case-studies/arlo-fulfilment/logo.png",
    stats: [
      { value: "International", label: "Capability unlocked", sub: "new dimension of client growth", featured: true },
      { value: "FedEx", label: "Carrier added", sub: "International Priority via ITD" },
      { value: "Volume-backed", label: "Rates accessed", sub: "not available going direct" },
    ],
    atGlance: [
      { label: "Industry", value: "3PL — family-run, Buckinghamshire" },
      { label: "Market", value: "International export" },
      { label: "Carriers", value: "FedEx International Priority" },
      { label: "Key Feature", value: "Fully managed carrier relationship" },
      { label: "Services", value: "Volume-backed rates, end-to-end operational support" },
    ],
    shippingTypes: ["International Export"],
    carriers: ["fedex"],
    integrations: ["connexx"],
    solutions: ["3PL", "Export"],
  },
  {
    id: "5",
    slug: "home-bargains",
    primarySegment: "Import",
    segments: ["Import"],
    outcomes: ["Save money"],
    headlineResult: "30–35% cost reduction",
    oneLiner:
      "60 buyers' scattered sample shipments replaced with one weekly consolidated air freight from China.",
    featured: false,
    brandName: "Home Bargains",
    industry: "Import",
    headline: "Home Bargains reduced sample shipping costs by 30–35% with weekly China consolidation",
    metric: "30–35% cost reduction",
    summary: "ITD Global replaced 60 buyers' fragmented sample shipments with one weekly consolidated air freight from China — guaranteed Tuesday delivery, single accountability, and significant annual savings.",
    challenge: "Home Bargains' buying team is 60 buyers sourcing from 200+ factories across China. Each buyer was managing sample shipments independently on a shared account number with no central oversight. Costs were spiralling. Visibility was non-existent. Samples arrived inconsistently — sometimes sitting uncollected for days or weeks. For a discount retailer with relentless product velocity, the lack of a structured international shipping solution was a real operational liability.",
    solution: "ITD Global replaced the fragmented process with a single, structured weekly parcel consolidation service built around Home Bargains' buying cycle. ITD's China team collects samples via SF Express from any factory across China, Monday to Thursday, into ITD's warehouse — then consolidates into one weekly air freight shipment to the UK. One logistics partner. One process. One weekly delivery.",
    result: "30 to 35% reduction in annual shipping costs by grouping individual express shipments into one weekly consolidated consignment. Guaranteed Tuesday delivery for every buyer, every week — replacing chaos with a predictable rhythm the team could plan around. Full visibility across all 60 buyers and 200 factories, and one accountable point of contact instead of hundreds of fragmented relationships.",
    heroImage: "/case-studies/home-bargains/hero.webp",
    logo: "/case-studies/home-bargains/logo.jpeg",
    stats: [
      { value: 30, prefix: "", suffix: "–35%", label: "Annual cost reduction", sub: "vs individual express shipments", featured: true },
      { value: "Tuesday", label: "Guaranteed delivery day", sub: "every week, every buyer" },
      { value: 200, suffix: "+", label: "Factories consolidated", sub: "across 60 buyers" },
    ],
    atGlance: [
      { label: "Industry", value: "Discount Retail" },
      { label: "Market", value: "China → UK" },
      { label: "Service", value: "Weekly parcel consolidation, air freight" },
      { label: "Carriers", value: "SF Express (China), Air Freight (UK)" },
      { label: "Key Feature", value: "Single weekly consolidated shipment" },
    ],
    shippingTypes: ["International Import", "Freight"],
    carriers: ["sf-express"],
    integrations: [],
    solutions: ["Import", "Enterprise"],
  },
  {
    id: "6",
    slug: "rioz-global",
    primarySegment: "3PL",
    segments: ["3PL"],
    outcomes: ["Win new business", "Save money"],
    headlineResult: "5 new clients in 6 months",
    oneLiner: "Competitive rates turned shipping into a revenue stream.",
    featured: true,
    brandName: "RIOZ Global",
    industry: "3PL",
    headline: "RIOZ Global turned shipping into a profit centre and onboarded 5 new clients in 6 months",
    metric: "5 new clients in 6 months",
    summary: "Access to ITD Global's competitive carrier rates let RIOZ stop relying on client-owned carriers, win new business on aggressive quotes, open a new warehouse, and grow its team.",
    challenge: "A significant portion of RIOZ's clients insisted on using their own carriers. The 3PL was doing the work, but the carriers were making the money. Warehousing fees covered costs — but profit lives in shipping. Existing carrier partnerships lacked competitiveness, making it difficult to win new accounts. RIOZ lacked the scalable, high-capacity shipping backbone needed to support expansion.",
    solution: "Partnering with ITD Global gave RIOZ access to a full suite of competitive, high-volume carrier rates — immediately transforming the commercial model. RIOZ began generating margin on every shipment using ITD's rates instead of relying on client-owned carriers. Clients saved money while RIOZ earned margin — a win-win that strengthened relationships. And with low-rate access, RIOZ could quote aggressively on new business.",
    result: "Within just 6 months: 5 new clients onboarded on ITD Global's rates, a new warehouse location opened to support increased demand, additional team members recruited, and 100% of new and existing customers now ship on ITD rates. A previously unavailable profit centre is now one of RIOZ's strongest revenue streams.",
    quote: "Before ITD, we made nothing on shipping. Now it's one of our strongest revenue streams. Their rates enabled us to quote more competitively, bring in multiple new clients, and reinvest in expanding the warehouse and team. It's been transformational for our growth.",
    quoteAuthor: "Rob Osgood, Managing Director at RIOZ Global",
    quoteAuthorPhoto: "/case-studies/rioz-global/author.webp",
    heroImage: "/case-studies/rioz-global/hero.webp",
    logo: "/case-studies/rioz-global/logo.png",
    stats: [
      { value: 5, label: "New clients onboarded", sub: "within 6 months on ITD rates", featured: true },
      { value: "+1", label: "New warehouse opened", sub: "to support increased demand" },
      { value: 100, suffix: "%", label: "Volume on ITD rates", sub: "new and existing customers" },
    ],
    atGlance: [
      { label: "Industry", value: "3PL — fashion, lifestyle, homeware" },
      { label: "Market", value: "UK + International" },
      { label: "Key Feature", value: "Shipping margin unlocked" },
      { label: "Services", value: "Competitive carrier rates, profit centre transformation" },
    ],
    shippingTypes: ["Domestic", "International Export"],
    carriers: [],
    integrations: ["connexx"],
    solutions: ["3PL"],
  },
  {
    id: "7",
    slug: "pb-fulfilment",
    primarySegment: "3PL",
    segments: ["3PL", "Import"],
    outcomes: ["Go international"],
    headlineResult: "Daily collections to the US",
    oneLiner:
      "Stable US delivery and the customs support their subscription brands rely on.",
    featured: false,
    brandName: "PB Fulfilment",
    industry: "3PL",
    headline: "PB Fulfilment secured reliable, scalable international delivery for high-volume subscription brands",
    metric: "Daily collections to the US",
    summary: "Switching to FedEx International Priority through ITD Global gave PB Fulfilment competitive rates, stable US delivery, daily collections, and the customs support subscription brands depend on.",
    challenge: "PB Fulfilment serves fast-growing pet brands, subscription services, and D2C products — particularly across the United States, where delivery reliability directly impacts subscription renewals. Existing international carrier options were either too expensive or too unreliable. Transit times to the US were inconsistent. There was no proactive support around customs, duties, and tariff changes. And no partner could guarantee the daily collections subscription brands depend on. PB had the volume, but carrier constraints were capping their ability to scale.",
    solution: "Partnering with ITD Global gave PB access to a premium, scalable cross-border shipping model powered by FedEx International Priority. Market-leading rates, faster delivery, and consistent performance across thousands of parcels. Hands-on customs and compliance advisory around documentation, HS codes, duty thresholds, and tariff reform. Guaranteed daily FedEx collections to stabilise the outbound workflow. And dedicated customer support for tracking escalations, delivery exceptions, and SLA management.",
    result: "Within months of switching: all US delivery lanes stabilised, subscription churn decreased due to improved delivery reliability, PB became more competitive on international quotes, and onboarding friction with new US-bound clients dropped significantly. Daily collections created a dependable rhythm for packing and dispatch.",
    quote: "ITD Global and FedEx transformed our US delivery performance. We finally have a reliable, fast international service with daily collections, competitive rates, and proper customs support. It's made scaling our subscription brands dramatically easier.",
    quoteAuthor: "Steve Seymor, Director at PB Fulfilment",
    quoteAuthorPhoto: "/case-studies/pb-fulfilment/author.webp",
    heroImage: "/case-studies/pb-fulfilment/hero.webp",
    logo: "/case-studies/pb-fulfilment/logo.jpeg",
    stats: [
      { value: "Daily", label: "FedEx collections", sub: "stabilised outbound workflow", featured: true },
      { value: "US lanes", label: "Stabilised performance", sub: "subscription churn reduced" },
      { value: "Lower", label: "Onboarding friction", sub: "for new US-bound clients" },
    ],
    atGlance: [
      { label: "Industry", value: "3PL — pet, subscription, D2C" },
      { label: "Market", value: "UK → US international" },
      { label: "Carriers", value: "FedEx International Priority" },
      { label: "Key Feature", value: "Daily collections + customs advisory" },
      { label: "Services", value: "HS codes, duty thresholds, tariff-reform support" },
    ],
    shippingTypes: ["International Export"],
    carriers: ["fedex"],
    integrations: ["connexx"],
    solutions: ["3PL", "Export"],
  },
  {
    id: "8",
    slug: "sainsburys-argos",
    primarySegment: "Import",
    segments: ["Import"],
    outcomes: ["Get control"],
    headlineResult: "Compliance at origin",
    oneLiner:
      "A team in China standardised factory documentation and ended the customs delays.",
    featured: false,
    brandName: "Sainsbury's & Argos",
    industry: "Import",
    headline: "Sainsbury's & Argos solved customs compliance and reduced carrier dependency across China",
    metric: "Compliance at origin",
    summary: "ITD Global's team on the ground in China standardised factory documentation and introduced FedEx International Priority — eliminating customs delays and giving Sainsbury's & Argos genuine courier flexibility for the first time.",
    challenge: "Sainsbury's and Argos source from hundreds of factories across China through two offices in Hong Kong and Shanghai, with no standardised process for managing international shipments. Factories were unclear about which parcels and samples belonged to which brand, leading to mislabelling, misrouting, and customs delays. The team was managing all international express through DHL Express with no benchmarking, no visibility over costs, and no alternative service options — paying more than they needed to with no specialist support to challenge it.",
    solution: "ITD Global placed their own team on the ground in China and took ownership of the compliance process end-to-end. We reviewed factory paperwork, identified the gaps, and created a standardised documentation template built for a multi-brand environment — giving each factory a clear process for identifying which shipment belonged to which brand. We also introduced FedEx International Priority as a more commercially competitive option, giving Sainsbury's and Argos genuine courier flexibility backed by a single logistics partner managing everything from China to the UK.",
    result: "Customs compliance owned and solved at origin — the standardised factory template removed the ambiguity that had been causing customs holds. Multi-brand clarity built into the process so shipments moved through the right channels every time. Movement away from a single DHL Express contract unlocked more commercially appropriate FedEx International Priority rates. And one accountable logistics partner now manages everything across both brands and both offices.",
    heroImage: "/case-studies/sainsburys-argos/hero.webp",
    logo: "/case-studies/sainsburys-argos/logo-icon.png",
    stats: [
      { value: "At origin", label: "Compliance solved", sub: "standardised factory documentation", featured: true },
      { value: "DHL → FedEx", label: "Courier flexibility unlocked", sub: "no more single-contract pricing" },
      { value: "2 brands · 2 offices", label: "Single logistics partner", sub: "HK + Shanghai, both brands" },
    ],
    atGlance: [
      { label: "Industry", value: "Retail / Global Sourcing" },
      { label: "Market", value: "China (HK + Shanghai) → UK" },
      { label: "Carriers", value: "FedEx International Priority (replacing DHL Express)" },
      { label: "Key Feature", value: "China-based compliance team + factory templates" },
      { label: "Services", value: "Multi-brand routing, sample + parcel shipping" },
    ],
    shippingTypes: ["International Import"],
    carriers: ["fedex"],
    integrations: [],
    solutions: ["Import", "Enterprise"],
  },
  {
    id: "9",
    slug: "freedom-fire",
    primarySegment: "eCommerce",
    segments: ["eCommerce"],
    outcomes: ["Get control"],
    headlineResult: "Real visibility at last",
    oneLiner:
      "Linnworks connected to a multi-carrier network, with DG-approved carriers and real parcel data.",
    featured: false,
    brandName: "Freedom Fire",
    industry: "eCommerce",
    headline: "Freedom Fire unlocked full shipping visibility with Connexx Shipment Reports",
    metric: "Real-time shipment data",
    summary: "Connecting Linnworks to ITD Global's multi-carrier network via Connexx gave Freedom Fire DG-approved carriers, dedicated account management, competitive rates across InPost/Evri/Royal Mail, and — for the first time — real visibility of their parcel data.",
    challenge: "Freedom Fire is a UK online retailer of fire safety, security, and PPE equipment. As volume grew, the parcel operation hadn't kept pace. Without clear data, the team had no reliable way to see what was being shipped, where, how it was performing, or what it was costing them. Decisions were made without insight. Issues were discovered late. And with no dedicated point of contact at their existing reseller, there was nobody to turn to when things needed investigating. For a business shipping Dangerous Goods volumes, the absence of shipment tracking and reporting was a real operational liability.",
    solution: "ITD Global connected Freedom Fire's Linnworks platform to ITD's multi-carrier network via Connexx — a single integrated eCommerce shipping workflow and, for the first time, real visibility of parcel data through Shipment Reports. Alongside the integration: Dangerous Goods approvals handled with InPost, competitive rates across InPost (DG Approved), Evri, and Royal Mail, and a dedicated account manager to keep everything running smoothly.",
    result: "Full DG compliance and management through InPost (something previous resellers couldn't provide). A single dedicated account manager who knows the operation inside out. Commercially competitive rates that weren't available going direct. And complete, real-time visibility through Shipment Reports — performance tracking, SLA monitoring, and a single source of truth for every parcel.",
    heroImage: "/case-studies/freedom-fire/hero.jpeg",
    logo: "/case-studies/freedom-fire/logo.jpeg",
    stats: [
      { value: "Real-time", label: "Shipment data via Connexx", sub: "performance, SLAs, single source of truth", featured: true },
      { value: "DG approved", label: "Dangerous Goods compliance", sub: "managed through InPost" },
      { value: 3, label: "Active carriers", sub: "InPost (DG), Evri, Royal Mail" },
    ],
    atGlance: [
      { label: "Industry", value: "Fire Safety & Security retail" },
      { label: "Market", value: "UK Domestic" },
      { label: "Carriers", value: "InPost (DG Approved), Evri, Royal Mail" },
      { label: "Integration", value: "Linnworks via Connexx" },
      { label: "Key Feature", value: "Shipment Reports + dedicated account manager" },
    ],
    shippingTypes: ["Domestic"],
    carriers: ["inpost", "evri", "royal-mail"],
    integrations: ["linnworks", "connexx"],
    solutions: ["eCommerce", "Small Business"],
  },
  {
    id: "10",
    slug: "oddballs",
    primarySegment: "Freight",
    segments: ["Freight"],
    headlineResult: "Air, rail & sea — one shipment",
    oneLiner:
      "A large China→UK consignment split across three modes, with each tranche matched to the right delivery window at the lowest blended freight cost.",
    brandName: "OddBalls",
    industry: "Freight",
    headline:
      "OddBalls moved a large China shipment on time and on budget with a mixed-mode freight solution",
    metric: "Air + rail + sea, one managed shipment",
    summary:
      "ITD Global split a large China→UK consignment across air, rail and sea — matching each tranche of stock to the right mode so every delivery window was met at the lowest blended freight cost.",
    challenge:
      "OddBalls had a large volume of stock ready to leave China in a short window, but the goods were needed in the UK across several different time frames. Not everything was needed at once, and not everything justified the same freight cost. A single air-freight solution would have been fast but commercially inefficient across the full volume; sea freight alone could not meet the tighter windows on part of the cargo. A one-size approach would either blow the budget or leave the business short of stock.",
    solution:
      "ITD Global designed a mixed-mode freight solution that split the cargo across three modes. The most time-sensitive stock went by air freight to land ahead of the earliest required date. The mid-window tranche was routed via rail freight from China — a cost-effective, reliable alternative to air. The remaining volume, where lead time allowed, shipped by sea to keep costs lowest. Each mode was chosen on commercial logic, not just speed.",
    result:
      "Every part of the shipment landed in the UK within its required window — no delays, no shortfalls, no compromise on availability. By routing each tranche through the most commercially appropriate option, ITD Global kept overall freight costs significantly lower than a single air-freight solution would have allowed.",
    logo: "/case-studies/oddballs/logo.png",
    stats: [
      {
        value: 3,
        suffix: "-mode",
        label: "Freight solution",
        sub: "air, rail & sea combined",
        featured: true,
      },
      {
        value: "On time",
        label: "All cargo delivered",
        sub: "every delivery window met",
      },
      {
        value: "Lowest",
        label: "Blended freight cost",
        sub: "vs a single air-freight option",
      },
    ],
    atGlance: [
      { label: "Industry", value: "Fashion & Lifestyle, eCommerce" },
      { label: "ICP", value: "Freight" },
      { label: "Market", value: "China → UK" },
      { label: "Service", value: "Mixed-mode freight (air, rail & sea)" },
      {
        label: "Key Feature",
        value: "Split-mode shipping to meet multiple delivery windows",
      },
    ],
    shippingTypes: ["Freight"],
    carriers: [],
    integrations: [],
    solutions: ["eCommerce"],
  },
];

export const integrations: Integration[] = [
  // ─── Tech — ERP / WMS ──────────────────────────────────────────────
  { id: "t-linnworks", name: "Linnworks", category: "erp_wms", type: "tech", featured: true, description: "Multi-channel order management", logo: "/logos/erp-wms/linnworks_logo.png" },
  { id: "t-magento", name: "Magento", category: "erp_wms", type: "tech", featured: false, description: "Adobe Commerce platform", logo: "/logos/erp-wms/magento-icon.webp" },
  { id: "t-netsuite", name: "NetSuite", category: "erp_wms", type: "tech", featured: true, description: "Cloud ERP", logo: "/logos/erp-wms/netsuite-icon.png" },
  { id: "t-orderwise", name: "OrderWise", category: "erp_wms", type: "tech", featured: false, description: "Business management & WMS", logo: "/logos/erp-wms/orderwise-icon.webp" },
  { id: "t-peoplevox", name: "Peoplevox", category: "erp_wms", type: "tech", featured: false, description: "eCommerce warehouse management", logo: "/logos/erp-wms/peoplevox-icon.jpg" },
  { id: "t-selro", name: "Selro", category: "erp_wms", type: "tech", featured: false, description: "Multi-channel order management", logo: "/logos/erp-wms/selro-mark.png" },
  { id: "t-tradepeg", name: "Tradepeg", category: "erp_wms", type: "tech", featured: false, description: "Inventory & order management", logo: "/logos/erp-wms/tradepeg-icon.png" },
  { id: "t-jonassports", name: "JonasSports", category: "erp_wms", type: "tech", featured: false, description: "Retail & ERP for sports", logo: "/logos/erp-wms/jonassports-icon.png" },
  { id: "t-brightpearl", name: "Brightpearl", category: "erp_wms", type: "tech", featured: false, description: "Retail operations platform", logo: "/logos/erp-wms/brightpearl-icon.png" },
  // ─── Tech — eCommerce & Logistics ──────────────────────────────────
  { id: "t-base", name: "Base", category: "ecommerce_logistics", type: "tech", featured: false, description: "Commerce platform", logo: "/logos/ecommerce/base-icon.png" },
  { id: "t-aimco", name: "Aimco", category: "ecommerce_logistics", type: "tech", featured: false, description: "Order & inventory management" },
  { id: "t-channeladvisor", name: "ChannelAdvisor", category: "ecommerce_logistics", type: "tech", featured: false, description: "Multi-channel commerce", logo: "/logos/ecommerce/channeladvisor-icon.png" },
  { id: "t-cloudcommercepro", name: "CloudCommercePro", category: "ecommerce_logistics", type: "tech", featured: false, description: "Order management system", logo: "/logos/ecommerce/cloudcommerce-icon.png" },
  { id: "t-shipstation", name: "Shipstation", category: "ecommerce_logistics", type: "tech", featured: true, description: "Shipping automation", logo: "/logos/erp-wms/shipstation_logo.png" },
  { id: "t-woocommerce", name: "WooCommerce", category: "ecommerce_logistics", type: "tech", featured: true, description: "WordPress commerce", logo: "/logos/erp-wms/woocommerce_logo.svg" },
  { id: "t-storefeeder", name: "Storefeeder", category: "ecommerce_logistics", type: "tech", featured: false, description: "Multi-channel listing & orders", logo: "/logos/erp-wms/storefeeder_logo.png" },
  { id: "t-veeqo", name: "Veeqo", category: "ecommerce_logistics", type: "tech", featured: false, description: "Inventory & shipping platform", logo: "/logos/ecommerce/veeqo-icon.webp" },
  { id: "t-shopify", name: "Shopify", category: "ecommerce_logistics", type: "tech", featured: true, description: "eCommerce platform", logo: "/logos/ecommerce/shopify_logo.png" },
  { id: "t-mintsoft", name: "Mintsoft", category: "ecommerce_logistics", type: "tech", featured: false, description: "Warehouse management system", logo: "/logos/ecommerce/mintsoft-icon.png" },
  // ─── Tech — Marketplace ────────────────────────────────────────────
  { id: "t-amazon", name: "Amazon", category: "marketplace", type: "tech", featured: true, description: "Amazon Seller Central", logo: "/logos/marketplaces/amazon-icon.webp" },
  { id: "t-tiktok", name: "TikTok Shop", category: "marketplace", type: "tech", featured: true, description: "Social commerce marketplace", logo: "/logos/marketplaces/tiktok-tile.png" },
  { id: "t-etsy", name: "Etsy", category: "marketplace", type: "tech", featured: false, description: "Etsy shop connector", logo: "/logos/marketplaces/etsy-icon.png" },
  { id: "t-ebay", name: "eBay", category: "marketplace", type: "tech", featured: true, description: "eBay seller integration", logo: "/logos/marketplaces/ebay-icon.png" },
  { id: "t-temu", name: "Temu", category: "marketplace", type: "tech", featured: false, description: "Global online marketplace", logo: "/logos/marketplaces/temu-icon.png" },
  // ─── Carriers — Domestic ───────────────────────────────────────────
  { id: "c-evri", name: "Evri", category: "carrier", type: "carrier", region: "Domestic", featured: true, description: "UK parcel delivery", logo: "/logos/carriers/evri_logo.png" },
  { id: "c-inpost", name: "InPost", category: "carrier", type: "carrier", region: "Domestic", featured: true, description: "Parcel locker delivery network", logo: "/logos/carriers/inpost-icon.png" },
  { id: "c-royal-mail", name: "Royal Mail", category: "carrier", type: "carrier", region: "Domestic", featured: true, description: "UK postal service", logo: "/logos/carriers/royal-mail-icon.png" },
  { id: "c-dpd", name: "DPD", category: "carrier", type: "carrier", region: "Domestic", featured: true, description: "Parcel delivery network", logo: "/logos/carriers/DPD-LOGO.png" },
  { id: "c-dhl-parcel", name: "DHL Parcel", category: "carrier", type: "carrier", region: "Domestic", featured: false, description: "Parcel delivery", logo: "/logos/carriers/dhlparcel_logo.svg" },
  { id: "c-amazon-shipping", name: "Amazon Shipping", category: "carrier", type: "carrier", region: "Domestic", featured: true, description: "Amazon logistics network", logo: "/logos/carriers/amazonshipping_logo.png" },
  { id: "c-apc", name: "APC", category: "carrier", type: "carrier", region: "Domestic", featured: false, description: "UK overnight parcel network", logo: "/logos/carriers/apc_logo.png" },
  // ─── Carriers — International ───────────────────────────────────────
  { id: "c-parcel-force", name: "Parcel Force", category: "carrier", type: "carrier", region: "International", featured: true, description: "Tracked parcel delivery", logo: "/logos/carriers/parcel-force.svg" },
  { id: "c-evri-eu", name: "Evri EU", category: "carrier", type: "carrier", region: "International", featured: false, description: "European parcel delivery", logo: "/logos/carriers/evrieu_logo.png" },
  { id: "c-fedex", name: "FedEx", category: "carrier", type: "carrier", region: "International", regions: ["Domestic", "International"], featured: true, description: "Domestic & global parcel and freight", logo: "/logos/carriers/fedex-icon.png" },
  { id: "c-ups", name: "UPS", category: "carrier", type: "carrier", region: "International", regions: ["Domestic", "International"], featured: true, description: "Domestic & worldwide delivery", logo: "/logos/carriers/ups_logo.png" },
  { id: "c-dhl", name: "DHL", category: "carrier", type: "carrier", region: "International", featured: true, description: "International express", logo: "/logos/carriers/dhl_logo.webp" },
  { id: "c-landmark", name: "Landmark", category: "carrier", type: "carrier", region: "International", featured: false, description: "International parcel delivery", logo: "/logos/carriers/landmark-icon.svg" },
  { id: "c-tnt", name: "TNT", category: "carrier", type: "carrier", region: "International", featured: false, description: "European & global express", logo: "/logos/carriers/tnt-icon.png" },
  { id: "c-deutsche-post", name: "Deutsche Post", category: "carrier", type: "carrier", region: "International", featured: false, description: "German postal & international mail", logo: "/logos/carriers/deutschepost_logo.avif" },
  { id: "c-starlinks", name: "Starlinks", category: "carrier", type: "carrier", region: "International", featured: false, description: "Cross-border e-commerce delivery", logo: "/logos/carriers/starlinks_logo.png" },
];

// ─── Integration slugs + lookups ───────────────────────────────────────────────
// Each integration gets a dedicated page at /integrations/carriers/<slug> or
// /integrations/tech/<slug>. Slugs derive from the name, with overrides where the
// derived slug differs from an established route (e.g. "DHL Express" → "dhl").

const INTEGRATION_SLUG_OVERRIDES: Record<string, string> = {};

export function slugifyIntegration(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Canonical URL slug for an integration (carrier or tech). */
export function getIntegrationSlug(i: Integration): string {
  return INTEGRATION_SLUG_OVERRIDES[i.name] ?? slugifyIntegration(i.name);
}

/** All integrations of a given type (carriers or tech), in list order. */
export function getIntegrationsByType(type: "tech" | "carrier"): Integration[] {
  return integrations.filter((i) => i.type === type);
}

/** Find one integration by its URL slug, optionally constrained to a type. */
export function getIntegrationBySlug(
  slug: string,
  type?: "tech" | "carrier",
): Integration | undefined {
  return integrations.find(
    (i) => getIntegrationSlug(i) === slug && (!type || i.type === type),
  );
}

/** Tech integrations grouped by their category, in a stable display order. */
export const TECH_CATEGORY_LABELS: Record<string, string> = {
  erp_wms: "ERP / WMS",
  ecommerce_logistics: "eCommerce & Logistics",
  marketplace: "Marketplace",
};

// ─── Team ─────────────────────────────────────────────────────────────────────
// Leadership shown in the About-page "Meet the Team" gateway + the top of the
// /about/team page. Append non-leadership members and they flow into the wider
// grid automatically.

export const team: TeamMember[] = [
  {
    name: "Avi Mechlowitz",
    role: "Co-founder",
    photo: "/team/avi-mechlowitz.jpg",
    leadership: true,
    hideFromGateway: true,
  },
  {
    name: "Jonathan Mocton",
    role: "Co-founder, Group CEO",
    photo: "/team/jonathan-mocton-v2.jpg",
    linkedin: "https://www.linkedin.com/in/jonathan-mocton-2173ba2b8/",
    leadership: true,
  },
  {
    name: "Dani Mechlowitz",
    role: "Group CRO",
    photo: "/team/dani-mechlowitz-v2.jpg",
    linkedin: "https://www.linkedin.com/in/danimechlowitz/",
    leadership: true,
  },
  {
    name: "Dov Uhrmacher",
    role: "Group CTO",
    photo: "/team/dov-uhrmacher.jpg",
    linkedin: "https://www.linkedin.com/in/dov-uhrmasher-23b54b85/",
    leadership: true,
  },
  {
    name: "Charles Chait",
    role: "Sales Director",
    photo: "/team/charles-chait-v2.jpg",
    linkedin: "https://www.linkedin.com/in/charles-chait-b50a7930/",
    leadership: true,
  },
  {
    name: "Dalya Henry",
    role: "Head of Carrier Management",
    photo: "/team/dalya-henry.jpg",
    linkedin: "https://www.linkedin.com/in/dalya-henry-60387b31/",
    leadership: true,
  },
  {
    name: "Louise Powell",
    role: "Head of Account Management",
    photo: "/team/louise-powell-v2.jpg",
    linkedin: "https://www.linkedin.com/in/louise-powell-0b999058/",
    leadership: true,
  },
  {
    name: "Yoad Tzor",
    role: "Group Head of Product & Marketing",
    photo: "/team/yoad-tzor-v2.jpg",
    leadership: true,
    hideFromGateway: true,
  },
  {
    name: "Jennifer Totty",
    role: "Group HR",
    photo: "/team/jennifer-totty.jpg",
    leadership: true,
    hideFromGateway: true,
  },
  // ─── Wider team ───
  {
    name: "Amber Stonley",
    role: "Account Manager",
    photo: "/team/amber-stonley.jpg",
  },
  {
    name: "Dublin Ebude",
    role: "Trainee Full Stack Developer",
    photo: "/team/dublin-ebude.jpg",
  },
  {
    name: "Dalya Rotgolz",
    role: "Group Marketing Manager",
    photo: "/team/dalya-rotgolz.jpg",
  },
  {
    name: "Rafi Grosskopf",
    role: "3PL & Strategic Partnership",
    photo: "/team/rafi-grosskopf.jpg",
  },
  {
    name: "Leah Faulk",
    role: "Account Manager",
    photo: "/team/leah-faulk.jpg",
  },
  {
    name: "Milad Shukri",
    role: "Senior Software Engineer",
    photo: "/team/milad-shukri.jpg",
  },
  {
    name: "Emily Fallows",
    role: "Onboarding Manager",
    photo: "/team/emily-fallows.jpg",
  },
  {
    name: "Nathan Rankin",
    role: "Business Development Manager, Scotland",
    photo: "/team/nathan-rankin.jpg",
  },
  {
    name: "Sylwia Rutkowska",
    role: "National Account Manager",
    photo: "/team/sylwia-rutkowska.jpg",
  },
  {
    name: "Klieo Duthie",
    role: "Account Manager",
    photo: "/team/klieo-duthie.jpg",
  },
  {
    name: "Chris Heath",
    role: "Senior Business Development Manager, West Midlands",
    photo: "/team/chris-heath.jpg",
  },
  {
    name: "Georgina Davis",
    role: "Invoice Queries Manager",
    photo: "/team/georgina-davis.jpg",
  },
  {
    name: "Ross Xu",
    role: "Finance Business Partner",
    photo: "/team/ross-xu.jpg",
  },
  {
    name: "Saul Mocton",
    role: "Product Data Analyst",
    photo: "/team/saul-mocton.jpg",
  },
  {
    name: "Romeela Bibi",
    role: "Claims and Queries Admin Assistant",
    photo: "/team/romeela-bibi.jpg",
  },
  {
    name: "Suri Leitner",
    role: "Business Development Manager, Delta Fulfilment",
    photo: "/team/suri-leitner.jpg",
  },
];

export function getLeadership(): TeamMember[] {
  return team.filter((m) => m.leadership);
}

// ─── Company photos ───────────────────────────────────────────────────────────
// Single shared pool used by the homepage "More than a platform" band and the
// About page carousel. Warehouse first (the visual hook). One source — both
// carousels stay in sync.

export interface CompanyPhoto {
  src: string;
  alt: string;
}

export const companyPhotos: CompanyPhoto[] = [
  { src: "/about/warehouse.jpg", alt: "Aerial view of the ITD Global headquarters and warehouse" },
  { src: "/about/team-training.jpg", alt: "The ITD Global team in a standards and expectations session" },
  { src: "/about/account-update.jpg", alt: "The ITD Global account management team in a weekly update" },
  { src: "/about/green-wall.jpg", alt: "Two ITD Global team members reviewing shipping data together" },
  { src: "/about/team-meeting.jpg", alt: "ITD Global team members in discussion under the company logo" },
  { src: "/about/resellers-talk.jpg", alt: "An ITD Global team member presenting carrier pricing" },
  { src: "/about/staircase-mural.jpg", alt: "ITD Global colleagues reviewing a tablet by the company mural" },
];

export function getWiderTeam(): TeamMember[] {
  return team.filter((m) => !m.leadership);
}

export const industries = ["eCommerce", "Marketplace", "3PL", "Export", "Import", "B2B", "Freight"] as const;

export function getCaseStudies(industry?: string) {
  if (!industry || industry === "All") return caseStudies;
  return caseStudies.filter((cs) => cs.industry === industry);
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getIntegrations(type?: string, category?: string) {
  let result = integrations;
  if (type) result = result.filter((i) => i.type === type);
  if (category) result = result.filter((i) => i.category === category);
  return result;
}

// ─── Content indexing helpers ────────────────────────────────────────────────
// Pure functions over the static `caseStudies` array. Pages should query these
// instead of indexing `caseStudies[N]` positionally — see "Content Indexing
// System" plan + the matching website-builder skill rule.

export function getCaseStudiesByShippingType(t: ShippingType): CaseStudy[] {
  return caseStudies.filter((cs) => cs.shippingTypes?.includes(t));
}

export function getCaseStudiesBySolution(s: SolutionTag): CaseStudy[] {
  return caseStudies.filter((cs) => cs.solutions?.includes(s));
}

export function getCaseStudiesByCarrier(slug: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.carriers?.includes(slug));
}

export function getCaseStudiesByIntegration(slug: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.integrations?.includes(slug));
}

// ─── LINKED_ENTITIES — slug → displayable record ─────────────────────────────
// Resolves carrier / integration / platform / shipping slugs (used in case
// study taxonomies) to a click-through chip: { name, logo, href }.
// Carriers with detail pages route to `/integrations/carriers/{slug}`;
// integrations without detail pages route to their category landing.

export interface LinkedEntity {
  name: string;
  logo?: string;
  href: string;
  kind: "carrier" | "integration" | "platform" | "shipping";
}

const LINKED_ENTITIES: Record<string, LinkedEntity> = {
  // Carriers (detail-page where available)
  "dpd": { name: "DPD", logo: "/logos/carriers/DPD-LOGO.png", href: "/integrations/carriers/dpd", kind: "carrier" },
  "evri": { name: "Evri", logo: "/logos/carriers/evri_logo.png", href: "/integrations/carriers/evri", kind: "carrier" },
  "royal-mail": { name: "Royal Mail", logo: "/logos/carriers/royal-mail-icon.png", href: "/integrations/carriers/royal-mail", kind: "carrier" },
  "parcelforce": { name: "Parcelforce", logo: "/logos/carriers/parcel-force.svg", href: "/integrations/carriers/parcel-force", kind: "carrier" },
  "amazon-shipping": { name: "Amazon Shipping", logo: "/logos/carriers/amazonshipping_logo.png", href: "/integrations/carriers/amazon-shipping", kind: "carrier" },
  "inpost": { name: "InPost", logo: "/logos/carriers/inpost-icon.png", href: "/integrations/carriers/inpost", kind: "carrier" },
  "dhl": { name: "DHL", logo: "/logos/carriers/dhl_logo.webp", href: "/integrations/carriers/dhl", kind: "carrier" },
  "fedex": { name: "FedEx", logo: "/logos/carriers/fedex-icon.png", href: "/integrations/carriers/fedex", kind: "carrier" },
  "ups": { name: "UPS", logo: "/logos/carriers/ups_logo.png", href: "/integrations/carriers/ups", kind: "carrier" },
  // SF Express has no detail page yet — fall back to the carriers index.
  "sf-express": { name: "SF Express", href: "/integrations/carriers", kind: "carrier" },
  "apc": { name: "APC", logo: "/logos/carriers/apc_logo.png", href: "/integrations/carriers/apc", kind: "carrier" },
  "starlinks": { name: "Starlinks", logo: "/logos/carriers/starlinks_logo.png", href: "/integrations/carriers/starlinks", kind: "carrier" },

  // Tech integrations — link to the entity's own detail page (/integrations/tech/{slug},
  // rendered by the dynamic [slug] route), NOT a category landing.
  "mintsoft": { name: "Mintsoft", logo: "/logos/ecommerce/mintsoft-icon.png", href: "/integrations/tech/mintsoft", kind: "integration" },
  "linnworks": { name: "Linnworks", logo: "/logos/erp-wms/linnworks_logo.png", href: "/integrations/tech/linnworks", kind: "integration" },
  "netsuite": { name: "NetSuite", logo: "/logos/erp-wms/netsuite-icon.png", href: "/integrations/tech/netsuite", kind: "integration" },
  "shopify": { name: "Shopify", logo: "/logos/ecommerce/shopify_logo.png", href: "/integrations/tech/shopify", kind: "integration" },
  "veeqo": { name: "Veeqo", logo: "/logos/ecommerce/veeqo-icon.webp", href: "/integrations/tech/veeqo", kind: "integration" },
  "shipstation": { name: "ShipStation", logo: "/logos/erp-wms/shipstation_logo.png", href: "/integrations/tech/shipstation", kind: "integration" },

  // Platform (ITD itself)
  "connexx": { name: "Connexx", href: "/connexx", kind: "platform" },

  // Shipping types (when used in chip rows on case-study detail pages)
  "shipping:domestic": { name: "UK Domestic", href: "/shipping/domestic", kind: "shipping" },
  "shipping:international-export": { name: "International Export", href: "/shipping/international", kind: "shipping" },
  "shipping:international-import": { name: "International Import", href: "/shipping/international", kind: "shipping" },
  "shipping:freight": { name: "Freight", href: "/shipping/freight", kind: "shipping" },
};

export function resolveEntity(slug: string): LinkedEntity | null {
  return LINKED_ENTITIES[slug] ?? null;
}

/**
 * Map an entity DISPLAY NAME (as shown in chips, comparison rows, carousels) to
 * its canonical detail-page URL — the single source of truth for click-through
 * across the site. Returns null when no detail page exists (render plain text).
 *
 * A detail page exists iff the entity is in `integrations[]` (the dynamic
 * /integrations/{tech,carriers}/[slug] routes generate from there). Display
 * variants that don't match an entry verbatim are normalised via ENTITY_ALIASES.
 */
const ENTITY_ALIASES: Record<string, string> = {
  "dhl express": "DHL",
  "royal mail international": "Royal Mail",
  "parcelforce international": "Parcel Force",
  "parcelforce": "Parcel Force",
};

export function entityHref(displayName: string): string | null {
  const raw = displayName.trim();
  if (raw.toLowerCase() === "connexx") return "/connexx";
  const canonical = ENTITY_ALIASES[raw.toLowerCase()] ?? raw;
  const entry = integrations.find(
    (i) => i.name.toLowerCase() === canonical.toLowerCase(),
  );
  if (!entry) return null;
  const slug = getIntegrationSlug(entry);
  return entry.type === "carrier"
    ? `/integrations/carriers/${slug}`
    : `/integrations/tech/${slug}`;
}

/** Map a ShippingType enum to its LINKED_ENTITIES slug. */
export function shippingTypeSlug(t: ShippingType): string {
  switch (t) {
    case "Domestic": return "shipping:domestic";
    case "International Export": return "shipping:international-export";
    case "International Import": return "shipping:international-import";
    case "Freight": return "shipping:freight";
  }
}
