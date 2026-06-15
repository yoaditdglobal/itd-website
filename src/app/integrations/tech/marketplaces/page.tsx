import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import MarketplaceOrbit from "@/components/sections/MarketplaceOrbit";
import { getIntegrationsByType } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Marketplace integrations — Amazon, eBay, Etsy, TikTok Shop & more",
  description:
    "Connect Amazon, eBay, Etsy, Walmart, Zalando, Temu and TikTok Shop to Connexx. Orders from every channel land in one queue, routed to a carrier that can meet each marketplace's delivery window.",
  path: "/integrations/tech/marketplaces",
});

const USE_CASES = [
  {
    headline: "Amazon, eBay and TikTok Shop in one queue",
    description:
      "A seller across three channels. We pull Amazon, eBay and TikTok Shop orders into one queue, and route each to a carrier that can meet that marketplace's delivery window. Far fewer orders slip into a penalty.",
    namedIntegrations: ["Amazon", "eBay", "TikTok Shop"],
  },
  {
    headline: "Etsy plus Royal Mail Tracked 24",
    description:
      "A craft seller on Etsy shipping small parcels at home and abroad. Etsy orders default to Royal Mail Tracked 24 in the UK and Royal Mail International Tracked for export, with Evri ParcelShop as the fallback where collection is patchy. Tracking pushes back into Etsy so buyers get the right link.",
    namedIntegrations: ["Etsy", "Royal Mail", "Evri"],
  },
  {
    headline: "Walmart and Shopify in the same queue",
    description:
      "A brand selling DTC on Shopify and on Walmart Marketplace. We pull both order streams into one queue, holding Walmart's On Time Delivery window on its orders and routing the Shopify ones on our rates. The dispatch team runs a single queue.",
    namedIntegrations: ["Walmart", "Shopify"],
  },
  {
    headline: "Zalando plus a European returns network",
    description:
      "A fashion brand on Zalando across Germany, France and the Netherlands. Dispatch goes via DPD and DHL Parcel, and returns route through our returns portal with pre-paid labels set to Zalando's requirements. Each return logs back into the brand's order system.",
    namedIntegrations: ["Zalando", "DPD", "DHL Parcel"],
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Pull orders with their SLA",
    description:
      "Each integration brings the order and its SLA: Amazon's promised delivery date, eBay's estimated range, Walmart's On Time Delivery threshold. That SLA becomes a routing constraint.",
  },
  {
    step: 2,
    title: "Route to a carrier that can meet the SLA",
    description:
      "We rule out any carrier that can't make the promised date, then take the best-priced one of those that can. If none can hit it, the order surfaces in the exceptions queue before the marketplace notices.",
  },
  {
    step: 3,
    title: "Confirm the shipment back to the marketplace",
    description:
      "The carrier and tracking push back under the right seller account, through each marketplace's own confirmation API. Nothing is uploaded by hand.",
  },
];

const FAQ = [
  {
    question: "Which marketplaces do you integrate with?",
    answer:
      "Amazon, eBay, Etsy, Walmart, Zalando, Temu and TikTok Shop, with more added over time.",
  },
  {
    question: "Does ITD integrate with Amazon Seller Central?",
    answer:
      "Yes, native. Orders pull in with the delivery promise attached, and the carrier and tracking confirm back through Amazon's API.",
  },
  {
    question: "Can I run Amazon, eBay and Shopify orders in one place?",
    answer:
      "Yes. Marketplace and store orders land in the same queue, each routed to a carrier that can meet its window.",
  },
  {
    question: "Do you handle marketplace returns?",
    answer:
      "Yes. Returns route through our returns portal with pre-paid labels set to each marketplace's requirements, and log back into your order system.",
  },
  {
    question: "What if a marketplace I sell on isn't listed?",
    answer:
      "We can still connect it. Our API and custom integrations pull orders in with their SLA and confirm tracking back, the same as a native connector.",
  },
  {
    question: "Do penalties really stop?",
    answer:
      "We can't promise a marketplace never penalises you. But routing each order to a carrier that can meet its window means far fewer slip through, and the exceptions queue flags the ones at risk before the marketplace does.",
  },
];

export default function MarketplacesPage() {
  const integrations = getIntegrationsByType("tech").filter(
    (t) => t.category === "marketplace"
  );

  return (
    <IntegrationCategoryPage
      heroLabel="Marketplaces"
      title="Marketplace integrations for multi-channel sellers."
      subtitle="We connect to Amazon, eBay, Etsy, Walmart, Zalando, Temu and TikTok Shop. Orders from each channel land in one queue, routed to a carrier that can meet that marketplace's delivery window, so fewer of them slip into a penalty."
      heroPrimaryCta={{ label: "Talk to us", href: "/contact" }}
      heroVisual={<MarketplaceOrbit />}
      integrations={integrations}
      useCasesHeading="A few of the ways multi-channel sellers run these integrations"
      useCasesIntro="Each pulls the order and its SLA, then pushes tracking back to the right marketplace account."
      useCases={USE_CASES}
      howItWorksHeading="How it works"
      howItWorksIntro="Marketplaces work differently from a plain eCommerce store in two ways. The order carries an SLA the carrier has to meet, and the marketplace polices it with penalty fees and rating drops. We handle both at the routing step."
      howItWorks={HOW_IT_WORKS}
      faq={FAQ}
      closingCta={{
        headline: "Sell across channels, dispatch from one place.",
        subhead:
          "Connect the channels you sell on and dispatch them from one queue, each order on a carrier that can meet its window.",
        primary: { label: "Talk to us", href: "/contact" },
        secondary: { label: "Browse all tech integrations", href: "/integrations/tech" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Integrations", path: "/integrations" },
        { name: "Tech integrations", path: "/integrations/tech" },
        { name: "Marketplaces", path: "/integrations/tech/marketplaces" },
      ]}
    />
  );
}
