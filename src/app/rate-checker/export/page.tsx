import { RateCheckerLoader } from "@/components/rate-checker/RateCheckerLoader";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Export Rate Checker",
  description:
    "Estimate your export shipping savings in two minutes. Compare your current rates against ITD Global's international export pricing.",
  path: "/rate-checker/export",
});

export default function ExportRateCheckerPage() {
  return (
    <>
      <RateCheckerLoader type="export" />
      <ClosingCTA
        headline="Want the full picture?"
        subtitle="Send us your volumes and lanes and an account manager will come back with exact rates."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
