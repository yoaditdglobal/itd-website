"use client";

import { useEffect } from "react";

/**
 * Carries campaign tags from the landing URL on to the Rate Checker.
 *
 * Mass emails, Apollo and the email signature link to itdglobal.com with
 * utm_* tags, but the Rate Checker is a separate app (Lovable) and only sees
 * what is on its own URL. So: the first page of a visit saves its tags in
 * sessionStorage, and any link to the Rate Checker (the Lovable host, or the
 * /rate-checker redirect, which keeps its query string) gets them appended at
 * click time. Tags already on a link win; a visit with no tags adds nothing.
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

type Tags = Partial<Record<(typeof KEYS)[number], string>>;

function readUrlTags(): Tags {
  const params = new URLSearchParams(window.location.search);
  const tags: Tags = {};
  for (const k of KEYS) {
    const v = params.get(k)?.trim();
    if (v) tags[k] = v.slice(0, 200);
  }
  return tags;
}

function savedTags(): Tags {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as Tags;
  } catch {
    return {};
  }
}

function isRateChecker(url: URL): boolean {
  if (RATE_CHECKER_HOSTS.includes(url.host)) return true;
  return (
    url.host === window.location.host &&
    (url.pathname === "/rate-checker" || url.pathname.startsWith("/rate-checker/"))
  );
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
  for (const k of KEYS) {
    const v = tags[k];
    if (v && !url.searchParams.has(k)) {
      url.searchParams.set(k, v);
      changed = true;
    }
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
    return () => events.forEach((e) => document.removeEventListener(e, onUse, true));
  }, []);

  return null;
}
