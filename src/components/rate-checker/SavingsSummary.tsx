"use client";
import { Button } from "@/components/ui/Button";
import { ArrowRight, TrendingDown, CheckCircle2 } from "lucide-react";

interface SavingsSummaryProps {
  savingsPercent: number;
  profileType: "box-picking" | "ecommerce";
  onGetQuote: () => void;
}

const PROFILE_POINTS: Record<string, string[]> = {
  "box-picking": [
    "Based on your box profile",
    "Collection location considered",
    "Benchmarked against your current carrier setup",
  ],
  ecommerce: [
    "Based on your parcel mix",
    "Operational pain points factored in",
    "Benchmarked against your current carrier profile",
  ],
};

export function SavingsSummary({ savingsPercent, profileType, onGetQuote }: SavingsSummaryProps) {
  const points = PROFILE_POINTS[profileType] ?? PROFILE_POINTS.ecommerce;
  const headline = profileType === "ecommerce"
    ? "Your 3PL shipping optimisation potential"
    : "Your shipping cost reduction potential";

  return (
    <div className="text-center space-y-8 py-6 animate-fade-in-up">
      <div className="space-y-2">
        <h2 className="text-heading-md text-slate-400">{headline}</h2>
        <div className="flex items-center justify-center gap-3">
          <TrendingDown className="h-8 w-8 text-[hsl(182,96%,33%)]" />
          <p className="text-stat-2xl text-slate-100">
            up to <span className="text-[hsl(182,96%,33%)]">{savingsPercent}%</span>
          </p>
        </div>
        <p className="text-body-md text-slate-400">per week with ITD</p>
      </div>

      <div className="max-w-sm mx-auto space-y-3">
        {points.map((point) => (
          <div key={point} className="flex items-center gap-2 text-sm text-slate-200">
            <CheckCircle2 className="h-4 w-4 text-[hsl(182,96%,33%)] shrink-0" />
            <span>{point}</span>
          </div>
        ))}
      </div>

      <Button size="lg" className="gap-2 btn-cta" onClick={onGetQuote}>
        Give me my personalised quote <ArrowRight className="h-4 w-4 bounce-arrow" />
      </Button>
    </div>
  );
}
