import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies } from "@/lib/data";
import { Zap, Eye, ShieldCheck, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Logistics Solutions — ITD Global",
  description: "Global logistics orchestration at scale. Multi-region carrier management, advanced analytics, and custom integrations for complex supply chains.",
};

export default function EnterprisePage() {
  return (
    <VerticalPage
      title="Complexity is not a strategy. Control is."
      subtitle="Enterprise logistics means dozens of carriers, multiple regions, and systems that don't talk to each other. Connexx gives you a single orchestration layer across your entire global supply chain."
      pains={[
        { num: "01", title: "Carrier management across 40+ countries", desc: "Each region has its own carriers, its own contracts, and its own compliance requirements. Your logistics team spends more time managing relationships than optimising routes." },
        { num: "02", title: "No single source of truth for shipment data", desc: "Your ERP says one thing, your WMS says another, and your carrier portals say something else. Reconciling shipment data across systems eats weeks every quarter." },
        { num: "03", title: "Custom integration projects that never end", desc: "Every new carrier or system connection becomes a 6-month IT project. By the time it's live, the business has already moved on to the next requirement." },
      ]}
      features={[
        { icon: Globe, title: "Multi-region carrier orchestration", desc: "because managing 40 carrier relationships across 12 regions shouldn't require 12 separate workflows." },
        { icon: Eye, title: "Advanced analytics and reporting", desc: "because you can't negotiate better rates or spot bottlenecks without unified data across every carrier and region." },
        { icon: ShieldCheck, title: "Dedicated account management", desc: "because enterprise logistics problems don't fit into a support ticket queue." },
        { icon: Zap, title: "Custom API integrations", desc: "because your ERP and WMS are the backbone of your operations — shipping has to plug in, not bolt on." },
      ]}
      integrationNames={["SAP", "Oracle NetSuite", "Microsoft Dynamics", "DHL Express", "FedEx", "UPS", "Project44", "ShipStation"]}
      caseStudy={caseStudies[2]}
    />
  );
}
