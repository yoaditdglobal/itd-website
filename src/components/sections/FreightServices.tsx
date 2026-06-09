"use client";

import { Plane, Ship, Package, Warehouse, Star, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

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
    visual: {
      gradient: "from-sky-50 to-blue-100",
      iconBg: "bg-blue-500",
    },
    featured: false,
  },
  {
    icon: Ship,
    label: "Sea Freight",
    heading: "The most cost-efficient way to move significant volumes internationally.",
    body: "FCL, LCL, or buyers consolidation — all with full customs handling included.",
    points: [
      "FCL – Full Container Load",
      "LCL – Less than Container Load",
      "Buyers Consolidation from multiple factories",
      "Customs clearance handled",
      "Door-to-door worldwide",
    ],
    visual: {
      gradient: "from-teal-50 to-cyan-100",
      iconBg: "bg-teal-500",
    },
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
    visual: {
      gradient: "from-accent-light to-accent/20",
      iconBg: "bg-accent",
      stat: { figure: "30–35%", label: "reduction in sample logistics costs" },
    },
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
    visual: {
      gradient: "from-orange-50 to-amber-100",
      iconBg: "bg-orange-500",
    },
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
    visual: {
      gradient: "from-purple-50 to-violet-100",
      iconBg: "bg-purple-500",
    },
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
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              What we offer
            </span>
            <h2
              id="freight-services-heading"
              className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight"
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
              <ScrollReveal key={service.label} delay={80}>
                <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}
                  style={{ direction: isReversed ? "rtl" : "ltr" }}>

                  {/* Visual panel */}
                  <div style={{ direction: "ltr" }}>
                    <div className={`relative rounded-2xl bg-gradient-to-br ${service.visual.gradient} p-10 md:p-14 flex items-center justify-center min-h-[280px] overflow-hidden`}>
                      {/* Background icon */}
                      <Icon
                        className="absolute -bottom-6 -right-6 w-48 h-48 opacity-[0.07] text-text-primary"
                        strokeWidth={1}
                      />
                      {service.featured && "stat" in service.visual && service.visual.stat ? (
                        <div className="relative z-10 text-center">
                          <div className={`w-14 h-14 rounded-2xl ${service.visual.iconBg} flex items-center justify-center mx-auto mb-6`}>
                            <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                          </div>
                          <p className="text-6xl font-bold text-accent mb-2">{service.visual.stat.figure}</p>
                          <p className="text-sm text-text-secondary max-w-[200px] mx-auto">{service.visual.stat.label}</p>
                          <div className="mt-4 inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
                            <Star className="w-3 h-3 text-accent fill-accent" />
                            <span className="text-xs font-semibold text-accent uppercase tracking-wide">Signature service</span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative z-10 text-center">
                          <div className={`w-14 h-14 rounded-2xl ${service.visual.iconBg} flex items-center justify-center mx-auto`}>
                            <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ direction: "ltr" }}>
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                      {service.label}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-snug">
                      {service.heading}
                    </h3>
                    <p className="text-text-secondary text-base leading-relaxed mb-6">
                      {service.body}
                    </p>
                    <ul className="space-y-2.5 mb-8">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-3 text-sm text-text-secondary">
                          <CheckCircle2 className="w-4.5 h-4.5 text-accent flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Button href="/contact?enquiry=freight" variant="secondary">
                      Find out more
                    </Button>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
