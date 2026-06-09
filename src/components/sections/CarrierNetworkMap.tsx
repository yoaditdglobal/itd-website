"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import UKNetworkMap from "@/components/sections/UKNetworkMap";

function GlobeLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full border border-accent/30 md:h-56 md:w-56" />
    </div>
  );
}

// WebGL globe is client-only and lazy — the chunk loads only when the
// International state is shown.
const CarrierGlobe = dynamic(() => import("@/components/sections/CarrierGlobe"), {
  ssr: false,
  loading: () => <GlobeLoading />,
});

export default function CarrierNetworkMap({
  region,
}: {
  region: "Domestic" | "International";
}) {
  const reduce = useReducedMotion() ?? false;
  const isIntl = region === "International";

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 md:h-[560px]">
      {/* layered dark stage */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-bg-dark-card to-bg-dark" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 64% at 50% 42%, rgba(29,63,184,0.30) 0%, transparent 70%)",
        }}
      />
      <div className="bg-noise absolute inset-0 opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(8,10,22,0.6)]" />

      <span className="sr-only">
        {isIntl
          ? "Animated globe showing ITD Global's international carrier network, with shipping lanes arcing from the UK to hubs worldwide."
          : "Animated map of Great Britain showing ITD Global's domestic carrier network, with delivery lanes radiating from London to major UK cities."}
      </span>

      <AnimatePresence initial={false}>
        <motion.div
          key={region}
          initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduce ? 1 : 1.01 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {isIntl ? <CarrierGlobe reduce={reduce} /> : <UKNetworkMap reduce={reduce} />}
        </motion.div>
      </AnimatePresence>

      {/* region caption chip */}
      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          {!reduce && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-secondary opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-secondary" />
        </span>
        <span className="text-xs font-medium text-white/80">
          {isIntl ? "International network" : "UK network"}
        </span>
      </div>
    </div>
  );
}
