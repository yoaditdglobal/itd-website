import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import CaseStudyStats from "@/components/sections/CaseStudyStats";
import CaseStudyStack from "@/components/sections/CaseStudyStack";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import { caseStudies, getCaseStudyBySlug } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: `${cs.brandName} — ${cs.metric} | ITD Global`,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) notFound();

  return (
    <>
      {/* Hero — brand identity row + H1 + lead + hero image */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/resources/case-studies"
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to case studies
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <IntegrationLogo name={cs.brandName} logo={cs.logo} size="lg" />
              <div>
                <p className="text-heading-md text-text-primary leading-tight">
                  {cs.brandName}
                </p>
                <span className="text-eyebrow text-text-tertiary">
                  {cs.industry}
                </span>
              </div>
            </div>

            <h1 className="text-display-xl text-text-primary">{cs.headline}</h1>
            <p className="mt-5 text-body-lg text-text-secondary">{cs.summary}</p>
          </ScrollReveal>

          {cs.heroImage && (
            <ScrollReveal delay={0.1}>
              <div className="relative mt-10 md:mt-12 aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-border">
                <Image
                  src={cs.heroImage}
                  alt={cs.heroImageAlt ?? `${cs.brandName} case study hero`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Interactive stats + at-a-glance summary */}
      <CaseStudyStats stats={cs.stats} atGlance={cs.atGlance} />

      {/* The stack behind this story — click-through to carriers/integrations/shipping */}
      <CaseStudyStack cs={cs} />

      {/* Challenge / Solution / Result */}
      <section className="bg-bg-secondary py-16 md:py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-12">
              <div>
                <h3 className="text-eyebrow text-accent mb-3">The Challenge</h3>
                <p className="text-text-secondary leading-relaxed">
                  {cs.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-eyebrow text-accent mb-3">The Solution</h3>
                <p className="text-text-secondary leading-relaxed">
                  {cs.solution}
                </p>
              </div>
              <div>
                <h3 className="text-eyebrow text-accent mb-3">The Result</h3>
                <p className="text-text-secondary leading-relaxed">
                  {cs.result}
                </p>
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
                <p className="text-display-md text-text-primary leading-relaxed italic">
                  &ldquo;{cs.quote}&rdquo;
                </p>
                {cs.quoteAuthor && (
                  <footer className="mt-5 flex items-center gap-3 not-italic">
                    {cs.quoteAuthorPhoto && (
                      <div className="relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-border">
                        <Image
                          src={cs.quoteAuthorPhoto}
                          alt={cs.quoteAuthor}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="text-sm font-medium text-text-secondary">
                      {cs.quoteAuthor}
                    </span>
                  </footer>
                )}
              </blockquote>
            </ScrollReveal>
          </div>
        </section>
      )}

      <ClosingCTA
        headline="Get similar results"
        subtitle="Talk to our team about transforming your logistics."
      />
    </>
  );
}

