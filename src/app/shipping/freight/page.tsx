import VerticalPage from "@/components/sections/VerticalPage";
import { caseStudies, getCaseStudiesByShippingType } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import {
  Route,
  Clock,
  Eye,
  RefreshCw,
  Factory,
  Building2,
  Truck,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "Pallet and freight shipping software for UK businesses",
  description:
    "Book UK pallet networks, EU freight lanes, and worldwide LCL/FCL on one platform. Live rates from Pall-Ex, Palletline, Palletways, DHL, and more.",
  path: "/shipping/freight",
});

export default function ShippingFreightPage() {
  return (
    <VerticalPage
      label="Freight"
      title="Pallet, freight, and parcel shipping on one platform."
      subtitle="UK pallet networks, European LTL lanes, worldwide LCL and FCL containers, and parcel carriers all run through Connexx. Home Bargains consolidates samples from 200+ Chinese factories into one weekly air freight shipment, cutting costs 30–35% and guaranteeing Tuesday delivery for every buyer. Stop calling three brokers for every freight quote. Stop running pallets through one system and parcels through another. One workflow, every weight tier."
      primaryCta={{ label: "Get a freight quote", href: "/contact?enquiry=freight" }}
      secondaryCta={{
        label: "Read the Home Bargains story (3 min)",
        href: "/resources/case-studies/home-bargains",
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Shipping", path: "/shipping" },
        { name: "Freight", path: "/shipping/freight" },
      ]}
      jsonLd={[
        serviceSchema({
          name: "Freight & Pallet Shipping",
          description:
            "Multi-network freight and pallet shipping platform. Connexx routes UK pallet networks (Pall-Ex, Palletline, Palletways), LTL, parcel carriers, and worldwide air and sea freight from one workflow. Connected to SAP, Sage, NetSuite, and Microsoft Dynamics.",
          path: "/shipping/freight",
          serviceType: "UK and International Freight & Pallet Shipping",
          areaServed: ["United Kingdom", "European Union", "Worldwide"],
        }),
      ]}
      pains={[
        {
          num: "01",
          title: "Visibility gap between pallet networks and parcel carriers",
          desc: "Your dispatch supervisor tracks parcels through one carrier portal and pallets through another. The pallet network's tracking goes dark between depot scans. When a customer asks for an update on a half-pallet consignment in transit, the answer is \"we're chasing the network.\" Three hours later you get a partial update. The customer is already on the phone.",
        },
        {
          num: "02",
          title: "Weight-tier optimisation done by hand",
          desc: "A 25kg consignment can ship as two parcels through DPD or as a mini-pallet through Palletline. The right answer depends on dimensions, destination, lead time, and the rate card you have on the day. Most dispatch teams default to the carrier they used last week. The wrong choice on each consignment costs £5 to £20. Across 500 consignments a week, that is a problem the CFO eventually notices.",
        },
        {
          num: "03",
          title: "Redelivery costs on missed slots",
          desc: "A pallet network's driver attempts delivery at 11am. The consignee's goods-in opens at 10am to 2pm but the dispatch was booked for \"AM delivery\" without a specific slot. The driver leaves a card. The consignee calls the network. The network books a redelivery for two days later and charges £35. Multiply by 500 pallets a week and you are watching margin walk out the door.",
        },
      ]}
      audienceAnchors={[
        {
          anchor: "b2b",
          headline: "Built for B2B",
          summary:
            "Pallet routing runs straight from your ERP — SAP, Sage, NetSuite, or Dynamics. 200 to 800 palletised orders a week, booked the moment the order is confirmed.",
          solutionTag: "B2B",
          category: "By business model",
          image: { gradient: "from-accent-light via-white to-bg-secondary", icon: Factory },
          href: "/solutions/b2b",
        },
        {
          anchor: "enterprise",
          headline: "Built for Enterprise",
          summary:
            "Pallet networks, LTL, air, and FCL containers across every region in one view. Rate cards, lane performance, and SLA reporting consolidated from 6–12 portals into one.",
          solutionTag: "Enterprise",
          category: "By stage",
          image: { gradient: "from-bg-secondary via-white to-accent-light", icon: Building2 },
          href: "/solutions/enterprise",
        },
        {
          anchor: "3pl",
          headline: "Built for 3PLs",
          summary:
            "Pallets and parcels in one workflow for 20 to 80 brands. Per-client carrier preferences and packaging rules configured once, dispatched across every UK network.",
          solutionTag: "3PL",
          category: "By business model",
          image: { gradient: "from-accent-light via-white to-bg-secondary", icon: Truck },
          href: "/solutions/3pl",
        },
      ]}
      carrierComparison={{
        title: "Freight network comparison",
        intro:
          "Freight rates change shape across networks, weight tiers, and lanes. The comparison below covers the three primary freight tiers Connexx routes against: UK pallet networks, road and air LTL, and worldwide container freight.",
        columns: ["Carriers", "Weight / volume tier", "Lead time", "Lane coverage", "Best for"],
        rows: [
          {
            carrier: "UK pallet networks",
            cells: [
              "Pall-Ex, Palletline, Palletways, Hazchem, Fortec",
              "Mini, quarter, half, full pallet up to 1,200kg",
              "Next-day Mainland UK, 2-day Highlands & Islands and NI",
              "Every UK postcode through the hub-and-spoke model. Palletways strongest for UK-EU lanes",
              "Palletised shipments needing reliable next-day to retail and distributor sites",
            ],
          },
          {
            carrier: "LTL and air freight",
            cells: [
              "DPD, Parcelforce, DHL Express, FedEx, UPS",
              "30kg+ per piece up to no ceiling on air freight",
              "Next-day UK, 1–2 day EU, 24–96 hours worldwide",
              "UK national, EU groupage and dedicated lanes, 220+ countries by air",
              "Time-critical freight, irregular dimensions, high-value or dangerous goods",
            ],
          },
          {
            carrier: "Container freight (LCL / FCL)",
            cells: [
              "Partner freight forwarders for sea LCL and FCL",
              "Per cubic metre (LCL) or 20ft, 40ft, 40ft HC, 45ft containers (FCL)",
              "4–8 weeks port to port",
              "Worldwide deepsea routes, port-to-port and door-to-door",
              "Cost-sensitive high-volume international freight where lead time is acceptable",
            ],
          },
        ],
        footnote:
          "Connexx integrates with all UK pallet networks and the international freight tiers. Rates compare in the same engine as parcel rates so a 25kg consignment can route via parcel or pallet based on cost and lead time.",
      }}
      features={[
        {
          icon: Route,
          title: "Pallet and parcel routing in one rate engine.",
          desc: "Every consignment is rated against UK pallet networks (Pall-Ex, Palletline, Palletways), LTL options, parcel carriers (DPD, Parcelforce, DHL), and international freight tiers in the same query. The platform picks the cheapest compliant option for the weight, dimensions, destination, and delivery window. Manual overrides remain available for known-difficult consignments.",
        },
        {
          icon: Clock,
          title: "Pre-9, pre-10:30, and timed delivery slots applied per consignee.",
          desc: "Routing rules store each consignee's goods-in window. Connexx books the right service tier automatically. Pre-9 for B&Q distribution centres, pre-noon for Tesco RDCs, timed delivery for high-value B2B sites. Redelivery charges from miscoded slots drop to near zero.",
        },
        {
          icon: Eye,
          title: "Consignment tracking unified across networks.",
          desc: "Pallet network scans, parcel carrier scans, and freight forwarder updates all flow into one consignment record. Your dispatch supervisor sees a single timeline. Sales sees the same data inside the ERP without re-keying tracking numbers from carrier portals.",
        },
        {
          icon: RefreshCw,
          title: "ERP-connected dispatch with PODs back to the order.",
          desc: "SAP, Sage, NetSuite, and Microsoft Dynamics orders trigger carrier selection, booking, and label or CMR generation automatically. Tracking numbers, ETAs, and signed PODs write back to the ERP within seconds. The dispatch team handles exceptions instead of routine bookings.",
        },
      ]}
      integrations={[
        {
          name: "Pall-Ex",
          description:
            "UK pallet network covering every postcode through the hub model. Quarter, half, and full pallet services.",
          href: "/integrations",
        },
        {
          name: "Palletline",
          description:
            "UK pallet network with strong Mainland UK and Islands coverage. Heavier pallet capability.",
          href: "/integrations",
        },
        {
          name: "Palletways",
          description:
            "UK and Europe pallet network. Strongest UK-EU pallet lane coverage of the three networks.",
          href: "/integrations",
        },
        {
          name: "DPD",
          logo: "/logos/carriers/DPD-LOGO.png",
          description:
            "Bulk parcel consignments below pallet threshold. Multi-parcel collection from one site.",
          href: "/integrations/carriers/dpd",
        },
        {
          name: "Parcelforce",
          logo: "/logos/carriers/parcel-force.svg",
          description:
            "Heavier parcels to remote UK postcodes. Globalexpress for international freight tiers.",
          href: "/integrations/carriers/parcelforce",
        },
        {
          name: "DHL Express",
          logo: "/logos/carriers/dhl_logo.webp",
          description:
            "Worldwide air freight to 220+ countries. Time-critical and high-value goods.",
          href: "/integrations/carriers/dhl",
        },
        {
          name: "SAP",
          description:
            "Confirmed freight orders trigger automated carrier selection, booking, and CMR documentation in Connexx.",
          href: "/integrations/erp-wms",
        },
        {
          name: "Microsoft Dynamics",
          description:
            "Dynamics 365 orders route through Connexx for parcel, pallet, and freight dispatch.",
          href: "/integrations/erp-wms",
        },
      ]}
      caseStudy={getCaseStudiesByShippingType("Freight")[0] ?? caseStudies[4]}
      caseStudies={getCaseStudiesByShippingType("Freight")}
      faq={[
        {
          question: "Does ITD handle pallet shipments as well as parcels?",
          answer:
            "Yes. Connexx routes pallets through UK pallet networks (Pall-Ex, Palletline, Palletways) and parcels through carriers (Royal Mail, DPD, Evri, Parcelforce, DHL) in the same workflow. The rate engine selects pallet or parcel based on weight, dimensions, destination, and your routing rules. A 25kg consignment can ship as two parcels or as a mini-pallet depending on which is cheaper and meets the delivery window.",
        },
        {
          question: "Which UK pallet networks does Connexx integrate with?",
          answer:
            "Pall-Ex, Palletline, and Palletways are the three primary integrations covering every UK postcode through the hub-and-spoke model. Each holds different strengths: Pall-Ex on reliable next-day Mainland UK, Palletline on heavier pallet capability and Islands coverage, Palletways on the strongest UK-EU pallet lanes. Additional pallet networks (Hazchem, Fortec) can be added on request through the integrations team.",
        },
        {
          question: "Can you handle palletised freight and parcel shipping from one platform?",
          answer:
            "Yes. Pallets, parcels, and international freight all run through the same Connexx rate engine and dispatch workflow. Your dispatch team uses one screen for the full range of weight tiers, from a 500g letter through a 1,000kg full pallet. Atlas Industrial runs 500+ weekly pallet shipments and parcel volume through the same platform with 90% of routing automated.",
        },
        {
          question: "Does ITD handle international freight?",
          answer:
            "Yes. Worldwide air freight runs through DHL Express, FedEx, and UPS. European road freight covers UK-EU pallet lanes via Palletways Europe and DPD. LCL and FCL sea freight runs through partner freight forwarders for high-volume consolidated movements. Customs documentation, bill of lading, and pre-clearance paperwork are generated automatically alongside the carrier booking.",
        },
        {
          question: "How do you handle weight tiers and dimensional weight?",
          answer:
            "Connexx reads each consignment's actual weight and dimensions against every carrier's rate card, including dimensional weight calculations where they apply. The rate engine compares parcel rates, mini-pallet rates, quarter-pallet, half-pallet, and full-pallet rates in milliseconds. The platform picks the tier that is cheapest for the actual weight and volume profile of the shipment. No more defaulting to \"whatever we used last week.\"",
        },
        {
          question: "What's the cutoff time for next-day pallet delivery?",
          answer:
            "Cutoff varies by pallet network and depot, typically between 4pm and 6pm for next-day Mainland UK delivery. Pall-Ex and Palletways operate national hubs with later cutoffs from regional depots. Highlands & Islands and Northern Ireland are 2-day standard. Connexx flags cutoff times against each consignment at the point of dispatch so your team books before the network deadline, not after.",
        },
      ]}
      closingCta={{
        headline: "One platform for every pallet, parcel, and container.",
        subhead:
          "A tailored review covers your top freight lanes, your current pallet network mix, and the per-consignment saving across UK pallet, LTL, and international freight tiers.",
        primary: { label: "Get a freight quote", href: "/contact?enquiry=freight" },
        secondary: {
          label: "Request a tailored review",
          href: "/contact?enquiry=freight",
        },
      }}
    />
  );
}
