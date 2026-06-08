import { Plane, Ship, Package, Warehouse, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

const services = [
  {
    icon: Plane,
    label: "Air Freight",
    heading: "Express and economy air freight from China and worldwide origins.",
    body: "Our China office manages factory collections directly — no agents, no gaps. Full UK customs clearance included as standard.",
    includes: [
      "Express and economy options",
      "Courier and parcel services",
      "Consolidated air departures",
      "Import customs clearance",
      "End-to-end tracking",
    ],
    featured: false,
  },
  {
    icon: Ship,
    label: "Sea Freight",
    heading: "The most cost-efficient way to move significant volumes internationally.",
    body: "All three options include in-house customs clearance.",
    options: [
      {
        name: "FCL – Full Container Load",
        desc: "Your cargo, your container. Best when volumes justify it.",
      },
      {
        name: "LCL – Less than Container Load",
        desc: "Pay for the space you use, sharing a container with other shippers. Right for smaller, regular shipments.",
      },
      {
        name: "Buyers Consolidation",
        desc: "We collect from multiple Chinese factories and combine everything into one container before it ships. One invoice. One customs entry. Significantly lower cost.",
      },
    ],
    featured: false,
  },
];

const featuredService = {
  icon: Package,
  label: "Console Sample Service",
  heading: "A fixed weekly air consolidation from China — purpose-built for UK buyers.",
  body: "We collect, consolidate, clear customs, and deliver to the UK every Tuesday at a set rate. No individual courier bookings per factory. No surprises at invoice.",
  stat: {
    figure: "30–35%",
    detail: "reduction in sample logistics costs for one major UK retailer sourcing from 200+ Chinese factories.",
  },
};

const supportServices = [
  {
    icon: Package,
    label: "Shipment Consolidation",
    heading: "Group smaller orders into a single movement.",
    body: "Reduces cost per unit significantly for businesses with regular import schedules, seasonal peaks, or trade show freight. Rather than shipping each order separately, we combine them into one efficient shipment.",
  },
  {
    icon: Warehouse,
    label: "Warehousing & Fulfilment",
    heading: "Freight doesn't have to stop at the port.",
    body: "Through our sister company Delta Fulfilment — goods-in, storage, pick and pack, marketplace integrations, and returns all handled under one roof.",
  },
];

export default function FreightServices() {
  return (
    <section className="bg-bg-secondary py-16 md:py-24" aria-labelledby="freight-services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              What we offer
            </span>
            <h2
              id="freight-services-heading"
              className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight"
            >
              Our freight services.
            </h2>
          </div>
        </ScrollReveal>

        {/* Featured — Console Sample Service */}
        <ScrollReveal delay={80}>
          <div className="relative rounded-2xl bg-bg-dark overflow-hidden mb-8 p-8 md:p-12">
            {/* Featured badge */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-accent/20 border border-accent/30 rounded-full px-3 py-1">
              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Signature service
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <featuredService.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent/80">
                    {featuredService.label}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                  {featuredService.heading}
                </h3>
                <p className="text-white/70 text-base leading-relaxed">
                  {featuredService.body}
                </p>
              </div>

              {/* Stat callout */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
                <p className="text-5xl md:text-6xl font-bold text-accent mb-3">
                  {featuredService.stat.figure}
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  {featuredService.stat.detail}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Main service cards — Air & Sea */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.label} delay={i * 80 + 160}>
                <div className="bg-white rounded-2xl border border-border p-7 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                      {service.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 leading-snug">
                    {service.heading}
                  </h3>
                  <p className="text-text-secondary text-sm mb-5 leading-relaxed">
                    {service.body}
                  </p>

                  {/* Includes list (Air Freight) */}
                  {"includes" in service && service.includes && (
                    <ul className="mt-auto space-y-2">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                          <ArrowRight className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Options (Sea Freight) */}
                  {"options" in service && service.options && (
                    <div className="mt-auto space-y-3">
                      {service.options.map((opt) => (
                        <div
                          key={opt.name}
                          className="rounded-lg bg-bg-secondary px-4 py-3 border border-border"
                        >
                          <p className="text-sm font-semibold text-text-primary mb-0.5">
                            {opt.name}
                          </p>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {opt.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Support service cards — Consolidation & Warehousing */}
        <div className="grid md:grid-cols-2 gap-6">
          {supportServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.label} delay={i * 80 + 320}>
                <div className="bg-white rounded-2xl border border-border p-7 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                      {service.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 leading-snug">
                    {service.heading}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {service.body}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
