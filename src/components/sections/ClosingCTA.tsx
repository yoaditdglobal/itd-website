import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface CtaButton {
  label: string;
  href: string;
}

interface ClosingCTAProps {
  headline?: string;
  subtitle?: string;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
  /** Optional micro-note shown under the buttons. Used to set async expectations, e.g. "We reply within 1 business day." */
  asyncNote?: string;
}

export default function ClosingCTA({
  headline = "Ready to ship smarter?",
  subtitle = "Join thousands of businesses that trust ITD Global to streamline their logistics.",
  primaryCta,
  secondaryCta,
  asyncNote,
}: ClosingCTAProps) {
  const primary = primaryCta ?? { label: "Run the savings check", href: "/shipping/domestic#estimator" };
  const secondary = secondaryCta ?? { label: "Contact Sales", href: "/contact" };

  return (
    <section className="bg-bg-dark py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-display-lg text-white">{headline}</h2>
          <p className="mt-4 text-base md:text-lg text-white/60">{subtitle}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={primary.href} variant="primary" surface="dark">{primary.label}</Button>
            <Button href={secondary.href} variant="secondary" surface="dark">{secondary.label}</Button>
          </div>
          {asyncNote && (
            <p className="mt-4 text-sm text-white/60">{asyncNote}</p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
