import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
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
    <html lang="en-GB" className={`${inter.variable} h-full antialiased`}>
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
        <ScrollToTop />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <QueryProvider>
          <MotionProvider>
            <Navbar />
            <main className="flex-1 pt-[72px]">{children}</main>
            <Footer />
          </MotionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
