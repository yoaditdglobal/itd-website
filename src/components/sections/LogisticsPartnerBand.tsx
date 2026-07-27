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
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h2 className="text-display-lg text-text-primary">
                Run by people who ship for a living
              </h2>
              <p className="mt-5 text-body-lg text-text-secondary">
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
