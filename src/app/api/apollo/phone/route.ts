import { getStore, type Store } from "@netlify/blobs";
import { safeEqual, withDeadline } from "@/lib/beacon";

/**
 * Apollo's mobile numbers for the GTM dashboard (Find colleagues in Notes).
 * Apollo sends a revealed number only to a webhook, minutes after the reveal
 * request, and the dashboard runs on one Mac, so it lands here:
 *
 *   POST /api/apollo/phone?k=<APOLLO_PHONE_WEBHOOK_KEY>   Apollo's webhook;
 *        each person in the body is kept as `phone/<apollo id>` (store `apollo`)
 *   GET  /api/apollo/phone?ids=<id>,<id>                  the dashboard, with
 *        `Authorization: Bearer <BEACON_EXPORT_TOKEN>`; answers
 *        { people: { <id>: { at, person } | null } }
 *
 * Nothing else is stored: no request data, no IP. A body Apollo sends without
 * a person id is kept once under `raw/<ms>` so a format change can be seen.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: NO_STORE });
const ID = /^[0-9a-f]{24}$/;
const MAX_BODY = 256 * 1024;
const MAX_IDS = 25;
const MS = 10_000;

function store(): Store | null {
  try {
    return getStore({ name: "apollo", consistency: "strong" });
  } catch {
    return null;
  }
}

type Person = { id?: unknown } & Record<string, unknown>;

/** The people in an Apollo webhook body, in whichever shape it arrives. */
function peopleOf(body: unknown): Person[] {
  if (!body || typeof body !== "object") return [];
  const b = body as Record<string, unknown>;
  const list = [b.people, b.matches, b.contacts].find(Array.isArray) as
    | Person[]
    | undefined;
  if (list) return list.filter((p) => p && typeof p === "object");
  const one = (b.person ?? b.contact) as Person | undefined;
  return one && typeof one === "object" ? [one] : [];
}

export async function POST(request: Request) {
  const key = process.env.APOLLO_PHONE_WEBHOOK_KEY;
  if (!key) return json({ error: "not configured" }, 503);
  const given = new URL(request.url).searchParams.get("k") ?? "";
  if (!given || !safeEqual(given, key)) return json({ error: "unauthorized" }, 401);

  const text = await request.text();
  if (text.length > MAX_BODY) return json({ error: "too large" }, 413);
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: "not json" }, 400);
  }
  const s = store();
  if (!s) return json({ error: "storage unavailable" }, 503);

  const at = new Date().toISOString();
  const people = peopleOf(body).filter(
    (p) => typeof p.id === "string" && ID.test(p.id),
  );
  try {
    if (!people.length) {
      await withDeadline(s.setJSON(`raw/${Date.now()}`, { at, body }), MS);
      return json({ ok: true, kept: 0 });
    }
    await Promise.all(
      people.map((p) =>
        withDeadline(s.setJSON(`phone/${p.id}`, { at, person: p }), MS),
      ),
    );
  } catch {
    return json({ error: "storage write failed" }, 503);
  }
  return json({ ok: true, kept: people.length });
}

export async function GET(request: Request) {
  const token = process.env.BEACON_EXPORT_TOKEN;
  if (!token) return json({ error: "not configured" }, 503);
  const auth = request.headers.get("authorization") ?? "";
  const given = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!given || !safeEqual(given, token)) return json({ error: "unauthorized" }, 401);

  const ids = (new URL(request.url).searchParams.get("ids") ?? "")
    .split(",")
    .filter(Boolean);
  if (!ids.length || ids.length > MAX_IDS || !ids.every((i) => ID.test(i)))
    return json({ error: "ids: 1 to 25 Apollo ids" }, 400);
  const s = store();
  if (!s) return json({ error: "storage unavailable" }, 503);

  try {
    // A strong `get` of a missing key can hang on Netlify: list first.
    const have = new Set<string>();
    for await (const page of s.list({ prefix: "phone/", paginate: true })) {
      for (const b of page.blobs) have.add(b.key);
    }
    const people: Record<string, unknown> = {};
    await Promise.all(
      ids.map(async (id) => {
        people[id] = have.has(`phone/${id}`)
          ? await withDeadline(s.get(`phone/${id}`, { type: "json" }), MS)
          : null;
      }),
    );
    return json({ people });
  } catch {
    return json({ error: "storage read failed, retry" }, 503);
  }
}
