"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

/* WebGL globe — client-only, lazy-loaded. SVG globe shows as the fallback while
   the canvas chunk loads (and on no-WebGL). */
const CarrierGlobe = dynamic(() => import("@/components/sections/CarrierGlobe"), {
  ssr: false,
  loading: () => <Globe reduce />,
});

/* ── shared bits ───────────────────────────────────────────────────────── */

const YELLOW = "#F5B700";

function Arc({
  id,
  d,
  dur,
  reverse,
  reduce,
  colorClass = "text-accent",
  stroke,
  width = 1.5,
}: {
  id: string;
  d: string;
  dur: number;
  reverse?: boolean;
  reduce: boolean;
  colorClass?: string;
  stroke?: string;
  width?: number;
}) {
  const strokeProps = stroke ? { stroke } : { stroke: "currentColor" };
  return (
    <g className={stroke ? undefined : colorClass}>
      <path
        id={id}
        d={d}
        fill="none"
        {...strokeProps}
        strokeWidth={width}
        strokeOpacity={0.5}
        strokeLinecap="round"
        className={reduce ? undefined : "net-flow"}
      />
      {!reduce && (
        <polygon points="-4,-3 5,0 -4,3" {...strokeProps} fill={stroke ?? "currentColor"} stroke="none">
          <animateMotion
            dur={`${dur}s`}
            repeatCount="indefinite"
            rotate="auto"
            keyPoints={reverse ? "1;0" : "0;1"}
            keyTimes="0;1"
            calcMode="linear"
          >
            <mpath href={`#${id}`} />
          </animateMotion>
        </polygon>
      )}
    </g>
  );
}

function Node({ x, y, r = 4, colorClass = "text-accent", reduce }: { x: number; y: number; r?: number; colorClass?: string; reduce: boolean }) {
  return (
    <g className={colorClass}>
      <circle cx={x} cy={y} r={r + 4} fill="currentColor" opacity={0.16} className={reduce ? undefined : "net-pulse"} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <circle cx={x} cy={y} r={r} fill="currentColor" />
      <circle cx={x} cy={y} r={r} fill="none" stroke="#fff" strokeOpacity={0.25} />
    </g>
  );
}

/* ── International: wireframe globe ─────────────────────────────────────── */

function Globe({ reduce }: { reduce: boolean }) {
  const S = { x: 104, y: 96 }; // source (≈ UK on the sphere)
  const dests = [
    { x: 206, y: 82 },
    { x: 214, y: 176 },
    { x: 86, y: 206 },
    { x: 58, y: 116 },
    { x: 176, y: 58 },
  ];
  const arcs = [
    `M${S.x},${S.y} Q160,18 ${dests[0].x},${dests[0].y}`,
    `M${S.x},${S.y} Q236,118 ${dests[1].x},${dests[1].y}`,
    `M${S.x},${S.y} Q34,168 ${dests[2].x},${dests[2].y}`,
    `M${S.x},${S.y} Q46,72 ${dests[3].x},${dests[3].y}`,
    `M${S.x},${S.y} Q150,20 ${dests[4].x},${dests[4].y}`,
  ];
  return (
    <svg viewBox="0 0 280 280" className="h-full w-auto" role="img" aria-hidden="true">
      <defs>
        <radialGradient id="sphereGrad" cx="36%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#26356b" />
          <stop offset="55%" stopColor="#141b2e" />
          <stop offset="100%" stopColor="#0a0e1c" />
        </radialGradient>
        <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="rgba(29,63,184,0)" />
          <stop offset="100%" stopColor="rgba(29,63,184,0.35)" />
        </radialGradient>
      </defs>

      {/* sphere */}
      <circle cx="140" cy="140" r="98" fill="url(#sphereGlow)" />
      <circle cx="140" cy="140" r="96" fill="url(#sphereGrad)" />

      {/* latitudes (static) */}
      <g className="text-accent" stroke="currentColor" strokeOpacity={0.14} fill="none">
        <ellipse cx="140" cy="85" rx="78" ry="10" />
        <ellipse cx="140" cy="140" rx="96" ry="14" />
        <ellipse cx="140" cy="195" rx="78" ry="10" />
      </g>
      {/* meridians (rotating → globe spin) */}
      <g className="text-accent net-spin" stroke="currentColor" strokeOpacity={0.16} fill="none" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <ellipse cx="140" cy="140" rx="96" ry="96" />
        <ellipse cx="140" cy="140" rx="64" ry="96" />
        <ellipse cx="140" cy="140" rx="32" ry="96" />
        <ellipse cx="140" cy="140" rx="6" ry="96" />
      </g>

      {/* connectivity arcs (in & out) */}
      <Arc id="g1" d={arcs[0]} dur={2.6} reduce={reduce} />
      <Arc id="g2" d={arcs[1]} dur={3.0} reverse reduce={reduce} stroke={YELLOW} />
      <Arc id="g3" d={arcs[2]} dur={2.8} reduce={reduce} />
      <Arc id="g4" d={arcs[3]} dur={3.2} reverse reduce={reduce} />
      <Arc id="g5" d={arcs[4]} dur={2.4} reduce={reduce} stroke={YELLOW} />

      {/* nodes */}
      <Node x={S.x} y={S.y} r={5} reduce={reduce} />
      {dests.map((d, i) => (
        <Node key={i} x={d.x} y={d.y} r={3.5} colorClass={i % 2 ? "text-accent" : "text-accent"} reduce={reduce} />
      ))}
    </svg>
  );
}

/* ── Domestic: UK hub-and-spoke ────────────────────────────────────────── */

function UKMap({ reduce }: { reduce: boolean }) {
  const hub = { x: 178, y: 212 }; // London
  const cities = [
    { x: 132, y: 150 }, // Manchester
    { x: 150, y: 182 }, // Birmingham
    { x: 118, y: 58 }, // Glasgow
    { x: 150, y: 74 }, // Edinburgh
    { x: 72, y: 106 }, // Belfast
    { x: 104, y: 206 }, // Cardiff
  ];
  const arc = (c: { x: number; y: number }, bow: number) => {
    const mx = (hub.x + c.x) / 2 + bow;
    const my = (hub.y + c.y) / 2 - Math.abs(bow) * 0.6 - 20;
    return `M${hub.x},${hub.y} Q${mx},${my} ${c.x},${c.y}`;
  };
  const bows = [-18, 10, -30, 12, -36, -16];
  return (
    <svg
      viewBox="0 0 280 280"
      className="h-full w-auto"
      role="img"
      aria-hidden="true"
      style={{ transform: "perspective(900px) rotateX(10deg)" }}
    >
      <defs>
        <radialGradient id="ukGlow" cx="55%" cy="60%" r="60%">
          <stop offset="0%" stopColor="rgba(29,63,184,0.20)" />
          <stop offset="100%" stopColor="rgba(29,63,184,0)" />
        </radialGradient>
        <pattern id="ukDots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.18" />
        </pattern>
      </defs>

      <ellipse cx="150" cy="150" rx="135" ry="130" fill="url(#ukGlow)" />
      {/* faint map dot-grid, clipped to a soft landmass-ish blob */}
      <g className="text-accent">
        <path
          d="M150,30 C195,40 205,90 195,130 C188,165 205,200 175,235 C150,262 120,255 105,225 C92,200 70,190 72,150 C74,110 90,95 95,70 C100,48 120,24 150,30 Z"
          fill="url(#ukDots)"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
      </g>

      {/* connectivity arcs (in & out) */}
      {cities.map((c, i) => (
        <Arc
          key={i}
          id={`uk${i}`}
          d={arc(c, bows[i])}
          dur={2.4 + (i % 3) * 0.4}
          reverse={i % 2 === 0}
          reduce={reduce}
          stroke={i % 3 === 0 ? YELLOW : undefined}
        />
      ))}

      {/* city nodes + London hub */}
      {cities.map((c, i) => (
        <Node key={i} x={c.x} y={c.y} r={3.5} reduce={reduce} />
      ))}
      <Node x={hub.x} y={hub.y} r={6} reduce={reduce} />
    </svg>
  );
}

/* ── wrapper ───────────────────────────────────────────────────────────── */

export default function CarrierNetworkMap({ region }: { region: string }) {
  const reduce = useReducedMotion() ?? false;
  const isIntl = region === "International";

  return (
    <div className="relative h-64 md:h-80 w-full flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-bg-dark via-bg-dark-card to-bg-dark">
      {/* dark stage so the globe/map read with full drama */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(circle at 50% 55%, rgba(29,63,184,0.28) 0%, transparent 60%)" }}
      />
      <div className="absolute inset-0 bg-noise opacity-[0.3] mix-blend-soft-light pointer-events-none" aria-hidden />
      <span className="sr-only">
        {isIntl ? "International carrier network" : "UK domestic carrier network"}
      </span>
      <AnimatePresence mode="wait">
        <motion.div
          key={region}
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full relative z-10"
        >
          {isIntl ? <CarrierGlobe /> : <UKMap reduce={reduce} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
