import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Users, Plug, ShieldCheck, BarChart3 } from "lucide-react";

export const metadata = buildMetadata({
  title: "3PL shipping software with child accounts and customs automation",
  description:
    "Onboard new clients in 2 days, not 2 weeks. Connexx adds multi-client child accounts, per-brand carrier rules, and customs automation on top of Mintsoft, Linnworks, and ShipHero.",
  path: "/solutions/3pl",
});

export default function ThreePLPage() {
  return (
    <VerticalPage
      label="3PL"
      title="3PL shipping software with child accounts and customs built in."
      subtitle="You run fulfilment for 20 to 80 brand clients across Mintsoft, Linnworks, or ShipHero. Each one has different carriers, different packaging rules, and different SLAs. Connexx adds a child account architecture, per-brand routing rules, and a customs engine on top of your WMS. Client onboarding drops from two weeks to two days, and customs accuracy lifts past 98%."
      primaryCta={{
        label: "Contact Us",
        href: "/contact?enquiry=3pl",
      }}
      secondaryCta={{
        label: "Learn More",
        href: "/resources/case-studies/delta-fulfilment",
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "3PL", path: "/solutions/3pl" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "3PL shipping software",
          description:
            "Multi-carrier shipping platform for UK 3PLs and fulfilment houses. Child account architecture, per-brand carrier rules, customs automation, and integration with Mintsoft, Linnworks, ShipHero and Veeqo.",
          path: "/solutions/3pl",
          serviceType: "Third-Party Logistics Shipping Software",
          areaServed: ["United Kingdom", "European Union", "Worldwide"],
        }),
      ]}
      pains={[
        {
          num: "01",
          title: "Two weeks of manual setup for every new client",
          desc: "Each brand has a different carrier whitelist, label dimensions, and routing rule set. Setup is done in a spreadsheet then re-entered into the WMS. One misconfiguration causes a wrong-carrier shipment, and the first you hear about it is a client call.",
        },
        {
          num: "02",
          title: "Customs errors are costing client trust, not just money",
          desc: "At a 5 to 7% documentation error rate on cross-border shipments, the question is not whether a client will receive a customs hold. It is when. Each hold pulls a senior ops manager off the floor for two hours of escalation work.",
        },
        {
          num: "03",
          title: "Clients want real-time data, you can send them a spreadsheet",
          desc: "Brands have live dashboards in every other supplier relationship. Sending a monthly Excel export for shipping volume, cost per carrier, and exception rate is no longer acceptable. Account management eats analyst time you do not have.",
        },
      ]}
      features={[
        {
          icon: Users,
          title: "Child account architecture for every client brand.",
          desc: "Each brand becomes a tenant under your parent contract with Royal Mail, DPD, Evri, DHL Express, and the rest. Per-client rate cards, dispatch rules, branded tracking page, and reporting all sit under one parent account. Billing exports per child account at month-end.",
        },
        {
          icon: Plug,
          title: "Mintsoft, Linnworks, ShipHero, and Veeqo integration.",
          desc: "Connexx sits on top of your WMS as the shipping and rate-shopping layer. Mintsoft, Linnworks, ShipHero, and Veeqo all push orders into Connexx for carrier selection. Tracking and POD data write back automatically. No parallel systems, no double data entry.",
        },
        {
          icon: ShieldCheck,
          title: "Customs automation per child account.",
          desc: "Each client EORI, each client IOSS registration, and each client's HS code library lives in the platform. Commercial invoice, CN22, and CN23 documentation generates per shipment, per country. SwiftLog Fulfilment lifted customs accuracy from 93% to 98.7% and cut customs-related delays 85%.",
        },
        {
          icon: BarChart3,
          title: "Branded reporting your clients log in to see.",
          desc: "Each brand gets a live dashboard showing volume, cost per carrier, SLA performance, and exception rate. Account management stops requiring an ops analyst in a spreadsheet. Client retention conversations start from a position of data, not defence.",
        },
      ]}
      integrations={[
        {
          name: "Mintsoft",
          logo: "/logos/erp-wms/mintsoft_logo.png",
          description: "WMS most common in UK mid-market 3PLs. Connexx adds the carrier layer.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Linnworks",
          logo: "/logos/erp-wms/linnworks_logo.png",
          description: "Multi-channel order management with marketplace import for client brands.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Veeqo",
          logo: "/logos/erp-wms/veeqo_logo.png",
          description: "Inventory and shipping platform with multi-client support.",
          href: "/integrations/erp-wms",
        },
        {
          name: "ShipHero",
          logo: "/logos/erp-wms/shiphero_logo.png",
          description: "Warehouse and shipping management for high-volume fulfilment houses.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Royal Mail",
          logo: "/logos/carriers/Royal-Mail-Logo.png",
          description: "Tracked 24, Tracked 48, Signed, First/Second Class per child account.",
          href: "/integrations/carriers/royal-mail",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description: "Next Day, Saturday, B2B with per-client routing rules.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "Evri",
          logo: "/logos/carriers/evri_logo.png",
          description: "Standard, Next Day, ParcelShop drop-off, and Evri EU coverage.",
          href: "/integrations/carriers/evri",
        },
        {
          name: "DHL Express",
          logo: "/logos/carriers/dhl_logo.webp",
          description: "International express to 220+ countries for cross-border client volume.",
          href: "/integrations/carriers/dhl",
        },
      ]}
      caseStudy={getCaseStudiesBySolution("3PL")[0] ?? caseStudies[2]}
      caseStudies={getCaseStudiesBySolution("3PL")}
      rateChecker="3pl"
      faq={[
        {
          question: "What is a child account in multi-carrier shipping?",
          answer:
            "A child account is a sub-account under a 3PL's master carrier contract. The 3PL holds the master agreement with Royal Mail, DPD, Evri, or DHL Express, and creates a child account for each brand client. Each client gets their own rate card, dispatch rules, branded tracking page, and reporting view. Connexx manages unlimited child accounts under one parent contract.",
        },
        {
          question: "Does Connexx integrate with Mintsoft?",
          answer:
            "Yes. Connexx connects to Mintsoft as the shipping and rate shopping layer. Mintsoft handles warehouse operations and inventory. Connexx handles carrier selection, label generation, customs documentation, and tracking write-back. Together they cover the full 3PL workflow from order import to dispatch to per-client billing. ShipHero, Linnworks, and Veeqo integrations follow the same pattern.",
        },
        {
          question: "How does Connexx work for a 3PL with 50 brand clients?",
          answer:
            "Each brand becomes a tenant in Connexx with its own carrier rules, rate card, branded tracking, and reporting. Orders import from each client's Shopify, Amazon, eBay, or marketplace. Dispatch rules pick the right carrier per client. Billing data exports per child account at month-end. SwiftLog Fulfilment onboards new brands in 2 days using this model.",
        },
        {
          question: "How do 3PLs handle customs documentation for client shipments?",
          answer:
            "A 3PL operates its own EORI plus a client-specific EORI for each brand. Connexx pulls the right EORI per shipment, looks up the HS code per SKU, generates the commercial invoice and CN22/CN23, and applies IOSS where the client has registered. SwiftLog Fulfilment lifted customs accuracy from 93% to 98.7% using this workflow.",
        },
        {
          question: "Can clients see their own shipping data in real time?",
          answer:
            "Yes. Each brand gets a live reporting view inside Connexx covering volume, cost per carrier, SLA performance, and exception rate. Client account managers send a login, not a spreadsheet. Branded tracking pages show your client's logo and colours, not the carrier's, so the end customer experience stays on-brand throughout.",
        },
        {
          question: "How long does it take to onboard a new client on Connexx?",
          answer:
            "Two days for a standard onboarding (single warehouse, four to six carriers, one marketplace stack). SwiftLog Fulfilment cut onboarding from two weeks to two days and added 15 new brands in the first year without expanding their ops team. Carrier whitelist, packaging rules, EORI registration, and tracking template are configured once per client.",
        },
      ]}
      closingCta={{
        headline: "Onboard three clients a quarter without adding ops headcount.",
        subhead:
          "The demo covers child accounts, per-brand routing, and the customs engine. Scoped to your WMS.",
        primary: {
          label: "Contact Us",
          href: "/contact?enquiry=3pl",
        },
        secondary: {
          label: "Learn More",
          href: "/resources/3pl-onboarding-playbook",
        },
      }}
    />
  );
}
