import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StoryCard from "@/components/sections/StoryCard";
import type { CaseStudy, LibrarySegment } from "@/lib/data";

const LIBRARY_BASE = "/resources/case-studies";

export interface SolutionFacet {
  segment: LibrarySegment;
  slug: string;
  count: number;
}

/** Pill styling shared by the "All" chip and each solution facet. */
function chipClass(active: boolean): string {
  return [
    "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
    active
      ? "bg-bg-dark text-white border border-bg-dark"
      : "bg-white border border-border text-text-secondary hover:text-text-primary hover:border-accent/40",
  ].join(" ");
}

/**
 * Customer Stories library body: a single-select Solution filter (All + one
 * facet at a time, mirrored in the `?solution=` URL) above a flat grid of story
 * cards. Filtering is resolved server-side in the page, so each chip is just a
 * <Link> — clicking is a soft navigation that re-renders the grid, keeps the
 * view shareable/indexable, and needs no client state. Only populated facets
 * render (Marketplace/B2B never appear); legacy `?industry=` URLs degrade to
 * the unfiltered grid. Cards use the shared StoryCard (also on detail pages).
 */
export default function StoriesLibrary({
  stories,
  active,
  facets,
  total,
}: {
  stories: CaseStudy[];
  active: LibrarySegment | null;
  facets: SolutionFacet[];
  total: number;
}) {
  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Single-select solution filter ─── */}
        <p className="text-eyebrow text-text-tertiary mb-3">Browse by solution</p>
        <div
          role="group"
          aria-label="Filter customer stories by solution"
          className="flex flex-wrap gap-2"
        >
          <Link
            href={LIBRARY_BASE}
            scroll={false}
            aria-current={active === null ? "page" : undefined}
            className={chipClass(active === null)}
          >
            All
            <span
              className={active === null ? "text-white/60" : "text-text-tertiary"}
            >
              {total}
            </span>
          </Link>
          {facets.map(({ segment, slug, count }) => {
            const isActive = active === segment;
            return (
              <Link
                key={segment}
                // Clicking the active chip clears the filter (back to All).
                href={
                  isActive ? LIBRARY_BASE : `${LIBRARY_BASE}?solution=${slug}`
                }
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={chipClass(isActive)}
              >
                {segment}
                <span
                  className={isActive ? "text-white/60" : "text-text-tertiary"}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ─── Flat card grid ─── */}
        <p className="mt-6 text-body-sm text-text-tertiary">
          {stories.length} {stories.length === 1 ? "story" : "stories"}
          {active ? ` in ${active}` : ""}
        </p>

        {stories.length > 0 ? (
          <ScrollReveal>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </ScrollReveal>
        ) : (
          <div className="mt-6 text-center py-12">
            <p className="text-text-secondary">
              No stories here yet —{" "}
              <Link
                href="/contact"
                className="text-accent font-medium hover:underline"
              >
                tell us what you ship
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
