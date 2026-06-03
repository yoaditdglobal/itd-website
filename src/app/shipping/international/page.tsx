import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesByShippingType } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import {
  FileCheck,
  Globe,
  Zap,
  Calculator,
  ShoppingCart,
  Building2,
  Boxes,
  Package,
  Truck,
} from "lucide-react";

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
      title="Ship worldwide and keep more margin on each order."
      subtitle="Your overseas orders ship on the buying power of a global carrier network. You keep more margin on shipments in and out of the UK."
      primaryCta={{
        label: "Get Quote",
        href: "#estimator",
      }}
      heroImage={{
        gradient: "from-bg-secondary via-accent-light to-accent/10",
        icon: Globe,
      }}
      secondaryCta={{
        label: "Explore",
        href: "/contact?enquiry=international",
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
          title: "There's margin sitting in your overseas rates",
          desc: "Going direct, you pay the carrier's standard price. The same parcels through our buying power come in 20 to 30% lower.",
        },
        {
          num: "02",
          title: "Surcharges are where going direct really costs you",
          desc: "Direct, the fees stack on top of the rate, and you're billed on a parcel's size as well as its weight. With us, that surcharge exposure is far lower.",
        },
        {
          num: "03",
          title: "Delivery into your biggest markets is hit and miss",
          desc: "A parcel into the US or Australia can stall for days, and the customer holds you responsible. Steady service into the places you sell most keeps them coming back.",
        },
      ]}
      audienceAnchors={[
        {
          anchor: "export",
          headline: "Built for Export",
          summary:
            "Sell overseas on rates that keep your prices competitive. Our buying power across the global carriers turns exporting into a growth line for the business.",
          solutionTag: "Export",
          category: "By business model",
          image: {
            src: "/icp/export.jpg",
            alt: "British Airways aircraft taking off at sunset — UK exports",
            gradient: "from-accent-light via-white to-bg-secondary",
            icon: Globe,
          },
          href: "/solutions/export",
        },
        {
          anchor: "import",
          headline: "Built for Import",
          summary:
            "Importing isn't just about the rate. Our Far East Hub in China works hand in hand with your suppliers, on shipping accounts built around your supply chain strategy and production SLAs, so samples arrive cheaper and on schedule.",
          solutionTag: "Import",
          category: "By business model",
          image: {
            src: "/icp/import.jpg",
            alt: "Wide-body cargo aircraft on final approach — UK imports",
            gradient: "from-bg-secondary via-white to-accent-light",
            icon: Boxes,
          },
          href: "/solutions/import",
        },
        {
          anchor: "ecommerce",
          headline: "Built for eCommerce",
          summary:
            "Connect your Shopify, WooCommerce or BigCommerce store and open your checkout to overseas buyers. Competitive rates and the right carrier for each destination grow the margin on your international orders.",
          solutionTag: "eCommerce",
          category: "By business model",
          image: {
            src: "/icp/ecommerce-intl.webp",
            alt: "Customer paying at an international online checkout with a Mastercard",
            gradient: "from-accent-light via-white to-bg-secondary",
            icon: ShoppingCart,
          },
          href: "/solutions/ecommerce",
        },
        {
          anchor: "marketplace",
          headline: "Built for Marketplace sellers",
          summary:
            "Sell to buyers worldwide on Amazon, eBay, Etsy and TikTok Shop without the shipping cost eating the margin. Competitive cross-border rates keep overseas orders worth taking.",
          solutionTag: "Marketplace",
          category: "By business model",
          image: {
            src: "/icp/marketplace-intl.jpg",
            alt: "Shopper browsing the Temu app next to a Temu-branded box — cross-border marketplace orders",
            gradient: "from-bg-secondary via-white to-accent-light",
            icon: Package,
          },
          href: "/solutions/marketplace-seller",
        },
        {
          anchor: "3pl",
          headline: "Built for 3PLs",
          summary:
            "Add a competitive international service without holding your own global carrier accounts. You win new clients on overseas rates and earn a margin on the shipping you handle for them.",
          solutionTag: "3PL",
          category: "By business model",
          image: {
            src: "/icp/3pl-intl.jpg",
            alt: "Two operators walking a warehouse aisle with a trolley — 3PL fulfilment",
            gradient: "from-accent-light via-white to-bg-secondary",
            icon: Truck,
          },
          href: "/solutions/3pl",
        },
        {
          anchor: "enterprise",
          headline: "Built for Enterprise",
          summary:
            "Run your international shipping through one managed relationship. A dedicated account manager gives you a single view of your global shipping spend, with MI and reporting on your shipping data. You see where margin can grow and how your performance is tracking.",
          solutionTag: "Enterprise",
          category: "By stage",
          image: {
            src: "/icp/enterprise-intl.webp",
            alt: "Live performance dashboard showing trade volumes and SLA metrics in an enterprise operations room",
            gradient: "from-bg-secondary via-white to-accent-light",
            icon: Building2,
          },
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
          question: "How many countries can I ship to?",
          answer:
            "Worldwide. The carrier network reaches 220+ countries and territories, from the EU and North America to the Middle East and Asia. Each lane goes on the service that suits it.",
        },
        {
          question: "Which international carriers can I ship with through ITD?",
          answer:
            "The major global and postal carriers: DHL Express, FedEx, UPS, DPD, PostNL, Royal Mail International and Parcelforce International. We compare them on each order and route to the best-value one for the destination.",
        },
        {
          question: "Will my customers get charged surprise duties or taxes?",
          answer:
            "You decide. You can settle duties and taxes up front so the price your customer pays is final, or pass them on with the cost shown before they buy. There's no surprise bill at the door.",
        },
        {
          question: "How does shipping to the EU work now?",
          answer:
            "Same as anywhere else from your side. The export paperwork and EU declarations are prepared with each shipment, including IOSS for low-value B2C orders, so EU deliveries keep moving.",
        },
        {
          question: "Can ITD handle imports as well as exports?",
          answer:
            "Yes. Our Far East Hub in China works directly with your suppliers on inbound shipping, consolidating freight and putting the landed cost in front of finance before goods leave origin. Stock arrives cheaper and on schedule.",
        },
        {
          question: "How much can I save shipping internationally?",
          answer:
            "In our reviews of recent international shipments, most businesses are paying more than they need to. The saving comes from our buying power across the global carriers. Upload a recent invoice to the Parcel Rate Checker and you'll see indicative numbers in seconds.",
        },
        {
          question: "How do international returns work?",
          answer:
            "Returns route back through the same network, with labels and routing set up for each market. That gives you one process to manage across the countries you sell to.",
        },
      ]}
      closingCta={{
        headline: "See what you should be paying to ship abroad.",
        subhead:
          "A bespoke review looks at the countries you ship to most and shows the per-shipment saving across the carriers that fit each lane.",
        primary: {
          label: "Get Quote",
          href: "#estimator",
        },
        secondary: {
          label: "Explore",
          href: "/contact?enquiry=international",
        },
      }}
    />
  );
}
