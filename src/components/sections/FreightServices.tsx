import { Plane, Ship, Package, Warehouse, Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";

const services = [
  {
    icon: Plane,
    label: "Air Freight",
    heading: "Express and economy air freight from China and worldwide origins.",
    body: "Our China office manages factory collections directly. No agents, no gaps. Customs handled as standard.",
    points: [
      "Express and economy options",
      "Courier and parcel services",
      "Consolidated air departures",
      "Customs clearance",
      "End-to-end tracking",
    ],
    image: "/shipping/air freight.jpg",
    featured: false,
  },
  {
    icon: Ship,
    label: "Sea Freight",
    heading: "The most cost-efficient way to move significant volumes internationally.",
    body: "FCL, LCL, or buyers consolidation, all with full customs handling included.",
    points: [
      "FCL – Full Container Load",
      "LCL – Less than Container Load",
      "Buyers Consolidation from multiple factories",
      "Customs clearance handled",
      "Door-to-door worldwide",
    ],
    image: "/shipping/sea freight.jpg",
    featured: false,
  },
  {
    icon: Package,
    label: "Console Sample Service",
    heading: "A fixed weekly air consolidation from China, purpose-built for UK buyers.",
    body: "We collect, consolidate, handle customs, and deliver to the UK every Tuesday at a set rate. No individual courier bookings per factory. No surprises at invoice.",
    points: [
      "Fixed weekly departure every Tuesday",
      "Collection direct from your suppliers",
      "One consolidated shipment, one invoice",
      "Set rate with no hidden costs",
      "Used by major UK retailers",
    ],
    image: "/shipping/console sample service.jpg",
    featured: true,
  },
  {
    icon: Package,
    label: "Shipment Consolidation",
    heading: "Group smaller orders into a single movement.",
    body: "Reduces cost per unit significantly for businesses with regular import schedules, seasonal peaks, or trade show freight.",
    points: [
      "Combine multiple supplier orders",
      "Lower cost per unit",
      "Ideal for seasonal peaks",
      "Trade show and event freight",
      "Regular import schedules",
    ],
    image: "/shipping/shipment consolidation.jpg",
    objectPosition: "50% 80%",
    featured: false,
  },
  {
    icon: Warehouse,
    label: "Warehousing & Fulfilment",
    heading: "Freight doesn't have to stop at the port.",
    body: "Through our sister company Delta Fulfilment, goods-in, storage, pick and pack, marketplace integrations, and returns all handled under one roof.",
    points: [
      "Goods-in and unloading",
      "Storage and inventory management",
      "Pick and pack",
      "Marketplace integrations",
      "Returns handling",
    ],
    image: "/shipping/Warehousing and Fulfilment.jpg",
    featured: false,
  },
];

export default function FreightServices() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="freight-services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <p className="text-eyebrow text-accent mb-3">What we offer</p>
            <h2
              id="freight-services-heading"
              className="text-display-lg text-text-primary"
            >
              Our freight services
            </h2>
          </div>
        </ScrollReveal>

        {/* Alternating rows */}
        <div className="space-y-20 md:space-y-28">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isReversed = i % 2 !== 0;

            return (
              <div key={service.label} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>

                {/* Visual panel — order flips on alternate rows */}
                <ScrollReveal delay={0.08} className={isReversed ? "lg:order-2" : ""}>
                  <div className="relative rounded-2xl overflow-hidden min-h-[320px] shadow-sm border border-border">
                    <Image
                      src={service.image}
                      alt={service.label}
                      fill
                      className="object-cover"
                      style={"objectPosition" in service ? { objectPosition: service.objectPosition } : undefined}
                    />
                    {service.featured && (
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-bg-dark/80 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        <span className="text-eyebrow text-white">Signature service</span>
                      </div>
                    )}
                  </div>
                </ScrollReveal>

                {/* Content */}
                <ScrollReveal delay={0.16} className={isReversed ? "lg:order-1" : ""}>
                  <p className="text-eyebrow text-accent mb-3">{service.label}</p>
                  <h3 className="text-display-md text-text-primary mb-4">
                    {service.heading}
                  </h3>
                  <p className="text-body-md text-text-secondary mb-6">
                    {service.body}
                  </p>
                  <ul className="space-y-2.5">
                    {service.points.map((point, j) => (
                      <ScrollReveal key={point} delay={0.16 + j * 0.06}>
                        <li className="flex items-center gap-3 text-body-sm text-text-secondary">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                          {point}
                        </li>
                      </ScrollReveal>
                    ))}
                  </ul>
                </ScrollReveal>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
