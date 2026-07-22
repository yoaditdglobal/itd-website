import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import SiteChrome from "@/components/layout/SiteChrome";
import { QueryProvider } from "@/components/providers/QueryProvider";
import ScrollToTop from "@/components/util/ScrollToTop";
import { rootMetadata } from "@/lib/metadata";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Cabinet Grotesk (display face) — self-hosted via next/font/local (CWV:
// replaces the render-blocking Fontshare stylesheet + two third-party
// origins; woff2s are same-origin, preloaded, and inlined as @font-face).
// Source files downloaded from Fontshare (ITF Free Font License).
const cabinetGrotesk = localFont({
  src: [
    { path: "../fonts/cabinet-grotesk-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cabinet-grotesk-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior: Next 16 no longer overrides `scroll-behavior:
    // smooth` during SPA navigations by default — without this attribute every
    // route change animates a scroll-to-top instead of jumping instantly.
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cabinetGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Google Analytics 4 — gtag.js */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V31LJTEG1R"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V31LJTEG1R');
          `}
        </Script>
        <ScrollToTop />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <QueryProvider>
          <SiteChrome>{children}</SiteChrome>
        </QueryProvider>
      </body>
    </html>
  );
}
