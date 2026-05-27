import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesByShippingType } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { FileCheck, Globe, Zap, Calculator } from "lucide-react";

export const metadata = buildMetadata({
  title: "International shipping with automated customs documentation",
  description:
    "Ship to EU and worldwide destinations with HS codes, EORI, IOSS, and customs paperwork generated automatically. DHL, FedEx, UPS, and DPD on one platform.",
  path: "/shipping/international",
});

export default function ShippingInternationalPage() {
  return (
    <VerticalPage
      label="International Shipping"
      title="International shipping with customs documentation done before dispatch."
      subtitle="EU, North America, APAC, the Middle East. Connexx generates the HS codes, the EORI declarations, the IOSS filings, and the country-specific paperwork before the carrier scans the label. DHL Express, FedEx, UPS, DPD, PostNL, Royal Mail International, and Parcelforce International compete in real time on every cross-border order. Customs holds drop. Margins hold steady."
      primaryCta={{
        label: "Get my international rate review",
        href: "/contact?enquiry=international",
      }}
      secondaryCta={{
        label: "Read the Arlo Fulfilment story (3 min)",
        href: "/resources/case-studies/arlo-fulfilment",
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Shipping", path: "/shipping" },
        { name: "International", path: "/shipping/international" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "International Parcel Shipping",
          description:
            "Multi-carrier international parcel shipping platform with automated customs documentation. Connexx covers EU, North America, APAC, Middle East, and rest of world via DHL Express, FedEx, UPS, DPD, PostNL, Royal Mail International, and Parcelforce International.",
          path: "/shipping/international",
          serviceType: "International Parcel Shipping and Customs Automation",
          areaServed: [
            "United Kingdom",
            "European Union",
            "United States",
            "Canada",
            "Worldwide",
          ],
        }),
      ]}
      pains={[
        {
          num: "01",
          title: "Customs holds nobody saw coming",
          desc: "A wrong HS code at the 10-digit level. A missing certificate of origin. A packing list that does not match the commercial invoice. Each one stops the shipment at the border for two to five days. The first sign is a freight forwarder asking for a document that should have been in the pack. By then the customer is already chasing.",
        },
        {
          num: "02",
          title: "Regulatory updates that catch you after the fact",
          desc: "Saudi Arabia changes its SABER conformity requirements for a product category. Turkey introduces a new certificate. The EU updates IOSS thresholds. Your Export Manager finds out when a shipment is already in transit. The documentation team rebuilds the pack while goods sit on a dock.",
        },
        {
          num: "03",
          title: "Multi-country documentation pulled together by hand",
          desc: "Commercial invoice in Word. Packing list in Excel. EUR.1 from the chamber of commerce. Phytosanitary certificate from Defra. Customs declaration on the carrier portal. Six documents, five tools, one shipment. Errors live in the gaps between them.",
        },
      ]}
      audienceAnchors={[
        {
          anchor: "export",
          title: "Export — Export managers and trade compliance teams",
          summary:
            "You prepare 6 to 8 documents per shipment by hand. Commercial invoice, packing list, certificate of origin, EUR.1, phytosanitary certificate where required. Connexx generates the full document pack from the product data, HS codes, and destination country rules already in the system. Meridian Trade Co cut documentation prep from 4 hours to 1 hour per shipment and saw customs holds drop 90%.",
          ctaLabel: "See the full Export solution",
          href: "/solutions/export",
        },
        {
          anchor: "import",
          title: "Import — Import managers, supply chain, and finance",
          summary:
            "One in four import shipments hits a clearance delay. The Import Manager finds out when the customs broker calls asking for a document that should have been filed before the goods left the origin country. Connexx pre-clears the documentation, calculates landed cost to 97% accuracy, and gives finance the duty number before the goods arrive. Northgate Imports dropped clearance delays 60% and lifted duty cost accuracy from 82% to 97%.",
          ctaLabel: "See the full Import solution",
          href: "/solutions/import",
        },
        {
          anchor: "ecommerce",
          title: "eCommerce — Cross-border DTC and online retailers",
          summary:
            "Shopify, WooCommerce, and BigCommerce orders going to the EU need IOSS for under €150, CN22 for postal services, and accurate HS codes for everything else. Connexx applies the right paperwork pack to every cross-border order automatically. Peak Commerce ran 12 markets through Connexx and cut shipping costs 42% with the cheapest compliant carrier picked on every order.",
          ctaLabel: "See the full eCommerce solution",
          href: "/solutions/ecommerce",
        },
        {
          anchor: "enterprise",
          title: "Enterprise — Multi-region, high-volume operations",
          summary:
            "Enterprise shippers manage 40 carrier relationships, 6 to 12 portals, and an ERP that does not talk to the customs declaration system. Connexx delivers SAP and NetSuite integration, single-data-view reporting across every international lane, and dedicated account management. The platform handles 5,000+ daily parcels across multiple regions without an IT project for each new market.",
          ctaLabel: "See the full Enterprise solution",
          href: "/solutions/enterprise",
        },
      ]}
      carrierComparison={{
        title: "International carrier comparison",
        intro:
          "International parcels require different carriers for different jobs. Express to North America is a different problem from postal to Australia. Connexx compares all seven major international carriers on every cross-border order.",
        columns: ["Country reach", "Speed tiers", "Customs handling", "Best for"],
        rows: [
          {
            carrier: "DHL Express",
            logo: "/logos/carriers/dhl_logo.webp",
            cells: [
              "220+ countries",
              "Express Worldwide (1–3 days), Express 9:00, Express 12:00, Economy Select",
              "Full pre-clearance, broker network in 220+ countries",
              "Time-critical international parcels, high-value goods",
            ],
          },
          {
            carrier: "FedEx",
            logo: "/logos/carriers/fedex_logo.png",
            cells: [
              "220+ countries",
              "International Priority (1–3 days), Economy (2–5 days), International Connect Plus",
              "Pre-clearance, US-strong customs brokerage",
              "North America, time-critical APAC",
            ],
          },
          {
            carrier: "UPS",
            logo: "/logos/carriers/ups_logo.png",
            cells: [
              "220+ countries",
              "Express Plus, Worldwide Express, Worldwide Expedited, Worldwide Saver",
              "Full customs brokerage, strong in US and EU",
              "US-bound parcels, EU lanes, regulated commodities",
            ],
          },
          {
            carrier: "DPD",
            logo: "/logos/carriers/DPD-LOGO.png",
            cells: [
              "EU strong, growing worldwide",
              "Classic (2–5 days), Express (1–2 days for EU)",
              "Automated customs declarations for EU, IOSS supported",
              "EU eCommerce shipping at cost-effective rates",
            ],
          },
          {
            carrier: "PostNL",
            cells: [
              "220+ countries via postal network",
              "International Standard, Priority, Tracked",
              "EU postal customs handling, IOSS supported",
              "EU B2C eCommerce parcels under €150",
            ],
          },
          {
            carrier: "Royal Mail International",
            logo: "/logos/carriers/Royal-Mail-Logo.png",
            cells: [
              "230+ countries",
              "International Tracked & Signed, International Tracked, International Signed, International Standard, International Business",
              "CN22 / CN23 automated, IOSS supported",
              "Small parcels and letters worldwide, low-value shipments",
            ],
          },
          {
            carrier: "Parcelforce International",
            logo: "/logos/carriers/parcel-force.svg",
            cells: [
              "240+ countries",
              "Globalexpress, Globalpriority, Globalvalue, EuroPriority",
              "Customs declarations included, IOSS supported",
              "Heavier international parcels at postal pricing",
            ],
          },
        ],
        footnote:
          "Connexx integrates with all seven. The rate engine compares them in real time against your routing rules. The cheapest compliant carrier for the destination, weight, and service tier wins the shipment automatically.",
      }}
      features={[
        {
          icon: FileCheck,
          title: "Customs documentation generated from your product data.",
          desc: "HS codes pulled from the product catalogue. EORI applied to UK exporters automatically. IOSS for EU B2C consignments under €150. Country of origin declarations, EUR.1 certificates where applicable, CN22 and CN23 for postal services. The right paperwork pack assembles itself before the carrier scans the label.",
        },
        {
          icon: Globe,
          title: "Regulatory rules engine updated for you.",
          desc: "When a destination country changes its import requirements, the document template changes in Connexx. UK exporters do not chase regulatory emails. The Saudi SABER update, the post-Brexit EU rules change, the IOSS threshold adjustment all flow into the documentation engine before they hit your next shipment.",
        },
        {
          icon: Zap,
          title: "Live rate comparison across seven international carriers.",
          desc: "DHL Express, FedEx, UPS, DPD, PostNL, Royal Mail International, and Parcelforce International run through one rate engine on every cross-border order. The cheapest compliant carrier for the destination, weight, and speed requirement wins. Manual overrides remain available for known-difficult lanes.",
        },
        {
          icon: Calculator,
          title: "Landed cost calculation at checkout.",
          desc: "Duty, VAT, carrier surcharges, and broker fees calculated from the actual tariff schedule, not from last quarter's spreadsheet estimate. Show the buyer the all-in cost before they pay. Conversion rises, returns from surprise charges fall, finance gets accurate numbers for pricing decisions.",
        },
      ]}
      integrations={[
        {
          name: "DHL Express",
          logo: "/logos/carriers/dhl_logo.webp",
          description:
            "Worldwide express delivery to 220+ countries. Full pre-clearance and customs broker network.",
          href: "/integrations/carriers/dhl",
        },
        {
          name: "FedEx",
          logo: "/logos/carriers/fedex_logo.png",
          description:
            "International Priority and Economy services to 220+ countries. US-strong customs brokerage.",
          href: "/integrations",
        },
        {
          name: "UPS",
          logo: "/logos/carriers/ups_logo.png",
          description:
            "Worldwide Express, Expedited, and Saver services. Customs handling across EU and North America.",
          href: "/integrations",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description:
            "EU eCommerce shipping with automated customs declarations and IOSS support.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "PostNL",
          description:
            "EU and worldwide postal delivery for B2C consignments. IOSS supported.",
          href: "/integrations",
        },
        {
          name: "Royal Mail International",
          logo: "/logos/carriers/Royal-Mail-Logo.png",
          description:
            "International Tracked & Signed, Tracked, Signed, Standard, Business. 230+ countries.",
          href: "/integrations/carriers/royal-mail",
        },
        {
          name: "Parcelforce International",
          logo: "/logos/carriers/parcel-force.svg",
          description:
            "Globalexpress, Globalpriority, Globalvalue, EuroPriority. 240+ countries.",
          href: "/integrations/carriers/parcelforce",
        },
        {
          name: "Shopify",
          logo: "/logos/ecommerce/shopify_logo.png",
          description:
            "Cross-border Shopify orders flow into Connexx for automated customs paperwork and carrier selection.",
          href: "/integrations/ecommerce",
        },
      ]}
      caseStudy={getCaseStudiesByShippingType("International Export")[0] ?? caseStudies[3]}
      caseStudies={[
        ...getCaseStudiesByShippingType("International Export"),
        ...getCaseStudiesByShippingType("International Import"),
      ]}
      rateChecker="international"
      faq={[
        {
          question: "How many countries can I ship to with Connexx?",
          answer:
            "Over 220 countries through the integrated carrier network. DHL Express, FedEx, and UPS each cover 220+ destinations. Royal Mail International covers 230+ countries and Parcelforce International covers 240+. The Connexx rate engine selects the carrier with the best combination of price, speed, and clearance capability for each destination. Country coverage is updated as carriers expand or restrict service.",
        },
        {
          question: "Does Connexx handle customs documentation automatically?",
          answer:
            "Yes. Commercial invoices, packing lists, CN22, CN23, certificates of origin, EUR.1 movement certificates, and country-specific declarations are generated from the product data and HS codes already in your system. The rules engine applies the right document pack to each destination automatically. Meridian Trade Co cut documentation preparation from 4 hours to 1 hour per shipment using this exact workflow.",
        },
        {
          question: "How does Connexx handle EORI, IOSS, and HS codes?",
          answer:
            "EORI numbers are applied to UK exporter declarations automatically. IOSS is applied to EU B2C consignments under €150 for VAT collection at checkout. HS codes are pulled from your product catalogue, classified to the right level for each destination country (6-digit harmonised, 8-digit EU TARIC, 10-digit US Schedule B), and applied to the customs declaration without manual entry. Updates to tariff schedules flow into the engine.",
        },
        {
          question: "Which international carriers does ITD integrate with?",
          answer:
            "Seven major international carriers: DHL Express, FedEx, UPS, DPD, PostNL, Royal Mail International, and Parcelforce International. Each holds different strengths by region (DHL strong worldwide, DPD strong EU, PostNL strong EU postal, Royal Mail strong low-value postal). Connexx compares all seven on every cross-border order. Additional regional carriers can be added on request.",
        },
        {
          question: "Can Connexx handle imports as well as exports?",
          answer:
            "Yes. Inbound shipments from supplier countries get the same automated treatment as outbound. Pre-clearance documentation is generated from the PO data and HS codes before the goods leave the origin country. Duty calculation runs from the actual tariff schedule, not a spreadsheet estimate. Northgate Imports lifted duty cost accuracy from 82% to 97% with this setup. Customs brokers continue to handle clearance alongside the platform.",
        },
        {
          question: "How does post-Brexit EU-UK shipping work with Connexx?",
          answer:
            "EU-UK shipments are treated as third-country movements with full customs documentation on every parcel. Connexx applies the EORI number to UK exporter declarations, generates the commercial invoice and CN23 for postal services, and handles rules of origin under the Trade and Cooperation Agreement. Northern Ireland shipments are routed under the Windsor Framework with the green-lane/red-lane decision applied automatically based on the goods and the consignee.",
        },
      ]}
      closingCta={{
        headline: "Stop preparing customs documents by hand.",
        subhead:
          "A tailored international rate review covers your top five destination countries, your current paperwork process, and the per-shipment saving across the carriers that match each lane.",
        primary: {
          label: "Get my international rate review",
          href: "/contact?enquiry=international",
        },
        secondary: {
          label: "Read the Meridian story (3 min)",
          href: "/resources/case-studies/arlo-fulfilment",
        },
      }}
    />
  );
}
