import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import HeroBackdrop from "@/components/ui/HeroBackdrop";
import ConnectionVisual from "@/components/sections/ConnectionVisual";
import { AboutSplit, FeatureCard, FeatureGrid } from "@/components/sections/DetailSections";
import { brandGlow, categoryTheme } from "@/lib/page-themes";
import type { TechFeature } from "@/lib/tech-pages";

interface CtaButton {
  label: string;
  href: string;
}

export interface TechIntegrationPageProps {
  name: string;
  logo?: string;
  /** Logo is a full-bleed square tile — fills the hero cube, no white chip. */
  logoFill?: boolean;
  /** Hero eyebrow, e.g. "ERP / WMS Integration". */
  eyebrow: string;
  tagline: string;
  description?: string;
  /** "About {name}" paragraphs. */
  about: string[];
  /** Designed highlight cards rendered inside the About section. */
  aboutHighlights?: { lead?: string; items: TechFeature[] };
  /** About paragraphs rendered AFTER the highlight cards. */
  aboutAfter?: string[];
  features: TechFeature[];
  closingSubtitle?: string;
  /** Partner's own page about this integration — external link under About. */
  partnerLink?: { label: string; href: string };
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton | null;
}

/**
 * Standardised tech-integration detail page — the tech analogue of CarrierPage.
 * Hero ({name} + ITD, tagline, description, Explore → #features) → About →
 * "Features built for your workflow" → "Start shipping with {name}" closing CTA.
 * Rendered by bespoke routes (e.g. /integrations/tech/linnworks) that supply the
 * copy, and by the generic /integrations/tech/[slug] route via
 * getTechIntegrationPageProps in src/lib/tech-pages.ts.
 */
/** Renders [text](https://url) spans in About copy as external links;
 *  plain strings pass through untouched. */
function renderWithLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (!m) return part;
    return (
      <a
        key={i}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-text-primary underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent motion-reduce:transition-none"
      >
        {m[1]}
      </a>
    );
  });
}

export default function TechIntegrationPage({
  name,
  logo,
  logoFill,
  eyebrow,
  tagline,
  description,
  about,
  aboutHighlights,
  aboutAfter,
  features,
  closingSubtitle,
  partnerLink,
  primaryCta,
  secondaryCta,
}: TechIntegrationPageProps) {
  // Identity: category colour (ERP/WMS cobalt · eCommerce teal · Marketplace
  // amber) + the partner's own brand colour on the hero.
  const theme = categoryTheme(eyebrow);
  const brand = brandGlow(logo, theme.glow);

  return (
    <>
      {/* Hero */}
      <section data-hero-tone="dark" className="bleed-nav relative overflow-hidden bg-bg-dark py-16 md:py-24 lg:py-28">
        <HeroBackdrop primary={brand} secondary={theme.glow} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <ScrollReveal className="max-w-2xl">
              <div>
                <Link
                  href="/integrations/tech"
                  className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
                  All tech integrations
                </Link>
              </div>
              {/* Below lg the connection visual sits above the eyebrow. */}
              <div className="mt-8 lg:hidden">
                <ConnectionVisual logo={logo} logoFill={logoFill} brand={brand} size="sm" />
              </div>
              <p className="mt-8 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-eyebrow text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.glow }} aria-hidden />
                {eyebrow}
              </p>
              <h1 className="mt-5 text-display-xl text-white">{`${name} + ITD`}</h1>
              <p className="mt-5 text-body-lg font-medium text-white/80">{tagline}</p>
              {description && <p className="mt-4 text-body-md text-white/55">{description}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="#features" surface="dark" size="lg">Explore</Button>
              </div>
            </ScrollReveal>

            <div className="hidden lg:flex flex-shrink-0 items-center justify-center pr-4">
              <ConnectionVisual logo={logo} logoFill={logoFill} brand={brand} />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      {about.length > 0 && (
        <AboutSplit
          name={name}
          logo={logo}
          logoFill={logoFill}
          theme={theme}
          eyebrow={theme.label || "About"}
          paragraphs={about.map((p) => renderWithLinks(p))}
        >
          {aboutHighlights && (
            <div className="mt-10">
              {aboutHighlights.lead && (
                <p className="text-body-md leading-relaxed text-text-secondary">
                  {renderWithLinks(aboutHighlights.lead)}
                </p>
              )}
              <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2">
                {aboutHighlights.items.map((f) => (
                  <FeatureCard key={f.title} f={f} theme={theme} />
                ))}
              </div>
            </div>
          )}
          {aboutAfter && aboutAfter.length > 0 && (
            <div className="mt-8 space-y-4">
              {aboutAfter.map((p, i) => (
                <p key={i} className="text-body-md text-text-secondary leading-relaxed">
                  {renderWithLinks(p)}
                </p>
              ))}
            </div>
          )}
          {partnerLink && (
            <a
              href={partnerLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-1.5 text-body-sm font-semibold text-accent transition-colors hover:text-accent-dark motion-reduce:transition-none"
            >
              {partnerLink.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
            </a>
          )}
        </AboutSplit>
      )}

      {/* Features — the hero "Explore" CTA anchors here */}
      <FeatureGrid
        id="features"
        eyebrow="Features"
        heading="Features built for your workflow"
        features={features}
        theme={theme}
      />

      <ClosingCTA
        headline={`Start shipping with ${name}`}
        subtitle={closingSubtitle}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />
    </>
  );
}
