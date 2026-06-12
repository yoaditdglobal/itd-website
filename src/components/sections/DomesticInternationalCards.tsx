import { Truck, Globe2, PackageOpen } from "lucide-react";
import HeroShippingCard from "@/components/sections/HeroShippingCard";
import type { HeroShippingCardData } from "@/components/sections/HeroShippingCard";

const PLACEHOLDER_ICON_CLASS = "w-1/4 h-1/4 text-accent/30";

const cards: HeroShippingCardData[] = [
  {
    iconNode: <Truck className={PLACEHOLDER_ICON_CLASS} strokeWidth={1.5} />,
    title: "UK domestic parcel delivery",
    body: "One screen for every UK carrier. Royal Mail, DPD, Evri, InPost, Amazon Shipping, and Parcel Force — every postcode, including Highlands, Islands, and NI.",
    audiences: ["eCommerce", "Marketplace Sellers", "3PLs", "B2B", "SMEs"],
    href: "/shipping/domestic",
    image: {
      src: "/shipping/domestic.webp",
      alt: "Royal Mail truck reversing into a UK warehouse loading bay",
      gradient: "from-accent-light via-white to-accent/15",
    },
  },
  {
    iconNode: <Globe2 className={PLACEHOLDER_ICON_CLASS} strokeWidth={1.5} />,
    title: "International parcel delivery",
    body: "Export and import in one workflow. HS codes, EORI, IOSS, and customs paperwork generated before the carrier scans the label.",
    audiences: ["Export", "Import", "Cross-border eCommerce", "Enterprise"],
    href: "/shipping/international",
    image: {
      src: "/shipping/international.jpg",
      alt: "Air freight pallets being loaded onto a wide-body aircraft for international shipping",
      gradient: "from-bg-secondary via-accent-light to-accent/10",
    },
  },
  {
    iconNode: <PackageOpen className={PLACEHOLDER_ICON_CLASS} strokeWidth={1.5} />,
    title: "Freight and pallet shipping",
    body: "UK pallet networks, EU lanes, and worldwide LCL/FCL containers on one platform. Mixed-mode freight planned in minutes, not days.",
    audiences: ["B2B", "3PLs", "Enterprise", "Import", "Freight"],
    href: "/shipping/freight",
    image: {
      gradient: "from-accent-light via-white to-accent/15",
    },
  },
];

export default function DomesticInternationalCards() {
  return (
    <section
      className="bg-white py-16 md:py-24"
      aria-labelledby="shipping-solutions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="shipping-solutions-heading" className="sr-only">
          Shipping solutions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {cards.map((card, i) => (
            <HeroShippingCard
              key={card.title}
              card={card}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
