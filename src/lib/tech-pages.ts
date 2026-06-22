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
  brightpearl: {
    featuresHeading: "Features built for your workflow",
    about: [
      "BrightPearl users have usually automated a significant part of the post-purchase process. Orders updating stock, feeding into accounts, routing to the right warehouse. Shipping tends to be the last manual step in that chain. With ITD in the workflow, orders go straight to dispatch through our carrier network, the right carrier matched to each shipment, and tracking returned to the BrightPearl record.",
      "BrightPearl is a retail operating system used by omnichannel brands to automate the post-purchase process. Orders update stock, feed into accounts, route to the right warehouse, and trigger customer communications, all without manual input. It connects to Shopify, Magento, BigCommerce, Amazon and eBay, and includes a WMS module for warehouse teams managing fulfilment in-house.",
      "Shipping tends to be the one part of the BrightPearl workflow that still requires direct carrier management. BrightPearl connects to carriers including Royal Mail, DPD and FedEx, but the rates on those connections depend on what you have negotiated. ITD sits at that point in the workflow, managing carrier rates across the network so the automation chain runs all the way through to delivery.",
    ],
    features: [
      { icon: RefreshCw, title: "Orders from BrightPearl straight to dispatch", desc: "BrightPearl's automation routes orders and updates the record. ITD connects at the dispatch step, so shipments go out through our carrier network without breaking the automated chain." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the correct carrier, service, and weight for each shipment. ITD manages the carrier side; BrightPearl's automation keeps running." },
      { icon: Eye, title: "Tracking back", desc: "Carrier events return to the BrightPearl order record. Post-purchase workflows, customer communications, and CS queries all work from the same data." },
      RATES_FEATURE,
      { icon: ShieldCheck, title: "Extends BrightPearl's existing carrier integrations", desc: "BrightPearl already connects to shipping providers. ITD adds to that, broader carrier network, competitive rates, same integration layer, so the rest of your BrightPearl setup does not change." },
    ],
  },
  jonassports: {
    featuresHeading: "Features built for your workflow",
    about: [
      "JonasSports handles retail, ticketing, payments and CRM for sports clubs and organisations. Merchandise is part of that. Kits, training gear, seasonal campaigns. Getting those orders to fans on time and at a decent rate tends to be something clubs sort out with a carrier account set up when the online shop first launched and never revisited. ITD provides a carrier network for it. Merchandise orders go straight to dispatch, correctly labelled, with tracking returned to the record.",
      "JonasSports is a specialist commerce platform for sports clubs and organisations. It handles in-store point of sale, online merchandising, ticketing, CRM and payments in a single integrated system, used by clubs including West Ham United, Crystal Palace and Lord's Cricket Ground. A paperless warehouse module keeps kit and merchandise operations running without the paper trail.",
      "Merchandise fulfilment, kits, training gear, fan shop orders, is a significant part of what clubs manage through JonasSports. Getting those orders dispatched reliably and at a sensible rate tends to receive less attention than the retail and ticketing side. ITD provides the carrier network for it, with rates and label generation built around the actual volumes clubs are shipping.",
    ],
    features: [
      { icon: RefreshCw, title: "Merchandise orders to dispatch", desc: "Online orders from your JonasSports store pass to ITD's carrier network at dispatch. Kit launches, seasonal drops, and day-to-day orders all go through the same process." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the right carrier and service for each order. ITD manages the carrier connection; JonasSports handles the store, warehouse operations, and ticketing." },
      { icon: Eye, title: "Tracking back to the order record", desc: "Carrier tracking returns to the order so your team and fans can check status without going to a carrier portal separately." },
      RATES_FEATURE,
      { icon: ShieldCheck, title: "Connects into JonasSports' fulfilment integrations", desc: "JonasSports integrates directly with warehouse and carrier systems as part of its Smarter Fulfilment setup. ITD connects at that point, adding competitive rates and carrier access to the fulfilment infrastructure already in place." },
    ],
  },
  tradepeg: {
    featuresHeading: "Features built for your workflow",
    about: [
      "TradePeg users typically manage stock across multiple warehouses and run wholesale alongside eCommerce. They tend to know exactly what is in the system. How those orders get shipped tends to be managed separately, carrier by carrier, without a clear picture of what it is costing across the board. ITD connects to TradePeg and handles that side: orders go to dispatch through our carrier network, correctly labelled, with tracking returned to the system.",
      "TradePeg is an inventory management and order processing platform used by wholesale and multi-channel eCommerce businesses that need enterprise-level stock control at an SME price point. It manages purchasing, multi-warehouse stock, order processing across channels, invoicing and dispatch giving mid-market businesses the visibility to run a complex operation without complex software.",
      "For a business running wholesale and eCommerce from the same system, shipping tends to be the one thing that has not been consolidated. Each carrier is managed separately, often on rates set up for one type of order but not the other. ITD brings it together. Orders go out through one network, on rates that work whether the shipment is a B2B pallet or a B2C parcel, with tracking returned to TradePeg.",
    ],
    features: [
      { icon: RefreshCw, title: "Live order import", desc: "Orders processed in TradePeg — wholesale and eCommerce alike — pass to ITD for dispatch. Multi-warehouse and mixed-channel orders are handled in the same flow." },
      { icon: Zap, title: "Carrier label generation", desc: "ITD's carrier network works alongside TradePeg's carrier rules engine. Orders are matched to the right carrier based on delivery time, parcel size, and destination." },
      { icon: Eye, title: "Tracking write-back", desc: "Carrier tracking and proof of delivery return to the order record. Your ops team and customers have one place to check status." },
      RATES_FEATURE,
      { icon: Globe, title: "Multi-channel, multi-carrier", desc: "Orders dispatching from different warehouses all go through the same ITD network. One set of rates and one tracking feed, regardless of which warehouse the order left from." },
    ],
  },
  mintsoft: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Mintsoft gives 3PLs and eCommerce businesses full control of their fulfilment, from order intake through to despatch, with over 175 integrations including couriers, marketplaces, and shopping carts. The rates on those courier connections depend on what each business has negotiated directly. ITD connects at the carrier level and manages rate access across a full network, so the Mintsoft operation runs on pricing that reflects what shipping at volume is actually worth.",
      "Mintsoft is a cloud-based warehouse management and order management platform used by 3PLs, fulfilment houses, and eCommerce businesses. It covers the full fulfilment operation from order intake and picking through to despatch and connects to over 175 pre-built integrations including carriers, marketplaces, and shopping carts. It is part of The Access Group.",
      "For 3PLs on Mintsoft, the carrier setup is central to how they service clients and managing rate access across multiple carriers for multiple clients adds real complexity. Each client's shipments may need different carrier accounts at different rates and keeping that current is an ongoing task. ITD simplifies it: one carrier network with managed rate access, available across all the clients the 3PL runs through Mintsoft, without the overhead of managing each carrier relationship separately.",
    ],
    features: [
      { icon: RefreshCw, title: "Order despatch from within Mintsoft", desc: "Orders in the fulfilment queue are passed to ITD's carrier network at despatch. The workflow for 3PLs and eCommerce teams stays in place." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the correct carrier, service, and weight tier. ITD manages the carrier relationship; the picking and packing operations continue without change." },
      { icon: Eye, title: "Tracking returned to Mintsoft", desc: "Carrier events feed back to the order record, giving operations teams and 3PL clients live status in the platform they already use." },
      RATES_FEATURE,
      { icon: Globe, title: "Carrier network access alongside Mintsoft's integrations", desc: "Mintsoft connects directly to couriers, but the rates on those connections depend on what each business has negotiated. ITD adds managed rate access across a full carrier network so the courier integrations Mintsoft already runs are backed by pricing that reflects real volumes." },
    ],
  },
  veeqo: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Veeqo gives multi-channel sellers inventory management and built-in shipping across their channels. The carrier rates available through Veeqo are primarily driven by the Amazon seller network. For UK sellers whose volumes extend beyond Amazon, or who need a broader carrier network, those rates do not always cover the full picture. ITD adds managed carrier rate access across a wider UK network, so all your Veeqo orders ship on the right service at the right rate.",
      "Veeqo is a multi-channel inventory and shipping platform used by eCommerce sellers managing orders across Amazon, eBay, Shopify, WooCommerce, and other channels. It combines inventory management with built-in shipping connecting to a range of carriers and providing rate access and label generation from within the platform. Veeqo is owned by Amazon.",
      "Veeqo's built-in rates are strongest for sellers with significant Amazon volume that is where the network buying power sits. UK sellers who run multiple channels alongside Amazon, or who ship product categories where other carriers perform better, often find that the built-in coverage does not extend as far as their fulfilment needs. ITD fills that gap without changing how Veeqo manages the inventory and order side.",
    ],
    features: [
      { icon: RefreshCw, title: "Order pickup across all Veeqo channels", desc: "Orders from all your connected channels are picked up by ITD in real time, ready for despatch." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the right carrier, service, and weight for each order. ITD manages the carrier side alongside your operation." },
      { icon: Eye, title: "Tracking returned to Veeqo", desc: "Carrier events feed back to the order record and across your connected channels, so your team and customers stay informed from one place." },
      RATES_FEATURE,
      { icon: Globe, title: "UK carrier network access beyond built-in rates", desc: "Veeqo includes built-in shipping rates across a range of carriers. ITD adds managed rate access across a broader UK network — so orders that are better served by carriers outside the default set go on the right service at the right rate." },
    ],
  },
  shipstation: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Shipstation brings orders from all your selling channels into one place and handles the despatch workflow across them. The rates on that shipping depend on the carrier accounts connected to the account — and for growing businesses, those accounts rarely keep pace with current volumes. With ITD in place, orders go out through our carrier network on rates that reflect what your total volume is worth, with tracking returned to Shipstation and each connected channel.",
      "Shipstation is a multi-carrier shipping platform used by eCommerce businesses to manage the despatch process across selling channels. It connects to over 100 carriers and integrates with selling platforms including Shopify, WooCommerce, Amazon, eBay, and others bringing orders from all channels into one place for label generation and despatch.",
      "Shipstation is built around the despatch workflow and it handles that well. Where the value drops off is at the rate level. The carriers in a Shipstation account are only as competitive as the rates those accounts carry, and those rates are whatever each individual business has been able to negotiate. For merchants who have grown significantly since they first set up their carrier accounts, there is often a gap between what they are paying and what their current volume justifies.",
    ],
    features: [
      { icon: RefreshCw, title: "Order import across all connected channels", desc: "Orders from all your connected selling channels reach ITD in real time, ready for despatch without a manual step." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are generated with the correct carrier, service, and weight for each order. ITD manages the carrier network; your workflow continues as it is." },
      RATES_FEATURE,
      { icon: Eye, title: "Tracking write-back across channels", desc: "Carrier tracking returns to Shipstation and feeds back to each connected selling platform, so customers are updated and your team works from one view." },
      { icon: Globe, title: "Network rate access behind your Shipstation setup", desc: "Shipstation connects to carriers; the rates on those connections depend on what your accounts can access. ITD adds competitive rate access to your setup. Same workflow, better pricing across the carrier network." },
    ],
  },
  woocommerce: {
    featuresHeading: "Features built for your workflow",
    about: [
      "WooCommerce gives merchants the flexibility to build exactly the store they need. Shipping is typically managed through plugins, different carriers connected at different times, rates that predate current volumes, a setup that has grown in complexity alongside the business. With ITD, orders go from your WooCommerce store through our carrier network, with the right service selected and tracking returned to the order record.",
      "WooCommerce is the eCommerce plugin for WordPress, used by businesses of all sizes who want the flexibility of a self-hosted store. It handles products, checkout, inventory, and orders and extends through a large library of plugins covering everything from payments to fulfilment.",
      "Because WooCommerce is plugin-driven, the shipping setup tends to reflect how the store was built different carrier plugins added at different stages, each connected to its own account. There is no single place in WooCommerce that gives you a view of what shipping costs across the business, or which carrier is being used for what. That visibility and the competitive rates that comes with it, is what ITD adds.",
    ],
    features: [
      { icon: RefreshCw, title: "Order pickup from WooCommerce", desc: "Each order placed on your WooCommerce store is picked up by ITD in real time, ready for dispatch with no manual export needed." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the correct carrier, service, and weight tier for each order. ITD manages the carrier side; your WooCommerce store runs as it does today." },
      { icon: Eye, title: "Tracking returned to WooCommerce", desc: "Carrier tracking feeds back to the WooCommerce order record, keeping your team and customers informed without managing separate carrier logins." },
      RATES_FEATURE,
      { icon: Globe, title: "One carrier network in place of multiple plugins", desc: "Rather than maintaining separate carrier plugins and rate accounts, all your WooCommerce orders go through ITD's carrier network, one integration, one set of managed rates." },
    ],
  },
  shopify: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Shopify gives merchants full control of their store, checkout, and customer experience. Shipping in the UK is still something each merchant arranges separately, carrier apps, individual accounts, rates negotiated when the business was smaller. With ITD in place, orders from your Shopify store go out through our carrier network, the right carrier selected and labelled, with tracking returned to the order record.",
      "Shopify is the hosted eCommerce platform behind millions of online stores, from independent brands just starting out to established retailers selling across multiple markets. It handles the store, checkout, payments, and inventory and connects to a large app ecosystem for extending what the platform does.",
      "Shopify's strength is the store itself, the product pages, checkout experience, and customer journey. Carriers connect through apps, each with its own configuration and account. As merchants grow, they often add carrier apps reactively: one for tracked domestic parcels, another for international, another for a promotional rate offered at the time. Managing that across a growing order volume is where the carrier side starts to take up time it should not.",
    ],
    features: [
      { icon: RefreshCw, title: "Order pickup from Shopify", desc: "Each order placed in your store is picked up by ITD in real time, ready for dispatch with no manual step in between." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the correct carrier, service, and weight for each order. ITD manages the carrier side; your Shopify store runs as normal." },
      { icon: Eye, title: "Tracking write-back to Shopify", desc: "Carrier events feed back to the Shopify order record. Your customer notifications and team dashboard stay accurate without a separate carrier login." },
      RATES_FEATURE,
      { icon: Globe, title: "One carrier network across all Shopify channels", desc: "Whether you sell through your online store, Shopify POS, or social channels, all orders dispatch through ITD's network on consistent, managed rates." },
    ],
  },

  // ── Marketplace integrations ──────────────────────────────────────────────
  amazon: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Amazon gives sellers access to one of the world's largest buyer bases. For sellers fulfilling their own orders, the carrier side of that operation is down to them — which service, which rate, which label. Those accounts are typically opened early and rarely revisited as volumes grow. With ITD in place, each FBM order goes through our carrier network on rates that reflect what the business ships, with tracking returned to the order record.",
      "Amazon is the world's largest online marketplace, giving third-party sellers access to hundreds of millions of active buyers globally. Sellers can fulfil orders through Amazon's own fulfilment network (FBA) or manage despatch themselves (FBM) — and many operate both in parallel depending on the product, season, or margin requirements of each SKU.",
      "For sellers fulfilling their own Amazon orders, carrier cost is often the biggest variable in unit economics. The carrier accounts most FBM sellers hold were set up when the business was at a different scale — or chosen because they were available, not because they were the best fit for current volumes. As output grows, the gap between what sellers pay and what that volume justifies tends to widen, with no automatic prompt to revisit it.",
    ],
    features: [
      { icon: RefreshCw, title: "Order pickup from Amazon Seller Central", desc: "FBM orders from your Amazon store are picked up by ITD in real time, ready for despatch with no manual step in between." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the correct carrier, service, and weight for each order. ITD manages the carrier side; your Amazon seller operation continues as normal." },
      { icon: Eye, title: "Tracking returned to Amazon", desc: "Carrier events feed back to the Amazon order record, keeping your account metrics current and buyers informed without a separate carrier login." },
      RATES_FEATURE,
      { icon: Globe, title: "Network carrier access for FBM sellers", desc: "FBM sellers typically hold a small number of individually negotiated carrier accounts. ITD replaces that with managed rate access across a full UK carrier network — more services, better rates, one managed relationship." },
    ],
  },
  etsy: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Etsy sellers manage their own despatch — choosing the carrier, printing the label, tracking the shipment. For shops that have grown, the carrier setup that worked for early orders often becomes the part that takes the most time and delivers the least value. ITD connects at the carrier level, so each Etsy order goes through our network on rates that reflect the volume the shop is actually shipping, with tracking returned to the order record.",
      "Etsy is the global marketplace for handmade, vintage, and creative goods, used by millions of independent sellers to reach buyers who are looking for something distinctive. Sellers manage their own listings, fulfilment, and shipping — and are responsible for the carrier arrangements behind each order they despatch.",
      "Etsy sellers who have scaled their shop reach a point where the carrier side stops being simple. Growing order volumes across different product sizes, weights, and destinations mean a single tracked service or a Royal Mail price list no longer covers the job cleanly. Managing rates, services, and returns as the range of destinations and order types widens is where the complexity builds — and where ITD simplifies things considerably.",
    ],
    features: [
      { icon: RefreshCw, title: "Order pickup from Etsy", desc: "Each Etsy order is picked up by ITD in real time, ready for despatch with no manual export required." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the right carrier and service for each order type, weight, and destination. ITD manages the carrier side; your Etsy shop runs as it does today." },
      { icon: Eye, title: "Tracking back to Etsy", desc: "Carrier events return to the Etsy order record, keeping buyers informed and protecting your shop's review score." },
      RATES_FEATURE,
      { icon: Globe, title: "Carrier access that grows with your shop", desc: "As Etsy order volume increases, individually managed carrier accounts become harder to keep competitive. ITD provides managed rate access across a full UK carrier network — so the pricing and services available to your shop reflect what you are shipping." },
    ],
  },
  temu: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Sellers on Temu manage their own despatch for the orders they fulfil. As the platform grows and order volumes follow, the carrier setup behind those despatches needs to keep pace. ITD connects at the carrier level, giving Temu sellers managed rate access across a full UK carrier network — so each order goes out on the right service at rates that reflect real shipping volume.",
      "Temu is a fast-growing global marketplace connecting sellers with buyers across a wide range of product categories. It has grown rapidly in the UK market, giving sellers access to a large and expanding buyer base. Sellers who fulfil their own orders are responsible for the carrier arrangements behind each despatch.",
      "Sellers on Temu typically come to the platform with carrier accounts already in place — whatever was set up before they began selling there. As volume on the platform builds, those accounts rarely keep pace with what the business is now shipping. The time spent managing rates and bookings across individual carriers adds up, and the pricing those accounts carry often no longer reflects the volume going through them. ITD provides a single managed carrier relationship with rate access across a full network, so the carrier side scales without the overhead growing in parallel.",
    ],
    features: [
      { icon: RefreshCw, title: "Order pickup from Temu", desc: "Each Temu order you fulfil is picked up by ITD in real time, ready for despatch with no manual step required." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the correct carrier, service, and weight for each order. ITD manages the carrier side; your Temu operation continues as normal." },
      { icon: Eye, title: "Tracking back to Temu", desc: "Carrier events return to the order record, keeping your buyers informed and your seller standing on the platform current." },
      RATES_FEATURE,
      { icon: Globe, title: "Network carrier access for Temu sellers", desc: "Temu sellers often hold a small number of individually managed carrier accounts. ITD provides managed rate access across a full UK carrier network — more services available, better pricing, one relationship to manage." },
    ],
  },
  "tiktok-shop": {
    featuresHeading: "Features built for your workflow",
    about: [
      "TikTok Shop sellers fulfil their own orders and arrange their own carrier access. As content drives volume, the carrier setup behind those despatches needs to keep pace — individual accounts and manually managed rates that worked at lower volumes quickly become the limiting factor at scale. ITD connects at the carrier level, so TikTok Shop orders go out through our carrier network on rates that reflect current volume, with tracking returned to each order.",
      "TikTok Shop is the eCommerce arm of TikTok, enabling creators, brands, and merchants to sell products directly through the platform. Sellers can list products, manage orders, and run promotions from within TikTok — and are responsible for the fulfilment and carrier arrangements behind each order they despatch.",
      "TikTok Shop sellers often see order volumes move fast. A video performs, a product picks up reach, and the despatch queue looks very different in a short space of time. The carrier setup behind that is typically whatever was in place before the volume arrived — a single tracked service, individually booked collections, rates that were never structured for scale. ITD is built for exactly that situation: managed rate access and carrier network coverage that absorbs volume without the operational overhead growing alongside it.",
    ],
    features: [
      { icon: RefreshCw, title: "Order pickup from TikTok Shop", desc: "Each TikTok Shop order is picked up by ITD in real time, ready for despatch with no manual step in between." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the correct carrier, service, and weight for each order. ITD manages the carrier side; your TikTok Shop operation continues as normal." },
      { icon: Eye, title: "Tracking returned to TikTok Shop", desc: "Carrier events feed back to the TikTok Shop order record, keeping buyers informed and your seller metrics current." },
      RATES_FEATURE,
      { icon: Globe, title: "Carrier network built for volume spikes", desc: "TikTok Shop volumes can move quickly and without much notice. ITD's carrier network and managed rate access are in place ahead of the spike — so when orders come in at scale, the despatch side keeps up without additional carrier setup." },
    ],
  },
  ebay: {
    featuresHeading: "Features built for your workflow",
    about: [
      "eBay sellers are responsible for their own shipping — carrier accounts, label generation, rate management. For sellers who have grown their volume, the carrier accounts set up early in the business rarely reflect what current volumes are worth. With ITD, each eBay order despatches through our carrier network on rates that reflect buying power at scale, with tracking returned to the eBay order record.",
      "eBay is one of the UK's largest online selling platforms, used by private sellers, small businesses, and established retailers across a wide range of product categories. Sellers list and manage their inventory directly, fulfil their own orders, and are responsible for the carrier arrangements behind each despatch.",
      "eBay sellers tend to have a practical carrier setup — a Royal Mail Click & Drop account for smaller parcels, perhaps a DPD or Evri connection for heavier tracked services. What changes less often is whether those accounts still reflect current volume, or whether the mix of carriers and services is the right one for the product types and destinations the business ships to today. That review is what ITD makes possible.",
    ],
    features: [
      { icon: RefreshCw, title: "Order pickup from eBay", desc: "Each eBay order is picked up by ITD in real time, ready for despatch with no manual step required." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the right carrier, service, and weight for each order. ITD manages the carrier side; your eBay store continues as it is." },
      { icon: Eye, title: "Tracking back to eBay", desc: "Carrier events return to the eBay order record, keeping your seller metrics and buyer experience on track without logging in to separate carrier portals." },
      RATES_FEATURE,
      { icon: Globe, title: "Carrier access across the full network", desc: "eBay sellers typically hold a small number of carrier accounts, each negotiated individually. ITD replaces that with managed rate access across a full UK carrier network — more carrier options, better pricing, one managed relationship." },
    ],
  },

  // ── eCommerce & Logistics integrations ────────────────────────────────────
  aimco: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Aimco gives retailers precise stock and order control across their business. The carrier side of each despatch — which service, which rate, which label — depends on the accounts connected to the setup. For businesses that have grown, those accounts often reflect negotiations from an earlier stage of the operation. ITD connects at the carrier level and manages rate access across a full network, so the Aimco workflow continues as it is, with pricing that reflects current buying power.",
      "Aimco is a retail management system used by independent retailers and multi-site businesses in the UK. It handles stock control, orders, purchasing, and EPOS — giving retail operations a single system to manage product and sales data across the business.",
      "Independent retailers using Aimco tend to have a practical carrier setup in place — a Royal Mail account, perhaps a DPD or Evri connection for tracked parcels. What is rarely revisited is whether those accounts reflect the volume going through them, or whether better services and rates are available across a wider network. That is the review ITD makes possible, without changing how Aimco operates.",
    ],
    features: [
      { icon: RefreshCw, title: "Orders from Aimco to carrier", desc: "Orders processed in Aimco pass to ITD's carrier network at despatch. The Aimco workflow continues as normal; ITD handles the carrier side." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the correct carrier, service level, and weight for each order. ITD manages the carrier network and rate access behind each shipment." },
      { icon: Eye, title: "Tracking back to Aimco", desc: "Carrier events return to the Aimco order record, so your team sees live status in the system they work from." },
      RATES_FEATURE,
      { icon: Globe, title: "Carrier access beyond direct accounts", desc: "Rather than relying on rates negotiated directly with each carrier, ITD's network sits behind each Aimco despatch — giving your operation access to services and pricing that reflect group buying power." },
    ],
  },
  base: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Base gives eCommerce businesses the tools to manage orders, products, and customers in one place. The carrier side of that operation — which service, which rate, which label — is something each business manages separately. With ITD connected, orders from Base go out through our carrier network, the right carrier selected and labelled, with tracking returned to the order record.",
      "Base is an eCommerce platform used by online retailers to manage their store, orders, and customer data. It gives businesses a central place to run the commercial side of their operation, with connections to the tools and services they use across the business.",
      "For Base users, the carrier setup tends to be built up over time — individual accounts opened as the business grew, rates that reflected earlier volumes. What is rarely revisited is whether those accounts still make sense for the volume going through them today, or whether better services and pricing are available across a wider carrier network. That is the gap ITD closes.",
    ],
    features: [
      { icon: RefreshCw, title: "Order pickup from Base", desc: "Each order processed in Base is picked up by ITD in real time, ready for despatch with no manual step in between." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the correct carrier, service, and weight for each order. ITD manages the carrier relationship; your Base operation continues as normal." },
      { icon: Eye, title: "Tracking returned to Base", desc: "Carrier events feed back to the Base order record, so your team and customers stay informed without logging in to separate carrier portals." },
      RATES_FEATURE,
      { icon: Globe, title: "Network carrier access alongside your Base setup", desc: "Base handles your orders and products; ITD provides managed rate access across a full UK carrier network — so each shipment goes on the right service at rates that reflect real volume." },
    ],
  },
  channeladvisor: {
    featuresHeading: "Features built for your workflow",
    about: [
      "ChannelAdvisor brings orders from Amazon, eBay, Google Shopping, and other channels into one place. The rates behind those shipments depend on what carrier accounts you have connected — and across multi-channel volume, a patchwork of individually negotiated accounts often costs more than it should. ITD connects at the carrier level, providing rate access across a full network so multi-channel orders ship on pricing that reflects combined volume.",
      "ChannelAdvisor, now part of CommerceHub, is a multi-channel commerce platform used by retailers to manage product listings, inventory, and orders across Amazon, eBay, Google Shopping, and other major selling channels. It handles order routing across those channels and gives retailers a single view of their multi-channel operation.",
      "Multi-channel retailers on ChannelAdvisor are typically running significant volume across platforms. The carrier setup behind that tends to be a mixture of accounts built up over time — often tied to whichever channel was dominant when the business first established them. The result is that orders from different channels may ship at different rates for the same service, with no consolidated view of what the carrier side actually costs across the operation.",
    ],
    features: [
      { icon: RefreshCw, title: "Multi-channel orders to carrier", desc: "Orders managed in ChannelAdvisor — across Amazon, eBay, Google, and other channels — pass to ITD's carrier network at despatch." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are generated with the right carrier and service applied for each order. ITD manages the carrier network; ChannelAdvisor continues routing orders as it does now." },
      { icon: Eye, title: "Tracking returned to each channel", desc: "Carrier events feed back to the ChannelAdvisor record, with tracking visible to customers on each selling channel." },
      RATES_FEATURE,
      { icon: Globe, title: "One carrier network across all your channels", desc: "Amazon, eBay, Google Shopping, and the rest all despatch through ITD. Consistent rates and tracking across every channel, regardless of where the order originated." },
    ],
  },
  cloudcommercepro: {
    featuresHeading: "Features built for your workflow",
    about: [
      "CloudCommercePro gives UK multi-channel sellers one place to manage orders, inventory, and listings. What determines the rates on each shipment is the carrier accounts connected to that operation — and for multi-channel businesses, those accounts rarely reflect the full volume going through. ITD connects at the carrier level, so the CloudCommercePro operation continues as it is, with carrier rates that reflect what combined volume is actually worth.",
      "CloudCommercePro is a UK-based multi-channel eCommerce management platform. It handles orders, inventory, and product listings across channels including Amazon, eBay, Shopify, and WooCommerce — giving merchants a single system to manage the multi-channel operation without logging in and out of each platform separately.",
      "CloudCommercePro users typically have the listing and order side well under control — stock synced, orders routed, channels consolidated. The carrier setup is often the part that has received least attention, configured once and not revisited since. That is where ITD adds the most: rate access and carrier network coverage that reflects the volume the business is actually shipping.",
    ],
    features: [
      { icon: RefreshCw, title: "Orders from CloudCommercePro to despatch", desc: "Orders processed in CloudCommercePro pass to ITD's carrier network at despatch. The platform workflow does not change." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the right carrier, service, and weight for each order. ITD manages the carrier network and rate access behind each shipment." },
      RATES_FEATURE,
      { icon: Eye, title: "Tracking back across your channels", desc: "Carrier tracking returns to CloudCommercePro's order record and feeds back to each connected selling channel." },
      { icon: Globe, title: "Rate access across the full carrier network", desc: "CloudCommercePro manages your orders and stock. ITD manages the carrier rate access — so all your channels ship on rates that reflect the total volume going through the network." },
    ],
  },
  storefeeder: {
    featuresHeading: "Features built for your workflow",
    about: [
      "Storefeeder gives UK multi-channel sellers one system for orders, stock, and listings across their channels. The rates behind each despatch depend on the carrier accounts connected to the setup — and across multi-channel volumes, separate per-carrier accounts rarely give you the rates your total volume justifies. ITD connects at the carrier level, so orders go out on rates that reflect what shipping at network scale is worth.",
      "Storefeeder is a UK multi-channel retail management platform used by eCommerce sellers managing orders, stock, and listings across Amazon, eBay, Shopify, WooCommerce, and other channels. It brings the channel operation into one system and handles order routing, stock synchronisation, and pick-pack lists for the business.",
      "Storefeeder sellers tend to have the multi-channel operation running efficiently — listings kept in sync, stock updated across channels, orders consolidated. What rarely gets revisited is whether the rates behind those carrier connections reflect what the total volume going through the business is worth. That is the question ITD answers.",
    ],
    features: [
      { icon: RefreshCw, title: "Orders from Storefeeder to carrier", desc: "Orders managed in Storefeeder pass to ITD's carrier network at despatch. The Storefeeder workflow stays in place." },
      { icon: Zap, title: "Carrier label generation", desc: "Labels are produced with the correct carrier and service applied for each order. ITD manages the carrier network and rate access behind each shipment." },
      { icon: Eye, title: "Tracking back to Storefeeder", desc: "Carrier tracking returns to the Storefeeder order record, keeping your team updated in the system they already use." },
      RATES_FEATURE,
      { icon: Globe, title: "Multi-channel orders through one carrier network", desc: "Storefeeder manages your listings and stock across Amazon, eBay, Shopify, and your other channels. ITD provides the carrier network so all those orders despatch on consistent, managed rates." },
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
