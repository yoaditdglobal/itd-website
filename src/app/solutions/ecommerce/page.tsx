import VerticalPage from "@/components/sections/VerticalPage";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Eye, MapPin, Plug, ShoppingCart, Zap } from "lucide-react";

export const metadata = buildMetadata({
  title: "eCommerce shipping",
  description:
    "Cut shipping costs by routing every order through the cheapest compliant carrier. Connexx connects Shopify, WooCommerce, and 12+ carriers from one dashboard.",
  path: "/solutions/ecommerce",
});

/** TL;DR — every bullet is verifiable against this page's own copy. */
const TLDR = [
  "We give UK online retailers more delivery choice to offer shoppers while lowering the rates they pay, so margins grow as they scale.",
  "We plug into Shopify, WooCommerce and Magento, then compare live carrier rates on every order and track it all on one link.",
  "Because your shipping sits on our pooled buying power, your rates rise far less at each carrier price increase than they would on your own account.",
];

export default function EcommercePage() {
  return (
    <VerticalPage
      gatewayMedia={{
        mp4: "/media/connexx-ecommerce.mp4",
        webm: "/media/connexx-ecommerce.webm",
        poster: "/media/connexx-ecommerce-poster.jpg",
        caption:
          "Connexx syncing orders from Shopify, Amazon, eBay and Veeqo, mapping where they ship, picking the winning rate, and tracking every parcel to the door on one link.",
      }}
      label="eCommerce"
      title="Give shoppers more delivery choice while you grow your margins"
      subtitle="Our multi-carrier solution fits into your workflow. We integrate with your eCommerce platform, giving you more delivery options to offer shoppers and lower rates to ship orders."
      primaryCta={{ label: "Get Quote", href: RATE_CHECKER_URL }}
      secondaryCta={{
        label: "Contact Sales",
        href: "/contact?enquiry=ecommerce",
      }}
      heroImage={{
        src: "/solutions/ecommerce-hero.webp",
        alt: "Online shopper at a keyboard with a Visa card — eCommerce checkout",
        gradient: "from-accent-light via-white to-accent/15",
        icon: ShoppingCart,
      }}
      keyTakeaways={TLDR}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "eCommerce", path: "/solutions/ecommerce" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "eCommerce shipping software",
          description:
            "Multi-carrier shipping platform for UK eCommerce retailers. Connects Shopify, WooCommerce, and 12+ carriers in a single dashboard with automated rate comparison.",
          path: "/solutions/ecommerce",
          serviceType: "Multi-Carrier Shipping Software",
          areaServed: ["United Kingdom", "European Union", "Worldwide"],
        }),
      ]}
      pains={[
        {
          num: "01",
          title: "Big-volume rates, without the big volume",
          desc: "You ship at the price one carrier handed you. We buy across many, so the same orders cost less.",
        },
        {
          num: "02",
          title: "When carriers raise prices, yours barely move",
          desc: "Rates climb year after year. Our volume keeps yours close to flat.",
        },
        {
          num: "03",
          title: "One delivery option loses you sales",
          desc: "Shoppers want to choose their speed and price. Offer it, and fewer drop the basket.",
        },
      ]}
      features={[
        {
          icon: Plug,
          title: "Plugs into Shopify, your marketplaces and WMS",
        },
        {
          icon: Eye,
          title: "A live view of what you're shipping and where",
        },
        {
          icon: Zap,
          title: "Live rate comparison across your carriers",
        },
        {
          icon: MapPin,
          title: "One tracking link across your carriers",
        },
      ]}
      integrationsContext="eCommerce"
      caseStudy={getCaseStudiesBySolution("eCommerce")[0] ?? caseStudies[0]}
      faq={[
        {
          question: "Does ITD integrate with my eCommerce platform?",
          answer:
            "Yes. We connect to Shopify, WooCommerce and Magento. Orders flow in and labels print from the setup you already use.",
        },
        {
          question: "Can shoppers choose their delivery at checkout?",
          answer:
            "Yes. You can show a range of speeds and prices at checkout, so shoppers pick what suits them. More choice means fewer abandoned baskets.",
        },
        {
          question: "How much can I save on shipping?",
          answer:
            "Most online sellers come to us paying more than they need to. The saving comes from our buying power across the carriers. Send a recent invoice and we'll show you the numbers.",
        },
        {
          question: "What happens at the next carrier rate rise?",
          answer:
            "Carriers raise rates most years. Because your shipping sits on our volume, your rates rise far less than they would on your own account.",
        },
        {
          question: "Do you handle returns?",
          answer:
            "Yes. Shoppers get a returns portal and pre-paid labels, and each return routes back on the right carrier automatically. Returns stop being the part that eats your margin.",
        },
        {
          question: "How quickly can I get set up?",
          answer:
            "Most sellers are live within a few days. The platform integrations are ready-built, so getting started is a connection we handle, not a project for your team.",
        },
      ]}
      closingCta={{
        headline: "See the rate your orders should ship at",
        subhead: "Let us show you what the same orders would cost on our rates.",
        primary: { label: "Get Quote", href: RATE_CHECKER_URL },
        secondary: {
          label: "Contact Sales",
          href: "/contact?enquiry=ecommerce",
        },
      }}
    />
  );
}
