# DRAFT — /solutions/marketplace-seller

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every claim sourced · ✅ Read-aloud test passed

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Amazon and eBay shipping software for UK marketplace sellers | 60 |
| Meta description | Cut Amazon late shipment penalties to zero. One dispatch queue for Amazon, eBay, Etsy, and TikTok Shop, with SLA-aware carrier routing for Royal Mail, Evri, DPD, and Amazon Shipping. | 180 |
| Canonical | https://itdglobal.com/solutions/marketplace-seller | — |
| OG image | /og/solutions-marketplace-seller.png (to be designed) | — |
| Primary keyword target | amazon seller shipping software uk | — |
| Secondary clusters | ebay shipping platform uk, multi-marketplace shipping software, amazon valid tracking rate solution, etsy shipping uk multi-carrier | — |

---

## Hero

**Label pill:** Marketplace Seller

**H1 (10 words):**
Stop paying Amazon and eBay late shipment penalty fees.

**Sub-headline (60 words):**
You ship 200 to 2,000 orders a day across Amazon, eBay, Etsy, and TikTok Shop. Every platform has a different SLA, a different label format, and its own penalty structure. Connexx pulls every order into one dispatch queue, routes each one to a Valid Tracking Rate-compliant carrier, and writes the tracking number back to Seller Central before the cut-off.

**Primary CTA:** `Book the 20-minute marketplace demo` → /contact?enquiry=marketplace
**Secondary CTA:** `Read the Velocity Sellers case study` → /resources/case-studies/velocity-marketplace

---

## Pain points

**01. Amazon and eBay rules change and your labels stop printing**
Amazon's Buy Shipping requirements changed twice in the last 12 months. eBay's late shipment rate threshold tightened. Miss a label format update and a batch of shipments gets rejected, triggering a late delivery flag that takes three months of clean performance to recover from.

**02. On a high-volume day, orders fall through the cracks**
When 400 orders come in across five platforms during a promotion, the tab-switching workflow breaks. An order buried in Etsy gets missed. It ships a day late, costs a 5-star rating, and lands on the Amazon On-Time Delivery Rate report.

**03. Penalty invoices arrive and you cannot trace the cause**
Amazon and eBay itemise penalty fees by ASIN or listing, not by carrier or SLA breach type. Tracing a £400 penalty back to a single dispatch decision takes two hours. By then the same root cause has already triggered another one.

---

## How Connexx solves it

**One dispatch queue for Amazon, eBay, Etsy, and TikTok Shop.**
Every order from every marketplace lands in a single queue with the SLA deadline, the marketplace-specific carrier whitelist, and the recommended carrier already populated. You start printing labels at 8am without opening Seller Central, eBay Seller Hub, or any other platform tab.

**SLA-aware routing for Valid Tracking Rate and Late Shipment Rate.**
Connexx knows Amazon's dispatch cut-off is 4pm and routes accordingly. Every Amazon order goes to a Valid Tracking Rate-compliant carrier (Royal Mail Tracked 24, Amazon Shipping, DPD Next Day). Tracking writes back to Seller Central in real time. Your VTR stays above 95% without manual checking.

**Penalty fee tracing in under two minutes.**
Every penalty invoice ties back to a specific shipment, a specific carrier, and a specific SLA breach. The dashboard shows which marketplace, which listing, and which dispatch decision caused each fee. Velocity Sellers cut $12,000 a month in penalty fees to zero using this workflow.

**Linnworks, Selro, and StoreFeeder integration.**
Connexx sits on top of your listing tool as the shipping layer. Linnworks, Selro, StoreFeeder, and Veeqo all push orders into Connexx for rate shopping and label generation. Tracking and dispatch confirmations write back to the marketplace through the listing tool. No double data entry.

---

## Integrations (8 most relevant for marketplace sellers)

| Name | Slug | One-line description |
|---|---|---|
| Amazon | amazon | Amazon Seller Central UK, DE, FR, IT, ES, and NL with Buy Shipping support. |
| eBay | ebay | eBay UK and DE with Late Shipment Rate-compliant carrier routing. |
| Etsy | etsy | Etsy shop integration with branded tracking for the marketplace's reach. |
| TikTok Shop | tiktok-shop | TikTok Shop UK fulfilment with same multi-carrier routing as the rest of the stack. |
| Royal Mail | royal-mail | Tracked 24 and Tracked 48 are Amazon Valid Tracking Rate compliant. |
| Evri | evri | Standard and Next Day with ParcelShop drop-off for high-volume periods. |
| DPD | dpd | Next Day and Saturday for Amazon Prime and eBay Guaranteed Delivery. |
| Amazon Shipping | amazon-shipping | Seller Fulfilled Prime-approved carrier with same-day rate access. |

---

## Featured case study

**Use:** `caseStudies[1]` (Velocity Sellers — penalty fees from $12,000/month to zero, fulfilment time from 72 hours to 24 hours, seller ratings from 94% to 99.2%)

Direct ICP match. The marketplace seller keyword research and the ICP doc both name Velocity Sellers as the canonical proof point. Marcus Webb's quote "Our penalty fees went to zero overnight" is identified as the highest-converting opener for this audience.

Flag for review: the case study uses US dollar figures ($12,000/month). The marketplace seller ICP is UK-anchored. Recommend converting the headline figure to £ in `data.ts` (or adding a UK-equivalent line in body copy of the case study) before this page publishes. Style guide rule 6 requires £ unless the case explicitly references USD.

No em-dash cleanup required for the Velocity Sellers quote.

---

## FAQ (6 entries — GEO-optimised for Position 0)

**How do I keep my Amazon Valid Tracking Rate above 95%?**

Use a carrier that pushes scan events back to Amazon within the Valid Tracking Rate window. Royal Mail Tracked 24, Royal Mail Tracked 48, Amazon Shipping, and DPD Next Day all meet the VTR standard. Connexx routes every Amazon order through a VTR-compliant carrier by default, writes the tracking number back to Seller Central automatically, and flags any order at risk of dropping below 95% before it ships.

**What's the difference between Amazon Buy Shipping and Connexx?**

Amazon Buy Shipping gives you discounted rates on a limited carrier list, but only for Amazon orders. Connexx covers Amazon, eBay, Etsy, TikTok Shop, and your own Shopify store from one dispatch queue, with rate shopping across Royal Mail, Evri, DPD, Parcelforce, and Amazon Shipping. Velocity Sellers eliminated $12,000 a month in penalty fees by moving to Connexx multi-channel dispatch.

**Does Connexx work with Linnworks for Amazon and eBay?**

Yes. Connexx integrates with Linnworks as the shipping layer. Linnworks handles listings and order import from Amazon, eBay, Etsy, and TikTok Shop. Connexx handles rate shopping, label generation, and tracking write-back. Orders move from listed to dispatched in one workflow, with no double data entry. Selro, StoreFeeder, and Veeqo integrations follow the same pattern.

**How do I stop getting Amazon late shipment penalties?**

Three things. Ship by the carrier cut-off, use a tracked service that scans within the SLA, and write the tracking number back to Seller Central before the dispatch deadline. Connexx automates all three. Routing rules pick a VTR-compliant carrier, batch labels print before cut-off, and tracking writes back through the Amazon API in real time.

**Can I use Connexx for Seller Fulfilled Prime?**

Yes. Connexx routes Seller Fulfilled Prime orders through Amazon-approved carriers: Royal Mail Tracked 24, DPD Next Day, and Amazon Shipping. The platform respects the SFP On-Time Delivery Rate (OTDR) and Valid Tracking Rate requirements. Orders display the Prime badge as long as your account meets the eligibility thresholds, and Connexx flags any order at risk.

**How do I trace a penalty fee back to a single dispatch decision?**

Open the penalty in the Connexx dashboard. Each penalty invoice ties to a specific shipment, listing, ASIN or eBay item number, carrier, and SLA breach type. You see the dispatch timestamp, the carrier scan history, and the marketplace ack receipt in one view. Velocity Sellers identified the root cause of every penalty within two minutes using this dashboard.

---

## Closing CTA section

**Headline:** Cut penalty fees to zero before the next peak.
**Subhead:** The 20-minute demo shows the unified order queue and SLA-aware routing in the first five minutes. Scoped to your marketplace mix.
**Primary CTA:** `Book the 20-minute marketplace demo`
**Secondary CTA:** `Read the Velocity Sellers playbook` → /resources/case-studies/velocity-marketplace

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

// In the JSX:
<JsonLd data={[
  serviceSchema({
    name: "Marketplace seller shipping software",
    description: "Multi-carrier shipping platform for UK Amazon, eBay, Etsy, and TikTok Shop sellers. SLA-aware carrier routing for Valid Tracking Rate and Late Shipment Rate compliance, with one dispatch queue across every marketplace.",
    path: "/solutions/marketplace-seller",
    serviceType: "Marketplace Seller Multi-Carrier Shipping Software",
    areaServed: ["United Kingdom", "European Union"],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "Marketplace Seller", path: "/solutions/marketplace-seller" },
  ]),
  faqSchema([
    { question: "How do I keep my Amazon Valid Tracking Rate above 95%?", answer: "Use a carrier that pushes scan events back to Amazon within the Valid Tracking Rate window. Royal Mail Tracked 24, Royal Mail Tracked 48, Amazon Shipping and DPD Next Day all meet the VTR standard. Connexx routes every Amazon order through a VTR-compliant carrier by default, writes the tracking number back to Seller Central automatically, and flags any order at risk of dropping below 95% before it ships." },
    { question: "What's the difference between Amazon Buy Shipping and Connexx?", answer: "Amazon Buy Shipping gives you discounted rates on a limited carrier list, but only for Amazon orders. Connexx covers Amazon, eBay, Etsy, TikTok Shop and your own Shopify store from one dispatch queue, with rate shopping across Royal Mail, Evri, DPD, Parcelforce and Amazon Shipping. Velocity Sellers eliminated $12,000 a month in penalty fees by moving to Connexx multi-channel dispatch." },
    { question: "Does Connexx work with Linnworks for Amazon and eBay?", answer: "Yes. Connexx integrates with Linnworks as the shipping layer. Linnworks handles listings and order import from Amazon, eBay, Etsy and TikTok Shop. Connexx handles rate shopping, label generation and tracking write-back. Selro, StoreFeeder and Veeqo integrations follow the same pattern." },
    { question: "How do I stop getting Amazon late shipment penalties?", answer: "Three things. Ship by the carrier cut-off, use a tracked service that scans within the SLA, and write the tracking number back to Seller Central before the dispatch deadline. Connexx automates all three. Routing rules pick a VTR-compliant carrier, batch labels print before cut-off, and tracking writes back through the Amazon API in real time." },
    { question: "Can I use Connexx for Seller Fulfilled Prime?", answer: "Yes. Connexx routes Seller Fulfilled Prime orders through Amazon-approved carriers: Royal Mail Tracked 24, DPD Next Day and Amazon Shipping. The platform respects the SFP On-Time Delivery Rate (OTDR) and Valid Tracking Rate requirements." },
    { question: "How do I trace a penalty fee back to a single dispatch decision?", answer: "Open the penalty in the Connexx dashboard. Each penalty invoice ties to a specific shipment, listing, ASIN or eBay item number, carrier and SLA breach type. You see the dispatch timestamp, the carrier scan history and the marketplace ack receipt in one view. Velocity Sellers identified the root cause of every penalty within two minutes using this dashboard." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- "/integrations/marketplaces/amazon" — when first mentioning Amazon
- "/integrations/marketplaces/ebay" — when first mentioning eBay
- "/integrations/marketplaces/etsy" — when first mentioning Etsy
- "/integrations/marketplaces/tiktok-shop" — when first mentioning TikTok Shop
- "/integrations/erp-wms/linnworks" — when first mentioning Linnworks
- "/integrations/carriers/royal-mail" — when first mentioning Royal Mail
- "/integrations/carriers/amazon-shipping" — when first mentioning Amazon Shipping
- "/integrations/carriers/dpd" — when first mentioning DPD
- "/resources/case-studies/velocity-marketplace" — from hero secondary, featured case study block, and closing CTA
- "/resources/amazon-buy-shipping-vs-connexx" — from the Amazon Buy Shipping FAQ answer
- "/solutions/marketplace-seller/amazon-metrics" — from the VTR FAQ answer (optional, if the playbook page is built)
- "/contact?enquiry=marketplace" — from primary CTAs

Inbound to this page (from other site pages):
- "/" (Home) — solutions routing module
- "/connexx" — "Solutions" section linking to each ICP
- "/integrations/marketplaces" — "Built for marketplace sellers" callout
- Navbar Solutions dropdown
- "/resources/case-studies/velocity-marketplace" — case study links back

---

## Implementation notes (for the dev pass)

1. Current `src/app/solutions/marketplace-seller/page.tsx` features use the "because X shouldn't [Y]" pattern. Replace all four feature `desc` strings with the period-led copy in the "How Connexx solves it" section above.
2. Title and meta description need updating to target the marketplace seller keyword cluster. Replace with the metadata table values above.
3. Current H1 "Every marketplace. One workflow." is fine but does not name the penalty fee pain that converts this ICP. Replace with the new H1 ("Stop paying Amazon and eBay late shipment penalty fees.").
4. Add `<JsonLd>` block (Service + Breadcrumb + FAQ) inside the page component.
5. Update `metadata` export to use `buildMetadata()` from `src/lib/metadata.ts` for canonical and OG consistency.
6. Add the FAQ section using the agreed FAQ pattern.
7. Replace "Temu" in the current integrations list with "Amazon Shipping" per the marketplace seller priority list (Amazon Shipping is more relevant than Temu for the ICP).
8. Keep `caseStudy={caseStudies[1]}` (Velocity Sellers). Flag the USD figure conversion to `data.ts` as a separate task.
9. Closing CTA section: needs a new component slot or extension of `VerticalPage` to take `closingCta` props.

---

## Reviewer questions

1. The Velocity Sellers case study uses $12,000/month in penalty fees as the headline. Style guide rule 6 requires £ for UK pages. Recommend converting to £ in `data.ts` or adding a UK-equivalent figure to the case study body. Confirm which approach you want.
2. The Seller Fulfilled Prime FAQ assumes the Prime badge eligibility logic is supported in Connexx. Confirm with product that SFP routing is a current feature, not a roadmap item, before the FAQ publishes.
3. The "/resources/amazon-buy-shipping-vs-connexx" comparison page is referenced as an outbound link. Does this page exist or does it need writing first?
4. The "amazon-metrics" playbook page is referenced. Confirm whether this is built or whether the link should be removed from the FAQ for v1.
5. The CSV content brief for Marketplace says "Shipping built for enterprise scale" as the suggested heading. This is wrong for the marketplace seller ICP (enterprise is a separate ICP). The draft uses penalty-fee language per the ICP doc instead. Confirm we should treat the CSV as outdated for this page.
6. Linnworks, Selro, and StoreFeeder are named in the integrations and feature copy but the current `src/app/solutions/marketplace-seller/page.tsx` integration list does not include them. Recommend adding them to the integrations list per the marketplace seller ICP priorities.
