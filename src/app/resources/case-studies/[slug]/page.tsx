import Image from "next/image";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import CaseStudyStats from "@/components/sections/CaseStudyStats";
import CaseStudyStack from "@/components/sections/CaseStudyStack";
import QuoteBlock from "@/components/sections/QuoteBlock";
import RelatedStories from "@/components/sections/RelatedStories";
import Breadcrumb from "@/components/ui/Breadcrumb";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import {
  JsonLd,
  breadcrumbSchema,
  articleSchema,
  reviewSchema,
} from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import {
  caseStudies,
  getCaseStudyBySlug,
  getRelatedStories,
  type CaseStudy,
  type CaseStudyQuote,
} from "@/lib/data";

const CS_BASE = "/resources/case-studies";
/** Fallback publish date for Article JSON-LD when a story carries none. */
const DEFAULT_PUBLISHED = "2026-01-01";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case study not found" };
  return buildMetadata({
    title: `${cs.brandName} — ${cs.metric}`,
    description: cs.summary,
    path: `${CS_BASE}/${cs.slug}`,
    image: cs.heroImage,
    ogType: "article",
  });
}

/**
 * Unify the legacy single-quote fields and the new `quotes` array into one
 * list. A story with the array uses it verbatim; otherwise the legacy
 * `quote`/`quoteAuthor`/`quoteAuthorPhoto` becomes a single feature quote.
 */
function resolveQuotes(cs: CaseStudy): CaseStudyQuote[] {
  if (cs.quotes && cs.quotes.length > 0) return cs.quotes;
  if (cs.quote) {
    return [
      {
        quote: cs.quote,
        name: cs.quoteAuthor ?? "",
        photo: cs.quoteAuthorPhoto,
        placement: "feature",
      },
    ];
  }
  return [];
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const path = `${CS_BASE}/${cs.slug}`;
  const quotes = resolveQuotes(cs);
  const inlineQuotes = quotes.filter((q) => q.placement === "inline");
  const featureQuotes = quotes.filter((q) => q.placement !== "inline");
  const related = getRelatedStories(cs);

  const ld: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Customer stories", path: CS_BASE },
      { name: cs.brandName, path },
    ]),
    articleSchema({
      headline: cs.headline,
      description: cs.summary,
      path,
      datePublished: cs.datePublished ?? DEFAULT_PUBLISHED,
    }),
  ];
  const lead = quotes[0];
  if (lead?.name) {
    ld.push(
      reviewSchema({ reviewBody: lead.quote, author: lead.name, path }),
    );
  }

  return (
    <>
      <JsonLd data={ld} />

      {/* Hero — breadcrumb + brand row + H1 + lead + hero image */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Customer stories", href: CS_BASE },
              { name: cs.brandName },
            ]}
          />

          <ScrollReveal>
            <div className="flex items-center gap-4 mt-8 mb-6">
              <IntegrationLogo name={cs.brandName} logo={cs.logo} size="lg" />
              <div>
                <p className="text-heading-md text-text-primary leading-tight">
                  {cs.brandName}
                </p>
                <span className="text-eyebrow text-text-tertiary">
                  {cs.industry}
                </span>
              </div>
            </div>

            <h1 className="text-display-xl text-text-primary">{cs.headline}</h1>
            <p className="mt-5 text-body-lg text-text-secondary">{cs.summary}</p>
          </ScrollReveal>

          {cs.heroImage && (
            <ScrollReveal delay={0.1}>
              <div className="relative mt-10 md:mt-12 aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-border">
                <Image
                  src={cs.heroImage}
                  alt={cs.heroImageAlt ?? `${cs.brandName} case study hero`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Hero stat trio + at-a-glance */}
      <CaseStudyStats stats={cs.stats} atGlance={cs.atGlance} />

      {/* The stack behind this story — click-through to carriers/integrations/shipping */}
      <CaseStudyStack cs={cs} />

      {/* Challenge / Solution / Result (+ optional inline pull quote) */}
      <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-12">
              <div>
                <h3 className="text-eyebrow text-accent mb-3">The Challenge</h3>
                <p className="text-text-secondary leading-relaxed">
                  {cs.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-eyebrow text-accent mb-3">The Solution</h3>
                <p className="text-text-secondary leading-relaxed">
                  {cs.solution}
                </p>
              </div>
              {inlineQuotes.map((q, i) => (
                <QuoteBlock key={`inline-${i}`} {...q} placement="inline" />
              ))}
              <div>
                <h3 className="text-eyebrow text-accent mb-3">The Result</h3>
                <p className="text-text-secondary leading-relaxed">
                  {cs.result}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature quote(s) — proof, lifted ahead of the related/CTA tail */}
      {featureQuotes.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {featureQuotes.map((q, i) => (
              <ScrollReveal key={`feature-${i}`}>
                <QuoteBlock {...q} placement="feature" />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* More stories — never a dead end */}
      <RelatedStories stories={related} />

      <ClosingCTA
        headline="Get similar results"
        subtitle="Talk to our team about transforming your logistics."
      />
    </>
  );
}
