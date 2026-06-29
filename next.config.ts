import type { NextConfig } from "next";

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
};

export default nextConfig;
