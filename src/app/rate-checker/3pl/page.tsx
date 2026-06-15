import { RateCheckerLoader } from "@/components/rate-checker/RateCheckerLoader";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "3PL Rate Checker",
  description:
    "Free 3PL savings assessment. Answer a few questions about your operation and see how much you could save with ITD Global's multi-carrier network.",
  path: "/rate-checker/3pl",
});

export default function ThreePLRateCheckerPage() {
  return (
    <>
      <RateCheckerLoader type="3pl" />
      <ClosingCTA
        headline="Want the full picture?"
        subtitle="Talk to our team about per-brand routing, carrier rates, and onboarding."
        primaryCta={{ label: "Contact Us", href: "/contact?enquiry=3pl" }}
      />
    </>
  );
}
