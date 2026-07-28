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
    <section className="bg-white py-10 md:py-14">
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
            <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
              <p className="text-eyebrow text-text-tertiary">At a glance</p>
              <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
                {atGlance!.map((row, i) => (
                  <div key={i}>
                    <dt className="text-eyebrow text-text-tertiary">
                      {row.label}
                    </dt>
                    <dd className="mt-1.5 text-body-md font-semibold leading-snug text-text-primary">
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
      className={`h-full rounded-2xl ${
        isFeatured
          ? "bg-gradient-to-br from-accent-200 via-accent to-accent-600 p-[2.5px]"
          : "border border-border bg-white"
      }`}
    >
      <div
        className={`flex h-full flex-col p-5 md:p-6 ${
          isFeatured ? "rounded-[calc(1rem-2.5px)] bg-white" : ""
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
          <span className="text-stat-xl leading-none">
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
    </div>
  );
}
