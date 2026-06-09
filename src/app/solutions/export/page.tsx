import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { FileText, ShieldCheck, Globe, Zap } from "lucide-react";

export const metadata = buildMetadata({
  title: "Export shipping software with automated customs documentation",
  description:
    "Auto-generate commercial invoices, packing lists, certificates of origin, and CDS declarations from one sales order. Connexx covers 25+ destinations and updates the rules engine before the regulations bite.",
  path: "/solutions/export",
});

export default function ExportPage() {
  return (
    <VerticalPage
      label="Export"
      title="Export documentation that updates before the regulations do."
      subtitle="UK exporters ship to 25 countries with 6 to 8 documents per consignment, prepared by hand. One wrong HS code on a Saudi Arabia shipment is three days at the border. Connexx auto-generates commercial invoices, packing lists, certificates of origin, EUR.1 forms, and CDS declarations from a single sales order. The rules engine updates before you do."
      primaryCta={{ label: "Get Quote", href: "#estimator" }}
      secondaryCta={{ label: "Learn More", href: "/resources/case-studies/arlo-fulfilment" }}
      pains={[
        {
          num: "01",
          title: "Six to eight documents per consignment, all prepared by hand",
          desc: "Commercial invoice, packing list, certificate of origin, EUR.1 where preference applies, phytosanitary certificate where required, and a CDS customs entry. Each one is typed or copy-pasted from the ERP. A unit count mismatch between the packing list and the commercial invoice triggers a discrepancy query at customs that takes two days to clear.",
        },
        {
          num: "02",
          title: "Regulatory changes you find out about from the freight forwarder",
          desc: "Saudi Arabia updates its SABER conformity rule. Turkey adds a new product certification. Post-Brexit EU rules of origin shift on a UK-to-Germany lane. The Export Manager finds out when the consignment is already in transit and the freight forwarder calls asking for a document that should have been in the pack from the start.",
        },
        {
          num: "03",
          title: "The gap between documentation and carrier booking",
          desc: "Documents are prepared in one workflow. The carrier is booked in a separate portal. The weight on the carrier booking does not always match the weight on the customs declaration. The discrepancy is caught at clearance. The shipment sits in a customs warehouse while your team works backwards from the error.",
        },
      ]}
      features={[
        {
          icon: FileText,
          title: "Documents generated from one sales order",
          desc: "Commercial invoice, packing list, certificate of origin, EUR.1, CDS declaration, and country-specific paperwork all come from the same ERP record. The packing list and the commercial invoice carry identical unit counts because they read from the same source. Discrepancy queries at customs disappear.",
        },
        {
          icon: ShieldCheck,
          title: "HS code classification applied automatically",
          desc: "Tariff classification is run from the product catalogue, not the Export Coordinator's memory. The system stores the SKU-to-HS mapping after first classification and applies it on every future consignment. Restricted party screening and dual-use checks run on the same step.",
        },
        {
          icon: Globe,
          title: "Country rules engine that updates before the shipment moves",
          desc: "When Saudi Arabia changes its labelling requirement, the documentation template updates inside Connexx before your next consignment leaves the warehouse. EU rules of origin under the UK-EU TCA, ATR for UK-Turkey, EUR.1 for preferential origin, and IOSS for EU consumer goods under €150 all live in the same rules layer.",
        },
        {
          icon: Zap,
          title: "Carrier booking in the same workflow",
          desc: "DHL Express, FedEx, UPS, Parcelforce Worldwide, and Royal Mail International all book from the customs-cleared documentation. The carrier weight and dimensions match the customs declaration by construction. No re-entry. No weight discrepancy.",
        },
      ]}
      integrations={[
        {
          name: "DHL Express",
          logo: "/logos/carriers/dhl_logo.webp",
          description:
            "DHL Express Worldwide, Express Worldwide Documents, and Economy Select across 220+ destinations with full customs documentation.",
          href: "/integrations/carriers/dhl",
        },
        {
          name: "FedEx",
          logo: "/logos/carriers/fedex_logo.png",
          description:
            "FedEx International Priority and International Economy with auto-generated commercial invoices and CDS declarations.",
          href: "/integrations/carriers",
        },
        {
          name: "UPS",
          logo: "/logos/carriers/ups_logo.png",
          description:
            "UPS Worldwide Express Plus, Worldwide Saver, and Standard with HS code classification per consignment.",
          href: "/integrations/carriers",
        },
        {
          name: "Parcel Force",
          logo: "/logos/carriers/parcel-force.svg",
          description:
            "Parcelforce Worldwide Global Express, Global Priority, and Global Value for tracked international export.",
          href: "/integrations/carriers/parcel-force",
        },
        {
          name: "SAP",
          description:
            "SAP S/4HANA and SAP Global Trade Services. Export orders flow into Connexx with HS codes and EORI numbers pre-populated.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Oracle NetSuite",
          description:
            "NetSuite-confirmed export orders trigger document generation, country rules, and carrier booking in one workflow.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Linnworks",
          logo: "/logos/erp-wms/linnworks_logo.png",
          description:
            "Multi-channel export orders from Linnworks consolidated into one customs documentation flow.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Veeqo",
          logo: "/logos/erp-wms/veeqo_logo.png",
          description:
            "Veeqo orders bound for the EU, US, and ROW lanes route through Connexx with IOSS, EUR.1, and CDS handled automatically.",
          href: "/integrations/erp-wms",
        },
      ]}
      caseStudy={getCaseStudiesBySolution("Export")[0] ?? caseStudies[3]}
      caseStudies={getCaseStudiesBySolution("Export")}
      rateChecker="export"
      faq={[
        {
          question: "What documents do I need to export from the UK to the EU?",
          answer:
            "Five core documents. A commercial invoice with value, HS code, and EORI number. A packing list. A customs declaration filed through HMRC's CDS (your freight forwarder or Connexx handles this). A certificate of origin where UK-EU TCA preference applies, usually an EUR.1. And an Incoterms-aligned contract specifying who pays the duty, normally DAP or DDP. Connexx auto-generates all five from one sales order entry, with country-specific rules for every EU destination.",
        },
        {
          question: "How does Connexx handle export documentation?",
          answer:
            "Connexx auto-generates commercial invoices, packing lists, certificates of origin, EUR.1 forms, and CDS declarations for every export based on HS code, destination country, and shipment value. Country-specific rules update automatically inside the platform. Meridian Trade Co cut documentation preparation from 4 hours to 1 hour per shipment using this. Customs holds due to paperwork errors dropped 90%.",
        },
        {
          question: "What is an EORI number and how do I get one?",
          answer:
            "An EORI (Economic Operator Registration and Identification) number is the unique identifier HMRC uses to track your exports. UK EORIs start with GB. You apply at gov.uk and receive it in three working days. If you ship to the EU you also need an EU EORI, applied for in any EU member state. Connexx stores both EORIs and applies the correct one per consignment automatically.",
        },
        {
          question: "Do I need IOSS if I'm exporting B2C to the EU?",
          answer:
            "Yes, if the consignment is under €150 and shipped to an EU consumer. IOSS (Import One-Stop Shop) lets you charge EU VAT at checkout and remit it monthly to a single tax authority, so the customer is not hit with import VAT on delivery. Connexx applies your IOSS number to every qualifying consignment, generates the right commercial invoice, and routes through IOSS-compatible carriers including DHL Express, DPD, and Evri EU.",
        },
        {
          question: "How does the system handle regulatory changes in destination countries?",
          answer:
            "The country rules engine is updated centrally by ITD's compliance team and applied to every customer's documentation templates immediately. When Saudi Arabia introduced SABER conformity for a product category, when Turkey changed its ATR requirement, when EU CBAM took effect, the template changed before customers' next consignment moved. No email alerts to action. No manual template rewrites.",
        },
        {
          question: "Does Connexx file CDS declarations directly with HMRC?",
          answer:
            "Yes, via direct CDS API integration. Export declarations are filed to HMRC's Customs Declaration Service from inside the same workflow that generates the commercial invoice and books the carrier. The declaration data is sourced from the ERP order. Exporters who prefer to keep their freight forwarder in the loop can route the documentation pack to the forwarder instead. Both modes are supported.",
        },
      ]}
      closingCta={{
        headline: "Stop dreading regulatory updates.",
        subhead:
          "Run the export documentation estimator for your top 5 destination countries. Two minutes, no commitment.",
        primary: { label: "Get Quote", href: "#estimator" },
        secondary: { label: "Contact Us", href: "/contact?enquiry=export" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "Export", path: "/solutions/export" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "Export shipping software",
          description:
            "Automated export documentation and multi-carrier booking for UK exporters. Generates commercial invoices, packing lists, certificates of origin, EUR.1, and CDS declarations from one sales order. Covers EU, US, and ROW destinations.",
          path: "/solutions/export",
          serviceType: "Export Shipping and Customs Automation Software",
          areaServed: ["United Kingdom", "European Union", "United States", "Worldwide"],
        }),
      ]}
    />
  );
}
