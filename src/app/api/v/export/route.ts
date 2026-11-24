import {
  beaconStore,
  deleteKeys,
  listEventKeys,
  readEvents,
} from "@/lib/server/beacon-store";
import { isValidDay, safeEqual, utcDay, withDeadline, type BeaconEvent } from "@/lib/beacon";

/**
 * GET /api/v/export?day=YYYY-MM-DD: one UTC day of beacon events, read daily
 * by the GTM dashboard with `Authorization: Bearer <BEACON_EXPORT_TOKEN>`.
 * Answers { day, complete, events } with events sorted by ts. A complete day
 * (before today UTC) is compacted into `day/<day>` on its first export and its
 * per-event blobs are then deleted; today is read live and nothing is written.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SETTLE_MS = 10 * 60_000;
// The export is read server to server, so a storage call may take longer than
// the 3 s the visitor-facing beacon allows; a cold Blobs call took over 3 s.
const EXPORT_MS = 20_000;
const NO_STORE = { "Cache-Control": "no-store" };
const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: NO_STORE });

export async function GET(request: Request) {
  const token = process.env.BEACON_EXPORT_TOKEN;
  if (!token) return json({ error: "export not configured" }, 503);

  const auth = request.headers.get("authorization") ?? "";
  const given = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!given || !safeEqual(given, token)) return json({ error: "unauthorized" }, 401);

  const day = new URL(request.url).searchParams.get("day") ?? "";
  const today = utcDay();
  if (!isValidDay(day) || day > today) return json({ error: "bad day" }, 400);
  // A day is complete (and compacted) only 10 minutes after it ends, so a
  // write still in flight at midnight is never left out of its compacted day.
  const complete = day < utcDay(Date.now() - SETTLE_MS);

  const store = beaconStore();
  if (!store) return json({ error: "storage unavailable" }, 503);

  let step = "list";
  try {
    if (!complete) {
      const { events, failed } = await readEvents(store, await listEventKeys(store, day, EXPORT_MS), 32, EXPORT_MS);
      if (failed) return json({ error: "storage read failed, retry" }, 503);
      return json({ day, complete, events });
    }

    step = "get day";
    const stored = (await withDeadline(store.get(`day/${day}`, { type: "json" }), EXPORT_MS)) as {
      events?: BeaconEvent[];
    } | null;
    if (stored?.events) return json({ day, complete, events: stored.events });

    step = "list";
    const keys = await listEventKeys(store, day, EXPORT_MS);
    step = "read";
    const { events, failed } = await readEvents(store, keys, 32, EXPORT_MS);
    // Never compact a day with an unread event: it would be lost for good.
    if (failed) return json({ error: "storage read failed, retry" }, 503);

    step = "compact";
    const res = await withDeadline(
      store.setJSON(`day/${day}`, { day, complete, events }, { onlyIfNew: true }),
      EXPORT_MS,
    );
    if (!res.modified) {
      // A concurrent export compacted first: serve its copy.
      const won = (await withDeadline(store.get(`day/${day}`, { type: "json" }), EXPORT_MS)) as {
        events?: BeaconEvent[];
      } | null;
      return json({ day, complete, events: won?.events ?? events });
    }
    step = "delete";
    await deleteKeys(store, keys, 32, EXPORT_MS);
    return json({ day, complete, events });
  } catch (err) {
    console.warn(`[beacon] export failed at ${step}:`, (err as Error).message);
    return json({ error: "storage unavailable" }, 503);
  }
}
