import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

const POINTS = [
  "Weekly sample consolidations from China — fixed rate, guaranteed departure",
  "FCL, LCL, and buyers consolidation from one account",
  "In-house customs clearance — no broker fees",
  "Named account contact throughout",
  "China office managing collections on the ground",
  "Warehousing and fulfilment via Delta Fulfilment",
];

export default function FreightAudience() {
  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <ScrollReveal>
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                Who this is built for
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight leading-snug mb-6">
                Built for Importers.
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-8">
                If you import regularly from China and need a freight partner who can manage the full journey — from factory floor to UK door — this is the service for you.
              </p>
              <Button href="/contact?enquiry=freight">
                Get a Quote
              </Button>
            </div>
          </ScrollReveal>

          {/* Right — checklist */}
          <ScrollReveal delay={120}>
            <ul className="space-y-4">
              {POINTS.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 bg-white border border-border rounded-xl px-5 py-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
