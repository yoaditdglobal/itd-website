"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping, inline video used in place of a GIF for feature animations —
 * far lighter than a GIF and, unlike a GIF, it honours `prefers-reduced-motion`:
 * reduced-motion viewers see the poster frame and the clip never autoplays.
 * No `autoPlay` attribute is set; playback is started from JS only when motion
 * is allowed, so no-JS / reduced-motion users get a still poster.
 */
export default function AutoplayVideo({
  mp4,
  webm,
  poster,
  className,
  ariaLabel,
}: {
  mp4: string;
  webm?: string;
  poster: string;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        v.pause();
        v.currentTime = 0;
      } else {
        void v.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={ariaLabel}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
