import ClosingCTA from "@/components/sections/ClosingCTA";
import CarrierDirectory from "@/components/sections/CarrierDirectory";
import { buildMetadata } from "@/lib/metadata";
import { getIntegrationsByType, getIntegrationSlug } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Carrier integrations",
  description:
    "Domestic and international carriers in one network. Pick a carrier to see its services and how it works with ITD Global.",
  path: "/integrations/carriers",
});

const REGION_ORDER = ["Domestic", "International"] as const;

export default function CarrierIntegrationsPage() {
  const carriers = getIntegrationsByType("carrier");
  const groups = REGION_ORDER.map((region) => ({
    region,
    carriers: carriers
      .filter((c) => (c.regions ?? [c.region]).includes(region))
      .map((c) => ({
        name: c.name,
        slug: getIntegrationSlug(c),
        logo: c.logo,
        description: c.description,
      })),
  })).filter((g) => g.carriers.length > 0);

  return (
    <>
      <section className="bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-eyebrow text-accent-secondary mb-3">Carrier integrations</p>
          <h1 className="text-display-xl text-text-primary max-w-3xl">
            One connection to an entire carrier network.
          </h1>
          <p className="mt-4 text-body-lg text-text-secondary max-w-2xl">
            Domestic and international carriers in one network, on rates you wouldn&apos;t
            reach alone. Pick a carrier to see its services and how it works with us.
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
        subtitle="Tell us who you ship with. We add carriers regularly, and we'll look at bringing yours into the network."
      />
    </>
  );
}
