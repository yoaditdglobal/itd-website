"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import IntegrationLogo from "@/components/ui/IntegrationLogo";
import CaseStudyHoverCard, {
  type CaseStudyPreview,
} from "./CaseStudyHoverCard";

const CARD_WIDTH = 288; // matches w-72
const GAP = 10;
const EST_CARD_HEIGHT = 200; // rough — only decides above/below placement
const CLOSE_DELAY = 120;

interface Coords {
  left: number;
  top?: number;
  bottom?: number;
}

/**
 * A "Used by" customer logo. The tile itself is a link to the case study (so
 * touch + keyboard reach the story directly). On hover-capable devices, hovering
 * or focusing also opens a floating case-study preview, portaled to <body> so it
 * escapes the card's bounds and never nests inside the card-wide solution link.
 */
export default function UsedByChip({ cs }: { cs: CaseStudyPreview }) {
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverCapable = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // drives the enter transition
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    setMounted(true);
    hoverCapable.current =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(hover: hover)").matches;
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openNow = useCallback(() => {
    if (!hoverCapable.current) return;
    cancelClose();
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const left = Math.max(
      12,
      Math.min(
        r.left + r.width / 2 - CARD_WIDTH / 2,
        window.innerWidth - CARD_WIDTH - 12,
      ),
    );
    // Prefer above the chip; flip below if there isn't room.
    if (r.top > EST_CARD_HEIGHT + GAP) {
      setCoords({ left, bottom: window.innerHeight - r.top + GAP });
    } else {
      setCoords({ left, top: r.bottom + GAP });
    }
    setOpen(true);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, [cancelClose]);

  // Entrance transition: mount hidden, then reveal on the next frame.
  useEffect(() => {
    if (!open) {
      setShown(false);
      return;
    }
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Close on Escape, and on scroll (the fixed card would detach from the chip).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onScroll = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  return (
    <>
      <Link
        ref={triggerRef}
        href={`/resources/case-studies/${cs.slug}`}
        aria-label={`${cs.brandName} — read case study`}
        className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-border bg-white p-1 transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") openNow();
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") scheduleClose();
        }}
        onFocus={openNow}
        onBlur={scheduleClose}
      >
        <IntegrationLogo name={cs.brandName} logo={cs.logo} size="xs" />
      </Link>

      {mounted &&
        open &&
        coords &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: coords.left,
              top: coords.top,
              bottom: coords.bottom,
              zIndex: 60,
            }}
            onPointerEnter={cancelClose}
            onPointerLeave={scheduleClose}
          >
            <div
              className={`transition duration-150 ease-out motion-reduce:transition-none ${
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
            >
              <CaseStudyHoverCard cs={cs} />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
