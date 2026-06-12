import CarrierPage from "@/components/sections/CarrierPage";
import { Zap, Eye, Clock, BarChart3, ShieldCheck, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UPS Integration — ITD Global",
  description: "Connect UPS to Connexx for domestic and international shipping, real-time tracking, and intelligent rate comparison across all UPS services.",
};

export default function UPSPage() {
  return (
    <CarrierPage
      name="UPS"
      heroTitle="UPS x ITD"
      logo="/logos/carriers/UPS SVG LOGO.svg"
      logoBg="#351C15"
      logoPadding="p-2"
      tagline="One of the world's largest package delivery companies, fully integrated with Connexx."
      description="UPS delivers to 220+ countries and territories with a comprehensive portfolio of domestic and international services. Through Connexx, you get automated label generation, real-time tracking, and intelligent rate comparison across the full UPS portfolio — from UPS Express to Standard Ground."
      region="International"
      services={[
        "UPS Express",
        "UPS Express Saver",
        "UPS Worldwide Express",
        "UPS Worldwide Expedited",
        "UPS Standard",
        "UPS Ground",
        "UPS Access Point",
        "Returns Service",
      ]}
      features={[
        { icon: Zap, title: "Automated label generation", desc: "Commercial invoices, air waybills, and customs forms generated automatically at booking." },
        { icon: Eye, title: "Real-time tracking", desc: "End-to-end shipment visibility across 220+ countries direct in your Connexx dashboard." },
        { icon: Globe, title: "Landed cost calculator", desc: "Pre-calculate duties, taxes, and surcharges before shipping to avoid surprises." },
        { icon: Clock, title: "Service optimisation", desc: "Auto-select Express vs Standard based on your delivery SLA and cost targets." },
        { icon: BarChart3, title: "Surcharge visibility", desc: "Fuel surcharges, remote area fees, and peak season charges surfaced before booking." },
        { icon: ShieldCheck, title: "Compliance engine", desc: "Denied party screening and restricted goods checks built into the booking flow." },
      ]}
      stats={[
        { label: "Countries & territories", value: "220+" },
        { label: "Daily shipments", value: "21M+" },
        { label: "Team members worldwide", value: "500,000+" },
        { label: "Connexx integration", value: "Live" },
      ]}
    />
  );
}
