import VerticalPage from "@/components/sections/VerticalPage";
import SolutionHero from "@/components/sections/SolutionHero";
import SolutionPains from "@/components/sections/SolutionPains";
import FreightServices from "@/components/sections/FreightServices";
import FreightAudience from "@/components/sections/FreightAudience";
import FreightCarrierTicker from "@/components/sections/FreightCarrierTicker";
import { caseStudies, getCaseStudiesByShippingType } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { PackageOpen } from "lucide-react";

export const metadata = buildMetadata({
  title: "Pallet and freight shipping software for UK businesses",
  description:
    "Book UK pallet networks, EU freight lanes, and worldwide LCL/FCL on one platform. Live rates from Pall-Ex, Palletline, Palletways, DHL, and more.",
  path: "/shipping/freight",
});

const PAINS = [
  {
    num: "01",
    title: "Regular, reliable departures",
    desc: "Fixed weekly schedules so your supply chain runs to a timetable, not a best-efforts estimate. The same cut-off, the same departure, every week.",
  },
  {
    num: "02",
    title: "Local China office",
    desc: "Our team is based in China, working directly with your factories in the same time zone. Faster collections, accurate documentation, fewer delays.",
  },
  {
    num: "03",
    title: "Dedicated customer service",
    desc: "A named account contact who knows your lanes and suppliers. One call. One person. Done.",
  },
];

export default function ShippingFreightPage() {
  return (
    <>
      <SolutionHero
        label="Freight"
        title="Freight services built around your supply chain."
        subtitle="ITD Global is a UK logistics partner specialising in international freight for businesses that import regularly from China and beyond. One point of contact. Customs handled for you. A China team on the ground."
        primary={{ label: "Get Quote", href: "/contact?enquiry=freight" }}
        secondary={{ label: "Learn More", href: "/resources/case-studies/home-bargains" }}
        image={{
          src: "/shipping/Freight hero - 1.jpeg",
          alt: "Container port at sunset with cargo ship and aircraft",
          objectPosition: "50% 50%",
        }}
      />
      <SolutionPains
        pains={PAINS}
        image={{
          src: "/shipping/what sets ITD apart.png",
          alt: "What sets ITD apart",
          objectPosition: "50% 70%",
        }}
        eyebrow=""
        heading="What sets ITD apart."
        lead="Three things that make freight work, when they're built into the service from the start."
      />
      <FreightCarrierTicker />
      <FreightServices />
      <FreightAudience />
      <VerticalPage
        hideDefaultHero
        hidePainPoints
        label="Freight"
        title="Freight services built around your supply chain."
        subtitle="ITD Global is a UK logistics partner specialising in international freight for businesses that import regularly from China and beyond. One point of contact. Customs handled for you. A China team on the ground."
        primaryCta={{ label: "Get Quote", href: "/contact?enquiry=freight" }}
        heroImage={{
          gradient: "from-accent-light via-white to-accent/15",
          icon: PackageOpen,
        }}
        secondaryCta={{
          label: "Learn More",
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
        pains={PAINS}
        caseStudy={getCaseStudiesByShippingType("Freight")[0] ?? caseStudies[4]}
        caseStudies={getCaseStudiesByShippingType("Freight")}
        faq={[
          {
            question: "What freight services does ITD Global offer?",
            answer:
              "Air freight, sea freight (FCL, LCL, buyers consolidation), the Console Sample Service, and shipment consolidation. All services include in-house customs clearance and a dedicated account contact.",
          },
          {
            question: "What is the Console Sample Service?",
            answer:
              "A fixed weekly air freight consolidation from China. ITD's China team collects samples from your suppliers, consolidates them into one shipment, clears customs, and delivers to your UK address every Tuesday at a set rate.",
          },
          {
            question: "What is the difference between FCL and LCL?",
            answer:
              "FCL is a full, dedicated container most cost-effective for large volumes. LCL means your cargo shares a container and you pay only for the space you use. We'll advise on which suits your volumes and route.",
          },
          {
            question: "What is buyers consolidation?",
            answer:
              "We collect cargo from multiple Chinese suppliers and combine it into one container before shipping to the UK. Ideal for importers sourcing from several factories at similar times — one container, one invoice, lower cost.",
          },
          {
            question: "Does ITD handle customs clearance?",
            answer:
              "Yes, in-house across all freight services. Our team prepares and submits all HMRC import entries. You provide invoices and packing lists, we handle everything else.",
          },
          {
            question: "Who manages my account?",
            answer:
              "A named contact, not a rotating helpdesk. The same person throughout, who knows your routes, suppliers, and requirements.",
          },
          {
            question: "Does ITD offer UK warehousing once goods arrive?",
            answer:
              "Yes, through Delta Fulfilment. Unloading, storage, pick and pack, marketplace integrations, and returns all available as a direct extension of your freight service.",
          },
        ]}
        closingCta={{
          headline: "One platform for every pallet, parcel, and container.",
          subhead:
            "A tailored review covers your top freight lanes, your current pallet network mix, and the per-consignment saving across UK pallet, LTL, and international freight tiers.",
          primary: { label: "Get Quote", href: "/contact?enquiry=freight" },
          secondary: {
            label: "Explore",
            href: "/resources/case-studies",
          },
        }}
      />
    </>
  );
}
