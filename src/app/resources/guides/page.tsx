import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import { ArrowRight, Clock } from "lucide-react";

export const metadata = buildMetadata({
  title: "Guides for UK shippers, importers, and marketplace sellers",
  description:
    "Operator guides on UK shipping, customs, imports, and marketplace fulfilment. Written for dispatch managers, import leads, and marketplace sellers. Plain English, no fluff.",
  path: "/resources/guides",
});

type Guide = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readingTime: string;
  updated: string;
};

const guides: Guide[] = [
  {
    slug: "far-east-imports",
    title: "Importing from China and the Far East into the UK",
    summary:
      "A working guide for UK importers bringing goods in from China, Vietnam, India, Bangladesh, and Turkey. CDS declarations, UK Global Tariff duty, Incoterms, sea versus air freight, Postponed VAT Accounting, and the holds that catch new importers.",
    category: "Import",
    readingTime: "18 min read",
    updated: "20 May 2026",
  },
  {
    slug: "fbm",
    title: "Fulfilled by Merchant on Amazon: the UK seller's guide",
    summary:
      "A working guide for UK Amazon sellers running their own dispatch instead of FBA. The metrics that get you suspended, the carriers that keep you compliant, the workflow that scales past 1,000 orders a day, and how Seller Fulfilled Prime actually works in 2026.",
    category: "Marketplace",
    readingTime: "16 min read",
    updated: "20 May 2026",
  },
];

export default function GuidesIndexPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources/case-studies" },
      { name: "Guides", path: "/resources/guides" },
    ]),
    itemListSchema({
      path: "/resources/guides",
      name: "ITD Global Guides",
      items: guides.map((g) => ({
        name: g.title,
        url: `/resources/guides/${g.slug}`,
        description: g.summary,
      })),
    }),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-eyebrow mb-4">
              Resources
            </span>
            <h1 className="text-display-xl text-text-primary">Guides</h1>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Operator guides for UK shippers, importers, and marketplace sellers. Plain definitions, working examples, and the trade-offs the textbooks skip.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Guides grid */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide, i) => (
              <ScrollReveal key={guide.slug} delay={i * 0.08}>
                <Link
                  href={`/resources/guides/${guide.slug}`}
                  className="group block bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/20 transition-all h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-accent-light text-accent text-eyebrow">
                      {guide.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-text-tertiary">
                      <Clock className="w-3 h-3" /> {guide.readingTime}
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {guide.title}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{guide.summary}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-text-tertiary">Updated {guide.updated}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-accent font-medium">
                      Read guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        headline="Need a hand with the operating decisions?"
        subtitle="Talk to our team about routing every shipment, declaration, and dispatch through Connexx."
      />
    </>
  );
}
