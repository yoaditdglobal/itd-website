"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import PeakDownloadButton from "./PeakDownloadButton";

const MAX_DEG = 6;

/**
 * The "physical report": slightly rotated cover with a soft cast shadow and a
 * blurred second page behind it. Tilts up to 6° toward the pointer on fine
 * pointers only (disabled on touch and under reduced motion). Clicking opens
 * the dialog (trigger "hero_cover").
 */
export default function PeakCoverTilt({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current =
      window.matchMedia?.("(pointer: fine)").matches &&
      !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled.current || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * MAX_DEG * 2, y: px * MAX_DEG * 2 });
  };
  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className="peak-cover"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={
        {
          "--tilt-x": `${tilt.x.toFixed(2)}deg`,
          "--tilt-y": `${tilt.y.toFixed(2)}deg`,
        } as React.CSSProperties
      }
    >
      <div className="peak-cover__page" aria-hidden />
      <PeakDownloadButton trigger="hero_cover" variant="unstyled" className="peak-cover__front">
        <Image
          src={src}
          alt={alt}
          width={560}
          height={396}
          priority
          quality={90}
          sizes="(min-width: 1024px) 560px, 90vw"
          className="peak-cover__img"
        />
      </PeakDownloadButton>
    </div>
  );
}
