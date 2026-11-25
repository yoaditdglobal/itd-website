<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ITD Global / Connexx — project at a glance

Marketing site for ITD Global (UK multi-carrier logistics) and its platform **Connexx**. Stack: **Next.js 16 App Router + TypeScript + Tailwind v4** (tokens in `src/app/globals.css`), deployed to **Netlify from `main`**.

**Workflow (do this):** never edit `main` directly. Branch off `origin/main` → PR → the user says **"merge"** (`gh pr merge`). `main` moves fast (parallel sessions merge within minutes), so isolated work goes in a **git worktree**; stage **explicit paths**, never `git add -A`. A change isn't "done" until **merged** — the user reviews on local `main` / the live site, not PR branches; on "still broken", check for an unmerged PR first.

**Verify before pushing:** `npx tsc --noEmit` (ignore stale `.next/types/*.d N.ts` dupes) **and** `npm run build`. Config / image / visual changes must be checked on the **Netlify deploy preview**, not just `next dev` — several breakages are production-only (e.g. `next/image` `quality` values must be listed in `next.config` `images.qualities`).

**Key conventions:**
- **Homepage hero = `VideoHero`** (autoplay muted video bg, normal scroll). The Three.js cinematic parcel→van→plane→ship pager (`ParcelUnboxHero`) now lives only on the **immersive `/rc`** landing page; `SiteChrome` (`IMMERSIVE=['/rc']`) strips global nav/footer there.
- Every hero must **bleed behind the floating nav** (`mt-[calc(-1*var(--nav-h))]` + grown height, or `.bleed-nav`) or a cream seam shows.
- **`framer-motion` is banned** from the shared bundle (broke hydration). Animate with CSS/IntersectionObserver (`ScrollReveal`); **three.js is fine only via `await import("three")`** (code-split).
- **`globals.css` heading clamps beat Tailwind text utilities**: fluid `font-size: clamp(...)` on `h1`/`h2`/`h3` wins over classes like `text-sm` — `<h3 className="text-sm">` still renders ~28px. Reserve `h1`–`h3` for real section headings; use `<p>`/`<span>` for card labels, grid-item names, and other non-heading text.

Deeper patterns + hard-won gotchas live in the **`website-builder` skill** (auto-loads for this repo) and Claude's project memory — follow them.

## Analytics

- **First-party beacon** (cookieless): `components/analytics/Beacon.tsx` (mounted in root `layout.tsx`) → `POST /api/v` → Netlify Blobs store `beacon` → `GET /api/v/export?day=` read daily by the GTM dashboard with `BEACON_EXPORT_TOKEN`. Pure rules in `src/lib/beacon.ts`.
- No cookies or client ids; the visit id is a hash with a **daily salt**, and the **IP is never stored**. Only hosts in `BEACON_HOSTS` (default `itdglobal.com,www.itdglobal.com`) record, so previews and localhost store nothing.
- Kinds: `pv eng rc lead` plus `cta` (`t` target ≤120, `l` location ≤40, every link click), `cwv` (`n` LCP|INP|CLS|FCP|TTFB, `x` integer ms, CLS ×1000; once per page view), `scr` (`x` 25|50|75|100, deepest scroll quarter, sent when the page view ends), `nf` (404 rendered, `p` = missing path; `NotFoundBeacon` in `not-found.tsx`).
- `lead_srv` is written **server side only** (never accepted from `/api/v`) by `recordServerLead()` in the contact, chat lead and peak-report routes: `f` form, `e` = sha256 of the trimmed lower-cased email (**never the email**), `p` = same-origin Referer path, same `v` as `/api/v` (`requestVisitId()`). Best effort, 3 s cap, run via `after()`.
- **Our own traffic and bots are marked, not dropped**: `?itd_staff=1` on any page sets `localStorage.itd_staff` (`?itd_staff=0` clears it; the param is stripped from the address bar) and every event then carries `int: 1`. The server adds `b: 1` for a bot or mail-scanner User-Agent (`BOT_RE`) or the client's `wd: 1` (`navigator.webdriver`); a client can never send `b` itself. `Beacon.tsx` sends nothing off `itdglobal.com` / `www.itdglobal.com`. The dashboard counts both kinds and leaves them out of every figure.
- `POST /api/v/ref` answers `{r: "<day>.<v>"}` (stores nothing); `UtmPassthrough` appends it to Rate Checker links as `wv`.
- Removing or moving `<Beacon />`, or renaming the event fields (`ts k p r u ad w f t l n x e c v int b`), is a **defect**: the dashboard reads them. The `prebuild` guard (`scripts/check-beacon.mjs`) fails the build without the beacon, the not-found beacon, the routes or the lead links; Netlify runs `npm run build` for it.
- **Apollo mobile numbers** (`src/app/api/apollo/phone/route.ts`, for the GTM dashboard's Notes → Find colleagues): Apollo POSTs revealed numbers to `?k=<APOLLO_PHONE_WEBHOOK_KEY>` (Netlify env), each person kept as `phone/<apollo id>` in Blobs store `apollo`; the dashboard reads `GET ?ids=` with `BEACON_EXPORT_TOKEN`. Nothing else is stored.
- **GA4 stays** (`gtag` in `layout.tsx` AND the GA4 tags inside GTM container GTM-M6QJM8F6) until the dashboard's 4-week parallel run passes. **GTM itself stays**: it carries the Apollo website tracker.
