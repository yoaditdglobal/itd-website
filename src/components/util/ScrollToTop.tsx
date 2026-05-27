"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Forces an instant scroll-to-top on every pathname change.
 * Bypasses `html { scroll-behavior: smooth }` which would otherwise animate
 * Next.js's default scroll-to-top after navigation (reads as a "broken"
 * scroll-up after each link click). Anchor/hash navigation remains smooth.
 *
 * Renders nothing.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip on initial mount — the browser handles initial scroll position
    // (and skipping prevents a jarring jump if the user landed deep-linked).
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    if (typeof window === "undefined") return;
    // If the URL contains a hash, let the browser's hash-scroll behaviour win
    // (it correctly uses scroll-padding-top: 88px for the navbar offset).
    if (window.location.hash) return;

    // Bypass scroll-behavior: smooth with an explicit instant scroll.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
