import Link from "next/link";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";
import { getIntegrationsByType, getIntegrationSlug } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Carrier integrations — every carrier on one platform",
  description:
    "Connexx connects UK, EU, and global carriers — Royal Mail, DPD, Evri, DHL, FedEx, UPS, Amazon Shipping and more — with rate comparison on every order.",
  path: "/integrations/carriers",
});

const REGION_ORDER = ["Domestic", "International"] as const;

export default function CarrierIntegrationsPage() {
  const carriers = getIntegrationsByType("carrier");
  const groups = REGION_ORDER.map((region) => ({
    region,
    items: carriers.filter((c) => c.region === region),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <section className="bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-eyebrow text-accent-secondary mb-3">Carrier integrations</p>
          <h1 className="text-display-xl text-text-primary max-w-3xl">
            Every carrier you ship with, on one platform.
          </h1>
          <p className="mt-4 text-body-lg text-text-secondary max-w-2xl">
            {carriers.length} domestic and international carriers connect to Connexx, with
            live rate comparison and one-click labels on every dispatch. Pick a carrier to
            see services and how it works with Connexx.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {groups.map((group) => (
            <div key={group.region}>
              <h2 className="text-heading-md text-text-primary mb-6">{group.region}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.items.map((c) => (
                  <Link
                    key={c.id}
                    href={`/integrations/carriers/${getIntegrationSlug(c)}`}
                    className="bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-accent/20 transition-all text-center"
                  >
                    <IntegrationLogo name={c.name} logo={c.logo} size="sm" className="mx-auto mb-3" />
                    <p className="text-sm font-medium text-text-primary">{c.name}</p>
                    {c.description && (
                      <p className="text-xs text-text-tertiary mt-1">{c.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ClosingCTA headline="Don't see your carrier?" />
    </>
  );
}
