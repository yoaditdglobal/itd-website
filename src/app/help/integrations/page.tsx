import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import { INTEGRATION_GUIDES } from "@/lib/help-integrations";
import { ArrowRight } from "lucide-react";

const PATH = "/help/integrations";

export const metadata = buildMetadata({
  title: "Integrations — Help Centre",
  description:
    "Step-by-step guides for connecting Shopify, eBay, TikTok Shop, Selro, Linnworks, and Veeqo to ITD Global — setup, troubleshooting, and what to have ready before you start.",
  path: PATH,
});

export default function HelpIntegrationsPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Help", path: "/help" },
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <nav className="mb-4 text-caption text-text-tertiary" aria-label="Breadcrumb">
              <Link href="/help" className="hover:text-accent">
                Help Centre
              </Link>{" "}
              / <span className="text-text-secondary">Integrations</span>
            </nav>
            <h1 className="text-display-xl text-text-primary">Integrations</h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              Connect your store, marketplace, or order management system to
              the ITD Platform. Each guide walks through the setup step by
              step. Pick a topic below.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Guides */}
      <section className="bg-bg-secondary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="text-display-lg text-text-primary">Topics</h2>
              <p className="mt-2 text-text-secondary">
                Every setup guide under Integrations — pick your platform.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {INTEGRATION_GUIDES.map((g) => (
                <Link
                  key={g.slug}
                  href={`${PATH}/${g.slug}`}
                  className="group bg-white rounded-xl border border-border p-6 hover:shadow-md hover:border-accent/30 transition-all flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1.5">
                      <IntegrationLogo name={g.name} logo={g.logo} size="sm" fit="contain" />
                    </span>
                    <span className="text-eyebrow text-accent bg-accent/10 rounded-full px-2.5 py-1">
                      {g.steps.length}-step setup
                    </span>
                  </div>
                  <p className="text-heading-md text-text-primary group-hover:text-accent transition-colors">
                    {g.name}
                  </p>
                  <p className="text-body-sm text-text-secondary mt-1.5 flex-1">
                    How to connect {g.name} to ITD Global — from first click to
                    live orders.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                    Open
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
