import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies } from "@/lib/data";
import { Zap, Eye, ShieldCheck, CreditCard } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Business Shipping Solutions — ITD Global",
  description: "Ship smarter from day one. Automated rate comparison, one-click labels, and integrated tracking — no enterprise budget required.",
};

export default function SmallBusinessPage() {
  return (
    <VerticalPage
      title="Stop overpaying for every parcel you send."
      subtitle="Small businesses don't have a logistics department. You need shipping that works without training, scales without contracts, and saves money from the first label."
      pains={[
        { num: "01", title: "You're paying the wrong carrier on every shipment", desc: "Without automated rate comparison, you default to one carrier regardless of destination, weight, or speed. That adds up to thousands lost per year." },
        { num: "02", title: "Manual labels and tracking eat your day", desc: "Copy-pasting addresses, printing labels one by one, and checking tracking across carrier websites. Your time is worth more than this." },
        { num: "03", title: "Customers ask 'where's my order?' and you can't answer fast", desc: "Without unified tracking, every WISMO query means logging into a carrier portal, finding the number, and copying it back to the customer." },
      ]}
      features={[
        { icon: Zap, title: "Automated rate comparison", desc: "because choosing the cheapest carrier for every shipment shouldn't require a spreadsheet and 30 minutes." },
        { icon: ShieldCheck, title: "One-click label generation", desc: "because batch-printing 50 labels should take seconds, not an afternoon." },
        { icon: Eye, title: "Integrated tracking notifications", desc: "because your customers should get proactive updates instead of chasing you for answers." },
        { icon: CreditCard, title: "No minimum volumes", desc: "because you shouldn't need to ship 500 parcels a month to access competitive carrier rates." },
      ]}
      integrationNames={["Shopify", "WooCommerce", "BigCommerce", "Etsy", "Royal Mail", "Evri", "DPD", "DHL Express"]}
      caseStudy={caseStudies[0]}
    />
  );
}
