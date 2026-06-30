/**
 * Best-effort in-memory per-IP rate limiter (extracted from the chat route so
 * chat / contact / support all share one implementation).
 *
 * CAVEAT: the counter lives in process memory, so on serverless / multi-instance
 * hosting (Netlify Functions) it is NOT shared across instances and resets on
 * redeploy. It slows abuse rather than hard-stopping it — acceptable for launch
 * volume. To make it truly distributed later, back `record()` with Upstash Redis
 * behind this same signature.
 *
 * Returns `true` when the caller is OVER the limit (i.e. should be blocked).
 */

// One bucket per call-site (e.g. "chat", "contact", "support") so endpoints
// don't share a counter.
const buckets = new Map<string, Map<string, number[]>>();

export function rateLimit(
  ip: string,
  opts: { windowMs: number; max: number; bucket?: string },
): boolean {
  const bucketName = opts.bucket ?? "default";
  let hits = buckets.get(bucketName);
  if (!hits) {
    hits = new Map<string, number[]>();
    buckets.set(bucketName, hits);
  }
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < opts.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > opts.max;
}

/** Best-effort client IP from proxy headers (Netlify/X-Forwarded-For). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
