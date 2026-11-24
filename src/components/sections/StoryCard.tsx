import Link from "next/link";
import { ArrowRight } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import type { CaseStudy } from "@/lib/data";
import { DEFAULT_THEME, SEGMENT_THEMES } from "@/lib/page-themes";

/**
 * Shared customer-story card. Used by the Customer Stories library index
 * (StoriesLibrary) and the "More stories" module on detail pages
 * (RelatedStories), so the card is identical across both surfaces.
 *
 * Whole-card link with an explicit aria-label ("Read the {brand} story") so the
 * accessible name is specific rather than a generic "Read more".
 */
export default function StoryCard({ story }: { story: CaseStudy }) {
  // Card identity follows the story's primary segment (eCommerce teal, 3PL
  // cobalt, Import amber, Export violet).
  const primary = story.primarySegment ?? story.segments?.[0];
  const t = (primary && SEGMENT_THEMES[primary]) || DEFAULT_THEME;
  return (
    <Link
      href={`/resources/case-studies/${story.slug}`}
      aria-label={`Read the ${story.brandName} story`}
      className="group card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 hover:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.glow})` }} />
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
        style={{ background: `radial-gradient(120% 70% at 100% 0%, ${t.soft}, transparent 70%)` }}
      />
      <div className="relative mb-5 flex items-center gap-3">
        <IntegrationLogo name={story.brandName} logo={story.logo} size="sm" className="ring-1 ring-black/5" />
        <div className="min-w-0">
          <p className="text-label text-text-primary">{story.brandName}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {(story.segments ?? []).map((seg) => {
              const st = SEGMENT_THEMES[seg] ?? DEFAULT_THEME;
              return (
                <span
                  key={seg}
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-eyebrow"
                  style={{ backgroundColor: st.soft, color: st.accent }}
                >
                  {seg}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {/* Headline stays ink: segment colour lives on the chips and hairline only. */}
      <p className="relative mb-2 text-stat-lg text-text-primary">{story.headlineResult}</p>
      <p className="relative mb-5 flex-1 text-body-sm text-text-secondary">{story.oneLiner}</p>
      <span className="relative inline-flex items-center gap-1 border-t border-border/70 pt-4 text-sm font-medium text-text-primary">
        Read the story{" "}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          style={{ color: t.accent }}
          aria-hidden
        />
      </span>
    </Link>
  );
}
