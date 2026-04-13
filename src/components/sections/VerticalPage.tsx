import Link from "next/link";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
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

interface VerticalPageProps {
  title: string;
  subtitle: string;
  pains: PainPoint[];
  features: Feature[];
  integrationNames: string[];
  caseStudy: CaseStudy;
}

export default function VerticalPage({
  title,
  subtitle,
  pains,
  features,
  integrationNames,
  caseStudy,
}: VerticalPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="font-bold tracking-tight text-text-primary">{title}</h1>
              <p className="mt-4 text-lg text-text-secondary">{subtitle}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="#">Get Started</Button>
                <Button href="/contact" variant="secondary">Contact Sales</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-bg-secondary py-12 md:py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {pains.map((pain, i) => (
              <ScrollReveal key={pain.num} delay={i * 0.1}>
                <div className="flex gap-4">
                  <span className="text-3xl md:text-4xl font-bold text-accent/20 leading-none flex-shrink-0">{pain.num}</span>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary mb-1">{pain.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{pain.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Connexx for [vertical] */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Connexx Platform</p>
                <h2 className="font-bold tracking-tight text-text-primary">How Connexx solves it</h2>
                <div className="mt-6 space-y-5">
                  {features.map((f) => (
                    <div key={f.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                        <f.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-text-primary">{f.title}</h3>
                        <p className="text-sm text-text-secondary mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href="/connexx">Explore Connexx</Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-bg-secondary rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-text-tertiary">Connexx Dashboard</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Zap, label: "Rate Compare", val: "Active" },
                    { icon: Eye, label: "Tracking", val: "Live" },
                    { icon: ShieldCheck, label: "Compliance", val: "100%" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white rounded-lg p-3 border border-border text-center">
                      <m.icon className="w-5 h-5 text-accent mx-auto mb-1" />
                      <div className="text-xs text-text-tertiary">{m.label}</div>
                      <div className="text-sm font-bold text-text-primary">{m.val}</div>
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
            <div className="flex flex-wrap gap-3">
              {integrationNames.map((name) => (
                <span key={name} className="px-4 py-2 rounded-full border border-border bg-white text-sm text-text-secondary">
                  {name}
                </span>
              ))}
            </div>
            <Link href="/integrations" className="inline-block mt-4 text-sm text-accent font-medium hover:underline">
              See all integrations →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured case study */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Case Study</p>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-4">{caseStudy.metric}</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">{caseStudy.brandName}</h3>
              <p className="text-text-secondary leading-relaxed mb-6">{caseStudy.summary}</p>
              {caseStudy.quote && (
                <blockquote className="border-l-3 border-accent pl-4 italic text-text-secondary mb-6">
                  &ldquo;{caseStudy.quote}&rdquo;
                  {caseStudy.quoteAuthor && (
                    <footer className="mt-2 text-sm font-medium text-text-primary not-italic">— {caseStudy.quoteAuthor}</footer>
                  )}
                </blockquote>
              )}
              <Link href={`/resources/case-studies/${caseStudy.slug}`} className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:underline">
                Read full case study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
