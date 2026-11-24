import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroBackdrop from "@/components/ui/HeroBackdrop";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import { REGION_THEMES } from "@/lib/page-themes";
import ClosingCTA from "@/components/sections/ClosingCTA";
import CarrierDirectory from "@/components/sections/CarrierDirectory";
import { buildMetadata } from "@/lib/metadata";
import { getIntegrationsByType } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Carrier integrations",
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

  const domestic = groups.find((g) => g.region === "Domestic")?.items.length ?? 0;
  const international = groups.find((g) => g.region === "International")?.items.length ?? 0;
  const keyFacts = [
    { value: String(carriers.length), label: "Carriers in the network", color: "#ffffff" },
    { value: String(domestic), label: "Domestic carriers", color: REGION_THEMES.Domestic.glow },
    { value: String(international), label: "International carriers", color: REGION_THEMES.International.glow },
    { value: "17.5m", label: "Labels a year", color: "#ffffff" },
  ];

  return (
    <>
      {/* Hero — copy left, network stats panel right */}
      <section data-hero-tone="dark" className="bleed-nav relative overflow-hidden bg-bg-dark py-16 md:py-24 lg:py-28">
        <HeroBackdrop primary="#5b7bff" secondary="#1cc3cb" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-7">
              <p className="flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-eyebrow text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5b7bff]" aria-hidden />
                Carrier network
              </p>
              <h1 className="mt-5 text-display-xl text-white">One connection to an entire carrier network</h1>
              <p className="mt-5 text-body-lg text-white/70">
                Domestic and international carriers in one network, on rates you
                wouldn&apos;t reach alone. Pick a carrier to see its services and
                how it works with us.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={RATE_CHECKER_URL} surface="dark" size="lg">Get Quote</Button>
                <Button surface="dark" variant="secondary" href="/contact" size="lg">Contact Sales</Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="lg:col-span-5">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)]">
                {keyFacts.map((f) => (
                  <div key={f.label} className="bg-[#141a36]/90 px-6 py-7 backdrop-blur-md">
                    <dd className="text-stat-lg tabular-nums" style={{ color: f.color }}>{f.value}</dd>
                    <dt className="mt-1 text-body-sm text-white/55">{f.label}</dt>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="section-glow section-glow--light bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CarrierDirectory groups={groups} />
        </div>
      </section>

      <ClosingCTA
        headline="The network keeps growing"
        subtitle="Tell us who you ship with — if a carrier isn't on the list yet, we'll look at adding it."
        primaryCta={{ label: "Contact Sales", href: "/contact" }}
        secondaryCta={{ label: "Browse tech integrations", href: "/integrations/tech" }}
      />
    </>
  );
}
