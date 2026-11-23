import { rateLimit } from "@/lib/server/rate-limit";
import { beaconStore, dailySalt, writeEvent } from "@/lib/server/beacon-store";
import {
  MAX_BODY_BYTES,
  allowedHosts,
  bareHost,
  clientIp,
  country,
  isBot,
  parseClientBody,
  visitId,
  type BeaconEvent,
} from "@/lib/beacon";

/**
 * POST /api/v: the first-party page-view beacon (sent by
 * components/analytics/Beacon.tsx). Always answers 204, whether the event was
 * stored or dropped, so the client learns nothing and never retries. Events
 * are recorded only on the production hosts (BEACON_HOSTS), so deploy previews
 * and localhost store nothing. The IP is used for the visit id and the rate
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

    const host = bareHost(h.get("host") ?? new URL(request.url).host);
    if (!allowedHosts(process.env.BEACON_HOSTS).includes(host)) return done();
    const origin = h.get("origin");
    if (origin) {
      let originHost = "";
      try {
        originHost = bareHost(new URL(origin).host);
      } catch {
        /* "null" or garbage: treated as foreign */
      }
      if (originHost !== host) return done();
    }

    const ua = h.get("user-agent") ?? "";
    if (isBot(ua)) return done();

    const ip = clientIp(h);
    if (rateLimit(ip || "unknown", { windowMs: 60_000, max: 120, bucket: "beacon" })) return done();

    const fields = parseClientBody(await request.text());
    if (!fields) return done();

    const store = beaconStore();
    if (!store) return done();

    const now = Date.now();
    const event: BeaconEvent = {
      ts: new Date(now).toISOString(),
      ...fields,
      c: country(h),
      v: visitId(await dailySalt(store, now), ip, ua),
    };
    await writeEvent(store, event, now);
  } catch (err) {
    // A failed write is dropped, never retried.
    console.warn("[beacon] event dropped:", (err as Error).message);
  }
  return done();
}
