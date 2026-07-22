import Link from "next/link";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import type { CaseStudy } from "@/lib/data";
import { ArrowRight } from "lucide-react";

/**
 * A single "Customer Stories" card. Fills its slide (`h-full` + flex column) so
 * every card in the carousel is the same height, and uses the short, consistent
 * `oneLiner` blurb (clamped to two lines) rather than the variable-length
 * `summary`. Layout-agnostic: the carousel/grid parent owns the width + snap.
 */
export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/resources/case-studies/${cs.slug}`}
      aria-label={`Read the ${cs.brandName} case study`}
      className="card-hover group flex h-full flex-col rounded-xl border border-border bg-white p-6 hover:border-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <div className="mb-4 flex items-center gap-3">
        <IntegrationLogo name={cs.brandName} logo={cs.logo} size="sm" />
        <span className="text-eyebrow text-text-tertiary bg-bg-secondary rounded-full px-2 py-0.5">
          {cs.industry}
        </span>
      </div>
      <div className="text-stat-lg text-accent mb-1">{cs.metric}</div>
      <p className="text-heading-sm text-text-primary mb-2">{cs.brandName}</p>
      <p className="text-body-sm text-text-secondary mb-4 line-clamp-2">
        {cs.oneLiner ?? cs.summary}
      </p>
      <div className="mt-auto flex items-center gap-1 text-sm font-medium text-accent">
        Read case study
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
      </div>
    </Link>
  );
}
