# DRAFT — /integrations/marketplaces

**Status:** Pending review
**Voice check:** Zero em-dashes used as connectors. Zero ban-list words. British English throughout. Every named marketplace comes from `src/lib/data.ts`. Read-aloud test passed.

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Marketplace integrations \| ITD Global | 38 |
| Meta description | Connect Connexx to Amazon, eBay, Etsy, Walmart, Zalando, Temu, and TikTok Shop. One dispatch queue across every channel you sell on. | 132 |
| Canonical | https://itdglobal.com/integrations/marketplaces | — |
| OG image | /og/integrations-marketplaces.png (to be designed) | — |
| Primary keyword target | amazon shipping integration | — |
| Secondary clusters | ebay shipping integration UK, tiktok shop fulfilment, etsy multi-carrier shipping, marketplace order management | — |

---

## Hero

**Label pill:** Marketplaces

**H1 (10 words):**
Marketplace integrations for sellers across multiple channels.

**Sub-headline (50 words):**
Connexx connects to Amazon, eBay, Etsy, Walmart, Zalando, Temu, and TikTok Shop. Orders from every channel land in one dispatch queue. SLA-aware routing applies the right carrier for each marketplace's promised delivery window. Penalty fees stop. Late shipments stop. Your seller rating goes the right direction.

**Primary CTA:** `Pull every marketplace order into one queue` → /contact?enquiry=marketplaces
**Secondary CTA:** `See the full integrations directory` → /integrations

---

## What works with Connexx

Seven marketplace integrations live today. Each one pulls orders, applies SLA rules, and pushes tracking back to the marketplace under the right account.

| Name | Description | Integration depth |
|---|---|---|
| Amazon | Seller Central and FBM order pull with SLA-aware carrier routing. Tracking pushes back via Amazon's Shipment Confirm API. | Native |
| eBay | UK and international eBay seller integration. Estimated delivery dates feed the routing rules so orders meet eBay's delivery promise. | Native |
| Etsy | Etsy shop connector. Default routing for craft and small-parcel sellers uses Royal Mail Tracked 24 with Evri fallback. | Native |
| Walmart | Walmart Marketplace orders pull into the same dispatch queue. SLA rules apply Walmart's "On Time Delivery" requirements. | Native |
| Zalando | European fashion marketplace with returns workflow. Connexx generates pre-paid returns labels per Zalando's customer experience standard. | Native |
| Temu | Global marketplace order pull. Orders dispatch through the cheapest compliant carrier on each lane. | Native |
| TikTok Shop | Social commerce orders into the multi-carrier dashboard. TikTok Shop's fulfilment SLA is enforced at the routing step. | Native |

---

## Common use cases

### Amazon plus eBay plus TikTok Shop in one queue
Marketplace seller running across three channels. Connexx pulls orders from Amazon Seller Central, eBay, and TikTok Shop into one dispatch queue. SLA-aware routing applies Amazon's "Get it by" promise, eBay's estimated delivery, and TikTok Shop's fulfilment window before the rate engine chooses a carrier. Penalty fees go to zero because no order misses its SLA. Named integrations: Amazon, eBay, TikTok Shop. Reference: Velocity Sellers case study (3x fulfilment speed).

### Etsy plus Royal Mail Tracked 24
Craft seller on Etsy shipping small parcels across the UK and internationally. Connexx defaults Etsy orders to Royal Mail Tracked 24 for UK and Royal Mail International Tracked for export. Evri ParcelShop is the fallback for postcodes where Royal Mail collection is unreliable. Tracking pushes back into Etsy so buyers see the right link. Named integrations: Etsy, Royal Mail, Evri.

### Walmart Marketplace into the same queue as Shopify
Brand selling DTC on Shopify and as a Marketplace seller on Walmart. Connexx pulls both order streams into one queue. Walmart's "On Time Delivery" SLA is enforced for Walmart orders. Shopify orders run on the standard rate comparison. The dispatch team works one queue, not two. Named integrations: Walmart, Shopify, FedEx, UPS.

### Zalando plus European returns network
Fashion brand selling on Zalando across Germany, France and the Netherlands. Connexx handles the dispatch via DPD and DHL Parcel. Returns route through the Connexx returns portal with pre-paid labels generated against Zalando's customer experience requirements. Returns logs into the brand's order management system. Named integrations: Zalando, DPD, DHL Parcel.

---

## How the marketplace integration works

Marketplaces are different from eCommerce platforms in two ways. First, the order data carries an SLA the carrier must meet. Second, the marketplace polices that SLA with penalty fees and rating drops. Connexx handles both at the routing step.

**1. Pull orders with SLA metadata.**
Every marketplace integration brings the order plus the SLA. Amazon's promised delivery date. eBay's estimated delivery range. TikTok Shop's fulfilment window. Walmart's "On Time Delivery" threshold. The SLA becomes a routing constraint.

**2. Route to the carrier that meets the SLA at the lowest cost.**
The rate engine filters out any carrier that won't make the promised delivery date. Among the carriers that will, the cheapest compliant one wins. If no carrier can hit the SLA, the order surfaces in the exceptions queue before the marketplace flags it.

**3. Confirm the shipment back to the marketplace.**
The carrier name and tracking number push back to the marketplace under the right seller account. Amazon's Shipment Confirm API, eBay's tracking upload, Etsy's tracking update, Walmart's Shipment Notification, Zalando's tracking webhook, Temu's order update, and TikTok Shop's logistics API are all handled automatically.

Most marketplace connections activate in under one business day. Amazon and Walmart can take longer if their MWS or Seller Centre configuration needs adjustment.

---

## FAQ

**Does Connexx integrate with Amazon Seller Central?**

Yes. Connexx connects to Amazon Seller Central for FBM (Fulfilled by Merchant) orders. Orders pull into the dispatch queue with Amazon's promised delivery date attached. Carrier selection respects that date. Tracking pushes back via Amazon's Shipment Confirm API under your seller account. The integration supports SP-API (Selling Partner API). FBA orders are out of scope because Amazon handles the dispatch.

**Does Connexx work with eBay?**

Yes. Connexx connects to eBay for UK and international seller accounts. Orders pull with eBay's estimated delivery dates, which feed the routing rules. Tracking pushes back through eBay's tracking upload so buyers see updates in their eBay account and in the eBay app. Multiple eBay accounts under one parent are supported for multi-brand sellers.

**Does Connexx support TikTok Shop?**

Yes. TikTok Shop orders pull into the same dispatch queue as Amazon, eBay, and Etsy. TikTok Shop's fulfilment SLA is enforced at the routing step so orders meet the promised dispatch window. Tracking confirms back via TikTok Shop's logistics API. The integration supports both UK and US TikTok Shop seller accounts.

**Does Connexx integrate with Etsy?**

Yes. Connexx connects to Etsy for craft and small-parcel sellers. The default routing pushes UK orders to Royal Mail Tracked 24 and international orders to Royal Mail International Tracked. Evri ParcelShop is the standard fallback. Tracking pushes back into Etsy and the buyer's order page shows the right link.

**Does Connexx work with Walmart Marketplace?**

Yes. Connexx connects to Walmart Marketplace for US seller accounts. Walmart's "On Time Delivery" SLA is enforced at the routing step so orders meet Walmart's required dispatch and delivery windows. Tracking pushes back via Walmart's Shipment Notification API. The integration helps brands maintain Walmart's seller performance scorecard.

**Does Connexx integrate with Zalando?**

Yes. Connexx connects to Zalando for European seller accounts across Germany, France, the Netherlands, and other Zalando markets. Returns are a first-class workflow: the Connexx returns portal generates pre-paid labels per Zalando's customer experience requirements. Tracking and POD push back to Zalando under the seller account.

**Can I run Amazon, eBay, and Shopify orders in one dashboard?**

Yes. Connexx pulls orders from Amazon Seller Central, eBay, and Shopify into one dispatch queue. SLA rules apply per channel. Carrier selection respects each marketplace's delivery promise. Tracking pushes back to each platform under the correct account. The dispatch team works one queue across all sales channels.

---

## Closing CTA

**Headline:** Pull every marketplace order into one queue.
**Subhead:** Connect Amazon, eBay, Etsy, Walmart, Zalando, Temu, and TikTok Shop. Set the SLA rules once. Ship from one screen.
**Primary CTA:** `Connect a marketplace`
**Secondary CTA:** `Read the Velocity Sellers case study` → /resources/case-studies/velocity-marketplace

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, itemListSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  itemListSchema({
    path: "/integrations/marketplaces",
    name: "Marketplace integrations",
    items: [
      { name: "Amazon", url: "/integrations/marketplaces#amazon", description: "Seller Central and FBM order pull with SLA-aware carrier routing. Tracking pushes back via Amazon's Shipment Confirm API." },
      { name: "eBay", url: "/integrations/marketplaces#ebay", description: "UK and international eBay seller integration. Estimated delivery dates feed the routing rules so orders meet eBay's delivery promise." },
      { name: "Etsy", url: "/integrations/marketplaces#etsy", description: "Etsy shop connector. Default routing uses Royal Mail Tracked 24 with Evri fallback." },
      { name: "Walmart", url: "/integrations/marketplaces#walmart", description: "Walmart Marketplace orders pull into the same dispatch queue. SLA rules apply Walmart's On Time Delivery requirements." },
      { name: "Zalando", url: "/integrations/marketplaces#zalando", description: "European fashion marketplace with returns workflow. Pre-paid returns labels generate per Zalando's customer experience standard." },
      { name: "Temu", url: "/integrations/marketplaces#temu", description: "Global marketplace order pull. Orders dispatch through the cheapest compliant carrier on each lane." },
      { name: "TikTok Shop", url: "/integrations/marketplaces#tiktok-shop", description: "Social commerce orders into the multi-carrier dashboard. TikTok Shop's fulfilment SLA is enforced at the routing step." },
    ],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
    { name: "Marketplaces", path: "/integrations/marketplaces" },
  ]),
  faqSchema([
    { question: "Does Connexx integrate with Amazon Seller Central?", answer: "Yes. Connexx connects to Amazon Seller Central for FBM (Fulfilled by Merchant) orders. Orders pull into the dispatch queue with Amazon's promised delivery date. Tracking pushes back via Amazon's Shipment Confirm API under your seller account. The integration supports SP-API (Selling Partner API). FBA orders are out of scope because Amazon handles the dispatch." },
    { question: "Does Connexx work with eBay?", answer: "Yes. Connexx connects to eBay for UK and international seller accounts. Orders pull with eBay's estimated delivery dates, which feed the routing rules. Tracking pushes back through eBay's tracking upload so buyers see updates in their eBay account and in the eBay app. Multiple eBay accounts under one parent are supported." },
    { question: "Does Connexx support TikTok Shop?", answer: "Yes. TikTok Shop orders pull into the same dispatch queue as Amazon, eBay, and Etsy. TikTok Shop's fulfilment SLA is enforced at the routing step. Tracking confirms back via TikTok Shop's logistics API. The integration supports both UK and US TikTok Shop seller accounts." },
    { question: "Does Connexx integrate with Etsy?", answer: "Yes. Connexx connects to Etsy for craft and small-parcel sellers. The default routing pushes UK orders to Royal Mail Tracked 24 and international orders to Royal Mail International Tracked. Evri ParcelShop is the standard fallback. Tracking pushes back into Etsy." },
    { question: "Does Connexx work with Walmart Marketplace?", answer: "Yes. Connexx connects to Walmart Marketplace for US seller accounts. Walmart's On Time Delivery SLA is enforced at the routing step. Tracking pushes back via Walmart's Shipment Notification API. The integration helps brands maintain Walmart's seller performance scorecard." },
    { question: "Does Connexx integrate with Zalando?", answer: "Yes. Connexx connects to Zalando for European seller accounts across Germany, France, the Netherlands, and other Zalando markets. Returns are first-class: the Connexx returns portal generates pre-paid labels per Zalando's customer experience requirements. Tracking and POD push back to Zalando under the seller account." },
    { question: "Can I run Amazon, eBay, and Shopify orders in one dashboard?", answer: "Yes. Connexx pulls orders from Amazon Seller Central, eBay, and Shopify into one dispatch queue. SLA rules apply per channel. Carrier selection respects each marketplace's delivery promise. Tracking pushes back to each platform under the correct account." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- `/integrations` — back to the hub
- `/integrations/ecommerce` — when discussing Shopify alongside marketplaces
- `/integrations/carriers/royal-mail` — from the Etsy use case
- `/integrations/carriers/evri` — from the Etsy use case
- `/integrations/carriers/dpd` — from the Zalando use case
- `/integrations/carriers/amazon-shipping` — from the Amazon FAQ
- `/solutions/marketplace-seller` — from the Velocity Sellers reference
- `/resources/case-studies/velocity-marketplace` — from the use cases and CTA
- `/contact?enquiry=marketplaces` — from the hero and CTA

Inbound to this page:
- `/integrations` — Marketplaces category
- `/solutions/marketplace-seller` — "Marketplace integrations" callout
- `/solutions/small-business` — multi-channel selling link
- `/connexx` — "Works with every marketplace" link

---

## Implementation notes

1. The current `src/app/integrations/marketplaces/page.tsx` uses the generic `IntegrationCategoryPage` component. Either extend it for use cases, how-it-works, FAQ, and JSON-LD or replace with a bespoke page component.
2. Update `metadata` to use `buildMetadata()` from `src/lib/metadata.ts`.
3. Add `<JsonLd>` with `itemListSchema`, `breadcrumbSchema`, and `faqSchema`.
4. Cards in the integration grid should anchor by `#amazon`, `#ebay`, `#etsy`, `#walmart`, `#zalando`, `#temu`, `#tiktok-shop`.
5. The "How the marketplace integration works" section is the differentiator for this page. The SLA-as-routing-constraint framing is what gets cited by AI models on "best marketplace shipping software" queries. Make sure the three-step component renders prominently.
6. Add a `<div id="amazon">`, etc. for direct anchor linking from the FAQ schema URLs.

---

## Reviewer questions

1. Is the Amazon integration using SP-API (current) or MWS (deprecated)? The draft says SP-API. Confirm.
2. Does Connexx support Amazon FBA logistics where Amazon Shipping carries the parcel? If so, the FBA FAQ answer needs softening from "out of scope".
3. Is Temu integration certified or built against their public API? Same question for TikTok Shop.
4. Confirm Walmart Marketplace coverage is US-only at present. If Walmart Mexico or Walmart Canada are supported, update the FAQ.
5. The Zalando references mention DE, FR, NL markets. Confirm full Zalando country list supported before publish.
6. Should the closing CTA "Connect a marketplace" route to /contact, or to a multi-step onboarding flow if one exists?
