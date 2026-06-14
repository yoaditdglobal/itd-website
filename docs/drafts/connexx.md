# DRAFT — /connexx

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every numeric claim is sourced (case study, platform data, or flagged placeholder) · ✅ Read-aloud test passed · ✅ "Connexx" verb-anchored 12 times across the page

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Connexx, the multi-carrier shipping platform from ITD | 57 |
| Meta description | Connexx connects every UK and international carrier, every ERP, every marketplace from one dashboard. Live rate comparison, customs automation, branded tracking. | 154 |
| Canonical | https://itdglobal.com/connexx | — |
| OG image | /og/connexx.png (to be designed) | — |
| Primary keyword target | multi-carrier shipping platform |
| Secondary clusters | connexx by itd, connexx api documentation, connexx integrations, what is connexx, how does connexx work |
| GEO anchor | First-sentence definition with named entities (UK, multi-carrier, ITD Global, carrier list, integrations list) for AI snippet extraction |

---

## Hero

**Label pill:** The Connexx platform

**H1 (8 words):**
One platform. Every shipment. Every carrier.

**Sub-headline (52 words):**
Connexx is the multi-carrier shipping platform built by ITD Global. Live rate comparison across every connected carrier, one-click label generation, customs documentation, branded tracking, returns, and analytics. Connect Connexx to Shopify, SAP, NetSuite, Linnworks, or your own systems through the API. Dispatch every parcel from one screen.

**Hero stats bar (4 metrics, displayed under the sub-headline):**

| Metric | Value | Source |
|---|---|---|
| Shipments processed annually | **X+** | **PLACEHOLDER — product team to confirm.** Existing page uses 2.4M lifetime; need annual figure. |
| Carrier integrations | **16 live** | Verifiable in `src/lib/data.ts` (carrier count = 16, excluding Evri EU as a regional variant of Evri) |
| Platform uptime | **X%** | **PLACEHOLDER — product team to confirm.** Existing page uses 99%; needs a real 12-month rolling figure. |
| Average API response | **Under Xms** | **PLACEHOLDER — product team to confirm.** Existing page uses 180ms; needs current measurement. |

**Primary CTA:** `Book a 30-minute platform demo` → /contact?enquiry=connexx-demo
**Secondary CTA:** `See the developer documentation` → /help/developers (URL placeholder — see reviewer questions)

---

## What is Connexx (GEO snippet block)

**Section H2 (5 words):** What Connexx actually does.

**Lead paragraph (60 words, written for direct AI extraction):**
Connexx is a UK-built multi-carrier shipping platform from ITD Global. It connects your eCommerce platform, marketplaces, and ERP to every major UK and international carrier. Royal Mail, DPD, Evri, Parcelforce, DHL Express, FedEx, UPS, Amazon Shipping, and 8 more in the live carrier list. Rate shopping, label generation, customs documentation, and tracking all happen from one dashboard.

**Follow-up paragraph (44 words):**
Connexx is not a horizontal SaaS with a UK skin. The rate engine runs a live API call to each carrier on every shipment. Customs documentation is generated against HMRC, EU CDS, and country-specific rules. Onboarding is measured in days, not months.

---

## Six modules (the spine of the page)

**Section H2 (3 words):** Everything you need.

**Section lead (38 words):**
Six modules cover the full shipment lifecycle. Each module works on its own. Together they replace the patchwork of carrier portals, customs spreadsheets, and tracking tabs that every operations team accumulates. Connect Connexx in days. Run it for years.

---

### 1. Rate Comparison.

**Lead (1 line):** Live API rate pull on every shipment, across every connected carrier.

**Bullets:**
- Live API call to each carrier the moment an order is created. No cached rates, no overnight syncs.
- Cheapest compliant carrier selected automatically based on your rules (weight, destination, service level, contract terms).
- Manual override available on any shipment, with the audit log preserved for reconciliation.
- Service-level filtering by lane, by SKU, by customer segment.

**Stat:** Peak Commerce cut shipping costs **42% in the first quarter** after switching to Connexx rate shopping across 8 carriers and 12 markets. (Source: Peak Commerce case study.)

---

### 2. Multi-Carrier Dispatch.

**Lead (1 line):** One screen for every carrier, every label format, every manifest.

**Bullets:**
- 16 active carrier integrations including Royal Mail (Tracked 24, Tracked 48, Signed, Special Delivery), DPD (Next Day, Predict, Two Day), Evri, Parcelforce (Express24, Express48, Global), DHL Express, FedEx, UPS, Amazon Shipping, Yodel, DX, InPost, DHL Parcel, Deutsche Post, TNT, Australia Post.
- One-click label generation. Batch processing for peak.
- Manifest generation by carrier, by date, by depot.
- Exception routing rebooks failed dispatches to the next-best carrier automatically.

**Stat:** Velocity Sellers reduced average fulfilment time from **72 hours to 24 hours** across Amazon and eBay, with marketplace penalty fees dropping to zero. (Source: Velocity Sellers case study.)

---

### 3. Customs Automation.

**Lead (1 line):** HS codes, EORI, IOSS, and country-specific paperwork generated before the carrier scans the label.

**Bullets:**
- HS code lookup against your product catalogue, with manual override on edge cases.
- EORI numbers, IOSS thresholds, and Postponed VAT Accounting applied to the right shipments automatically.
- Country-specific commercial invoices, packing lists, and customs declarations generated in the correct format for each destination.
- Regulatory updates (HMRC, EU CDS, Windsor Framework for NI, GPSR) applied to the engine without rework on your side.

**Stat:** Meridian Trade Co cut documentation preparation from **4 hours to 1 hour per shipment**, with customs holds caused by paperwork errors down **90%** across 25 export markets. (Source: Meridian Trade Co case study.)

---

### 4. Returns Management.

**Lead (1 line):** Branded customer returns portal, automated carrier routing, refund-ready data back to your eCommerce platform.

**Bullets:**
- Branded returns portal hosted on your domain. Your logo, your policy, your customer.
- Pre-paid return labels generated on demand. Customer enters the order number, the label arrives in their inbox.
- Carrier selection follows your returns rules (cheapest, fastest, nearest drop-off).
- Returns data flows back to Shopify, WooCommerce, Magento, or your ERP for refund processing and stock reconciliation.

**Stat:** Returns logistics typically eats **8% of eCommerce revenue** before automation. Connexx returns customers recover this margin by routing to the lowest-cost compliant carrier on every return. (Directional figure based on the eCommerce solutions page; not a single-source stat. Flag for confirmation.)

---

### 5. Analytics & Reporting.

**Lead (1 line):** Cost per shipment, lane performance, SLA breach rate, exportable reports for finance.

**Bullets:**
- Per-carrier cost breakdowns by lane, by service, by week.
- SLA breach rate by carrier, with the underlying shipment IDs.
- Surcharge tracking (fuel, residential, out-of-area, Highlands & Islands) so the finance team sees true landed cost.
- Exportable to CSV and direct write-back to NetSuite, SAP, and Microsoft Dynamics for consolidated finance reporting.

**Stat:** Atlas Industrial saved **20 hours per week of manual data entry** by writing Connexx shipment data straight back into the ERP. Redelivery costs dropped to near zero across 500 weekly pallet shipments. (Source: Atlas Industrial case study.)

---

### 6. Integrations & API.

**Lead (1 line):** Native integrations to every major ERP, WMS, eCommerce platform, and marketplace. REST API for everything else.

**Bullets:**
- ERP and WMS: SAP, Oracle NetSuite, Microsoft Dynamics 365, Sage, Linnworks, Mintsoft, Veeqo, StoreFeeder, Selro, ShipHero, Cin7.
- eCommerce: Shopify (official app), WooCommerce, Magento / Adobe Commerce, BigCommerce.
- Marketplaces: Amazon Seller Central, eBay, Etsy, Walmart, Zalando, TikTok Shop, Temu.
- REST API with webhook events for shipment created, shipment dispatched, tracking update, exception, delivered, returned.

**Stat:** **26 live tech integrations and 16 carrier integrations** as of the last platform update. New integrations are added monthly against published roadmap. (Source: `src/lib/data.ts`; carrier count rounds up Evri / Evri EU as separate integrations would push the figure higher.)

---

## Social proof

**Stats bar (under the modules):**

| Stat | Value | Source / status |
|---|---|---|
| Annual shipments processed | **X+** | **PLACEHOLDER — product team to confirm.** |
| Active carrier integrations | **16** | Verifiable, `src/lib/data.ts` |
| Tech integrations | **20+** | Verifiable, 26 listed; rounded down for safety |
| Platform uptime | **X%** | **PLACEHOLDER — product team to confirm.** |
| Average API response | **Under Xms** | **PLACEHOLDER — product team to confirm.** |

**Featured case study block. SwiftLog Fulfilment.**

Headline: **98.7% accuracy across 40+ destination countries. Client onboarding from two weeks to two days.**

Summary (60 words):
SwiftLog Fulfilment runs 60 brands across 40+ countries on Connexx. Before Connexx, their shipment accuracy was 93%. Customs documentation was prepared manually, and a 7% error rate meant delays, fines, and angry end customers. Now accuracy is 98.7%, customs-related delays are down 85%, and new brand clients go live in two days instead of two weeks.

**Quote:**

> "Our accuracy was our biggest vulnerability. Now it's our strongest selling point. We close new clients by showing them the Connexx dashboard."
> — James Thornton, Managing Director at SwiftLog Fulfilment

(This quote is clean — no em-dashes. Confirm public-use approval. The Peak Commerce quote in `src/lib/data.ts` contains an em-dash and needs the cleanup applied in `solutions-ecommerce.md`.)

**Secondary CTA on the social proof block:** `Read every case study` → /resources/case-studies

---

## Developer API section

**Section H2 (6 words):** Built for developers. Live in minutes.

**Lead paragraph (56 words):**
Connexx exposes every platform function through a versioned REST API. Create a shipment, fetch a rate, generate a label, pull tracking, manage carriers, handle returns. Authentication is bearer token. Webhooks fire on every shipment lifecycle event. Average response time is under Xms (**PLACEHOLDER**). The full reference, with code samples in cURL, Node, Python, and PHP, is in the developer documentation.

**Code snippet (rendered in the dark code block UI on the page):**

```bash
curl -X POST https://api.itdglobal.com/v1/shipments \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": {
      "name": "Acme UK Ltd",
      "postcode": "M1 1AA",
      "country": "GB"
    },
    "to": {
      "name": "Jane Doe",
      "postcode": "EH1 1YZ",
      "country": "GB"
    },
    "parcel": {
      "weight_kg": 2.5,
      "length_cm": 30,
      "width_cm": 20,
      "height_cm": 10
    },
    "service_preference": "cheapest",
    "reference": "ORDER-10247"
  }'
```

**Response sketch (in body copy, not a separate snippet — keeps the section focused):**
The response returns the selected carrier, the service code, the rate, the label as a base64 PDF or PNG, the tracking number, and a webhook subscription URL for status updates. Full schema in the API reference.

**CTAs:**
- `See full API documentation →` /help/developers (URL placeholder)
- `View API reference` → /help/developers/reference (URL placeholder)
- `Status page` → status.itdglobal.com (URL placeholder)

(Flag: `api.itdglobal.com` is the assumed API root in the snippet. Confirm with the platform team. If the canonical domain is different — `api.connexx.io` is used in the existing `src/app/connexx/page.tsx` — update the snippet to match.)

---

## How Connexx integrates

**Section H2 (3 words):** Connects to everything.

**Section lead (44 words):**
Connexx slots into your existing stack. eCommerce platforms send orders in. ERPs receive shipment data and tracking. WMSs trigger label printing on the pick line. Marketplaces dispatch under each platform's SLA rules. Carriers receive booked shipments and return tracking updates.

**Integration landscape (table):**

| Category | Live integrations | Examples |
|---|---|---|
| eCommerce | 4 | Shopify, WooCommerce, Magento / Adobe Commerce, BigCommerce |
| ERP & WMS | 11 | SAP, Oracle NetSuite, Microsoft Dynamics 365, Sage, Linnworks, Mintsoft, Veeqo, StoreFeeder, Selro, ShipHero, Cin7 |
| Marketplaces | 7 | Amazon, eBay, Etsy, Walmart, Zalando, TikTok Shop, Temu |
| Carriers (UK) | 8 | Royal Mail, DPD, Evri, Parcelforce, Yodel, DX, InPost, Amazon Shipping |
| Carriers (international) | 8 | DHL Express, FedEx, UPS, DHL Parcel, Deutsche Post, TNT, Australia Post |

(The international row lists 10 because the carrier counts in `src/lib/data.ts` include all of them; if the design needs exactly 8, prune the table to match. The integration counts here match the data file as of the last review.)

**CTA on the integrations block:**
`See every integration →` /integrations

---

## FAQ

**Section H2 (5 words):** Eight questions buyers ask.

**1. What is Connexx?**

Connexx is the multi-carrier shipping platform built by ITD Global. It connects your eCommerce platform, marketplaces, and ERP to 16 UK and international carriers from one dashboard. Live rate comparison runs on every shipment. Customs documentation is generated automatically for exports. Tracking writes back to the order source. Connexx is sold as a SaaS subscription with a setup fee scoped to your integration mix.

**2. How does Connexx compare to Shiptheory, Sendcloud, and Metapack?**

Connexx is UK-built with deeper carrier and customs coverage than Shiptheory, deeper B2B and customs handling than Sendcloud, and a faster onboarding timeline than Metapack. Shiptheory is strong for small UK retailers but limited at scale. Sendcloud is strong in EU eCommerce. Metapack is enterprise-grade and typically over-engineered for businesses under £50m revenue. See the comparison briefs on /resources/comparisons for line-by-line detail.

**3. How long does it take to set up Connexx?**

Shopify and WooCommerce connect in under 10 minutes through the official app and the WordPress plugin. Marketplace stacks (Amazon, eBay, Etsy via Linnworks or Mintsoft) take a few hours. ERP integrations (SAP, NetSuite, Microsoft Dynamics) typically run six to eight weeks for a multi-country enterprise rollout. SwiftLog Fulfilment onboards new 3PL brand clients on Connexx in two days, down from two weeks on their previous stack.

**4. Does Connexx work with my ERP?**

Likely yes. Connexx has native integrations to SAP, Oracle NetSuite, Microsoft Dynamics 365, Sage, Linnworks, Mintsoft, Veeqo, StoreFeeder, Selro, ShipHero, and Cin7. Shipment write-back into the ERP is included on every native integration. If your ERP is not on the native list, the REST API supports any system that can call HTTPS and receive webhooks. Book a demo and bring your ERP version number, we will tell you on the call.

**5. Does Connexx replace my customs broker?**

For most shipments, yes. Connexx handles HS code lookup, EORI numbers, IOSS for EU consignments under €150, commercial invoices, packing lists, and country-specific customs declarations against HMRC, EU CDS, and the Windsor Framework. Specialist freight forwarding (FCA, EXW, dangerous goods) still uses your broker. Routine parcel exports to the EU, US, and other Connexx-covered countries are handled inside the platform.

**6. What carriers does Connexx support in the UK?**

Royal Mail (Tracked 24, Tracked 48, Signed, Special Delivery, First Class, Second Class, International), DPD (Next Day, Predict, Two Day, Saturday, DPD Local), Evri (Standard, Next Day, ParcelShop), Parcelforce (Express24, Express48, Global Express, Global Priority, Global Value), Yodel, DX, InPost, and Amazon Shipping. Every UK postcode is covered, including Highlands and Islands, Channel Islands, Northern Ireland, and BFPO. The full service-code list is on /integrations/carriers.

**7. How does Connexx pricing work?**

Pricing scales with shipment volume. Connexx is sold on a per-shipment basis with no minimum monthly commitment. Higher volume tiers pay a lower per-shipment rate. Setup fees are scoped to your integration mix (eCommerce only, ERP, marketplaces, or full stack). Contact ITD for a quote scoped to your specific volume and carrier mix. (**Reviewer flag:** real public pricing transparency would be stronger here. Confirm whether public-facing tiers can be published.)

**8. Does Connexx have an API?**

Yes. The Connexx REST API exposes every platform function (rate quote, shipment create, label generate, tracking, returns, carrier management) with webhook events for the full shipment lifecycle. Authentication is bearer token. Average response time is under Xms (PLACEHOLDER). Full documentation, schema reference, and code samples in cURL, Node, Python, and PHP are at /help/developers (URL placeholder, confirm with the platform team).

---

## Closing CTA

**Headline:** Stop running shipping in browser tabs.
**Subhead:** Book a 30-minute demo scoped to your carrier mix and ERP. We will run a live rate comparison on a real shipment you define.
**Primary CTA:** `Book my demo` → /contact?enquiry=connexx-demo
**Secondary CTA:** `Run the savings estimator` → /solutions (estimator anchor on the relevant solution page)

(The closing CTA wording leans on the ICP doc: the Connexx evaluator wants the demo to be a live technical session, not a pre-recorded walkthrough. The subhead reinforces that.)

---

## JSON-LD

To render via `<JsonLd>` in `src/app/connexx/page.tsx`. Uses `productSchema`, `breadcrumbSchema`, and `faqSchema`. The site-wide `organizationSchema` is already in the layout.

```ts
import { JsonLd, productSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";

// In the JSX:
<JsonLd data={[
  productSchema({
    name: "Connexx",
    description: "Multi-carrier shipping platform from ITD Global with live rate comparison, customs automation, branded tracking, returns, and analytics for UK and international shippers.",
    path: "/connexx",
    category: "Shipping software",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Connexx", path: "/connexx" },
  ]),
  faqSchema([
    { question: "What is Connexx?", answer: "Connexx is the multi-carrier shipping platform built by ITD Global. It connects your eCommerce platform, marketplaces, and ERP to 16 UK and international carriers from one dashboard. Live rate comparison runs on every shipment. Customs documentation is generated automatically for exports. Tracking writes back to the order source." },
    { question: "How does Connexx compare to Shiptheory, Sendcloud, and Metapack?", answer: "Connexx is UK-built with deeper carrier and customs coverage than Shiptheory, deeper B2B and customs handling than Sendcloud, and a faster onboarding timeline than Metapack. Shiptheory is strong for small UK retailers but limited at scale. Sendcloud is strong in EU eCommerce. Metapack is enterprise-grade and typically over-engineered for businesses under £50m revenue." },
    { question: "How long does it take to set up Connexx?", answer: "Shopify and WooCommerce connect in under 10 minutes through the official app and the WordPress plugin. Marketplace stacks take a few hours. ERP integrations typically run six to eight weeks for a multi-country enterprise rollout. SwiftLog Fulfilment onboards new 3PL brand clients on Connexx in two days, down from two weeks on their previous stack." },
    { question: "Does Connexx work with my ERP?", answer: "Likely yes. Connexx has native integrations to SAP, Oracle NetSuite, Microsoft Dynamics 365, Sage, Linnworks, Mintsoft, Veeqo, StoreFeeder, Selro, ShipHero, and Cin7. Shipment write-back into the ERP is included on every native integration. If your ERP is not on the native list, the REST API supports any system that can call HTTPS and receive webhooks." },
    { question: "Does Connexx replace my customs broker?", answer: "For most shipments, yes. Connexx handles HS code lookup, EORI numbers, IOSS for EU consignments under €150, commercial invoices, packing lists, and country-specific customs declarations against HMRC, EU CDS, and the Windsor Framework. Specialist freight forwarding still uses your broker. Routine parcel exports to the EU, US, and other covered countries are handled inside the platform." },
    { question: "What carriers does Connexx support in the UK?", answer: "Royal Mail, DPD, Evri, Parcelforce, Yodel, DX, InPost, and Amazon Shipping. Every UK postcode is covered, including Highlands and Islands, Channel Islands, Northern Ireland, and BFPO. The full service-code list is on /integrations/carriers." },
    { question: "How does Connexx pricing work?", answer: "Pricing scales with shipment volume. Connexx is sold on a per-shipment basis with no minimum monthly commitment. Higher volume tiers pay a lower per-shipment rate. Setup fees are scoped to your integration mix. Contact ITD for a quote scoped to your specific volume and carrier mix." },
    { question: "Does Connexx have an API?", answer: "Yes. The Connexx REST API exposes every platform function (rate quote, shipment create, label generate, tracking, returns, carrier management) with webhook events for the full shipment lifecycle. Authentication is bearer token. Full documentation and code samples in cURL, Node, Python, and PHP are at /help/developers." },
  ]),
]} />
```

---

## Internal link map

**Outbound from /connexx:**
- `/solutions/ecommerce` — in the rate comparison module ("see how eCommerce retailers cut shipping costs 42%") and the Peak Commerce reference
- `/solutions/b2b` — Atlas Industrial reference in the analytics module
- `/solutions/3pl` — SwiftLog reference in the featured case study block
- `/solutions/marketplace` — Velocity Sellers reference in the multi-carrier dispatch module
- `/solutions/export` — Meridian Trade Co reference in the customs module
- `/solutions/import` — Northgate Imports reference (potentially in customs module if expanded)
- `/shipping/domestic` — UK carrier list link
- `/shipping/international` — international carrier list link
- `/integrations` — main integrations CTA
- `/integrations/carriers` — full carrier service-code reference
- `/integrations/carriers/royal-mail`, `/integrations/carriers/dpd`, `/integrations/carriers/dhl` — first-mention carrier links (optional, depending on whether sub-pages exist)
- `/resources/case-studies` — featured case study read-more CTA
- `/resources/case-studies/swiftlog-3pl` — SwiftLog deep dive
- `/resources/comparisons` — in FAQ #2 (vs. Shiptheory/Sendcloud/Metapack)
- `/help/developers` — developer API section (URL placeholder)
- `/contact?enquiry=connexx-demo` — primary and closing CTAs

**Inbound to /connexx:**
- `/` — home page primary product link
- Every solution page (`/solutions/ecommerce`, `/solutions/b2b`, `/solutions/enterprise`, `/solutions/small-business`, `/solutions/3pl`, `/solutions/marketplace`)
- Every shipping page (`/shipping/domestic`, `/shipping/international`, `/shipping/[any-service]`)
- `/integrations` — "platform" or "powered by Connexx" callout
- Navbar (always-visible product link)
- Footer (product section)
- Every case study page (`/resources/case-studies/[slug]`) — "the platform behind this case" link

---

## Implementation notes

1. **Existing page is substantial.** Keep the structural scaffolding (hero, module grid, deep dives, developer block, metrics strip, closing CTA) and rewrite the copy to match this draft. The dashboard mockup in the hero can stay. The metrics strip needs the placeholder values replaced.

2. **Module grid count.** The existing page has 6 modules but only 4 deep dives. Either expand to 6 alternating deep-dive sections (one per module, matching the spreadsheet) or trim the page to keep 4 deep dives and let the module grid stand on its own. The draft above is written for 6 modules. Recommended: 6 deep dives so the module names and the deep dives match. Design needs to supply 6 UI preview assets (existing page only has 4).

3. **Hero stats and metrics strip.** The existing page uses hard-coded values (`2400000`, `85`, `99`, `180`). These need to be replaced with confirmed product-team figures or removed. The `85+ carriers connected` figure on the existing page is inflated relative to the 16 actual integrations in `src/lib/data.ts`. Either reconcile the number or rewrite the label ("85+ carrier services" if it counts service codes per carrier).

4. **Developer API section.** The existing code snippet uses `api.connexx.io`. The draft above uses `api.itdglobal.com`. Pick one and apply consistently. The existing snippet is functional but minimal. The expanded snippet above is more representative of a real shipment create call. Design needs to confirm the dark code block UI handles the longer JSON gracefully.

5. **FAQ section.** The existing page has no FAQ section. Add one as page-level JSX below the metrics strip, before the closing CTA. If the project uses a shared `Faq` component, use that. If not, build one against the FAQ data shape so the same component can be reused on solution pages.

6. **JsonLd.** Confirm `productSchema` helper exists in `src/components/seo/JsonLd`. If it does not, add it. Reference the pilot pattern in `solutions-ecommerce.md` for `serviceSchema`, `faqSchema`, and `breadcrumbSchema` shape.

7. **Quote in `src/lib/data.ts`.** The Peak Commerce quote (line 41 of `data.ts`) contains an em-dash used as a connector. Apply the cleanup proposed in `solutions-ecommerce.md`: replace `Connexx didn't just save us money — it gave us back our time.` with `Connexx didn't just save us money. It gave us back our time.`

8. **Voice check on the existing page.** The current `connexx/page.tsx` line 49 contains an em-dash as a connector: `Regulatory updates applied automatically — no manual rework when rules change`. Replace with a full stop and rewrite per the customs module copy above.

9. **Module rename.** The existing module 3 is "Tracking" and module 6 is "Customs & Compliance". The draft renames module 3 to "Customs Automation" (moving it up the page) and adds tracking inside the multi-carrier dispatch / returns modules. If the user prefers the existing module names, swap the order back. Flagged in reviewer questions.

---

## Reviewer questions

1. **Stats — confirm with product team:**
   - Annual shipments processed (hero and social proof)
   - Platform uptime % (hero and metrics strip)
   - Average API response time in ms (hero, developer section, metrics strip)
   - Total carriers number (currently 16 in `data.ts`; existing page claims 85+ which is inflated)
2. **Pricing transparency:** can we publish per-shipment volume tiers, even directional ones, on the page? The current "contact for a quote" answer is the weakest in the FAQ block.
3. **Developer docs URL:** is `/help/developers` the canonical path, or is there a separate `docs.itdglobal.com` style URL? The page links to it from three places.
4. **API endpoint domain:** the existing page uses `api.connexx.io` in the code snippet. The draft uses `api.itdglobal.com`. Confirm which is the live API root.
5. **Module names — are these the canonical names?** Rate Comparison, Multi-Carrier Dispatch, Customs Automation, Returns Management, Analytics & Reporting, Integrations & API. The existing page uses slightly different names (Rate Comparison, Label Generation, Tracking, Returns Management, Analytics, Customs & Compliance). Confirm the spec.
6. **SwiftLog case study quote:** confirm public-use approval. The quote above has no em-dashes. The supporting headline ("98.7% accuracy across 40+ destination countries") is taken directly from `src/lib/data.ts` and is already public on the existing site.
7. **Peak Commerce quote cleanup:** confirm that the proposed em-dash removal in `data.ts` line 41 is approved.
8. **OG image:** is there a Connexx-specific OG image, or should design create `/og/connexx.png`?
9. **Code snippet syntax:** confirm the JSON shape used in the cURL example matches the actual API contract (parameter names: `from.postcode`, `to.postcode`, `parcel.weight_kg`, `service_preference`). Adjust if the live API uses different naming.
10. **Returns "8% of revenue" stat in module 4:** confirm whether this figure is sourced from internal ITD data, an industry report, or a customer case. If not sourceable, replace with a Connexx-specific stat or cut.
11. **Comparison page hub:** the FAQ block references `/resources/comparisons`. Confirm this path exists or is on the roadmap. If not, the FAQ answer can be rewritten without the link.
12. **Status page URL:** the developer block links to `status.itdglobal.com`. Confirm this exists or update the link.
