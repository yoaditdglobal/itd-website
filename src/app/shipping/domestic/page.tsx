import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesByShippingType } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import {
  Route,
  Zap,
  LayoutDashboard,
  RefreshCw,
  ShoppingCart,
  Package,
  Truck,
  Factory,
  Building2,
  Store,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "UK domestic parcel shipping across every carrier",
  description:
    "Compare Royal Mail, DPD, Evri, InPost, DX, Parcelforce, and Amazon Shipping on every UK order. One dashboard, every postcode, including Highlands and Islands.",
  path: "/shipping/domestic",
});

export default function ShippingDomesticPage() {
  return (
    <VerticalPage
      label="Domestic Shipping"
      title="Run all your carriers from one screen."
      subtitle="ITD Global is the single shipping partner for businesses moving parcels across the UK. The country's biggest carriers sit under one account, and each parcel goes with the best-value carrier that can deliver, so the margin stays yours."
      primaryCta={{ label: "Get Quote", href: "#estimator" }}
      heroImage={{
        src: "/shipping/domestic-hero-v2.webp",
        alt: "Warehouse loading bays branded with UK carrier logos — Evri, InPost, DPD, Amazon Shipping",
        aspect: "aspect-[16/9]",
        gradient: "from-accent-light via-white to-accent/15",
        icon: Truck,
      }}
      secondaryCta={{
        label: "Learn More",
        href: "/resources/case-studies/tatti-lashes",
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Shipping", path: "/shipping" },
        { name: "Domestic", path: "/shipping/domestic" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "UK Domestic Parcel Shipping",
          description:
            "Multi-carrier UK domestic parcel shipping platform. Connexx routes orders across Royal Mail, DPD, Evri, InPost, DX, Parcelforce, and Amazon Shipping. Covers Mainland UK, Highlands & Islands, Channel Islands, Northern Ireland, and BFPO.",
          path: "/shipping/domestic",
          serviceType: "UK Domestic Parcel Shipping",
          areaServed: [
            "United Kingdom",
            "England",
            "Scotland",
            "Wales",
            "Northern Ireland",
            "Channel Islands",
          ],
        }),
      ]}
      pains={[
        {
          num: "01",
          title: "The rate you're quoted is never the rate you pay",
          desc: "Carriers advertise a headline price, then bill the extras weeks later: Highlands surcharges, residential levies, re-weighs, address corrections. You priced the order on the quote. The margin leaves on the invoice.",
        },
        {
          num: "02",
          title: "No carrier is the best choice for all your parcels",
          desc: "The right one depends on where a parcel's going and what it weighs. Send it all the same way and you overpay on some and miss the delivery date on others.",
        },
        {
          num: "03",
          title: "A parcel goes missing and somehow it's your problem",
          desc: "Tracking goes quiet, the customer chases you, and the refund comes out of your pocket while the carrier caps the claim and takes weeks to pay. You did everything right and you're still the one apologising.",
        },
      ]}
      audienceAnchors={[
        {
          anchor: "ecommerce",
          headline: "Built for eCommerce",
          summary:
            "Courier rates climb year on year, and the carrier that saves you most shifts from one order to the next. Connect your Shopify or WooCommerce store and each order routes to the best-value carrier the moment it's placed, with labels and returns handled in one click.",
          solutionTag: "eCommerce",
          category: "By business model",
          image: {
            src: "/icp/ecommerce-domestic.webp",
            alt: "Shopper checking out at a UK fashion eCommerce store with a contactless card",
            gradient: "from-accent-light via-white to-bg-secondary",
            icon: ShoppingCart,
          },
          href: "/solutions/ecommerce",
        },
        {
          anchor: "marketplace",
          headline: "Built for Marketplace sellers",
          summary:
            "On a marketplace, one late delivery becomes a defect, and a defect costs you the rating you've spent years building. Amazon, eBay, Etsy, TikTok Shop and Temu orders flow into one dispatch queue with each marketplace's deadline applied, so the carrier that can actually hit it gets the parcel.",
          solutionTag: "Marketplace",
          category: "By business model",
          image: {
            src: "/icp/marketplace-domestic.webp",
            alt: "Hand holding an Amazon Prime parcel on UK doorstep steps",
            gradient: "from-bg-secondary via-white to-accent-light",
            icon: Package,
          },
          href: "/solutions/marketplace-seller",
        },
        {
          anchor: "3pl",
          headline: "Built for 3PLs",
          summary:
            "Single-carrier deals cap your rates and leave nothing to earn on shipping. Set each client's carriers, packaging and routing rules once, onboard new brands in days instead of weeks, and make a margin on the parcels you ship instead of passing the carrier's bill straight through.",
          solutionTag: "3PL",
          category: "By business model",
          image: {
            src: "/icp/3pl-domestic.webp",
            alt: "Deep aisle inside a UK pallet-storage warehouse with high racking on both sides",
            gradient: "from-accent-light via-white to-bg-secondary",
            icon: Truck,
          },
          href: "/solutions/3pl",
        },
        {
          anchor: "b2b",
          headline: "Built for B2B",
          summary:
            "Wholesale and Amazon injection are won or lost on the SLA. ITD routes each consignment to a service that meets your partner's delivery and labelling terms and protects your margin, turning compliance into growth instead of chargebacks.",
          solutionTag: "B2B",
          category: "By business model",
          image: {
            src: "/icp/b2b-domestic.webp",
            alt: "Stacked beverage crates awaiting B2B distribution from a wholesale yard",
            gradient: "from-bg-secondary via-white to-accent-light",
            icon: Factory,
          },
          href: "/solutions/b2b",
        },
        {
          anchor: "enterprise",
          headline: "Built for Enterprise",
          summary:
            "Carrier portals, a legacy WMS, and each new lane turns into an IT project. Run 2,000+ parcels a day the way you've always pictured it: one dashboard across the full parcel journey, carriers and regions added without a build or a binding contract, and the MI reporting your board asks for.",
          solutionTag: "Enterprise",
          category: "By stage",
          image: {
            src: "/icp/enterprise-domestic.webp",
            alt: "Live performance dashboard showing trending lane and SLA metrics on a laptop screen",
            gradient: "from-accent-light via-white to-bg-secondary",
            icon: Building2,
          },
          href: "/solutions/enterprise",
        },
        {
          anchor: "small-business",
          headline: "Built for SMEs",
          summary:
            "No volume means no leverage on rates, and most contracts want a commitment you can't make yet. Compare Royal Mail, Evri and DPD side by side with no minimum and no lock-in, and batch the whole day's labels in one run.",
          solutionTag: "Small Business",
          category: "By stage",
          image: {
            src: "/icp/small-business-domestic.webp",
            alt: "Small-business founder packing orders at a kitchen-table workspace",
            gradient: "from-bg-secondary via-white to-accent-light",
            icon: Store,
          },
          href: "/solutions/small-business",
        },
      ]}
      carrierComparison={{
        title: "UK carrier comparison",
        intro:
          "The seven carriers below cover the vast majority of UK domestic volume. Each one is strong on a specific use case and weak on another. Connexx runs all of them through one rate engine on every order, so the strongest carrier wins the shipment.",
        columns: ["Speed", "Weight", "UK coverage", "Tracking", "Best for"],
        rows: [
          {
            carrier: "Royal Mail",
            logo: "/logos/carriers/royal-mail-icon.png",
            descriptor: "UK national postal — universal coverage",
            speeds: [
              { label: "Special Delivery", tier: "special" },
              { label: "Tracked 24", tier: "express" },
              { label: "Tracked 48", tier: "standard" },
              { label: "1st & 2nd Class", tier: "economy" },
            ],
            weightCeilingKg: 20,
            weightCeilingNote: "2kg letter packet",
            coverage: {
              tier: "full",
              zones: ["Mainland UK", "Highlands", "Islands", "NI", "BFPO"],
            },
            tracking: { live: "live", pod: "signature" },
            bestFor: ["Letters", "Universal coverage", "Small business"],
          },
          {
            carrier: "DPD",
            logo: "/logos/carriers/DPD-LOGO.png",
            descriptor: "Premium parcel network — 1-hour delivery slot",
            speeds: [
              { label: "Pre-9am", tier: "special" },
              { label: "Next Day", tier: "express" },
              { label: "Saturday", tier: "special" },
              { label: "Two Day", tier: "standard" },
            ],
            weightCeilingKg: 30,
            coverage: {
              tier: "mainland-plus",
              zones: ["Mainland UK", "Highlands surcharged", "NI direct"],
            },
            tracking: { live: "live", pod: "photo-signature" },
            bestFor: ["eCommerce", "B2B", "Time-critical"],
          },
          {
            carrier: "Evri",
            logo: "/logos/carriers/evri_logo.png",
            descriptor: "Drop-off network — cost-led parcel delivery",
            speeds: [
              { label: "Next Day", tier: "express" },
              { label: "Standard 2–3 day", tier: "standard" },
              { label: "ParcelShop", tier: "economy" },
            ],
            weightCeilingKg: 15,
            coverage: {
              tier: "mainland-plus",
              zones: ["Mainland UK", "Most of NI", "Residential strength"],
            },
            tracking: { live: "live", pod: "signature" },
            bestFor: ["eCommerce", "Small Business", "Returns"],
          },
          {
            carrier: "InPost",
            logo: "/logos/carriers/inpost-icon.png",
            descriptor: "Residential focus — weekend cover",
            speeds: [
              { label: "Next Day", tier: "express" },
              { label: "48-hour", tier: "standard" },
              { label: "Sunday", tier: "special" },
            ],
            weightCeilingKg: 30,
            coverage: {
              tier: "mainland",
              zones: ["Mainland UK residential", "Highlands variable"],
            },
            tracking: { live: "live", pod: "signature" },
            bestFor: ["Residential bulk", "Marketplace"],
          },
          {
            carrier: "DX",
            descriptor: "B2B specialist — irregular dimensions",
            speeds: [
              { label: "Same Day", tier: "special" },
              { label: "Next Day", tier: "express" },
              { label: "Two-Man", tier: "standard" },
              { label: "Secure", tier: "special" },
            ],
            weightCeilingKg: 30,
            weightCeilingNote: "Irregular dimensions accepted",
            coverage: {
              tier: "mainland",
              zones: ["Mainland UK", "Business postcodes prioritised"],
            },
            tracking: { live: "live", pod: "signature" },
            bestFor: ["B2B", "Enterprise"],
          },
          {
            carrier: "Parcelforce",
            logo: "/logos/carriers/parcel-force.svg",
            descriptor: "Royal Mail Group express network",
            speeds: [
              { label: "Express24", tier: "express" },
              { label: "Express48", tier: "standard" },
              { label: "Worldwide", tier: "special" },
            ],
            weightCeilingKg: 30,
            coverage: {
              tier: "full",
              zones: ["Mainland UK", "Highlands", "Islands", "NI"],
            },
            tracking: { live: "live", pod: "signature" },
            bestFor: ["B2B", "Heavy parcels", "Universal coverage"],
          },
          {
            carrier: "Amazon Shipping",
            logo: "/logos/carriers/amazonshipping_logo.png",
            descriptor: "Amazon's UK logistics network",
            speeds: [
              { label: "Next Day", tier: "express" },
              { label: "Two Day", tier: "standard" },
            ],
            weightCeilingKg: 23,
            coverage: {
              tier: "mainland",
              zones: ["Mainland UK", "Growing footprint"],
            },
            tracking: { live: "live", pod: "photo-signature" },
            bestFor: ["High-volume", "Marketplace"],
          },
        ],
      }}
      features={[
        {
          icon: Route,
          title: "Postcode-aware routing on every order.",
          desc: "The rate engine reads the destination postcode against every carrier's coverage map and surcharge schedule. Highlands & Islands, Channel Islands, Northern Ireland, BFPO, and residential vs business postcodes are all handled in the rules. The right carrier wins the shipment automatically.",
        },
        {
          icon: Zap,
          title: "Live rate comparison across all seven major UK carriers.",
          desc: "On every parcel, Connexx checks Royal Mail, DPD, Evri, InPost, DX, Parcelforce, and Amazon Shipping in milliseconds. The cheapest compliant carrier is selected against your rules for speed, weight, and service tier. Manual overrides are always one click away.",
        },
        {
          icon: LayoutDashboard,
          title: "One dashboard, one label batch, one tracking link.",
          desc: "Every carrier prints from the same screen. Label generation is batched, manifested, and queued to the carrier collection in one run. Customers receive a single branded tracking link regardless of which carrier carried the parcel.",
        },
        {
          icon: RefreshCw,
          title: "ERP and order-management write-back.",
          desc: "Connexx connects to Linnworks, Mintsoft, Veeqo, ShipStation, and Shopify. Tracking numbers, booking confirmations, and PODs flow back into the order record. No CSV imports. No re-keyed data.",
        },
      ]}
      integrations={[
        {
          name: "Royal Mail",
          logo: "/logos/carriers/royal-mail-icon.png",
          description:
            "Universal UK coverage including Highlands, Islands, and BFPO. Tracked 24, Tracked 48, Signed, First and Second Class.",
          href: "/integrations/carriers/royal-mail",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description:
            "1-hour delivery slot for Mainland UK. Next Day, Pre-9, Pre-10:30, Saturday, Sunday options.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "Evri",
          logo: "/logos/carriers/evri_logo.png",
          description:
            "Cost-effective parcel delivery across the UK. Standard 2–3 day, Next Day, ParcelShop drop-off, doorstep collection.",
          href: "/integrations/carriers/evri",
        },
        {
          name: "InPost",
          logo: "/logos/carriers/inpost-icon.png",
          description:
            "UK residential strength including Sunday delivery. Next Day and 48-hour services.",
          href: "/integrations/carriers",
        },
        {
          name: "Parcelforce",
          logo: "/logos/carriers/parcel-force.svg",
          description:
            "Tracked UK parcel delivery to every postcode including Highlands and Islands. Express24, Express48 services.",
          href: "/integrations/carriers/parcelforce",
        },
        {
          name: "Amazon Shipping",
          logo: "/logos/carriers/amazonshipping_logo.png",
          description:
            "Amazon's UK logistics network at competitive volume rates. Next-day and two-day services.",
          href: "/integrations/carriers/amazon-shipping",
        },
        {
          name: "Shopify",
          logo: "/logos/ecommerce/shopify_logo.png",
          description:
            "Direct Shopify connection. Orders flow into Connexx within seconds of checkout.",
          href: "/integrations/ecommerce",
        },
        {
          name: "Linnworks",
          logo: "/logos/erp-wms/linnworks_logo.png",
          description:
            "Multi-channel order management. Domestic orders routed and labelled inside your existing Linnworks workflow.",
          href: "/integrations/erp-wms",
        },
      ]}
      caseStudy={getCaseStudiesByShippingType("Domestic")[0] ?? caseStudies[0]}
      caseStudies={getCaseStudiesByShippingType("Domestic")}
      rateChecker="domestic"
      faq={[
        {
          question: "Does ITD cover the Highlands & Islands and the Channel Islands?",
          answer:
            "Yes. Routing reads the destination postcode and picks a carrier that covers it, including the Highlands and Islands, the Channel Islands, Northern Ireland and BFPO. The area surcharge is priced in before you ship, so you see the real cost up front, not on the invoice weeks later.",
        },
        {
          question: "Which UK carriers can I ship with through ITD?",
          answer:
            "Royal Mail, DPD, Evri, InPost, DX, Parcelforce and Amazon Shipping, with more added over time. They all run from one account, so you can compare services and switch carrier per order without opening another portal.",
        },
        {
          question: "Can I keep my own Royal Mail account?",
          answer:
            "Yes. Bring your own negotiated rates and run them alongside ITD's, or ship entirely on ITD's. The routing compares both and picks the best-value service for the parcel.",
        },
        {
          question: "How do you handle out-of-area surcharges?",
          answer:
            "They're built into the rate at the point of routing. The system knows the Highlands and Islands surcharge, the Channel Islands fuel adjustment, the Northern Ireland fee and residential levies, so the price you see is the price you pay.",
        },
        {
          question: "Do you offer next-day and Saturday delivery?",
          answer:
            "Yes. Next-day, timed and Saturday services are available across the carriers that run them, and routing can prioritise speed or price on each order to match the promise you've made the customer.",
        },
        {
          question: "How quickly can I get set up for UK domestic shipping?",
          answer:
            "Most businesses are live within a few days. The store and ERP integrations are ready-built, so you connect your accounts and routing rules rather than waiting on a development project. 3PLs can onboard a new brand in about two days.",
        },
      ]}
      closingCta={{
        headline: "Unlock the margin hiding in your shipping",
        subhead:
          "The Parcel Rate Checker compares live carriers on the postcodes you ship from and shows you where the margin's leaking. Put your current dims, weight and rate in and the gaps show up straight away.",
        primary: { label: "Check your rates", href: "#estimator" },
        secondary: { label: "Request a tailored review", href: "/contact?enquiry=domestic" },
      }}
    />
  );
}
