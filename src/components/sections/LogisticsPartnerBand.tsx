import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { companyPhotos } from "@/lib/data";

const PHOTOS = companyPhotos;

/**
 * Homepage "logistics partner" gateway band. Dark, photographic brand moment
 * that signals there's a real logistics company — warehouse, team, operators —
 * behind the Connexx platform. Routes to the About page.
 *
 * Sits between the ICP routing cards and the Connexx platform preview.
 */
export default function LogisticsPartnerBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg-dark via-bg-dark-card to-bg-dark py-16 md:py-24">
      {/* Accent glow — warm cobalt bloom top-right for depth */}
      <div
        className="absolute -top-1/3 -right-1/4 w-[60%] h-[120%] rounded-full pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle, rgba(29,63,184,0.28) 0%, transparent 65%)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-soft-light pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Visual hook — carousel (warehouse first) */}
          <ScrollReveal>
            <ImageCarousel
              images={PHOTOS}
              aspect="4 / 3"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </ScrollReveal>

          {/* Copy */}
          <ScrollReveal delay={0.1}>
            <div>
              <p className="text-eyebrow text-accent-secondary mb-4">
                More than a platform
              </p>
              <h2 className="text-display-lg text-white">
                Run by people who ship for a living
              </h2>
              <p className="mt-5 text-body-lg text-white/75">
                ITD Global has been in logistics for +20 years, run from our HQ
                in Manchester. Our team handles carriers, customs and peak
                season for hundreds of UK businesses, and when you call, you get
                a person who knows your account.
              </p>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
                >
                  Meet the Team
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
