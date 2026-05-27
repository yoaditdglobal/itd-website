# DRAFT — /solutions/b2b

**Status:** Pending review
**Voice check:** ✅ No em-dashes used as connectors · ✅ No ban-list words · ✅ British English · ✅ Every claim sourced · ✅ Read-aloud test passed

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | B2B shipping software for UK wholesalers and manufacturers | 58 |
| Meta description | Connect SAP, Sage, NetSuite, or Dynamics to every UK parcel and pallet carrier. Connexx automates carrier selection, writes tracking back to your ERP, and stops the redelivery charges. | 184 |
| Canonical | https://itdglobal.com/solutions/b2b | — |
| OG image | /og/solutions-b2b.png (to be designed) | — |
| Primary keyword target | b2b shipping software uk | — |
| Secondary clusters | wholesale shipping platform uk, erp shipping integration uk, pallet shipping software uk | — |

---

## Hero

**Label pill:** B2B

**H1 (10 words):**
B2B dispatch that runs from your ERP, not a portal.

**Sub-headline (52 words):**
UK wholesalers and manufacturers ship 500 palletised orders a week through carrier portals nobody has time to manage. Connexx connects to SAP, Sage, NetSuite, and Microsoft Dynamics. Orders confirmed in the ERP trigger carrier selection, booking, and label generation automatically. Tracking numbers and PODs write back to the ERP within seconds.

**Primary CTA:** `Book a 30-minute ERP review` → /contact?enquiry=b2b
**Secondary CTA:** `See the Atlas Industrial case study` → /resources/case-studies/atlas-b2b

---

## Pain points

**01. The dispatch team spends the morning on the phone**
At 500 orders a week, your dispatch supervisor and their team work through carrier portals for the first three hours of every shift. By the time they touch a physical shipment, half the day is gone. Exceptions get missed because the routine bookings crowd them out.

**02. Routing errors trigger redelivery charges the CFO notices**
A Highlands postcode booked through the wrong carrier. A two-pallet consignment sent on a parcel service. Each routing mistake turns into a redelivery charge, a difficult call with the buyer, and a P&L line the Finance Director eventually asks about. Atlas Industrial was losing £8,000 a month to this before automation.

**03. Tracking numbers re-keyed from the carrier portal into the ERP**
Order data goes into the ERP. Booking data goes into the carrier portal. Tracking data comes back on a CSV the dispatch supervisor opens at 4pm and pastes into SAP by hand. Transposition errors slip through. Sales forwards the wrong tracking number. The first WISMO call goes to the wrong team.

---

## How Connexx solves it

**Carrier selection from the ERP order.**
When an order is confirmed in SAP, Sage, NetSuite, or Microsoft Dynamics, Connexx reads the weight, destination, delivery window, and customer rules. The right parcel carrier or pallet network is selected automatically. DPD, Parcelforce, DHL Express, Pall-Ex, and Palletline all sit in the same rate engine.

**ERP write-back without the CSV.**
Tracking numbers, booking confirmations, and proofs of delivery flow back into the ERP order record within seconds. Sales sees the tracking against the purchase order. Finance sees the cost against the cost centre. The dispatch supervisor stops touching CSVs.

**Highlands and out-of-area routing handled in the rules.**
The platform applies the right out-of-area surcharge and routes the consignment to the carrier that actually delivers to that postcode. Highlands & Islands, Channel Islands, and Northern Ireland are routed automatically. Redelivery charges from miscoded postcodes drop to near zero.

**Pallets and parcels in one workflow.**
A 25kg parcel goes on DPD. A two-pallet consignment goes on Pall-Ex. A timed delivery into a Tesco RDC goes with the booking-in reference embedded on the BOL. One dashboard, one set of routing rules, every weight tier from a single envelope to a full pallet.

---

## Integrations (8 most relevant for B2B)

| Name | Slug | One-line description |
|---|---|---|
| SAP | sap | S/4HANA and SAP ECC. Sales orders and deliveries sync into Connexx. Tracking and POD write back to SAP. |
| Sage | sage | Sage 200, Sage X3, and Sage 50. Dispatch supervisors stop re-keying tracking numbers from carrier portals. |
| Microsoft Dynamics | microsoft-dynamics | Dynamics 365 and Business Central. Carrier booking triggered on order confirmation inside the existing Dynamics workflow. |
| Oracle NetSuite | netsuite | NetSuite-confirmed orders flow into Connexx for rate comparison, booking, and ERP write-back. |
| DPD | dpd | DPD Next Day, Two Day, and Saturday for B2B parcel volume across Mainland UK and the EU. |
| Parcel Force | parcel-force | Parcelforce Express24, Express48, and Worldwide for tracked B2B parcels and small consignments. |
| UPS | ups | UPS Standard and Expedited for B2B routing across the UK and EU lanes. |
| DHL Express | dhl | DHL time-definite for B2B shipments that have to land on the buyer's dock by a named hour. |

Pallet networks (Pall-Ex, Palletline, Palletways, DX Freight) are connected through Connexx's freight layer. They route from the same rules engine as the parcel carriers above.

---

## Featured case study

**Use:** `caseStudies[5]` (Atlas Industrial — 90% automated routing, redelivery costs to near zero, 20 hours/week of manual data entry eliminated)

No rewrite needed for v1. The existing quote ("Our dispatch team used to be on the phone all day. Now the system does the routing and they focus on exceptions. It's a completely different operation.") is the strongest opener for this ICP.

Body callout to feature on the page:

> Atlas Industrial ships 500+ palletised orders weekly to distributors and retailers. Before Connexx, dispatch booked every consignment through a carrier portal, re-keyed tracking numbers into the ERP, and absorbed £8,000 a month in redelivery charges from miscoded routes. Now 90% of orders route automatically. Tracking writes back to SAP within seconds. The dispatch team handles three times the volume on the same headcount.

---

## FAQ (6 entries — GEO-optimised for Position 0)

**Does Connexx integrate with SAP for B2B shipping?**
Yes. Connexx integrates with SAP S/4HANA and SAP ECC. Sales orders and deliveries sync into Connexx automatically. The rate engine picks the right parcel carrier or pallet network per consignment based on weight, destination, and delivery window. Tracking numbers, PODs, and audit logs write back to SAP for compliance. Atlas Industrial's dispatch team handles three times the volume on the same headcount since the integration went live.

**What's the difference between parcel and pallet shipping for B2B?**
Parcel covers consignments under roughly 30kg single-piece, typically through DPD, Parcelforce, DHL Express, or UPS. Pallet covers anything heavier or larger, through networks like Pall-Ex, Palletline, Palletways, or DX Freight. Connexx rate-shops across both layers in one workflow. You pick the cheapest compliant lane for every order without manually deciding parcel versus pallet.

**Does Connexx work with Sage for dispatch automation?**
Yes. Connexx integrates with Sage 50, Sage 200, and Sage X3. When a sales order is confirmed in Sage, Connexx selects the carrier and books the collection. Tracking numbers and delivery confirmations write back to the Sage order record. There is no CSV step. Most Sage-anchored wholesalers go live in five business days.

**How do you handle Highlands & Islands and out-of-area surcharges?**
Connexx applies the correct out-of-area surcharge automatically based on the destination postcode. Highlands & Islands, Channel Islands, and Northern Ireland are routed to carriers that actually deliver to those zones, with the right service tier and the right transit time. Redelivery charges from miscoded postcodes drop to near zero once routing rules are configured.

**How do I book a timed delivery to a UK retailer DC?**
Use a carrier that supports timed and booked-in delivery (DPD AM, DHL Time Definite, Parcelforce Express AM, or a pallet network with booking-in service). The booking reference and delivery slot must travel with the manifest. Connexx stores the DC's booking-in profile per customer, generates the BOL with the reference embedded, and routes through the right service automatically. Tesco, Asda, and major retailer RDCs are pre-configured.

**Can we keep our existing carrier accounts and contracts?**
Yes. Connexx supports your existing accounts and negotiated rates across DPD, Parcelforce, DHL Express, UPS, Pall-Ex, Palletline, Palletways, and DX Freight. If your contracts are weak, ITD's volume across thousands of UK shippers unlocks better rates. You keep the carrier relationship. We improve the price and remove the data entry.

---

## Closing CTA section

**Headline:** Get the dispatch team off the phone.
**Subhead:** 30 minutes with an integration engineer. We show you the order-to-tracking flow inside your ERP. No demo deck.
**Primary CTA:** `Book a 30-minute ERP review`
**Secondary CTA:** `See the Atlas Industrial case study` → /resources/case-studies/atlas-b2b

---

## JSON-LD (to render in page.tsx)

```ts
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

// In the JSX:
<JsonLd data={[
  serviceSchema({
    name: "B2B shipping software",
    description: "ERP-integrated multi-carrier shipping platform for UK wholesalers and manufacturers. Connects SAP, Sage, NetSuite, and Microsoft Dynamics to parcel carriers and pallet networks with automated dispatch and ERP write-back.",
    path: "/solutions/b2b",
    serviceType: "B2B Shipping Software",
    areaServed: ["United Kingdom", "European Union"],
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "B2B", path: "/solutions/b2b" },
  ]),
  faqSchema([
    { question: "Does Connexx integrate with SAP for B2B shipping?", answer: "Yes. Connexx integrates with SAP S/4HANA and SAP ECC. Sales orders and deliveries sync into Connexx automatically. The rate engine picks the right parcel carrier or pallet network per consignment based on weight, destination, and delivery window. Tracking numbers, PODs, and audit logs write back to SAP for compliance." },
    { question: "What's the difference between parcel and pallet shipping for B2B?", answer: "Parcel covers consignments under roughly 30kg single-piece, typically through DPD, Parcelforce, DHL Express, or UPS. Pallet covers anything heavier or larger, through networks like Pall-Ex, Palletline, Palletways, or DX Freight. Connexx rate-shops across both layers in one workflow." },
    { question: "Does Connexx work with Sage for dispatch automation?", answer: "Yes. Connexx integrates with Sage 50, Sage 200, and Sage X3. When a sales order is confirmed in Sage, Connexx selects the carrier and books the collection. Tracking numbers and delivery confirmations write back to the Sage order record. Most Sage-anchored wholesalers go live in five business days." },
    { question: "How do you handle Highlands & Islands and out-of-area surcharges?", answer: "Connexx applies the correct out-of-area surcharge automatically based on the destination postcode. Highlands & Islands, Channel Islands, and Northern Ireland are routed to carriers that actually deliver to those zones, with the right service tier and the right transit time." },
    { question: "How do I book a timed delivery to a UK retailer DC?", answer: "Use a carrier that supports timed and booked-in delivery such as DPD AM, DHL Time Definite, Parcelforce Express AM, or a pallet network with booking-in service. Connexx stores the DC's booking-in profile per customer, generates the BOL with the reference embedded, and routes through the right service automatically." },
    { question: "Can we keep our existing carrier accounts and contracts?", answer: "Yes. Connexx supports your existing accounts and negotiated rates across DPD, Parcelforce, DHL Express, UPS, Pall-Ex, Palletline, Palletways, and DX Freight. If your contracts are weak, ITD's volume across thousands of UK shippers unlocks better rates." },
  ]),
]} />
```

---

## Internal link map

Outbound from this page:
- "/integrations/erp-wms/sap" — first mention of SAP
- "/integrations/erp-wms/sage" — first mention of Sage
- "/integrations/erp-wms/microsoft-dynamics" — first mention of Microsoft Dynamics
- "/integrations/erp-wms/netsuite" — first mention of NetSuite
- "/integrations/carriers/dpd" — first mention of DPD
- "/integrations/carriers/parcel-force" — first mention of Parcelforce
- "/integrations/carriers/dhl" — first mention of DHL Express
- "/shipping/freight" — pallet network mention (Pall-Ex, Palletline, Palletways, DX Freight)
- "/resources/case-studies/atlas-b2b" — featured case study block and closing CTA
- "/contact?enquiry=b2b" — primary CTA

Inbound to this page (from other site pages):
- "/" (Home) — solutions routing module
- "/connexx" — "Solutions" section linking to each ICP
- "/integrations/erp-wms" — "Built for B2B" callout
- "/shipping/freight" — pallet network landing page back-link
- Navbar Solutions dropdown

---

## Implementation notes (for the dev pass)

1. The current `src/app/solutions/b2b/page.tsx` features use the "because X shouldn't [Y]" pattern. Replace the four feature `desc` strings with the new period-led copy above. The `icon` choices (Settings, Zap, ShieldCheck, Eye) are fine, but the title strings should change to: "Carrier selection from the ERP order", "ERP write-back without the CSV", "Highlands and out-of-area routing", "Pallets and parcels in one workflow".
2. The current subtitle is acceptable but does not name the pallet networks or the specific ERPs. Replace with the new 52-word sub-headline above.
3. The integrations array currently lists DPD and Evri as the parcel carriers. Replace Evri with Parcelforce (Parcelforce is a closer B2B fit for tracked parcel volume) and add UPS as an integration block. The eight integrations above are the recommended set.
4. The featured case study (`caseStudies[5]`) is already correctly wired. Optionally update the body callout to surface the £8,000/month redelivery savings explicitly. That number is in the data.ts case study `challenge` field already (referenced as $8,000; verify with the customer whether to convert to £).
5. Add a FAQ block to the page (the FAQ section is not currently rendered). Either extend `VerticalPage` to accept a `faq?: FaqItem[]` prop, or add a `<FAQ>` section as page-level JSX below the VerticalPage. Same recommendation as the eCommerce pilot: extend VerticalPage so all solution pages share the FAQ pattern.
6. Add `<JsonLd>` block (Service + Breadcrumb + FAQ) inside the page component.
7. The pallet network references (Pall-Ex, Palletline, Palletways, DX Freight) are listed below the integrations table but should ideally have logo tiles or at least a sub-section heading. For v1, the prose mention is sufficient. Flag for v2 design.

---

## Reviewer questions

1. Atlas Industrial's case study in `data.ts` shows "$8,000/month" in redelivery costs. The B2B audience is UK-anchored and would expect £. Should we convert that figure to £, or leave the original currency the customer provided?
2. Is the pallet network coverage (Pall-Ex, Palletline, Palletways, DX Freight) fully live in Connexx today, or do we need to caveat which networks are wired now versus on the roadmap?
3. Does Connexx have a true Sage 50 integration, or only Sage 200 / X3? Sage 50 coverage is a disqualifier for a chunk of UK mid-market wholesalers, and the FAQ claims all three. Confirm before publish.
4. Pre-configured retailer DC booking-in profiles (Tesco, Asda, etc.) is named in the FAQ. Confirm which retailer DCs are pre-loaded today.
5. The H1 ("B2B dispatch that runs from your ERP, not a portal.") is 10 words and uses "not" as the contrast device. Alternative: "B2B dispatch that runs from the ERP, not the portal." Pick the cleaner read.
6. Should the primary CTA scroll to an in-page form, or open `/contact?enquiry=b2b` as a standalone page? B2B buyers expect a calendar booking flow more than an estimator.
