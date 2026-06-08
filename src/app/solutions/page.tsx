import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { Building2, Store, ShoppingCart, Package, Truck, Globe, Factory, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions — ITD Global",
  description: "Solutions built for how you ship. Find the right path for your business stage and model.",
};

const stages = [
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    desc: "Global logistics orchestration at scale.",
    details: [
      "Multi-region carrier management across 40+ countries",
      "Advanced analytics and custom reporting dashboards",
      "Dedicated account management and priority support",
      "Custom API integrations with your existing ERP and WMS",
    ],
  },
  {
    id: "small-business",
    name: "SMEs",
    icon: Store,
    desc: "Ship smarter from day one.",
    details: [
      "Automated rate comparison across all major carriers",
      "One-click label generation and batch processing",
      "Integrated tracking with customer notification emails",
      "No minimum volumes — pay as you grow",
    ],
  },
];

const models = [
  { name: "eCommerce", icon: ShoppingCart, href: "/solutions/ecommerce", full: true, pain: "Carrier fragmentation across markets", value: "Multi-carrier shipping for online stores with automated rate comparison." },
  { name: "Marketplace Seller", icon: Package, href: "/solutions/marketplace-seller", full: true, pain: "Different shipping rules per platform", value: "Unified fulfilment across Amazon, eBay, Etsy, and more." },
  { name: "3PL", icon: Truck, href: "/solutions/3pl", full: true, pain: "Managing logistics for multiple clients", value: "Multi-client logistics automation with per-brand configuration." },
  { name: "Export", icon: Globe, href: "#export", full: false, pain: "Complex customs documentation", value: "Automated export compliance, documentation, and carrier booking.", capabilities: ["Auto-generated export documents", "HS code classification", "Carrier booking in one workflow"] },
  { name: "Import", icon: Package, href: "#import", full: false, pain: "Unpredictable customs clearance", value: "Pre-clearance documentation and duty calculation for smooth imports.", capabilities: ["Tariff classification", "Duty cost estimation", "Real-time clearance tracking"] },
  { name: "B2B", icon: Factory, href: "#b2b", full: false, pain: "Manual carrier selection for every order", value: "ERP-connected dispatch with rule-based carrier selection.", capabilities: ["Direct ERP integration", "Weight/destination-based routing", "Automated booking confirmations"] },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-display-xl text-text-primary">
              Solutions built for how you ship.
            </h1>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Every business ships differently. Select your stage or business model to see how ITD Global fits your operations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* By Stage */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-2">By Stage</p>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Where is your business today?</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {stages.map((stage, i) => (
              <ScrollReveal key={stage.id} delay={i * 0.1}>
                <div id={stage.id} className="bg-white rounded-xl border border-border p-8 h-full">
                  <stage.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary">{stage.name}</h3>
                  <p className="mt-2 text-text-secondary">{stage.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {stage.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-accent mt-0.5">&#10003;</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* By Business Model */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-eyebrow text-accent mb-2">By Business Model</p>
            <h2 className="text-2xl font-bold text-text-primary mb-8">What does your business do?</h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, i) => (
              <ScrollReveal key={model.name} delay={i * 0.07}>
                {model.full ? (
                  <Link
                    href={model.href}
                    className="group block bg-accent-light/30 border border-accent/20 rounded-xl p-6 hover:shadow-lg hover:border-accent/40 transition-all h-full"
                  >
                    <model.icon className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">{model.name}</h3>
                    <p className="mt-1 text-xs text-accent/70">{model.pain}</p>
                    <p className="mt-2 text-sm text-text-secondary">{model.value}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm text-accent font-medium">
                      View full page <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ) : (
                  <div id={model.href.replace("#", "")} className="bg-white border border-border rounded-xl p-6 h-full">
                    <model.icon className="w-8 h-8 text-accent mb-3" />
                    <h3 className="text-lg font-semibold text-text-primary">{model.name}</h3>
                    <p className="mt-1 text-xs text-text-tertiary">{model.pain}</p>
                    <p className="mt-2 text-sm text-text-secondary">{model.value}</p>
                    {"capabilities" in model && model.capabilities && (
                      <ul className="mt-3 space-y-1">
                        {model.capabilities.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-xs text-text-secondary">
                            <span className="text-accent mt-0.5">&#10003;</span> {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA headline="Find your fit" subtitle="Not sure which solution is right for you? Talk to our team." />
    </>
  );
}
