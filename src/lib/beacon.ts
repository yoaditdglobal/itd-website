// First-party page-view beacon: the pure, server-side rules shared by
// POST /api/v and GET /api/v/export. No Next or Netlify imports here, so the
// logic can be exercised with plain Node (`node --experimental-strip-types`).
//
// Contract (read by the GTM dashboard; never rename a field):
//   stored event = { ts, k, p, r, u, ad, w, f?, c, v }

import { createHash, timingSafeEqual } from "node:crypto";

export const KINDS = ["pv", "eng", "rc", "lead"] as const;
export type Kind = (typeof KINDS)[number];

export const UTM_FIELDS = ["source", "medium", "campaign", "content", "term"] as const;
export type UtmField = (typeof UTM_FIELDS)[number];

export const MAX_BODY_BYTES = 2048;
export const PATH_RE = /^\/[A-Za-z0-9\-._~/%]{0,200}$/;
export const BOT_RE =
  /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|bingpreview|python|curl|wget|go-http|java\/|axios|node-fetch|scanner|monitor|uptime|pingdom|httpclient|okhttp|phantom|selenium|puppeteer|playwright/i;
export const DEFAULT_HOSTS = "itdglobal.com,www.itdglobal.com";
const HOST_RE = /^[a-z0-9.-]{1,100}$/;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

export type BeaconEvent = {
  ts: string;
  k: Kind;
  p: string;
  r: string;
  u: Partial<Record<UtmField, string>>;
  ad: 0 | 1;
  w: "m" | "t" | "d";
  f?: string;
  c: string;
  v: string;
};

/** The client-supplied part of an event, validated. `null` = drop. */
export type ClientFields = Omit<BeaconEvent, "ts" | "c" | "v">;

export function parseClientBody(text: string): ClientFields | null {
  if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) return null;
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return null;
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const b = raw as Record<string, unknown>;

  if (typeof b.k !== "string" || !(KINDS as readonly string[]).includes(b.k)) return null;
  if (typeof b.p !== "string" || !PATH_RE.test(b.p)) return null;
  if (b.w !== "m" && b.w !== "t" && b.w !== "d") return null;

  const r = typeof b.r === "string" ? b.r.trim().toLowerCase() : "";
  const u: Partial<Record<UtmField, string>> = {};
  if (b.u && typeof b.u === "object" && !Array.isArray(b.u)) {
    const src = b.u as Record<string, unknown>;
    for (const key of UTM_FIELDS) {
      const val = src[key];
      if (typeof val === "string" && val.trim()) u[key] = val.trim().slice(0, 200);
    }
  }

  const out: ClientFields = {
    k: b.k as Kind,
    p: b.p,
    r: HOST_RE.test(r) ? r : "",
    u,
    ad: b.ad === 1 ? 1 : 0,
    w: b.w,
  };
  if (out.k === "lead" && typeof b.f === "string" && b.f.trim()) {
    out.f = b.f.trim().slice(0, 60);
  }
  return out;
}

export function isBot(userAgent: string): boolean {
  return !userAgent.trim() || BOT_RE.test(userAgent);
}

/** Lower-cased host without a port (`[::1]:3000` -> `[::1]`). */
export function bareHost(host: string | null | undefined): string {
  if (!host) return "";
  const h = host.trim().toLowerCase();
  if (h.startsWith("[")) return h.slice(0, h.indexOf("]") + 1);
  return h.split(":")[0]!;
}

export function allowedHosts(env: string | undefined): string[] {
  return (env?.trim() ? env : DEFAULT_HOSTS)
    .split(",")
    .map((h) => bareHost(h))
    .filter(Boolean);
}

/** Client IP: Netlify's connection IP, else the first X-Forwarded-For hop. */
export function clientIp(headers: Headers): string {
  const nf = headers.get("x-nf-client-connection-ip")?.trim();
  if (nf) return nf;
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
}

/**
 * The part of an IP that identifies a visitor: the full IPv4, or the /64 of an
 * IPv6 (its first four hextets, `::` expanded, lower case). Ports, brackets
 * and zone ids are stripped; an IPv4-mapped IPv6 counts as its IPv4.
 */
export function ipKey(ip: string): string {
  let s = ip.trim().toLowerCase();
  if (!s) return "";
  const bracket = /^\[([^\]]+)\](?::\d+)?$/.exec(s);
  if (bracket) s = bracket[1]!;
  const v4port = /^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/.exec(s);
  if (v4port) s = v4port[1]!;
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(s)) return s;
  s = s.split("%")[0]!;
  const mapped = /^(?:::|(?:0{1,4}:){5})ffff:(\d{1,3}(?:\.\d{1,3}){3})$/.exec(s);
  if (mapped) return mapped[1]!;
  if (!s.includes(":")) return s;

  const [head, tail] = s.includes("::") ? s.split("::") : [s, undefined];
  const left = head ? head.split(":") : [];
  const right = tail ? tail.split(":") : [];
  const fill = tail === undefined ? 0 : Math.max(0, 8 - left.length - right.length);
  const groups = [...left, ...Array<string>(fill).fill("0"), ...right];
  return groups
    .slice(0, 4)
    .map((g) => (g.replace(/^0+(?=.)/, "") || "0"))
    .join(":");
}

/** Visit id: first 16 hex of sha256(dailySalt + ipKey + "|" + userAgent). */
export function visitId(dailySalt: string, ip: string, userAgent: string): string {
  return createHash("sha256")
    .update(dailySalt + ipKey(ip) + "|" + userAgent)
    .digest("hex")
    .slice(0, 16);
}

/** ISO country code from Netlify's geo headers, else "". */
export function country(headers: Headers): string {
  const geo = headers.get("x-nf-geo");
  if (geo) {
    try {
      const parsed = JSON.parse(Buffer.from(geo, "base64").toString("utf8")) as {
        country?: { code?: unknown };
      };
      const code = parsed.country?.code;
      if (typeof code === "string" && /^[a-z]{2}$/i.test(code)) return code.toUpperCase();
    } catch {
      /* fall through */
    }
  }
  const plain = headers.get("x-country")?.trim();
  return plain && /^[a-z]{2}$/i.test(plain) ? plain.toUpperCase() : "";
}

/** UTC calendar day `YYYY-MM-DD` of a time, shifted by whole days. */
export function utcDay(at: Date | number = Date.now(), shiftDays = 0): string {
  const t = typeof at === "number" ? at : at.getTime();
  return new Date(t + shiftDays * 86_400_000).toISOString().slice(0, 10);
}

export function isValidDay(day: string): boolean {
  if (!DAY_RE.test(day)) return false;
  const d = new Date(`${day}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === day;
}

/** Constant-time string compare (both sides hashed to equal-length buffers). */
export function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb) && a.length === b.length;
}

/** Resolve or reject within `ms`; used for every Blobs call. */
export function withDeadline<T>(work: Promise<T>, ms = 3_000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`deadline ${ms}ms`)), ms);
  });
  return Promise.race([work, deadline]).finally(() => clearTimeout(timer));
}
