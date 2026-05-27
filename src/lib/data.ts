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
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  type: "tech" | "carrier";
  region?: string;
  featured: boolean;
  description?: string;
  logo?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "tatti-lashes",
    brandName: "Tatti Lashes",
    industry: "eCommerce",
    headline: "Tatti Lashes shifted 60% of volume to a cheaper carrier without losing the next-day option",
    metric: "60% volume shift",
    summary: "Adding Evri alongside DPD through Connexx gave Tatti Lashes a true multi-carrier setup, customer delivery choice at checkout, and immediate margin recovery on every order.",
    challenge: "Tatti Lashes were running their entire order base on a single next-day service through DPD. Every parcel went out at the same rate regardless of urgency, and the business was absorbing part of that cost to stay competitive. With no economy option and no data on how customers would react to a slower service, adding a second carrier felt like a risk the team couldn't quantify.",
    solution: "ITD Global introduced Evri alongside DPD via Connexx, giving Tatti Lashes a genuine multi-carrier setup with both 24hr and 48hr service options. Customers could now choose their delivery at checkout. The Mintsoft integration via Connexx was plug-and-play. Dedicated vans were allocated quickly, and the brand was live before peak trading season.",
    result: "60% of Tatti Lashes' volume transferred to Evri — a figure that surprised the team. Evri now handles the majority of their domestic parcel volume, with DPD retained for customers selecting the premium next-day service. Per-order shipping costs dropped significantly across the cheaper service, margins came back under control, and the brand entered peak with capacity already proven.",
    heroImage: "/case-studies/tatti-lashes/hero.png",
    logo: "/case-studies/tatti-lashes/logo.png",
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
    logo: "/case-studies/west-ham-united/logo.webp",
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
    brandName: "Arlo Fulfilment",
    industry: "Export",
    headline: "Arlo Fulfilment unlocked international shipping for their clients without building it themselves",
    metric: "International unlocked",
    summary: "Adding FedEx International Priority through ITD Global gave Arlo a fully managed, commercially competitive international shipping proposition — turning a gap in their offering into a competitive advantage.",
    challenge: "Arlo's clients were increasingly demanding international shipping, but Arlo had no scalable, competitive solution to offer them. Going direct to carriers as a smaller 3PL meant unfavourable rates and limited service options. Turning clients away or pointing them elsewhere risked damaging relationships and losing accounts. The gap in their offering was beginning to limit Arlo's ability to grow their client base.",
    solution: "Partnering with ITD Global gave Arlo immediate access to a competitive, fully managed international shipping solution without the complexity of building it themselves. ITD introduced FedEx International Priority into Arlo's carrier mix, with the carrier relationship handled end-to-end by ITD — so Arlo's team could focus on fulfilment. ITD's consolidated buying power unlocked volume-backed rates that wouldn't have been accessible going direct.",
    result: "Arlo can now confidently offer a fast, reliable, and commercially competitive international shipping service as part of their core proposition, enabling their clients to sell into global markets and opening a new dimension of growth for the business.",
    heroImage: "/case-studies/arlo-fulfilment/hero.png",
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
    brandName: "Home Bargains",
    industry: "Import",
    headline: "Home Bargains reduced sample shipping costs by 30–35% with weekly China consolidation",
    metric: "30–35% cost reduction",
    summary: "ITD Global replaced 60 buyers' fragmented sample shipments with one weekly consolidated air freight from China — guaranteed Tuesday delivery, single accountability, and significant annual savings.",
    challenge: "Home Bargains' buying team is 60 buyers sourcing from 200+ factories across China. Each buyer was managing sample shipments independently on a shared account number with no central oversight. Costs were spiralling. Visibility was non-existent. Samples arrived inconsistently — sometimes sitting uncollected for days or weeks. For a discount retailer with relentless product velocity, the lack of a structured international shipping solution was a real operational liability.",
    solution: "ITD Global replaced the fragmented process with a single, structured weekly parcel consolidation service built around Home Bargains' buying cycle. ITD's China team collects samples via SF Express from any factory across China, Monday to Thursday, into ITD's warehouse — then consolidates into one weekly air freight shipment to the UK. One logistics partner. One process. One weekly delivery.",
    result: "30 to 35% reduction in annual shipping costs by grouping individual express shipments into one weekly consolidated consignment. Guaranteed Tuesday delivery for every buyer, every week — replacing chaos with a predictable rhythm the team could plan around. Full visibility across all 60 buyers and 200 factories, and one accountable point of contact instead of hundreds of fragmented relationships.",
    heroImage: "/case-studies/home-bargains/hero.webp",
    logo: "/case-studies/home-bargains/logo.png",
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
    logo: "/case-studies/pb-fulfilment/logo.png",
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
    brandName: "Sainsbury's & Argos",
    industry: "Import",
    headline: "Sainsbury's & Argos solved customs compliance and reduced carrier dependency across China",
    metric: "Compliance at origin",
    summary: "ITD Global's team on the ground in China standardised factory documentation and introduced FedEx International Priority — eliminating customs delays and giving Sainsbury's & Argos genuine courier flexibility for the first time.",
    challenge: "Sainsbury's and Argos source from hundreds of factories across China through two offices in Hong Kong and Shanghai, with no standardised process for managing international shipments. Factories were unclear about which parcels and samples belonged to which brand, leading to mislabelling, misrouting, and customs delays. The team was managing all international express through DHL Express with no benchmarking, no visibility over costs, and no alternative service options — paying more than they needed to with no specialist support to challenge it.",
    solution: "ITD Global placed their own team on the ground in China and took ownership of the compliance process end-to-end. We reviewed factory paperwork, identified the gaps, and created a standardised documentation template built for a multi-brand environment — giving each factory a clear process for identifying which shipment belonged to which brand. We also introduced FedEx International Priority as a more commercially competitive option, giving Sainsbury's and Argos genuine courier flexibility backed by a single logistics partner managing everything from China to the UK.",
    result: "Customs compliance owned and solved at origin — the standardised factory template removed the ambiguity that had been causing customs holds. Multi-brand clarity built into the process so shipments moved through the right channels every time. Movement away from a single DHL Express contract unlocked more commercially appropriate FedEx International Priority rates. And one accountable logistics partner now manages everything across both brands and both offices.",
    heroImage: "/case-studies/sainsburys-argos/hero.webp",
    logo: "/case-studies/sainsburys-argos/logo.png",
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
    brandName: "Freedom Fire",
    industry: "eCommerce",
    headline: "Freedom Fire unlocked full shipping visibility with Connexx Shipment Reports",
    metric: "Real-time shipment data",
    summary: "Connecting Linnworks to ITD Global's multi-carrier network via Connexx gave Freedom Fire DG-approved carriers, dedicated account management, competitive rates across Yodel/Evri/Royal Mail, and — for the first time — real visibility of their parcel data.",
    challenge: "Freedom Fire is a UK online retailer of fire safety, security, and PPE equipment. As volume grew, the parcel operation hadn't kept pace. Without clear data, the team had no reliable way to see what was being shipped, where, how it was performing, or what it was costing them. Decisions were made without insight. Issues were discovered late. And with no dedicated point of contact at their existing reseller, there was nobody to turn to when things needed investigating. For a business shipping Dangerous Goods volumes, the absence of shipment tracking and reporting was a real operational liability.",
    solution: "ITD Global connected Freedom Fire's Linnworks platform to ITD's multi-carrier network via Connexx — a single integrated eCommerce shipping workflow and, for the first time, real visibility of parcel data through Shipment Reports. Alongside the integration: Dangerous Goods approvals handled with Yodel, competitive rates across Yodel (DG Approved), Evri, and Royal Mail, and a dedicated account manager to keep everything running smoothly.",
    result: "Full DG compliance and management through Yodel (something previous resellers couldn't provide). A single dedicated account manager who knows the operation inside out. Commercially competitive rates that weren't available going direct. And complete, real-time visibility through Shipment Reports — performance tracking, SLA monitoring, and a single source of truth for every parcel.",
    stats: [
      { value: "Real-time", label: "Shipment data via Connexx", sub: "performance, SLAs, single source of truth", featured: true },
      { value: "DG approved", label: "Dangerous Goods compliance", sub: "managed through Yodel" },
      { value: 3, label: "Active carriers", sub: "Yodel (DG), Evri, Royal Mail" },
    ],
    atGlance: [
      { label: "Industry", value: "Fire Safety & Security retail" },
      { label: "Market", value: "UK Domestic" },
      { label: "Carriers", value: "Yodel (DG Approved), Evri, Royal Mail" },
      { label: "Integration", value: "Linnworks via Connexx" },
      { label: "Key Feature", value: "Shipment Reports + dedicated account manager" },
    ],
    shippingTypes: ["Domestic"],
    carriers: ["yodel", "evri", "royal-mail"],
    integrations: ["linnworks", "connexx"],
    solutions: ["eCommerce", "Small Business"],
  },
];

export const integrations: Integration[] = [
  // Tech — ERP/WMS
  { id: "t1", name: "SAP", category: "erp_wms", type: "tech", featured: true, description: "Enterprise ERP integration" },
  { id: "t2", name: "Oracle NetSuite", category: "erp_wms", type: "tech", featured: true, description: "Cloud ERP connector" },
  { id: "t3", name: "Microsoft Dynamics", category: "erp_wms", type: "tech", featured: false, description: "Dynamics 365 integration" },
  { id: "t4", name: "Sage", category: "erp_wms", type: "tech", featured: false, description: "Sage accounting & ERP" },
  { id: "t5", name: "Cin7", category: "erp_wms", type: "tech", featured: false, description: "Inventory & warehouse management" },
  { id: "t19", name: "Linnworks", category: "erp_wms", type: "tech", featured: false, description: "Multi-channel order management", logo: "/logos/erp-wms/linnworks_logo.png" },
  { id: "t20", name: "Mintsoft", category: "erp_wms", type: "tech", featured: false, description: "Warehouse management system", logo: "/logos/erp-wms/mintsoft_logo.png" },
  { id: "t21", name: "Selro", category: "erp_wms", type: "tech", featured: false, description: "Multi-channel eCommerce management", logo: "/logos/erp-wms/selro_logo.png" },
  { id: "t22", name: "ShipHero", category: "erp_wms", type: "tech", featured: false, description: "Warehouse & shipping management", logo: "/logos/erp-wms/shiphero_logo.png" },
  { id: "t23", name: "StoreFeeder", category: "erp_wms", type: "tech", featured: false, description: "Multi-channel listing & order management", logo: "/logos/erp-wms/storefeeder_logo.png" },
  { id: "t24", name: "Veeqo", category: "erp_wms", type: "tech", featured: false, description: "Inventory & shipping platform", logo: "/logos/erp-wms/veeqo_logo.png" },
  // Tech — Logistics
  { id: "t6", name: "ShipStation", category: "logistics", type: "tech", featured: true, description: "Shipping automation", logo: "/logos/erp-wms/shipstation_logo.png" },
  { id: "t7", name: "Shippo", category: "logistics", type: "tech", featured: false, description: "Multi-carrier API" },
  { id: "t8", name: "Freightview", category: "logistics", type: "tech", featured: false, description: "Freight rate comparison" },
  { id: "t9", name: "Project44", category: "logistics", type: "tech", featured: false, description: "Supply chain visibility" },
  // Tech — eCommerce
  { id: "t10", name: "Shopify", category: "ecommerce", type: "tech", featured: true, description: "eCommerce platform", logo: "/logos/ecommerce/shopify_logo.png" },
  { id: "t11", name: "WooCommerce", category: "ecommerce", type: "tech", featured: true, description: "WordPress commerce", logo: "/logos/erp-wms/woocommerce_logo.svg" },
  { id: "t12", name: "Magento", category: "ecommerce", type: "tech", featured: false, description: "Adobe Commerce" },
  { id: "t13", name: "BigCommerce", category: "ecommerce", type: "tech", featured: false, description: "SaaS eCommerce" },
  // Tech — Marketplaces
  { id: "t14", name: "Amazon", category: "marketplace", type: "tech", featured: true, description: "Amazon Seller Central", logo: "/logos/marketplaces/amazon_logo.png" },
  { id: "t15", name: "eBay", category: "marketplace", type: "tech", featured: true, description: "eBay seller integration", logo: "/logos/marketplaces/ebay_logo.png" },
  { id: "t16", name: "Etsy", category: "marketplace", type: "tech", featured: false, description: "Etsy shop connector", logo: "/logos/marketplaces/etsy_logo.png" },
  { id: "t17", name: "Walmart", category: "marketplace", type: "tech", featured: false, description: "Walmart Marketplace" },
  { id: "t18", name: "Zalando", category: "marketplace", type: "tech", featured: false, description: "European fashion marketplace" },
  { id: "t25", name: "Temu", category: "marketplace", type: "tech", featured: false, description: "Global online marketplace", logo: "/logos/marketplaces/temu_logo.webp" },
  { id: "t26", name: "TikTok Shop", category: "marketplace", type: "tech", featured: false, description: "Social commerce marketplace", logo: "/logos/marketplaces/tiktok_logo.png" },
  // Carriers
  { id: "c1", name: "DHL Express", category: "carrier", type: "carrier", region: "Global", featured: true, description: "International express", logo: "/logos/carriers/dhl_logo.webp" },
  { id: "c2", name: "FedEx", category: "carrier", type: "carrier", region: "Global", featured: true, description: "Global parcel & freight", logo: "/logos/carriers/fedex_logo.png" },
  { id: "c3", name: "UPS", category: "carrier", type: "carrier", region: "Global", featured: true, description: "Worldwide delivery", logo: "/logos/carriers/ups_logo.png" },
  { id: "c4", name: "Royal Mail", category: "carrier", type: "carrier", region: "UK", featured: true, description: "UK postal service", logo: "/logos/carriers/Royal-Mail-Logo.png" },
  { id: "c5", name: "DPD", category: "carrier", type: "carrier", region: "EU", featured: true, description: "European parcel delivery", logo: "/logos/carriers/DPD-LOGO.png" },
  { id: "c6", name: "Evri", category: "carrier", type: "carrier", region: "UK", featured: true, description: "UK parcel delivery", logo: "/logos/carriers/evri_logo.png" },
  { id: "c13", name: "Amazon Shipping", category: "carrier", type: "carrier", region: "UK", featured: true, description: "Amazon logistics network", logo: "/logos/carriers/amazonshipping_logo.png" },
  { id: "c7", name: "TNT", category: "carrier", type: "carrier", region: "EU", featured: false, description: "European express" },
  { id: "c8", name: "Aramex", category: "carrier", type: "carrier", region: "Global", featured: false, description: "Middle East & global" },
  { id: "c9", name: "PostNL", category: "carrier", type: "carrier", region: "EU", featured: false, description: "Netherlands & EU postal" },
  { id: "c10", name: "Yodel", category: "carrier", type: "carrier", region: "UK", featured: false, description: "UK delivery", logo: "/logos/carriers/yodel_logo.avif" },
  { id: "c11", name: "GLS", category: "carrier", type: "carrier", region: "EU", featured: false, description: "European parcel" },
  { id: "c12", name: "Australia Post", category: "carrier", type: "carrier", region: "Global", featured: false, description: "Australian postal" },
  { id: "c14", name: "DHL Parcel", category: "carrier", type: "carrier", region: "EU", featured: false, description: "European parcel delivery", logo: "/logos/carriers/dhlparcel_logo.svg" },
  { id: "c15", name: "Deutsche Post", category: "carrier", type: "carrier", region: "EU", featured: false, description: "German postal service", logo: "/logos/carriers/deutschepost_logo.avif" },
  { id: "c16", name: "Evri EU", category: "carrier", type: "carrier", region: "EU", featured: false, description: "European parcel delivery", logo: "/logos/carriers/evrieu_logo.png" },
  { id: "c17", name: "InPost", category: "carrier", type: "carrier", region: "EU", featured: true, description: "Parcel locker delivery network", logo: "/logos/carriers/InPost_Logo_yellow.png" },
  { id: "c18", name: "Parcel Force", category: "carrier", type: "carrier", region: "UK", featured: true, description: "UK tracked parcel delivery", logo: "/logos/carriers/parcel-force.svg" },
];

export const industries = ["eCommerce", "Marketplace", "3PL", "Export", "Import", "B2B"] as const;

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
  "royal-mail": { name: "Royal Mail", logo: "/logos/carriers/Royal-Mail-Logo.png", href: "/integrations/carriers/royal-mail", kind: "carrier" },
  "parcelforce": { name: "Parcelforce", logo: "/logos/carriers/parcel-force.svg", href: "/integrations/carriers/parcelforce", kind: "carrier" },
  "amazon-shipping": { name: "Amazon Shipping", logo: "/logos/carriers/amazonshipping_logo.png", href: "/integrations/carriers/amazon-shipping", kind: "carrier" },
  "yodel": { name: "Yodel", logo: "/logos/carriers/yodel_logo.avif", href: "/integrations/carriers", kind: "carrier" },
  "dhl": { name: "DHL", logo: "/logos/carriers/dhl_logo.webp", href: "/integrations/carriers/dhl", kind: "carrier" },
  "fedex": { name: "FedEx", logo: "/logos/carriers/fedex_logo.png", href: "/integrations/carriers", kind: "carrier" },
  "ups": { name: "UPS", logo: "/logos/carriers/ups_logo.png", href: "/integrations/carriers", kind: "carrier" },
  "sf-express": { name: "SF Express", href: "/integrations/carriers", kind: "carrier" },

  // Tech integrations (no per-integration detail pages — route to category)
  "mintsoft": { name: "Mintsoft", logo: "/logos/erp-wms/mintsoft_logo.png", href: "/integrations/erp-wms", kind: "integration" },
  "linnworks": { name: "Linnworks", logo: "/logos/erp-wms/linnworks_logo.png", href: "/integrations/erp-wms", kind: "integration" },
  "shopify": { name: "Shopify", logo: "/logos/ecommerce/shopify_logo.png", href: "/integrations/ecommerce", kind: "integration" },
  "veeqo": { name: "Veeqo", logo: "/logos/erp-wms/veeqo_logo.png", href: "/integrations/erp-wms", kind: "integration" },
  "shipstation": { name: "ShipStation", logo: "/logos/erp-wms/shipstation_logo.png", href: "/integrations/logistics", kind: "integration" },

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

/** Map a ShippingType enum to its LINKED_ENTITIES slug. */
export function shippingTypeSlug(t: ShippingType): string {
  switch (t) {
    case "Domestic": return "shipping:domestic";
    case "International Export": return "shipping:international-export";
    case "International Import": return "shipping:international-import";
    case "Freight": return "shipping:freight";
  }
}
