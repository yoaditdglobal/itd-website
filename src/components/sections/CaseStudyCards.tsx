import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { ArrowRight } from "lucide-react";

interface CaseStudyCardsProps {
  limit?: number;
  showHeader?: boolean;
  showFooter?: boolean;
  /** Optional curated list. When provided, overrides the default `caseStudies.slice(0, limit)`.
   *  Used by taxonomy-driven touchpoints (e.g. shipping pages pulling studies via
   *  `getCaseStudiesByShippingType("Domestic")`). */
  studies?: CaseStudy[];
  /** Optional section heading override. Falls back to "Real results from real businesses." */
  title?: string;
  /** Optional subtitle override. */
  subtitle?: string;
}

export default function CaseStudyCards({
  limit = 3,
  showHeader = true,
  showFooter = true,
  studies: explicitStudies,
  title = "Real results from real businesses.",
  subtitle = "Named companies. Quantified outcomes. No generic testimonials.",
}: CaseStudyCardsProps) {
  const studies = explicitStudies ?? caseStudies.slice(0, limit);
  if (studies.length === 0) return null;

  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <ScrollReveal>
            <SectionLabel title={title} subtitle={subtitle} align="center" />
          </ScrollReveal>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((cs, i) => (
            <ScrollReveal key={cs.id} delay={i * 0.1}>
              <Link
                href={`/resources/case-studies/${cs.slug}`}
                className="card-hover group block bg-white rounded-xl border border-border p-6 hover:border-accent/20 h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <IntegrationLogo name={cs.brandName} logo={cs.logo} size="sm" />
                  <span className="text-eyebrow text-text-tertiary bg-bg-secondary px-2 py-0.5 rounded-full">
                    {cs.industry}
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{cs.metric}</div>
                <p className="text-sm font-semibold text-text-primary mb-2">{cs.brandName}</p>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{cs.summary}</p>
                <div className="flex items-center gap-1 text-sm text-accent font-medium">
                  Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

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
