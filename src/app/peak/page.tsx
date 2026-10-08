import ScrollReveal from "@/components/animations/ScrollReveal";
import FaqSection from "@/components/sections/FaqSection";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { getIntegrationsByType } from "@/lib/data";
import { PEAK, peakLabel } from "@/lib/peak-config";
import { assertPeakProductionReady, buildCurveConfig } from "@/lib/peak-curve.server";
import PeakProvider from "@/components/peak/PeakProvider";
import PeakHero from "@/components/peak/PeakHero";
import PeakCurveIsland from "@/components/peak/PeakCurveIsland";
import PeakStatCard from "@/components/peak/PeakStatCard";
import PeakFlipCards from "@/components/peak/PeakFlipCards";
import PeakTalkBand from "@/components/peak/PeakTalkBand";
import PeakDownloadButton from "@/components/peak/PeakDownloadButton";
import "@/components/peak/peak.css";

// Static page: this runs at build time, so a Netlify PRODUCTION build fails
// while the curve still runs on placeholder data (see peak-curve.server.ts).
assertPeakProductionReady();

export const metadata = buildMetadata({
  title: "Peak season planning report",
  description:
    "Plan peak with real parcel data from across ITD's customers. See when volume lands, how it differs by segment, and download the full Peak report.",
  path: "/peak",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "Peak report", path: "/peak" },
];

export default function PeakPage() {
  const curve = buildCurveConfig();
  const courierCount = getIntegrationsByType("carrier").length;
  const downloadLabel = peakLabel(PEAK.labels.download);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(CRUMBS), faqSchema([...PEAK.faq])]} />

      <div className="peak-skin peak-tokens">
        <PeakProvider
          edition={PEAK.edition}
          reportPath={PEAK.reportPath}
          stickyLabel={peakLabel(PEAK.labels.sticky)}
          images={{ cover: PEAK.coverImage, spread: PEAK.previewImage }}
          copy={{
            title: peakLabel(PEAK.dialog.title),
            sub: PEAK.dialog.sub,
            insideHeading: PEAK.dialog.insideHeading,
            inside: [...PEAK.dialog.inside],
            freeMailHint: PEAK.dialog.freeMailHint,
            optIn: PEAK.dialog.optIn,
            submit: PEAK.dialog.submit,
            successTitle: PEAK.dialog.successTitle,
            successLine: PEAK.dialog.successLine,
            successButton: PEAK.dialog.successButton,
            successSecondary: PEAK.dialog.successSecondary,
          }}
        >
          {/* 1 — Hero */}
          <PeakHero
            eyebrow={PEAK.hero.eyebrow}
            h1={PEAK.hero.h1}
            sub={PEAK.hero.sub}
            buttonLabel={downloadLabel}
            coverSrc={PEAK.coverImage}
            coverAlt={`Cover of the ITD Global Peak ${PEAK.edition} report`}
          />

          {/* 2 — How last peak played out */}
          <section className="peak-insights" data-analytics-location="peak_insights">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="max-w-3xl">
                  <h2 className="text-display-lg text-text-primary">{PEAK.insights.h2}</h2>
                  <p className="text-body-lg text-text-secondary mt-4">{PEAK.insights.intro}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal className="mt-10 md:mt-14">
                <PeakCurveIsland config={curve} />
              </ScrollReveal>

              <ScrollReveal className="mt-6 md:mt-8">
                <PeakStatCard
                  eyebrow={PEAK.stat.eyebrow}
                  value={PEAK.stat.value}
                  suffix={PEAK.stat.suffix}
                  line={PEAK.stat.line}
                  footnote={PEAK.stat.footnote}
                />
              </ScrollReveal>

              <ScrollReveal className="mt-16 md:mt-24">
                <h3 className="text-display-md text-text-primary text-center">
                  {PEAK.flipCards.heading}
                </h3>
                <div className="mt-8 md:mt-10">
                  <PeakFlipCards
                    cards={PEAK.flipCards.cards}
                    backEyebrow={PEAK.flipCards.backEyebrow}
                    backLink={PEAK.flipCards.backLink}
                  />
                </div>
                <div className="mt-10 md:mt-12 text-center max-w-2xl mx-auto">
                  <p className="text-body-lg text-text-secondary">{PEAK.flipCards.closingLine}</p>
                  <div className="mt-6">
                    <PeakDownloadButton trigger="insights_button" variant="cobalt" className="peak-btn--lg">
                      {downloadLabel}
                    </PeakDownloadButton>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* 3 — Talk to us */}
          <PeakTalkBand
            h2={PEAK.talk.h2}
            body={PEAK.talk.body}
            courierCount={courierCount}
            buttonLabel={PEAK.talk.button}
            customerLine={PEAK.talk.customerLink}
          />

          {/* 4 — FAQ + download */}
          <div className="bg-bg-secondary" data-analytics-location="peak_faq">
            <FaqSection items={[...PEAK.faq]} heading="FAQ" />
            <div className="px-4 pb-16 md:pb-20 -mt-4 text-center">
              <PeakDownloadButton
                trigger="faq_button"
                variant="cobalt"
                className="peak-btn--lg"
                data-peak-faq-cta="true"
              >
                {downloadLabel}
              </PeakDownloadButton>
            </div>
          </div>
        </PeakProvider>
      </div>
    </>
  );
}
