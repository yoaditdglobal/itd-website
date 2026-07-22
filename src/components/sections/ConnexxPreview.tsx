import Image from "next/image";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import OverviewAnimation from "@/components/sections/OverviewAnimation";

export default function ConnexxPreview() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg-dark via-bg-dark-card to-bg-dark py-16 md:py-24">
      {/* Accent glow + grain — dark brand moment for the platform preview */}
      <div
        className="absolute -top-1/3 -right-1/4 w-[60%] h-[120%] rounded-full pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle, rgba(29,63,184,0.28) 0%, transparent 65%)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-soft-light pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Copy beside the live preview — the animation takes the wider column
            opposite the text. */}
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,1.44fr)] lg:gap-12">
          <ScrollReveal>
            <div>
              <Image
                src="/logos/connexx/connexx-logo-white.svg"
                alt="Connexx"
                width={225}
                height={105}
                className="h-20 w-auto mb-6"
              />
              {/* Mobile-only: the live preview sits between the logo and the
                  headline. Costs ~nothing when hidden — OverviewAnimation
                  renders no scene until its container has width. */}
              <div className="lg:hidden mt-2 mb-6">
                <OverviewAnimation />
              </div>
              <h2 className="text-display-lg text-white">
                The engine behind 17.5m labels a year
              </h2>
              <p className="mt-6 text-body-lg text-white/75">
                A new one every 2.7 seconds, across 16 carriers and used by more
                than 6,000 UK businesses for over 20 years.
              </p>
              <div className="mt-8">
                <Button href="/connexx">Explore</Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="hidden lg:block">
            <OverviewAnimation />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
