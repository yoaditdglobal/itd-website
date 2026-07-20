import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import OverviewAnimation from "@/components/sections/OverviewAnimation";

export default function ConnexxPreview() {
  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Copy on top, full-width live platform preview below. */}
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-eyebrow text-accent mb-3">
              The Connexx Platform
            </p>
            <h2 className="text-display-lg text-text-primary">
              The engine behind 17.5 million labels a year
            </h2>
            <p className="mt-6 text-body-lg text-text-secondary">
              A new one every 2.7 seconds, across 16 carriers and used by more
              than 6,000 UK businesses for over 20 years.
            </p>
            <div className="mt-8">
              <Button href="/connexx">Explore</Button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-10 md:mt-12">
            <OverviewAnimation />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
