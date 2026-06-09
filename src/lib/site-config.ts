// Single source of truth for site-wide constants used in SEO, JSON-LD,
// sitemap, robots, and OpenGraph metadata.
// Update SITE_URL when the production domain is confirmed.

export const SITE_URL = "https://itdglobal.com";
export const SITE_NAME = "ITD Global";
export const SITE_TAGLINE = "Smarter Shipping for a Simpler Tomorrow.";
export const SITE_DESCRIPTION =
  "ITD Global is the multi-carrier shipping platform for UK retailers, eCommerce brands, marketplace sellers, 3PLs, and exporters. Connexx routes every parcel through the cheapest compliant carrier, automates customs, and gives you one dashboard for every dispatch.";

export const ORG_LEGAL_NAME = "ITD Global";
export const ORG_FOUNDING_LOCATION = "United Kingdom";
export const ORG_AREA_SERVED = ["United Kingdom", "European Union", "Worldwide"];
export const ORG_CONTACT = {
  email: "hello@itdglobal.com",
  url: `${SITE_URL}/contact`,
};
export const ORG_SAMEAS: string[] = [
  // Add real LinkedIn / X / company directory URLs when confirmed.
  // "https://www.linkedin.com/company/itd-global",
  // "https://twitter.com/itdglobal",
];

/**
 * OG image: Next 16's opengraph-image.tsx file convention at src/app/opengraph-image.tsx
 * auto-generates the site-wide default at build time. Per-page overrides drop a
 * route-segment opengraph-image.tsx (e.g. src/app/solutions/ecommerce/opengraph-image.tsx).
 * No static OG image is referenced from this file by default.
 */
export const OG_LOCALE = "en_GB";

/** All routes that should appear in sitemap.xml + llms.txt. */
export const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/connexx", priority: 0.95, changeFrequency: "weekly" as const },

  // Solutions
  { path: "/solutions/enterprise", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/solutions/small-business", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/solutions/ecommerce", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/solutions/marketplace-seller", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/solutions/3pl", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/solutions/b2b", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/solutions/export", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/solutions/import", priority: 0.9, changeFrequency: "monthly" as const },

  // Shipping
  { path: "/shipping/domestic", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/shipping/international", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/shipping/freight", priority: 0.8, changeFrequency: "monthly" as const },

  // Integrations
  { path: "/integrations/carriers", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/integrations/tech", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/integrations/erp-wms", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/integrations/ecommerce", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/integrations/logistics", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/integrations/marketplaces", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/integrations/carriers/royal-mail", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/integrations/carriers/dpd", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/integrations/carriers/evri", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/integrations/carriers/dhl", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/integrations/carriers/amazon-shipping", priority: 0.75, changeFrequency: "monthly" as const },

  // Resources
  { path: "/resources/case-studies", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/resources/case-studies/tatti-lashes", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/west-ham-united", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/delta-fulfilment", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/arlo-fulfilment", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/home-bargains", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/rioz-global", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/guides", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/resources/guides/far-east-imports", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/guides/fbm", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/glossary", priority: 0.7, changeFrequency: "weekly" as const },

  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },

  // Help
  { path: "/help", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/help/centre", priority: 0.55, changeFrequency: "weekly" as const },
  { path: "/help/submit-request", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/help/developers", priority: 0.7, changeFrequency: "weekly" as const },
];
