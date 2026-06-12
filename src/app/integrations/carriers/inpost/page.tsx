import CarrierPage from "@/components/sections/CarrierPage";
import { Zap, Eye, Clock, BarChart3, ShieldCheck, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InPost Integration — ITD Global",
  description: "Connect InPost to Connexx for locker-based delivery, real-time tracking, and cost-effective parcel solutions.",
};

export default function InPostPage() {
  return (
    <CarrierPage
      name="InPost"
      logo="/logos/carriers/InPost logo svg integration carrier.svg"
      logoBg="#ffffff"
      tagline="Europe's fastest-growing locker network, connected to Connexx for seamless last-mile delivery."
      description="InPost operates one of Europe's largest automated parcel locker networks, giving your customers flexible, contact-free collection at thousands of convenient locations. Through Connexx, you get full access to InPost's locker and courier services, with automated label generation, real-time tracking, and smart delivery routing."
      region="Domestic"
      services={[
        "InPost Locker Delivery",
        "InPost Courier",
        "InPost Returns",
        "InPost Next Day",
        "InPost Saturday Delivery",
        "InPost International",
      ]}
      features={[
        { icon: Zap, title: "Automated label generation", desc: "Generate InPost labels with correct service and locker assignments auto-applied." },
        { icon: Eye, title: "Real-time tracking", desc: "Live parcel tracking and locker status visible in your Connexx dashboard." },
        { icon: Globe, title: "Locker network", desc: "Access thousands of InPost lockers across the UK and Europe for flexible customer collection." },
        { icon: Clock, title: "Collection booking", desc: "Schedule InPost courier collections and manage pickup windows directly in Connexx." },
        { icon: BarChart3, title: "Service optimisation", desc: "Auto-select locker vs courier delivery based on your cost and speed rules." },
        { icon: ShieldCheck, title: "Proof of delivery", desc: "Access digital confirmation and photo proof of delivery from the Connexx dashboard." },
      ]}
      stats={[
        { label: "Parcel lockers", value: "25,000+" },
        { label: "Countries", value: "12+" },
        { label: "Parcels per year", value: "750M+" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
