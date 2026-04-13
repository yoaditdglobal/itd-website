import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies } from "@/lib/data";
import { Zap, Eye, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3PL Logistics Solutions — ITD Global",
  description: "Multi-client logistics automation. Per-brand configuration, automated compliance, and unified analytics for third-party logistics providers.",
};

export default function ThreePLPage() {
  return (
    <VerticalPage
      title="Scale clients, not complexity."
      subtitle="Third-party logistics providers manage dozens of brands with different carriers, packaging rules, and compliance requirements. Connexx makes each one feel like your only client."
      pains={[
        { num: "01", title: "Per-client carrier complexity", desc: "Every brand has different carrier preferences, packaging requirements, and routing rules. Manual configuration doesn't scale." },
        { num: "02", title: "Customs errors across 40+ destinations", desc: "Manual customs documentation creates a 5-7% error rate that leads to delays, fines, and client churn." },
        { num: "03", title: "No cross-client visibility", desc: "You can't spot operational bottlenecks or negotiate better carrier rates without unified analytics across all brands." },
      ]}
      features={[
        { icon: Users, title: "Multi-brand configuration", desc: "because onboarding a new client shouldn't mean 2 weeks of manual setup and carrier negotiations." },
        { icon: ShieldCheck, title: "Automated compliance engine", desc: "because customs errors don't just delay shipments — they destroy client trust." },
        { icon: Zap, title: "Rule-based carrier selection", desc: "because manual carrier assignment for 60 brands across 40 countries is a full-time job you shouldn't need." },
        { icon: Eye, title: "Unified multi-client analytics", desc: "because aggregate volume data unlocks carrier discounts your individual brands can't negotiate alone." },
      ]}
      integrationNames={["SAP", "Oracle NetSuite", "Cin7", "ShipStation", "DHL Express", "FedEx", "UPS", "Royal Mail", "DPD", "Evri"]}
      caseStudy={caseStudies[2]}
    />
  );
}
