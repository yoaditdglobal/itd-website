import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { caseStudies } from "@/lib/data";
import { ArrowRight } from "lucide-react";

interface CaseStudyCardsProps {
  limit?: number;
  showHeader?: boolean;
}

export default function CaseStudyCards({ limit = 3, showHeader = true }: CaseStudyCardsProps) {
  const studies = caseStudies.slice(0, limit);

  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <ScrollReveal>
            <SectionLabel title="Real results from real businesses" subtitle="Named companies. Quantified outcomes. No generic testimonials." align="center" />
          </ScrollReveal>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((cs, i) => (
            <ScrollReveal key={cs.id} delay={i * 0.1}>
              <Link
                href={`/resources/case-studies/${cs.slug}`}
                className="group block bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/20 transition-all h-full"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">{cs.brandName.charAt(0)}</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary bg-bg-secondary px-2 py-0.5 rounded-full">
                    {cs.industry}
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-accent mb-2">{cs.metric}</div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{cs.summary}</p>
                <div className="flex items-center gap-1 text-sm text-accent font-medium">
                  Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
