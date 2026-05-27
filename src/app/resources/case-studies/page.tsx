"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FilterPills from "@/components/ui/FilterPills";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { caseStudies, industries } from "@/lib/data";
import { ArrowRight } from "lucide-react";

function CaseStudiesContent() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("industry") ?? "All");
  const allFilters = ["All", ...industries];
  const filtered = filter === "All" ? caseStudies : caseStudies.filter((cs) => cs.industry === filter);

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-display-xl text-text-primary">Real results from real businesses.</h1>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Named companies. Quantified outcomes. See how businesses like yours transformed their logistics with ITD Global.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterPills options={allFilters} active={filter} onChange={setFilter} />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cs, i) => (
              <ScrollReveal key={cs.id} delay={i * 0.08}>
                <Link
                  href={`/resources/case-studies/${cs.slug}`}
                  className="group block bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/20 transition-all h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <IntegrationLogo name={cs.brandName} logo={cs.logo} size="sm" />
                    <div>
                      <div className="text-sm font-medium text-text-primary">{cs.brandName}</div>
                      <span className="text-eyebrow text-text-tertiary">
                        {cs.industry}
                      </span>
                    </div>
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

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No case studies found for this industry yet.</p>
            </div>
          )}
        </div>
      </section>

      <ClosingCTA headline="Get similar results" subtitle="Talk to our team about how ITD Global can transform your logistics." />
    </>
  );
}

export default function CaseStudiesPage() {
  return (
    <Suspense>
      <CaseStudiesContent />
    </Suspense>
  );
}
