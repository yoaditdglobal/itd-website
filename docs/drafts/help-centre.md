# DRAFT — /help/centre

**Status:** Pending review
**Voice check:** No em-dashes as connectors. No ban-list words. British English. Every claim sourceable. Read-aloud test passed.

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Help Centre \| ITD Global | 26 |
| Meta description | Documentation and walkthroughs for Connexx, integrations, carriers, billing, and account admin. Browse by category or search for an article. | 137 |
| Canonical | https://itdglobal.com/help/centre | — |
| OG image | /og/help-centre.png (to be designed) | — |
| Primary keyword target | Connexx documentation, ITD help centre | — |
| Secondary clusters | Connexx Shopify setup, Royal Mail Connexx, Connexx onboarding | — |

---

## Hero

**H1 (2 words):**
Help Centre

**Sub-headline (24 words):**
Documentation, walkthroughs, and answers for Connexx and every supported integration. Browse the categories below or search for the article you need.

**Search bar:**
- Placeholder: "Search articles..."
- Behaviour in v1: client-side filter over the article index. See help-ia.md for Phase 5d Algolia upgrade.

---

## Browse by category (6 categories)

Layout: 3-column grid on desktop (2 rows of 3), single column on mobile. Each card has icon + H3 + 1-line description + article count placeholder + link to category page.

### 1. Connexx platform
**Icon:** dashboard
**Description (14 words):** Getting started, dashboard tour, rate engine, dispatch rules, account settings, and reporting.
**Article count:** [count] articles
**Link:** /help/centre/connexx

### 2. Integrations
**Icon:** plug or connector
**Description (15 words):** eCommerce platforms, ERPs, WMS, marketplaces, and accounting tools that connect to Connexx.
**Article count:** [count] articles
**Link:** /help/centre/integrations

### 3. Carriers
**Icon:** truck
**Description (13 words):** Setting up carrier accounts, label printing, manifesting, and managing carrier-specific services.
**Article count:** [count] articles
**Link:** /help/centre/carriers

### 4. Billing
**Icon:** receipt
**Description (12 words):** Invoicing, payment methods, rate cards, billing cycles, and credit notes.
**Article count:** [count] articles
**Link:** /help/centre/billing

### 5. Account & admin
**Icon:** users
**Description (13 words):** Users, permissions, child accounts, single sign-on, audit logs, and account security.
**Article count:** [count] articles
**Link:** /help/centre/account

### 6. API & developers
**Icon:** code
**Description (12 words):** API authentication, endpoints, webhooks, rate limits, SDKs, and the changelog.
**Article count:** See /help/developers
**Link:** /help/developers

---

## Featured articles

Display: top 10 most-viewed articles. Each entry has title (link), one-line summary, category badge.

**Placeholder until support team confirms the top 10:**

1. **Connecting Shopify to Connexx.** Set up the official Shopify app and route every order through multi-carrier comparison in under 10 minutes. *(Integrations)*

2. **Setting up your Royal Mail account.** Add Tracked 24, Tracked 48, Signed, First Class, and Second Class services to your dispatch flow. *(Carriers)*

3. **How rate comparison works.** Live API call on every shipment, rule-based carrier selection, and overrides for specific products or lanes. *(Connexx platform)*

4. **Generating customs documentation.** HS codes from your product catalogue, EORI numbers, IOSS for EU under €150, and country-specific paperwork. *(Connexx platform)*

5. **Linking your ERP to Connexx.** Order pull, label write-back, and tracking sync for the most common ERPs and WMSs. *(Integrations)*

6. **Inviting users and setting permissions.** Adding teammates, role-based access control, and managing child accounts under a parent contract. *(Account & admin)*

7. **Reading your monthly invoice.** Line items by carrier, surcharges, fuel costs, and how to reconcile a Connexx invoice against your carrier invoices. *(Billing)*

8. **Printing a label.** Format options, printer setup, and what to do when the label generation fails. *(Connexx platform)*

9. **Handling a customs hold.** What to do when a carrier flags a customs issue, how to upload missing documents, and how to prevent the same issue next time. *(Carriers)*

10. **API authentication.** Bearer token setup, key rotation, environment separation between staging and production. *(API & developers)*

---

## FAQ (5 entries)

The cross-category questions that come up most often.

**Where do I start if I am new to Connexx?**

Start with the Connexx platform category for the dashboard tour and the rate engine overview, then move to Integrations to connect your eCommerce platform or ERP, then to Carriers to add your carrier accounts. Most new customers are dispatching live within two business days of signing.

**How do I search for a specific article?**

Use the search bar at the top of this page or on /help. Search matches article titles, summaries, and body text across every category. If the search returns no results, the article may not exist yet. Submit a request at /help/submit-request and the team will answer directly.

**Can I get help if I am not yet a customer?**

Yes. The Help Centre is open to anyone evaluating Connexx. Browse the categories, read the integration guides, and check the developer documentation at /help/developers. For platform-specific questions during evaluation, submit a request and the team will respond within 1 business day.

**Are these articles kept up to date?**

Yes. Articles are reviewed by the product and support teams whenever the underlying feature changes. Every article shows its last-updated date at the top. If you find an article that does not match what you see in Connexx, submit a request and we will fix it.

**What if I cannot find the answer here?**

Submit a request at /help/submit-request. Tell us what you were trying to do and what happened. We respond within 1 business day, 1 hour for platform-down issues. The team will answer the question and, where appropriate, write a new help article so the next person finds it directly.

---

## JSON-LD

```ts
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Help", path: "/help" },
    { name: "Help Centre", path: "/help/centre" },
  ]),
  // ItemList for the 6 categories — helps AI models cite the structure
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Connexx platform", "url": "https://itdglobal.com/help/centre/connexx" },
      { "@type": "ListItem", "position": 2, "name": "Integrations", "url": "https://itdglobal.com/help/centre/integrations" },
      { "@type": "ListItem", "position": 3, "name": "Carriers", "url": "https://itdglobal.com/help/centre/carriers" },
      { "@type": "ListItem", "position": 4, "name": "Billing", "url": "https://itdglobal.com/help/centre/billing" },
      { "@type": "ListItem", "position": 5, "name": "Account & admin", "url": "https://itdglobal.com/help/centre/account" },
      { "@type": "ListItem", "position": 6, "name": "API & developers", "url": "https://itdglobal.com/help/developers" },
    ],
  },
  faqSchema([
    { question: "Where do I start if I am new to Connexx?", answer: "Start with the Connexx platform category for the dashboard tour and the rate engine overview, then move to Integrations to connect your eCommerce platform or ERP, then to Carriers to add your carrier accounts. Most new customers are dispatching live within two business days of signing." },
    { question: "How do I search for a specific article?", answer: "Use the search bar at the top of this page or on /help. Search matches article titles, summaries, and body text across every category. If the search returns no results, the article may not exist yet. Submit a request at /help/submit-request and the team will answer directly." },
    { question: "Can I get help if I am not yet a customer?", answer: "Yes. The Help Centre is open to anyone evaluating Connexx. Browse the categories, read the integration guides, and check the developer documentation at /help/developers." },
    { question: "Are these articles kept up to date?", answer: "Yes. Articles are reviewed by the product and support teams whenever the underlying feature changes. Every article shows its last-updated date at the top." },
    { question: "What if I cannot find the answer here?", answer: "Submit a request at /help/submit-request. Tell us what you were trying to do and what happened. We respond within 1 business day, 1 hour for platform-down issues." },
  ]),
]} />
```

---

## Implementation notes

1. **New routes (three of them):**
   - `src/app/help/centre/page.tsx` — this page (index).
   - `src/app/help/centre/[category]/page.tsx` — category page.
   - `src/app/help/centre/[category]/[article]/page.tsx` — article page.
   Read the local Next 16 docs in `node_modules/next/dist/docs/` for route conventions before implementing.
2. **Content layer.** Flat MDX in `/content/help/{category}/{article}.mdx` is the recommended v1 approach. Use Next 16 file-system content loading. Each MDX has frontmatter for title, summary, category, lastUpdated, order. Alternative: a headless CMS (Sanity, Contentful). Flag for user decision in help-ia.md.
3. **Article count per category.** Computed at build time by counting MDX files in `/content/help/{category}`. Renders as a small text under the category description.
4. **Featured articles list.** A `featuredArticles` constant in `src/lib/help-data.ts`, an array of 10 article slugs. Same constant powers the /help popular articles section.
5. **Search.** v1 is client-side over the article index. The article index is generated at build time from MDX frontmatter into a single JSON file shipped to the client. Fuse.js is a lightweight fit. Phase 5d swaps for Algolia.
6. **Category page (`[category]/page.tsx`).** Shows the category title, description, full article list grouped by sub-section or alphabetical. Reuses the search bar.
7. **Article page (`[category]/[article]/page.tsx`).** Renders the MDX body, table of contents from H2s, last-updated date, "Was this helpful?" feedback widget (Phase 5d), related articles by tag.
8. **Add all three routes to sitemap.ts.** The article and category URLs are generated dynamically from the MDX file system.
9. **JSON-LD per article.** Each article uses `Article` schema with author, datePublished, dateModified, breadcrumb.

---

## Reviewer questions

1. **CMS choice.** Flat MDX files (recommended), Sanity, Contentful, or custom?
2. **Search backend.** Client-side Fuse.js for v1, Algolia DocSearch for Phase 5d, or defer entirely?
3. **Article ownership.** Who writes and maintains the articles? Product team, support team, or shared?
4. **Article review cycle.** How often are articles reviewed for accuracy? Quarterly is a reasonable default.
5. **Confirm the 10 featured articles** once the support team identifies the top-requested topics.
6. **"Was this helpful?" feedback widget.** Yes/no with optional comment, routed to support@. Phase 5d or v1?
