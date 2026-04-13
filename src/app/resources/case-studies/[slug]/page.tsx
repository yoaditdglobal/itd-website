import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: `${cs.brandName} — ${cs.metric} | ITD Global`,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link href="/resources/case-studies" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to case studies
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent-light flex items-center justify-center">
                <span className="text-lg font-bold text-accent">{cs.brandName.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">{cs.brandName}</h2>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">{cs.industry}</span>
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-accent mb-4">{cs.metric}</div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">{cs.headline}</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Challenge / Solution / Result */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-12">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">The Challenge</h3>
                <p className="text-text-secondary leading-relaxed">{cs.challenge}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">The Solution</h3>
                <p className="text-text-secondary leading-relaxed">{cs.solution}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">The Result</h3>
                <p className="text-text-secondary leading-relaxed">{cs.result}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote */}
      {cs.quote && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <blockquote className="border-l-4 border-accent pl-6">
                <p className="text-xl md:text-2xl text-text-primary leading-relaxed italic">
                  &ldquo;{cs.quote}&rdquo;
                </p>
                {cs.quoteAuthor && (
                  <footer className="mt-4 text-sm font-medium text-text-secondary not-italic">
                    — {cs.quoteAuthor}
                  </footer>
                )}
              </blockquote>
            </ScrollReveal>
          </div>
        </section>
      )}

      <ClosingCTA headline="Get similar results" subtitle="Talk to our team about transforming your logistics." />
    </>
  );
}
