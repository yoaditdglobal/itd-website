import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import FaqSection from "@/components/sections/FaqSection";
import IntegrationsCatalogue from "@/components/sections/IntegrationsCatalogue";
import { JsonLd, breadcrumbSchema, faqSchema, itemListSchema } from "@/components/seo/JsonLd";
import { integrations } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Integrations directory for Connexx shipping software",
  description:
    "Connexx connects to 26 ERP, WMS, eCommerce, and marketplace tools plus 18 carriers across the UK, EU, and global. One stack, every dispatch.",
  path: "/integrations",
});

const useCases = [
  {
    headline: "Shopify plus Royal Mail and DPD",
    description:
      "Online retailer running on Shopify with negotiated rates at Royal Mail and DPD. Orders pull into Connexx within seconds of checkout. The rate engine picks the cheaper compliant carrier for each parcel based on weight, postcode, and service level. Tracking pushes back into Shopify so the customer sees the right link in the order confirmation.",
    namedIntegrations: ["Shopify", "Royal Mail", "DPD"],
  },
  {
    headline: "SAP plus DHL Express for cross-border B2B",
    description:
      "Manufacturer running SAP for orders and finance. Connexx pulls confirmed orders from SAP, runs the customs paperwork against the HS codes already in the SAP product master, and books DHL Express for the international leg. Tracking and POD write back into SAP for the AR team.",
    namedIntegrations: ["SAP", "DHL Express"],
  },
  {
    headline: "Linnworks plus seven UK carriers",
    description:
      "Multi-channel seller using Linnworks for inventory and order management. Connexx replaces the carrier integrations inside Linnworks with a single connection that exposes Royal Mail, DPD, Evri, Yodel, Parcel Force, Amazon Shipping, and DHL Express. The seller stops paying per-carrier integration fees inside Linnworks and gets rate comparison on every dispatch.",
    namedIntegrations: ["Linnworks", "Royal Mail", "DPD", "Evri", "Yodel", "Parcel Force", "Amazon Shipping", "DHL Express"],
  },
  {
    headline: "Amazon plus eBay plus TikTok Shop into one queue",
    description:
      "Marketplace seller across three channels. Connexx pulls orders from Amazon Seller Central, eBay, and TikTok Shop into one dispatch queue. SLA-aware routing applies Amazon's \"Get it by\" promise, eBay's estimated delivery, and TikTok Shop's fulfilment window before the rate engine chooses a carrier. Penalty fees go to zero because no order misses its SLA.",
    namedIntegrations: ["Amazon", "eBay", "TikTok Shop"],
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Connect.",
    description:
      "Connexx supports OAuth, API key, and SFTP connections. Most ERP and eCommerce connectors take under 10 minutes to authorise. Carrier accounts use your existing rate cards and child accounts.",
  },
  {
    step: 2,
    title: "Configure.",
    description:
      "Map your products, your service levels, and your routing rules. The platform ships with sensible defaults for UK and EU dispatch. You override per market, per product, or per customer segment.",
  },
  {
    step: 3,
    title: "Dispatch.",
    description:
      "Orders flow in. Labels print out. Tracking syncs back. Exceptions surface in one dashboard. The team works in Connexx, not in the underlying portals.",
  },
];

const faqItems = [
  {
    question: "What does Connexx integrate with?",
    answer:
      "Connexx connects to 26 ERP, WMS, eCommerce, and marketplace tools and 18 carriers. The full list includes SAP, Oracle NetSuite, Microsoft Dynamics, Sage, Cin7, Linnworks, Mintsoft, Selro, ShipHero, StoreFeeder, Veeqo, Shopify, WooCommerce, Magento, BigCommerce, Amazon, eBay, Etsy, Walmart, Zalando, Temu, TikTok Shop, ShipStation, Shippo, Freightview, and Project44. The carrier list includes Royal Mail, DPD, Evri, Parcel Force, Yodel, Amazon Shipping, DHL Express, FedEx, UPS, TNT, Aramex, PostNL, GLS, Australia Post, DHL Parcel, Deutsche Post, Evri EU, and InPost.",
  },
  {
    question: "Does Connexx have a public API?",
    answer:
      "Yes. Connexx exposes a REST API for order creation, label generation, rate quoting, tracking, and returns. The API documentation is published with example requests for every endpoint. Custom integrations beyond the standard connector list use the same API. We also expose webhooks for tracking, exception, and POD events so your downstream systems stay in sync without polling.",
  },
  {
    question: "How long does it take to set up a new integration?",
    answer:
      "Most Shopify and WooCommerce stores are live in under 10 minutes through the native app. ERP-connected setups across SAP, Oracle NetSuite, Microsoft Dynamics, and Sage take three to five business days depending on the scope of write-back required. Carrier accounts activate as soon as the rate card is loaded and a label-printing test passes.",
  },
  {
    question: "Can I use my own negotiated carrier rates?",
    answer:
      "Yes. Connexx supports your existing carrier accounts and rate cards across Royal Mail, DPD, Evri, Parcel Force, Yodel, Amazon Shipping, DHL Express, FedEx, UPS, and the other carriers in the list. If your contracts are weak, ITD's combined volume across thousands of UK shippers unlocks better rates. You keep the relationship, we improve the price.",
  },
  {
    question: "Do I need to leave my current ERP or eCommerce platform?",
    answer:
      "No. Connexx sits alongside SAP, Oracle NetSuite, Microsoft Dynamics, Sage, Shopify, WooCommerce, Magento, BigCommerce, Linnworks, Mintsoft, Veeqo, ShipHero, StoreFeeder, and Selro. Orders flow in from the system of record. Dispatch happens in Connexx. The system of record stays the system of record.",
  },
  {
    question: "What if my carrier isn't on the list?",
    answer:
      "We add new carriers on request. Most onboardings take two to four weeks depending on the carrier's API maturity. If you have a regional or niche carrier we don't currently support, send the name and contract details and we'll scope the work.",
  },
  {
    question: "Does Connexx replace ShipStation?",
    answer:
      "It can. Many customers move from ShipStation to Connexx for the rate comparison, customs automation, and UK and EU carrier depth. Others keep ShipStation for non-UK volume and use Connexx for everything UK and EU. Both setups are supported.",
  },
];

const itemListItems = [
  { name: "SAP", url: "/integrations/erp-wms#sap", description: "Enterprise ERP integration with order and shipping write-back." },
  { name: "Oracle NetSuite", url: "/integrations/erp-wms#oracle-netsuite", description: "Cloud ERP connector for SuiteCommerce and stand-alone ERP." },
  { name: "Microsoft Dynamics", url: "/integrations/erp-wms#microsoft-dynamics", description: "Dynamics 365 Business Central and Finance & Operations." },
  { name: "Sage", url: "/integrations/erp-wms#sage", description: "Sage 50, Sage 200, and Sage Intacct accounting and ERP." },
  { name: "Cin7", url: "/integrations/erp-wms#cin7", description: "Inventory and warehouse management for multi-channel sellers." },
  { name: "Linnworks", url: "/integrations/erp-wms#linnworks", description: "Multi-channel order and inventory management." },
  { name: "Mintsoft", url: "/integrations/erp-wms#mintsoft", description: "Warehouse management system for 3PLs and brand fulfilment." },
  { name: "Selro", url: "/integrations/erp-wms#selro", description: "Multi-channel listing and order management." },
  { name: "ShipHero", url: "/integrations/erp-wms#shiphero", description: "Warehouse and shipping management for 3PLs and brands." },
  { name: "StoreFeeder", url: "/integrations/erp-wms#storefeeder", description: "Multi-channel listing and order management for retailers." },
  { name: "Veeqo", url: "/integrations/erp-wms#veeqo", description: "Inventory and shipping platform owned by Amazon." },
  { name: "ShipStation", url: "/integrations/logistics#shipstation", description: "Shipping automation Connexx runs alongside or replaces." },
  { name: "Shippo", url: "/integrations/logistics#shippo", description: "Multi-carrier shipping API." },
  { name: "Freightview", url: "/integrations/logistics#freightview", description: "Freight rate comparison for LTL and FTL." },
  { name: "Project44", url: "/integrations/logistics#project44", description: "Supply chain visibility for in-transit shipments." },
  { name: "Shopify", url: "/integrations/ecommerce#shopify", description: "Direct app. Orders flow in within seconds of checkout." },
  { name: "WooCommerce", url: "/integrations/ecommerce#woocommerce", description: "WordPress plugin. Multi-carrier shipping inside the WP admin." },
  { name: "Magento", url: "/integrations/ecommerce#magento", description: "Adobe Commerce and Magento 2 with multi-carrier routing rules." },
  { name: "BigCommerce", url: "/integrations/ecommerce#bigcommerce", description: "SaaS storefronts route every order through Connexx." },
  { name: "Amazon", url: "/integrations/marketplaces#amazon", description: "Seller Central and FBM order pull with SLA-aware routing." },
  { name: "eBay", url: "/integrations/marketplaces#ebay", description: "UK and international eBay seller integration." },
  { name: "Etsy", url: "/integrations/marketplaces#etsy", description: "Etsy shop connector with Tracked 24 and Royal Mail defaults." },
  { name: "Walmart", url: "/integrations/marketplaces#walmart", description: "Walmart Marketplace orders into the same dispatch queue." },
  { name: "Zalando", url: "/integrations/marketplaces#zalando", description: "European fashion marketplace with returns workflow." },
  { name: "Temu", url: "/integrations/marketplaces#temu", description: "Global marketplace order pull." },
  { name: "TikTok Shop", url: "/integrations/marketplaces#tiktok-shop", description: "Social commerce orders into the multi-carrier dashboard." },
];

export default function IntegrationsPage() {
  const techIntegrations = integrations.filter((i) => i.type === "tech");
  const carrierIntegrations = integrations.filter((i) => i.type === "carrier");

  const ldData = [
    itemListSchema({
      path: "/integrations",
      name: "Connexx integrations directory",
      items: itemListItems,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Integrations", path: "/integrations" },
    ]),
    faqSchema(faqItems),
  ];

  return (
    <>
      <JsonLd data={ldData} />

      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-eyebrow mb-4">
                Integrations
              </span>
              <h1 className="text-display-xl text-text-primary">
                Every integration you need to dispatch on Connexx.
              </h1>
              <p className="mt-4 text-lg text-text-secondary">
                Connexx connects to {techIntegrations.length} ERP, WMS, eCommerce, and marketplace tools and {carrierIntegrations.length} carriers across the UK, EU, and the rest of the world. Orders flow in. Labels print out. Tracking syncs back. No CSV exports, no parallel portals, no copy-paste between systems your team already pays for.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="#catalogue">Find your stack</Button>
                <Button href="/contact?enquiry=integrations" variant="secondary">
                  Request a tailored integration review
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Catalogue (client component for tab filtering) */}
      <IntegrationsCatalogue
        techIntegrations={techIntegrations}
        carrierIntegrations={carrierIntegrations}
      />

      {/* Common use cases */}
      <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-3">Common use cases</h2>
            <p className="text-text-secondary max-w-2xl mb-10">
              The deployment patterns Connexx customers use most. Every named integration is live today.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((uc, i) => (
              <ScrollReveal key={uc.headline} delay={i * 0.05}>
                <div className="bg-white rounded-2xl border border-border p-6 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">{uc.headline}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">{uc.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {uc.namedIntegrations.map((name) => (
                      <span
                        key={name}
                        className="inline-block text-[11px] font-medium uppercase tracking-wider text-accent bg-accent-light px-2.5 py-1 rounded-full"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How the integration works */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-3">How the integration works</h2>
            <p className="text-text-secondary max-w-2xl mb-10">
              Three steps. The same flow whether you&apos;re connecting an ERP, an online store, or a carrier account.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.05}>
                <div className="bg-bg-secondary rounded-2xl border border-border p-6 h-full">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent-light text-accent text-base font-bold mb-4">
                    {s.step}
                  </span>
                  <h3 className="text-base font-semibold text-text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={faqItems} />

      {/* Missing integration nudge */}
      <section className="bg-white py-12 md:py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h3 className="text-xl font-semibold text-text-primary">Don&apos;t see your integration?</h3>
            <p className="mt-2 text-text-secondary">We&apos;re adding new integrations every month. Tell us what you need.</p>
            <div className="mt-6">
              <Button href="/contact?enquiry=integrations">Request an Integration</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-bg-dark py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">
              Find out if your stack already works with Connexx.
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Send us the tools you run today. We&apos;ll tell you what&apos;s plug-and-play, what needs configuration, and what we&apos;ll build.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/contact?enquiry=integrations" surface="dark">
                Request a tailored integration review
              </Button>
              <Button href="#carriers" variant="secondary" surface="dark">
                See the carrier list
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
