# ICP — B2B

## The mode
They are shipping 200 to 800 palletised or parcel orders per week to distributors, wholesalers, and retail buyers. Their dispatch team is competent but buried. Every morning they pull the confirmed order list from the ERP, manually evaluate each order against carrier options, make a booking, and re-enter the tracking number back into the ERP so sales can update the customer. It is 20 hours a week of data entry that nobody considers a priority to fix because it has always worked this way.

## Who they are
- Job title(s): Supply Chain Director, Dispatch Manager, Logistics Manager, Operations Director, Warehouse Manager
- Company size: £5m–£50m revenue, 200–800 orders per week
- Team size: 3–12 in dispatch and warehouse
- Tooling: SAP, Sage, or Microsoft Dynamics as ERP; individual carrier accounts with DPD, DHL, UPS, Evri; manual booking via carrier portals
- Reporting line: Reports to Operations Director or MD; manages dispatch supervisors and warehouse leads

## Top 3 pains (in their words)
1. **"My dispatch team spends half the day on the phone with carriers instead of managing the operation"** — Manual carrier selection requires a call or portal login for each order. At 500 orders a week, that is the team's entire morning before they have touched a single physical shipment. Exceptions get missed because the routine work crowds them out.
2. **"Every routing error costs us a redelivery charge and a difficult conversation with the buyer"** — Wrong service tier on a time-critical order. Wrong carrier for a Highlands delivery. The redelivery charge hits the P&L and the buyer calls to ask why their delivery window was missed. Both are avoidable with better dispatch logic.
3. **"Order data goes into the ERP and I have to re-key it into the carrier portal by hand"** — Two separate data entry steps for every shipment. Transposing errors are common. When a tracking number is entered incorrectly in the ERP, the sales team forwards the wrong number to the buyer and the first WISMO call goes to sales rather than CS.

## Top 3 jobs-to-be-done
1. **When an order is confirmed in the ERP, I want carrier selection and booking to trigger automatically based on weight, destination, and delivery window, so my dispatch team handles exceptions rather than routine bookings.**
2. **When I am dispatching a pallet to the Highlands, I want the system to apply the correct out-of-area surcharge and route to the right carrier automatically, so I stop getting redelivery charges for miscoded postcodes.**
3. **When a sales colleague asks for a tracking number, I want it already in the ERP order record, so nobody re-keys data and nobody forwards the wrong number to a buyer.**

## Conversion triggers (what makes them book a call)
1. Redelivery charges in a quarter exceed a threshold that the CFO notices and asks the ops director to explain.
2. The ERP is being upgraded or replaced and there is a window to connect shipping automation at the same time.
3. A new national account is won that doubles outbound volume and the existing manual process clearly cannot absorb it.

## Disqualifiers (what makes them bounce)
1. No Sage integration. A significant portion of UK mid-market manufacturers run Sage 50 or Sage 200. If it is not listed, they assume the integration does not exist.
2. The platform only handles parcels, not pallets. B2B dispatches include both and they will not run two separate systems.
3. The routing rules interface looks complicated. They need a Dispatch Manager, not a developer, to set up and maintain the rules.
4. No mention of ERP write-back. If tracking numbers do not flow back into the ERP automatically, the core data-entry problem is not solved.

## Words they use vs. words they reject

| They say | They reject |
|---|---|
| Routing rules | Automation logic |
| Redelivery charge | Failed delivery fee |
| Out-of-area | Remote surcharge |
| Pallet | Large parcel |
| ERP write-back | Data sync |
| Delivery window | Time slot |
| Dispatch supervisor | Shipping team lead |
| Carrier booking | Shipment creation |
| Highlands | Remote zone |
| Purchase order | Order reference |

## Competitive context
B2B manufacturers at this scale typically book carriers directly through portals (DHL MyDHL+, DPD Shipping Portal) and manage everything with a combination of ERP exports and manual re-keying. When they evaluate a platform, they look at Metapack (usually too large), Shiptheory (parcel-focused, limited freight), and their ERP vendor's native shipping module. The Atlas Industrial case study (90% automated routing, redelivery costs to near zero, 20 hours/week of manual data entry eliminated) is a direct proof point for this ICP.

## Primary conversion goal
Book a 30-minute ERP integration review. The demo should show the order-in to tracking-number-back workflow inside their specific ERP environment.

## Voice notes for this ICP
- Robert Hayes's quote ("Our dispatch team used to be on the phone all day. Now the system does the routing and they focus on exceptions.") opens every conversation with this ICP.
- Name their ERP in the first message. "Works with Sage" converts faster than "integrates with your existing system."
- Focus on the dispatch team's daily experience, not on the technology. They are not evaluating software. They are evaluating whether their team's mornings will be different.
- The Highlands and out-of-area surcharge is a specific, recognisable pain for any UK B2B shipper. Use it.
- Avoid freight-class language that is more common in US logistics. UK B2B shippers think in weight tiers and delivery windows, not freight classes.
