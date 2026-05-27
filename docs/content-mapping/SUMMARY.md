# Content Mapping — Spreadsheet Summary

Source: `Content Mapping ITD Global Website.xlsx` (14 tabs, exported to this directory as one CSV per tab).

This document summarises the spreadsheet's intent, reconciles it against the current site IA, and flags every decision needed before Phase 2 content production starts.

---

## Column structure (every tab)

| Col | Field | Notes |
|---|---|---|
| A | Keyword | Target SEO keyword for the section |
| B | URL / Placement | Site URL or section anchor |
| C | Category | Page type (Service / Landing / Hub / Audience section) |
| D | Search Intent | Commercial / Informational / Navigational / Transactional |
| E | Content Summary | H1, subheading, key points, headings — directional copy spec |
| F | Production Requirements | Copy, Design, Dev, Assets, Approvals needed |
| G | Next Steps | Action items |

---

## Tab inventory

| Tab | URL root | Sections | Status |
|---|---|---|---|
| Homepage | `/` | Hero, Connexx intro, solution cards (Domestic + International), proof section | 5 sections |
| Shipping | `/solutions` (hub) | Landing intro, Domestic card, International card, **Freight (flagged add)** | Hub page |
| Domestic | `/solutions/domestic` | Hero + 5 audience sections (#ecommerce, #marketplace, #3pl, #enterprise, #small-business) | 6 sections |
| International | `/solutions/international` | Hero only (sparse — more to add) | 1 section |
| 3PL | `/solutions/3pl` | One audience section | 1 section |
| eCommerce | `/solutions/ecommerce` | One audience section | 1 section |
| Marketplace | `/solutions/marketplace` | One audience section | 1 section |
| B2B | `/solutions/b2b` | One audience section (sparse) | 1 section |
| Enterprise | `/solutions/enterprise` | One audience section | 1 section |
| SMB | `/solutions/small-business` | One audience section | 1 section |
| Connexx | `/connexx` | Hero, 6 modules, proof, developer API | 4+ sections |
| Integrations | `/integrations` | Hub intro, Tech integrations, Carrier integrations | 3 sections |
| Resources | `/resources` | Case study hub, Blog & Guides (Far East Imports, FBM) | 2 sections |
| Help | `/help` | Hub + `/help/centre`, `/help/submit-request`, `/help/developers` | 4 pages |

---

## Critical reconciliation needed — URL structure shift

The spreadsheet uses **a different URL structure** than the current site.

### Current site (live)

```
/solutions/{enterprise|small-business|ecommerce|marketplace-seller|3pl|b2b|export|import}
/shipping/{domestic|international|freight}
```

### Spreadsheet structure

```
/solutions (hub — was /solutions)
/solutions/domestic         ← was /shipping/domestic
  #ecommerce                ← was /solutions/ecommerce
  #marketplace              ← was /solutions/marketplace-seller
  #3pl                      ← was /solutions/3pl
  #enterprise               ← was /solutions/enterprise
  #small-business           ← was /solutions/small-business
/solutions/international    ← was /shipping/international
/solutions/freight          ← was /shipping/freight (flagged "Add")
/solutions/3pl              ← keeps standalone page
/solutions/ecommerce        ← keeps standalone page
/solutions/marketplace      ← was /solutions/marketplace-seller
/solutions/b2b              ← keeps standalone page
/solutions/enterprise       ← keeps standalone page
/solutions/small-business   ← keeps standalone page
```

**The proposed structure has BOTH:** a `/solutions/domestic` page with audience sections inside it AND standalone `/solutions/{audience}` pages. This means the same content gets surfaced twice (once on the domestic hub, once on the audience page).

**Decision required:**
- **Option A — Keep current IA**: 8 solution pages by audience, 3 shipping pages by geography. Each is its own page. Map spreadsheet content into existing URLs.
- **Option B — Adopt spreadsheet IA**: `/solutions/domestic` and `/solutions/international` become hub pages with embedded audience sections (anchor links); audience pages still exist as standalone. Migration needed.
- **Option C — Hybrid**: Keep `/solutions/{audience}` and `/shipping/{geography}` as they are. The shipping pages use audience-section anchors AS WELL AS having dedicated solution pages. Slight duplication but matches the spreadsheet.

There is no other major reconciliation. Sections, headings, and production requirements in the spreadsheet are all compatible with the existing `VerticalPage.tsx` template.

---

## New pages flagged by the spreadsheet (not yet built)

| URL | Source tab | Notes |
|---|---|---|
| `/help` | Help | New hub page with search and 3 cards |
| `/help/centre` | Help | Documentation hub, searchable |
| `/help/submit-request` | Help | Support form, routing TBC |
| `/help/developers` | Help | Developer hub: API docs, status page, changelog |
| `/solutions/freight` | Shipping | Flagged "Add Freight" — needs content from scratch |
| `/connexx` (deep modules) | Connexx | Six modules each could become a dedicated `/connexx/{module}` page |
| Blog topics | Resources | "Far East Imports" and "FBM (Fulfilled by Merchant)" listed as topics — need /resources/blog or /resources/guides hub |

---

## "X+" placeholders to resolve (figures need confirming with product/sales)

The spreadsheet references several placeholder figures the content writer must fill in before content ships:

- **Countries served**: "X+ countries" (used on Homepage, International, Connexx)
- **Carriers connected**: "X+ carriers connected" (Connexx stats bar)
- **Shipments processed**: "X+ shipments processed" (Connexx social proof)
- **Uptime**: "X% uptime" (Connexx)
- **API response time**: "under Xms" (Connexx)
- **Domestic carriers**: "X+ carriers" (Domestic page, SMB section)
- **Accuracy**: "X% accuracy" (Domestic #3PL section)
- **Cost reduction**: "X% cost reduction (eCommerce)" (Homepage proof)
- **SwiftLog accuracy**: "X% accuracy across X+ destinations" (Connexx proof)
- **Rate Comparison module**: "saves X% in first quart..." (Connexx modules)
- **Starting price**: SMB page references confirming a starting price

**Action**: I'll flag these inline in each page draft. The user resolves them with product/sales before publishing.

---

## Approvals required by the spreadsheet

Across tabs the spreadsheet repeatedly notes specific approvals needed:

- **Case study quotes**: SwiftLog quote and stat (Connexx, Domestic #3PL)
- **Company names**: Peak Commerce, Velocity Sellers, SwiftLog, Meridian, Northgate, Atlas — confirm all 6 are approved for public use
- **Stats**: every numeric claim
- **Audience lists**: where Homepage and Shipping pages list which audiences each card covers
- **Hero claims** ("X+ countries", "logistics partner" positioning)

---

## Content production mapping (what each tab tells us to write)

### Homepage (`/`)
1. **Hero** — H1: "Smarter Shipping for a Simpler Tomorrow." (spreadsheet's suggested H1; voice-checked rewrite recommended). Subhead positions ITD as logistics partner + multi-courier platform.
2. **Connexx intro section** — H2: "One platform. Every shipment." Four-line max, links to /connexx.
3. **Solution cards (Domestic + International)** — Two cards side-by-side. Each four lines + audience list. Domestic audiences: eCommerce, Marketplace, 3PL, B2B, SME. International: TBC.
4. **Proof section** — H2: "Real results from real businesses." Three case study stats with company names.

### Shipping hub (`/solutions`)
1. Short intro positioning ITD as logistics partner offering two clear shipping solutions
2. Two solution cards: Domestic and International
3. Freight card flagged for addition

### Domestic (`/solutions/domestic`)
- Hero with jump links to audience anchors
- 5 audience sections: #ecommerce, #marketplace, #3pl, #enterprise, #small-business
- 3PL section: "Not sure about this section" — flagged in spreadsheet, needs direction

### International (`/solutions/international`)
- Hero only. Need to extend with audience sections similar to Domestic.

### Connexx (`/connexx`)
- Hero: "One platform. Every shipment." + Connexx dashboard visual
- Six modules: Rate Comparison, Label Generation (?), Tracking, Returns, Analytics, Customs/Integrations (six in total — spreadsheet shows the start of the list)
- Social proof with stats bar + SwiftLog case study quote
- Developer API section with code snippet, RESTful API positioning

### Each audience tab (`/solutions/{audience}`)
- One audience-focused section minimum
- "Write from scratch" for each
- ICP-specific pain points and JTBD (now sourced from our 9 ICP docs)

### Integrations (`/integrations`)
- Tech Integrations grid (filterable)
- Carrier Integrations grid (with region labels)

### Resources (`/resources`)
- Case study hub: H1 "Real results from real businesses." With category filter.
- Blog & Guides section — placeholder for "Far East Imports", "FBM (Fulfilled by Merchant)" topics.

### Help (`/help`)
- Hub with 3 cards: Help Centre, Submit a Request, Developers
- Search bar
- New section — needs full IA build

---

## How this maps to Phase 2 of the implementation plan

The Phase 2 draft already in progress covers the 8 standalone solution pages. Spreadsheet adds:

| Phase 2 (already planned) | Spreadsheet additions |
|---|---|
| `/solutions/ecommerce` ✅ pilot drafted | Add audience section variant for Domestic/International hub embedding |
| `/solutions/marketplace-seller` | Spreadsheet calls this `/solutions/marketplace` — confirm URL |
| `/solutions/3pl` | Standalone page + Domestic hub embed |
| `/solutions/b2b` | Standalone page + Domestic hub embed |
| `/solutions/enterprise` | Standalone page + Domestic hub embed |
| `/solutions/small-business` | Standalone page + Domestic hub embed |
| `/solutions/export` | Not in spreadsheet — keep or remove? |
| `/solutions/import` | Not in spreadsheet — keep or remove? |
| `/shipping/domestic` | Spreadsheet calls this `/solutions/domestic` |
| `/shipping/international` | Spreadsheet calls this `/solutions/international` |
| `/shipping/freight` | Spreadsheet flags "Add Freight" |
| `/connexx` | Major expansion — 6 modules + developer section |
| `/integrations` and category pages | Expansion with hub + carriers + tech split |
| `/resources/case-studies` | Add blog/guides section |
| **NEW**: `/help` + `/help/centre` + `/help/submit-request` + `/help/developers` | Not in original plan — needs scoping |
| **NEW**: `/resources/blog` or `/resources/guides` | Hosts Far East Imports, FBM, etc. |

---

## Recommended next steps

1. **Confirm URL structure** (the single biggest open question — see "Critical reconciliation" above).
2. **Confirm placeholder figures** with product/sales: countries served, carriers connected, shipments processed, uptime, API response time, starting price.
3. **Confirm case study approvals** for all 6 named companies and quotes.
4. **Confirm Export and Import pages** stay (not in spreadsheet) or get folded into International with audience anchors.
5. Approve the pilot eCommerce draft (`docs/drafts/solutions-ecommerce.md`) so the same pattern can be applied across all pages.

Once those 5 are settled, Phase 2 content production can run in parallel across all approved pages.
