import { Check } from "lucide-react";
import { linkifyGlossaryTerms } from "@/lib/glossary-inline";

/**
 * "TL;DR" / key-takeaways block (GEO extractability).
 *
 * A compact, visually distinct box of 2–5 one-sentence takeaways placed near
 * the top of long informational pages (guides, solution/shipping pages,
 * glossary intro). AI engines lift these summaries near-verbatim when citing
 * a page, so every bullet must be verifiable against the page's own content —
 * never write a takeaway the page doesn't substantiate.
 *
 * Server component. Bullets get contextual glossary deep-links automatically.
 */
export default function KeyTakeaways({
  items,
  title = "TL;DR",
}: {
  items: string[];
  title?: string;
}) {
  if (items.length === 0) return null;
  return (
    <aside
      aria-label="Key takeaways"
      className="rounded-2xl border border-accent/20 bg-accent-light/40 p-6 md:p-7"
    >
      <p className="text-eyebrow text-accent mb-4">{title}</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check
              aria-hidden
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
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
