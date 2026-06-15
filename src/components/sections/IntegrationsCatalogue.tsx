"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import type { Integration } from "@/lib/data";

const carrierSlugs: Record<string, string> = {
  "Evri": "/integrations/carriers/evri",
  "Royal Mail": "/integrations/carriers/royal-mail",
  "DPD": "/integrations/carriers/dpd",
  "Amazon Shipping": "/integrations/carriers/amazon-shipping",
  "DHL": "/integrations/carriers/dhl",
};

const techCategories = [
  { key: "all", label: "All" },
  { key: "erp_wms", label: "ERP / WMS" },
  { key: "ecommerce_logistics", label: "eCommerce & Logistics" },
  { key: "marketplace", label: "Marketplace" },
];

interface IntegrationsCatalogueProps {
  techIntegrations: Integration[];
  carrierIntegrations: Integration[];
}

/**
 * Slugify an integration name for anchor links. Mirrors the slugs used in
 * the JSON-LD ItemList URLs (e.g. "TikTok Shop" → "tiktok-shop").
 */
function integrationAnchor(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Client-side catalogue for the integrations hub. Handles tab filtering
 * across tech categories and the "show all carriers" toggle. Rendered
 * inside the server page so the surrounding hero, use cases, how-it-works,
 * FAQ, and JSON-LD all stay server-side.
 */
export default function IntegrationsCatalogue({
  techIntegrations,
  carrierIntegrations,
}: IntegrationsCatalogueProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [showAllCarriers, setShowAllCarriers] = useState(false);

  const featuredCarriers = carrierIntegrations.filter((c) => c.featured);
  const displayedCarriers = showAllCarriers ? carrierIntegrations : featuredCarriers;

  const filteredTech = activeTab === "all"
    ? techIntegrations
    : techIntegrations.filter((i) => i.category === activeTab);

  return (
    <>
      {/* Tech Integrations */}
      <section id="catalogue" className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionLabel
              title="Tech integrations"
              subtitle="Connect the tools your team already uses."
            />
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {techCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all min-h-[44px] ${
                    activeTab === cat.key
                      ? "bg-white shadow-sm text-text-primary border border-border"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredTech.map((integration) => (
                <div
                  key={integration.id}
                  id={integrationAnchor(integration.name)}
                  className="bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-accent/20 transition-all text-center scroll-mt-24"
                >
                  <IntegrationLogo name={integration.name} logo={integration.logo} size="sm" className="mx-auto mb-3" />
                  <p className="text-heading-sm text-text-primary">{integration.name}</p>
                  {integration.description && (
                    <p className="text-xs text-text-tertiary mt-1">{integration.description}</p>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Carrier Integrations */}
      <section id="carriers" className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionLabel
              title="Carrier integrations"
              subtitle="Ship with the carriers your customers trust."
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {displayedCarriers.map((carrier) => {
                const href = carrierSlugs[carrier.name];
                const content = (
                  <div className={`bg-bg-secondary rounded-xl border border-border p-5 hover:shadow-md transition-all text-center h-full scroll-mt-24 ${href ? "hover:border-accent/20 cursor-pointer" : ""}`}>
                    <IntegrationLogo name={carrier.name} logo={carrier.logo} size="sm" className="mx-auto mb-3" />
                    <p className="text-heading-sm text-text-primary">{carrier.name}</p>
                    {carrier.region && (
                      <span className="inline-block mt-1 text-eyebrow text-text-tertiary bg-white px-2 py-0.5 rounded-full border border-border">
                        {carrier.region}
                      </span>
                    )}
                  </div>
                );
                return href ? (
                  <Link key={carrier.id} href={href} id={integrationAnchor(carrier.name)} className="scroll-mt-24">{content}</Link>
                ) : (
                  <div key={carrier.id} id={integrationAnchor(carrier.name)} className="scroll-mt-24">{content}</div>
                );
              })}
            </div>
          </ScrollReveal>

          {!showAllCarriers && carrierIntegrations.length > featuredCarriers.length && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAllCarriers(true)}
                className="text-sm text-accent font-medium hover:underline min-h-[44px]"
              >
                Show all {carrierIntegrations.length} carriers →
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
