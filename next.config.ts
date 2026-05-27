import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: experimental.viewTransition was tried but breaks Next 16 client-side
  // navigation in some configurations (returns "This page couldn't load" on
  // link click). Page transitions deferred until the API stabilises.
};

export default nextConfig;
