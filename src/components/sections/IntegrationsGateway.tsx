import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import IntegrationLogo from "@/components/ui/IntegrationLogo";

interface GatewayLogo {
  name: string;
  logo?: string;
}

interface IntegrationsGatewayProps {
  heading: string;
  subtext: string;
  logos: GatewayLogo[];
  browseHref: string;
  /** Defaults to "Browse integrations". */
  browseLabel?: string;
}

/**
 * "Integrations gateway" band — heading + subtext, a row of brand-logo chips,
 * and an inline arrow link to the full integrations directory. Uses
 * `bg-bg-tertiary` so it separates cleanly from a white block above and a
 * `bg-bg-secondary` block below. Rendered via `VerticalPage`'s
 * `integrationsGateway` slot (between the features block and the carousel).
 */
export default function IntegrationsGateway({
  heading,
  subtext,
  logos,
  browseHref,
  browseLabel = "Browse integrations",
}: IntegrationsGatewayProps) {
  return (
    <section className="bg-bg-tertiary py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-display-md text-text-primary mb-3">{heading}</h2>
          <p className="text-body-md text-text-secondary max-w-2xl">{subtext}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {logos.map((l) => (
              <div
                key={l.name}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3"
              >
                <IntegrationLogo name={l.name} logo={l.logo} size="sm" fit="contain" />
                <span className="text-sm font-medium text-text-primary">{l.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href={browseHref}
              className="link-underline gap-1 text-sm text-accent font-medium"
            >
              {browseLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
