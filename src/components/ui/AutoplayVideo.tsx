"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping, inline video used in place of a GIF for feature animations —
 * far lighter than a GIF and, unlike a GIF, it honours `prefers-reduced-motion`:
 * reduced-motion viewers see the poster frame and the clip never autoplays.
 * No `autoPlay` attribute is set; playback is started from JS only when motion
 * is allowed, so no-JS / reduced-motion users get a still poster.
 *
 * The mp4 source is listed FIRST on purpose. Several of the exported webm
 * renders are VP9 Profile 1 / gbrp (RGB), which iOS Safari claims it can play
 * (video/webm) but cannot decode — the element goes blank and never starts.
 * H.264 mp4 decodes everywhere, and the mp4 exports are the same size or
 * smaller than their webm siblings, so mp4-first costs nothing. Do not
 * reorder the sources back.
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
    const tryPlay = () => {
      if (!mq.matches && v.paused) void v.play().catch(() => {});
    };
    const apply = () => {
      if (mq.matches) {
        v.pause();
        v.currentTime = 0;
      } else {
        tryPlay();
      }
    };
    apply();
    mq.addEventListener("change", apply);
    // A single play() on mount can be dropped on mobile (data not yet loaded,
    // element offscreen, momentary OS throttling) — retry when the media
    // becomes playable and when the element scrolls into view.
    v.addEventListener("canplay", tryPlay);
    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) tryPlay();
        },
        { threshold: 0.1 },
      );
      io.observe(v);
    }
    return () => {
      mq.removeEventListener("change", apply);
      v.removeEventListener("canplay", tryPlay);
      io?.disconnect();
    };
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
      <source src={mp4} type="video/mp4" />
      {webm && <source src={webm} type="video/webm" />}
    </video>
  );
}
