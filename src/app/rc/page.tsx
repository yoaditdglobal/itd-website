import Link from "next/link";
import ParcelUnboxHero from "@/components/sections/ParcelUnboxHero";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "One parcel, every mode — domestic, international & freight",
  description:
    "Watch a single parcel move across every mode ITD Global handles — UK domestic, international air, and sea freight — all from one multi-carrier platform.",
  path: "/rc",
});

/**
 * Standalone, immersive marketing landing page for the cinematic parcel journey.
 * Rendered with no global nav/footer (see SiteChrome's IMMERSIVE list) — just a
 * small logo, the full scroll-driven experience, and a single closing CTA.
 */
export default function RcLandingPage() {
  return (
    <>
      <Link
        href="/"
        aria-label="ITD Global — home"
        className="fixed left-5 top-5 z-50"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/itd/itd-global-logo.webp"
          alt="ITD Global"
          className="h-8 w-auto drop-shadow"
        />
      </Link>

      <ParcelUnboxHero bleedNav={false} />

      <ClosingCTA
        headline="Every carrier. Every mode. One platform."
        subtitle="See what you'd save with Connexx — compare your current carrier mix against the live rate engine. No card, no call, no obligation."
        primaryCta={{ label: "Get Quote", href: "/rate-checker/domestic" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
