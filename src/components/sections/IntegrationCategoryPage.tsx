import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import Button from "@/components/ui/Button";
import ClosingCTA from "@/components/sections/ClosingCTA";
import ConnexxGateway from "@/components/sections/ConnexxGateway";
import type { GatewayFeature, GatewayStatTile } from "@/components/sections/ConnexxGateway";
import FaqSection from "@/components/sections/FaqSection";
import type { FaqItem } from "@/components/sections/FaqSection";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import type { Integration } from "@/lib/data";
import { getIntegrationSlug, integrations as ALL_INTEGRATIONS } from "@/lib/data";
import CategoryOrbit from "@/components/sections/CategoryOrbit";

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

  /**
   * Optional "How Connexx solves it" platform gateway section, rendered
   * between how-it-works and the FAQ. `statTiles` customises the mockup's
   * status tiles (defaults to the standard Rate Compare / Tracking /
   * Compliance trio).
   */
  connexxSolves?: {
    features: GatewayFeature[];
    statTiles?: GatewayStatTile[];
  };

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
   * Optional visual on the right of the (dark) hero. Defaults to a
   * CategoryOrbit generated from `integrations`.
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

/** Use-case names that differ from their data.ts entry name. */
const NAME_ALIASES: Record<string, string> = { "DHL Express": "DHL" };

/** Logo for a named integration or carrier mentioned in a use case. */
function logoFor(name: string): string | undefined {
  const target = NAME_ALIASES[name] ?? name;
  return ALL_INTEGRATIONS.find((i) => i.name === target)?.logo;
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
  connexxSolves,
  faq,
  closingCta,
  breadcrumbs,
  jsonLd,
  heroVisual,
  hideGrid,
}: IntegrationCategoryPageProps) {
  const headline = heroH1 ?? title;
  const subhead = heroSubhead ?? subtitle;
  const withLogos = integrations.filter((i) => i.logo);

  // Assemble JSON-LD payload: explicit schemas + auto-generated faq/breadcrumb.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ldData: Record<string, any>[] = [...(jsonLd ?? [])];
  if (breadcrumbs && breadcrumbs.length > 0) ldData.push(breadcrumbSchema(breadcrumbs));
  if (faq && faq.length > 0) ldData.push(faqSchema(faq));

  return (
    <>
      {ldData.length > 0 && <JsonLd data={ldData} />}

      {/* Hero — one immersive dark treatment for every category page. */}
      <section data-hero-tone="dark" className="bleed-nav relative overflow-hidden bg-bg-dark py-16 md:py-24 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-[30%] h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-40 right-[-8%] h-[420px] w-[560px] rounded-full bg-button/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_45%,#000_20%,transparent_75%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <ScrollReveal className="max-w-2xl">
              <div>
                <Link
                  href="/integrations/tech"
                  className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                  Tech integrations
                </Link>
              </div>
              {heroLabel && (
                <p className="mt-8 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-eyebrow text-white/80 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-button" aria-hidden />
                  {heroLabel}
                </p>
              )}
              <h1 className={`${heroLabel ? "mt-5" : "mt-8"} text-display-xl text-white`}>{headline}</h1>
              <p className="mt-5 text-body-lg text-white/70">{subhead}</p>
              {(heroPrimaryCta || heroSecondaryCta) && (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {heroPrimaryCta && (
                    <Button href={heroPrimaryCta.href} surface="dark" size="lg">{heroPrimaryCta.label}</Button>
                  )}
                  {heroSecondaryCta && (
                    <Button href={heroSecondaryCta.href} variant="secondary" surface="dark" size="lg">{heroSecondaryCta.label}</Button>
                  )}
                </div>
              )}
              {withLogos.length > 0 && (
                <div className="mt-10 flex items-center gap-4">
                  {/* Spaced, not overlapped: overlapping clipped wide marks ("Ets", "eba"). */}
                  <div className="flex gap-1.5">
                    {withLogos.slice(0, 6).map((i) => (
                      <span key={i.id} className="h-9 w-9 overflow-hidden rounded-xl bg-white ring-1 ring-white/20">
                        <IntegrationLogo name={i.name} logo={i.logo} size="fill" />
                      </span>
                    ))}
                  </div>
                  <p className="whitespace-nowrap text-sm text-white/60">
                    <span className="font-semibold text-white tabular-nums">{integrations.length}</span> integrations
                  </p>
                </div>
              )}
            </ScrollReveal>

            <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
              {heroVisual ?? <CategoryOrbit brands={integrations} />}
            </div>
          </div>
        </div>
      </section>

      {/* Integration catalogue */}
      {!hideGrid && (
        <section id="catalogue" className="section-glow section-glow--light bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <p className="text-eyebrow text-accent">Integrations</p>
              <h2 className="mt-3 text-display-lg text-text-primary">
                <span className="tabular-nums">{integrations.length}</span> {heroLabel ?? "tech"} integrations
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {integrations.map((integration) => (
                  <Link
                    key={integration.id}
                    id={integrationAnchor(integration.name)}
                    href={`/integrations/tech/${getIntegrationSlug(integration)}`}
                    className="group card-hover flex h-full items-start gap-4 rounded-2xl border border-border bg-white p-5 scroll-mt-24 hover:border-accent/25 active:scale-[0.99] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    <IntegrationLogo
                      name={integration.name}
                      logo={integration.logo}
                      size="sm"
                      className="shadow-[0_1px_2px_rgb(15_23_42/0.08)] ring-1 ring-black/5"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-heading-sm text-text-primary transition-colors group-hover:text-accent">{integration.name}</p>
                      {integration.description && (
                        <p className="mt-1 text-body-sm text-text-secondary line-clamp-2">{integration.description}</p>
                      )}
                    </div>
                    <ArrowUpRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent motion-reduce:transition-none"
                      aria-hidden
                    />
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
        <section className="section-glow section-glow--warm bg-bg-secondary py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <p className="text-eyebrow text-accent">Use cases</p>
              <h2 className="mt-3 text-display-lg text-text-primary">{useCasesHeading}</h2>
              {useCasesIntro && (
                <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">{useCasesIntro}</p>
              )}
            </ScrollReveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {useCases.map((uc, i) => (
                <ScrollReveal key={uc.headline} delay={i * 0.05} className="h-full">
                  <article className="card-hover flex h-full flex-col rounded-2xl border border-border bg-white p-6 lg:p-7 hover:border-accent/25">
                    <span className="text-sm font-semibold text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-heading-md text-text-primary">{uc.headline}</h3>
                    <p className="mt-3 flex-1 text-body-sm text-text-secondary">{uc.description}</p>
                    {uc.namedIntegrations.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-2 border-t border-border/70 pt-5" aria-label="Integrations used">
                        {uc.namedIntegrations.map((name) => {
                          const logo = logoFor(name);
                          return (
                            <li
                              key={name}
                              className={`inline-flex items-center gap-2 rounded-full border border-border bg-white py-1 pr-3 text-xs font-medium text-text-primary ${logo ? "pl-1" : "pl-3"}`}
                            >
                              {logo && (
                                <span className="h-6 w-6 overflow-hidden rounded-full ring-1 ring-black/5">
                                  <IntegrationLogo name={name} logo={logo} size="fill" />
                                </span>
                              )}
                              {name}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How the integration works — connected timeline */}
      {howItWorks && howItWorks.length > 0 && (
        <section className="section-glow section-glow--light bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <p className="text-eyebrow text-accent">Process</p>
              <h2 className="mt-3 text-display-lg text-text-primary">{howItWorksHeading}</h2>
              {howItWorksIntro && (
                <p className="mt-4 max-w-2xl text-body-lg text-text-secondary whitespace-pre-line">{howItWorksIntro}</p>
              )}
            </ScrollReveal>
            <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {/* The connecting line: vertical on mobile, horizontal on md+. */}
              <span
                aria-hidden
                className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent md:bottom-auto md:left-6 md:right-0 md:top-5 md:h-px md:w-auto md:bg-gradient-to-r"
              />
              {howItWorks.map((s, i) => (
                <li key={s.step} className="relative pl-16 md:pl-0">
                  {/* Positioned against the <li>, NOT inside ScrollReveal: its
                      transform would become the containing block on mobile. */}
                  <span className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-heading-sm text-accent shadow-[0_4px_14px_-4px_rgb(29_63_184/0.35)] ring-1 ring-accent/30 md:relative">
                    {s.step}
                  </span>
                  <ScrollReveal delay={i * 0.08}>
                    <h3 className="pt-1.5 text-heading-md text-text-primary md:mt-6 md:pt-0">{s.title}</h3>
                    <p className="mt-2 text-body-sm text-text-secondary whitespace-pre-line">{s.description}</p>
                  </ScrollReveal>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* How Connexx solves it — platform gateway */}
      {connexxSolves && (
        <ConnexxGateway features={connexxSolves.features} statTiles={connexxSolves.statTiles} />
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && <FaqSection items={faq} />}

      {/* Closing CTA — custom override or default */}
      {closingCta ? (
        <section className="cta-glow bg-bg-dark py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-display-lg text-white mb-4">{closingCta.headline}</h2>
              <p className="text-body-lg text-white/75 mb-8">{closingCta.subhead}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button href={closingCta.primary.href} surface="dark" size="lg">{closingCta.primary.label}</Button>
                {closingCta.secondary && (
                  <Button href={closingCta.secondary.href} variant="secondary" surface="dark" size="lg">
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
