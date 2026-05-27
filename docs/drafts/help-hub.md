# DRAFT — /help

**Status:** Pending review
**Voice check:** No em-dashes as connectors. No ban-list words. British English. Every claim sourceable. Read-aloud test passed.

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Help & Support \| ITD Global | 28 |
| Meta description | Find answers in the Help Centre, submit a support request, or open the developer resources. We respond to every request within 1 business day. | 142 |
| Canonical | https://itdglobal.com/help | — |
| OG image | /og/help.png (to be designed) | — |
| Primary keyword target | ITD Global support, Connexx help | — |
| Secondary clusters | Connexx documentation, Connexx API help, ITD contact support | — |

---

## Hero

**H1 (4 words):**
How can we help?

**Sub-headline (38 words):**
Browse the Help Centre for documentation and walkthroughs, submit a request if you need a direct answer from the support team, or open the developer resources for API documentation and the platform changelog.

**Search bar (prominent, above the cards):**
- Placeholder: "Search articles, integrations, carriers..."
- Behaviour: routes to /help/centre with the query string in v1 (until full search is wired). See help-ia.md, Phase 5d.

---

## Three help cards

Layout: 3-column grid on desktop, single column stacked on mobile. Each card has an icon, an H3, a two-line description, and a CTA.

### Card 1 — Help Centre

**Icon:** book or document stack
**H3:** Help Centre
**Description (24 words):**
Documentation, walkthroughs, and answers for Connexx, integrations, carriers, billing, and account admin. Browse by category or search.
**CTA:** `Browse the Help Centre` → /help/centre

### Card 2 — Submit a request

**Icon:** message or envelope
**H3:** Submit a request
**Description (22 words):**
Need a direct answer from our team? Tell us what's happening and we respond within 1 business day, 1 hour for platform-down issues.
**CTA:** `Submit a request` → /help/submit-request

### Card 3 — Developer resources

**Icon:** code brackets or terminal
**H3:** Developer resources
**Description (20 words):**
API documentation, the live status page, the changelog, and webhook reference. Everything you need to integrate with Connexx.
**CTA:** `Open developer resources` → /help/developers

---

## Popular articles (top 5)

Display as a horizontal list or 2-column grid. Each entry: article title (link) + one-line summary + category badge.

**Placeholder list — confirm with support team:**

1. **Connecting Shopify to Connexx**
   The 10-minute setup. Carrier accounts, label printing, and order sync from the Shopify admin.
   Category: Integrations

2. **Setting up your Royal Mail account in Connexx**
   How to add Tracked 24, Tracked 48, Signed, and First/Second Class services to your dispatch flow.
   Category: Carriers

3. **How rate comparison works**
   Live API call on every shipment, rule-based selection, and how to override the cheapest option when you need to.
   Category: Connexx Platform

4. **Generating customs documentation for international shipments**
   HS codes, EORI, IOSS for EU orders under €150, and country-specific paperwork.
   Category: Connexx Platform

5. **API authentication and rate limits**
   Bearer token setup, per-endpoint rate limits, and how to request a higher tier.
   Category: API & Developers

---

## FAQ (5 entries on the help system itself)

**How do I contact ITD support?**

Submit a request at /help/submit-request and our team responds within 1 business day. Platform-down issues are responded to within 1 hour. Include your account ID and a clear description of what's happening, with screenshots if useful. Confirmation arrives by email within 5 minutes of submission.

**What is your support SLA?**

We respond to low-priority requests within 1 business day, medium-priority operational issues within 4 business hours, and high-priority platform-down issues within 1 hour around the clock. Enterprise customers on a custom contract may have a different SLA in their agreement. See /help/submit-request for the request form and SLA panel.

**Do you offer phone support?**

[Confirm with user — placeholder answer below.]

Phone support is available for existing customers on a Connexx Pro or Enterprise plan. Submit a request first and a member of the team will call back within the SLA window. We do not operate a public support line.

**Where can I find the API documentation?**

API documentation lives at /help/developers, with the full reference at docs.itdglobal.com [confirm URL]. The reference includes every Connexx endpoint, authentication, webhooks, rate limits, and the OpenAPI spec. The /help/developers page also links to the live status page and the platform changelog.

**Can I get help setting up a carrier account?**

Yes. Carrier account setup is part of Connexx onboarding for new customers, and the Help Centre includes a walkthrough for every supported carrier. For account-specific issues (rate cards, child accounts, or contract terms), submit a request and the team will work with you and the carrier directly.

---

## JSON-LD

```ts
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Help", path: "/help" },
  ]),
  faqSchema([
    { question: "How do I contact ITD support?", answer: "Submit a request at /help/submit-request and our team responds within 1 business day. Platform-down issues are responded to within 1 hour. Include your account ID and a clear description of what's happening, with screenshots if useful. Confirmation arrives by email within 5 minutes of submission." },
    { question: "What is your support SLA?", answer: "We respond to low-priority requests within 1 business day, medium-priority operational issues within 4 business hours, and high-priority platform-down issues within 1 hour around the clock. Enterprise customers on a custom contract may have a different SLA in their agreement." },
    { question: "Do you offer phone support?", answer: "Phone support is available for existing customers on a Connexx Pro or Enterprise plan. Submit a request first and a member of the team will call back within the SLA window. We do not operate a public support line." },
    { question: "Where can I find the API documentation?", answer: "API documentation lives at /help/developers, with the full reference at docs.itdglobal.com. The reference includes every Connexx endpoint, authentication, webhooks, rate limits, and the OpenAPI spec." },
    { question: "Can I get help setting up a carrier account?", answer: "Yes. Carrier account setup is part of Connexx onboarding for new customers, and the Help Centre includes a walkthrough for every supported carrier. For account-specific issues, submit a request and the team will work with you and the carrier directly." },
  ]),
]} />
```

---

## Implementation notes

1. **New route:** `src/app/help/page.tsx`. Read the local Next 16 docs in `node_modules/next/dist/docs/` before writing (per `AGENTS.md`).
2. **Metadata:** export via `buildMetadata()` from `src/lib/metadata.ts`.
3. **Search bar:** in v1, the input routes to `/help/centre?q={query}` on submit. The /help/centre page reads the query and filters the article list client-side. Real Algolia integration is Phase 5d.
4. **Three cards:** new `HelpHubLayout` component. Each card is icon + H3 + description + CTA in a single `<a>` wrapping the whole card for full-tile click.
5. **Popular articles:** placeholder list until the support team confirms top 5. Use a `popularArticles` constant exported from `src/lib/help-data.ts` so the list can be updated in one file across hub and centre pages.
6. **FAQ block:** reuse the existing FAQ component pattern from the solution pages. If a shared `Faq` component does not yet exist, extract one as part of this work.
7. **Add to sitemap.ts ROUTES.**
8. **Add a /help link to the footer.** Confirm whether it also goes in the top nav.

---

## Reviewer questions

1. Confirm the support SLA wording (1 business day, 4 business hours, 1 hour). See help-ia.md for the full tiering proposal.
2. Confirm whether phone support is offered, and if so, for which plans.
3. Confirm the top 5 popular articles list. Placeholder is in this draft.
4. Confirm the API documentation URL (docs.itdglobal.com vs path-based at /help/developers/api).
5. Confirm whether /help goes in the top navigation, footer, or both.
6. Confirm icon set for the three cards. Lucide icons are already in the codebase.
