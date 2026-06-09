import VerticalPage from "@/components/sections/VerticalPage";
import SolutionHero from "@/components/sections/SolutionHero";
import SolutionPains from "@/components/sections/SolutionPains";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Settings, ArrowLeftRight, MapPin, Package, Factory } from "lucide-react";

export const metadata = buildMetadata({
  title: "B2B shipping software for UK wholesalers and manufacturers",
  description:
    "Connect SAP, Sage, NetSuite, or Dynamics to every UK parcel and pallet carrier. Connexx automates carrier selection, writes tracking back to your ERP, and stops the redelivery charges.",
  path: "/solutions/b2b",
});

const PAINS = [
  {
    num: "01",
    title: "The dispatch team spends the morning on the phone",
    desc: "At 500 orders a week, your dispatch supervisor and their team work through carrier portals for the first three hours of every shift. By the time they touch a physical shipment, half the day is gone. Exceptions get missed because the routine bookings crowd them out.",
  },
  {
    num: "02",
    title: "Routing errors trigger redelivery charges the CFO notices",
    desc: "A Highlands postcode booked through the wrong carrier. A two-pallet consignment sent on a parcel service. Each routing mistake turns into a redelivery charge, a difficult call with the buyer, and a P&L line the Finance Director eventually asks about. Atlas Industrial was losing £8,000 a month to this before automation.",
  },
  {
    num: "03",
    title: "Tracking numbers re-keyed from the carrier portal into the ERP",
    desc: "Order data goes into the ERP. Booking data goes into the carrier portal. Tracking data comes back on a CSV the dispatch supervisor opens at 4pm and pastes into SAP by hand. Transposition errors slip through. Sales forwards the wrong tracking number. The first WISMO call goes to the wrong team.",
  },
];

export default function B2BManufacturingPage() {
  return (
    <>
      <SolutionHero
        label="B2B"
        title="B2B dispatch that runs from your ERP, not a portal."
        subtitle="Orders confirmed in SAP, Sage, NetSuite, or Dynamics trigger carrier selection, booking, and label generation automatically. Tracking and PODs write back within seconds."
        primary={{ label: "Contact Us", href: "/contact?enquiry=b2b" }}
        secondary={{ label: "Learn More", href: "/resources/case-studies/rioz-global" }}
        image={{
          src: "/solutions/b2b-hero.webp",
          alt: "Warehouse stacked with palletised B2B cargo boxes ready for dispatch",
          gradient: "from-bg-dark via-bg-dark-card to-accent/30",
          icon: Factory,
        }}
        chips={[
          { name: "SAP" },
          { name: "NetSuite" },
          { name: "Sage" },
          { name: "Dynamics 365" },
          { name: "DPD", logo: "/logos/carriers/DPD-LOGO.png" },
          { name: "Parcelforce", logo: "/logos/carriers/parcel-force.svg" },
        ]}
      />
      <SolutionPains
        pains={PAINS}
        image={{
          src: "/solutions/b2b-pains-v2.webp",
          alt: "Warehouse-club B2B display stacked with Kristin Ess hair-care duo packs on branded pallets",
          gradient: "from-accent-light via-white to-accent/15",
          icon: Factory,
        }}
        lead="Three places palletised dispatch leaks margin before the next P&L lands on the Finance Director's desk."
      />
      <VerticalPage
        hideDefaultHero
        hidePainPoints
      label="B2B"
      title="B2B dispatch that runs from your ERP, not a portal."
      subtitle="UK wholesalers and manufacturers ship 500 palletised orders a week through carrier portals nobody has time to manage. Connexx connects to SAP, Sage, NetSuite, and Microsoft Dynamics. Orders confirmed in the ERP trigger carrier selection, booking, and label generation automatically. Tracking numbers and PODs write back to the ERP within seconds."
      primaryCta={{ label: "Contact Us", href: "/contact?enquiry=b2b" }}
      secondaryCta={{ label: "Learn More", href: "/resources/case-studies/rioz-global" }}
      pains={PAINS}
      features={[
        {
          icon: Settings,
          title: "Carrier selection from the ERP order",
          desc: "When an order is confirmed in SAP, Sage, NetSuite, or Microsoft Dynamics, Connexx reads the weight, destination, delivery window, and customer rules. The right parcel carrier or pallet network is selected automatically. DPD, Parcelforce, DHL Express, Pall-Ex, and Palletline all sit in the same rate engine.",
        },
        {
          icon: ArrowLeftRight,
          title: "ERP write-back without the CSV",
          desc: "Tracking numbers, booking confirmations, and proofs of delivery flow back into the ERP order record within seconds. Sales sees the tracking against the purchase order. Finance sees the cost against the cost centre. The dispatch supervisor stops touching CSVs.",
        },
        {
          icon: MapPin,
          title: "Highlands and out-of-area routing handled in the rules",
          desc: "The platform applies the right out-of-area surcharge and routes the consignment to the carrier that actually delivers to that postcode. Highlands & Islands, Channel Islands, and Northern Ireland are routed automatically. Redelivery charges from miscoded postcodes drop to near zero.",
        },
        {
          icon: Package,
          title: "Pallets and parcels in one workflow",
          desc: "A 25kg parcel goes on DPD. A two-pallet consignment goes on Pall-Ex. A timed delivery into a Tesco RDC goes with the booking-in reference embedded on the BOL. One dashboard, one set of routing rules, every weight tier from a single envelope to a full pallet.",
        },
      ]}
      integrations={[
        {
          name: "SAP",
          description:
            "S/4HANA and SAP ECC. Sales orders and deliveries sync into Connexx. Tracking and POD write back to SAP.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Sage",
          description:
            "Sage 200, Sage X3, and Sage 50. Dispatch supervisors stop re-keying tracking numbers from carrier portals.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Microsoft Dynamics",
          description:
            "Dynamics 365 and Business Central. Carrier booking triggered on order confirmation inside the existing Dynamics workflow.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Oracle NetSuite",
          description:
            "NetSuite-confirmed orders flow into Connexx for rate comparison, booking, and ERP write-back.",
          href: "/integrations/erp-wms",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description: "DPD Next Day, Two Day, and Saturday for B2B parcel volume across Mainland UK and the EU.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "Parcel Force",
          logo: "/logos/carriers/parcel-force.svg",
          description:
            "Parcelforce Express24, Express48, and Worldwide for tracked B2B parcels and small consignments.",
          href: "/integrations/carriers/parcel-force",
        },
        {
          name: "UPS",
          logo: "/logos/carriers/ups_logo.png",
          description: "UPS Standard and Expedited for B2B routing across the UK and EU lanes.",
          href: "/integrations/carriers",
        },
        {
          name: "DHL Express",
          logo: "/logos/carriers/dhl_logo.webp",
          description:
            "DHL time-definite for B2B shipments that have to land on the buyer's dock by a named hour.",
          href: "/integrations/carriers/dhl",
        },
      ]}
      caseStudy={getCaseStudiesBySolution("B2B")[0] ?? caseStudies[5]}
      faq={[
        {
          question: "Does Connexx integrate with SAP for B2B shipping?",
          answer:
            "Yes. Connexx integrates with SAP S/4HANA and SAP ECC. Sales orders and deliveries sync into Connexx automatically. The rate engine picks the right parcel carrier or pallet network per consignment based on weight, destination, and delivery window. Tracking numbers, PODs, and audit logs write back to SAP for compliance. Atlas Industrial's dispatch team handles three times the volume on the same headcount since the integration went live.",
        },
        {
          question: "What's the difference between parcel and pallet shipping for B2B?",
          answer:
            "Parcel covers consignments under roughly 30kg single-piece, typically through DPD, Parcelforce, DHL Express, or UPS. Pallet covers anything heavier or larger, through networks like Pall-Ex, Palletline, Palletways, or DX Freight. Connexx rate-shops across both layers in one workflow. You pick the cheapest compliant lane for every order without manually deciding parcel versus pallet.",
        },
        {
          question: "Does Connexx work with Sage for dispatch automation?",
          answer:
            "Yes. Connexx integrates with Sage 50, Sage 200, and Sage X3. When a sales order is confirmed in Sage, Connexx selects the carrier and books the collection. Tracking numbers and delivery confirmations write back to the Sage order record. There is no CSV step. Most Sage-anchored wholesalers go live in five business days.",
        },
        {
          question: "How do you handle Highlands & Islands and out-of-area surcharges?",
          answer:
            "Connexx applies the correct out-of-area surcharge automatically based on the destination postcode. Highlands & Islands, Channel Islands, and Northern Ireland are routed to carriers that actually deliver to those zones, with the right service tier and the right transit time. Redelivery charges from miscoded postcodes drop to near zero once routing rules are configured.",
        },
        {
          question: "How do I book a timed delivery to a UK retailer DC?",
          answer:
            "Use a carrier that supports timed and booked-in delivery (DPD AM, DHL Time Definite, Parcelforce Express AM, or a pallet network with booking-in service). The booking reference and delivery slot must travel with the manifest. Connexx stores the DC's booking-in profile per customer, generates the BOL with the reference embedded, and routes through the right service automatically. Tesco, Asda, and major retailer RDCs are pre-configured.",
        },
        {
          question: "Can we keep our existing carrier accounts and contracts?",
          answer:
            "Yes. Connexx supports your existing accounts and negotiated rates across DPD, Parcelforce, DHL Express, UPS, Pall-Ex, Palletline, Palletways, and DX Freight. If your contracts are weak, ITD's volume across thousands of UK shippers unlocks better rates. You keep the carrier relationship. We improve the price and remove the data entry.",
        },
      ]}
      closingCta={{
        headline: "Get the dispatch team off the phone.",
        subhead:
          "30 minutes with an integration engineer. We show you the order-to-tracking flow inside your ERP. No demo deck.",
        primary: { label: "Contact Us", href: "/contact?enquiry=b2b" },
        secondary: { label: "Learn More", href: "/resources/case-studies/rioz-global" },
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name: "B2B", path: "/solutions/b2b" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "B2B shipping software",
          description:
            "ERP-integrated multi-carrier shipping platform for UK wholesalers and manufacturers. Connects SAP, Sage, NetSuite, and Microsoft Dynamics to parcel carriers and pallet networks with automated dispatch and ERP write-back.",
          path: "/solutions/b2b",
          serviceType: "B2B and Wholesale Shipping Software",
          areaServed: ["United Kingdom", "European Union"],
        }),
      ]}
      />
    </>
  );
}
