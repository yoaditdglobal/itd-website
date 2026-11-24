import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import LogoTicker from "@/components/ui/LogoTicker";
import HeroBackdrop from "@/components/ui/HeroBackdrop";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { SEGMENT_THEMES } from "@/lib/page-themes";
import StoriesLibrary from "@/components/sections/StoriesLibrary";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";
import {
  getLibraryStories,
  getStoriesBySegment,
  getSegmentBySolutionSlug,
  SOLUTION_SLUGS,
  LIBRARY_SEGMENT_ORDER,
} from "@/lib/data";

export const metadata = buildMetadata({
  title: "Customer stories",
  description:
    "See how UK businesses, from Tatti Lashes to Home Bargains, cut shipping cost, went international and won new business through ITD.",
  path: "/resources/case-studies",
});

/**
 * Customer Stories library: hero → featured spotlight → single-select solution
 * filter + flat card grid (StoriesLibrary) → closing CTA. Filtering is driven by
 * the `?solution=` query param and resolved server-side, so filtered views are
 * shareable and SSR-rendered. Copy is verbatim from the build brief.
 */
export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const all = getLibraryStories();
  const featured = all.find((s) => s.featured);

  // Active solution facet from ?solution= (unknown/legacy values → no filter).
  const sp = await searchParams;
  const solutionParam = Array.isArray(sp.solution)
    ? sp.solution[0]
    : sp.solution;
  const active = getSegmentBySolutionSlug(solutionParam);
  const stories = active ? getStoriesBySegment(active) : all;

  // Only facets with at least one story (Marketplace/B2B never appear).
  const facets = LIBRARY_SEGMENT_ORDER.filter(
    (seg) => getStoriesBySegment(seg).length > 0,
  ).map((seg) => ({
    segment: seg,
    slug: SOLUTION_SLUGS[seg],
    count: getStoriesBySegment(seg).length,
  }));

  return (
    <>
      {/* Hero — editorial, with a colour key for the story segments */}
      <section data-hero-tone="dark" className="bleed-nav relative overflow-hidden bg-bg-dark py-16 md:py-24 lg:py-28">
        <HeroBackdrop primary="#9b7bff" secondary="#1cc3cb" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-eyebrow text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9b7bff]" aria-hidden />
                Customer stories
              </p>
              <h1 className="mt-5 text-display-xl text-white">
                The businesses that stopped leaving money on shipping
              </h1>
              <p className="mt-5 text-body-lg text-white/70">
                Real UK businesses, from fast-growing brands to 3PLs, shipping
                better at home and abroad through ITD.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Stories by solution">
                {facets.map(({ segment, slug, count }) => {
                  const t = SEGMENT_THEMES[segment];
                  return (
                    <li key={segment}>
                      <Link
                        href={`/resources/case-studies?solution=${slug}#stories`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                      >
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t?.glow }} aria-hidden />
                        {segment}
                        <span className="tabular-nums text-white/45">{count}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Customer logo strip — same ticker as the homepage */}
      <section className="bg-white py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LogoTicker />
        </div>
      </section>

      {/* Featured story — spotlight */}
      {featured && (
        <section className="bg-white pt-16 md:pt-20 pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-3xl bg-bg-dark px-6 py-10 ring-1 ring-white/10 md:px-14 md:py-16">
                <HeroBackdrop primary="#5b7bff" secondary="#9b7bff" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-10 right-8 select-none font-display text-[220px] leading-none text-white/[0.06] md:right-16 md:text-[300px]"
                >
                  &rdquo;
                </span>
                <div className="relative max-w-3xl">
                  <div className="mb-6 flex items-center gap-3">
                    {featured.logo && (
                      <span className="h-11 w-11 overflow-hidden rounded-xl bg-white ring-1 ring-white/20">
                        <IntegrationLogo name={featured.brandName} logo={featured.logo} size="fill" />
                      </span>
                    )}
                    <p className="text-eyebrow text-accent-secondary">
                      RIOZ Global · 5 new clients in 6 months
                    </p>
                  </div>
                  <blockquote className="text-display-md text-white">
                    &ldquo;Before ITD, we made nothing on shipping. Now
                    it&rsquo;s one of our strongest revenue streams.&rdquo;
                  </blockquote>
                  <p className="mt-5 text-body-sm text-white/60">
                    Rob Osgood, Managing Director, RIOZ Global
                  </p>
                  <Link
                    href="/resources/case-studies/rioz-global"
                    className="group mt-8 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                  >
                    Read the full story{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Solution filter + flat card grid (server-rendered per ?solution=). */}
      <StoriesLibrary
        stories={stories}
        active={active}
        facets={facets}
        total={all.length}
      />

      <ClosingCTA
        headline="Become the next story"
        subtitle="Tell us what you ship and we'll show you what we'd change."
        primaryCta={{ label: "Contact Sales", href: "/contact" }}
        secondaryCta={null}
      />
    </>
  );
}
