import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Image from "next/image";

const POINTS = [
  "Weekly sample consolidations from China, fixed rate, guaranteed departure",
  "FCL, LCL, and buyers consolidation from one account",
  "Customs clearance handled for you, no broker fees",
  "Named account contact throughout",
  "China office managing collections on the ground",
  "Warehousing and fulfilment via Delta Fulfilment",
];

export default function FreightAudience() {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              Built for Importers
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — image card */}
          <ScrollReveal>
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
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  Built for businesses that import regularly
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  If you source from multiple suppliers internationally and need a freight partner who handles everything from collection to UK delivery, ITD is built for you.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — checklist */}
          <ScrollReveal delay={120}>
            <div>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Everything you need to import regularly from China, managed by one team from start to finish.
              </p>
              <ul className="space-y-3">
                {POINTS.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 py-3 border-b border-border last:border-0"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-text-primary text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
