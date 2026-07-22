import VerticalPage from "@/components/sections/VerticalPage";
import { RATE_CHECKER_URL } from "@/lib/site-config";
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
      gatewayMedia={{
        mp4: "/media/connexx-domestic-v2.mp4",
        webm: "/media/connexx-domestic-v2.webm",
        poster: "/media/connexx-domestic-poster-v2.jpg",
        caption:
          "Connexx routing a Highlands parcel to the cheapest carrier, dispatching the batch, and writing tracking back to Linnworks, Shopify and more.",
      }}
      label="Domestic Shipping"
      title="Run all your carriers from one screen"
      subtitle="ITD Global is the single shipping partner for businesses moving parcels across the UK. The country's biggest carriers sit under one account, and each parcel goes with the best-value carrier that can deliver, so the margin stays yours."
      primaryCta={{ label: "Get Quote", href: RATE_CHECKER_URL }}
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
        title: "UK carrier network",
        columns: ["Speed", "Max weight", "UK coverage", "Tracking", "Best for"],
        rows: [
          {
            carrier: "Royal Mail",
            logo: "/logos/carriers/royal-mail-icon.png",
            descriptor: "UK's universal postal service",
            speeds: [
              { label: "Special Delivery by 9am / 1pm", tier: "special" },
              { label: "Tracked 24", tier: "express" },
              { label: "Tracked 48", tier: "standard" },
              { label: "Signed For, 1st/2nd Class", tier: "economy" },
            ],
            weightCeilingKg: 20,
            weightCeilingNote: "2kg letter packets",
            coverage: {
              tier: "full",
              zones: [
                "Mainland",
                "Highlands",
                "Islands",
                "Northern Ireland",
                "BFPO",
                "no surcharge",
              ],
            },
            tracking: {
              live: "live",
              pod: "photo-signature",
              podLabel: "Photo on delivery",
              details: ["Signature options"],
            },
            bestFor: ["Universal", "Letters", "Timed delivery"],
          },
          {
            carrier: "DPD",
            logo: "/logos/carriers/DPD-LOGO.png",
            descriptor: "Premium parcel network, precise delivery slots",
            speeds: [
              { label: "Predict (1-hour slot)", tier: "special" },
              { label: "Next Day", tier: "express" },
              { label: "Saturday", tier: "special" },
              { label: "Sunday", tier: "special" },
            ],
            weightCeilingKg: 30,
            coverage: {
              tier: "mainland-plus",
              zones: ["Highlands surcharged", "Northern Ireland via direct network"],
            },
            tracking: {
              live: "live",
              liveLabel: "Follow My Parcel",
              pod: "photo-signature",
            },
            bestFor: ["eCommerce", "B2B", "Delivery slots"],
          },
          {
            carrier: "Evri",
            logo: "/logos/carriers/evri_logo.png",
            descriptor: "Cost-led drop-off and locker network",
            speeds: [
              { label: "Next Day (drop off by noon)", tier: "express" },
              { label: "Standard (2–4 days)", tier: "standard" },
              { label: "Weekend delivery", tier: "special" },
            ],
            weightCeilingKg: 15,
            coverage: {
              tier: "mainland-plus",
              zones: ["Most of Northern Ireland", "9,000+ ParcelShops"],
            },
            tracking: {
              live: "live",
              pod: "signature",
              podLabel: "Digital signature option",
              details: ["1-hour text window"],
            },
            bestFor: ["eCommerce", "Returns", "Best value"],
          },
          {
            carrier: "InPost",
            logo: "/logos/carriers/inpost-icon.png",
            descriptor: "Locker-first, out-of-home network",
            speeds: [
              { label: "Locker/shop in 3 working days", tier: "standard" },
              { label: "Home delivery in 4 working days", tier: "economy" },
            ],
            weightCeilingKg: 15,
            coverage: {
              tier: "mainland",
              zones: ["15,000+ lockers, open 24/7"],
            },
            tracking: {
              live: "live",
              pod: "none",
              details: ["Locker QR code / PIN"],
            },
            bestFor: ["Out-of-home", "Marketplace", "Residential"],
          },
          {
            carrier: "DHL Parcel",
            logo: "/logos/carriers/dhlparcel_logo.svg",
            descriptor: "DHL's UK eCommerce delivery network",
            speeds: [
              { label: "Next Day (mainland)", tier: "express" },
              { label: "1–3 days (Highlands, Islands, NI)", tier: "standard" },
              { label: "Saturday available", tier: "special" },
            ],
            weightCeilingKg: 25,
            coverage: {
              tier: "mainland-plus",
              label: "Mainland next day",
              zones: [
                "Highlands, Islands, NI on extended service",
                "remote surcharge",
              ],
            },
            tracking: {
              live: "live",
              pod: "none",
              details: ["1-hour collection/delivery window"],
            },
            bestFor: ["Drop-off", "ServicePoints"],
          },
          {
            carrier: "Amazon Shipping",
            logo: "/logos/carriers/amazonshipping_logo.png",
            descriptor: "Amazon's UK logistics network",
            speeds: [
              { label: "Next Day", tier: "express" },
              { label: "Two Day", tier: "standard" },
              { label: "Same Day (80+ cities)", tier: "special" },
            ],
            weightCeilingKg: 23,
            coverage: {
              tier: "mainland",
              label: "Mainland Great Britain",
              zones: ["7-day-a-week delivery"],
            },
            tracking: {
              live: "live",
              pod: "photo-signature",
              podLabel: "Photo on delivery",
              details: ["SMS/email notifications"],
            },
            bestFor: ["High volume", "Marketplace"],
          },
          {
            carrier: "APC",
            logo: "/logos/carriers/apc_logo.png",
            descriptor: "Independent SME delivery network",
            speeds: [
              { label: "Standard Next Day", tier: "express" },
              { label: "Timed (10:30am / 12pm)", tier: "special" },
              { label: "Saturday timed", tier: "special" },
            ],
            weightCeilingKg: 30,
            weightCeilingNote: "per item; lightweight options from 1kg",
            coverage: {
              tier: "full",
              label: "UK-wide",
              zones: [
                "90+ member depots",
                "Highlands, Islands, NI surcharged, +1 day",
              ],
            },
            tracking: {
              live: "live",
              liveLabel: "Live tracking (APC Choice)",
              pod: "photo-signature",
              podLabel: "Photo + GPS proof",
              details: ["2-hour delivery window"],
            },
            bestFor: ["SMEs", "Fragile", "Liquids", "Security"],
          },
          {
            carrier: "FedEx",
            logo: "/logos/carriers/fedex-icon.png",
            descriptor: "Global express network, UK domestic",
            speeds: [
              { label: "First (9 / 9:30 / 10am next day)", tier: "special" },
              { label: "Priority Express (noon next day)", tier: "express" },
              { label: "Priority (end of day next day)", tier: "express" },
              { label: "Economy (2–3 days)", tier: "standard" },
            ],
            weightCeilingKg: 68,
            weightCeilingNote: "Freight above 68kg",
            coverage: {
              tier: "full",
              label: "UK-wide",
              zones: ["Islands and rural postcodes add a day"],
            },
            tracking: {
              live: "live",
              liveLabel: "Live tracking (FedEx Insight)",
              pod: "none",
              details: ["Delivery notifications"],
            },
            bestFor: ["Heavy parcels", "Timed B2B", "International"],
          },
          {
            carrier: "UPS",
            logo: "/logos/carriers/ups_logo.png",
            descriptor: "Global network, UK domestic",
            speeds: [
              { label: "Express Plus (9am next day)", tier: "special" },
              { label: "Express (10:30am next day)", tier: "express" },
              { label: "Express Saver (noon next day)", tier: "express" },
              { label: "Standard (1–5 days)", tier: "standard" },
            ],
            weightCeilingKg: 70,
            weightCeilingNote: "Freight above 70kg",
            coverage: {
              tier: "full",
              label: "UK-wide",
              zones: [],
            },
            tracking: {
              live: "live",
              pod: "none",
              details: ["Delivery notification", "Collect on Delivery option"],
            },
            bestFor: ["Heavy parcels", "B2B", "Global reach"],
          },
        ],
      }}
      features={[
        {
          icon: Route,
          title: "Postcode-aware routing on every order",
        },
        {
          icon: Zap,
          title: "Live rate comparison across all seven major UK carriers",
        },
        {
          icon: LayoutDashboard,
          title: "One dashboard, one label batch, one tracking link",
        },
        {
          icon: RefreshCw,
          title: "ERP and order-management write-back",
        },
      ]}
      integrationsContext="Domestic"
      caseStudy={getCaseStudiesByShippingType("Domestic")[0] ?? caseStudies[0]}
      caseStudies={getCaseStudiesByShippingType("Domestic")}
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
        primary: { label: "Check your rates", href: RATE_CHECKER_URL },
        secondary: { label: "Request a tailored review", href: "/contact?enquiry=domestic" },
      }}
    />
  );
}
