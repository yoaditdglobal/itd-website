import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
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

  const keyFacts = [
    { value: String(carriers.length), label: "Carriers in the network" },
    {
      value: String(groups.find((g) => g.region === "Domestic")?.items.length ?? 0),
      label: "Domestic carriers",
    },
    {
      value: String(
        groups.find((g) => g.region === "International")?.items.length ?? 0,
      ),
      label: "International carriers",
    },
    { value: "17.5m", label: "Labels a year" },
  ];

  return (
    <>
      {/* Hero */}
      <section
        data-hero-tone="dark"
        className="bleed-nav bg-bg-dark py-16 md:py-24 overflow-hidden relative"
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl">
              <h1 className="text-display-xl text-white">
                One connection to an entire carrier network
              </h1>
              <p className="mt-4 text-body-lg text-white/70">
                Domestic and international carriers in one network, on rates you
                wouldn&apos;t reach alone. Pick a carrier to see its services and
                how it works with us.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="https://itdglobal-ratechecker.lovable.app/">
                  Get a quote
                </Button>
                <Button surface="dark" variant="secondary" href="/contact">
                  Talk to us
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key facts */}
      <section className="border-b border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {keyFacts.map((s) => (
              <div key={s.label}>
                <dd className="text-3xl font-semibold text-text-primary md:text-4xl">
                  {s.value}
                </dd>
                <dt className="mt-1 text-sm text-text-tertiary">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Directory */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CarrierDirectory groups={groups} />
        </div>
      </section>

      <ClosingCTA
        headline="The network keeps growing"
        subtitle="Tell us who you ship with — if a carrier isn't on the list yet, we'll look at adding it."
        primaryCta={{ label: "Talk to us", href: "/contact" }}
        secondaryCta={{ label: "Browse tech integrations", href: "/integrations/tech" }}
      />
    </>
  );
}
