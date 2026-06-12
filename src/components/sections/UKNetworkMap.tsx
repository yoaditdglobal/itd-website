"use client";

import { UK_PATH, UK_CITIES, type UKCity } from "@/lib/uk-geo";

/* The real Britain outline (projected at build time) lives in 0..380 × 0..480.
   We render into a wider viewBox so the country sits centred with breathing
   room either side for the "circuit" margins and outbound gateway traces. */
const VIEW = { x: -130, y: 0, w: 640, h: 480 };
const CENTER = { x: 190, y: 210 };

const HUB: UKCity = UK_CITIES.find((c) => c.hub) ?? UK_CITIES[0];
const SPOKES: UKCity[] = UK_CITIES.filter((c) => c !== HUB);

/** Quadratic-bowed lane from the hub to a city. */
function lanePath(a: UKCity, b: UKCity): { d: string; len: number } {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const bow = Math.min(34, len * 0.24);
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return { d: `M${a.x},${a.y} Q${cx.toFixed(1)},${cy.toFixed(1)} ${b.x},${b.y}`, len };
}

/** Decorative outbound "gateway" traces in the margins — links to the wider network. */
const GATEWAYS: { x: number; y: number }[] = [
  { x: -98, y: 150 },
  { x: -84, y: 322 },
  { x: 472, y: 176 },
  { x: 452, y: 350 },
];

export default function UKNetworkMap({ reduce = false }: { reduce?: boolean }) {
  const lanes = SPOKES.map((c) => ({ city: c, ...lanePath(HUB, c) }));
  const gateways = GATEWAYS.map((g) =>
    lanePath(HUB, { name: "", x: g.x, y: g.y }),
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        className="h-[94%] w-auto max-w-none"
        aria-hidden
      >
        <defs>
          <linearGradient id="uk-stroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f74ff" />
            <stop offset="55%" stopColor="#2f55e0" />
            <stop offset="100%" stopColor="#e8893f" />
          </linearGradient>
          <linearGradient id="uk-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(58,95,230,0.16)" />
            <stop offset="100%" stopColor="rgba(58,95,230,0.05)" />
          </linearGradient>
          <radialGradient id="uk-bg-glow" cx="50%" cy="44%" r="60%">
            <stop offset="0%" stopColor="rgba(47,85,224,0.34)" />
            <stop offset="60%" stopColor="rgba(47,85,224,0.06)" />
            <stop offset="100%" stopColor="rgba(47,85,224,0)" />
          </radialGradient>
          <radialGradient id="uk-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232,137,63,0.95)" />
            <stop offset="100%" stopColor="rgba(232,137,63,0)" />
          </radialGradient>
          <linearGradient id="uk-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(120,160,255,0)" />
            <stop offset="100%" stopColor="rgba(120,160,255,0.5)" />
          </linearGradient>
          <filter id="uk-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern
            id="uk-dots"
            width="13"
            height="13"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.1" cy="1.1" r="1.1" fill="rgba(120,150,235,0.16)" />
          </pattern>
          <clipPath id="uk-clip">
            <path d={UK_PATH} />
          </clipPath>
        </defs>

        {/* focal glow + circuit-dot field across the whole canvas */}
        <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} fill="url(#uk-bg-glow)" />
        <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} fill="url(#uk-dots)" opacity="0.55" />

        {/* outbound gateway traces in the margins */}
        <g fill="none">
          {gateways.map((g, i) => (
            <g key={`gw-${i}`}>
              <path d={g.d} stroke="rgba(90,125,235,0.22)" strokeWidth="0.8" />
              {!reduce && (
                <path
                  d={g.d}
                  stroke="rgba(140,175,255,0.7)"
                  strokeWidth="1"
                  strokeDasharray="3 10"
                  className="net-flow"
                />
              )}
            </g>
          ))}
          {GATEWAYS.map((g, i) => (
            <g key={`gwn-${i}`}>
              <circle cx={g.x} cy={g.y} r="3" fill="none" stroke="rgba(140,175,255,0.55)" strokeWidth="0.8" />
              <circle cx={g.x} cy={g.y} r="1.4" fill="#8cb0ff" />
            </g>
          ))}
        </g>

        {/* landmass — subtle fill + glowing coastline */}
        <path d={UK_PATH} fill="url(#uk-fill)" />
        {/* circuit texture inside the country */}
        <g clipPath="url(#uk-clip)">
          <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} fill="url(#uk-dots)" opacity="0.9" />
          {!reduce && (
            <g
              className="net-sweep"
              style={{ transformBox: "view-box", transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            >
              <path
                d={`M${CENTER.x},${CENTER.y} L${CENTER.x + 300},${CENTER.y - 120} A320 320 0 0 1 ${CENTER.x + 300},${CENTER.y + 120} Z`}
                fill="url(#uk-sweep)"
                opacity="0.5"
              />
            </g>
          )}
        </g>
        <path
          d={UK_PATH}
          fill="none"
          stroke="url(#uk-stroke)"
          strokeWidth="2.6"
          strokeLinejoin="round"
          filter="url(#uk-glow)"
          opacity="0.65"
        />
        <path
          d={UK_PATH}
          fill="none"
          stroke="url(#uk-stroke)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* lanes: hub ↔ city, with flowing dash + travelling pulse */}
        <g fill="none">
          {lanes.map((l, i) => {
            const dur = (1.3 + l.len / 90).toFixed(2);
            return (
              <g key={`lane-${l.city.name}`}>
                <path id={`uk-lane-${i}`} d={l.d} stroke="rgba(90,125,235,0.28)" strokeWidth="1" />
                {!reduce && (
                  <>
                    <path
                      d={l.d}
                      stroke="rgba(150,180,255,0.85)"
                      strokeWidth="1.4"
                      strokeDasharray="5 9"
                      className="net-flow"
                    />
                    <circle r="3.4" fill="url(#uk-node-glow)">
                      <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto">
                        <mpath href={`#uk-lane-${i}`} />
                      </animateMotion>
                    </circle>
                    <circle r="1.5" fill="#ffffff">
                      <animateMotion dur={`${dur}s`} repeatCount="indefinite">
                        <mpath href={`#uk-lane-${i}`} />
                      </animateMotion>
                    </circle>
                  </>
                )}
              </g>
            );
          })}
        </g>

        {/* city nodes + hover labels */}
        <g>
          {UK_CITIES.map((c) => {
            const r = c.hub ? 4.4 : 2.9;
            const labelW = c.name.length * 5.4 + 14;
            return (
              <g key={c.name} className="group">
                <circle cx={c.x} cy={c.y} r="13" fill="transparent" />
                {!reduce && (
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={c.hub ? 8 : 6}
                    fill="url(#uk-node-glow)"
                    className="net-pulse"
                  />
                )}
                <circle cx={c.x} cy={c.y} r={r} fill={c.hub ? "#e8893f" : "#7aa0ff"} />
                <circle cx={c.x} cy={c.y} r={r} fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="0.7" />
                <g className="pointer-events-none opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <rect
                    x={c.x - labelW / 2}
                    y={c.y - 27}
                    width={labelW}
                    height="16"
                    rx="3"
                    fill="#0e1222"
                    stroke="#ffffff"
                    strokeOpacity="0.14"
                  />
                  <text
                    x={c.x}
                    y={c.y - 15.5}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill="#eaf0ff"
                  >
                    {c.name}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
