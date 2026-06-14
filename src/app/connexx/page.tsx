import Link from "next/link";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CountUp from "@/components/ui/CountUp";
import MagneticButton from "@/components/ui/MagneticButton";
import ClosingCTA from "@/components/sections/ClosingCTA";
import ConnexxOrbit from "@/components/sections/ConnexxOrbit";
import FaqSection from "@/components/sections/FaqSection";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  productSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/components/seo/JsonLd";
import {
  Zap,
  Truck,
  ShieldCheck,
  RefreshCw,
  BarChart3,
  Plug,
  Code,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata = buildMetadata({
  title: "Connexx, the multi-carrier shipping platform from ITD",
  description:
    "Connexx connects every UK and international carrier, every ERP, every marketplace from one dashboard. Live rate comparison, customs automation, branded tracking.",
  path: "/connexx",
});

interface ModuleDeepDive {
  icon: LucideIcon;
  name: string;
  lead: string;
  bullets: string[];
  stat: string;
}

const modules: ModuleDeepDive[] = [
  {
    icon: Zap,
    name: "Rate Comparison",
    lead: "Live API rate pull on every shipment, across every connected carrier.",
    bullets: [
      "Live API call to each carrier the moment an order is created. No cached rates, no overnight syncs.",
      "Cheapest compliant carrier selected automatically based on your rules (weight, destination, service level, contract terms).",
      "Manual override available on any shipment, with the audit log preserved for reconciliation.",
      "Service-level filtering by lane, by SKU, by customer segment.",
    ],
    stat: "Peak Commerce cut shipping costs 42% in the first quarter after switching to Connexx rate shopping across 8 carriers and 12 markets.",
  },
  {
    icon: Truck,
    name: "Multi-Carrier Dispatch",
    lead: "One screen for every carrier, every label format, every manifest.",
    bullets: [
      "16 active carrier integrations including Royal Mail, DPD, Evri, Parcelforce, DHL Express, FedEx, UPS, Amazon Shipping, InPost, DHL Parcel, Deutsche Post, and TNT.",
      "One-click label generation. Batch processing for peak.",
      "Manifest generation by carrier, by date, by depot.",
      "Exception routing rebooks failed dispatches to the next-best carrier automatically.",
    ],
    stat: "Velocity Sellers reduced average fulfilment time from 72 hours to 24 hours across Amazon and eBay, with marketplace penalty fees dropping to zero.",
  },
  {
    icon: ShieldCheck,
    name: "Customs Automation",
    lead: "HS codes, EORI, IOSS, and country-specific paperwork generated before the carrier scans the label.",
    bullets: [
      "HS code lookup against your product catalogue, with manual override on edge cases.",
      "EORI numbers, IOSS thresholds, and Postponed VAT Accounting applied to the right shipments automatically.",
      "Country-specific commercial invoices, packing lists, and customs declarations generated in the correct format for each destination.",
      "Regulatory updates (HMRC, EU CDS, Windsor Framework for NI, GPSR) applied to the engine without rework on your side.",
    ],
    stat: "Meridian Trade Co cut documentation preparation from 4 hours to 1 hour per shipment, with customs holds caused by paperwork errors down 90% across 25 export markets.",
  },
  {
    icon: RefreshCw,
    name: "Returns Management",
    lead: "Branded customer returns portal, automated carrier routing, refund-ready data back to your eCommerce platform.",
    bullets: [
      "Branded returns portal hosted on your domain. Your logo, your policy, your customer.",
      "Pre-paid return labels generated on demand. Customer enters the order number, the label arrives in their inbox.",
      "Carrier selection follows your returns rules (cheapest, fastest, nearest drop-off).",
      "Returns data flows back to Shopify, WooCommerce, Magento, or your ERP for refund processing and stock reconciliation.",
    ],
    stat: "Returns logistics typically eats 8% of eCommerce revenue before automation. Connexx returns customers recover this margin by routing to the lowest-cost compliant carrier on every return.",
  },
  {
    icon: BarChart3,
    name: "Analytics & Reporting",
    lead: "Cost per shipment, lane performance, SLA breach rate, exportable reports for finance.",
    bullets: [
      "Per-carrier cost breakdowns by lane, by service, by week.",
      "SLA breach rate by carrier, with the underlying shipment IDs.",
      "Surcharge tracking (fuel, residential, out-of-area, Highlands and Islands) so the finance team sees true landed cost.",
      "Exportable to CSV and direct write-back to NetSuite for consolidated finance reporting.",
    ],
    stat: "Atlas Industrial saved 20 hours per week of manual data entry by writing Connexx shipment data straight back into the ERP. Redelivery costs dropped to near zero across 500 weekly pallet shipments.",
  },
  {
    icon: Plug,
    name: "Integrations & API",
    lead: "Native integrations to every major ERP, WMS, eCommerce platform, and marketplace. REST API for everything else.",
    bullets: [
      "ERP and WMS: Oracle NetSuite, Linnworks, Mintsoft, Veeqo, StoreFeeder, Selro, ShipHero.",
      "eCommerce: Shopify (official app), WooCommerce, Magento / Adobe Commerce, BigCommerce.",
      "Marketplaces: Amazon Seller Central, eBay, Etsy, Walmart, Zalando, TikTok Shop, Temu.",
      "REST API with webhook events for shipment created, shipment dispatched, tracking update, exception, delivered, returned.",
    ],
    stat: "26 live tech integrations and 16 carrier integrations as of the last platform update. New integrations are added monthly against published roadmap.",
  },
];

const integrationBreakdown = [
  {
    category: "eCommerce",
    count: "4",
    examples: "Shopify, WooCommerce, Magento / Adobe Commerce, BigCommerce",
  },
  {
    category: "ERP and WMS",
    count: "11",
    examples:
      "Oracle NetSuite, Linnworks, Mintsoft, Veeqo, StoreFeeder, Selro, ShipHero",
  },
  {
    category: "Marketplaces",
    count: "7",
    examples: "Amazon, eBay, Etsy, Walmart, Zalando, TikTok Shop, Temu",
  },
  {
    category: "Carriers (UK)",
    count: "8",
    examples:
      "Royal Mail, DPD, Evri, Parcelforce, DX, InPost, Amazon Shipping",
  },
  {
    category: "Carriers (international)",
    count: "8",
    examples:
      "DHL Express, FedEx, UPS, DHL Parcel, Deutsche Post, TNT",
  },
];

const faqItems = [
  {
    question: "What is Connexx?",
    answer:
      "Connexx is the multi-carrier shipping platform built by ITD Global. It connects your eCommerce platform, marketplaces, and ERP to 16 UK and international carriers from one dashboard. Live rate comparison runs on every shipment. Customs documentation is generated automatically for exports. Tracking writes back to the order source. Connexx is sold as a SaaS subscription with a setup fee scoped to your integration mix.",
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
      "Shopify and WooCommerce connect in under 10 minutes through the official app and the WordPress plugin. Marketplace stacks (Amazon, eBay, Etsy via Linnworks or Mintsoft) take a few hours. ERP integrations (such as NetSuite) typically run six to eight weeks for a multi-country enterprise rollout. SwiftLog Fulfilment onboards new 3PL brand clients on Connexx in two days, down from two weeks on their previous stack.",
  },
  {
    question: "Does Connexx work with my ERP?",
    answer:
      "Likely yes. Connexx has native integrations to Oracle NetSuite, Linnworks, Mintsoft, Veeqo, StoreFeeder, Selro, and ShipHero. Shipment write-back into the ERP is included on every native integration. If your ERP is not on the native list, the REST API supports any system that can call HTTPS and receive webhooks. Request a demo and bring your ERP version number, we will tell you on the call.",
  },
  {
    question: "Does Connexx replace my customs broker?",
    answer:
      "For most shipments, yes. Connexx handles HS code lookup, EORI numbers, IOSS for EU consignments under €150, commercial invoices, packing lists, and country-specific customs declarations against HMRC, EU CDS, and the Windsor Framework. Specialist freight forwarding (FCA, EXW, dangerous goods) still uses your broker. Routine parcel exports to the EU, US, and other Connexx-covered countries are handled inside the platform.",
  },
  {
    question: "What carriers does Connexx support in the UK?",
    answer:
      "Royal Mail (Tracked 24, Tracked 48, Signed, Special Delivery, First Class, Second Class, International), DPD (Next Day, Predict, Two Day, Saturday, DPD Local), Evri (Standard, Next Day, ParcelShop), Parcelforce (Express24, Express48, Global Express, Global Priority, Global Value), DX, InPost, and Amazon Shipping. Every UK postcode is covered, including Highlands and Islands, Channel Islands, Northern Ireland, and BFPO.",
  },
  {
    question: "How does Connexx pricing work?",
    answer:
      "Pricing scales with shipment volume. Connexx is sold on a per-shipment basis with no minimum monthly commitment. Higher volume tiers pay a lower per-shipment rate. Setup fees are scoped to your integration mix (eCommerce only, ERP, marketplaces, or full stack). Contact ITD for a quote scoped to your specific volume and carrier mix.",
  },
  {
    question: "Does Connexx have an API?",
    answer:
      "Yes. The Connexx REST API exposes every platform function (rate quote, shipment create, label generate, tracking, returns, carrier management) with webhook events for the full shipment lifecycle. Authentication is bearer token. Full documentation, schema reference, and code samples in cURL, Node, Python, and PHP are at /help/developers.",
  },
];

export default function ConnexxPage() {
  const ldData = [
    productSchema({
      name: "Connexx",
      description:
        "Multi-carrier shipping platform from ITD Global with live rate comparison, customs automation, branded tracking, returns, and analytics for UK and international shippers.",
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
      <section className="relative hero-bg overflow-hidden py-16 md:py-24 lg:py-28">
        <div className="hero-bg-blob" aria-hidden />
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.4] mix-blend-multiply" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="hero-entrance-h1 text-eyebrow text-accent mb-3">
                The Connexx platform
              </p>
              <h1 className="hero-entrance-h1 text-display-xl text-text-primary">
                One platform. Every shipment. Every carrier.
              </h1>
              <p className="hero-entrance-sub mt-5 text-body-lg text-text-secondary max-w-xl">
                Connexx is the multi-carrier shipping platform built by ITD
                Global. Live rate comparison across every connected carrier,
                one-click label generation, customs documentation, branded
                tracking, returns, and analytics. Connect Connexx to Shopify,
                NetSuite, Linnworks, or your own systems through the API.
                Dispatch every parcel from one screen.
              </p>
              <div className="hero-entrance-cta mt-8 flex flex-col sm:flex-row gap-3">
                <MagneticButton>
                  <Button href="/contact?enquiry=connexx-demo">
                    Request a Connexx demo
                  </Button>
                </MagneticButton>
                <Button href="/help/developers" variant="secondary">
                  See the developer documentation
                </Button>
              </div>
            </div>

            <div className="hero-entrance-aside">
              <div className="bg-bg-secondary rounded-2xl border border-border p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-text-tertiary">
                    Connexx Dashboard
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3 border border-border text-center">
                    <div className="text-xs text-text-tertiary">Active shipments</div>
                    <div className="text-lg font-bold text-text-primary">
                      <CountUp to={1247} duration={1600} />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-border text-center">
                    <div className="text-xs text-text-tertiary">Carriers connected</div>
                    <div className="text-lg font-bold text-text-primary">
                      <CountUp to={16} duration={1200} />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-border text-center">
                    <div className="text-xs text-text-tertiary">Cost saved MTD</div>
                    <div className="text-lg font-bold text-text-primary">
                      <CountUp to={18.4} duration={1500} decimals={1} prefix="£" suffix="K" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-border">
                  <div className="h-24 flex items-end gap-1.5 px-2">
                    {[40, 55, 35, 70, 60, 80, 50, 90, 75, 85, 65, 95].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-accent/20 rounded-t"
                          style={{ height: `${h}%` }}
                        >
                          <div
                            className="w-full bg-accent rounded-t"
                            style={{
                              height: `${Math.min(h + 10, 100) - 20}%`,
                            }}
                          />
                        </div>
                      ),
                    )}
                  </div>
                  <p className="text-xs text-text-tertiary text-center mt-2">
                    Shipment volume — last 12 months
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero stats strip — matches the hero background for visual continuity */}
      <section className="relative hero-bg overflow-hidden py-10 md:py-12">
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.4] mix-blend-multiply" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter end={16} suffix="" label="Carrier integrations" surface="light" />
            <AnimatedCounter end={26} suffix="" label="Tech integrations" surface="light" />
            <AnimatedCounter end={99} suffix="%" label="Platform uptime" surface="light" />
            <AnimatedCounter end={200} suffix="ms" prefix="<" label="Avg API response" surface="light" />
          </div>
        </div>
      </section>

      {/* Ecosystem orbit — interactive radar showing what Connexx connects to */}
      <ConnexxOrbit />

      {/* What Connexx actually does — GEO snippet block */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-6">
              What Connexx actually does.
            </h2>
            <p className="text-body-lg text-text-secondary">
              Connexx is a UK-built multi-carrier shipping platform from ITD
              Global. It connects your eCommerce platform, marketplaces, and ERP
              to every major UK and international carrier. Royal Mail, DPD,
              Evri, Parcelforce, DHL Express, FedEx, UPS, Amazon Shipping, and 8
              more in the live carrier list. Rate shopping, label generation,
              customs documentation, and tracking all happen from one dashboard.
            </p>
            <p className="mt-5 text-body-md text-text-secondary">
              Connexx is not a horizontal SaaS with a UK skin. The rate engine
              runs a live API call to each carrier on every shipment. Customs
              documentation is generated against HMRC, EU CDS, and
              country-specific rules. Onboarding is measured in days, not
              months.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Six modules grid */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-display-lg text-text-primary">
                Everything you need.
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
                Six modules cover the full shipment lifecycle. Each module works
                on its own. Together they replace the patchwork of carrier
                portals, customs spreadsheets, and tracking tabs that every
                operations team accumulates. Connect Connexx in days. Run it for
                years.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, i) => (
              <ScrollReveal key={mod.name} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-border p-6 hover:shadow-md hover:border-accent/20 transition-all h-full">
                  <mod.icon className="w-8 h-8 text-accent mb-3" />
                  <p className="text-heading-md text-text-primary">
                    {mod.name}
                  </p>
                  <p className="mt-1.5 text-body-sm text-text-secondary">
                    {mod.lead}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Six alternating module deep dives */}
      {modules.map((mod, i) => (
        <section
          key={mod.name}
          className={`py-16 md:py-24 ${i % 2 === 0 ? "bg-white" : "bg-bg-secondary"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div>
                  <mod.icon className="w-10 h-10 text-accent mb-4" />
                  <p className="text-eyebrow text-accent mb-2">
                    Module {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-display-lg text-text-primary">
                    {mod.name}.
                  </h2>
                  <p className="mt-3 text-body-md text-text-secondary">
                    {mod.lead}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {mod.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="text-accent mt-1 flex-shrink-0">
                          &#10003;
                        </span>
                        <span className="text-text-secondary text-sm leading-relaxed">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-body-sm text-text-primary bg-accent-light/40 border border-accent/15 rounded-lg p-4">
                    {mod.stat}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-bg-secondary rounded-2xl border border-border p-8 flex items-center justify-center min-h-[280px]">
                  <div className="text-center">
                    <mod.icon className="w-16 h-16 text-accent/20 mx-auto mb-3" />
                    <p className="text-body-sm text-text-tertiary">
                      {mod.name} — UI preview
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* Social proof + SwiftLog featured case */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <AnimatedCounter end={16} suffix="" label="Active carrier integrations" />
            <AnimatedCounter end={26} suffix="" label="Tech integrations" />
            <AnimatedCounter end={99} suffix="%" label="Platform uptime" />
            <AnimatedCounter end={200} suffix="ms" prefix="<" label="Avg API response" />
          </div>

          <ScrollReveal>
            <div className="bg-bg-dark-card border border-white/10 rounded-2xl p-8 md:p-10">
              <p className="text-eyebrow text-accent mb-3">
                Featured case study — SwiftLog Fulfilment
              </p>
              <h3 className="text-display-md text-white leading-snug">
                98.7% accuracy across 40+ destination countries. Client
                onboarding from two weeks to two days.
              </h3>
              <p className="mt-5 text-body-md text-white/70">
                SwiftLog Fulfilment runs 60 brands across 40+ countries on
                Connexx. Before Connexx, their shipment accuracy was 93%.
                Customs documentation was prepared manually, and a 7% error rate
                meant delays, fines, and angry end customers. Now accuracy is
                98.7%, customs-related delays are down 85%, and new brand
                clients go live in two days instead of two weeks.
              </p>
              <blockquote className="border-l-2 border-accent pl-4 mt-6 italic text-white/80">
                &ldquo;Our accuracy was our biggest vulnerability. Now it&rsquo;s
                our strongest selling point. We close new clients by showing
                them the Connexx dashboard.&rdquo;
                <footer className="mt-2 text-sm font-medium text-white not-italic">
                  James Thornton, Managing Director at SwiftLog Fulfilment
                </footer>
              </blockquote>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  href="/resources/case-studies/delta-fulfilment"
                  variant="primary"
                  surface="dark"
                >
                  Read the full SwiftLog story
                </Button>
                <Button
                  href="/resources/case-studies"
                  variant="secondary"
                  surface="dark"
                >
                  Read every case study
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Developer API section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <Code className="w-10 h-10 text-accent mb-4" />
                <h2 className="text-display-lg text-text-primary">
                  Built for developers. Live in minutes.
                </h2>
                <p className="mt-4 text-body-md text-text-secondary">
                  Connexx exposes every platform function through a versioned
                  REST API. Create a shipment, fetch a rate, generate a label,
                  pull tracking, manage carriers, handle returns. Authentication
                  is bearer token. Webhooks fire on every shipment lifecycle
                  event. The full reference, with code samples in cURL, Node,
                  Python, and PHP, is in the developer documentation.
                </p>
                <p className="mt-4 text-body-md text-text-secondary">
                  The response returns the selected carrier, the service code,
                  the rate, the label as a base64 PDF or PNG, the tracking
                  number, and a webhook subscription URL for status updates.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/help/developers" variant="secondary">
                    See full API documentation
                  </Button>
                  <Button href="/help/developers" variant="secondary">
                    View API reference
                  </Button>
                  <Button href="https://status.itdglobal.com" variant="secondary">
                    Status page
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-bg-dark rounded-xl p-6 font-mono text-xs sm:text-sm overflow-x-auto">
                <div className="text-white/40 mb-2"># Create a shipment</div>
                <pre className="text-white/90 leading-relaxed">{`curl -X POST https://api.itdglobal.com/v1/shipments \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": {
      "name": "Acme UK Ltd",
      "postcode": "M1 1AA",
      "country": "GB"
    },
    "to": {
      "name": "Jane Doe",
      "postcode": "EH1 1YZ",
      "country": "GB"
    },
    "parcel": {
      "weight_kg": 2.5,
      "length_cm": 30,
      "width_cm": 20,
      "height_cm": 10
    },
    "service_preference": "cheapest",
    "reference": "ORDER-10247"
  }'`}</pre>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How Connexx integrates */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-display-lg text-text-primary">
                Connects to everything.
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Connexx slots into your existing stack. eCommerce platforms send
                orders in. ERPs receive shipment data and tracking. WMSs trigger
                label printing on the pick line. Marketplaces dispatch under
                each platform&rsquo;s SLA rules. Carriers receive booked
                shipments and return tracking updates.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrationBreakdown.map((row, i) => (
              <ScrollReveal key={row.category} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-border p-5 h-full">
                  <div className="flex items-baseline justify-between mb-2">
                    <p className="text-heading-sm text-text-primary">
                      {row.category}
                    </p>
                    <span className="text-stat-lg text-accent">
                      {row.count}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {row.examples}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/integrations/carriers"
              className="inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:underline"
            >
              See every integration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        heading="Eight questions buyers ask."
        subheading="The answers most operators ask before booking a call."
        items={faqItems}
      />

      {/* Closing CTA */}
      <ClosingCTA
        headline="Stop running shipping in browser tabs."
        subtitle="Request a 30-minute demo scoped to your carrier mix and ERP. We will run a live rate comparison on a real shipment you define."
        primaryCta={{ label: "Contact Us", href: "/contact?enquiry=connexx-demo" }}
        secondaryCta={{ label: "Get Quote", href: "/shipping/domestic#estimator" }}
      />
    </>
  );
}
