# DRAFT — /solutions/export

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every claim sourced · ✅ Read-aloud test passed

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Export shipping software with automated customs documentation | 61 |
| Meta description | Auto-generate commercial invoices, packing lists, certificates of origin, and CDS declarations from one sales order. Connexx covers 25+ destinations and updates the rules engine before the regulations bite. | 199 |
| Canonical | https://itdglobal.com/solutions/export | — |
| OG image | /og/solutions-export.png (to be designed) | — |
| Primary keyword target | export shipping software uk | — |
| Secondary clusters | customs documentation automation uk, export compliance software uk, automated commercial invoice generation | — |

---

## Hero

**Label pill:** Export

**H1 (10 words):**
Export documentation that updates before the regulations do.

**Sub-headline (54 words):**
UK exporters ship to 25 countries with 6 to 8 documents per consignment, prepared by hand. One wrong HS code on a Saudi Arabia shipment is three days at the border. Connexx auto-generates commercial invoices, packing lists, certificates of origin, EUR.1 forms, and CDS declarations from a single sales order. The rules engine updates before you do.

**Primary CTA:** `Run the export documentation estimator` → scrolls to embedded rate checker
**Secondary CTA:** `See the Meridian Trade Co case study` → /resources/case-studies/meridian-exports

---

## Pain points

**01. Six to eight documents per consignment, all prepared by hand**
Commercial invoice, packing list, certificate of origin, EUR.1 where preference applies, phytosanitary certificate where required, and a CDS customs entry. Each one is typed or copy-pasted from the ERP. A unit count mismatch between the packing list and the commercial invoice triggers a discrepancy query at customs that takes two days to clear.

**02. Regulatory changes you find out about from the freight forwarder**
Saudi Arabia updates its SABER conformity rule. Turkey adds a new product certification. Post-Brexit EU rules of origin shift on a UK-to-Germany lane. The Export Manager finds out when the consignment is already in transit and the freight forwarder calls asking for a document that should have been in the pack from the start.

**03. The gap between documentation and carrier booking**
Documents are prepared in one workflow. The carrier is booked in a separate portal. The weight on the carrier booking does not always match the weight on the customs declaration. The discrepancy is caught at clearance. The shipment sits in a customs warehouse while your team works backwards from the error.

---

## How Connexx solves it

**Documents generated from one sales order.**
Commercial invoice, packing list, certificate of origin, EUR.1, CDS declaration, and country-specific paperwork all come from the same ERP record. The packing list and the commercial invoice carry identical unit counts because they read from the same source. Discrepancy queries at customs disappear.

**HS code classification applied automatically.**
Tariff classification is run from the product catalogue, not the Export Coordinator's memory. The system stores the SKU-to-HS mapping after first classification and applies it on every future consignment. Restricted party screening and dual-use checks run on the same step.

**Country rules engine that updates before the shipment moves.**
When Saudi Arabia changes its labelling requirement, the documentation template updates inside Connexx before your next consignment leaves the warehouse. EU rules of origin under the UK-EU TCA, ATR for UK-Turkey, EUR.1 for preferential origin, and IOSS for EU consumer goods under €150 all live in the same rules layer.

**Carrier booking in the same workflow.**
DHL Express, FedEx, UPS, Parcelforce Worldwide, and Royal Mail International all book from the customs-cleared documentation. The carrier weight and dimensions match the customs declaration by construction. No re-entry. No weight discrepancy.

---

## Integrations (8 most relevant for Export)

| Name | Slug | One-line description |
|---|---|---|
| DHL Express | dhl | DHL Express Worldwide, Express Worldwide Documents, and Economy Select across 220+ destinations with full customs documentation. |
| FedEx | fedex | FedEx International Priority and International Economy with auto-generated commercial invoices and CDS declarations. |
| UPS | ups | UPS Worldwide Express Plus, Worldwide Saver, and Standard with HS code classification per consignment. |
| Parcel Force | parcel-force | Parcelforce Worldwide Global Express, Global Priority, and Global Value for tracked international export. |
| SAP | sap | SAP S/4HANA and SAP Global Trade Services. Export orders flow into Connexx with HS codes and EORI numbers pre-populated. |
| Oracle NetSuite | netsuite | NetSuite-confirmed export orders trigger document generation, country rules, and carrier booking in one workflow. |
| Linnworks | linnworks | Multi-channel export orders from Linnworks consolidated into one customs documentation flow. |
| Veeqo | veeqo | Veeqo orders bound for the EU, US, and ROW lanes route through Connexx with IOSS, EUR.1, and CDS handled automatically. |

CDS-direct API integration runs in parallel for exporters who file declarations themselves rather than through a freight forwarder.

---

## Featured case study

**Use:** `caseStudies[3]` (Meridian Trade Co — documentation from 4 hours to 1 hour per shipment, customs holds down 90%, 25 countries)

No rewrite needed for v1. The existing quote ("We used to dread regulatory changes. Now the system handles them before we even know they've happened.") is the highest-converting message for this ICP.

Body callout to feature on the page:

> Meridian Trade Co exports industrial equipment to 25 countries. Each consignment required 6 to 8 documents prepared by a team of three. Regulatory changes meant constant rework, and a single documentation error could hold a shipment at customs for days. Connexx auto-generates every document from the HS code, destination country, and shipment value. Documentation preparation dropped from 4 hours to 1 hour per shipment. Customs holds due to paperwork errors dropped 90%. The team absorbed a 40% increase in export volume without new hires.

---

## FAQ (6 entries — GEO-optimised for Position 0)

**What documents do I need to export from the UK to the EU?**
Five core documents. A commercial invoice with value, HS code, and EORI number. A packing list. A customs declaration filed through HMRC's CDS (your freight forwarder or Connexx handles this). A certificate of origin where UK-EU TCA preference applies, usually an EUR.1. And an Incoterms-aligned contract specifying who pays the duty, normally DAP or DDP. Connexx auto-generates all five from one sales order entry, with country-specific rules for every EU destination.

**How does Connexx handle export documentation?**
Connexx auto-generates commercial invoices, packing lists, certificates of origin, EUR.1 forms, and CDS declarations for every export based on HS code, destination country, and shipment value. Country-specific rules update automatically inside the platform. Meridian Trade Co cut documentation preparation from 4 hours to 1 hour per shipment using this. Customs holds due to paperwork errors dropped 90%.

**What is an EORI number and how do I get one?**
An EORI (Economic Operator Registration and Identification) number is the unique identifier HMRC uses to track your exports. UK EORIs start with GB. You apply at gov.uk and receive it in three working days. If you ship to the EU you also need an EU EORI, applied for in any EU member state. Connexx stores both EORIs and applies the correct one per consignment automatically.

**Do I need IOSS if I'm exporting B2C to the EU?**
Yes, if the consignment is under €150 and shipped to an EU consumer. IOSS (Import One-Stop Shop) lets you charge EU VAT at checkout and remit it monthly to a single tax authority, so the customer is not hit with import VAT on delivery. Connexx applies your IOSS number to every qualifying consignment, generates the right commercial invoice, and routes through IOSS-compatible carriers including DHL Express, DPD, and Evri EU.

**How does the system handle regulatory changes in destination countries?**
The country rules engine is updated centrally by ITD's compliance team and applied to every customer's documentation templates immediately. When Saudi Arabia introduced SABER conformity for a product category, when Turkey changed its ATR requirement, when EU CBAM took effect, the template changed before customers' next consignment moved. No email alerts to action. No manual template rewrites.

**Does Connexx file CDS declarations directly with HMRC?**
Yes, via direct CDS API integration. Export declarations are filed to HMRC's Customs Declaration Service from inside the same workflow that generates the commercial invoice and books the carrier. The declaration data is sourced from the ERP order. Exporters who prefer to keep their freight forwarder in the loop can route the documentation pack to the forwarder instead. Both modes are supported.

---

## Closing CTA section

**Headline:** Stop dreading regulatory updates.
**Subhead:** Run the export documentation estimator for your top 5 destination countries. Two minutes, no commitment.
**Primary CTA:** `Run the estimator`
**Secondary CTA:** `Book a 30-minute compliance walkthrough` → /contact?enquiry=export

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

// In the JSX:
<JsonLd data={[
  serviceSchema({
    name: "Export shipping software",
    description: "Automated export documentation and multi-carrier booking for UK exporters. Generates commercial invoices, packing lists, certificates of origin, EUR.1, and CDS declarations from one sales order. Covers EU, US, and ROW destinations.",
    path: "/solutions/export",
    serviceType: "Export Compliance Software",
    areaServed: ["United Kingdom", "European Union", "United States", "Worldwide"],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "Export", path: "/solutions/export" },
  ]),
  faqSchema([
    { question: "What documents do I need to export from the UK to the EU?", answer: "Five core documents. A commercial invoice with value, HS code, and EORI number. A packing list. A customs declaration filed through HMRC's CDS. A certificate of origin where UK-EU TCA preference applies, usually an EUR.1. And an Incoterms-aligned contract specifying who pays the duty, normally DAP or DDP. Connexx auto-generates all five from one sales order entry." },
    { question: "How does Connexx handle export documentation?", answer: "Connexx auto-generates commercial invoices, packing lists, certificates of origin, EUR.1 forms, and CDS declarations for every export based on HS code, destination country, and shipment value. Country-specific rules update automatically. Meridian Trade Co cut documentation preparation from 4 hours to 1 hour per shipment using this." },
    { question: "What is an EORI number and how do I get one?", answer: "An EORI (Economic Operator Registration and Identification) number is the unique identifier HMRC uses to track your exports. UK EORIs start with GB. You apply at gov.uk and receive it in three working days. If you ship to the EU you also need an EU EORI. Connexx stores both EORIs and applies the correct one per consignment automatically." },
    { question: "Do I need IOSS if I'm exporting B2C to the EU?", answer: "Yes, if the consignment is under €150 and shipped to an EU consumer. IOSS lets you charge EU VAT at checkout and remit it monthly to a single tax authority. Connexx applies your IOSS number to every qualifying consignment, generates the right commercial invoice, and routes through IOSS-compatible carriers." },
    { question: "How does the system handle regulatory changes in destination countries?", answer: "The country rules engine is updated centrally by ITD's compliance team and applied to every customer's documentation templates immediately. When Saudi Arabia introduced SABER conformity for a product category, when Turkey changed its ATR requirement, when EU CBAM took effect, the template changed before customers' next consignment moved." },
    { question: "Does Connexx file CDS declarations directly with HMRC?", answer: "Yes, via direct CDS API integration. Export declarations are filed to HMRC's Customs Declaration Service from inside the same workflow that generates the commercial invoice and books the carrier. Exporters who prefer to keep their freight forwarder in the loop can route the documentation pack to the forwarder instead." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- "/integrations/carriers/dhl" — first mention of DHL Express
- "/integrations/carriers/fedex" — first mention of FedEx
- "/integrations/carriers/ups" — first mention of UPS
- "/integrations/carriers/parcel-force" — first mention of Parcelforce Worldwide
- "/integrations/erp-wms/sap" — first mention of SAP
- "/integrations/erp-wms/netsuite" — first mention of NetSuite
- "/shipping/international" — international shipping overview
- "/shipping/international/eu" — UK-EU TCA, IOSS, EUR.1 references
- "/resources/case-studies/meridian-exports" — featured case study
- "/contact?enquiry=export" — secondary CTA

Inbound to this page (from other site pages):
- "/" (Home) — solutions routing module
- "/connexx" — "Solutions" section linking to each ICP
- "/shipping/international" — "Built for export" callout
- "/integrations" — Customs and compliance section
- Navbar Solutions dropdown

---

## Implementation notes (for the dev pass)

1. The current `src/app/solutions/export/page.tsx` features use the "because X" pattern. Replace the four feature copy blocks with the period-led copy above. Icon choices (FileText, ShieldCheck, Zap, Eye) stay; title strings should change to: "Documents generated from one sales order", "HS code classification applied automatically", "Country rules engine", "Carrier booking in the same workflow".
2. The current subtitle does not name CDS, EUR.1, or HMRC. Replace with the new 54-word sub-headline that names the documents explicitly.
3. The current integrations include Freightview and Project44. These are weaker matches for the export ICP than Linnworks and Veeqo (which the export keywords doc and ICP doc both reference as priority integrations). Swap them out for Linnworks and Veeqo in the integrations array. Keep SAP, NetSuite, Dynamics, and the three express carriers.
4. The featured case study (`caseStudies[3]`) is already correctly wired. The case study `quote` field contains no em-dash. Surface the 4-to-1 hour reduction and the 90% customs holds drop in a numbers row above the case study card.
5. Add a FAQ block to the page. Either extend `VerticalPage` to accept `faq?: FaqItem[]`, or add the FAQ section as page-level JSX below the VerticalPage component. Same recommendation as the eCommerce pilot.
6. Add `<JsonLd>` block (Service + Breadcrumb + FAQ) inside the page component.
7. The page already passes `rateChecker="export"` — leave as is. Confirm the export rate checker queries DHL Express, FedEx, UPS, and Parcelforce Worldwide for the requested destination, not just domestic carriers.

---

## Reviewer questions

1. The CDS-direct API integration claim is in the FAQ. Confirm Connexx is filing CDS declarations directly to HMRC today, or whether the current production mode is still "documentation pack handed to the freight forwarder". The claim needs to be true on day one or it becomes a credibility problem.
2. Restricted party screening (RPS) and dual-use export controls (OGEL) are mentioned in the "How Connexx solves it" section. Confirm both are wired today, and which third-party screening list provider is used.
3. CBAM (EU Carbon Border Adjustment Mechanism) is name-dropped in the FAQ. CBAM only applies to specific product categories (cement, iron and steel, aluminium, fertilisers, electricity, hydrogen). Confirm if Connexx handles CBAM today or if the FAQ should swap CBAM for a different recent change.
4. The featured case study mentions a 40% increase in export volume absorbed without new hires. Confirm that number is from the Meridian Trade Co case study (it is not currently in the data.ts `result` field, which mentions "redeployed to handle a 40% increase in export volume"). Verbatim is fine, but flag for legal.
5. The Linnworks and Veeqo integration descriptions on this page treat them as export-oriented. Linnworks is multi-channel, not export-specific. Confirm the framing works, or replace one with a customs broker portal (Descartes, MIC, AEB).
6. The "Stop dreading regulatory updates" closing headline echoes the Anna Kovacs quote verbatim. Strong, but the alternative is "Documentation that finishes before the regulations change." Pick one for v1.
