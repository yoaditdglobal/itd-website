"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { LEAD_EVENT } from "@/lib/analytics";
import { resolveLocation, resolveUrl } from "./LinkClickTracker";
import { isRateChecker, readUrlTags, savedTags, type Tags } from "./UtmPassthrough";

/**
 * First-party, cookieless analytics beacon. Posts small events to /api/v
 * (stored in Netlify Blobs, exported daily to the GTM dashboard):
 *   pv    a page view, on first load and on every client-side route change
 *   eng   the page view engaged: 10 s visible (cumulative) or scrolled 25%
 *   rc    a click on a Rate Checker link
 *   lead  a generate_lead conversion (contact form, Peak report, chat)
 *   cta   a click on any link: t = target, l = location (as LinkClickTracker)
 *   cwv   a Core Web Vital: n = name, x = value (ms; CLS x1000), once per page view
 *   scr   the page view's deepest scroll quarter, x = 25|50|75|100, sent when it ends
 *   nf    the not-found page rendered (sent by NotFoundBeacon)
 * No cookies, no localStorage, no client identifiers: the server derives a
 * daily visit id. Never throws, never blocks. Mounted once in the root layout;
 * removing it, or renaming a body field, breaks the dashboard (see AGENTS.md).
 */

type Kind = "pv" | "eng" | "rc" | "lead" | "cta" | "cwv" | "nf" | "scr";
type Extra = { p?: string; f?: string; t?: string; l?: string; n?: string; x?: number };
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
const CWV = ["LCP", "INP", "CLS", "FCP", "TTFB"];

// The first page view of the document: UtmPassthrough may not have saved the
// landing tags yet (effect order is not guaranteed), so read the URL as well.
let firstPage = true;
// Lead detection reads the dataLayer array rather than wrapping its push():
// GTM installs its own push, and every push (GTM's included) still appends.
let scanArray: unknown[] | null = null;
let scanIndex = 0;
const scanned = new WeakSet<object>();

function visitTags(): Tags {
  const saved = savedTags();
  if (Object.keys(saved).length || !firstPage) return saved;
  return readUrlTags();
}

// The page view in progress: a sequence number (CWV dedupe) and its scroll depth.
let pvSeq = 0;
const cwvSent = new Set<string>();
let scroll = { path: "", sent: true, max: 0, short: false, long: false };

/** Send one beacon event. Never throws. Also used by NotFoundBeacon. */
export function send(k: Kind, extra: Extra = {}) {
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
      p: (extra.p ?? location.pathname).slice(0, 200),
      r,
      u,
      ad: AD_CLICK_IDS.some((id) => tags[id]) ? 1 : 0,
      w: width < 768 ? "m" : width < 1024 ? "t" : "d",
    };
    if (k === "lead" && extra.f) body.f = extra.f.slice(0, 60);
    if (extra.t !== undefined) body.t = extra.t.slice(0, 120);
    if (extra.l !== undefined) body.l = extra.l.slice(0, 40);
    if (extra.n !== undefined) body.n = extra.n;
    if (extra.x !== undefined) body.x = extra.x;
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

/**
 * Send a lead for every new generate_lead entry in window.dataLayer. Starts at
 * 0 so a lead pushed before mount still counts (the array is per page load);
 * the WeakSet keeps an entry from counting twice, also when the array is
 * replaced and the index resets.
 */
function scanDataLayer() {
  try {
    const dl = (window as DataLayerWindow).dataLayer;
    if (!Array.isArray(dl)) return;
    if (dl !== scanArray) {
      scanArray = dl;
      scanIndex = 0;
    }
    if (scanIndex > dl.length) scanIndex = 0;
    for (; scanIndex < dl.length; scanIndex++) {
      const item = dl[scanIndex];
      if (!item || typeof item !== "object" || scanned.has(item)) continue;
      scanned.add(item);
      const form = leadForm(item);
      if (form !== false) send("lead", { f: form || undefined });
    }
  } catch {
    /* never interfere with the page */
  }
}

/** Core Web Vitals: one event per metric per page view. A stable reference (see the docs). */
function reportVital(metric: { name: string; value: number }) {
  try {
    if (!CWV.includes(metric.name)) return;
    const key = `${pvSeq}:${metric.name}`;
    if (cwvSent.has(key)) return;
    cwvSent.add(key);
    const x = Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value);
    if (Number.isFinite(x) && x >= 0) send("cwv", { n: metric.name, x });
  } catch {
    /* never interfere with the page */
  }
}

/** Update the page view's scroll depth from the current position. */
function measureScroll() {
  try {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    // Once the page has been taller than the window it stays "long", so a
    // late layout (or the next page's DOM during a route change) cannot
    // turn a real depth into 100.
    if (scrollable > 0) scroll.long = true;
    scroll.short = !scroll.long && scrollable <= 0;
    if (scrollable > 0) {
      // +1 so a sub-pixel short of the bottom still counts as the bottom.
      scroll.max = Math.max(scroll.max, Math.min(1, (window.scrollY + 1) / scrollable));
    }
  } catch {
    /* ignore */
  }
}

/** Send the ended page view's deepest scroll quarter, once; nothing below 25%. */
function flushScroll(remeasure: boolean) {
  if (scroll.sent) return;
  if (remeasure) measureScroll();
  scroll.sent = true;
  const quarter = scroll.short ? 4 : Math.floor(scroll.max * 4);
  // The page view that ended, not a route change's new path.
  if (quarter >= 1) send("scr", { p: scroll.path, x: quarter * 25 });
}

export default function Beacon() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  useReportWebVitals(reportVital);

  // Link clicks (cta, rc), scroll depth and the dataLayer lead scan: once per document.
  useEffect(() => {
    scanDataLayer();
    const poll = setInterval(() => {
      if (!document.hidden) scanDataLayer();
    }, 1_000);
    const onLeave = () => {
      scanDataLayer();
      flushScroll(true);
    };
    const onHide = () => {
      if (document.hidden) {
        scanDataLayer();
        flushScroll(true);
      }
    };
    const onScroll = () => measureScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pagehide", onLeave);
    document.addEventListener("visibilitychange", onHide);
    const onClick = (event: MouseEvent) => {
      try {
        if (event.button === 2) return;
        const anchor = (event.target as Element | null)?.closest?.("a");
        const href = anchor?.getAttribute("href");
        if (!anchor || !href) return;
        const target = resolveUrl(anchor)?.split(/[?#]/)[0];
        if (target && !/\s/.test(target)) {
          send("cta", { t: target, l: resolveLocation(anchor) });
        }
        if (isRateChecker(new URL(href, location.href))) send("rc");
      } catch {
        /* bad href */
      }
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      clearInterval(poll);
      window.removeEventListener("pagehide", onLeave);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  // A page view per pathname, then its engagement.
  useEffect(() => {
    // React's dev double-invoke and same-path re-renders send nothing twice.
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      // The previous page view ends here: its depth was measured while it
      // was on screen (the DOM now shows the new page, so no re-measure).
      flushScroll(false);
      send("pv");
      firstPage = false;
      pvSeq += 1;
      scroll = { path: location.pathname, sent: false, max: 0, short: false, long: false };
    }
    // Measure once the page has laid out, so a page shorter than the window
    // counts as 100 without a scroll event.
    const measureTimers = [0, 1_000].map((ms) => setTimeout(measureScroll, ms));

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
    return () => {
      measureTimers.forEach(clearTimeout);
      cleanup();
    };
  }, [pathname]);

  return null;
}
