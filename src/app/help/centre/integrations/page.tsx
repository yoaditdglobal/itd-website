import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import { INTEGRATION_GUIDES } from "@/lib/help-integrations";
import { ArrowRight, ListChecks } from "lucide-react";

const PATH = "/help/centre/integrations";

export const metadata = buildMetadata({
  title: "Integration setup guides",
  description:
    "Step-by-step guides for connecting Shopify, eBay, TikTok Shop, Selro, Linnworks, and Veeqo to ITD Global — setup, troubleshooting, and what to have ready before you start.",
  path: PATH,
});

export default function HelpIntegrationsPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Help", path: "/help" },
      { name: "Help Centre", path: "/help/centre" },
      { name: "Integrations", path: PATH },
    ]),
    itemListSchema({
      path: PATH,
      name: "ITD Global integration setup guides",
      items: INTEGRATION_GUIDES.map((g) => ({
        name: g.metaTitle,
        url: `${PATH}/${g.slug}`,
        description: g.metaDescription,
      })),
    }),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-3 py-1 rounded-full bg-accent-light text-accent text-eyebrow mb-4">
              Integrations
            </span>
            <h1 className="text-display-xl text-text-primary">
              Integration setup guides
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              Connect your store, marketplace, or order management system to the
              ITD Platform. Each guide walks through the setup step by step —
              what to have ready, what to click, and what to check if something
              doesn&apos;t look right.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Guide cards */}
      <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5 items-stretch">
            {INTEGRATION_GUIDES.map((g, i) => (
              <ScrollReveal key={g.slug} delay={i * 0.05} className="h-full">
                <Link
                  href={`${PATH}/${g.slug}`}
                  className="group relative flex h-full flex-col rounded-2xl border border-border bg-white p-5 md:p-6 transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:shadow-md hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-1.5">
                      <IntegrationLogo name={g.name} logo={g.logo} size="sm" fit="contain" />
                    </span>
                    <ArrowRight
                      className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200 motion-reduce:group-hover:translate-x-0 mt-1.5"
                      aria-hidden
                    />
                  </div>
                  <p className="text-heading-sm text-text-primary group-hover:text-accent transition-colors">
                    {g.name}
                  </p>
                  <p className="mt-2 text-body-sm text-text-secondary leading-relaxed">
                    How to connect {g.name} to ITD Global — from first click to
                    live orders.
                  </p>
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-caption text-text-tertiary">
                      <ListChecks className="w-3.5 h-3.5" aria-hidden />
                      {g.steps.length}-step setup
                    </span>
                    <span className="text-sm font-medium text-accent">
                      Read the guide
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-display-lg text-white mb-3">
              Don&apos;t see your platform?
            </h2>
            <p className="text-white/80 mb-8 text-body-lg">
              ITD connects to more systems than the guides listed here. Raise a
              request and the team will confirm the setup path for your stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/help/submit-request"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Submit a request
              </Link>
              <Link
                href="/help/centre"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Back to Help Centre
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
