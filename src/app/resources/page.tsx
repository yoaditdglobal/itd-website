import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import { ArrowRight, BookOpen, BookMarked, Newspaper, LifeBuoy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata = buildMetadata({
  title: "Resources — customer stories, guides, glossary and help",
  description:
    "Everything we publish for UK shippers in one place: customer case studies, operator guides on shipping and customs, a logistics glossary, and the Help Centre.",
  path: "/resources",
});

type ResourceSection = {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
  meta: string;
};

/** The four resource surfaces. Counts are stated loosely ("110+") so this
 *  hub doesn't need touching every time a story or term is added. */
const sections: ResourceSection[] = [
  {
    name: "Customer Stories",
    href: "/resources/case-studies",
    icon: Newspaper,
    description:
      "How UK retailers, marketplace sellers, 3PLs, importers and exporters ship with ITD — with the results they got.",
    meta: "Case studies across eCommerce, 3PL, Import and Export",
  },
  {
    name: "Guides",
    href: "/resources/guides",
    icon: BookOpen,
    description:
      "Operator guides on UK shipping, customs, Far East imports, freight, and marketplace fulfilment. Plain English, no fluff.",
    meta: "In-depth guides for operators",
  },
  {
    name: "Glossary",
    href: "/resources/glossary",
    icon: BookMarked,
    description:
      "Plain-English definitions of the logistics, customs and marketplace terms UK shippers actually run into — EORI, IOSS, WISMO, HS codes and more.",
    meta: "110+ terms, searchable",
  },
  {
    name: "Help Centre",
    href: "/help/centre",
    icon: LifeBuoy,
    description:
      "Account and admin, claims policies for every carrier, billing, and how-tos for the Connexx platform.",
    meta: "Support articles and carrier claims policies",
  },
];

export default function ResourcesHubPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources" },
    ]),
    itemListSchema({
      path: "/resources",
      name: "ITD Global Resources",
      items: sections.map((s) => ({
        name: s.name,
        url: s.href,
        description: s.description,
      })),
    }),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-eyebrow mb-4">
              Resources
            </span>
            <h1 className="text-display-xl text-text-primary">
              Everything we publish, in one place
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              Customer stories, operator guides, a plain-English logistics
              glossary, and the Help Centre — written for the people who run
              UK shipping operations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section cards */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {sections.map((s, i) => (
              <ScrollReveal key={s.href} delay={i * 0.08} className="h-full">
                <Link
                  href={s.href}
                  className="group flex h-full flex-col bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent-light text-accent">
                      <s.icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <p className="text-heading-lg text-text-primary group-hover:text-accent transition-colors">
                      {s.name}
                    </p>
                  </div>
                  <p className="text-body-sm text-text-secondary mb-4">
                    {s.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-text-tertiary">{s.meta}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-accent font-medium">
                      Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
