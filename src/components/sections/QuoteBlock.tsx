import Image from "next/image";
import type { CaseStudyQuote } from "@/lib/data";

/**
 * Pull quote for case study detail pages. Two placements:
 *  - "feature": large emphasised block (display-md) with an accent rule — anchors proof.
 *  - "inline":  lighter contained card (heading-md) for a mid-body interjection.
 *
 * Renders cleanly with or without an author photo, and standalone anywhere in
 * the body. Author photo carries a meaningful alt (name + role).
 */
export default function QuoteBlock({
  quote,
  name,
  title,
  photo,
  placement = "feature",
}: CaseStudyQuote) {
  const attribution = (name || title) && (
    <footer className="mt-5 flex items-center gap-3 not-italic">
      {photo && (
        <div className="relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-border">
          <Image
            src={photo}
            alt={title ? `${name}, ${title}` : name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      )}
      <span className="text-sm text-text-secondary">
        {name && (
          <span className="font-medium text-text-primary">{name}</span>
        )}
        {name && title && <span>, </span>}
        {title}
      </span>
    </footer>
  );

  if (placement === "inline") {
    return (
      <blockquote className="rounded-2xl bg-bg-secondary border border-border p-6 md:p-8">
        <p className="text-heading-md text-text-primary leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </p>
        {attribution}
      </blockquote>
    );
  }

  return (
    <blockquote className="border-l-4 border-accent pl-6">
      <p className="text-display-md text-text-primary leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </p>
      {attribution}
    </blockquote>
  );
}
