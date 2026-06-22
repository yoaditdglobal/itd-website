import CarrierPage from "@/components/sections/CarrierPage";
import { RATES_FEATURE } from "@/lib/carrier-pages";
import { Zap, Clock, Truck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evri integration — ITD Global",
  description: "High-volume residential parcel delivery across the full UK network. Access Evri through ITD on rates that reflect network-scale buying power.",
};

export default function EvriPage() {
  return (
    <CarrierPage
      name="Evri"
      logo="/logos/carriers/evri_logo.png"
      tagline="High-volume residential parcel delivery across the full UK network."
      description="Evri is one of the UK's largest parcel carriers, built for eCommerce businesses shipping standard consumer parcels at scale. Its network covers the full UK, with services ranging from standard tracked delivery through to next-day and out-of-home options. Through ITD, you access Evri's services on rates that reflect network-scale buying power, with the carrier relationship managed on your behalf."
      region="Domestic"
      about={[
        "Evri, formerly Hermes, delivers hundreds of millions of parcels each year to residential and business addresses across the UK. Built around high-volume eCommerce delivery, it operates one of the country's most extensive out-of-home networks — with over 10,000 parcel shops and lockers giving recipients flexible collection and drop-off options.",
        "Evri is most used for standard consumer parcels where cost per shipment is the priority. It performs well on lighter, non-fragile items going to residential addresses, and its out-of-home network makes it a strong option for businesses with a high proportion of customers who prefer to collect. For businesses running at volume, Evri rates are sensitive to account size — which is where access through ITD's network makes a material difference.",
      ]}
      video={{
        src: "/media/evri-brand-film.mp4",
        heading: "Evri brand film",
        caption: "A look inside the UK's largest dedicated parcel delivery network.",
      }}
      services={[
        "Tracked 48",
        "Tracked 24",
        "Next Day Guaranteed",
        "Out of Home",
      ]}
      features={[
        { icon: Truck, title: "Tracked 48", desc: "Standard tracked delivery within 2 working days. End-to-end tracking included as standard, with up to £20 cover." },
        { icon: Clock, title: "Tracked 24", desc: "Next working day tracked delivery. Drop off before 12pm for same-day collection and next working day despatch." },
        { icon: Zap, title: "Next Day Guaranteed", desc: "Guaranteed next working day delivery for time-critical shipments, with full tracking and proof of delivery." },
        { icon: ShieldCheck, title: "Out of Home", desc: "Delivery to Evri's network of 10,000+ parcel shops and lockers across the UK. Convenient for customers who prefer to collect, with locations open early and late." },
        RATES_FEATURE,
      ]}
      stats={[
        { label: "Coverage", value: "Full UK" },
        { label: "Out-of-home", value: "10,000+ shops & lockers" },
        { label: "Best for", value: "Residential parcels" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
