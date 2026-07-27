import {
  Route,
  MousePointerClick,
  PiggyBank,
  Sparkles,
  Gift,
  Shirt,
  Gem,
  Trophy,
  HeartPulse,
  PawPrint,
  Puzzle,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import CheckoutChoiceDemo from "@/components/sections/CheckoutChoiceDemo";
import InsightTakeover from "@/components/sections/InsightTakeover";
import BrandSpotlight, {
  type SpotlightBrand,
} from "@/components/sections/BrandSpotlight";
import FaqSection from "@/components/sections/FaqSection";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { RATE_CHECKER_URL } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Brands",
  description:
    "Shoppers value reliable, on-time delivery over gimmicks. ITD Global helps brands build the parcel journey around that, with choice at checkout and pricing that protects your margin.",
  path: "/solutions/brands",
});

/* ── Copy (verbatim from the approved doc) ──────────────────────────────────── */

const SUPPORT = [
  {
    icon: Route,
    title: "The right carrier for each order",
    desc: "Each order runs on the carrier most likely to get it there on time and to the door, so your delivery promise doesn't rest on a single courier.",
  },
  {
    icon: MousePointerClick,
    title: "Delivery choice at checkout",
    desc: "Give shoppers the delivery options they want at checkout, faster or cheaper, to the door or a pickup point, across a network of carriers.",
  },
  {
    icon: PiggyBank,
    title: "Pricing that protects your margin",
    desc: "You ship on our carrier rates, compared per order, so delivery stays affordable as you grow and postage doesn't eat into your margin.",
  },
];


const INDUSTRIES = [
  {
    icon: Sparkles,
    name: "Beauty & cosmetics",
    desc: "High-frequency DTC orders and repeat buyers who expect their parcel tracked and on time.",
  },
  {
    icon: Gift,
    name: "Giftware & homeware",
    desc: "Mixed parcel sizes and gifting peaks, handled without the seasonal wobble.",
  },
  {
    icon: Shirt,
    name: "Fashion & footwear",
    desc: "Returns come with the territory, so shoppers get the delivery and return options they expect.",
  },
  {
    icon: Gem,
    name: "Jewellery & accessories",
    desc: "Small, high-value parcels that need secure, tracked delivery to the door.",
  },
  {
    icon: Trophy,
    name: "Sports & fan merch",
    desc: "Kit drops and match-day spikes that need carriers to flex with demand.",
  },
  {
    icon: HeartPulse,
    name: "Health & wellness",
    desc: "Subscription and repeat orders that have to arrive like clockwork.",
  },
  {
    icon: PawPrint,
    name: "Pet supplies",
    desc: "Bulky, heavy repeat orders customers want delivered when they're in.",
  },
  {
    icon: Puzzle,
    name: "Toys, hobby & craft",
    desc: "Gifting peaks and marketplace orders, delivered on the date you promised.",
  },
];

/* Spotlight copy sourced from each brand's case study in src/lib/data.ts
   (headlineResult + oneLiner). KitchenCraft has no published story — logo only. */
const BRANDS: SpotlightBrand[] = [
  {
    name: "Tatti Lashes",
    sector: "Beauty & cosmetics",
    logo: "/case-studies/tatti-lashes/logo.jpeg",
    stat: { value: "60%", label: "of volume shifted to a cheaper carrier" },
    blurb:
      "Delivery choice at checkout and margin back on each order, after adding Evri alongside DPD.",
    href: "/resources/case-studies/tatti-lashes",
  },
  {
    name: "West Ham United",
    sector: "Sports retail",
    logo: "/logos/customers/west-ham.webp",
    stat: { value: "One framework", label: "for multi-carrier control, UK and international" },
    blurb:
      "Steadier collections and a clear view of UK and international spend.",
    href: "/resources/case-studies/west-ham-united",
  },
  {
    name: "Sifcon International",
    sector: "Gifts & homeware",
    logo: "/case-studies/sifcon-international/logo.png",
    stat: { value: "Up to 35%", label: "saved a year on international shipping" },
    blurb:
      "Sample consolidation from China and better courier rates than going direct.",
    href: "/resources/case-studies/sifcon-international",
  },
  {
    name: "KitchenCraft",
    sector: "Kitchen & dining",
    logo: "/logos/customers/kitchencraft.webp",
    blurb: "Kitchen and dining essentials, shipped with ITD Global.",
    href: "/resources/case-studies/lifetime-brands",
  },
  {
    name: "Red Label",
    sector: "Perfume & beauty",
    logo: "/case-studies/red-label/logo.png",
    stat: { value: "3,000", label: "shipments a week through one account" },
    blurb:
      "One multi-carrier setup and a single point of contact for their full beauty volume.",
    href: "/resources/case-studies/red-label",
  },
];

const FAQ = [
  {
    question: "How do I give customers a choice of carrier at checkout?",
    answer:
      "You offer delivery options at checkout and we route each order to the right carrier behind the scenes. The shopper picks how it arrives; we handle who fulfils it.",
  },
  {
    question: "Do I have to manage a string of carrier accounts?",
    answer:
      "No. You ship on one account with us and we hold the carrier relationships, so you get the network without chasing separate contracts.",
  },
  {
    question: "Won't running multiple carriers complicate dispatch?",
    answer:
      "No. Labels, tracking and routing sit in one place, so your team works from one screen whichever carrier takes the order.",
  },
  {
    question: "How does this make delivery more reliable?",
    answer:
      "Each order can go to the carrier that performs best on that lane, so you're not tied to one carrier's off day. If a service slips, orders route elsewhere.",
  },
  {
    question: "Will it save me money?",
    answer:
      "You ship on our carrier rates, compared per order, usually below what a business your size reaches alone. We'll show you the numbers against your current setup.",
  },
  {
    question: "Do I need to change my store or systems?",
    answer:
      "No. We connect to what you already run, Shopify, WooCommerce, your marketplaces and WMS, so orders come in and tracking goes back automatically.",
  },
];

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
  { name: "Brands", path: "/solutions/brands" },
];

export default function BrandsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(CRUMBS), faqSchema(FAQ)]} />

      {/* Hero — dark ink panel with the interactive checkout demo */}
      <section
        data-hero-tone="dark"
        className="bleed-nav relative overflow-hidden bg-bg-dark py-16 md:py-24"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-20 left-1/4 h-[420px] w-[640px] rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[420px] rounded-full bg-accent-secondary/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="hero-entrance-h1 inline-block rounded-full bg-white/15 px-3 py-1 text-eyebrow tracking-wider text-white mb-5">
                  Brands
                </span>
                <h1 className="hero-entrance-h1 text-display-xl text-white">
                  Give your customers the delivery they actually want
                </h1>
                <p className="hero-entrance-sub mt-5 max-w-xl text-body-lg text-white/70">
                  Shoppers value reliable, on-time delivery over gimmicks. We
                  help you build your parcel journey around that, with choice at
                  checkout and pricing that protects your margin.
                </p>
                <div className="hero-entrance-cta mt-8 flex flex-wrap items-center gap-3">
                  <Button href={RATE_CHECKER_URL}>Get Quote</Button>
                  <Button href="/contact?enquiry=brands" variant="secondary" surface="dark">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <div className="flex justify-center lg:justify-end">
                <CheckoutChoiceDemo />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How we support brands */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary">
              How we support brands
            </h2>
            <p className="mt-4 max-w-3xl text-body-md text-text-secondary">
              We help you build your parcel journey around the shopper, then
              deliver it through our carrier network. What that means in
              practice:
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3 items-stretch">
            {SUPPORT.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-bg-secondary p-7 transition-all hover:border-accent/30 hover:shadow-md motion-reduce:transition-none">
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light text-accent">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="text-heading-md text-text-primary">{item.title}</p>
                  <p className="mt-2 text-body-md text-text-secondary">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What your customers actually want — dark stats band */}
      <section className="relative overflow-hidden bg-bg-dark py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 15% 15%, rgba(29,63,184,0.35) 0%, transparent 55%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-white max-w-3xl">
              What your customers actually want
            </h2>
            <p className="mt-4 max-w-3xl text-body-md text-white/70">
              Parcel delivery is retail&apos;s weak link: two in three shoppers
              have had a recent delivery problem, and three in four had no say
              in who delivered it.
            </p>
          </ScrollReveal>

          <InsightTakeover />

          <ScrollReveal>
            <p className="mt-6 text-caption text-white/40">
              Sources:{" "}
              <a
                href="https://www.ofcom.org.uk/post/market-performance/post-monitoring-report-2024-25-interactive-data"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-2 transition-colors hover:text-white/70 motion-reduce:transition-none"
              >
                Ofcom parcel-delivery research
              </a>
              ; Citizens Advice, via the{" "}
              <a
                href="https://www.ft.com/content/17ba6971-847a-4882-8510-cb2b31f8be1f"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-2 transition-colors hover:text-white/70 motion-reduce:transition-none"
              >
                Financial Times
              </a>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Built for your industry */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary">
              Built for your industry
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {INDUSTRIES.map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 0.05} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-white motion-reduce:transition-none">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="text-heading-sm text-text-primary">{item.name}</p>
                  <p className="mt-1.5 text-body-sm text-text-secondary">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* In good company */}
      <section className="bg-white py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-md text-text-primary">In good company</h2>
            <BrandSpotlight brands={BRANDS} />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={FAQ} />

      <ClosingCTA
        headline="Build your delivery around your customers"
        subtitle="Get a quote and we'll map your orders to the carriers and checkout options that fit your brand."
        primaryCta={{ label: "Get Quote", href: RATE_CHECKER_URL }}
        secondaryCta={{ label: "Contact Sales", href: "/contact?enquiry=brands" }}
      />
    </>
  );
}
