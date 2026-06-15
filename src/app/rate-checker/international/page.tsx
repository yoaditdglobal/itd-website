import { RateCheckerLoader } from "@/components/rate-checker/RateCheckerLoader";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "International Rate Checker",
  description:
    "Estimate your international shipping savings. Compare your current export and import rates against ITD Global's cross-border carrier pricing.",
  path: "/rate-checker/international",
});

export default function InternationalRateCheckerPage() {
  return (
    <>
      <RateCheckerLoader type="international" />
      <ClosingCTA
        headline="Want the full picture?"
        subtitle="Send us your volumes and lanes and an account manager will come back with exact rates."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
