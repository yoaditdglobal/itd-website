import Link from "next/link";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
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

  return (
    <>
      <section className="bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-eyebrow text-accent-secondary mb-3">Tech integrations</p>
          <h1 className="text-display-xl text-text-primary max-w-3xl">
            Connects to the tools you already run.
          </h1>
          <p className="mt-4 text-body-lg text-text-secondary max-w-2xl">
            {tech.length} ERP, WMS, eCommerce, and marketplace integrations push orders
            into Connexx and get tracking written back — no double entry. Pick a tool to
            see how it works with Connexx.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {groups.map((group) => (
            <div key={group.category}>
              <h2 className="text-heading-md text-text-primary mb-6">{group.label}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.items.map((t) => (
                  <Link
                    key={t.id}
                    href={`/integrations/tech/${getIntegrationSlug(t)}`}
                    className="bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-accent/20 transition-all text-center"
                  >
                    <IntegrationLogo name={t.name} logo={t.logo} size="sm" className="mx-auto mb-3" />
                    <p className="text-sm font-medium text-text-primary">{t.name}</p>
                    {t.description && (
                      <p className="text-xs text-text-tertiary mt-1">{t.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ClosingCTA headline="Need an integration we don't list?" />
    </>
  );
}
