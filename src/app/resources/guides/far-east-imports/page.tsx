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
  title: "Importing from China and the Far East to the UK",
  description:
    "The operator's guide to importing from China to the UK in 2026. CDS, UK Global Tariff, PVA, Incoterms, sea vs air freight, and the holds that catch new importers.",
  path: "/resources/guides/far-east-imports",
});

const PATH = "/resources/guides/far-east-imports";
const UPDATED = "20 May 2026";
const UPDATED_ISO = "2026-05-20";

const sections = [
  { id: "why-import-direct", label: "1. Why import direct from the Far East" },
  { id: "the-four-ways", label: "2. The four ways to import: sea, air, express, road" },
  { id: "eori", label: "3. Setting up your EORI number with HMRC" },
  { id: "ukgt", label: "4. The UK Global Tariff and HS code classification" },
  { id: "cds", label: "5. CDS: the Customs Declaration Service explained" },
  { id: "incoterms", label: "6. Incoterms: DDP, DDU, FOB, EXW, CIF" },
  { id: "pva", label: "7. Postponed VAT Accounting and your cash flow" },
  { id: "holds", label: "8. Common holds and how to avoid them" },
  { id: "partners", label: "9. Freight forwarders, customs brokers, NVOCCs" },
  { id: "platform", label: "10. Where a multi-carrier platform fits in" },
  { id: "faq", label: "FAQ" },
];

const faqs = [
  {
    question: "What is the difference between DDP and DDU when importing from China?",
    answer:
      "DDP (Delivered Duty Paid) means the supplier handles all import duties, taxes, and customs clearance on your behalf and delivers goods to your UK address. DDU, now called DAP (Delivered at Place), means the supplier delivers but you pay duty, VAT, and broker fees. DDP looks easier but obscures the duty calculation, which is often where suppliers build in margin. DAP gives you control at the cost of more work.",
  },
  {
    question: "Do I need a customs broker to import from China?",
    answer:
      "In practice, yes. CDS declarations contain 60 to 80 data elements per shipment and most importers use a broker or a forwarder with broker capability. The broker fee is typically £25 to £75 per declaration. You can self-file via CDS if you register directly with HMRC, but the time investment means most UK importers continue to use a broker until volume justifies automation.",
  },
  {
    question: "How does CDS differ from CHIEF for UK imports?",
    answer:
      "CDS (Customs Declaration Service) replaced CHIEF for imports during 2022 to 2023 and for exports during 2024. CDS uses a different data structure aligned with the EU's Union Customs Code, requires different field formatting, and runs on a different login portal at gov.uk. Declarations that worked in CHIEF need rebuilding in CDS.",
  },
  {
    question: "What is the UK Global Tariff duty rate for clothing imports from China?",
    answer:
      "Most cotton and synthetic clothing imports from China fall under chapter 61 (knitted) or 62 (woven) of the UK Global Tariff. Typical duty rates are 9.6% to 12% depending on fibre composition. T-shirts under code 6109 are at 12%. Cotton dresses under code 6204 are at 12%. Cross-check on gov.uk/trade-tariff because rates change.",
  },
  {
    question: "What is the UK Global Tariff duty rate for electronics imports from China?",
    answer:
      "Most consumer electronics import under chapter 85. Duty rates vary widely. Smartphones under code 8517 1300 are at 0%. Laptop computers under code 8471 3001 are at 0%. Lighting under chapter 9405 is typically 3.7%. Many small kitchen appliances under chapter 8509 are at 2.7%. Electronics from China are also where anti-dumping duties are most likely to apply, particularly to solar panels and certain electrical components.",
  },
  {
    question: "What is PVA and how do I sign up?",
    answer:
      "Postponed VAT Accounting (PVA) lets you account for import VAT on your VAT return rather than paying it at the border. You do not apply to use it. You opt in on each CDS declaration by marking the PVA flag and reconcile the monthly C79 certificate from HMRC against your VAT return. To use PVA you need a GB EORI, VAT registration, and your customs broker needs to know you want PVA on each declaration.",
  },
  {
    question: "How long does customs clearance take for a Far East import?",
    answer:
      "With pre-clearance done correctly, clearance happens on arrival and goods can be released within hours of berthing. Without pre-clearance, expect 24 to 72 hours of port time. Holds add 2 to 7 days on average. The Northgate Imports case study reduced average clearance time from 3 days to 1 day by automating pre-clearance.",
  },
  {
    question: "Do I need an EORI number to import from China?",
    answer:
      "Yes. You cannot import commercial goods into the UK without an EORI number. Apply free at gov.uk/eori. Processing usually takes 5 working days. If you are VAT registered, your EORI is your VAT number prefixed GB and suffixed 000. If you also import into Northern Ireland, you need an XI-prefixed EORI in addition to the GB one.",
  },
];

export default function FarEastImportsGuidePage() {
  const jsonLd = [
    articleSchema({
      headline: "Importing from China and the Far East into the UK",
      description:
        "The operator's guide to importing from China to the UK in 2026. CDS, UK Global Tariff, PVA, Incoterms, sea vs air freight, and the holds that catch new importers.",
      path: PATH,
      datePublished: UPDATED_ISO,
      dateModified: UPDATED_ISO,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources/case-studies" },
      { name: "Guides", path: "/resources/guides" },
      { name: "Far East Imports", path: PATH },
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
                Import
              </span>
            </div>
            <h1 className="text-display-xl text-text-primary">
              Importing from China and the Far East into the UK.
            </h1>
            <p className="mt-5 text-lg text-text-secondary leading-relaxed">
              A working guide for UK importers bringing goods in from China, Vietnam, India, Bangladesh, and Turkey. CDS declarations, UK Global Tariff duty, Incoterms, sea versus air freight, Postponed VAT Accounting, and the holds that catch new importers. Built for the import manager, not the textbook reader.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-text-tertiary">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Last updated {UPDATED}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 18 minute read
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
              This guide is written for UK import managers, eCommerce brands sourcing from Asia, and 3PLs handling client inbound flows. If you are running 50 to 500 import shipments a month and your landed cost spreadsheet is out of date the moment a fuel surcharge changes, you are the reader we wrote this for. We assume you already know what an EORI number is. If you do not, start with the EORI section and come back.
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
                Importing from China and the Far East into the UK in 2026 means filing CDS declarations, classifying goods against the UK Global Tariff, choosing between sea freight (cost) and air freight (speed), and picking Incoterms that match your control appetite. The four levers that move the actual numbers are HS code accuracy, Incoterms choice, freight mode, and whether you are using Postponed VAT Accounting. A misclassified HS code costs you in three places: duty rate, customs hold time, and HMRC penalty exposure. PVA defers the import VAT cash hit to your next return. DDP shifts the customs work to the supplier and removes your visibility. This guide covers each decision with the actual numbers.
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
                    <a
                      href={`#${s.id}`}
                      className="text-sm text-accent hover:underline"
                    >
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
          <section id="why-import-direct" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              1. Why import direct from the Far East
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Most UK brands that source from Asia begin with a distributor in the UK or EU. It is simpler. The distributor handles customs, holds the stock, and quotes you a delivered price. The trade-off is margin. The same SKU bought in 200-unit cases from a UK distributor lands at twice the cost of a 5,000-unit container direct from Yiwu, Shenzhen, or Ho Chi Minh City.
              </p>
              <p>
                The case for direct import is usually one of three things. You have the volume to fill at least a 20-foot container. You have product specifications that a generic distributor cannot meet. Or your margin is being eaten by the distributor markup and your pricing has nowhere left to go.
              </p>
              <p>
                Direct import is not free. It costs you in working capital (you pay the supplier 30 days before the goods arrive), in lead time (typically 6 to 10 weeks from order to UK warehouse), and in compliance work (every shipment is your customs declaration, not someone else&apos;s). The Northgate Imports case study on this site illustrates the trade-off cleanly: clearance time fell from 3 days to 1 day and duty cost accuracy improved from 82% to 97% once they brought the import compliance process in-house with the right tools.
              </p>
              <p>
                If you import enough volume that the distributor margin is greater than your compliance and freight cost, direct import is the answer. The rest of this guide is the operating manual.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="the-four-ways" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              2. The four ways to import: sea, air, express, road
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                There are four practical ways to move goods from the Far East to the UK. Each one has a weight tier, a lead time, and a cost-per-kilogram band where it wins.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-primary">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Mode</th>
                    <th className="px-4 py-3 text-left font-semibold">Lead time</th>
                    <th className="px-4 py-3 text-left font-semibold">Cost per kg</th>
                    <th className="px-4 py-3 text-left font-semibold">Best for</th>
                    <th className="px-4 py-3 text-left font-semibold">Carriers / forwarders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Express courier</td>
                    <td className="px-4 py-3">3 to 6 days</td>
                    <td className="px-4 py-3">£6 to £12</td>
                    <td className="px-4 py-3">Samples, urgent stock under 100kg, high-value low-weight</td>
                    <td className="px-4 py-3">DHL Express, FedEx, UPS, TNT</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Air freight</td>
                    <td className="px-4 py-3">7 to 12 days</td>
                    <td className="px-4 py-3">£3 to £6</td>
                    <td className="px-4 py-3">Mid-volume restocks, 100kg to 1,000kg, time-sensitive</td>
                    <td className="px-4 py-3">DHL Global Forwarding, Kuehne+Nagel, DSV, Expeditors</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Sea freight LCL</td>
                    <td className="px-4 py-3">35 to 50 days</td>
                    <td className="px-4 py-3">£0.50 to £1.50</td>
                    <td className="px-4 py-3">First containers, less than full container loads, 1m³ to 15m³</td>
                    <td className="px-4 py-3">Forwarder consolidations through Felixstowe, Southampton, London Gateway</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Sea freight FCL</td>
                    <td className="px-4 py-3">30 to 45 days</td>
                    <td className="px-4 py-3">£0.20 to £0.60</td>
                    <td className="px-4 py-3">Full 20ft (33m³) or 40ft (67m³) containers, regular volume</td>
                    <td className="px-4 py-3">Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE, Evergreen</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">Road from EU bonded warehouse</td>
                    <td className="px-4 py-3">4 to 8 days</td>
                    <td className="px-4 py-3">Varies (added to sea or air leg)</td>
                    <td className="px-4 py-3">Goods consolidated in Rotterdam or Hamburg before UK leg</td>
                    <td className="px-4 py-3">Mainly used when EU FTA processing applies</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                The two decisions that drive your mode choice are how much working capital you can tie up in freight and how long your sales velocity will tolerate stockouts. A brand selling 200 units a week of a £40 product cannot sit on a 6-week sea container if the previous one is empty. They will pay air freight for the next two restocks until the cadence stabilises. A brand selling 50 units a week of a £200 product will plan their sea freight cycle 12 weeks ahead and only resort to air for genuine emergencies.
              </p>
              <p>
                Express courier is its own category. It is air freight wrapped in a clearance service and door delivery, with the courier acting as the customs broker. For samples and urgent low-volume restocks under 100kg, it is usually the cheapest option once you factor in the broker fees you would otherwise pay on a regular air freight booking. For anything over 100kg, the per-kilogram rate becomes uncompetitive.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="eori" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              3. Setting up your EORI number with HMRC
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                You cannot import commercial goods into the UK without an EORI number. The full form is Economic Operators Registration and Identification, and HMRC issues it on application. The application is free and most applications are processed within 5 working days.
              </p>
              <p>
                If your business is VAT-registered, your EORI number is your VAT number prefixed with GB and suffixed with three zeros (so VAT 123456789 becomes GB123456789000). If you are not VAT-registered, HMRC issues a unique EORI. Apply at gov.uk/eori. You will need your UTR (Unique Taxpayer Reference), your VAT registration certificate if you have one, and your business address.
              </p>
              <p>
                A few operational notes that the gov.uk page does not make obvious. If you import into Northern Ireland separately, you need an XI-prefixed EORI in addition to the GB one. If you have multiple trading entities, each one needs its own EORI. If your supplier or freight forwarder asks for your EORI, give them the full GB-prefixed number including the trailing zeros. Truncated EORI numbers are one of the most common reasons declarations get rejected at the border.
              </p>
              <p>
                Once you have your EORI, register for the Customs Declaration Service (CDS) at the same gov.uk portal. CDS is where your declarations live. It is not optional and it is not the same as your old CHIEF login. More on that in section 5.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="ukgt" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              4. The UK Global Tariff and HS code classification
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                The UK Global Tariff (UKGT) is the schedule of duty rates the UK applies to imports from countries without a trade agreement. China, Vietnam, Bangladesh, and India all fall under UKGT for most goods. Turkey has a customs union arrangement that affects industrial goods specifically.
              </p>
              <p>
                Every product you import needs a commodity code (also called an HS code, or in EU/UK contexts the 10-digit CN code). The first six digits are the international HS code. The remaining four are UK-specific. The UKGT tool at gov.uk/trade-tariff is the official lookup. Type in the product, narrow down through the chapter and heading, and the tool returns the duty rate, the VAT rate, any anti-dumping duties, and any import licence requirements.
              </p>
              <p>Three operator notes that matter.</p>
              <p>
                First, the HS code drives the duty rate. The difference between commodity code 6109 1000 (cotton T-shirts, 12% duty) and 6109 9020 (man-made fibre T-shirts, 12% duty) is small. The difference between 9405 (lighting, mostly 3.7% duty) and a misclassified electrical goods code at 14% is the entire margin on the SKU. For high-volume imports, get the classification reviewed by a customs broker or apply for a Binding Tariff Information (BTI) ruling. BTI is free, takes about 120 days, and gives you a written HMRC commitment to the classification for three years.
              </p>
              <p>
                Second, anti-dumping duties hit certain product categories from certain origins. Solar panels from China, ceramic tableware from China, e-bikes from China, and a long list of steel products all carry additional duties on top of the standard UKGT rate. The UKGT tool flags these. Miss one and you will be invoiced retrospectively by HMRC, often six to twelve months after the import.
              </p>
              <p>
                Third, the commodity code stays with the SKU. Build it into your product master in your ERP (SAP, NetSuite, Dynamics 365, Sage X3, or whatever you run) so that every shipment of that SKU uses the same code automatically. Spreadsheet-based classification is where errors come from.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="cds" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              5. CDS: the Customs Declaration Service explained
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                CDS replaced CHIEF as the UK&apos;s customs declaration system. CHIEF (the Customs Handling of Import and Export Freight system) was decommissioned over 2022 to 2023 for imports and 2024 for exports. If you ever filed declarations in CHIEF, the data structure is different, the field names are different, and the user interface is different. Treat CDS as a new system.
              </p>
              <p>
                A CDS import declaration contains roughly 60 to 80 data elements depending on the procedure code. The headline ones are:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-4">
                <li>Importer EORI (yours)</li>
                <li>Exporter details (your supplier)</li>
                <li>Country of origin (where the goods were manufactured, not necessarily shipped from)</li>
                <li>Country of dispatch (where they shipped from)</li>
                <li>Commodity code (the 10-digit HS code)</li>
                <li>Customs value (the price you paid plus freight to the UK border, in the case of CIF; the price alone for FOB)</li>
                <li>Procedure code (the four-digit code that tells HMRC what is happening to the goods)</li>
                <li>CPC additional procedure code (the three-digit modifier)</li>
                <li>Incoterms</li>
                <li>Currency of invoice</li>
                <li>Method of payment (deferment account, cash, PVA)</li>
              </ul>
              <p>
                Most importers do not file their own CDS declarations. They use a customs broker, a freight forwarder with broker capability, or a software platform that submits to CDS via API. The broker is paid £25 to £75 per declaration. For 50 declarations a month that is £15,000 to £45,000 a year, which is the point at which automating declaration filing becomes the obvious next step.
              </p>
              <p>
                Pre-clearance matters. CDS accepts declarations before the goods arrive at the UK border, which means the goods can clear on arrival rather than sitting at the port waiting for paperwork. Every forwarder offers pre-clearance, but only if you give them the data in time. The data has to be ready before the vessel arrives, which means it has to be ready before the goods are loaded at origin, which means the HS codes and commodity values have to be locked in the PO system 30 days before the goods land.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="incoterms" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              6. Incoterms: DDP, DDU, FOB, EXW, CIF
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Incoterms define who is responsible for what at each stage of the shipment. They are the most consequential decision in your supplier contract after price. The 2020 Incoterms are the current version and the ones most suppliers reference. Here is the working comparison for Far East imports.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-text-primary">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Incoterm</th>
                    <th className="px-4 py-3 text-left font-semibold">Supplier ends at</th>
                    <th className="px-4 py-3 text-left font-semibold">Buyer pays</th>
                    <th className="px-4 py-3 text-left font-semibold">When to use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">EXW (Ex Works)</td>
                    <td className="px-4 py-3">Factory gate</td>
                    <td className="px-4 py-3">Everything from factory to UK warehouse</td>
                    <td className="px-4 py-3">Rarely. Only if you have a forwarder who can collect inland in China.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">FOB (Free on Board)</td>
                    <td className="px-4 py-3">Loaded on vessel at origin port</td>
                    <td className="px-4 py-3">Freight, insurance, UK customs, UK delivery</td>
                    <td className="px-4 py-3">Most common for sea freight. Standard for FCL and LCL bookings.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">CIF (Cost, Insurance, Freight)</td>
                    <td className="px-4 py-3">Vessel at UK port</td>
                    <td className="px-4 py-3">UK customs, UK delivery</td>
                    <td className="px-4 py-3">When you want the supplier to handle the sea leg but you keep the UK clearance.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">DDU / DAP</td>
                    <td className="px-4 py-3">UK delivery address</td>
                    <td className="px-4 py-3">Duty, VAT, customs broker fees</td>
                    <td className="px-4 py-3">Rare in Far East trade. Supplier delivers but you handle customs.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-text-primary">DDP (Delivered Duty Paid)</td>
                    <td className="px-4 py-3">UK delivery address, duty paid</td>
                    <td className="px-4 py-3">Nothing extra beyond invoice</td>
                    <td className="px-4 py-3">Suppliers offering DDP often build a margin into the duty calculation. You lose visibility.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                The operator advice. For first-time imports from a new supplier, FOB gives you control and visibility while keeping the supplier&apos;s responsibility ending at the port of origin. Once you have a freight forwarder you trust, FOB is the default for sea freight from China. Avoid DDP unless you have audited the supplier&apos;s duty calculation against your own HS code research. Suppliers offering DDP from China at a flat rate are almost always either incorrectly classifying the goods or absorbing a duty cost they recoup elsewhere in the price. Both are problems waiting to surface.
              </p>
              <p>
                EXW looks cheap on paper. Suppliers quote lower EXW prices because the freight, export documentation, and inland transit in China become your problem. Unless you have a freight forwarder with a working presence in the relevant Chinese province, EXW costs you more than FOB by the time you have paid for the inland leg.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="pva" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              7. Postponed VAT Accounting and your cash flow
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Postponed VAT Accounting (PVA) is the import VAT mechanism HMRC introduced in 2021. It is the single most useful cash flow lever available to UK importers and a lot of importers still are not using it.
              </p>
              <p>
                The mechanics. Under the traditional approach, you pay import VAT at the border (typically through your deferment account or in cash) and reclaim it on your next VAT return. Under PVA, the import VAT does not get paid at the border. It is declared on your next VAT return as both input and output, netting to zero. Your VAT return shows the import, you reclaim the VAT immediately, and there is no cash hit at the border.
              </p>
              <p>
                For a UK importer bringing in £500,000 of goods a quarter at 20% VAT, that is a £100,000 cash flow difference per quarter compared to the old &ldquo;pay at the border, reclaim later&rdquo; approach. Multiply by your VAT cycle and the working capital release is significant.
              </p>
              <p>
                To use PVA, you need a GB EORI, you need to be VAT registered, and you need to mark your CDS declaration with the PVA flag. Your customs broker or software platform does this when they submit the declaration. HMRC issues a monthly C79 import VAT certificate that reconciles the PVA entries with the import declarations. The C79 has to be reconciled against your accounting system or you risk a VAT return that does not match HMRC&apos;s records.
              </p>
              <p>
                PVA does not affect duty. Duty is still payable at the border (or through your deferment account if you have one). PVA only defers the VAT element. For most importers that is the larger of the two payments.
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
                A customs hold is a shipment stopped at the UK border because HMRC, Border Force, or another regulatory body needs to see something. Holds cost time, storage charges, and sometimes the goods themselves. The five most common reasons for Far East import holds and how to prevent them:
              </p>
              <p>
                <strong className="text-text-primary">Incorrect HS code.</strong> The single largest cause of holds. HMRC&apos;s systems flag declarations where the commodity code does not match the product description, or where the duty paid is significantly lower than the typical rate for similar goods. Fix: classify the SKU in advance, store the code in your ERP, and have a BTI ruling for high-volume SKUs.
              </p>
              <p>
                <strong className="text-text-primary">Missing or incorrect commercial invoice.</strong> The invoice must show the supplier, the buyer, the goods (matching the HS code), the value in the currency of sale, the Incoterms, and the country of origin. Suppliers often produce simplified invoices that do not meet UK customs requirements. Fix: send your supplier a UK-compliant invoice template and require it on every shipment.
              </p>
              <p>
                <strong className="text-text-primary">Anti-dumping duty not paid.</strong> A wide range of Chinese-origin goods carry anti-dumping or countervailing duties that are not always picked up by basic HS code lookups. Fix: check the UKGT tool for each commodity code and store the anti-dumping rate alongside the standard rate.
              </p>
              <p>
                <strong className="text-text-primary">CE / UKCA marking missing.</strong> Goods sold in the UK that fall under regulated categories (electrical, toys, machinery, PPE) need either a UKCA mark or, transitionally, a CE mark. Border Force can intercept consignments that do not carry the right mark. Fix: confirm the marking requirement before placing the order and audit the supplier&apos;s first production run before container loading.
              </p>
              <p>
                <strong className="text-text-primary">Restricted goods without import licence.</strong> Food products, certain chemicals, plant-based materials, and goods subject to CITES (endangered species) need a licence from DEFRA, MHRA, or the appropriate body. Fix: check the UKGT tool&apos;s licence indicator before sourcing. If you see a Y prefix in the measure code, a licence is needed.
              </p>
              <p>
                The pattern across all five is the same. The cost of getting it right at origin is small. The cost of getting it wrong at the UK border is large. Pre-clearance done properly is the single biggest reduction in hold rates available to a UK importer.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="partners" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              9. Freight forwarders, customs brokers, NVOCCs
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Three categories of partner sit between you and your goods. The roles overlap. Most operators do not distinguish them clearly, which is fine until something goes wrong and you need to know whose problem it is.
              </p>
              <p>
                <strong className="text-text-primary">Freight forwarder.</strong> Books the freight (sea, air, road) on your behalf. Negotiates rates with carriers. Handles documentation. Examples in the UK market: Kuehne+Nagel, DSV, DHL Global Forwarding, Davies Turner, Woodland Group. For first-time Far East importers, a forwarder is usually the cheapest and most knowledgeable single point of contact. They will quote you all-in, manage the sea leg, and arrange UK clearance through their own broker function.
              </p>
              <p>
                <strong className="text-text-primary">Customs broker.</strong> Files the CDS declaration. Holds (or uses) a deferment account on your behalf. Calculates duty and VAT. May or may not be the same company as your forwarder. Stand-alone brokers exist for importers who book their own freight or use multiple forwarders. Examples: AEB, Descartes (via brokers using their platform), MIC Customs Solutions.
              </p>
              <p>
                <strong className="text-text-primary">NVOCC (Non-Vessel Operating Common Carrier).</strong> Books container space on shipping lines and resells it. Most LCL (less than container load) shippers are NVOCCs. The shipping line never sees you, the NVOCC handles the relationship. NVOCCs typically partner with a forwarder rather than dealing direct with the importer.
              </p>
              <p>
                When to bring each one in. For sea freight, start with a forwarder. They will arrange the NVOCC for LCL or the carrier for FCL. They will introduce their broker for the clearance leg. For air freight, the forwarder will book the air carrier and handle clearance. For express courier, the courier (DHL, FedEx, UPS) acts as the broker by default and the declaration is included in the rate. The express route is the simplest for low-volume importers and the most expensive at scale.
              </p>
              <p>
                The question to ask any forwarder before you sign anything: &ldquo;Are you the customs broker on this account, or are you brokering through a third party?&rdquo; Mixed answers are common and they affect your liability when something goes wrong.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="platform" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              10. Where a multi-carrier platform fits in
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                A multi-carrier shipping platform like Connexx is not a replacement for your customs broker, your freight forwarder, or your NVOCC. It sits alongside them and handles three things they do not.
              </p>
              <p>
                First, landed cost calculation per SKU before goods are ordered. The platform reads the HS code, the country of origin, the Incoterms, and the current UKGT rate, then returns the landed cost. Finance gets the number on the day the PO is raised, not the day the C79 arrives.
              </p>
              <p>
                Second, customs declaration data assembly. The HS codes, commodity values, and origin data sit in the platform alongside your product catalogue. When a forwarder or broker needs the declaration data for CDS, the platform exports it in the right format rather than requiring someone to retype it from a spreadsheet.
              </p>
              <p>
                Third, multi-mode coverage for the parcel leg. Once goods clear customs in the UK, the onward distribution (to your warehouse, to your 3PL, to direct fulfilment) is a multi-carrier decision in its own right. Royal Mail, DPD, DHL Parcel UK, and Parcelforce all do final-mile delivery from the port to the warehouse for smaller shipments.
              </p>
              <p>
                This is the part of the import workflow that most importers run manually in spreadsheets. The Northgate Imports case study covers the operational outcome (clearance delays down 60%, duty cost accuracy from 82% to 97%, clearance time from 3 days to 1 day). The platform sits between your ERP, your forwarder, and CDS.
              </p>
              <p>
                For more on how this works in practice, see <Link href="/solutions/import" className="text-accent hover:underline">our import solution page</Link>.
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
              The answers most import managers ask before they file the first declaration.
            </p>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <ScrollReveal key={item.question} delay={i * 0.04}>
                <details className="group bg-white rounded-xl border border-border p-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <h3 className="text-base font-semibold text-text-primary">{item.question}</h3>
                  </summary>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.answer}</p>
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
                  href="/solutions/import"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    How Connexx handles UK imports
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
              <li>
                <Link
                  href="/resources/case-studies/home-bargains"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    Northgate Imports case study
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/glossary"
                  className="group flex items-center justify-between gap-4 p-4 bg-bg-secondary rounded-xl border border-border hover:border-accent/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary group-hover:text-accent">
                    Glossary: EORI, HS code, CDS, PVA
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
              Importing from the Far East at volume?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Connexx calculates landed cost per SKU, files CDS declarations alongside your broker, and tracks every shipment from supplier to UK warehouse. Northgate Imports cut clearance delays 60% with the same setup.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/solutions/import"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                See how Connexx handles UK imports
              </Link>
              <Link
                href="/resources/case-studies/home-bargains"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Read the Northgate Imports case study
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
