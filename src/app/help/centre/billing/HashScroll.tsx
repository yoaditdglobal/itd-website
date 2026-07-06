"use client";

import { useEffect } from "react";

/**
 * Scrolls to `location.hash` on arrival and on hash change. Needed because
 * cross-page deep links (e.g. Help search → /help/centre/billing#faq) race the
 * page-enter animation + Next's post-navigation scroll reset — same pattern as
 * ClaimsIndex/GlossaryIndex, minus the filter toolbar.
 */
export default function HashScroll() {
  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;

    const jump = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
    };

    const assert = () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(jump);
      timers = [setTimeout(jump, 140), setTimeout(jump, 360)];
    };

    assert();
    window.addEventListener("hashchange", assert);
    return () => {
      window.removeEventListener("hashchange", assert);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
