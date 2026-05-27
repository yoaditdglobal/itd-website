import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Truck, Globe2, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: Truck,
    title: "UK domestic parcel delivery",
    body: "Multi-carrier comparison on every UK order. Royal Mail, DPD, Evri, Yodel, Amazon Shipping, and Parcel Force all run from one screen. Every UK postcode covered, including Highlands and Islands and Northern Ireland. Carrier consolidation cuts portal switching and unlocks volume rates.",
    audiences: [
      "eCommerce",
      "Marketplace Sellers",
      "3PLs",
      "B2B",
      "Small Business",
    ],
    ctaLabel: "See domestic shipping",
    href: "/shipping/domestic",
  },
  {
    icon: Globe2,
    title: "International parcel delivery",
    body: "Export and import in one workflow. HS codes, EORI numbers, and IOSS applied automatically to the right shipments. Carrier rates compared across global lanes from DHL Express to FedEx to UPS. Customs documentation generated before the carrier scans the label.",
    audiences: [
      "Export",
      "Import",
      "Cross-border eCommerce",
      "Enterprise",
    ],
    ctaLabel: "See international shipping",
    href: "/shipping/international",
  },
];

export default function DomesticInternationalCards() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="shipping-solutions-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="shipping-solutions-heading" className="sr-only">
          Shipping solutions
        </h2>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <Link
                href={card.href}
                className="card-hover group block h-full p-6 md:p-8 rounded-2xl border border-border hover:border-accent/30 bg-bg-secondary"
              >
                <card.icon className="w-9 h-9 text-accent mb-5" />
                <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="mt-3 text-base text-text-secondary leading-relaxed">
                  {card.body}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {card.audiences.map((aud) => (
                    <span
                      key={aud}
                      className="inline-flex items-center text-[11px] font-medium uppercase tracking-wider text-accent bg-accent-light/60 px-2.5 py-1 rounded-full"
                    >
                      {aud}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent font-medium">
                  {card.ctaLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
