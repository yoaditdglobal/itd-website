"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PoundSterling } from "lucide-react";

interface CurrentCostStepProps {
  value: number | null;
  onChange: (cost: number | null) => void;
}

export function CurrentCostStep({ value, onChange }: CurrentCostStepProps) {
  const [inputValue, setInputValue] = useState<string>(value?.toString() ?? '');
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const validateAndUpdate = (rawValue: string) => {
    setInputValue(rawValue);
    
    // Empty value is allowed (will be caught by canProceed validation)
    if (rawValue.trim() === '') {
      setError(null);
      onChange(null);
      return;
    }

    // Valid patterns:
    // - Positive integers: "5", "123"
    // - Decimals: "5.50", "0.99", "123.45"
    // Invalid patterns:
    // - Leading zeros: "0405", "00.5"
    // - Negative: "-5"
    // - Letters/symbols: "abc", "$5"
    const isValidCost = /^(?:0|[1-9]\d*)(?:\.\d{0,2})?$/.test(rawValue.trim());
    
    if (!isValidCost) {
      setError('Please enter a valid number');
      onChange(null);
      return;
    }

    // Valid number
    setError(null);
    onChange(parseFloat(rawValue.trim()));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-heading-lg text-text-primary mb-2">
          How much do you currently pay per parcel (on average)?
        </h2>
        <p className="text-body-sm text-text-secondary">
          This is your benchmark — we'll show potential savings from here.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full max-w-xs">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
            <PoundSterling className="w-6 h-6" />
          </div>
          <Input
            type="text"
            inputMode="decimal"
            placeholder={isFocused ? "" : "0.00"}
            value={inputValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => validateAndUpdate(e.target.value)}
            className={`pl-12 pr-4 py-6 text-stat-xl bg-card border-2 border-primary/30 text-center focus:border-primary ${
              error ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
          />
        </div>
        <p className="text-body-sm text-text-secondary mt-2">
          per parcel
        </p>
        {error && (
          <p className="text-body-sm text-destructive mt-2 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
