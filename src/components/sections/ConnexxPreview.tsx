import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import OverviewAnimation from "@/components/sections/OverviewAnimation";

export default function ConnexxPreview() {
  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Copy beside the live preview — the animation takes the wider column
            opposite the text. */}
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-12">
          <ScrollReveal>
            <div>
              <Image
                src="/logos/connexx/connexx-logo-ink.svg"
                alt="Connexx"
                width={225}
                height={105}
                className="h-11 w-auto mb-5"
              />
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
            <OverviewAnimation />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
