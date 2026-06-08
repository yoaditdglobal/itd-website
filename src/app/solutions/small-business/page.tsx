import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Zap, Printer, Eye, CreditCard, Store } from "lucide-react";

export const metadata = buildMetadata({
  title: "SME shipping software UK, no contracts",
  description:
    "Multi-carrier shipping built for SMEs. Royal Mail, Evri, and DPD from one screen, no monthly minimum, no carrier accounts, no setup call. Live with Shopify or WooCommerce in under 10 minutes.",
  path: "/solutions/small-business",
});

export default function SmallBusinessPage() {
  return (
    <VerticalPage
      label="SMEs"
      title="Punch above your shipping weight."
      subtitle="You ship on the rates and carrier choice a big retailer gets, without committing to their volume. No minimum and no lock-in, just shipping sized for a smaller operation."
      primaryCta={{ label: "Get Quote", href: "/shipping/domestic#estimator" }}
      secondaryCta={{
        label: "Explore",
        href: "/resources/case-studies",
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
            "Multi-carrier shipping platform for UK SMEs. Compares Royal Mail, Evri, DPD, Parcelforce, Yodel and Amazon Shipping on every order with no monthly minimum and no contract. Connects to Shopify, WooCommerce and Etsy in under 10 minutes.",
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
          icon: Zap,
          title: "Rate comparison across Royal Mail, Evri, DPD, and Parcelforce.",
          desc: "On every order, Connexx checks live rates and picks the cheapest carrier that meets your rules. Weight, postcode, service speed, and Highlands & Islands surcharges are factored in automatically. You see the saving per parcel before the label prints.",
        },
        {
          icon: Printer,
          title: "Batch label printing in one click.",
          desc: "Connect Shopify or WooCommerce, choose the orders, and print 60 labels in one go. No carrier portal logins. No address paste. Branded packing slips and customs forms generate alongside the labels for shipments that need them.",
        },
        {
          icon: Eye,
          title: "One tracking page for every parcel.",
          desc: "Customers get a branded tracking page with proactive email and SMS updates. Where's my order emails drop because the customer already knows. When you do need to look something up, every parcel lives in one screen, not four carrier websites.",
        },
        {
          icon: CreditCard,
          title: "No monthly minimum, no contract, no sales call.",
          desc: "Sign up online and ship the same day. Pay per label at Connexx's negotiated Royal Mail, Evri, DPD, Parcelforce, and Yodel rates, which are usually lower than the rates you'd get opening accounts directly. Cancel any time.",
        },
      ]}
      integrations={[
        {
          name: "Shopify",
          logo: "/logos/ecommerce/shopify_logo.png",
          description: "Install from the Shopify App Store. Orders flow in within seconds.",
          href: "/integrations/ecommerce",
        },
        {
          name: "WooCommerce",
          logo: "/logos/erp-wms/woocommerce_logo.svg",
          description: "WordPress plugin. Multi-carrier shipping inside your WP admin.",
          href: "/integrations/ecommerce",
        },
        {
          name: "Royal Mail",
          logo: "/logos/carriers/Royal-Mail-Logo.png",
          description: "Tracked 24, Tracked 48, Signed, First Class, Second Class on Connexx negotiated rates.",
          href: "/integrations/carriers/royal-mail",
        },
        {
          name: "Evri",
          logo: "/logos/carriers/evri_logo.png",
          description: "Standard, Next Day, and ParcelShop drop-off for sub-2kg parcels.",
          href: "/integrations/carriers/evri",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description: "Next Day and Saturday delivery for parcels over 5kg.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "Yodel",
          logo: "/logos/carriers/yodel_logo.avif",
          description: "B2C 48 hour delivery across Mainland UK.",
          href: "/integrations",
        },
        {
          name: "Amazon Shipping",
          logo: "/logos/carriers/amazonshipping_logo.png",
          description: "Amazon-eligible carrier for Prime sellers.",
          href: "/integrations",
        },
        {
          name: "Parcel Force",
          logo: "/logos/carriers/parcel-force.svg",
          description: "Express24 and Express48 for heavier or signed-for parcels.",
          href: "/integrations",
        },
      ]}
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
        headline: "Find out what shipping should cost a business your size.",
        subhead:
          "Send a recent invoice and the Parcel Rate Checker shows what the same parcels would cost on our rates. Minutes of your time, that's it.",
        primary: { label: "Get Quote", href: "/shipping/domestic#estimator" },
        secondary: { label: "Explore", href: "/resources/case-studies" },
      }}
    />
  );
}
