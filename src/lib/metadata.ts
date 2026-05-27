import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  OG_LOCALE,
} from "./site-config";

type BuildMetadataInput = {
  /** Page title without site suffix. e.g. "eCommerce shipping" */
  title: string;
  /** ~140-155 char meta description. */
  description: string;
  /** Path only, e.g. "/solutions/ecommerce". Sets canonical and og:url. */
  path: string;
  /**
   * Optional override for og:image. If omitted, Next 16's opengraph-image.tsx
   * file convention auto-discovers the closest image (root default lives at
   * src/app/opengraph-image.tsx — per-page overrides go in each route segment).
   */
  image?: string;
  /** Optional keywords for the legacy meta keywords tag (low SEO value, harmless). */
  keywords?: string[];
  /** Set true for pages that should not be indexed (e.g. internal/preview). */
  noindex?: boolean;
};

/**
 * Build a consistent Metadata object for any page.
 * Use in every page.tsx to ensure canonical, OG, Twitter, and robots are set.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  keywords,
  noindex,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  // Only override images if an explicit image was passed. Otherwise rely on
  // Next 16's opengraph-image.tsx file convention to auto-inject the right one.
  const imageBlock = image
    ? { images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }] }
    : {};
  const twitterImageBlock = image ? { images: [image] } : {};

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE,
      type: "website",
      ...imageBlock,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...twitterImageBlock,
    },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
  };
}

/**
 * Root layout uses this. Pages call buildMetadata directly with their own path.
 * No image set here — the file convention at src/app/opengraph-image.tsx is
 * auto-discovered and used as the site-wide default.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Multi-Carrier Shipping & Customs Automation`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: OG_LOCALE,
    title: `${SITE_NAME} — Multi-Carrier Shipping & Customs Automation`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Multi-Carrier Shipping & Customs Automation`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};
