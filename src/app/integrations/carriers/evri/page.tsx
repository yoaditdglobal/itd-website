import CarrierPage from "@/components/sections/CarrierPage";
import { Zap, Eye, Clock, BarChart3, ShieldCheck, RefreshCw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evri Integration — ITD Global",
  description: "Connect Evri to ITD for automated label generation, real-time tracking, and returns management across the UK.",
};

export default function EvriPage() {
  return (
    <CarrierPage
      name="Evri"
      logo="/logos/carriers/evri_logo.png"
      tagline="UK's largest dedicated parcel delivery network, fully integrated with ITD."
      description="Evri delivers to over 30 million UK addresses. Through ITD, you get automated label generation, real-time tracking, and seamless returns processing — all without leaving your dashboard. Ideal for eCommerce businesses with high UK domestic volumes."
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
        { icon: Zap, title: "Automated label generation", desc: "Generate Evri labels in bulk directly from ITD. No copy-pasting, no manual entry." },
        { icon: Eye, title: "Real-time tracking", desc: "Every Evri shipment tracked in your ITD dashboard alongside all other carriers." },
        { icon: RefreshCw, title: "Returns automation", desc: "Self-serve returns portal for your customers with automatic Evri label generation." },
        { icon: BarChart3, title: "Cost analytics", desc: "Compare Evri costs against other carriers per route to optimise your carrier mix." },
        { icon: Clock, title: "ParcelShop routing", desc: "Automatically offer ParcelShop collection as a delivery option at checkout." },
        { icon: ShieldCheck, title: "Compensation cover", desc: "Track compensation tiers and claims directly through the platform." },
      ]}
      stats={[
        { label: "UK addresses covered", value: "30M+" },
        { label: "ParcelShops", value: "7,000+" },
        { label: "Daily parcels", value: "3.5M+" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
