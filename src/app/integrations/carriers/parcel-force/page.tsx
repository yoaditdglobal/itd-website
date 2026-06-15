import CarrierPage from "@/components/sections/CarrierPage";
import { Zap, Eye, Clock, BarChart3, ShieldCheck, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parcelforce Integration — ITD Global",
  description: "Connect Parcelforce to ITD for reliable UK and international parcel delivery, real-time tracking, and automated label generation.",
};

export default function ParcelforcePage() {
  return (
    <CarrierPage
      name="Parcelforce"
      logo="/logos/carriers/parcel-force.svg"
      logoBg="#ed2929"
      tagline="One of the UK's most trusted parcel carriers, connected to ITD for fast, reliable domestic and international delivery."
      description="Parcelforce Worldwide is the express parcel division of Royal Mail Group, delivering millions of parcels across the UK and to over 240 countries and territories. Through ITD, you get seamless access to Parcelforce's full service range, with automated label generation, real-time tracking, and collection management built into your existing workflow."
      region="Domestic"
      services={[
        "Parcelforce express24",
        "Parcelforce express48",
        "Parcelforce expressAM",
        "Parcelforce express9",
        "Parcelforce globalvalue",
        "Parcelforce globalexpress",
      ]}
      features={[
        { icon: Zap, title: "Automated label generation", desc: "Generate Parcelforce labels with correct service codes and barcodes auto-applied." },
        { icon: Eye, title: "Real-time tracking", desc: "Live parcel tracking visible in your ITD dashboard with customer notifications." },
        { icon: Globe, title: "International reach", desc: "Access Parcelforce's global network covering 240+ countries and territories." },
        { icon: Clock, title: "Collection booking", desc: "Schedule Parcelforce collections and manage pickup windows directly in ITD." },
        { icon: BarChart3, title: "Service optimisation", desc: "Auto-select the best Parcelforce service based on your cost, weight, and speed rules." },
        { icon: ShieldCheck, title: "Proof of delivery", desc: "Access digital signatures and proof of delivery records from the ITD dashboard." },
      ]}
      stats={[
        { label: "Countries served", value: "240+" },
        { label: "UK depots", value: "54+" },
        { label: "Parcels per year", value: "100M+" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
