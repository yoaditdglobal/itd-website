import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ReadingProgress from "@/components/ui/ReadingProgress";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/components/seo/JsonLd";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata = buildMetadata({
  title: "3PL Partnership: what working with ITD Global looks like",
  description:
    "A practical guide for 3PLs looking to expand their carrier offering, protect client margin, and scale without adding commercial overhead — multi-carrier access, Connexx, child ID accounts, billing, and onboarding.",
  path: "/resources/guides/3pl-partnership",
});

const PATH = "/resources/guides/3pl-partnership";
const UPDATED = "6 July 2026";
const UPDATED_ISO = "2026-07-06";

const sections = [
  { id: "full-picture", label: "1. What ITD offers 3PLs: the full picture" },
  { id: "multi-carrier", label: "2. Multi-carrier access" },
  { id: "connexx", label: "3. The Connexx platform" },
  { id: "rates", label: "4. Rates and buying power" },
  { id: "child-ids", label: "5. Child ID accounts and reporting" },
  { id: "billing", label: "6. Billing and reconciliation" },
  { id: "onboarding", label: "7. Onboarding: what getting set up looks like" },
  { id: "commercial-model", label: "8. The commercial model" },
  { id: "faq", label: "FAQ" },
];

const faqs = [
  {
    question: "Do we need to replace our current carrier relationships to work with ITD?",
    answer:
      "No. ITD works alongside your existing setup. You can bring ITD in for specific clients, specific carriers, or your whole operation. The pace is yours to set.",
  },
  {
    question: "How does ITD fit into our existing WMS?",
    answer:
      "Through the Connexx integration. ITD's team handles the technical connection. The most common integrations cover the main WMS and OMS platforms used by UK 3PLs. Your implementation manager will confirm compatibility at the scoping stage.",
  },
  {
    question: "Can our clients see their own data?",
    answer:
      "Yes. Each client gets a child ID account with their own reporting view. They see their shipping activity, carrier split, and delivery performance. They don't have visibility of your account or any other client's data.",
  },
  {
    question: "What happens to our rates if our volumes drop?",
    answer:
      "Your rates are based on ITD's collective volume position, not yours individually. A change in your own volumes doesn't directly affect the rates you access through ITD.",
  },
  {
    question: "Is there a minimum volume to join?",
    answer:
      "No. There's no minimum volume and no contract commitment. ITD is set up to work with 3PLs at different stages of growth.",
  },
  {
    question: "What carrier options do we get access to?",
    answer:
      "The full ITD carrier network, including domestic and international services. Your account manager will walk through the carrier options relevant to your client mix during onboarding.",
  },
  {
    question: "Who do we contact if there's a carrier issue for one of our clients?",
    answer:
      "Your dedicated ITD account manager. One point of contact covers all carriers and all client accounts. You don't need to manage separate carrier support queues.",
  },
];

export default function ThreePlGuidePage() {
  const jsonLd = [
    articleSchema({
      headline: "3PL Partnership: what working with ITD Global looks like",
      description:
        "A practical guide for 3PLs looking to expand their carrier offering, protect client margin, and scale without adding commercial overhead.",
      path: PATH,
      datePublished: UPDATED_ISO,
      dateModified: UPDATED_ISO,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources/case-studies" },
      { name: "Guides", path: "/resources/guides" },
      { name: "3PL Partnership", path: PATH },
    ]),
    faqSchema(faqs),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReadingProgress />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/resources/guides"
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to guides
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block px-2.5 py-1 rounded-full bg-accent-light text-accent text-eyebrow">
                Guide
              </span>
              <span className="inline-block px-2.5 py-1 rounded-full bg-bg-secondary text-text-secondary text-eyebrow">
                3PL
              </span>
            </div>
            <h1 className="text-display-xl text-text-primary">
              3PL Partnership: what working with ITD Global looks like.
            </h1>
            <p className="mt-5 text-body-lg text-text-secondary">
              A practical guide for 3PLs looking to expand their carrier
              offering, protect client margin, and scale without adding
              commercial overhead.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-text-tertiary">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Last updated {UPDATED}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 9 minute read
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Who this is for */}
      <section className="bg-white pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">Who this is for</p>
            <p className="text-text-secondary leading-relaxed">
              3PLs managing multiple brands or clients who want to offer a wider
              carrier choice without building and maintaining individual carrier
              relationships. If you&apos;re at the point where carrier management
              is taking up commercial bandwidth, or clients are asking for
              options you don&apos;t currently have, this guide covers how ITD
              fits in.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Table of contents */}
      <section className="bg-white pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-bg-secondary rounded-xl border border-border p-6">
              <p className="text-eyebrow text-text-primary mb-4">
                Table of contents
              </p>
              <ol className="space-y-2">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-sm text-accent hover:underline">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Article body */}
      <article className="bg-white pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section 1 */}
          <section id="full-picture" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              1. What ITD offers 3PLs: the full picture
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Most 3PLs reach a point where the carrier question becomes a
                bottleneck. Clients want more options. New brands come on with
                their own carrier preferences. Rate negotiations take time your
                team doesn&apos;t have. ITD sits alongside your operation and
                handles that layer, so you keep the client relationship, and we
                manage the carrier complexity behind it.
              </p>
              <p>The six things ITD brings to a 3PL partnership:</p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-primary">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">What you get</th>
                    <th className="px-4 py-3 text-left font-semibold">What it means in practice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Multi-carrier access</td>
                    <td className="px-4 py-3">Access to a full carrier network through one relationship. No separate contracts, no individual carrier setup.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Connexx integration</td>
                    <td className="px-4 py-3">One platform connection gives your brands carrier access at the touch of a button. No manual builds per carrier.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Buying power</td>
                    <td className="px-4 py-3">ITD&apos;s collective volume across all its 3PL partners secures rates most 3PLs cannot reach on their own.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Child ID accounts</td>
                    <td className="px-4 py-3">Each brand or client gets their own ring-fenced analytics and reporting. Your account structure stays private.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Transparent billing</td>
                    <td className="px-4 py-3">Weekly invoicing broken down per customer, with detailed references. Straightforward to reconcile and pass on.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">No lock-in</td>
                    <td className="px-4 py-3">No volume commitments, no annual contracts. Scale up, bring on new brands, or adjust without renegotiating.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2 */}
          <section id="multi-carrier" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              2. Multi-carrier access
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Running a multi-carrier operation under your own steam means
                building and maintaining relationships with each carrier
                separately: individual contracts, separate rate negotiations,
                different billing cycles, and dedicated support contacts for each
                one. For a 3PL managing ten brands across four carriers,
                that&apos;s forty relationship threads to keep live.
              </p>
              <p>
                Through ITD you access the full carrier network via one
                commercial relationship. Rate management, carrier performance,
                and contract renewals sit with ITD. Your team deals with one
                account manager and one billing cycle, regardless of how many
                carriers your brands are using.
              </p>
              <p>
                When a client asks for a carrier you don&apos;t currently offer,
                the answer doesn&apos;t require a new contract or a six-week
                setup. The carrier is already on the network.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="connexx" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              3. The Connexx platform
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Connexx is ITD&apos;s integration platform. One connection to
                Connexx gives your warehouse management system or OMS access to
                the full carrier network. There&apos;s no separate API build per
                carrier, no manual label setup, and no individual carrier
                credentials to manage per brand.
              </p>
              <p>
                When you bring on a new client, you set them up as a child
                account in Connexx. They&apos;re live on the carrier network from
                day one, with their own reporting view and label configuration,
                without any additional integration work on your side.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-primary">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Stage</th>
                    <th className="px-4 py-3 text-left font-semibold">Without ITD</th>
                    <th className="px-4 py-3 text-left font-semibold">With ITD via Connexx</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Carrier access</td>
                    <td className="px-4 py-3">Negotiate and contract with each carrier individually</td>
                    <td className="px-4 py-3">One integration, full carrier network live immediately</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">New carrier go-live</td>
                    <td className="px-4 py-3">Separate build and testing per carrier, weeks of lead time</td>
                    <td className="px-4 py-3">Available through the platform, no additional build</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Brand onboarding</td>
                    <td className="px-4 py-3">Manual carrier setup repeated for each new client</td>
                    <td className="px-4 py-3">New child ID created, brand live on the full network</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Rate management</td>
                    <td className="px-4 py-3">Renegotiate per carrier as volumes change</td>
                    <td className="px-4 py-3">ITD manages rate position across the network</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                The integration approach means the platform scales with your
                client base. Adding a brand doesn&apos;t add technical overhead.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="rates" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              4. Rates and buying power
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Carrier rates are largely a function of volume. A 3PL shipping
                2,000 parcels a day negotiates on 2,000 parcels a day. ITD
                negotiates on the combined volume of all its 3PL partners, which
                is a materially different conversation with the carriers.
              </p>
              <p>
                The practical effect: ITD&apos;s rates on most lanes and carrier
                combinations will be better than what you could secure
                independently. That rate advantage passes directly to your
                clients, which makes your commercial offer more competitive, or
                it protects your margin, depending on how you structure your
                client billing.
              </p>
              <p>
                ITD also holds rate positions when carriers push through
                surcharges or general rate increases. Volume position gives more
                leverage to absorb or negotiate those increases than a mid-size
                3PL would have on its own.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="child-ids" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              5. Child ID accounts and reporting
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Each brand or client you manage through ITD gets its own child ID
                account. The child ID gives that client a ring-fenced view of
                their own shipping activity: volume, carrier split, delivery
                performance, returns. They see their data. They don&apos;t see
                yours, and they don&apos;t see any other clients.
              </p>
              <p>
                At the parent level, you have a consolidated view across all
                child accounts. You can see total volume, carrier distribution,
                and billing in one place, broken down by client. It&apos;s the
                reporting structure a 3PL needs to manage multiple brands without
                building bespoke reports for each one.
              </p>
              <p>
                If a client asks for their own shipping dashboard or monthly
                carrier performance report, you can pull it directly from their
                child ID. No manual work, no extracting rows from a shared
                spreadsheet.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="billing" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              6. Billing and reconciliation
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Carrier billing across multiple brands and multiple carriers can
                get complicated quickly. ITD consolidates it into a single weekly
                invoice, broken down by customer with detailed parcel-level
                references.
              </p>
              <p>
                Each line item in the invoice maps to a specific brand and a
                specific shipment. That means reconciliation against your own
                client billing is straightforward, and if a client asks for a
                cost breakdown, you have the data to hand without rebuilding it
                from carrier statements.
              </p>
              <p>
                There are no hidden surcharges buried in a monthly statement. If
                a carrier applies a fuel surcharge or a residential delivery fee,
                it appears on the line item where it belongs, attributed to the
                brand that incurred it.
              </p>
              <p className="text-body-sm">
                For the full breakdown of how weekly invoicing works, see the{" "}
                <Link href="/help/centre/billing" className="text-accent hover:underline">
                  Billing &amp; Invoices guide
                </Link>{" "}
                in the Help Centre.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="onboarding" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              7. Onboarding: what getting set up looks like
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                The onboarding process is handled by ITD&apos;s implementation
                team. For most 3PLs, setup follows four steps:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong className="text-text-primary">Scoping call.</strong>{" "}
                  ITD maps your current carrier setup, client structure, and WMS
                  integration requirements.
                </li>
                <li>
                  <strong className="text-text-primary">Connexx integration.</strong>{" "}
                  The technical connection between your WMS or OMS and the
                  Connexx platform. ITD&apos;s team runs the integration; your IT
                  team provides access.
                </li>
                <li>
                  <strong className="text-text-primary">Child ID setup.</strong>{" "}
                  Your existing clients are set up as child accounts. Carrier
                  allocation and label configuration are done at this stage.
                </li>
                <li>
                  <strong className="text-text-primary">Go-live and handover.</strong>{" "}
                  Live testing, sign-off, and handover to your dedicated account
                  manager for ongoing support.
                </li>
              </ul>
              <p>
                For most 3PLs, the process takes two to four weeks depending on
                integration complexity and the number of brands to configure. ITD
                manages the project from scoping through to go-live.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="commercial-model" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              8. The commercial model
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                ITD doesn&apos;t require volume commitments or minimum contract
                terms. You&apos;re not locked into a monthly or annual minimum,
                and you don&apos;t renegotiate when your volumes change.
              </p>
              <p>
                You can scale up as you bring on new brands, scale down if a
                client leaves, and add carriers to the mix at any point. None of
                those changes require a contract amendment.
              </p>
              <p>
                The model is designed to work with how a 3PL&apos;s client base
                moves. Client wins and losses are unpredictable. ITD&apos;s
                commercial structure reflects that.
              </p>
            </div>
          </section>
        </div>
      </article>

      {/* FAQ */}
      <section id="faq" className="bg-bg-secondary py-16 md:py-20 border-t border-border scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-2 text-center">
              Frequently asked questions
            </h2>
            <p className="text-text-secondary text-center mb-10">
              The questions 3PLs ask most before a scoping call.
            </p>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <ScrollReveal key={item.question} delay={i * 0.04}>
                <details className="group bg-white rounded-xl border border-border p-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <h3 className="text-heading-sm text-text-primary">{item.question}</h3>
                  </summary>
                  <p className="mt-3 text-body-sm text-text-secondary">{item.answer}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related resources */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-4">Related resources</p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/solutions/3pl"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    How Connexx supports 3PLs
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/case-studies?solution=3pl"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    3PL customer stories
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/help/centre/billing"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    Billing &amp; Invoices — how weekly billing works
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">
              Want to see how it works for your operation?
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              ITD works with 3PLs across the UK, from single-site operations to
              multi-client fulfilment centres. Talk to the team about your
              current setup and what a partnership could look like.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact?enquiry=3pl"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Get in touch with the ITD team
              </Link>
              <Link
                href="/solutions/3pl"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Explore the 3PL solution
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
