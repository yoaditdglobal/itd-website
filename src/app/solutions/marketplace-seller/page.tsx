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

/** TL;DR — every bullet is verifiable against this page's own copy. */
const TLDR = [
  "We help UK marketplace sellers protect their SLAs and margin by matching each order to a Prime-ready carrier that meets the delivery promise.",
  "We connect Amazon, eBay, Etsy and TikTok Shop into one dispatch queue, route by each marketplace's cut-off, and push tracking back automatically.",
  "We flag exceptions early and route to carriers that hit the promise using tracking the platforms recognise, so your seller metrics hold without manual checking.",
];

export default function MarketplaceSellerPage() {
  return (
    <VerticalPage
      gatewayMedia={{
        mp4: "/media/connexx-marketplace.mp4",
        webm: "/media/connexx-marketplace.webm",
        poster: "/media/connexx-marketplace-poster.jpg",
        caption:
          "Connexx connecting Amazon, eBay, Etsy, TikTok Shop and Temu, picking a carrier that meets each delivery promise, writing tracking back to every marketplace, and flagging late-dispatch risk before it hits your seller metrics.",
      }}
      label="Marketplace Seller"
      title="Protect your marketplace SLAs and your margin"
      subtitle="When a carrier misses the promise, the penalty lands on you. A refund off your margin and a late mark on your account. We match each order to a Prime-ready carrier, with the rates and support to grow your channel."
      primaryCta={{ label: "Get Quote", href: RATE_CHECKER_URL }}
      secondaryCta={{ label: "Contact Sales", href: "/contact?enquiry=marketplace-seller" }}
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
      integrationsContext="Marketplace"
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
        secondary: { label: "Contact Sales", href: "/contact?enquiry=marketplace-seller" },
      }}
      keyTakeaways={TLDR}
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
