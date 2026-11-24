import { randomBytes } from "node:crypto";
import { getStore, type Store } from "@netlify/blobs";
import {
  clientIp,
  utcDay,
  visitId,
  withDeadline,
  type StoredEvent,
} from "@/lib/beacon";

/**
 * Netlify Blobs access for the first-party beacon (store `beacon`):
 *   salt/<day>            32 random bytes hex, the day's visit-id salt
 *   ev/<day>/<ms>-<hex>   one event (live day, and complete days not yet exported)
 *   day/<day>             a complete day compacted by the export
 * Every call carries a 3 s deadline. Outside Netlify (local dev) there is no
 * Blobs context: `beaconStore()` returns null and logs once.
 */

let warned = false;

export function beaconStore(): Store | null {
  try {
    return getStore({ name: "beacon", consistency: "strong" });
  } catch (err) {
    if (!warned) {
      warned = true;
      console.warn(
        "[beacon] Netlify Blobs unavailable:",
        (err as Error).message,
      );
    }
    return null;
  }
}

/**
 * Whether `key` exists, by listing its prefix. On Netlify a strong-consistency
 * `get` of a key that does not exist yet hung past every deadline (seen on the
 * deploy preview, 24 Nov 2026), while listing answers at once; so a key that
 * may be missing is listed before it is read.
 */
export async function exists(
  store: Store,
  key: string,
  ms?: number,
): Promise<boolean> {
  const { blobs } = await withDeadline(store.list({ prefix: key }), ms);
  return blobs.some((b) => b.key === key);
}

// The salt never changes once written, so each instance keeps the day's copy.
let saltCache: { day: string; salt: string } | null = null;

export async function dailySalt(
  store: Store,
  now = Date.now(),
): Promise<string> {
  const day = utcDay(now);
  if (saltCache?.day === day) return saltCache.salt;

  const key = `salt/${day}`;
  let salt = (await exists(store, key))
    ? ((await withDeadline(store.get(key, { type: "text" }))) as string | null)
    : null;
  if (!salt) {
    const fresh = randomBytes(32).toString("hex");
    const res = await withDeadline(store.set(key, fresh, { onlyIfNew: true }));
    // Lost the race to a concurrent request: use the salt that won.
    salt = res.modified
      ? fresh
      : ((await withDeadline(store.get(key, { type: "text" }))) as
          string | null);
    // Opportunistic clean-up of the salt from two days ago.
    withDeadline(store.delete(`salt/${utcDay(now, -2)}`)).catch(() => {});
  }
  if (!salt) throw new Error("salt unavailable");
  saltCache = { day, salt };
  return salt;
}

/**
 * The visit id of a request: the day's salt, the client IP and the user agent.
 * The one derivation used by /api/v, /api/v/ref and the lead routes, so a
 * server-side lead joins the browser's events of the same visit.
 */
export async function requestVisitId(
  store: Store,
  headers: Headers,
  now = Date.now(),
): Promise<string> {
  return visitId(
    await dailySalt(store, now),
    clientIp(headers),
    headers.get("user-agent") ?? "",
  );
}

export async function writeEvent(
  store: Store,
  event: StoredEvent,
  now = Date.now(),
) {
  const key = `ev/${utcDay(now)}/${now}-${randomBytes(4).toString("hex")}`;
  await withDeadline(store.setJSON(key, event));
}

/** Every event key under `ev/<day>/`, across all pages of the listing. */
export async function listEventKeys(
  store: Store,
  day: string,
  ms?: number,
): Promise<string[]> {
  const keys: string[] = [];
  const walk = async () => {
    for await (const page of store.list({
      prefix: `ev/${day}/`,
      paginate: true,
    })) {
      for (const b of page.blobs) keys.push(b.key);
    }
  };
  await withDeadline(walk(), ms);
  return keys;
}

/**
 * Read events by key, a bounded number at a time. A key that has gone (a
 * concurrent export compacted and deleted it) is skipped; any other failure
 * is counted so the caller can refuse to compact an incomplete day.
 */
export async function readEvents(
  store: Store,
  keys: string[],
  concurrency = 32,
  ms?: number,
): Promise<{ events: StoredEvent[]; failed: number }> {
  const events: StoredEvent[] = [];
  let failed = 0;
  for (let i = 0; i < keys.length; i += concurrency) {
    const batch = keys.slice(i, i + concurrency);
    const results = await Promise.allSettled(
      batch.map((k) =>
        withDeadline(
          store.get(k, { type: "json" }) as Promise<StoredEvent | null>,
          ms,
        ),
      ),
    );
    for (const r of results) {
      if (r.status === "rejected") failed++;
      else if (r.value) events.push(r.value);
    }
  }
  events.sort((a, b) => (a.ts < b.ts ? -1 : a.ts > b.ts ? 1 : 0));
  return { events, failed };
}

export async function deleteKeys(
  store: Store,
  keys: string[],
  concurrency = 32,
  ms?: number,
) {
  for (let i = 0; i < keys.length; i += concurrency) {
    await Promise.allSettled(
      keys
        .slice(i, i + concurrency)
        .map((k) => withDeadline(store.delete(k), ms)),
    );
  }
}
