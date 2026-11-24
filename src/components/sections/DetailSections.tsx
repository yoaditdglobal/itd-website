import type { ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import type { Theme } from "@/lib/page-themes";

/**
 * Shared body sections for the tech-integration and carrier detail pages.
 * Colour comes from the page's Theme (category / region) so each family reads
 * distinctly while the structure stays consistent.
 */

/** "About {name}" — sticky label + logo on the left, lead + prose on the right. */
export function AboutSplit({
  name,
  logo,
  logoFill,
  theme,
  eyebrow,
  paragraphs,
  children,
}: {
  name: string;
  logo?: string;
  logoFill?: boolean;
  theme: Theme;
  eyebrow: string;
  /** Already-rendered paragraphs; the first becomes the lead. */
  paragraphs: ReactNode[];
  children?: ReactNode;
}) {
  const [lead, ...rest] = paragraphs;
  return (
    <section className="section-glow section-glow--light bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-eyebrow" style={{ color: theme.accent }}>{eyebrow}</p>
              <h2 className="mt-3 text-display-lg text-text-primary">About {name}</h2>
              {logo && (
                <div className="mt-8 hidden items-center gap-3 lg:flex">
                  <span
                    className={`relative h-14 w-14 overflow-hidden rounded-2xl shadow-[0_1px_2px_rgb(15_23_42/0.08)] ring-1 ring-black/5 ${logoFill ? "" : "bg-white"}`}
                  >
                    <Image src={logo} alt="" fill sizes="56px" className={logoFill ? "object-cover" : "object-contain p-2"} />
                  </span>
                  <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme.accent}55, transparent)` }} />
                </div>
              )}
            </div>
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-8">
            {lead && <p className="text-body-lg text-text-primary leading-relaxed">{lead}</p>}
            {rest.length > 0 && (
              <div className="mt-5 space-y-4">
                {rest.map((p, i) => (
                  <p key={i} className="text-body-md text-text-secondary leading-relaxed">{p}</p>
                ))}
              </div>
            )}
            {children}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export interface DetailFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

/** Feature card — category-tinted icon tile, accent hairline on hover. */
export function FeatureCard({ f, theme }: { f: DetailFeature; theme: Theme }) {
  return (
    <div className="group card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 hover:border-transparent">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
        style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.glow})` }}
      />
      <span
        className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
        style={{ backgroundColor: theme.soft, color: theme.accent }}
      >
        <f.icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="text-heading-sm text-text-primary">{f.title}</h3>
      <p className="mt-2 text-body-sm text-text-secondary">{f.desc}</p>
    </div>
  );
}

/** "Features built for your workflow" grid. */
export function FeatureGrid({
  id,
  eyebrow,
  heading,
  intro,
  features,
  theme,
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  features: DetailFeature[];
  theme: Theme;
}) {
  return (
    <section id={id} className="section-glow section-glow--warm bg-bg-secondary py-16 md:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-eyebrow" style={{ color: theme.accent }}>{eyebrow}</p>
          <h2 className="mt-3 text-display-lg text-text-primary">{heading}</h2>
          {intro && <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">{intro}</p>}
        </ScrollReveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.06} className="h-full">
              <FeatureCard f={f} theme={theme} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Carrier services as tidy check chips. */
export function ServicesList({
  heading,
  intro,
  services,
  theme,
}: {
  heading: string;
  intro: string;
  services: string[];
  theme: Theme;
}) {
  return (
    <section className="section-glow section-glow--light bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-eyebrow" style={{ color: theme.accent }}>Services</p>
          <h2 className="mt-3 text-display-md text-text-primary">{heading}</h2>
          <p className="mt-3 max-w-2xl text-body-md text-text-secondary">{intro}</p>
        </ScrollReveal>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <li
              key={svc}
              className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 shadow-[0_1px_2px_rgb(15_23_42/0.04)]"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: theme.soft, color: theme.accent }}
              >
                <Check className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span className="text-body-sm font-medium text-text-primary">{svc}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
