import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import Button from "@/components/ui/Button";
import ClosingCTA from "@/components/sections/ClosingCTA";
import type { Integration } from "@/lib/data";

interface IntegrationCategoryPageProps {
  title: string;
  subtitle: string;
  integrations: Integration[];
}

export default function IntegrationCategoryPage({
  title,
  subtitle,
  integrations,
}: IntegrationCategoryPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <Link href="/integrations" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent mb-6">
                ← All integrations
              </Link>
              <h1 className="font-bold tracking-tight text-text-primary">{title}</h1>
              <p className="mt-4 text-lg text-text-secondary">{subtitle}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Integration grid */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {integrations.map((integration) => (
                <div key={integration.id} className="bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-accent/20 transition-all text-center h-full">
                  <IntegrationLogo name={integration.name} logo={integration.logo} size="sm" className="mx-auto mb-3" />
                  <p className="text-sm font-medium text-text-primary">{integration.name}</p>
                  {integration.description && (
                    <p className="text-xs text-text-tertiary mt-1">{integration.description}</p>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {integrations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No integrations in this category yet. More coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-12 md:py-16 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h3 className="text-xl font-semibold text-text-primary">Don&apos;t see your tool?</h3>
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
