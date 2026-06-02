import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { getIntegrations } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { itemListSchema } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "ERP and WMS integrations",
  description:
    "Connect Connexx to SAP, NetSuite, Microsoft Dynamics, Sage, Cin7, Linnworks, Mintsoft, Veeqo, ShipHero, StoreFeeder, and Selro.",
  path: "/integrations/erp-wms",
});

export default function ErpWmsPage() {
  const integrations = getIntegrations("tech", "erp_wms");

  return (
    <IntegrationCategoryPage
      title="ERP and WMS integrations"
      subtitle="Connexx connects to the ERP and WMS systems your finance and operations teams already run. Orders pull in from the system of record. Shipping data writes back the moment a label prints. The dispatch team works in Connexx. The finance team keeps SAP, NetSuite, Sage, or Dynamics as the source of truth."
      integrations={integrations}
      heroLabel="ERP and WMS"
      heroH1="ERP and WMS integrations for multi-carrier dispatch."
      heroSubhead="Connexx connects to the ERP and WMS systems your finance and operations teams already run. Orders pull in from the system of record. Shipping data writes back the moment a label prints. The dispatch team works in Connexx. The finance team keeps SAP, NetSuite, Sage, or Dynamics as the source of truth."
      heroPrimaryCta={{ label: "Request a technical integration review", href: "/contact?enquiry=erp-wms" }}
      heroSecondaryCta={{ label: "Browse the full integrations directory", href: "/integrations" }}
      useCasesIntro="Eleven ERP and WMS integrations live today. All connections are native, with order pull, label generation, and shipping write-back included as standard."
      useCases={[
        {
          headline: "SAP plus DHL Express for cross-border B2B",
          description:
            "Manufacturer with SAP S/4HANA. Confirmed orders pull into Connexx with the HS code, EORI number, and value already on the order line. The customs paperwork generates against the SAP product master. DHL Express books the international leg. Tracking and POD write back into SAP for the AR team.",
          namedIntegrations: ["SAP", "DHL Express"],
        },
        {
          headline: "NetSuite plus FedEx and UPS for North American export",
          description:
            "Brand running NetSuite for global orders. Connexx selects between FedEx and UPS on every parcel using live rates, weight bands, and service level. Item fulfilment records update with the carrier, tracking number, and dispatch timestamp. Returns post back as RMAs.",
          namedIntegrations: ["Oracle NetSuite", "FedEx", "UPS"],
        },
        {
          headline: "Linnworks plus seven UK carriers",
          description:
            "Multi-channel seller using Linnworks for inventory and order management. Connexx replaces the per-carrier integrations inside Linnworks with one connection exposing Royal Mail, DPD, Evri, Yodel, Parcel Force, Amazon Shipping, and DHL Express. The seller stops paying per-carrier integration fees and gets rate comparison on every dispatch.",
          namedIntegrations: ["Linnworks", "Royal Mail", "DPD", "Evri", "Yodel", "Parcel Force", "Amazon Shipping", "DHL Express"],
        },
        {
          headline: "Mintsoft plus 3PL brand routing",
          description:
            "Mintsoft warehouse running fulfilment for 60 brands. Each brand has different carrier preferences, weight rules, and service-level constraints. Connexx applies the brand-specific routing rules at the moment of label generation. Compliance checks run before the label prints.",
          namedIntegrations: ["Mintsoft", "Royal Mail", "DPD", "DHL Express", "FedEx"],
        },
      ]}
      howItWorksHeading="How the ERP and WMS integration works"
      howItWorksIntro="ERP and WMS integrations carry more data both ways than eCommerce or marketplace connections. Connexx ships with three components for every ERP and WMS connector."
      howItWorks={[
        {
          step: 1,
          title: "Order pull.",
          description:
            "The ERP or WMS sends confirmed orders to Connexx. Field mapping covers customer details, line items with weight and HS code, service level, and delivery date. Polling, webhook, and event-driven options are all supported.",
        },
        {
          step: 2,
          title: "Carrier booking and label generation.",
          description:
            "The Connexx rate engine compares every active carrier on every order. The cheapest compliant carrier is selected. Labels generate in the right format for the carrier and the warehouse printer.",
        },
        {
          step: 3,
          title: "Write-back.",
          description:
            "Carrier name, tracking number, dispatch timestamp, freight cost, and POD write back into the ERP or WMS. Finance reconciles freight against the carrier invoice. Customer service sees tracking inside the system of record without a second login.",
        },
      ]}
      faq={[
        {
          question: "Does Connexx work with SAP?",
          answer:
            "Yes. Connexx integrates with SAP S/4HANA and SAP ECC. Orders pull from the SD module. Tracking, freight cost, and POD write back to the same module. The integration supports both polling and IDoc/event-driven order release. Setup takes three to five business days depending on your write-back scope and whether you use SAP Business Network for carrier collaboration.",
        },
        {
          question: "Does Connexx integrate with Oracle NetSuite?",
          answer:
            "Yes. Connexx connects to NetSuite as a SuiteApp. Both SuiteCommerce orders and stand-alone NetSuite orders are supported. Item fulfilment records update automatically with the carrier, tracking number, and shipping cost. Returns post as RMA records. The connector handles multi-subsidiary setups and OneWorld instances.",
        },
        {
          question: "Does Connexx integrate with Sage?",
          answer:
            "Yes. Connexx supports Sage 50, Sage 200, and Sage Intacct. Sales order numbers link to shipments inside Connexx so finance and operations work from the same identifier. Freight cost posts back to the order for invoice matching. The integration sits alongside Sage rather than replacing any Sage module.",
        },
        {
          question: "Does Connexx work with Microsoft Dynamics?",
          answer:
            "Yes. Connexx connects to Dynamics 365 Business Central and Dynamics 365 Finance & Operations. Sales order and shipment statuses sync in both directions. The integration uses the Dynamics OData API and supports custom field mapping for industry-specific extensions.",
        },
        {
          question: "Does Connexx work with Linnworks, Mintsoft, or Veeqo?",
          answer:
            "Yes to all three. Linnworks uses Connexx as a single carrier connection that replaces multiple per-carrier integrations inside Linnworks. Mintsoft customers use Connexx for label printing, manifesting, and rate comparison across their 3PL brand book. Veeqo customers use Connexx alongside Veeqo for UK and EU carrier depth.",
        },
        {
          question: "Does Connexx work with Cin7, ShipHero, or StoreFeeder?",
          answer:
            "Yes. Cin7 connects via API for inventory, order, and shipment events. ShipHero integrates for warehouse and shipping management across 3PLs and brands. StoreFeeder connects for multi-channel listing and order management. All three activate within one to two business days.",
        },
        {
          question: "What ERPs and WMSs does Connexx support today?",
          answer:
            "Eleven, all native: SAP, Oracle NetSuite, Microsoft Dynamics, Sage, Cin7, Linnworks, Mintsoft, Selro, ShipHero, StoreFeeder, and Veeqo. If your system is not on the list, the Connexx REST API supports custom integrations using the same order, label, tracking, and POD endpoints.",
        },
      ]}
      closingCta={{
        headline: "Request a technical integration review.",
        subhead: "Bring your ERP or WMS specifics. We'll map the order, label, and write-back flow before you commit.",
        primary: { label: "Contact Us", href: "/contact?enquiry=erp-wms" },
        secondary: { label: "Explore", href: "/integrations" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Integrations", path: "/integrations" },
        { name: "ERP and WMS", path: "/integrations/erp-wms" },
      ]}
      jsonLd={[
        itemListSchema({
          path: "/integrations/erp-wms",
          name: "ERP and WMS integrations",
          items: [
            { name: "SAP", url: "/integrations/erp-wms#sap", description: "Enterprise ERP integration with SAP S/4HANA and ECC. Orders pull from the SD module. Tracking and POD write back." },
            { name: "Oracle NetSuite", url: "/integrations/erp-wms#oracle-netsuite", description: "Cloud ERP connector. SuiteCommerce and stand-alone NetSuite supported. Item fulfilment records update automatically." },
            { name: "Microsoft Dynamics", url: "/integrations/erp-wms#microsoft-dynamics", description: "Dynamics 365 Business Central and Finance & Operations. Sales order and shipment statuses sync both ways." },
            { name: "Sage", url: "/integrations/erp-wms#sage", description: "Sage 50, Sage 200, and Sage Intacct. Shipments and tracking link by sales order number." },
            { name: "Cin7", url: "/integrations/erp-wms#cin7", description: "Inventory and warehouse management for multi-channel sellers." },
            { name: "Linnworks", url: "/integrations/erp-wms#linnworks", description: "Multi-channel order management. One Connexx connection replaces per-carrier integrations inside Linnworks." },
            { name: "Mintsoft", url: "/integrations/erp-wms#mintsoft", description: "Warehouse management system for 3PLs and brand fulfilment. Picks flow into Connexx for label printing." },
            { name: "Selro", url: "/integrations/erp-wms#selro", description: "Multi-channel listing and order management." },
            { name: "ShipHero", url: "/integrations/erp-wms#shiphero", description: "Warehouse and shipping management for 3PLs and brands." },
            { name: "StoreFeeder", url: "/integrations/erp-wms#storefeeder", description: "Multi-channel listing and order management for retailers." },
            { name: "Veeqo", url: "/integrations/erp-wms#veeqo", description: "Inventory and shipping platform. Used alongside Veeqo for UK and EU carrier depth." },
          ],
        }),
      ]}
    />
  );
}
