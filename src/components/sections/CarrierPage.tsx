import Link from "next/link";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import CarrierOrbit from "@/components/sections/CarrierOrbit"; // client component
import { Truck, Globe, Clock, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CarrierFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface CarrierPageProps {
  name: string;
  logo?: string;
  logoBg?: string;
  heroBg?: string;
  heroTitle?: string;
  tagline: string;
  description: string;
  region: string;
  services: string[];
  features: CarrierFeature[];
  stats: { label: string; value: string }[];
}

export default function CarrierPage({
  name,
  logo,
  logoBg,
  heroBg,
  heroTitle,
  tagline,
  description,
  region,
  services,
  features,
  stats,
}: CarrierPageProps) {
  return (
    <>
      {/* Hero */}
      <section
        className={`${heroBg ? "" : "bg-bg-dark"} py-16 md:py-24 overflow-hidden relative`}
        style={heroBg ? { backgroundColor: heroBg } : undefined}
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              {/* Left — text */}
              <div className="max-w-2xl">
                <Link href="/integrations/carriers" className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/80 mb-6 transition-colors">
                  ← All carriers
                </Link>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-4 block">Integration</span>
                <h1 className="text-display-xl text-white whitespace-nowrap">
                  {heroTitle ?? `${name} + Connexx`}
                </h1>
                <p className="mt-4 text-lg text-white/70 font-medium">{tagline}</p>
                <p className="mt-4 text-white/50 leading-relaxed">{description}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button href={`/contact?enquiry=${name.toLowerCase().replace(/\s+/g, "-")}`}>Connect {name} to Connexx</Button>
                  <Button href="/contact" variant="secondary">Contact Sales</Button>
                </div>
              </div>

              {/* Right — mini orbit */}
              <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
                <CarrierOrbit name={name} logo={logo} logoBg={logoBg} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How Connexx enhances */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl text-display-lg text-text-primary mb-3">
              Features built for your workflow
            </h2>
            <p className="text-text-secondary mb-10 max-w-2xl">
              Everything you get from {name}, enhanced with Connexx&apos;s automation, analytics, and multi-carrier intelligence.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.07}>
                <div className="bg-bg-secondary rounded-xl border border-border p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">{f.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        headline={`Start shipping with ${name}`}
        subtitle="Connect your account in minutes. No migration, no downtime."
      />
    </>
  );
}
