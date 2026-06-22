import CarrierPage from "@/components/sections/CarrierPage";
import { RATES_FEATURE } from "@/lib/carrier-pages";
import { Zap, Clock, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DHL Express integration — ITD Global",
  description: "The world's leading international express courier, delivering to over 220 countries and territories. Access DHL Express through ITD on rates managed at network scale.",
};

export default function DhlPage() {
  return (
    <CarrierPage
      name="DHL Express"
      logo="/logos/carriers/dhl_logo.webp"
      tagline="The world's leading international express courier, delivering to over 220 countries and territories."
      description="DHL Express is the global market leader in international parcel delivery, connecting businesses in the UK with customers and partners in over 220 countries. Its network is built around speed and certainty — time-definite delivery, door-to-door, with customs clearance handled as part of the service. Through ITD, you access DHL Express services on rates managed at network scale, without the overhead of managing a direct account."
      region="International"
      about={[
        "DHL Express is a division of Deutsche Post DHL Group, the world's largest logistics company. Its express network operates across 220+ countries and territories, with a fleet of dedicated aircraft and ground vehicles providing time-definite, door-to-door delivery for international parcels and documents. In the UK, DHL Express is widely used by businesses shipping cross-border — particularly for B2B, high-value goods, and markets where customs complexity requires specialist handling.",
        "DHL Express is the default choice for businesses where international shipping speed and reliability are non-negotiable. Its strength lies in markets outside Europe — particularly North America, Asia Pacific, and the Middle East — where its proprietary air network gives it a transit time advantage over road-based alternatives. For UK businesses growing into international markets, or those already shipping at cross-border volume, the rates available through ITD's network access make a material difference to per-shipment cost.",
      ]}
      services={[
        "DHL Express Worldwide",
        "DHL Express 12:00",
        "DHL Economy Select",
        "DHL Express Envelope",
      ]}
      features={[
        { icon: Globe, title: "DHL Express Worldwide", desc: "Time-definite door-to-door delivery to 220+ countries. Customs clearance included. Delivery by end of next possible business day in major markets." },
        { icon: Clock, title: "DHL Express 12:00", desc: "Delivery by midday the next possible business day to major destinations. For shipments where arrival before noon is a commercial requirement." },
        { icon: Globe, title: "DHL Economy Select", desc: "Road-based delivery across Europe with pre-defined, day-certain delivery times. A cost-effective alternative to air express for regular European volume where same-day precision is not required." },
        { icon: Zap, title: "DHL Express Envelope", desc: "Express delivery for documents and small lightweight items. Next possible business day, door-to-door, to 220+ countries. Straightforward customs clearance for document-only shipments." },
        RATES_FEATURE,
      ]}
      stats={[
        { label: "Coverage", value: "220+ countries" },
        { label: "Network", value: "Deutsche Post DHL Group" },
        { label: "Best for", value: "International express" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
