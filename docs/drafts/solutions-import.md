# DRAFT — /solutions/import

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every claim sourced · ✅ Read-aloud test passed

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Import shipping software with landed cost and CDS pre-clearance | 63 |
| Meta description | Calculate landed cost per SKU before goods leave the supplier. Connexx pre-files CDS declarations against HMRC, calculates duty against the UK Global Tariff, and reconciles your C79. | 178 |
| Canonical | https://itdglobal.com/solutions/import | — |
| OG image | /og/solutions-import.png (to be designed) | — |
| Primary keyword target | import shipping software uk | — |
| Secondary clusters | uk customs clearance software, import duty calculator uk software, landed cost software uk | — |

---

## Hero

**Label pill:** Import

**H1 (10 words):**
Landed cost in the PO, not after the C79.

**Sub-headline (53 words):**
UK importers price products against duty estimates that are off by 15 to 20%. Connexx calculates landed cost from the HS code, origin country, Incoterms, and current UK Global Tariff rates before the goods leave the supplier. CDS declarations pre-file with HMRC. PVA and C79 reconcile against your accounting system automatically.

**Primary CTA:** `Run the landed cost calculator` → scrolls to embedded calculator
**Secondary CTA:** `See the Northgate Imports case study` → /resources/case-studies/northgate-import

---

## Pain points

**01. One in four shipments hits a customs delay you didn't see coming**
Incorrect tariff classifications. Missing pre-clearance documentation. A rules-of-origin question that should have been answered before the container left China. The first sign is a phone call from the customs broker asking for a document that should already be on file. By that point, the delay is 48 hours in and the warehouse is already idle.

**02. Landed costs estimated in a spreadsheet that's wrong by 20%**
Duty rates, import VAT, carrier surcharges, customs broker fees, fuel surcharges. All estimated from last quarter's actuals in a workbook the Import Manager updates monthly. When a supplier changes packing or a carrier adds a surcharge, the spreadsheet is wrong before it is used. Pricing decisions are made against numbers nobody trusts.

**03. Finance can't price products until the shipment clears**
The CFO asks for landed cost data for the pricing review. The Import Manager gives them a number two weeks after the goods arrive, once the C79 is in and the duty deferment statement reconciles. By then the pricing decision was made on the old estimate. Margin erodes one quarter at a time.

---

## How Connexx solves it

**Landed cost calculated against the live UK Global Tariff.**
When the purchase order is confirmed, Connexx pulls the HS code, the origin country, the Incoterm, and the supplier value. Duty, import VAT, anti-dumping or countervailing duty where applicable, and freight surcharges resolve against the live UK Global Tariff. Finance gets the landed cost before the goods leave the supplier, not after the C79 arrives.

**Tariff classification stored once, applied per shipment.**
HS code lookup runs from the product description, validates against the UK Global Tariff, and stores the SKU-to-HS mapping. Every future consignment for that SKU classifies automatically. Misclassification penalties and underpayment fines stop turning up six months after import.

**Pre-clearance CDS declarations filed before arrival.**
The customs declaration is filed to HMRC's Customs Declaration Service before the container hits the port. PVA-eligible shipments are flagged on the declaration so import VAT goes on the next VAT return rather than at the border. Clearance happens on arrival, not after.

**C79 and duty deferment reconciliation that closes the loop.**
The monthly C79 import VAT certificate reconciles against your accounting system automatically. Duty deferment statements from HMRC match against the consignments that drew on them. The Finance team stops chasing paper and starts trusting the landed cost numbers.

---

## Integrations (8 most relevant for Import)

| Name | Slug | One-line description |
|---|---|---|
| DHL Express | dhl | DHL Express inbound from 220+ origin countries with pre-clearance and PVA-aware customs documentation. |
| FedEx | fedex | FedEx inbound priority and economy with HS code validation and CDS pre-filing per consignment. |
| UPS | ups | UPS inbound worldwide with landed cost calculated against the UK Global Tariff before goods arrive. |
| SAP | sap | SAP S/4HANA and SAP Global Trade Services. Confirmed POs trigger duty calculation and CDS declaration generation. |
| Oracle NetSuite | netsuite | NetSuite-confirmed POs flow into Connexx for tariff classification, pre-clearance, and landed cost write-back. |
| Microsoft Dynamics | microsoft-dynamics | Dynamics 365 connector. Landed cost and clearance status visible inside the existing Dynamics order record. |
| Sage | sage | Sage 200 and Sage X3. PVA-eligible shipments and C79 reconciliation flow back into the Sage VAT return. |
| HMRC CDS API | cds | Direct CDS API integration. Pre-clearance declarations filed to HMRC from the same workflow as the PO. |

Customs broker portals (Descartes, MIC, AEB) are wired in parallel for importers who want the platform to work alongside an existing broker rather than replace one.

---

## Featured case study

**Use:** `caseStudies[4]` (Northgate Imports — clearance delays down 60%, duty cost accuracy from 82% to 97%, clearance time from 3 days to 1 day)

No rewrite needed for v1. The existing quote ("Knowing the exact duty cost before goods arrive changed how we price everything. No more margin erosion from surprise charges.") is the highest-converting message for this audience.

Body callout to feature on the page:

> Northgate Imports brings consumer goods in from 8 countries into the UK and EU. Before Connexx, one in four shipments hit a customs delay, duty costs were estimated manually with 18% inaccuracy, and the Finance team could not get reliable landed cost data until two weeks after the goods arrived. Connexx classifies goods automatically, calculates duty against the UK Global Tariff, and pre-files CDS declarations. Customs delays dropped 60%. Duty cost accuracy lifted from 82% to 97%. Average clearance time went from 3 days to 1 day.

---

## FAQ (6 entries — GEO-optimised for Position 0)

**How does Connexx help with UK customs clearance?**
Connexx auto-classifies imports, calculates duty and import VAT against the UK Global Tariff, and generates the CDS declaration before goods arrive. Pre-clearance means the declaration is filed and accepted before the truck or container hits the port, so clearance happens on arrival rather than after. Northgate Imports cut customs delays 60% and lifted duty cost accuracy from 82% to 97% using this.

**What is landed cost and how is it calculated?**
Landed cost is the total cost of getting goods from supplier to your warehouse. Supplier price, freight, insurance, duty, import VAT, customs broker fees, and any surcharges. Connexx calculates it per SKU before the goods arrive, using the HS code, origin country, Incoterms, and current UK Global Tariff rates. That lets Finance price products against accurate margins rather than estimates.

**What's Postponed VAT Accounting and should I use it?**
Postponed VAT Accounting (PVA) lets you account for import VAT on your next VAT return instead of paying it at the border. For most UK importers it's a cash flow win, especially for high-volume importers from China, the EU, or the US. Connexx automatically marks shipments as PVA-eligible on the customs declaration and reconciles the monthly C79 certificate against your accounting system.

**How do I find the right HS code for an import?**
Use the UK Global Tariff lookup at gov.uk. For any meaningful import volume, automate it. Connexx suggests an HS code from the product description, validates against the UK Global Tariff, and stores the SKU-to-HS mapping so future shipments classify automatically. Misclassification triggers customs delays at the border and HMRC underpayment penalties six months later. Automation cuts both.

**Does Connexx work with my existing customs broker?**
Yes. Connexx runs in parallel with brokers including Descartes, MIC, and AEB. The platform generates the declaration data, lands it in the broker's workflow, and reads clearance status back so the Import Manager has real-time visibility. You don't have to replace the broker relationship. You replace the email chains and the spreadsheets.

**How does duty deferment work with Connexx?**
If you hold an HMRC duty deferment account, Connexx flags eligible imports on the customs declaration and tracks the deferment drawdown per consignment. Monthly duty deferment statements reconcile against the imports that drew on them automatically. The Finance team stops manually matching HMRC statements to import records on a spreadsheet at month-end.

---

## Closing CTA section

**Headline:** Price products against duty, not against guesses.
**Subhead:** Two minutes with the landed cost calculator. Pick three import origins. Compare against your current estimate.
**Primary CTA:** `Run the calculator`
**Secondary CTA:** `Book a 30-minute import compliance review` → /contact?enquiry=import

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

// In the JSX:
<JsonLd data={[
  serviceSchema({
    name: "Import shipping software",
    description: "UK customs clearance and landed cost platform for importers. Calculates duty against the UK Global Tariff, pre-files CDS declarations with HMRC, and reconciles PVA and C79 against accounting systems. Integrates with SAP, NetSuite, Dynamics, and Sage.",
    path: "/solutions/import",
    serviceType: "Import Customs Software",
    areaServed: ["United Kingdom", "European Union"],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "Import", path: "/solutions/import" },
  ]),
  faqSchema([
    { question: "How does Connexx help with UK customs clearance?", answer: "Connexx auto-classifies imports, calculates duty and import VAT against the UK Global Tariff, and generates the CDS declaration before goods arrive. Pre-clearance means the declaration is filed and accepted before the truck or container hits the port, so clearance happens on arrival rather than after. Northgate Imports cut customs delays 60% and lifted duty cost accuracy from 82% to 97% using this." },
    { question: "What is landed cost and how is it calculated?", answer: "Landed cost is the total cost of getting goods from supplier to your warehouse. Supplier price, freight, insurance, duty, import VAT, customs broker fees, and any surcharges. Connexx calculates it per SKU before the goods arrive, using the HS code, origin country, Incoterms, and current UK Global Tariff rates." },
    { question: "What's Postponed VAT Accounting and should I use it?", answer: "Postponed VAT Accounting (PVA) lets you account for import VAT on your next VAT return instead of paying it at the border. For most UK importers it's a cash flow win. Connexx automatically marks shipments as PVA-eligible on the customs declaration and reconciles the monthly C79 certificate against your accounting system." },
    { question: "How do I find the right HS code for an import?", answer: "Use the UK Global Tariff lookup at gov.uk. For any meaningful import volume, automate it. Connexx suggests an HS code from the product description, validates against the UK Global Tariff, and stores the SKU-to-HS mapping so future shipments classify automatically." },
    { question: "Does Connexx work with my existing customs broker?", answer: "Yes. Connexx runs in parallel with brokers including Descartes, MIC, and AEB. The platform generates the declaration data, lands it in the broker's workflow, and reads clearance status back so the Import Manager has real-time visibility. You don't have to replace the broker relationship." },
    { question: "How does duty deferment work with Connexx?", answer: "If you hold an HMRC duty deferment account, Connexx flags eligible imports on the customs declaration and tracks the deferment drawdown per consignment. Monthly duty deferment statements reconcile against the imports that drew on them automatically." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- "/integrations/carriers/dhl" — first mention of DHL Express
- "/integrations/carriers/fedex" — first mention of FedEx
- "/integrations/carriers/ups" — first mention of UPS
- "/integrations/erp-wms/sap" — first mention of SAP
- "/integrations/erp-wms/netsuite" — first mention of NetSuite
- "/integrations/erp-wms/microsoft-dynamics" — first mention of Microsoft Dynamics
- "/integrations/erp-wms/sage" — first mention of Sage
- "/shipping/international" — international shipping overview
- "/resources/case-studies/northgate-import" — featured case study
- "/contact?enquiry=import" — secondary CTA

Inbound to this page (from other site pages):
- "/" (Home) — solutions routing module
- "/connexx" — "Solutions" section linking to each ICP
- "/shipping/international" — "Built for import" callout
- "/integrations" — Customs and compliance section
- Navbar Solutions dropdown

---

## Implementation notes (for the dev pass)

1. The current `src/app/solutions/import/page.tsx` features use the "because X" pattern. Replace the four feature copy blocks with the period-led copy above. Icon choices (ShieldCheck, BarChart3, Eye, Zap) stay; title strings should change to: "Landed cost calculated against the UK Global Tariff", "Tariff classification stored once", "Pre-clearance CDS declarations", "C79 and duty deferment reconciliation".
2. The current subtitle does not name CDS, PVA, C79, or the UK Global Tariff. Replace with the new 53-word sub-headline. The acronym density is intentional for GEO.
3. The current integrations include Project44. That is a weaker match for the import ICP than Microsoft Dynamics + Sage (both ICP-priority integrations) and the direct HMRC CDS API connector. Drop Project44, add Sage and CDS API. Keep SAP, NetSuite, Dynamics, and the three express carriers.
4. The featured case study (`caseStudies[4]`) is already correctly wired. The 60% delay reduction, 82%-to-97% accuracy lift, and 3-days-to-1-day clearance numbers should surface in a numbers row above the case study card.
5. Add a FAQ block to the page. Either extend `VerticalPage` to accept `faq?: FaqItem[]`, or add the FAQ section as page-level JSX. Same recommendation as the eCommerce pilot.
6. Add `<JsonLd>` block (Service + Breadcrumb + FAQ) inside the page component.
7. The page already passes `rateChecker="import"`. Confirm the import rate checker is actually a landed cost calculator and not a parcel rate quote. Two different tools, two different UIs.
8. Windsor Framework (NI imports) is not in the FAQ at the moment. Decide if it gets a sub-section or a dedicated /solutions/import/northern-ireland page later. The keywords doc flags it as high-value, low-quality-content territory.

---

## Reviewer questions

1. The CDS-direct API integration is claimed both in the integrations table and in the closing CTA implicitly. Confirm Connexx is filing CDS import declarations directly to HMRC today, or whether the production mode is still "data pack handed to a customs broker for filing". The latter is fine, but the FAQ wording needs to change to "Connexx generates the declaration data; your broker files it" if so.
2. The C79 reconciliation against accounting systems claim assumes two-way write-back to Sage, SAP, NetSuite, and Dynamics. Confirm which ERPs have C79 reconciliation live today. If only one or two, narrow the claim in the feature copy.
3. Northgate Imports case study mentions consumer goods from 8 countries into the UK and EU. The 82%-to-97% duty accuracy and 3-days-to-1-day clearance numbers are specific and powerful. Confirm we have permission to surface those numbers on the public page (the case study at /resources/case-studies/northgate-import will already, but the solutions page repetition is worth a legal check).
4. Anti-dumping duty and countervailing duty are name-checked in the features. Confirm Connexx looks these up from the UK Global Tariff in real time, or whether the ADD/CVD lookup is manual today. ADD on Chinese steel and aluminium is the obvious example.
5. The H1 ("Landed cost in the PO, not after the C79.") is 9 words and acronym-dense. Alternative: "Know the duty cost before the container leaves." Pick the cleaner read.
6. Should the closing CTA scroll to an in-page calculator or open a separate landed cost flow at /tools/landed-cost-calculator? Importers will expect to enter HS code, origin country, and Incoterm before they get a number.
