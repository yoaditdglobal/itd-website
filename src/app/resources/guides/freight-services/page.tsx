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
  title: "Freight Services: a working guide for UK clients",
  description:
    "Moving goods internationally by air or sea: choosing your mode, FCL vs LCL, consolidation, EORI, HS codes, CDS clearance, Incoterms, and the customs holds that catch new importers.",
  path: "/resources/guides/freight-services",
});

const PATH = "/resources/guides/freight-services";
const UPDATED = "23 June 2026";
const UPDATED_ISO = "2026-06-23";

const sections = [
  { id: "modes", label: "1. Air and sea freight: the two modes" },
  { id: "fcl-lcl", label: "2. Sea freight: FCL vs LCL" },
  { id: "consolidation", label: "3. Consolidation: how LCL shipments work" },
  { id: "eori", label: "4. Your EORI number" },
  { id: "tariff", label: "5. The UK Global Tariff and HS codes" },
  { id: "cds", label: "6. CDS customs declarations" },
  { id: "incoterms", label: "7. Incoterms" },
  { id: "holds", label: "8. Common holds and how to avoid them" },
  { id: "who-does-what", label: "9. Who does what: forwarders, brokers, NVOCCs" },
  { id: "tracking", label: "10. Tracking" },
  { id: "faq", label: "FAQ" },
];

const faqs = [
  {
    question: "How do I know whether to use air or sea?",
    answer:
      "Volume and urgency. Sea freight takes 30-50 days but is significantly cheaper than air for larger shipments. Air is faster (7-12 days) but costs more. Most businesses use sea as the default and reserve air for genuine emergencies or time-sensitive lines. If you are under 100 kg, express courier usually beats dedicated air freight once you factor in broker fees.",
  },
  {
    question: "What's the difference between LCL and FCL?",
    answer:
      "LCL (Less than Container Load) means your cargo shares a container with other shippers. You pay per CBM. FCL (Full Container Load) means you buy the whole container. LCL makes sense under 12-15 CBM; above that, FCL is usually cheaper per cubic metre and avoids the extra CFS handling time.",
  },
  {
    question: "What is consolidation and why does the cut-off matter?",
    answer:
      "Consolidation is how LCL freight works: your cargo is grouped with other shippers' goods into one container. The CFS cut-off is the deadline for your cargo to arrive at the origin warehouse before it is loaded. Miss it and your goods wait for the next vessel, typically a week later. ITD will send you the cut-off date when you book.",
  },
  {
    question: "Do I need to arrange my own customs broker?",
    answer:
      "No. ITD's freight service includes CDS customs clearance. You won't need to appoint a separate broker or manage the declaration yourself.",
  },
  {
    question: "What is an EORI number and do I need one?",
    answer:
      "Yes. You can't import commercial goods into the UK without one. If you're VAT-registered, it's your VAT number prefixed GB and suffixed 000. If not, HMRC issues one free at gov.uk/eori, usually within 5 working days.",
  },
  {
    question: "What Incoterms should I use?",
    answer:
      "FOB is the standard for sea freight from China. It means the supplier is responsible until the goods are loaded at the origin port, and you control everything from there. EXW is common for air freight. Avoid DDP unless you've checked exactly what duty rate the supplier is calculating — it's usually built into the product price.",
  },
  {
    question: "How will I know where my shipment is?",
    answer:
      "ITD sends automated updates each time the vessel or flight status changes, from departure through to UK delivery. For LCL shipments, your House Bill of Lading number is the reference until the container is deconsolidated at the UK CFS. After that, ITD updates you directly.",
  },
];

export default function FreightServicesGuidePage() {
  const jsonLd = [
    articleSchema({
      headline: "Freight Services: a working guide for UK clients",
      description:
        "Moving goods internationally by air or sea: choosing your mode, FCL vs LCL, consolidation, EORI, HS codes, CDS clearance, Incoterms, and the customs holds that catch new importers.",
      path: PATH,
      datePublished: UPDATED_ISO,
      dateModified: UPDATED_ISO,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources/case-studies" },
      { name: "Guides", path: "/resources/guides" },
      { name: "Freight Services", path: PATH },
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
                Freight
              </span>
            </div>
            <h1 className="text-display-xl text-text-primary">
              Freight Services: a working guide for UK clients.
            </h1>
            <p className="mt-5 text-body-lg text-text-secondary">
              What you need to know about moving goods internationally by air or
              sea: from choosing your mode to clearing UK customs, with no
              unnecessary jargon.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-text-tertiary">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Last updated {UPDATED}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 12 minute read
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
              UK transport teams, eCommerce brands sourcing from Asia, and 3PLs
              handling inbound flows. If your shipments have outgrown courier
              pricing and you&apos;re looking at freight for the first time, or you
              want to understand the process better, this guide covers what
              matters.
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
          <section id="modes" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              1. Air and sea freight: the two modes
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                ITD primarily moves freight by air and sea. The right choice
                depends on volume, lead time, and how much working capital you
                can tie up in stock in transit.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-primary">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Mode</th>
                    <th className="px-4 py-3 text-left font-semibold">Lead time</th>
                    <th className="px-4 py-3 text-left font-semibold">Best for</th>
                    <th className="px-4 py-3 text-left font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Air freight</td>
                    <td className="px-4 py-3">7-12 days</td>
                    <td className="px-4 py-3">100 kg-1,000 kg, time-sensitive restocks</td>
                    <td className="px-4 py-3">Typically EXW from China</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Sea LCL</td>
                    <td className="px-4 py-3">35-50 days</td>
                    <td className="px-4 py-3">1-15 CBM, smaller or first shipments</td>
                    <td className="px-4 py-3">Consolidated with other shippers. See Section 3.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Sea FCL</td>
                    <td className="px-4 py-3">30-45 days</td>
                    <td className="px-4 py-3">Full 20 ft (33 CBM) or 40 ft (67 CBM) containers</td>
                    <td className="px-4 py-3">Best value once you have the volume to fill a container</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                Most brands run sea freight as their default cycle, typically
                planning 12 weeks ahead, and use air freight for genuine
                restocking emergencies or time-sensitive lines. Under 100 kg,
                express courier usually beats dedicated air freight once you
                factor in broker fees. Over 100 kg, dedicated air freight is the
                right move.
              </p>
              <p>
                ITD also offers road and rail freight services for a full range
                of modes. Please speak to the freight team about what&apos;s
                available for your route.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="fcl-lcl" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              2. Sea freight: FCL vs LCL
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                FCL (Full Container Load) means you&apos;re buying the whole box.
                LCL (Less than Container Load) means your cargo shares a
                container with other shippers and you pay by the cubic metre. LCL
                is practical for volumes under 12-15 CBM; above that, FCL usually
                works out cheaper per cubic metre.
              </p>
              <p>
                The practical difference beyond cost: LCL adds handling time at
                both ends (the origin and UK container freight stations), so lead
                times run 5-10 days longer than FCL. Your release also depends on
                the whole container clearing customs. If another shipper has a
                hold, it can delay you too.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="consolidation" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              3. Consolidation: how LCL shipments work
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Consolidation is how LCL happens: your cargo is grouped with
                other shippers&apos; goods into one container for the ocean leg.
                Understanding the stages helps you plan cut-off dates and avoid
                the delays that catch most first-timers.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-primary">
                  <tr>
                    <th className="px-3 py-3 text-left font-semibold">Stage</th>
                    <th className="px-3 py-3 text-left font-semibold">What happens</th>
                    <th className="px-3 py-3 text-left font-semibold">Who handles it</th>
                    <th className="px-3 py-3 text-left font-semibold">Your action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">1. Booking</td>
                    <td className="px-3 py-3">Confirm CBM, weight, and commodity with ITD. Receive CFS cut-off date.</td>
                    <td className="px-3 py-3">ITD freight team</td>
                    <td className="px-3 py-3">Provide packing list and cargo dimensions</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">2. Origin CFS</td>
                    <td className="px-3 py-3">Cargo arrives at the container freight station at origin. Checked, labelled, staged for loading.</td>
                    <td className="px-3 py-3">Origin CFS operator</td>
                    <td className="px-3 py-3">Ensure supplier delivers before the cut-off</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">3. Consolidation</td>
                    <td className="px-3 py-3">Your cargo is loaded into a shared container alongside other shippers. Your House Bill of Lading is issued.</td>
                    <td className="px-3 py-3">NVOCC / consolidator</td>
                    <td className="px-3 py-3">Receive House Bill of Lading from ITD</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">4. Ocean transit</td>
                    <td className="px-3 py-3">Container moves on a scheduled service. ITD sends tracking updates automatically.</td>
                    <td className="px-3 py-3">Shipping line</td>
                    <td className="px-3 py-3">Monitor updates; confirm delivery address</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">5. UK CFS</td>
                    <td className="px-3 py-3">Container arrives at Felixstowe, Southampton, or London Gateway. Deconsolidated and sorted by shipper.</td>
                    <td className="px-3 py-3">UK CFS operator</td>
                    <td className="px-3 py-3">Ensure customs data is ready before arrival</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">6. Customs</td>
                    <td className="px-3 py-3">CDS declaration filed. Duty calculated. Goods released per shipper.</td>
                    <td className="px-3 py-3">Customs broker</td>
                    <td className="px-3 py-3">Approve duty figures</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">7. Delivery</td>
                    <td className="px-3 py-3">Cargo moved from CFS to your warehouse on a dedicated vehicle or groupage service.</td>
                    <td className="px-3 py-3">ITD haulage</td>
                    <td className="px-3 py-3">Confirm delivery window and unloading bay</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                The two points where things go wrong: missing the origin CFS
                cut-off (Stage 2), meaning your goods wait for the next vessel
                (typically a week), and customs data not being ready before
                arrival (Stage 5). ITD will chase both, but the raw information
                must come from you and your supplier.
              </p>
              <p>
                You&apos;ll receive a House Bill of Lading (HBL) from ITD once
                your cargo is loaded. Hold onto the HBL number. It&apos;s the
                reference for all tracking queries and your CDS declaration until
                the goods are released at the UK CFS.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="eori" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              4. Your EORI number
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                You need an EORI number to import commercial goods into the UK. If
                you&apos;re VAT-registered, it&apos;s your VAT number prefixed GB
                and suffixed 000 (e.g. VAT 123456789 becomes GB123456789000). Not
                VAT-registered? HMRC issues one free, usually within 5 working
                days. Apply at gov.uk/eori.
              </p>
              <p>
                Always give your full GB-prefixed number including the trailing
                zeros when a supplier or forwarder asks for it. Truncated EORI
                numbers are one of the most common reasons declarations get
                rejected at the border. If you import into Northern Ireland as
                well, you&apos;ll need a separate XI-prefixed EORI. Once you have
                your EORI, register for CDS at the same portal. More on that in
                Section 6.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="tariff" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              5. The UK Global Tariff and HS codes
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Every product you import needs a commodity code (HS code): a
                10-digit number that tells HMRC what the goods are and what duty
                rate applies. Look yours up at gov.uk/trade-tariff. The code
                determines your duty rate, flags any anti-dumping duties (common
                on Chinese-origin goods like e-bikes and solar panels), and shows
                whether an import licence is required.
              </p>
              <p>
                Getting the code wrong costs you in three places: you pay the
                wrong duty rate, you risk a customs hold, and you&apos;re exposed
                to HMRC penalties. Once you have the right code, store it against
                the SKU in your ERP so every shipment uses it automatically. For
                high-volume lines, a Binding Tariff Information (BTI) ruling from
                HMRC locks the code in writing for three years and removes the
                risk entirely. It&apos;s free. It just takes about 120 days.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="cds" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              6. CDS customs declarations
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                CDS (Customs Declaration Service) replaced CHIEF as the UK&apos;s
                import declaration system. Every commercial import needs a
                declaration filed through CDS. The key data points are:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-4">
                <li>Your EORI number</li>
                <li>Supplier details and country of origin</li>
                <li>Commodity code (HS code)</li>
                <li>Customs value (what you paid, plus freight to the UK border)</li>
                <li>Incoterms</li>
                <li>Method of payment for duty</li>
              </ul>
              <p>
                When you book freight with ITD, CDS clearance is included. You
                don&apos;t need to appoint a separate broker. The one thing you
                can do to speed clearance: make sure your HS codes and cargo
                values are confirmed before the vessel departs. Pre-clearance
                means your goods can be released on arrival rather than sitting at
                the port waiting for paperwork.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="incoterms" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              7. Incoterms
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Incoterms define where the supplier&apos;s responsibility ends
                and yours begins. The one you agree with your supplier affects who
                pays for freight, insurance, and customs, and how much visibility
                you have over those costs.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-primary">
                  <tr>
                    <th className="px-3 py-3 text-left font-semibold">Incoterm</th>
                    <th className="px-3 py-3 text-left font-semibold">Supplier ends at</th>
                    <th className="px-3 py-3 text-left font-semibold">Buyer covers</th>
                    <th className="px-3 py-3 text-left font-semibold">When to use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">EXW</td>
                    <td className="px-3 py-3">Factory gate</td>
                    <td className="px-3 py-3">Everything from factory to UK warehouse</td>
                    <td className="px-3 py-3">Common for air freight. ITD can handle the inland China collection.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">FOB</td>
                    <td className="px-3 py-3">Loaded on vessel at origin</td>
                    <td className="px-3 py-3">Freight, insurance, UK customs, UK delivery</td>
                    <td className="px-3 py-3">Standard for sea freight. The default for most China imports.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">CIF</td>
                    <td className="px-3 py-3">Vessel at UK port</td>
                    <td className="px-3 py-3">UK customs, UK delivery</td>
                    <td className="px-3 py-3">Supplier handles the sea leg; you keep control of UK clearance.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">DDU / DAP</td>
                    <td className="px-3 py-3">UK delivery address</td>
                    <td className="px-3 py-3">Duty, VAT, broker fees</td>
                    <td className="px-3 py-3">Supplier delivers but you handle customs.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-medium text-text-primary">DDP</td>
                    <td className="px-3 py-3">UK delivery address, duty paid</td>
                    <td className="px-3 py-3">Nothing beyond the invoice</td>
                    <td className="px-3 py-3">Suppliers often build margin into the duty figure. You lose visibility of what you&apos;re actually paying.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                FOB is the standard for sea freight from China. EXW is common for
                air freight, where ITD can arrange inland collection from your
                supplier&apos;s factory. Avoid DDP unless you&apos;ve verified
                what duty rate the supplier is using. Flat-rate DDP quotes from
                China almost always have the duty margin built into the product
                price, and you&apos;re paying it either way.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="holds" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              8. Common holds and how to avoid them
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                A customs hold stops your shipment at the UK border until HMRC or
                Border Force is satisfied. They cost time, storage fees, and
                occasionally the goods. The five most common causes:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong className="text-text-primary">Wrong HS code.</strong> The
                  most common cause. HMRC&apos;s systems flag codes that don&apos;t
                  match the product description or where the duty looks too low.
                  Fix: classify the SKU properly before shipping and store the
                  code in your ERP.
                </li>
                <li>
                  <strong className="text-text-primary">Invoice doesn&apos;t meet UK requirements.</strong>{" "}
                  The commercial invoice needs to show the supplier, buyer, goods
                  description, value in the sale currency, Incoterms, and country
                  of origin. Send your supplier a compliant template and require
                  it on every shipment.
                </li>
                <li>
                  <strong className="text-text-primary">Anti-dumping duty missed.</strong>{" "}
                  Many Chinese-origin product categories carry anti-dumping duties
                  on top of the standard rate. Check the UKGT tool for each HS
                  code. HMRC will invoice you retrospectively if you miss one.
                </li>
                <li>
                  <strong className="text-text-primary">Missing product marking.</strong>{" "}
                  Electrical goods, toys, machinery, and PPE sold in the UK need
                  UKCA or CE marking. Confirm the requirement before the order is
                  placed.
                </li>
                <li>
                  <strong className="text-text-primary">No import licence.</strong>{" "}
                  Food, certain chemicals, and CITES goods need a licence from
                  DEFRA or MHRA. Check the UKGT tool&apos;s licence indicator
                  before sourcing. A Y prefix in the measure code means a licence
                  is required.
                </li>
              </ul>
              <p>
                The common thread: issues caught at origin cost very little to
                fix. Issues caught at the UK border cost time, storage, and
                sometimes the goods.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="who-does-what" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              9. Who does what: forwarders, brokers, NVOCCs
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Three types of partners are involved in a freight shipment, and
                the roles often overlap. Here&apos;s what each one does.
              </p>
              <p>
                <strong className="text-text-primary">Freight forwarder (ITD).</strong>{" "}
                Books the freight, negotiates carrier rates, and manages the
                documentation. ITD is your single point of contact from booking
                through to UK delivery.
              </p>
              <p>
                <strong className="text-text-primary">Customs broker.</strong> Files
                the CDS declaration, calculates duty and VAT, and manages the
                deferment account.
              </p>
              <p>
                <strong className="text-text-primary">NVOCC.</strong> Books container
                space on shipping lines and resells it in smaller lots. Most LCL
                shipments move through an NVOCC. ITD manages this relationship on
                your behalf. You won&apos;t deal with them directly.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="tracking" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              10. Tracking
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Freight doesn&apos;t have the same end-to-end tracking as a
                parcel. There are multiple parties involved at different stages.
                ITD provides a managed service that covers each leg.
              </p>
              <p>
                <strong className="text-text-primary">Air freight:</strong> once the
                Air Waybill (AWB) is issued, you get the AWB number and flight
                status. ITD updates you directly on clearance and delivery once
                the shipment lands in the UK.
              </p>
              <p>
                <strong className="text-text-primary">Sea freight:</strong> tracking
                starts when the container number is assigned. You receive
                automated email updates each time the vessel logs a status change
                (departure, transhipment, arrival, gate-out) through to delivery.
              </p>
              <p>
                <strong className="text-text-primary">LCL shipments:</strong> tracking
                runs at the container level until deconsolidation at the UK CFS.
                Your House Bill of Lading number is the reference for all queries
                before that point. Once your cargo is separated out, ITD picks up
                the clearance and delivery update directly.
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
              The questions most clients ask before booking their first freight
              shipment.
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
                  href="/shipping/freight"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    Freight shipping with ITD
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/guides/far-east-imports"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    Importing from China and the Far East
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping/international"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    International shipping setup
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
              Ready to move freight with ITD?
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              ITD handles air freight and sea freight (FCL and LCL) from origin to
              UK warehouse, including CDS clearance, duty, and final-mile
              delivery. Talk to the freight team about your next shipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact?enquiry=freight"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Get in touch with the freight team
              </Link>
              <Link
                href="/shipping/freight"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Explore freight shipping
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
