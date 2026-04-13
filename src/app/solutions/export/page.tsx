import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies } from "@/lib/data";
import { Zap, Eye, ShieldCheck, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Export Shipping Solutions — ITD Global",
  description: "Automated export compliance, customs documentation, and carrier booking. Reduce documentation time by 75% across every destination market.",
};

export default function ExportPage() {
  return (
    <VerticalPage
      title="Stop letting paperwork hold your shipments hostage."
      subtitle="Exporters drown in customs documents, regulatory changes, and carrier coordination. Connexx automates the entire export workflow — from HS classification to carrier booking — so shipments move on schedule."
      pains={[
        { num: "01", title: "6–8 documents per shipment, all manual", desc: "Every export requires commercial invoices, packing lists, certificates of origin, and customs declarations. Your team prepares them by hand, and one mistake holds the entire shipment." },
        { num: "02", title: "Regulatory changes you don't see coming", desc: "Destination countries update trade regulations constantly. By the time you find out, a shipment is already stuck at customs." },
        { num: "03", title: "Documentation and dispatch live in different systems", desc: "You finish the paperwork in one tool, then switch to another to book the carrier. That gap creates delays, duplicate data entry, and errors." },
      ]}
      features={[
        { icon: FileText, title: "Auto-generated export documents", desc: "because manually preparing 6 documents per shipment doesn't scale when you're shipping to 25 countries." },
        { icon: ShieldCheck, title: "HS code classification engine", desc: "because incorrect tariff codes don't just cause delays — they trigger audits and fines." },
        { icon: Zap, title: "Carrier booking in one workflow", desc: "because switching between your documentation tool and your carrier portal adds hours to every export." },
        { icon: Eye, title: "Regulatory change alerts", desc: "because finding out about a rule change after your shipment is in transit is the most expensive way to learn." },
      ]}
      integrationNames={["SAP", "Oracle NetSuite", "DHL Express", "FedEx", "UPS", "Freightview", "Project44"]}
      caseStudy={caseStudies[3]}
    />
  );
}
