import CarrierPage from "@/components/sections/CarrierPage";
import { RATES_FEATURE } from "@/lib/carrier-pages";
import { Clock, Truck, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DPD integration — ITD Global",
  description: "Precise tracked delivery across the UK and into Europe, with one-hour delivery windows as standard. Access DPD through ITD on rates built across the network.",
};

export default function DpdPage() {
  return (
    <CarrierPage
      name="DPD"
      logo="/logos/carriers/dpd-tile.png"
      tagline="Precise tracked delivery across the UK and into Europe, with one-hour delivery windows as standard."
      description="DPD is one of the UK's most recognised parcel carriers, known for its Predict service — which gives recipients a one-hour delivery window on the morning of delivery. It operates one of the largest depot networks in the UK and offers both domestic next-day services and a strong European road and air network. Through ITD, you access DPD's service range on rates built across the network, with carrier management handled on your behalf."
      region="Domestic"
      about={[
        "DPD UK operates from 68 depots across the country, delivering over 4.8 million parcels each day. Part of DPDgroup — one of Europe's largest parcel networks — it provides domestic next-day services alongside road and air services into more than 230 international destinations. Its Predict notification system, which gives customers a one-hour delivery slot via SMS or app, has made it a preferred carrier for businesses where customer delivery experience matters.",
        "DPD is particularly well-suited to businesses shipping heavier or higher-value parcels where delivery precision is important. Its one-hour window and live driver tracking reduce failed delivery rates significantly compared to standard carriers — which translates directly into fewer customer service contacts and lower redelivery costs. For businesses who need that level of service at scale, rate access matters as much as the service itself.",
      ]}
      services={[
        "DPD Next Day",
        "DPD Two Day",
        "DPD Saturday",
        "DPD Classic (European)",
      ]}
      features={[
        { icon: Clock, title: "DPD Next Day", desc: "Guaranteed next working day delivery across the UK. Customers receive a one-hour delivery window via SMS or app on the morning of delivery, with live driver tracking." },
        { icon: Clock, title: "DPD Two Day", desc: "Guaranteed 2-day delivery with the same Predict notification and tracking. A cost-effective option for non-urgent shipments where delivery precision is still required." },
        { icon: Truck, title: "DPD Saturday", desc: "Weekend delivery for customers who are unavailable during the working week. Extends next-day service coverage into Saturday with the same tracking experience." },
        { icon: Globe, title: "DPD Classic (European)", desc: "Road-based delivery into 24 European countries in 1-4 working days. Cost-effective for regular European volume where transit time flexibility is acceptable." },
        RATES_FEATURE,
      ]}
      stats={[
        { label: "Network", value: "68 UK depots" },
        { label: "Volume", value: "4.8M parcels/day" },
        { label: "International", value: "230+ destinations" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
