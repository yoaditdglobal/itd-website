"use client";
import { EmbeddedRateChecker } from "./EmbeddedRateChecker";
import { ThreePLWizard } from "./ThreePLWizard";
import type { ShipmentType } from "./types";

type RateCheckerType = 'domestic' | 'international' | '3pl' | 'export' | 'import';

interface RateCheckerSectionProps {
  type: RateCheckerType;
}

export default function RateCheckerSection({ type }: RateCheckerSectionProps) {
  if (type === '3pl') {
    return (
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-eyebrow mb-4">
              Free 3PL Assessment
            </span>
            <h2 className="text-display-lg text-white mb-3">Find out how much you could save</h2>
            <p className="text-white/70">Answer a few questions about your operation. Takes 2 minutes.</p>
          </div>
          <ThreePLWizard />
        </div>
      </section>
    );
  }

  const config = {
    domestic: { initialType: 'domestic' as const, lockType: true, availableTypes: undefined, label: 'Free Savings Estimate', heading: 'Estimate your UK shipping savings', subheading: 'Takes 2 minutes. No commitment.' },
    international: { initialType: 'international-export' as const, lockType: false, availableTypes: ['international-export', 'international-import'] as ShipmentType[], label: 'Free Savings Estimate', heading: 'Estimate your international shipping savings', subheading: 'Compare your current rates against ITD Global pricing.' },
    export: { initialType: 'international-export' as const, lockType: true, availableTypes: undefined, label: 'Free Savings Estimate', heading: 'Estimate your export shipping savings', subheading: 'Takes 2 minutes. No commitment.' },
    import: { initialType: 'international-import' as const, lockType: true, availableTypes: undefined, label: 'Free Savings Estimate', heading: 'Estimate your import shipping savings', subheading: 'Takes 2 minutes. No commitment.' },
  };

  const { initialType, lockType, availableTypes, label, heading, subheading } = config[type];

  return (
    <section className="py-16 md:py-20 bg-[#0f1929]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-eyebrow mb-4">
            {label}
          </span>
          <h2 className="text-display-lg text-white mb-3">{heading}</h2>
          <p className="text-white/70">{subheading}</p>
        </div>
        <EmbeddedRateChecker
          initialType={initialType}
          lockType={lockType}
          availableTypes={availableTypes}
        />
      </div>
    </section>
  );
}
