import { RateCheckerLoader } from "@/components/rate-checker/RateCheckerLoader";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Domestic Rate Checker",
  description:
    "Estimate your UK domestic shipping savings in two minutes. Compare your current carrier rates against ITD Global's multi-carrier pricing.",
  path: "/rate-checker/domestic",
});

export default function DomesticRateCheckerPage() {
  return (
    <>
      <RateCheckerLoader type="domestic" />
      <ClosingCTA
        headline="Want the full picture?"
        subtitle="Send us your volumes and lanes and an account manager will come back with exact rates."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
