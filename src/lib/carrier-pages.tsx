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

/** Per-carrier overrides, keyed by slug. Fill these in with real content. */
export const CARRIER_PAGE_OVERRIDES: Record<string, Partial<CarrierContent>> = {
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
