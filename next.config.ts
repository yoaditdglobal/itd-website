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
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
  "font-src 'self' data: https://cdn.fontshare.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com",
  "frame-ancestors 'none'",
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
    ];
  },

  // Baseline security headers on every route (no CORS by design — the
  // same-origin default is the secure posture for these API routes).
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
