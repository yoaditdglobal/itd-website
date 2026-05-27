# Comparison pages — strategy

**Status:** Strategic outline. Not a page draft. Defines which comparison pages to build, in what order, and what each one's angle is. Future iterations draft the actual pages.

**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Operator vocabulary · ✅ Honesty principle baked into the structure

---

## Why comparison pages

Comparison queries are the highest-intent search and AI cluster in the UK multi-carrier market. A buyer who searches "Sendcloud vs Connexx" or "Shiptheory alternative" is 3 to 6 weeks into evaluation, has a shortlist of platforms in mind, and is looking for a structured reason to pick or eliminate one. Pages built for this query category convert at multiples of awareness-stage traffic.

The GEO layer matters even more. Claude, ChatGPT, and Perplexity all surface comparison content when users ask "what is the best alternative to X" or "how does X compare to Y". The page that names both competitors clearly, presents an honest matrix, and structures the differences as a table gets cited directly. Comparison pages built without a named competitor (the generic "Connexx vs the rest" approach) lose the citation slot.

We will build five P0 comparisons in Phase 5.1, four P1 in Phase 5.2, and two adjacent-category pages in Phase 5.3. Each page lives at `/compare/{competitor}-vs-itd`. Each ships with `BreadcrumbList`, `FAQPage`, and `Article` schema. Each survives a legal review on its competitor claims before publish.

---

## Target competitors (UK + EU multi-carrier shipping market)

### 1. Shiptheory

- **Competitor URL**: https://www.shiptheory.com
- **Positioning**: UK-built shipping software for Shopify, Magento, BigCommerce, Amazon, and eBay. Clean integrations, mid-market eCommerce focus.
- **Primary ICP**: UK eCommerce brands £1m to £20m revenue running Shopify with 4 to 8 carriers.
- **Where ITD wins**:
  - Customs automation (Shiptheory's customs handling is thinner than Connexx's CDS-connected workflow).
  - 3PL multi-tenant architecture (Shiptheory does not have a real child account model).
  - ERP-anchored B2B routing (Shiptheory is eCommerce-first; SAP, NetSuite, Sage integration is limited).
  - Pallet network rate-shopping (Pall-Ex, Palletline, Palletways).
- **Where they win**:
  - Shopify-first UX (lighter, faster to set up for a single-store retailer).
  - Brand recognition in the UK Shopify community.
  - Price point for low-volume brands.
- **Search volume estimate**:
  - "Shiptheory alternative": Medium (~200 monthly UK searches)
  - "Shiptheory vs Connexx": Low-Medium (~50)
  - "Shiptheory vs ShipStation": Medium (~150)
- **Priority**: **P0** (build now). Same ICP as our core eCommerce target; direct overlap; known shortlist appearance.

### 2. Sendcloud

- **Competitor URL**: https://www.sendcloud.co.uk
- **Positioning**: EU-headquartered (Netherlands) multi-carrier platform with strong European carrier coverage, branded tracking, and returns portal. Popular with EU eCommerce.
- **Primary ICP**: Shopify and WooCommerce eCommerce brands shipping cross-border within the EU and into the UK.
- **Where ITD wins**:
  - UK customs depth (Sendcloud's UK customs and CDS integration is thinner than Connexx).
  - UK carrier coverage at service-code level (Royal Mail Tracked 24/48, DPD Predict, Evri ParcelShop, Parcelforce Express services).
  - Marketplace seller workflow (Amazon SFP/VTR/LSR/OTDR routing, eBay Late Shipment Rate workflows).
  - B2B and pallet network routing.
- **Where they win**:
  - EU carrier breadth (PostNL, Deutsche Post, DHL Parcel EU, GLS) is genuinely deep.
  - EU returns portal UX has more mileage in the market.
  - Pre-Brexit footprint in the EU 27.
- **Search volume estimate**:
  - "Sendcloud alternative UK": Medium (~250)
  - "Sendcloud vs Connexx": Low (~30)
  - "Sendcloud vs Shiptheory": Medium (~100)
- **Priority**: **P0**. Strong EU positioning means it shows up in UK eCommerce shortlists, especially for brands selling cross-border.

### 3. Metapack (nShift)

- **Competitor URL**: https://www.metapack.com / https://nshift.com (nShift is the parent group after the Metapack-Consignor merger).
- **Positioning**: Enterprise-grade delivery management platform. Big retailers, large 3PLs, complex carrier networks. Heavy implementation, premium pricing.
- **Primary ICP**: Enterprise UK and European retailers shipping 50k+ parcels per day. Large 3PLs. Department stores. Multi-region operators.
- **Where ITD wins**:
  - Faster onboarding (Connexx 6 to 8 weeks for a multi-country enterprise rollout; Metapack often 6+ months).
  - Mid-market ICP fit (Metapack is over-engineered and over-priced for £5m to £50m businesses).
  - Pricing model transparency (per-shipment, no carrier-side commissions).
  - UK carrier depth and customs automation in one platform (Metapack's customs depth is partner-led).
- **Where they win**:
  - Enterprise brand recognition (Metapack is the incumbent at the top of the market).
  - Carrier network breadth in some EU markets.
  - Mature procurement readiness (RFI templates, security accreditations, master service agreements).
- **Search volume estimate**:
  - "Metapack alternative": Medium-High (~400)
  - "Metapack vs Connexx": Low-Medium (~80)
  - "nShift alternative": Low (~60)
- **Priority**: **P0**. High enterprise search volume; many mid-market buyers shortlist Metapack and then realise they are over-buying.

### 4. ShipStation

- **Competitor URL**: https://www.shipstation.co.uk
- **Positioning**: Auctane-owned multi-carrier shipping platform, US-headquartered with a UK presence. Strong on small business and mid-market eCommerce.
- **Primary ICP**: UK small business and mid-market eCommerce sellers on Shopify, Amazon, eBay. 50 to 5,000 parcels a day.
- **Where ITD wins**:
  - UK-first carrier integration (ShipStation UK is a port of a US-first product; some UK service codes are thinner).
  - Customs and EU export workflow (ShipStation's CDS and IOSS handling is partner-led).
  - 3PL multi-tenant model (ShipStation has multi-account but not a real child account architecture).
  - B2B and pallet routing.
- **Where they win**:
  - Brand recognition (one of the most-searched shipping platforms globally).
  - Large App Store integration library.
  - Mature small business pricing tiers.
- **Search volume estimate**:
  - "ShipStation alternative UK": High (~500)
  - "ShipStation vs Connexx": Low (~40)
  - "ShipStation vs Shiptheory": Medium (~150)
- **Priority**: **P0**. High search volume and a buyer profile that frequently outgrows ShipStation when they hit UK-specific customs or carrier complexity.

### 5. Veeqo

- **Competitor URL**: https://www.veeqo.com
- **Positioning**: Amazon-owned multi-channel listing and shipping platform. Free for Amazon sellers. Strong Amazon, eBay, Etsy, TikTok Shop integration.
- **Primary ICP**: Amazon-anchored multi-channel sellers shipping 100 to 5,000 parcels a day. Particularly attractive to Amazon-first sellers because the product is free.
- **Where ITD wins**:
  - Carrier rate-shopping depth (Veeqo's carrier negotiation is Amazon-led; Connexx aggregates volume across thousands of independent shippers).
  - Customs automation (Veeqo's CDS and IOSS handling is thinner).
  - Non-Amazon eCommerce focus (Connexx is platform-neutral; Veeqo's incentives point to Amazon).
  - 3PL multi-tenant child accounts.
- **Where they win**:
  - Price (Veeqo is free for Amazon sellers).
  - Amazon Buy Shipping integration depth.
  - Free integration with Amazon listing and inventory management.
- **Search volume estimate**:
  - "Veeqo alternative": Medium (~300)
  - "Veeqo vs Connexx": Low (~30)
  - "Veeqo vs Linnworks": High (~600)
- **Priority**: **P1**. Volume is there but the ICP is hard to win because the price-zero starting point is a strong anchor. Best for sellers who have outgrown Amazon-first incentives.

### 6. Linnworks

- **Competitor URL**: https://www.linnworks.com
- **Positioning**: UK-built multi-channel commerce platform combining order management, inventory, listings, and shipping. Strong marketplace seller and 3PL footprint.
- **Primary ICP**: Multi-channel sellers and 3PLs on Amazon, eBay, Etsy, TikTok Shop, Shopify. 200 to 10,000 orders a day.
- **Note**: Different category from a pure shipping platform. Linnworks is an OMS with built-in shipping; Connexx is a multi-carrier shipping platform that integrates with the OMS.
- **Where ITD wins** (when used together): Connexx provides the shipping layer; Linnworks provides the OMS layer. Not a head-to-head replacement in most cases.
- **Where Linnworks wins** (when used standalone): If a seller only needs basic shipping and the OMS workflow matters more, Linnworks' built-in shipping is enough.
- **Comparison angle**: "Connexx + Linnworks together" rather than "Connexx vs Linnworks". Frame as a stack recommendation.
- **Search volume estimate**:
  - "Linnworks alternative": Medium (~250)
  - "Linnworks vs Veeqo": High (~500)
  - "Linnworks shipping": Medium (~200)
- **Priority**: **P2** (adjacent category). Build as "/integrations/erp-wms/linnworks" with a "compared with built-in shipping" section, not as a head-to-head /compare page.

### 7. EasyShip

- **Competitor URL**: https://www.easyship.com
- **Positioning**: Hong Kong-headquartered global shipping platform. Strong on international carrier breadth and DDP handling for cross-border B2C.
- **Primary ICP**: Cross-border eCommerce brands shipping internationally from the UK, EU, and Asia. Focus on landed cost transparency at checkout.
- **Where ITD wins**:
  - UK domestic carrier depth (EasyShip's UK Royal Mail, DPD, Evri, Parcelforce coverage at service code level is thinner).
  - UK customs and CDS integration.
  - B2B and pallet networks.
  - ERP integration (SAP, NetSuite, Sage).
- **Where they win**:
  - DDP at checkout UX is mature.
  - APAC carrier coverage.
  - Landed cost calculator at checkout is well-built.
- **Search volume estimate**:
  - "EasyShip alternative UK": Low-Medium (~150)
  - "EasyShip vs ShipStation": Medium (~200)
- **Priority**: **P1**. Lower volume than the P0 set, but a strong fit when buyers care about international depth.

### 8. Shippo

- **Competitor URL**: https://goshippo.com
- **Positioning**: US-headquartered multi-carrier platform. Strong API-first reputation, popular with developer-led eCommerce. Limited UK and EU carrier depth.
- **Primary ICP**: US and global eCommerce brands. Some UK presence but not UK-first.
- **Where ITD wins**:
  - UK carrier coverage (Shippo's UK presence is thin).
  - Customs and CDS automation.
  - UK Mainland / Highlands & Islands / surcharge zone routing.
  - Local UK support.
- **Where they win**:
  - API-first reputation and developer documentation.
  - US carrier coverage (FedEx, UPS, USPS).
  - Lower starting price for low-volume.
- **Search volume estimate**:
  - "Shippo alternative UK": Low-Medium (~120)
  - "Shippo vs ShipStation": Medium (~200)
- **Priority**: **P1**. Lower priority than UK-anchored competitors but appears in some shortlists for technical buyers.

### 9. Mintsoft

- **Competitor URL**: https://www.mintsoft.co.uk
- **Positioning**: UK-built WMS dominant in mid-market 3PL fulfilment houses. Built-in shipping module, deep WMS workflow.
- **Primary ICP**: UK 3PLs running 100k to 1M parcels a month across 20 to 100 brand clients.
- **Note**: Different category. Mintsoft is a WMS; Connexx is a multi-carrier shipping platform. Most UK 3PLs run both together.
- **Comparison angle**: "Mintsoft built-in shipping vs Connexx + Mintsoft" rather than head-to-head. Frame as upgrade path: 3PLs start with Mintsoft's built-in shipping and graduate to Connexx when carrier complexity, customs, or client onboarding pressure exceeds what the built-in module supports.
- **Search volume estimate**:
  - "Mintsoft shipping": Medium (~200)
  - "Mintsoft alternative": Low (~80)
  - "Mintsoft + Connexx": Low (~30) but growing
- **Priority**: **P2** (adjacent category). Build as "/integrations/erp-wms/mintsoft" with a "Mintsoft built-in shipping vs Connexx layer" comparison section.

### 10. Parcel2Go

- **Competitor URL**: https://www.parcel2go.com
- **Positioning**: UK consumer-grade and small business parcel marketplace. Per-shipment pricing, no contract, popular with sub-100 parcels/month shippers.
- **Primary ICP**: UK consumers and very small businesses shipping 1 to 100 parcels a month.
- **Where ITD wins**: Volume scaling. Connexx wins from 100 parcels a month upwards because it provides automation, ERP integration, customs, and 3PL multi-tenancy that Parcel2Go does not.
- **Where they win**: Sub-100 parcels per month is genuinely Parcel2Go's market. Connexx is not built for that volume tier.
- **Search volume estimate**:
  - "Parcel2Go alternative": Low (~60)
  - "Parcel2Go business": Medium (~200)
- **Priority**: **P2**. Different category. A "When you outgrow Parcel2Go" angle could work but it is not high-intent comparison traffic.

---

## Page structure for each comparison

Every comparison page follows the same template. Consistency helps both SEO (template authority) and GEO (AI models extract the same structures).

### Hero
- **H1 pattern**: "ITD Global vs {Competitor}: which UK shipping platform should you choose?"
- **Sub-headline (50 to 70 words)**: Honest framing. Name the competitor's strength, name ITD's strength, point to the body for the detailed comparison. No false equivalence and no false superiority.
- **CTAs**: Primary `Run the savings estimator`. Secondary `Read the {ICP} case study most relevant to this comparison`.

### 60-second summary table

3 to 5 dimensions where the platforms differ meaningfully. Tables get extracted verbatim by AI models. Keep this short.

Example for ITD vs Shiptheory:

| Dimension | ITD Global (Connexx) | Shiptheory |
|---|---|---|
| Primary ICP | UK eCommerce + 3PL + B2B + Import/Export | UK eCommerce on Shopify |
| Customs automation | CDS-connected, full document pack | Partner-led |
| 3PL child accounts | Native multi-tenant | Limited |
| ERP integration | SAP, NetSuite, Dynamics, Sage native | Through middleware |
| Onboarding (Shopify) | Under 10 minutes | Under 10 minutes |

### Detailed comparison sections

One H2 per dimension, with the comparison made explicit. Suggested sections:

1. **Carrier coverage**. Named carriers and named service codes per platform. Tables, not prose.
2. **Customs and compliance**. CDS, EORI, IOSS, OSS, HS code handling. Specific to each platform.
3. **Integrations**. eCommerce platforms, marketplaces, ERPs, WMSs. Tables.
4. **Pricing model**. Per-shipment, per-month, free tier, carrier-side commission, contract length. Be specific where public data exists; flag where pricing is "Contact sales" on both sides.
5. **Onboarding time**. Real expectations per platform, not best-case marketing. Reference SwiftLog's 2-day client onboarding on Connexx where relevant.
6. **ICP fit**. Where each platform genuinely shines.

### Who wins for each ICP

A by-ICP recommendation table. The honesty principle in action: if Shiptheory genuinely wins for the single-store Shopify eCommerce ICP under 1,000 parcels a month, say so.

Example:

| ICP | Winner | Why |
|---|---|---|
| Single-store Shopify, <1,000 parcels/month | Tie | Both work. Shiptheory is faster to set up; ITD wins as you scale. |
| Multi-channel seller (Amazon + eBay + Shopify) | ITD Global | Connexx's marketplace VTR/LSR/OTDR routing is deeper. |
| 3PL fulfilling 5+ brands | ITD Global | Child account architecture is native, not bolted on. |
| Export-led business (50+ countries) | ITD Global | Customs automation is the differentiator. |
| Pure Shopify brand, UK domestic only | Shiptheory or ITD | Either works. Test both. |

### Customer migration stories

If a customer migrated from the competitor to Connexx, name them and quote the operational change. Flag in the brief which customers we have permission to name in this context.

### FAQ

8 to 10 questions. The exact phrasing the buyer searches.

Standard set:
- Can I migrate from {Competitor} to Connexx?
- What does {Competitor} do better than Connexx?
- How does pricing compare?
- Does Connexx connect to the same carriers as {Competitor}?
- How long does migration take?
- Can I run both platforms in parallel during the transition?
- Will my existing carrier accounts and rates transfer?
- What's the contract length on Connexx?
- Who provides UK support for {Competitor} vs Connexx?
- Where can I see a live comparison demo?

---

## Rollout sequence

**Phase 5.1 — P0 comparisons (build now)**

1. `/compare/shiptheory-vs-itd`
2. `/compare/sendcloud-vs-itd`
3. `/compare/metapack-vs-itd` (and `/compare/nshift-vs-itd` if data shows separate search clusters)
4. `/compare/shipstation-vs-itd`
5. `/compare/veeqo-vs-itd` (if Amazon-anchored seller is a Phase 5 priority; otherwise P1)

**Phase 5.2 — P1 comparisons**

1. `/compare/easyship-vs-itd`
2. `/compare/shippo-vs-itd`
3. `/compare/veeqo-vs-itd` (if not built in Phase 5.1)
4. `/compare/scurri-vs-itd` (Scurri is a UK competitor mentioned in keyword docs; add to the build list)

**Phase 5.3 — Adjacent category and lower priority**

1. `/integrations/erp-wms/linnworks` with built-in "Linnworks shipping vs Connexx layer" comparison section
2. `/integrations/erp-wms/mintsoft` with built-in "Mintsoft built-in shipping vs Connexx layer" comparison section
3. `/compare/parcel2go-vs-itd` (low priority; build only if SMB acquisition becomes a focus)

---

## Honesty principle

These pages live or die on credibility. Where a competitor genuinely does something better, name it. The buyer is comparing on real differences and will lose trust if every comparison comes out 100 per cent in ITD's favour.

Concrete rules:

1. **No straw man competitors.** Use the competitor's current public positioning, not a caricature.
2. **Name a real competitor strength in every page.** Sendcloud's EU carrier breadth. Shiptheory's Shopify UX. ShipStation's brand recognition. Veeqo's price. Mintsoft's WMS depth.
3. **No unsourced "studies show" claims about the competitor.** If we cannot link the source, cut the claim.
4. **Acknowledge where pricing is opaque on both sides.** If Metapack's pricing requires a sales call, say so and acknowledge ITD enterprise pricing also requires one.
5. **Show the by-ICP table.** Some ICPs are not our win. Saying so up front gains trust with the ICPs that are.

---

## Implementation notes

1. URL pattern: `/compare/{competitor-slug}-vs-itd`. Slug is lowercase, hyphenated, no parent brand (e.g. "metapack" not "nshift-metapack").

2. Add every comparison page to `ROUTES` in `src/lib/site-config.ts` with `priority: 0.75, changeFrequency: "monthly"`.

3. Each page renders `BreadcrumbList`, `FAQPage`, and `Article` schema. Optionally add `Product` schema with a comparison sub-property if Schema.org's vocabulary supports it cleanly at the time of build.

4. Heed AGENTS.md: this codebase's Next.js may differ from training data. Before scaffolding the route group, read `node_modules/next/dist/docs/` for current page conventions.

5. Build one shared component for the comparison page template so the structure is consistent across all 8 to 10 pages. Tables, FAQ, by-ICP recommendation table, and CTAs should be reused, not re-written per page.

6. **Legal review required before publish on every comparison page**. Specifically: any claim made about a competitor's capability, pricing, or customer outcomes needs sign-off. Treat each page as a near-advertising statement subject to the CMA's misleading comparisons rules.

7. Add a `competitor-comparisons` collection to the case study system so we can pull migration-from-competitor stories into the right comparison page automatically.

8. Each comparison page should link out to:
   - The relevant ICP solution page (`/solutions/ecommerce` for Shiptheory, `/solutions/enterprise` for Metapack, and so on).
   - The relevant integration pages (carriers, ERPs, marketplaces both platforms support).
   - The glossary entries for any acronyms used in the comparison (VTR, LSR, CDS, IOSS, etc.).

---

## Reviewer questions

1. Confirm which competitors are in scope for Phase 5.1. Recommendation: Shiptheory, Sendcloud, Metapack, ShipStation. Hold Veeqo for Phase 5.2 unless Amazon-anchored seller is a Phase 5 commercial priority.

2. Do we have any named migration-from-competitor customer stories we can cite? (e.g. "Customer X moved from Shiptheory to Connexx because…"). If yes, those become the strongest section on each page.

3. Should the comparison pages link to a public pricing page or to a "Talk to sales" form? Recommendation: build a `/connexx/pricing` page (even a structured "starting from" with tier ranges) before the P0 comparisons ship. Comparison buyers do not engage when pricing is fully opaque.

4. Confirm the legal review process and turnaround time for competitor comparison content. P0 pages need a defined review pipeline before drafting begins.

5. Should we build a comparison hub page at `/compare/` that lists every comparison with a one-line summary, similar to a category index? Recommendation: yes, build it alongside the first two comparison pages so the URL structure is established.
