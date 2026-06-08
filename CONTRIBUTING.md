# Contributing — how we make and review changes

This project deploys automatically:

- **`main` branch = production.** Every merge into `main` is built by Netlify and goes **live** on the real site.
- **Pull Requests get a preview.** When you open a Pull Request, Netlify builds a **Deploy Preview** — a private, shareable link that shows the *real rendered site* with your changes. This is where we review the **design** before anything goes live.

> Golden rule: **never commit straight to `main`.** Every change goes through a branch and a Pull Request so it can be previewed first.

---

## One-time setup (per computer)

The easiest path (no terminal needed):

1. Install **[GitHub Desktop](https://desktop.github.com/)** and sign in with your GitHub account.
2. **File → Clone repository →** `yoaditdglobal/itd-website`.
3. To run the site on your own machine (optional): open a terminal in the project folder and run:
   ```bash
   npm install
   npm run dev
   ```
   then visit http://localhost:3000

Command-line alternative:
```bash
git clone https://github.com/yoaditdglobal/itd-website.git
cd itd-website
npm install
```

---

## Making a change (every time)

Using GitHub Desktop:

1. **Current branch → New branch** → name it e.g. `feature/ecommerce-hero-image`. (Always branch from an up-to-date `main` — click *Fetch origin* first.)
2. Make your edits and save.
3. Write a short summary in the bottom-left box → **Commit to feature/…**.
4. **Push origin** (top bar).
5. **Create Pull Request** (top bar) → this opens GitHub in your browser → **Create**.
6. On the Pull Request page, wait ~1–2 minutes for the **Netlify Deploy Preview** link to appear (a `deploy-preview-…netlify.app` URL). **Open it and check the design.**
7. Need a tweak? Just commit + push again to the same branch — the preview updates automatically.
8. Happy? **Merge** the Pull Request. Netlify deploys `main` to production within a couple of minutes.

Command-line equivalent:
```bash
git checkout main && git pull
git checkout -b feature/short-description
# ...make changes...
git add -A
git commit -m "Describe the change"
git push -u origin feature/short-description
# then open the PR from the link Git prints, or on github.com
```

---

## Reviewing (design, not code)

You don't need to read code. On the Pull Request, click the **Netlify Deploy Preview** link and look at the live rendered pages. Approve/merge when it looks right; request changes (or just say what to fix) if not.
