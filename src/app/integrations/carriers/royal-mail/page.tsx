import CarrierPage from "@/components/sections/CarrierPage";
import { Zap, Eye, Clock, BarChart3, ShieldCheck, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Royal Mail + ITD Global",
  description: "Connect Royal Mail to Connexx for automated shipping, tracking, and international delivery across the UK and worldwide.",
};

export default function RoyalMailPage() {
  return (
    <CarrierPage
      name="Royal Mail"
      heroTitle="Royal Mail x ITD"
      logo="/logos/carriers/ROYAL MAIL LOGO SVG NEW.svg"
      logoBg="#ffffff"
      tagline="The UK's trusted postal service, fully connected to your Connexx dashboard."
      description="Royal Mail delivers to every UK address, six days a week, with international reach to 230+ countries. Through Connexx, you can automate label generation, compare Royal Mail services against other carriers, and track every item in real time."
      region="Domestic"
      services={[
        "Royal Mail Tracked 24",
        "Royal Mail Tracked 48",
        "Special Delivery Guaranteed",
        "1st & 2nd Class Letters",
        "International Standard",
        "International Tracked & Signed",
        "Parcelforce Worldwide",
        "Returns Service",
      ]}
      features={[
        { icon: Zap, title: "Automated label generation", desc: "Batch-generate Royal Mail labels from Connexx with correct service tier auto-selected." },
        { icon: Eye, title: "Unified tracking", desc: "Royal Mail and Parcelforce tracking data in one view alongside all your other carriers." },
        { icon: Globe, title: "International shipping", desc: "Automatic customs documentation for Royal Mail international services." },
        { icon: BarChart3, title: "Service comparison", desc: "Compare Tracked 24 vs Tracked 48 vs Special Delivery costs for every shipment." },
        { icon: ShieldCheck, title: "Compensation tracking", desc: "Monitor compensation limits and automate claims for lost or damaged items." },
        { icon: Clock, title: "Collection scheduling", desc: "Book Royal Mail collections directly through Connexx at your preferred time slots." },
      ]}
      stats={[
        { label: "UK delivery coverage", value: "100%" },
        { label: "Countries reached", value: "230+" },
        { label: "Daily deliveries", value: "24M+" },
        { label: "Connexx integration", value: "Live" },
      ]}
    />
  );
}
