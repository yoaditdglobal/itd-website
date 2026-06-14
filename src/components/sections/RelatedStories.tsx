import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StoryCard from "@/components/sections/StoryCard";
import type { CaseStudy } from "@/lib/data";

/**
 * "More stories" related-cards module, rendered before the closing CTA so no
 * detail page is a dead end (BRIEF §4.11 / §5). Cards reuse the shared
 * StoryCard, keeping them identical to the library index. Returns null when
 * there are no related stories to show.
 */
export default function RelatedStories({ stories }: { stories: CaseStudy[] }) {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-heading-lg text-text-primary">More stories</h2>
            <Link
              href="/resources/case-studies"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded"
            >
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
