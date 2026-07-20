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
              <div className="flex items-center gap-2.5 mb-5 text-text-primary">
                <svg
                  viewBox="0 0 1292 1350"
                  aria-hidden
                  className="w-7 h-7 flex-none"
                >
                  <path
                    d="M 643.25 672.13 C 621.28 1051.28 343.85 1341.38 0.5 1350 C 6 988.09 283.42 695.11 643.25 672.13 Z M 643.25 672.13 C 1005.83 695.11 1283.26 988.09 1291.5 1350 C 945.4 1341.38 665.23 1051.28 643.25 672.13 Z M 0.5 0 C 343.85 5.75 621.28 295.85 643.25 672.13 C 283.42 649.15 6 359.04 0.5 0 Z M 1291.5 0 C 1283.26 359.04 1005.83 649.15 643.25 672.13 C 665.23 295.85 945.4 5.75 1291.5 0 Z"
                    fill="currentColor"
                  />
                </svg>
                <span
                  className="text-text-primary"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  connexx
                </span>
              </div>
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
