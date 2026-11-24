import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import IntegrationCard from "@/components/ui/IntegrationCard";
import HeroBackdrop from "@/components/ui/HeroBackdrop";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import { CATEGORY_HREFS, CATEGORY_THEMES } from "@/lib/page-themes";
import {
  getIntegrationsByType,
  getIntegrationSlug,
  TECH_CATEGORY_LABELS,
} from "@/lib/data";

export const metadata = buildMetadata({
  title: "Tech integrations",
  description:
    "Connexx connects to the ERP, WMS, eCommerce, and marketplace tools you already run — NetSuite, Shopify, WooCommerce, Amazon, eBay and more.",
  path: "/integrations/tech",
});

const CATEGORY_ORDER = ["erp_wms", "ecommerce_logistics", "marketplace"] as const;

export default function TechIntegrationsPage() {
  const tech = getIntegrationsByType("tech");
  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    label: TECH_CATEGORY_LABELS[category] ?? category,
    items: tech.filter((t) => t.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {/* Hero — copy left, colour-coded category index right */}
      <section data-hero-tone="dark" className="bleed-nav relative overflow-hidden bg-bg-dark py-16 md:py-24 lg:py-28">
        <HeroBackdrop primary="#1cc3cb" secondary="#5b7bff" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-6">
              <p className="flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-eyebrow text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1cc3cb]" aria-hidden />
                Tech integrations
              </p>
              <h1 className="mt-5 text-display-xl text-white">Connects to the tools you already run</h1>
              <p className="mt-5 text-body-lg text-white/70">
                {tech.length} ERP, WMS, eCommerce, and marketplace integrations
                push orders into Connexx and get tracking written back — no
                double entry. Pick a tool to see how it works with Connexx.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={RATE_CHECKER_URL} surface="dark" size="lg">Get Quote</Button>
                <Button surface="dark" variant="secondary" href="/contact" size="lg">Contact Sales</Button>
              </div>
            </ScrollReveal>

            {/* Category index — each family in its own colour */}
            <ScrollReveal delay={0.1} className="lg:col-span-6">
              <nav
                aria-label="Integration categories"
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur-md"
              >
                {groups.map((g) => {
                  const t = CATEGORY_THEMES[g.category];
                  return (
                    <a
                      key={g.category}
                      href={`#${g.category}`}
                      className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      <span className="h-10 w-1 rounded-full" style={{ background: `linear-gradient(${t.glow}, ${t.glow}40)` }} aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block text-heading-sm text-white">{g.label}</span>
                        <span className="mt-0.5 block text-body-sm text-white/55">
                          <span className="tabular-nums">{g.items.length}</span> integrations
                        </span>
                      </span>
                      <span className="hidden gap-1.5 sm:flex" aria-hidden>
                        {g.items.filter((i) => i.logo).slice(0, 4).map((i) => (
                          <span key={i.id} className="h-8 w-8 overflow-hidden rounded-lg bg-white ring-1 ring-white/20">
                            <IntegrationLogo name={i.name} logo={i.logo} size="fill" />
                          </span>
                        ))}
                      </span>
                      <ArrowDown className="h-4 w-4 text-white/40 transition-transform group-hover:translate-y-0.5 group-hover:text-white" aria-hidden />
                    </a>
                  );
                })}
              </nav>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Directory — one colour-coded section per category */}
      {groups.map((group, gi) => {
        const t = CATEGORY_THEMES[group.category];
        return (
          <section
            key={group.category}
            id={group.category}
            className={`scroll-mt-20 py-16 md:py-20 ${gi % 2 === 0 ? "section-glow section-glow--light bg-white" : "section-glow section-glow--warm bg-bg-secondary"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="flex w-fit items-center gap-2 rounded-full px-3 py-1 text-eyebrow" style={{ backgroundColor: t.soft, color: t.accent }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: t.accent }} aria-hidden />
                      <span className="tabular-nums">{group.items.length}</span> integrations
                    </p>
                    <h2 className="mt-4 text-display-lg text-text-primary">{group.label}</h2>
                  </div>
                  {CATEGORY_HREFS[group.category] && (
                    <Link
                      href={CATEGORY_HREFS[group.category]}
                      className="link-underline gap-1 text-sm font-medium"
                      style={{ color: t.accent }}
                    >
                      How {group.label} integrations work <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  )}
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((t2) => (
                    <IntegrationCard
                      key={t2.id}
                      href={`/integrations/tech/${getIntegrationSlug(t2)}`}
                      name={t2.name}
                      logo={t2.logo}
                      description={t2.description}
                      theme={t}
                    />
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        );
      })}

      <ClosingCTA headline="Need an integration we don't list?" />
    </>
  );
}
