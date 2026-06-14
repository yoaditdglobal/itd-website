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
  title: "Fulfilled by Merchant (FBM) on Amazon: UK guide",
  description:
    "The operator's guide to FBM on Amazon UK. Buy Box, dispatch metrics, Buy Shipping, carrier choice, and how Seller Fulfilled Prime actually works in 2026.",
  path: "/resources/guides/fbm",
});

const PATH = "/resources/guides/fbm";
const UPDATED = "20 May 2026";
const UPDATED_ISO = "2026-05-20";

const sections = [
  { id: "fbm-vs-fba", label: "1. FBM vs FBA: when to choose which" },
  { id: "metrics", label: "2. The four Amazon FBM metrics that matter" },
  { id: "buy-shipping", label: "3. Buy Shipping through Amazon: what it protects" },
  { id: "carriers", label: "4. Carrier selection for FBM" },
  { id: "labels", label: "5. Label format and tracking number compliance" },
  { id: "sfp", label: "6. Seller Fulfilled Prime: requirements and audit" },
  { id: "scale", label: "7. Managing FBM at scale" },
  { id: "platform", label: "8. Where a multi-carrier platform fits in" },
  { id: "faq", label: "FAQ" },
];

const faqs = [
  {
    question: "What is the difference between FBM and FBA?",
    answer:
      "FBM (Fulfilled by Merchant) means you store, pick, pack, and ship Amazon orders yourself or through a 3PL and choose your own carrier. FBA (Fulfilled by Amazon) means Amazon stores your inventory and fulfils every order on your behalf, charging per-unit fulfilment and storage fees. FBA usually wins for fast-moving small items. FBM usually wins for slow-moving, oversize, or multi-channel SKUs.",
  },
  {
    question: "Does Amazon Buy Shipping protect my metrics?",
    answer:
      "Yes, mostly. If you ship through Amazon Buy Shipping and confirm dispatch by the deadline, Amazon protects your Late Shipment Rate, Valid Tracking Rate, and On-Time Delivery Rate even if the carrier is delayed. The protection only covers Buy Shipping bookings. Orders shipped through external label sources are measured on actual performance.",
  },
  {
    question: "What is Late Shipment Rate and how is it calculated?",
    answer:
      "Late Shipment Rate (LSR) is the percentage of FBM orders confirmed shipped after the dispatch deadline. Amazon calculates LSR over both a 10-day and a 30-day window. The threshold is below 4% in each. Above 4% triggers an account review and can lead to suspension. The clock starts when the order is placed and stops when you confirm dispatch in Seller Central.",
  },
  {
    question: "Can I use my own carrier for FBM orders?",
    answer:
      "Yes. FBM allows any carrier you choose, as long as the carrier delivers on time and provides a valid tracking number Amazon can verify. The practical constraint is Valid Tracking Rate. Smaller regional couriers often lack the Amazon scan-event integration, which means tracking will fail VTR even with a valid number. Royal Mail, DPD, Evri, Parcelforce, DHL Parcel UK, Yodel, and Amazon Shipping all integrate.",
  },
  {
    question: "What is Seller Fulfilled Prime and how do I qualify?",
    answer:
      "Seller Fulfilled Prime (SFP) lets FBM sellers display the Prime badge while dispatching from their own warehouse. To qualify, you complete a trial period during which Amazon audits performance. The headline requirements are On-Time Delivery Rate above 99%, Valid Tracking Rate above 99%, Cancel Rate below 0.5%, weekend dispatch, and use of approved carriers via Buy Shipping.",
  },
  {
    question: "Do I need a multi-carrier shipping platform for FBM?",
    answer:
      "It depends on volume and channel mix. Under 50 orders a day on Amazon alone, Buy Shipping is usually enough. Above 200 orders a day or across multiple marketplaces, a multi-carrier platform stops being a luxury. The platform covers what Buy Shipping does not and consolidates the dispatch queue across Amazon, eBay, Etsy, TikTok Shop, and your own store.",
  },
  {
    question: "What carriers count for Amazon Valid Tracking Rate in the UK?",
    answer:
      "Royal Mail Tracked 24, Royal Mail Tracked 48, Royal Mail Signed, DPD Next Day and Standard, Evri Standard and Next Day, Parcelforce Express24 and Express48, DHL Parcel UK, Yodel B2C 24 and B2C 48, and Amazon Shipping all push valid tracking events back to Amazon. Untracked services cannot meet VTR. Smaller regional couriers may have valid tracking numbers but lack the Amazon scan-event integration.",
  },
  {
    question: "How do I keep my Amazon On-Time Delivery Rate above 97%?",
    answer:
      "Three things move the needle. First, set realistic handling time on your listings. If your warehouse closes at 16:00 and orders arriving after 14:00 ship the next day, set handling time to one working day rather than same-day. Second, route to a carrier whose published transit time matches the delivery promise. Third, monitor OTDR weekly, not monthly, so a bad week does not become a bad quarter.",
  },
];

export default function FbmGuidePage() {
  const jsonLd = [
    articleSchema({
      headline: "Fulfilled by Merchant (FBM) on Amazon: the UK seller's guide",
      description:
        "The operator's guide to FBM on Amazon UK. Buy Box, dispatch metrics, Buy Shipping, carrier choice, and how Seller Fulfilled Prime actually works in 2026.",
      path: PATH,
      datePublished: UPDATED_ISO,
      dateModified: UPDATED_ISO,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources/case-studies" },
      { name: "Guides", path: "/resources/guides" },
      { name: "Fulfilled by Merchant (FBM)", path: PATH },
    ]),
    faqSchema(faqs),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReadingProgress />

      {/* Hero */}
      <section className="bg-white py-16 md:py-20">
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
                Marketplace
              </span>
            </div>
            <h1 className="text-display-xl text-text-primary">
              Fulfilled by Merchant on Amazon: the UK seller&apos;s guide.
            </h1>
            <p className="mt-5 text-body-lg text-text-secondary">
              A working guide for UK Amazon sellers running their own dispatch instead of FBA. The metrics that get you suspended, the carriers that keep you compliant, the workflow that scales past 1,000 orders a day, and how Seller Fulfilled Prime actually works in 2026.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-text-tertiary">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Last updated {UPDATED}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 16 minute read
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
              This guide is for Amazon sellers running FBM (Fulfilled by Merchant), marketplace sellers who dispatch across Amazon plus other platforms, and 3PLs handling client FBM volume. If you are watching your Late Shipment Rate creep towards 4% and Amazon&apos;s seller performance team has started sending warnings, you are the reader we wrote this for. We assume you already know what an ASIN is and have shipped at least one order this week.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* TL;DR */}
      <section className="bg-white pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="border-l-4 border-accent bg-accent-light/40 rounded-r-xl p-6">
              <p className="text-eyebrow text-accent mb-3">The TL;DR</p>
              <p className="text-text-primary leading-relaxed">
                Fulfilled by Merchant (FBM) on Amazon means you handle dispatch yourself instead of using FBA. Winning at FBM requires keeping Late Shipment Rate under 4%, Cancel Rate under 2.5%, Valid Tracking Rate above 95%, and On-Time Delivery Rate above 97%. Buy Shipping through Amazon protects your LSR and VTR if you ship by the cut-off. Royal Mail Tracked 24, Royal Mail Tracked 48, DPD Next Day, and Evri Standard are the four UK carriers most Amazon sellers route through. Seller Fulfilled Prime requires hitting tighter thresholds (99% on-time, 99% Valid Tracking, weekend dispatch) and using approved carriers. The manual workflow breaks at around 50 orders a day per operator. This guide covers each decision with the actual thresholds.
              </p>
            </div>
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
          <section id="fbm-vs-fba" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              1. FBM vs FBA: when to choose which
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                The FBM versus FBA decision usually gets reduced to &ldquo;FBA for speed, FBM for control&rdquo;. That is the headline but it misses the cost maths.
              </p>
              <p>
                FBA (Fulfilled by Amazon) means Amazon stores your inventory, picks, packs, and ships every order. You pay storage fees per cubic foot per month, fulfilment fees per unit shipped, and additional fees for long-term storage, removal orders, and oversize items. The fulfilment fee for a small standard item under 500g is typically around £2.80 in 2026. The storage fee is around £21 per cubic metre per month off-peak, rising to £37 in Q4.
              </p>
              <p>
                FBM means you store the inventory yourself (or pay a 3PL to do it), you pick and pack the order, and you select the carrier. Your costs are your warehouse rent or 3PL fees, your labour cost per pick, your packaging, and your carrier rates. For most UK sellers shipping under 2kg domestic, Royal Mail Tracked 48 lands the order for £2.50 to £3.50 depending on volume.
              </p>
              <p>
                The cost cross-over depends on three variables. Storage velocity (how long stock sits before selling), unit weight (FBA fees scale steeply above 1kg), and SKU count (each SKU adds a removal cost if it does not sell). High-velocity small-and-light SKUs almost always work out cheaper on FBA. Low-velocity, oversize, or high-value SKUs almost always work out cheaper on FBM. The middle is where seller judgement matters.
              </p>
              <p>A few situations where FBM wins regardless of the maths:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong className="text-text-primary">Multi-channel inventory.</strong> Selling the same SKU on Amazon, eBay, your own Shopify store, and TikTok Shop. Single-pool inventory through FBM avoids the duplicate stock you need under FBA to cover the Amazon channel.
                </li>
                <li>
                  <strong className="text-text-primary">Restricted products.</strong> Some product categories Amazon does not accept into FBA, or accepts at heavy fee premiums.
                </li>
                <li>
                  <strong className="text-text-primary">Bundles and configured products.</strong> Configurable items (build-to-order, monogrammed, made-to-measure) cannot be pre-stocked at an FBA warehouse.
                </li>
                <li>
                  <strong className="text-text-primary">Margin-thin commodity SKUs.</strong> A £4.99 SKU at 30% margin cannot absorb a £2.80 FBA fulfilment fee.
                </li>
                <li>
                  <strong className="text-text-primary">Seller Fulfilled Prime.</strong> You qualify for the Prime badge while keeping FBM economics, if you can hit the metrics.
                </li>
              </ul>
              <p>
                The Velocity Sellers case study on this site illustrates a real outcome: an FBM-heavy seller eliminated £12,000 a month in penalty fees by reorganising their dispatch around the right metrics. The seller did not move to FBA. They fixed the FBM workflow.
              </p>
            </div>
          </section>

          {/* Section 2 — Metrics callout */}
          <section id="metrics" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              2. The four Amazon FBM metrics that matter
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Amazon measures FBM seller performance on roughly twelve metrics in Seller Central. Four of them determine whether you keep selling.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border-2 border-accent/30 bg-accent-light/20">
              <table className="w-full text-sm">
                <thead className="bg-accent-light text-text-primary">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Metric</th>
                    <th className="px-4 py-3 text-left font-semibold">Threshold</th>
                    <th className="px-4 py-3 text-left font-semibold">What it measures</th>
                    <th className="px-4 py-3 text-left font-semibold">Below threshold triggers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Late Shipment Rate (LSR)</td>
                    <td className="px-4 py-3 font-semibold text-accent">Below 4%</td>
                    <td className="px-4 py-3">Orders confirmed shipped after the dispatch deadline</td>
                    <td className="px-4 py-3">Account review, suspension if sustained</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Pre-Fulfilment Cancel Rate</td>
                    <td className="px-4 py-3 font-semibold text-accent">Below 2.5%</td>
                    <td className="px-4 py-3">Orders cancelled by the seller before shipment</td>
                    <td className="px-4 py-3">Account review, listing suppressions</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Valid Tracking Rate (VTR)</td>
                    <td className="px-4 py-3 font-semibold text-accent">Above 95%</td>
                    <td className="px-4 py-3">Orders with a valid tracking number that scans</td>
                    <td className="px-4 py-3">Loss of Prime, account review</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">On-Time Delivery Rate (OTDR)</td>
                    <td className="px-4 py-3 font-semibold text-accent">Above 97%</td>
                    <td className="px-4 py-3">Orders delivered on or before the estimated delivery date</td>
                    <td className="px-4 py-3">Account review, loss of Prime</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>A few operator notes on each.</p>
              <p>
                <strong className="text-text-primary">Late Shipment Rate (LSR).</strong> Calculated over both the trailing 10-day and 30-day windows. The 4% threshold is per window. A single bad batch can spike the 10-day rate even if the 30-day rate looks healthy. The clock starts when the order is placed and ends when you confirm dispatch in Seller Central. Confirming dispatch a day late counts as a late shipment even if the parcel arrives on time.
              </p>
              <p>
                <strong className="text-text-primary">Pre-Fulfilment Cancel Rate.</strong> Almost entirely driven by stock-outs. The fix is inventory hygiene, not dispatch. If you list a SKU on Amazon, the SKU has to be in stock or marked unavailable before an order comes in.
              </p>
              <p>
                <strong className="text-text-primary">Valid Tracking Rate (VTR).</strong> A tracking number is valid if it scans through a carrier&apos;s tracking system within 48 hours of the dispatch confirmation. Royal Mail, DPD, Evri, Amazon Shipping, and Parcelforce all push scan events back to Amazon through approved feeds. Untracked services (Royal Mail Second Class without tracking) cannot meet VTR. If you use them on Amazon orders, VTR drops below 95%.
              </p>
              <p>
                <strong className="text-text-primary">On-Time Delivery Rate (OTDR).</strong> Measures whether the parcel was scanned as delivered on or before the estimated delivery date Amazon shows the buyer. This is the metric most exposed to carrier variability. Amazon&apos;s estimated delivery date factors in your handling time and the carrier&apos;s typical transit time. A carrier delay you cannot control still affects your OTDR.
              </p>
              <p>
                The thresholds above are public Amazon policy as of May 2026. Amazon publishes them in Seller Central under Performance &gt; Customer Service Performance. Each metric has its own dashboard.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="buy-shipping" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              3. Buy Shipping through Amazon: what it protects
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Amazon Buy Shipping is a label-purchasing service inside Seller Central. You select the order, choose a carrier and service from Amazon&apos;s pre-approved list, and Amazon generates the label. The label is paid for through your seller account.
              </p>
              <p>The compelling part of Buy Shipping is what it protects.</p>
              <p>
                If you ship every order through Buy Shipping by the dispatch deadline, Amazon takes responsibility for:
              </p>
              <div className="mt-4 space-y-3">
                <div className="bg-bg-secondary rounded-xl border border-border p-4">
                  <p className="text-heading-sm text-text-primary mb-1">LSR protection.</p>
                  <p className="text-body-sm text-text-secondary">
                    Confirmed shipped through Buy Shipping by the deadline = not a late shipment, regardless of carrier delay.
                  </p>
                </div>
                <div className="bg-bg-secondary rounded-xl border border-border p-4">
                  <p className="text-heading-sm text-text-primary mb-1">VTR protection.</p>
                  <p className="text-body-sm text-text-secondary">
                    Tracking numbers from Buy Shipping are valid by definition. The tracking event feed is wired into Seller Central automatically.
                  </p>
                </div>
                <div className="bg-bg-secondary rounded-xl border border-border p-4">
                  <p className="text-heading-sm text-text-primary mb-1">OTDR protection.</p>
                  <p className="text-body-sm text-text-secondary">
                    Buy Shipping bookings carry an Amazon estimated delivery date that aligns with the carrier&apos;s published transit time. OTDR is calculated against that date, so a carrier delay does not automatically penalise you.
                  </p>
                </div>
              </div>
              <p>What Buy Shipping does not do:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-4">
                <li>Give you the best rate. Buy Shipping rates are negotiated by Amazon and are reasonable but not always the cheapest option on the market.</li>
                <li>Cover non-Amazon orders. Your eBay, Etsy, TikTok Shop, and Shopify orders are not in Buy Shipping.</li>
                <li>Handle multi-piece or palletised shipments cleanly. Buy Shipping is built for parcels.</li>
                <li>Cover specialised services. Premium delivery, Saturday delivery, or specific carrier services that are not in Amazon&apos;s pre-approved list.</li>
              </ul>
              <p>
                The headline carriers in UK Buy Shipping are Royal Mail (Tracked 24, Tracked 48, Signed), Amazon Shipping, DPD, Evri, and DHL Parcel UK. The exact list and rates vary by seller, account size, and time. For most UK Amazon sellers, Buy Shipping covers around 80% of orders effectively. The remaining 20% (multi-piece, premium services, non-UK destinations) need a different carrier route.
              </p>
              <p>
                A third-party multi-carrier shipping platform sits alongside Buy Shipping rather than replacing it. The pattern most professional sellers use: Buy Shipping for the standard Amazon-domestic orders, a multi-carrier platform for the edge cases and the other marketplaces.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="carriers" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              4. Carrier selection for FBM
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                There are five carrier choices that cover almost all UK domestic FBM volume. Each one matches a different combination of weight, speed, and Amazon listing promise.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-primary">
                  <tr>
                    <th className="px-3 py-3 text-left font-semibold">Carrier service</th>
                    <th className="px-3 py-3 text-left font-semibold">Price band (1kg)</th>
                    <th className="px-3 py-3 text-left font-semibold">Delivery</th>
                    <th className="px-3 py-3 text-left font-semibold">Best for</th>
                    <th className="px-3 py-3 text-left font-semibold">Metric notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">Royal Mail Tracked 48</td>
                    <td className="px-3 py-3">£2.50–£3.50</td>
                    <td className="px-3 py-3">2-3 working days</td>
                    <td className="px-3 py-3">Standard FBM under 2kg, low-value</td>
                    <td className="px-3 py-3">VTR-compliant, LSR-compliant</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">Royal Mail Tracked 24</td>
                    <td className="px-3 py-3">£3.50–£4.50</td>
                    <td className="px-3 py-3">1-2 working days</td>
                    <td className="px-3 py-3">Expedited FBM, fast-shipping items</td>
                    <td className="px-3 py-3">VTR, LSR, SFP-eligible</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">Royal Mail Signed</td>
                    <td className="px-3 py-3">£4.50–£6.00</td>
                    <td className="px-3 py-3">1-2 working days</td>
                    <td className="px-3 py-3">High-value, compensation tier</td>
                    <td className="px-3 py-3">VTR-compliant</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">DPD Next Day</td>
                    <td className="px-3 py-3">£5.50–£7.50</td>
                    <td className="px-3 py-3">Next working day</td>
                    <td className="px-3 py-3">Expedited, parcels above 2kg, SFP</td>
                    <td className="px-3 py-3">VTR, LSR, SFP-eligible</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">Evri Standard</td>
                    <td className="px-3 py-3">£2.30–£3.20</td>
                    <td className="px-3 py-3">2-4 working days</td>
                    <td className="px-3 py-3">Sub-£10 items, weight-sensitive</td>
                    <td className="px-3 py-3">VTR-compliant, OTDR risk at peak</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">Amazon Shipping</td>
                    <td className="px-3 py-3">£2.50–£4.50</td>
                    <td className="px-3 py-3">Next day or 2-day</td>
                    <td className="px-3 py-3">Amazon orders qualifying for Amazon Shipping</td>
                    <td className="px-3 py-3">All metrics protected via Buy Shipping</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">Parcelforce Express24</td>
                    <td className="px-3 py-3">£6.50–£9.00</td>
                    <td className="px-3 py-3">Next working day</td>
                    <td className="px-3 py-3">Heavy parcels (over 5kg), business addresses</td>
                    <td className="px-3 py-3">VTR-compliant</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                Price bands are illustrative and dependent on volume, account, and surcharges. Highlands &amp; Islands, Channel Islands, and Northern Ireland all attract surcharges. Verify your own rate card.
              </p>
              <p>
                The decision logic. The right carrier choice for an FBM order is a function of three variables: the listing&apos;s promised dispatch speed, the parcel weight and dimensions, and the destination postcode.
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-4">
                <li>A 200g sub-£10 item listed as &ldquo;Standard delivery 3-5 working days&rdquo; goes Evri Standard or Royal Mail Tracked 48.</li>
                <li>A 500g item listed as &ldquo;Expedited 1-2 working days&rdquo; goes Royal Mail Tracked 24.</li>
                <li>A 3kg item to a residential address listed as &ldquo;Next-day&rdquo; goes DPD Next Day.</li>
                <li>A 200g item to a Highlands &amp; Islands postcode listed as &ldquo;Standard&rdquo; goes Royal Mail Tracked 48 (the only carrier without an out-of-area surcharge at that weight).</li>
              </ul>
              <p>
                The mistake most FBM sellers make is to default to a single carrier across all SKUs and listings. Royal Mail Tracked 48 works for the £5 cable but is overkill for the £30 sneaker listed as next-day. Rate shopping per order against your active carriers is the lever that controls dispatch cost on FBM at scale.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="labels" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              5. Label format and tracking number compliance
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Amazon enforces label format requirements through its Buy Shipping integration and through the tracking number formats it accepts in Seller Central. Get this wrong and you trigger Valid Tracking Rate failures, which lead to Prime suspensions and account reviews.
              </p>
              <p>The technical requirements.</p>
              <p>
                <strong className="text-text-primary">Tracking number format.</strong> Each approved carrier has a published tracking number format. Royal Mail Tracked 24/48 use a 13-character alphanumeric format (XX123456789GB). DPD uses a 14-digit numeric format. Amazon Shipping uses a TBA prefix followed by 13 digits. If you upload a tracking number that does not match the expected carrier format, Seller Central rejects it and the order shows as untracked. Untracked orders drop your VTR.
              </p>
              <p>
                <strong className="text-text-primary">Carrier selection in Seller Central.</strong> When you mark an order as shipped outside Buy Shipping, you select a carrier from the drop-down. That carrier has to match the tracking number format. Marking an order as &ldquo;Royal Mail&rdquo; while uploading a DPD tracking number is one of the most common causes of VTR failures.
              </p>
              <p>
                <strong className="text-text-primary">Scan events.</strong> Valid tracking requires the carrier to push scan events back to Amazon. Major UK carriers do this through approved EDI feeds. If you use a smaller carrier that does not have an Amazon integration, the tracking number may be technically valid but the scan events will not flow back, and VTR drops accordingly. Royal Mail, DPD, Evri, Parcelforce, DHL Parcel UK, Yodel, and Amazon Shipping all integrate. Smaller regional couriers often do not.
              </p>
              <p>
                <strong className="text-text-primary">Label format requirements.</strong> Some Amazon programmes (notably Seller Fulfilled Prime) require specific label formats with the Prime branding. Standard FBM does not require Prime-branded labels but the address block has to be legible, the tracking barcode has to scan, and the carrier-specific information block has to be present and correct. Carrier label PDFs printed at the wrong size (A4 instead of 4x6, or 4x6 instead of 4x4) cause carrier rejections at the depot.
              </p>
              <p>
                The operator pattern that works. Use Buy Shipping for everything you can. For the orders Buy Shipping cannot handle, generate the label through a multi-carrier platform that abstracts the per-carrier format differences. Print the label in the format the carrier requires. Write the tracking number back into Seller Central through the Amazon Selling Partner API rather than the manual upload screen, which is the most common source of typos.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="sfp" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              6. Seller Fulfilled Prime: requirements and audit
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Seller Fulfilled Prime (SFP) is Amazon&apos;s programme that lets FBM sellers display the Prime badge on their listings without using FBA. The seller fulfils the order themselves but commits to Prime-level delivery speed and service. It is the most demanding FBM programme Amazon runs.
              </p>
              <p>The headline requirements as published by Amazon in 2026:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong className="text-text-primary">Delivery speed.</strong> Standard Prime offers Two-Day and Next Day delivery options on listings. SFP sellers must offer at least one Prime-eligible speed.
                </li>
                <li>
                  <strong className="text-text-primary">Dispatch metrics.</strong> On-Time Delivery Rate above 99%, Valid Tracking Rate above 99%, and Cancel Rate below 0.5%.
                </li>
                <li>
                  <strong className="text-text-primary">Weekend dispatch.</strong> Saturday dispatch (and Sunday in some markets) is required, not optional.
                </li>
                <li>
                  <strong className="text-text-primary">Approved carrier list.</strong> SFP shipments must use Amazon-approved carriers and services. In the UK that is typically Royal Mail Tracked 24, Royal Mail Special Delivery, DPD Next Day, and Amazon Shipping.
                </li>
                <li>
                  <strong className="text-text-primary">Buy Shipping use.</strong> SFP shipments must be booked through Buy Shipping (or an equivalent Amazon-approved automated label source).
                </li>
                <li>
                  <strong className="text-text-primary">Trial period.</strong> New SFP applicants serve a trial period (typically 30 days at the time of writing) during which Amazon audits performance against the metrics. Falling below threshold during the trial means re-application.
                </li>
              </ul>
              <p>
                The economics of SFP. The Prime badge typically increases conversion on a listing by a material margin, varying widely by category. Sellers stay in SFP because the conversion uplift outweighs the cost of the tighter operational requirements. Sellers leave SFP because they cannot sustain the metrics at peak (Black Friday, Christmas) and would rather drop the badge than risk a permanent suspension.
              </p>
              <p>
                The audit risk. Amazon runs continuous performance audits of SFP sellers. Falling below any of the headline metrics for a sustained period triggers a review that can lead to removal from the programme. The recovery path from an SFP suspension is long and not always successful. The operational discipline required to maintain SFP is the same discipline that protects standard FBM seller status: real-time order routing, automated carrier selection by service type, tracking write-back via the API rather than manual upload, and continuous metric monitoring.
              </p>
              <p>
                For a high-volume seller, SFP is the highest-performing form of FBM. For a seller without the workflow to support 99% OTDR consistently, SFP is a fast route to a suspension. The honest answer to &ldquo;should we apply for SFP&rdquo; is usually: get your standard FBM metrics to consistent 98% first, then apply.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="scale" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              7. Managing FBM at scale
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                The manual FBM workflow breaks at predictable volumes. Knowing where the breakpoints sit helps you plan the next tool change before the metrics start sliding.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-primary">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Daily order volume</th>
                    <th className="px-4 py-3 text-left font-semibold">Typical workflow</th>
                    <th className="px-4 py-3 text-left font-semibold">Where it breaks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Up to 50/day</td>
                    <td className="px-4 py-3">One operator logs into Seller Central, prints Buy Shipping labels manually, packs, ships.</td>
                    <td className="px-4 py-3">Holiday cover. One sick day and the dispatch deadline slips.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">50 to 200/day</td>
                    <td className="px-4 py-3">Two operators sharing Seller Central, batch label printing through Buy Shipping, basic SKU-to-bin mapping.</td>
                    <td className="px-4 py-3">Cross-channel orders. Amazon orders get the Buy Shipping workflow but eBay and Etsy go through different label processes.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">200 to 1,000/day</td>
                    <td className="px-4 py-3">A WMS or order management system (Linnworks, Selro, Veeqo, Mintsoft) handling cross-marketplace order import and label generation.</td>
                    <td className="px-4 py-3">Carrier selection logic. A WMS without rate shopping defaults to one carrier per channel.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">1,000+/day</td>
                    <td className="px-4 py-3">Order management system, multi-carrier platform for label generation, dedicated dispatch team, possibly 3PL outsourcing.</td>
                    <td className="px-4 py-3">Workflow ownership. The seller stops being the operator and starts being the workflow designer.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                The transitions are not just about volume. They are about how many marketplaces you are on, how many carriers you are using, and how variable your SKU mix is. A seller doing 800 orders a day on Amazon alone with three SKUs is a simpler operation than a seller doing 300 orders a day across Amazon, eBay, Etsy, TikTok Shop, and their own Shopify store with 200 SKUs.
              </p>
              <p>
                The dispatch deadline is the operational anchor. Most Amazon orders carry a same-day-dispatch promise if placed before a 14:00 or 16:00 cut-off. eBay and Etsy have their own cut-offs. Every order in the queue has a deadline, and every deadline missed counts against the relevant marketplace&apos;s late shipment metric. As the marketplace count grows, the deadline mix gets harder to track manually. This is where the SLA-aware dispatch logic in a multi-carrier platform stops being a nice-to-have and starts being load-bearing.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="platform" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              8. Where a multi-carrier platform fits in
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                A multi-carrier shipping platform like Connexx is not a replacement for Amazon Buy Shipping. It complements Buy Shipping by covering everything Buy Shipping does not.
              </p>
              <p>What a multi-carrier platform adds to an FBM workflow:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong className="text-text-primary">Cross-marketplace dispatch in one queue.</strong> Amazon, eBay, Etsy, TikTok Shop, Temu, OnBuy, and your own Shopify store flow into a single dispatch queue with each order&apos;s SLA deadline visible. No tab switching.
                </li>
                <li>
                  <strong className="text-text-primary">Rate shopping for non-Buy-Shipping orders.</strong> When Buy Shipping does not cover a service (premium delivery, multi-piece, international), the platform compares the active carriers and selects the cheapest compliant option. Royal Mail, DPD, Evri, Parcelforce, DHL Parcel UK, Amazon Shipping, and others.
                </li>
                <li>
                  <strong className="text-text-primary">SLA-aware routing.</strong> The platform knows each marketplace&apos;s dispatch deadline (Amazon&apos;s 16:00 cut-off, eBay&apos;s varies by listing) and surfaces the orders against their deadlines.
                </li>
                <li>
                  <strong className="text-text-primary">Label format abstraction.</strong> One label format on the print queue. The platform handles the per-carrier label format conversion behind the scenes.
                </li>
                <li>
                  <strong className="text-text-primary">Tracking write-back.</strong> Tracking numbers flow back to Amazon, eBay, and the other marketplaces via API. The Valid Tracking Rate and equivalent metrics on other platforms stay clean without manual upload.
                </li>
                <li>
                  <strong className="text-text-primary">Penalty fee traceability.</strong> When a penalty fee invoice lands, the platform can trace the cause back to the specific shipment, carrier, and SLA breach in minutes rather than hours.
                </li>
              </ul>
              <p>
                The Velocity Sellers case study illustrates the outcome. A multi-marketplace seller hitting £12,000 a month in penalty fees moved their dispatch onto a single multi-carrier workflow. Penalty fees dropped to zero. Fulfilment time dropped from 72 hours to 24 hours. Seller ratings went from 94% to 99.2%. The seller did not move to FBA. They fixed the FBM workflow.
              </p>
              <p>
                For more on how this works in practice, see <Link href="/solutions/marketplace-seller" className="text-accent hover:underline">our marketplace seller solution page</Link>.
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
              The answers most FBM sellers ask before booking a workflow review.
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
                  href="/solutions/marketplace-seller"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    How Connexx supports marketplace sellers
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping/domestic"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    Domestic shipping setup
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/case-studies/west-ham-united"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    Velocity Sellers case study
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations/carriers/amazon-shipping"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    Amazon Shipping integration
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
              Running FBM on Amazon at volume?
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              Connexx covers the orders Buy Shipping does not, routes across every marketplace from one queue, and writes tracking back to Amazon, eBay, Etsy, and TikTok Shop automatically. Velocity Sellers eliminated £12,000 a month in penalty fees on the same setup.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/solutions/marketplace-seller"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                See how Connexx keeps your FBM metrics safe
              </Link>
              <Link
                href="/resources/case-studies/west-ham-united"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Read the Velocity Sellers case study
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
