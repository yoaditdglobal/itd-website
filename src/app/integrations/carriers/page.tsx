import ClosingCTA from "@/components/sections/ClosingCTA";
import CarrierDirectory from "@/components/sections/CarrierDirectory";
import { buildMetadata } from "@/lib/metadata";
import { getIntegrationsByType } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Carrier integrations — one connection to an entire network",
  description:
    "Domestic and international carriers in one network — Royal Mail, Evri, DPD, InPost, DHL, FedEx, UPS, Amazon Shipping and more. Pick a carrier to see its services and how it works with us.",
  path: "/integrations/carriers",
});

const REGION_ORDER = ["Domestic", "International"] as const;

export default function CarrierIntegrationsPage() {
  const carriers = getIntegrationsByType("carrier");
  const groups = REGION_ORDER.map((region) => ({
    region,
    items: carriers.filter((c) =>
      (c.regions ?? (c.region ? [c.region] : [])).includes(region),
    ),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <section data-hero-tone="light" className="bleed-nav bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-eyebrow text-accent-secondary mb-3">Carrier integrations</p>
          <h1 className="text-display-xl text-text-primary max-w-3xl">
            One connection to an entire carrier network.
          </h1>
          <p className="mt-4 text-body-lg text-text-secondary max-w-2xl">
            Domestic and international carriers in one network, on rates you
            wouldn&apos;t reach alone. Pick a carrier to see its services and how it
            works with us.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CarrierDirectory groups={groups} />
        </div>
      </section>

      <ClosingCTA
        headline="The network keeps growing."
        subtitle="Tell us who you ship with — if a carrier isn't on the list yet, we'll look at adding it."
        primaryCta={{ label: "Talk to us", href: "/contact" }}
        secondaryCta={{ label: "Browse tech integrations", href: "/integrations/tech" }}
      />
    </>
  );
}
