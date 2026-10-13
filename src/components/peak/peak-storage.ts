import type { PeakUtms } from "./peak-types";

/**
 * Client-side helpers for the /peak gate. Every storage access is wrapped in
 * try/catch (private mode, blocked storage, quota) and falls back to "gated".
 */

const KEY_PREFIX = "itd_peak_report_";
const key = (edition: string) => `${KEY_PREFIX}${edition}`;

const listeners = new Set<() => void>();

/** Has this browser already unlocked the given edition? */
export function getUnlocked(edition: string): boolean {
  try {
    return typeof localStorage !== "undefined" && localStorage.getItem(key(edition)) === "1";
  } catch {
    return false;
  }
}

/** Remember the unlock (a new edition = a new key, so it re-gates itself). */
export function setUnlocked(edition: string): void {
  try {
    localStorage.setItem(key(edition), "1");
  } catch {
    /* storage unavailable — the dialog's success state still offers the PDF */
  }
  listeners.forEach((l) => l());
}

/** useSyncExternalStore subscription; also follows unlocks in other tabs. */
export function subscribeUnlocked(cb: () => void): () => void {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (!e.key || e.key.startsWith(KEY_PREFIX)) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** Read the campaign params once from the landing URL. */
export function captureUtms(): PeakUtms {
  try {
    const p = new URLSearchParams(window.location.search);
    const pick = (k: string) => p.get(k)?.trim().slice(0, 160) || undefined;
    return {
      utm_source: pick("utm_source"),
      utm_medium: pick("utm_medium"),
      utm_campaign: pick("utm_campaign"),
      utm_content: pick("utm_content"),
    };
  } catch {
    return {};
  }
}

const FREE_MAIL = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "live.com",
  "live.co.uk",
  "msn.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "btinternet.com",
  "sky.com",
  "virginmedia.com",
  "ymail.com",
]);

/** Soft signal only — a free-mail address is never blocked. */
export function isFreeMail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1];
  return Boolean(domain && FREE_MAIL.has(domain));
}
