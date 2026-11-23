"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LEAD_EVENT } from "@/lib/analytics";
import { isRateChecker, readUrlTags, savedTags, type Tags } from "./UtmPassthrough";

/**
 * First-party, cookieless analytics beacon. Posts small events to /api/v
 * (stored in Netlify Blobs, exported daily to the GTM dashboard):
 *   pv    a page view, on first load and on every client-side route change
 *   eng   the page view engaged: 10 s visible (cumulative) or scrolled 25%
 *   rc    a click on a Rate Checker link
 *   lead  a generate_lead conversion (contact form, Peak report, chat)
 * No cookies, no localStorage, no client identifiers: the server derives a
 * daily visit id. Never throws, never blocks. Mounted once in the root layout;
 * removing it, or renaming a body field, breaks the dashboard (see AGENTS.md).
 */

type Kind = "pv" | "eng" | "rc" | "lead";
type DataLayerWindow = Window & { dataLayer?: unknown[] };

const ENGAGED_MS = 10_000;
const ENGAGED_SCROLL = 0.25;
const UTM: Record<string, string> = {
  utm_source: "source",
  utm_medium: "medium",
  utm_campaign: "campaign",
  utm_content: "content",
  utm_term: "term",
};
const AD_CLICK_IDS = ["gclid", "fbclid", "li_fat_id"] as const;

// The first page view of the document: UtmPassthrough may not have saved the
// landing tags yet (effect order is not guaranteed), so read the URL as well.
let firstPage = true;
let dataLayerWrapped = false;

function visitTags(): Tags {
  const saved = savedTags();
  if (Object.keys(saved).length || !firstPage) return saved;
  return readUrlTags();
}

function send(k: Kind, f?: string) {
  try {
    const tags = visitTags();
    const u: Record<string, string> = {};
    for (const [from, to] of Object.entries(UTM)) {
      const v = tags[from as keyof Tags];
      if (typeof v === "string" && v) u[to] = v;
    }
    let r = "";
    try {
      const ref = document.referrer ? new URL(document.referrer).host : "";
      if (ref && ref !== location.host) r = ref;
    } catch {
      /* unparsable referrer */
    }
    const width = window.innerWidth;
    const body: Record<string, unknown> = {
      k,
      p: location.pathname.slice(0, 200),
      r,
      u,
      ad: AD_CLICK_IDS.some((id) => tags[id]) ? 1 : 0,
      w: width < 768 ? "m" : width < 1024 ? "t" : "d",
    };
    if (k === "lead" && f) body.f = f.slice(0, 60);
    const payload = JSON.stringify(body);
    // A string body goes as text/plain: a simple request, no CORS preflight.
    if (!navigator.sendBeacon?.("/api/v", payload)) {
      fetch("/api/v", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  } catch {
    /* analytics must never break the page */
  }
}

/** The lead event in a dataLayer entry: a GTM push or a gtag() call. */
function leadForm(entry: unknown): string | false {
  if (!entry || typeof entry !== "object") return false;
  const obj = entry as Record<string, unknown>;
  if (obj.event === LEAD_EVENT) {
    return typeof obj.form_name === "string" ? obj.form_name : "";
  }
  // gtag("event", "generate_lead", params) pushes its `arguments` object.
  if (obj[0] === "event" && obj[1] === LEAD_EVENT) {
    const params = obj[2] as Record<string, unknown> | undefined;
    return typeof params?.form_name === "string" ? params.form_name : "";
  }
  return false;
}

function wrapDataLayer() {
  if (dataLayerWrapped) return;
  try {
    const w = window as DataLayerWindow;
    w.dataLayer = w.dataLayer || [];
    const dl = w.dataLayer;
    const original = dl.push;
    dl.push = function (...items: unknown[]) {
      const result = original.apply(dl, items);
      try {
        for (const item of items) {
          const form = leadForm(item);
          if (form !== false) send("lead", form || undefined);
        }
      } catch {
        /* never interfere with the push */
      }
      return result;
    };
    dataLayerWrapped = true;
  } catch {
    /* leave the dataLayer untouched */
  }
}

export default function Beacon() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  // Rate Checker clicks and the lead wrapper: once per document.
  useEffect(() => {
    wrapDataLayer();
    const onClick = (event: MouseEvent) => {
      try {
        const anchor = (event.target as Element | null)?.closest?.("a");
        const href = anchor?.getAttribute("href");
        if (!href) return;
        if (isRateChecker(new URL(href, location.href))) send("rc");
      } catch {
        /* bad href */
      }
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  // A page view per pathname, then its engagement.
  useEffect(() => {
    // React's dev double-invoke and same-path re-renders send nothing twice.
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      send("pv");
      firstPage = false;
    }

    let engaged = false;
    let visibleMs = 0;
    let visibleSince = document.hidden ? 0 : performance.now();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const engage = () => {
      if (engaged) return;
      engaged = true;
      send("eng");
      cleanup();
    };
    const arm = () => {
      clearTimeout(timer);
      if (!document.hidden) timer = setTimeout(engage, ENGAGED_MS - visibleMs);
    };
    const onVisibility = () => {
      if (document.hidden) {
        if (visibleSince) visibleMs += performance.now() - visibleSince;
        visibleSince = 0;
        clearTimeout(timer);
      } else {
        visibleSince = performance.now();
        arm();
      }
    };
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY >= scrollable * ENGAGED_SCROLL) engage();
    };
    function cleanup() {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
    }

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    arm();
    return cleanup;
  }, [pathname]);

  return null;
}
