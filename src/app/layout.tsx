import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Cabinet Grotesk (Fontshare) — display face for all .text-display-* and .text-heading-*.
            Preconnect + preload the stylesheet to remove render-blocking on first paint. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="preload"
          as="style"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700&display=swap"
        />
      </head>
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
          <Navbar />
          <main className="flex-1 pt-[72px]">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
