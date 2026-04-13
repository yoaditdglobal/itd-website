import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies } from "@/lib/data";
import { Zap, Eye, ShieldCheck, RefreshCw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "eCommerce Shipping Solutions — ITD Global",
  description: "Multi-carrier shipping for online stores. Automated rate comparison, label generation, and tracking across every carrier.",
};

export default function EcommercePage() {
  return (
    <VerticalPage
      title="Stop losing money on every shipment."
      subtitle="eCommerce brands juggle carriers, markets, and margins. Connexx unifies your shipping stack so you can focus on selling — not dispatching."
      pains={[
        { num: "01", title: "Carrier fragmentation across markets", desc: "Each carrier has its own portal, its own label format, its own tracking system. Your ops team wastes hours switching between them." },
        { num: "02", title: "Returns eating your margins", desc: "Returns logistics is an afterthought for most carriers. You're paying premium rates for a process that should be automated." },
        { num: "03", title: "No single view of shipment status", desc: "Your CS team can't answer a simple 'where's my order?' without logging into 4 different systems." },
      ]}
      features={[
        { icon: Zap, title: "Automated rate comparison", desc: "because choosing the wrong carrier on every shipment compounds into thousands lost per quarter." },
        { icon: Eye, title: "Unified tracking dashboard", desc: "because your CS team shouldn't need 4 carrier portals to answer one customer question." },
        { icon: RefreshCw, title: "Automated returns management", desc: "because manual returns processing turns a cost centre into a margin sinkhole." },
        { icon: ShieldCheck, title: "International compliance", desc: "because a customs error on a cross-border shipment can delay the entire batch." },
      ]}
      integrationNames={["Shopify", "WooCommerce", "Magento", "BigCommerce", "DHL Express", "FedEx", "UPS", "Royal Mail"]}
      caseStudy={caseStudies[0]}
    />
  );
}
