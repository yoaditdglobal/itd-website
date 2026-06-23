import Link from "next/link";
import Button from "@/components/ui/Button";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import ClosingCTA from "@/components/sections/ClosingCTA";
import type { Integration } from "@/lib/data";
import { TECH_CATEGORY_LABELS } from "@/lib/data";

/**
 * Scaffold layout for a single integration's dedicated page (carrier or tech).
 * Renders the brand mark, name, category/region chips, description and CTAs.
 * Per-integration marketing content is added later — `body` is the slot for it.
 */
export default function IntegrationDetail({
  integration,
  body,
}: {
  integration: Integration;
  body?: React.ReactNode;
}) {
  const { name, logo, description, type, category, region } = integration;
  const indexHref = type === "carrier" ? "/integrations/carriers" : "/integrations/tech";
  const indexLabel = type === "carrier" ? "Carriers" : "Tech integrations";
  const chip = type === "carrier" ? region : TECH_CATEGORY_LABELS[category] ?? category;
  const enquiry = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <section data-hero-tone="light" className="bleed-nav bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-tertiary mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-text-primary">Home</Link>
            <span aria-hidden>/</span>
            <Link href={indexHref} className="hover:text-text-primary">{indexLabel}</Link>
            <span aria-hidden>/</span>
            <span className="text-text-primary">{name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <IntegrationLogo name={name} logo={logo} size="md" fit="contain" className="flex-shrink-0" />
            <div className="flex-1">
              {chip && (
                <span className="inline-block text-eyebrow text-accent-secondary mb-2">{chip}</span>
              )}
              <h1 className="text-display-lg text-text-primary">{name}</h1>
              {description && (
                <p className="mt-3 text-body-md text-text-secondary max-w-2xl">{description}</p>
              )}
            </div>
            <div className="flex-shrink-0">
              <Button href={`/contact?enquiry=${enquiry}`}>Connect {name} to Connexx</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Per-integration content slot (filled in later). */}
      {body ?? (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-display-md text-text-primary mb-4">{name} + Connexx</h2>
            <p className="text-body-md text-text-secondary leading-relaxed">
              {name} connects to Connexx so every order routes through the cheapest
              compliant carrier, with labels, tracking, and reconciliation in one place.
              Detailed {name} integration content is being added to this page.
            </p>
            <p className="mt-4">
              <Link href={indexHref} className="link-underline text-accent font-medium">
                ← Back to all {indexLabel.toLowerCase()}
              </Link>
            </p>
          </div>
        </section>
      )}

      <ClosingCTA headline={`Start shipping with ${name}`} />
    </>
  );
}
