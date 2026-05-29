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
    "Compare Royal Mail, DPD, Evri, Yodel, DX, Parcelforce, and Amazon Shipping on every UK order. One dashboard, every postcode, including Highlands and Islands.",
  path: "/shipping/domestic",
});

export default function ShippingDomesticPage() {
  return (
    <VerticalPage
      label="Domestic Shipping"
      title="UK domestic shipping across every carrier, every postcode."
      subtitle="From Mainland UK to the Highlands, the Channel Islands, and Northern Ireland, Connexx routes every parcel through the cheapest compliant carrier in milliseconds. Royal Mail, DPD, Evri, Yodel, DX, Parcelforce, and Amazon Shipping all run from one screen. Your operations team stops switching portals. Your customers stop chasing tracking links."
      primaryCta={{ label: "Run the Domestic Savings Estimator", href: "#estimator" }}
      secondaryCta={{
        label: "Read the Tatti Lashes story (3 min)",
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
            "Multi-carrier UK domestic parcel shipping platform. Connexx routes orders across Royal Mail, DPD, Evri, Yodel, DX, Parcelforce, and Amazon Shipping. Covers Mainland UK, Highlands & Islands, Channel Islands, Northern Ireland, and BFPO.",
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
          title: "Out-of-area surcharges hidden until the invoice arrives",
          desc: "Carriers publish a headline rate. The Highlands & Islands surcharge, the Channel Islands fuel adjustment, the Northern Ireland green-lane fee, the residential delivery levy. Each one shows up on the invoice three weeks later. You priced the shipping wrong at checkout and the margin walks out the door.",
        },
        {
          num: "02",
          title: "Regional carrier variability nobody warned you about",
          desc: "DPD is strong in central England and weak in rural Scotland. Evri is competitive on weight but inconsistent above 10kg. Yodel covers residential addresses cheaply and struggles with business postcodes. Every UK shipper learns these patterns through failed deliveries and angry CS calls. The patterns should be in the rate engine, not in your dispatch supervisor's head.",
        },
        {
          num: "03",
          title: "Multi-carrier portal switching that eats the morning",
          desc: "Royal Mail Click and Drop, DPD Shipping Portal, Evri Business Direct, Parcelforce Worldwide Manager, Yodel Connect, DX Direct, Amazon Shipping Console. Each has a different login, a different label format, and a different way to report a missed collection. The operations team spends three hours a day before they touch a physical parcel.",
        },
      ]}
      audienceAnchors={[
        {
          anchor: "ecommerce",
          headline: "Built for eCommerce",
          summary:
            "Shopify, WooCommerce, and BigCommerce orders route to the cheapest compliant UK carrier the moment a customer checks out. One click prints the label.",
          solutionTag: "eCommerce",
          category: "By business model",
          image: { gradient: "from-accent-light via-white to-bg-secondary", icon: ShoppingCart },
          href: "/solutions/ecommerce",
        },
        {
          anchor: "marketplace",
          headline: "Built for Marketplace sellers",
          summary:
            "Amazon, eBay, Etsy, TikTok Shop, and Temu orders flow into a single dispatch queue with SLA deadlines applied. Penalty fees go to zero.",
          solutionTag: "Marketplace",
          category: "By business model",
          image: { gradient: "from-bg-secondary via-white to-accent-light", icon: Package },
          href: "/solutions/marketplace-seller",
        },
        {
          anchor: "3pl",
          headline: "Built for 3PLs",
          summary:
            "Configure each client's carriers, packaging, and routing rules once. Onboard new brands in two days, not two weeks.",
          solutionTag: "3PL",
          category: "By business model",
          image: { gradient: "from-accent-light via-white to-bg-secondary", icon: Truck },
          href: "/solutions/3pl",
        },
        {
          anchor: "b2b",
          headline: "Built for B2B",
          summary:
            "Pallet and parcel dispatch runs straight from your ERP — SAP, Sage, NetSuite, or Dynamics. Carrier booked the moment the order is confirmed.",
          solutionTag: "B2B",
          category: "By business model",
          image: { gradient: "from-bg-secondary via-white to-accent-light", icon: Factory },
          href: "/solutions/b2b",
        },
        {
          anchor: "enterprise",
          headline: "Built for Enterprise",
          summary:
            "Consolidate 6 to 12 carrier portals and a legacy TMS into one view. 5,000+ parcels a day across every UK lane, no IT project per market.",
          solutionTag: "Enterprise",
          category: "By stage",
          image: { gradient: "from-accent-light via-white to-bg-secondary", icon: Building2 },
          href: "/solutions/enterprise",
        },
        {
          anchor: "small-business",
          headline: "Built for Small Business",
          summary:
            "No minimum volume, no IT setup, no contract lock-in. Compare Royal Mail, Evri, and DPD side by side and batch labels in one print run.",
          solutionTag: "Small Business",
          category: "By stage",
          image: { gradient: "from-bg-secondary via-white to-accent-light", icon: Store },
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
            logo: "/logos/carriers/Royal-Mail-Logo.png",
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
            carrier: "Yodel",
            logo: "/logos/carriers/yodel_logo.avif",
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
          desc: "On every parcel, Connexx checks Royal Mail, DPD, Evri, Yodel, DX, Parcelforce, and Amazon Shipping in milliseconds. The cheapest compliant carrier is selected against your rules for speed, weight, and service tier. Manual overrides are always one click away.",
        },
        {
          icon: LayoutDashboard,
          title: "One dashboard, one label batch, one tracking link.",
          desc: "Every carrier prints from the same screen. Label generation is batched, manifested, and queued to the carrier collection in one run. Customers receive a single branded tracking link regardless of which carrier carried the parcel.",
        },
        {
          icon: RefreshCw,
          title: "ERP and order-management write-back.",
          desc: "Connexx connects to Linnworks, Mintsoft, Veeqo, ShipStation, Shopify, SAP, Sage, and Microsoft Dynamics. Tracking numbers, booking confirmations, and PODs flow back into the order record. No CSV imports. No re-keyed data.",
        },
      ]}
      integrations={[
        {
          name: "Royal Mail",
          logo: "/logos/carriers/Royal-Mail-Logo.png",
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
          name: "Yodel",
          logo: "/logos/carriers/yodel_logo.avif",
          description:
            "UK residential strength including Sunday delivery. Next Day and 48-hour services.",
          href: "/integrations",
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
          question: "Does Connexx cover Highlands & Islands and the Channel Islands?",
          answer:
            "Yes, every UK postcode. Connexx routes Highlands & Islands postcodes (AB, IV, KW, PA, PH, HS, ZE) through Royal Mail, Parcelforce, DPD, and any other carrier that holds coverage for that postcode. Channel Islands (JE, GY) are treated as third-country shipments with CN22 or commercial invoice generated automatically. Northern Ireland (BT) is routed under Windsor Framework rules. No manual postcode lookups required.",
        },
        {
          question: "Which UK carriers does ITD Global integrate with?",
          answer:
            "Seven major UK carriers: Royal Mail, DPD, Evri, Yodel, DX, Parcelforce, and Amazon Shipping. The Connexx rate engine compares all seven on every order in milliseconds. You bring your own carrier accounts and rate cards, or use ITD's negotiated rates if your contracts are weak. Additional regional carriers can be added on request through the integrations team.",
        },
        {
          question: "Can I use my own Royal Mail account?",
          answer:
            "Yes. Connexx supports your existing Royal Mail OBA (Online Business Account) or Click and Drop account directly. Tracked 24, Tracked 48, Signed, Special Delivery, First Class, Second Class, and standard letter services all flow through Connexx with your own negotiated rates. If your Royal Mail rates are weak, ITD's aggregated volume across thousands of UK shippers gets you better pricing.",
        },
        {
          question: "How do you handle out-of-area surcharges?",
          answer:
            "Surcharges are applied in the rate engine on every order, not on the invoice three weeks later. Connexx reads each carrier's surcharge schedule (Highlands & Islands, Channel Islands, residential, oversized, fuel) against the destination postcode and shows the all-in cost at the point of dispatch. You price the shipping correctly at checkout and the margin stays where it belongs.",
        },
        {
          question: "Do you offer Saturday delivery?",
          answer:
            "Yes, through DPD Saturday, Yodel Sunday, and Royal Mail Special Delivery (Saturday). Connexx makes weekend service options visible alongside weekday rates in the same comparison. Choose the carrier and tier per order, or set a routing rule (for example, all orders placed Friday after 2pm route to DPD Saturday). Weekend coverage varies by postcode and Connexx flags the postcodes where it does not apply.",
        },
        {
          question: "How quickly can I get set up for UK domestic shipping?",
          answer:
            "Most UK domestic shippers are live on Connexx within two business days. Setup includes carrier account linking, label printer configuration, rule setup for your service tiers and surcharge handling, and a live label test before you go live. Shopify and WooCommerce stores connect via the official app. Linnworks, Mintsoft, and Veeqo setups take three to five days.",
        },
      ]}
      closingCta={{
        headline: "See the saving on your top five UK lanes.",
        subhead:
          "Two minutes with the Domestic Savings Estimator. We compare every active UK carrier on the postcodes you ship to most. No commitment, no card.",
        primary: { label: "Run the Domestic Savings Estimator", href: "#estimator" },
        secondary: { label: "Request a tailored review", href: "/contact?enquiry=domestic" },
      }}
    />
  );
}
