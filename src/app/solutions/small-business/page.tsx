import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Zap, Printer, Eye, CreditCard } from "lucide-react";

export const metadata = buildMetadata({
  title: "Shipping software for small business UK, no contracts",
  description:
    "Print Royal Mail, Evri, and DPD labels from one screen. No monthly minimum, no carrier accounts, no setup call. Live with Shopify or WooCommerce in under 10 minutes.",
  path: "/solutions/small-business",
});

export default function SmallBusinessPage() {
  return (
    <VerticalPage
      label="Small Business"
      title="Cheaper parcel shipping for UK small businesses, no contracts."
      subtitle="You ship 40 to 200 parcels a day from a spare room, a small unit, or a shared warehouse. You spend two hours every morning logging into Royal Mail Click and Drop. Connexx compares Royal Mail, Evri, DPD, and Parcelforce on every order, prints labels in one batch, and pulls in Shopify and WooCommerce orders automatically."
      primaryCta={{ label: "Get Quote", href: "/shipping/domestic#estimator" }}
      secondaryCta={{
        label: "Learn More",
        href: "/shipping/domestic/courier-comparison",
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "Small Business", path: "/solutions/small-business" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "Small business shipping software",
          description:
            "Multi-carrier shipping platform for UK small businesses. Compares Royal Mail, Evri, DPD, Parcelforce, Yodel and Amazon Shipping on every order with no monthly minimum and no contract. Connects to Shopify, WooCommerce and Etsy in under 10 minutes.",
          path: "/solutions/small-business",
          serviceType: "Small Business Multi-Carrier Shipping Software",
          areaServed: ["United Kingdom"],
        }),
      ]}
      pains={[
        {
          num: "01",
          title: "Two hours every morning printing labels one at a time",
          desc: "At 60 orders a day, the Click and Drop workflow eats the first two hours of the working morning. Address paste, service choice, label print, repeat. You start the real work after 10am, when you should have started at 8.",
        },
        {
          num: "02",
          title: "You know you are not on the cheapest carrier",
          desc: "Royal Mail rack rates are expensive. Evri is cheaper but not always right. Without a side-by-side rate comparison on each shipment, you pick whichever carrier you used last, and that decision costs money on every order.",
        },
        {
          num: "03",
          title: "Customer emails about delivery eat the rest of the day",
          desc: "Where's my order emails arrive through email, Instagram DM, and the website chat. Each one means a carrier website login, a tracking search, and a copy-paste back to the customer. Ten queries a day is half an hour gone.",
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
          question: "What is the cheapest way to ship parcels for a UK small business?",
          answer:
            "For UK small businesses, the cheapest carrier depends on weight and destination. Evri is usually cheapest for sub-2kg parcels to Mainland UK. Royal Mail Tracked 48 wins for letter-box items and Highlands & Islands. DPD beats both for next-day parcels over 5kg. Connexx compares all of them in real time and prints the cheapest compliant label on every order.",
        },
        {
          question: "Do I need a separate account with Royal Mail, Evri, and DPD?",
          answer:
            "No. Connexx lets you ship through Royal Mail, Evri, DPD, Parcelforce, Yodel, and Amazon Shipping from one account. You do not sign individual contracts and you do not manage separate portals. You inherit Connexx's negotiated rates, which are usually lower than the rates you would get opening accounts directly.",
        },
        {
          question: "Is there a minimum monthly volume to use Connexx?",
          answer:
            "No. There is no monthly minimum, no setup fee, and no contract. Pay per label at Connexx's published rate. Ship 20 parcels a month or 2,000, the per-parcel price is the same. Sign up online, connect Shopify or WooCommerce, and ship the same day. No sales call required.",
        },
        {
          question: "How long does it take to set up Connexx with Shopify?",
          answer:
            "Under 10 minutes. Install the Connexx app from the Shopify App Store, authorise the connection, choose which carriers to enable (Royal Mail, Evri, DPD, Parcelforce, Yodel, Amazon Shipping), and orders start flowing automatically. Labels print one-click, tracking writes back to Shopify, and the customer gets a branded tracking page.",
        },
        {
          question: "Can I print labels in batches?",
          answer:
            "Yes. Select 60 orders and print 60 labels in one batch. Connexx generates each label with the cheapest compliant carrier per order based on weight, postcode, and the rules you set once. Branded packing slips print alongside the labels. The workflow is built for a one-person operation packing from a kitchen or a small unit.",
        },
        {
          question: "How do I handle returns?",
          answer:
            "Connexx includes a customer-facing returns portal in every subscription. Customers request a return online, choose a drop-off point (Royal Mail Post Office, Evri ParcelShop, or InPost locker), and a pre-paid label is generated. Returns data feeds back into Shopify or WooCommerce for refund processing. No phone calls, no manual label generation.",
        },
      ]}
      closingCta={{
        headline: "Get back two hours of every working morning.",
        subhead:
          "Run the Domestic Savings Estimator in two minutes. See your per-parcel saving before you sign up.",
        primary: { label: "Get Quote", href: "/shipping/domestic#estimator" },
        secondary: { label: "Sign Up", href: "/signup?plan=small-business" },
      }}
    />
  );
}
