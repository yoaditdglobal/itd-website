import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ClosingCTA from "@/components/sections/ClosingCTA";
import IntegrationsGateway from "@/components/sections/IntegrationsGateway";
import { Truck, Globe, Boxes, Network, Route, MapPin, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Shipping",
  description:
    "Domestic parcels, cross-border shipments and pallet freight — every lane through one account and the UK's biggest carrier network. Find the shipping path built for your operation.",
  path: "/shipping",
});

const lanes = [
  {
    name: "Domestic",
    icon: Truck,
    href: "/shipping/domestic",
    pain: "A separate account for every UK carrier",
    value:
      "Every UK carrier from one screen — each parcel routed to the best-value service that can deliver, with out-of-area surcharges priced in up front.",
  },
  {
    name: "International",
    icon: Globe,
    href: "/shipping/international",
    pain: "Customs and country-by-country complexity",
    value:
      "Ship worldwide with the right carrier for each destination and customs documentation handled on your behalf.",
  },
  {
    name: "Freight",
    icon: Boxes,
    href: "/shipping/freight",
    pain: "Pallet and bulk freight quoted ad hoc",
    value:
      "Pallet, part-load and full-load freight managed alongside your parcels, on rates negotiated at network scale.",
  },
];

const included = [
  {
    name: "One account, every carrier",
    icon: Network,
    desc: "Connect once and reach the UK's biggest carriers plus international and freight networks — no separate contracts to manage.",
    details: [
      "Royal Mail, DPD, Evri, InPost, DHL, Amazon Shipping and more",
      "Rates managed by ITD at network scale",
      "Live within a few days, no migration",
    ],
  },
  {
    name: "Best-value routing",
    icon: Route,
    desc: "Every shipment goes on the cheapest compliant service that can actually deliver, so the margin stays yours.",
    details: [
      "Automated rate comparison on every shipment",
      "Rule-based carrier selection",
      "Surcharges surfaced before you commit",
    ],
  },
  {
    name: "Coverage everywhere",
    icon: MapPin,
    desc: "Every UK postcode and over 200 countries, with tracking and proof of delivery as standard.",
    details: [
      "Highlands & Islands, Channel Islands, NI and BFPO",
      "Customs handling on cross-border lanes",
      "End-to-end tracking on every parcel",
    ],
  },
];

export default function ShippingPage() {
  return (
    <>
      {/* Hero */}
      <section data-hero-tone="light" className="bleed-nav bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-display-xl text-text-primary">
              One shipping partner for every lane
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary max-w-2xl mx-auto">
              Domestic parcels, cross-border shipments and pallet freight — all
              through one account and the UK&apos;s biggest carrier network, each
              shipment on the best-value service that can deliver. Pick your lane
              to see how it works.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* By lane */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-8">
              Where are you shipping?
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lanes.map((lane, i) => (
              <ScrollReveal key={lane.name} delay={i * 0.08}>
                <Link
                  href={lane.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 transition-all hover:border-accent/40 hover:shadow-lg"
                >
                  <lane.icon className="w-8 h-8 text-accent mb-3" />
                  <h3 className="text-heading-md text-text-primary transition-colors group-hover:text-accent">
                    {lane.name}
                  </h3>
                  <p className="mt-1 text-caption text-accent/70">{lane.pain}</p>
                  <p className="mt-2 text-body-sm text-text-secondary">{lane.value}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-accent font-medium">
                    View full page{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* In every lane */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-display-lg text-text-primary mb-8">
              What every shipment gets
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {included.map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-bg-secondary p-8">
                  <item.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-heading-lg text-text-primary">{item.name}</h3>
                  <p className="mt-2 text-body-md text-text-secondary">{item.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {item.details.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-body-sm text-text-secondary"
                      >
                        <span className="text-accent mt-0.5">&#10003;</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Carrier gateway */}
      <IntegrationsGateway
        heading="The UK's biggest carrier network, one account"
        subtext="Royal Mail, DPD, Evri, InPost, DHL, Amazon Shipping and more — every carrier ready to print from one screen, on rates managed by ITD at network scale."
        logos={[
          { name: "Royal Mail", logo: "/logos/carriers/royal-mail-icon.png" },
          { name: "DPD", logo: "/logos/carriers/DPD-LOGO.png" },
          { name: "Evri", logo: "/logos/carriers/evri_logo.png" },
          { name: "InPost", logo: "/logos/carriers/inpost-icon.png" },
          { name: "DHL", logo: "/logos/carriers/dhl_logo.webp" },
          { name: "Amazon Shipping", logo: "/logos/carriers/amazonshipping_logo.png" },
          { name: "FedEx", logo: "/logos/carriers/fedex-icon.png" },
          { name: "UPS", logo: "/logos/carriers/ups_logo.png" },
        ]}
        browseHref="/integrations/carriers"
        browseLabel="Explore"
      />

      <ClosingCTA
        headline="Ready to ship smarter?"
        subtitle="Tell us your lanes and volumes and we'll map the setup that fits."
      />
    </>
  );
}
