import { Truck, Globe2, PackageOpen } from "lucide-react";
import ShippingShowcase from "@/components/sections/ShippingShowcase";
import type { ShowcaseCard } from "@/components/sections/ShippingShowcase";

const ICON_CLASS = "w-5 h-5";

const cards: ShowcaseCard[] = [
  {
    icon: <Truck className={ICON_CLASS} strokeWidth={1.75} />,
    title: "UK domestic parcel delivery",
    body: "All the UK carriers in one place, out to the Highlands, the Islands and Northern Ireland.",
    audiences: ["eCommerce", "Marketplace Sellers", "3PLs", "B2B", "SMEs"],
    href: "/shipping/domestic",
    image: {
      src: "/shipping/domestic.webp",
      alt: "Royal Mail truck reversing into a UK warehouse loading bay",
    },
  },
  {
    icon: <Globe2 className={ICON_CLASS} strokeWidth={1.75} />,
    title: "International parcel delivery",
    body: "Ship in and out of the UK on the right carrier for each lane, with guidance when the rules change.",
    audiences: ["Export", "Import", "Cross-border eCommerce", "Enterprise"],
    href: "/shipping/international",
    image: {
      src: "/shipping/international.jpg",
      alt: "Air freight pallets being loaded onto a wide-body aircraft for international shipping",
    },
  },
  {
    icon: <PackageOpen className={ICON_CLASS} strokeWidth={1.75} />,
    title: "Freight and pallet shipping",
    body: "Pallets and containers, UK and worldwide, planned and booked without the back-and-forth.",
    audiences: ["B2B", "3PLs", "Enterprise", "Import", "Freight"],
    href: "/shipping/freight",
    image: {
      src: "/shipping/freight-hero.webp",
      alt: "Container ship laden with freight containers at sea, seen from above",
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
      </div>
      <ShippingShowcase cards={cards} />
    </section>
  );
}
