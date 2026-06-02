import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Zap, LayoutDashboard, RefreshCw, ShieldCheck } from "lucide-react";

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
      title="Multi-carrier shipping that pays you back on every order."
      subtitle="Online retailers lose margin on dispatch decisions made in a hurry. Connexx compares every UK and international carrier on every order, picks the cheapest compliant option, and prints the label in one click. Shopify, WooCommerce, and BigCommerce orders flow in automatically. Your operations team stops switching between carrier portals."
      primaryCta={{ label: "Get Quote", href: "/shipping/domestic#estimator" }}
      secondaryCta={{
        label: "Learn More",
        href: "/resources/case-studies/tatti-lashes",
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
          title: "Carrier portals eating the day",
          desc: "Royal Mail, DPD, Evri, and DHL each have their own portal, label format, and tracking interface. The operations team spends three hours a day switching between them. The numbers in the case studies on this site started here.",
        },
        {
          num: "02",
          title: "Margin leaks on every cross-border order",
          desc: "A bad carrier choice on a single international parcel can wipe out the margin on twelve domestic ones. Without real-time rate comparison, the cheapest compliant carrier is whichever one the team remembered to use last.",
        },
        {
          num: "03",
          title: "WISMO tickets the CS team can't answer",
          desc: "\"Where is my order\" tickets need access to four tracking systems. By the time a Customer Service agent finds the right one, the customer has emailed twice. CSAT drops, ticket volume rises, the loop never closes.",
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
          question: "Does Connexx integrate with Shopify?",
          answer:
            "Yes. Connexx connects to Shopify in under 10 minutes through the official app. Orders flow into the multi-carrier dashboard the moment a customer checks out. Each order is rate-checked across every active UK and international carrier, the cheapest compliant option is selected, and the label is generated in one click. No CSV exports, no manual entry.",
        },
        {
          question: "Can I use my own negotiated carrier rates?",
          answer:
            "Yes. Connexx supports your existing carrier accounts and rate cards across Royal Mail, DPD, Evri, DHL, FedEx, UPS, and others. If your contracts are weak, ITD's volume across thousands of UK shippers unlocks better rates. You keep the relationship, we improve the price.",
        },
        {
          question: "How does Connexx choose which carrier to use?",
          answer:
            "On every order, Connexx checks live rates across every carrier you've connected. The cheapest carrier that meets your rules (speed, weight, destination, service type) is selected automatically. You can override rules per product, per market, or per customer segment. Manual overrides are always available.",
        },
        {
          question: "What about returns?",
          answer:
            "Connexx includes a branded returns portal for your customers. Returns are routed through the right carrier automatically. Pre-paid labels are generated on demand. Returns data flows back into your eCommerce platform for refund processing. Standard for every eCommerce subscription.",
        },
        {
          question: "Does it work for international orders?",
          answer:
            "Yes. Connexx handles HS code lookup, EORI numbers, IOSS for EU under €150, and country-specific customs paperwork automatically. International orders go through the same dashboard as domestic. Your operations team doesn't switch tools for cross-border shipping.",
        },
        {
          question: "How quickly can I get set up?",
          answer:
            "Most Shopify and WooCommerce stores are live on Connexx within two business days. ERP-connected setups (Linnworks, Mintsoft, Veeqo, ShipStation) take three to five days depending on the integration scope. Onboarding includes carrier account linking, rule configuration, and a label-printing test before you go live.",
        },
      ]}
      closingCta={{
        headline: "Stop guessing which carrier wins.",
        subhead: "Two minutes with the savings estimator. No commitment, no card.",
        primary: { label: "Get Quote", href: "/shipping/domestic#estimator" },
        secondary: { label: "Contact Us", href: "/contact?enquiry=ecommerce" },
      }}
    />
  );
}
