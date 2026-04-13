// Static data — will be replaced with PostgreSQL/Prisma queries later

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
    slug: "peak-ecommerce",
    brandName: "Peak Commerce",
    industry: "eCommerce",
    headline: "Peak Commerce slashed shipping costs by 42% across 12 markets",
    metric: "42% cost reduction",
    summary: "Multi-carrier rate comparison and automated label generation eliminated manual processes and unlocked volume discounts.",
    challenge: "Peak Commerce was managing 8 carriers manually across 12 markets. Each carrier had its own portal, its own label format, and its own tracking system. The operations team spent 3 hours daily just generating labels and reconciling shipments. Costs were ballooning because they couldn't compare rates at scale.",
    solution: "ITD's Connexx platform unified all 8 carriers into a single dashboard. Automated rate comparison runs on every shipment, selecting the optimal carrier based on cost, speed, and destination. Label generation dropped from manual entry to one-click batch processing. Real-time tracking feeds into a single view for the entire CS team.",
    result: "Shipping costs dropped 42% in the first quarter. Label generation time went from 3 hours to 15 minutes daily. Customer WISMO tickets fell 68% as tracking became proactive. The team reinvested the saved hours into growth initiatives.",
    quote: "We went from drowning in carrier portals to having complete control. Connexx didn't just save us money — it gave us back our time.",
    quoteAuthor: "Sarah Chen, Head of Operations at Peak Commerce",
  },
  {
    id: "2",
    slug: "velocity-marketplace",
    brandName: "Velocity Sellers",
    industry: "Marketplace",
    headline: "Velocity Sellers tripled fulfilment speed across Amazon and eBay",
    metric: "3x faster fulfilment",
    summary: "Unified multi-marketplace order routing and carrier selection reduced average ship time from 72 to 24 hours.",
    challenge: "Velocity Sellers operates across Amazon, eBay, and three regional marketplaces. Each platform had different shipping requirements, label formats, and SLA deadlines. Orders were falling through the cracks, leading to late shipments and penalty fees averaging $12,000/month.",
    solution: "Connexx's marketplace integration pulled all orders into a single queue with automated carrier assignment based on each platform's SLA requirements. Smart routing ensured the fastest compliant carrier was selected for each order, and batch processing handled peak volumes without manual intervention.",
    result: "Average fulfilment time dropped from 72 hours to 24 hours. Marketplace penalty fees were eliminated entirely. Seller ratings improved from 94% to 99.2% across all platforms. The team scaled from 200 to 800 daily orders without adding headcount.",
    quote: "Every marketplace has different rules. Connexx made them all feel like one system. Our penalty fees went to zero overnight.",
    quoteAuthor: "Marcus Webb, Founder of Velocity Sellers",
  },
  {
    id: "3",
    slug: "swiftlog-3pl",
    brandName: "SwiftLog Fulfilment",
    industry: "3PL",
    headline: "SwiftLog achieved 98.7% shipment accuracy with automated compliance",
    metric: "98.7% accuracy",
    summary: "Automated customs documentation and carrier compliance checks eliminated manual errors across 40+ destination countries.",
    challenge: "SwiftLog handles fulfilment for 60 brands shipping to 40+ countries. Customs documentation was created manually, leading to a 7% error rate that caused delays, fines, and angry end customers. Each brand had different packaging requirements and carrier preferences, making standardisation impossible.",
    solution: "Connexx automated customs documentation with country-specific rules engines. Each brand's preferences were configured once and applied automatically to every shipment. Compliance checks run before label generation, catching errors before they reach the carrier. Multi-brand analytics gave SwiftLog visibility across all clients.",
    result: "Shipment accuracy jumped from 93% to 98.7%. Customs-related delays dropped 85%. Client onboarding time decreased from 2 weeks to 2 days. SwiftLog added 15 new brands in the first year without expanding their operations team.",
    quote: "Our accuracy was our biggest vulnerability. Now it's our strongest selling point. We close new clients by showing them the Connexx dashboard.",
    quoteAuthor: "James Thornton, Managing Director at SwiftLog Fulfilment",
  },
  {
    id: "4",
    slug: "meridian-exports",
    brandName: "Meridian Trade Co",
    industry: "Export",
    headline: "Meridian reduced export documentation time by 75%",
    metric: "75% time saved",
    summary: "Automated export compliance and carrier booking eliminated the paperwork bottleneck for international shipments.",
    challenge: "Meridian Trade Co exports industrial equipment to 25 countries. Each shipment required 6–8 documents, manually prepared by a team of three. Regulatory changes across markets meant constant rework, and a single documentation error could hold shipments at customs for days.",
    solution: "Connexx's export module auto-generates all required documentation based on HS codes, destination country, and shipment value. Regulatory updates are applied automatically. The platform books carriers and schedules pickups in the same workflow, eliminating the gap between documentation and dispatch.",
    result: "Documentation preparation time dropped from 4 hours to 1 hour per shipment. Customs holds due to paperwork errors dropped 90%. The documentation team was redeployed to handle a 40% increase in export volume without new hires.",
    quote: "We used to dread regulatory changes. Now the system handles them before we even know they've happened.",
    quoteAuthor: "Anna Kovacs, Export Manager at Meridian Trade Co",
  },
  {
    id: "5",
    slug: "northgate-import",
    brandName: "Northgate Imports",
    industry: "Import",
    headline: "Northgate cut clearance delays by 60% with automated customs",
    metric: "60% fewer delays",
    summary: "Pre-clearance documentation and duty calculation ensured shipments moved through customs without holds or surprises.",
    challenge: "Northgate imports consumer goods from 8 countries into the UK and EU. Customs clearance was unpredictable — one in four shipments faced delays due to incorrect tariff classifications or missing documentation. Duty costs were estimated manually, leading to budget overruns.",
    solution: "Connexx's import compliance engine automatically classifies goods, calculates duties, and pre-generates all customs documentation before shipments arrive. Real-time tracking shows exactly where each shipment is in the clearance process, and automated alerts flag any issues before they cause delays.",
    result: "Customs delays dropped 60%. Duty cost accuracy improved from 82% to 97%, eliminating budget surprises. Average clearance time went from 3 days to 1 day. The finance team finally had reliable landed cost data for pricing decisions.",
    quote: "Knowing the exact duty cost before goods arrive changed how we price everything. No more margin erosion from surprise charges.",
    quoteAuthor: "David Park, Operations Director at Northgate Imports",
  },
  {
    id: "6",
    slug: "atlas-b2b",
    brandName: "Atlas Industrial",
    industry: "B2B Manufacturing",
    headline: "Atlas Industrial automated 90% of wholesale shipment routing",
    metric: "90% automated routing",
    summary: "Rule-based carrier selection and ERP integration eliminated manual dispatch decisions for high-volume B2B orders.",
    challenge: "Atlas Industrial ships 500+ palletised orders weekly to distributors and retailers. Carrier selection was done manually based on weight, destination, and delivery window. The dispatch team spent most of their day on the phone with carriers, and routing errors led to $8,000/month in redelivery costs.",
    solution: "Connexx integrated directly with Atlas's ERP system. When an order is confirmed, the platform automatically selects the optimal carrier based on pre-configured rules (weight tiers, delivery windows, cost thresholds). Booking confirmations and tracking numbers flow back into the ERP without manual entry.",
    result: "90% of shipments are now routed automatically. Redelivery costs dropped to near zero. The dispatch team handles 3x the volume with the same headcount. ERP integration eliminated 20 hours/week of manual data entry.",
    quote: "Our dispatch team used to be on the phone all day. Now the system does the routing and they focus on exceptions. It's a completely different operation.",
    quoteAuthor: "Robert Hayes, Supply Chain Director at Atlas Industrial",
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
  { id: "c4", name: "Royal Mail", category: "carrier", type: "carrier", region: "UK", featured: true, description: "UK postal service", logo: "/logos/carriers/royalmail_logo.png" },
  { id: "c5", name: "DPD", category: "carrier", type: "carrier", region: "EU", featured: true, description: "European parcel delivery", logo: "/logos/carriers/dpd_logo.png" },
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
];

export const industries = ["eCommerce", "Marketplace", "3PL", "Export", "Import", "B2B Manufacturing"] as const;

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
