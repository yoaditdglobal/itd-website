"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PeakDownloadButton from "./PeakDownloadButton";
import { usePeakGate } from "./PeakProvider";

/**
 * Mobile-only bottom bar. Portaled to <body>: the page template's `.page-enter`
 * animation leaves a persistent `transform` on the page wrapper, which would
 * make a `position: fixed` element inside it pin to the wrapper, not the
 * viewport. Appears once the hero has scrolled out; hides while the dialog is
 * open or the FAQ download button is on screen.
 */
export default function PeakStickyCta({ label }: { label: string }) {
  const { dialogOpen } = usePeakGate();
  const [mounted, setMounted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [faqCtaVisible, setFaqCtaVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof IntersectionObserver === "undefined") return;
    const hero = document.querySelector("[data-peak-hero]");
    const faqCta = document.querySelector("[data-peak-faq-cta]");
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), {
        threshold: 0,
      });
      io.observe(hero);
      observers.push(io);
    }
    if (faqCta) {
      const io = new IntersectionObserver(([e]) => setFaqCtaVisible(e.isIntersecting), {
        threshold: 0,
      });
      io.observe(faqCta);
      observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (!mounted) return null;

  const visible = !heroVisible && !faqCtaVisible && !dialogOpen;

  return createPortal(
    <div
      className={`peak-tokens peak-sticky${visible ? " is-visible" : ""}`}
      data-analytics-location="peak_sticky"
      aria-hidden={!visible}
    >
      <PeakDownloadButton trigger="sticky" variant="yellow" className="w-full">
        {label}
      </PeakDownloadButton>
    </div>,
    document.body,
  );
}
