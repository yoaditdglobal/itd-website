import Link from "next/link";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import {
  resolveEntity,
  shippingTypeSlug,
  type CaseStudy,
  type LinkedEntity,
} from "@/lib/data";

interface CaseStudyStackProps {
  cs: CaseStudy;
}

/**
 * Click-through chip row showing the entities behind a case study —
 * shipping types, carriers, and integrations the business uses.
 *
 * Rendered on `/resources/case-studies/[slug]` below the at-a-glance panel
 * so readers can pivot from a customer story to the carrier page, the
 * integration category page, or the relevant shipping-type landing.
 *
 * Groups with no resolvable entries are hidden. The whole section returns
 * null when there's nothing to show (legacy case studies without taxonomy).
 */
export default function CaseStudyStack({ cs }: CaseStudyStackProps) {
  const shipping: LinkedEntity[] = (cs.shippingTypes ?? [])
    .map((t) => resolveEntity(shippingTypeSlug(t)))
    .filter((e): e is LinkedEntity => e !== null);

  const carriers: LinkedEntity[] = (cs.carriers ?? [])
    .map((slug) => resolveEntity(slug))
    .filter((e): e is LinkedEntity => e !== null);

  const integrations: LinkedEntity[] = (cs.integrations ?? [])
    .map((slug) => resolveEntity(slug))
    .filter((e): e is LinkedEntity => e !== null);

  if (
    shipping.length === 0 &&
    carriers.length === 0 &&
    integrations.length === 0
  ) {
    return null;
  }

  return (
    <section className="bg-white py-10 md:py-14 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-eyebrow text-text-tertiary mb-5">
          The stack behind this story
        </p>
        <div className="space-y-5">
          {shipping.length > 0 && (
            <ChipGroup label="Shipping" entities={shipping} />
          )}
          {carriers.length > 0 && (
            <ChipGroup label="Carriers" entities={carriers} />
          )}
          {integrations.length > 0 && (
            <ChipGroup label="Integrations" entities={integrations} />
          )}
        </div>
      </div>
    </section>
  );
}

function ChipGroup({
  label,
  entities,
}: {
  label: string;
  entities: LinkedEntity[];
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
      <p className="text-eyebrow text-text-tertiary sm:w-28 sm:flex-shrink-0 sm:pt-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {entities.map((e) => (
          <Link
            key={e.href + e.name}
            href={e.href}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-3 py-1.5 text-sm text-text-primary hover:border-accent/40 hover:bg-white transition-colors"
          >
            {e.logo && (
              <IntegrationLogo name={e.name} logo={e.logo} size="xs" />
            )}
            <span className="font-medium">{e.name}</span>
            <span
              aria-hidden
              className="text-text-tertiary group-hover:text-accent group-hover:translate-x-0.5 transition-all"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
