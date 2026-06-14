"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Package } from "lucide-react";
import { CourierProvider, getCourierDisplayLabel } from "./types";

// Import carrier logos

const CARRIER_LOGOS: Record<string, string> = {
  'amazon-shipping': '/logos/rate-checker/carriers/amazon-shipping.png',
  'royal-mail': '/logos/rate-checker/carriers/royal-mail.png',
  'apc-domestic': '/logos/rate-checker/carriers/apc-domestic.png',
  'dhl-parcel': '/logos/rate-checker/carriers/dhl-parcel.png',
  'dx': '/logos/rate-checker/carriers/dx.png',
  'fedex-domestic': '/logos/rate-checker/carriers/fedex.png',
  'parcel-force-domestic': '/logos/rate-checker/carriers/parcel-force-domestic.png',
  'evri-eu': '/logos/rate-checker/carriers/evri-eu.png',
  'royal-mail-international': '/logos/rate-checker/carriers/royal-mail.png',
  'parcel-force': '/logos/rate-checker/carriers/parcel-force.png',
  'spring-global': '/logos/rate-checker/carriers/spring-global.png',
};;

interface VolumeStepProps {
  value: number | null;
  onChange: (volume: number | null) => void;
  value2?: number | null;
  onChange2?: (volume: number | null) => void;
  courier?: CourierProvider | null;
  courier2?: CourierProvider | null;
  shipmentType?: string;
  onNext?: () => void;
}

function VolumeInput({ 
  value, 
  onChange, 
  label, 
  logo,
  onEnter
}: { 
  value: number | null; 
  onChange: (v: number | null) => void; 
  label?: string; 
  logo?: string | null;
  onEnter?: () => void;
}) {
  const [inputValue, setInputValue] = useState<string>(value?.toString() ?? '');
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const validateAndUpdate = (rawValue: string) => {
    setInputValue(rawValue);
    if (rawValue.trim() === '') {
      setError(null);
      onChange(null);
      return;
    }
    const isValidNumber = /^[1-9]\d*$/.test(rawValue.trim());
    if (!isValidNumber) {
      setError('Please enter a valid number');
      onChange(null);
      return;
    }
    setError(null);
    onChange(parseInt(rawValue.trim(), 10));
  };

  return (
    <div className="flex flex-col items-center w-full">
      {label && (
        <div className="flex items-center gap-2 mb-2">
          {logo ? (
            <img src={logo} alt={label} className="w-5 h-5 rounded object-contain" />
          ) : (
            <Package className="w-4 h-4 text-text-secondary" />
          )}
          <span className="text-sm font-medium text-text-primary">{label}</span>
        </div>
      )}
      <div className="relative w-full max-w-xs">
        {!label && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
            <Package className="w-5 h-5" />
          </div>
        )}
        <Input
          type="text"
          inputMode="numeric"
          placeholder={isFocused ? "" : "Enter weekly volume"}
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => validateAndUpdate(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value && value > 0 && onEnter) {
              e.preventDefault();
              onEnter();
            }
          }}
          className={`${label ? 'pl-4' : 'pl-12'} pr-20 py-4 md:py-5 text-base bg-card border-border text-center ${
            error ? 'border-destructive focus-visible:ring-destructive' : ''
          }`}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">
          parcels
        </div>
      </div>
      {error && (
        <p className="text-body-sm text-destructive mt-2 text-center">{error}</p>
      )}
    </div>
  );
}

export function VolumeStep({ value, onChange, value2, onChange2, courier, courier2, shipmentType, onNext }: VolumeStepProps) {
  const hasDualCarrier = !!courier2 && !!onChange2;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-heading-lg text-text-primary mb-2">
          How many parcels do you ship per week?
        </h2>
        {shipmentType === 'domestic' && (
          <p className="text-caption text-text-tertiary">Our customers tend to ship at least 150 parcels a week</p>
        )}
      </div>

      {hasDualCarrier ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VolumeInput
            value={value}
            onChange={onChange}
            label={getCourierDisplayLabel(courier ?? null)}
            logo={courier ? CARRIER_LOGOS[courier] : null}
            onEnter={onNext}
          />
          <VolumeInput
            value={value2 ?? null}
            onChange={onChange2!}
            label={getCourierDisplayLabel(courier2)}
            logo={courier2 ? CARRIER_LOGOS[courier2] : null}
            onEnter={onNext}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <VolumeInput value={value} onChange={onChange} onEnter={onNext} />
        </div>
      )}
    </div>
  );
}
