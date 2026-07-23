import type { NextConfig } from "next";

// Report-only Content Security Policy. Stage 1 of the CSP rollout: this NEVER
// blocks anything — it only surfaces violations in the browser console so we
// can confirm the allow-list before enforcing. Origins below are the ones the
// site actually calls: Google Analytics (gtag), Fontshare (display font), and
// images over https/data. `'unsafe-inline'` on script/style is intentional for
// the report-only stage (the site has inline GA + JSON-LD scripts and inline
// styles). Enforcement (renaming to `Content-Security-Policy`) is a deliberate
// later step: it requires replacing `'unsafe-inline'` with hashes for the known
// inline scripts (gtag-init + JSON-LD) — nonces are avoided because reading a
// per-request nonce in the root layout would force this static site (105
// prerendered pages) into dynamic rendering.
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.zohopublic.eu https://*.zohocdn.com https://*.zoho.eu",
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://*.zohopublic.eu https://*.zohocdn.com",
  "font-src 'self' data: https://cdn.fontshare.com https://*.zohocdn.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://*.zohopublic.eu wss://*.zohopublic.eu https://*.zoho.eu wss://*.zoho.eu",
  "frame-ancestors 'none'",
  "frame-src 'self' https://*.zohopublic.eu",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Force HTTPS for two years incl. subdomains (preload-eligible).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // The site is never meant to be framed.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
];

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 rejects any <Image quality> value not in this list with a
    // production 400 (dev only warns). SolutionHero uses quality={90}, so 90
    // must be allow-listed or every hero image breaks in production.
    qualities: [75, 90],
  },
  // Note: experimental.viewTransition was tried but breaks Next 16 client-side
  // navigation in some configurations (returns "This page couldn't load" on
  // link click). Page transitions deferred until the API stabilises.

  // The in-site Rate Checker was retired in favour of the external tool. Any
  // stale bookmark to the old routes 301s to it instead of 404ing.
  async redirects() {
    return [
      {
        source: "/rate-checker",
        destination: "https://itdglobal-ratechecker.lovable.app/",
        permanent: true,
      },
      {
        source: "/rate-checker/:path*",
        destination: "https://itdglobal-ratechecker.lovable.app/",
        permanent: true,
      },
      // The OddBalls case study was misattributed — the story is Beauty Bay's.
      // The old slug was live + sitemap-indexed, so 301 it to the new one.
      {
        source: "/resources/case-studies/oddballs",
        destination: "/resources/case-studies/beauty-bay",
        permanent: true,
      },
      // Junction 18 / Shruti Designs case study retired (removed from the
      // library). The slug was live + sitemap-indexed → send to the library.
      {
        source: "/resources/case-studies/junction-18-shruti-designs",
        destination: "/resources/case-studies",
        permanent: true,
      },
      // There is no /integrations hub page. The tech pages link to it (a
      // back-link + their breadcrumb parent), so 301 it to the tech integrations
      // landing instead of 404ing.
      {
        source: "/integrations",
        destination: "/integrations/tech",
        permanent: true,
      },
      // The Help Centre moved from /help/centre up to /help. 301 the old hub
      // and every old sub-path so bookmarks and indexed URLs don't 404.
      {
        source: "/help/centre",
        destination: "/help",
        permanent: true,
      },
      {
        source: "/help/centre/:path*",
        destination: "/help/:path*",
        permanent: true,
      },
      // ── Old WordPress site (pre-2026 relaunch) ──────────────────────────
      // Google still indexes the old site's URLs (sitelinks incl. "Track Your
      // Parcel", "Customer Login", "E-Commerce Fulfilment") and they all 404
      // on the new site. 301 every old family to its closest new equivalent
      // so link equity transfers and the stale sitelinks refresh on recrawl.
      // Inventory sourced from the Wayback Machine (2025+ captures).
      // Specific rules must precede their :path* catch-alls (array order wins).
      { source: "/track-your-parcel", destination: "/track", permanent: true },
      { source: "/customer-login", destination: "https://connexx.co.uk/", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/:path*", destination: "/contact", permanent: true },
      { source: "/our-services/e-commerce", destination: "/solutions/ecommerce", permanent: true },
      { source: "/our-services/freight", destination: "/shipping/freight", permanent: true },
      { source: "/our-services/parcel", destination: "/shipping/domestic", permanent: true },
      { source: "/our-services", destination: "/shipping", permanent: true },
      { source: "/our-services/:path*", destination: "/shipping", permanent: true },
      { source: "/knowledge-hub", destination: "/resources/guides", permanent: true },
      { source: "/knowledge-hub/:path*", destination: "/resources/guides", permanent: true },
      { source: "/our-customers/case-studies", destination: "/resources/case-studies", permanent: true },
      { source: "/our-customers/industries", destination: "/solutions", permanent: true },
      { source: "/our-customers/industries/:path*", destination: "/solutions", permanent: true },
      { source: "/our-customers", destination: "/resources/case-studies", permanent: true },
      { source: "/our-customers/:path*", destination: "/resources/case-studies", permanent: true },
      { source: "/our-company", destination: "/about", permanent: true },
      { source: "/our-company/:path*", destination: "/about", permanent: true },
      { source: "/our-story", destination: "/about", permanent: true },
      { source: "/why-itd", destination: "/about", permanent: true },
      { source: "/careers", destination: "/about", permanent: true },
      { source: "/our-partners", destination: "/integrations/carriers", permanent: true },
      { source: "/our-partners/:path*", destination: "/integrations/carriers", permanent: true },
      { source: "/faqs", destination: "/help", permanent: true },
      { source: "/terms-conditions", destination: "/terms-of-service", permanent: true },
    ];
  },

  // Baseline security headers on every route (no CORS by design — the
  // same-origin default is the secure posture for these API routes).
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
