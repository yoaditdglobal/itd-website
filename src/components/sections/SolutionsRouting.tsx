import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { Building2, Store, ShoppingCart, Globe, Package, Factory, Truck, ArrowRight } from "lucide-react";

const stages = [
  {
    name: "Enterprise",
    desc: "Global logistics orchestration at scale. Multi-region carrier management, advanced analytics, and dedicated support for complex supply chains.",
    icon: Building2,
    href: "/solutions/enterprise",
  },
  {
    name: "Small Business",
    desc: "Start shipping smarter from day one. Automated rate comparison, one-click labels, and integrated tracking — no enterprise budget required.",
    icon: Store,
    href: "/solutions/small-business",
  },
];

const models = [
  { name: "eCommerce", icon: ShoppingCart, href: "/solutions/ecommerce", featured: true, hook: "Multi-carrier shipping for online stores" },
  { name: "Marketplace Seller", icon: Package, href: "/solutions/marketplace-seller", featured: true, hook: "Unified fulfilment across platforms" },
  { name: "3PL", icon: Truck, href: "/solutions/3pl", featured: true, hook: "Multi-client logistics automation" },
  { name: "Export", icon: Globe, href: "/solutions/export", featured: false, hook: "Compliance and documentation" },
  { name: "Import", icon: Package, href: "/solutions/import", featured: false, hook: "Customs and clearance automation" },
  { name: "B2B Manufacturing", icon: Factory, href: "/solutions/b2b", featured: false, hook: "ERP-connected dispatch" },
];

export default function SolutionsRouting() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionLabel title="Who we serve" subtitle="Choose your path. Every business ships differently — we built for that." align="center" />
        </ScrollReveal>

        {/* By Stage — 2 large cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {stages.map((stage, i) => (
            <ScrollReveal key={stage.name} delay={i * 0.1}>
              <Link
                href={stage.href}
                className="group block p-6 md:p-8 rounded-xl border border-border hover:border-accent/30 hover:shadow-lg transition-all bg-bg-secondary"
              >
                <stage.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {stage.name}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{stage.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm text-accent font-medium">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* By Business Model — 6 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model, i) => (
            <ScrollReveal key={model.name} delay={i * 0.07}>
              <Link
                href={model.href}
                className={`group block p-5 rounded-xl border transition-all ${
                  model.featured
                    ? "border-accent/20 bg-accent-light/30 hover:border-accent/40 hover:shadow-md"
                    : "border-border hover:border-accent/30 hover:shadow-md bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <model.icon className="w-6 h-6 text-accent" />
                  {model.featured && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent-light px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {model.name}
                </h3>
                <p className="mt-1 text-xs text-text-secondary">{model.hook}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
