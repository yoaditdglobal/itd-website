import { Check, ListChecks } from "lucide-react";
import { linkifyGlossaryTerms } from "@/lib/glossary-inline";

/**
 * "TL;DR" / key-takeaways block (GEO extractability).
 *
 * A compact, visually distinct summary of 2–5 one-sentence takeaways placed near
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
      className="relative overflow-hidden rounded-2xl border border-accent/15 bg-white shadow-sm"
    >
      {/* Accent rail — marks this as a deliberate summary module and bridges
          the transition out of the hero into the page body. */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-accent" />
      <div className="p-6 md:p-8">
        {/* Header — icon chip + eyebrow label, echoing the site's section rhythm */}
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
            <ListChecks aria-hidden className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="text-eyebrow text-accent">{title}</span>
        </div>

        {/* Hairline divider separates the label from the takeaways */}
        <div aria-hidden className="my-5 h-px bg-border" />

        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
                <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={2.75} />
              </span>
              <span className="text-body-md text-text-secondary">
                {linkifyGlossaryTerms(item)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
