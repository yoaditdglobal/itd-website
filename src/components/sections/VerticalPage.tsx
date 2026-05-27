import Image from "next/image";
import Link from "next/link";
import { RateCheckerLoader } from "@/components/rate-checker/RateCheckerLoader";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import IntegrationCarousel from "@/components/sections/IntegrationCarousel";
import type { IntegrationItem } from "@/components/sections/IntegrationCarousel";
import CarrierComparisonTable from "@/components/sections/CarrierComparisonTable";
import CaseStudyCards from "@/components/sections/CaseStudyCards";
import type {
  CarrierComparisonRow,
  MethodologyCallout,
} from "@/components/sections/CarrierComparisonTable";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import type { CaseStudy } from "@/lib/data";
import { Zap, Eye, ShieldCheck, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

export interface AudienceAnchor {
  anchor: string; // hash slug, e.g. "ecommerce"
  title: string;
  summary: string; // ~60 words
  ctaLabel: string;
  href: string;
}

export interface CtaButton {
  label: string;
  href: string;
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
  features: Feature[];
  integrations: IntegrationItem[];
  caseStudy: CaseStudy;
  /** When provided, replaces the single-case-study spotlight with a multi-card carousel.
   *  Use the taxonomy helpers (getCaseStudiesByShippingType / BySolution / etc.) to
   *  populate. Falls back to `caseStudy` when undefined or empty. */
  caseStudies?: CaseStudy[];
  rateChecker?: 'domestic' | 'international' | '3pl' | 'export' | 'import';

  /** Optional override for the hero CTAs. Defaults: primary="Run the savings check" → "/shipping/domestic#estimator", secondary="Contact Sales" → "/contact". */
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;

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
  rateChecker,
  primaryCta,
  secondaryCta,
  audienceAnchors,
  carrierComparison,
  faq,
  closingCta,
  breadcrumbs,
  jsonLd,
}: VerticalPageProps) {
  // Assemble JSON-LD payload: explicit schemas + auto-generated faq/breadcrumb.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ldData: Record<string, any>[] = [...(jsonLd ?? [])];
  if (breadcrumbs && breadcrumbs.length > 0) ldData.push(breadcrumbSchema(breadcrumbs));
  if (faq && faq.length > 0) ldData.push(faqSchema(faq));

  const heroPrimary = primaryCta ?? { label: "Run the savings check", href: "/shipping/domestic#estimator" };
  const heroSecondary = secondaryCta ?? { label: "Contact Sales", href: "/contact" };

  return (
    <>
      {ldData.length > 0 && <JsonLd data={ldData} />}

      {/* Hero */}
      <section className="relative hero-bg overflow-hidden py-16 md:py-24">
        <div className="hero-bg-blob" aria-hidden />
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.4] mix-blend-multiply" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
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
        </div>
      </section>

      {/* Pain Points */}
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
            <div className="grid md:grid-cols-2 gap-6">
              {audienceAnchors.map((a, i) => (
                <ScrollReveal key={a.anchor} delay={i * 0.05}>
                  <div id={a.anchor} className="card-hover bg-bg-secondary rounded-2xl border border-border p-6 h-full flex flex-col">
                    <h3 className="text-heading-md text-text-primary mb-2">{a.title}</h3>
                    <p className="text-body-sm text-text-secondary mb-4 flex-1">{a.summary}</p>
                    <Link href={a.href} className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:underline">
                      {a.ctaLabel} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
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
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <p className="text-eyebrow text-accent mb-3">Connexx Platform</p>
                <h2 className="text-display-lg text-text-primary">How Connexx solves it</h2>
                <div className="mt-6 space-y-3">
                  {features.map((f, i) => {
                    // Rotate icon background colour so the list doesn't look monotone.
                    const tints = [
                      { bg: "bg-accent-light", fg: "text-accent" },
                      { bg: "bg-success-light", fg: "text-success-dark" },
                      { bg: "bg-warning-light", fg: "text-warning-dark" },
                      { bg: "bg-accent-secondary-light", fg: "text-accent-secondary" },
                    ];
                    const tint = tints[i % tints.length];
                    return (
                      <ScrollReveal key={f.title} delay={i * 0.08}>
                        <div className="card-hover group flex gap-4 p-4 bg-white rounded-xl border border-border hover:border-accent/30">
                          <div className={`flex-shrink-0 w-11 h-11 rounded-lg ${tint.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                            <f.icon className={`w-5 h-5 ${tint.fg}`} />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-text-primary mb-1">{f.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
                <div className="mt-8">
                  <Button href="/connexx">See the platform</Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-gradient-to-br from-white to-bg-tertiary rounded-2xl border border-border p-6 shadow-md">
                {/* App-style header */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-[10px] font-bold">C</div>
                    <span className="text-sm font-semibold text-text-primary">Connexx</span>
                    <span className="text-xs text-text-tertiary">/ Routing</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-text-tertiary uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden />
                    Live
                  </span>
                </div>
                {/* Stat tiles */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { icon: Zap, label: "Rate Compare", val: "Active", tint: "text-success", bg: "bg-success-light" },
                    { icon: Eye, label: "Tracking", val: "Live", tint: "text-info", bg: "bg-info-light" },
                    { icon: ShieldCheck, label: "Compliance", val: "100%", tint: "text-accent", bg: "bg-accent-light" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white rounded-lg p-3 border border-border shadow-xs">
                      <div className={`w-7 h-7 rounded-md ${m.bg} flex items-center justify-center mb-2`}>
                        <m.icon className={`w-3.5 h-3.5 ${m.tint}`} />
                      </div>
                      <div className="text-[10px] text-text-tertiary uppercase tracking-wider">{m.label}</div>
                      <div className="text-sm font-bold text-text-primary mt-0.5">{m.val}</div>
                    </div>
                  ))}
                </div>
                {/* Mini cost-per-parcel comparison */}
                <div className="bg-white rounded-lg border border-border p-3 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Cost per parcel (today)</span>
                    <span className="text-[10px] text-success font-semibold">Cheapest selected</span>
                  </div>
                  {[
                    { name: "Royal Mail", value: 3.42, bar: 0.78, best: true },
                    { name: "DPD", value: 4.18, bar: 0.95, best: false },
                    { name: "Evri", value: 3.85, bar: 0.88, best: false },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-2 py-1">
                      <span className="text-xs text-text-secondary w-20 truncate">{c.name}</span>
                      <div className="flex-1 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${c.best ? "bg-success" : "bg-text-quaternary/50"}`}
                          style={{ width: `${c.bar * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs font-mono w-12 text-right ${c.best ? "text-success font-semibold" : "text-text-secondary"}`}>£{c.value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Integration highlights */}
      <section className="bg-bg-secondary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h3 className="text-lg font-semibold text-text-primary mb-6">Key integrations</h3>
            <IntegrationCarousel integrations={integrations} />
          </ScrollReveal>
        </div>
      </section>

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
              <div className="text-3xl md:text-4xl font-bold text-accent mb-4">
                {caseStudy.metric}
              </div>
              <p className="text-text-secondary leading-relaxed mb-6">
                {caseStudy.summary}
              </p>
              {caseStudy.quote && (
                <blockquote className="border-l-3 border-accent pl-4 italic text-text-secondary mb-6">
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
                      <span className="text-sm font-medium text-text-primary">
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

      {rateChecker && (
        <div id="estimator">
          <RateCheckerLoader type={rateChecker} />
        </div>
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
                <p className="mt-4 text-sm text-white/60">{closingCta.asyncNote}</p>
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
