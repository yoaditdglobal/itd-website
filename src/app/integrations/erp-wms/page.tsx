import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { getIntegrations } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { itemListSchema } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "ERP and WMS integrations",
  description:
    "Your ERP or WMS stays the source of truth. We plug in so orders pull in and shipping data writes back when a label prints — NetSuite, Linnworks, Mintsoft, Magento, OrderWise and more.",
  path: "/integrations/erp-wms",
});

export default function ErpWmsPage() {
  const integrations = getIntegrations("tech", "erp_wms");

  return (
    <IntegrationCategoryPage
      title="Your ERP and WMS stay the source of truth. We handle the carriers."
      subtitle="We plug into the ERP or WMS your team already runs, so it stays your single source of truth. Orders pull in, and shipping data writes back the moment a label prints."
      integrations={integrations}
      heroLabel="ERP and WMS"
      heroH1="Your ERP and WMS stay the source of truth. We handle the carriers."
      heroSubhead="We plug into the ERP or WMS your team already runs, so it stays your single source of truth. Orders pull in, and shipping data writes back the moment a label prints."
      heroPrimaryCta={{ label: "Contact Us", href: "/contact?enquiry=erp-wms" }}
      heroSecondaryCta={{ label: "Explore", href: "/integrations/tech" }}
      useCasesHeading="How teams use it"
      useCasesIntro="These are setups teams run today. Each one's a native connection, so your orders and shipping data stay in step without anyone copying between screens."
      useCases={[
        {
          headline: "NetSuite plus DHL Express for cross-border B2B",
          description:
            "A manufacturer running NetSuite. Orders pull in with the weight and destination the label needs, our DHL Express rate is applied, and the label prints. The tracking writes straight back into NetSuite.",
          namedIntegrations: ["NetSuite", "DHL Express"],
        },
        {
          headline: "NetSuite plus FedEx and UPS for North American export",
          description:
            "A brand running NetSuite. On each order we compare FedEx and UPS rates and pick the better one. The label prints, and the carrier and tracking write back into NetSuite.",
          namedIntegrations: ["NetSuite", "FedEx", "UPS"],
        },
        {
          headline: "Linnworks plus seven UK carriers",
          description:
            "A multi-channel seller on Linnworks. One connection brings seven UK carriers and their rates into the dispatch screen, so each order goes on the best-priced one. The label prints and tracking writes back, with no per-carrier integration to maintain.",
          namedIntegrations: ["Linnworks", "Royal Mail", "DPD", "Evri", "Yodel", "Parcel Force", "Amazon Shipping", "DHL Express"],
        },
        {
          headline: "Mintsoft plus 3PL brand routing",
          description:
            "A Mintsoft warehouse fulfilling for 60 brands. The connection pulls each brand's orders with its own routing rules, then applies the right carrier and rate. The label prints and tracking writes back per brand.",
          namedIntegrations: ["Mintsoft", "Royal Mail", "DPD", "DHL Express", "FedEx"],
        },
      ]}
      howItWorksHeading="How it works"
      howItWorksIntro="ERP and WMS connections move more data both ways than an eCommerce or marketplace one. Each connector does three things."
      howItWorks={[
        {
          step: 1,
          title: "Order pull.",
          description:
            "Your ERP or WMS sends each confirmed order across, with the weight, destination, service level and delivery date the label needs. Polling, webhook and event-driven options are all supported.",
        },
        {
          step: 2,
          title: "Carrier rates and label.",
          description:
            "We compare the active carriers on each order and apply the best-priced compliant one. The label generates in the right format for the carrier and your warehouse printer.",
        },
        {
          step: 3,
          title: "Write-back.",
          description:
            "The carrier, tracking number, dispatch time and freight cost write straight back into your ERP or WMS. Your team sees tracking in the system they already use, with no second login.",
        },
      ]}
      faq={[
        {
          question: "Does ITD integrate with NetSuite?",
          answer:
            "Yes. NetSuite is native: orders pull in, labels print on our carrier rates, and the carrier and tracking write back.",
        },
        {
          question: "Does ITD work with Linnworks and Mintsoft?",
          answer:
            "Yes, both are native. One connection brings our carriers and rates into the tool you already run.",
        },
        {
          question: "Does ITD work with ShipHero, StoreFeeder or Veeqo?",
          answer:
            "Yes, all three are live and native, with order pull, label generation and write-back as standard.",
        },
        {
          question: "What ERPs and order systems do you support today?",
          answer:
            "NetSuite, Linnworks, Mintsoft, Magento, OrderWise, Peoplevox, Selro, Tradepeg, JonasSports, Brightpearl, ShipHero, StoreFeeder and Veeqo, with more added most months.",
        },
        {
          question: "What if our system isn't on the list?",
          answer:
            "We can still connect it. Our API and custom integrations pull orders in and write the carrier and tracking back, the same as a native connector. Tell us what you run and we'll scope it.",
        },
        {
          question: "Do you have an API for custom integrations?",
          answer:
            "Yes. If your ERP or WMS isn't natively connected, our API lets us build the link, so orders pull in and labels and tracking flow back like any other integration.",
        },
      ]}
      closingCta={{
        headline: "Request a technical integration review.",
        subhead: "Let's go through your integration requirements together, so our dev team can get up to speed.",
        primary: { label: "Contact Us", href: "/contact?enquiry=erp-wms" },
        secondary: { label: "Explore", href: "/integrations/tech" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Integrations", path: "/integrations/tech" },
        { name: "ERP and WMS", path: "/integrations/erp-wms" },
      ]}
      jsonLd={[
        itemListSchema({
          path: "/integrations/erp-wms",
          name: "ERP and WMS integrations",
          items: [
            { name: "NetSuite", url: "/integrations/erp-wms#netsuite", description: "Cloud ERP. Orders pull in, labels print on our carrier rates, and carrier and tracking write back." },
            { name: "Linnworks", url: "/integrations/erp-wms#linnworks", description: "Multi-channel order management. One connection brings our UK carriers and rates into the dispatch screen." },
            { name: "Mintsoft", url: "/integrations/erp-wms#mintsoft", description: "Warehouse management for 3PLs. Each brand's orders pull with their own routing rules." },
            { name: "Magento", url: "/integrations/erp-wms#magento", description: "Adobe Commerce orders pull in for carrier selection, label generation, and tracking write-back." },
            { name: "OrderWise", url: "/integrations/erp-wms#orderwise", description: "Business management and WMS. Orders pull in and shipping data writes back." },
            { name: "Peoplevox", url: "/integrations/erp-wms#peoplevox", description: "eCommerce warehouse management. Native order pull, label generation, and write-back." },
            { name: "Selro", url: "/integrations/erp-wms#selro", description: "Multi-channel order management. Native connection with order pull and write-back." },
            { name: "Tradepeg", url: "/integrations/erp-wms#tradepeg", description: "Inventory and order management. Orders pull in and carrier and tracking write back." },
            { name: "JonasSports", url: "/integrations/erp-wms#jonassports", description: "Retail and ERP for sports. Native order pull, label generation, and write-back." },
            { name: "Brightpearl", url: "/integrations/erp-wms#brightpearl", description: "Retail operations platform. Orders pull in and shipping data writes back." },
            { name: "ShipHero", url: "/integrations/erp-wms#shiphero", description: "Warehouse and shipping management for 3PLs and brands. Live and native." },
            { name: "StoreFeeder", url: "/integrations/erp-wms#storefeeder", description: "Multi-channel listing and order management. Native order pull, labels, and write-back." },
            { name: "Veeqo", url: "/integrations/erp-wms#veeqo", description: "Inventory and shipping platform. Native order pull, label generation, and write-back." },
          ],
        }),
      ]}
    />
  );
}
