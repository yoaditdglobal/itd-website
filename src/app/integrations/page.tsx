"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import Button from "@/components/ui/Button";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { integrations } from "@/lib/data";

const carrierSlugs: Record<string, string> = {
  "Evri": "/integrations/carriers/evri",
  "Royal Mail": "/integrations/carriers/royal-mail",
  "DPD": "/integrations/carriers/dpd",
  "Amazon Shipping": "/integrations/carriers/amazon-shipping",
  "DHL Express": "/integrations/carriers/dhl",
};

const techCategories = [
  { key: "all", label: "All" },
  { key: "erp_wms", label: "ERP / WMS" },
  { key: "logistics", label: "Logistics" },
  { key: "ecommerce", label: "eCommerce" },
  { key: "marketplace", label: "Marketplaces" },
];

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showAllCarriers, setShowAllCarriers] = useState(false);

  const techIntegrations = integrations.filter((i) => i.type === "tech");
  const carrierIntegrations = integrations.filter((i) => i.type === "carrier");
  const featuredCarriers = carrierIntegrations.filter((c) => c.featured);
  const displayedCarriers = showAllCarriers ? carrierIntegrations : featuredCarriers;

  const filteredTech = activeTab === "all" ? techIntegrations : techIntegrations.filter((i) => i.category === activeTab);

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-bold tracking-tight text-text-primary">Integrations</h1>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Connexx works with your existing stack. Connect your ERP, eCommerce platform, marketplace, and carriers — all from one dashboard.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tech Integrations */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionLabel title="Tech Integrations" subtitle="Connect the tools your team already uses." />
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
                <div key={integration.id} className="bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-accent/20 transition-all text-center">
                  <IntegrationLogo name={integration.name} logo={integration.logo} size="sm" className="mx-auto mb-3" />
                  <p className="text-sm font-medium text-text-primary">{integration.name}</p>
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
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionLabel title="Carrier Integrations" subtitle="Ship with the carriers your customers trust." />
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {displayedCarriers.map((carrier) => {
                const href = carrierSlugs[carrier.name];
                const content = (
                  <div className={`bg-bg-secondary rounded-xl border border-border p-5 hover:shadow-md transition-all text-center h-full ${href ? "hover:border-accent/20 cursor-pointer" : ""}`}>
                    <IntegrationLogo name={carrier.name} logo={carrier.logo} size="sm" className="mx-auto mb-3" />
                    <p className="text-sm font-medium text-text-primary">{carrier.name}</p>
                    {carrier.region && (
                      <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-text-tertiary bg-white px-2 py-0.5 rounded-full border border-border">
                        {carrier.region}
                      </span>
                    )}
                  </div>
                );
                return href ? <Link key={carrier.id} href={href}>{content}</Link> : <div key={carrier.id}>{content}</div>;
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

      {/* Missing integration CTA */}
      <section className="bg-bg-secondary py-12 md:py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h3 className="text-xl font-semibold text-text-primary">Don&apos;t see your integration?</h3>
            <p className="mt-2 text-text-secondary">We&apos;re adding new integrations every month. Tell us what you need.</p>
            <div className="mt-6">
              <Button href="#">Request an Integration</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ClosingCTA headline="Ready to connect your stack?" subtitle="Start your free trial or talk to our integration specialists." />
    </>
  );
}
