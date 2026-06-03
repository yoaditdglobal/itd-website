import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Zap, LayoutDashboard, RefreshCw, ShieldCheck, ShoppingCart } from "lucide-react";

export const metadata = buildMetadata({
  title: "eCommerce shipping software for UK retailers",
  description:
    "Cut shipping costs by routing every order through the cheapest compliant carrier. Connexx connects Shopify, WooCommerce, and 12+ carriers from one dashboard.",
  path: "/solutions/ecommerce",
});

export default function EcommercePage() {
  return (
    <VerticalPage
      label="eCommerce"
      title="Give shoppers more delivery choice while you grow your margins."
      subtitle="Our multi-carrier solution fits into your workflow. We integrate with your eCommerce platform, giving you more delivery options to offer shoppers and lower rates to ship orders."
      primaryCta={{ label: "Get Quote", href: "/shipping/domestic#estimator" }}
      secondaryCta={{
        label: "Explore",
        href: "/resources/case-studies/freedom-fire",
      }}
      heroImage={{
        src: "/solutions/ecommerce-hero.webp",
        alt: "Online shopper at a keyboard with a Visa card — eCommerce checkout",
        gradient: "from-accent-light via-white to-accent/15",
        icon: ShoppingCart,
      }}
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
          icon: Zap,
          title: "Automated rate comparison.",
          desc: "On every order, Connexx checks live rates across every active UK and international carrier. The cheapest compliant option is selected automatically. You set the rules. The platform does the comparison in milliseconds.",
        },
        {
          icon: LayoutDashboard,
          title: "One dashboard for every dispatch.",
          desc: "Royal Mail, DPD, Evri, DHL, FedEx, UPS, Amazon Shipping, Parcel Force, Yodel, and DX all run from a single screen. Label generation, manifesting, tracking, and exception handling are unified. No tab-switching, no copy-paste between portals.",
        },
        {
          icon: RefreshCw,
          title: "Returns that don't eat the margin.",
          desc: "Customer-facing returns portal. Pre-paid return labels generated on demand. Carrier rules applied automatically. Returns logistics stops being the afterthought that costs you 8% of revenue.",
        },
        {
          icon: ShieldCheck,
          title: "Customs handled before the parcel leaves.",
          desc: "HS codes pulled from your product catalogue. EORI and IOSS applied to the right shipments automatically. Country-specific paperwork generated on the spot. Customs holds drop because the documentation was right before the carrier scanned the label.",
        },
      ]}
      integrations={[
        {
          name: "Shopify",
          logo: "/logos/ecommerce/shopify_logo.png",
          description: "Direct connection. Orders flow in within seconds of customer checkout.",
          href: "/integrations/ecommerce",
        },
        {
          name: "WooCommerce",
          logo: "/logos/erp-wms/woocommerce_logo.svg",
          description: "WordPress plugin. Multi-carrier shipping inside your WP admin.",
          href: "/integrations/ecommerce",
        },
        {
          name: "Magento",
          description: "Adobe Commerce / Magento 2 integration with multi-carrier routing rules.",
          href: "/integrations/ecommerce",
        },
        {
          name: "BigCommerce",
          description: "SaaS storefronts route every order through Connexx for rate comparison.",
          href: "/integrations/ecommerce",
        },
        {
          name: "Royal Mail",
          logo: "/logos/carriers/Royal-Mail-Logo.png",
          description: "Tracked 24, Tracked 48, Signed, First Class, Second Class.",
          href: "/integrations/carriers/royal-mail",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description: "Next Day, Two Day, Saturday delivery across the UK and EU.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "Evri",
          logo: "/logos/carriers/evri_logo.png",
          description: "ParcelShop drop-off and standard parcel delivery across the UK.",
          href: "/integrations/carriers/evri",
        },
        {
          name: "DHL Express",
          logo: "/logos/carriers/dhl_logo.webp",
          description: "International express delivery to 220+ countries.",
          href: "/integrations/carriers/dhl",
        },
      ]}
      caseStudy={getCaseStudiesBySolution("eCommerce")[0] ?? caseStudies[0]}
      faq={[
        {
          question: "Does ITD integrate with my eCommerce platform?",
          answer:
            "Yes. We connect to Shopify, WooCommerce, Magento and BigCommerce. Orders flow in and labels print from the setup you already use.",
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
        headline: "See the rate your orders should ship at.",
        subhead: "Let us show you what the same orders would cost on our rates.",
        primary: { label: "Get Quote", href: "/shipping/domestic#estimator" },
        secondary: {
          label: "Explore",
          href: "/resources/case-studies/freedom-fire",
        },
      }}
    />
  );
}
