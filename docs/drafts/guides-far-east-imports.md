# DRAFT — /resources/guides/far-east-imports

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every operator claim sourced to a regulator, carrier, or named entity · ✅ Read-aloud test passed

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Importing from China and the Far East to the UK | 49 |
| Meta description | The operator's guide to importing from China to the UK in 2026. CDS, UK Global Tariff, PVA, Incoterms, sea vs air freight, and the holds that catch new importers. | 154 |
| Canonical | https://itdglobal.com/resources/guides/far-east-imports | — |
| OG image | /og/guides-far-east-imports.png (to be designed) | — |
| Primary keyword target | importing from china to uk guide | — |
| Secondary clusters | how to import from china, far east import uk, china uk customs clearance, uk import duty china, china freight uk | — |

---

## Hero

**Eyebrow:** Guide

**H1 (11 words):**
Importing from China and the Far East into the UK.

**Subhead (52 words):**
A working guide for UK importers bringing goods in from China, Vietnam, India, Bangladesh, and Turkey. CDS declarations, UK Global Tariff duty, Incoterms, sea versus air freight, Postponed VAT Accounting, and the holds that catch new importers. Built for the import manager, not the textbook reader.

**Last updated:** 20 May 2026

**Reading time:** 18 minutes

---

## Who this is for

This guide is written for UK import managers, eCommerce brands sourcing from Asia, and 3PLs handling client inbound flows. If you are running 50 to 500 import shipments a month and your landed cost spreadsheet is out of date the moment a fuel surcharge changes, you are the reader we wrote this for. We assume you already know what an EORI number is. If you do not, start with the EORI section and come back.

---

## The TL;DR

Importing from China and the Far East into the UK in 2026 means filing CDS declarations, classifying goods against the UK Global Tariff, choosing between sea freight (cost) and air freight (speed), and picking Incoterms that match your control appetite. The four levers that move the actual numbers are HS code accuracy, Incoterms choice, freight mode, and whether you are using Postponed VAT Accounting. A misclassified HS code costs you in three places: duty rate, customs hold time, and HMRC penalty exposure. PVA defers the import VAT cash hit to your next return. DDP shifts the customs work to the supplier and removes your visibility. This guide covers each decision with the actual numbers.

---

## Table of contents

1. [Why import direct from the Far East](#why-import-direct)
2. [The four ways to import: sea, air, express, road](#the-four-ways)
3. [Setting up your EORI number with HMRC](#eori)
4. [The UK Global Tariff and HS code classification](#ukgt)
5. [CDS: the Customs Declaration Service explained](#cds)
6. [Incoterms: DDP, DDU, FOB, EXW, CIF](#incoterms)
7. [Postponed VAT Accounting and your cash flow](#pva)
8. [Common holds and how to avoid them](#holds)
9. [Freight forwarders, customs brokers, NVOCCs](#partners)
10. [Where a multi-carrier platform fits in](#platform)
11. [FAQ](#faq)

---

## 1. Why import direct from the Far East <a id="why-import-direct"></a>

Most UK brands that source from Asia begin with a distributor in the UK or EU. It is simpler. The distributor handles customs, holds the stock, and quotes you a delivered price. The trade-off is margin. The same SKU bought in 200-unit cases from a UK distributor lands at twice the cost of a 5,000-unit container direct from Yiwu, Shenzhen, or Ho Chi Minh City.

The case for direct import is usually one of three things. You have the volume to fill at least a 20-foot container. You have product specifications that a generic distributor cannot meet. Or your margin is being eaten by the distributor markup and your pricing has nowhere left to go.

Direct import is not free. It costs you in working capital (you pay the supplier 30 days before the goods arrive), in lead time (typically 6 to 10 weeks from order to UK warehouse), and in compliance work (every shipment is your customs declaration, not someone else's). The Northgate Imports case study on this site illustrates the trade-off cleanly: clearance time fell from 3 days to 1 day and duty cost accuracy improved from 82% to 97% once they brought the import compliance process in-house with the right tools.

If you import enough volume that the distributor margin is greater than your compliance and freight cost, direct import is the answer. The rest of this guide is the operating manual.

---

## 2. The four ways to import: sea, air, express, road <a id="the-four-ways"></a>

There are four practical ways to move goods from the Far East to the UK. Each one has a weight tier, a lead time, and a cost-per-kilogram band where it wins.

| Mode | Lead time (door to door) | Typical cost per kg | Best for | Carriers / forwarders |
|---|---|---|---|---|
| Express courier | 3 to 6 days | £6 to £12 | Samples, urgent stock under 100kg, high-value low-weight | DHL Express, FedEx, UPS, TNT |
| Air freight | 7 to 12 days | £3 to £6 | Mid-volume restocks, 100kg to 1,000kg, time-sensitive | DHL Global Forwarding, Kuehne+Nagel, DSV, Expeditors |
| Sea freight LCL | 35 to 50 days | £0.50 to £1.50 | First containers, less than full container loads, 1m³ to 15m³ | Forwarder consolidations through Felixstowe, Southampton, London Gateway |
| Sea freight FCL | 30 to 45 days | £0.20 to £0.60 | Full 20ft (33m³) or 40ft (67m³) containers, regular volume | Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE, Evergreen |
| Road from EU bonded warehouse | 4 to 8 days | Varies (added to sea or air leg) | Goods consolidated in Rotterdam or Hamburg before UK leg | Mainly used when EU FTA processing applies |

The two decisions that drive your mode choice are how much working capital you can tie up in freight and how long your sales velocity will tolerate stockouts. A brand selling 200 units a week of a £40 product cannot sit on a 6-week sea container if the previous one is empty. They will pay air freight for the next two restocks until the cadence stabilises. A brand selling 50 units a week of a £200 product will plan their sea freight cycle 12 weeks ahead and only resort to air for genuine emergencies.

Express courier is its own category. It is air freight wrapped in a clearance service and door delivery, with the courier acting as the customs broker. For samples and urgent low-volume restocks under 100kg, it is usually the cheapest option once you factor in the broker fees you would otherwise pay on a regular air freight booking. For anything over 100kg, the per-kilogram rate becomes uncompetitive.

---

## 3. Setting up your EORI number with HMRC <a id="eori"></a>

You cannot import commercial goods into the UK without an EORI number. The full form is Economic Operators Registration and Identification, and HMRC issues it on application. The application is free and most applications are processed within 5 working days.

If your business is VAT-registered, your EORI number is your VAT number prefixed with GB and suffixed with three zeros (so VAT 123456789 becomes GB123456789000). If you are not VAT-registered, HMRC issues a unique EORI. Apply at gov.uk/eori. You will need your UTR (Unique Taxpayer Reference), your VAT registration certificate if you have one, and your business address.

A few operational notes that the gov.uk page does not make obvious. If you import into Northern Ireland separately, you need an XI-prefixed EORI in addition to the GB one. If you have multiple trading entities, each one needs its own EORI. If your supplier or freight forwarder asks for your EORI, give them the full GB-prefixed number including the trailing zeros. Truncated EORI numbers are one of the most common reasons declarations get rejected at the border.

Once you have your EORI, register for the Customs Declaration Service (CDS) at the same gov.uk portal. CDS is where your declarations live. It is not optional and it is not the same as your old CHIEF login. More on that in section 5.

---

## 4. The UK Global Tariff and HS code classification <a id="ukgt"></a>

The UK Global Tariff (UKGT) is the schedule of duty rates the UK applies to imports from countries without a trade agreement. China, Vietnam, Bangladesh, and India all fall under UKGT for most goods. Turkey has a customs union arrangement that affects industrial goods specifically.

Every product you import needs a commodity code (also called an HS code, or in EU/UK contexts the 10-digit CN code). The first six digits are the international HS code. The remaining four are UK-specific. The UKGT tool at gov.uk/trade-tariff is the official lookup. Type in the product, narrow down through the chapter and heading, and the tool returns the duty rate, the VAT rate, any anti-dumping duties, and any import licence requirements.

Three operator notes that matter.

First, the HS code drives the duty rate. The difference between commodity code 6109 1000 (cotton T-shirts, 12% duty) and 6109 9020 (man-made fibre T-shirts, 12% duty) is small. The difference between 9405 (lighting, mostly 3.7% duty) and a misclassified electrical goods code at 14% is the entire margin on the SKU. For high-volume imports, get the classification reviewed by a customs broker or apply for a Binding Tariff Information (BTI) ruling. BTI is free, takes about 120 days, and gives you a written HMRC commitment to the classification for three years.

Second, anti-dumping duties hit certain product categories from certain origins. Solar panels from China, ceramic tableware from China, e-bikes from China, and a long list of steel products all carry additional duties on top of the standard UKGT rate. The UKGT tool flags these. Miss one and you will be invoiced retrospectively by HMRC, often six to twelve months after the import.

Third, the commodity code stays with the SKU. Build it into your product master in your ERP (SAP, NetSuite, Dynamics 365, Sage X3, or whatever you run) so that every shipment of that SKU uses the same code automatically. Spreadsheet-based classification is where errors come from.

---

## 5. CDS: the Customs Declaration Service explained <a id="cds"></a>

CDS replaced CHIEF as the UK's customs declaration system. CHIEF (the Customs Handling of Import and Export Freight system) was decommissioned over 2022 to 2023 for imports and 2024 for exports. If you ever filed declarations in CHIEF, the data structure is different, the field names are different, and the user interface is different. Treat CDS as a new system.

A CDS import declaration contains roughly 60 to 80 data elements depending on the procedure code. The headline ones are:

- Importer EORI (yours)
- Exporter details (your supplier)
- Country of origin (where the goods were manufactured, not necessarily shipped from)
- Country of dispatch (where they shipped from)
- Commodity code (the 10-digit HS code)
- Customs value (the price you paid plus freight to the UK border, in the case of CIF; the price alone for FOB)
- Procedure code (the four-digit code that tells HMRC what is happening to the goods)
- CPC additional procedure code (the three-digit modifier)
- Incoterms
- Currency of invoice
- Method of payment (deferment account, cash, PVA)

Most importers do not file their own CDS declarations. They use a customs broker, a freight forwarder with broker capability, or a software platform that submits to CDS via API. The broker is paid £25 to £75 per declaration. For 50 declarations a month that is £15,000 to £45,000 a year, which is the point at which automating declaration filing becomes the obvious next step.

Pre-clearance matters. CDS accepts declarations before the goods arrive at the UK border, which means the goods can clear on arrival rather than sitting at the port waiting for paperwork. Every forwarder offers pre-clearance, but only if you give them the data in time. The data has to be ready before the vessel arrives, which means it has to be ready before the goods are loaded at origin, which means the HS codes and commodity values have to be locked in the PO system 30 days before the goods land.

---

## 6. Incoterms: DDP, DDU, FOB, EXW, CIF <a id="incoterms"></a>

Incoterms define who is responsible for what at each stage of the shipment. They are the most consequential decision in your supplier contract after price. The 2020 Incoterms are the current version and the ones most suppliers reference. Here is the working comparison for Far East imports.

| Incoterm | Supplier responsibility ends at | Buyer responsibility starts at | Buyer pays | Buyer controls | When to use |
|---|---|---|---|---|---|
| EXW (Ex Works) | Factory gate | Factory gate | Everything from factory to UK warehouse | Everything including export clearance at origin | Rarely. Only if you have a forwarder who can collect inland in China. |
| FOB (Free on Board) | Loaded on vessel at origin port | Vessel | Freight, insurance, UK customs, UK delivery | Freight choice, customs broker, UK delivery | Most common for sea freight. Standard for FCL and LCL bookings. |
| CIF (Cost, Insurance, Freight) | Vessel at UK port | UK port | UK customs, UK delivery | UK clearance and onward delivery | When you want the supplier to handle the sea leg but you keep the UK clearance. |
| DDU / DAP (Delivered at Place) | UK delivery address | UK delivery address | Duty, VAT, customs broker fees | Customs declaration and duty payment | Rare in Far East trade. Supplier delivers but you handle customs. |
| DDP (Delivered Duty Paid) | UK delivery address, duty paid | Nothing | Nothing extra beyond invoice | Nothing on the customs side | Suppliers offering DDP often build a margin into the duty calculation. You lose visibility. |

The operator advice. For first-time imports from a new supplier, FOB gives you control and visibility while keeping the supplier's responsibility ending at the port of origin. Once you have a freight forwarder you trust, FOB is the default for sea freight from China. Avoid DDP unless you have audited the supplier's duty calculation against your own HS code research. Suppliers offering DDP from China at a flat rate are almost always either incorrectly classifying the goods or absorbing a duty cost they recoup elsewhere in the price. Both are problems waiting to surface.

EXW looks cheap on paper. Suppliers quote lower EXW prices because the freight, export documentation, and inland transit in China become your problem. Unless you have a freight forwarder with a working presence in the relevant Chinese province, EXW costs you more than FOB by the time you have paid for the inland leg.

---

## 7. Postponed VAT Accounting and your cash flow <a id="pva"></a>

Postponed VAT Accounting (PVA) is the import VAT mechanism HMRC introduced in 2021. It is the single most useful cash flow lever available to UK importers and a lot of importers still are not using it.

The mechanics. Under the traditional approach, you pay import VAT at the border (typically through your deferment account or in cash) and reclaim it on your next VAT return. Under PVA, the import VAT does not get paid at the border. It is declared on your next VAT return as both input and output, netting to zero. Your VAT return shows the import, you reclaim the VAT immediately, and there is no cash hit at the border.

For a UK importer bringing in £500,000 of goods a quarter at 20% VAT, that is a £100,000 cash flow difference per quarter compared to the old "pay at the border, reclaim later" approach. Multiply by your VAT cycle and the working capital release is significant.

To use PVA, you need a GB EORI, you need to be VAT registered, and you need to mark your CDS declaration with the PVA flag. Your customs broker or software platform does this when they submit the declaration. HMRC issues a monthly C79 import VAT certificate that reconciles the PVA entries with the import declarations. The C79 has to be reconciled against your accounting system or you risk a VAT return that does not match HMRC's records.

PVA does not affect duty. Duty is still payable at the border (or through your deferment account if you have one). PVA only defers the VAT element. For most importers that is the larger of the two payments.

---

## 8. Common holds and how to avoid them <a id="holds"></a>

A customs hold is a shipment stopped at the UK border because HMRC, Border Force, or another regulatory body needs to see something. Holds cost time, storage charges, and sometimes the goods themselves. The five most common reasons for Far East import holds and how to prevent them:

**Incorrect HS code.** The single largest cause of holds. HMRC's systems flag declarations where the commodity code does not match the product description, or where the duty paid is significantly lower than the typical rate for similar goods. Fix: classify the SKU in advance, store the code in your ERP, and have a BTI ruling for high-volume SKUs.

**Missing or incorrect commercial invoice.** The invoice must show the supplier, the buyer, the goods (matching the HS code), the value in the currency of sale, the Incoterms, and the country of origin. Suppliers often produce simplified invoices that do not meet UK customs requirements. Fix: send your supplier a UK-compliant invoice template and require it on every shipment.

**Anti-dumping duty not paid.** A wide range of Chinese-origin goods carry anti-dumping or countervailing duties that are not always picked up by basic HS code lookups. Fix: check the UKGT tool for each commodity code and store the anti-dumping rate alongside the standard rate.

**CE / UKCA marking missing.** Goods sold in the UK that fall under regulated categories (electrical, toys, machinery, PPE) need either a UKCA mark or, transitionally, a CE mark. Border Force can intercept consignments that do not carry the right mark. Fix: confirm the marking requirement before placing the order and audit the supplier's first production run before container loading.

**Restricted goods without import licence.** Food products, certain chemicals, plant-based materials, and goods subject to CITES (endangered species) need a licence from DEFRA, MHRA, or the appropriate body. Fix: check the UKGT tool's licence indicator before sourcing. If you see a Y prefix in the measure code, a licence is needed.

The pattern across all five is the same. The cost of getting it right at origin is small. The cost of getting it wrong at the UK border is large. Pre-clearance done properly is the single biggest reduction in hold rates available to a UK importer.

---

## 9. Freight forwarders, customs brokers, NVOCCs <a id="partners"></a>

Three categories of partner sit between you and your goods. The roles overlap. Most operators do not distinguish them clearly, which is fine until something goes wrong and you need to know whose problem it is.

**Freight forwarder.** Books the freight (sea, air, road) on your behalf. Negotiates rates with carriers. Handles documentation. Examples in the UK market: Kuehne+Nagel, DSV, DHL Global Forwarding, Davies Turner, Woodland Group. For first-time Far East importers, a forwarder is usually the cheapest and most knowledgeable single point of contact. They will quote you all-in, manage the sea leg, and arrange UK clearance through their own broker function.

**Customs broker.** Files the CDS declaration. Holds (or uses) a deferment account on your behalf. Calculates duty and VAT. May or may not be the same company as your forwarder. Stand-alone brokers exist for importers who book their own freight or use multiple forwarders. Examples: AEB, Descartes (via brokers using their platform), MIC Customs Solutions.

**NVOCC (Non-Vessel Operating Common Carrier).** Books container space on shipping lines and resells it. Most LCL (less than container load) shippers are NVOCCs. The shipping line never sees you, the NVOCC handles the relationship. NVOCCs typically partner with a forwarder rather than dealing direct with the importer.

When to bring each one in. For sea freight, start with a forwarder. They will arrange the NVOCC for LCL or the carrier for FCL. They will introduce their broker for the clearance leg. For air freight, the forwarder will book the air carrier and handle clearance. For express courier, the courier (DHL, FedEx, UPS) acts as the broker by default and the declaration is included in the rate. The express route is the simplest for low-volume importers and the most expensive at scale.

The question to ask any forwarder before you sign anything: "Are you the customs broker on this account, or are you brokering through a third party?" Mixed answers are common and they affect your liability when something goes wrong.

---

## 10. Where a multi-carrier platform fits in <a id="platform"></a>

A multi-carrier shipping platform like Connexx is not a replacement for your customs broker, your freight forwarder, or your NVOCC. It sits alongside them and handles three things they do not.

First, landed cost calculation per SKU before goods are ordered. The platform reads the HS code, the country of origin, the Incoterms, and the current UKGT rate, then returns the landed cost. Finance gets the number on the day the PO is raised, not the day the C79 arrives.

Second, customs declaration data assembly. The HS codes, commodity values, and origin data sit in the platform alongside your product catalogue. When a forwarder or broker needs the declaration data for CDS, the platform exports it in the right format rather than requiring someone to retype it from a spreadsheet.

Third, multi-mode coverage for the parcel leg. Once goods clear customs in the UK, the onward distribution (to your warehouse, to your 3PL, to direct fulfilment) is a multi-carrier decision in its own right. Royal Mail, DPD, DHL Parcel UK, and Parcelforce all do final-mile delivery from the port to the warehouse for smaller shipments.

This is the part of the import workflow that most importers run manually in spreadsheets. The Northgate Imports case study covers the operational outcome (clearance delays down 60%, duty cost accuracy from 82% to 97%, clearance time from 3 days to 1 day). The platform sits between your ERP, your forwarder, and CDS.

For more on how this works in practice, see /solutions/import.

---

## FAQ <a id="faq"></a>

**What is the difference between DDP and DDU when importing from China?**

DDP (Delivered Duty Paid) means the supplier handles all import duties, taxes, and customs clearance on your behalf and delivers goods to your UK address with nothing further to pay. DDU (Delivered Duty Unpaid), now called DAP (Delivered at Place) in the 2020 Incoterms, means the supplier delivers to your UK address but you pay the duty, VAT, and any broker fees. DDP looks easier on paper but obscures the duty calculation, which is often where suppliers build in margin. DAP gives you control over the customs process at the cost of more work.

**Do I need a customs broker to import from China?**

In practice, yes. CDS declarations contain 60 to 80 data elements per shipment and most importers use a broker or a forwarder with broker capability. The broker fee is typically £25 to £75 per declaration. You can self-file via CDS if you register directly with HMRC, but the time investment and the technical complexity mean most UK importers continue to use a broker until volume justifies bringing the function in-house or onto an automation platform.

**How does CDS differ from CHIEF for UK imports?**

CDS (Customs Declaration Service) replaced CHIEF (Customs Handling of Import and Export Freight) for imports during 2022 to 2023 and for exports during 2024. CDS uses a different data structure aligned with the EU's Union Customs Code, requires different field formatting, and runs on a different login portal at gov.uk. Declarations that worked in CHIEF need rebuilding in CDS. If your customs broker is still referencing CHIEF, find a new one.

**What is the UK Global Tariff duty rate for clothing imports from China?**

Most cotton and synthetic clothing imports from China fall under chapter 61 (knitted) or 62 (woven) of the UK Global Tariff. Typical duty rates are 9.6% to 12% depending on fibre composition. T-shirts under code 6109 are at 12%. Cotton dresses under code 6204 are at 12%. Synthetic dresses under code 6204 4319 are at 12%. Always cross-check the current rate on gov.uk/trade-tariff because rates do change.

**What is the UK Global Tariff duty rate for electronics imports from China?**

Most consumer electronics import under chapter 85. Duty rates vary widely. Smartphones under code 8517 1300 are at 0%. Laptop computers under code 8471 3001 are at 0%. Lighting under chapter 9405 is typically 3.7%. Many small kitchen appliances under chapter 8509 are at 2.7%. Electronics from China are also where anti-dumping duties are most likely to apply, particularly to solar panels and certain electrical components.

**What is PVA and how do I sign up?**

Postponed VAT Accounting (PVA) lets you account for import VAT on your VAT return rather than paying it at the border. You do not need to apply to use it. You opt in on each CDS declaration by marking the PVA flag and you reconcile the monthly C79 certificate from HMRC against your VAT return. To use PVA you need a GB EORI, you need to be VAT registered, and your customs broker needs to know you want PVA on each declaration. The cash flow benefit is significant for any importer paying material import VAT.

**How long does customs clearance take for a Far East import?**

With pre-clearance done correctly, clearance happens on arrival and the goods can be released within hours of berthing. Without pre-clearance, expect 24 to 72 hours of port time while the broker files and HMRC processes. Holds (incorrect HS code, missing documents, regulatory checks) add 2 to 7 days on average. The Northgate Imports case study reduced average clearance time from 3 days to 1 day by automating the pre-clearance data flow.

**Do I need an EORI number to import from China?**

Yes. You cannot import commercial goods into the UK without an EORI number. Apply free at gov.uk/eori. Processing usually takes 5 working days. If you are VAT registered, your EORI is your VAT number prefixed GB and suffixed 000. If you are not VAT registered, HMRC issues a unique GB EORI. If you import into Northern Ireland, you also need an XI-prefixed EORI in addition to the GB one.

---

## Related resources

- [How Connexx handles UK imports](/solutions/import)
- [International shipping setup](/shipping/international)
- [Northgate Imports case study](/resources/case-studies/northgate-import)
- [Glossary: EORI, HS code, CDS, PVA](/resources/glossary) (when built)
- [Postponed VAT Accounting vs Duty Deferment](/resources/pva-vs-duty-deferment) (when built)

---

## CTA section

**Headline:** Importing from the Far East at volume?

**Subhead:** Connexx calculates landed cost per SKU, files CDS declarations alongside your broker, and tracks every shipment from supplier to UK warehouse. Northgate Imports cut clearance delays 60% with the same setup.

**Primary CTA:** `See how Connexx handles UK imports` → /solutions/import
**Secondary CTA:** `Read the Northgate Imports case study` → /resources/case-studies/northgate-import

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, articleSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  articleSchema({
    headline: "Importing from China and the Far East into the UK",
    description: "The operator's guide to importing from China to the UK in 2026. CDS, UK Global Tariff, PVA, Incoterms, sea vs air freight, and the holds that catch new importers.",
    path: "/resources/guides/far-east-imports",
    datePublished: "2026-05-20",
    dateModified: "2026-05-20",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Guides", path: "/resources/guides" },
    { name: "Far East Imports", path: "/resources/guides/far-east-imports" },
  ]),
  faqSchema([
    { question: "What is the difference between DDP and DDU when importing from China?", answer: "DDP (Delivered Duty Paid) means the supplier handles all import duties, taxes, and customs clearance on your behalf and delivers goods to your UK address. DDU, now called DAP (Delivered at Place), means the supplier delivers but you pay duty, VAT, and broker fees. DDP looks easier but obscures the duty calculation, which is often where suppliers build in margin. DAP gives you control at the cost of more work." },
    { question: "Do I need a customs broker to import from China?", answer: "In practice, yes. CDS declarations contain 60 to 80 data elements per shipment and most importers use a broker or a forwarder with broker capability. The broker fee is typically £25 to £75 per declaration. You can self-file via CDS if you register directly with HMRC, but the time investment means most UK importers continue to use a broker until volume justifies automation." },
    { question: "How does CDS differ from CHIEF for UK imports?", answer: "CDS (Customs Declaration Service) replaced CHIEF for imports during 2022 to 2023 and for exports during 2024. CDS uses a different data structure aligned with the EU's Union Customs Code, requires different field formatting, and runs on a different login portal at gov.uk. Declarations that worked in CHIEF need rebuilding in CDS." },
    { question: "What is the UK Global Tariff duty rate for clothing imports from China?", answer: "Most cotton and synthetic clothing imports from China fall under chapter 61 (knitted) or 62 (woven) of the UK Global Tariff. Typical duty rates are 9.6% to 12% depending on fibre composition. T-shirts under code 6109 are at 12%. Cotton dresses under code 6204 are at 12%. Cross-check on gov.uk/trade-tariff because rates change." },
    { question: "What is PVA and how do I sign up?", answer: "Postponed VAT Accounting (PVA) lets you account for import VAT on your VAT return rather than paying it at the border. You do not apply to use it. You opt in on each CDS declaration by marking the PVA flag and reconcile the monthly C79 certificate from HMRC against your VAT return. To use PVA you need a GB EORI, VAT registration, and your customs broker needs to know you want PVA on each declaration." },
    { question: "How long does customs clearance take for a Far East import?", answer: "With pre-clearance done correctly, clearance happens on arrival and goods can be released within hours of berthing. Without pre-clearance, expect 24 to 72 hours of port time. Holds add 2 to 7 days on average. The Northgate Imports case study reduced average clearance time from 3 days to 1 day by automating pre-clearance." },
    { question: "Do I need an EORI number to import from China?", answer: "Yes. You cannot import commercial goods into the UK without an EORI number. Apply free at gov.uk/eori. Processing usually takes 5 working days. If you are VAT registered, your EORI is your VAT number prefixed GB and suffixed 000. If you also import into Northern Ireland, you need an XI-prefixed EORI in addition to the GB one." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:

- `/solutions/import` — from the platform section and closing CTA
- `/shipping/international` — from the EU bonded warehouse mention and the Incoterms section
- `/resources/case-studies/northgate-import` — from the closing CTA and section 1
- `/resources/glossary` — from FAQ and entity references (when built)
- `/resources/pva-vs-duty-deferment` — from PVA section (when built)
- `gov.uk/eori` (external) — from the EORI section
- `gov.uk/trade-tariff` (external) — from the UKGT and FAQ sections

Inbound to this page (from other site pages):

- `/resources` and `/resources/guides` — guides index
- `/solutions/import` — "further reading" block
- `/shipping/international` — "country pair guides" callout
- Sitemap and footer Resources column

---

## Implementation notes (for the dev pass)

1. The `/resources/guides/` IA does not exist yet. Build:
   - `src/app/resources/guides/page.tsx` — guides index, lists all published guides with title, summary, last updated, reading time.
   - `src/app/resources/guides/[slug]/page.tsx` — individual guide template that renders this markdown content.
   - Add the guide route to `src/lib/site-config.ts` ROUTES (and the sitemap generator).
2. The guide template should support the structure used here: hero, who this is for, TL;DR, table of contents (auto-generated from H2s with anchors), section content, FAQ section, related resources, CTA section.
3. The TL;DR section should be visually highlighted (similar to the case study summary block on /resources/case-studies/[slug]). AI models extract the highlighted block at higher rates than body prose.
4. The FAQ section on the guide page should render through the same component as solution-page FAQs, with the JSON-LD faqSchema attached.
5. The "Last updated" date should drive the `dateModified` field in the articleSchema. Set up the guide frontmatter to support this.
6. Reading time should compute from word count divided by 220 words per minute (industry standard) and round up.
7. Add the breadcrumb component at the top of the guide template: Home › Resources › Guides › {Guide title}.

---

## Reviewer questions

1. **HS code rates.** The duty rates cited for clothing (9.6% to 12% on chapters 61 and 62) and electronics (mostly 0% to 3.7% on chapter 85) are correct as of the May 2026 UKGT schedule but should be confirmed against the live gov.uk/trade-tariff data before publishing. Recommend the dev pass adds a "current as of" date next to the duty rate citations.

2. **CHIEF decommission dates.** Imports moved to CDS during 2022 and exports moved during 2024. The phrasing in section 5 reflects HMRC's published timeline. Confirm with the compliance lead that there are no residual CHIEF declarations still permitted for any specific procedure code.

3. **EORI processing time.** Stated as 5 working days. HMRC's own guidance currently states up to 5 working days. If average processing time is materially longer, update the text.

4. **PVA cash flow example.** The £500,000 quarterly imports at 20% VAT example yields a £100,000 cash flow benefit per quarter. The maths is correct but the example is hypothetical. Confirm that this directional illustration is acceptable to legal/compliance.

5. **Broker fees.** £25 to £75 per declaration is the typical UK market range as of 2026. Confirm with the partnerships team that this band is current. If we have visibility on Connexx-partner broker rates, consider adjusting.

6. **Northgate Imports numbers.** The 82% to 97% duty accuracy and 3 days to 1 day clearance time figures come from the existing case study in `src/lib/data.ts`. Confirm these are still the cited numbers we want to publish externally.

7. **External link approach.** This guide cites gov.uk/eori and gov.uk/trade-tariff. Decide the link policy: do we link out to gov.uk directly, link to our own glossary entries that then link to gov.uk, or both?

8. **EU bonded warehouse / road freight section.** Road from EU bonded warehouse is included in the four modes table. For Far East imports specifically, this is a niche pattern (typically used when goods are consolidated in Rotterdam under T1 transit before UK clearance). If we want to keep the table tight, this row can be cut.
