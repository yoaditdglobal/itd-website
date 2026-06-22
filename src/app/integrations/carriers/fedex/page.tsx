import CarrierPage from "@/components/sections/CarrierPage";
import { RATES_FEATURE } from "@/lib/carrier-pages";
import { Zap, Clock, Globe, Truck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FedEx integration — ITD Global",
  description: "Time-definite international delivery across 220 countries, with priority and economy options for every shipment type. Access FedEx through ITD on rates managed at network scale.",
};

export default function FedExPage() {
  return (
    <CarrierPage
      name="FedEx"
      logo="/logos/carriers/fedex-icon.png"
      logoBg="#4D148C"
      tagline="Time-definite international delivery across 220 countries, with priority and economy options for every shipment type."
      description="FedEx is one of the world's largest express carriers, with an international network spanning over 220 countries and territories. Its services cover everything from next-day priority delivery to economy air-and-ground options, alongside freight services for heavier consignments. Through ITD, you access FedEx's full-service range on rates managed at network scale, with the carrier relationship handled on your behalf."
      region="International"
      about={[
        "FedEx operates one of the world's largest dedicated cargo air fleets, with a global network underpinned by owned infrastructure across North America, Europe, and Asia Pacific. In the UK, FedEx is primarily used for international express shipments — particularly to North America, where its network is exceptionally well-established — and for businesses requiring customs expertise, freight handling, or time-critical delivery across long-haul routes.",
        "FedEx performs particularly strongly for UK businesses with a significant US or Canadian customer base. Its International Priority service offers next business day delivery by noon to over 75,000 postcodes across Europe, and next working day by 10:30am across major North American postcodes — transit times that are consistently difficult to match through alternative carriers on those lanes. For businesses where the Americas represent a meaningful share of international volume, FedEx is typically the right carrier for that portion of the mix.",
      ]}
      services={[
        "FedEx International Priority",
        "FedEx International Priority Express",
        "FedEx International Economy",
        "FedEx International Priority Freight",
      ]}
      features={[
        { icon: Clock, title: "FedEx International Priority", desc: "Next business day delivery by noon to 75,000+ European postcodes, and by 10:30am to major US and Canadian postcodes. For time-critical international shipments up to 68kg per package." },
        { icon: Zap, title: "FedEx International Priority Express", desc: "Premium door-to-door express with customs clearance included. The fastest FedEx international option for urgent shipments across all weight categories." },
        { icon: Globe, title: "FedEx International Economy", desc: "Cost-effective international delivery in 2-5 business days, using a combination of air and ground transport. Suited to regular international volume where cost per shipment outweighs speed." },
        { icon: Truck, title: "FedEx International Priority Freight", desc: "For heavy consignments from 68kg. Midday next business day delivery. Combines FedEx's express transit times with freight-grade capacity." },
        RATES_FEATURE,
      ]}
      stats={[
        { label: "Coverage", value: "220+ countries" },
        { label: "Strength", value: "North America" },
        { label: "Best for", value: "International express" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
