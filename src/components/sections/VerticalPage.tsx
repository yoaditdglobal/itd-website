import Image from "next/image";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import KeyTakeaways from "@/components/ui/KeyTakeaways";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import IntegrationCarousel from "@/components/sections/IntegrationCarousel";
import type { IntegrationItem } from "@/components/sections/IntegrationCarousel";
import CarrierComparisonTable from "@/components/sections/CarrierComparisonTable";
import CaseStudyCards from "@/components/sections/CaseStudyCards";
import ConnexxGateway, { type GatewayMedia } from "@/components/sections/ConnexxGateway";
import type {
  CarrierComparisonRow,
  MethodologyCallout,
} from "@/components/sections/CarrierComparisonTable";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import type {
  CaseStudy,
  SolutionTag,
  LibrarySegment,
  KeyIntegrationsContext,
} from "@/lib/data";
import {
  getCaseStudiesBySolution,
  SOLUTION_SLUGS,
  getKeyIntegrations,
  getKeyIntegrationsBlurb,
} from "@/lib/data";
import UsedByChip from "@/components/sections/UsedByChip";
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
  /** Optional — cards render title-only when omitted (mirrors GatewayFeature). */
  desc?: string;
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
  category?: AudienceCategory;
  image: AudienceImage;
  /** @deprecated kept for back-compat; the grid card uses an arrow affordance. */
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

  /** Optional TL;DR bullets rendered as the first band after the hero (GEO
   *  extractability). Each bullet must be verifiable against page content. */
  keyTakeaways?: string[];

  /** Optional additional JSON-LD schemas (Service, Product, etc.). Rendered in addition to FAQ + breadcrumb. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonLd?: Record<string, any>[];

  /** Optional content rendered between the "How Connexx solves it" features block and the integrations carousel. */
  integrationsGateway?: ReactNode;

  /** Optional looping feature animation that replaces the ConnexxGateway static dashboard mock (used by /shipping/domestic). */
  gatewayMedia?: GatewayMedia;

  /** Page context for the "Key integrations" section. When set (and no explicit
   *  `integrations` array is passed), the relevant carriers + tech are derived
   *  from the data layer and the header blurb is filled in automatically. */
  integrationsContext?: KeyIntegrationsContext;
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
  keyTakeaways,
  jsonLd,
  integrationsGateway,
  gatewayMedia,
  integrationsContext,
}: VerticalPageProps) {
  // "Key integrations" list: an explicit `integrations` array wins; otherwise
  // derive the page-relevant set from the data layer via `integrationsContext`.
  const keyIntegrations =
    integrations && integrations.length > 0
      ? integrations
      : integrationsContext
        ? getKeyIntegrations(integrationsContext)
        : [];
  const keyIntegrationsBlurb = integrationsContext
    ? getKeyIntegrationsBlurb(integrationsContext)
    : undefined;
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
            <div className={heroImage ? "order-2 lg:order-none max-w-2xl" : "max-w-3xl"}>
              {breadcrumbs && breadcrumbs.length > 1 && (
                <div className="hero-entrance-h1 mb-4">
                  <Breadcrumb
                    items={breadcrumbs.map((c, i) => ({
                      name: c.name,
                      href: i < breadcrumbs.length - 1 ? c.path : undefined,
                    }))}
                  />
                </div>
              )}
              {label && (
                <span className="hero-entrance-h1 hidden lg:inline-block px-3 py-1 rounded-full bg-accent-light text-accent-dark text-eyebrow mb-4">
                  {label}
                </span>
              )}
              <h1 className="hero-entrance-h1 text-display-xl text-text-primary">{title}</h1>
              <p className="hero-entrance-sub mt-5 text-body-lg text-text-secondary">{subtitle}</p>
              <div className="hero-entrance-cta mt-8 flex flex-wrap items-center gap-3">
                <Button href={heroPrimary.href}>{heroPrimary.label}</Button>
                <Button href={heroSecondary.href} variant="secondary">{heroSecondary.label}</Button>
              </div>
            </div>
            {heroImage && (
              <div className="hero-entrance-sub order-1 lg:order-none mb-8 lg:mb-0">
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

      {/* TL;DR — GEO-extractable summary band */}
      {keyTakeaways && keyTakeaways.length > 0 && (
        <section className="bg-white py-10 md:py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <KeyTakeaways items={keyTakeaways} />
          </div>
        </section>
      )}

      {/* Pain Points */}
      {!hidePainPoints && (
      <section className="bg-bg-secondary py-14 md:py-20 border-t border-border" aria-labelledby="pain-points-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-3">The problem</p>
            <h2 id="pain-points-heading" className="text-display-md text-text-primary mb-8 md:mb-10">
              What gets in the way today
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4 items-stretch">
            {pains.map((pain, i) => (
              <ScrollReveal key={pain.num} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 md:p-7 transition-all hover:border-accent/30 hover:shadow-md">
                  <span aria-hidden="true" className="text-stat-xl text-accent">{pain.num}</span>
                  <h3 className="text-heading-md text-text-primary mt-4 mb-2">{pain.title}</h3>
                  <p className="text-body-md text-text-secondary">{pain.desc}</p>
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
          {/* No-scroll overlay grid (replaces the old horizontal carousel):
              all six audiences visible at once, in the homepage
              ShippingShowcase visual language. */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              {/* Mobile: horizontal swipe row (one card + peek) so the six
                  audiences don't become a ~1,900px vertical stack. From `sm`
                  up it reverts to the desktop grid, untouched. */}
              <div className="flex gap-4 overflow-x-auto snap-x snap-proximity pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
                {audienceAnchors.map((a) => (
                  <div key={a.anchor} className="w-[82%] shrink-0 snap-start sm:w-auto">
                    <AudienceGridCard anchor={a} />
                  </div>
                ))}
                {/* Trailing spacer so the last card can clear the edge on mobile. */}
                <span aria-hidden className="w-px shrink-0 sm:hidden" />
              </div>
            </ScrollReveal>
          </div>
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
      {features && features.length > 0 && (
        <ConnexxGateway features={features} media={gatewayMedia} />
      )}

      {integrationsGateway}

      {keyIntegrations.length > 0 && (
      <section className="bg-bg-secondary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary">Key integrations</h2>
            <p className="mt-3 mb-8 text-body-md text-text-secondary max-w-2xl">
              {keyIntegrationsBlurb ??
                "Every carrier and platform your operation runs on, connected through one account."}
            </p>
            <IntegrationCarousel integrations={keyIntegrations} />
          </ScrollReveal>
        </div>
      </section>
      )}

      {/* Featured case study(ies) — multi-card carousel when `caseStudies` provided,
          single-spotlight fallback otherwise. */}
      {caseStudies && caseStudies.length >= 2 ? (
        <CaseStudyCards studies={caseStudies} showFooter />
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
              <h2 className="text-display-lg text-text-primary mb-10 text-center">FAQ</h2>
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
              <div className="flex flex-wrap items-center justify-center gap-3">
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

/** Overlay photo card for the "Built for" grid on shipping pages — echoes
 *  the homepage ShippingShowcase language (full-bleed photo, dark scrim,
 *  white overlay copy). The summary reveals on hover/focus on hover-capable
 *  devices (grid-rows trick, always in the DOM); touch users tap through to
 *  the destination. `id={anchor.anchor}` keeps existing deep links working. */
function AudienceGridCard({ anchor }: { anchor: AudienceAnchor }) {
  const studies = getCaseStudiesBySolution(anchor.solutionTag);
  const visible = studies.slice(0, 3);
  const overflow = studies.length - visible.length;
  const Icon = anchor.image.icon;
  const gradient =
    anchor.image.gradient ?? "from-accent-light via-white to-bg-secondary";
  const altText = anchor.image.alt ?? `${anchor.headline} illustration`;
  // "+ N" deep-links the filtered library when the tag is a library facet.
  const librarySlug =
    anchor.solutionTag in SOLUTION_SLUGS
      ? SOLUTION_SLUGS[anchor.solutionTag as LibrarySegment]
      : undefined;
  const moreHref = librarySlug
    ? `/resources/case-studies?solution=${librarySlug}`
    : "/resources/case-studies";

  return (
    <div
      id={anchor.anchor}
      className="group relative h-[300px] overflow-hidden rounded-3xl xl:h-[320px]"
    >
      {/* Photo / gradient fallback */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100 will-change-transform">
        {anchor.image.src ? (
          <Image
            src={anchor.image.src}
            alt={altText}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
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

      {/* Scrim for copy legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-dark/85 via-bg-dark/40 to-bg-dark/10"
      />

      {/* Overlaid content */}
      <div className="absolute inset-x-0 bottom-0 p-5 xl:p-6">
        {anchor.category && (
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            {anchor.category}
          </span>
        )}
        <p className="mt-3 text-heading-md text-white">{anchor.headline}</p>

        {/* Summary — hover/focus reveal on hover-capable devices; always in
            the DOM for SEO and screen readers. */}
        <div
          className="
            grid grid-rows-[0fr] opacity-0
            transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            motion-reduce:transition-none
            [@media(hover:hover)]:group-hover:grid-rows-[1fr]
            [@media(hover:hover)]:group-hover:opacity-100
            [@media(hover:hover)]:group-focus-within:grid-rows-[1fr]
            [@media(hover:hover)]:group-focus-within:opacity-100
          "
        >
          <div className="min-h-0 overflow-hidden">
            <p className="mt-2 text-body-sm text-white/85">{anchor.summary}</p>
          </div>
        </div>

        {/* Used by + expanding Explore affordance */}
        <div className="mt-4 flex items-center justify-between gap-3">
          {/* Chips sit ABOVE the stretched card link (z-20) so they stay
              independently hoverable/clickable — each opens the same
              case-study preview HoverCard as the homepage pager. */}
          <div className="relative z-20 flex min-w-0 items-center gap-2">
            <span className="text-eyebrow text-white/70">Used by</span>
            {visible.length > 0 ? (
              <>
                <span className="flex items-center gap-1.5">
                  {visible.map((cs) => {
                    const q = cs.quotes?.[0];
                    return (
                      <UsedByChip
                        key={cs.id}
                        cs={{
                          slug: cs.slug,
                          brandName: cs.brandName,
                          logo: cs.logo,
                          stats: cs.stats,
                          quoteAuthor: q
                            ? [q.name, q.title].filter(Boolean).join(", ")
                            : cs.quoteAuthor,
                          quoteAuthorPhoto: q?.photo ?? cs.quoteAuthorPhoto,
                          oneLiner: cs.oneLiner,
                          headline: cs.headline,
                        }}
                      />
                    );
                  })}
                </span>
                {overflow > 0 && (
                  <Link
                    href={moreHref}
                    aria-label={`See ${overflow} more customer stories`}
                    className="rounded-sm text-caption text-white/70 underline-offset-2 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    + {overflow}
                  </Link>
                )}
              </>
            ) : (
              <span className="text-caption text-white/60">Customers landing soon</span>
            )}
          </div>
          {/* Decorative (below the stretched link, so clicks pass through to
              the card link): blooms from a round arrow into "Explore →" on
              card hover/focus. */}
          <span
            aria-hidden
            className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10 px-2.5 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-focus-within:border-accent group-focus-within:bg-accent"
          >
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-[max-width,opacity,margin] duration-300 ease-out group-hover:mr-1.5 group-hover:max-w-20 group-hover:opacity-100 group-focus-within:mr-1.5 group-focus-within:max-w-20 group-focus-within:opacity-100 motion-reduce:transition-none">
              Explore
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
          </span>
        </div>
      </div>

      {/* Stretched card link — sits over everything except the chip row
          (z-20 &gt; z-10), so the whole card navigates while the chips keep
          their own hover/click behaviour. */}
      <Link
        href={anchor.href}
        className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <span className="sr-only">{anchor.headline}</span>
      </Link>
    </div>
  );
}
