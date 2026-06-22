import CarrierPage from "@/components/sections/CarrierPage";
import { RATES_FEATURE } from "@/lib/carrier-pages";
import { Clock, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InPost integration — ITD Global",
  description: "The UK's largest parcel locker network, with 15,000 locations accessible 24 hours a day. Access InPost through ITD on rates managed at scale.",
};

export default function InPostPage() {
  return (
    <CarrierPage
      name="InPost"
      logo="/logos/carriers/inpost-icon.png"
      tagline="The UK's largest parcel locker network, with 15,000 locations accessible 24 hours a day."
      description="InPost gives eCommerce businesses an out-of-home delivery option that removes the problem of failed home deliveries. Customers choose their nearest locker or shop at checkout, collect at any time, and return the same way. Through ITD, you access InPost's network and services with rates managed at scale and the carrier relationship handled on your behalf."
      region="Domestic"
      about={[
        "InPost is Europe's leading out-of-home parcel network, operating across 12 countries with over 50,000 locker locations. In the UK, the network has reached 15,000 automated parcel machines — located in supermarkets, retail parks, transport hubs, and residential areas — making it the largest parcel locker network in the country. Lockers are open 24 hours a day, 7 days a week.",
        "InPost has moved from a niche alternative to a mainstream delivery option for UK eCommerce. According to InPost, 49% of shoppers say they would use out-of-home delivery more often if it were available at checkout, and in their own retailer deployments, up to 21% of orders have shifted from home delivery to lockers when the option is presented. For businesses with high return rates — particularly in fashion, health, and consumer electronics — InPost's returns service adds further value by removing friction from the customer returns journey.",
      ]}
      services={[
        "Locker Delivery",
        "Door to Locker",
        "Home Delivery",
        "Returns",
      ]}
      features={[
        { icon: ShieldCheck, title: "Locker Delivery", desc: "Parcel delivered to the customer's chosen InPost locker or shop. Delivery within 3 working days. Customer collects at any time — no missed deliveries, no redelivery attempts." },
        { icon: Truck, title: "Door to Locker", desc: "Collected from the sender's address and delivered to the recipient's chosen locker. Suitable for businesses despatching at volume without requiring customers to initiate collection from a drop-off point." },
        { icon: Clock, title: "Home Delivery", desc: "Parcel dropped at any InPost locker by the sender and delivered to the recipient's home address. Standard delivery within 2 working days." },
        { icon: RefreshCw, title: "Returns", desc: "Customer drops their return at any InPost locker or shop. Tracked back through the network, with confirmation on receipt. No printer required for the customer — label generated via QR code." },
        RATES_FEATURE,
      ]}
      stats={[
        { label: "Network", value: "15,000 UK lockers" },
        { label: "Access", value: "24/7" },
        { label: "Best for", value: "Out-of-home & returns" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
