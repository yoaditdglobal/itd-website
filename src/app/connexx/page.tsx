import Link from "next/link";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FullOverviewAnimation from "@/components/sections/FullOverviewAnimation";
import MagneticButton from "@/components/ui/MagneticButton";
import ClosingCTA from "@/components/sections/ClosingCTA";
import ConnexxOrbit from "@/components/sections/ConnexxOrbit";
import FaqSection from "@/components/sections/FaqSection";
import ConnexxFeatures from "@/components/sections/ConnexxFeatures";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  productSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/components/seo/JsonLd";
import { ArrowRight } from "lucide-react";

export const metadata = buildMetadata({
  title: "Connexx, the multi-carrier shipping platform from ITD",
  description:
    "Connexx is the multi-carrier shipping platform powered by ITD Global. Every order routes to the best-value carrier and gets a label in seconds, with tracking and customs in one place. 17.5 million labels a year across 16 carriers.",
  path: "/connexx",
});


const faqItems = [
  {
    question: "What is Connexx?",
    answer:
      "Connexx is the multi-carrier shipping platform powered by ITD Global. It connects your sales channels and systems to 16 UK and international carriers from one dashboard. Each order routes to the best-value carrier and gets a label in seconds, with tracking and customs handled in the same place. Behind it sits ITD's carrier network and the team who run it alongside you.",
  },
  {
    question:
      "How does Connexx compare to Shiptheory, Sendcloud, and Metapack?",
    answer:
      "Connexx is UK-built with deeper carrier and customs coverage than Shiptheory, deeper B2B and customs handling than Sendcloud, and a faster onboarding timeline than Metapack. Shiptheory is strong for small UK retailers but limited at scale. Sendcloud is strong in EU eCommerce. Metapack is enterprise-grade and typically over-engineered for businesses under £50m revenue.",
  },
  {
    question: "How long does it take to set up Connexx?",
    answer:
      "Shopify connects in minutes through the native app; eBay and Temu connect via OAuth. Marketplace and multi-channel stacks take a few hours. ERP integrations (such as NetSuite) typically run six to eight weeks for a multi-country enterprise rollout. Import profiles map a new order source to Connexx's shipment fields, so adding a channel is not a custom engineering job.",
  },
  {
    question: "Does Connexx work with my ERP?",
    answer:
      "Likely yes. Connexx has native integrations to Oracle NetSuite, Linnworks, Mintsoft, Veeqo, StoreFeeder, Selro, and ShipHero. Shipment write-back into the ERP is included on every native integration. If your ERP is not on the native list, the REST API supports any system that can call HTTPS and receive webhooks. Request a quote and bring your ERP version number, we will tell you on the call.",
  },
  {
    question: "Does Connexx replace my customs broker?",
    answer:
      "For most parcel shipments, yes. Connexx handles HS code lookup, EORI numbers, IOSS for EU consignments under €150, commercial invoices, packing lists, and country-specific customs declarations against HMRC, EU CDS, and the Windsor Framework. Specialist freight forwarding (FCA, EXW, dangerous goods) still uses your broker. Routine parcel exports to the EU, US, and other Connexx-covered countries are handled inside the platform.",
  },
  {
    question: "What carriers does Connexx support in the UK?",
    answer:
      "Royal Mail (Tracked 24, Tracked 48, Signed, Special Delivery, First Class, Second Class, International), DPD (Next Day, Predict, Two Day, Saturday, DPD Local), Evri (Standard, Next Day, ParcelShop), Parcelforce (Express24, Express48, Global Express, Global Priority, Global Value), DX, InPost, and Amazon Shipping. Every UK postcode is covered, including Highlands and Islands, Channel Islands, Northern Ireland, and BFPO.",
  },
  {
    question: "How does Connexx pricing work?",
    answer:
      "Connexx comes with shipping through ITD. Pricing scales with shipment volume, and setup is scoped to your integration mix (eCommerce only, ERP, marketplaces, or full stack). Get a quote and we will show you the rates you would ship on, and how Connexx runs day to day.",
  },
  {
    question: "Does Connexx have an API?",
    answer:
      "Yes. The Connexx REST API covers shipment creation, cancellation, carrier lookup, and tracking, with webhook events for the full shipment lifecycle. Authentication is bearer token. Full documentation, schema reference, and code samples in cURL, Node, Python, and PHP are at /help/developers.",
  },
];

export default function ConnexxPage() {
  const ldData = [
    productSchema({
      name: "Connexx",
      description:
        "Multi-carrier shipping platform powered by ITD Global. Every order routes to the best-value carrier and gets a label in seconds, with rate comparison, multi-carrier dispatch, integrated tracking, and store and workflow connectivity in one place.",
      path: "/connexx",
      category: "Shipping software",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Connexx", path: "/connexx" },
    ]),
    faqSchema(faqItems),
  ];

  return (
    <>
      <JsonLd data={ldData} />

      {/* Hero */}
      <section data-hero-tone="light" className="bleed-nav relative hero-bg overflow-hidden py-16 md:py-24 lg:py-28">
        <div className="hero-bg-blob" aria-hidden />
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.4] mix-blend-multiply" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <div>
              <h1 className="hero-entrance-h1 text-display-xl text-text-primary">
                The engine behind 17.5 million labels a year
              </h1>
              <p className="hero-entrance-sub mt-5 text-body-lg text-text-secondary max-w-xl">
                A new one every 2.7 seconds, across 16 carriers and used by more
                than 6,000 UK businesses for over 20 years.
              </p>
              <div className="hero-entrance-cta mt-8 flex flex-col sm:flex-row gap-3">
                <MagneticButton>
                  <Button href={RATE_CHECKER_URL}>Get a quote</Button>
                </MagneticButton>
                <Button href="/contact?enquiry=connexx-demo" variant="secondary">
                  Contact Sales
                </Button>
              </div>
            </div>

            <div className="hero-entrance-aside">
              <FullOverviewAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Hero stats strip — matches the hero background for visual continuity */}
      <section className="relative hero-bg overflow-hidden py-10 md:py-12">
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.4] mix-blend-multiply" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={17.5} decimals={1} suffix="M" label="Labels a year" surface="light" />
            <AnimatedCounter end={16} label="Carriers" surface="light" />
            <AnimatedCounter end={6000} suffix="+" label="UK businesses" surface="light" />
            <AnimatedCounter end={20} suffix="+" label="Years" surface="light" />
          </div>
        </div>
      </section>

      {/* Ecosystem orbit — interactive radar showing what Connexx connects to */}
      <ConnexxOrbit />

      {/* Feature explorer — in-place switcher across the four modules */}
      <ConnexxFeatures />

      {/* How Connexx integrates */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-display-lg text-text-primary">
                Connects to everything
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Connexx slots into your existing stack. Sales channels send
                orders in. ERPs and WMSs receive shipment data and tracking.
                Marketplaces dispatch under each platform&rsquo;s SLA rules.
                Carriers receive booked shipments and return tracking updates.
              </p>
            </div>
          </ScrollReveal>

          <div className="text-center">
            <Link
              href="/integrations/carriers"
              className="inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:underline"
            >
              Browse Integrations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        heading="FAQ"
        subheading=""
        items={faqItems}
      />

      {/* Closing CTA */}
      <ClosingCTA
        headline="Connexx comes with shipping through ITD"
        subtitle="Get a quote and we'll show you the rates you'd ship on, and how Connexx runs day to day."
        primaryCta={{ label: "Get a quote", href: RATE_CHECKER_URL }}
        secondaryCta={{ label: "Contact us", href: "/contact?enquiry=connexx-demo" }}
      />
    </>
  );
}
