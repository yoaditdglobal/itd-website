import CarrierPage from "@/components/sections/CarrierPage";
import { RATES_FEATURE } from "@/lib/carrier-pages";
import { Zap, Clock, Globe, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UPS integration — ITD Global",
  description: "Global express and standard delivery across 220 countries, with a trusted business parcel network in the UK. Access UPS through ITD on rates managed at network scale.",
};

export default function UPSPage() {
  return (
    <CarrierPage
      name="UPS"
      logo="/logos/carriers/ups_logo.png"
      logoBg="#351C15"
      tagline="Global express and standard delivery across 220 countries, with a trusted business parcel network in the UK."
      description="UPS operates one of the world's largest parcel and freight networks, with strong domestic coverage in the UK and express international services reaching over 220 countries. Its range spans from guaranteed next-day air express through to scheduled road services and Access Point collection and drop-off. Through ITD, you access UPS services on rates managed at network scale, with the carrier relationship handled on your behalf."
      region="International"
      about={[
        "UPS is one of the world's largest package delivery companies, operating in over 220 countries and territories with a combined air and ground network. In the UK, it provides domestic parcel delivery alongside a full range of international express and standard services. Its Access Point network — comprising thousands of drop-off and collection locations — gives businesses and their customers a flexible alternative to home delivery.",
        "UPS is predominantly used by businesses with regular international shipping requirements, particularly into the US, Canada, and continental Europe, where its air express network performs strongly. It is also well-regarded for business-to-business deliveries, heavier consignments, and shipments requiring insurance or specialised handling. For businesses where the destination mix extends beyond the UK, UPS is typically a core part of the carrier strategy.",
      ]}
      services={[
        "UPS Express",
        "UPS Express Saver",
        "UPS Standard",
        "UPS Access Point",
      ]}
      features={[
        { icon: Zap, title: "UPS Express", desc: "Time-definite air delivery. Domestic next working day; international delivery in 1-3 working days depending on destination. For time-critical shipments where certainty of arrival matters." },
        { icon: Clock, title: "UPS Express Saver", desc: "End-of-day air delivery at a reduced rate compared to Express. 1-2 days domestic; 1-5 days international. The most widely used UPS air service for regular cross-border volume." },
        { icon: Globe, title: "UPS Standard", desc: "Scheduled road-based delivery for domestic and European shipments. Cost-effective for non-urgent consignments where a defined delivery window is required." },
        { icon: ShieldCheck, title: "UPS Access Point", desc: "Delivery to or collection from thousands of Access Point locations across the UK. Convenient for recipients who are unavailable for home delivery, or for businesses using drop-off despatch." },
        RATES_FEATURE,
      ]}
      stats={[
        { label: "Coverage", value: "220+ countries" },
        { label: "Network", value: "Air & ground" },
        { label: "Best for", value: "International express" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
