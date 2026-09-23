"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Renders the global site chrome (nav + footer + Zoho SalesIQ chat) around the page, EXCEPT
 * on immersive routes (e.g. the standalone cinematic landing page at /rc), which
 * are shown full-bleed with no nav/footer/chat and no top padding.
 */
const IMMERSIVE = ["/rc"];

// Zoho SalesIQ chat — temporarily disabled on request. Flip to `true` to
// re-enable; the embed + CSP allowlist are left in place so it comes straight
// back with no other changes.
const CHAT_ENABLED = false;

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
      <Navbar />
      <main id="main-content" className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      {/* Zoho SalesIQ chat widget. Canonical two-part embed: the init defines
          window.$zoho before the widget bundle loads; both run after hydration
          so they never block first paint. The bot, operators and appearance are
          configured in the Zoho SalesIQ console and served live for this widget
          code — no site change is needed when those are updated there. */}
      {CHAT_ENABLED ? (
        <>
          <Script id="zsiqinit" strategy="afterInteractive">
            {`window.$zoho = window.$zoho || {};
window.$zoho.salesiq = window.$zoho.salesiq || { ready: function () {} };`}
          </Script>
          <Script
            id="zsiqscript"
            src="https://salesiq.zohopublic.eu/widget?wc=siq42d4b24a5cfcd3ce5cfd0120d26fca9f565a0a51a015874f3c450ea900dac9ae"
            strategy="afterInteractive"
          />
        </>
      ) : null}
    </>
  );
}
