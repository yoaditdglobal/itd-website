import CarrierPage from "@/components/sections/CarrierPage";
import { RATES_FEATURE } from "@/lib/carrier-pages";
import { Zap, Clock, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parcelforce integration — ITD Global",
  description: "Guaranteed timed delivery across the UK, with international services through the Royal Mail Group network. Access Parcelforce through ITD on rates managed at network scale.",
};

export default function ParcelforcePage() {
  return (
    <CarrierPage
      name="Parcelforce"
      logo="/logos/carriers/parcel-force.svg"
      logoBg="#ed2929"
      tagline="Guaranteed timed delivery across the UK, with international services through the Royal Mail Group network."
      description="Parcelforce Worldwide is the express parcel division of Royal Mail Group, specialising in guaranteed timed domestic delivery and a broad range of international services. Its network handles larger and heavier parcels that standard tracked services may not accommodate, with time-critical options ranging from before 9am through to next-day and two-day guarantees. Through ITD, you access Parcelforce's full-service range on rates managed at network scale."
      region="International"
      about={[
        "Parcelforce Worldwide operates as the express parcel division of Royal Mail Group, with a dedicated network of depots and drivers separate from Royal Mail's standard postal operation. It focuses on larger parcels, heavier consignments, and time-critical shipments — serving businesses that need guaranteed delivery windows rather than estimated ones. Internationally, it uses Royal Mail Group's global postal partnerships to reach over 240 countries and territories.",
        "Parcelforce is the carrier of choice for businesses shipping heavier items — typically above 2kg — where a guaranteed time window is required. Its compensation and insurance cover also makes it well-suited to higher-value shipments. For businesses managing a mixed parcel profile, Parcelforce sits alongside lighter-weight tracked services to cover the part of the consignment mix that needs certainty over speed and protection.",
      ]}
      services={[
        "Express24",
        "Express48",
        "Express9 / Express10",
        "GlobalValue / GlobalExpress",
      ]}
      features={[
        { icon: Clock, title: "Express24", desc: "Guaranteed next working day delivery by 5.30pm. Tracked throughout with signature on delivery available." },
        { icon: Clock, title: "Express48", desc: "Guaranteed 2-day delivery by 5.30pm. Full tracking included. Suited to less urgent shipments where cost is a factor and a delivery guarantee is still required." },
        { icon: Zap, title: "Express9 / Express10", desc: "Timed guaranteed delivery by 9am or 10am the next working day. For time-critical business shipments where the delivery window is a hard requirement." },
        { icon: Globe, title: "GlobalValue / GlobalExpress", desc: "International services covering 240+ countries. GlobalValue provides cost-effective international delivery from 4 working days; GlobalExpress provides faster time-definite international delivery via the Royal Mail Group network." },
        RATES_FEATURE,
      ]}
      stats={[
        { label: "Coverage", value: "240+ countries" },
        { label: "Best for", value: "Heavier & timed" },
        { label: "Network", value: "Royal Mail Group" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
