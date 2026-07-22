import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudiesCarousel from "./CaseStudiesCarousel";

interface CaseStudyCardsProps {
  limit?: number;
  showHeader?: boolean;
  showFooter?: boolean;
  /** Optional curated list. When provided, overrides `caseStudies.slice(0, limit)`.
   *  Prefer `getRelevantCaseStudies(...)` (data.ts) so the set is relevance-ordered
   *  and consistently sized. */
  studies?: CaseStudy[];
  /** Section heading. Defaults to "Customer Stories". */
  title?: string;
  /** Subtitle. Pass "" to hide it. */
  subtitle?: string;
}

export default function CaseStudyCards({
  limit = 6,
  showHeader = true,
  showFooter = true,
  studies: explicitStudies,
  title = "Customer Stories",
  subtitle = "How businesses like yours ship with ITD.",
}: CaseStudyCardsProps) {
  const studies = explicitStudies ?? caseStudies.slice(0, limit);
  if (studies.length === 0) return null;

  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <ScrollReveal>
            <SectionLabel title={title} subtitle={subtitle} align="center" size="heading" />
          </ScrollReveal>
        )}

        <CaseStudiesCarousel label={title}>
          {studies.map((cs) => (
            <div
              key={cs.id}
              className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <CaseStudyCard cs={cs} />
            </div>
          ))}
        </CaseStudiesCarousel>

        {showFooter && (
          <div className="mt-10 text-center">
            <Link
              href="/resources/case-studies"
              className="link-underline gap-1 text-sm text-accent font-medium"
            >
              Browse customer stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
