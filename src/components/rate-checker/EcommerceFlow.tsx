"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, Package, PoundSterling } from "lucide-react";
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

const PARCEL_TYPES = [
  { id: "letterbox", label: "Letterbox parcel" },
  { id: "small", label: "Small parcel" },
  { id: "medium", label: "Medium parcel" },
  { id: "large", label: "Large parcel" },
  { id: "multi", label: "Multi-parcel consignments" },
];

const PAIN_POINTS = [
  { id: "late-collections", label: "Late collections" },
  { id: "cutoff-pressure", label: "Cut-off time pressure" },
  { id: "uncompetitive-pricing", label: "Uncompetitive pricing" },
  { id: "reporting-visibility", label: "Reporting and exception visibility" },
  { id: "complex-setup", label: "Complex setup for customer accounts and child IDs" },
  { id: "limited-access-points", label: "Limited access point options for end customers" },
];

const INDUSTRIES = [
  "Beauty & Cosmetics", "Fashion & Apparel", "Health & Wellness",
  "Food & Beverage", "Home & Living", "Consumer Electronics",
  "Subscription Brands", "Marketplace Sellers", "Other",
];

export interface EcommerceData {
  parcelTypes: string[];
  painPoints: string[];
  industries: string[];
  volumeByType: Record<string, number>;
  carriers: string[];
  averageRate: Record<string, string>;
}

interface EcommerceFlowProps {
  data: EcommerceData;
  onChange: (data: EcommerceData) => void;
  onComplete: (savingsPercent: number) => void;
  onBack: () => void;
}

function toggleItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

function stableHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function EcommerceFlow({ data, onChange, onComplete, onBack }: EcommerceFlowProps) {
  const [stage, setStage] = useState(1);
  const totalStages = 5;

  const update = (partial: Partial<EcommerceData>) => onChange({ ...data, ...partial });

  const canProceed = () => {
    switch (stage) {
      case 1: return data.parcelTypes.length > 0;
      case 2: return Object.values(data.volumeByType).some((v) => v > 0);
      case 3: return data.carriers.length > 0;
      case 4: return Object.values(data.averageRate).some((v) => v.trim().length > 0 && parseFloat(v) > 0);
      default: return false;
    }
  };

  const handleNext = () => {
    if (stage < totalStages) {
      setStage(stage + 1);
    }
    if (stage === totalStages - 1) {
      const seed = stableHash(`ecom-${data.carriers.join(",")}-${JSON.stringify(data.volumeByType)}-${JSON.stringify(data.averageRate)}`);
      const savings = 15 + (seed % 14);
      setStage(totalStages);
      onComplete(savings);
    }
  };

  const handleBack = () => {
    if (stage > 1) setStage(stage - 1);
    else onBack();
  };

  const checkboxLabelClass = (active: boolean) => cn(
    "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
    "hover:border-[hsla(182,96%,33%,0.5)]",
    active ? "border-[hsla(182,96%,33%,0.7)] bg-[hsla(182,96%,33%,0.08)]" : "border-slate-700/60 bg-slate-900/70 backdrop-blur-md"
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <ProgressBar currentStep={stage + 1} totalSteps={totalStages + 2} />

      {stage === 1 && (
        <div className="space-y-4">
          <h2 className="text-heading-lg text-slate-100 text-center">What parcel types do you handle?</h2>
          <p className="text-body-sm text-slate-400 text-center">Select all that apply</p>
          <div className="space-y-3 max-w-md mx-auto">
            {PARCEL_TYPES.map((pt) => (
              <label key={pt.id} className={checkboxLabelClass(data.parcelTypes.includes(pt.id))}>
                <Checkbox
                  checked={data.parcelTypes.includes(pt.id)}
                  onCheckedChange={() => update({ parcelTypes: toggleItem(data.parcelTypes, pt.id) })}
                />
                <span className="text-sm font-medium text-slate-200">{pt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {stage === 2 && (
        <div className="space-y-4 text-center">
          <h2 className="text-heading-lg text-slate-100">How many parcels do you ship per day?</h2>
          <p className="text-body-sm text-slate-400">By parcel type</p>
          <div className="space-y-3 max-w-sm mx-auto">
            {data.parcelTypes.map((pt) => {
              const label = PARCEL_TYPES.find((p) => p.id === pt)?.label ?? pt;
              return (
                <div key={pt} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-200 w-40 text-left">{label}</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    value={data.volumeByType[pt] || ""}
                    onChange={(e) => update({ volumeByType: { ...data.volumeByType, [pt]: parseInt(e.target.value) || 0 } })}
                    className="text-center bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                  />
                  <span className="text-xs text-slate-400 whitespace-nowrap">per day</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {stage === 3 && (
        <div className="space-y-4 text-center">
          <h2 className="text-heading-lg text-slate-100">Which carriers do you currently use?</h2>
          <p className="text-body-sm text-slate-400">Select all that apply</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
            {CARRIERS.map((c) => (
              <button
                key={c.id}
                onClick={() => update({ carriers: toggleItem(data.carriers, c.id) })}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200",
                  "hover:border-[hsla(182,96%,33%,0.5)] hover:shadow-md active:scale-[0.98]",
                  "backdrop-blur-md bg-slate-900/70",
                  data.carriers.includes(c.id) ? "border-[hsla(182,96%,33%,0.7)] bg-[hsla(182,96%,33%,0.08)]" : "border-slate-700/60"
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

      {stage === 4 && (
        <div className="space-y-4 text-center">
          <h2 className="text-heading-lg text-slate-100">What is your current average shipping rate?</h2>
          <p className="text-body-sm text-slate-400">Per carrier — an approximate average is fine</p>
          <div className="space-y-3 max-w-sm mx-auto">
            {data.carriers.map((carrierId) => {
              const carrier = CARRIERS.find((c) => c.id === carrierId);
              return (
                <div key={carrierId} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 w-36 shrink-0">
                    {carrier?.logo ? (
                      <img src={carrier.logo} alt={carrier.label} className="h-6 w-auto object-contain" />
                    ) : (
                      <Package className="h-6 w-6 text-slate-400" />
                    )}
                    <span className="text-sm font-medium text-slate-200 text-left truncate">{carrier?.label ?? carrierId}</span>
                  </div>
                  <div className="relative flex-1">
                    <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="e.g. 3.50"
                      value={data.averageRate[carrierId] || ""}
                      onChange={(e) => update({ averageRate: { ...data.averageRate, [carrierId]: e.target.value } })}
                      className="pl-8 text-center bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
