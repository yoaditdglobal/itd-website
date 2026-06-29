import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ReadingProgress from "@/components/ui/ReadingProgress";
import { buildMetadata } from "@/lib/metadata";
import {
  JsonLd,
  breadcrumbSchema,
  definedTermSetSchema,
} from "@/components/seo/JsonLd";
import GlossaryIndex from "@/components/sections/GlossaryIndex";
import { GLOSSARY_ENTRIES, categories } from "@/lib/glossary";

export const metadata = buildMetadata({
  title: "Logistics & Shipping Glossary",
  description:
    "Plain-English definitions of UK and international shipping terms used by retailers, 3PLs, exporters, and importers. WISMO, EORI, IOSS, HS codes, and more.",
  path: "/resources/glossary",
});

const PATH = "/resources/glossary";

export default function GlossaryPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources/case-studies" },
      { name: "Glossary", path: PATH },
    ]),
    definedTermSetSchema({
      path: PATH,
      name: "ITD Global Logistics & Shipping Glossary",
      description:
        "Plain-English definitions of UK and international shipping terms used by retailers, 3PLs, exporters, and importers.",
      terms: GLOSSARY_ENTRIES.map((e) => ({
        slug: e.slug,
        code: e.code,
        name: e.name,
        description: e.definition,
      })),
    }),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReadingProgress />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-eyebrow mb-4">
              Resources
            </span>
            <h1 className="text-display-xl text-text-primary">
              Logistics &amp; Shipping Glossary
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              Every term a dispatch manager, customs lead, or marketplace seller hears in a Monday meeting. Plain definitions, no marketing language. Built from the vocabulary our customers use every day across Royal Mail, DPD, Evri, DHL, HMRC, CDS, and the carriers and regulators that shape UK and international shipping.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How to use this page */}
      <section className="bg-bg-secondary py-12 md:py-16 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">How to use this page</p>
            <p className="text-body-md text-text-secondary mb-4">
              Five categories: Carrier, Customs, Operational, Technical, and Regulatory. Each entry runs to one sentence of plain definition, then two or three sentences of context that show when the term turns up and what it costs you when it goes wrong. Every entry links out to the page on this site that handles the term in the product.
            </p>
            <p className="text-body-md text-text-secondary">
              Use the search box or the category filters to narrow the list. Every entry has its own anchor URL (e.g. <code className="text-caption bg-white px-1.5 py-0.5 rounded border border-border">/resources/glossary#wismo-where-is-my-order</code>) so you can link to a single definition from an internal ticket, an RFP, or a customer reply.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Searchable, filterable index (client) */}
      <GlossaryIndex entries={GLOSSARY_ENTRIES} categories={categories} />

      {/* CTA */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">
              The vocabulary, applied to your dispatch.
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              Connexx handles every term in this glossary inside one platform. From WISMO to PVA, from VTR to landed cost. Talk to us about the ones that hurt right now.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/connexx"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                See how Connexx works
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
