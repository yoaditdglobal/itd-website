import VerticalPage from "@/components/sections/VerticalPage";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { BadgeCheck, Eye, Plug, Store, Truck } from "lucide-react";

export const metadata = buildMetadata({
  title: "SME shipping software UK, no contracts",
  description:
    "Multi-carrier shipping built for SMEs. Royal Mail, Evri, and DPD from one screen, no monthly minimum, no carrier accounts, no setup call. Live with Shopify or WooCommerce in under 10 minutes.",
  path: "/solutions/small-business",
});

export default function SmallBusinessPage() {
  return (
    <VerticalPage
      gatewayMedia={{
        mp4: "/media/connexx-sme.mp4",
        webm: "/media/connexx-sme.webm",
        poster: "/media/connexx-sme-poster.jpg",
        caption:
          "Connexx setting up an SME account same-day, printing across the UK's major carriers, flagging a delayed parcel, and connecting Shopify, eBay and WooCommerce.",
      }}
      label="SMEs"
      title="Punch above your shipping weight"
      subtitle="You ship on the rates and carrier choice a big retailer gets, without committing to their volume. No minimum and no lock-in, just shipping sized for a smaller operation."
      primaryCta={{ label: "Get Quote", href: RATE_CHECKER_URL }}
      secondaryCta={{
        label: "Contact Sales",
        href: "/contact?enquiry=small-business",
      }}
      heroImage={{
        src: "/solutions/sme-hero.webp",
        alt: "Small-business owner checking a padded mailer at a packing desk surrounded by parcels",
        gradient: "from-accent-light via-white to-accent/15",
        icon: Store,
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "SMEs", path: "/solutions/small-business" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "SME shipping software",
          description:
            "Multi-carrier shipping platform for UK SMEs. Compares Royal Mail, Evri, DPD, Parcelforce, InPost and Amazon Shipping on every order with no monthly minimum and no contract. Connects to Shopify, WooCommerce and Etsy in under 10 minutes.",
          path: "/solutions/small-business",
          serviceType: "SME Multi-Carrier Shipping Software",
          areaServed: ["United Kingdom"],
        }),
      ]}
      pains={[
        {
          num: "01",
          title: "You pay more per parcel just for being small",
          desc: "Carriers save their best rates for big volume. Ship less and you pay closer to list, while bigger sellers undercut you.",
        },
        {
          num: "02",
          title: "One courier, no plan B",
          desc: "Most small businesses run on a single carrier. When it hikes prices or drops the ball, you've no fallback and no leverage.",
        },
        {
          num: "03",
          title: "You're the warehouse and the support desk",
          desc: "There's no ops team to lean on. The hours lost to labels and chasing parcels are hours you're not growing.",
        },
      ]}
      features={[
        {
          icon: Truck,
          title: "The UK's major carriers in one account",
        },
        {
          icon: BadgeCheck,
          title: "No contract, no minimum volume",
        },
        {
          icon: Eye,
          title: "One tracking view, with problem parcels flagged",
        },
        {
          icon: Plug,
          title: "Connects to your store and marketplaces",
        },
      ]}
      integrationsContext="Small Business"
      caseStudy={getCaseStudiesBySolution("Small Business")[0] ?? caseStudies[8]}
      faq={[
        {
          question: "Is there a minimum volume?",
          answer:
            "No. No minimum, and no contract to commit to. You ship what you ship, on our rates.",
        },
        {
          question: "Will I really get better rates than going direct?",
          answer:
            "Yes. You ship on our buying power, so the rate beats what a business your size would get on its own.",
        },
        {
          question: "Can I keep my current courier?",
          answer:
            "Yes. Keep the couriers you trust and add others through us at better rates. Nothing gets ripped out.",
        },
        {
          question: "How long does setup take?",
          answer:
            "A few days. We connect your store, set your rules, and you're away. No developer required.",
        },
        {
          question: "Do I get support, or am I on my own?",
          answer:
            "You get a real person to call when something needs sorting. Handy when you're the whole team.",
        },
        {
          question: "What about returns?",
          answer:
            "Handled. A returns portal and pre-paid labels mean a return doesn't cost you a morning.",
        },
      ]}
      closingCta={{
        headline: "Find out what shipping should cost a business your size",
        subhead:
          "Send a recent invoice and the Parcel Rate Checker shows what the same parcels would cost on our rates. Minutes of your time, that's it.",
        primary: { label: "Get Quote", href: RATE_CHECKER_URL },
        secondary: { label: "Contact Sales", href: "/contact?enquiry=small-business" },
      }}
    />
  );
}
