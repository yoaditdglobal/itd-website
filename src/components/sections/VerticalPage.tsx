import Image from "next/image";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import Link from "next/link";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import IntegrationCarousel from "@/components/sections/IntegrationCarousel";
import type { IntegrationItem } from "@/components/sections/IntegrationCarousel";
import BuiltForCarousel from "@/components/sections/BuiltForCarousel";
import CarrierComparisonTable from "@/components/sections/CarrierComparisonTable";
import CaseStudyCards from "@/components/sections/CaseStudyCards";
import ConnexxGateway from "@/components/sections/ConnexxGateway";
import type {
  CarrierComparisonRow,
  MethodologyCallout,
} from "@/components/sections/CarrierComparisonTable";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import type { CaseStudy, SolutionTag } from "@/lib/data";
import { getCaseStudiesBySolution } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PainPoint {
  num: string;
  title: string;
  desc: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type AudienceCategory = "By stage" | "By business model";

export interface AudienceImage {
  /** Optional photo path under /public. When set, renders next/image. */
  src?: string;
  alt?: string;
  /** Tailwind gradient classes for the placeholder (without the bg-gradient-to-br prefix). */
  gradient?: string;
  /** Lucide icon shown low-opacity at the centre of the placeholder. */
  icon?: LucideIcon;
}

export interface AudienceAnchor {
  anchor: string; // hash slug, e.g. "ecommerce" — also used for deep-link scroll
  /** Short, punchy. e.g. "Built for eCommerce". */
  headline: string;
  /** Up to 2 sentences, ~30 words. */
  summary: string;
  href: string;
  /** Drives the chip + the "Used by" case-study lookup. */
  solutionTag: SolutionTag;
  category: AudienceCategory;
  image: AudienceImage;
  /** Defaults to "Learn more". */
  ctaLabel?: string;
  /** @deprecated kept for back-compat; no longer rendered. Use `headline`. */
  title?: string;
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface VerticalHeroImage {
  /** Optional photo path under /public. Renders next/image fill object-cover. */
  src?: string;
  alt?: string;
  /** Tailwind gradient classes for the placeholder (without bg-gradient-to-br). */
  gradient?: string;
  /** Lucide icon shown faint at the centre of the placeholder. */
  icon?: LucideIcon;
  /** Aspect-ratio Tailwind class override (e.g. "aspect-[16/9]"). Defaults to aspect-[4/3]. */
  aspect?: string;
}

export interface ClosingCtaOverride {
  headline?: string;
  subhead?: string;
  primary?: CtaButton;
  secondary?: CtaButton;
  /** Optional micro-note shown under the buttons. Used to set async expectations, e.g. "We reply within 1 business day." */
  asyncNote?: string;
}

export interface Crumb {
  name: string;
  path: string;
}

interface VerticalPageProps {
  title: string;
  subtitle: string;
  label?: string;
  pains: PainPoint[];
  features?: Feature[];
  integrations?: IntegrationItem[];
  caseStudy: CaseStudy;
  /** When provided, replaces the single-case-study spotlight with a multi-card carousel.
   *  Use the taxonomy helpers (getCaseStudiesByShippingType / BySolution / etc.) to
   *  populate. Falls back to `caseStudy` when undefined or empty. */
  caseStudies?: CaseStudy[];

  /** Optional override for the hero CTAs. Defaults: primary="Get Quote" → RATE_CHECKER_URL, secondary="Contact Us" → "/contact". */
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;

  /** Optional hero image / gradient placeholder rendered to the right of the headline copy. */
  heroImage?: VerticalHeroImage;

  /** When true, suppresses the default hero block so the page can render a bespoke hero above this shell. */
  hideDefaultHero?: boolean;

  /** When true, suppresses the default 3-col pain-points block so the page can render a bespoke pains section. */
  hidePainPoints?: boolean;

  /** Optional "Built for" section between pain points and features. Used by shipping pages. */
  audienceAnchors?: AudienceAnchor[];

  /** Optional carrier comparison table. Rendered between the audience anchors and "How Connexx solves it". Used by shipping pages. */
  carrierComparison?: {
    title?: string;
    intro?: string;
    columns: string[];
    rows: CarrierComparisonRow[];
    footnote?: string;
    methodology?: MethodologyCallout;
  };

  /** Optional FAQ block rendered before the closing CTA. Renders FAQPage JSON-LD automatically. */
  faq?: FaqItem[];

  /** Optional override for the closing CTA. If provided, replaces the default <ClosingCTA />. */
  closingCta?: ClosingCtaOverride;

  /** Optional breadcrumb trail. Renders BreadcrumbList JSON-LD. */
  breadcrumbs?: Crumb[];

  /** Optional additional JSON-LD schemas (Service, Product, etc.). Rendered in addition to FAQ + breadcrumb. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonLd?: Record<string, any>[];

  /** Optional content rendered between the "How Connexx solves it" features block and the integrations carousel. */
  integrationsGateway?: ReactNode;
}

export default function VerticalPage({
  title,
  subtitle,
  label,
  pains,
  features,
  integrations,
  caseStudy,
  caseStudies,
  primaryCta,
  secondaryCta,
  heroImage,
  hideDefaultHero,
  hidePainPoints,
  audienceAnchors,
  carrierComparison,
  faq,
  closingCta,
  breadcrumbs,
  jsonLd,
  integrationsGateway,
}: VerticalPageProps) {
  // Assemble JSON-LD payload: explicit schemas + auto-generated faq/breadcrumb.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ldData: Record<string, any>[] = [...(jsonLd ?? [])];
  if (breadcrumbs && breadcrumbs.length > 0) ldData.push(breadcrumbSchema(breadcrumbs));
  if (faq && faq.length > 0) ldData.push(faqSchema(faq));

  const heroPrimary = primaryCta ?? { label: "Get Quote", href: RATE_CHECKER_URL };
  const heroSecondary = secondaryCta ?? { label: "Contact Us", href: "/contact" };

  return (
    <>
      {ldData.length > 0 && <JsonLd data={ldData} />}

      {/* Hero */}
      {!hideDefaultHero && (
      <section data-hero-tone="light" className="bleed-nav relative hero-bg overflow-hidden py-16 md:py-24">
        <div className="hero-bg-blob" aria-hidden />
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.4] mix-blend-multiply" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={heroImage ? "grid lg:grid-cols-2 lg:gap-12 items-center" : ""}>
            <div className={heroImage ? "max-w-2xl" : "max-w-3xl"}>
              {label && (
                <span className="hero-entrance-h1 inline-block px-3 py-1 rounded-full bg-accent-light text-accent-dark text-eyebrow mb-4">
                  {label}
                </span>
              )}
              <h1 className="hero-entrance-h1 text-display-xl text-text-primary">{title}</h1>
              <p className="hero-entrance-sub mt-5 text-body-lg text-text-secondary">{subtitle}</p>
              <div className="hero-entrance-cta mt-8 flex flex-col sm:flex-row gap-3">
                <Button href={heroPrimary.href}>{heroPrimary.label}</Button>
                <Button href={heroSecondary.href} variant="secondary">{heroSecondary.label}</Button>
              </div>
            </div>
            {heroImage && (
              <div className="hero-entrance-sub mt-10 lg:mt-0">
                <div className={`relative ${heroImage.aspect ?? "aspect-[4/3]"} w-full overflow-hidden rounded-2xl shadow-xl border border-border bg-bg-secondary`}>
                  {heroImage.src ? (
                    <Image
                      src={heroImage.src}
                      alt={heroImage.alt ?? `${title} hero illustration`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${heroImage.gradient ?? "from-accent-light via-white to-accent/15"} flex items-center justify-center`}
                      aria-hidden
                    >
                      {heroImage.icon ? (
                        <heroImage.icon
                          className="w-1/4 h-1/4 text-accent/30"
                          strokeWidth={1.5}
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Pain Points */}
      {!hidePainPoints && (
      <section className="bg-bg-secondary py-12 md:py-16 border-t border-border" aria-labelledby="pain-points-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="pain-points-heading" className="sr-only">What gets in the way today</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {pains.map((pain, i) => (
              <ScrollReveal key={pain.num} delay={i * 0.1}>
                <div className="flex gap-4">
                  <span aria-hidden="true" className="text-stat-lg text-accent/30 flex-shrink-0">{pain.num}</span>
                  <div>
                    <h3 className="text-heading-sm text-text-primary mb-1">{pain.title}</h3>
                    <p className="text-body-sm text-text-secondary">{pain.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* "Built for" — optional audience anchors (used by shipping pages) */}
      {audienceAnchors && audienceAnchors.length > 0 && (
        <section className="bg-white py-12 md:py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-display-lg text-text-primary mb-2">Built for</h2>
              <p className="text-body-md text-text-secondary mb-8">
                Each audience uses the same platform differently. Jump to the section that fits you.
              </p>
            </ScrollReveal>
          </div>
          {/* Full-bleed: carousel sits OUTSIDE the max-w box (same as the
              homepage). Its own .carousel-gutter re-aligns the first card to the
              content gutter, so neighbours bleed past both viewport edges. */}
          <BuiltForCarousel>
            {audienceAnchors.map((a) => (
              <BuiltForCard key={a.anchor} anchor={a} />
            ))}
          </BuiltForCarousel>
        </section>
      )}

      {/* Carrier comparison table — optional, used by shipping pages */}
      {carrierComparison && carrierComparison.rows.length > 0 && (
        <CarrierComparisonTable
          title={carrierComparison.title}
          intro={carrierComparison.intro}
          columns={carrierComparison.columns}
          rows={carrierComparison.rows}
          footnote={carrierComparison.footnote}
          methodology={carrierComparison.methodology}
        />
      )}

      {/* Connexx for [vertical] */}
      {features && features.length > 0 && <ConnexxGateway features={features} />}

      {integrationsGateway}

      {integrations && integrations.length > 0 && (
      <section className="bg-bg-secondary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h3 className="text-heading-md text-text-primary mb-6">Key integrations</h3>
            <IntegrationCarousel integrations={integrations} />
          </ScrollReveal>
        </div>
      </section>
      )}

      {/* Featured case study(ies) — multi-card carousel when `caseStudies` provided,
          single-spotlight fallback otherwise. */}
      {caseStudies && caseStudies.length >= 2 ? (
        <CaseStudyCards
          studies={caseStudies}
          title="Real businesses using ITD"
          subtitle="See how customers across this category ship through us."
          showFooter
        />
      ) : (
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <p className="text-eyebrow text-accent mb-4">Case Study</p>
              <div className="flex items-center gap-3 mb-5">
                <IntegrationLogo
                  name={caseStudy.brandName}
                  logo={caseStudy.logo}
                  size="sm"
                />
                <p className="text-heading-md text-text-primary leading-tight">
                  {caseStudy.brandName}
                </p>
              </div>
              <div className="text-stat-xl text-accent mb-4">
                {caseStudy.metric}
              </div>
              <p className="text-body-md text-text-secondary mb-6">
                {caseStudy.summary}
              </p>
              {caseStudy.quote && (
                <blockquote className="border-l-3 border-accent pl-4 italic text-body-md text-text-secondary mb-6">
                  &ldquo;{caseStudy.quote}&rdquo;
                  {caseStudy.quoteAuthor && (
                    <footer className="mt-3 flex items-center gap-2.5 not-italic">
                      {caseStudy.quoteAuthorPhoto && (
                        <div className="relative flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border border-border">
                          <Image
                            src={caseStudy.quoteAuthorPhoto}
                            alt={caseStudy.quoteAuthor}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-label text-text-primary">
                        {caseStudy.quoteAuthor}
                      </span>
                    </footer>
                  )}
                </blockquote>
              )}
              <Link href={`/resources/case-studies/${caseStudy.slug}`} className="link-underline gap-1 text-sm text-accent font-medium">
                Read the full case study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
      )}

      {/* FAQ — optional, GEO-friendly */}
      {faq && faq.length > 0 && (
        <section className="bg-bg-secondary py-16 md:py-20 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-display-lg text-text-primary mb-2 text-center">Frequently asked questions</h2>
              <p className="text-body-md text-text-secondary text-center mb-10">
                The answers most operators ask before booking a call.
              </p>
            </ScrollReveal>
            <FaqAccordion items={faq} />
          </div>
        </section>
      )}

      {/* Closing CTA — either custom override or default */}
      {closingCta ? (
        <section className="bg-bg-dark py-16 md:py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              {closingCta.headline && (
                <h2 className="text-display-lg text-white mb-3">{closingCta.headline}</h2>
              )}
              {closingCta.subhead && (
                <p className="text-body-lg text-white/80 mb-8">{closingCta.subhead}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {closingCta.primary && (
                  <Button href={closingCta.primary.href} surface="dark">{closingCta.primary.label}</Button>
                )}
                {closingCta.secondary && (
                  <Button href={closingCta.secondary.href} variant="secondary" surface="dark">{closingCta.secondary.label}</Button>
                )}
              </div>
              {closingCta.asyncNote && (
                <p className="mt-4 text-body-sm text-white/60">{closingCta.asyncNote}</p>
              )}
            </ScrollReveal>
          </div>
        </section>
      ) : (
        <ClosingCTA />
      )}
    </>
  );
}

/** Image-led ICP card for the "Built for" section on shipping pages. */
function BuiltForCard({ anchor }: { anchor: AudienceAnchor }) {
  const studies = getCaseStudiesBySolution(anchor.solutionTag);
  const visible = studies.slice(0, 3);
  const overflow = studies.length - visible.length;
  const Icon = anchor.image.icon;
  const ctaLabel = anchor.ctaLabel ?? "Learn more";
  const gradient =
    anchor.image.gradient ?? "from-accent-light via-white to-bg-secondary";
  const altText =
    anchor.image.alt ?? `${anchor.headline} illustration`;

  return (
    <Link
      id={anchor.anchor}
      href={anchor.href}
      className="group relative flex h-full w-[clamp(300px,85vw,820px)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-white transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0 hover:shadow-xl hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:flex-row sm:items-stretch"
    >
      {/* Image / gradient placeholder — left panel on sm+ */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-[45%] sm:self-stretch">
        {anchor.image.src ? (
          <Image
            src={anchor.image.src}
            alt={altText}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}
            aria-hidden
          >
            {Icon ? (
              <Icon className="w-1/4 h-1/4 text-accent/30" strokeWidth={1.5} />
            ) : null}
          </div>
        )}
      </div>

      {/* Body — content area (chip / headline / Used by ⇄ summary on hover)
          sits inside a `flex-1` wrapper so the absolute hover layer is
          bounded to it. CTA below is a sibling, never overlapped. */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* sr-only summary so screen readers always announce it */}
        <span className="sr-only">{anchor.summary}</span>

        {/* Content area — the two states are layered here so the card height
            stays constant across hover. A `min-h` reserves enough vertical
            room for a full summary (~6 lines) even on cards that lack a
            "Used by" strip, so the absolute hover text can never bleed into
            the CTA below. */}
        <div className="relative flex-1 min-h-[210px] md:min-h-[200px]">
          {/* Static layer (default) — fades to 0 on hover/focus (only on
              hover-capable devices) so the summary layer can take its place. */}
          <div
            className="
              transition-opacity duration-200 ease-out
              motion-reduce:transition-none
              [@media(hover:hover)]:group-hover:opacity-0
              [@media(hover:hover)]:group-focus-within:opacity-0
            "
          >
            <span className="self-start inline-flex items-center rounded-full bg-bg-secondary text-text-tertiary text-eyebrow px-2.5 py-1 mb-3">
              {anchor.category}
            </span>
            <h3 className="text-heading-md text-text-primary group-hover:text-accent transition-colors mt-1">
              {anchor.headline}
            </h3>

            {/* "Used by" strip — always rendered. Shows real case-study
                avatars when matches exist, or dashed placeholders + a
                "Coming soon" caption when this ICP has no published
                customers yet. Keeps every card's vertical rhythm
                consistent. */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-eyebrow text-text-tertiary mb-2">Used by</p>
              <div className="flex items-center gap-2">
                {visible.length > 0 ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      {visible.map((cs) => (
                        <span
                          key={cs.id}
                          title={cs.brandName}
                          className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-border bg-white p-1"
                        >
                          <IntegrationLogo
                            name={cs.brandName}
                            logo={cs.logo}
                            size="xs"
                          />
                        </span>
                      ))}
                    </div>
                    {overflow > 0 && (
                      <span className="text-caption text-text-tertiary">
                        + {overflow} more
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          aria-hidden
                          className="inline-block h-7 w-7 rounded-md border border-dashed border-border bg-bg-secondary"
                        />
                      ))}
                    </div>
                    <span className="text-caption text-text-tertiary ml-1">
                      Customers landing soon
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Hover layer — summary text. Absolutely positioned over the static
              layer (bounded to this content wrapper, so it can never reach
              the CTA below). Hidden by default on hover-capable devices. */}
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0
              opacity-0 transition-opacity duration-200 ease-out
              motion-reduce:transition-none
              [@media(hover:hover)]:group-hover:opacity-100
              [@media(hover:hover)]:group-focus-within:opacity-100
            "
          >
            <p className="text-body-sm text-text-secondary leading-relaxed">
              {anchor.summary}
            </p>
          </div>
        </div>

        {/* CTA — sibling below the content area, never overlapped */}
        <span
          aria-hidden
          className="mt-5 inline-flex items-center justify-center gap-1.5 self-start rounded-lg bg-bg-secondary px-4 py-2 text-sm font-semibold text-text-primary group-hover:bg-accent group-hover:text-white transition-colors"
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform motion-reduce:group-hover:translate-x-0" />
        </span>
      </div>
    </Link>
  );
}
