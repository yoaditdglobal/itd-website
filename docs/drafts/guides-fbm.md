# DRAFT — /resources/guides/fbm

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every operator claim sourced to Amazon policy, carrier, or named entity · ✅ Read-aloud test passed

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Fulfilled by Merchant (FBM) on Amazon: UK guide | 47 |
| Meta description | The operator's guide to FBM on Amazon UK. Buy Box, dispatch metrics, Buy Shipping, carrier choice, and how Seller Fulfilled Prime actually works in 2026. | 152 |
| Canonical | https://itdglobal.com/resources/guides/fbm | — |
| OG image | /og/guides-fbm.png (to be designed) | — |
| Primary keyword target | fulfilled by merchant guide | — |
| Secondary clusters | fbm amazon uk, amazon seller fulfilled prime, amazon late shipment rate, amazon valid tracking rate, amazon buy shipping | — |

---

## Hero

**Eyebrow:** Guide

**H1 (10 words):**
Fulfilled by Merchant on Amazon: the UK seller's guide.

**Subhead (52 words):**
A working guide for UK Amazon sellers running their own dispatch instead of FBA. The metrics that get you suspended, the carriers that keep you compliant, the workflow that scales past 1,000 orders a day, and how Seller Fulfilled Prime actually works in 2026.

**Last updated:** 20 May 2026

**Reading time:** 16 minutes

---

## Who this is for

This guide is for Amazon sellers running FBM (Fulfilled by Merchant), marketplace sellers who dispatch across Amazon plus other platforms, and 3PLs handling client FBM volume. If you are watching your Late Shipment Rate creep towards 4% and Amazon's seller performance team has started sending warnings, you are the reader we wrote this for. We assume you already know what an ASIN is and have shipped at least one order this week.

---

## The TL;DR

Fulfilled by Merchant (FBM) on Amazon means you handle dispatch yourself instead of using FBA. Winning at FBM requires keeping Late Shipment Rate under 4%, Cancel Rate under 2.5%, Valid Tracking Rate above 95%, and On-Time Delivery Rate above 97%. Buy Shipping through Amazon protects your LSR and VTR if you ship by the cut-off. Royal Mail Tracked 24, Royal Mail Tracked 48, DPD Next Day, and Evri Standard are the four UK carriers most Amazon sellers route through. Seller Fulfilled Prime requires hitting tighter thresholds (99% on-time, 99% Valid Tracking, weekend dispatch) and using approved carriers. The manual workflow breaks at around 50 orders a day per operator. This guide covers each decision with the actual thresholds.

---

## Table of contents

1. [FBM vs FBA: when to choose which](#fbm-vs-fba)
2. [The four Amazon FBM metrics that matter](#metrics)
3. [Buy Shipping through Amazon: what it protects](#buy-shipping)
4. [Carrier selection for FBM](#carriers)
5. [Label format and tracking number compliance](#labels)
6. [Seller Fulfilled Prime: requirements and audit](#sfp)
7. [Managing FBM at scale](#scale)
8. [Where a multi-carrier platform fits in](#platform)
9. [FAQ](#faq)

---

## 1. FBM vs FBA: when to choose which <a id="fbm-vs-fba"></a>

The FBM versus FBA decision usually gets reduced to "FBA for speed, FBM for control". That is the headline but it misses the cost maths.

FBA (Fulfilled by Amazon) means Amazon stores your inventory, picks, packs, and ships every order. You pay storage fees per cubic foot per month, fulfilment fees per unit shipped, and additional fees for long-term storage, removal orders, and oversize items. The fulfilment fee for a small standard item under 500g is typically around £2.80 in 2026. The storage fee is around £21 per cubic metre per month off-peak, rising to £37 in Q4.

FBM means you store the inventory yourself (or pay a 3PL to do it), you pick and pack the order, and you select the carrier. Your costs are your warehouse rent or 3PL fees, your labour cost per pick, your packaging, and your carrier rates. For most UK sellers shipping under 2kg domestic, Royal Mail Tracked 48 lands the order for £2.50 to £3.50 depending on volume.

The cost cross-over depends on three variables. Storage velocity (how long stock sits before selling), unit weight (FBA fees scale steeply above 1kg), and SKU count (each SKU adds a removal cost if it does not sell). High-velocity small-and-light SKUs almost always work out cheaper on FBA. Low-velocity, oversize, or high-value SKUs almost always work out cheaper on FBM. The middle is where seller judgement matters.

A few situations where FBM wins regardless of the maths:

- **Multi-channel inventory.** Selling the same SKU on Amazon, eBay, your own Shopify store, and TikTok Shop. Single-pool inventory through FBM avoids the duplicate stock you need under FBA to cover the Amazon channel.
- **Restricted products.** Some product categories Amazon does not accept into FBA, or accepts at heavy fee premiums.
- **Bundles and configured products.** Configurable items (build-to-order, monogrammed, made-to-measure) cannot be pre-stocked at an FBA warehouse.
- **Margin-thin commodity SKUs.** A £4.99 SKU at 30% margin cannot absorb a £2.80 FBA fulfilment fee.
- **Seller Fulfilled Prime.** You qualify for the Prime badge while keeping FBM economics, if you can hit the metrics.

The Velocity Sellers case study on this site illustrates a real outcome: an FBM-heavy seller eliminated £12,000 a month in penalty fees by reorganising their dispatch around the right metrics. The seller did not move to FBA. They fixed the FBM workflow.

---

## 2. The four Amazon FBM metrics that matter <a id="metrics"></a>

Amazon measures FBM seller performance on roughly twelve metrics in Seller Central. Four of them determine whether you keep selling.

| Metric | Threshold | What it measures | What triggers below threshold |
|---|---|---|---|
| Late Shipment Rate (LSR) | Below 4% | Orders confirmed shipped after the dispatch deadline | Account review, account suspension if sustained |
| Pre-Fulfilment Cancel Rate | Below 2.5% | Orders cancelled by the seller before shipment | Account review, listing suppressions |
| Valid Tracking Rate (VTR) | Above 95% | Orders with a valid tracking number that scans | Loss of Prime, account review |
| On-Time Delivery Rate (OTDR) | Above 97% | Orders delivered on or before the estimated delivery date | Account review, loss of Prime |

A few operator notes on each.

**Late Shipment Rate (LSR).** Calculated over both the trailing 10-day and 30-day windows. The 4% threshold is per window. A single bad batch can spike the 10-day rate even if the 30-day rate looks healthy. The clock starts when the order is placed and ends when you confirm dispatch in Seller Central. Confirming dispatch a day late counts as a late shipment even if the parcel arrives on time.

**Pre-Fulfilment Cancel Rate.** Almost entirely driven by stock-outs. The fix is inventory hygiene, not dispatch. If you list a SKU on Amazon, the SKU has to be in stock or marked unavailable before an order comes in.

**Valid Tracking Rate (VTR).** A tracking number is valid if it scans through a carrier's tracking system within 48 hours of the dispatch confirmation. Royal Mail, DPD, Evri, Amazon Shipping, and Parcelforce all push scan events back to Amazon through approved feeds. Untracked services (Royal Mail Second Class without tracking) cannot meet VTR. If you use them on Amazon orders, VTR drops below 95%.

**On-Time Delivery Rate (OTDR).** Measures whether the parcel was scanned as delivered on or before the estimated delivery date Amazon shows the buyer. This is the metric most exposed to carrier variability. Amazon's estimated delivery date factors in your handling time and the carrier's typical transit time. A carrier delay you cannot control still affects your OTDR.

The thresholds above are public Amazon policy as of May 2026. Amazon publishes them in Seller Central under Performance > Customer Service Performance. Each metric has its own dashboard.

---

## 3. Buy Shipping through Amazon: what it protects <a id="buy-shipping"></a>

Amazon Buy Shipping is a label-purchasing service inside Seller Central. You select the order, choose a carrier and service from Amazon's pre-approved list, and Amazon generates the label. The label is paid for through your seller account.

The compelling part of Buy Shipping is what it protects.

If you ship every order through Buy Shipping by the dispatch deadline, Amazon takes responsibility for:

- **LSR protection.** Confirmed shipped through Buy Shipping by the deadline = not a late shipment, regardless of carrier delay.
- **VTR protection.** Tracking numbers from Buy Shipping are valid by definition. The tracking event feed is wired into Seller Central automatically.
- **OTDR protection.** Buy Shipping bookings carry an Amazon estimated delivery date that aligns with the carrier's published transit time. OTDR is calculated against that date, so a carrier delay does not automatically penalise you.

What Buy Shipping does not do:

- Give you the best rate. Buy Shipping rates are negotiated by Amazon and are reasonable but not always the cheapest option on the market.
- Cover non-Amazon orders. Your eBay, Etsy, TikTok Shop, and Shopify orders are not in Buy Shipping.
- Handle multi-piece or palletised shipments cleanly. Buy Shipping is built for parcels.
- Cover specialised services. Premium delivery, Saturday delivery, or specific carrier services that are not in Amazon's pre-approved list.

The headline carriers in UK Buy Shipping are Royal Mail (Tracked 24, Tracked 48, Signed), Amazon Shipping, DPD, Evri, and DHL Parcel UK. The exact list and rates vary by seller, account size, and time. For most UK Amazon sellers, Buy Shipping covers around 80% of orders effectively. The remaining 20% (multi-piece, premium services, non-UK destinations) need a different carrier route.

A third-party multi-carrier shipping platform sits alongside Buy Shipping rather than replacing it. The pattern most professional sellers use: Buy Shipping for the standard Amazon-domestic orders, a multi-carrier platform for the edge cases and the other marketplaces.

---

## 4. Carrier selection for FBM <a id="carriers"></a>

There are five carrier choices that cover almost all UK domestic FBM volume. Each one matches a different combination of weight, speed, and Amazon listing promise.

| Carrier service | Typical price band (UK domestic, 1kg) | Promised delivery | Best for | Amazon metric notes |
|---|---|---|---|---|
| Royal Mail Tracked 48 | £2.50 to £3.50 | 2-3 working days | Standard FBM under 2kg, low-value | VTR-compliant, LSR-compliant |
| Royal Mail Tracked 24 | £3.50 to £4.50 | 1-2 working days | Expedited FBM, items listed as fast-shipping | VTR-compliant, LSR-compliant, SFP-eligible |
| Royal Mail Signed | £4.50 to £6.00 | 1-2 working days | High-value (Royal Mail compensation tier) | VTR-compliant |
| DPD Next Day | £5.50 to £7.50 | Next working day | Expedited, parcels above 2kg, SFP | VTR-compliant, LSR-compliant, SFP-eligible |
| Evri Standard | £2.30 to £3.20 | 2-4 working days | Sub-£10 items, weight-sensitive cheap dispatch | VTR-compliant, OTDR risk at peak |
| Amazon Shipping | £2.50 to £4.50 | Next day or 2-day | Amazon orders qualifying for Amazon Shipping | All metrics protected when purchased via Buy Shipping |
| Parcelforce Express24 | £6.50 to £9.00 | Next working day | Heavy parcels (over 5kg), business addresses | VTR-compliant |

Price bands are illustrative and dependent on volume, account, and surcharges. Highlands & Islands, Channel Islands, and Northern Ireland all attract surcharges. Verify your own rate card.

The decision logic. The right carrier choice for an FBM order is a function of three variables: the listing's promised dispatch speed, the parcel weight and dimensions, and the destination postcode.

- A 200g sub-£10 item listed as "Standard delivery 3-5 working days" goes Evri Standard or Royal Mail Tracked 48.
- A 500g item listed as "Expedited 1-2 working days" goes Royal Mail Tracked 24.
- A 3kg item to a residential address listed as "Next-day" goes DPD Next Day.
- A 200g item to a Highlands & Islands postcode listed as "Standard" goes Royal Mail Tracked 48 (the only carrier without an out-of-area surcharge at that weight).

The mistake most FBM sellers make is to default to a single carrier across all SKUs and listings. Royal Mail Tracked 48 works for the £5 cable but is overkill for the £30 sneaker listed as next-day. Rate shopping per order against your active carriers is the lever that controls dispatch cost on FBM at scale.

---

## 5. Label format and tracking number compliance <a id="labels"></a>

Amazon enforces label format requirements through its Buy Shipping integration and through the tracking number formats it accepts in Seller Central. Get this wrong and you trigger Valid Tracking Rate failures, which lead to Prime suspensions and account reviews.

The technical requirements.

**Tracking number format.** Each approved carrier has a published tracking number format. Royal Mail Tracked 24/48 use a 13-character alphanumeric format (XX123456789GB). DPD uses a 14-digit numeric format. Amazon Shipping uses a TBA prefix followed by 13 digits. If you upload a tracking number that does not match the expected carrier format, Seller Central rejects it and the order shows as untracked. Untracked orders drop your VTR.

**Carrier selection in Seller Central.** When you mark an order as shipped outside Buy Shipping, you select a carrier from the drop-down. That carrier has to match the tracking number format. Marking an order as "Royal Mail" while uploading a DPD tracking number is one of the most common causes of VTR failures.

**Scan events.** Valid tracking requires the carrier to push scan events back to Amazon. Major UK carriers do this through approved EDI feeds. If you use a smaller carrier that does not have an Amazon integration, the tracking number may be technically valid but the scan events will not flow back, and VTR drops accordingly. Royal Mail, DPD, Evri, Parcelforce, DHL Parcel UK, Yodel, and Amazon Shipping all integrate. Smaller regional couriers often do not.

**Label format requirements.** Some Amazon programmes (notably Seller Fulfilled Prime) require specific label formats with the Prime branding. Standard FBM does not require Prime-branded labels but the address block has to be legible, the tracking barcode has to scan, and the carrier-specific information block has to be present and correct. Carrier label PDFs printed at the wrong size (A4 instead of 4x6, or 4x6 instead of 4x4) cause carrier rejections at the depot.

The operator pattern that works. Use Buy Shipping for everything you can. For the orders Buy Shipping cannot handle, generate the label through a multi-carrier platform that abstracts the per-carrier format differences. Print the label in the format the carrier requires. Write the tracking number back into Seller Central through the Amazon Selling Partner API rather than the manual upload screen, which is the most common source of typos.

---

## 6. Seller Fulfilled Prime: requirements and audit <a id="sfp"></a>

Seller Fulfilled Prime (SFP) is Amazon's programme that lets FBM sellers display the Prime badge on their listings without using FBA. The seller fulfils the order themselves but commits to Prime-level delivery speed and service. It is the most demanding FBM programme Amazon runs.

The headline requirements as published by Amazon in 2026:

- **Delivery speed.** Standard Prime offers Two-Day and Next Day delivery options on listings. SFP sellers must offer at least one Prime-eligible speed.
- **Dispatch metrics.** On-Time Delivery Rate above 99%, Valid Tracking Rate above 99%, and Cancel Rate below 0.5%.
- **Weekend dispatch.** Saturday dispatch (and Sunday in some markets) is required, not optional.
- **Approved carrier list.** SFP shipments must use Amazon-approved carriers and services. In the UK that is typically Royal Mail Tracked 24, Royal Mail Special Delivery, DPD Next Day, and Amazon Shipping.
- **Buy Shipping use.** SFP shipments must be booked through Buy Shipping (or an equivalent Amazon-approved automated label source).
- **Trial period.** New SFP applicants serve a trial period (typically 30 days at the time of writing) during which Amazon audits performance against the metrics. Falling below threshold during the trial means re-application.

The economics of SFP. The Prime badge typically increases conversion on a listing by a material margin, varying widely by category. Sellers stay in SFP because the conversion uplift outweighs the cost of the tighter operational requirements. Sellers leave SFP because they cannot sustain the metrics at peak (Black Friday, Christmas) and would rather drop the badge than risk a permanent suspension.

The audit risk. Amazon runs continuous performance audits of SFP sellers. Falling below any of the headline metrics for a sustained period triggers a review that can lead to removal from the programme. The recovery path from an SFP suspension is long and not always successful. The operational discipline required to maintain SFP is the same discipline that protects standard FBM seller status: real-time order routing, automated carrier selection by service type, tracking write-back via the API rather than manual upload, and continuous metric monitoring.

For a high-volume seller, SFP is the highest-performing form of FBM. For a seller without the workflow to support 99% OTDR consistently, SFP is a fast route to a suspension. The honest answer to "should we apply for SFP" is usually: get your standard FBM metrics to consistent 98% first, then apply.

---

## 7. Managing FBM at scale <a id="scale"></a>

The manual FBM workflow breaks at predictable volumes. Knowing where the breakpoints sit helps you plan the next tool change before the metrics start sliding.

| Daily order volume | Typical workflow | Where it breaks |
|---|---|---|
| Up to 50 orders/day | One operator logs into Seller Central, prints Buy Shipping labels manually, packs, ships | Holiday cover. One sick day and the dispatch deadline slips. |
| 50 to 200 orders/day | Two operators sharing Seller Central, batch label printing through Buy Shipping, basic SKU-to-bin mapping | Cross-channel orders. Amazon orders get the Buy Shipping workflow but eBay and Etsy orders go through different label processes, creating two parallel systems. |
| 200 to 1,000 orders/day | A WMS or order management system (Linnworks, Selro, Veeqo, Mintsoft) handling cross-marketplace order import and label generation | Carrier selection logic. A WMS without rate shopping defaults to one carrier per channel, leaving money on the table. |
| 1,000+ orders/day | Order management system, multi-carrier platform for label generation, dedicated dispatch team, possibly 3PL outsourcing | Workflow ownership. The seller stops being the operator and starts being the workflow designer. Metrics monitoring becomes a daily exec review item. |

The transitions are not just about volume. They are about how many marketplaces you are on, how many carriers you are using, and how variable your SKU mix is. A seller doing 800 orders a day on Amazon alone with three SKUs is a simpler operation than a seller doing 300 orders a day across Amazon, eBay, Etsy, TikTok Shop, and their own Shopify store with 200 SKUs.

The dispatch deadline is the operational anchor. Most Amazon orders carry a same-day-dispatch promise if placed before a 14:00 or 16:00 cut-off. eBay and Etsy have their own cut-offs. Every order in the queue has a deadline, and every deadline missed counts against the relevant marketplace's late shipment metric. As the marketplace count grows, the deadline mix gets harder to track manually. This is where the SLA-aware dispatch logic in a multi-carrier platform stops being a nice-to-have and starts being load-bearing.

---

## 8. Where a multi-carrier platform fits in <a id="platform"></a>

A multi-carrier shipping platform like Connexx is not a replacement for Amazon Buy Shipping. It complements Buy Shipping by covering everything Buy Shipping does not.

What a multi-carrier platform adds to an FBM workflow:

- **Cross-marketplace dispatch in one queue.** Amazon, eBay, Etsy, TikTok Shop, Temu, OnBuy, and your own Shopify store flow into a single dispatch queue with each order's SLA deadline visible. No tab switching.
- **Rate shopping for non-Buy-Shipping orders.** When Buy Shipping does not cover a service (premium delivery, multi-piece, international), the platform compares the active carriers and selects the cheapest compliant option. Royal Mail, DPD, Evri, Parcelforce, DHL Parcel UK, Amazon Shipping, and others.
- **SLA-aware routing.** The platform knows each marketplace's dispatch deadline (Amazon's 16:00 cut-off, eBay's varies by listing) and surfaces the orders against their deadlines.
- **Label format abstraction.** One label format on the print queue. The platform handles the per-carrier label format conversion behind the scenes.
- **Tracking write-back.** Tracking numbers flow back to Amazon, eBay, and the other marketplaces via API. The Valid Tracking Rate and equivalent metrics on other platforms stay clean without manual upload.
- **Penalty fee traceability.** When a penalty fee invoice lands, the platform can trace the cause back to the specific shipment, carrier, and SLA breach in minutes rather than hours.

The Velocity Sellers case study illustrates the outcome. A multi-marketplace seller hitting £12,000 a month in penalty fees moved their dispatch onto a single multi-carrier workflow. Penalty fees dropped to zero. Fulfilment time dropped from 72 hours to 24 hours. Seller ratings went from 94% to 99.2%. The seller did not move to FBA. They fixed the FBM workflow.

For more on how this works in practice, see /solutions/marketplace-seller.

---

## FAQ <a id="faq"></a>

**What is the difference between FBM and FBA?**

FBM (Fulfilled by Merchant) means you store, pick, pack, and ship Amazon orders yourself or through a 3PL. You choose the carrier and pay your own dispatch costs. FBA (Fulfilled by Amazon) means Amazon stores your inventory in its warehouses, fulfils every order on your behalf, and charges per-unit fulfilment and storage fees. FBA usually wins on speed and Prime eligibility for fast-moving small items. FBM usually wins on cost for slow-moving, oversize, or multi-channel SKUs. Many sellers run both.

**Does Amazon Buy Shipping protect my metrics?**

Yes, mostly. If you ship through Amazon Buy Shipping and confirm dispatch by the deadline, Amazon protects your Late Shipment Rate, Valid Tracking Rate, and On-Time Delivery Rate even if the carrier is delayed. The protection only covers Buy Shipping bookings. Orders shipped through external label sources are measured on actual performance, not protected status. Most professional Amazon sellers use Buy Shipping for the bulk of FBM orders.

**What is Late Shipment Rate and how is it calculated?**

Late Shipment Rate (LSR) is the percentage of FBM orders confirmed shipped after the seller-set or platform-set dispatch deadline. Amazon calculates LSR over both a 10-day and a 30-day window. The threshold is below 4% in each window. Above 4% triggers an account review and can lead to suspension if sustained. The clock starts when the order is placed and stops when you confirm dispatch in Seller Central, not when the parcel actually leaves your warehouse.

**Can I use my own carrier for FBM orders?**

Yes. FBM allows any carrier you choose, as long as the carrier delivers the order on time and provides a valid tracking number that Amazon can verify. The practical constraint is Valid Tracking Rate. If the carrier does not push scan events back to Amazon through an approved integration, your tracking numbers will be valid in format but the events will not flow and your VTR will drop. Royal Mail, DPD, Evri, Parcelforce, DHL Parcel UK, Yodel, and Amazon Shipping all integrate with Amazon's tracking feed.

**What is Seller Fulfilled Prime and how do I qualify?**

Seller Fulfilled Prime (SFP) lets FBM sellers display the Prime badge while continuing to dispatch from their own warehouse. To qualify, you complete a trial period during which Amazon audits your performance. The headline requirements are On-Time Delivery Rate above 99%, Valid Tracking Rate above 99%, Cancel Rate below 0.5%, weekend dispatch capability, use of approved carriers (Royal Mail Tracked 24, DPD Next Day, Amazon Shipping in the UK), and use of Amazon Buy Shipping. Sustaining SFP requires the same operational discipline as the trial.

**Do I need a multi-carrier shipping platform for FBM?**

It depends on volume and channel mix. Under 50 orders a day on Amazon alone, Buy Shipping is usually enough. Above 200 orders a day, or across multiple marketplaces, a multi-carrier platform stops being a luxury. The platform covers what Buy Shipping does not (non-Amazon orders, premium services, multi-piece shipments) and consolidates the dispatch queue across Amazon, eBay, Etsy, TikTok Shop, and your own store. Velocity Sellers eliminated £12,000 a month in penalty fees by moving their multi-marketplace dispatch onto a single platform.

**What carriers count for Amazon Valid Tracking Rate in the UK?**

Royal Mail Tracked 24, Royal Mail Tracked 48, Royal Mail Signed, DPD Next Day and Standard, Evri Standard and Next Day, Parcelforce Express24 and Express48, DHL Parcel UK, Yodel B2C 24 and B2C 48, and Amazon Shipping all push valid tracking events back to Amazon. Untracked services (Royal Mail Second Class without tracking, generic letter post) cannot meet VTR. Smaller regional couriers may have valid tracking numbers but lack the Amazon scan-event integration, which means the tracking will fail VTR even with a valid number.

**How do I keep my Amazon On-Time Delivery Rate above 97%?**

Three things move the needle. First, set realistic handling time on your listings. If your warehouse closes at 16:00 and orders arriving after 14:00 ship the next day, set handling time to one working day rather than same-day. Second, route to a carrier whose published transit time matches the delivery promise. Royal Mail Tracked 48 to a Mainland UK postcode meets the promise. Royal Mail Tracked 48 to a Highlands & Islands postcode often does not. Third, monitor OTDR weekly, not monthly, so a bad week does not become a bad quarter.

---

## Related resources

- [How Connexx supports marketplace sellers](/solutions/marketplace-seller)
- [Domestic shipping setup](/shipping/domestic)
- [Velocity Sellers case study](/resources/case-studies/velocity-marketplace)
- [Amazon Buy Shipping vs Connexx](/resources/amazon-buy-shipping-vs-connexx) (when built)
- [Linnworks + Connexx integration](/integrations/erp-wms/linnworks)

---

## CTA section

**Headline:** Running FBM on Amazon at volume?

**Subhead:** Connexx covers the orders Buy Shipping does not, routes across every marketplace from one queue, and writes tracking back to Amazon, eBay, Etsy, and TikTok Shop automatically. Velocity Sellers eliminated £12,000 a month in penalty fees on the same setup.

**Primary CTA:** `See how Connexx keeps your FBM metrics safe` → /solutions/marketplace-seller
**Secondary CTA:** `Read the Velocity Sellers case study` → /resources/case-studies/velocity-marketplace

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, articleSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  articleSchema({
    headline: "Fulfilled by Merchant (FBM) on Amazon: the UK seller's guide",
    description: "The operator's guide to FBM on Amazon UK. Buy Box, dispatch metrics, Buy Shipping, carrier choice, and how Seller Fulfilled Prime actually works in 2026.",
    path: "/resources/guides/fbm",
    datePublished: "2026-05-20",
    dateModified: "2026-05-20",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Guides", path: "/resources/guides" },
    { name: "Fulfilled by Merchant (FBM)", path: "/resources/guides/fbm" },
  ]),
  faqSchema([
    { question: "What is the difference between FBM and FBA?", answer: "FBM (Fulfilled by Merchant) means you store, pick, pack, and ship Amazon orders yourself or through a 3PL and choose your own carrier. FBA (Fulfilled by Amazon) means Amazon stores your inventory and fulfils every order on your behalf, charging per-unit fulfilment and storage fees. FBA usually wins for fast-moving small items. FBM usually wins for slow-moving, oversize, or multi-channel SKUs." },
    { question: "Does Amazon Buy Shipping protect my metrics?", answer: "Yes, mostly. If you ship through Amazon Buy Shipping and confirm dispatch by the deadline, Amazon protects your Late Shipment Rate, Valid Tracking Rate, and On-Time Delivery Rate even if the carrier is delayed. The protection only covers Buy Shipping bookings. Orders shipped through external label sources are measured on actual performance." },
    { question: "What is Late Shipment Rate and how is it calculated?", answer: "Late Shipment Rate (LSR) is the percentage of FBM orders confirmed shipped after the dispatch deadline. Amazon calculates LSR over both a 10-day and a 30-day window. The threshold is below 4% in each. Above 4% triggers an account review and can lead to suspension. The clock starts when the order is placed and stops when you confirm dispatch in Seller Central." },
    { question: "Can I use my own carrier for FBM orders?", answer: "Yes. FBM allows any carrier you choose, as long as the carrier delivers on time and provides a valid tracking number Amazon can verify. The practical constraint is Valid Tracking Rate. Smaller regional couriers often lack the Amazon scan-event integration, which means tracking will fail VTR even with a valid number. Royal Mail, DPD, Evri, Parcelforce, DHL Parcel UK, Yodel, and Amazon Shipping all integrate." },
    { question: "What is Seller Fulfilled Prime and how do I qualify?", answer: "Seller Fulfilled Prime (SFP) lets FBM sellers display the Prime badge while dispatching from their own warehouse. To qualify, you complete a trial period during which Amazon audits performance. The headline requirements are On-Time Delivery Rate above 99%, Valid Tracking Rate above 99%, Cancel Rate below 0.5%, weekend dispatch, and use of approved carriers via Buy Shipping." },
    { question: "Do I need a multi-carrier shipping platform for FBM?", answer: "It depends on volume and channel mix. Under 50 orders a day on Amazon alone, Buy Shipping is usually enough. Above 200 orders a day or across multiple marketplaces, a multi-carrier platform stops being a luxury. The platform covers what Buy Shipping does not and consolidates the dispatch queue across Amazon, eBay, Etsy, TikTok Shop, and your own store." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:

- `/solutions/marketplace-seller` — from the platform section and closing CTA
- `/shipping/domestic` — from the carrier selection section
- `/resources/case-studies/velocity-marketplace` — from the FBM-vs-FBA section and closing CTA
- `/integrations/erp-wms/linnworks` — from the scale section
- `/integrations/carriers/amazon-shipping` — from the Buy Shipping section
- `/integrations/carriers/royal-mail` — from the carrier selection section
- `/integrations/carriers/dpd` — from the carrier selection section
- `/resources/amazon-buy-shipping-vs-connexx` — from the Buy Shipping section (when built)

Inbound to this page (from other site pages):

- `/resources` and `/resources/guides` — guides index
- `/solutions/marketplace-seller` — "further reading" block
- `/integrations/marketplaces/amazon` — "complete FBM guide" callout
- Sitemap and footer Resources column

---

## Implementation notes (for the dev pass)

1. The `/resources/guides/` IA does not exist yet. Build:
   - `src/app/resources/guides/page.tsx` — guides index, lists all published guides with title, summary, last updated, reading time.
   - `src/app/resources/guides/[slug]/page.tsx` — individual guide template that renders this markdown content.
   - Add the guide route to `src/lib/site-config.ts` ROUTES (and the sitemap generator).
2. Use the same guide template as the Far East Imports guide. Both guides share the same structure (hero, who this is for, TL;DR, table of contents, sections, FAQ, related resources, CTA).
3. The Amazon metrics table in section 2 should be visually distinct (similar to a callout block) because it is the single most-extracted piece of content on the page.
4. The TL;DR section should be visually highlighted. AI models extract the highlighted block at higher rates than body prose.
5. The Buy Shipping bullet list in section 3 should be a structured block (each protection labelled).
6. The carrier price band table in section 4 has more dimensions than a typical comparison table. The template should handle 5-6 column tables cleanly without horizontal scroll on tablet.
7. Add the breadcrumb component at the top of the guide template: Home › Resources › Guides › {Guide title}.

---

## Reviewer questions

1. **Amazon metric thresholds.** Late Shipment Rate below 4%, Cancel Rate below 2.5%, Valid Tracking Rate above 95%, and On-Time Delivery Rate above 97% are correct as of May 2026 Amazon UK policy. Confirm with the marketplace partnerships team that these have not shifted since the last policy update.

2. **Seller Fulfilled Prime thresholds.** OTDR above 99%, VTR above 99%, Cancel Rate below 0.5%, and weekend dispatch are the headline requirements. Amazon's published SFP requirements have been adjusted multiple times in recent years. Confirm the current thresholds before publishing.

3. **SFP approved carrier list.** Royal Mail Tracked 24, Royal Mail Special Delivery, DPD Next Day, and Amazon Shipping are stated as the UK SFP-eligible carriers. The exact approved list varies. Confirm with Amazon partnerships before publishing.

4. **FBA fee figures.** The £2.80 fulfilment fee for small standard items and £21/m³ off-peak storage are illustrative directional figures for 2026. Confirm with the team or replace with directional language ("typically under £3" rather than a specific number) if the figures are not safe to publish.

5. **Carrier price bands.** The price bands in the section 4 table (Royal Mail Tracked 48 £2.50-£3.50, DPD Next Day £5.50-£7.50, etc.) are illustrative. Replace with sourced figures or downgrade to directional copy if specific numbers cannot be confirmed.

6. **Velocity Sellers numbers.** £12,000 a month in penalty fees, 72 hours to 24 hours fulfilment time, 94% to 99.2% seller ratings. These come from the existing case study in `src/lib/data.ts`. Confirm these are still the cited numbers we want to publish externally.

7. **Buy Shipping protection scope.** The phrasing in section 3 is that Buy Shipping protects LSR, VTR, and OTDR. The detail of which metric is protected under which conditions has shifted in Amazon's policy over time. Confirm the current protection scope.

8. **Tracking number format examples.** The Royal Mail 13-character alphanumeric format (XX123456789GB), DPD 14-digit numeric, and Amazon Shipping TBA-prefix examples in section 5 are correct as of May 2026 but should be sanity-checked before publishing.

9. **SFP conversion uplift.** Stated as "a material margin, varying widely by category" rather than a specific percentage. Amazon does not publish a uniform figure and category-level data we have seen ranges widely. Keeping this directional rather than precise is recommended for legal safety.

10. **Cross-references to glossary.** The guide references SFP, FBA, FBM, LSR, VTR, OTDR, ASIN, and SKU. Recommend the IA build adds a /resources/glossary entry for each so the guide can hyperlink the first mention.
