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
};

export default nextConfig;
