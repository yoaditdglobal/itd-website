import { after } from "next/server";
import { beaconStore, requestVisitId, writeEvent } from "@/lib/server/beacon-store";
import {
  country,
  emailHash,
  recordingHost,
  refererPath,
  withDeadline,
  type ServerLeadEvent,
} from "@/lib/beacon";

/**
 * Record an accepted lead as a `lead_srv` beacon event, linked to the visit by
 * the same visit id /api/v derives (salt, IP, user agent). Carries the email's
 * sha256 (`e`), never the email. Best effort: it starts at once, is capped at
 * 3 s, never throws, and is not awaited by the form; `after()` keeps the
 * function alive until it settles. Same host rule as /api/v (BEACON_HOSTS).
 */
export function recordServerLead(request: Request, form: string, email: string): void {
  try {
    const h = request.headers;
    if (!recordingHost(h, request.url, process.env.BEACON_HOSTS)) return;
    const work = (async () => {
      const store = beaconStore();
      if (!store) return;
      const now = Date.now();
      const event: ServerLeadEvent = {
        ts: new Date(now).toISOString(),
        k: "lead_srv",
        f: form.slice(0, 60),
        e: emailHash(email),
        p: refererPath(h.get("referer"), h.get("host")),
        c: country(h),
        v: await requestVisitId(store, h, now),
      };
      await writeEvent(store, event, now);
    })();
    const settled = withDeadline(work).catch((err) => {
      console.warn("[beacon] lead_srv dropped:", (err as Error).message);
    });
    try {
      after(() => settled);
    } catch {
      /* outside a request scope: the promise still runs on its own */
    }
  } catch {
    /* analytics must never fail a form */
  }
}
