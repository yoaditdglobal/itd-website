"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LinkClickTracker from "@/components/analytics/LinkClickTracker";

/**
 * Renders the global site chrome (nav + footer) around the page, EXCEPT
 * on immersive routes (e.g. the standalone cinematic landing page at /rc), which
 * are shown full-bleed with no nav/footer and no top padding.
 */
const IMMERSIVE = ["/rc"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const immersive = IMMERSIVE.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (immersive) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {/* Skip link (WCAG 2.4.1): first tabbable element; visually hidden until
          keyboard-focused, then drops in over the nav. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-bg-dark focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>
      {/* Site-wide CTA/link click tracking (analytics only; renders no DOM). */}
      <LinkClickTracker />
      <Navbar />
      <main id="main-content" className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}
