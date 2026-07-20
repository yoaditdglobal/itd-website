import VideoHero from "@/components/sections/VideoHero";
import { RATE_CHECKER_URL } from "@/lib/site-config";
import SocialProof from "@/components/sections/SocialProof";
import DomesticInternationalCards from "@/components/sections/DomesticInternationalCards";
import SolutionsRouting from "@/components/sections/SolutionsRouting";
import LogisticsPartnerBand from "@/components/sections/LogisticsPartnerBand";
import ConnexxPreview from "@/components/sections/ConnexxPreview";
import IntegrationHighlights from "@/components/sections/IntegrationHighlights";
import CaseStudyCards from "@/components/sections/CaseStudyCards";
import ClosingCTA from "@/components/sections/ClosingCTA";
import ScrollForward from "@/components/animations/ScrollForward";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Multi-carrier shipping platform for UK businesses",
  description:
    "Compare every UK and international carrier on every shipment. Connexx routes the cheapest compliant option, prints the label, and tracks the parcel from one dashboard.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <VideoHero />
      {/* Reveal the first section as it scrolls up into view. */}
      <ScrollForward>
        <SocialProof />
      </ScrollForward>
      <DomesticInternationalCards />
      <SolutionsRouting />
      <ConnexxPreview />
      <LogisticsPartnerBand />
      <IntegrationHighlights />
      {/* subtitle="" removes the meta line under the heading (per copy doc)
          without touching the default other pages rely on. */}
      <CaseStudyCards subtitle="" />
      <ClosingCTA
        headline="Put your carrier costs to the test"
        subtitle="The rate checker compares your current shipping against ITD's rates and shows the saving. Send a recent invoice and see for yourself."
        primaryCta={{ label: "Get Quote", href: RATE_CHECKER_URL }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
