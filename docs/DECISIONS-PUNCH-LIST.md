# Decisions punch list

Every placeholder, approval, fact-check, and architectural decision flagged across the 27 drafts. Use this as the single source of pending decisions before the site goes live.

Grouped by who can resolve it.

---

## 1. Product / sales (figures + claims)

These need a real number from product or sales before the page can publish. The site currently shows them as placeholders.

| Where | Placeholder | Pages affected |
|---|---|---|
| Annual shipments processed | "X+ shipments processed" / "2,400,000+" | Connexx, Home, llms.txt |
| Carrier count | "85+ carriers" vs "16 carriers" in data.ts vs "18 carriers" in latest count | Connexx, Home, Integrations hub, llms.txt |
| Tech integration count | "20+" / verifiable as 26 from data.ts | Connexx, Home, Integrations hub |
| Platform uptime | "X% uptime" | Connexx |
| API response time | "Under Xms" | Connexx, Developers |
| Countries served | "X+ countries" / "42+ countries" | Home, International, Shipping hub, Connexx, llms.txt |
| Countries served (international page) | "220+ / 230+ / 240+ countries" | Shipping International — confirm exact number |
| Domestic carrier count | "X+ UK carriers" | Domestic, SMB |
| SMB starting price | "from £X pay as you go" | Small Business |
| Connexx pricing model | Public-facing pricing tiers vs. quote-on-request | Connexx FAQ, Pricing page (not yet built) |
| Rate engine SLA | "200ms rate engine latency" | Enterprise |
| Returns cost figure | "8% of revenue" returns stat | Connexx, eCommerce |
| Atlas Industrial monthly redelivery cost | £8,000/month (was $8,000 USD — now corrected to £ in data.ts) | B2B, Freight, Atlas case study |
| Velocity Sellers penalty fees | £12,000/month (was $12,000 USD — now corrected to £) | Marketplace Seller, Velocity case study |

**Action:** product/sales fills in the numbers, or remove the placeholders.

---

## 2. Legal / approvals

| Item | Pages affected |
|---|---|
| Public-use approval for all 6 case study customer names | All solution pages, home, /resources/case-studies, all related pages |
| Public-use approval for case study quotes (especially SwiftLog, Peak Commerce, Velocity Sellers, Meridian, Northgate, Atlas) | Same |
| Public-use approval for case study metrics (42% / 3x / 98.7% / 75% / 60% / 90%) | Same |
| Direct competitor naming (Shiptheory, Sendcloud, Metapack, Linnworks, ShipStation, etc.) in comparison FAQs and comparison pages | Connexx FAQ #2, Comparison strategy, future /compare/* pages |
| Repetition of case study numbers across multiple pages (e.g. 42% reappears on home, eCommerce, /resources, /connexx) — confirm legal OK with repetition vs. variance | All pages |
| Far East imports guide — duty rates (12% clothing, 0-3.7% electronics) — legal review for currency of HMRC data | guides-far-east-imports |
| FBM guide — Amazon metric thresholds (LSR <4%, OTDR >97%, etc.) — confirm not stale | guides-fbm |
| FBM guide — SFP approved carrier list — confirm with Amazon partnerships | guides-fbm |
| FBM guide — carrier price bands (Royal Mail Tracked 48 £2.50-£3.50 etc.) — source or downgrade | guides-fbm |

**Action:** legal review of the consolidated set above. Quickest path is a single review session.

---

## 3. Engineering / product confirmation (platform claims)

Drafts claim platform capabilities that need engineering or product to verify before publish.

| Claim | Page |
|---|---|
| Live API rate pull on every shipment (vs. cached) | Connexx, all solution pages |
| Native ERP write-back to SAP, NetSuite, Microsoft Dynamics, Sage | B2B, Enterprise, integrations-erp-wms |
| Sage 50, 200, X3 all integrate | B2B, integrations-erp-wms — confirm which versions |
| CDS-direct API integration (filing customs declarations directly to HMRC) | Export, Import |
| HMRC CDS pre-clearance documentation generation | Import |
| C79 reconciliation write-back to all 4 ERPs | Import |
| CBAM coverage | Export FAQ |
| Seller Fulfilled Prime routing | Marketplace Seller |
| InPost locker drop-off for returns | Small Business |
| White-label branded tracking as standard | 3PL |
| ISO 27001 controls | Enterprise |
| 200ms rate engine latency | Enterprise |
| Webhooks live (shipment lifecycle events) | Connexx, Developers |
| Rate limits on the API | Developers |
| SDKs (Node/Python/PHP/Ruby) — exist or not? | Developers — affects "SDKs" wording vs "API client examples" |
| OpenAPI / Swagger spec published | Developers |
| Status page URL | Developers — `status.itdglobal.com` assumed in drafts |
| API docs URL | Developers — assumed `/help/developers` but could be `docs.itdglobal.com` |
| API endpoint domain | Across drafts: `api.itdglobal.com` (standardised) vs `api.connexx.io` (existing) — confirm |
| CMR generation for freight | Freight |
| Pall-Ex / Palletline / Palletways integrations | Freight — not in data.ts currently |
| DX missing from data.ts integrations | Domestic |

**Action:** engineering + product walk through this list and either confirm, scope, or downgrade the claim on each affected page.

---

## 4. URL and domain decisions

| Decision | Affects |
|---|---|
| Canonical production domain — `itdglobal.com` assumed in `src/lib/site-config.ts` | Sitemap, robots, JSON-LD, every page metadata |
| Contact email — `hello@itdglobal.com` assumed | Organization schema, contact page |
| LinkedIn / X / company directory URLs for `sameAs` in Organization schema | Organization JSON-LD |
| API endpoint domain — `api.itdglobal.com` or `api.connexx.io` | Connexx, Developers |
| Status page subdomain | Developers |
| Developer documentation location — subdomain (`docs.itdglobal.com`) or path (`/help/developers/api`) | Developers, Connexx |
| `/resources/connexx-vs-metapack` and other comparison page URLs | Cross-linked from solution drafts; defer to Comparison strategy doc |

**Action:** confirm canonical URLs and update `src/lib/site-config.ts`.

---

## 5. Content & design

| Decision | Page |
|---|---|
| Confirm 8-card audience routing module on home vs. simpler 2-card | Home |
| H1 choice — recommended `One platform. Every carrier. Every shipment.` over spreadsheet's abstract `Smarter Shipping for a Simpler Tomorrow` | Home |
| Should the home page include a FAQ section? | Home |
| Single-page glossary vs. paginated by category | Glossary |
| Logo file mismatches: `Royal-Mail-Logo.png` (data.ts) vs `royalmail_logo.png` (IntegrationHighlights.tsx); same for DPD | Home + Integrations + others |
| Connexx 6 modules — confirm canonical names: Rate Comparison, Multi-Carrier Dispatch, Customs Automation, Returns, Analytics, Integrations & API | Connexx |
| Module order — Customs is module 3 in draft (vs spreadsheet's #6 position) | Connexx |
| OG image — currently dynamic from `src/app/opengraph-image.tsx`. Per-page custom images (in `public/og/README.md`) deferred | All pages |
| Pallet network logo assets (Pall-Ex, Palletline, Palletways, DX Freight) | Freight |
| Existing case study repetition treatment — paraphrase on solution pages vs. verbatim | All solution pages |
| Carrier weight ceilings (need ops sign-off) | Domestic |

**Action:** content/design team review.

---

## 6. New IA decisions (not previously on the site)

These are pages and routes that didn't exist on the site before, now scaffolded in the rollout.

| New IA | Status | Action |
|---|---|---|
| `/help` + `/help/centre` + `/help/submit-request` + `/help/developers` | Drafts done, code scaffold in progress | Confirm support routing destination (CRM? email?) for `/help/submit-request` form |
| `/resources/guides` + 2 articles | Drafts done, code scaffold in progress | Confirm publish date on guides + ongoing editorial cadence |
| `/resources/glossary` | Drafts done, code scaffold in progress | Single-page vs paginated decision |
| `/compare/{competitor}-vs-itd` | Strategy doc done — pages NOT built | Decide P0 set (recommend Shiptheory + Sendcloud + Metapack + ShipStation) and approve legal review process |
| Help search backend | Visual-only placeholder for v1 | Algolia DocSearch (recommended) vs custom vs defer |
| Help Centre CMS | Flat MDX recommended | Confirm content authoring workflow before building category pages |
| Support form CRM destination | Console.log stub for v1 | HubSpot / Zendesk / Freshdesk / email — pick one |
| Help SLA wording | "Responses within 1 business day; production-down within 1 hour" — proposed | Confirm with support team |
| Phone support availability | Currently the FAQ says no — confirm | Support team |
| Top 10 help articles to feature on the hub | Placeholders for v1 | Support team |
| Connexx pricing page (`/connexx/pricing`) | Not in current scope | Strategy doc recommends building before P0 comparisons |

---

## 7. Component / code architecture

These were flagged by the implementation agents.

| Decision | Status |
|---|---|
| Extract `FaqSection` into shared component (currently inlined in VerticalPage) | Recommended — agents will do this in the integrations refactor |
| Build `CarrierComparisonTable` component | Building now in the shipping pages refactor |
| Build `DomesticInternationalCards` component | Building now in the home refactor |
| Build new guide IA: `/resources/guides/[slug]` template | Building now |
| Support API route at `src/app/api/support/route.ts` | Building now as console.log stub |
| Extend `IntegrationCategoryPage` with hero/use-cases/FAQ/JSON-LD props | Building now |
| Add Help link + Guides/Glossary links to navbar | Building now |

---

## 8. Voice / content cleanups across `data.ts`

Already cleaned by me:
- Peak Commerce case study quote em-dash removed
- Northgate challenge text em-dash removed
- Velocity Sellers `$12,000` → `£12,000`
- Atlas Industrial `$8,000` → `£8,000`

Still to consider:
- SwiftLog case study quote — minor em-dash cleanup may be needed if any (none currently flagged)
- Meridian Trade Co quote — minor em-dash cleanup if any (none currently flagged)

---

## 9. Recommended decision sequence (fastest path to launch)

1. **Now (you):** Confirm `itdglobal.com` is the canonical domain + `hello@itdglobal.com` is the contact email. Two-minute decision unblocks all metadata + JSON-LD.
2. **This week (product + sales):** Fill in the 10-15 placeholder figures. Reduces "X+" appearances across the site.
3. **This week (legal):** Single review session covering customer-name + quote + competitor-naming approvals.
4. **Next week (engineering):** Confirm the platform capability claims in Section 3. Where any claim doesn't hold today, edit the affected pages.
5. **Next week (design):** Per-page OG images (`public/og/README.md`) and pallet network logos.
6. **Phase 5 (later):** Build `/compare/*` pages once Connexx pricing page exists.

---

## How this list will be maintained

Once an item is resolved, strike it through. Once a section is fully resolved, mark the section header `✅`. Pages can publish individually as their items are cleared — they don't all need to wait for the full list.
