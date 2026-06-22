import CarrierPage from "@/components/sections/CarrierPage";
import { RATES_FEATURE } from "@/lib/carrier-pages";
import { Zap, Clock, Truck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Royal Mail integration — ITD Global",
  description: "The UK's national postal network, reaching every address in the country. Access Royal Mail's full business service range through ITD on rates managed at network scale.",
};

export default function RoyalMailPage() {
  return (
    <CarrierPage
      name="Royal Mail"
      logo="/logos/carriers/royal-mail-icon.png"
      tagline="The UK's national postal network, reaching every address in the country."
      description="Royal Mail delivers to every residential and business address in the UK — something no other carrier matches. For eCommerce businesses, it remains the go-to for lighter parcels, large-letter formats, and services requiring a signature or guaranteed delivery time. Through ITD, you access Royal Mail's full business service range on rates managed at network scale, with the carrier relationship handled on your behalf."
      region="Domestic"
      about={[
        "Royal Mail is the UK's designated universal service provider, operating one of the world's most comprehensive postal networks. It serves every UK address six days a week, covering both parcels and letters. For eCommerce businesses, Royal Mail's tracked parcel services — alongside its guaranteed and signed-for options — make it a core part of most carrier mixes, particularly for lighter shipments and subscription or clothing businesses.",
        "Royal Mail rates for business are volume dependent. Access to Tracked 24 and Tracked 48 requires a minimum annual volume threshold, and the rates on a direct account reflect the volume that account alone carries. For businesses whose Royal Mail volume is growing, or who want to consolidate carrier management under one relationship, accessing Royal Mail through ITD removes those barriers.",
      ]}
      services={[
        "Tracked 48",
        "Tracked 24",
        "Special Delivery Guaranteed",
        "Signed For (1st and 2nd Class)",
      ]}
      features={[
        { icon: Truck, title: "Tracked 48", desc: "2-3 day tracked delivery with end-to-end tracking as standard. The most widely used Royal Mail service for standard eCommerce parcels." },
        { icon: Clock, title: "Tracked 24", desc: "Next working day tracked delivery. Full tracking included and suitable for time-sensitive orders where Special Delivery is not required." },
        { icon: ShieldCheck, title: "Special Delivery Guaranteed", desc: "Guaranteed delivery by 1pm the next working day with signature on delivery. Includes compensation cover — the recommended service for high-value items." },
        { icon: Zap, title: "Signed For (1st and 2nd Class)", desc: "1st Class with 1–2-day delivery or 2nd Class with 2-3 day delivery, both with signature confirmation. Suitable for lower-weight items where proof of delivery is required." },
        RATES_FEATURE,
      ]}
      stats={[
        { label: "Coverage", value: "Every UK address" },
        { label: "Frequency", value: "6 days a week" },
        { label: "Best for", value: "Lighter parcels" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
