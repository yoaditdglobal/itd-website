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

Deeper patterns + hard-won gotchas live in the **`website-builder` skill** (auto-loads for this repo) and Claude's project memory — follow them.
