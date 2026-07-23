// Single source of truth for site-wide constants used in SEO, JSON-LD,
// sitemap, robots, and OpenGraph metadata.
// Update SITE_URL when the production domain is confirmed.

export const SITE_URL = "https://itdglobal.com";
export const SITE_NAME = "ITD Global";

// The Rate Checker now lives as an external tool. Every quote/rate CTA points
// here; Button auto-opens external (http/https) hrefs in a new tab.
export const RATE_CHECKER_URL = "https://itdglobal-ratechecker.lovable.app/";
export const SITE_TAGLINE = "Smarter Shipping for a Simpler Tomorrow.";
export const SITE_DESCRIPTION =
  "ITD Global is the multi-carrier shipping platform for UK retailers, eCommerce brands, marketplace sellers, 3PLs, and exporters. Connexx routes every parcel through the cheapest compliant carrier, automates customs, and gives you one dashboard for every dispatch.";

// Registered company name; trades as "ITD Global" (the public brand = SITE_NAME).
export const ORG_LEGAL_NAME = "Interdelta Ltd";
export const ORG_FOUNDING_DATE = "2004"; // user-confirmed founding year
export const ORG_FOUNDING_LOCATION = "United Kingdom";
export const ORG_AREA_SERVED = ["United Kingdom", "European Union", "Worldwide"];
export const ORG_CONTACT = {
  email: "hello@itdglobal.com",
  url: `${SITE_URL}/contact`,
};
export const ORG_SAMEAS: string[] = [
  "https://www.linkedin.com/company/itd-global",
];

/**
 * Topical-authority signal for the Organization entity (schema.org knowsAbout).
 * These are the domains ITD demonstrably operates in — used by AI/search to
 * associate the entity with the right subject areas.
 */
export const ORG_KNOWS_ABOUT = [
  "Multi-carrier shipping",
  "Parcel delivery and courier services",
  "Customs clearance and automation",
  "Cross-border eCommerce fulfilment",
  "Third-party logistics (3PL)",
  "Freight and pallet shipping",
  "Carrier rate comparison and management",
  "Shipping label generation and dispatch",
  "Order tracking",
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
  { path: "/integrations/ecommerce-logistics", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/integrations/marketplaces", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/integrations/carriers/royal-mail", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/integrations/carriers/dpd", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/integrations/carriers/evri", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/integrations/carriers/dhl", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/integrations/carriers/amazon-shipping", priority: 0.75, changeFrequency: "monthly" as const },

  // Resources
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/resources/case-studies", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/resources/case-studies/tatti-lashes", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/west-ham-united", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/delta-fulfilment", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/arlo-fulfilment", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/home-bargains", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/rioz-global", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/pb-fulfilment", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/sainsburys-argos", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/freedom-fire", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/beauty-bay", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/saime-trading", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/sifcon-international", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/cummins", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/regatta", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/lifetime-brands", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/wenrit-global", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/case-studies/red-label", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/guides", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/resources/guides/3pl-partnership", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/guides/freight-services", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/guides/far-east-imports", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/guides/fbm", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/resources/glossary", priority: 0.7, changeFrequency: "weekly" as const },

  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },

  // Legal
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" as const },

  // Help
  { path: "/help", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/help/integrations", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/help/integrations/shopify", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/help/integrations/ebay", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/help/integrations/tiktok", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/help/integrations/selro", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/help/integrations/linnworks", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/help/integrations/veeqo", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/help/submit-request", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/help/developers", priority: 0.7, changeFrequency: "weekly" as const },
];
