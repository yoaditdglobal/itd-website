# URL Structure Decision — Recommendation

**Recommendation:** Option A+ (keep current IA, enrich shipping pages with audience anchors).
**Status:** Recommended, pending user confirmation.

---

## The question

The spreadsheet proposes restructuring `/shipping/{geography}` URLs into `/solutions/{geography}` with audience sections embedded inside (anchor-linked), while also keeping standalone `/solutions/{audience}` pages. This would create overlapping content paths and significant URL migration work.

Should we:
- **A**: Keep current IA (`/shipping/{geo}` + `/solutions/{audience}`)
- **A+**: Keep current IA, but enrich shipping pages with short audience-anchor sections that deep-link to the full audience page
- **B**: Adopt spreadsheet IA literally (`/solutions/{geo}` with embedded audience sections, plus separate `/solutions/{audience}` pages)
- **C**: Hybrid (some overlap between geo and audience pages, content lives in both)

---

## Recommendation: Option A+

### What stays the same

- `/shipping/domestic`, `/shipping/international`, `/shipping/freight` — geography-led pages, unchanged URL
- `/solutions/{enterprise, small-business, ecommerce, marketplace-seller, 3pl, b2b, export, import}` — audience-led pages, unchanged URLs

### What changes

Each shipping page (`/shipping/domestic`, `/shipping/international`) gains a short **"Built for"** section with audience anchor links matching the spreadsheet's intent:

```
/shipping/domestic
  #ecommerce          → 60-word summary + CTA "See full eCommerce solution →" linking to /solutions/ecommerce
  #marketplace        → 60-word summary + CTA → /solutions/marketplace-seller
  #3pl                → 60-word summary + CTA → /solutions/3pl
  #b2b                → 60-word summary + CTA → /solutions/b2b
  #enterprise         → 60-word summary + CTA → /solutions/enterprise
  #small-business     → 60-word summary + CTA → /solutions/small-business
```

Same pattern on `/shipping/international` with the export/import audience anchors.

The shipping pages stay geography-themed (carriers, lanes, postcodes, coverage, customs, freight). The audience anchors are short summaries; the full audience pitch lives at the canonical `/solutions/{audience}` URL.

### What we explicitly reject from the spreadsheet

- **`/solutions/marketplace`** — keep `/solutions/marketplace-seller`. SEO queries are "amazon marketplace seller software", "ebay seller fulfilment platform", "marketplace seller shipping uk". "Marketplace seller" is the buyer term and the SEO term.
- **Migrating `/shipping/X` to `/solutions/X`** — breaks the nav structure we just built, breaks any existing inbound links, and conflates two distinct intent groups.
- **Duplicating full content between shipping and audience pages** — guaranteed SEO cannibalisation. AI models also penalise duplicate content for citation.

---

## Why Option A+ wins

### 1. SEO — preserves intent matching

| Query type | Example | Best URL |
|---|---|---|
| Geography intent | "uk domestic parcel shipping" | `/shipping/domestic` |
| Geography intent | "international shipping platform uk" | `/shipping/international` |
| Audience intent | "shopify multi-carrier shipping" | `/solutions/ecommerce` |
| Audience intent | "3pl shipping software uk" | `/solutions/3pl` |
| Cross-intent (long-tail) | "uk domestic shipping for ecommerce" | `/shipping/domestic#ecommerce` → `/solutions/ecommerce` |

One canonical URL per primary intent. Long-tail queries that combine both intents get a deep-link from the geography page into the audience page. This is the textbook structure for ranking both intent groups without cannibalisation.

### 2. GEO (Generative Engine Optimization)

AI models cite URLs, not anchors. They prefer dedicated, deeply-themed pages over fragmented sections. Putting full audience content inside a geography URL (the spreadsheet's structure) means:
- Claude/ChatGPT/Perplexity get one page mixing eCommerce + Marketplace + 3PL + B2B + Enterprise content
- Entity density per topic drops
- The "eCommerce shipping" answer competes against the "Marketplace shipping" answer for the same page
- Citation likelihood per topic drops

Option A+ keeps each audience as a dedicated, entity-dense page that AI models can confidently identify as the answer for that audience's queries.

### 3. UX — matches how buyers actually find ITD

Two buyer paths exist:

| Buyer | Path |
|---|---|
| "I'm a Shopify brand needing better shipping" | Lands on `/solutions/ecommerce` directly via search. Doesn't care about geography first. |
| "I need a UK domestic parcel solution" | Lands on `/shipping/domestic` via search. Then identifies which audience section applies to them, clicks through to the full audience page. |

Option A+ serves both paths cleanly. The audience-anchor sections on shipping pages serve the second path. The standalone audience pages serve the first.

### 4. Aligns with existing navigation

The navbar already has Shipping (first position) and Solutions (second position) as separate top-level menus. Migrating to the spreadsheet's IA would require restructuring the nav AND the URLs AND the content. Option A+ keeps the nav unchanged.

### 5. Migration cost: zero

Option A+ requires no URL changes, no redirects, no broken backlinks, no sitemap rebuild. The existing `/shipping/{geo}` pages get content enrichment (the audience-anchor sections); the existing `/solutions/{audience}` pages get the full audience pitch from the spreadsheet content angles.

Option B (literal spreadsheet) would require:
- 3 page moves (`/shipping/domestic` → `/solutions/domestic` etc.)
- 3 permanent 301 redirects
- Sitemap update
- Internal link sweep across every page that references shipping URLs
- Nav restructure

The migration cost is real and the SEO/GEO benefit is negative.

---

## Implementation impact on Phase 2

### Pages requiring content drafts (unchanged from original plan)

| Page | Spreadsheet source tab | Notes |
|---|---|---|
| `/solutions/enterprise` | Enterprise tab | Full audience pitch. Spreadsheet content angle applies. |
| `/solutions/small-business` | SMB tab | Full audience pitch. |
| `/solutions/ecommerce` | eCommerce tab | Pilot already drafted. |
| `/solutions/marketplace-seller` | Marketplace tab | Full audience pitch. Keep `-seller` slug. |
| `/solutions/3pl` | 3PL tab | Full audience pitch. |
| `/solutions/b2b` | B2B tab | Full audience pitch. |
| `/solutions/export` | (not in spreadsheet) | Keep — operationally distinct from International. Source from our ICP doc. |
| `/solutions/import` | (not in spreadsheet) | Keep — operationally distinct from International. Source from our ICP doc. |

### Pages requiring content drafts (new, expanded from spreadsheet)

| Page | Spreadsheet source tab | Treatment |
|---|---|---|
| `/shipping/domestic` | Domestic tab | Geography-led hero + audience anchor sections (60 words each, link to full `/solutions/{audience}`) |
| `/shipping/international` | International tab | Geography-led hero + export/import anchors + audience anchors |
| `/shipping/freight` | Shipping tab ("Add Freight") | New — full draft needed |
| `/` (Home) | Homepage tab | Hero + Connexx intro + Domestic/International solution cards + proof section |
| `/connexx` | Connexx tab | Hero + 6 modules + social proof + developer API section |
| `/integrations` | Integrations tab | Hub + tech grid + carrier grid |
| `/resources/case-studies` | Resources tab | Hub with category filter |

### New pages outside the original plan

| URL | Source tab | Notes |
|---|---|---|
| `/help` | Help tab | New section. Hub + 3 sub-pages |
| `/help/centre` | Help tab | Documentation hub |
| `/help/submit-request` | Help tab | Support form, routing TBC |
| `/help/developers` | Help tab | API docs hub |
| `/resources/guides/far-east-imports` | Resources tab | Blog/guide post |
| `/resources/guides/fbm` | Resources tab | Blog/guide post (Fulfilled by Merchant) |

These add scope beyond the original Phase 2-5 plan. Suggest treating Help and Guides as **Phase 5+** (after the core solution/shipping/connexx pages are locked).

---

## What this looks like in practice — example

`/shipping/domestic` page structure:

```
Hero — "Multi-carrier domestic shipping across the UK"
  ↓
Geography content — Mainland UK, Highlands & Islands, Channel Islands, NI coverage
  Carrier comparison table (Royal Mail vs DPD vs Evri vs Parcel Force etc.)
  ↓
"Built for" section
  #ecommerce         60-word summary about eCommerce. "See the full eCommerce solution →" /solutions/ecommerce
  #marketplace       60-word summary about Marketplace Seller. "See the full Marketplace solution →" /solutions/marketplace-seller
  #3pl               60-word summary about 3PLs. "See the full 3PL solution →" /solutions/3pl
  #b2b               60-word summary. → /solutions/b2b
  #enterprise        60-word summary. → /solutions/enterprise
  #small-business    60-word summary. → /solutions/small-business
  ↓
Pain points (geography-specific: out-of-area surcharges, fuel surcharges, regional variability)
  ↓
How Connexx solves it (geography lens)
  ↓
Integrations (UK carriers prominent)
  ↓
Case study (Peak Commerce — UK domestic example)
  ↓
FAQ (geography-themed: "Does Connexx cover Highlands & Islands?", "Which UK carriers do you integrate with?")
  ↓
CTA (Run the Domestic Savings Estimator)
```

The audience-anchor sections give the spreadsheet what it wants without breaking the IA.

---

## Decision

Pending user confirmation. If approved, this locks the URL structure for Phase 2 and the plan file is updated to reflect Option A+.
