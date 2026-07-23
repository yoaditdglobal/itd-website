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
      <Navbar />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      {/* Zoho SalesIQ chat widget. Canonical two-part embed: the init defines
          window.$zoho before the widget bundle loads; both run after hydration
          so they never block first paint. The bot, operators and appearance are
          configured in the Zoho SalesIQ console and served live for this widget
          code — no site change is needed when those are updated there. */}
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
  );
}
