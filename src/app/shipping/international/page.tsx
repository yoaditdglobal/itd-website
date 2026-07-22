import VerticalPage from "@/components/sections/VerticalPage";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import { caseStudies, getCaseStudiesByShippingType, getRelevantCaseStudies } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import {
  FileCheck,
  Globe,
  Zap,
  Eye,
  ArrowLeftRight,
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

/** TL;DR — every bullet is verifiable against this page's own copy. */
const TLDR = [
  "We ship worldwide for UK businesses with a team that lays out the options for each lane and tells you which service we'd pick.",
  "We compare carriers like DHL Express, FedEx, UPS, Evri EU, Deutsche Post and Starlinks across 220+ countries, and generate customs documents from your invoice.",
  "Through our buying power the same parcels come in 20 to 30% lower than shipping direct, and you choose whether duties are settled up front or passed on.",
];

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
        label: "Contact Sales",
        href: "/contact?enquiry=international",
      }}
      keyTakeaways={TLDR}
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
        title: "International carrier network",
        columns: ["Country reach", "Speed tiers", "Customs handling", "Best for"],
        rows: [
          {
            carrier: "DHL Express",
            logo: "/logos/carriers/dhl_logo.webp",
            cells: [
              "220+ countries and territories",
              "Express Worldwide (next possible working day), Express 9:00 / Express 12:00 (time-definite), Economy Select (1–3 days, EU)",
              "Full pre-clearance, DHL broker network in 220+ countries, MyGTS duty and HS code tools",
              "Time-critical, High-value",
            ],
          },
          {
            carrier: "FedEx",
            logo: "/logos/carriers/fedex-icon.png",
            cells: [
              "Up to 220+ countries (varies by service)",
              "International Priority / Priority Express (1–3 days), International Connect Plus (1–4 days, eCommerce), International Economy (2–5 days)",
              "Customs clearance included, strong US customs brokerage",
              "North America, APAC express",
            ],
          },
          {
            carrier: "UPS",
            logo: "/logos/carriers/ups_logo.png",
            cells: [
              "220+ countries and territories",
              "Worldwide Express Plus / Express (next day, timed), Worldwide Saver (1–3 days), Worldwide Expedited (2–5 days)",
              "In-house customs brokerage, strong in US and EU",
              "US-bound, EU lanes, Regulated goods",
            ],
          },
          {
            carrier: "Deutsche Post",
            logo: "/logos/carriers/deutschepost_logo.avif",
            cells: [
              "220+ countries and territories",
              "Packet Tracked (up to 31.5kg), Warenpost International — Europe 2–6 days, Rest of World 3–9 days",
              "Postal-network clearance via local partners, electronic end-to-end tracking",
              "Lightweight goods, High volume, Lowest unit cost",
            ],
          },
          {
            carrier: "Starlinks",
            logo: "/logos/carriers/starlinks_logo.png",
            cells: [
              "200+ countries",
              "European Express (1–2 days), Rest of World (1–3 days)",
              "Customs clearance support, delivered duty paid options",
              "Cross-border, Fast EU transit",
            ],
          },
          {
            carrier: "Evri EU",
            logo: "/logos/carriers/evrieu_logo.png",
            cells: [
              "Europe + 200+ countries",
              "European Tracked (3–7 days), International Tracked (3–7 days)",
              "Cleared via established postal partners in destination countries, parcels up to 15kg",
              "EU eCommerce, Lighter parcels, Drop-off",
            ],
          },
        ],
      }}
      gatewayMedia={{
        mp4: "/media/connexx-international.mp4",
        webm: "/media/connexx-international.webm",
        poster: "/media/connexx-international-poster.jpg",
        caption:
          "Connexx routing a Berlin parcel to the best-value international carrier, generating the customs pack, and writing tracking back to your systems.",
      }}
      features={[
        {
          icon: Zap,
          title: "Live rate comparison across the world's leading carriers",
        },
        {
          icon: FileCheck,
          title: "Customs documents generated from your invoice",
        },
        {
          icon: ArrowLeftRight,
          title: "DDP or DDU, switched per shipment",
        },
        {
          icon: Eye,
          title: "One dashboard and one tracking link, from collection to delivery",
        },
      ]}
      integrationsContext="International Export"
      caseStudy={getCaseStudiesByShippingType("International Export")[0] ?? caseStudies[3]}
      caseStudies={getRelevantCaseStudies({ shippingTypes: ["International Export", "International Import"] })}
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
          label: "Contact Sales",
          href: "/contact?enquiry=international",
        },
      }}
    />
  );
}
