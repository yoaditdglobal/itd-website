import CarrierPage from "@/components/sections/CarrierPage";
import { Zap, Eye, Clock, BarChart3, ShieldCheck, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FedEx Integration — ITD Global",
  description: "Connect FedEx to Connexx for express and freight shipping, real-time tracking, and intelligent rate comparison across all FedEx services.",
};

export default function FedExPage() {
  return (
    <CarrierPage
      name="FedEx"
      heroTitle="FedEx x ITD"
      logo="/logos/carriers/FedEx SVG Logo.svg"
      logoBg="#4D148C"
      tagline="The world's most recognised express carrier, fully integrated with Connexx."
      description="FedEx connects you to 220+ countries and territories with time-definite express, ground, and freight services. Through Connexx, you get automated label generation, real-time tracking, and intelligent rate comparison across the full FedEx portfolio — from International Priority to Economy."
      region="International"
      services={[
        "FedEx International Priority",
        "FedEx International Economy",
        "FedEx International First",
        "FedEx Express Saver",
        "FedEx Ground",
        "FedEx Freight",
        "FedEx Home Delivery",
        "Returns Service",
      ]}
      features={[
        { icon: Zap, title: "Automated label generation", desc: "Commercial invoices, air waybills, and customs forms generated automatically at booking." },
        { icon: Eye, title: "Real-time tracking", desc: "End-to-end shipment visibility across 220+ countries direct in your Connexx dashboard." },
        { icon: Globe, title: "Landed cost calculator", desc: "Pre-calculate duties, taxes, and surcharges before shipping to avoid surprises." },
        { icon: Clock, title: "Service optimisation", desc: "Auto-select Priority vs Economy vs Ground based on your delivery SLA and cost targets." },
        { icon: BarChart3, title: "Surcharge visibility", desc: "Fuel surcharges, remote area fees, and peak season charges surfaced before booking." },
        { icon: ShieldCheck, title: "Compliance engine", desc: "Denied party screening and restricted goods checks built into the booking flow." },
      ]}
      stats={[
        { label: "Countries & territories", value: "220+" },
        { label: "Daily shipments", value: "16M+" },
        { label: "Team members worldwide", value: "500,000+" },
        { label: "Connexx integration", value: "Live" },
      ]}
    />
  );
}
