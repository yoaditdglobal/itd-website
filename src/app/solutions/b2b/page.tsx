import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies } from "@/lib/data";
import { Zap, Eye, ShieldCheck, Settings } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Manufacturing Shipping — ITD Global",
  description: "ERP-connected dispatch with rule-based carrier selection. Automate 90% of wholesale shipment routing without leaving your ERP.",
};

export default function B2BManufacturingPage() {
  return (
    <VerticalPage
      title="Your ERP knows the order. Let it pick the carrier too."
      subtitle="B2B manufacturers spend hours on dispatch decisions that should be automatic. Connexx connects to your ERP and routes every order to the right carrier based on rules you set once."
      pains={[
        { num: "01", title: "Manual carrier selection on every order", desc: "Your dispatch team evaluates weight, destination, delivery window, and cost for 500+ orders a week. That's not logistics — it's data entry." },
        { num: "02", title: "ERP and shipping live in separate worlds", desc: "Orders are confirmed in your ERP, then re-keyed into carrier portals. Double handling means double the errors and 20+ hours a week wasted." },
        { num: "03", title: "Routing errors cost thousands in redeliveries", desc: "Wrong carrier, wrong service tier, wrong delivery window. Each routing mistake means a failed delivery and a redelivery charge that nobody budgeted for." },
      ]}
      features={[
        { icon: Settings, title: "Direct ERP integration", desc: "because re-keying order data from your ERP into a carrier portal is 20 hours a week your dispatch team shouldn't be spending." },
        { icon: Zap, title: "Rule-based carrier selection", desc: "because evaluating weight, destination, and delivery windows manually for every order is a process that should have been automated years ago." },
        { icon: ShieldCheck, title: "Automated booking confirmations", desc: "because your sales team shouldn't be chasing dispatch for tracking numbers to forward to customers." },
        { icon: Eye, title: "Exception-only dispatch management", desc: "because your team's expertise is wasted on routine orders — let them focus on the shipments that actually need human judgement." },
      ]}
      integrationNames={["SAP", "Oracle NetSuite", "Microsoft Dynamics", "Sage", "DHL Express", "FedEx", "UPS", "DPD", "Evri"]}
      caseStudy={caseStudies[5]}
    />
  );
}
