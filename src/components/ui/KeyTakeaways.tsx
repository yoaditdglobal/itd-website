import { Check } from "lucide-react";
import { linkifyGlossaryTerms } from "@/lib/glossary-inline";

/**
 * "Quick View" / key-takeaways block (GEO extractability).
 *
 * A compact, visually quiet summary of 2-5 one-sentence takeaways placed near
 * the top of long informational pages (guides, solution/shipping pages,
 * glossary intro). AI engines lift these summaries near-verbatim when citing
 * a page, so every bullet must be verifiable against the page's own content -
 * never write a takeaway the page doesn't substantiate.
 *
 * Design: a plain cream panel matching the site's note-panel idiom (see the
 * carrier table's "Data notes") - no icon chips, no dividers, just the
 * eyebrow and clean check bullets.
 *
 * Server component. Bullets get contextual glossary deep-links automatically.
 */
export default function KeyTakeaways({
  items,
  title = "Quick View",
}: {
  items: string[];
  title?: string;
}) {
  if (items.length === 0) return null;
  return (
    <aside
      aria-label="Quick view"
      className="rounded-2xl border border-border bg-bg-secondary p-6 md:p-7"
    >
      <p className="text-eyebrow text-accent">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check
              aria-hidden
              className="mt-1 h-4 w-4 flex-shrink-0 text-accent"
              strokeWidth={2.5}
            />
            <span className="text-body-md text-text-secondary">
              {linkifyGlossaryTerms(item)}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
