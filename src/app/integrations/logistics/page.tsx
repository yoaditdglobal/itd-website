import IntegrationCategoryPage from "@/components/sections/IntegrationCategoryPage";
import { getIntegrations } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { itemListSchema } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Logistics tool integrations",
  description:
    "Run Connexx alongside or in place of ShipStation, Shippo, Freightview, and Project44. UK and EU carrier depth, customs, and rate comparison built in.",
  path: "/integrations/logistics",
});

export default function LogisticsPage() {
  const integrations = getIntegrations("tech", "logistics");

  return (
    <IntegrationCategoryPage
      title="Logistics integrations for teams already using shipping software."
      subtitle="You don't need to rip out the logistics stack you already pay for. Connexx runs alongside ShipStation, Shippo, Freightview, and Project44, or replaces them when UK and EU carrier depth, customs automation, and rate comparison are the bottleneck. Pick the deployment that fits your roadmap, not the one the vendor wants."
      integrations={integrations}
      heroLabel="Logistics tools"
      heroH1="Logistics integrations for teams already using shipping software."
      heroSubhead="You don't need to rip out the logistics stack you already pay for. Connexx runs alongside ShipStation, Shippo, Freightview, and Project44, or replaces them when UK and EU carrier depth, customs automation, and rate comparison are the bottleneck. Pick the deployment that fits your roadmap, not the one the vendor wants."
      heroPrimaryCta={{ label: "Compare your current stack to Connexx", href: "/contact?enquiry=logistics" }}
      heroSecondaryCta={{ label: "Browse the full integrations directory", href: "/integrations" }}
      useCasesIntro="Four logistics tool integrations live today. Two patterns are supported: run alongside (Connexx handles UK and EU dispatch, the existing tool keeps its current scope) or replace (Connexx takes over carrier integration, rate comparison, and customs)."
      useCases={[
        {
          headline: "Migrate from ShipStation for UK and EU carrier depth",
          description:
            "UK retailer on ShipStation paying for per-carrier add-ons. The team needs rate comparison, customs automation, and child account support for Royal Mail, DPD, Evri, and Parcel Force. Connexx replaces ShipStation's UK and EU carrier integrations with a single connection. The retailer keeps ShipStation for US parcels or moves entirely, depending on volume mix.",
          namedIntegrations: ["ShipStation", "Royal Mail", "DPD", "Evri", "Parcel Force"],
        },
        {
          headline: "Run Connexx alongside Shippo for international API parcels",
          description:
            "Brand using Shippo's API for North American parcel volume. UK and EU dispatch sits inside Connexx for rate comparison across Royal Mail, DPD, DHL Express, and DHL Parcel. Both platforms expose tracking back to the order management system.",
          namedIntegrations: ["Shippo", "Royal Mail", "DPD", "DHL Express", "DHL Parcel"],
        },
        {
          headline: "Freightview for LTL plus Connexx for parcel and express",
          description:
            "Wholesaler using Freightview for LTL and FTL rate comparison. Parcel and express volume runs through Connexx for rate comparison across Royal Mail, DPD, Parcel Force, FedEx, and UPS. Each tool handles its own mode without overlap.",
          namedIntegrations: ["Freightview", "Royal Mail", "DPD", "Parcel Force", "FedEx", "UPS"],
        },
        {
          headline: "Project44 visibility plus Connexx dispatch",
          description:
            "Enterprise shipper using Project44 for in-transit visibility across multiple carriers. Connexx handles the dispatch decision and label generation. Tracking events from Royal Mail, DPD, DHL Express, FedEx, and UPS push into Project44 via webhook for the supply chain control tower.",
          namedIntegrations: ["Project44", "Royal Mail", "DPD", "DHL Express", "FedEx", "UPS"],
        },
      ]}
      howItWorksHeading="How the logistics tool integration works"
      howItWorksIntro="The integration model depends on what you're keeping and what you're replacing. We don't push migration. We push the deployment pattern that gets you fewer manual steps and a better margin."
      howItWorks={[
        {
          step: 1,
          title: "Run alongside.",
          description:
            "Connexx takes a defined slice of dispatch volume (usually UK and EU). The existing tool keeps its current scope. Tracking events sync both ways so the order management system sees a unified view.",
        },
        {
          step: 2,
          title: "Migrate.",
          description:
            "Connexx takes over carrier integration, label generation, rate comparison, customs, and tracking. The existing tool is decommissioned at the end of the migration window. Migration typically runs three to six weeks depending on rule complexity and volume mix.",
        },
        {
          step: 3,
          title: "Hybrid.",
          description:
            "Connexx handles UK and EU dispatch. The existing tool handles a non-UK region (often US parcel) where the contracts and integrations are already strong. Both expose tracking back to the same downstream systems.",
        },
      ]}
      faq={[
        {
          question: "Does Connexx work alongside ShipStation?",
          answer:
            "Yes. Many customers run Connexx for UK and EU dispatch and keep ShipStation for US parcel volume. The two platforms can both feed the same order management system. Tracking events sync both ways so customer service sees one view. The split usually goes UK and EU on Connexx, US on ShipStation, with the boundary set on the destination country code.",
        },
        {
          question: "Can I migrate from ShipStation to Connexx?",
          answer:
            "Yes. Migration usually takes three to six weeks depending on rule complexity, volume, and the number of carrier accounts. The ITD team rebuilds your ShipStation rules in Connexx, runs a parallel period where both platforms generate labels for the same orders, and cuts over once the manifests and tracking match for two consecutive weeks. Negotiated rates, child accounts, and label preferences carry across.",
        },
        {
          question: "Does Connexx replace Shippo?",
          answer:
            "It can. Shippo is API-first, which makes the migration a developer task. Connexx exposes the same primitives (rate quotes, labels, tracking, returns) through its REST API. Customers usually move from Shippo when they need UK and EU carrier depth, customs automation, or child account management that Shippo handles weakly outside North America.",
        },
        {
          question: "How does Connexx work with Freightview?",
          answer:
            "Connexx and Freightview cover different shipping modes. Freightview compares LTL and FTL freight rates. Connexx compares parcel and express rates across the UK, EU, and international networks. Customers run both: Freightview for palletised freight, Connexx for everything that moves on a parcel scan. Tracking from both feeds the order management system.",
        },
        {
          question: "Does Connexx integrate with Project44?",
          answer:
            "Yes. Connexx pushes shipment events into Project44 via webhook. Carrier, tracking number, dispatch timestamp, in-transit milestones, and POD events all flow through. The Project44 control tower sees Connexx-dispatched shipments alongside the rest of the supply chain. The integration uses the Project44 Shipment API.",
        },
        {
          question: "Why would I use Connexx instead of a multi-carrier API like Shippo or EasyPost?",
          answer:
            "Carrier APIs like Shippo and EasyPost solve the label problem. Connexx solves the dispatch problem. Connexx includes rate comparison rules, customs automation, returns, child account management, and the operations UI that lets a non-developer dispatch team work without a console. If your only need is a label-printing API, a carrier API is enough. If your dispatch team needs to make routing decisions, Connexx is the platform.",
        },
        {
          question: "Can I use Connexx if my 3PL uses ShipStation?",
          answer:
            "Yes. Many 3PLs we work with run ShipStation per brand book. Connexx sits one layer up and gives the 3PL one carrier integration, one rate engine, and one tracking feed across all brands. The 3PL keeps brand-specific configuration in their WMS (often Mintsoft or ShipHero) and Connexx handles the carrier side.",
        },
      ]}
      closingCta={{
        headline: "See where Connexx fits in your current stack.",
        subhead: "Send us your tooling. We'll tell you what to keep, what to replace, and where the savings are.",
        primary: { label: "Request a tailored stack review", href: "/contact?enquiry=logistics" },
        secondary: { label: "Read the Delta Fulfilment story (3 min)", href: "/resources/case-studies/delta-fulfilment" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Integrations", path: "/integrations" },
        { name: "Logistics", path: "/integrations/logistics" },
      ]}
      jsonLd={[
        itemListSchema({
          path: "/integrations/logistics",
          name: "Logistics tool integrations",
          items: [
            { name: "ShipStation", url: "/integrations/logistics#shipstation", description: "Shipping automation. Connexx runs alongside ShipStation for UK and EU carrier depth, or replaces it where customs and rate comparison are the priority." },
            { name: "Shippo", url: "/integrations/logistics#shippo", description: "Multi-carrier shipping API. Connexx connects via API for label generation and tracking sync." },
            { name: "Freightview", url: "/integrations/logistics#freightview", description: "Freight rate comparison for LTL and FTL. Connexx complements Freightview for parcel and express volume." },
            { name: "Project44", url: "/integrations/logistics#project44", description: "Supply chain visibility for in-transit shipments. Connexx pushes tracking events into Project44 for control-tower visibility across every leg." },
          ],
        }),
      ]}
    />
  );
}
