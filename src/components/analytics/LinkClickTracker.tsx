"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * Site-wide link click tracking.
 *
 * Mounted once in SiteChrome. Uses a single delegated listener rather than
 * instrumenting every Button / nav item, so no existing component has to change
 * and nothing can be missed when new CTAs are added.
 *
 * Fires `cta_click` with:
 *   link_text     — the visible label, trimmed and capped
 *   link_url      — internal path, or host + path for external links
 *   link_location — where on the page the link sits (nav / footer / closing_cta / hero / body)
 *   page_path     — the page the click happened ON (GA4's own page_location is
 *                   the same thing, but having it as a plain param makes the
 *                   Looker Studio "which pages send people to Contact Sales"
 *                   breakdown a one-dimension job)
 *
 * Location is read from the nearest `data-analytics-location` ancestor when one
 * exists, so a section can name itself explicitly; otherwise it falls back to
 * nav / footer / body by element ancestry.
 */

/** Destinations that represent a lead intent, used to tag the click. */
const LEAD_PATHS = ["/contact"];

function resolveLocation(anchor: HTMLAnchorElement): string {
  const named = anchor.closest<HTMLElement>("[data-analytics-location]");
  if (named?.dataset.analyticsLocation) return named.dataset.analyticsLocation;
  if (anchor.closest("nav, header")) return "nav";
  if (anchor.closest("footer")) return "footer";
  return "body";
}

function resolveUrl(anchor: HTMLAnchorElement): string | null {
  const raw = anchor.getAttribute("href");
  if (!raw) return null;
  // Ignore in-page anchors, mailto and tel — they are not navigation.
  if (raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) {
    return null;
  }
  try {
    const url = new URL(raw, window.location.origin);
    return url.host === window.location.host
      ? url.pathname + url.search
      : url.host + url.pathname;
  } catch {
    return raw;
  }
}

export default function LinkClickTracker() {
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;

      const linkUrl = resolveUrl(anchor);
      if (!linkUrl) return;

      const linkText = (anchor.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100);

      track("cta_click", {
        link_text: linkText || "(no text)",
        link_url: linkUrl,
        link_location: resolveLocation(anchor),
        page_path: pathname,
        is_lead_cta: LEAD_PATHS.some((p) => linkUrl.startsWith(p)),
      });
    };

    // Capture phase so the event is recorded even when a handler higher up
    // stops propagation or the router navigates away immediately.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}
