"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";

const UK: [number, number] = [54.5, -2.0];

/* Key carrier hubs — UK is the home node, rest are international lanes. */
const MARKERS: { location: [number, number]; size: number }[] = [
  { location: UK, size: 0.11 }, // UK (home)
  { location: [50.11, 8.68], size: 0.05 }, // Frankfurt
  { location: [40.42, -3.7], size: 0.04 }, // Madrid
  { location: [40.71, -74.0], size: 0.06 }, // New York
  { location: [25.2, 55.27], size: 0.05 }, // Dubai
  { location: [22.54, 114.05], size: 0.06 }, // Shenzhen
  { location: [1.35, 103.82], size: 0.05 }, // Singapore
  { location: [-33.86, 151.2], size: 0.05 }, // Sydney
];

/* Connection arcs from the UK home node out to every international lane. */
const ARCS = MARKERS.slice(1).map((m) => ({ from: UK, to: m.location }));

export default function CarrierGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const phi = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = 0;
    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.32, 0.38, 0.58],
      markerColor: [0.96, 0.72, 0.0],
      glowColor: [0.11, 0.25, 0.72],
      markers: MARKERS,
      arcs: ARCS,
      arcColor: [0.36, 0.55, 1],
      arcWidth: 0.5,
      // onRender isn't in cobe's exported type but is supported at runtime.
      onRender: (state: Record<string, number>) => {
        if (pointerInteracting.current === null && !reduce) {
          phi.current += 0.004;
        }
        state.phi = phi.current + pointerMovement.current / 200;
        state.width = width * 2;
        state.height = width * 2;
      },
    } as unknown as COBEOptions);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative h-full aspect-square select-none">
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        style={{ contain: "layout paint size" }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerMovement.current = e.clientX - pointerInteracting.current;
          }
        }}
        aria-hidden="true"
      />
    </div>
  );
}
