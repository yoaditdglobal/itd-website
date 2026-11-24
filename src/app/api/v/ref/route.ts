import { rateLimit } from "@/lib/server/rate-limit";
import { beaconStore, requestVisitId } from "@/lib/server/beacon-store";
import { clientIp, isBot, recordingHost, utcDay, withDeadline } from "@/lib/beacon";

/**
 * POST /api/v/ref: the visit reference `<YYYY-MM-DD>.<visit id>` (UTC day of
 * now), which UtmPassthrough appends to Rate Checker links as `wv` so the Rate
 * Checker's own records join the beacon's visit. Stores nothing. Same Host,
 * Origin and bot checks as /api/v; a dropped request answers 204.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
const dropped = () => new Response(null, { status: 204, headers: NO_STORE });

export async function POST(request: Request) {
  try {
    const h = request.headers;
    if (!recordingHost(h, request.url, process.env.BEACON_HOSTS)) return dropped();
    if (isBot(h.get("user-agent") ?? "")) return dropped();
    const ip = clientIp(h);
    if (rateLimit(ip || "unknown", { windowMs: 60_000, max: 30, bucket: "beacon-ref" })) return dropped();

    const store = beaconStore();
    if (!store) return dropped();

    const now = Date.now();
    const v = await withDeadline(requestVisitId(store, h, now));
    return Response.json({ r: `${utcDay(now)}.${v}` }, { headers: NO_STORE });
  } catch (err) {
    console.warn("[beacon] ref dropped:", (err as Error).message);
    return dropped();
  }
}
