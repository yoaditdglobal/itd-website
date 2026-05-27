import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Calculator, ShieldCheck, FileCheck, Receipt } from "lucide-react";

export const metadata = buildMetadata({
  title: "Import shipping software with landed cost and CDS pre-clearance",
  description:
    "Calculate landed cost per SKU before goods leave the supplier. Connexx pre-files CDS declarations against HMRC, calculates duty against the UK Global Tariff, and reconciles your C79.",
  path: "/solutions/import",
});

export default function ImportPage() {
  return (
    <VerticalPage
      label="Import"
      title="Landed cost in the PO, not after the C79."
      subtitle="UK importers price products against duty estimates that are off by 15 to 20%. Connexx calculates landed cost from the HS code, origin country, Incoterms, and current UK Global Tariff rates before the goods leave the supplier. CDS declarations pre-file with HMRC. PVA and C79 reconcile against your accounting system automatically."
      primaryCta={{ label: "Run the landed cost calculator", href: "#estimator" }}
      secondaryCta={{ label: "Read the Home Bargains story (3 min)", href: "/resources/case-studies/home-bargains" }}
      pains={[
        {
          num: "01",
          title: "One in four shipments hits a customs delay you didn't see coming",
          desc: "Incorrect tariff classifications. Missing pre-clearance documentation. A rules-of-origin question that should have been answered before the container left China. The first sign is a phone call from the customs broker asking for a document that should already be on file. By that point, the delay is 48 hours in and the warehouse is already idle.",
        },
        {
          num: "02",
          title: "Landed costs estimated in a spreadsheet that's wrong by 20%",
          desc: "Duty rates, import VAT, carrier surcharges, customs broker fees, fuel surcharges. All estimated from last quarter's actuals in a workbook the Import Manager updates monthly. When a supplier changes packing or a carrier adds a surcharge, the spreadsheet is wrong before it is used. Pricing decisions are made against numbers nobody trusts.",
        },
        {
          num: "03",
          title: "Finance can't price products until the shipment clears",
          desc: "The CFO asks for landed cost data for the pricing review. The Import Manager gives them a number two weeks after the goods arrive, once the C79 is in and the duty deferment statement reconciles. By then the pricing decision was made on the old estimate. Margin erodes one quarter at a time.",
        },
      ]}
      features={[
        {
          icon: Calculator,
          title: "Landed cost calculated against the live UK Global Tariff",
          desc: "When the purchase order is confirmed, Connexx pulls the HS code, the origin country, the Incoterm, and the supplier value. Duty, import VAT, anti-dumping or countervailing duty where applicable, and freight surcharges resolve against the live UK Global Tariff. Finance gets the landed cost before the goods leave the supplier, not after the C79 arrives.",
        },
        {
          icon: ShieldCheck,
          title: "Tariff classification stored once, applied per shipment",
          desc: "HS code lookup runs from the product description, validates against the UK Global Tariff, and stores the SKU-to-HS mapping. Every future consignment for that SKU classifies automatically. Misclassification penalties and underpayment fines stop turning up six months after import.",
        },
        {
          icon: FileCheck,
          title: "Pre-clearance CDS declarations filed before arrival",
          desc: "The customs declaration is filed to HMRC's Customs Declaration Service before the container hits the port. PVA-eligible shipments are flagged on the declaration so import VAT goes on the next VAT return rather than at the border. Clearance happens on arrival, not after.",
        },
        {
          icon: Receipt,
          title: "C79 and duty deferment reconciliation that closes the loop",
          desc: "The monthly C79 import VAT certificate reconciles against your accounting system automatically. Duty deferment statements from HMRC match against the consignments that drew on them. The Finance team stops chasing paper and starts trusting the landed cost numbers.",
        },
      ]}
      integrations={[
        {
          name: "DHL Express",
          logo: "/logos/carriers/dhl_logo.webp",
          description:
            "DHL Express inbound from 220+ origin countries with pre-clearance and PVA-aware customs documentation.",
          href: "/integrations/carriers/dhl",
        },
        {
          name: "FedEx",
          logo: "/logos/carriers/fedex_logo.png",
          description:
            "FedEx inbound priority and economy with HS code validation and CDS pre-filing per consignment.",
          href: "/integrations",
        },
        {
          name: "UPS",
          logo: "/logos/carriers/ups_logo.png",
          description:
            "UPS inbound worldwide with landed cost calculated against the UK Global Tariff before goods arrive.",
          href: "/integrations",
        },
        {
          name: "SAP",
          description:
            "SAP S/4HANA and SAP Global Trade Services. Confirmed POs trigger duty calculation and CDS declaration generation.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Oracle NetSuite",
          description:
            "NetSuite-confirmed POs flow into Connexx for tariff classification, pre-clearance, and landed cost write-back.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Microsoft Dynamics",
          description:
            "Dynamics 365 connector. Landed cost and clearance status visible inside the existing Dynamics order record.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Sage",
          description:
            "Sage 200 and Sage X3. PVA-eligible shipments and C79 reconciliation flow back into the Sage VAT return.",
          href: "/integrations/erp-wms",
        },
        {
          name: "HMRC CDS API",
          description:
            "Direct CDS API integration. Pre-clearance declarations filed to HMRC from the same workflow as the PO.",
          href: "/integrations",
        },
      ]}
      caseStudy={getCaseStudiesBySolution("Import")[0] ?? caseStudies[4]}
      caseStudies={getCaseStudiesBySolution("Import")}
      rateChecker="import"
      faq={[
        {
          question: "How does Connexx help with UK customs clearance?",
          answer:
            "Connexx auto-classifies imports, calculates duty and import VAT against the UK Global Tariff, and generates the CDS declaration before goods arrive. Pre-clearance means the declaration is filed and accepted before the truck or container hits the port, so clearance happens on arrival rather than after. Northgate Imports cut customs delays 60% and lifted duty cost accuracy from 82% to 97% using this.",
        },
        {
          question: "What is landed cost and how is it calculated?",
          answer:
            "Landed cost is the total cost of getting goods from supplier to your warehouse. Supplier price, freight, insurance, duty, import VAT, customs broker fees, and any surcharges. Connexx calculates it per SKU before the goods arrive, using the HS code, origin country, Incoterms, and current UK Global Tariff rates. That lets Finance price products against accurate margins rather than estimates.",
        },
        {
          question: "What's Postponed VAT Accounting and should I use it?",
          answer:
            "Postponed VAT Accounting (PVA) lets you account for import VAT on your next VAT return instead of paying it at the border. For most UK importers it's a cash flow win, especially for high-volume importers from China, the EU, or the US. Connexx automatically marks shipments as PVA-eligible on the customs declaration and reconciles the monthly C79 certificate against your accounting system.",
        },
        {
          question: "How do I find the right HS code for an import?",
          answer:
            "Use the UK Global Tariff lookup at gov.uk. For any meaningful import volume, automate it. Connexx suggests an HS code from the product description, validates against the UK Global Tariff, and stores the SKU-to-HS mapping so future shipments classify automatically. Misclassification triggers customs delays at the border and HMRC underpayment penalties six months later. Automation cuts both.",
        },
        {
          question: "Does Connexx work with my existing customs broker?",
          answer:
            "Yes. Connexx runs in parallel with brokers including Descartes, MIC, and AEB. The platform generates the declaration data, lands it in the broker's workflow, and reads clearance status back so the Import Manager has real-time visibility. You don't have to replace the broker relationship. You replace the email chains and the spreadsheets.",
        },
        {
          question: "How does duty deferment work with Connexx?",
          answer:
            "If you hold an HMRC duty deferment account, Connexx flags eligible imports on the customs declaration and tracks the deferment drawdown per consignment. Monthly duty deferment statements reconcile against the imports that drew on them automatically. The Finance team stops manually matching HMRC statements to import records on a spreadsheet at month-end.",
        },
      ]}
      closingCta={{
        headline: "Price products against duty, not against guesses.",
        subhead:
          "Two minutes with the landed cost calculator. Pick three import origins. Compare against your current estimate.",
        primary: { label: "Run the calculator", href: "#estimator" },
        secondary: { label: "Request a tailored import compliance review", href: "/contact?enquiry=import" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "Import", path: "/solutions/import" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "Import shipping software",
          description:
            "UK customs clearance and landed cost platform for importers. Calculates duty against the UK Global Tariff, pre-files CDS declarations with HMRC, and reconciles PVA and C79 against accounting systems. Integrates with SAP, NetSuite, Dynamics, and Sage.",
          path: "/solutions/import",
          serviceType: "Import Shipping and Customs Compliance Software",
          areaServed: ["United Kingdom", "European Union"],
        }),
      ]}
    />
  );
}
