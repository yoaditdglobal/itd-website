import ScrollReveal from "@/components/animations/ScrollReveal";
import FaqAccordion from "@/components/sections/FaqAccordion";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  heading?: string;
  subheading?: string;
}

/**
 * Reusable FAQ block. Identical visual treatment to the FAQ rendered inside
 * VerticalPage. Pulled out so custom pages (e.g. /connexx, /) can drop it in
 * without re-implementing the markup. Pair with faqSchema() in JSON-LD.
 *
 * Open/close animation lives in FaqAccordion (client component) so this
 * server component can still be statically rendered.
 */
export default function FaqSection({
  items,
  heading = "Frequently asked questions",
  subheading = "The answers most operators ask before booking a call.",
}: FaqSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-bg-secondary py-16 md:py-20 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-display-lg text-text-primary mb-2 text-center">
            {heading}
          </h2>
          {subheading && (
            <p className="text-body-md text-text-secondary text-center mb-10">{subheading}</p>
          )}
        </ScrollReveal>
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
