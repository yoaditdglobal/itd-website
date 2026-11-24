import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import HeroBackdrop from "@/components/ui/HeroBackdrop";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import { REGION_THEMES, withAlpha } from "@/lib/page-themes";
import { BRAND_COLORS } from "@/lib/brand-colors";
import ClosingCTA from "@/components/sections/ClosingCTA";
import Link from "next/link";
import { ArrowUpRight, MapPin, Globe, ArrowDown } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { buildMetadata } from "@/lib/metadata";
import { getIntegrationsByType, getIntegrationSlug, type Integration } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Carrier integrations",
  description:
    "Domestic and international carriers in one network — Royal Mail, Evri, DPD, InPost, DHL, FedEx, UPS, Amazon Shipping and more. Pick a carrier to see its services and how it works with us.",
  path: "/integrations/carriers",
});

const REGION_ORDER = ["Domestic", "International"] as const;
type Region = (typeof REGION_ORDER)[number];
const REGION_ICON = { Domestic: MapPin, International: Globe } as const;
const REGION_INTRO: Record<Region, string> = {
  Domestic: "UK carriers for next-day, tracked, locker and postal delivery.",
  International: "Express and economy carriers for shipping beyond the UK.",
};

function regionsOf(c: Integration): Region[] {
  return (c.regions ?? (c.region ? [c.region] : [])).filter((r): r is Region =>
    (REGION_ORDER as readonly string[]).includes(r),
  );
}
const brandOf = (c: Integration) => (c.logo && BRAND_COLORS[c.logo]) || "#0098a0";
const hrefOf = (c: Integration) => `/integrations/carriers/${getIntegrationSlug(c)}`;

/**
 * Carrier directory. Built around the visitor's question — "which carriers,
 * and which fits my shipments?":
 * - Carriers ABOVE the fold: the hero's right side is a live logo wall (every
 *   tile links to its carrier page, glowing in its own brand colour).
 * - Both regions fully server-rendered as labelled sections (no tab hiding
 *   half the network from visitors and crawlers); carriers that serve both
 *   (FedEx, UPS) appear in both, and the page says so.
 * - Only numbers that read cleanly: 16 carriers, 17.5m labels a year.
 */
export default function CarrierIntegrationsPage() {
  const carriers = getIntegrationsByType("carrier");
  const groups = REGION_ORDER.map((region) => ({
    region,
    items: carriers.filter((c) => regionsOf(c).includes(region)),
  })).filter((g) => g.items.length > 0);
  const both = carriers.filter((c) => regionsOf(c).length > 1).map((c) => c.name);

  return (
    <>
      {/* Hero — copy left, carrier logo wall right */}
      <section data-hero-tone="dark" className="bleed-nav relative overflow-hidden bg-bg-dark py-16 md:py-24 lg:py-28">
        <HeroBackdrop primary="#5b7bff" secondary="#1cc3cb" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-6">
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
              <p className="mt-8 text-body-sm text-white/60">
                <span className="font-semibold text-white tabular-nums">{carriers.length}</span> carriers
                <span className="mx-2 text-white/25" aria-hidden>·</span>
                <span className="font-semibold text-white tabular-nums">17.5m</span> labels a year
              </p>
              <nav aria-label="Jump to region" className="mt-4 flex flex-wrap gap-2">
                {groups.map((g) => {
                  const Icon = REGION_ICON[g.region];
                  return (
                    <a
                      key={g.region}
                      href={`#${g.region.toLowerCase()}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: REGION_THEMES[g.region].glow }} aria-hidden />
                      {g.region}
                      <span className="tabular-nums text-white/45">{g.items.length}</span>
                      <ArrowDown className="h-3.5 w-3.5 text-white/40 transition-transform group-hover:translate-y-0.5" aria-hidden />
                    </a>
                  );
                })}
              </nav>
            </ScrollReveal>

            {/* Logo wall — every carrier, each a real link */}
            <ScrollReveal delay={0.1} className="lg:col-span-6">
              <ul className="grid grid-cols-4 gap-3 sm:gap-4" aria-label="All carriers">
                {carriers.map((c, i) => (
                  <li key={c.id} className="carrier-wall-tile" style={{ animationDelay: `${(i % 4) * 0.6 + Math.floor(i / 4) * 0.35}s` }}>
                    <Link
                      href={hrefOf(c)}
                      title={c.name}
                      aria-label={c.name}
                      className="group relative block aspect-square rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      <span
                        aria-hidden
                        className="absolute -inset-2 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                        style={{ background: withAlpha(brandOf(c), 0.55) }}
                      />
                      <span className="relative block h-full w-full overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)] ring-1 ring-white/15 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:transform-none">
                        <IntegrationLogo name={c.name} logo={c.logo} size="fill" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Directory — both regions, fully rendered */}
      <div data-analytics-location="carrier_directory">
        {groups.map((g, gi) => {
          const t = REGION_THEMES[g.region];
          const Icon = REGION_ICON[g.region];
          const shared = g.items.filter((c) => both.includes(c.name)).map((c) => c.name);
          return (
            <section
              key={g.region}
              id={g.region.toLowerCase()}
              className={`scroll-mt-20 py-16 md:py-20 ${gi % 2 === 0 ? "section-glow section-glow--light bg-white" : "section-glow section-glow--warm bg-bg-secondary"}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                  <p className="flex w-fit items-center gap-2 rounded-full px-3 py-1 text-eyebrow" style={{ backgroundColor: t.soft, color: t.accent }}>
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    <span className="tabular-nums">{g.items.length}</span> carriers
                  </p>
                  <h2 className="mt-4 text-display-lg text-text-primary">{g.region}</h2>
                  <p className="mt-3 max-w-2xl text-body-lg text-text-secondary">
                    {REGION_INTRO[g.region]}
                    {shared.length > 0 && (
                      <> {shared.join(" and ")} serve both, so {shared.length > 1 ? "they appear" : "it appears"} in both lists.</>
                    )}
                  </p>
                </ScrollReveal>
                <ScrollReveal>
                  <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((c) => (
                      <li key={c.id}>
                        <CarrierCard c={c} />
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>
            </section>
          );
        })}
      </div>

      <ClosingCTA
        headline="The network keeps growing"
        subtitle="Tell us who you ship with — if a carrier isn't on the list yet, we'll look at adding it."
        primaryCta={{ label: "Contact Sales", href: "/contact" }}
        secondaryCta={{ label: "Browse tech integrations", href: "/integrations/tech" }}
      />
    </>
  );
}

/** Carrier card: brand hairline + tint on hover, region badges, whole-card link. */
function CarrierCard({ c }: { c: Integration }) {
  const brand = brandOf(c);
  return (
    <Link
      href={hrefOf(c)}
      className="group card-hover relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-border bg-white p-5 hover:border-transparent active:scale-[0.99] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" style={{ backgroundColor: brand }} />
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
        style={{ background: `radial-gradient(120% 90% at 0% 0%, ${withAlpha(brand, 0.1)}, transparent 70%)` }}
      />
      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl shadow-[0_1px_2px_rgb(15_23_42/0.08)] ring-1 ring-black/5">
        <IntegrationLogo name={c.name} logo={c.logo} size="fill" />
      </span>
      <div className="relative min-w-0 flex-1">
        <p className="text-heading-sm text-text-primary">{c.name}</p>
        {c.description && <p className="mt-1 text-body-sm text-text-secondary">{c.description}</p>}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {regionsOf(c).map((r) => (
            <span
              key={r}
              className="inline-flex items-center rounded-full px-2 py-0.5 text-eyebrow"
              style={{ backgroundColor: REGION_THEMES[r].soft, color: REGION_THEMES[r].accent }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>
      <ArrowUpRight className="relative mt-0.5 h-4 w-4 shrink-0 text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" aria-hidden />
    </Link>
  );
}
