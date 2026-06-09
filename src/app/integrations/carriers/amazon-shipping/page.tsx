import CarrierPage from "@/components/sections/CarrierPage";
import { Zap, Eye, Clock, BarChart3, ShieldCheck, Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amazon Shipping Integration — ITD Global",
  description: "Connect Amazon Shipping to Connexx. Access Amazon's logistics network for competitive rates and fast delivery.",
};

export default function AmazonShippingPage() {
  return (
    <CarrierPage
      name="Amazon Shipping"
      logo="/logos/carriers/amazonshipping_logo.png"
      tagline="Access Amazon's logistics network for competitive parcel rates, now connected to Connexx."
      description="Amazon Shipping brings Amazon's world-class logistics infrastructure to third-party sellers and businesses. Through Connexx, you can compare Amazon Shipping rates against your other carriers, generate labels automatically, and track every delivery with Amazon's precision tracking — all from one dashboard."
      region="Domestic"
      services={[
        "Amazon Standard Delivery",
        "Amazon Next Day",
        "Amazon Same Day (select areas)",
        "Weekend Delivery",
        "Evening Delivery",
        "Amazon Locker Delivery",
      ]}
      features={[
        { icon: Zap, title: "Competitive rate comparison", desc: "Compare Amazon Shipping rates against DHL, Evri, and Royal Mail on every shipment." },
        { icon: Eye, title: "Amazon-grade tracking", desc: "Granular delivery tracking with customer notification integration." },
        { icon: Package, title: "Multi-channel fulfilment", desc: "Use Amazon Shipping for non-Amazon orders to access volume-driven pricing." },
        { icon: Clock, title: "Flexible delivery windows", desc: "Offer same-day, next-day, and evening delivery options at checkout." },
        { icon: BarChart3, title: "Cost analytics", desc: "Track Amazon Shipping spend and compare unit economics against other carriers." },
        { icon: ShieldCheck, title: "Claims management", desc: "File and track delivery claims directly through the Connexx platform." },
      ]}
      stats={[
        { label: "UK coverage", value: "95%+" },
        { label: "Delivery options", value: "6" },
        { label: "Avg delivery time", value: "1-2 days" },
        { label: "Connexx integration", value: "Live" },
      ]}
    />
  );
}
