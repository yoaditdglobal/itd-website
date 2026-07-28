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
/** Maintained publish / last-reviewed date for the case-study Article JSON-LD.
 *  All stories currently share this; override per story via `cs.datePublished`. */
const DEFAULT_PUBLISHED = "2026-07-22";
/** Human-readable form of an ISO date, e.g. "2026-07-22" → "22 July 2026". */
function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

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

/**
 * Wraps the first mention of the brand in a paragraph with a link to the
 * brand's own site. Tries the full brand name first, then progressively
 * shorter forms (suffixes like "FC"/"(KitchenCraft)" stripped, then fewer
 * words), and picks the earliest match. Returns plain text when the story
 * has no website or the name never appears.
 */
function linkBrandMention(text: string, brandName: string, website?: string) {
  if (!website) return text;
  const base = brandName.replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+(FC|PLC|Ltd)$/i, "").trim();
  const words = base.split(/\s+/);
  const candidates = [brandName, base];
  for (let n = words.length - 1; n >= 1; n--) {
    candidates.push(words.slice(0, n).join(" "));
  }
  let best: { index: number; name: string } | null = null;
  for (const name of candidates) {
    if (name.length < 3) continue;
    const index = text.indexOf(name);
    if (index === -1) continue;
    if (!best || index < best.index || (index === best.index && name.length > best.name.length)) {
      best = { index, name };
    }
  }
  if (!best) return text;
  return (
    <>
      {text.slice(0, best.index)}
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-text-primary underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent motion-reduce:transition-none"
      >
        {best.name}
      </a>
      {text.slice(best.index + best.name.length)}
    </>
  );
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
      <section className="bleed-nav bg-white py-12 md:py-20">
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
            <p className="mt-4 text-caption text-text-tertiary">
              Last updated {formatDate(cs.datePublished ?? DEFAULT_PUBLISHED)}
            </p>
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

      {/* Challenge / Solution / Result — numbered journey, bold payoff panel */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 md:space-y-0">
            {/* 01 — Challenge */}
            <ScrollReveal>
              <div className="md:grid md:grid-cols-[88px_1fr]">
                <div className="hidden md:flex md:flex-col md:items-center">
                  <span aria-hidden className="text-stat-xl font-bold text-accent/20">
                    01
                  </span>
                  <span aria-hidden className="mt-4 w-px flex-1 bg-border-strong/60" />
                </div>
                <div className="rounded-3xl border border-border bg-white p-7 md:p-10">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-light text-sm font-bold text-accent md:hidden"
                    >
                      1
                    </span>
                    <h3 className="text-heading-lg text-text-primary">The challenge</h3>
                  </div>
                  <p className="mt-4 text-body-lg leading-relaxed text-text-secondary">
                    {linkBrandMention(cs.challenge, cs.brandName, cs.website)}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 02 — Solution */}
            <ScrollReveal delay={0.06}>
              <div className="md:grid md:grid-cols-[88px_1fr]">
                <div className="hidden md:flex md:flex-col md:items-center">
                  <span aria-hidden className="mb-4 w-px flex-1 bg-border-strong/60" />
                  <span aria-hidden className="text-stat-xl font-bold text-accent/40">
                    02
                  </span>
                  <span aria-hidden className="mt-4 w-px flex-1 bg-border-strong/60" />
                </div>
                <div className="mt-0 rounded-3xl bg-gradient-to-br from-accent-200 via-accent to-accent-600 p-[2.5px] md:mt-6">
                  <div className="h-full rounded-[calc(1.5rem-2.5px)] bg-white p-7 md:p-10">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-light text-sm font-bold text-accent md:hidden"
                      >
                        2
                      </span>
                      <h3 className="text-heading-lg text-text-primary">The solution</h3>
                    </div>
                    <p className="mt-4 text-body-lg leading-relaxed text-text-secondary">
                      {cs.solution}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {inlineQuotes.length > 0 && (
              <div className="md:grid md:grid-cols-[88px_1fr]">
                <div className="hidden md:flex md:flex-col md:items-center">
                  <span aria-hidden className="w-px flex-1 bg-border-strong/60" />
                </div>
                <div className="space-y-8 py-8 md:py-10">
                  {inlineQuotes.map((q, i) => (
                    <QuoteBlock key={`inline-${i}`} {...q} placement="inline" />
                  ))}
                </div>
              </div>
            )}

            {/* 03 — Result: the payoff, takeover panel */}
            <ScrollReveal delay={0.06}>
              <div className="md:grid md:grid-cols-[88px_1fr]">
                <div className="hidden md:flex md:flex-col md:items-center">
                  <span aria-hidden className="mb-4 h-10 w-px bg-border-strong/60" />
                  <span aria-hidden className="text-stat-xl font-bold text-accent">
                    03
                  </span>
                </div>
                <div
                  className="relative mt-0 overflow-hidden rounded-3xl p-7 md:mt-6 md:p-12"
                  style={{
                    background:
                      "radial-gradient(circle at 12% 8%, rgba(59,91,219,0.85) 0%, rgba(29,63,184,0.35) 45%, rgba(10,15,40,0.9) 100%), #15192b",
                  }}
                >
                  <div
                    aria-hidden
                    className="bg-noise pointer-events-none absolute inset-0 opacity-40"
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-sm font-bold text-white md:hidden"
                      >
                        3
                      </span>
                      <h3 className="text-heading-lg text-white">The result</h3>
                    </div>
                    <p className="text-stat-2xl mt-5 text-white">{cs.metric}</p>
                    <p className="mt-5 max-w-3xl text-body-lg leading-relaxed text-white/85">
                      {cs.result}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Feature quote(s) — proof, lifted ahead of the related/CTA tail */}
      {(featureQuotes.length > 0 || cs.linkedinPost) && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {featureQuotes.map((q, i) => (
              <ScrollReveal key={`feature-${i}`}>
                <QuoteBlock {...q} placement="feature" />
              </ScrollReveal>
            ))}
            {cs.linkedinPost && (
              <ScrollReveal>
                <iframe
                  src={cs.linkedinPost.replace("/feed/update/", "/embed/feed/update/")}
                  height={640}
                  loading="lazy"
                  allowFullScreen
                  title={`LinkedIn post — ${cs.brandName}`}
                  className="mx-auto block w-full max-w-[504px] rounded-2xl border border-border"
                />
              </ScrollReveal>
            )}
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
