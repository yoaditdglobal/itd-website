import ScrollReveal from "@/components/animations/ScrollReveal";

interface RealityItem {
  title: string;
  description: string;
}

interface SolutionRealitiesProps {
  /** Optional eyebrow line above the heading. */
  eyebrow?: string;
  heading: string;
  lead: string;
  items: RealityItem[];
}

/**
 * Editorial "realities of operating a {X}" section — heading + lead followed by
 * a grid of short {title, description} cards. Bespoke section rendered around
 * `VerticalPage` (same pattern as `SolutionHero` / `SolutionPains`). The card
 * markup mirrors the established `IntegrationCategoryPage` use-case cards.
 */
export default function SolutionRealities({
  eyebrow,
  heading,
  lead,
  items,
}: SolutionRealitiesProps) {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {eyebrow && <p className="text-eyebrow text-accent mb-3">{eyebrow}</p>}
          <h2 className="text-display-md text-text-primary">{heading}</h2>
          <p className="mt-4 text-body-md text-text-secondary max-w-prose">{lead}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {items.map((item) => (
              <div
                key={item.title}
                className="h-full bg-bg-secondary rounded-2xl border border-border p-6"
              >
                <h3 className="text-heading-md text-text-primary">{item.title}</h3>
                <p className="mt-2 text-body-sm text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
