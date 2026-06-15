import { RateCheckerLoader } from "@/components/rate-checker/RateCheckerLoader";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Import Rate Checker",
  description:
    "Estimate your import shipping savings in two minutes. Compare your current rates against ITD Global's international import pricing.",
  path: "/rate-checker/import",
});

export default function ImportRateCheckerPage() {
  return (
    <>
      <RateCheckerLoader type="import" />
      <ClosingCTA
        headline="Want the full picture?"
        subtitle="Send us your volumes and lanes and an account manager will come back with exact rates."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
