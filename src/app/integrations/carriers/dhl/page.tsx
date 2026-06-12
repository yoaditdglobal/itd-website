import CarrierPage from "@/components/sections/CarrierPage";
import { Zap, Eye, Clock, BarChart3, ShieldCheck, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DHL Integration — ITD Global",
  description: "Connect DHL Express to Connexx for global express shipping, automated customs, and real-time international tracking.",
};

export default function DhlPage() {
  return (
    <CarrierPage
      name="DHL"
      heroTitle="DHL x ITD"
      logo="/logos/carriers/dhl_logo.webp"
      tagline="The world's leading international express carrier, fully integrated with Connexx."
      description="DHL Express connects you to 220+ countries with time-definite international delivery. Through Connexx, you get automated customs documentation, real-time global tracking, and intelligent rate comparison across all DHL services — from Express Worldwide to Economy Select."
      region="International"
      services={[
        "DHL Express Worldwide",
        "DHL Express 9:00 / 10:30 / 12:00",
        "DHL Economy Select",
        "DHL Express Envelope",
        "DHL Import Express",
        "DHL Medical Express",
        "DHL Freight",
        "Returns Service",
      ]}
      features={[
        { icon: Zap, title: "Automated customs docs", desc: "Commercial invoices, CN22/CN23 forms, and export declarations generated automatically." },
        { icon: Eye, title: "Global tracking", desc: "Real-time tracking across 220+ countries in your Connexx dashboard with exception alerts." },
        { icon: Globe, title: "Duty & tax calculator", desc: "Pre-calculate landed costs including duties, taxes, and surcharges before shipping." },
        { icon: Clock, title: "Service selection", desc: "Auto-select Express 9:00 vs Worldwide vs Economy based on your delivery SLA and budget." },
        { icon: BarChart3, title: "Surcharge visibility", desc: "Fuel surcharges, remote area fees, and peak season charges surfaced before booking." },
        { icon: ShieldCheck, title: "Compliance engine", desc: "Denied party screening and restricted goods checks built into the booking flow." },
      ]}
      stats={[
        { label: "Countries & territories", value: "220+" },
        { label: "Daily shipments", value: "5.3M+" },
        { label: "Service points", value: "120,000+" },
        { label: "Connexx integration", value: "Live" },
      ]}
    />
  );
}
