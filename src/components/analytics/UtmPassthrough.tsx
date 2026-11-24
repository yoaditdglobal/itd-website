"use client";

import { useEffect } from "react";
import { resolveLocation } from "./LinkClickTracker";

/**
 * Carries campaign tags from the landing URL on to the Rate Checker.
 *
 * Mass emails, Apollo and the email signature link to itdglobal.com with
 * utm_* tags, but the Rate Checker is a separate app (Lovable) and only sees
 * what is on its own URL. So: the first page of a visit saves its tags in
 * sessionStorage, and any link to the Rate Checker (the Lovable host, or the
 * /rate-checker redirect, which keeps its query string) gets them appended at
 * click time. Tags already on a link win.
 *
 * A visit with no campaign tags tags the link as the site's own: utm_source
 * itdglobal.com, utm_medium website and utm_content the link's label and where it
 * sits ("get-quote-hero", "get-quote-nav": resolveLocation, the names GA's cta_click
 * and the beacon use),
 * so the Rate Checker can tell a visitor sent by the website's Get Quote from one
 * who arrived with no tag at all. No utm_campaign: website traffic is no campaign.
 *
 * It also appends `wv`, the beacon's visit reference (`<day>.<visit id>` from
 * POST /api/v/ref), so the Rate Checker's records join the site visit. The
 * reference is fetched once per page load, lazily (first hover or focus of a
 * Rate Checker link, or at idle when the page has one) and kept in memory; a
 * click before it arrives simply goes without it.
 *
 * Mounted once in the root layout (not SiteChrome) so the immersive /rc page
 * is covered too. Renders nothing.
 */

const STORAGE_KEY = "itd_attribution";
const KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "li_fat_id",
] as const;
const RATE_CHECKER_HOSTS = ["itdglobal-ratechecker.lovable.app"];
const VISIT_PARAM = "wv";
const SITE_SOURCE = "itdglobal.com";
const SITE_MEDIUM = "website";

/** The link as a utm_content value, its label and where it sits: "Get Quote" in the hero -> "get-quote-hero". */
function linkLabel(anchor: HTMLAnchorElement): string {
  const text = (anchor.getAttribute("aria-label") || anchor.textContent || "").trim().toLowerCase();
  const label = text.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "link";
  return `${label}-${resolveLocation(anchor).toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;
}
const VISIT_REF_RE = /^\d{4}-\d{2}-\d{2}\.[0-9a-f]{16}$/;

// The visit reference, fetched at most once per page load.
let visitRef: string | null = null;
let visitRefRequested = false;

function loadVisitRef() {
  if (visitRefRequested) return;
  visitRefRequested = true;
  try {
    fetch("/api/v/ref", { method: "POST", cache: "no-store", credentials: "omit" })
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((data: { r?: unknown } | null) => {
        if (typeof data?.r === "string" && VISIT_REF_RE.test(data.r)) visitRef = data.r;
      })
      .catch(() => {});
  } catch {
    /* no reference: links go out without it */
  }
}

export type Tags = Partial<Record<(typeof KEYS)[number], string>>;

export function readUrlTags(): Tags {
  const params = new URLSearchParams(window.location.search);
  const tags: Tags = {};
  for (const k of KEYS) {
    const v = params.get(k)?.trim();
    if (v) tags[k] = v.slice(0, 200);
  }
  return tags;
}

export function savedTags(): Tags {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as Tags;
  } catch {
    return {};
  }
}

/** A Rate Checker link: the Lovable host, or this site's /rate-checker redirect. Also used by Beacon. */
export function isRateChecker(url: URL): boolean {
  if (RATE_CHECKER_HOSTS.includes(url.host)) return true;
  return (
    url.host === window.location.host &&
    (url.pathname === "/rate-checker" || url.pathname.startsWith("/rate-checker/"))
  );
}

function anchorIsRateChecker(anchor: HTMLAnchorElement): boolean {
  const raw = anchor.getAttribute("href");
  if (!raw) return false;
  try {
    return isRateChecker(new URL(raw, window.location.href));
  } catch {
    return false;
  }
}

function tagAnchor(anchor: HTMLAnchorElement) {
  const raw = anchor.getAttribute("href");
  if (!raw) return;
  let url: URL;
  try {
    url = new URL(raw, window.location.href);
  } catch {
    return;
  }
  if (!isRateChecker(url)) return;
  const tags = savedTags();
  let changed = false;
  if (visitRef && !url.searchParams.has(VISIT_PARAM)) {
    url.searchParams.set(VISIT_PARAM, visitRef);
    changed = true;
  }
  const campaignTags = KEYS.some((k) => tags[k]);
  for (const k of KEYS) {
    const v = tags[k];
    if (v && !url.searchParams.has(k)) {
      url.searchParams.set(k, v);
      changed = true;
    }
  }
  // No campaign brought this visit: the click is the website's own.
  if (!campaignTags && !url.searchParams.has("utm_source")) {
    url.searchParams.set("utm_source", SITE_SOURCE);
    url.searchParams.set("utm_medium", SITE_MEDIUM);
    url.searchParams.set("utm_content", linkLabel(anchor));
    changed = true;
  }
  if (changed) anchor.setAttribute("href", url.toString());
}

export default function UtmPassthrough() {
  useEffect(() => {
    // First touch: keep the tags of the visit's first tagged page.
    try {
      const tags = readUrlTags();
      if (Object.keys(tags).length && !sessionStorage.getItem(STORAGE_KEY)) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tags));
      }
    } catch {
      /* storage unavailable: links go out untagged */
    }

    // Rewrite the href just before it is used: a click, a middle click, or the
    // context menu (open in new tab / copy link).
    const onUse = (event: Event) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (anchor instanceof HTMLAnchorElement) tagAnchor(anchor);
    };
    const events = ["click", "auxclick", "contextmenu"] as const;
    events.forEach((e) => document.addEventListener(e, onUse, true));

    // Fetch the visit reference on first intent towards a Rate Checker link.
    const onIntent = (event: Event) => {
      if (visitRefRequested) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (anchor instanceof HTMLAnchorElement && anchorIsRateChecker(anchor)) loadVisitRef();
    };
    const intents = ["pointerover", "focusin", "touchstart"] as const;
    intents.forEach((e) => document.addEventListener(e, onIntent, { capture: true, passive: true }));

    // Or at idle, when the page already shows a Rate Checker link.
    const atIdle = () => {
      if (visitRefRequested) return;
      const anchors = document.querySelectorAll<HTMLAnchorElement>("a[href]");
      for (const a of anchors) {
        if (anchorIsRateChecker(a)) {
          loadVisitRef();
          return;
        }
      }
    };
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(atIdle, { timeout: 5_000 })
        : window.setTimeout(atIdle, 2_000);

    return () => {
      events.forEach((e) => document.removeEventListener(e, onUse, true));
      intents.forEach((e) => document.removeEventListener(e, onIntent, { capture: true }));
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  return null;
}
