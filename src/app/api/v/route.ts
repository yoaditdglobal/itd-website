import { rateLimit } from "@/lib/server/rate-limit";
import { beaconStore, requestVisitId, writeEvent } from "@/lib/server/beacon-store";
import {
  MAX_BODY_BYTES,
  clientIp,
  country,
  isBot,
  parseClientBody,
  recordingHost,
  type BeaconEvent,
} from "@/lib/beacon";

/**
 * POST /api/v: the first-party page-view beacon (sent by
 * components/analytics/Beacon.tsx). Always answers 204, whether the event was
 * stored or dropped, so the client learns nothing and never retries. Events
 * are recorded only on the production hosts (BEACON_HOSTS), so deploy previews
 * and localhost store nothing. A bot or scanner User-Agent, or the client's
 * wd: 1, is stored with b: 1 (the dashboard counts and leaves it out). The IP is used for the visit id and the rate
 * limit only and is never stored.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const done = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  try {
    const h = request.headers;

    const declared = Number(h.get("content-length") ?? "0");
    if (declared > MAX_BODY_BYTES) return done();

    if (!recordingHost(h, request.url, process.env.BEACON_HOSTS)) return done();

    const ua = h.get("user-agent") ?? "";

    const ip = clientIp(h);
    if (rateLimit(ip || "unknown", { windowMs: 60_000, max: 120, bucket: "beacon" })) return done();

    const fields = parseClientBody(await request.text());
    if (!fields) return done();

    const store = beaconStore();
    if (!store) return done();

    const now = Date.now();
    const { wd, ...client } = fields;
    const event: BeaconEvent = {
      ts: new Date(now).toISOString(),
      ...client,
      ...(wd === 1 || isBot(ua) ? { b: 1 as const } : {}),
      c: country(h),
      v: await requestVisitId(store, h, now),
    };
    await writeEvent(store, event, now);
  } catch (err) {
    // A failed write is dropped, never retried.
    console.warn("[beacon] event dropped:", (err as Error).message);
  }
  return done();
}
