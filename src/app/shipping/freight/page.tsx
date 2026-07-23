import VerticalPage from "@/components/sections/VerticalPage";
import VideoHero from "@/components/sections/VideoHero";
import SolutionPains from "@/components/sections/SolutionPains";
import FreightServices from "@/components/sections/FreightServices";
import FreightAudience from "@/components/sections/FreightAudience";
import FreightCarrierTicker from "@/components/sections/FreightCarrierTicker";
import { caseStudies, getCaseStudiesByShippingType, getRelevantCaseStudies } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { PackageOpen } from "lucide-react";

export const metadata = buildMetadata({
  title: "Freight shipping",
  description:
    "Book UK pallet networks, EU freight lanes, and worldwide LCL/FCL on one platform. Live rates from Pall-Ex, Palletline, Palletways, DHL, and more.",
  path: "/shipping/freight",
});

const PAINS = [
  {
    num: "01",
    title: "Regular & reliable departures",
    desc: "Fixed weekly schedules, so your supply chain runs to a timetable you can plan around. The cut-off and the departure hold, week after week.",
  },
  {
    num: "02",
    title: "Our own office in China",
    desc: "Our team sits in the same time zone as your factories and works with them directly. That means quicker collections and paperwork that's right first time.",
  },
  {
    num: "03",
    title: "A named account contact",
    desc: "One person who knows your lanes and your suppliers, and already has the context when you call.",
  },
];

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Shipping", path: "/shipping" },
  { name: "Freight", path: "/shipping/freight" },
];

/** TL;DR — every bullet is verifiable against this page's own copy. */
const TLDR = [
  "We move UK businesses' freight worldwide by pallet, road, air and sea, with customs handled and one team managing it from collection to delivery.",
  "We offer pallet and LTL, air and sea freight (FCL, LCL and buyers consolidation), and the Console Sample Service, all with in-house customs clearance.",
  "The Console Sample Service runs a fixed weekly air consolidation from China, collected by our own team there and delivered to your UK address each Tuesday at a set rate.",
];

export default function ShippingFreightPage() {
  return (
    <>
      {/* Autoplay looped muted video hero (air-cargo loading loop). Reuses the
          homepage VideoHero machinery: reduced-motion → poster, dark scrim,
          nav-bleed, data-hero-tone="dark". */}
      <VideoHero
        breadcrumbs={CRUMBS}
        label="Freight"
        heading="Freight built around your supply chain"
        sub="We move your freight between the UK and the rest of the world, by pallet, road, air and sea, with customs handled and one team managing it from collection to delivery. Importing from the Far East runs through our own office on the ground there."
        primary={{ label: "Get Quote", href: "/contact?enquiry=freight" }}
        secondary={{ label: "Contact Sales", href: "/contact?enquiry=freight" }}
        videoSrc="/hero/freight.mp4"
        poster="/hero/freight-poster.jpg"
      />
      <SolutionPains
        pains={PAINS}
        image={{
          src: "/shipping/what-sets-itd-apart.jpg",
          alt: "What sets ITD apart",
          objectPosition: "50% 70%",
        }}
        eyebrow=""
        heading="What sets ITD apart"
        lead="Three things that make freight work, built into the service from the start."
      />
      <FreightCarrierTicker />
      <FreightServices />
      <FreightAudience />
      <VerticalPage
        integrationsContext="Freight"
        hideDefaultHero
        hidePainPoints
        label="Freight"
        title="Freight built around your supply chain"
        subtitle="We move your freight between the UK and the rest of the world, by pallet, road, air and sea, with customs handled and one team managing it from collection to delivery. Importing from the Far East runs through our own office on the ground there."
        primaryCta={{ label: "Get Quote", href: "/contact?enquiry=freight" }}
        heroImage={{
          gradient: "from-accent-light via-white to-accent/15",
          icon: PackageOpen,
        }}
        secondaryCta={{
          label: "Contact Sales",
          href: "/contact?enquiry=freight",
        }}
        keyTakeaways={TLDR}
        breadcrumbs={CRUMBS}
        jsonLd={[
          serviceSchema({
            name: "Freight & Pallet Shipping",
            description:
              "Multi-network freight and pallet shipping platform. Connexx routes UK pallet networks (Pall-Ex, Palletline, Palletways), LTL, parcel carriers, and worldwide air and sea freight from one workflow. Connected to NetSuite and your existing systems.",
            path: "/shipping/freight",
            serviceType: "UK and International Freight & Pallet Shipping",
            areaServed: ["United Kingdom", "European Union", "Worldwide"],
          }),
        ]}
        pains={PAINS}
        caseStudy={getCaseStudiesByShippingType("Freight")[0] ?? caseStudies[4]}
        caseStudies={getRelevantCaseStudies({ shippingTypes: ["Freight"] })}
        faq={[
          {
            question: "What freight services does ITD Global offer?",
            answer:
              "Pallet and LTL, air freight, sea freight (FCL, LCL and buyers consolidation), the Console Sample Service, and shipment consolidation. All of them include in-house customs clearance and a named account contact.",
          },
          {
            question: "Do you handle pallet and LTL freight?",
            answer:
              "Yes. We move pallets and part-loads UK to worldwide across road, pallet and groupage networks, with customs handled on international lanes and one account for the lot.",
          },
          {
            question: "What is the Console Sample Service?",
            answer:
              "A fixed weekly air freight consolidation from China. Our China team collects samples from your suppliers, consolidates them into one shipment, clears customs, and delivers to your UK address each Tuesday at a set rate.",
          },
          {
            question: "What is the difference between FCL and LCL?",
            answer:
              "FCL is a full, dedicated container, most cost-effective for large volumes. LCL means your cargo shares a container and you pay only for the space you use. We'll advise on which suits your volumes and route.",
          },
          {
            question: "What is buyers consolidation?",
            answer:
              "We collect cargo from multiple suppliers and combine it into one container before shipping to the UK. Ideal for importers sourcing from several factories at similar times. One container, one invoice, lower cost.",
          },
          {
            question: "Does ITD handle customs clearance?",
            answer:
              "Yes, in-house across all freight services. Our team prepares and submits the HMRC import entries. You provide invoices and packing lists, and we handle the rest.",
          },
          {
            question: "Who manages my account?",
            answer:
              "A named contact who stays with you throughout and knows your routes, suppliers and requirements.",
          },
          {
            question: "Does ITD offer UK warehousing once goods arrive?",
            answer:
              "Yes, through Delta Fulfilment. Unloading, storage, pick and pack, marketplace integrations and returns, all available as a direct extension of your freight service.",
          },
        ]}
        closingCta={{
          headline: "Let's move your freight",
          subhead:
            "A bespoke review looks at your lanes and volumes and shows where we'd save you money, across pallet, LTL, air and sea.",
          primary: { label: "Get Quote", href: "/contact?enquiry=freight" },
          secondary: {
            label: "Contact Sales",
            href: "/contact?enquiry=freight",
          },
        }}
      />
    </>
  );
}
