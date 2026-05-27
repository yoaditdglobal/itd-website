# /help section — IA scoping

**Status:** Pending review
**Purpose of this doc:** Scope the new /help section before content gets implemented. Flag every architectural decision the team needs to make.

---

## Purpose

The /help section is a utility hub for three reader types:

1. **Existing customers (post-sale)** — looking for a specific answer about Connexx, carrier setup, billing, or account admin. They want to self-serve, but they want a fast route to a human if they can't.
2. **Prospects mid-evaluation** — looking for evidence the platform is operational (status page, changelog, response times, API documentation). Help content is part of how they verify the vendor before signing.
3. **Developers integrating with Connexx** — looking for API documentation, authentication, webhooks, rate limits, and the OpenAPI spec. This is the CTO/IT Manager variant of the Connexx ICP.

The section sits outside the marketing funnel. Voice still applies. Content is operational and direct.

---

## Page hierarchy

```
/help                                          (hub)
├── /help/centre                               (knowledge base index)
│   ├── /help/centre/connexx                   (category: Connexx platform)
│   ├── /help/centre/integrations              (category: Integrations)
│   ├── /help/centre/carriers                  (category: Carriers)
│   ├── /help/centre/billing                   (category: Billing)
│   ├── /help/centre/account                   (category: Account & admin)
│   └── /help/centre/{category}/{article}      (individual article)
├── /help/submit-request                       (support form)
└── /help/developers                           (developer resources hub)
    ├── (links out to docs.itdglobal.com — flag URL)
    └── /help/developers/changelog             (or external — flag)
```

URL convention notes:
- "centre" not "center" (British English, per style-guide Rule 6).
- Article slugs are kebab-case, descriptive, stable. Example: `/help/centre/integrations/connecting-shopify-to-connexx`.
- Category slugs match the five product areas in the help.csv content mapping.

---

## Components needed

New React components required for Phase 5:

| Component | Purpose | Reusable? |
|---|---|---|
| `HelpHubLayout` | /help — search bar + 3-card grid + popular articles + FAQ | No (hub-specific) |
| `HelpCentreLayout` | /help/centre — search + 6 category cards + featured articles | No |
| `HelpCategoryLayout` | /help/centre/{category} — category header + article list | Yes (one per category) |
| `HelpArticleLayout` | /help/centre/{category}/{article} — article body + table of contents + related links | Yes (one per article) |
| `SupportForm` | /help/submit-request — form with field validation, file upload, success state | No |
| `DeveloperHubLayout` | /help/developers — 6 resource cards + code snippet + FAQ | No |
| `SearchBar` | Shared search input (used in hub + centre) | Yes |
| `SearchResults` | Modal or page rendering matched articles | Yes |

Existing components to reuse:
- `JsonLd` from `src/components/seo/JsonLd.tsx`
- `Faq` block from existing solution pages (extend if needed)
- Toast pattern from the rate checker (for form submission feedback)
- Page metadata via `buildMetadata()` in `src/lib/metadata.ts`

---

## Search functionality

Three options ranked by recommendation:

**Option 1 — Algolia DocSearch (recommended for v1 once articles exist)**
- Free for open documentation sites if applied for via Algolia.
- Indexes content automatically on a schedule.
- Fast, familiar UX, accessible.
- Cost: free tier likely sufficient for ITD volume.
- Decision: apply for DocSearch once /help/centre has 10+ live articles.

**Option 2 — Custom Next.js search with a static index**
- Build a JSON index at build time from MDX files.
- Client-side fuzzy search with FlexSearch or Fuse.js.
- Full control, no third-party dependency.
- Cost: dev time.
- Decision: viable if we want a single-file solution.

**Option 3 — Defer search, start with manual category browse**
- /help and /help/centre ship with category cards and a list of articles per category.
- Search bar is a placeholder that links to /help/centre.
- Cost: zero. Lets us ship Phase 5 without blocking on a search decision.
- Decision: recommended for the very first ship. Add real search in Phase 5d.

**Recommendation:** ship Phase 5a/5b without functional search (placeholder bar that scrolls to the category list). Add Algolia DocSearch in Phase 5d once 10+ articles exist.

---

## Form routing

The submit-request form (POST endpoint) needs:

1. **A backend route handler** at `src/app/api/support/route.ts` (Next 16 Route Handler convention — see AGENTS.md note in repo root). Read the local Next docs in `node_modules/next/dist/docs/` before implementing.
2. **A Zod schema** for validation, consistent with the existing lead-capture flow (see how `/contact` and the rate checker validate).
3. **A destination** for the validated payload. Options:
   - HubSpot ticket via the Tickets API.
   - Zendesk via the Requests API.
   - Freshdesk via the Tickets API.
   - Email to support@itdglobal.com (simplest; appropriate for v1 if no CRM is in place yet).

**Flag for user to confirm:** which CRM or ticketing system support runs in today. If none, email-to-team is the v1 default. The route handler abstracts the destination so swapping later is a single-file change.

Security:
- Rate-limit the endpoint (1 submission per IP per minute) to prevent abuse.
- File uploads should go to a presigned URL pattern (S3 or equivalent), not directly to the route handler memory.
- Strip executable file types from the accepted list.

---

## SLA statement

The /help hub, /help/submit-request, and the FAQ entries all reference a support SLA. The wording must be consistent across pages.

**Proposed wording (draft, for confirmation):**

> We respond to all support requests within 1 business day. Platform-down issues are responded to within 1 hour, 24/7.

Tiering proposal:

| Priority | What it means | Response time |
|---|---|---|
| Low | General question, no operational impact | 1 business day |
| Medium | Operational issue, workaround available | 4 business hours |
| High | Production-down, no workaround | 1 hour, 24/7 |

**Flag for user to confirm:**
1. Are these the actual response times the support team can commit to?
2. Is 24/7 high-priority response staffed, or is it business-hours only?
3. Is there a separate enterprise SLA referenced in contracts? If so, that overrides the public-page wording for enterprise customers.

---

## Phasing recommendation

| Phase | Scope | Why this order |
|---|---|---|
| 5a | /help hub, /help/submit-request, /help/developers (3 pages) | Ships the section skeleton. Self-contained, no content backlog. |
| 5b | /help/centre with skeleton categories (no articles yet) | Reserves the URLs, ships the IA, lets the support team start writing. |
| 5c | Write top 10 most-requested help articles | Content-only work. Support team owns. |
| 5d | Add search (Algolia DocSearch or Fuse.js) | Only useful once articles exist. |
| 5e | Add changelog feed and status page integration on /help/developers | Depends on dev-side infrastructure being live. |

Phase 5a is the smallest unit that ships value. It gives prospects a support form and a developer hub, which are conversion-relevant for the Connexx ICP. /help/centre can wait until articles are written.

---

## Open questions for the user

1. **Support SLA wording.** Confirm response times by priority. See SLA section above.
2. **CRM destination for /help/submit-request.** Is the team using HubSpot, Zendesk, Freshdesk, or none? If none, default to email-to-team for v1.
3. **Phone support.** Do we offer it? If yes, list the number. If no, the FAQ should say so directly.
4. **API documentation location.** Two options:
   - **Subdomain:** docs.itdglobal.com (or docs.connexx.io — see open question about API domain).
   - **Path:** /help/developers/api with a docs-as-code generator (Mintlify, Redoc, Docusaurus).
   - Recommendation: subdomain with Mintlify or Redoc, linked from /help/developers.
5. **Status page URL.** status.itdglobal.com or a third-party (Statuspage, Better Stack, Instatus)?
6. **SDK availability.** Which SDKs exist today? If none, describe as "API client examples" rather than "SDKs".
7. **API domain.** The Connexx draft uses both `api.itdglobal.com` and `api.connexx.io` in examples. Confirm which is canonical.
8. **CMS for help articles.** Flat MDX in `/content/help/{category}/{article}.mdx`, or a headless CMS (Sanity, Contentful)? Flat MDX is recommended for v1 — version-controlled, no extra service.
9. **Top 10 popular articles list.** Needs the support team to identify the ten most-requested topics from existing ticket volume.
10. **Live chat.** The help.csv mentions live chat as an alternative. Is this live or a Phase 5+ ambition?

---

## Implementation notes (cross-cutting)

1. All new routes must be added to `sitemap.ts` ROUTES.
2. All new routes need a `metadata` export via `buildMetadata()`.
3. JSON-LD blocks (Breadcrumb + page-specific schema) per page.
4. The `/help` route is currently not linked from the main navigation. Confirm whether it goes in the top nav, footer, or both. Recommended: footer (utility), and a "Help" link in the top nav under a "More" dropdown if one exists.
5. The 404 page should link to /help/centre and /help/submit-request as a fallback.
6. After login (post-sale), the in-product help link should deep-link to /help/centre, not back to the marketing site.

---

## Voice notes for the /help section

These are utility pages, but the voice rules still apply:

- No em-dashes as connectors (style-guide Rule 1).
- No ban-list words (Rule 2).
- British English (Rule 6).
- Direct, declarative sentences. The reader is here to find an answer, not be sold to.
- The /help/developers page can be slightly more technical (CTO ICP), but still readable. Avoid jargon where a plain word works.
- FAQ answers follow the 40-80 word format from style-guide Rule 14 — the AI-extractable structure.
