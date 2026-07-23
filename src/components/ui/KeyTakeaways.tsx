import { Check } from "lucide-react";
import { linkifyGlossaryTerms } from "@/lib/glossary-inline";

/**
 * "Quick View" / key-takeaways block (GEO extractability).
 *
 * A compact summary of 2-5 one-sentence takeaways placed near the top of long
 * informational pages (guides, solution/shipping pages, glossary intro). AI
 * engines lift these summaries near-verbatim when citing a page, so every
 * bullet must be verifiable against the page's own content - never write a
 * takeaway the page doesn't substantiate.
 *
 * Design: the site's premium dark-panel idiom (same family as the customer
 * stories spotlight) - ink panel with layered radial accent glows, copper
 * eyebrow, white takeaways. Glossary links inside bullets get a dark-surface
 * hover override.
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
      className="relative overflow-hidden rounded-3xl bg-bg-dark px-6 py-7 md:px-9 md:py-8"
    >
      {/* Layered radial glows - the spotlight-panel gradient treatment */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 18% 12%, rgba(29,63,184,0.4) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 92% 110%, rgba(200,116,61,0.28) 0%, transparent 45%)",
        }}
      />
      <div className="relative">
        <p className="text-eyebrow text-accent-secondary">{title}</p>
        <ul className="mt-5 space-y-3.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check
                aria-hidden
                className="mt-1 h-4 w-4 flex-shrink-0 text-accent-secondary"
                strokeWidth={2.5}
              />
              <span className="text-body-md text-white/85 [&_a:hover]:text-white">
                {linkifyGlossaryTerms(item)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
