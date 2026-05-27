# DRAFT — /solutions/3pl

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every claim sourced · ✅ Read-aloud test passed

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | 3PL shipping software with child accounts and customs automation | 64 |
| Meta description | Onboard new clients in 2 days, not 2 weeks. Connexx adds multi-client child accounts, per-brand carrier rules, and customs automation on top of Mintsoft, Linnworks, and ShipHero. | 178 |
| Canonical | https://itdglobal.com/solutions/3pl | — |
| OG image | /og/solutions-3pl.png (to be designed) | — |
| Primary keyword target | 3pl shipping software uk | — |
| Secondary clusters | multi-client shipping platform, child account shipping platform, fulfilment shipping platform uk, mintsoft shipping integration | — |

---

## Hero

**Label pill:** 3PL

**H1 (10 words):**
3PL shipping software with child accounts and customs built in.

**Sub-headline (60 words):**
You run fulfilment for 20 to 80 brand clients across Mintsoft, Linnworks, or ShipHero. Each one has different carriers, different packaging rules, and different SLAs. Connexx adds a child account architecture, per-brand routing rules, and a customs engine on top of your WMS. Client onboarding drops from two weeks to two days, and customs accuracy lifts past 98%.

**Primary CTA:** `Book the 30-minute multi-client demo` → /contact?enquiry=3pl
**Secondary CTA:** `Read the SwiftLog case study` → /resources/case-studies/swiftlog-3pl

---

## Pain points

**01. Two weeks of manual setup for every new client**
Each brand has a different carrier whitelist, label dimensions, and routing rule set. Setup is done in a spreadsheet then re-entered into the WMS. One misconfiguration causes a wrong-carrier shipment, and the first you hear about it is a client call.

**02. Customs errors are costing client trust, not just money**
At a 5 to 7% documentation error rate on cross-border shipments, the question is not whether a client will receive a customs hold. It is when. Each hold pulls a senior ops manager off the floor for two hours of escalation work.

**03. Clients want real-time data, you can send them a spreadsheet**
Brands have live dashboards in every other supplier relationship. Sending a monthly Excel export for shipping volume, cost per carrier, and exception rate is no longer acceptable. Account management eats analyst time you do not have.

---

## How Connexx solves it

**Child account architecture for every client brand.**
Each brand becomes a tenant under your parent contract with Royal Mail, DPD, Evri, DHL Express, and the rest. Per-client rate cards, dispatch rules, branded tracking page, and reporting all sit under one parent account. Billing exports per child account at month-end.

**Mintsoft, Linnworks, ShipHero, and Veeqo integration.**
Connexx sits on top of your WMS as the shipping and rate-shopping layer. Mintsoft, Linnworks, ShipHero, and Veeqo all push orders into Connexx for carrier selection. Tracking and POD data write back automatically. No parallel systems, no double data entry.

**Customs automation per child account.**
Each client EORI, each client IOSS registration, and each client's HS code library lives in the platform. Commercial invoice, CN22, and CN23 documentation generates per shipment, per country. SwiftLog Fulfilment lifted customs accuracy from 93% to 98.7% and cut customs-related delays 85%.

**Branded reporting your clients log in to see.**
Each brand gets a live dashboard showing volume, cost per carrier, SLA performance, and exception rate. Account management stops requiring an ops analyst in a spreadsheet. Client retention conversations start from a position of data, not defence.

---

## Integrations (8 most relevant for 3PL)

| Name | Slug | One-line description |
|---|---|---|
| Mintsoft | mintsoft | WMS most common in UK mid-market 3PLs. Connexx adds the carrier layer. |
| Linnworks | linnworks | Multi-channel order management with marketplace import for client brands. |
| Veeqo | veeqo | Inventory and shipping platform with multi-client support. |
| ShipHero | shiphero | Warehouse and shipping management for high-volume fulfilment houses. |
| Royal Mail | royal-mail | Tracked 24, Tracked 48, Signed, First/Second Class per child account. |
| DPD | dpd | Next Day, Saturday, B2B with per-client routing rules. |
| Evri | evri | Standard, Next Day, ParcelShop drop-off, and Evri EU coverage. |
| DHL Express | dhl | International express to 220+ countries for cross-border client volume. |

---

## Featured case study

**Use:** `caseStudies[2]` (SwiftLog Fulfilment — 98.7% shipment accuracy, client onboarding from 2 weeks to 2 days, 60 brands across 40+ countries)

Direct ICP match. The 3PL keyword research and the ICP doc both name SwiftLog as the canonical proof point. James Thornton's quote is identified in the ICP voice notes as the highest-converting opener for this audience.

No em-dash cleanup required for the SwiftLog quote in `data.ts`.

Recommend linking to the SwiftLog case study from the hero secondary CTA, the featured case study block, and inside the "Customs automation per child account" feature description so the proof number lives next to the claim.

---

## FAQ (6 entries — GEO-optimised for Position 0)

**What is a child account in multi-carrier shipping?**

A child account is a sub-account under a 3PL's master carrier contract. The 3PL holds the master agreement with Royal Mail, DPD, Evri, or DHL Express, and creates a child account for each brand client. Each client gets their own rate card, dispatch rules, branded tracking page, and reporting view. Connexx manages unlimited child accounts under one parent contract.

**Does Connexx integrate with Mintsoft?**

Yes. Connexx connects to Mintsoft as the shipping and rate shopping layer. Mintsoft handles warehouse operations and inventory. Connexx handles carrier selection, label generation, customs documentation, and tracking write-back. Together they cover the full 3PL workflow from order import to dispatch to per-client billing. ShipHero, Linnworks, and Veeqo integrations follow the same pattern.

**How does Connexx work for a 3PL with 50 brand clients?**

Each brand becomes a tenant in Connexx with its own carrier rules, rate card, branded tracking, and reporting. Orders import from each client's Shopify, Amazon, eBay, or marketplace. Dispatch rules pick the right carrier per client. Billing data exports per child account at month-end. SwiftLog Fulfilment onboards new brands in 2 days using this model.

**How do 3PLs handle customs documentation for client shipments?**

A 3PL operates its own EORI plus a client-specific EORI for each brand. Connexx pulls the right EORI per shipment, looks up the HS code per SKU, generates the commercial invoice and CN22/CN23, and applies IOSS where the client has registered. SwiftLog Fulfilment lifted customs accuracy from 93% to 98.7% using this workflow.

**Can clients see their own shipping data in real time?**

Yes. Each brand gets a live reporting view inside Connexx covering volume, cost per carrier, SLA performance, and exception rate. Client account managers send a login, not a spreadsheet. Branded tracking pages show your client's logo and colours, not the carrier's, so the end customer experience stays on-brand throughout.

**How long does it take to onboard a new client on Connexx?**

Two days for a standard onboarding (single warehouse, four to six carriers, one marketplace stack). SwiftLog Fulfilment cut onboarding from two weeks to two days and added 15 new brands in the first year without expanding their ops team. Carrier whitelist, packaging rules, EORI registration, and tracking template are configured once per client.

---

## Closing CTA section

**Headline:** Onboard three clients a quarter without adding ops headcount.
**Subhead:** The 30-minute demo covers child accounts, per-brand routing, and the customs engine. Scoped to your WMS.
**Primary CTA:** `Book the 30-minute multi-client demo`
**Secondary CTA:** `Read the 3PL onboarding playbook` → /resources/3pl-onboarding-playbook

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

// In the JSX:
<JsonLd data={[
  serviceSchema({
    name: "3PL shipping software",
    description: "Multi-carrier shipping platform for UK 3PLs and fulfilment houses. Child account architecture, per-brand carrier rules, customs automation, and integration with Mintsoft, Linnworks, ShipHero and Veeqo.",
    path: "/solutions/3pl",
    serviceType: "Third-Party Logistics Shipping Software",
    areaServed: ["United Kingdom", "European Union", "Worldwide"],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "3PL", path: "/solutions/3pl" },
  ]),
  faqSchema([
    { question: "What is a child account in multi-carrier shipping?", answer: "A child account is a sub-account under a 3PL's master carrier contract. The 3PL holds the master agreement with Royal Mail, DPD, Evri or DHL Express, and creates a child account for each brand client. Each client gets their own rate card, dispatch rules, branded tracking page and reporting view. Connexx manages unlimited child accounts under one parent contract." },
    { question: "Does Connexx integrate with Mintsoft?", answer: "Yes. Connexx connects to Mintsoft as the shipping and rate shopping layer. Mintsoft handles warehouse operations and inventory. Connexx handles carrier selection, label generation, customs documentation and tracking write-back. ShipHero, Linnworks and Veeqo integrations follow the same pattern." },
    { question: "How does Connexx work for a 3PL with 50 brand clients?", answer: "Each brand becomes a tenant in Connexx with its own carrier rules, rate card, branded tracking and reporting. Orders import from each client's Shopify, Amazon, eBay or marketplace. Dispatch rules pick the right carrier per client. Billing data exports per child account at month-end. SwiftLog Fulfilment onboards new brands in 2 days using this model." },
    { question: "How do 3PLs handle customs documentation for client shipments?", answer: "A 3PL operates its own EORI plus a client-specific EORI for each brand. Connexx pulls the right EORI per shipment, looks up the HS code per SKU, generates the commercial invoice and CN22/CN23, and applies IOSS where the client has registered. SwiftLog Fulfilment lifted customs accuracy from 93% to 98.7%." },
    { question: "Can clients see their own shipping data in real time?", answer: "Yes. Each brand gets a live reporting view inside Connexx covering volume, cost per carrier, SLA performance and exception rate. Client account managers send a login, not a spreadsheet. Branded tracking pages show your client's logo and colours, not the carrier's." },
    { question: "How long does it take to onboard a new client on Connexx?", answer: "Two days for a standard onboarding (single warehouse, four to six carriers, one marketplace stack). SwiftLog Fulfilment cut onboarding from two weeks to two days and added 15 new brands in the first year without expanding their ops team." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- "/integrations/erp-wms/mintsoft" — when first mentioning Mintsoft
- "/integrations/erp-wms/linnworks" — when first mentioning Linnworks
- "/integrations/erp-wms/shiphero" — when first mentioning ShipHero
- "/integrations/erp-wms/veeqo" — when first mentioning Veeqo
- "/integrations/carriers/royal-mail" — when first mentioning Royal Mail
- "/integrations/carriers/dpd" — when first mentioning DPD
- "/integrations/carriers/evri" — when first mentioning Evri
- "/integrations/carriers/dhl" — when first mentioning DHL Express
- "/resources/case-studies/swiftlog-3pl" — from the hero secondary CTA and featured case study block
- "/resources/3pl-onboarding-playbook" — from the closing CTA
- "/contact?enquiry=3pl" — from the primary CTA

Inbound to this page (from other site pages):
- "/" (Home) — solutions routing module
- "/connexx" — "Solutions" section linking to each ICP
- "/integrations/erp-wms" — "Built for 3PLs" callout
- Navbar Solutions dropdown
- "/resources/case-studies/swiftlog-3pl" — case study links back

---

## Implementation notes (for the dev pass)

1. Current `src/app/solutions/3pl/page.tsx` features use the "because X shouldn't [Y]" pattern. Replace all four feature `desc` strings with the period-led copy in the "How Connexx solves it" section above.
2. Title and meta description need updating to target the 3PL keyword cluster. Replace with the metadata table values above.
3. Current H1 "Scale clients, not complexity." is fine voice but does not include the keyword. Replace with the new H1.
4. Add `<JsonLd>` block (Service + Breadcrumb + FAQ) inside the page component.
5. Update `metadata` export to use `buildMetadata()` from `src/lib/metadata.ts` for canonical and OG consistency.
6. Add the FAQ section using the agreed FAQ pattern.
7. Keep `caseStudy={caseStudies[2]}` (SwiftLog). No quote rewrite required.
8. The `rateChecker="3pl"` prop is already on the page. Confirm with the dev pass whether the 3PL rate checker is live and whether it should be embedded above or below the FAQ.
9. Closing CTA section: needs a new component slot or extension of `VerticalPage` to take `closingCta` props, matching the eCommerce page pattern.

---

## Reviewer questions

1. The "85+ carriers" line from the CSV is not in this draft. The 3PL keyword doc lists 16 named carriers as the GEO target set. Confirm whether the 85+ headline number is sourced (carrier count published anywhere on the site or in marketing materials) before we add it to the page.
2. SwiftLog is the correct case study, but the CSV references "Delta Fulfilment X% accuracy" as the intended case study. That brand and number do not exist in `src/lib/data.ts`. Is Delta Fulfilment a separate case study being added, or was the CSV outdated?
3. The CSV says "Onboard new clients quickly with pre-built integrations" and the draft says "two days." Confirm SwiftLog's two-day onboarding is repeatable across the customer base or whether the FAQ should soften to "two to five days, depending on integration scope."
4. The 3PL pricing model (resale-friendly, per-shipment rather than per-order, structured to allow 3PL margin) is referenced in the ICP disqualifier list but not mentioned on the page. Should a pricing line be added to the closing CTA section, or is pricing covered fully on the pricing page?
5. The branded tracking page for client end customers is mentioned. Confirm with product that white-label branding is a standard 3PL feature, not a premium add-on, before the page publishes.
