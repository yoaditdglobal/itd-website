"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";

/** UK home node — every primary arc originates here. */
const LONDON: [number, number] = [51.5074, -0.1278];

/** Global carrier hubs (lat, lng). London first → rendered as the home marker. */
const HUBS: [number, number][] = [
  LONDON,
  [40.7128, -74.006], // New York
  [34.0522, -118.2437], // Los Angeles
  [43.6532, -79.3832], // Toronto
  [19.4326, -99.1332], // Mexico City
  [-23.5505, -46.6333], // São Paulo
  [-34.6037, -58.3816], // Buenos Aires
  [50.1109, 8.6821], // Frankfurt
  [48.8566, 2.3522], // Paris
  [40.4168, -3.7038], // Madrid
  [52.3676, 4.9041], // Amsterdam
  [45.4642, 9.19], // Milan
  [41.0082, 28.9784], // Istanbul
  [25.2048, 55.2708], // Dubai
  [19.076, 72.8777], // Mumbai
  [28.6139, 77.209], // Delhi
  [1.3521, 103.8198], // Singapore
  [22.3193, 114.1694], // Hong Kong
  [31.2304, 121.4737], // Shanghai
  [22.5431, 114.0579], // Shenzhen
  [35.6762, 139.6503], // Tokyo
  [37.5665, 126.978], // Seoul
  [-33.8688, 151.2093], // Sydney
  [-26.2041, 28.0473], // Johannesburg
  [6.5244, 3.3792], // Lagos
  [-1.2921, 36.8219], // Nairobi
];

/** Arc destinations from London + a few inter-hub lanes for network density. */
const ARC_PAIRS: [[number, number], [number, number]][] = [
  [LONDON, [40.7128, -74.006]],
  [LONDON, [50.1109, 8.6821]],
  [LONDON, [25.2048, 55.2708]],
  [LONDON, [1.3521, 103.8198]],
  [LONDON, [31.2304, 121.4737]],
  [LONDON, [22.3193, 114.1694]],
  [LONDON, [-33.8688, 151.2093]],
  [LONDON, [-23.5505, -46.6333]],
  [LONDON, [-26.2041, 28.0473]],
  [LONDON, [19.076, 72.8777]],
  [LONDON, [35.6762, 139.6503]],
  [LONDON, [34.0522, -118.2437]],
  [[25.2048, 55.2708], [1.3521, 103.8198]], // Dubai → Singapore
  [[40.7128, -74.006], [34.0522, -118.2437]], // New York → Los Angeles
  [[22.3193, 114.1694], [35.6762, 139.6503]], // Hong Kong → Tokyo
];

export default function CarrierGlobe({ reduce = false }: { reduce?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const rTarget = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let size = 0; // square side in CSS px = the stage height
    let phi = 4.2; // start with Europe / the UK facing the viewer
    let rCurrent = 0;

    const measure = () => {
      const h = parent?.clientHeight || canvas.clientHeight || 480;
      size = Math.max(220, Math.round(h));
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };
    window.addEventListener("resize", measure);
    measure();

    const opts = {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi,
      theta: 0.25,
      dark: 1.0,
      diffuse: 1.1,
      mapSamples: 24000,
      mapBrightness: 9,
      mapBaseBrightness: 0.42,
      scale: 1.0,
      baseColor: [0.5, 0.62, 0.92],
      markerColor: [0.96, 0.58, 0.32],
      glowColor: [0.7, 0.82, 1.0],
      arcColor: [0.55, 0.7, 1.0],
      arcWidth: 0.55,
      arcHeight: 0.42,
      markers: HUBS.map((location, i) => ({
        location,
        size: i === 0 ? 0.08 : 0.04,
      })),
      arcs: ARC_PAIRS.map(([from, to]) => ({ from, to })),
      onRender: (state: Record<string, number>) => {
        if (pointerInteracting.current === null && !reduce) phi += 0.0035;
        rCurrent += (rTarget.current - rCurrent) * 0.08;
        state.phi = phi + rCurrent;
        state.width = size * dpr;
        state.height = size * dpr;
      },
    };

    const globe = createGlobe(canvas, opts as unknown as COBEOptions);

    const frame = requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = e.clientX - pointerMovement.current;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  };
  const endInteract = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current === null) return;
    const delta = e.clientX - pointerInteracting.current;
    pointerMovement.current = delta;
    rTarget.current = delta / 200;
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* CSS "planet" body — guarantees a glowing globe reads on every device,
          including software-WebGL contexts where cobe's surface is sparse. On a
          real GPU, cobe's dotted Earth + arcs render over this. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          height: "84%",
          background:
            "radial-gradient(circle at 38% 30%, rgba(96,130,225,0.34), rgba(30,40,82,0.55) 50%, rgba(18,24,48,0.30) 70%, transparent 82%)",
          boxShadow:
            "0 0 80px 12px rgba(60,100,240,0.22), inset 0 0 70px rgba(120,150,255,0.12)",
        }}
      />
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerUp={endInteract}
        onPointerOut={endInteract}
        onPointerLeave={endInteract}
        onPointerMove={onPointerMove}
        aria-hidden
        className="max-w-none cursor-grab opacity-0 transition-opacity duration-1000"
      />
    </div>
  );
}
