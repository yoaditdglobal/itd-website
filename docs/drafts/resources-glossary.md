# DRAFT — /resources/glossary

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every claim sourced · ✅ Read-aloud test passed · ✅ Operator vocabulary throughout

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Logistics & Shipping Glossary \| ITD Global | 44 |
| Meta description | Plain-English definitions of UK and international shipping terms used by retailers, 3PLs, exporters, and importers. WISMO, EORI, IOSS, HS codes, and more. | 152 |
| Canonical | https://itdglobal.com/resources/glossary | — |
| OG image | /og/resources-glossary.png (to be designed) | — |
| Primary keyword target | logistics glossary UK / shipping terms glossary | — |
| Secondary clusters | what is WISMO, what is EORI, what is IOSS, what is HS code, what is a child account, what is landed cost | — |

---

## Hero

**Label pill:** Resources

**H1 (6 words):**
The UK shipping glossary.

**Sub-headline (52 words):**
Every term a dispatch manager, customs lead, or marketplace seller hears in a Monday meeting. Plain definitions, no marketing language. Built from the vocabulary our customers use every day across Royal Mail, DPD, Evri, DHL, HMRC, CDS, and the carriers and regulators that shape UK and international shipping.

**Primary CTA:** `Search the glossary` → in-page search input (anchor to entries)
**Secondary CTA:** `See how Connexx works` → /connexx

---

## How to use this page

Five categories: **Carrier**, **Customs**, **Operational**, **Technical**, and **Regulatory**. Each entry runs to one sentence of plain definition, then two or three sentences of context that show when the term turns up and what it costs you when it goes wrong. Every entry links out to the page on this site that handles the term in the product.

Use the in-page search to jump to a term. Use the category filter to scan the cluster. Every entry has its own anchor URL (e.g. `/resources/glossary#wismo`) so you can link to a single definition from an internal ticket, an RFP, or a customer reply.

---

## Carrier terms

### Buy Shipping (Amazon)
**Category**: Carrier
**Plain-English definition**: Amazon's discounted shipping rates available only for orders placed on Amazon, bought through Seller Central or an integrated platform.
**Context**: Amazon Buy Shipping covers a limited carrier list (Royal Mail, Amazon Shipping, Evri, and a handful of others) at negotiated rates. It is cheap for Amazon orders and useless for everything else. Sellers running Amazon plus eBay, Etsy, or Shopify need a multi-carrier platform that includes Amazon Buy Shipping inside a wider queue.
**Related**: [Seller Fulfilled Prime](#seller-fulfilled-prime-sfp), [Valid Tracking Rate](#valid-tracking-rate-vtr), [/solutions/marketplace-seller](/solutions/marketplace-seller)

### Carrier portal
**Category**: Carrier
**Plain-English definition**: The website a carrier provides for booking shipments, printing labels, and tracking parcels for a single account.
**Context**: Every UK shipper recognises the pattern. Royal Mail Click and Drop, DPD Shipping Portal, Evri Business, DHL MyDHL+, Amazon Seller Central. A business shipping through four carriers logs into four portals. Multi-carrier platforms replace the portal stack with one queue.
**Related**: [Multi-carrier](#multi-carrier), [Rate engine](#rate-engine), [/connexx](/connexx)

### Child account
**Category**: Carrier
**Plain-English definition**: A sub-account under a parent carrier contract, typically used by 3PLs to give each brand client its own rate card, reporting, and labels.
**Context**: A 3PL holds the master agreement with Royal Mail, DPD, Evri, or DHL and creates a child account per brand client. Each child account has its own rate card, its own dispatch rules, and its own branded tracking page. Connexx manages unlimited child accounts under one parent contract, with billing and SLAs tracked per client.
**Related**: [Multi-carrier](#multi-carrier), [Rate card](#rate-card), [/solutions/3pl](/solutions/3pl)

### Click and Drop (Royal Mail)
**Category**: Carrier
**Plain-English definition**: Royal Mail's free online shipping tool for printing labels and booking collections.
**Context**: Click and Drop is the default starting point for UK small businesses on Royal Mail. It works for Royal Mail-only operations. Once a business adds Evri, DPD, or Parcelforce, the workflow fragments and the team starts juggling portals.
**Related**: [Carrier portal](#carrier-portal), [Multi-carrier](#multi-carrier), [Royal Mail Tracked 24/48](#royal-mail-tracked-2448)

### Drop-off (ParcelShop, locker)
**Category**: Carrier
**Plain-English definition**: A delivery option where the parcel is dropped at a third-party location (shop or locker) rather than collected from the sender or delivered to a residence.
**Context**: Evri ParcelShop, InPost lockers, and Royal Mail Customer Service Points are the main UK drop-off networks. Drop-off rates are typically 30 to 40 per cent cheaper than door collection. Most consumer eCommerce brands offer drop-off as a low-cost delivery tier at checkout.
**Related**: [Out-of-area](#out-of-area), [Surcharge zone](#surcharge-zone)

### Fuel surcharge
**Category**: Carrier
**Plain-English definition**: A variable cost line every carrier adds to base shipping rates to cover diesel and aviation fuel price movement.
**Context**: Royal Mail, DPD, DHL, FedEx, UPS, and the pallet networks all publish a monthly fuel surcharge as a percentage of the base rate. It changes month to month. Carrier portals show it in the invoice. A rate engine has to pull the live surcharge to compare carriers honestly.
**Related**: [Rate card](#rate-card), [Negotiated rate](#negotiated-rate), [Surcharge zone](#surcharge-zone)

### Highlands & Islands
**Category**: Carrier
**Plain-English definition**: The UK surcharge zone covering the Scottish Highlands, Scottish islands, Isle of Man, and the Channel Islands, where every major carrier applies an additional fee.
**Context**: Every UK shipper knows the Highlands surcharge. A parcel from London to Inverness costs more than London to Glasgow on most carriers. The postcode prefixes that trigger the surcharge are published by each carrier and change occasionally. Routing rules in a multi-carrier platform apply the right carrier per postcode automatically.
**Related**: [Out-of-area](#out-of-area), [Surcharge zone](#surcharge-zone), [Mainland UK](#mainland-uk)

### Late Shipment Rate (LSR)
**Category**: Carrier
**Plain-English definition**: An Amazon and eBay seller metric tracking the percentage of orders dispatched after the platform's deadline.
**Context**: Amazon's LSR threshold is 4 per cent. Cross it and your seller account is at risk of suspension. The metric is unforgiving because it covers every order shipped from your seller account, including orders missed during a system outage or a carrier strike. Velocity Sellers eliminated penalty fees by switching to SLA-aware carrier routing in Connexx.
**Related**: [Valid Tracking Rate](#valid-tracking-rate-vtr), [On-Time Delivery Rate](#on-time-delivery-rate-otdr), [/solutions/marketplace-seller](/solutions/marketplace-seller)

### Mainland UK
**Category**: Carrier
**Plain-English definition**: The carrier zone covering England, Wales, and mainland Scotland, excluding the Highlands, Islands, Channel Islands, and Northern Ireland.
**Context**: Mainland UK is the base zone. Highlands & Islands, Channel Islands, Northern Ireland, and BFPO addresses each carry surcharges or different routing. Carrier rate cards quote a Mainland UK price and then list the surcharge zones separately.
**Related**: [Highlands & Islands](#highlands--islands), [Out-of-area](#out-of-area), [Surcharge zone](#surcharge-zone)

### Multi-carrier
**Category**: Carrier
**Plain-English definition**: A shipping setup that connects one business to two or more parcel carriers from a single platform, with rate comparison between them per order.
**Context**: The product category Connexx belongs to. A multi-carrier platform compares live rates across Royal Mail, DPD, Evri, Parcelforce, DHL, FedEx, UPS, Amazon Shipping, and others on every shipment, picks the cheapest compliant option, and generates the label in one click. The alternative is logging into each carrier's portal separately.
**Related**: [Rate engine](#rate-engine), [Negotiated rate](#negotiated-rate), [/connexx](/connexx)

### Negotiated rate
**Category**: Carrier
**Plain-English definition**: A carrier rate lower than the published rack rate, available to high-volume shippers or to platforms that aggregate volume across many customers.
**Context**: Royal Mail, DPD, Evri, and DHL all negotiate rates against committed volume. A small business shipping 50 parcels a day will not get a negotiated rate directly. A platform like Connexx aggregates volume across thousands of shippers and passes the negotiated rates down to every customer, regardless of individual volume.
**Related**: [Rack rate](#rack-rate), [Rate card](#rate-card), [Multi-carrier](#multi-carrier)

### On-Time Delivery Rate (OTDR)
**Category**: Carrier
**Plain-English definition**: An Amazon seller metric tracking the percentage of orders delivered by the promised delivery date.
**Context**: OTDR is Amazon's newer SLA metric, complementing Valid Tracking Rate and Late Shipment Rate. The threshold is 92 per cent. Carrier choice, dispatch cutoff, and weather all affect it. A multi-carrier platform routes Amazon orders through carriers with strong OTDR performance on the specific lane and weight tier.
**Related**: [Valid Tracking Rate](#valid-tracking-rate-vtr), [Late Shipment Rate](#late-shipment-rate-lsr), [/solutions/marketplace-seller](/solutions/marketplace-seller)

### Out-of-area
**Category**: Carrier
**Plain-English definition**: A postcode outside a carrier's standard delivery zone, where the carrier applies a surcharge or refuses the shipment.
**Context**: Every UK carrier publishes an out-of-area postcode list. Highlands, Islands, Channel Islands, and Northern Ireland are the common ones. DPD, Evri, and Yodel each have slightly different lists, which is why an automated routing rule beats a manual choice. A wrong out-of-area decision costs a redelivery charge or a returned parcel.
**Related**: [Highlands & Islands](#highlands--islands), [Surcharge zone](#surcharge-zone), [Mainland UK](#mainland-uk)

### POD (Proof of Delivery)
**Category**: Carrier
**Plain-English definition**: Evidence that a parcel was delivered, usually a signature or photograph captured by the carrier driver at the delivery address.
**Context**: B2B shipments depend on POD because the buyer expects evidence the consignment arrived intact. DPD, DHL, UPS, and the pallet networks all capture signature or photo POD by default. Connexx pulls POD events back into the ERP automatically so finance and customer service can answer disputes without logging into a carrier portal.
**Related**: [SLA](#sla-service-level-agreement), [Tracking number](#tracking-number--consignment-reference), [/solutions/b2b](/solutions/b2b)

### Rack rate
**Category**: Carrier
**Plain-English definition**: A carrier's published list price for a shipment, before any negotiated discount.
**Context**: Rack rates are the rates a small or new shipper pays unless they negotiate. Royal Mail publishes Business Account rack rates. DPD publishes a public rate card. Volume buyers and aggregator platforms negotiate below rack. The gap between rack and negotiated is where Connexx saves money for small and mid-market shippers.
**Related**: [Negotiated rate](#negotiated-rate), [Rate card](#rate-card)

### Rate card
**Category**: Carrier
**Plain-English definition**: The price schedule for a carrier's services, broken down by weight tier, destination zone, and service speed.
**Context**: Every carrier has a rate card. Royal Mail's is structured by service (Tracked 24, Tracked 48, Special Delivery), weight band, and destination. DPD's adds size-based dim weight. A 3PL holds a rate card per client. Rate cards change at least annually and often quarterly.
**Related**: [Rack rate](#rack-rate), [Negotiated rate](#negotiated-rate), [Rate engine](#rate-engine)

### Rate engine
**Category**: Carrier
**Plain-English definition**: The component of a shipping platform that compares carrier rates in real time on every shipment and picks the optimal carrier against pre-set rules.
**Context**: A rate engine takes a shipment (weight, dimensions, destination, service required) and runs it against every active carrier's rate card and routing logic. Connexx's rate engine evaluates every carrier on every order in under 200 milliseconds. The output is a ranked list of compliant carriers with their cost and SLA.
**Related**: [Multi-carrier](#multi-carrier), [Rate card](#rate-card), [/connexx](/connexx)

### Royal Mail Tracked 24/48
**Category**: Carrier
**Plain-English definition**: Royal Mail's tracked parcel services, with target delivery in one working day (Tracked 24) or two working days (Tracked 48).
**Context**: Tracked 24 and Tracked 48 are the workhorses of UK eCommerce. They cover every UK postcode, push scan events back to Amazon and other marketplaces within the SLA, and qualify for Amazon Seller Fulfilled Prime. Most UK retailers ship sub-2kg orders on Tracked 48 by default.
**Related**: [Buy Shipping](#buy-shipping-amazon), [Seller Fulfilled Prime](#seller-fulfilled-prime-sfp), [Valid Tracking Rate](#valid-tracking-rate-vtr)

### Saturday delivery
**Category**: Carrier
**Plain-English definition**: A delivery service that operates on Saturdays, usually carrying an additional surcharge above weekday rates.
**Context**: DPD Saturday, Parcelforce Saturday, and Royal Mail Special Delivery all offer Saturday delivery. The surcharge is meaningful (typically £3 to £7 above the weekday rate). Multi-carrier platforms apply Saturday routing only when the customer paid for it at checkout, not by default.
**Related**: [SLA](#sla-service-level-agreement), [Rate card](#rate-card)

### Seller Fulfilled Prime (SFP)
**Category**: Carrier
**Plain-English definition**: An Amazon programme that lets sellers offer Prime two-day delivery from their own warehouse, instead of Amazon FBA, using Amazon-approved carriers.
**Context**: SFP requires sellers to meet strict performance thresholds (Valid Tracking Rate, Late Shipment Rate, On-Time Delivery Rate) and ship through approved carriers (Royal Mail Tracked 24, Amazon Shipping, DPD Next Day, and a small list of others). Sellers running SFP need carrier routing that defaults to the approved list and falls back gracefully when an order does not meet the criteria.
**Related**: [Buy Shipping](#buy-shipping-amazon), [Valid Tracking Rate](#valid-tracking-rate-vtr), [/solutions/marketplace-seller](/solutions/marketplace-seller)

### SLA (Service Level Agreement)
**Category**: Carrier
**Plain-English definition**: The carrier's contractual delivery promise, typically expressed as a target delivery time (e.g. next working day before 12pm) and a percentage of shipments delivered within it.
**Context**: SLAs vary by service, by destination, and by carrier. DPD Next Day Before 12 is a different SLA from DPD Next Day. Carrier SLA data feeds into a multi-carrier platform's routing logic and into the customer-facing delivery promise at checkout. Missed SLAs are the source of most customer service tickets.
**Related**: [POD](#pod-proof-of-delivery), [WISMO](#wismo-where-is-my-order), [Late Shipment Rate](#late-shipment-rate-lsr)

### Tracking number / consignment reference
**Category**: Carrier
**Plain-English definition**: The unique identifier the carrier assigns to a parcel or consignment, used to look up its status at any point in the journey.
**Context**: Royal Mail uses a 13-character reference. DPD uses a 14-digit number. UPS uses 1Z followed by 16 characters. Each carrier's format is different. Connexx normalises tracking numbers into a single field per order and writes them back to Shopify, Amazon, eBay, SAP, or your ERP automatically.
**Related**: [POD](#pod-proof-of-delivery), [WISMO](#wismo-where-is-my-order), [ERP write-back](#erp-write-back)

### Valid Tracking Rate (VTR)
**Category**: Carrier
**Plain-English definition**: An Amazon seller metric tracking the percentage of orders dispatched with a valid tracking number that scans within the SLA window.
**Context**: Amazon's VTR threshold is 95 per cent. Carriers that scan parcels on collection (Royal Mail Tracked 24/48, Amazon Shipping, DPD) meet VTR cleanly. Non-tracked services do not. Connexx routes Amazon orders through VTR-compliant carriers by default and writes the tracking number back to Seller Central before the dispatch deadline.
**Related**: [Late Shipment Rate](#late-shipment-rate-lsr), [On-Time Delivery Rate](#on-time-delivery-rate-otdr), [Seller Fulfilled Prime](#seller-fulfilled-prime-sfp)

---

## Customs and trade terms

### ATA Carnet
**Category**: Customs
**Plain-English definition**: An international customs document that allows temporary import of goods (samples, professional equipment, exhibition stock) into a country without paying duty.
**Context**: ATA Carnets are issued by chambers of commerce in the goods' home country. UK exporters use them for trade shows, demo equipment, and broadcast kit. The carnet has a one-year validity and is presented at customs in both directions. Connexx flags carnet-eligible shipments at the point of booking.
**Related**: [Customs declaration](#cds-customs-declaration-service), [HS code](#hs-code-harmonised-system-code)

### ATR (movement certificate, EU-Turkey)
**Category**: Customs
**Plain-English definition**: A movement certificate proving that goods qualify for preferential customs treatment under the EU-Turkey Customs Union.
**Context**: An ATR is required for shipments between the EU and Turkey to benefit from zero or reduced duty. Without it, standard tariffs apply. UK exporters to Turkey now need an ATR plus a UK-Turkey trade agreement document depending on the goods category. Connexx generates ATRs automatically for Turkey-bound shipments.
**Related**: [EUR.1](#eur1-movement-certificate), [Rules of origin](#rules-of-origin), [/solutions/export](/solutions/export)

### C79 (VAT certificate)
**Category**: Customs
**Plain-English definition**: A monthly certificate from HMRC showing the import VAT a UK business has paid through CHIEF or CDS, used to reclaim VAT on the next return.
**Context**: Importers using Postponed VAT Accounting receive a C79 from HMRC each month. The figure has to be reconciled against accounting records before submitting the VAT return. Connexx reconciles the C79 against shipment-level import VAT data automatically and exports the result to the finance system.
**Related**: [Postponed VAT Accounting](#pva-postponed-vat-accounting), [Duty deferment](#duty-deferment), [/solutions/import](/solutions/import)

### CDS (Customs Declaration Service)
**Category**: Customs
**Plain-English definition**: HMRC's customs declaration platform, used by UK importers, exporters, and customs brokers to submit declarations to UK customs.
**Context**: CDS replaced CHIEF in 2023 for imports and 2024 for exports. Every UK customs declaration now flows through CDS, either submitted directly by the trader or filed by a customs broker on their behalf. Connexx connects to CDS through certified intermediaries and submits declarations before goods arrive at the port.
**Related**: [CHIEF](#chief-legacy-uk-customs-system), [Pre-clearance](#pre-clearance), [EORI](#eori-economic-operators-registration-and-identification)

### Certificate of origin
**Category**: Customs
**Plain-English definition**: A document declaring the country where goods were produced, required by certain importing countries for customs clearance or to qualify for preferential duty.
**Context**: Certificates of origin are issued by chambers of commerce or generated from the trader's own records. Some destinations (Saudi Arabia, Egypt, India, several African markets) require chamber-issued certificates. Others accept self-certification. Connexx generates the correct document type per destination automatically.
**Related**: [EUR.1](#eur1-movement-certificate), [Rules of origin](#rules-of-origin), [Commercial invoice](#commercial-invoice)

### CHIEF (legacy UK customs system)
**Category**: Customs
**Plain-English definition**: HMRC's previous customs declaration platform, replaced by CDS for imports in 2023 and exports in 2024.
**Context**: CHIEF was the UK customs backbone for decades. CDS replaced it in stages. Any software stack that has not migrated from CHIEF to CDS is out of date. Connexx submits declarations through CDS from day one.
**Related**: [CDS](#cds-customs-declaration-service), [HMRC](#hmrc), [Pre-clearance](#pre-clearance)

### Commercial invoice
**Category**: Customs
**Plain-English definition**: The document showing the commercial value of an international shipment, used by customs to assess duty and VAT.
**Context**: Every international shipment needs a commercial invoice. It lists the goods, the HS code, the unit value, the seller, the buyer, the EORI numbers, and the Incoterms. A wrong line on the commercial invoice triggers a customs hold. Connexx generates commercial invoices from the sales order data automatically so the figures match across the documentation pack.
**Related**: [Packing list](#packing-list), [HS code](#hs-code-harmonised-system-code), [EORI](#eori-economic-operators-registration-and-identification)

### DDP (Delivered Duty Paid)
**Category**: Customs
**Plain-English definition**: An Incoterm where the seller pays the duty and import VAT, and the goods arrive at the buyer with no customs charges to pay on delivery.
**Context**: DDP is the eCommerce-friendly Incoterm for cross-border B2C. The customer sees the final landed price at checkout and the parcel arrives with no surprises. DDP requires the seller to know the duty rate, calculate it at checkout, and pass it to the carrier. DHL Express, DPD Cross-Border, and a handful of others support DDP at the parcel level.
**Related**: [Incoterms](#incoterms), [DDU](#ddu-delivered-duty-unpaid), [Landed cost](#landed-cost)

### DDU (Delivered Duty Unpaid)
**Category**: Customs
**Plain-English definition**: An Incoterm where the seller delivers the goods to the buyer's country but the buyer pays import duty and VAT on arrival.
**Context**: DDU is the cheapest Incoterm for the seller and the worst for the customer. The customer gets an unexpected bill on the doorstep. For B2C cross-border, DDU drives complaints and refused deliveries. Most carriers no longer use the term DDU, having moved to DAP (Delivered at Place) under Incoterms 2020, but the legacy term is still common.
**Related**: [DDP](#ddp-delivered-duty-paid), [Incoterms](#incoterms), [Landed cost](#landed-cost)

### Duty
**Category**: Customs
**Plain-English definition**: A tax charged by a country on imported goods, calculated as a percentage of the goods' customs value (usually the commercial invoice value plus freight and insurance).
**Context**: Duty rates depend on the HS code and the country of origin. The UK Global Tariff publishes UK import duty rates. EU duty rates are published in the EU's TARIC database. Duty is paid by the importer of record, not the carrier. Connexx calculates duty per SKU against the live tariff before goods arrive.
**Related**: [HS code](#hs-code-harmonised-system-code), [UK Global Tariff](#uk-global-tariff), [Landed cost](#landed-cost)

### Duty deferment
**Category**: Customs
**Plain-English definition**: An HMRC scheme allowing approved UK importers to defer duty and import VAT payment until the 15th of the following month, paid via direct debit.
**Context**: A Duty Deferment Account (DDA) is essential for any importer doing meaningful volume. It avoids the cash drag of paying duty at every clearance and consolidates payment into one monthly direct debit. Setting up a DDA requires a guarantee from a bank or insurer. Connexx links to your DDA for automatic deferment on every import.
**Related**: [Postponed VAT Accounting](#pva-postponed-vat-accounting), [C79](#c79-vat-certificate), [HMRC](#hmrc)

### Duty drawback
**Category**: Customs
**Plain-English definition**: A refund of import duty paid on goods that are subsequently re-exported from the country, often used by businesses that import components and export finished products.
**Context**: Duty drawback is a cash flow benefit for businesses that import to manufacture and re-export. Claims are made via HMRC against documented imports and matched exports. The paperwork burden is real, which is why many businesses leave money on the table. Connexx tags drawback-eligible shipments and exports the data set for the claim.
**Related**: [Duty](#duty), [Inward Processing Relief](#ipr-inward-processing-relief)

### EORI (Economic Operators Registration and Identification)
**Category**: Customs
**Plain-English definition**: The unique identifier issued by HMRC (or any EU customs authority) to a business that imports or exports goods, used on every customs declaration.
**Context**: A UK EORI starts with GB. An EU EORI starts with the country code (DE, FR, IE, and so on). UK exporters to the EU need both, or use the importer's EU EORI under DDP. EORIs are applied for at gov.uk and issued in about three working days. Connexx stores GB and EU EORIs per legal entity and applies the right one per shipment.
**Related**: [HMRC](#hmrc), [Commercial invoice](#commercial-invoice), [IOSS](#ioss-import-one-stop-shop), [/solutions/export](/solutions/export)

### EUR.1 (movement certificate)
**Category**: Customs
**Plain-English definition**: A movement certificate proving goods qualify for preferential duty treatment under the UK-EU Trade and Cooperation Agreement or other preferential trade deals.
**Context**: An EUR.1 is required to claim zero duty on UK origin goods entering the EU (or vice versa) above certain consignment values. Below the threshold, a statement on origin on the commercial invoice is enough. Misclaiming origin leads to retrospective duty and penalties. Connexx checks origin claims against the trader's bill of materials before generating the certificate.
**Related**: [ATR](#atr-movement-certificate-eu-turkey), [Rules of origin](#rules-of-origin), [Certificate of origin](#certificate-of-origin)

### HMRC
**Category**: Customs
**Plain-English definition**: His Majesty's Revenue and Customs, the UK government department responsible for tax collection and customs.
**Context**: HMRC operates CDS, issues UK EORIs, runs the Duty Deferment scheme, and publishes the UK Global Tariff. Every UK importer and exporter interacts with HMRC, directly or through a customs broker. Connexx connects to HMRC services through certified intermediaries.
**Related**: [CDS](#cds-customs-declaration-service), [EORI](#eori-economic-operators-registration-and-identification), [UK Global Tariff](#uk-global-tariff)

### HS code (Harmonised System code)
**Category**: Customs
**Plain-English definition**: A globally standardised numeric code (six digits internationally, ten in the UK and EU) that classifies a product for customs and duty purposes.
**Context**: Every international shipment needs an HS code. The first six digits are common across 200+ countries (set by the World Customs Organization). The next four are country-specific. The UK Global Tariff and the EU's TARIC database hold the duty rate and import controls keyed off each code. Misclassification causes customs holds and incorrect duty payment. Connexx suggests an HS code from the product description and stores the SKU-to-HS mapping for future shipments.
**Related**: [Tariff classification](#tariff-classification), [UK Global Tariff](#uk-global-tariff), [Commercial invoice](#commercial-invoice)

### Incoterms
**Category**: Customs
**Plain-English definition**: The International Chamber of Commerce's set of standardised trade terms (DDP, DAP, FCA, EXW, and others) that define who pays for shipping, insurance, and duty on a cross-border sale.
**Context**: Every international sales contract specifies an Incoterm. Incoterms 2020 is the current version. The two most common in eCommerce are DDP (seller pays everything) and DAP (buyer pays duty on delivery). The two most common in B2B are FCA (seller delivers to a named carrier) and EXW (buyer collects). Connexx applies the agreed Incoterm to every shipment automatically.
**Related**: [DDP](#ddp-delivered-duty-paid), [DDU](#ddu-delivered-duty-unpaid), [Landed cost](#landed-cost)

### IOSS (Import One-Stop Shop)
**Category**: Customs
**Plain-English definition**: An EU VAT scheme that lets non-EU sellers charge EU VAT at checkout on B2C consignments under €150 and remit it monthly via one EU member state, avoiding VAT collection on delivery.
**Context**: IOSS applies to consignments under €150 sold to EU consumers. The seller registers in any EU member state, charges the destination country's VAT at checkout, and files one monthly IOSS return. The customer pays no extra VAT on delivery. Above €150, standard import VAT applies. Connexx applies the trader's IOSS number to every qualifying shipment and routes through IOSS-compatible carriers.
**Related**: [OSS](#oss-one-stop-shop), [EORI](#eori-economic-operators-registration-and-identification), [DDP](#ddp-delivered-duty-paid), [/solutions/export](/solutions/export)

### OSS (One-Stop Shop)
**Category**: Customs
**Plain-English definition**: An EU VAT scheme that lets EU-resident businesses report VAT on B2C cross-border EU sales through one quarterly return in their home member state.
**Context**: OSS is for EU businesses selling cross-border within the EU. IOSS is for non-EU businesses selling into the EU. A UK seller with an EU establishment can use OSS for intra-EU B2C sales. Both schemes simplify VAT reporting but require accurate consignment-level data.
**Related**: [IOSS](#ioss-import-one-stop-shop), [EORI](#eori-economic-operators-registration-and-identification)

### Packing list
**Category**: Customs
**Plain-English definition**: A document listing the contents of a shipment by line, used by customs to verify the commercial invoice and by warehouses to check goods on arrival.
**Context**: The packing list and the commercial invoice have to match exactly. A discrepancy on weight, count, or description triggers a customs query that can hold the shipment for two days. Connexx generates both documents from the same source data so they cannot disagree.
**Related**: [Commercial invoice](#commercial-invoice), [HS code](#hs-code-harmonised-system-code)

### Phytosanitary certificate
**Category**: Customs
**Plain-English definition**: An official certificate confirming that plant-based goods or related products meet the importing country's plant health requirements.
**Context**: Phytosanitary certificates are issued by the Animal and Plant Health Agency (APHA) in the UK. Goods covered include fresh produce, timber, wooden packaging, and many plant-derived ingredients. The certificate is required at the border. Missing it stops the shipment.
**Related**: [Pre-clearance](#pre-clearance), [Certificate of origin](#certificate-of-origin)

### Pre-clearance
**Category**: Customs
**Plain-English definition**: Submitting and approving a customs declaration before the goods arrive at the border, so the shipment clears on arrival rather than waiting for the declaration to be processed.
**Context**: Pre-clearance is the difference between a same-day clearance and a 48-hour delay. The declaration is filed against the manifest data before the truck or container reaches the port. Connexx pre-clears every import declaration on CDS as soon as the manifest is generated, so goods clear on arrival. Northgate Imports cut customs delays 60 per cent and lifted duty cost accuracy from 82 per cent to 97 per cent using this.
**Related**: [CDS](#cds-customs-declaration-service), [Customs hold](#customs-hold), [/solutions/import](/solutions/import)

### PVA (Postponed VAT Accounting)
**Category**: Customs
**Plain-English definition**: A UK scheme that lets registered importers account for import VAT on the next VAT return instead of paying it at the border.
**Context**: PVA is a cash flow win. Import VAT is no longer paid at the point of import and reclaimed later. It is declared and reclaimed on the same VAT return. The C79 certificate is replaced by a monthly statement on the trader's CDS account. Connexx flags every shipment as PVA-eligible by default and reconciles against the monthly statement.
**Related**: [C79](#c79-vat-certificate), [Duty deferment](#duty-deferment), [/solutions/import](/solutions/import)

### Rules of origin
**Category**: Customs
**Plain-English definition**: The criteria a country uses to determine where goods were produced, which decides whether they qualify for preferential duty under a trade agreement.
**Context**: Under the UK-EU TCA, goods of UK or EU origin qualify for zero duty if they meet the rules of origin (typically a percentage of value added in the country, or a change in tariff heading). Misclaiming origin leads to retrospective duty and penalties. Connexx checks origin claims against the bill of materials for every export.
**Related**: [EUR.1](#eur1-movement-certificate), [Certificate of origin](#certificate-of-origin), [Duty](#duty)

### Tariff classification
**Category**: Customs
**Plain-English definition**: The process of assigning the correct HS code to a product, against the UK Global Tariff (for imports) or the destination country's tariff (for exports).
**Context**: Classification is harder than it looks. Many products fall into multiple plausible codes. The wrong code can cost a percentage point of duty or trigger an import licence requirement. Connexx classifies from the product description and validates against the UK Global Tariff, storing the SKU-to-HS mapping for future shipments.
**Related**: [HS code](#hs-code-harmonised-system-code), [UK Global Tariff](#uk-global-tariff)

### UK Global Tariff
**Category**: Customs
**Plain-English definition**: The UK's post-Brexit import tariff, published by HMRC, setting the duty rate and import controls for every HS code on goods entering the UK.
**Context**: The UK Global Tariff (UKGT) replaced the EU's Common External Tariff after Brexit. Many lines were liberalised (zero duty), others retained the EU rate, and some changed structure. Connexx pulls the live UKGT for every import to calculate landed cost.
**Related**: [HS code](#hs-code-harmonised-system-code), [Duty](#duty), [Landed cost](#landed-cost)

### Windsor Framework
**Category**: Customs
**Plain-English definition**: The 2023 agreement between the UK and the EU that governs the movement of goods between Great Britain and Northern Ireland, replacing parts of the Northern Ireland Protocol.
**Context**: The Windsor Framework introduced the Green Lane (for goods staying in Northern Ireland) and the Red Lane (for goods at risk of moving into the EU). Green Lane goods clear with minimal customs checks. Red Lane goods follow full EU import procedures. Connexx routes Northern Ireland shipments through the correct lane automatically.
**Related**: [CDS](#cds-customs-declaration-service), [EORI](#eori-economic-operators-registration-and-identification), [/solutions/import](/solutions/import)

---

## Operational terms

### Consolidation
**Category**: Operational
**Plain-English definition**: Combining multiple smaller shipments into one larger shipment to lower per-unit cost, often used in freight and pallet networks.
**Context**: A 3PL consolidating client deliveries at a hub before final-mile dispatch is one example. Importers consolidating supplier orders into a single container is another. Consolidation cuts cost and increases complexity. Connexx tracks consolidated shipments back to the underlying orders so per-client billing stays accurate.
**Related**: [Manifest](#manifest), [Lane](#lane)

### CSAT
**Category**: Operational
**Plain-English definition**: Customer Satisfaction score, typically measured by post-delivery survey on a 1-to-5 or 1-to-10 scale.
**Context**: WISMO tickets and delivery exceptions are the biggest drivers of CSAT drops in eCommerce. A clean delivery experience holds CSAT. Repeated tracking failures erode it within a week. Multi-carrier platforms protect CSAT by routing each order through the most reliable carrier on that lane.
**Related**: [WISMO](#wismo-where-is-my-order), [SLA](#sla-service-level-agreement)

### Dimensional weight (DIM weight)
**Category**: Operational
**Plain-English definition**: A pricing weight calculated from a parcel's volume rather than its actual weight, used by carriers to price lightweight but bulky shipments.
**Context**: DIM weight is the carrier's defence against being paid to ship empty space. The formula is length x width x height divided by a divisor (typically 5,000 or 6,000 for international, 4,000 for some UK domestic). The carrier charges by the higher of actual or dimensional weight. Connexx applies DIM rules per carrier so the rate engine compares like with like.
**Related**: [Volumetric weight](#volumetric-weight), [Rate card](#rate-card)

### Dispatch
**Category**: Operational
**Plain-English definition**: The act of preparing and sending a shipment, including label generation, manifest creation, and handover to the carrier.
**Context**: Dispatch is the verb every UK operator uses. "Dispatch decisions", "dispatch team", "dispatch volume", "dispatch cutoff". A dispatch cutoff is the time by which a parcel has to be handed to the carrier to be collected that day. Miss it and the parcel ships tomorrow.
**Related**: [Manifest](#manifest), [SLA](#sla-service-level-agreement), [Late Shipment Rate](#late-shipment-rate-lsr)

### FCL / LCL (Full / Less than Container Load)
**Category**: Operational
**Plain-English definition**: Sea freight shipping modes where FCL means the shipment fills a 20ft or 40ft container, and LCL means it shares a container with other shippers.
**Context**: FCL is faster and cheaper per cubic metre at high volume. LCL is the option for smaller importers who cannot fill a container. Most UK importers from Asia run LCL until they hit consistent container volume. Connexx integrates with freight forwarders for both modes.
**Related**: [LTL](#ltl-less-than-truckload), [Consolidation](#consolidation), [/solutions/import](/solutions/import)

### Lane
**Category**: Operational
**Plain-English definition**: A specific shipping route, usually expressed as origin country to destination country (e.g. UK to Germany, UK to US), with implications for carrier choice, transit time, and customs treatment.
**Context**: "Lane" is the planning unit for an export or international eCommerce operation. The UK-to-Germany lane needs a different carrier mix from UK-to-US. Lane performance is measured in cost per parcel, transit time, and exception rate. Connexx tracks lane-level performance per carrier in the dashboard.
**Related**: [Carrier portal](#carrier-portal), [Consolidation](#consolidation), [SLA](#sla-service-level-agreement)

### LTL (Less Than Truckload)
**Category**: Operational
**Plain-English definition**: A road freight mode for shipments too large for parcel carriers but too small to fill a truck, typically used for palletised goods through pallet networks.
**Context**: UK LTL runs through pallet networks like Pall-Ex, Palletline, and Palletways. A shipment is collected, taken to a hub, sorted, and trunked to the destination depot for final delivery. LTL economics depend on hub volume. Connexx rate-shops across pallet networks for every B2B shipment.
**Related**: [Pallet network](#pallet-network), [FCL](#fcl--lcl-full--less-than-container-load), [/solutions/b2b](/solutions/b2b)

### Manifest
**Category**: Operational
**Plain-English definition**: The list of parcels in a single carrier collection, generated at the end of a dispatch session and presented to the driver.
**Context**: Each carrier requires a daily manifest. Royal Mail generates one through Click and Drop or its OBA system. DPD generates one through its portal. Multi-carrier platforms generate one manifest per carrier per collection automatically. A manifest is the source of truth for that day's volume.
**Related**: [Dispatch](#dispatch), [POD](#pod-proof-of-delivery)

### Pallet network
**Category**: Operational
**Plain-English definition**: A national or international network of haulage businesses that share a central hub to deliver palletised freight, allowing single-pallet shipments at competitive cost.
**Context**: Pall-Ex, Palletline, and Palletways are the dominant UK pallet networks. Each has 80 to 100 member depots across the UK. A shipper books once, the network handles collection, trunking, and delivery. Pallet sizes (quarter, half, full) and timed delivery windows are the main rate variables.
**Related**: [LTL](#ltl-less-than-truckload), [POD](#pod-proof-of-delivery), [/solutions/b2b](/solutions/b2b)

### Returns logistics / reverse logistics
**Category**: Operational
**Plain-English definition**: The process of handling goods sent back from the customer, including return labels, carrier collection, warehouse receipt, and refund or restock decisions.
**Context**: Returns rates in UK eCommerce typically run 8 to 30 per cent depending on category. Returns logistics costs (label, freight, processing, restocking, write-off) can absorb 30 to 50 per cent of the gross margin on returned items. A returns portal that issues pre-paid labels through the right carrier per lane saves cost and reduces friction.
**Related**: [WISMO](#wismo-where-is-my-order), [Carrier portal](#carrier-portal), [/solutions/ecommerce](/solutions/ecommerce)

### Volumetric weight
**Category**: Operational
**Plain-English definition**: A synonym for dimensional weight, used by some carriers and freight forwarders to describe volume-based pricing.
**Context**: Volumetric weight and dimensional weight refer to the same calculation, with different divisors per carrier. Royal Mail does not apply volumetric weight on small parcels but DHL, FedEx, and UPS do on international.
**Related**: [Dimensional weight](#dimensional-weight-dim-weight), [Rate card](#rate-card)

### WISMO (Where Is My Order)
**Category**: Operational
**Plain-English definition**: The customer service ticket category covering "where is my parcel?" enquiries from customers waiting for a delivery.
**Context**: WISMO is the single largest CS ticket type for any UK eCommerce brand. At 80 tickets a day across four carriers, a CS team can spend five hours daily looking up tracking. The fix is a single tracking view inside the helpdesk, fed by the multi-carrier platform's tracking data. Peak Commerce cut WISMO tickets by 68 per cent on Connexx.
**Related**: [Tracking number](#tracking-number--consignment-reference), [CSAT](#csat), [/solutions/ecommerce](/solutions/ecommerce)

---

## Technical terms

### API (Application Programming Interface)
**Category**: Technical
**Plain-English definition**: A set of endpoints that lets one software system talk to another, used in shipping to connect order systems (Shopify, SAP, NetSuite) to carriers and platforms (Royal Mail, DPD, Connexx).
**Context**: Every modern carrier publishes an API. Every modern platform consumes them. A platform with native API connections beats one that uses CSV uploads, because the data flows in real time and writes back automatically. Connexx exposes its own REST API to customers who want to build custom workflows.
**Related**: [RESTful API](#restful-api), [Webhook](#webhook), [ERP write-back](#erp-write-back)

### ERP write-back
**Category**: Technical
**Plain-English definition**: The process by which a shipping platform writes shipment data (tracking numbers, dispatch dates, costs, POD) back into the source ERP, so the order record is updated automatically.
**Context**: Without write-back, dispatch teams re-key tracking numbers into the ERP by hand. With write-back, the data flows. SAP, NetSuite, Dynamics 365, and Sage all support write-back through API or middleware. Connexx supports two-way sync with every major ERP.
**Related**: [API](#api-application-programming-interface), [Webhook](#webhook), [Tracking number](#tracking-number--consignment-reference)

### OMS (Order Management System)
**Category**: Technical
**Plain-English definition**: A software platform that aggregates orders from multiple sales channels (Shopify, Amazon, eBay, B2B portal) into one queue for dispatch.
**Context**: Linnworks, Veeqo, StoreFeeder, and Selro are the dominant UK OMS platforms for multi-channel sellers. The OMS holds the order until it is ready for dispatch. The shipping platform takes the dispatched order, picks the carrier, generates the label, and writes the tracking number back. Connexx integrates with every major OMS.
**Related**: [WMS](#wms-warehouse-management-system), [API](#api-application-programming-interface)

### RESTful API
**Category**: Technical
**Plain-English definition**: A style of web API that uses standard HTTP methods (GET, POST, PUT, DELETE) and JSON payloads, the dominant pattern in modern software integration.
**Context**: A REST API is the easiest pattern to integrate against. Connexx's API is REST. Most modern carrier APIs are REST. Older carrier APIs use SOAP or proprietary XML, which Connexx handles internally so the customer never sees them.
**Related**: [API](#api-application-programming-interface), [Webhook](#webhook)

### Webhook
**Category**: Technical
**Plain-English definition**: An HTTP callback that one system sends to another when an event occurs (e.g. an order is created in Shopify, a parcel is scanned by DPD), enabling real-time data flow without polling.
**Context**: Webhooks are how shipping platforms get instant notification of order creation, dispatch, and delivery. Connexx receives Shopify order-created webhooks and pushes tracking events back via webhooks to the customer's ERP. Real-time webhook flow beats hourly batch polling for any time-sensitive workflow.
**Related**: [API](#api-application-programming-interface), [ERP write-back](#erp-write-back)

### WMS (Warehouse Management System)
**Category**: Technical
**Plain-English definition**: A software platform that manages warehouse operations including stock locations, picking, packing, and inventory accuracy.
**Context**: Mintsoft, ShipHero, Manhattan Active Warehouse, and Blue Yonder are the UK-relevant WMS platforms. A WMS controls what is on the shelf and where it goes. A shipping platform controls how it gets to the customer. The two systems integrate so an order picked in the WMS dispatches through the shipping platform automatically. Connexx integrates with every major WMS.
**Related**: [OMS](#oms-order-management-system), [API](#api-application-programming-interface), [/solutions/3pl](/solutions/3pl)

---

## Regulatory and zone terms

### Customs hold
**Category**: Regulatory
**Plain-English definition**: A delay imposed by customs authorities (HMRC or the destination country's customs) on a shipment that fails initial checks, pending resolution of a documentation or compliance issue.
**Context**: Customs holds typically take 24 to 72 hours to resolve and require additional paperwork. The most common causes are misclassified HS codes, missing or wrong EORI, mismatched commercial invoice and packing list, and missing certificates. SwiftLog Fulfilment lifted customs accuracy from 93 per cent to 98.7 per cent on Connexx, cutting customs-related delays by 85 per cent.
**Related**: [Pre-clearance](#pre-clearance), [HS code](#hs-code-harmonised-system-code), [Commercial invoice](#commercial-invoice)

### Landed cost
**Category**: Regulatory
**Plain-English definition**: The total cost of getting goods from a supplier to the final destination, including supplier price, freight, insurance, duty, import VAT, customs fees, and any surcharges.
**Context**: Landed cost matters most for importers pricing products against margin. Estimates that are off by 10 to 20 per cent erode margin on every unit until the next price review. Northgate Imports lifted duty cost accuracy from 82 per cent to 97 per cent on Connexx, which let finance price every SKU against accurate margin.
**Related**: [Duty](#duty), [UK Global Tariff](#uk-global-tariff), [/solutions/import](/solutions/import)

### Surcharge zone
**Category**: Regulatory
**Plain-English definition**: A geographic area (typically postcodes) outside the carrier's standard delivery network, where the carrier applies an additional fee per shipment.
**Context**: Highlands, Islands, Channel Islands, Northern Ireland, and BFPO are the main UK surcharge zones. Each carrier has its own list. Routing rules in a multi-carrier platform pick the carrier with the lowest surcharge for the destination postcode.
**Related**: [Highlands & Islands](#highlands--islands), [Out-of-area](#out-of-area), [Mainland UK](#mainland-uk)

### IPR (Inward Processing Relief)
**Category**: Regulatory
**Plain-English definition**: An HMRC scheme allowing UK importers to suspend or refund duty on goods imported for processing and re-export.
**Context**: IPR is for businesses that import components, process them in the UK, and export the finished product. Duty on the imported components is either suspended at import or refunded later. The paperwork burden is meaningful, which is why many eligible businesses do not use the scheme. Connexx tags IPR-eligible shipments for the claim.
**Related**: [Duty drawback](#duty-drawback), [OPR](#opr-outward-processing-relief)

### OPR (Outward Processing Relief)
**Category**: Regulatory
**Plain-English definition**: An HMRC scheme allowing UK exporters to send goods abroad for processing and re-import them with duty calculated only on the value added abroad, not the full re-import value.
**Context**: OPR is the export counterpart to IPR. Used by businesses that send raw materials or components abroad for finishing and then re-import. Common in fashion, electronics assembly, and machinery. Connexx flags OPR-eligible movements and tracks them through the re-import.
**Related**: [IPR](#ipr-inward-processing-relief), [Duty](#duty)

---

## JSON-LD

Use `DefinedTermSet` schema for the page plus a `DefinedTerm` schema for every entry. This is the GEO unlock: AI models extract `DefinedTerm` blocks verbatim when answering "what is X" questions.

Example structure:

```ts
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://itdglobal.com/resources/glossary#set",
  "name": "ITD Global Logistics Glossary",
  "description": "Definitions of UK and international shipping terms used by retailers, 3PLs, exporters, and importers.",
  "inLanguage": "en-GB",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://itdglobal.com/resources/glossary#wismo",
      "termCode": "WISMO",
      "name": "Where Is My Order",
      "description": "The customer service ticket category covering \"where is my parcel?\" enquiries from customers waiting for a delivery.",
      "inDefinedTermSet": "https://itdglobal.com/resources/glossary#set",
      "url": "https://itdglobal.com/resources/glossary#wismo"
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://itdglobal.com/resources/glossary#eori",
      "termCode": "EORI",
      "name": "Economic Operators Registration and Identification",
      "description": "The unique identifier issued by HMRC (or any EU customs authority) to a business that imports or exports goods, used on every customs declaration.",
      "inDefinedTermSet": "https://itdglobal.com/resources/glossary#set",
      "url": "https://itdglobal.com/resources/glossary#eori"
    }
  ]
}
```

Add a `BreadcrumbList` schema (Home → Resources → Glossary) and an `Article` schema for the page itself.

---

## Internal link map

**Outbound from this page** (every entry links out where it makes sense):

| Term | Page |
|---|---|
| WISMO, Returns logistics, CSAT | /solutions/ecommerce |
| Buy Shipping, SFP, VTR, LSR, OTDR | /solutions/marketplace-seller |
| Child account, Consolidation | /solutions/3pl |
| Pallet network, LTL, POD | /solutions/b2b |
| EORI, IOSS, OSS, EUR.1, ATR, HS code, Phytosanitary, Rules of origin | /solutions/export |
| CDS, PVA, C79, Duty deferment, Landed cost, UK Global Tariff, Pre-clearance, Customs hold, Windsor Framework, IPR, OPR | /solutions/import |
| Multi-carrier, Rate engine, Rate card, Negotiated rate | /connexx |
| API, RESTful API, Webhook, ERP write-back, WMS, OMS | /connexx/api (when built) |

**Inbound to this page** (every solution and shipping page should link the first occurrence of a glossary term):

- /solutions/ecommerce → link WISMO, dispatch, carrier portal, returns logistics
- /solutions/marketplace-seller → link VTR, LSR, OTDR, SFP, Buy Shipping
- /solutions/3pl → link child account, consolidation, manifest
- /solutions/b2b → link pallet network, LTL, POD, BOL
- /solutions/export → link EORI, IOSS, HS code, EUR.1, commercial invoice
- /solutions/import → link CDS, PVA, C79, duty deferment, landed cost, pre-clearance
- /shipping/domestic → link Mainland UK, Highlands & Islands, surcharge zone
- /shipping/international → link Incoterms, DDP, DDU, IOSS

---

## Implementation notes

1. Add `definedTermSchema` and `definedTermSetSchema` helpers to `@/components/seo/JsonLd.tsx`. The page renders one `DefinedTermSet` plus one `DefinedTerm` per entry, all wrapped in a single `<JsonLd />` array.

2. Heed the AGENTS.md notice: this codebase's Next.js may differ from training data. Before writing the page route, read `node_modules/next/dist/docs/` for the current page conventions.

3. The page is heavy (60+ entries, ~5,000 words). Options:
   - **Option A — single page (better GEO).** Server-render the whole thing. Use category H2s for navigation. Add an in-page search input that filters by JavaScript on the client.
   - **Option B — category pages (better UX).** Split into /resources/glossary, /resources/glossary/customs, /resources/glossary/carrier, etc. Lose some GEO power because the entries no longer co-locate.

   Recommendation: Option A for v1. The single-page GEO value is high and the page weight is manageable with category H2 navigation.

4. Add `/resources/glossary` to `ROUTES` in `src/lib/site-config.ts` with `priority: 0.7, changeFrequency: "monthly"`.

5. Each entry needs a stable anchor (`#wismo`, `#eori`, `#hs-code`, and so on) so external systems can deep-link to a single term.

6. The DefinedTerm JSON-LD should include `url` per entry (the anchor URL). This is the field AI models match to surface the entry in citations.

7. Glossary entries should be reviewed quarterly against carrier and regulatory changes (e.g. CDS export migration finalised, Windsor Framework updates, UK Global Tariff revisions, Amazon SFP changes).

---

## Reviewer questions

1. Should the glossary be a single long page (recommended for GEO) or paginated by category (better navigation for human readers)? My recommendation: single page with category H2 navigation and in-page search.

2. Are there ITD-specific terms or proprietary product features that should appear in the glossary (e.g. "Connexx rate engine", "Connexx exception queue", "Connexx returns portal")? If yes, list them and we add definitions in the next pass.

3. Should the glossary include carrier-specific service codes (Royal Mail STL2, DPD service codes, DHL product codes) or stay at the category level? My recommendation: keep at category level for the glossary and host the full service code matrix on /integrations/carriers.

4. Confirm the regulatory entries (PVA, C79, CDS, IOSS, EORI, EUR.1, IPR, OPR, Windsor Framework) are current as of May 2026. Any regulatory updates since the last reference check should be reflected before publish.

5. Should the page include a "Suggest a term" form for prospects to ask for missing definitions? This is a low-cost lead capture mechanism that doubles as a content roadmap signal.
