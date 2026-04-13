import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import SocialProof from "@/components/sections/SocialProof";
import SolutionsRouting from "@/components/sections/SolutionsRouting";
import ConnexxPreview from "@/components/sections/ConnexxPreview";
import IntegrationHighlights from "@/components/sections/IntegrationHighlights";
import CaseStudyCards from "@/components/sections/CaseStudyCards";
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <PainPoints />
      <SolutionsRouting />
      <ConnexxPreview />
      <IntegrationHighlights />
      <CaseStudyCards />
      <ClosingCTA />
    </>
  );
}
