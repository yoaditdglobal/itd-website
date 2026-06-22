import CarrierPage from "@/components/sections/CarrierPage";
import { RATES_FEATURE } from "@/lib/carrier-pages";
import { Zap, Clock, Truck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amazon Shipping integration — ITD Global",
  description: "Amazon's own delivery network, available for eCommerce shipments beyond the Amazon platform. Access Amazon Shipping through ITD on rates managed at scale.",
};

export default function AmazonShippingPage() {
  return (
    <CarrierPage
      name="Amazon Shipping"
      logo="/logos/carriers/amazonshipping_logo.png"
      tagline="Amazon's own delivery network, available for eCommerce shipments beyond the Amazon platform."
      description="Amazon Shipping gives businesses access to Amazon's UK logistics infrastructure — the same network behind Prime delivery — for their own eCommerce orders. It covers same-day delivery in major UK cities and next-day and standard services across the country. Through ITD, you access Amazon Shipping's services on rates managed at scale, without requiring a direct Amazon Shipping account."
      region="Domestic"
      about={[
        "Amazon Shipping is Amazon's carrier service, available to eCommerce businesses shipping their own orders outside the Amazon marketplace. It uses Amazon's UK delivery infrastructure — built around speed, reliability, and residential coverage — to offer same-day, next-day, and standard delivery options. Same-day delivery is now available across more than 80 UK towns and cities.",
        "Amazon Shipping is particularly valuable for businesses with a significant residential delivery volume who want access to Amazon's fulfilment-grade infrastructure without operating through FBA. The service benefits from the investment Amazon has made in its last-mile network — dense urban coverage, high delivery attempt rates, and customer-facing tracking that shoppers already recognise and trust.",
      ]}
      services={[
        "Same Day",
        "Next Day",
        "Standard",
        "Residential coverage",
      ]}
      features={[
        { icon: Clock, title: "Same Day", desc: "Delivery on the same day as despatch in 80+ UK towns and cities. Available for orders despatched before the applicable cut-off time. Suited to high-urgency consumer orders in metropolitan areas." },
        { icon: Zap, title: "Next Day", desc: "Next working day delivery across the UK. Access to Amazon's Prime-grade delivery infrastructure for standard eCommerce fulfilment." },
        { icon: Truck, title: "Standard", desc: "Cost-effective 3-5 day delivery for non-urgent shipments. Tracked throughout, with delivery confirmation." },
        { icon: ShieldCheck, title: "Residential coverage", desc: "Amazon's network is built around residential delivery at high volume. Dense urban coverage and high first-attempt delivery rates, backed by customer-familiar tracking." },
        RATES_FEATURE,
      ]}
      stats={[
        { label: "Coverage", value: "UK" },
        { label: "Same-day", value: "80+ towns & cities" },
        { label: "Best for", value: "Residential volume" },
        { label: "ITD integration", value: "Live" },
      ]}
    />
  );
}
