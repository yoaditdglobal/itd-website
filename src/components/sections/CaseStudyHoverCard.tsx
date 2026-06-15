import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import type { CaseStudyStat } from "@/lib/data";

/**
 * Slim, serializable subset of a CaseStudy passed from the server card into the
 * client hover chip — keeps the long narrative fields out of the RSC payload.
 */
export interface CaseStudyPreview {
  slug: string;
  brandName: string;
  logo?: string;
  stats?: CaseStudyStat[];
  quoteAuthor?: string;
  quoteAuthorPhoto?: string;
  oneLiner?: string;
  headline: string;
}

function statText(s: CaseStudyStat): string {
  return `${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`;
}

/**
 * Mini case-study overview shown on hover/focus of a "Used by" logo. Degrades
 * gracefully: stats, author, and photo are each optional. Presentational only —
 * positioning + open state live in UsedByChip.
 */
export default function CaseStudyHoverCard({ cs }: { cs: CaseStudyPreview }) {
  // Up to two stats, featured first.
  const stats = [...(cs.stats ?? [])]
    .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
    .slice(0, 2);
  const headline = cs.oneLiner ?? cs.headline;
  const initial = cs.quoteAuthor?.trim().charAt(0).toUpperCase() ?? "";

  return (
    <div className="w-72 rounded-xl border border-border bg-white p-4 shadow-xl">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-border bg-white p-1">
          <IntegrationLogo name={cs.brandName} logo={cs.logo} size="sm" />
        </span>
        <p className="text-label text-text-primary">{cs.brandName}</p>
      </div>

      {stats.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {stats.map((s) => (
            <span
              key={s.label}
              className="flex w-full items-center gap-1.5 overflow-hidden rounded-lg bg-accent-light/60 px-3 py-2"
            >
              <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-accent">
                {statText(s)}
              </span>
              <span className="min-w-0 flex-1 truncate text-caption text-text-secondary">
                {s.label}
              </span>
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 text-body-sm text-text-primary leading-relaxed">
        {headline}
      </p>

      {cs.quoteAuthor && (
        <div className="mt-3 flex items-center gap-2">
          {cs.quoteAuthorPhoto ? (
            <Image
              src={cs.quoteAuthorPhoto}
              alt={cs.quoteAuthor}
              width={28}
              height={28}
              unoptimized
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-light text-accent text-xs font-semibold"
            >
              {initial}
            </span>
          )}
          <p className="text-caption text-text-secondary">{cs.quoteAuthor}</p>
        </div>
      )}

      <Link
        href={`/resources/case-studies/${cs.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all hover:gap-2.5"
      >
        Read the story
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
