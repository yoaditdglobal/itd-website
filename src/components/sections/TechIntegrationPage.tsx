import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import type { TechFeature } from "@/lib/tech-pages";

interface CtaButton {
  label: string;
  href: string;
}

export interface TechIntegrationPageProps {
  name: string;
  logo?: string;
  /** Hero eyebrow, e.g. "ERP / WMS Integration". */
  eyebrow: string;
  tagline: string;
  description: string;
  /** "About {name}" paragraphs. */
  about: string[];
  features: TechFeature[];
  closingSubtitle?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton | null;
}

/**
 * Standardised tech-integration detail page — the tech analogue of CarrierPage.
 * Hero ({name} + ITD, tagline, description, Explore → #features) → About →
 * "Features built for your workflow" → "Start shipping with {name}" closing CTA.
 * Rendered by bespoke routes (e.g. /integrations/tech/linnworks) that supply the
 * copy; other tech pages still use the generic IntegrationDetail + TechPage.
 */
export default function TechIntegrationPage({
  name,
  logo,
  eyebrow,
  tagline,
  description,
  about,
  features,
  closingSubtitle,
  primaryCta,
  secondaryCta,
}: TechIntegrationPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-dark py-16 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              {/* Left — text */}
              <div className="max-w-2xl">
                <Link
                  href="/integrations"
                  className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/80 mb-6 transition-colors"
                >
                  ← All integrations
                </Link>
                <span className="text-eyebrow text-accent mb-4 block">
                  {eyebrow}
                </span>
                <h1 className="text-display-xl text-white">{`${name} + ITD`}</h1>
                <p className="mt-4 text-body-lg text-white/70 font-medium">
                  {tagline}
                </p>
                <p className="mt-4 text-body-md text-white/50">{description}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button href="#features">Explore</Button>
                </div>
              </div>

              {/* Right — logo tile */}
              {logo && (
                <div className="hidden lg:block flex-shrink-0">
                  <div className="relative h-44 w-44 rounded-3xl bg-white shadow-xl">
                    <Image
                      src={logo}
                      alt={`${name} logo`}
                      fill
                      priority
                      sizes="176px"
                      className="object-contain p-5"
                    />
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About */}
      {about.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-display-lg text-text-primary mb-6">
                About {name}
              </h2>
              <div className="max-w-3xl space-y-4">
                {about.map((p, i) => (
                  <p
                    key={i}
                    className="text-body-md text-text-secondary leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Features — the hero "Explore" CTA anchors here */}
      <section id="features" className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-10">
              Features built for your workflow
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.07}>
                <div className="bg-white rounded-xl border border-border p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-heading-sm text-text-primary">{f.title}</h3>
                  <p className="mt-2 text-body-sm text-text-secondary">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        headline={`Start shipping with ${name}`}
        subtitle={closingSubtitle}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />
    </>
  );
}
