import ParcelUnboxHero from "@/components/sections/ParcelUnboxHero";
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
      <ParcelUnboxHero />
      {/* Hands off from the hero's final (Freight) act: this section surges
          forward out of depth, then the rest of the page scrolls flat. */}
      <ScrollForward>
        <SocialProof />
      </ScrollForward>
      <DomesticInternationalCards />
      <SolutionsRouting />
      <LogisticsPartnerBand />
      <ConnexxPreview />
      <IntegrationHighlights />
      <CaseStudyCards />
      <ClosingCTA
        headline="Two minutes. No commitment. See what you'd save."
        subtitle="The savings estimator compares your current carrier mix against the live Connexx rate engine. No card, no call, no obligation."
        primaryCta={{ label: "Get Quote", href: "/rate-checker/domestic" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
