import VerticalPage from "@/components/sections/VerticalPage";
import SolutionHero from "@/components/sections/SolutionHero";
import SolutionPains from "@/components/sections/SolutionPains";
import { caseStudies, getCaseStudiesBySolution } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/components/seo/JsonLd";
import { Building2 } from "lucide-react";

export const metadata = buildMetadata({
  title: "B2B & wholesale shipping — the right carrier for every order",
  description:
    "In wholesale, the delivery is the relationship. We match the right carrier and service to every B2B consignment — heavy, high-value, timed, UK or international — so deliveries land on time.",
  path: "/solutions/b2b",
});

const PAINS = [
  {
    num: "01",
    title: "One late delivery can lose you the account",
    desc: "In wholesale, the buyer remembers the consignment that turned up late or not at all. One bad delivery and the next order goes elsewhere.",
  },
  {
    num: "02",
    title: "Most carriers aren't built for business deliveries",
    desc: "A heavy, oversized box sent on a standard parcel service, or a business address on a residential network, turns up late or gets turned away. Bulky orders and timed deliveries need a carrier that's actually built for them.",
  },
  {
    num: "03",
    title: "International orders carry more risk and more paperwork",
    desc: "Send a high-value consignment abroad and the wrong carrier, or a commercial invoice that doesn't add up, can hold it at the border. The bigger the order, the more a delay hurts.",
  },
];

const HERO_TITLE = "In wholesale, the delivery is the relationship.";
const HERO_SUBTITLE =
  "B2B orders are heavy, high-value and tied to a long-term account, so the carrier has to be one that's genuinely good at delivering to businesses, on time. We guide the right carrier and service on each consignment.";
const PRIMARY = { label: "Get Quote", href: "/rate-checker/domestic" };
const SECONDARY = { label: "Explore", href: "/resources/case-studies" };

export default function B2BPage() {
  return (
    <>
      <SolutionHero
        label="B2B"
        title={HERO_TITLE}
        subtitle={HERO_SUBTITLE}
        primary={PRIMARY}
        secondary={SECONDARY}
        image={{
          src: "/solutions/b2b-hero.webp",
          alt: "Warehouse stacked with B2B cargo boxes ready for dispatch to business addresses",
          gradient: "from-bg-dark via-bg-dark-card to-accent/30",
          icon: Building2,
        }}
      />
      <SolutionPains
        pains={PAINS}
        image={{
          src: "/solutions/b2b-pains-v2.webp",
          alt: "Warehouse-club B2B display stacked with branded retail goods",
          gradient: "from-accent-light via-white to-accent/15",
          icon: Building2,
        }}
        eyebrow="Where deliveries go wrong"
        heading="What gets in the way today."
        lead="Three places a B2B order slips — a late delivery, the wrong carrier, a border hold — and the account can slip with it."
      />
      <VerticalPage
        hideDefaultHero
        hidePainPoints
        label="B2B"
        title={HERO_TITLE}
        subtitle={HERO_SUBTITLE}
        primaryCta={PRIMARY}
        secondaryCta={SECONDARY}
        pains={PAINS}
        caseStudy={getCaseStudiesBySolution("B2B")[0] ?? caseStudies[5]}
        faq={[
          {
            question: "Which timed delivery options can I offer?",
            answer:
              "Pre-9, Pre-10, Pre-12 and Next Day, on the carriers that run them. We match the service to what each delivery actually needs.",
          },
          {
            question: "How do you choose the right carrier for a business delivery?",
            answer:
              "We know which carriers are strong on business addresses and heavy goods, and which fall down. Each consignment goes to one that's built for it.",
          },
          {
            question: "Can you handle heavy and oversized boxes?",
            answer:
              "Yes. From a standard parcel up to a heavy, oversized box, we route it on a carrier built for the weight, with the booking-in details where the receiving site needs them.",
          },
          {
            question: "How does international B2B work?",
            answer:
              "For high-value orders abroad we'd usually point you to FedEx, UPS or DHL. We're not customs advisors, but we guide the basics and help you lay out and complete the commercial invoice, so it isn't the one held at the border.",
          },
          {
            question: "Do you handle Highlands and out-of-area deliveries?",
            answer:
              "Yes. The surcharge is priced in up front and the consignment routes to a carrier that covers the postcode, so a surprise redelivery charge doesn't land later.",
          },
          {
            question: "Can we keep our own carrier accounts?",
            answer:
              "Yes. Keep the accounts and contracts that work, and we'll add the carriers and rates you're missing alongside them.",
          },
        ]}
        closingCta={{
          headline: "Let's get the right carrier on your B2B lanes.",
          subhead:
            "Tell us where your orders go and how fast they need to be there. We'll line up the right carrier and service for each lane, at home and abroad.",
          primary: PRIMARY,
          secondary: SECONDARY,
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "B2B", path: "/solutions/b2b" },
        ]}
        jsonLd={[
          serviceSchema({
            name: "B2B and wholesale shipping",
            description:
              "Multi-carrier shipping for UK wholesalers and B2B sellers. We guide the right carrier and service for each consignment — heavy and oversized goods, timed deliveries, Highlands and out-of-area, and high-value international — so business deliveries land on time.",
            path: "/solutions/b2b",
            serviceType: "B2B and Wholesale Shipping",
            areaServed: ["United Kingdom", "European Union", "Worldwide"],
          }),
        ]}
      />
    </>
  );
}
