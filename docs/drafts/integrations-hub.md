# DRAFT — /integrations

**Status:** Pending review
**Voice check:** Zero em-dashes used as connectors. Zero ban-list words. British English throughout. Every named integration ties back to `src/lib/data.ts`. Read-aloud test passed.

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Integrations directory for Connexx shipping software | 53 |
| Meta description | Connexx connects to 26 ERP, WMS, eCommerce, and marketplace tools plus 18 carriers across the UK, EU, and global. One stack, every dispatch. | 142 |
| Canonical | https://itdglobal.com/integrations | — |
| OG image | /og/integrations-hub.png (to be designed) | — |
| Primary keyword target | shipping software integrations | — |
| Secondary clusters | multi-carrier integration, ecommerce shipping integration, ERP shipping integration | — |

---

## Hero

**Label pill:** Integrations

**H1 (10 words):**
Every integration you need to dispatch on Connexx.

**Sub-headline (52 words):**
Connexx connects to 26 ERP, WMS, eCommerce, and marketplace tools and 18 carriers across the UK, EU, and the rest of the world. Orders flow in. Labels print out. Tracking syncs back. No CSV exports, no parallel portals, no copy-paste between systems your team already pays for.

**Primary CTA:** `See if your stack is supported` → scrolls to filterable catalogue
**Secondary CTA:** `Book a 20-minute integration review` → /contact?enquiry=integrations

---

## What works with Connexx (the catalogue)

The page renders all 44 integrations as a filterable grid. Filters: All, ERP and WMS, Logistics, eCommerce, Marketplaces, Carriers. The data lives in `src/lib/data.ts` and is the single source of truth for this section.

### ERP and WMS (11)

| Name | Description | Status |
|---|---|---|
| SAP | Enterprise ERP integration with order and shipping write-back. | Native |
| Oracle NetSuite | Cloud ERP connector for SuiteCommerce and stand-alone ERP. | Native |
| Microsoft Dynamics | Dynamics 365 Business Central and Finance & Operations. | Native |
| Sage | Sage 50, Sage 200, and Sage Intacct accounting and ERP. | Native |
| Cin7 | Inventory and warehouse management for multi-channel sellers. | Native |
| Linnworks | Multi-channel order and inventory management. | Native |
| Mintsoft | Warehouse management system for 3PLs and brand fulfilment. | Native |
| Selro | Multi-channel listing and order management. | Native |
| ShipHero | Warehouse and shipping management for 3PLs and brands. | Native |
| StoreFeeder | Multi-channel listing and order management for retailers. | Native |
| Veeqo | Inventory and shipping platform owned by Amazon. | Native |

Full ERP and WMS page: `/integrations/erp-wms`.

### Logistics (4)

| Name | Description | Status |
|---|---|---|
| ShipStation | Shipping automation. Connexx runs alongside or replaces it. | Native |
| Shippo | Multi-carrier shipping API. | Native |
| Freightview | Freight rate comparison for LTL and FTL. | Native |
| Project44 | Supply chain visibility for in-transit shipments. | Native |

Full logistics page: `/integrations/logistics`.

### eCommerce (4)

| Name | Description | Status |
|---|---|---|
| Shopify | Direct app. Orders flow in within seconds of checkout. | Native |
| WooCommerce | WordPress plugin. Multi-carrier shipping inside the WP admin. | Native |
| Magento | Adobe Commerce and Magento 2 with multi-carrier routing rules. | Native |
| BigCommerce | SaaS storefronts route every order through Connexx for rate comparison. | Native |

Full eCommerce page: `/integrations/ecommerce`.

### Marketplaces (7)

| Name | Description | Status |
|---|---|---|
| Amazon | Seller Central and FBM order pull with SLA-aware routing. | Native |
| eBay | UK and international eBay seller integration. | Native |
| Etsy | Etsy shop connector with Tracked 24 and Royal Mail defaults. | Native |
| Walmart | Walmart Marketplace orders into the same dispatch queue. | Native |
| Zalando | European fashion marketplace with returns workflow. | Native |
| Temu | Global marketplace order pull. | Native |
| TikTok Shop | Social commerce orders into the multi-carrier dashboard. | Native |

Full marketplaces page: `/integrations/marketplaces`.

### Carriers (18)

| Name | Region | Description | Status |
|---|---|---|---|
| Royal Mail | UK | Tracked 24, Tracked 48, Signed, First and Second Class. | Native |
| DPD | EU | Next Day, Two Day, Saturday across the UK and EU. | Native |
| Evri | UK | ParcelShop drop-off and standard parcel delivery. | Native |
| Parcel Force | UK | UK tracked parcel delivery for heavier and timed services. | Native |
| Yodel | UK | UK delivery across standard and next-day services. | Native |
| Amazon Shipping | UK | Amazon's domestic delivery network. | Native |
| DHL Express | Global | International express to 220+ countries. | Native |
| FedEx | Global | Global parcel and freight services. | Native |
| UPS | Global | Worldwide parcel and freight delivery. | Native |
| TNT | EU | European express, integrated post-acquisition by FedEx. | Native |
| Aramex | Global | Middle East and global parcel network. | Native |
| PostNL | EU | Netherlands and EU postal services. | Native |
| GLS | EU | European parcel network. | Native |
| Australia Post | Global | Australian domestic and international post. | Native |
| DHL Parcel | EU | European parcel delivery for B2C volume. | Native |
| Deutsche Post | EU | German postal and Warenpost services. | Native |
| Evri EU | EU | European parcel delivery via the Evri network. | Native |
| InPost | EU | Parcel locker network across the UK and EU. | Native |

---

## Common use cases

### Shopify plus Royal Mail and DPD
Online retailer running on Shopify with negotiated rates at Royal Mail and DPD. Orders pull into Connexx within seconds of checkout. The rate engine picks the cheaper compliant carrier for each parcel based on weight, postcode, and service level. Tracking pushes back into Shopify so the customer sees the right link in the order confirmation. Named integrations: Shopify, Royal Mail, DPD.

### SAP plus DHL Express for cross-border B2B
Manufacturer running SAP for orders and finance. Connexx pulls confirmed orders from SAP, runs the customs paperwork against the HS codes already in the SAP product master, and books DHL Express for the international leg. Tracking and POD write back into SAP for the AR team. Named integrations: SAP, DHL Express.

### Linnworks plus seven UK carriers
Multi-channel seller using Linnworks for inventory and order management. Connexx replaces the carrier integrations inside Linnworks with a single connection that exposes Royal Mail, DPD, Evri, Yodel, Parcel Force, Amazon Shipping, and DHL Express. The seller stops paying per-carrier integration fees inside Linnworks and gets rate comparison on every dispatch. Named integrations: Linnworks, Royal Mail, DPD, Evri, Yodel, Parcel Force, Amazon Shipping, DHL Express.

### Amazon plus eBay plus TikTok Shop into one queue
Marketplace seller across three channels. Connexx pulls orders from Amazon Seller Central, eBay, and TikTok Shop into one dispatch queue. SLA-aware routing applies Amazon's "Get it by" promise, eBay's estimated delivery, and TikTok Shop's fulfilment window before the rate engine chooses a carrier. Penalty fees go to zero because no order misses its SLA. Named integrations: Amazon, eBay, TikTok Shop.

---

## How the integration works

Three steps. The same flow whether you're connecting an ERP, an online store, or a carrier account.

**1. Connect.**
Connexx supports OAuth, API key, and SFTP connections. Most ERP and eCommerce connectors take under 10 minutes to authorise. Carrier accounts use your existing rate cards and child accounts.

**2. Configure.**
Map your products, your service levels, and your routing rules. The platform ships with sensible defaults for UK and EU dispatch. You override per market, per product, or per customer segment.

**3. Dispatch.**
Orders flow in. Labels print out. Tracking syncs back. Exceptions surface in one dashboard. The team works in Connexx, not in the underlying portals.

---

## FAQ

**What does Connexx integrate with?**

Connexx connects to 26 ERP, WMS, eCommerce, and marketplace tools and 18 carriers. The full list includes SAP, Oracle NetSuite, Microsoft Dynamics, Sage, Cin7, Linnworks, Mintsoft, Selro, ShipHero, StoreFeeder, Veeqo, Shopify, WooCommerce, Magento, BigCommerce, Amazon, eBay, Etsy, Walmart, Zalando, Temu, TikTok Shop, ShipStation, Shippo, Freightview, and Project44. The carrier list includes Royal Mail, DPD, Evri, Parcel Force, Yodel, Amazon Shipping, DHL Express, FedEx, UPS, TNT, Aramex, PostNL, GLS, Australia Post, DHL Parcel, Deutsche Post, Evri EU, and InPost.

**Does Connexx have a public API?**

Yes. Connexx exposes a REST API for order creation, label generation, rate quoting, tracking, and returns. The API documentation is published with example requests for every endpoint. Custom integrations beyond the standard connector list use the same API. We also expose webhooks for tracking, exception, and POD events so your downstream systems stay in sync without polling.

**How long does it take to set up a new integration?**

Most Shopify and WooCommerce stores are live in under 10 minutes through the native app. ERP-connected setups across SAP, Oracle NetSuite, Microsoft Dynamics, and Sage take three to five business days depending on the scope of write-back required. Carrier accounts activate as soon as the rate card is loaded and a label-printing test passes.

**Can I use my own negotiated carrier rates?**

Yes. Connexx supports your existing carrier accounts and rate cards across Royal Mail, DPD, Evri, Parcel Force, Yodel, Amazon Shipping, DHL Express, FedEx, UPS, and the other carriers in the list. If your contracts are weak, ITD's combined volume across thousands of UK shippers unlocks better rates. You keep the relationship, we improve the price.

**Do I need to leave my current ERP or eCommerce platform?**

No. Connexx sits alongside SAP, Oracle NetSuite, Microsoft Dynamics, Sage, Shopify, WooCommerce, Magento, BigCommerce, Linnworks, Mintsoft, Veeqo, ShipHero, StoreFeeder, and Selro. Orders flow in from the system of record. Dispatch happens in Connexx. The system of record stays the system of record.

**What if my carrier isn't on the list?**

We add new carriers on request. Most onboardings take two to four weeks depending on the carrier's API maturity. If you have a regional or niche carrier we don't currently support, send the name and contract details and we'll scope the work.

**Does Connexx replace ShipStation?**

It can. Many customers move from ShipStation to Connexx for the rate comparison, customs automation, and UK and EU carrier depth. Others keep ShipStation for non-UK volume and use Connexx for everything UK and EU. Both setups are supported.

---

## Closing CTA

**Headline:** Find out if your stack already works with Connexx.
**Subhead:** Send us the tools you run today. We'll tell you what's plug-and-play, what needs configuration, and what we'll build.
**Primary CTA:** `Book a 20-minute integration review`
**Secondary CTA:** `See the carrier list` → /integrations#carriers

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, itemListSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  itemListSchema({
    path: "/integrations",
    name: "Connexx integrations directory",
    items: [
      { name: "SAP", url: "/integrations/erp-wms#sap", description: "Enterprise ERP integration with order and shipping write-back." },
      { name: "Oracle NetSuite", url: "/integrations/erp-wms#netsuite", description: "Cloud ERP connector for SuiteCommerce and stand-alone ERP." },
      { name: "Microsoft Dynamics", url: "/integrations/erp-wms#dynamics", description: "Dynamics 365 Business Central and Finance & Operations." },
      { name: "Sage", url: "/integrations/erp-wms#sage", description: "Sage 50, Sage 200, and Sage Intacct accounting and ERP." },
      { name: "Cin7", url: "/integrations/erp-wms#cin7", description: "Inventory and warehouse management for multi-channel sellers." },
      { name: "Linnworks", url: "/integrations/erp-wms#linnworks", description: "Multi-channel order and inventory management." },
      { name: "Mintsoft", url: "/integrations/erp-wms#mintsoft", description: "Warehouse management system for 3PLs and brand fulfilment." },
      { name: "Selro", url: "/integrations/erp-wms#selro", description: "Multi-channel listing and order management." },
      { name: "ShipHero", url: "/integrations/erp-wms#shiphero", description: "Warehouse and shipping management for 3PLs and brands." },
      { name: "StoreFeeder", url: "/integrations/erp-wms#storefeeder", description: "Multi-channel listing and order management for retailers." },
      { name: "Veeqo", url: "/integrations/erp-wms#veeqo", description: "Inventory and shipping platform owned by Amazon." },
      { name: "ShipStation", url: "/integrations/logistics#shipstation", description: "Shipping automation Connexx runs alongside or replaces." },
      { name: "Shippo", url: "/integrations/logistics#shippo", description: "Multi-carrier shipping API." },
      { name: "Freightview", url: "/integrations/logistics#freightview", description: "Freight rate comparison for LTL and FTL." },
      { name: "Project44", url: "/integrations/logistics#project44", description: "Supply chain visibility for in-transit shipments." },
      { name: "Shopify", url: "/integrations/ecommerce#shopify", description: "Direct app. Orders flow in within seconds of checkout." },
      { name: "WooCommerce", url: "/integrations/ecommerce#woocommerce", description: "WordPress plugin. Multi-carrier shipping inside the WP admin." },
      { name: "Magento", url: "/integrations/ecommerce#magento", description: "Adobe Commerce and Magento 2 with multi-carrier routing rules." },
      { name: "BigCommerce", url: "/integrations/ecommerce#bigcommerce", description: "SaaS storefronts route every order through Connexx." },
      { name: "Amazon", url: "/integrations/marketplaces#amazon", description: "Seller Central and FBM order pull with SLA-aware routing." },
      { name: "eBay", url: "/integrations/marketplaces#ebay", description: "UK and international eBay seller integration." },
      { name: "Etsy", url: "/integrations/marketplaces#etsy", description: "Etsy shop connector with Tracked 24 and Royal Mail defaults." },
      { name: "Walmart", url: "/integrations/marketplaces#walmart", description: "Walmart Marketplace orders into the same dispatch queue." },
      { name: "Zalando", url: "/integrations/marketplaces#zalando", description: "European fashion marketplace with returns workflow." },
      { name: "Temu", url: "/integrations/marketplaces#temu", description: "Global marketplace order pull." },
      { name: "TikTok Shop", url: "/integrations/marketplaces#tiktok-shop", description: "Social commerce orders into the multi-carrier dashboard." },
    ],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
  ]),
  faqSchema([
    { question: "What does Connexx integrate with?", answer: "Connexx connects to 26 ERP, WMS, eCommerce, and marketplace tools and 18 carriers. The list includes SAP, Oracle NetSuite, Microsoft Dynamics, Sage, Cin7, Linnworks, Mintsoft, Selro, ShipHero, StoreFeeder, Veeqo, Shopify, WooCommerce, Magento, BigCommerce, Amazon, eBay, Etsy, Walmart, Zalando, Temu, TikTok Shop, ShipStation, Shippo, Freightview, and Project44." },
    { question: "Does Connexx have a public API?", answer: "Yes. Connexx exposes a REST API for order creation, label generation, rate quoting, tracking, and returns. The documentation is published with example requests for every endpoint. Webhooks cover tracking, exception, and POD events." },
    { question: "How long does it take to set up a new integration?", answer: "Most Shopify and WooCommerce stores are live in under 10 minutes through the native app. ERP-connected setups across SAP, Oracle NetSuite, Microsoft Dynamics, and Sage take three to five business days depending on write-back scope." },
    { question: "Can I use my own negotiated carrier rates?", answer: "Yes. Connexx supports your existing carrier accounts and rate cards across Royal Mail, DPD, Evri, Parcel Force, Yodel, Amazon Shipping, DHL Express, FedEx, UPS, and the other carriers in the list. ITD's volume unlocks better rates if your contracts are weak." },
    { question: "Do I need to leave my current ERP or eCommerce platform?", answer: "No. Connexx sits alongside SAP, Oracle NetSuite, Microsoft Dynamics, Sage, Shopify, WooCommerce, Magento, BigCommerce, Linnworks, Mintsoft, Veeqo, ShipHero, StoreFeeder, and Selro. The system of record stays the system of record." },
    { question: "What if my carrier isn't on the list?", answer: "We add new carriers on request. Most onboardings take two to four weeks depending on the carrier's API maturity. Send the carrier name and contract details and we'll scope the work." },
    { question: "Does Connexx replace ShipStation?", answer: "It can. Many customers move from ShipStation to Connexx for rate comparison, customs automation, and UK and EU carrier depth. Others keep ShipStation for non-UK volume and run Connexx for UK and EU dispatch." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- `/integrations/erp-wms` — from the ERP and WMS section
- `/integrations/ecommerce` — from the eCommerce section
- `/integrations/logistics` — from the Logistics section
- `/integrations/marketplaces` — from the Marketplaces section
- `/integrations/carriers/royal-mail` — from the carrier grid
- `/integrations/carriers/dpd` — from the carrier grid
- `/integrations/carriers/evri` — from the carrier grid
- `/integrations/carriers/dhl` — from the carrier grid
- `/integrations/carriers/amazon-shipping` — from the carrier grid
- `/contact?enquiry=integrations` — from the closing CTA
- `/solutions/ecommerce`, `/solutions/3pl`, `/solutions/b2b` — from the use case descriptions

Inbound to this page:
- `/` (Home) — integrations strip
- `/connexx` — "Connects to your stack" callout
- Every `/solutions/*` page — "See the full integrations list" link
- Navbar primary item

---

## Implementation notes

1. The current `src/app/integrations/page.tsx` is already a filterable grid. Update the H1 from "Integrations" (one word) to the new declarative H1 above and replace the subheading with the new sub-headline.
2. Add `<JsonLd>` with the `itemListSchema`, `breadcrumbSchema`, and `faqSchema` payloads above. Render inside the page component or as a sibling fragment.
3. Add a FAQ section to the page below the carrier grid and above the "Don't see your integration?" block. Use the same `Disclosure`/`Accordion` pattern other pages use.
4. The "Tech Integrations" filter pills are already wired. Confirm "Marketplaces" filter maps to the `marketplace` category in `data.ts` (singular in data, plural in label).
5. Move the integration counts into the hero copy if available as a data-driven number: `${techIntegrations.length}` and `${carrierIntegrations.length}`.
6. Add the use cases section between the carrier grid and the FAQ. Each use case is a card with a headline, 2-3 sentences, and a list of named integrations as chips.
7. The current page passes only the tech and carrier grids. The IA above introduces "How the integration works" between use cases and FAQ. Add as a three-step component.

---

## Reviewer questions

1. Is "Native" the right label for every integration? Should some be marked "Beta" or "Via API"? Source of truth needed.
2. The hub claims 18 carriers (which matches `data.ts`). Marketing has previously said "16+". Align on the number.
3. The closing CTA proposes "Book a 20-minute integration review". Does that route to the existing /contact form with a query param, or to a different flow (e.g. Calendly)?
4. Should the carrier grid on the hub link out to dedicated `/integrations/carriers/[slug]` pages for all 18, or only the featured ones the current page links? Affects 12 additional carrier pages to write.
5. Should the FAQ schema be rendered once on the hub only, or also on each category page (current draft renders FAQ on each)? Search Console rules say one FAQ per page; aim is hub FAQ and category-specific FAQs each on their own page.
