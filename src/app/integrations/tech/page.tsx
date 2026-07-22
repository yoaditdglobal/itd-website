import Link from "next/link";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";
import {
  getIntegrationsByType,
  getIntegrationSlug,
  TECH_CATEGORY_LABELS,
} from "@/lib/data";

export const metadata = buildMetadata({
  title: "Tech integrations — ERP, WMS, eCommerce & marketplaces",
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

  const keyFacts = [
    { value: String(tech.length), label: "Tech integrations" },
    ...groups.map((g) => ({ value: String(g.items.length), label: g.label })),
  ];

  return (
    <>
      {/* Hero */}
      <section
        data-hero-tone="dark"
        className="bleed-nav bg-bg-dark py-16 md:py-24 overflow-hidden relative"
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="text-eyebrow text-accent mb-4 block">
                Tech integrations
              </span>
              <h1 className="text-display-xl text-white">
                Connects to the tools you already run
              </h1>
              <p className="mt-4 text-body-lg text-white/70">
                {tech.length} ERP, WMS, eCommerce, and marketplace integrations
                push orders into Connexx and get tracking written back — no
                double entry. Pick a tool to see how it works with Connexx.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="https://itdglobal-ratechecker.lovable.app/">
                  Get a quote
                </Button>
                <Button surface="dark" variant="secondary" href="/contact">
                  Talk to us
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key facts */}
      <section className="border-b border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {keyFacts.map((s) => (
              <div key={s.label}>
                <dd className="text-3xl font-semibold text-text-primary md:text-4xl">
                  {s.value}
                </dd>
                <dt className="mt-1 text-sm text-text-tertiary">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Directory */}
      <section className="bg-bg-secondary py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {groups.map((group) => (
            <ScrollReveal key={group.category}>
              <div>
                <h2 className="text-display-md text-text-primary mb-6">
                  {group.label}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
                  {group.items.map((t) => (
                    <Link
                      key={t.id}
                      href={`/integrations/tech/${getIntegrationSlug(t)}`}
                      className="card-hover h-full bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-accent/20 transition-all text-center"
                    >
                      <IntegrationLogo
                        name={t.name}
                        logo={t.logo}
                        size="sm"
                        className="mx-auto mb-3"
                      />
                      <p className="text-label text-text-primary">{t.name}</p>
                      {t.description && (
                        <p className="text-xs text-text-tertiary mt-1">
                          {t.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ClosingCTA headline="Need an integration we don't list?" />
    </>
  );
}
