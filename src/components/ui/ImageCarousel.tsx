"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  /** CSS aspect ratio for the frame. Default "4 / 3". */
  aspect?: string;
  /** Auto-advance interval in ms. Default 5000. Set 0 to disable. */
  autoAdvanceMs?: number;
  /** `sizes` attribute passed to next/image. */
  sizes?: string;
  className?: string;
}

/**
 * Reusable image carousel — crossfade between slides, auto-advance with
 * hover/focus pause, arrow + dot controls. Disables auto-advance and crossfade
 * under `prefers-reduced-motion`. Shared by the homepage Logistics-Partner band
 * and the About page.
 */
export default function ImageCarousel({
  images,
  aspect = "4 / 3",
  autoAdvanceMs = 5000,
  sizes = "(max-width: 1024px) 100vw, 600px",
  className = "",
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Auto-advance only while on screen and in a visible tab.
    setPageVisible(!document.hidden);
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    const el = containerRef.current;
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => setInView(entries[0]?.isIntersecting ?? false),
        { threshold: 0.2 },
      );
      io.observe(el);
    } else {
      setInView(true);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, []);

  const go = useCallback(
    (next: number) => {
      setIndex((prev) => (next + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (autoAdvanceMs <= 0 || paused || reducedMotion.current) return;
    if (!inView || !pageVisible) return;
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [autoAdvanceMs, paused, inView, pageVisible, images.length]);

  if (images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl shadow-xl ${className}`}
      style={{ aspectRatio: aspect }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="ITD Global photos"
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes}
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          {/* Arrows */}
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
