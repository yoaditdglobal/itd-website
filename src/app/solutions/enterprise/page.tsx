import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Plug, Gauge, Workflow, BarChart3 } from "lucide-react";

export const metadata = buildMetadata({
  title: "Enterprise shipping software for UK and EU operations",
  description:
    "Consolidate 40+ carrier contracts into one dashboard. Connexx integrates with SAP, Oracle NetSuite and Microsoft Dynamics, with rate shopping in under 200ms per order.",
  path: "/solutions/enterprise",
});

export default function EnterprisePage() {
  return (
    <VerticalPage
      label="Enterprise"
      title="Enterprise shipping software that consolidates every carrier contract you hold."
      subtitle="At 50,000+ parcels a month you are running six carrier portals, two ERPs, and a quarterly spreadsheet nobody trusts. Connexx ties SAP, Oracle NetSuite, and Microsoft Dynamics to every carrier you use, routes every order through pre-set rules, and produces one reconciled data set. Lane performance, SLA compliance, and rate card spend live in one view."
      primaryCta={{
        label: "Request a tailored platform review",
        href: "/contact?enquiry=enterprise",
      }}
      secondaryCta={{
        label: "Read the Connexx vs Metapack comparison",
        href: "/resources/connexx-vs-metapack",
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "Enterprise", path: "/solutions/enterprise" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "Enterprise shipping software",
          description:
            "Multi-carrier shipping platform for UK and EU enterprises. Integrates with SAP, Oracle NetSuite and Microsoft Dynamics, with rate shopping across Royal Mail, DPD, DHL Express, FedEx, UPS, Parcelforce and 30+ EU carriers.",
          path: "/solutions/enterprise",
          serviceType: "Enterprise Multi-Carrier Shipping Software",
          areaServed: ["United Kingdom", "European Union", "Worldwide"],
        }),
      ]}
      pains={[
        {
          num: "01",
          title: "Forty carrier relationships, no single view of cost",
          desc: "Negotiated rate cards sit in email threads and carrier portals. Reconciling actual spend against contracted rates takes the finance team two weeks every quarter and produces numbers your regional managers still dispute.",
        },
        {
          num: "02",
          title: "Every new market becomes a six-month IT project",
          desc: "Adding a carrier or a region means a new API engagement, a new label format, and a new field in SAP. The business launches a country before IT can deliver the carrier connectivity, and shipments go out manually in the gap.",
        },
        {
          num: "03",
          title: "ERP, WMS, and carrier portals each tell a different story",
          desc: "Shipment data lives in silos. Before every quarterly SLA review, two analysts spend two days reconciling three systems. The board still asks questions the data cannot answer.",
        },
      ]}
      features={[
        {
          icon: Plug,
          title: "Native SAP, NetSuite, and Dynamics 365 integration.",
          desc: "Certified connectors push orders, deliveries, and shipment confirmations between Connexx and your ERP. Tracking numbers and PODs write back to SAP or NetSuite automatically. Audit logging covers every record for compliance review.",
        },
        {
          icon: Gauge,
          title: "Rate shopping at enterprise dispatch volume.",
          desc: "The rate engine evaluates every active carrier on every order in under 200ms. Royal Mail, DPD, DHL Express, FedEx, UPS, Parcelforce, Amazon Shipping, and 30+ EU carriers all run from one routing layer. Peak Q4 surges are handled without throughput drops.",
        },
        {
          icon: Workflow,
          title: "Per-region, per-lane, per-SLA routing rules.",
          desc: "Configure routing once by weight tier, destination country, service window, and customer segment. The platform applies the rules at order capture. Your dispatch team works exceptions, not routine carrier decisions.",
        },
        {
          icon: BarChart3,
          title: "Single reconciled data set across every carrier.",
          desc: "Lane analysis, rate card spend, SLA compliance, and exception rate sit in one dashboard. RBAC controls who sees what. Finance, ops, and the carrier negotiation team all pull from the same numbers in every quarterly review.",
        },
      ]}
      integrations={[
        {
          name: "SAP",
          description: "S/4HANA and ECC certified connectors with IDoc and OData support.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Oracle NetSuite",
          description: "Cloud ERP integration with bidirectional order, shipment, and POD sync.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Microsoft Dynamics",
          description: "Dynamics 365 connector with carrier selection inside the ERP.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Royal Mail",
          logo: "/logos/carriers/Royal-Mail-Logo.png",
          description: "Tracked 24, Tracked 48, Signed For, First Class, Second Class, Special Delivery.",
          href: "/integrations/carriers/royal-mail",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description: "Next Day, Two Day, Saturday, Predict slot across UK and EU.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "DHL Express",
          logo: "/logos/carriers/dhl_logo.webp",
          description: "International express to 220+ countries with Time Definite options.",
          href: "/integrations/carriers/dhl",
        },
        {
          name: "UPS",
          logo: "/logos/carriers/ups_logo.png",
          description: "Worldwide Express, Standard, and Expedited with negotiated rate card support.",
          href: "/integrations",
        },
        {
          name: "FedEx",
          logo: "/logos/carriers/fedex_logo.png",
          description: "International Priority and International Economy with rate comparison at scale.",
          href: "/integrations",
        },
      ]}
      caseStudy={getCaseStudiesBySolution("Enterprise")[0] ?? caseStudies[2]}
      caseStudies={getCaseStudiesBySolution("Enterprise")}
      faq={[
        {
          question: "Does Connexx integrate with SAP?",
          answer:
            "Yes. Connexx integrates with SAP S/4HANA and SAP ECC through certified connectors. Sales orders, deliveries, and shipments sync in both directions. Tracking numbers and PODs write back to SAP automatically, with audit logging for every record. A typical multi-country rollout takes 6 to 8 weeks, including UAT and go-live across the first two regions.",
        },
        {
          question: "How does Connexx handle 100,000+ parcels a month?",
          answer:
            "The rate engine evaluates every active carrier on every order in under 200ms. Label generation runs in parallel batches, and the platform handles Black Friday and Q4 peak surges without throughput drops. Peak Commerce runs 12 markets through Connexx and cut shipping costs 42% in the first quarter. ITD publishes platform uptime numbers monthly.",
        },
        {
          question: "What's the difference between Connexx and Metapack?",
          answer:
            "Both are enterprise multi-carrier platforms. Connexx is UK-built, supports Royal Mail, DPD, Evri, Parcelforce, Amazon Shipping, and the major UK 3PLs out of the box, and integrates natively with SAP and NetSuite. Connexx pricing is per-shipment with no carrier-side commissions, which usually makes total cost lower for UK-anchored enterprises shipping 50,000+ parcels a month.",
        },
        {
          question: "Does Connexx support single sign-on and role-based access control?",
          answer:
            "Yes. Connexx supports SAML 2.0 SSO with Azure AD, Okta, and Google Workspace. RBAC controls cover finance, ops, dispatch, and regional manager roles, with custom roles available for shared service centres. ISO 27001 controls cover the platform infrastructure. Audit logs export to your SIEM through the standard API.",
        },
        {
          question: "How does Connexx handle EORI, IOSS, and customs documentation for enterprise exports?",
          answer:
            "Connexx holds your master EORI plus any subsidiary EORIs, looks up the HS code per SKU from your product master, and generates commercial invoice and CN23 documentation per shipment. IOSS applies automatically to EU consignments under €150. Meridian Trade Co cut export documentation time from 4 hours to 1 hour per shipment using this workflow.",
        },
        {
          question: "What kind of account management comes with enterprise pricing?",
          answer:
            "A named senior account executive runs your account. A dedicated implementation lead owns the SAP, NetSuite, or Dynamics rollout from kickoff to go-live. After go-live, a customer success lead runs quarterly business reviews with your lane performance, rate card variance, and SLA data. Ticket-based support is not the enterprise model.",
        },
      ]}
      closingCta={{
        headline: "Consolidate your carrier stack on a single platform.",
        subhead:
          "A tailored platform review scoped to your ERP, your carriers, and your regions. No procurement deck.",
        primary: {
          label: "Request a tailored platform review",
          href: "/contact?enquiry=enterprise",
        },
        secondary: {
          label: "Request the enterprise RFI guide",
          href: "/resources/enterprise-rfi-guide",
        },
      }}
    />
  );
}
