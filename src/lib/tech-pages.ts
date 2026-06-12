import { RefreshCw, Zap, Eye, Globe, ShieldCheck, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Integration } from "@/lib/data";
import { getIntegrationSlug, TECH_CATEGORY_LABELS } from "@/lib/data";

/**
 * Per-tech-integration content for the dedicated detail pages, rendered through
 * the shared TechPage body layout (same pattern as carrier-pages.ts / CarrierPage).
 *
 * `getTechPageContent` returns on-format defaults derived from the integration
 * record. Drop real copy per integration in TECH_PAGE_OVERRIDES (keyed by slug).
 */

export interface TechFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface TechPageProps {
  name: string;
  stats: { label: string; value: string }[];
  whatConnects: string[];
  features: TechFeature[];
}

/** Default value-add features — apply to every tech integration. */
const DEFAULT_FEATURES: TechFeature[] = [
  {
    icon: RefreshCw,
    title: "Order import",
    desc: "Orders flow from your platform into Connexx the moment they're placed — no manual exports, no delays.",
  },
  {
    icon: Zap,
    title: "Label generation",
    desc: "Carrier labels print automatically against the correct service and weight tier for each order.",
  },
  {
    icon: Eye,
    title: "Tracking write-back",
    desc: "Tracking numbers and live carrier events push back into your system so customers and teams stay updated.",
  },
  {
    icon: BarChart3,
    title: "Rate optimisation",
    desc: "Connexx selects the cheapest compliant carrier and service on every shipment against your business rules.",
  },
  {
    icon: Globe,
    title: "Multi-carrier routing",
    desc: "Route each order across any carrier in your Connexx account — domestic, international, or both.",
  },
  {
    icon: ShieldCheck,
    title: "Returns management",
    desc: "Return labels and return status are visible in both Connexx and your platform from one workflow.",
  },
];

/** Data flows available via the Connexx integration. */
const DEFAULT_WHAT_CONNECTS: string[] = [
  "Order import",
  "Shipment status push-back",
  "Carrier label generation",
  "Live tracking events",
  "Inventory level sync",
  "Return requests",
  "Collection booking",
  "Proof of delivery",
];

/** Per-integration overrides, keyed by slug. */
export const TECH_PAGE_OVERRIDES: Record<
  string,
  Partial<Omit<TechPageProps, "name">>
> = {
  // Example:
  // linnworks: { whatConnects: [...], stats: [...] },
};

export function getTechPageContent(tool: Integration): TechPageProps {
  const categoryLabel =
    TECH_CATEGORY_LABELS[tool.category] ?? tool.category ?? "Tech";

  const defaults: Omit<TechPageProps, "name"> = {
    stats: [
      { label: "Connexx integration", value: "Live" },
      { label: "Category", value: categoryLabel },
      { label: "Setup", value: "Plug & play" },
      { label: "Data sync", value: "Real-time" },
    ],
    whatConnects: DEFAULT_WHAT_CONNECTS,
    features: DEFAULT_FEATURES,
  };

  const override = TECH_PAGE_OVERRIDES[getIntegrationSlug(tool)] ?? {};

  return {
    name: tool.name,
    ...defaults,
    ...override,
  };
}
