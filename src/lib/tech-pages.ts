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
  /** Optional "About {name}" prose. When set, replaces the generic
   *  "What Connexx syncs" data-flows grid with a narrative section. */
  about?: string[];
  /** Optional heading for the features section (default "{name} + Connexx"). */
  featuresHeading?: string;
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

/** Standard rates line, shared across the ERP/WMS pages. */
const RATES_FEATURE: TechFeature = {
  icon: BarChart3,
  title: "Carrier rates managed by ITD",
  desc: "ITD manages the carrier relationship and rates on your behalf. The rates on each shipment reflect network-scale buying power, not what a single business account achieves independently.",
};

/** Per-integration overrides, keyed by slug. */
export const TECH_PAGE_OVERRIDES: Record<
  string,
  Partial<Omit<TechPageProps, "name">>
> = {
  magento: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Magento gives you full control of your store and checkout. What it doesn't come with is a carrier network. Link ITD and each order that lands is routed to the right carrier on the right rate, labels generated, tracking pushed back to the order record, your customer kept in the loop. Your team manages shipping from the same place they manage the store.",
      "Magento Open Source is a self-hosted eCommerce platform built for merchants who need more control than a hosted solution gives them. It powers B2B and B2C stores across fashion, food, industrial supply and beyond, from single storefronts to networks of regional sites and because it's open source, businesses can shape it around their operation rather than the other way round.",
      "Shipping, though, sits outside it. The rates you ship at, the labels you produce and the tracking your customers receive depend entirely on what you've set up elsewhere. Connect ITD and that gap closes: orders reach our network, the right service is selected, and tracking comes back into the order record without your team managing it as a separate workflow.",
    ],
    features: [
      { icon: RefreshCw, title: "Live order import", desc: "Orders placed in your Magento store reach ITD as they land, ready for dispatch without a manual handoff." },
      { icon: Zap, title: "Carrier label generation", desc: "Each order gets a label with the right carrier, service, and weight tier applied. ITD manages the carrier setup; your team processes the order." },
      { icon: Eye, title: "Tracking write-back to Magento", desc: "Carrier tracking returns to the Magento order record. Your team and customers see live status without logging into separate carrier portals." },
      RATES_FEATURE,
      { icon: ShieldCheck, title: "Store-ready connection", desc: "ITD connects to Magento through your existing store setup. No platform rebuilds needed, orders route through our carrier network from the store as it stands." },
    ],
  },
  netsuite: {
    featuresHeading: "Features built for your workflow",
    about: [
      "NetSuite is where growing businesses manage the commercial side of their operation. What sits outside it is the carrier relationship. Add ITD and orders that reach fulfilment stage go straight to dispatch, with the right carrier selected, labels produced and tracking returned to the NetSuite record. Your finance and ops teams see the full picture without switching systems.",
      "Oracle NetSuite is a cloud-based ERP used by businesses that have grown past the point where standalone accounting, inventory and order tools work well together. It centralises financials, stock, purchasing, CRM and fulfilment into one system, giving mid-market and enterprise businesses a single version of the truth across their operation.",
      "Carrier access, for most NetSuite users, is arranged separately. NetSuite records the order and tracks it through the business, but the rates you ship at and the labels you produce sit outside the ERP. Add ITD and that changes: shipments go out through our network on rates your business could not reach independently, with tracking feeding back into the NetSuite order record.",
    ],
    features: [
      { icon: RefreshCw, title: "Dispatch from within the ERP workflow", desc: "Shipments ready in NetSuite's WMS are handed to ITD's carrier network at the point of dispatch. The ERP stays the system of record throughout." },
      { icon: Zap, title: "Label generation", desc: "Labels print with the right carrier, service level, and weight class for each shipment. No need to step outside NetSuite into a carrier portal to book collections." },
      { icon: Eye, title: "Tracking returned to the NetSuite order", desc: "Carrier events feed back to the NetSuite order record, giving finance, operations, and customer service live status in the same place they manage everything else." },
      RATES_FEATURE,
      { icon: Globe, title: "End to end from pick to delivery", desc: "NetSuite handles the pick, pack and dispatch workflow. ITD handles the carrier side. Together, the process runs from order receipt to customer delivery without leaving the ERP environment." },
    ],
  },
  orderwise: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Orderwise is built for stock-heavy UK businesses that need tight control of what comes in, what's held, and what goes out. Carrier access isn't built into it. Connect ITD and each order that leaves your warehouse goes out through the right carrier, on the best rate available, with tracking returned to the order record. Your team dispatches without stepping outside Orderwise's workflow.",
      "Orderwise is a UK-built ERP and WMS used by wholesalers, distributors, retailers and manufacturers who need a single system to run stock control, order management, warehouse operations and financials. It is designed for businesses where inventory is central where knowing what is where, what is moving and what has been committed matters at each level of the operation.",
      "Carrier access has to be built separately. The rates you ship at depend on what you've negotiated carrier by carrier, and tracking returns through whichever channel you've connected. Bring ITD in and that side of the workflow joins the rest: orders go to the right carrier on the right rate; labels are ready and tracking returns to the record without your team managing it outside the system.",
    ],
    features: [
      { icon: RefreshCw, title: "Live order import", desc: "Once an order is picked and packed in Orderwise, it passes directly to ITD's carrier network. The warehouse workflow does not change." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the right carrier and service for each order. ITD manages the carrier setup alongside Orderwise's warehouse operation." },
      { icon: Eye, title: "Tracking write-back", desc: "Carrier tracking returns to the order record, so your team sees live status in the system they are already working in." },
      RATES_FEATURE,
      { icon: Globe, title: "Multi-channel, multi-carrier", desc: "ITD adds value, competitive rates and a broader carrier network, to the courier setup already in your system." },
    ],
  },
  peoplevox: {
    featuresHeading: "Features built for your workflow",
    about: [
      "PeopleVox brings precision to eCommerce warehousing: scanning, pick-pack-ship workflows, real-time inventory. Once a parcel is packed and ready, what happens next, which carrier, which rate, which label, is not part of it. Link ITD and that handoff is handled: orders move from PeopleVox straight to dispatch through our carrier network, with tracking returned to the order without your team touching it separately.",
      "Descartes Peoplevox is a warehouse management system built for high-volume direct-to-consumer eCommerce. It digitises the warehouse floor, from goods-in through to packing with mobile scanning, smart pick workflows and real-time stock visibility. Brands use it because it lets a lean warehouse team handle significant order volumes accurately and quickly.",
      "The carrier side is managed outside the WMS. Rates, labels and the tracking your customers receive all depend on what's been arranged separately. ITD fills that gap: once an order is packed, it moves straight to the right carrier on the best-value rate, with tracking fed back into the order record.",
    ],
    features: [
      { icon: RefreshCw, title: "Live order import", desc: "Packed orders are picked up by ITD as they are ready, passing straight into the dispatch queue." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are generated at the point of dispatch with the correct carrier, service and weight, with nothing for your team to configure each time." },
      { icon: Eye, title: "Tracking write-back", desc: "Carrier tracking events return to the PeopleVox order record, so your team and customers stay informed from the moment a parcel leaves." },
      RATES_FEATURE,
      { icon: Globe, title: "Multi-channel, multi-carrier", desc: "Orders from Shopify, Amazon, eBay and all other channels pass through one ITD connection, each routed to the right carrier for its destination." },
      { icon: ShieldCheck, title: "Works with Peoplevox's shipping integration layer", desc: "Peoplevox is built to connect to carrier platforms and shipping software. ITD connects through that same layer, no change to how your warehouse team works, just a wider carrier network with better rates behind it." },
    ],
  },
  selro: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Selro sellers have usually solved the multi-channel problem. Listings are synced, stock levels are updated, orders come in from every platform into one place. What is often still a patchwork is the carrier side, separate accounts for different channels, rates that predate current volumes, a booking process that varies by platform. With ITD in place, orders from all your Selro channels go out through one carrier network, on better rates, with tracking returned to each platform.",
      "Selro is a multi-channel inventory and order management platform used by online sellers trading across Amazon, eBay, Shopify and more than 40 other channels. It manages listing management, stock synchronisation, order consolidation and accounting integrations, giving sellers a single place to control what is selling, what is in stock and what needs to go out.",
      "The carrier setup, for most Selro users, is something built up one account at a time, opened for one channel and extended to another. ITD replaces it with a carrier network that works across all of them. Orders from each Selro channel go to the right carrier on the best-value rate available, with tracking returned to the platform.",
    ],
    features: [
      { icon: RefreshCw, title: "Live order import", desc: "Orders consolidated in Selro are passed to ITD as they come in, ready to dispatch without a manual step between sale and shipment." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are generated per order with the right carrier and service applied. ITD handles the carrier side; Selro's shipping rules and batch workflow run as they do now." },
      { icon: Eye, title: "Tracking write-back", desc: "Tracking references return to the order record and feed back to each selling platform. Customers on Amazon, eBay, Shopify and the rest get updates without your team sending them manually." },
      RATES_FEATURE,
      { icon: Globe, title: "Multi-channel, multi-carrier", desc: "All 40-plus channels route through one ITD connection, each order matched to the right carrier for its destination and weight." },
    ],
  },
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
