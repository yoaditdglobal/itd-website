import CarrierPage from "@/components/sections/CarrierPage";
import { Zap, Eye, Clock, BarChart3, ShieldCheck, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DPD Integration — ITD Global",
  description: "Connect DPD to ITD for predicted delivery windows, real-time tracking, and European parcel delivery.",
};

export default function DpdPage() {
  return (
    <CarrierPage
      name="DPD"
      logo="/logos/carriers/DPD-LOGO.png"
      tagline="Europe's leading parcel delivery network with one-hour delivery windows, connected to ITD."
      description="DPD is known for its Predict service — one-hour delivery windows with real-time driver tracking. Through ITD, you get full access to DPD's domestic and European network, with automated label generation, proactive notifications, and cost optimisation across all DPD services."
      region="Domestic"
      services={[
        "DPD Next Day",
        "DPD Predict (1-hour window)",
        "DPD Saturday Delivery",
        "DPD Two Day",
        "DPD Classic (European)",
        "DPD Express (European)",
        "Pickup Shop Delivery",
        "Returns Service",
      ]}
      features={[
        { icon: Zap, title: "Automated label generation", desc: "Generate DPD labels with correct service and weight tiers auto-applied." },
        { icon: Eye, title: "Predict tracking", desc: "One-hour delivery windows and live driver tracking visible in your ITD dashboard." },
        { icon: Globe, title: "European network", desc: "Ship to 30+ European countries via DPD's ground network with automated customs." },
        { icon: Clock, title: "Collection booking", desc: "Schedule DPD collections and manage pickup windows directly in ITD." },
        { icon: BarChart3, title: "Service optimisation", desc: "Auto-select DPD Next Day vs Two Day vs Classic based on your cost and speed rules." },
        { icon: ShieldCheck, title: "Proof of delivery", desc: "Access digital signatures and photo proof of delivery from the ITD dashboard." },
      ]}
      stats={[
        { label: "European countries", value: "30+" },
        { label: "Pickup shops", value: "70,000+" },
        { label: "Parcels per day", value: "8.4M+" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
