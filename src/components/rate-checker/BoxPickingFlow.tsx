"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, Package } from "lucide-react";
import { ProgressBar } from "./ProgressBar";


const CARRIER_LOGOS: Record<string, string> = {
  'royal-mail': '/logos/rate-checker/carriers/royal-mail.png',
  dpd: '/logos/rate-checker/carriers/dpd.png',
  dhl: '/logos/rate-checker/carriers/dhl.png',
  'dhl-parcel': '/logos/rate-checker/carriers/dhl-parcel.png',
  ups: '/logos/rate-checker/carriers/ups.png',
  fedex: '/logos/rate-checker/carriers/fedex.png',
  evri: '/logos/rate-checker/carriers/evri.png',
  yodel: '/logos/rate-checker/carriers/yodel.png',
  'amazon-shipping': '/logos/rate-checker/carriers/amazon-shipping.png',
  apc: '/logos/rate-checker/carriers/apc.jpg',
  dx: '/logos/rate-checker/carriers/dx.png',
  'parcel-force': '/logos/rate-checker/carriers/parcel-force-domestic.png',
};
const CARRIERS = [
  { id: "royal-mail", label: "Royal Mail", logo: CARRIER_LOGOS['royal-mail'] },
  { id: "dpd", label: "DPD", logo: CARRIER_LOGOS.dpd },
  { id: "dhl", label: "DHL", logo: CARRIER_LOGOS.dhl },
  { id: "dhl-parcel", label: "DHL Parcel", logo: CARRIER_LOGOS['dhl-parcel'] },
  { id: "ups", label: "UPS", logo: CARRIER_LOGOS.ups },
  { id: "fedex", label: "FedEx", logo: CARRIER_LOGOS.fedex },
  { id: "evri", label: "Evri", logo: CARRIER_LOGOS.evri },
  { id: "yodel", label: "Yodel", logo: CARRIER_LOGOS.yodel },
  { id: "amazon-shipping", label: "Amazon Shipping", logo: CARRIER_LOGOS['amazon-shipping'] },
  { id: "apc", label: "APC", logo: CARRIER_LOGOS.apc },
  { id: "dx", label: "DX", logo: CARRIER_LOGOS.dx },
  { id: "parcel-force", label: "Parcel Force", logo: CARRIER_LOGOS['parcel-force'] },
];

export interface BoxPickingData {
  boxesPerDay: number | null;
  length: string;
  width: string;
  height: string;
  weight: string;
  postcode: string;
  carrier: string | null;
  rate: string;
}

interface BoxPickingFlowProps {
  data: BoxPickingData;
  onChange: (data: BoxPickingData) => void;
  onComplete: (savingsPercent: number) => void;
  onBack: () => void;
}

function stableHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function BoxPickingFlow({ data, onChange, onComplete, onBack }: BoxPickingFlowProps) {
  const [stage, setStage] = useState(1);
  const totalStages = 6;

  const update = (partial: Partial<BoxPickingData>) => onChange({ ...data, ...partial });

  const canProceed = () => {
    switch (stage) {
      case 1: return data.boxesPerDay !== null && data.boxesPerDay > 0;
      case 2: return data.length && data.width && data.height && data.weight;
      case 3: return data.postcode.trim().length >= 2;
      case 4: return data.carrier !== null;
      case 5: return (data.rate || "").trim() !== "" && !isNaN(parseFloat(data.rate || "")) && parseFloat(data.rate || "") > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (stage < totalStages) {
      setStage(stage + 1);
    }
    if (stage === totalStages - 1) {
      const seed = stableHash(`box-${data.carrier}-${data.boxesPerDay}-${data.postcode}-${data.rate}`);
      const savings = 12 + (seed % 11);
      setStage(totalStages);
      onComplete(savings);
    }
  };

  const handleBack = () => {
    if (stage > 1) setStage(stage - 1);
    else onBack();
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <ProgressBar currentStep={stage + 1} totalSteps={totalStages + 2} />

      {stage === 1 && (
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-slate-100">How many boxes do you process per day?</h2>
          <div className="max-w-xs mx-auto">
            <Input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 250"
              value={data.boxesPerDay ?? ""}
              onChange={(e) => update({ boxesPerDay: e.target.value ? parseInt(e.target.value) : null })}
              className="text-center text-lg bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
          </div>
        </div>
      )}

      {stage === 2 && (
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-slate-100">What are the typical dimensions and weight?</h2>
          <p className="text-sm text-slate-400">Average box profile</p>
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <Input placeholder="Length (cm)" value={data.length} onChange={(e) => update({ length: e.target.value })} inputMode="decimal" className="bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500" />
            <Input placeholder="Width (cm)" value={data.width} onChange={(e) => update({ width: e.target.value })} inputMode="decimal" className="bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500" />
            <Input placeholder="Height (cm)" value={data.height} onChange={(e) => update({ height: e.target.value })} inputMode="decimal" className="bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500" />
            <Input placeholder="Weight (kg)" value={data.weight} onChange={(e) => update({ weight: e.target.value })} inputMode="decimal" className="bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500" />
          </div>
        </div>
      )}

      {stage === 3 && (
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-slate-100">Where are your collections based?</h2>
          <div className="max-w-xs mx-auto">
            <Input
              placeholder="Collection postcode"
              value={data.postcode}
              onChange={(e) => update({ postcode: e.target.value.toUpperCase() })}
              className="text-center text-lg uppercase bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
          </div>
        </div>
      )}

      {stage === 4 && (
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-slate-100">Which carrier do you currently use?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
            {CARRIERS.map((c) => (
              <button
                key={c.id}
                onClick={() => update({ carrier: c.id })}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200",
                  "hover:border-[hsla(182,96%,33%,0.5)] hover:shadow-md active:scale-[0.98]",
                  "backdrop-blur-md bg-slate-900/70",
                  data.carrier === c.id ? "border-[hsla(182,96%,33%,0.7)] bg-[hsla(182,96%,33%,0.08)]" : "border-slate-700/60"
                )}
              >
                {c.logo ? (
                  <img src={c.logo} alt={c.label} className="h-8 w-auto object-contain" />
                ) : (
                  <Package className="h-8 w-8 text-slate-400" />
                )}
                <span className="text-xs font-medium text-slate-200">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === 5 && (() => {
        const selectedCarrier = CARRIERS.find(c => c.id === data.carrier);
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold text-slate-100">What is your current rate?</h2>
            <p className="text-sm text-slate-400">Enter the average rate you pay per parcel</p>
            <div className="max-w-sm mx-auto">
              {selectedCarrier && (
                <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-700/60 bg-slate-900/70 backdrop-blur-md">
                  {selectedCarrier.logo ? (
                    <img src={selectedCarrier.logo} alt={selectedCarrier.label} className="h-8 w-auto object-contain shrink-0" />
                  ) : (
                    <Package className="h-8 w-8 text-slate-400 shrink-0" />
                  )}
                  <span className="text-sm font-medium text-slate-200">{selectedCarrier.label}</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="text-sm font-medium text-slate-400">£</span>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      placeholder="0.00"
                      value={data.rate}
                      onChange={(e) => update({ rate: e.target.value })}
                      className="w-24 text-right bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleBack} className="gap-2 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-slate-100">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {stage < totalStages && (
          <Button onClick={handleNext} disabled={!canProceed()} className="gap-2 btn-cta">
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
