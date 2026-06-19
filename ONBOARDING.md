# ITD Global Website — How We Work

A short guide to building and shipping changes to the ITD Global / Connexx website. Read this once before your first change.

---

## The mental model (read this first)

- **`main` = the live website.** Every time something merges into `main`, Netlify rebuilds and it goes **live** on production.
- **You never edit `main` directly.** Every change happens on its own **branch**, gets a **preview link**, is reviewed, then merged.
- **Preview before production.** Opening a Pull Request gives you a private Netlify link showing the *real rendered site* with your change. That's where we check the design before it's live.

> One rule to remember: **branch → change → preview → merge.** Nothing goes straight to `main`.

---

## One-time setup (per computer)

1. **GitHub Desktop** — install from <https://desktop.github.com>, sign in with your GitHub account. (You'll get a collaborator invite by email — accept it first.)
2. **Node.js 20** — install from <https://nodejs.org> (the site needs v20).
3. **Claude Code** — the assistant we use to make the edits.
4. **Clone the project:** GitHub Desktop → *File → Clone repository →* `yoaditdglobal/itd-website`. **Remember the folder it saves to.**
5. In a terminal in that folder, run once:
   ```bash
   npm install
   ```
6. Open **that same folder** (`itd-website`, the repo root) in Claude Code.

---

## Running the site locally

Always use the **dev server** — it hot-reloads, so edits appear in ~1 second:

```bash
npm run dev      # then open http://localhost:3000
```

- ✅ `npm run dev` — development. Live reload, no rebuild.
- ❌ `npm run start` — that's the **production** server; it serves a frozen build and will **not** show your edits. (We lost real time to this once. Don't use it for development.)

`npm run build` is only a quick check that the production build compiles before you push — and Netlify runs it for you anyway, so it's optional locally.

---

## Making a change (every time)

In **GitHub Desktop**:

1. **Current branch → New branch** — name it by type (see naming below), branched from an up-to-date `main` (click *Fetch origin* first).
2. Make the edits (with Claude Code). Check them at `http://localhost:3000`.
3. Bottom-left: write a short summary → **Commit to `<your-branch>`**.
4. **Push origin** (top bar).
5. **Create Pull Request** → opens GitHub → **Create**.
6. Wait ~1–2 min: a **Netlify Deploy Preview** link appears on the PR (a `deploy-preview-…netlify.app` URL). **Open it and check the design.**
7. Need a tweak? Commit + push again to the same branch — the preview updates automatically.
8. Happy? **Merge** the PR → it goes live → **delete the branch**.

---

## How much process? Match it to the change size

- **Substantial change** (a page, copy deploy, hero/section, layout) → its **own branch + PR + preview**, one change per branch.
- **Small tweak** (a colour, a number like animation speed, spacing, a typo) → **batch** a few onto one short-lived branch (e.g. `chore/polish`), then one PR.

Rule of thumb: *if you'd want to see it on a preview link before it's live, it deserves its own branch.*

**Branch names:** `copy/<page>` · `feat/<thing>` · `fix/<thing>` · `chore/<thing>`
(e.g. `copy/enterprise`, `feat/freight-hero`, `fix/marquee-loop`).

---

## Reviewing (design, not code)

You don't read code. On the Pull Request, click the **Netlify Deploy Preview** link and look at the live pages. Approve/merge if it looks right; otherwise say what to change and push again.

---

## Working together (avoiding conflicts)

- Keep branches **short-lived** — merge within a day or so, don't let them drift.
- If two of us edit the **same file**, GitHub Desktop may show a **merge conflict**. Don't guess — **stop and ask Claude** to resolve it.
- Pull `main` (Fetch origin) before starting a new branch so you're current.

---

## What lives where (for context)

- Pages: `src/app/...` (e.g. `src/app/solutions/enterprise/page.tsx`).
- Reusable sections/components: `src/components/sections`, `src/components/ui`.
- Images: `public/...` (we use `.webp`, and version filenames like `import-hero-v2.webp` to bust caches).
- **Homepage hero is a background video** at `public/hero/hero.mp4` (with a still `hero-poster.jpg`). To change it, swap those files — but keep the video **small** (under ~4MB, no audio); just ask Claude to compress and wire in a new clip.
- **`/rc` is the standalone cinematic landing page** (the animated parcel → van → plane → ship journey) for marketing/campaigns — share `…/rc` as its own link. It has no nav/footer on purpose.
- Project conventions & gotchas are documented for Claude in `AGENTS.md` and the website-builder skill — you don't need to read these; Claude follows them.

---

## Quick reference

| I want to… | Do this |
|---|---|
| Start a change | GitHub Desktop → New branch (off latest `main`) |
| See it locally | `npm run dev` → localhost:3000 (live reload) |
| Get a preview link | Commit → Push → Create Pull Request |
| Make it live | Merge the PR → delete the branch |
| Fix a conflict | Stop, ask Claude |

**Golden rule again:** branch → change → preview → merge. Never commit to `main`.
