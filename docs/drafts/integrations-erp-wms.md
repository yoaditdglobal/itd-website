# DRAFT — /integrations/erp-wms

**Status:** Pending review
**Voice check:** Zero em-dashes used as connectors. Zero ban-list words. British English throughout. Every named ERP and WMS comes from `src/lib/data.ts`. Read-aloud test passed.

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | ERP and WMS integrations \| ITD Global | 38 |
| Meta description | Connect Connexx to SAP, NetSuite, Microsoft Dynamics, Sage, Cin7, Linnworks, Mintsoft, Veeqo, ShipHero, StoreFeeder, and Selro. | 130 |
| Canonical | https://itdglobal.com/integrations/erp-wms | — |
| OG image | /og/integrations-erp-wms.png (to be designed) | — |
| Primary keyword target | ERP shipping integration | — |
| Secondary clusters | SAP shipping, NetSuite shipping integration, Linnworks shipping carriers, Mintsoft multi-carrier | — |

---

## Hero

**Label pill:** ERP and WMS

**H1 (10 words):**
ERP and WMS integrations for multi-carrier dispatch.

**Sub-headline (51 words):**
Connexx connects to the ERP and WMS systems your finance and operations teams already run. Orders pull in from the system of record. Shipping data writes back the moment a label prints. The dispatch team works in Connexx. The finance team keeps SAP, NetSuite, Sage, or Dynamics as the source of truth.

**Primary CTA:** `Book a technical integration review` → /contact?enquiry=erp-wms
**Secondary CTA:** `See the full integrations directory` → /integrations

---

## What works with Connexx

Eleven ERP and WMS integrations live today. All connections are native, with order pull, label generation, and shipping write-back included as standard.

| Name | Description | Integration depth |
|---|---|---|
| SAP | Enterprise ERP integration. Orders pull from SAP S/4HANA or ECC. Tracking, POD, and freight cost write back into the SD module. | Native |
| Oracle NetSuite | Cloud ERP connector. SuiteCommerce orders and stand-alone NetSuite orders both supported. Item fulfilment records update automatically. | Native |
| Microsoft Dynamics | Dynamics 365 Business Central and Finance & Operations. Sales order and shipment statuses sync in both directions. | Native |
| Sage | Sage 50, Sage 200, and Sage Intacct. Invoices, shipments, and tracking link by sales order number. | Native |
| Cin7 | Inventory and warehouse management for multi-channel sellers. Pick, pack, dispatch confirmed inside Connexx. | Native |
| Linnworks | Multi-channel order and inventory management. Connexx replaces Linnworks' per-carrier integrations with one connection that exposes every supported carrier. | Native |
| Mintsoft | Warehouse management system for 3PLs and brand fulfilment. Picks flow into Connexx for label printing and manifesting. | Native |
| Selro | Multi-channel listing and order management. Marketplace orders route through Selro to Connexx for carrier selection. | Native |
| ShipHero | Warehouse and shipping management for 3PLs and brands. Order, batch, and pick-list events sync to Connexx. | Native |
| StoreFeeder | Multi-channel listing and order management for retailers. Orders pull into Connexx for dispatch. | Native |
| Veeqo | Inventory and shipping platform. Connexx runs alongside Veeqo for UK and EU carrier depth and rate comparison. | Native |

---

## Common use cases

### SAP plus DHL Express for cross-border B2B
Manufacturer with SAP S/4HANA. Confirmed orders pull into Connexx with the HS code, EORI number, and value already on the order line. The customs paperwork generates against the SAP product master. DHL Express books the international leg. Tracking and POD write back into SAP for the AR team. Named integrations: SAP, DHL Express. Reference: Atlas Industrial case study (90% routing automation).

### NetSuite plus FedEx and UPS for North American export
Brand running NetSuite for global orders. Connexx selects between FedEx and UPS on every parcel using live rates, weight bands, and service level. Item fulfilment records update with the carrier, tracking number, and dispatch timestamp. Returns post back as RMAs. Named integrations: Oracle NetSuite, FedEx, UPS.

### Linnworks plus seven UK carriers
Multi-channel seller using Linnworks for inventory and order management. Connexx replaces the per-carrier integrations inside Linnworks with one connection exposing Royal Mail, DPD, Evri, Yodel, Parcel Force, Amazon Shipping, and DHL Express. The seller stops paying per-carrier integration fees inside Linnworks and gets rate comparison on every dispatch. Named integrations: Linnworks, Royal Mail, DPD, Evri, Yodel, Parcel Force, Amazon Shipping, DHL Express.

### Mintsoft plus 3PL brand routing
Mintsoft warehouse running fulfilment for 60 brands. Each brand has different carrier preferences, weight rules, and service-level constraints. Connexx applies the brand-specific routing rules at the moment of label generation. Compliance checks run before the label prints. Named integrations: Mintsoft, Royal Mail, DPD, DHL Express, FedEx. Reference: SwiftLog Fulfilment case study (98.7% accuracy).

---

## How the ERP and WMS integration works

ERP and WMS integrations carry more data both ways than eCommerce or marketplace connections. Connexx ships with three components for every ERP and WMS connector:

**1. Order pull.**
The ERP or WMS sends confirmed orders to Connexx. Field mapping covers customer details, line items with weight and HS code, service level, and delivery date. Polling, webhook, and event-driven options are all supported.

**2. Carrier booking and label generation.**
The Connexx rate engine compares every active carrier on every order. The cheapest compliant carrier is selected. Labels generate in the right format for the carrier and the warehouse printer.

**3. Write-back.**
Carrier name, tracking number, dispatch timestamp, freight cost, and POD write back into the ERP or WMS. Finance reconciles freight against the carrier invoice. Customer service sees tracking inside the system of record without a second login.

Setup takes three to five business days for SAP, Oracle NetSuite, Microsoft Dynamics, and Sage. Cin7, Linnworks, Mintsoft, ShipHero, StoreFeeder, Selro, and Veeqo activate in one to two days using their native app stores or API.

---

## FAQ

**Does Connexx work with SAP?**

Yes. Connexx integrates with SAP S/4HANA and SAP ECC. Orders pull from the SD module. Tracking, freight cost, and POD write back to the same module. The integration supports both polling and IDoc/event-driven order release. Setup takes three to five business days depending on your write-back scope and whether you use SAP Business Network for carrier collaboration.

**Does Connexx integrate with Oracle NetSuite?**

Yes. Connexx connects to NetSuite as a SuiteApp. Both SuiteCommerce orders and stand-alone NetSuite orders are supported. Item fulfilment records update automatically with the carrier, tracking number, and shipping cost. Returns post as RMA records. The connector handles multi-subsidiary setups and OneWorld instances.

**Does Connexx integrate with Sage?**

Yes. Connexx supports Sage 50, Sage 200, and Sage Intacct. Sales order numbers link to shipments inside Connexx so finance and operations work from the same identifier. Freight cost posts back to the order for invoice matching. The integration sits alongside Sage rather than replacing any Sage module.

**Does Connexx work with Microsoft Dynamics?**

Yes. Connexx connects to Dynamics 365 Business Central and Dynamics 365 Finance & Operations. Sales order and shipment statuses sync in both directions. The integration uses the Dynamics OData API and supports custom field mapping for industry-specific extensions.

**Does Connexx work with Linnworks, Mintsoft, or Veeqo?**

Yes to all three. Linnworks uses Connexx as a single carrier connection that replaces multiple per-carrier integrations inside Linnworks. Mintsoft customers use Connexx for label printing, manifesting, and rate comparison across their 3PL brand book. Veeqo customers use Connexx alongside Veeqo for UK and EU carrier depth.

**Does Connexx work with Cin7, ShipHero, or StoreFeeder?**

Yes. Cin7 connects via API for inventory, order, and shipment events. ShipHero integrates for warehouse and shipping management across 3PLs and brands. StoreFeeder connects for multi-channel listing and order management. All three activate within one to two business days.

**What ERPs and WMSs does Connexx support today?**

Eleven, all native: SAP, Oracle NetSuite, Microsoft Dynamics, Sage, Cin7, Linnworks, Mintsoft, Selro, ShipHero, StoreFeeder, and Veeqo. If your system is not on the list, the Connexx REST API supports custom integrations using the same order, label, tracking, and POD endpoints.

---

## Closing CTA

**Headline:** Book a technical integration review.
**Subhead:** Bring your ERP or WMS specifics. We'll map the order, label, and write-back flow before you commit.
**Primary CTA:** `Book a 20-minute review`
**Secondary CTA:** `See the API docs` → /developers (to be built)

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, itemListSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  itemListSchema({
    path: "/integrations/erp-wms",
    name: "ERP and WMS integrations",
    items: [
      { name: "SAP", url: "/integrations/erp-wms#sap", description: "Enterprise ERP integration with SAP S/4HANA and ECC. Orders pull from the SD module. Tracking and POD write back." },
      { name: "Oracle NetSuite", url: "/integrations/erp-wms#netsuite", description: "Cloud ERP connector. SuiteCommerce and stand-alone NetSuite supported. Item fulfilment records update automatically." },
      { name: "Microsoft Dynamics", url: "/integrations/erp-wms#dynamics", description: "Dynamics 365 Business Central and Finance & Operations. Sales order and shipment statuses sync both ways." },
      { name: "Sage", url: "/integrations/erp-wms#sage", description: "Sage 50, Sage 200, and Sage Intacct. Shipments and tracking link by sales order number." },
      { name: "Cin7", url: "/integrations/erp-wms#cin7", description: "Inventory and warehouse management for multi-channel sellers." },
      { name: "Linnworks", url: "/integrations/erp-wms#linnworks", description: "Multi-channel order management. One Connexx connection replaces per-carrier integrations inside Linnworks." },
      { name: "Mintsoft", url: "/integrations/erp-wms#mintsoft", description: "Warehouse management system for 3PLs and brand fulfilment. Picks flow into Connexx for label printing." },
      { name: "Selro", url: "/integrations/erp-wms#selro", description: "Multi-channel listing and order management." },
      { name: "ShipHero", url: "/integrations/erp-wms#shiphero", description: "Warehouse and shipping management for 3PLs and brands." },
      { name: "StoreFeeder", url: "/integrations/erp-wms#storefeeder", description: "Multi-channel listing and order management for retailers." },
      { name: "Veeqo", url: "/integrations/erp-wms#veeqo", description: "Inventory and shipping platform. Used alongside Veeqo for UK and EU carrier depth." },
    ],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
    { name: "ERP and WMS", path: "/integrations/erp-wms" },
  ]),
  faqSchema([
    { question: "Does Connexx work with SAP?", answer: "Yes. Connexx integrates with SAP S/4HANA and SAP ECC. Orders pull from the SD module. Tracking, freight cost, and POD write back to the same module. The integration supports polling and IDoc/event-driven order release. Setup takes three to five business days." },
    { question: "Does Connexx integrate with Oracle NetSuite?", answer: "Yes. Connexx connects to NetSuite as a SuiteApp. SuiteCommerce orders and stand-alone NetSuite orders are both supported. Item fulfilment records update automatically with carrier, tracking number, and shipping cost. The connector handles multi-subsidiary and OneWorld instances." },
    { question: "Does Connexx integrate with Sage?", answer: "Yes. Connexx supports Sage 50, Sage 200, and Sage Intacct. Sales order numbers link to shipments inside Connexx so finance and operations work from the same identifier. Freight cost posts back to the order for invoice matching." },
    { question: "Does Connexx work with Microsoft Dynamics?", answer: "Yes. Connexx connects to Dynamics 365 Business Central and Dynamics 365 Finance & Operations. Sales order and shipment statuses sync in both directions using the Dynamics OData API. Custom field mapping supports industry-specific extensions." },
    { question: "Does Connexx work with Linnworks, Mintsoft, or Veeqo?", answer: "Yes to all three. Linnworks uses Connexx as a single carrier connection replacing multiple per-carrier integrations. Mintsoft customers use Connexx for label printing, manifesting, and rate comparison. Veeqo customers run Connexx alongside Veeqo for UK and EU carrier depth." },
    { question: "Does Connexx work with Cin7, ShipHero, or StoreFeeder?", answer: "Yes. Cin7 connects via API for inventory, order, and shipment events. ShipHero integrates for warehouse and shipping management. StoreFeeder connects for multi-channel listing and order management. All three activate within one to two business days." },
    { question: "What ERPs and WMSs does Connexx support today?", answer: "Eleven, all native: SAP, Oracle NetSuite, Microsoft Dynamics, Sage, Cin7, Linnworks, Mintsoft, Selro, ShipHero, StoreFeeder, and Veeqo. Custom integrations beyond this list use the Connexx REST API." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- `/integrations` — back to the hub
- `/integrations/ecommerce` — when comparing eCommerce platform integration
- `/integrations/carriers/dhl` — from the SAP use case
- `/integrations/carriers/royal-mail` — from the Linnworks use case
- `/integrations/carriers/dpd` — from the Linnworks use case
- `/solutions/b2b` — from the SAP use case (Atlas Industrial)
- `/solutions/3pl` — from the Mintsoft use case (SwiftLog)
- `/resources/case-studies/atlas-b2b` — from the SAP use case
- `/resources/case-studies/swiftlog-3pl` — from the Mintsoft use case
- `/contact?enquiry=erp-wms` — from the closing CTA

Inbound to this page:
- `/integrations` — ERP and WMS section
- `/solutions/b2b` — "ERP-connected dispatch" callout
- `/solutions/enterprise` — "Connect your ERP" callout
- `/connexx` — "Works with your existing stack" link

---

## Implementation notes

1. The current `src/app/integrations/erp-wms/page.tsx` uses the generic `IntegrationCategoryPage` component. Either extend that component to accept H1, sub-headline, use cases, how-it-works, FAQ, and JSON-LD props, or replace with a bespoke page component.
2. Update `metadata` to use `buildMetadata()` from `src/lib/metadata.ts` for canonical and OG consistency.
3. Add `<JsonLd>` with `itemListSchema`, `breadcrumbSchema`, and `faqSchema` payloads.
4. The current sub-headline says "no manual entry, no sync gaps" which is fine voice. Replace with the longer hero sub-headline above to add entity density.
5. Cards in the integration grid should anchor by `#sap`, `#netsuite`, etc. for direct linking from the FAQ schema. Add `id` props to each card.
6. The "How the ERP and WMS integration works" section is new. Render as a three-step component below the integration grid.
7. The FAQ block uses the same FAQ component the solutions pages will use. Build once, share across pages.

---

## Reviewer questions

1. Is SAP integration available for both S/4HANA and ECC? Confirm with engineering. If ECC is not yet supported, drop the ECC reference.
2. Does the Microsoft Dynamics integration support the F&O variant or only Business Central? Confirm before publish.
3. Is Veeqo officially "owned by Amazon" or "by Amazon Inc."? Verify the language so it's accurate.
4. Should the closing CTA push to `/contact?enquiry=erp-wms` or to a dedicated technical sales calendar link?
5. Confirm "Eleven, all native" is true. If any of Selro, ShipHero, StoreFeeder, or Veeqo are actually Beta, mark accordingly in the table and the FAQ.
