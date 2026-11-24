import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import LogoTicker from "@/components/ui/LogoTicker";
import HeroBackdrop from "@/components/ui/HeroBackdrop";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { DEFAULT_THEME, SEGMENT_THEMES } from "@/lib/page-themes";
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

  // Proof above the fold: the first three QUANTIFIED results (headline
  // contains a number) in the library's own curated order, excluding the
  // spotlight story. Data-driven — nothing is written here by hand.
  const proof = all.filter((st) => st !== featured && /\d/.test(st.headlineResult ?? "")).slice(0, 3);

  // Spotlight copy comes from the featured story's data, so moving the
  // `featured` flag updates it (it used to be hard-coded to RIOZ).
  const spotQuote = featured?.quote ?? featured?.quotes?.[0]?.quote ?? "";
  const spotLead = spotQuote.match(/[^.!?]+[.!?]+/g)?.slice(0, 2).join("").trim() ?? spotQuote;
  const spotAuthor =
    featured?.quoteAuthor ??
    [featured?.quotes?.[0]?.name, featured?.quotes?.[0]?.title].filter(Boolean).join(", ");

  return (
    <>
      {/* Hero — editorial copy left, quantified results (proof) right */}
      <section data-hero-tone="dark" className="bleed-nav relative overflow-hidden bg-bg-dark py-16 md:py-24 lg:py-28">
        <HeroBackdrop primary="#9b7bff" secondary="#1cc3cb" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-7">
              <p className="flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-eyebrow text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9b7bff]" aria-hidden />
                Customer stories
              </p>
              <h1 className="mt-5 text-display-xl text-white">
                The businesses that stopped leaving money on shipping
              </h1>
              <p className="mt-5 max-w-2xl text-body-lg text-white/70">
                Real UK businesses, from fast-growing brands to 3PLs, shipping
                better at home and abroad through ITD.
              </p>
              <a
                href="#stories"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Browse all <span className="tabular-nums">{all.length}</span> stories
                <ArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </a>
            </ScrollReveal>

            {/* Results stack — the proof, above the fold */}
            {proof.length > 0 && (
              <ScrollReveal delay={0.1} className="lg:col-span-5">
                <ul className="space-y-3" aria-label="Featured results">
                  {proof.map((st, i) => {
                    const seg = st.primarySegment ?? st.segments?.[0];
                    const t = (seg && SEGMENT_THEMES[seg]) || DEFAULT_THEME;
                    return (
                      <li key={st.slug} className={i === 1 ? "lg:-translate-x-8" : ""}>
                        <Link
                          href={`/resources/case-studies/${st.slug}`}
                          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 pr-5 shadow-[0_24px_60px_-28px_rgb(0_0_0/0.7)] backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        >
                          <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-white/20">
                            <IntegrationLogo name={st.brandName} logo={st.logo} size="fill" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-heading-md text-white">{st.headlineResult}</span>
                            <span className="mt-0.5 flex items-center gap-2 text-body-sm text-white/60">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: t.glow }} aria-hidden />
                              <span className="truncate">{st.brandName}</span>
                            </span>
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white" aria-hidden />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </ScrollReveal>
            )}
          </div>
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
                      {featured.brandName}
                      {featured.headlineResult ? ` · ${featured.headlineResult}` : ""}
                    </p>
                  </div>
                  <blockquote className="text-display-md text-white">&ldquo;{spotLead}&rdquo;</blockquote>
                  {spotAuthor && (
                    <div className="mt-6 flex items-center gap-3">
                      {featured.quoteAuthorPhoto && (
                        <Image
                          src={featured.quoteAuthorPhoto}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20"
                        />
                      )}
                      <p className="text-body-sm text-white/65">{spotAuthor}</p>
                    </div>
                  )}
                  <Link
                    href={`/resources/case-studies/${featured.slug}`}
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
