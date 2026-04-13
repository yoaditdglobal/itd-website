import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies } from "@/lib/data";
import { Zap, Eye, ShieldCheck, BarChart3 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Import Logistics Solutions — ITD Global",
  description: "Pre-clearance documentation, duty calculation, and real-time customs tracking. Cut clearance delays by 60% and eliminate duty cost surprises.",
};

export default function ImportPage() {
  return (
    <VerticalPage
      title="Know the cost before the container arrives."
      subtitle="Importers deal with unpredictable customs, surprise duty charges, and clearance delays that ripple through the entire supply chain. Connexx gives you visibility and control over every import before it hits the border."
      pains={[
        { num: "01", title: "One in four shipments delayed at customs", desc: "Incorrect tariff classifications and missing documentation mean your goods sit at the border while your customers wait and your warehouse sits idle." },
        { num: "02", title: "Duty costs estimated on guesswork", desc: "Manual duty calculations miss landed cost accuracy by 15–20%. Your pricing and margin decisions are based on numbers you can't trust." },
        { num: "03", title: "No visibility into clearance status", desc: "Once a shipment enters customs, you're blind. The first sign of a problem is a phone call asking for documents you should have sent weeks ago." },
      ]}
      features={[
        { icon: ShieldCheck, title: "Automated tariff classification", desc: "because a wrong tariff code doesn't just delay one shipment — it flags your account for enhanced scrutiny on every future import." },
        { icon: BarChart3, title: "Duty cost estimation", desc: "because pricing products without accurate landed costs means you're either losing margin or losing customers." },
        { icon: Eye, title: "Real-time clearance tracking", desc: "because waiting for a customs broker to call you back is not a supply chain strategy." },
        { icon: Zap, title: "Pre-clearance document generation", desc: "because submitting documentation before arrival is the difference between a 1-day and a 3-day clearance." },
      ]}
      integrationNames={["SAP", "Oracle NetSuite", "Microsoft Dynamics", "DHL Express", "FedEx", "UPS", "DPD", "Project44"]}
      caseStudy={caseStudies[4]}
    />
  );
}
