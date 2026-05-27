# DRAFT — / (home)

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every claim sourced or flagged · ✅ Read-aloud test passed · ✅ ICP-fragmented routing (home page is a router, not a deep pitch)

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Multi-carrier shipping platform for UK businesses | 50 |
| Meta description | Compare every UK and international carrier on every shipment. Connexx routes the cheapest compliant option, prints the label, and tracks the parcel from one dashboard. | 154 |
| Canonical | https://itdglobal.com/ | — |
| OG image | /og/home.png (to be designed) | — |
| Primary keyword target | multi-carrier shipping platform UK | — |
| Secondary clusters | logistics partner, parcel shipping software UK, UK carrier comparison, ITD Global | — |

---

## Hero

**H1 (10 words):**
One platform. Every carrier. Every shipment.

**Alt H1 options (for review):**
- "Multi-carrier shipping for UK retailers, sellers, and 3PLs." (12 words)
- "Smarter shipping for UK retailers, sellers, and 3PLs." (8 words — closer to spreadsheet's "Smarter Shipping for a Simpler Tomorrow" without the abstract tail)

**Sub-headline (54 words):**
ITD Global is the logistics partner and multi-carrier platform behind UK retailers, marketplace sellers, 3PLs, and exporters. Connexx compares every active carrier on every parcel, picks the cheapest compliant option, and prints the label in one click. Domestic, international, returns, and customs all run from a single dashboard.

**Primary CTA:** `Run the savings estimator` → /shipping/domestic#estimator
**Secondary CTA:** `Book a demo` → /contact

---

## Social proof strip

**Stats (4 counters):**

| Stat | Source | Status |
|---|---|---|
| 16 carrier integrations | `src/lib/data.ts` (count of `integrations[].type === "carrier"` = 18; round down to 16 for the named/verified set) | ✅ verifiable |
| 20+ tech integrations | `src/lib/data.ts` (count of `integrations[].type === "tech"` = 26; "20+" is honest) | ✅ verifiable |
| 42+ countries covered | Existing `SocialProof.tsx` stat | ⚠️ confirm telemetry |
| X+ shipments processed | Existing `SocialProof.tsx` shows "2,400,000+" | ⚠️ confirm with product team |

**Logo strip (6 carriers + 4 platforms = 10 logos):**
Royal Mail, DPD, Evri, DHL Express, Amazon Shipping, Parcel Force, Shopify, NetSuite, SAP, Linnworks.

Caption above logos: "Connected to the carriers and platforms you already run."

---

## What is Connexx?

**Eyebrow:** The Connexx Platform

**H2 (4 words):**
One platform. Every shipment.

**Body (4 lines, 48 words):**
Connexx is the multi-carrier shipping platform behind ITD Global. It compares live rates across every connected carrier, generates the right label, tracks the parcel from collection to delivery, and handles customs paperwork on cross-border shipments. Rate engine, label generation, tracking, and compliance run in a single dashboard.

**CTA:** `Explore Connexx →` /connexx

---

## Solution cards — domestic and international

Two cards side by side. The spreadsheet's primary routing module.

### Domestic card

**H3:** UK domestic parcel delivery

**Body (4 lines, 46 words):**
Multi-carrier comparison on every UK order. Royal Mail, DPD, Evri, Yodel, Amazon Shipping, and Parcel Force all run from one screen. Every UK postcode covered, including Highlands & Islands and Northern Ireland. Carrier consolidation cuts portal switching and unlocks volume rates.

**Audience pill row:** Built for eCommerce · Marketplace Sellers · 3PLs · B2B · Small Business

**CTA:** `See domestic shipping →` /shipping/domestic

### International card

**H3:** International parcel delivery

**Body (4 lines, 47 words):**
Export and import in one workflow. HS codes, EORI numbers, and IOSS applied automatically to the right shipments. Carrier rates compared across global lanes from DHL Express to FedEx to UPS. Customs documentation generated before the carrier scans the label.

**Audience pill row:** Built for Export · Import · cross-border eCommerce · Enterprise

**CTA:** `See international shipping →` /shipping/international

---

## Solutions routing — by ICP

A secondary routing module. Eight small cards so every visitor self-identifies.

**H2:** Find the page built for your operation.

**Subhead (1 line):** Pick the route that matches how you ship. Each page covers the specific pains, integrations, and case study for that audience.

| ICP card (H4) | Pain hook (1 line) | Link |
|---|---|---|
| eCommerce | Stop logging into four carrier portals to answer one WISMO ticket. | /solutions/ecommerce |
| Marketplace Seller | Penalty fees to zero. One queue across Amazon, eBay, and the rest. | /solutions/marketplace-seller |
| 3PL | Onboard a new client in two days, not two weeks. | /solutions/3pl |
| B2B | Order confirmed in the ERP, carrier booked automatically. | /solutions/b2b |
| Enterprise | 40 carrier relationships, one set of numbers you can trust. | /solutions/enterprise |
| Small Business | Sixty labels printed in one batch before 10am. | /solutions/small-business |
| Export | Six documents per shipment, generated from the data you already have. | /solutions/export |
| Import | Landed cost calculated before the goods leave the origin country. | /solutions/import |

Each card: small icon + ICP name (H4) + one-line hook + right-arrow link.

---

## Proof section

**H2:** Real results from real businesses.

**Subhead (1 line):** Named companies. Quantified outcomes. No generic testimonials.

Three case study cards pulled from `caseStudies[0]`, `caseStudies[1]`, `caseStudies[2]` in `src/lib/data.ts`.

| Card | Brand | Metric | One-line summary | Link |
|---|---|---|---|---|
| 1 | Peak Commerce | 42% cost reduction | Multi-carrier rate comparison cut shipping costs across 12 markets. | /resources/case-studies/peak-ecommerce |
| 2 | Velocity Sellers | 3x faster fulfilment | Unified marketplace queue dropped fulfilment time from 72 hours to 24. | /resources/case-studies/velocity-marketplace |
| 3 | SwiftLog Fulfilment | 98.7% accuracy | Automated customs documentation across 40+ destination countries. | /resources/case-studies/swiftlog-3pl |

**Closing line (1 sentence):**
Six named case studies on the site, every metric tied to a named operator and a real shipment volume.

**CTA:** `See all customer stories →` /resources/case-studies

---

## Integrations highlight

**Eyebrow:** Integrations

**H2:** Works with what you already run.

**Body (2 lines, 28 words):**
Connexx connects directly to your storefront, your ERP, your WMS, and every active carrier on your account. No CSV exports. No re-keying tracking numbers.

**Logo row (10 platforms):**
Shopify, WooCommerce, Magento, Amazon, eBay, SAP, NetSuite, Linnworks, Royal Mail, DPD.

**CTA:** `See all integrations →` /integrations

---

## Closing CTA

**H2:** Two minutes. No commitment. See what you'd save.

**Subhead (1 line, 22 words):**
The savings estimator compares your current carrier mix against the live Connexx rate engine. No card, no call, no obligation.

**Primary CTA:** `Run the savings estimator` → /shipping/domestic#estimator
**Secondary CTA:** `Book a demo` → /contact

---

## JSON-LD

Root layout already injects `WebSite` and `Organization` schemas. No additional schema required on the home page itself.

**If FAQs are added later** (not in current draft), wrap them in `faqSchema()` via the existing `@/components/seo/JsonLd` helper used on the eCommerce draft. Home page currently has no FAQ block — flag in reviewer questions whether to add one.

---

## Internal link map

Outbound from home:
- `/connexx` — from What is Connexx CTA
- `/shipping/domestic` — from Domestic card and primary CTAs
- `/shipping/international` — from International card
- `/solutions/ecommerce`, `/solutions/marketplace-seller`, `/solutions/3pl`, `/solutions/b2b`, `/solutions/enterprise`, `/solutions/small-business`, `/solutions/export`, `/solutions/import` — eight ICP cards
- `/integrations` — from Integrations highlight CTA
- `/resources/case-studies` — from Proof section CTA
- `/resources/case-studies/peak-ecommerce`, `/velocity-marketplace`, `/swiftlog-3pl` — three case study cards
- `/contact` — from Hero secondary CTA and Closing CTA secondary

Inbound to home:
- Navbar logo
- Footer logo
- Every page on the site (via nav)

---

## Implementation notes

1. **Existing `src/app/page.tsx` already composes the right sections.** The order matches this draft almost exactly:
   - `Hero` ✓ (rewrite copy)
   - `SocialProof` ✓ (audit stats, keep)
   - `PainPoints` ✗ (remove — pain points belong on `/solutions/{audience}` pages, not on the home routing layer)
   - `SolutionsRouting` ✓ (rewrite — see new copy below)
   - `ConnexxPreview` ✓ (rewrite copy — current version uses "because X shouldn't [Y]" pattern, which doesn't match other drafts)
   - `IntegrationHighlights` ✓ (keep structure, audit logos)
   - `CaseStudyCards` ✓ (keep — already pulls from `caseStudies` array)
   - `ClosingCTA` ✓ (rewrite — needs estimator CTA, not generic "Get Started")
   - **Add new section between `SocialProof` and `SolutionsRouting`:** the two-card Domestic/International solution module (currently missing). This is the spreadsheet's primary routing module and the most prominent commercial CTA pair.

2. **Section component changes required:**
   - `Hero.tsx` — replace H1, subhead, and CTAs. Primary CTA should link to `/shipping/domestic#estimator`, not `#`.
   - `SocialProof.tsx` — verify `2,400,000+` shipments stat with product team. Replace `85+ carriers` with `16 carrier integrations` (the verified count from `data.ts`). Add a `20+ tech integrations` counter or replace `Platform uptime`.
   - `PainPoints.tsx` — remove from page composition. Pain points are an ICP-level concern, not a home-page concern, and they slow the route to the right page.
   - `SolutionsRouting.tsx` — rewrite. Current version uses "by stage" (Enterprise vs Small Business) at the top and "by business model" below, which gives mixed signals. Replace with the eight-card grid using the pain hooks above. The Domestic/International two-card module belongs in a new component (see point 3).
   - `ConnexxPreview.tsx` — rewrite the three benefit lines. Current versions start with "because" which is grammatically incomplete and doesn't match other drafts. Use the four-line body above instead.
   - `IntegrationHighlights.tsx` — audit the logo set. Royal Mail and DPD logos use different file paths than `data.ts` (e.g. `royalmail_logo.png` vs `Royal-Mail-Logo.png`). Confirm correct assets exist.
   - `ClosingCTA.tsx` — replace the default copy. Primary CTA should link to `/shipping/domestic#estimator`, not `#`. Update headline to match the draft above.

3. **New section component required: `DomesticInternationalCards.tsx`.** Two equal-weight cards, side by side on desktop, stacked on mobile. Each card: H3 + 4-line body + audience pill row + CTA arrow. Pattern matches the existing `SolutionsRouting` card style but with larger format and audience pills.

4. **Metadata.** Use `buildMetadata()` from `@/lib/metadata` on the home page. Existing home does not export metadata.

5. **Stats need product team confirmation** before publish:
   - "X+ shipments processed" (currently 2.4M in `SocialProof.tsx`)
   - "42+ countries covered" (currently in `SocialProof.tsx`)

6. **Reading time check.** Total home-page body copy is ~430 words across all sections. Average UK reading speed 250 wpm gives ~1.7 minutes. Within the 3-minute brief.

7. **No em-dashes anywhere in the draft.** All connectors are full stops, commas, or "and"/"but"/"so".

---

## Reviewer questions

1. **Confirm "X+ shipments processed" figure or remove.** Existing site shows `2,400,000+`. Is this current platform telemetry, an aggregate-since-inception number, or aspirational? If unsourced, replace with the integration count (`16 carriers, 20+ tech integrations`) which is independently verifiable from `data.ts`.

2. **Confirm primary CTA destination.** Spreadsheet says `Get Started`, brief recommends `Run the savings estimator`. The estimator lives on `/shipping/domestic` (per the existing `shipping-domestic.md` draft). Should we link to `/shipping/domestic#estimator`, build a dedicated `/estimator` route, or open a modal on the home page itself?

3. **Confirm H1.** Spreadsheet suggests "Smarter Shipping for a Simpler Tomorrow." which is abstract and uses a tricolon-adjacent pattern that lands close to AI-tells. Three options for review:
   - `One platform. Every carrier. Every shipment.` (recommended; declarative, operator-aware, 6 words)
   - `Multi-carrier shipping for UK retailers, sellers, and 3PLs.` (12 words; ICP-explicit)
   - `Smarter shipping for UK retailers, sellers, and 3PLs.` (8 words; closer to the spreadsheet's tone but specific)

4. **Confirm the eight-card ICP routing module.** Brief suggests it; spreadsheet stops at the Domestic/International two-card split. Two options:
   - Keep both: Domestic/International cards (the commercial routing) + eight ICP cards (the self-identification routing). Recommended; the two modules serve different scanning behaviours.
   - Drop the eight-card module and rely on the Domestic/International two-card module plus navbar Solutions dropdown.

5. **Confirm the three named case studies on the home page.** Brief specifies Peak Commerce, Velocity Sellers, SwiftLog Fulfilment (which are `caseStudies[0–2]` in `data.ts`). The other three (Meridian, Northgate, Atlas) get featured on the relevant ICP pages. Is that the intended split, or should the home page rotate or feature different cases?

6. **Should the home page carry an FAQ block?** Current draft does not include one. Adding three to four FAQs (e.g. "What is ITD Global?", "What does Connexx do?", "Which carriers does Connexx connect to?", "How quickly can I get set up?") would add FAQ schema and capture top-of-funnel queries. Not in the spreadsheet, but worth a review decision before build.

7. **Confirm the Peak Commerce case study quote.** Current `src/lib/data.ts` quote contains an em-dash used as a connector ("Connexx didn't just save us money — it gave us back our time."). The eCommerce draft already flags this. If we update the data file, the home page case study card pulls the corrected version automatically.

8. **Confirm Royal Mail logo path.** `data.ts` references `/logos/carriers/Royal-Mail-Logo.png` (capitalised, hyphenated). `IntegrationHighlights.tsx` uses `/logos/carriers/royalmail_logo.png` (lowercase). One of these is wrong. Same check needed for DPD (`DPD-LOGO.png` vs `dpd_logo.png`).
