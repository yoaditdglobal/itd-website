import VerticalPage from "@/components/sections/VerticalPage";
import { RATE_CHECKER_URL } from "@/lib/site-config";
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
    "Ship to EU and worldwide destinations with HS codes, EORI, IOSS, and customs paperwork generated automatically. DHL Express, FedEx, UPS, Evri EU, Deutsche Post, and Starlinks on one platform.",
  path: "/shipping/international",
});

export default function ShippingInternationalPage() {
  return (
    <VerticalPage
      label="International Shipping"
      title="Ship worldwide with a team that knows what works where"
      subtitle="Wherever you're shipping, there are choices to make: express or economy, duties up front or at the door. We lay out the options and tell you which we'd pick."
      primaryCta={{
        label: "Get Quote",
        href: RATE_CHECKER_URL,
      }}
      heroImage={{
        src: "/shipping/international-hero.webp",
        alt: "AirBridgeCargo freighter aircraft climbing after take-off",
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
            "Multi-carrier international parcel shipping platform with automated customs documentation. Connexx covers EU, North America, APAC, Middle East, and rest of world via DHL Express, FedEx, UPS, Evri EU, Deutsche Post, and Starlinks.",
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
          title: "What worked last year doesn't work now",
          desc: "The US rewrites its import rules, the EU shifts its thresholds, a market tightens overnight. You usually find out when a shipment is stuck at the border.",
        },
        {
          num: "02",
          title: "A price list is not advice",
          desc: "Express, economy, postal, duties paid or unpaid. Each lane has a best answer that turns on weight, value and speed. Go direct and you get a rate card, with no one to ask.",
        },
        {
          num: "03",
          title: "There's margin sitting in your overseas rates",
          desc: "Going direct, you pay the carrier's standard price. The same parcels through our buying power come in 20 to 30% lower.",
        },
      ]}
      audienceAnchors={[
        {
          anchor: "export",
          headline: "Built for Export",
          summary:
            "A new market brings new rules and service choices you've not faced before. We set your export lanes up properly and keep them right as things change, on rates that keep you competitive.",
          solutionTag: "Export",
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
            "Connect your Shopify or WooCommerce store and open your checkout to overseas buyers. Competitive rates and the right carrier for each destination grow the margin on your international orders.",
          solutionTag: "eCommerce",
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
          "International parcels require different carriers for different jobs. Express to North America is a different problem from postal to Australia. Connexx compares all six major international carriers on every cross-border order.",
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
            logo: "/logos/carriers/fedex-icon.png",
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
            carrier: "Evri EU",
            logo: "/logos/carriers/evrieu_logo.png",
            cells: [
              "Europe + 200+ countries",
              "European Tracked (3–7 days), International Tracked (3–7 days)",
              "Cleared via established postal partners in destination countries; parcels up to 15kg",
              "Cost-effective lighter consumer parcels into Europe, drop-off despatch",
            ],
          },
          {
            carrier: "Deutsche Post",
            logo: "/logos/carriers/deutschepost_logo.avif",
            cells: [
              "220+ countries",
              "Packet Tracked, Warenpost International — Europe 2–6 days, Rest of World 3–9 days",
              "Postal-network clearance via local partners, electronic end-to-end tracking",
              "Lightweight eCommerce at volume, lowest cost per unit",
            ],
          },
          {
            carrier: "Starlinks",
            logo: "/logos/carriers/starlinks_logo.png",
            cells: [
              "200+ countries",
              "European Express (1–2 days), Rest of World (1–3 days)",
              "Customs clearance support, delivered duty paid options",
              "Cross-border eCommerce with fast European transit",
            ],
          },
        ],
        footnote:
          "Connexx integrates with all six. The rate engine compares them in real time against your routing rules. The cheapest compliant carrier for the destination, weight, and service tier wins the shipment automatically.",
      }}
      features={[
        {
          icon: FileCheck,
          title: "Customs documentation generated from your product data",
          desc: "HS codes pulled from the product catalogue. EORI applied to UK exporters automatically. IOSS for EU B2C consignments under €150. Country of origin declarations, EUR.1 certificates where applicable, CN22 and CN23 for postal services. The right paperwork pack assembles itself before the carrier scans the label.",
        },
        {
          icon: Globe,
          title: "Regulatory rules engine updated for you",
          desc: "When a destination country changes its import requirements, the document template changes in Connexx. UK exporters do not chase regulatory emails. The Saudi SABER update, the post-Brexit EU rules change, the IOSS threshold adjustment all flow into the documentation engine before they hit your next shipment.",
        },
        {
          icon: Zap,
          title: "Live rate comparison across six international carriers",
          desc: "DHL Express, FedEx, UPS, Evri EU, Deutsche Post, and Starlinks run through one rate engine on every cross-border order. The cheapest compliant carrier for the destination, weight, and speed requirement wins. Manual overrides remain available for known-difficult lanes.",
        },
        {
          icon: Calculator,
          title: "Landed cost calculation at checkout",
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
          logo: "/logos/carriers/fedex-icon.png",
          description:
            "International Priority and Economy services to 220+ countries. US-strong customs brokerage.",
          href: "/integrations/carriers",
        },
        {
          name: "UPS",
          logo: "/logos/carriers/ups_logo.png",
          description:
            "Worldwide Express, Expedited, and Saver services. Customs handling across EU and North America.",
          href: "/integrations/carriers",
        },
        {
          name: "Evri EU",
          logo: "/logos/carriers/evrieu_logo.png",
          description:
            "Tracked delivery into Europe and 200+ countries worldwide. Cost-effective for lighter consumer parcels.",
          href: "/integrations/carriers/evri-eu",
        },
        {
          name: "Deutsche Post",
          logo: "/logos/carriers/deutschepost_logo.avif",
          description:
            "Packet Tracked and Warenpost International to 220+ countries via established postal networks.",
          href: "/integrations/carriers/deutsche-post",
        },
        {
          name: "Starlinks",
          logo: "/logos/carriers/starlinks_logo.png",
          description:
            "European Express in 1–2 days, Rest of World in 1–3 days. Tracked as standard.",
          href: "/integrations/carriers/starlinks",
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
      faq={[
        {
          question: "How do I know which service fits each market?",
          answer:
            "Your account manager walks you through the options for each lane and recommends the setup that fits. When the rules change, we tell you before it bites.",
        },
        {
          question: "How many countries can I ship to?",
          answer:
            "Worldwide. The carrier network reaches 220+ countries and territories, from the EU and North America to the Middle East and Asia. Each lane goes on the service that suits it.",
        },
        {
          question: "Which international carriers can I ship with through ITD?",
          answer:
            "The major global and postal carriers: DHL Express, FedEx, UPS, Evri EU, Deutsche Post and Starlinks. We compare them on each order and route to the best-value one for the destination.",
        },
        {
          question: "Will my customers get charged surprise duties or taxes?",
          answer:
            "You decide. You can settle duties and taxes up front so the price your customer pays is final, or pass them on with the cost shown before they buy. There's no surprise bill at the door.",
        },
        {
          question: "How does shipping to the EU work now?",
          answer:
            "The EU rules don't sit still, and another change is coming. We keep your export paperwork and declarations current as they move, so your deliveries aren't the ones held up.",
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
        headline: "Talk through your lanes with someone who ships them daily",
        subhead:
          "A bespoke review covers your top lanes, the service that fits each one, and where the rules are heading next. The saving sits alongside.",
        primary: {
          label: "Get Quote",
          href: RATE_CHECKER_URL,
        },
        secondary: {
          label: "Explore",
          href: "/contact?enquiry=international",
        },
      }}
    />
  );
}
