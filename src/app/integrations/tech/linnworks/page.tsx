import TechIntegrationPage from "@/components/sections/TechIntegrationPage";
import { buildMetadata } from "@/lib/metadata";
import { RefreshCw, Tag, Truck, PoundSterling, Network } from "lucide-react";

const TAGLINE =
  "Connect Linnworks to ITD and dispatch your multi-channel orders through our carrier network without touching a separate carrier setup.";

export const metadata = buildMetadata({
  title: "Linnworks + ITD",
  description: TAGLINE,
  path: "/integrations/tech/linnworks",
});

export default function LinnworksPage() {
  return (
    <TechIntegrationPage
      name="Linnworks"
      logo="/logos/erp-wms/linnworks_logo.png"
      eyebrow="ERP / WMS Integration"
      tagline={TAGLINE}
      description="Linnworks already pulls your orders together across channels. When connecting to ITD, those orders will flow straight into dispatch, with our rates across the carriers applied as labels print and tracking written back into Linnworks. Your team will stop maintaining a separate carrier setup for each channel."
      about={[
        "Linnworks is a multi-channel order management platform used by UK eCommerce sellers who need a single place to run Amazon, eBay, Shopify, WooCommerce and other channels. It handles stock, orders and fulfilment rules across all of them, so sellers aren’t logging in and out of each marketplace to stay on top of what’s shipped.",
        "The gap it doesn’t fill is carrier access. Linnworks routes your orders, but the rates you ship at depend on what you’ve negotiated carrier by carrier. Connect ITD and that changes: your orders reach our full carrier network, and the best-value service on each shipment is selected and labelled without your team having to touch it.",
      ]}
      features={[
        {
          icon: RefreshCw,
          title: "Live order import",
          desc: "The moment an order lands in Linnworks, your workflow is synced and ready to dispatch.",
        },
        {
          icon: Tag,
          title: "Carrier label generation",
          desc: "Labels print instantly with the right service, weight tier, and carrier selected by your workflow rules.",
        },
        {
          icon: Truck,
          title: "Tracking write-back",
          desc: "Tracking numbers and live carrier events push straight back into Linnworks so your team and customers stay updated.",
        },
        {
          icon: PoundSterling,
          title: "Rate optimisation",
          desc: "On each shipment, your workflow picks the best-value compliant carrier across the full network.",
        },
        {
          icon: Network,
          title: "Multi-channel, multi-carrier",
          desc: "Route Amazon, eBay, Shopify, and all other Linnworks channels through any carrier in your workflow.",
        },
      ]}
      closingSubtitle="Connect Linnworks and ship your channels through one carrier network."
      primaryCta={{ label: "Get a quote", href: "/contact?enquiry=linnworks" }}
      secondaryCta={{ label: "Contact us", href: "/contact" }}
    />
  );
}
