import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import { Download, FileSpreadsheet } from "lucide-react";
import HashScroll from "./HashScroll";

const PATH = "/help/centre/billing";
const QUERIES_EMAIL = "uk-invqueries@itdglobal.com";

export const metadata = buildMetadata({
  title: "Billing & Invoices — how weekly billing works",
  description:
    "How ITD's weekly billing cycle works — from your first collection to your first invoice — and how to read the Ecommerce, Transport Charges, and Courier Duty & VAT invoices we send you.",
  path: PATH,
});

const toc = [
  { id: "billing-cycle", label: "1. Understanding your weekly billing cycle" },
  { id: "your-invoices", label: "2. Understanding your invoices" },
  { id: "ecommerce-invoice", label: "Type 1 — Ecommerce invoice (six tabs)" },
  { id: "transport-charges", label: "Type 2 — Transport Charges invoice" },
  { id: "duty-vat", label: "Type 3 — Courier Duty & VAT invoice" },
  { id: "demo-downloads", label: "Demo invoice downloads" },
  { id: "glossary", label: "Field glossary" },
  { id: "faq", label: "Invoice FAQ" },
];

const steps = [
  { n: "1", title: "You ship", desc: "Book and ship parcels through your carriers, as normal." },
  { n: "2", title: "Week closes", desc: "The billing week ends Friday (Sat–Fri)." },
  { n: "3", title: "Carrier data", desc: "Each carrier sends us that week's shipment data." },
  { n: "4", title: "We price it", desc: "Match to your account, apply agreed rates, surcharges & VAT." },
  { n: "5", title: "Invoice issued", desc: "One weekly invoice, covering all carriers." },
];

const paymentTerms = [
  { field: "Invoice Date", meaning: "The date the invoice was issued." },
  { field: "Payment Term", meaning: "Your agreed terms (e.g. “End of following month”)." },
  { field: "Payment Method", meaning: "How to pay (e.g. BACS)." },
  { field: "Date Due", meaning: "The date payment must reach us by." },
  { field: "Account Reference", meaning: "Your unique account number — quote it on every payment and query." },
];

const invoiceTypes = [
  {
    type: "Ecommerce",
    covers: "Domestic & international parcel carriage (e.g. Evri, DPD)",
    tabs: "INVOICE · Summary · UK Consignments · Intl Consignments · UK Surcharges · INTL Surcharges",
  },
  {
    type: "Transport Charges",
    covers: "Express / courier freight (e.g. FedEx, UPS, DHL)",
    tabs: "INVOICE · Consignments",
  },
  {
    type: "Courier Duty & VAT",
    covers: "Import customs duty & VAT due on your imported goods",
    tabs: "INVOICE · Details",
  },
];

const ecommerceTabs = [
  { tab: "INVOICE", purpose: "The invoice itself — totals, VAT and how to pay. This is the page you pay from." },
  { tab: "Summary", purpose: "The total broken down by carrier → category → package → service, with a subtotal per group." },
  { tab: "UK Consignments", purpose: "Every individual UK parcel — one row each, with barcode, service, weight, postcode and price." },
  { tab: "Intl Consignments", purpose: "Every individual international parcel. Same idea, plus Billed Weight and Zone columns." },
  { tab: "UK Surcharges", purpose: "Standalone UK surcharges (e.g. under-declared weight, relabelling), one row each." },
  { tab: "INTL Surcharges", purpose: "Standalone international surcharges — including fuel and clearance fees." },
];

const invoiceBlocks = [
  { n: "1", title: "Company header", desc: "who the invoice is from, with our registered company and VAT numbers." },
  { n: "2", title: "Bill-to & invoice details", desc: "your billing address (left) and the key facts (right): Invoice Number, Account Reference, Invoice/Due dates, Payment Term & Method, and VAT Registration No." },
  { n: "3", title: "Period & carrier summary", desc: "the billing week, then one row per carrier with the number of shipments and the value." },
  { n: "4", title: "VAT Code table", desc: "the net (FcTotal) and VAT for each VAT code (most lines are code 1, Standard 20%)." },
  { n: "5", title: "Payment details & totals", desc: "where to pay, plus Net Total, VAT and Total (the amount to pay)." },
  { n: "6", title: "Footer", desc: "fee note and the 7-day query instructions." },
];

const downloads = [
  {
    name: "Ecommerce invoice (Week 25)",
    file: "/downloads/billing/ecommerce-week-25-invoice-demo.xlsx",
    detail: "Six tabs — INVOICE, Summary, UK/Intl Consignments, UK/INTL Surcharges",
    size: "3.1 MB",
  },
  {
    name: "Transport Charges invoice",
    file: "/downloads/billing/transport-charges-invoice-demo.xlsx",
    detail: "Two tabs — INVOICE and Consignments (express / courier freight)",
    size: "33 KB",
  },
  {
    name: "Courier Duty & VAT invoice",
    file: "/downloads/billing/courier-duty-and-vat-invoice-demo.xlsx",
    detail: "Two tabs — INVOICE and Details (import duty & VAT)",
    size: "55 KB",
  },
  {
    name: "Ecommerce Duty & VAT invoice",
    file: "/downloads/billing/ecommerce-duty-and-vat-invoice-demo.xlsx",
    detail: "Two tabs — INVOICE and Details (import duty & VAT, ecommerce parcels)",
    size: "33 KB",
  },
];

const glossary = [
  { term: "Shipments", meaning: "Number of parcels." },
  { term: "Consignment", meaning: "A single parcel/shipment." },
  { term: "Surcharge", meaning: "An extra charge on top of carriage (e.g. fuel, under-declared weight, relabelling, clearance)." },
  { term: "Global Energy", meaning: "The fuel surcharge — shown as a surcharge line, not a separate tab." },
  { term: "FcTotal", meaning: "The amount in your invoice currency. On the front page it's the net; on surcharge tabs it's that line's charge." },
  { term: "Net Total", meaning: "Amount before VAT." },
  { term: "VAT", meaning: "Value Added Tax added to the net amount (Standard rate 20%)." },
  { term: "Total", meaning: "The amount to pay = Net + VAT." },
  { term: "Weight (gr) / Billed Weight (gr)", meaning: "Actual weight vs the weight charged on (may be higher — volumetric/minimum)." },
  { term: "Zone", meaning: "The pricing region a destination falls into." },
  { term: "Barcode / AWB", meaning: "The carrier's tracking number for a parcel." },
  { term: "Reference", meaning: "Your own order references, carried through from your shipping data." },
];

const faqs = [
  {
    question: "Which tab do I pay from?",
    answer:
      "The INVOICE tab — pay the Total using the bank details shown and quote the invoice number.",
  },
  {
    question: "Why are there UK and Intl tabs (ecommerce)?",
    answer:
      "The detail is split into UK vs international consignments and surcharges. Which carrier falls under which depends on how that carrier's data is processed.",
  },
  {
    question: "Where is the fuel charge?",
    answer:
      "On the surcharge tabs, as the “Global Energy” line — there is no separate fuel tab.",
  },
  {
    question: "Why did I get a Transport Charges or Duty & VAT invoice?",
    answer:
      "Transport Charges cover express/courier freight; Courier Duty & VAT covers the customs duty and import VAT due on your imported goods.",
  },
  {
    question: "Something looks wrong — what do I do?",
    answer:
      "Email uk-invqueries@itdglobal.com within 7 days, quoting the invoice number.",
  },
];

/** Shared table shell — bordered, horizontally scrollable on narrow screens. */
function HelpTable({
  head,
  rows,
  footNote,
}: {
  head: string[];
  rows: (string | React.ReactNode)[][];
  footNote?: string;
}) {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-bg-secondary text-text-primary">
            <tr>
              {head.map((h) => (
                <th key={h} className="px-3 py-3 text-left font-semibold whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-text-secondary">
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j} className={`px-3 py-3 ${j === 0 ? "font-medium text-text-primary" : ""}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footNote && <p className="mt-2 text-caption text-text-tertiary">{footNote}</p>}
    </div>
  );
}

function TabPills({ tabs }: { tabs: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-hidden>
      {tabs.map((t, i) => (
        <span
          key={t}
          className={`inline-block rounded-md border px-2.5 py-1 text-caption ${
            i === 0
              ? "border-accent/40 bg-accent-light text-accent font-semibold"
              : "border-border bg-bg-secondary text-text-secondary"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function BillingPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Help", path: "/help" },
      { name: "Help Centre", path: "/help/centre" },
      { name: "Billing & Invoices", path: PATH },
    ]),
    faqSchema(faqs),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HashScroll />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-eyebrow mb-4">
              Billing
            </span>
            <h1 className="text-display-xl text-text-primary">
              Billing &amp; Invoices
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              How our weekly billing cycle works — from your first collection to
              your first invoice — and how to read the invoices we send you.
            </p>
            <p className="mt-4 text-caption text-text-tertiary max-w-2xl mx-auto">
              For customers · e-commerce parcel billing. All customer names,
              figures, account numbers, barcodes, references and bank details in
              this guide are fictional examples only.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Table of contents */}
      <section className="bg-white pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-bg-secondary rounded-xl border border-border p-6">
              <p className="text-eyebrow text-text-primary mb-4">On this page</p>
              <ol className="space-y-2">
                {toc.map((s) => (
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

      {/* Article */}
      <article className="bg-white pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* ─── Section 1: Billing cycle ─── */}
          <section id="billing-cycle" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              1. Understanding your weekly billing cycle
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                We bill for parcels weekly, in arrears. This section explains how
                a parcel you ship becomes a line on your invoice, and when to
                expect your first bill.
              </p>
              <h3 className="text-heading-md text-text-primary pt-2">
                What is a &ldquo;billing week&rdquo;?
              </h3>
              <p>
                Your account is billed in weekly periods. Each billing week runs
                Saturday to Friday. Every parcel falls into the week in which it
                was shipped, and your invoice shows the week number it covers
                (for example, &ldquo;E-COMMERCE PARCEL CHARGES BILLED WEEK
                25&rdquo;).
              </p>
              <div className="border-l-4 border-accent bg-accent-light/40 rounded-r-xl p-5">
                <p className="text-text-primary">
                  <strong>One invoice, all carriers.</strong> A single invoice
                  covers one billing week and includes every carrier you shipped
                  with that week — Evri and DPD appear on the same invoice, not
                  separate ones.
                </p>
              </div>
            </div>

            <h3 className="text-heading-md text-text-primary mt-8 mb-4">
              From collection to invoice — the 5 steps
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map((s) => (
                <div key={s.n} className="rounded-xl border border-border bg-bg-secondary p-4">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white text-sm font-bold mb-2">
                    {s.n}
                  </span>
                  <p className="text-label text-text-primary mb-1">{s.title}</p>
                  <p className="text-caption text-text-secondary">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 text-text-secondary leading-relaxed">
              <h3 className="text-heading-md text-text-primary">
                When will I get my first invoice?
              </h3>
              <p>
                Because billing runs a full week in arrears, your first invoice
                covers your first full billing week (Sat–Fri) and is issued the
                following week, once all carrier data has arrived. As a rule of
                thumb, expect your first invoice around 1–2 weeks after your
                first shipments. The exact issue day depends on when each carrier
                delivers their weekly data to us.
              </p>
              <div className="rounded-xl border border-border bg-bg-secondary p-5">
                <p className="text-body-sm text-text-secondary">
                  <strong className="text-text-primary">New account tip:</strong>{" "}
                  your very first invoice may cover a part-week if you started
                  shipping mid-week. From then on, each invoice covers a full
                  Saturday–Friday week.
                </p>
              </div>
            </div>

            <h3 className="text-heading-md text-text-primary mt-8 mb-4">
              Payment terms &amp; due dates
            </h3>
            <HelpTable
              head={["On the invoice", "What it means"]}
              rows={paymentTerms.map((p) => [p.field, p.meaning])}
            />
            <p className="mt-4 text-text-secondary leading-relaxed">
              Pay using the bank details printed on the invoice, and quote your
              invoice number as the payment reference so we can match your
              payment quickly.
            </p>

            <div className="mt-8 border-l-4 border-accent bg-accent-light/40 rounded-r-xl p-5">
              <p className="text-eyebrow text-accent mb-2">Questions about a charge?</p>
              <p className="text-text-primary">
                If something doesn&apos;t look right, email{" "}
                <a href={`mailto:${QUERIES_EMAIL}`} className="text-accent font-medium hover:underline">
                  {QUERIES_EMAIL}
                </a>{" "}
                within 7 days of receiving the invoice, quoting the invoice
                number. Please note: a service failure (e.g. a late delivery) is
                not an invoice query and must be raised separately.
              </p>
            </div>
          </section>

          {/* ─── Section 2: Your invoices ─── */}
          <section id="your-invoices" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              2. Understanding your invoices
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed mb-6">
              <p>
                Every invoice is an Excel workbook (.xlsx) with tabs (sheets)
                along the bottom — the first tab is the one you pay from, and the
                others break the charges down to individual shipments. Depending
                on the services you use, you may receive up to three types of
                invoice:
              </p>
            </div>
            <HelpTable
              head={["Invoice type", "Covers", "Tabs"]}
              rows={invoiceTypes.map((t) => [t.type, t.covers, t.tabs])}
            />
          </section>

          {/* ─── Type 1: Ecommerce ─── */}
          <section id="ecommerce-invoice" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              Type 1 · Ecommerce invoice — the six tabs
            </h2>
            <div className="mb-5">
              <TabPills tabs={["INVOICE", "Summary", "UK Consignments", "Intl Consignments", "UK Surcharges", "INTL Surcharges"]} />
            </div>
            <HelpTable
              head={["Tab", "What it's for"]}
              rows={ecommerceTabs.map((t) => [t.tab, t.purpose])}
            />
            <div className="mt-6 rounded-xl border border-border bg-bg-secondary p-5">
              <p className="text-body-sm text-text-secondary">
                <strong className="text-text-primary">Where&apos;s the fuel charge?</strong>{" "}
                There is no separate fuel tab. Fuel appears as a surcharge line —
                labelled &ldquo;Global Energy&rdquo; — on the surcharge tabs,
                alongside charges like &ldquo;EU Clearance Fee&rdquo;.
              </p>
            </div>

            {/* Tab 1 — INVOICE mock */}
            <h3 className="text-heading-md text-text-primary mt-10 mb-3">
              Tab 1 — the &ldquo;INVOICE&rdquo; page
            </h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              This is the front page and the one you pay from. It reads
              top-to-bottom in the blocks below.
            </p>
            <figure className="rounded-2xl border-2 border-border overflow-hidden">
              <figcaption className="bg-bg-dark px-5 py-3 text-caption text-white/80">
                Example — Ecommerce INVOICE tab (fictional data)
              </figcaption>
              <div className="divide-y divide-border text-sm">
                <div className="relative bg-bg-secondary/60 px-5 py-4 pl-14">
                  <span className="absolute left-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">1</span>
                  <p className="font-semibold text-text-primary">ITD Global is a division of Interdelta Limited</p>
                  <p className="text-text-secondary">Unit A, Birch Business Park, Whittle Ln, Heywood OL10 2SX, United Kingdom</p>
                  <p className="text-text-tertiary text-caption">Company Registered Number: 5103858 · VAT Number: 837 879 951</p>
                </div>
                <div className="relative grid gap-4 px-5 py-4 pl-14 sm:grid-cols-2">
                  <span className="absolute left-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">2</span>
                  <div className="text-text-secondary">
                    <p className="font-medium text-text-primary">Acme Demo Retail Ltd</p>
                    <p>Unit 5, Example Business Park</p>
                    <p>Anytown, ZZ1 1ZZ · (GB) United Kingdom</p>
                  </div>
                  <div className="text-text-secondary">
                    <p>Invoice Number: <strong className="text-text-primary">ECOM00012345</strong></p>
                    <p>Account Reference: 100482 · Invoice Date: 25-06-2026</p>
                    <p>Payment Term: End of following month · BACS · Due 31-07-2026</p>
                  </div>
                </div>
                <div className="relative px-5 py-4 pl-14">
                  <span className="absolute left-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">3</span>
                  <p className="text-eyebrow text-text-tertiary mb-2">E-COMMERCE PARCEL CHARGES BILLED WEEK 25</p>
                  <div className="grid max-w-sm grid-cols-3 gap-x-4 text-text-secondary">
                    <span className="font-medium text-text-primary">Carrier</span><span>Shipments</span><span>Value</span>
                    <span>Evri</span><span>7,500</span><span>£18,000.00</span>
                    <span>DPD</span><span>1,000</span><span>£4,000.00</span>
                  </div>
                </div>
                <div className="relative px-5 py-4 pl-14">
                  <span className="absolute left-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">4</span>
                  <div className="grid max-w-sm grid-cols-3 gap-x-4 text-text-secondary">
                    <span className="font-medium text-text-primary">VAT code</span><span>FcTotal</span><span>VAT</span>
                    <span>1 Standard</span><span>£22,000.00</span><span>£4,400.00</span>
                  </div>
                </div>
                <div className="relative grid gap-4 px-5 py-4 pl-14 sm:grid-cols-2">
                  <span className="absolute left-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">5</span>
                  <div className="text-text-secondary">
                    <p className="text-eyebrow text-text-tertiary mb-1">Payment can be made to</p>
                    <p>Account Name: Interdelta Limited</p>
                    <p>Account Number: 00000000 (example) · Sort Code: 00-00-00 (example)</p>
                  </div>
                  <div className="text-text-secondary sm:text-right">
                    <p>Net Total: £22,000.00</p>
                    <p>VAT: £4,400.00</p>
                    <p className="font-semibold text-text-primary">Total: £26,400.00</p>
                  </div>
                </div>
                <div className="relative px-5 py-4 pl-14">
                  <span className="absolute left-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">6</span>
                  <p className="text-caption text-text-tertiary">
                    Includes tech / label generation fee. Queries must be raised
                    within 7 days of invoice receipt to {QUERIES_EMAIL}. A service
                    failure is not classified as an invoice query.
                  </p>
                </div>
              </div>
            </figure>
            <ol className="mt-5 space-y-2">
              {invoiceBlocks.map((b) => (
                <li key={b.n} className="flex gap-3 text-body-sm text-text-secondary">
                  <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-light text-accent text-xs font-bold mt-0.5">
                    {b.n}
                  </span>
                  <span>
                    <strong className="text-text-primary">{b.title}</strong> — {b.desc}
                  </span>
                </li>
              ))}
            </ol>

            {/* Tab 2 — Summary */}
            <h3 className="text-heading-md text-text-primary mt-10 mb-3">
              Tab 2 — the &ldquo;Summary&rdquo; tab
            </h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              Breaks the invoice total down by carrier → category → package →
              service. Rows are grouped, with a subtotal after each group.
            </p>
            <HelpTable
              head={["Carrier", "Category", "Service", "Shipments", "Unit price", "Value", "VAT code"]}
              rows={[
                ["Evri", "Consignments", "PACKET - MAINLAND 48", "6,000", "£2.00", "£12,000.00", "1"],
                ["", "", "PACKET - MAINLAND NEXT DAY", "1,000", "£3.00", "£3,000.00", "1"],
                ["", "", "PACKET - HIGHLANDS & ISLANDS", "500", "£5.00", "£2,500.00", "1"],
                [<em key="s1">Subtotal (PACKET)</em>, "", "", "7,500", "", "£17,500.00", ""],
                ["Evri", "Surcharges", "RELABELLING", "300", "£1.00", "£300.00", "1"],
                ["", "", "UNDERDECLARED", "200", "£1.00", "£200.00", "1"],
                [<em key="s2">Surcharges subtotal</em>, "", "", "500", "", "£500.00", ""],
                ["DPD", "Consignments", "DPD NEXT DAY MAINLAND", "1,000", "£3.50", "£3,500.00", "1"],
                ["DPD", "Surcharges", "Global Energy (fuel)", "1,000", "£0.40", "£400.00", "1"],
                ["", "", "EU Clearance Fee", "200", "£0.50", "£100.00", "1"],
                [<strong key="t">Invoice total (ex VAT)</strong>, "", "", "", "", "£22,000.00", ""],
              ]}
              footNote="Figures illustrative. Unit price × Shipments = Value; each subtotal rolls up to the carrier value on the INVOICE tab."
            />

            {/* Tab 3 — UK Consignments */}
            <h3 className="text-heading-md text-text-primary mt-10 mb-3">
              Tab 3 — &ldquo;UK Consignments&rdquo;
            </h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              Every individual UK parcel, one row each — with barcode, service,
              weight, postcode and price.
            </p>
            <HelpTable
              head={["Date", "Carrier", "Barcode", "Service", "Reference", "Weight (gr)", "Postcode", "Next day", "Total"]}
              rows={[
                ["22-06-2026", "Evri", "DEMO01000101", "MAINLAND 48", "REF-10101", "750", "ZZ1 1AA", "", "£2.00"],
                ["22-06-2026", "Evri", "DEMO01000102", "MAINLAND 48", "REF-10102", "540", "ZZ2 2BB", "", "£2.00"],
                ["23-06-2026", "Evri", "DEMO01000103", "MAINLAND NEXT DAY", "REF-10103", "820", "ZZ3 3CC", "Yes", "£3.00"],
                [<em key="more">… one row per parcel …</em>, "", "", "", "", "", "", "", ""],
              ]}
            />

            {/* Tab 4 — Intl Consignments */}
            <h3 className="text-heading-md text-text-primary mt-10 mb-3">
              Tab 4 — &ldquo;Intl Consignments&rdquo;
            </h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              The same for international parcels, plus Billed Weight (gr) and
              Zone.
            </p>
            <HelpTable
              head={["Date", "Carrier", "Barcode", "Service", "Reference", "Weight (gr)", "Billed wt (gr)", "Zone", "Total"]}
              rows={[
                ["18-06-2026", "DPD", "DEMO01000601", "DPD NEXT DAY", "REF-10601", "0", "30000", "MAINLAND", "£3.50"],
                ["18-06-2026", "DPD", "DEMO01000602", "DPD NEXT DAY", "REF-10602", "0", "30000", "MAINLAND", "£3.50"],
                [<em key="more">… one row per parcel …</em>, "", "", "", "", "", "", "", ""],
              ]}
            />
            <div className="mt-4 rounded-xl border border-border bg-bg-secondary p-5">
              <p className="text-body-sm text-text-secondary">
                <strong className="text-text-primary">Billed Weight</strong> may
                be higher than the actual weight — parcels can be charged on a
                volumetric or minimum billable weight.
              </p>
            </div>

            {/* Tab 5 — UK Surcharges */}
            <h3 className="text-heading-md text-text-primary mt-10 mb-3">
              Tab 5 — &ldquo;UK Surcharges&rdquo;
            </h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              Standalone UK surcharges. The Surcharge column names the charge,
              Description/Reason explain it, and FcTotal is the amount.
            </p>
            <HelpTable
              head={["Date", "Carrier", "Barcode", "Description", "Postcode", "Surcharge", "FcTotal"]}
              rows={[
                ["07-06-2026", "Evri", "DEMO01000701", "Pre-advise 500g / actual 650g", "ZZ1 1AA", "UNDERDECLARED", "£1.00"],
                ["07-06-2026", "Evri", "DEMO01000702", "Parcel despatch A — Relabelling", "ZZ2 2BB", "RELABELLING", "£1.00"],
                [<em key="more">… one row per surcharge …</em>, "", "", "", "", "", ""],
              ]}
            />

            {/* Tab 6 — INTL Surcharges */}
            <h3 className="text-heading-md text-text-primary mt-10 mb-3">
              Tab 6 — &ldquo;INTL Surcharges&rdquo;
            </h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              Standalone international surcharges — same columns. This is where
              fuel appears, as &ldquo;Global Energy&rdquo;, along with &ldquo;EU
              Clearance Fee&rdquo;.
            </p>
            <HelpTable
              head={["Date", "Carrier", "Barcode", "Postcode", "Surcharge", "FcTotal"]}
              rows={[
                ["15-06-2026", "DPD", "DEMO01000901", "ZZ3 3CC", "Global Energy", "£0.40"],
                ["15-06-2026", "DPD", "DEMO01000902", "ZZ4 4DD", "EU Clearance Fee", "£0.50"],
                [<em key="more">… one row per surcharge …</em>, "", "", "", "", ""],
              ]}
            />
          </section>

          {/* ─── Type 2: Transport Charges ─── */}
          <section id="transport-charges" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              Type 2 · Transport Charges invoice
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed mb-5">
              <p>
                Issued for express / courier freight (carriers like FedEx, UPS
                and DHL). Two tabs: INVOICE and Consignments.
              </p>
              <TabPills tabs={["INVOICE", "Consignments"]} />
            </div>
            <HelpTable
              head={["VAT band", "Shipments / adj.", "Net", "VAT"]}
              rows={[
                ["At 20% VAT", "214", "£8,420.00", "£1,684.00"],
                ["At 0% VAT", "12", "£380.00", "£0.00"],
                ["Shipments", "220", "£8,600.00", ""],
                ["Adjustments", "6", "£200.00", ""],
                [<strong key="t">Total</strong>, "", <strong key="n">£10,484.00</strong>, "(Net £8,800.00 + VAT £1,684.00)"],
              ]}
              footNote="Example INVOICE-tab figures (fictional). Invoice Number EXP00004821 · Account Reference 100482 · Terms: End of following month · BACS."
            />
            <h3 className="text-heading-md text-text-primary mt-8 mb-3">
              Consignments tab — one row per shipment
            </h3>
            <HelpTable
              head={["Date", "AWB", "Carrier", "Service", "Pieces", "Weight", "Zone", "Destination", "Freight", "Fuel", "Amount"]}
              rows={[
                ["16-06-2026", "DEMO00001001", "FedEx", "INTERNATIONAL PRIORITY", "1", "2.5", "EU", "Berlin, DE", "£18.40", "£2.30", "£25.20"],
                ["17-06-2026", "DEMO00001002", "UPS", "EXPRESS SAVER", "2", "5.0", "USA", "New York, US", "£42.10", "£5.26", "£50.56"],
                [<em key="more">… one row per shipment …</em>, "", "", "", "", "", "", "", "", "", ""],
              ]}
              footNote="Full column set: Date · AWB · Carrier · Service Name · Package Type · Pieces · Weight · Volume Weight · Zone · Origin Country · Origin · Destination Country · Destination · Reference · Customer Reference (1 & 2) · Sales Account Child ID · Received By · Received Date · Vat Code · Amount · Freight Amount · Fuel Surcharge · Fuel Surcharge % · Extra Charge 1–4 (name + amount)."
            />
          </section>

          {/* ─── Type 3: Courier Duty & VAT ─── */}
          <section id="duty-vat" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              Type 3 · Courier Duty &amp; VAT invoice
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed mb-5">
              <p>
                Covers the import customs duty &amp; VAT due on goods brought in
                under your account — the customs charges payable by you to clear
                those shipments. Two tabs: INVOICE and Details.
              </p>
              <TabPills tabs={["INVOICE", "Details"]} />
            </div>
            <HelpTable
              head={["Carrier", "Total items", "Customs duty", "Customs VAT", "Surcharges", "Total"]}
              rows={[
                ["FedEx", "128", "£640.00", "£1,280.00", "£96.00", "£2,016.00"],
                ["DHL", "74", "£310.50", "£621.00", "£55.50", "£987.00"],
                [<strong key="t">Total to pay</strong>, "", "", "", "", <strong key="v">£3,603.60</strong>],
              ]}
              footNote="Example INVOICE-tab figures (fictional): Net £3,003.00 + VAT £600.60. Invoice Number DV00007731 · Account Reference 100482."
            />
            <div className="mt-5 border-l-4 border-accent bg-accent-light/40 rounded-r-xl p-5">
              <p className="text-text-primary text-body-sm">
                This invoice covers the customs duty and import VAT due on goods
                imported under your account — the charges payable by you to clear
                those shipments (plus a handling admin fee). It&apos;s separate
                from the carriage charges on your other invoices.
              </p>
            </div>
            <h3 className="text-heading-md text-text-primary mt-8 mb-3">
              Details tab — one row per cleared shipment
            </h3>
            <HelpTable
              head={["Trigger date", "Carrier", "AWB", "Reference", "Item value", "Description", "Customs charge", "Duty", "VAT", "Admin fee"]}
              rows={[
                ["12-06-2026", "FedEx", "DEMO00003001", "REF-30001", "£25.00", "Cosmetics", "£21.00", "£3.00", "£6.00", "£12.00"],
                ["13-06-2026", "DHL", "DEMO00003002", "REF-30002", "£28.00", "Electronics", "£23.00", "£4.00", "£7.00", "£12.00"],
                [<em key="more">… one row per cleared shipment …</em>, "", "", "", "", "", "", "", "", ""],
              ]}
            />
          </section>

          {/* ─── Demo downloads ─── */}
          <section id="demo-downloads" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">
              Demo invoice downloads
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Download the demo workbooks this guide is based on and explore each
              tab in Excel. All data is fictional — names, figures, barcodes,
              references and bank details are examples only.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {downloads.map((d) => (
                <a
                  key={d.file}
                  href={d.file}
                  download
                  className="group flex items-start gap-3 rounded-xl border border-border bg-bg-secondary p-4 transition-colors hover:border-accent/30 hover:bg-white"
                >
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-accent-light text-accent">
                    <FileSpreadsheet className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-text-primary group-hover:text-accent">
                      {d.name}
                      <Download className="h-3.5 w-3.5 text-text-tertiary group-hover:text-accent" />
                    </span>
                    <span className="mt-0.5 block text-caption text-text-secondary">{d.detail}</span>
                    <span className="mt-0.5 block text-caption text-text-tertiary">.xlsx · {d.size}</span>
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* ─── Glossary ─── */}
          <section id="glossary" className="scroll-mt-24">
            <h2 className="text-display-lg text-text-primary mb-5">Field glossary</h2>
            <HelpTable
              head={["Term", "Meaning"]}
              rows={glossary.map((g) => [g.term, g.meaning])}
            />
          </section>
        </div>
      </article>

      {/* FAQ */}
      <section id="faq" className="bg-bg-secondary py-16 md:py-20 border-t border-border scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-10 text-center">
              FAQ
            </h2>
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

      {/* CTA */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">
              Questions about an invoice?
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              Email{" "}
              <a href={`mailto:${QUERIES_EMAIL}`} className="text-white underline underline-offset-2 hover:text-accent-light">
                {QUERIES_EMAIL}
              </a>{" "}
              within 7 days of receiving the invoice, quoting the invoice number
              — or raise a request and the team will pick it up.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://support.itdglobal.com/hc/en-gb/requests/new"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Submit a request
              </a>
              <Link
                href="/help/centre"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Back to Help Centre
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
