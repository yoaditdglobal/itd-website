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
    tagline: "APC Overnight — the UK next-day parcel network, connected to ITD.",
    description:
      "APC Overnight runs next-day delivery through a network of local UK depots, with real strength in fragile, liquid and hard-to-ship goods. Through ITD, eligible orders route to APC alongside your other carriers with automated labels, tracking and cost optimisation.",
    region: "United Kingdom",
    services: [
      "Next-day by 9am / 10am / 12pm",
      "Standard next-day delivery",
      "Liquids & fragiles handling",
      "Lightweight & mail-pouch services",
      "Saturday delivery",
      "Returns service",
    ],
    stats: [
      { label: "ITD integration", value: "Live" },
      { label: "Coverage", value: "UK" },
      { label: "Network", value: "100+ local depots" },
      { label: "Specialism", value: "Next-day & fragile" },
    ],
  },
  starlinks: {
    tagline: "Starlinks — cross-border e-commerce delivery, connected to ITD.",
    description:
      "Starlinks moves e-commerce parcels across borders, with last-mile strength in the Middle East and growing international coverage. Through ITD, eligible orders route to Starlinks alongside your other carriers with automated labels, tracking and cost optimisation.",
    region: "International",
    services: [
      "Cross-border parcel delivery",
      "International tracked services",
      "Middle East last-mile network",
      "Customs clearance support",
      "Delivered duty paid options",
      "Returns service",
    ],
    stats: [
      { label: "ITD integration", value: "Live" },
      { label: "Coverage", value: "International" },
      { label: "Focus", value: "Cross-border e-commerce" },
      { label: "Strength", value: "Middle East last mile" },
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
