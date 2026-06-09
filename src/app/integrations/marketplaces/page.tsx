import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { getIntegrations } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { itemListSchema } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Marketplace integrations",
  description:
    "Connect Connexx to Amazon, eBay, Etsy, Walmart, Zalando, Temu, and TikTok Shop. One dispatch queue across every channel you sell on.",
  path: "/integrations/marketplaces",
});

export default function MarketplacesPage() {
  const integrations = getIntegrations("tech", "marketplace");

  return (
    <IntegrationCategoryPage
      title="Marketplace integrations for sellers across multiple channels."
      subtitle="Connexx connects to Amazon, eBay, Etsy, Walmart, Zalando, Temu, and TikTok Shop. Orders from every channel land in one dispatch queue. SLA-aware routing applies the right carrier for each marketplace's promised delivery window. Penalty fees stop. Late shipments stop. Your seller rating goes the right direction."
      integrations={integrations}
      heroLabel="Marketplaces"
      heroH1="Marketplace integrations for sellers across multiple channels."
      heroSubhead="Connexx connects to Amazon, eBay, Etsy, Walmart, Zalando, Temu, and TikTok Shop. Orders from every channel land in one dispatch queue. SLA-aware routing applies the right carrier for each marketplace's promised delivery window. Penalty fees stop. Late shipments stop. Your seller rating goes the right direction."
      heroPrimaryCta={{ label: "Pull every marketplace order into one queue", href: "/contact?enquiry=marketplaces" }}
      heroSecondaryCta={{ label: "Browse the full integrations directory", href: "/integrations/tech" }}
      useCasesIntro="Seven marketplace integrations live today. Each one pulls orders, applies SLA rules, and pushes tracking back to the marketplace under the right account."
      useCases={[
        {
          headline: "Amazon plus eBay plus TikTok Shop in one queue",
          description:
            "Marketplace seller running across three channels. Connexx pulls orders from Amazon Seller Central, eBay, and TikTok Shop into one dispatch queue. SLA-aware routing applies Amazon's \"Get it by\" promise, eBay's estimated delivery, and TikTok Shop's fulfilment window before the rate engine chooses a carrier. Penalty fees go to zero because no order misses its SLA.",
          namedIntegrations: ["Amazon", "eBay", "TikTok Shop"],
        },
        {
          headline: "Etsy plus Royal Mail Tracked 24",
          description:
            "Craft seller on Etsy shipping small parcels across the UK and internationally. Connexx defaults Etsy orders to Royal Mail Tracked 24 for UK and Royal Mail International Tracked for export. Evri ParcelShop is the fallback for postcodes where Royal Mail collection is unreliable. Tracking pushes back into Etsy so buyers see the right link.",
          namedIntegrations: ["Etsy", "Royal Mail", "Evri"],
        },
        {
          headline: "Walmart Marketplace into the same queue as Shopify",
          description:
            "Brand selling DTC on Shopify and as a Marketplace seller on Walmart. Connexx pulls both order streams into one queue. Walmart's \"On Time Delivery\" SLA is enforced for Walmart orders. Shopify orders run on the standard rate comparison. The dispatch team works one queue, not two.",
          namedIntegrations: ["Walmart", "Shopify", "FedEx", "UPS"],
        },
        {
          headline: "Zalando plus European returns network",
          description:
            "Fashion brand selling on Zalando across Germany, France, and the Netherlands. Connexx handles the dispatch via DPD and DHL Parcel. Returns route through the Connexx returns portal with pre-paid labels generated against Zalando's customer experience requirements. Returns log into the brand's order management system.",
          namedIntegrations: ["Zalando", "DPD", "DHL Parcel", "PostNL"],
        },
      ]}
      howItWorksHeading="How the marketplace integration works"
      howItWorksIntro="Marketplaces are different from eCommerce platforms in two ways. First, the order data carries an SLA the carrier must meet. Second, the marketplace polices that SLA with penalty fees and rating drops. Connexx handles both at the routing step."
      howItWorks={[
        {
          step: 1,
          title: "Pull orders with SLA metadata.",
          description:
            "Every marketplace integration brings the order plus the SLA. Amazon's promised delivery date. eBay's estimated delivery range. TikTok Shop's fulfilment window. Walmart's \"On Time Delivery\" threshold. The SLA becomes a routing constraint.",
        },
        {
          step: 2,
          title: "Route to the carrier that meets the SLA at the lowest cost.",
          description:
            "The rate engine filters out any carrier that won't make the promised delivery date. Among the carriers that will, the cheapest compliant one wins. If no carrier can hit the SLA, the order surfaces in the exceptions queue before the marketplace flags it.",
        },
        {
          step: 3,
          title: "Confirm the shipment back to the marketplace.",
          description:
            "The carrier name and tracking number push back to the marketplace under the right seller account. Amazon's Shipment Confirm API, eBay's tracking upload, Etsy's tracking update, Walmart's Shipment Notification, Zalando's tracking webhook, Temu's order update, and TikTok Shop's logistics API are all handled automatically.",
        },
      ]}
      faq={[
        {
          question: "Does Connexx integrate with Amazon Seller Central?",
          answer:
            "Yes. Connexx connects to Amazon Seller Central for FBM (Fulfilled by Merchant) orders. Orders pull into the dispatch queue with Amazon's promised delivery date attached. Carrier selection respects that date. Tracking pushes back via Amazon's Shipment Confirm API under your seller account. The integration supports SP-API (Selling Partner API). FBA orders are out of scope because Amazon handles the dispatch.",
        },
        {
          question: "Does Connexx work with eBay?",
          answer:
            "Yes. Connexx connects to eBay for UK and international seller accounts. Orders pull with eBay's estimated delivery dates, which feed the routing rules. Tracking pushes back through eBay's tracking upload so buyers see updates in their eBay account and in the eBay app. Multiple eBay accounts under one parent are supported for multi-brand sellers.",
        },
        {
          question: "Does Connexx support TikTok Shop?",
          answer:
            "Yes. TikTok Shop orders pull into the same dispatch queue as Amazon, eBay, and Etsy. TikTok Shop's fulfilment SLA is enforced at the routing step so orders meet the promised dispatch window. Tracking confirms back via TikTok Shop's logistics API. The integration supports both UK and US TikTok Shop seller accounts.",
        },
        {
          question: "Does Connexx integrate with Etsy?",
          answer:
            "Yes. Connexx connects to Etsy for craft and small-parcel sellers. The default routing pushes UK orders to Royal Mail Tracked 24 and international orders to Royal Mail International Tracked. Evri ParcelShop is the standard fallback. Tracking pushes back into Etsy and the buyer's order page shows the right link.",
        },
        {
          question: "Does Connexx work with Walmart Marketplace?",
          answer:
            "Yes. Connexx connects to Walmart Marketplace for US seller accounts. Walmart's \"On Time Delivery\" SLA is enforced at the routing step so orders meet Walmart's required dispatch and delivery windows. Tracking pushes back via Walmart's Shipment Notification API. The integration helps brands maintain Walmart's seller performance scorecard.",
        },
        {
          question: "Does Connexx integrate with Zalando?",
          answer:
            "Yes. Connexx connects to Zalando for European seller accounts across Germany, France, the Netherlands, and other Zalando markets. Returns are a first-class workflow: the Connexx returns portal generates pre-paid labels per Zalando's customer experience requirements. Tracking and POD push back to Zalando under the seller account.",
        },
        {
          question: "Can I run Amazon, eBay, and Shopify orders in one dashboard?",
          answer:
            "Yes. Connexx pulls orders from Amazon Seller Central, eBay, and Shopify into one dispatch queue. SLA rules apply per channel. Carrier selection respects each marketplace's delivery promise. Tracking pushes back to each platform under the correct account. The dispatch team works one queue across all sales channels.",
        },
      ]}
      closingCta={{
        headline: "Pull every marketplace order into one queue.",
        subhead: "Connect Amazon, eBay, Etsy, Walmart, Zalando, Temu, and TikTok Shop. Set the SLA rules once. Ship from one screen.",
        primary: { label: "Contact Us", href: "/contact?enquiry=marketplaces" },
        secondary: { label: "Learn More", href: "/resources/case-studies/west-ham-united" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Integrations", path: "/integrations/tech" },
        { name: "Marketplaces", path: "/integrations/marketplaces" },
      ]}
      jsonLd={[
        itemListSchema({
          path: "/integrations/marketplaces",
          name: "Marketplace integrations",
          items: [
            { name: "Amazon", url: "/integrations/marketplaces#amazon", description: "Seller Central and FBM order pull with SLA-aware carrier routing. Tracking pushes back via Amazon's Shipment Confirm API." },
            { name: "eBay", url: "/integrations/marketplaces#ebay", description: "UK and international eBay seller integration. Estimated delivery dates feed the routing rules so orders meet eBay's delivery promise." },
            { name: "Etsy", url: "/integrations/marketplaces#etsy", description: "Etsy shop connector. Default routing uses Royal Mail Tracked 24 with Evri fallback." },
            { name: "Walmart", url: "/integrations/marketplaces#walmart", description: "Walmart Marketplace orders pull into the same dispatch queue. SLA rules apply Walmart's On Time Delivery requirements." },
            { name: "Zalando", url: "/integrations/marketplaces#zalando", description: "European fashion marketplace with returns workflow. Pre-paid returns labels generate per Zalando's customer experience standard." },
            { name: "Temu", url: "/integrations/marketplaces#temu", description: "Global marketplace order pull. Orders dispatch through the cheapest compliant carrier on each lane." },
            { name: "TikTok Shop", url: "/integrations/marketplaces#tiktok-shop", description: "Social commerce orders into the multi-carrier dashboard. TikTok Shop's fulfilment SLA is enforced at the routing step." },
          ],
        }),
      ]}
    />
  );
}
