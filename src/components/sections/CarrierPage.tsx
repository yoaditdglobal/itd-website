import Link from "next/link";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
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
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <Link href="/integrations/carriers" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent mb-6">
                ← All carriers
              </Link>
              <div className="flex items-center gap-4 mb-6">
                <IntegrationLogo name={name} logo={logo} size="md" fit="contain" />
                <div>
                  <h1 className="text-display-xl text-text-primary">{name}</h1>
                  <span className="text-sm font-medium text-accent">{region}</span>
                </div>
              </div>
              <p className="text-xl text-text-secondary">{tagline}</p>
              <p className="mt-4 text-text-secondary leading-relaxed">{description}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href={`/contact?enquiry=${name.toLowerCase().replace(/\s+/g, "-")}`}>Connect {name} to Connexx</Button>
                <Button href="/contact" variant="secondary">Contact Sales</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-bg-dark py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl text-display-lg text-text-primary mb-8">Services available via Connexx</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div key={service} className="bg-white rounded-xl border border-border p-5 flex items-start gap-3">
                  <Truck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-text-primary">{service}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How Connexx enhances */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl text-display-lg text-text-primary mb-3">
              {name} + Connexx
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
