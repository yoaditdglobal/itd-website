<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ITD Global / Connexx — project at a glance

Marketing site for ITD Global (UK multi-carrier logistics) and its platform **Connexx**. Stack: **Next.js 16 App Router + TypeScript + Tailwind v4** (tokens in `src/app/globals.css`), deployed to **Netlify from `main`**.

**Workflow (do this):** never edit `main` directly. Branch off `origin/main` → PR → the user says **"merge"** (`gh pr merge`). `main` moves fast (parallel sessions merge within minutes), so isolated work goes in a **git worktree**; stage **explicit paths**, never `git add -A`. A change isn't "done" until **merged** — the user reviews on local `main` / the live site, not PR branches; on "still broken", check for an unmerged PR first.

**Verify before pushing:** `npm run typecheck` (ignore stale `.next/types/*.d N.ts` dupes) **and** `npm run build`, both with the dev server stopped (see Local servers below). Config / image / visual changes must be checked on the **Netlify deploy preview**, not just `next dev` — several breakages are production-only (e.g. `next/image` `quality` values must be listed in `next.config` `images.qualities`).

**Key conventions:**
- **Homepage hero = `VideoHero`** (autoplay muted video bg, normal scroll). The Three.js cinematic parcel→van→plane→ship pager (`ParcelUnboxHero`) now lives only on the **immersive `/rc`** landing page; `SiteChrome` (`IMMERSIVE=['/rc']`) strips global nav/footer there.
- Every hero must **bleed behind the floating nav** (`mt-[calc(-1*var(--nav-h))]` + grown height, or `.bleed-nav`) or a cream seam shows.
- **`framer-motion` is banned** from the shared bundle (broke hydration). Animate with CSS/IntersectionObserver (`ScrollReveal`); **three.js is fine only via `await import("three")`** (code-split).
- **`globals.css` heading clamps beat Tailwind text utilities**: fluid `font-size: clamp(...)` on `h1`/`h2`/`h3` wins over classes like `text-sm` — `<h3 className="text-sm">` still renders ~28px. Reserve `h1`–`h3` for real section headings; use `<p>`/`<span>` for card labels, grid-item names, and other non-heading text.

Deeper patterns + hard-won gotchas live in the **`website-builder` skill** (auto-loads for this repo) and Claude's project memory — follow them.

## Local servers (keep them stable)
- The checkout lives at **`~/dev/itd-website`**, on local disk. It was moved out of `~/Documents` on 6 Nov 2026 because that folder is iCloud Drive (Desktop & Documents sync): with `node_modules` inside it, `fileproviderd` pins the CPU, `next dev` takes minutes to boot and never serves a page, `git worktree add` dies with `mmap failed`, and a plain `mv` hangs in the kernel rename call. **Never clone, build or run this repo under `~/Documents`, `~/Desktop` or any other iCloud-synced path.** `npm run dev` and `npm run build` refuse to start there (`scripts/check-location.mjs`, wired as `predev`/`prebuild`; Netlify/CI skip it). Running `npx next dev` directly bypasses that check, so don't. The old copy at `~/Documents/Claude/Projects/ITD Website/itd-website` is stale; any session still working there should push its branch, then switch to `~/dev/itd-website`. Non-repo project files (briefs, assets, decks) still live beside the old copy under `~/Documents/Claude/Projects/ITD Website/` — read them from that absolute path, never via `../`.
- Run `npm run typecheck`, `npm run lint` and `npm run build` with the dev server **stopped**. They compete for the same disk and `.next/` cache; `next build` beside a running `next dev` corrupts both (stale Tailwind CSS in dev, duplicate `.next/types/* 2.ts` files that break `tsc`). Stop the dev server first, or verify on the Netlify deploy preview instead.
- Run **one** dev server at a time, via the repo-root `.claude/launch.json` (`dev`, port 3000). Next 16 allows one dev server per checkout (`.next/dev/lock`); never start a second `next dev` by hand while it runs.
- If dev shows layouts that do not match the code: stop the server, `rm -rf .next`, start it again.
- Worktrees for parallel work go under `~/dev/` too (e.g. `git worktree add ~/dev/itd-wt-<name> <branch>` then `npm ci --prefer-offline --no-audit --no-fund`), never under `/private/tmp` (wiped on reboot) or `~/Documents`.
