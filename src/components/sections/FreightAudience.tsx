import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Image from "next/image";

const POINTS = [
  "Weekly sample consolidations from China, fixed rate and guaranteed departure",
  "FCL, LCL and buyers consolidation from one account",
  "Pallet and LTL freight, UK to worldwide",
  "Customs handled for you, no broker fees",
  "A named account contact throughout",
  "Warehousing and fulfilment via Delta Fulfilment",
];

export default function FreightAudience() {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-display-lg text-text-primary">
              Built for the way you ship
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — image card */}
          <ScrollReveal delay={0.08}>
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
              <div className="relative aspect-[4/3] bg-bg-secondary">
                <Image
                  src="/shipping/import.jpg"
                  alt="International freight importing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-heading-lg text-text-primary mb-2">
                  Built for businesses that import regularly
                </h3>
                <p className="text-body-sm text-text-secondary">
                  If you source from multiple suppliers internationally and need a freight partner who handles everything from collection to UK delivery, ITD is built for you.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — checklist */}
          <ScrollReveal delay={0.16}>
            <p className="text-body-md text-text-secondary mb-6">
              Importing regularly from overseas, or sending pallets and part-loads out to your own customers, either way one team handles it from collection to delivery.
            </p>
            <ul className="space-y-0">
              {POINTS.map((point, i) => (
                <ScrollReveal key={i} delay={0.16 + i * 0.06}>
                  <li className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-body-sm text-text-primary">{point}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
