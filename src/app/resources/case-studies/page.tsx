import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StoriesLibrary from "@/components/sections/StoriesLibrary";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";
import { getLibraryStories } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Customer stories",
  description:
    "See how UK businesses, from Tatti Lashes to Home Bargains, cut shipping cost, went international and won new business through ITD.",
  path: "/resources/case-studies",
});

/**
 * Customer Stories library: hero → featured spotlight → index + shelves
 * (StoriesLibrary, client) → closing CTA. Copy is verbatim from the
 * Customer Stories build brief — proof-led, no platform claims.
 */
export default function CaseStudiesPage() {
  const stories = getLibraryStories();
  const featured = stories.find((s) => s.featured);

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-display-xl text-text-primary max-w-4xl mx-auto">
              The businesses that stopped leaving money on shipping.
            </h1>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Real UK businesses, from fast-growing brands to 3PLs, shipping
              better at home and abroad through ITD.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured story — spotlight */}
      {featured && (
        <section className="bg-white pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-3xl bg-bg-dark px-6 py-10 md:px-12 md:py-14">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 20%, rgba(29,63,184,0.35) 0%, transparent 55%)",
                  }}
                />
                <div className="relative max-w-3xl">
                  <p className="text-eyebrow text-accent-secondary mb-4">
                    RIOZ Global · 5 new clients in 6 months
                  </p>
                  <blockquote className="text-display-md text-white">
                    &ldquo;Before ITD, we made nothing on shipping. Now
                    it&rsquo;s one of our strongest revenue streams.&rdquo;
                  </blockquote>
                  <p className="mt-5 text-sm text-white/60">
                    Rob Osgood, Managing Director, RIOZ Global
                  </p>
                  <Link
                    href="/resources/case-studies/rioz-global"
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-accent-secondary transition-colors"
                  >
                    Read the full story{" "}
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Index + shelves (client: outcome filtering, legacy ?industry= jumps) */}
      <Suspense>
        <StoriesLibrary stories={stories} />
      </Suspense>

      <ClosingCTA
        headline="Become the next story."
        subtitle="Tell us what you ship and we'll show you what we'd change."
        primaryCta={{ label: "Contact us", href: "/contact" }}
        secondaryCta={null}
      />
    </>
  );
}
