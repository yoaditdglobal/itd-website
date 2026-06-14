"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import {
  LIBRARY_SEGMENT_ORDER,
  LIBRARY_OUTCOMES,
  type CaseStudy,
  type LibraryOutcome,
} from "@/lib/data";

/** Anchor id for a shelf heading: "eCommerce" → "ecommerce", "3PL" → "3pl". */
function segmentAnchor(segment: string): string {
  return segment.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function StoryCard({ story }: { story: CaseStudy }) {
  return (
    <Link
      href={`/resources/case-studies/${story.slug}`}
      className="group block h-full bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      <div className="flex items-center gap-3 mb-4">
        <IntegrationLogo name={story.brandName} logo={story.logo} size="sm" />
        <div className="min-w-0">
          <p className="text-label text-text-primary">{story.brandName}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {(story.segments ?? []).map((seg) => (
              <span
                key={seg}
                className="inline-flex items-center text-eyebrow text-accent bg-accent-light/60 px-2 py-0.5 rounded-full"
              >
                {seg}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-stat-lg text-accent mb-2">{story.headlineResult}</p>
      <p className="text-body-sm text-text-secondary mb-4">{story.oneLiner}</p>
      <span className="inline-flex items-center gap-1 text-sm text-accent font-medium">
        Read the story{" "}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:group-hover:translate-x-0" />
      </span>
    </Link>
  );
}

/**
 * Customer Stories library body: the index ("browse by solution" jump links
 * with shelf counts + "browse by outcome" multi-select chips) followed by the
 * shelves. Default state shows all shelves in LIBRARY_SEGMENT_ORDER; selecting
 * any outcome chip collapses the shelves into a single union-filtered grid.
 * Only populated segments render — empty solutions (Marketplace, B2B) never
 * appear. Legacy `?industry=` URLs (old navbar links) jump to the matching
 * shelf; unknown values are ignored.
 */
export default function StoriesLibrary({ stories }: { stories: CaseStudy[] }) {
  const searchParams = useSearchParams();
  const [activeOutcomes, setActiveOutcomes] = useState<LibraryOutcome[]>([]);

  // Shelves: only populated segments, in canonical order.
  const shelves = LIBRARY_SEGMENT_ORDER.map((segment) => ({
    segment,
    items: stories.filter((s) => s.primarySegment === segment),
  })).filter((shelf) => shelf.items.length > 0);

  // Legacy ?industry= deep links scroll to the matching shelf.
  useEffect(() => {
    const industry = searchParams.get("industry");
    if (!industry) return;
    const match = shelves.find(
      (s) => s.segment.toLowerCase() === industry.toLowerCase(),
    );
    if (!match) return;
    document
      .getElementById(segmentAnchor(match.segment))
      ?.scrollIntoView({ block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const toggleOutcome = (outcome: LibraryOutcome) => {
    setActiveOutcomes((cur) =>
      cur.includes(outcome)
        ? cur.filter((o) => o !== outcome)
        : [...cur, outcome],
    );
  };

  const filtering = activeOutcomes.length > 0;
  // Union semantics: a story matches if it carries ANY selected outcome.
  const filtered = filtering
    ? stories.filter((s) =>
        (s.outcomes ?? []).some((o) => activeOutcomes.includes(o)),
      )
    : [];

  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Index ─── */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
            <p className="text-eyebrow text-text-tertiary mb-3">Browse by solution</p>
            <div className="flex flex-wrap gap-2">
              {shelves.map(({ segment, items }) => (
                <a
                  key={segment}
                  href={`#${segmentAnchor(segment)}`}
                  onClick={() => setActiveOutcomes([])}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm font-medium text-text-primary hover:border-accent/40 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  {segment}
                  <span className="text-text-tertiary">({items.length})</span>
                </a>
              ))}
            </div>

            <p className="text-eyebrow text-text-tertiary mt-6 mb-3">Browse by outcome</p>
            <div className="flex flex-wrap gap-2">
              {LIBRARY_OUTCOMES.map((outcome) => {
                const active = activeOutcomes.includes(outcome);
                return (
                  <button
                    key={outcome}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleOutcome(outcome)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                      active
                        ? "bg-bg-dark text-white"
                        : "bg-bg-secondary border border-border text-text-secondary hover:text-text-primary hover:border-accent/40"
                    }`}
                  >
                    {outcome}
                  </button>
                );
              })}
              {filtering && (
                <button
                  type="button"
                  onClick={() => setActiveOutcomes([])}
                  className="rounded-full px-4 py-2 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Filtered grid (outcome chips active) ─── */}
        {filtering ? (
          <div className="mt-12">
            <p className="text-body-sm text-text-tertiary mb-6">
              {filtered.length} {filtered.length === 1 ? "story" : "stories"}
            </p>
            {filtered.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-secondary">
                  No stories here yet —{" "}
                  <Link href="/contact" className="text-accent font-medium hover:underline">
                    tell us what you ship
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        ) : (
          /* ─── Shelves (default state) ─── */
          shelves.map(({ segment, items }) => (
            <div key={segment} className="mt-14 md:mt-16">
              <ScrollReveal>
                <h2
                  id={segmentAnchor(segment)}
                  className="text-heading-lg text-text-primary mb-6"
                >
                  {segment}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((story) => (
                    <StoryCard key={story.slug} story={story} />
                  ))}
                </div>
              </ScrollReveal>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
