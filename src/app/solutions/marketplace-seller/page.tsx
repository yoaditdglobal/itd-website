import VerticalPage from "@/components/sections/VerticalPage";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { ClipboardList, LayoutGrid, RefreshCw, Store, Zap } from "lucide-react";

export const metadata = buildMetadata({
  title: "Amazon and eBay shipping software for UK marketplace sellers",
  description:
    "Cut Amazon late shipment penalties to zero. One dispatch queue for Amazon, eBay, Etsy, and TikTok Shop, with SLA-aware carrier routing for Royal Mail, Evri, DPD, and Amazon Shipping.",
  path: "/solutions/marketplace-seller",
});

export default function MarketplaceSellerPage() {
  return (
    <VerticalPage
      label="Marketplace Seller"
      title="Protect your marketplace SLAs and your margin"
      subtitle="When a carrier misses the promise, the penalty lands on you. A refund off your margin and a late mark on your account. We match each order to a Prime-ready carrier, with the rates and support to grow your channel."
      primaryCta={{ label: "Get Quote", href: RATE_CHECKER_URL }}
      secondaryCta={{ label: "Explore", href: "/resources/case-studies/west-ham-united" }}
      heroImage={{
        src: "/solutions/marketplace-seller-hero.webp",
        alt: "Shopper browsing a marketplace app on a phone — local warehouse listings",
        gradient: "from-accent-light via-white to-accent/15",
        icon: Store,
      }}
      pains={[
        {
          num: "01",
          title: "A late parcel becomes your penalty",
          desc: "When the carrier runs late, the refund and the account mark both land on you. The slip was often never yours to control.",
        },
        {
          num: "02",
          title: "Each marketplace runs its own clock",
          desc: "Different cut-offs, different speed promises, weekend dispatch to keep up. Miss one and the rating that wins you sales takes the hit.",
        },
        {
          num: "03",
          title: "Your rating rides on things you don't fully control",
          desc: "Marketplaces grade you on tracking and on-time delivery, and a missed scan or a slow lane drags the score down. One bad run and you're close to suspension.",
        },
      ]}
      features={[
        {
          icon: LayoutGrid,
          title: "Your marketplaces connected in one place",
        },
        {
          icon: Zap,
          title: "Carrier selection that respects each marketplace's delivery promise",
        },
        {
          icon: RefreshCw,
          title: "Tracking pushed back to each marketplace automatically",
        },
        {
          icon: ClipboardList,
          title: "Exceptions flagged early to protect your seller metrics",
        },
      ]}
      integrations={[
        {
          name: "Amazon",
          logo: "/logos/marketplaces/amazon-icon.webp",
          description: "Amazon Seller Central UK, DE, FR, IT, ES, and NL with Buy Shipping support.",
          href: "/integrations/marketplaces",
        },
        {
          name: "eBay",
          logo: "/logos/marketplaces/ebay-icon.png",
          description: "eBay UK and DE with Late Shipment Rate-compliant carrier routing.",
          href: "/integrations/marketplaces",
        },
        {
          name: "Etsy",
          logo: "/logos/marketplaces/etsy-icon.png",
          description: "Etsy shop integration with branded tracking for the marketplace's reach.",
          href: "/integrations/marketplaces",
        },
        {
          name: "TikTok Shop",
          logo: "/logos/marketplaces/tiktok-tile.png",
          description: "TikTok Shop UK fulfilment with same multi-carrier routing as the rest of the stack.",
          href: "/integrations/marketplaces",
        },
        {
          name: "Royal Mail",
          logo: "/logos/carriers/royal-mail-icon.png",
          description: "Tracked 24 and Tracked 48 are Amazon Valid Tracking Rate compliant.",
          href: "/integrations/carriers/royal-mail",
        },
        {
          name: "Evri",
          logo: "/logos/carriers/evri_logo.png",
          description: "Standard and Next Day with ParcelShop drop-off for high-volume periods.",
          href: "/integrations/carriers/evri",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description: "Next Day and Saturday for Amazon Prime and eBay Guaranteed Delivery.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "Amazon Shipping",
          logo: "/logos/carriers/amazonshipping_logo.png",
          description: "Seller Fulfilled Prime-approved carrier with same-day rate access.",
          href: "/integrations/carriers/amazon-shipping",
        },
      ]}
      caseStudy={getCaseStudiesBySolution("Marketplace")[0] ?? caseStudies[1]}
      faq={[
        {
          question: "How do you help me hit each marketplace's delivery SLA?",
          answer:
            "We route each order to a carrier that meets that marketplace's cut-off and speed promise, Prime included where you offer it. The right carrier per order keeps your on-time rate where it needs to be.",
        },
        {
          question: "Will this protect my seller metrics?",
          answer:
            "Yes. Late deliveries are what drag marketplace ratings down, so we route to carriers that hit the promise and use tracking the platforms recognise. Your metrics hold without manual checking.",
        },
        {
          question: "Does ITD work with my listing tool?",
          answer:
            "Yes. We sit alongside Linnworks, Selro, StoreFeeder and Veeqo as the shipping layer. Orders come in, labels print, and tracking writes back to the marketplace.",
        },
        {
          question: "Can I keep offering Seller Fulfilled Prime?",
          answer:
            "Yes. We route Prime orders to carriers that meet the dispatch and tracking rules, weekend collections included, so you hold the badge without burning out your team.",
        },
        {
          question: "How much can I save on shipping?",
          answer:
            "Most sellers come to us paying more than they need to. Our buying power across the carriers brings the rate down. Send a recent invoice and we'll show you the numbers.",
        },
        {
          question: "What happens when an order goes wrong?",
          answer:
            "You get a dedicated account manager who handles claims, returns and disputes. A lost parcel or a penalty isn't yours to chase alone.",
        },
      ]}
      closingCta={{
        headline: "Protect your ratings before the next peak",
        subhead:
          "Share with us your carrier mix or a recent invoice. We'll show you where your metrics slip and what the same orders would cost on our rates.",
        primary: { label: "Get Quote", href: RATE_CHECKER_URL },
        secondary: { label: "Explore", href: "/resources/case-studies/west-ham-united" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "Marketplace Seller", path: "/solutions/marketplace-seller" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "Marketplace seller shipping software",
          description:
            "Multi-carrier shipping platform for UK Amazon, eBay, Etsy, and TikTok Shop sellers. SLA-aware carrier routing for Valid Tracking Rate and Late Shipment Rate compliance, with one dispatch queue across every marketplace.",
          path: "/solutions/marketplace-seller",
          serviceType: "Multi-Channel Marketplace Shipping Software",
          areaServed: ["United Kingdom", "European Union"],
        }),
      ]}
    />
  );
}
