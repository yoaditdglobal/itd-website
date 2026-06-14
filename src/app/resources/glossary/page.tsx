import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ReadingProgress from "@/components/ui/ReadingProgress";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  breadcrumbSchema,
  definedTermSetSchema,
} from "@/components/seo/JsonLd";
import { ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Logistics & Shipping Glossary",
  description:
    "Plain-English definitions of UK and international shipping terms used by retailers, 3PLs, exporters, and importers. WISMO, EORI, IOSS, HS codes, and more.",
  path: "/resources/glossary",
});

const PATH = "/resources/glossary";

type Category = "Carrier" | "Customs" | "Operational" | "Technical" | "Regulatory";

type RelatedLink = {
  label: string;
  href: string;
};

type Entry = {
  slug: string;
  code?: string;
  name: string;
  category: Category;
  definition: string;
  context: string;
  related: RelatedLink[];
};

const categories: { key: Category; label: string; description: string }[] = [
  {
    key: "Carrier",
    label: "Carrier",
    description: "Carrier services, portals, and metrics that shape the dispatch workflow.",
  },
  {
    key: "Customs",
    label: "Customs",
    description: "Declarations, certificates, and trade terms for cross-border movement.",
  },
  {
    key: "Operational",
    label: "Operational",
    description: "The day-to-day language of dispatch, freight, and warehouse operations.",
  },
  {
    key: "Technical",
    label: "Technical",
    description: "APIs, systems, and the connections that move data between platforms.",
  },
  {
    key: "Regulatory",
    label: "Regulatory",
    description: "HMRC schemes, customs zones, and the rules that drive landed cost.",
  },
];

const entries: Entry[] = [
  // --- Carrier ---
  {
    slug: "buy-shipping-amazon",
    name: "Buy Shipping (Amazon)",
    category: "Carrier",
    definition:
      "Amazon's discounted shipping rates available only for orders placed on Amazon, bought through Seller Central or an integrated platform.",
    context:
      "Amazon Buy Shipping covers a limited carrier list (Royal Mail, Amazon Shipping, Evri, and a handful of others) at negotiated rates. It is cheap for Amazon orders and useless for everything else. Sellers running Amazon plus eBay, Etsy, or Shopify need a multi-carrier platform that includes Amazon Buy Shipping inside a wider queue.",
    related: [
      { label: "Seller Fulfilled Prime", href: "#seller-fulfilled-prime-sfp" },
      { label: "Valid Tracking Rate", href: "#valid-tracking-rate-vtr" },
      { label: "Marketplace seller solution", href: "/solutions/marketplace-seller" },
    ],
  },
  {
    slug: "carrier-portal",
    name: "Carrier portal",
    category: "Carrier",
    definition:
      "The website a carrier provides for booking shipments, printing labels, and tracking parcels for a single account.",
    context:
      "Every UK shipper recognises the pattern. Royal Mail Click and Drop, DPD Shipping Portal, Evri Business, DHL MyDHL+, Amazon Seller Central. A business shipping through four carriers logs into four portals. Multi-carrier platforms replace the portal stack with one queue.",
    related: [
      { label: "Multi-carrier", href: "#multi-carrier" },
      { label: "Rate engine", href: "#rate-engine" },
      { label: "Connexx", href: "/connexx" },
    ],
  },
  {
    slug: "child-account",
    name: "Child account",
    category: "Carrier",
    definition:
      "A sub-account under a parent carrier contract, typically used by 3PLs to give each brand client its own rate card, reporting, and labels.",
    context:
      "A 3PL holds the master agreement with Royal Mail, DPD, Evri, or DHL and creates a child account per brand client. Each child account has its own rate card, its own dispatch rules, and its own branded tracking page. Connexx manages unlimited child accounts under one parent contract, with billing and SLAs tracked per client.",
    related: [
      { label: "Multi-carrier", href: "#multi-carrier" },
      { label: "Rate card", href: "#rate-card" },
      { label: "3PL solution", href: "/solutions/3pl" },
    ],
  },
  {
    slug: "click-and-drop-royal-mail",
    name: "Click and Drop (Royal Mail)",
    category: "Carrier",
    definition:
      "Royal Mail's free online shipping tool for printing labels and booking collections.",
    context:
      "Click and Drop is the default starting point for UK small businesses on Royal Mail. It works for Royal Mail-only operations. Once a business adds Evri, DPD, or Parcelforce, the workflow fragments and the team starts juggling portals.",
    related: [
      { label: "Carrier portal", href: "#carrier-portal" },
      { label: "Multi-carrier", href: "#multi-carrier" },
      { label: "Royal Mail Tracked 24/48", href: "#royal-mail-tracked-2448" },
    ],
  },
  {
    slug: "drop-off-parcelshop-locker",
    name: "Drop-off (ParcelShop, locker)",
    category: "Carrier",
    definition:
      "A delivery option where the parcel is dropped at a third-party location (shop or locker) rather than collected from the sender or delivered to a residence.",
    context:
      "Evri ParcelShop, InPost lockers, and Royal Mail Customer Service Points are the main UK drop-off networks. Drop-off rates are typically 30 to 40 per cent cheaper than door collection. Most consumer eCommerce brands offer drop-off as a low-cost delivery tier at checkout.",
    related: [
      { label: "Out-of-area", href: "#out-of-area" },
      { label: "Surcharge zone", href: "#surcharge-zone" },
    ],
  },
  {
    slug: "fuel-surcharge",
    name: "Fuel surcharge",
    category: "Carrier",
    definition:
      "A variable cost line every carrier adds to base shipping rates to cover diesel and aviation fuel price movement.",
    context:
      "Royal Mail, DPD, DHL, FedEx, UPS, and the pallet networks all publish a monthly fuel surcharge as a percentage of the base rate. It changes month to month. Carrier portals show it in the invoice. A rate engine has to pull the live surcharge to compare carriers honestly.",
    related: [
      { label: "Rate card", href: "#rate-card" },
      { label: "Negotiated rate", href: "#negotiated-rate" },
      { label: "Surcharge zone", href: "#surcharge-zone" },
    ],
  },
  {
    slug: "highlands--islands",
    name: "Highlands & Islands",
    category: "Carrier",
    definition:
      "The UK surcharge zone covering the Scottish Highlands, Scottish islands, Isle of Man, and the Channel Islands, where every major carrier applies an additional fee.",
    context:
      "Every UK shipper knows the Highlands surcharge. A parcel from London to Inverness costs more than London to Glasgow on most carriers. The postcode prefixes that trigger the surcharge are published by each carrier and change occasionally. Routing rules in a multi-carrier platform apply the right carrier per postcode automatically.",
    related: [
      { label: "Out-of-area", href: "#out-of-area" },
      { label: "Surcharge zone", href: "#surcharge-zone" },
      { label: "Mainland UK", href: "#mainland-uk" },
    ],
  },
  {
    slug: "late-shipment-rate-lsr",
    code: "LSR",
    name: "Late Shipment Rate (LSR)",
    category: "Carrier",
    definition:
      "An Amazon and eBay seller metric tracking the percentage of orders dispatched after the platform's deadline.",
    context:
      "Amazon's LSR threshold is 4 per cent. Cross it and your seller account is at risk of suspension. The metric is unforgiving because it covers every order shipped from your seller account, including orders missed during a system outage or a carrier strike. Velocity Sellers eliminated penalty fees by switching to SLA-aware carrier routing in Connexx.",
    related: [
      { label: "Valid Tracking Rate", href: "#valid-tracking-rate-vtr" },
      { label: "On-Time Delivery Rate", href: "#on-time-delivery-rate-otdr" },
      { label: "Marketplace seller solution", href: "/solutions/marketplace-seller" },
    ],
  },
  {
    slug: "mainland-uk",
    name: "Mainland UK",
    category: "Carrier",
    definition:
      "The carrier zone covering England, Wales, and mainland Scotland, excluding the Highlands, Islands, Channel Islands, and Northern Ireland.",
    context:
      "Mainland UK is the base zone. Highlands & Islands, Channel Islands, Northern Ireland, and BFPO addresses each carry surcharges or different routing. Carrier rate cards quote a Mainland UK price and then list the surcharge zones separately.",
    related: [
      { label: "Highlands & Islands", href: "#highlands--islands" },
      { label: "Out-of-area", href: "#out-of-area" },
      { label: "Surcharge zone", href: "#surcharge-zone" },
    ],
  },
  {
    slug: "multi-carrier",
    name: "Multi-carrier",
    category: "Carrier",
    definition:
      "A shipping setup that connects one business to two or more parcel carriers from a single platform, with rate comparison between them per order.",
    context:
      "The product category Connexx belongs to. A multi-carrier platform compares live rates across Royal Mail, DPD, Evri, Parcelforce, DHL, FedEx, UPS, Amazon Shipping, and others on every shipment, picks the cheapest compliant option, and generates the label in one click. The alternative is logging into each carrier's portal separately.",
    related: [
      { label: "Rate engine", href: "#rate-engine" },
      { label: "Negotiated rate", href: "#negotiated-rate" },
      { label: "Connexx", href: "/connexx" },
    ],
  },
  {
    slug: "negotiated-rate",
    name: "Negotiated rate",
    category: "Carrier",
    definition:
      "A carrier rate lower than the published rack rate, available to high-volume shippers or to platforms that aggregate volume across many customers.",
    context:
      "Royal Mail, DPD, Evri, and DHL all negotiate rates against committed volume. A small business shipping 50 parcels a day will not get a negotiated rate directly. A platform like Connexx aggregates volume across thousands of shippers and passes the negotiated rates down to every customer, regardless of individual volume.",
    related: [
      { label: "Rack rate", href: "#rack-rate" },
      { label: "Rate card", href: "#rate-card" },
      { label: "Multi-carrier", href: "#multi-carrier" },
    ],
  },
  {
    slug: "on-time-delivery-rate-otdr",
    code: "OTDR",
    name: "On-Time Delivery Rate (OTDR)",
    category: "Carrier",
    definition:
      "An Amazon seller metric tracking the percentage of orders delivered by the promised delivery date.",
    context:
      "OTDR is Amazon's newer SLA metric, complementing Valid Tracking Rate and Late Shipment Rate. The threshold is 92 per cent. Carrier choice, dispatch cutoff, and weather all affect it. A multi-carrier platform routes Amazon orders through carriers with strong OTDR performance on the specific lane and weight tier.",
    related: [
      { label: "Valid Tracking Rate", href: "#valid-tracking-rate-vtr" },
      { label: "Late Shipment Rate", href: "#late-shipment-rate-lsr" },
      { label: "Marketplace seller solution", href: "/solutions/marketplace-seller" },
    ],
  },
  {
    slug: "out-of-area",
    name: "Out-of-area",
    category: "Carrier",
    definition:
      "A postcode outside a carrier's standard delivery zone, where the carrier applies a surcharge or refuses the shipment.",
    context:
      "Every UK carrier publishes an out-of-area postcode list. Highlands, Islands, Channel Islands, and Northern Ireland are the common ones. DPD and Evri each have slightly different lists, which is why an automated routing rule beats a manual choice. A wrong out-of-area decision costs a redelivery charge or a returned parcel.",
    related: [
      { label: "Highlands & Islands", href: "#highlands--islands" },
      { label: "Surcharge zone", href: "#surcharge-zone" },
      { label: "Mainland UK", href: "#mainland-uk" },
    ],
  },
  {
    slug: "pod-proof-of-delivery",
    code: "POD",
    name: "POD (Proof of Delivery)",
    category: "Carrier",
    definition:
      "Evidence that a parcel was delivered, usually a signature or photograph captured by the carrier driver at the delivery address.",
    context:
      "B2B shipments depend on POD because the buyer expects evidence the consignment arrived intact. DPD, DHL, UPS, and the pallet networks all capture signature or photo POD by default. Connexx pulls POD events back into the ERP automatically so finance and customer service can answer disputes without logging into a carrier portal.",
    related: [
      { label: "SLA", href: "#sla-service-level-agreement" },
      { label: "Tracking number", href: "#tracking-number--consignment-reference" },
      { label: "B2B solution", href: "/solutions/b2b" },
    ],
  },
  {
    slug: "rack-rate",
    name: "Rack rate",
    category: "Carrier",
    definition:
      "A carrier's published list price for a shipment, before any negotiated discount.",
    context:
      "Rack rates are the rates a small or new shipper pays unless they negotiate. Royal Mail publishes Business Account rack rates. DPD publishes a public rate card. Volume buyers and aggregator platforms negotiate below rack. The gap between rack and negotiated is where Connexx saves money for small and mid-market shippers.",
    related: [
      { label: "Negotiated rate", href: "#negotiated-rate" },
      { label: "Rate card", href: "#rate-card" },
    ],
  },
  {
    slug: "rate-card",
    name: "Rate card",
    category: "Carrier",
    definition:
      "The price schedule for a carrier's services, broken down by weight tier, destination zone, and service speed.",
    context:
      "Every carrier has a rate card. Royal Mail's is structured by service (Tracked 24, Tracked 48, Special Delivery), weight band, and destination. DPD's adds size-based dim weight. A 3PL holds a rate card per client. Rate cards change at least annually and often quarterly.",
    related: [
      { label: "Rack rate", href: "#rack-rate" },
      { label: "Negotiated rate", href: "#negotiated-rate" },
      { label: "Rate engine", href: "#rate-engine" },
    ],
  },
  {
    slug: "rate-engine",
    name: "Rate engine",
    category: "Carrier",
    definition:
      "The component of a shipping platform that compares carrier rates in real time on every shipment and picks the optimal carrier against pre-set rules.",
    context:
      "A rate engine takes a shipment (weight, dimensions, destination, service required) and runs it against every active carrier's rate card and routing logic. Connexx's rate engine evaluates every carrier on every order in under 200 milliseconds. The output is a ranked list of compliant carriers with their cost and SLA.",
    related: [
      { label: "Multi-carrier", href: "#multi-carrier" },
      { label: "Rate card", href: "#rate-card" },
      { label: "Connexx", href: "/connexx" },
    ],
  },
  {
    slug: "royal-mail-tracked-2448",
    name: "Royal Mail Tracked 24/48",
    category: "Carrier",
    definition:
      "Royal Mail's tracked parcel services, with target delivery in one working day (Tracked 24) or two working days (Tracked 48).",
    context:
      "Tracked 24 and Tracked 48 are the workhorses of UK eCommerce. They cover every UK postcode, push scan events back to Amazon and other marketplaces within the SLA, and qualify for Amazon Seller Fulfilled Prime. Most UK retailers ship sub-2kg orders on Tracked 48 by default.",
    related: [
      { label: "Buy Shipping (Amazon)", href: "#buy-shipping-amazon" },
      { label: "Seller Fulfilled Prime", href: "#seller-fulfilled-prime-sfp" },
      { label: "Valid Tracking Rate", href: "#valid-tracking-rate-vtr" },
    ],
  },
  {
    slug: "saturday-delivery",
    name: "Saturday delivery",
    category: "Carrier",
    definition:
      "A delivery service that operates on Saturdays, usually carrying an additional surcharge above weekday rates.",
    context:
      "DPD Saturday, Parcelforce Saturday, and Royal Mail Special Delivery all offer Saturday delivery. The surcharge is meaningful (typically £3 to £7 above the weekday rate). Multi-carrier platforms apply Saturday routing only when the customer paid for it at checkout, not by default.",
    related: [
      { label: "SLA", href: "#sla-service-level-agreement" },
      { label: "Rate card", href: "#rate-card" },
    ],
  },
  {
    slug: "seller-fulfilled-prime-sfp",
    code: "SFP",
    name: "Seller Fulfilled Prime (SFP)",
    category: "Carrier",
    definition:
      "An Amazon programme that lets sellers offer Prime two-day delivery from their own warehouse, instead of Amazon FBA, using Amazon-approved carriers.",
    context:
      "SFP requires sellers to meet strict performance thresholds (Valid Tracking Rate, Late Shipment Rate, On-Time Delivery Rate) and ship through approved carriers (Royal Mail Tracked 24, Amazon Shipping, DPD Next Day, and a small list of others). Sellers running SFP need carrier routing that defaults to the approved list and falls back gracefully when an order does not meet the criteria.",
    related: [
      { label: "Buy Shipping (Amazon)", href: "#buy-shipping-amazon" },
      { label: "Valid Tracking Rate", href: "#valid-tracking-rate-vtr" },
      { label: "Marketplace seller solution", href: "/solutions/marketplace-seller" },
    ],
  },
  {
    slug: "sla-service-level-agreement",
    code: "SLA",
    name: "SLA (Service Level Agreement)",
    category: "Carrier",
    definition:
      "The carrier's contractual delivery promise, typically expressed as a target delivery time (e.g. next working day before 12pm) and a percentage of shipments delivered within it.",
    context:
      "SLAs vary by service, by destination, and by carrier. DPD Next Day Before 12 is a different SLA from DPD Next Day. Carrier SLA data feeds into a multi-carrier platform's routing logic and into the customer-facing delivery promise at checkout. Missed SLAs are the source of most customer service tickets.",
    related: [
      { label: "POD", href: "#pod-proof-of-delivery" },
      { label: "WISMO", href: "#wismo-where-is-my-order" },
      { label: "Late Shipment Rate", href: "#late-shipment-rate-lsr" },
    ],
  },
  {
    slug: "tracking-number--consignment-reference",
    name: "Tracking number / consignment reference",
    category: "Carrier",
    definition:
      "The unique identifier the carrier assigns to a parcel or consignment, used to look up its status at any point in the journey.",
    context:
      "Royal Mail uses a 13-character reference. DPD uses a 14-digit number. UPS uses 1Z followed by 16 characters. Each carrier's format is different. Connexx normalises tracking numbers into a single field per order and writes them back to Shopify, Amazon, eBay, or your ERP automatically.",
    related: [
      { label: "POD", href: "#pod-proof-of-delivery" },
      { label: "WISMO", href: "#wismo-where-is-my-order" },
      { label: "ERP write-back", href: "#erp-write-back" },
    ],
  },
  {
    slug: "valid-tracking-rate-vtr",
    code: "VTR",
    name: "Valid Tracking Rate (VTR)",
    category: "Carrier",
    definition:
      "An Amazon seller metric tracking the percentage of orders dispatched with a valid tracking number that scans within the SLA window.",
    context:
      "Amazon's VTR threshold is 95 per cent. Carriers that scan parcels on collection (Royal Mail Tracked 24/48, Amazon Shipping, DPD) meet VTR cleanly. Non-tracked services do not. Connexx routes Amazon orders through VTR-compliant carriers by default and writes the tracking number back to Seller Central before the dispatch deadline.",
    related: [
      { label: "Late Shipment Rate", href: "#late-shipment-rate-lsr" },
      { label: "On-Time Delivery Rate", href: "#on-time-delivery-rate-otdr" },
      { label: "Seller Fulfilled Prime", href: "#seller-fulfilled-prime-sfp" },
    ],
  },

  // --- Customs ---
  {
    slug: "ata-carnet",
    name: "ATA Carnet",
    category: "Customs",
    definition:
      "An international customs document that allows temporary import of goods (samples, professional equipment, exhibition stock) into a country without paying duty.",
    context:
      "ATA Carnets are issued by chambers of commerce in the goods' home country. UK exporters use them for trade shows, demo equipment, and broadcast kit. The carnet has a one-year validity and is presented at customs in both directions. Connexx flags carnet-eligible shipments at the point of booking.",
    related: [
      { label: "CDS", href: "#cds-customs-declaration-service" },
      { label: "HS code", href: "#hs-code-harmonised-system-code" },
    ],
  },
  {
    slug: "atr-movement-certificate-eu-turkey",
    name: "ATR (movement certificate, EU-Turkey)",
    category: "Customs",
    definition:
      "A movement certificate proving that goods qualify for preferential customs treatment under the EU-Turkey Customs Union.",
    context:
      "An ATR is required for shipments between the EU and Turkey to benefit from zero or reduced duty. Without it, standard tariffs apply. UK exporters to Turkey now need an ATR plus a UK-Turkey trade agreement document depending on the goods category. Connexx generates ATRs automatically for Turkey-bound shipments.",
    related: [
      { label: "EUR.1", href: "#eur1-movement-certificate" },
      { label: "Rules of origin", href: "#rules-of-origin" },
      { label: "Export solution", href: "/solutions/export" },
    ],
  },
  {
    slug: "c79-vat-certificate",
    code: "C79",
    name: "C79 (VAT certificate)",
    category: "Customs",
    definition:
      "A monthly certificate from HMRC showing the import VAT a UK business has paid through CHIEF or CDS, used to reclaim VAT on the next return.",
    context:
      "Importers using Postponed VAT Accounting receive a C79 from HMRC each month. The figure has to be reconciled against accounting records before submitting the VAT return. Connexx reconciles the C79 against shipment-level import VAT data automatically and exports the result to the finance system.",
    related: [
      { label: "Postponed VAT Accounting", href: "#pva-postponed-vat-accounting" },
      { label: "Duty deferment", href: "#duty-deferment" },
      { label: "Import solution", href: "/solutions/import" },
    ],
  },
  {
    slug: "cds-customs-declaration-service",
    code: "CDS",
    name: "CDS (Customs Declaration Service)",
    category: "Customs",
    definition:
      "HMRC's customs declaration platform, used by UK importers, exporters, and customs brokers to submit declarations to UK customs.",
    context:
      "CDS replaced CHIEF in 2023 for imports and 2024 for exports. Every UK customs declaration now flows through CDS, either submitted directly by the trader or filed by a customs broker on their behalf. Connexx connects to CDS through certified intermediaries and submits declarations before goods arrive at the port.",
    related: [
      { label: "CHIEF", href: "#chief-legacy-uk-customs-system" },
      { label: "Pre-clearance", href: "#pre-clearance" },
      { label: "EORI", href: "#eori-economic-operators-registration-and-identification" },
    ],
  },
  {
    slug: "certificate-of-origin",
    name: "Certificate of origin",
    category: "Customs",
    definition:
      "A document declaring the country where goods were produced, required by certain importing countries for customs clearance or to qualify for preferential duty.",
    context:
      "Certificates of origin are issued by chambers of commerce or generated from the trader's own records. Some destinations (Saudi Arabia, Egypt, India, several African markets) require chamber-issued certificates. Others accept self-certification. Connexx generates the correct document type per destination automatically.",
    related: [
      { label: "EUR.1", href: "#eur1-movement-certificate" },
      { label: "Rules of origin", href: "#rules-of-origin" },
      { label: "Commercial invoice", href: "#commercial-invoice" },
    ],
  },
  {
    slug: "chief-legacy-uk-customs-system",
    code: "CHIEF",
    name: "CHIEF (legacy UK customs system)",
    category: "Customs",
    definition:
      "HMRC's previous customs declaration platform, replaced by CDS for imports in 2023 and exports in 2024.",
    context:
      "CHIEF was the UK customs backbone for decades. CDS replaced it in stages. Any software stack that has not migrated from CHIEF to CDS is out of date. Connexx submits declarations through CDS from day one.",
    related: [
      { label: "CDS", href: "#cds-customs-declaration-service" },
      { label: "HMRC", href: "#hmrc" },
      { label: "Pre-clearance", href: "#pre-clearance" },
    ],
  },
  {
    slug: "commercial-invoice",
    name: "Commercial invoice",
    category: "Customs",
    definition:
      "The document showing the commercial value of an international shipment, used by customs to assess duty and VAT.",
    context:
      "Every international shipment needs a commercial invoice. It lists the goods, the HS code, the unit value, the seller, the buyer, the EORI numbers, and the Incoterms. A wrong line on the commercial invoice triggers a customs hold. Connexx generates commercial invoices from the sales order data automatically so the figures match across the documentation pack.",
    related: [
      { label: "Packing list", href: "#packing-list" },
      { label: "HS code", href: "#hs-code-harmonised-system-code" },
      { label: "EORI", href: "#eori-economic-operators-registration-and-identification" },
    ],
  },
  {
    slug: "ddp-delivered-duty-paid",
    code: "DDP",
    name: "DDP (Delivered Duty Paid)",
    category: "Customs",
    definition:
      "An Incoterm where the seller pays the duty and import VAT, and the goods arrive at the buyer with no customs charges to pay on delivery.",
    context:
      "DDP is the eCommerce-friendly Incoterm for cross-border B2C. The customer sees the final landed price at checkout and the parcel arrives with no surprises. DDP requires the seller to know the duty rate, calculate it at checkout, and pass it to the carrier. DHL Express, DPD Cross-Border, and a handful of others support DDP at the parcel level.",
    related: [
      { label: "Incoterms", href: "#incoterms" },
      { label: "DDU", href: "#ddu-delivered-duty-unpaid" },
      { label: "Landed cost", href: "#landed-cost" },
    ],
  },
  {
    slug: "ddu-delivered-duty-unpaid",
    code: "DDU",
    name: "DDU (Delivered Duty Unpaid)",
    category: "Customs",
    definition:
      "An Incoterm where the seller delivers the goods to the buyer's country but the buyer pays import duty and VAT on arrival.",
    context:
      "DDU is the cheapest Incoterm for the seller and the worst for the customer. The customer gets an unexpected bill on the doorstep. For B2C cross-border, DDU drives complaints and refused deliveries. Most carriers no longer use the term DDU, having moved to DAP (Delivered at Place) under Incoterms 2020, but the legacy term is still common.",
    related: [
      { label: "DDP", href: "#ddp-delivered-duty-paid" },
      { label: "Incoterms", href: "#incoterms" },
      { label: "Landed cost", href: "#landed-cost" },
    ],
  },
  {
    slug: "duty",
    name: "Duty",
    category: "Customs",
    definition:
      "A tax charged by a country on imported goods, calculated as a percentage of the goods' customs value (usually the commercial invoice value plus freight and insurance).",
    context:
      "Duty rates depend on the HS code and the country of origin. The UK Global Tariff publishes UK import duty rates. EU duty rates are published in the EU's TARIC database. Duty is paid by the importer of record, not the carrier. Connexx calculates duty per SKU against the live tariff before goods arrive.",
    related: [
      { label: "HS code", href: "#hs-code-harmonised-system-code" },
      { label: "UK Global Tariff", href: "#uk-global-tariff" },
      { label: "Landed cost", href: "#landed-cost" },
    ],
  },
  {
    slug: "duty-deferment",
    name: "Duty deferment",
    category: "Customs",
    definition:
      "An HMRC scheme allowing approved UK importers to defer duty and import VAT payment until the 15th of the following month, paid via direct debit.",
    context:
      "A Duty Deferment Account (DDA) is essential for any importer doing meaningful volume. It avoids the cash drag of paying duty at every clearance and consolidates payment into one monthly direct debit. Setting up a DDA requires a guarantee from a bank or insurer. Connexx links to your DDA for automatic deferment on every import.",
    related: [
      { label: "Postponed VAT Accounting", href: "#pva-postponed-vat-accounting" },
      { label: "C79", href: "#c79-vat-certificate" },
      { label: "HMRC", href: "#hmrc" },
    ],
  },
  {
    slug: "duty-drawback",
    name: "Duty drawback",
    category: "Customs",
    definition:
      "A refund of import duty paid on goods that are subsequently re-exported from the country, often used by businesses that import components and export finished products.",
    context:
      "Duty drawback is a cash flow benefit for businesses that import to manufacture and re-export. Claims are made via HMRC against documented imports and matched exports. The paperwork burden is real, which is why many businesses leave money on the table. Connexx tags drawback-eligible shipments and exports the data set for the claim.",
    related: [
      { label: "Duty", href: "#duty" },
      { label: "Inward Processing Relief", href: "#ipr-inward-processing-relief" },
    ],
  },
  {
    slug: "eori-economic-operators-registration-and-identification",
    code: "EORI",
    name: "EORI (Economic Operators Registration and Identification)",
    category: "Customs",
    definition:
      "The unique identifier issued by HMRC (or any EU customs authority) to a business that imports or exports goods, used on every customs declaration.",
    context:
      "A UK EORI starts with GB. An EU EORI starts with the country code (DE, FR, IE, and so on). UK exporters to the EU need both, or use the importer's EU EORI under DDP. EORIs are applied for at gov.uk and issued in about three working days. Connexx stores GB and EU EORIs per legal entity and applies the right one per shipment.",
    related: [
      { label: "HMRC", href: "#hmrc" },
      { label: "Commercial invoice", href: "#commercial-invoice" },
      { label: "IOSS", href: "#ioss-import-one-stop-shop" },
      { label: "Export solution", href: "/solutions/export" },
    ],
  },
  {
    slug: "eur1-movement-certificate",
    code: "EUR.1",
    name: "EUR.1 (movement certificate)",
    category: "Customs",
    definition:
      "A movement certificate proving goods qualify for preferential duty treatment under the UK-EU Trade and Cooperation Agreement or other preferential trade deals.",
    context:
      "An EUR.1 is required to claim zero duty on UK origin goods entering the EU (or vice versa) above certain consignment values. Below the threshold, a statement on origin on the commercial invoice is enough. Misclaiming origin leads to retrospective duty and penalties. Connexx checks origin claims against the trader's bill of materials before generating the certificate.",
    related: [
      { label: "ATR", href: "#atr-movement-certificate-eu-turkey" },
      { label: "Rules of origin", href: "#rules-of-origin" },
      { label: "Certificate of origin", href: "#certificate-of-origin" },
    ],
  },
  {
    slug: "hmrc",
    code: "HMRC",
    name: "HMRC",
    category: "Customs",
    definition:
      "His Majesty's Revenue and Customs, the UK government department responsible for tax collection and customs.",
    context:
      "HMRC operates CDS, issues UK EORIs, runs the Duty Deferment scheme, and publishes the UK Global Tariff. Every UK importer and exporter interacts with HMRC, directly or through a customs broker. Connexx connects to HMRC services through certified intermediaries.",
    related: [
      { label: "CDS", href: "#cds-customs-declaration-service" },
      { label: "EORI", href: "#eori-economic-operators-registration-and-identification" },
      { label: "UK Global Tariff", href: "#uk-global-tariff" },
    ],
  },
  {
    slug: "hs-code-harmonised-system-code",
    code: "HS",
    name: "HS code (Harmonised System code)",
    category: "Customs",
    definition:
      "A globally standardised numeric code (six digits internationally, ten in the UK and EU) that classifies a product for customs and duty purposes.",
    context:
      "Every international shipment needs an HS code. The first six digits are common across 200+ countries (set by the World Customs Organization). The next four are country-specific. The UK Global Tariff and the EU's TARIC database hold the duty rate and import controls keyed off each code. Misclassification causes customs holds and incorrect duty payment. Connexx suggests an HS code from the product description and stores the SKU-to-HS mapping for future shipments.",
    related: [
      { label: "Tariff classification", href: "#tariff-classification" },
      { label: "UK Global Tariff", href: "#uk-global-tariff" },
      { label: "Commercial invoice", href: "#commercial-invoice" },
    ],
  },
  {
    slug: "incoterms",
    name: "Incoterms",
    category: "Customs",
    definition:
      "The International Chamber of Commerce's set of standardised trade terms (DDP, DAP, FCA, EXW, and others) that define who pays for shipping, insurance, and duty on a cross-border sale.",
    context:
      "Every international sales contract specifies an Incoterm. Incoterms 2020 is the current version. The two most common in eCommerce are DDP (seller pays everything) and DAP (buyer pays duty on delivery). The two most common in B2B are FCA (seller delivers to a named carrier) and EXW (buyer collects). Connexx applies the agreed Incoterm to every shipment automatically.",
    related: [
      { label: "DDP", href: "#ddp-delivered-duty-paid" },
      { label: "DDU", href: "#ddu-delivered-duty-unpaid" },
      { label: "Landed cost", href: "#landed-cost" },
    ],
  },
  {
    slug: "ioss-import-one-stop-shop",
    code: "IOSS",
    name: "IOSS (Import One-Stop Shop)",
    category: "Customs",
    definition:
      "An EU VAT scheme that lets non-EU sellers charge EU VAT at checkout on B2C consignments under €150 and remit it monthly via one EU member state, avoiding VAT collection on delivery.",
    context:
      "IOSS applies to consignments under €150 sold to EU consumers. The seller registers in any EU member state, charges the destination country's VAT at checkout, and files one monthly IOSS return. The customer pays no extra VAT on delivery. Above €150, standard import VAT applies. Connexx applies the trader's IOSS number to every qualifying shipment and routes through IOSS-compatible carriers.",
    related: [
      { label: "OSS", href: "#oss-one-stop-shop" },
      { label: "EORI", href: "#eori-economic-operators-registration-and-identification" },
      { label: "DDP", href: "#ddp-delivered-duty-paid" },
      { label: "Export solution", href: "/solutions/export" },
    ],
  },
  {
    slug: "oss-one-stop-shop",
    code: "OSS",
    name: "OSS (One-Stop Shop)",
    category: "Customs",
    definition:
      "An EU VAT scheme that lets EU-resident businesses report VAT on B2C cross-border EU sales through one quarterly return in their home member state.",
    context:
      "OSS is for EU businesses selling cross-border within the EU. IOSS is for non-EU businesses selling into the EU. A UK seller with an EU establishment can use OSS for intra-EU B2C sales. Both schemes simplify VAT reporting but require accurate consignment-level data.",
    related: [
      { label: "IOSS", href: "#ioss-import-one-stop-shop" },
      { label: "EORI", href: "#eori-economic-operators-registration-and-identification" },
    ],
  },
  {
    slug: "packing-list",
    name: "Packing list",
    category: "Customs",
    definition:
      "A document listing the contents of a shipment by line, used by customs to verify the commercial invoice and by warehouses to check goods on arrival.",
    context:
      "The packing list and the commercial invoice have to match exactly. A discrepancy on weight, count, or description triggers a customs query that can hold the shipment for two days. Connexx generates both documents from the same source data so they cannot disagree.",
    related: [
      { label: "Commercial invoice", href: "#commercial-invoice" },
      { label: "HS code", href: "#hs-code-harmonised-system-code" },
    ],
  },
  {
    slug: "phytosanitary-certificate",
    name: "Phytosanitary certificate",
    category: "Customs",
    definition:
      "An official certificate confirming that plant-based goods or related products meet the importing country's plant health requirements.",
    context:
      "Phytosanitary certificates are issued by the Animal and Plant Health Agency (APHA) in the UK. Goods covered include fresh produce, timber, wooden packaging, and many plant-derived ingredients. The certificate is required at the border. Missing it stops the shipment.",
    related: [
      { label: "Pre-clearance", href: "#pre-clearance" },
      { label: "Certificate of origin", href: "#certificate-of-origin" },
    ],
  },
  {
    slug: "pre-clearance",
    name: "Pre-clearance",
    category: "Customs",
    definition:
      "Submitting and approving a customs declaration before the goods arrive at the border, so the shipment clears on arrival rather than waiting for the declaration to be processed.",
    context:
      "Pre-clearance is the difference between a same-day clearance and a 48-hour delay. The declaration is filed against the manifest data before the truck or container reaches the port. Connexx pre-clears every import declaration on CDS as soon as the manifest is generated, so goods clear on arrival. Northgate Imports cut customs delays 60 per cent and lifted duty cost accuracy from 82 per cent to 97 per cent using this.",
    related: [
      { label: "CDS", href: "#cds-customs-declaration-service" },
      { label: "Customs hold", href: "#customs-hold" },
      { label: "Import solution", href: "/solutions/import" },
    ],
  },
  {
    slug: "pva-postponed-vat-accounting",
    code: "PVA",
    name: "PVA (Postponed VAT Accounting)",
    category: "Customs",
    definition:
      "A UK scheme that lets registered importers account for import VAT on the next VAT return instead of paying it at the border.",
    context:
      "PVA is a cash flow win. Import VAT is no longer paid at the point of import and reclaimed later. It is declared and reclaimed on the same VAT return. The C79 certificate is replaced by a monthly statement on the trader's CDS account. Connexx flags every shipment as PVA-eligible by default and reconciles against the monthly statement.",
    related: [
      { label: "C79", href: "#c79-vat-certificate" },
      { label: "Duty deferment", href: "#duty-deferment" },
      { label: "Import solution", href: "/solutions/import" },
    ],
  },
  {
    slug: "rules-of-origin",
    name: "Rules of origin",
    category: "Customs",
    definition:
      "The criteria a country uses to determine where goods were produced, which decides whether they qualify for preferential duty under a trade agreement.",
    context:
      "Under the UK-EU TCA, goods of UK or EU origin qualify for zero duty if they meet the rules of origin (typically a percentage of value added in the country, or a change in tariff heading). Misclaiming origin leads to retrospective duty and penalties. Connexx checks origin claims against the bill of materials for every export.",
    related: [
      { label: "EUR.1", href: "#eur1-movement-certificate" },
      { label: "Certificate of origin", href: "#certificate-of-origin" },
      { label: "Duty", href: "#duty" },
    ],
  },
  {
    slug: "tariff-classification",
    name: "Tariff classification",
    category: "Customs",
    definition:
      "The process of assigning the correct HS code to a product, against the UK Global Tariff (for imports) or the destination country's tariff (for exports).",
    context:
      "Classification is harder than it looks. Many products fall into multiple plausible codes. The wrong code can cost a percentage point of duty or trigger an import licence requirement. Connexx classifies from the product description and validates against the UK Global Tariff, storing the SKU-to-HS mapping for future shipments.",
    related: [
      { label: "HS code", href: "#hs-code-harmonised-system-code" },
      { label: "UK Global Tariff", href: "#uk-global-tariff" },
    ],
  },
  {
    slug: "uk-global-tariff",
    code: "UKGT",
    name: "UK Global Tariff",
    category: "Customs",
    definition:
      "The UK's post-Brexit import tariff, published by HMRC, setting the duty rate and import controls for every HS code on goods entering the UK.",
    context:
      "The UK Global Tariff (UKGT) replaced the EU's Common External Tariff after Brexit. Many lines were liberalised (zero duty), others retained the EU rate, and some changed structure. Connexx pulls the live UKGT for every import to calculate landed cost.",
    related: [
      { label: "HS code", href: "#hs-code-harmonised-system-code" },
      { label: "Duty", href: "#duty" },
      { label: "Landed cost", href: "#landed-cost" },
    ],
  },
  {
    slug: "windsor-framework",
    name: "Windsor Framework",
    category: "Customs",
    definition:
      "The 2023 agreement between the UK and the EU that governs the movement of goods between Great Britain and Northern Ireland, replacing parts of the Northern Ireland Protocol.",
    context:
      "The Windsor Framework introduced the Green Lane (for goods staying in Northern Ireland) and the Red Lane (for goods at risk of moving into the EU). Green Lane goods clear with minimal customs checks. Red Lane goods follow full EU import procedures. Connexx routes Northern Ireland shipments through the correct lane automatically.",
    related: [
      { label: "CDS", href: "#cds-customs-declaration-service" },
      { label: "EORI", href: "#eori-economic-operators-registration-and-identification" },
      { label: "Import solution", href: "/solutions/import" },
    ],
  },

  // --- Operational ---
  {
    slug: "consolidation",
    name: "Consolidation",
    category: "Operational",
    definition:
      "Combining multiple smaller shipments into one larger shipment to lower per-unit cost, often used in freight and pallet networks.",
    context:
      "A 3PL consolidating client deliveries at a hub before final-mile dispatch is one example. Importers consolidating supplier orders into a single container is another. Consolidation cuts cost and increases complexity. Connexx tracks consolidated shipments back to the underlying orders so per-client billing stays accurate.",
    related: [
      { label: "Manifest", href: "#manifest" },
      { label: "Lane", href: "#lane" },
    ],
  },
  {
    slug: "csat",
    code: "CSAT",
    name: "CSAT",
    category: "Operational",
    definition:
      "Customer Satisfaction score, typically measured by post-delivery survey on a 1-to-5 or 1-to-10 scale.",
    context:
      "WISMO tickets and delivery exceptions are the biggest drivers of CSAT drops in eCommerce. A clean delivery experience holds CSAT. Repeated tracking failures erode it within a week. Multi-carrier platforms protect CSAT by routing each order through the most reliable carrier on that lane.",
    related: [
      { label: "WISMO", href: "#wismo-where-is-my-order" },
      { label: "SLA", href: "#sla-service-level-agreement" },
    ],
  },
  {
    slug: "dimensional-weight-dim-weight",
    name: "Dimensional weight (DIM weight)",
    category: "Operational",
    definition:
      "A pricing weight calculated from a parcel's volume rather than its actual weight, used by carriers to price lightweight but bulky shipments.",
    context:
      "DIM weight is the carrier's defence against being paid to ship empty space. The formula is length x width x height divided by a divisor (typically 5,000 or 6,000 for international, 4,000 for some UK domestic). The carrier charges by the higher of actual or dimensional weight. Connexx applies DIM rules per carrier so the rate engine compares like with like.",
    related: [
      { label: "Volumetric weight", href: "#volumetric-weight" },
      { label: "Rate card", href: "#rate-card" },
    ],
  },
  {
    slug: "dispatch",
    name: "Dispatch",
    category: "Operational",
    definition:
      "The act of preparing and sending a shipment, including label generation, manifest creation, and handover to the carrier.",
    context:
      'Dispatch is the verb every UK operator uses. "Dispatch decisions", "dispatch team", "dispatch volume", "dispatch cutoff". A dispatch cutoff is the time by which a parcel has to be handed to the carrier to be collected that day. Miss it and the parcel ships tomorrow.',
    related: [
      { label: "Manifest", href: "#manifest" },
      { label: "SLA", href: "#sla-service-level-agreement" },
      { label: "Late Shipment Rate", href: "#late-shipment-rate-lsr" },
    ],
  },
  {
    slug: "fcl--lcl-full--less-than-container-load",
    name: "FCL / LCL (Full / Less than Container Load)",
    category: "Operational",
    definition:
      "Sea freight shipping modes where FCL means the shipment fills a 20ft or 40ft container, and LCL means it shares a container with other shippers.",
    context:
      "FCL is faster and cheaper per cubic metre at high volume. LCL is the option for smaller importers who cannot fill a container. Most UK importers from Asia run LCL until they hit consistent container volume. Connexx integrates with freight forwarders for both modes.",
    related: [
      { label: "LTL", href: "#ltl-less-than-truckload" },
      { label: "Consolidation", href: "#consolidation" },
      { label: "Import solution", href: "/solutions/import" },
    ],
  },
  {
    slug: "lane",
    name: "Lane",
    category: "Operational",
    definition:
      "A specific shipping route, usually expressed as origin country to destination country (e.g. UK to Germany, UK to US), with implications for carrier choice, transit time, and customs treatment.",
    context:
      '"Lane" is the planning unit for an export or international eCommerce operation. The UK-to-Germany lane needs a different carrier mix from UK-to-US. Lane performance is measured in cost per parcel, transit time, and exception rate. Connexx tracks lane-level performance per carrier in the dashboard.',
    related: [
      { label: "Carrier portal", href: "#carrier-portal" },
      { label: "Consolidation", href: "#consolidation" },
      { label: "SLA", href: "#sla-service-level-agreement" },
    ],
  },
  {
    slug: "ltl-less-than-truckload",
    code: "LTL",
    name: "LTL (Less Than Truckload)",
    category: "Operational",
    definition:
      "A road freight mode for shipments too large for parcel carriers but too small to fill a truck, typically used for palletised goods through pallet networks.",
    context:
      "UK LTL runs through pallet networks like Pall-Ex, Palletline, and Palletways. A shipment is collected, taken to a hub, sorted, and trunked to the destination depot for final delivery. LTL economics depend on hub volume. Connexx rate-shops across pallet networks for every B2B shipment.",
    related: [
      { label: "Pallet network", href: "#pallet-network" },
      { label: "FCL / LCL", href: "#fcl--lcl-full--less-than-container-load" },
      { label: "B2B solution", href: "/solutions/b2b" },
    ],
  },
  {
    slug: "manifest",
    name: "Manifest",
    category: "Operational",
    definition:
      "The list of parcels in a single carrier collection, generated at the end of a dispatch session and presented to the driver.",
    context:
      "Each carrier requires a daily manifest. Royal Mail generates one through Click and Drop or its OBA system. DPD generates one through its portal. Multi-carrier platforms generate one manifest per carrier per collection automatically. A manifest is the source of truth for that day's volume.",
    related: [
      { label: "Dispatch", href: "#dispatch" },
      { label: "POD", href: "#pod-proof-of-delivery" },
    ],
  },
  {
    slug: "pallet-network",
    name: "Pallet network",
    category: "Operational",
    definition:
      "A national or international network of haulage businesses that share a central hub to deliver palletised freight, allowing single-pallet shipments at competitive cost.",
    context:
      "Pall-Ex, Palletline, and Palletways are the dominant UK pallet networks. Each has 80 to 100 member depots across the UK. A shipper books once, the network handles collection, trunking, and delivery. Pallet sizes (quarter, half, full) and timed delivery windows are the main rate variables.",
    related: [
      { label: "LTL", href: "#ltl-less-than-truckload" },
      { label: "POD", href: "#pod-proof-of-delivery" },
      { label: "B2B solution", href: "/solutions/b2b" },
    ],
  },
  {
    slug: "returns-logistics--reverse-logistics",
    name: "Returns logistics / reverse logistics",
    category: "Operational",
    definition:
      "The process of handling goods sent back from the customer, including return labels, carrier collection, warehouse receipt, and refund or restock decisions.",
    context:
      "Returns rates in UK eCommerce typically run 8 to 30 per cent depending on category. Returns logistics costs (label, freight, processing, restocking, write-off) can absorb 30 to 50 per cent of the gross margin on returned items. A returns portal that issues pre-paid labels through the right carrier per lane saves cost and reduces friction.",
    related: [
      { label: "WISMO", href: "#wismo-where-is-my-order" },
      { label: "Carrier portal", href: "#carrier-portal" },
      { label: "eCommerce solution", href: "/solutions/ecommerce" },
    ],
  },
  {
    slug: "volumetric-weight",
    name: "Volumetric weight",
    category: "Operational",
    definition:
      "A synonym for dimensional weight, used by some carriers and freight forwarders to describe volume-based pricing.",
    context:
      "Volumetric weight and dimensional weight refer to the same calculation, with different divisors per carrier. Royal Mail does not apply volumetric weight on small parcels but DHL, FedEx, and UPS do on international.",
    related: [
      { label: "Dimensional weight", href: "#dimensional-weight-dim-weight" },
      { label: "Rate card", href: "#rate-card" },
    ],
  },
  {
    slug: "wismo-where-is-my-order",
    code: "WISMO",
    name: "WISMO (Where Is My Order)",
    category: "Operational",
    definition:
      'The customer service ticket category covering "where is my parcel?" enquiries from customers waiting for a delivery.',
    context:
      "WISMO is the single largest CS ticket type for any UK eCommerce brand. At 80 tickets a day across four carriers, a CS team can spend five hours daily looking up tracking. The fix is a single tracking view inside the helpdesk, fed by the multi-carrier platform's tracking data. Peak Commerce cut WISMO tickets by 68 per cent on Connexx.",
    related: [
      { label: "Tracking number", href: "#tracking-number--consignment-reference" },
      { label: "CSAT", href: "#csat" },
      { label: "eCommerce solution", href: "/solutions/ecommerce" },
    ],
  },

  // --- Technical ---
  {
    slug: "api-application-programming-interface",
    code: "API",
    name: "API (Application Programming Interface)",
    category: "Technical",
    definition:
      "A set of endpoints that lets one software system talk to another, used in shipping to connect order systems (Shopify, NetSuite) to carriers and platforms (Royal Mail, DPD, Connexx).",
    context:
      "Every modern carrier publishes an API. Every modern platform consumes them. A platform with native API connections beats one that uses CSV uploads, because the data flows in real time and writes back automatically. Connexx exposes its own REST API to customers who want to build custom workflows.",
    related: [
      { label: "RESTful API", href: "#restful-api" },
      { label: "Webhook", href: "#webhook" },
      { label: "ERP write-back", href: "#erp-write-back" },
    ],
  },
  {
    slug: "erp-write-back",
    name: "ERP write-back",
    category: "Technical",
    definition:
      "The process by which a shipping platform writes shipment data (tracking numbers, dispatch dates, costs, POD) back into the source ERP, so the order record is updated automatically.",
    context:
      "Without write-back, dispatch teams re-key tracking numbers into the ERP by hand. With write-back, the data flows. NetSuite and other major ERPs support write-back through API or middleware. Connexx supports two-way sync with every major ERP.",
    related: [
      { label: "API", href: "#api-application-programming-interface" },
      { label: "Webhook", href: "#webhook" },
      { label: "Tracking number", href: "#tracking-number--consignment-reference" },
    ],
  },
  {
    slug: "oms-order-management-system",
    code: "OMS",
    name: "OMS (Order Management System)",
    category: "Technical",
    definition:
      "A software platform that aggregates orders from multiple sales channels (Shopify, Amazon, eBay, B2B portal) into one queue for dispatch.",
    context:
      "Linnworks, Veeqo, StoreFeeder, and Selro are the dominant UK OMS platforms for multi-channel sellers. The OMS holds the order until it is ready for dispatch. The shipping platform takes the dispatched order, picks the carrier, generates the label, and writes the tracking number back. Connexx integrates with every major OMS.",
    related: [
      { label: "WMS", href: "#wms-warehouse-management-system" },
      { label: "API", href: "#api-application-programming-interface" },
    ],
  },
  {
    slug: "restful-api",
    name: "RESTful API",
    category: "Technical",
    definition:
      "A style of web API that uses standard HTTP methods (GET, POST, PUT, DELETE) and JSON payloads, the dominant pattern in modern software integration.",
    context:
      "A REST API is the easiest pattern to integrate against. Connexx's API is REST. Most modern carrier APIs are REST. Older carrier APIs use SOAP or proprietary XML, which Connexx handles internally so the customer never sees them.",
    related: [
      { label: "API", href: "#api-application-programming-interface" },
      { label: "Webhook", href: "#webhook" },
    ],
  },
  {
    slug: "webhook",
    name: "Webhook",
    category: "Technical",
    definition:
      "An HTTP callback that one system sends to another when an event occurs (e.g. an order is created in Shopify, a parcel is scanned by DPD), enabling real-time data flow without polling.",
    context:
      "Webhooks are how shipping platforms get instant notification of order creation, dispatch, and delivery. Connexx receives Shopify order-created webhooks and pushes tracking events back via webhooks to the customer's ERP. Real-time webhook flow beats hourly batch polling for any time-sensitive workflow.",
    related: [
      { label: "API", href: "#api-application-programming-interface" },
      { label: "ERP write-back", href: "#erp-write-back" },
    ],
  },
  {
    slug: "wms-warehouse-management-system",
    code: "WMS",
    name: "WMS (Warehouse Management System)",
    category: "Technical",
    definition:
      "A software platform that manages warehouse operations including stock locations, picking, packing, and inventory accuracy.",
    context:
      "Mintsoft, ShipHero, Manhattan Active Warehouse, and Blue Yonder are the UK-relevant WMS platforms. A WMS controls what is on the shelf and where it goes. A shipping platform controls how it gets to the customer. The two systems integrate so an order picked in the WMS dispatches through the shipping platform automatically. Connexx integrates with every major WMS.",
    related: [
      { label: "OMS", href: "#oms-order-management-system" },
      { label: "API", href: "#api-application-programming-interface" },
      { label: "3PL solution", href: "/solutions/3pl" },
    ],
  },

  // --- Regulatory ---
  {
    slug: "customs-hold",
    name: "Customs hold",
    category: "Regulatory",
    definition:
      "A delay imposed by customs authorities (HMRC or the destination country's customs) on a shipment that fails initial checks, pending resolution of a documentation or compliance issue.",
    context:
      "Customs holds typically take 24 to 72 hours to resolve and require additional paperwork. The most common causes are misclassified HS codes, missing or wrong EORI, mismatched commercial invoice and packing list, and missing certificates. SwiftLog Fulfilment lifted customs accuracy from 93 per cent to 98.7 per cent on Connexx, cutting customs-related delays by 85 per cent.",
    related: [
      { label: "Pre-clearance", href: "#pre-clearance" },
      { label: "HS code", href: "#hs-code-harmonised-system-code" },
      { label: "Commercial invoice", href: "#commercial-invoice" },
    ],
  },
  {
    slug: "landed-cost",
    name: "Landed cost",
    category: "Regulatory",
    definition:
      "The total cost of getting goods from a supplier to the final destination, including supplier price, freight, insurance, duty, import VAT, customs fees, and any surcharges.",
    context:
      "Landed cost matters most for importers pricing products against margin. Estimates that are off by 10 to 20 per cent erode margin on every unit until the next price review. Northgate Imports lifted duty cost accuracy from 82 per cent to 97 per cent on Connexx, which let finance price every SKU against accurate margin.",
    related: [
      { label: "Duty", href: "#duty" },
      { label: "UK Global Tariff", href: "#uk-global-tariff" },
      { label: "Import solution", href: "/solutions/import" },
    ],
  },
  {
    slug: "surcharge-zone",
    name: "Surcharge zone",
    category: "Regulatory",
    definition:
      "A geographic area (typically postcodes) outside the carrier's standard delivery network, where the carrier applies an additional fee per shipment.",
    context:
      "Highlands, Islands, Channel Islands, Northern Ireland, and BFPO are the main UK surcharge zones. Each carrier has its own list. Routing rules in a multi-carrier platform pick the carrier with the lowest surcharge for the destination postcode.",
    related: [
      { label: "Highlands & Islands", href: "#highlands--islands" },
      { label: "Out-of-area", href: "#out-of-area" },
      { label: "Mainland UK", href: "#mainland-uk" },
    ],
  },
  {
    slug: "ipr-inward-processing-relief",
    code: "IPR",
    name: "IPR (Inward Processing Relief)",
    category: "Regulatory",
    definition:
      "An HMRC scheme allowing UK importers to suspend or refund duty on goods imported for processing and re-export.",
    context:
      "IPR is for businesses that import components, process them in the UK, and export the finished product. Duty on the imported components is either suspended at import or refunded later. The paperwork burden is meaningful, which is why many eligible businesses do not use the scheme. Connexx tags IPR-eligible shipments for the claim.",
    related: [
      { label: "Duty drawback", href: "#duty-drawback" },
      { label: "OPR", href: "#opr-outward-processing-relief" },
    ],
  },
  {
    slug: "opr-outward-processing-relief",
    code: "OPR",
    name: "OPR (Outward Processing Relief)",
    category: "Regulatory",
    definition:
      "An HMRC scheme allowing UK exporters to send goods abroad for processing and re-import them with duty calculated only on the value added abroad, not the full re-import value.",
    context:
      "OPR is the export counterpart to IPR. Used by businesses that send raw materials or components abroad for finishing and then re-import. Common in fashion, electronics assembly, and machinery. Connexx flags OPR-eligible movements and tracks them through the re-import.",
    related: [
      { label: "IPR", href: "#ipr-inward-processing-relief" },
      { label: "Duty", href: "#duty" },
    ],
  },
];

function categoryAnchor(c: Category): string {
  return `category-${c.toLowerCase()}`;
}

export default function GlossaryPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources/case-studies" },
      { name: "Glossary", path: PATH },
    ]),
    definedTermSetSchema({
      path: PATH,
      name: "ITD Global Logistics & Shipping Glossary",
      description:
        "Plain-English definitions of UK and international shipping terms used by retailers, 3PLs, exporters, and importers.",
      terms: entries.map((e) => ({
        slug: e.slug,
        code: e.code,
        name: e.name,
        description: e.definition,
      })),
    }),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReadingProgress />

      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-eyebrow mb-4">
              Resources
            </span>
            <h1 className="text-display-xl text-text-primary">
              Logistics &amp; Shipping Glossary
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              Every term a dispatch manager, customs lead, or marketplace seller hears in a Monday meeting. Plain definitions, no marketing language. Built from the vocabulary our customers use every day across Royal Mail, DPD, Evri, DHL, HMRC, CDS, and the carriers and regulators that shape UK and international shipping.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How to use this page */}
      <section className="bg-bg-secondary py-12 md:py-16 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">How to use this page</p>
            <p className="text-body-md text-text-secondary mb-4">
              Five categories: Carrier, Customs, Operational, Technical, and Regulatory. Each entry runs to one sentence of plain definition, then two or three sentences of context that show when the term turns up and what it costs you when it goes wrong. Every entry links out to the page on this site that handles the term in the product.
            </p>
            <p className="text-body-md text-text-secondary">
              Use the category navigation to jump to a cluster. Every entry has its own anchor URL (e.g. <code className="text-caption bg-white px-1.5 py-0.5 rounded border border-border">/resources/glossary#wismo-where-is-my-order</code>) so you can link to a single definition from an internal ticket, an RFP, or a customer reply.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category navigation */}
      <section className="bg-white py-10 sticky top-[72px] z-30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <a
                key={c.key}
                href={`#${categoryAnchor(c.key)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-bg-secondary border border-border text-sm font-medium text-text-primary hover:bg-accent-light hover:text-accent hover:border-accent/20 transition-colors"
              >
                {c.label}
                <span className="text-xs text-text-tertiary">
                  ({entries.filter((e) => e.category === c.key).length})
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Entries by category */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((c) => {
            const items = entries.filter((e) => e.category === c.key);
            if (items.length === 0) return null;
            return (
              <div
                key={c.key}
                id={categoryAnchor(c.key)}
                className="scroll-mt-32 mb-16 last:mb-0"
              >
                <div className="mb-8 pb-4 border-b border-border">
                  <p className="text-eyebrow text-accent mb-2">
                    {items.length} {items.length === 1 ? "entry" : "entries"}
                  </p>
                  <h2 className="text-display-lg text-text-primary">
                    {c.label} terms
                  </h2>
                  <p className="mt-2 text-text-secondary">{c.description}</p>
                </div>
                <div className="space-y-8">
                  {items.map((entry) => (
                    <article
                      key={entry.slug}
                      id={entry.slug}
                      className="card-hover scroll-mt-32 bg-bg-secondary rounded-xl border border-border p-6"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-white border border-border text-eyebrow text-text-secondary">
                          {entry.category}
                        </span>
                        {entry.code && (
                          <span className="inline-block px-2 py-0.5 rounded-full bg-accent-light text-accent text-eyebrow">
                            {entry.code}
                          </span>
                        )}
                      </div>
                      <h3 className="text-heading-md text-text-primary mb-3">
                        <a
                          href={`#${entry.slug}`}
                          className="hover:text-accent"
                        >
                          {entry.name}
                        </a>
                      </h3>
                      <p className="text-body-sm text-text-primary mb-3">
                        <span className="font-medium">Definition. </span>
                        {entry.definition}
                      </p>
                      <p className="text-body-sm text-text-secondary mb-4">
                        {entry.context}
                      </p>
                      {entry.related.length > 0 && (
                        <div className="pt-3 border-t border-border">
                          <p className="text-eyebrow text-text-tertiary mb-2">
                            Related
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {entry.related.map((r) => {
                              const isInternal = r.href.startsWith("/");
                              if (isInternal) {
                                return (
                                  <Link
                                    key={r.label}
                                    href={r.href}
                                    className="link-underline gap-1 text-xs text-accent"
                                  >
                                    {r.label}
                                    <ArrowRight className="w-3 h-3" />
                                  </Link>
                                );
                              }
                              return (
                                <a
                                  key={r.label}
                                  href={r.href}
                                  className="link-underline text-xs text-accent"
                                >
                                  {r.label}
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">
              The vocabulary, applied to your dispatch.
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              Connexx handles every term in this glossary inside one platform. From WISMO to PVA, from VTR to landed cost. Talk to us about the ones that hurt right now.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/connexx"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                See how Connexx works
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
