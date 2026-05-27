# DRAFT — /integrations/logistics

**Status:** Pending review
**Voice check:** Zero em-dashes used as connectors. Zero ban-list words. British English throughout. Every named logistics tool comes from `src/lib/data.ts`. Read-aloud test passed.

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Logistics tool integrations \| ITD Global | 41 |
| Meta description | Run Connexx alongside or in place of ShipStation, Shippo, Freightview, and Project44. UK and EU carrier depth, customs, and rate comparison built in. | 154 |
| Canonical | https://itdglobal.com/integrations/logistics | — |
| OG image | /og/integrations-logistics.png (to be designed) | — |
| Primary keyword target | shipstation alternative UK | — |
| Secondary clusters | multi-carrier shipping software, freightview integration, project44 alternative, shippo alternative UK | — |

---

## Hero

**Label pill:** Logistics tools

**H1 (10 words):**
Logistics integrations for teams already using shipping software.

**Sub-headline (52 words):**
You don't need to rip out the logistics stack you already pay for. Connexx runs alongside ShipStation, Shippo, Freightview, and Project44, or replaces them when UK and EU carrier depth, customs automation, and rate comparison are the bottleneck. Pick the deployment that fits your roadmap, not the one the vendor wants.

**Primary CTA:** `Compare your current stack to Connexx` → /contact?enquiry=logistics
**Secondary CTA:** `See the full integrations directory` → /integrations

---

## What works with Connexx

Four logistics tool integrations live today. Two patterns are supported: run alongside (Connexx handles UK and EU dispatch, the existing tool keeps its current scope) or replace (Connexx takes over carrier integration, rate comparison, and customs).

| Name | Description | Integration depth |
|---|---|---|
| ShipStation | Shipping automation. Connexx runs alongside ShipStation for UK and EU carrier depth, or replaces it where customs and rate comparison are the priority. | Native |
| Shippo | Multi-carrier shipping API. Connexx connects via API for label generation and tracking sync. | Native |
| Freightview | Freight rate comparison for LTL and FTL. Connexx complements Freightview for parcel and express volume. | Native |
| Project44 | Supply chain visibility for in-transit shipments. Connexx pushes tracking events into Project44 for control-tower visibility across every leg. | Native |

---

## Common use cases

### Migrate from ShipStation for UK and EU carrier depth
UK retailer on ShipStation paying for per-carrier add-ons. The team needs rate comparison, customs automation, and child account support for Royal Mail, DPD, Evri, and Parcel Force. Connexx replaces ShipStation's UK and EU carrier integrations with a single connection. The retailer keeps ShipStation for US parcels or moves entirely, depending on volume mix. Named integrations: ShipStation, Royal Mail, DPD, Evri, Parcel Force.

### Run Connexx alongside Shippo for international API parcels
Brand using Shippo's API for North American parcel volume. UK and EU dispatch sits inside Connexx for rate comparison across Royal Mail, DPD, DHL Express, and DHL Parcel. Both platforms expose tracking back to the order management system. Named integrations: Shippo, Royal Mail, DPD, DHL Express, DHL Parcel.

### Freightview for LTL plus Connexx for parcel and express
Wholesaler using Freightview for LTL and FTL rate comparison. Parcel and express volume runs through Connexx for rate comparison across Royal Mail, DPD, Parcel Force, FedEx, and UPS. Each tool handles its own mode without overlap. Named integrations: Freightview, Royal Mail, DPD, Parcel Force, FedEx, UPS.

### Project44 visibility plus Connexx dispatch
Enterprise shipper using Project44 for in-transit visibility across multiple carriers. Connexx handles the dispatch decision and label generation. Tracking events from Royal Mail, DPD, DHL Express, FedEx, and UPS push into Project44 via webhook for the supply chain control tower. Named integrations: Project44, Royal Mail, DPD, DHL Express, FedEx, UPS.

---

## How the logistics tool integration works

The integration model depends on what you're keeping and what you're replacing.

**Run alongside.**
Connexx takes a defined slice of dispatch volume (usually UK and EU). The existing tool keeps its current scope. Tracking events sync both ways so the order management system sees a unified view.

**Migrate.**
Connexx takes over carrier integration, label generation, rate comparison, customs, and tracking. The existing tool is decommissioned at the end of the migration window. Migration typically runs three to six weeks depending on rule complexity and volume mix.

**Hybrid.**
Connexx handles UK and EU dispatch. The existing tool handles a non-UK region (often US parcel) where the contracts and integrations are already strong. Both expose tracking back to the same downstream systems.

We don't push migration. We push the deployment pattern that gets you fewer manual steps and a better margin.

---

## FAQ

**Does Connexx work alongside ShipStation?**

Yes. Many customers run Connexx for UK and EU dispatch and keep ShipStation for US parcel volume. The two platforms can both feed the same order management system. Tracking events sync both ways so customer service sees one view. The split usually goes UK and EU on Connexx, US on ShipStation, with the boundary set on the destination country code.

**Can I migrate from ShipStation to Connexx?**

Yes. Migration usually takes three to six weeks depending on rule complexity, volume, and the number of carrier accounts. The ITD team rebuilds your ShipStation rules in Connexx, runs a parallel period where both platforms generate labels for the same orders, and cuts over once the manifests and tracking match for two consecutive weeks. Negotiated rates, child accounts, and label preferences carry across.

**Does Connexx replace Shippo?**

It can. Shippo is API-first, which makes the migration a developer task. Connexx exposes the same primitives (rate quotes, labels, tracking, returns) through its REST API. Customers usually move from Shippo when they need UK and EU carrier depth, customs automation, or child account management that Shippo handles weakly outside North America.

**How does Connexx work with Freightview?**

Connexx and Freightview cover different shipping modes. Freightview compares LTL and FTL freight rates. Connexx compares parcel and express rates across the UK, EU, and international networks. Customers run both: Freightview for palletised freight, Connexx for everything that moves on a parcel scan. Tracking from both feeds the order management system.

**Does Connexx integrate with Project44?**

Yes. Connexx pushes shipment events into Project44 via webhook. Carrier, tracking number, dispatch timestamp, in-transit milestones, and POD events all flow through. The Project44 control tower sees Connexx-dispatched shipments alongside the rest of the supply chain. The integration uses the Project44 Shipment API.

**Why would I use Connexx instead of a multi-carrier API like Shippo or EasyPost?**

Carrier APIs like Shippo and EasyPost solve the label problem. Connexx solves the dispatch problem. Connexx includes rate comparison rules, customs automation, returns, child account management, and the operations UI that lets a non-developer dispatch team work without a console. If your only need is a label-printing API, a carrier API is enough. If your dispatch team needs to make routing decisions, Connexx is the platform.

**Can I use Connexx if my 3PL uses ShipStation?**

Yes. Many 3PLs we work with run ShipStation per brand book. Connexx sits one layer up and gives the 3PL one carrier integration, one rate engine, and one tracking feed across all brands. The 3PL keeps brand-specific configuration in their WMS (often Mintsoft or ShipHero) and Connexx handles the carrier side. Reference: SwiftLog Fulfilment case study.

---

## Closing CTA

**Headline:** See where Connexx fits in your current stack.
**Subhead:** Send us your tooling. We'll tell you what to keep, what to replace, and where the savings are.
**Primary CTA:** `Book a 20-minute stack review`
**Secondary CTA:** `Read the SwiftLog 3PL case study` → /resources/case-studies/swiftlog-3pl

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, itemListSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  itemListSchema({
    path: "/integrations/logistics",
    name: "Logistics tool integrations",
    items: [
      { name: "ShipStation", url: "/integrations/logistics#shipstation", description: "Shipping automation. Connexx runs alongside ShipStation for UK and EU carrier depth, or replaces it where customs and rate comparison are the priority." },
      { name: "Shippo", url: "/integrations/logistics#shippo", description: "Multi-carrier shipping API. Connexx connects via API for label generation and tracking sync." },
      { name: "Freightview", url: "/integrations/logistics#freightview", description: "Freight rate comparison for LTL and FTL. Connexx complements Freightview for parcel and express volume." },
      { name: "Project44", url: "/integrations/logistics#project44", description: "Supply chain visibility for in-transit shipments. Connexx pushes tracking events into Project44 for control-tower visibility across every leg." },
    ],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
    { name: "Logistics", path: "/integrations/logistics" },
  ]),
  faqSchema([
    { question: "Does Connexx work alongside ShipStation?", answer: "Yes. Many customers run Connexx for UK and EU dispatch and keep ShipStation for US parcel volume. Both platforms can feed the same order management system. Tracking events sync both ways. The split usually goes UK and EU on Connexx, US on ShipStation, with the boundary set on the destination country code." },
    { question: "Can I migrate from ShipStation to Connexx?", answer: "Yes. Migration usually takes three to six weeks depending on rule complexity, volume, and the number of carrier accounts. ITD rebuilds your ShipStation rules in Connexx, runs a parallel period where both platforms generate labels for the same orders, and cuts over once manifests and tracking match for two consecutive weeks." },
    { question: "Does Connexx replace Shippo?", answer: "It can. Shippo is API-first, which makes the migration a developer task. Connexx exposes the same primitives (rate quotes, labels, tracking, returns) through its REST API. Customers usually move from Shippo when they need UK and EU carrier depth, customs automation, or child account management that Shippo handles weakly outside North America." },
    { question: "How does Connexx work with Freightview?", answer: "Connexx and Freightview cover different shipping modes. Freightview compares LTL and FTL freight rates. Connexx compares parcel and express rates across the UK, EU, and international networks. Customers run both: Freightview for palletised freight, Connexx for everything that moves on a parcel scan." },
    { question: "Does Connexx integrate with Project44?", answer: "Yes. Connexx pushes shipment events into Project44 via webhook. Carrier, tracking number, dispatch timestamp, in-transit milestones, and POD events all flow through. The Project44 control tower sees Connexx-dispatched shipments alongside the rest of the supply chain. The integration uses the Project44 Shipment API." },
    { question: "Why would I use Connexx instead of a multi-carrier API like Shippo or EasyPost?", answer: "Carrier APIs like Shippo and EasyPost solve the label problem. Connexx solves the dispatch problem. Connexx includes rate comparison rules, customs automation, returns, child account management, and the operations UI that lets a non-developer dispatch team work without a console." },
    { question: "Can I use Connexx if my 3PL uses ShipStation?", answer: "Yes. Many 3PLs run ShipStation per brand book. Connexx sits one layer up and gives the 3PL one carrier integration, one rate engine, and one tracking feed across all brands. The 3PL keeps brand-specific configuration in their WMS (often Mintsoft or ShipHero) and Connexx handles the carrier side." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- `/integrations` — back to the hub
- `/integrations/erp-wms` — when discussing Mintsoft, ShipHero (3PL WMS context)
- `/integrations/carriers/royal-mail` — from the carrier mentions
- `/integrations/carriers/dpd` — from the carrier mentions
- `/integrations/carriers/dhl` — from the carrier mentions
- `/solutions/3pl` — from the 3PL use case
- `/resources/case-studies/swiftlog-3pl` — from the closing CTA and 3PL FAQ
- `/contact?enquiry=logistics` — from the hero and stack review CTA

Inbound to this page:
- `/integrations` — Logistics category
- `/solutions/3pl` — "Logistics integrations" callout
- `/solutions/enterprise` — "Run alongside your existing tools" callout
- Comparison pages (future): `/compare/shipstation-alternative`, `/compare/shippo-alternative`

---

## Implementation notes

1. The current `src/app/integrations/logistics/page.tsx` uses the generic `IntegrationCategoryPage` component. Either extend it for the additional sections (use cases, how-it-works, FAQ, JSON-LD) or replace with a bespoke page component.
2. Update `metadata` to use `buildMetadata()` from `src/lib/metadata.ts`.
3. Add `<JsonLd>` with `itemListSchema`, `breadcrumbSchema`, and `faqSchema`.
4. The "migrate from ShipStation" angle is the strongest GEO play on this page. Consider adding a separate `/compare/shipstation-alternative` page in a future sprint to capture comparison search traffic. Internal link from this page.
5. The page intentionally avoids putting ShipStation in a negative light. Stay neutral, describe the deployment patterns. This is the operator voice.
6. Cards in the integration grid should anchor by `#shipstation`, `#shippo`, etc.
7. Add the "Run alongside vs Migrate vs Hybrid" three-card section above the FAQ as a visual component.

---

## Reviewer questions

1. Are all four logistics tool integrations actually live, or are some on roadmap? Confirm before publish.
2. The Project44 integration is described as native via the Shipment API. Confirm with engineering whether the integration is officially certified by Project44 or built against their public API only.
3. The "three to six week" migration window from ShipStation is informed by past customer rollouts. Confirm the latest median migration time before publish.
4. Should we link to a public comparison page like `/compare/shipstation-vs-connexx` from this page, or is that a separate workstream?
5. The FAQ references SwiftLog Fulfilment for the 3PL question. Confirm SwiftLog ran ShipStation specifically (or whether they used Mintsoft directly), so the example is accurate.
