import CarrierPage from "@/components/sections/CarrierPage";
import { Zap, Eye, Clock, BarChart3, ShieldCheck, RefreshCw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evri Integration — ITD Global",
  description: "Connect Evri to Connexx for automated label generation, real-time tracking, and returns management across the UK.",
};

export default function EvriPage() {
  return (
    <CarrierPage
      name="Evri"
      logo="/logos/carriers/evri logo carrier integration page.png"
      tagline="UK's largest dedicated parcel delivery network, fully integrated with Connexx."
      description="Evri delivers to over 30 million UK addresses. Through Connexx, you get automated label generation, real-time tracking, and seamless returns processing — all without leaving your dashboard. Ideal for eCommerce businesses with high UK domestic volumes."
      region="Domestic"
      services={[
        "Standard Delivery (2-3 days)",
        "Next Day Delivery",
        "ParcelShop Drop-off",
        "ParcelShop Collection",
        "Returns Management",
        "Tracked & Signed",
      ]}
      features={[
        { icon: Zap, title: "Automated label generation", desc: "Generate Evri labels in bulk directly from Connexx. No copy-pasting, no manual entry." },
        { icon: Eye, title: "Real-time tracking", desc: "Every Evri shipment tracked in your Connexx dashboard alongside all other carriers." },
        { icon: BarChart3, title: "Cost analytics", desc: "Compare Evri costs against other carriers per route to optimise your carrier mix." },
      ]}
      stats={[
        { label: "UK addresses covered", value: "30M+" },
        { label: "ParcelShops", value: "7,000+" },
        { label: "Daily parcels", value: "3.5M+" },
        { label: "Connexx integration", value: "Live" },
      ]}
    />
  );
}
