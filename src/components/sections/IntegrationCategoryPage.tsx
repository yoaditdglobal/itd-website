import type { ReactNode } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import Button from "@/components/ui/Button";
import ClosingCTA from "@/components/sections/ClosingCTA";
import FaqSection from "@/components/sections/FaqSection";
import type { FaqItem } from "@/components/sections/FaqSection";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import type { Integration } from "@/lib/data";
import { getIntegrationSlug } from "@/lib/data";

export interface UseCase {
  headline: string;
  description: string;
  namedIntegrations: string[];
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface CategoryCtaButton {
  label: string;
  href: string;
}

export interface CategoryClosingCta {
  headline: string;
  subhead: string;
  primary: CategoryCtaButton;
  secondary?: CategoryCtaButton;
  /** Optional micro-note shown under the buttons. Used to set async expectations, e.g. "We reply within 1 business day." */
  asyncNote?: string;
}

export interface CategoryBreadcrumb {
  name: string;
  path: string;
}

interface IntegrationCategoryPageProps {
  /** Default page heading. Used when `heroH1` is not provided. */
  title: string;
  /** Default subheading paragraph. Used when `heroSubhead` is not provided. */
  subtitle: string;
  integrations: Integration[];
  /** Hide the integration grid section entirely. */
  hideGrid?: boolean;

  /** Optional eyebrow label above the H1. */
  heroLabel?: string;
  /** Override the H1 directly. Falls back to `title`. */
  heroH1?: string;
  /** Override the subheading paragraph. Falls back to `subtitle`. */
  heroSubhead?: string;
  /** Optional primary CTA in the hero. */
  heroPrimaryCta?: CategoryCtaButton;
  /** Optional secondary CTA in the hero. */
  heroSecondaryCta?: CategoryCtaButton;

  /** Optional "Common use cases" cards rendered below the catalogue. */
  useCases?: UseCase[];
  /** Optional heading override for the use cases section. Defaults to "Common use cases". */
  useCasesHeading?: string;
  /** Optional intro paragraph above the use cases grid. */
  useCasesIntro?: string;

  /** Optional "How the integration works" step blocks. */
  howItWorks?: HowItWorksStep[];
  /** Optional heading override for the how-it-works section. */
  howItWorksHeading?: string;
  /** Optional intro paragraph above the how-it-works steps. */
  howItWorksIntro?: string;

  /** Optional FAQ items rendered before the closing CTA. */
  faq?: FaqItem[];

  /** Optional override for the closing CTA. */
  closingCta?: CategoryClosingCta;

  /** Optional breadcrumb trail. Renders BreadcrumbList JSON-LD automatically. */
  breadcrumbs?: CategoryBreadcrumb[];

  /** Optional additional JSON-LD schemas (ItemList, Service, etc.). FAQ + breadcrumb are added automatically. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonLd?: Record<string, any>[];

  /**
   * Optional visual rendered on the right side of the hero. When provided the
   * hero switches to a two-column layout (text left, visual right).
   */
  heroVisual?: ReactNode;
}

/**
 * Slugify an integration name for anchor links. Mirrors the slugs used in
 * the JSON-LD ItemList URLs (e.g. "TikTok Shop" → "tiktok-shop").
 */
function integrationAnchor(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function IntegrationCategoryPage({
  title,
  subtitle,
  integrations,
  heroLabel,
  heroH1,
  heroSubhead,
  heroPrimaryCta,
  heroSecondaryCta,
  useCases,
  useCasesHeading = "Common use cases",
  useCasesIntro,
  howItWorks,
  howItWorksHeading = "How the integration works",
  howItWorksIntro,
  faq,
  closingCta,
  breadcrumbs,
  jsonLd,
  heroVisual,
  hideGrid,
}: IntegrationCategoryPageProps) {
  const headline = heroH1 ?? title;
  const subhead = heroSubhead ?? subtitle;

  // Assemble JSON-LD payload: explicit schemas + auto-generated faq/breadcrumb.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ldData: Record<string, any>[] = [...(jsonLd ?? [])];
  if (breadcrumbs && breadcrumbs.length > 0) ldData.push(breadcrumbSchema(breadcrumbs));
  if (faq && faq.length > 0) ldData.push(faqSchema(faq));

  return (
    <>
      {ldData.length > 0 && <JsonLd data={ldData} />}

      {/* Hero */}
      <section className={`${heroVisual ? "bg-bg-dark" : "bg-bg-secondary border-b border-border"} py-16 md:py-24 overflow-hidden relative`}>
        {heroVisual && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className={`flex ${heroVisual ? "flex-col lg:flex-row lg:items-center lg:justify-between gap-12" : "flex-col"}`}>
              {/* Text */}
              <div className="max-w-2xl">
                <div className="mb-8">
                  <Link
                    href="/integrations/tech"
                    className={`inline-flex items-center gap-1.5 text-sm transition-colors ${heroVisual ? "text-white/50 hover:text-white/80" : "text-text-secondary hover:text-accent"}`}
                  >
                    <span aria-hidden>←</span> Tech integrations
                  </Link>
                </div>
                {heroLabel && (
                  <div className="mb-5">
                    <span className={`text-xs font-semibold uppercase tracking-widest ${heroVisual ? "text-accent" : "inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-eyebrow"}`}>
                      {heroLabel}
                    </span>
                  </div>
                )}
                <h1 className={`text-display-xl ${heroVisual ? "text-white" : "text-text-primary"}`}>{headline}</h1>
                <p className={`mt-4 text-lg ${heroVisual ? "text-white/70 font-medium" : "text-text-secondary"}`}>{subhead}</p>
                {(heroPrimaryCta || heroSecondaryCta) && (
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    {heroPrimaryCta && (
                      <Button href={heroPrimaryCta.href}>{heroPrimaryCta.label}</Button>
                    )}
                    {heroSecondaryCta && (
                      <Button href={heroSecondaryCta.href} variant="secondary" surface={heroVisual ? "dark" : undefined}>{heroSecondaryCta.label}</Button>
                    )}
                  </div>
                )}
              </div>

              {/* Optional visual (e.g. orbit) */}
              {heroVisual && (
                <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
                  {heroVisual}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Integration grid */}
      {!hideGrid && (
        <section id="catalogue" className="bg-bg-secondary py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {integrations.map((integration) => (
                  <Link
                    key={integration.id}
                    id={integrationAnchor(integration.name)}
                    href={`/integrations/tech/${getIntegrationSlug(integration)}`}
                    className="group block card-hover bg-white rounded-xl border border-border p-5 hover:border-accent/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 text-center h-full scroll-mt-24 transition-all"
                  >
                    <IntegrationLogo name={integration.name} logo={integration.logo} size="sm" className="mx-auto mb-3" />
                    <p className="text-heading-sm text-text-primary">{integration.name}</p>
                    {integration.description && (
                      <p className="text-caption text-text-tertiary mt-1">{integration.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </ScrollReveal>

            {integrations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary">No integrations in this category yet. More coming soon.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Common use cases */}
      {useCases && useCases.length > 0 && (
        <section className="bg-white py-16 md:py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-display-lg text-text-primary mb-3">{useCasesHeading}</h2>
              {useCasesIntro && (
                <p className="text-text-secondary max-w-2xl mb-10">{useCasesIntro}</p>
              )}
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((uc, i) => (
                <ScrollReveal key={uc.headline} delay={i * 0.05}>
                  <div className="bg-bg-secondary rounded-2xl border border-border p-6 h-full flex flex-col">
                    <h3 className="text-heading-md text-text-primary mb-3">{uc.headline}</h3>
                    <p className="text-body-sm text-text-secondary mb-5 flex-1">{uc.description}</p>
                    {uc.namedIntegrations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {uc.namedIntegrations.map((name) => (
                          <span
                            key={name}
                            className="inline-block text-[11px] font-medium uppercase tracking-wider text-accent bg-accent-light px-2.5 py-1 rounded-full"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How the integration works */}
      {howItWorks && howItWorks.length > 0 && (
        <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-display-lg text-text-primary mb-3">{howItWorksHeading}</h2>
              {howItWorksIntro && (
                <p className="text-text-secondary max-w-2xl mb-10 whitespace-pre-line">{howItWorksIntro}</p>
              )}
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {howItWorks.map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 0.05}>
                  <div className="bg-white rounded-2xl border border-border p-6 h-full">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent-light text-accent text-heading-sm mb-4">
                      {s.step}
                    </span>
                    <h3 className="text-heading-sm text-text-primary mb-2">{s.title}</h3>
                    <p className="text-body-sm text-text-secondary whitespace-pre-line">{s.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && <FaqSection items={faq} />}

      {/* Closing CTA — custom override or default */}
      {closingCta ? (
        <section className="bg-bg-dark py-16 md:py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-display-lg text-white mb-3">{closingCta.headline}</h2>
              <p className="text-body-lg text-white/80 mb-8">{closingCta.subhead}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href={closingCta.primary.href} surface="dark">{closingCta.primary.label}</Button>
                {closingCta.secondary && (
                  <Button href={closingCta.secondary.href} variant="secondary" surface="dark">
                    {closingCta.secondary.label}
                  </Button>
                )}
              </div>
              {closingCta.asyncNote && (
                <p className="mt-4 text-body-sm text-white/60">{closingCta.asyncNote}</p>
              )}
            </ScrollReveal>
          </div>
        </section>
      ) : (
        <ClosingCTA headline="Ready to connect your stack?" subtitle="Start your free trial or talk to our integration specialists." />
      )}
    </>
  );
}
