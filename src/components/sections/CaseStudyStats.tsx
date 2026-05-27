"use client";

import CountUp from "@/components/ui/CountUp";
import ScrollReveal from "@/components/animations/ScrollReveal";
import type {
  CaseStudyStat,
  CaseStudyAtGlance,
} from "@/lib/data";

interface CaseStudyStatsProps {
  stats?: CaseStudyStat[];
  atGlance?: CaseStudyAtGlance[];
}

/**
 * Interactive stats summary + at-a-glance spec list for case study detail pages.
 *
 * Stats render as a row of metric cards. Numeric values animate via CountUp;
 * string values render statically in display-md.
 * The first card flagged `featured` gets accent-light chrome to anchor the eye.
 *
 * Layout:
 *  - mobile (<md): stacked one card per row
 *  - md+:        2-col when 2 stats, 3-col when 3, otherwise 4-col
 *
 * At a glance renders below the stats as a 2-col label/value grid.
 */
export default function CaseStudyStats({
  stats,
  atGlance,
}: CaseStudyStatsProps) {
  const hasStats = stats && stats.length > 0;
  const hasGlance = atGlance && atGlance.length > 0;
  if (!hasStats && !hasGlance) return null;

  const statCount = stats?.length ?? 0;
  const gridClass =
    statCount === 2
      ? "md:grid-cols-2"
      : statCount === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-4";

  return (
    <section className="bg-white py-10 md:py-14 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasStats && (
          <div
            className={`grid grid-cols-1 ${gridClass} gap-4 md:gap-5 mb-8 items-stretch`}
          >
            {stats!.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.08} className="h-full">
                <StatCard stat={stat} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {hasGlance && (
          <ScrollReveal delay={(statCount * 0.08) + 0.05}>
            <div className="rounded-2xl bg-bg-secondary border border-border p-5 md:p-6">
              <p className="text-eyebrow text-text-tertiary mb-4">At a glance</p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {atGlance!.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between gap-3 border-b border-border last:border-0 sm:border-0 pb-2 sm:pb-0"
                  >
                    <dt className="text-eyebrow text-text-tertiary flex-shrink-0">
                      {row.label}
                    </dt>
                    <dd className="text-body-sm font-medium text-text-primary text-right">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: CaseStudyStat }) {
  const isNumeric = typeof stat.value === "number";
  const isFeatured = !!stat.featured;

  return (
    <div
      className={`group h-full flex flex-col rounded-2xl border p-5 md:p-6 transition-all duration-200 motion-reduce:transition-none hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:shadow-md ${
        isFeatured
          ? "bg-accent-light border-accent/25 hover:border-accent/45"
          : "bg-white border-border hover:border-accent/30"
      }`}
    >
      {/* Value — fixed minimum height so 1-line and 2-line values reserve the same
          vertical space, keeping the eyebrow labels horizontally aligned across cards. */}
      <div className="text-accent min-h-[3.25rem] md:min-h-[3.5rem] flex items-start">
        {isNumeric ? (
          <span className="text-stat-xl leading-none">
            {stat.prefix && <span>{stat.prefix}</span>}
            <CountUp to={stat.value as number} duration={1600} />
            {stat.suffix && <span>{stat.suffix}</span>}
          </span>
        ) : (
          <span className="text-display-md font-semibold tracking-tight leading-tight">
            {stat.prefix && <span>{stat.prefix}</span>}
            {stat.value}
            {stat.suffix && <span>{stat.suffix}</span>}
          </span>
        )}
      </div>
      <p className="text-eyebrow text-text-tertiary mt-3">{stat.label}</p>
      {stat.sub && (
        <p className="text-caption text-text-secondary mt-1.5 leading-snug">
          {stat.sub}
        </p>
      )}
    </div>
  );
}
