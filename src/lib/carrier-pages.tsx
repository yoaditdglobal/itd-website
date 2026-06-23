import { Zap, Eye, Globe, Clock, BarChart3, ShieldCheck } from "lucide-react";
import type { CarrierPageProps } from "@/components/sections/CarrierPage";
import type { Integration } from "@/lib/data";
import { getIntegrationSlug } from "@/lib/data";

/**
 * Per-carrier content for the dedicated carrier pages, rendered through the
 * shared CarrierPage layout (same format as DHL / Evri / DPD).
 *
 * `getCarrierPageContent` returns presentable, on-format defaults derived from
 * the integration record. Drop real copy in per carrier via CARRIER_PAGE_OVERRIDES
 * (keyed by slug) — anything you set there replaces the default.
 */

export type CarrierContent = Omit<CarrierPageProps, "name" | "logo">;

const REGION_DISPLAY: Record<string, string> = {
  Domestic: "Domestic (UK)",
  International: "International",
};

/** Carrier-agnostic "+ ITD" value props — fit any carrier; replace as needed. */
const DEFAULT_FEATURES: CarrierContent["features"] = [
  { icon: Zap, title: "Automated label generation", desc: "Generate labels with the correct service and weight tier applied automatically." },
  { icon: Eye, title: "Live tracking", desc: "Track every parcel from one ITD dashboard with proactive customer notifications." },
  { icon: BarChart3, title: "Rate optimisation", desc: "Auto-select the cheapest compliant service on every order against your rules." },
  { icon: Clock, title: "Collection booking", desc: "Schedule collections and manage pickup windows directly in ITD." },
  { icon: ShieldCheck, title: "Proof of delivery", desc: "Access digital signatures and photo proof of delivery from the dashboard." },
  { icon: Globe, title: "Multi-carrier intelligence", desc: "Compare this carrier against every other in your account on each shipment." },
];

const DEFAULT_SERVICES = [
  "Tracked delivery",
  "Express / next-day",
  "Standard / economy",
  "Returns service",
  "Collection booking",
  "Proof of delivery",
];

/** Standard rates line — identical across every carrier page. */
export const RATES_FEATURE: CarrierContent["features"][number] = {
  icon: BarChart3,
  title: "Carrier rates managed by ITD",
  desc: "ITD manages the carrier relationship and rates on your behalf. The rates on each shipment reflect network-scale buying power, not what a single business account achieves independently.",
};

/** Per-carrier overrides, keyed by slug. Fill these in with real content. */
export const CARRIER_PAGE_OVERRIDES: Record<string, Partial<CarrierContent>> = {
  "deutsche-post": {
    tagline:
      "Tracked international postal delivery to over 220 countries, built for cross-border eCommerce at volume.",
    description:
      "Deutsche Post is the postal and international logistics division of Deutsche Post DHL Group, specialising in cross-border mail and parcel delivery through established international postal networks. For UK eCommerce businesses shipping lightweight goods to international customers at volume, Deutsche Post provides cost-effective tracked delivery with wide global coverage. Through ITD, you access Deutsche Post services on rates managed at network scale.",
    about: [
      "Deutsche Post is the international parcels and business mail arm of Deutsche Post DHL Group — the world's largest logistics company. It operates through a network of postal partnerships in destination countries, enabling cost-effective tracked delivery of letters, documents, and lightweight parcels to over 220 countries and territories. In the UK, Deutsche Post's services are used primarily by eCommerce businesses shipping high volumes of lightweight goods internationally, where per-unit shipping cost is critical.",
      "Deutsche Post sits in a different part of the carrier mix to DHL Express. Where DHL Express is built for speed and B2B urgency, Deutsche Post is built for volume and cost-efficiency on lighter cross-border consignments. For businesses shipping subscription boxes, apparel, health and beauty, or other lightweight consumer products to international customers at regular volume, Deutsche Post's postal network provides a per-unit cost structure that express carriers cannot match.",
    ],
    features: [
      { icon: Globe, title: "Packet Tracked", desc: "Tracked international delivery for parcels up to 31.5kg. Electronic end-to-end tracking from despatch through to delivery. Delivered via trusted local postal networks at the destination." },
      { icon: Zap, title: "Warenpost International", desc: "Cost-effective tracked delivery for small-format goods to 220+ countries. Suited to lightweight eCommerce products — supplements, cosmetics, small accessories — shipped at high volume." },
      { icon: Eye, title: "International Business Mail", desc: "Tracked international mail and document delivery for business correspondence. Delivered via local postal partners in destination countries worldwide." },
      { icon: Clock, title: "Europe delivery: 2–6 working days", desc: "Standard international delivery to European destinations in 2-6 working days. Rest of World in 3-9 working days depending on destination." },
      RATES_FEATURE,
    ],
  },
  "evri-eu": {
    tagline: "Cost-effective tracked delivery from the UK into Europe and beyond.",
    description:
      "Evri EU extends Evri's UK parcel network into international markets, providing tracked delivery to Europe and over 200 countries worldwide. It uses a combination of air transport and local postal networks in destination countries to offer accessible international delivery for eCommerce businesses shipping lower-weight consumer parcels. Through ITD, you access Evri EU services on rates managed at network scale.",
    about: [
      "Evri EU is the international shipping division of Evri, one of the UK's largest parcel carriers. It provides tracked international delivery from the UK to destinations across Europe and globally — using established postal and courier partnerships in destination countries for last-mile delivery. Parcels up to 15kg are accepted, and drop-off is available through Evri's 10,000+ UK parcel shops and lockers.",
      "Evri EU is best suited to businesses shipping lighter consumer parcels internationally where cost per shipment is the priority. It occupies a similar position in international delivery to what Evri's Tracked 48 does domestically — a practical, cost-effective option for standard eCommerce volumes going into Europe, without the premium that express carriers charge. For businesses adding European delivery to their mix without significantly increasing per-shipment cost, it is a strong option to have available.",
    ],
    features: [
      { icon: Globe, title: "European Tracked", desc: "Tracked delivery to destinations across Europe in 3-7 working days. Coverage includes major markets such as France, Germany, Italy, Spain, Poland, and Greece." },
      { icon: Eye, title: "International Tracked", desc: "Tracked delivery to 200+ countries and territories worldwide. Delivery in 3-7 working days to most destinations, using local postal networks for last-mile delivery." },
      { icon: ShieldCheck, title: "Drop-off despatch", desc: "Parcels can be dropped at any of Evri's 10,000+ UK parcel shops and lockers for international despatch. No collection booking required." },
      { icon: Clock, title: "Up to 15kg", desc: "Accepts parcels up to 15kg across international services. Suitable for standard eCommerce products across most categories." },
      RATES_FEATURE,
    ],
  },
  apc: {
    tagline:
      "The UK's largest independent parcel network, with timed overnight delivery and specialist capability for fragile and high-value goods.",
    description:
      "APC Overnight is built on a network of over 90 independently owned UK depots, making it the largest independent parcel carrier in the country. It specialises in overnight and timed delivery, with options from standard next-day through to before-10am and Saturday services. Its depot model and handling standards make it the carrier of choice for businesses shipping fragile, liquid, or high-value items. Through ITD, you access APC's services on rates managed at network scale.",
    region: "United Kingdom",
    about: [
      "APC Overnight operates through a network of more than 90 member depots across the UK, delivering over one million parcels each month. Unlike national carriers with a single corporate structure, APC's depot model means each area is owned and operated by a local business which the network argues delivers a more accountable, relationship-based service at the local level. APC is particularly well regarded for its handling of specialist consignments, with dedicated processes for fragile goods, liquids, and high-value items.",
      "APC sits in the carrier mix for businesses whose products need more careful handling than a high-volume consumer parcel carrier provides. Glassware, ceramics, craft spirits, specialist equipment, and high-value electronics are typical product categories where APC is specified. Its 2-hour delivery window notification sent to the recipient on the day of delivery also makes it well-suited to businesses where customer delivery experience is a brand consideration, not just a logistics function.",
    ],
    services: [
      "APC Overnight (next-day by 5pm)",
      "Express by 10am",
      "Express by 12pm",
      "Saturday delivery",
      "Fragile & liquid handling",
      "Returns service",
    ],
    features: [
      { icon: Clock, title: "APC Overnight", desc: "Standard next working day delivery by 5pm across the UK. All deliveries include a 2-hour delivery window notification to the recipient on the morning of delivery." },
      { icon: Zap, title: "Express by 10am", desc: "Guaranteed delivery before 10am the next working day. For time-critical B2B shipments and businesses whose customers require a morning delivery commitment." },
      { icon: Clock, title: "Express by 12pm", desc: "Guaranteed delivery before 12pm the next working day. A mid-point timed option where an end-of-day window is too broad but a 10am commitment is not required." },
      { icon: ShieldCheck, title: "Saturday delivery", desc: "Next-day weekend delivery for businesses whose customers are unavailable during the working week. Available across APC's full UK network." },
      RATES_FEATURE,
    ],
    stats: [
      { label: "Coverage", value: "UK" },
      { label: "Network", value: "90+ local depots" },
      { label: "Volume", value: "1M+ parcels / month" },
      { label: "Specialism", value: "Timed & fragile" },
    ],
  },
  starlinks: {
    tagline:
      "Cross-border parcel delivery from the UK to Europe and worldwide, with domestic options across next-day, 48-hour, and 72-hour services.",
    description:
      "Starlinks Global is a cross-border delivery carrier combining UK domestic services with fast international transit into Europe and the rest of the world. Drop-off is available through Evri's 2,500+ UK collection points, and full tracking is included as standard across all services. Through ITD, you access Starlinks on rates managed at network scale, with the carrier relationship handled on your behalf.",
    region: "International",
    about: [
      "Starlinks Global provides tracked parcel delivery from the UK to over 200 countries, with a focus on accessible cross-border services for eCommerce businesses. Its international network delivers into key European destinations in 1-2 days and to Rest of World destinations in 1-3 days. For UK domestic despatch, it offers next-day, 48-hour, and 72-hour options, with parcels dropped at any of 2,500+ Evri-operated collection points across the country.",
      "Starlinks occupies a useful position for businesses that need a cost-effective cross-border option with fast European transit times and a convenient domestic drop-off network. Its integration with Evri's collection infrastructure removes the need for a dedicated courier collection for lower-volume international despatch, making it practical for businesses adding international delivery without the overhead of managing a separate collection arrangement.",
    ],
    services: [
      "UK next-day",
      "UK 48hr & 72hr",
      "European Express (1–2 days)",
      "Rest of World (1–3 days)",
      "Drop-off via 2,500+ points",
      "Tracked as standard",
    ],
    features: [
      { icon: Clock, title: "Next Day (UK domestic)", desc: "Next working day domestic delivery across the UK. Full end-to-end tracking included as standard." },
      { icon: Eye, title: "48hr & 72hr (UK domestic)", desc: "Cost-effective domestic delivery options for non-urgent shipments. Tracked throughout, with delivery in 2 or 3 working days." },
      { icon: Zap, title: "European Express (1–2 days)", desc: "Fast tracked delivery into key European markets in 1-2 working days. Suited to businesses with regular European volume requiring short transit times." },
      { icon: Globe, title: "Rest of World (1–3 days)", desc: "Tracked international delivery to 200+ countries in 1-3 working days for key destinations. Full tracking as standard across all international services." },
      RATES_FEATURE,
    ],
    stats: [
      { label: "Coverage", value: "200+ countries" },
      { label: "Europe transit", value: "1–2 days" },
      { label: "Drop-off points", value: "2,500+" },
      { label: "Tracking", value: "Standard" },
    ],
  },
  landmark: {
    tagline:
      "Cross-border parcel delivery and customs clearance to over 220 destinations worldwide.",
    description:
      "Landmark Global is the cross-border eCommerce logistics division of bpost, providing international parcel delivery with tracked postal injection and last-mile delivery via local carriers. It specialises in customs compliance, end-to-end tracking, and flexible service tiers for businesses shipping parcels internationally at volume. Through ITD, you access Landmark Global services on rates managed at network scale.",
    region: "International",
    about: [
      "Landmark Global was founded in California in 2004 and operates as the cross-border division of bpost, one of Europe's major postal groups. It delivers to over 220 countries and territories through a network of postal and carrier partnerships, combining fulfilment, logistics, and customs clearance in a single proposition. Its Mercury technology platform manages shipment routing from end to end.",
      "Landmark Global is built specifically for cross-border eCommerce at volume. Its service structure with multiple tiers covering different weight ranges, tracking levels, and duty handling options is designed for businesses that ship regularly to international customers and need customs compliance built into the delivery process. For UK businesses expanding into international markets or managing consistent cross-border volume, Landmark provides infrastructure that goes beyond a standard postal service.",
    ],
    services: [
      "MaxiPak (Lite/Standard/Premium)",
      "MiniPak (up to 2kg)",
      "Delivered Taxes Paid (DTP)",
      "IOSS for EU shipments",
      "Customs clearance",
      "End-to-end tracking",
    ],
    features: [
      { icon: Globe, title: "MaxiPak (Lite, Standard, Premium)", desc: "Three service tiers for standard parcel delivery globally. Each tier offers different levels of tracking and service coverage, from basic postal injection to fully tracked premium delivery. All tiers include customs clearance handling." },
      { icon: Zap, title: "MiniPak", desc: "Designed for parcels up to 2kg. Scalable tracking from untracked through to fully tracked, via established international postal networks. Cost-effective for lightweight cross-border eCommerce volume." },
      { icon: ShieldCheck, title: "Delivered Taxes Paid (DTP)", desc: "DTP service available to select markets including Australia, Belgium, Canada, and Ireland. IOSS service available for EU country shipments, simplifying VAT handling for cross-border sales." },
      { icon: Clock, title: "Europe 2–6 days / Rest of World 3–9 days", desc: "Standard international transit times across Landmark Global's postal network. Delivery through trusted local carriers at the destination, with end-to-end tracking on tracked service tiers." },
      RATES_FEATURE,
    ],
    stats: [
      { label: "Coverage", value: "220+ destinations" },
      { label: "Parent group", value: "bpost" },
      { label: "Europe transit", value: "2–6 days" },
      { label: "Customs", value: "Built-in" },
    ],
  },
};

export function getCarrierPageContent(carrier: Integration): CarrierPageProps {
  const region = REGION_DISPLAY[carrier.region ?? ""] ?? carrier.region ?? "Global";
  const desc = carrier.description ?? "multi-carrier delivery";

  const defaults: CarrierContent = {
    tagline: `${carrier.name} — ${desc}, connected to ITD.`,
    description: `${carrier.name} connects to ITD so every eligible order can route through ${carrier.name} alongside your other carriers, with automated labels, tracking, and cost optimisation. Detailed ${carrier.name} services and stats are being added to this page.`,
    region,
    services: DEFAULT_SERVICES,
    features: DEFAULT_FEATURES,
    stats: [
      { label: "ITD integration", value: "Live" },
      { label: "Coverage", value: region },
      { label: "Services", value: "—" },
      { label: "Avg transit", value: "—" },
    ],
  };

  const override = CARRIER_PAGE_OVERRIDES[getIntegrationSlug(carrier)] ?? {};

  return {
    name: carrier.name,
    logo: carrier.logo,
    ...defaults,
    ...override,
  };
}
