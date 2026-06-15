# ICP — eCommerce

## The mode
They are running a direct-to-consumer brand shipping 300 to 3,000 orders a day across the UK and into Europe. They have a Head of Ops or an Ops Manager who owns shipping, an eCommerce manager who owns the platform, and a customer service team who fields every WISMO query. The three teams are constantly stepping on each other because carrier data does not flow cleanly between systems. The Ops Manager is trying to reduce per-shipment cost while the CS team is trying to reduce ticket volume and nobody has the same view of what is happening.

## Who they are
- Job title(s): Head of Operations, Ops Manager, eCommerce Director, Logistics Manager, Fulfilment Lead
- Company size: £2m–£20m revenue, 300–3,000 parcels per day
- Team size: 3–10 people across ops and CS touching shipping data
- Tooling: Shopify or Magento storefront, 3–8 carrier portals, possibly Linnworks or Veeqo for order management
- Reporting line: Reports to MD or COO; works closely with eCommerce and Customer Service leads

## Top 3 pains (in their words)
1. **"Our CS team is logging into four carrier portals to answer one WISMO query"** — Royal Mail, DPD, Evri, and DHL all have separate tracking systems. A customer asks where their parcel is and a CS agent spends four minutes finding out. At 80 WISMO tickets a day, that is five hours of CS time on a task that should be automated.
2. **"We're shipping to Germany, France, and the Netherlands but our carrier costs are all over the place"** — No consistent rate comparison across EU lanes means the Ops Manager defaults to whoever has the best relationship rather than whoever has the best rate on that specific destination and weight.
3. **"Returns are eating margin and we have no clear data on which carrier or route causes them"** — Returns processing is manual, the cost per return is not tracked against the outbound carrier, and nobody can say whether the returns rate on DPD shipments differs from Royal Mail. The data to improve the process does not exist.

## Top 3 jobs-to-be-done
1. **When a CS agent receives a WISMO query, I want them to see the current tracking status without leaving their helpdesk tool, so each query takes 30 seconds to resolve rather than four minutes.**
2. **When I am dispatching an order to an EU destination, I want the rate engine to compare DHL and DPD on that specific weight and postcode, so I stop defaulting to one carrier and start saving on every cross-border shipment.**
3. **When I review monthly shipping costs, I want a breakdown by carrier, lane, and service tier, so I can identify which routes are overpriced and renegotiate with evidence.**

## Conversion triggers (what makes them book a call)
1. A peak season (Black Friday, Christmas) exposes the manual label workflow as a bottleneck and shipments miss the carrier cutoff.
2. A new EU market is opening and they realise their current carrier setup cannot handle the additional lane without significant manual work.
3. CS ticket volume from WISMO queries passes a threshold where they are considering hiring a new CS agent specifically to handle tracking queries.

## Disqualifiers (what makes them bounce)
1. No Shopify or Magento integration listed. If their storefront is not on the integration page they assume the product does not fit.
2. The rate comparison is not real-time. If rates are pulled on a delay or cached, the Ops Manager will not trust the outputs.
3. EU carrier coverage is thin. If DPD EU and Deutsche Post are not available, the platform does not solve the cross-border problem.
4. Onboarding is measured in months. They need it live before the next peak, not after.

## Words they use vs. words they reject

| They say | They reject |
|---|---|
| WISMO tickets | Customer enquiries |
| Dispatch cutoff | Shipment deadline |
| Lane | Route |
| Rate comparison | Rate optimisation |
| Carrier portal | Carrier platform |
| Returns rate | Reverse logistics rate |
| Label batch | Bulk dispatch |
| Tracking number | Consignment reference |
| Out-of-area surcharge | Remote area fee |
| CS team | Customer support function |

## Competitive context
eCommerce ops managers typically use Linnworks, Veeqo, or ShipStation for order management with direct carrier integrations bolted on. When costs become painful they evaluate Sendcloud (strong EU positioning, popular with Shopify brands), Shiptheory (UK-focused, clean Shopify integration), and occasionally Metapack (enterprise-grade, often too heavy for their volume). The real competitor is the current carrier mix managed manually, which they know is imperfect but works well enough to avoid change.

## Primary conversion goal
Run the Cross-Border Rate Comparison tool for their top three EU lanes, see the per-shipment saving, and book a 20-minute platform walkthrough.

## Voice notes for this ICP
- WISMO is the pain language they use internally. Use it without explanation.
- Address the CS team's problem separately from the Ops Manager's problem. They are different people with different frustrations.
- The Peak Commerce case study (WISMO tickets down 68%, costs down 42%) maps directly. Reference it by number.
- EU lane coverage is a buying criterion, not a nice-to-have. Name specific EU carriers early.
- Do not lead with features. Lead with what the CS team's morning looks like after versus before.
