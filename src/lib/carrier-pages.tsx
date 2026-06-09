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
  // e.g. fedex: { tagline: "...", services: [...], stats: [...] },
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
