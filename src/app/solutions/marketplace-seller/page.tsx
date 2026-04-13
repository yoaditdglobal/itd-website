import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies } from "@/lib/data";
import { Zap, Eye, ShieldCheck, LayoutGrid } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace Seller Shipping — ITD Global",
  description: "Unified fulfilment across Amazon, eBay, Etsy and more. One dashboard, every marketplace, every carrier.",
};

export default function MarketplaceSellerPage() {
  return (
    <VerticalPage
      title="Every marketplace. One workflow."
      subtitle="Marketplace sellers live in a world of conflicting shipping rules, SLA deadlines, and penalty fees. Connexx brings order to the chaos."
      pains={[
        { num: "01", title: "Different shipping rules per platform", desc: "Amazon, eBay, and Etsy each mandate different carriers, timelines, and label formats. One mistake means penalty fees." },
        { num: "02", title: "Orders falling through the cracks", desc: "Without a unified order queue, high-volume days lead to missed SLAs, late shipments, and damaged seller ratings." },
        { num: "03", title: "No visibility across platforms", desc: "You can't see total shipment volume, costs, or performance without manually pulling data from every marketplace." },
      ]}
      features={[
        { icon: LayoutGrid, title: "Unified multi-marketplace queue", desc: "because manually switching between marketplace dashboards during peak hours means orders get missed." },
        { icon: Zap, title: "SLA-aware carrier selection", desc: "because the fastest carrier isn't always the cheapest, and late delivery penalties add up fast." },
        { icon: Eye, title: "Cross-platform analytics", desc: "because you can't optimise shipping costs you can't measure across all your channels." },
        { icon: ShieldCheck, title: "Automated compliance per platform", desc: "because each marketplace has different label, packaging, and documentation requirements." },
      ]}
      integrationNames={["Amazon", "eBay", "Etsy", "Walmart", "Zalando", "DHL Express", "FedEx", "UPS", "DPD"]}
      caseStudy={caseStudies[1]}
    />
  );
}
