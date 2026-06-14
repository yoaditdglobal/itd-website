import Link from "next/link";
import { ArrowRight } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import type { CaseStudy } from "@/lib/data";

/**
 * Shared customer-story card. Used by the Customer Stories library index
 * (StoriesLibrary) and the "More stories" module on detail pages
 * (RelatedStories), so the card is identical across both surfaces.
 *
 * Whole-card link with an explicit aria-label ("Read the {brand} story") so the
 * accessible name is specific rather than a generic "Read more".
 */
export default function StoryCard({ story }: { story: CaseStudy }) {
  return (
    <Link
      href={`/resources/case-studies/${story.slug}`}
      aria-label={`Read the ${story.brandName} story`}
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
