"use client";
import { useState, useEffect, useMemo } from "react";
import { FormData, ShipmentType, getCourierDisplayLabel, CourierProvider } from "./types";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingDown, Package, Truck, ArrowRight, Sparkles, PartyPopper, Fuel } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { WhatWeDoSection, CaseStudiesSection } from "./MarketingContent";

import { CARRIER_LOGOS } from "./carrierLogos";

// Fetch alternative carrier rules from the database
// Deterministic hash for stable savings percentage
function stableHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function AlternativeCarriers({ courier, shipmentType, costPerParcel, savingsPercent, onGetQuote }: { courier: CourierProvider | string | null; shipmentType: ShipmentType; costPerParcel: number | null; savingsPercent: number; onGetQuote: () => void }) {
  const [altRules, setAltRules] = useState<Array<{ alt_courier: string; alt_courier_label: string; from_price: number; min_savings_percent: number; max_savings_percent: number }>>([]);

  useEffect(() => {
    if (!courier || !shipmentType) return;
    const flowType = shipmentType === 'domestic' ? 'domestic' : 'international';
    supabase
      .from('alternative_carrier_rules')
      .select('alt_courier, alt_courier_label, from_price, min_savings_percent, max_savings_percent, display_order')
      .eq('flow_type', flowType)
      .eq('source_courier', courier)
      .eq('is_active', true)
      .order('display_order')
      .then(({ data }) => {
        if (data) setAltRules(data);
      });
  }, [courier, shipmentType]);

  // Compute dynamic from price per alt carrier
  const computeFromPrice = (rule: typeof altRules[0]): number => {
    if (!costPerParcel || costPerParcel <= 0) return Number(rule.from_price);
    const minPct = Number(rule.min_savings_percent);
    const maxPct = Number(rule.max_savings_percent);
    const range = maxPct - minPct;
    const seed = stableHash(`${courier}-${rule.alt_courier}-${costPerParcel.toFixed(2)}`);
    let savingsPct = range > 0 ? minPct + (seed % (range + 1)) : minPct;
    savingsPct = Math.min(savingsPct * 1.10, 65);
    const price = costPerParcel * (1 - savingsPct / 100);
    return Math.round(price * 100) / 100;
  };

  // Only show alt carriers where user's cost exceeds the computed from price
  const visibleRules = altRules.filter(rule => {
    if (!costPerParcel || costPerParcel <= 0) return true;
    return costPerParcel > computeFromPrice(rule);
  });

  if (visibleRules.length === 0) return null;

  return (
    <div className="pt-2">
      <div className="border-t border-[hsl(214,32%,91%)]" />
      <div className="text-center mt-5 mb-4">
        <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.09em' }}>
          Based on your rate review
        </span>
      </div>
      {/* Desktop */}
      <div className="hidden md:flex justify-center flex-wrap gap-3">
        {visibleRules.map((rule) => {
          const logo = CARRIER_LOGOS[rule.alt_courier];
          if (!logo) return null;
          const fromPrice = computeFromPrice(rule);
          const saving = costPerParcel && costPerParcel > fromPrice ? Math.round((costPerParcel - fromPrice) * 100) / 100 : null;
          return (
            <button
              type="button"
              key={rule.alt_courier}
              onClick={onGetQuote}
              aria-label={`Get a quote for ${rule.alt_courier_label}`}
              className="min-w-[140px] bg-white border border-[#E2E8F0] rounded-xl py-5 px-4 cursor-pointer flex flex-col items-center hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <img src={logo} alt={rule.alt_courier_label} className="max-h-[26px] max-w-[80px] object-contain grayscale-[15%] opacity-[0.85]" />
              <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: '14px' }}>FROM</span>
              <span style={{ fontWeight: 700, fontSize: '22px', color: '#3A9EA5', lineHeight: 1 }}>£{fromPrice.toFixed(2)}</span>
              <span style={{ fontSize: '11px', color: '#94A3B8', marginTop: '3px' }}>per parcel</span>
              {saving && saving > 0 && (
                <span style={{ fontSize: '11px', color: '#3A9EA5', fontWeight: 600, marginTop: '6px' }}>est. saving £{saving.toFixed(2)}</span>
              )}
            </button>
          );
        })}
      </div>
      {/* Mobile */}
      <div className="grid grid-cols-3 gap-3 md:hidden">
        {visibleRules.map((rule) => {
          const logo = CARRIER_LOGOS[rule.alt_courier];
          if (!logo) return null;
          const fromPrice = computeFromPrice(rule);
          return (
            <button
              type="button"
              key={rule.alt_courier}
              onClick={onGetQuote}
              aria-label={`Get a quote for ${rule.alt_courier_label}`}
              className="bg-white border border-[#E2E8F0] rounded-xl py-3.5 px-2.5 cursor-pointer flex flex-col items-center hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <img src={logo} alt={rule.alt_courier_label} className="max-h-[22px] max-w-[60px] object-contain grayscale-[15%] opacity-[0.85]" />
              <span style={{ fontWeight: 700, fontSize: '18px', color: '#3A9EA5', marginTop: '10px' }}>£{fromPrice.toFixed(2)}</span>
            </button>
          );
        })}
      </div>
      <p className="text-center mt-3.5 mb-5" style={{ fontSize: '12px', color: '#64748B' }}>
        Indicative estimate based on your profile. Live rates confirmed on your call.
      </p>
    </div>
  );
}

interface ResultsSectionProps {
  formData: FormData;
  onGetQuote: () => void;
}
type ResultType = 'savings' | 'too_low' | 'too_high' | 'no_rule' | 'error';
interface CalculationResult {
  type: ResultType;
  savingsPercent: number;
  minPrice?: number;
  threshold?: number;
  ruleExists: boolean;
}

async function calculateForCarrier(
  formData: FormData,
  courierOverride?: string | null,
  serviceOverride?: string | null,
  costOverride?: number | null,
): Promise<CalculationResult | null> {
  const courier = courierOverride ?? formData.courier;
  const service = serviceOverride ?? formData.courierService;
  const cost = costOverride ?? formData.currentCostPerParcel;
  
  if (!courier || !service || !cost) return null;
  
  const flowType = formData.shipmentType === 'domestic' ? 'domestic' : 'international';
  const { data, error } = await supabase.functions.invoke('calculate-savings', {
    body: { flowType, courier, serviceType: service, currentCost: cost }
  });
  if (error) return null;
  return data as CalculationResult;
}

// Count-up hook for animated number display
function useCountUp(target: number, enabled: boolean, duration = 1500): number {
  const [value, setValue] = useState(enabled ? 0 : target);
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    if (!enabled || prefersReducedMotion) { setValue(target); return; }
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled, duration, prefersReducedMotion]);

  return value;
}

const CTA_CLASS = "w-full px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-150 btn-cta bg-[#3A9EA5] hover:bg-[#2E8A91] hover:-translate-y-px";

export function ResultsSection({ formData, onGetQuote }: ResultsSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Scroll to top on mount so savings are immediately visible
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto-open the lead form 10s after results render (every visit)
  useEffect(() => {
    const t = window.setTimeout(() => onGetQuote(), 10_000);
    return () => window.clearTimeout(t);
  }, [onGetQuote]);
  const [result2, setResult2] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasDualCarrier = !!formData.courier2 && !!formData.currentCostPerParcel2;

  const courierDisplayName = getCourierDisplayLabel(formData.courier);
  const courier2DisplayName = formData.courier2 ? getCourierDisplayLabel(formData.courier2) : null;

  const getServiceName = (service: string | null) => {
    if (!service) return null;
    return service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  useEffect(() => {
    async function calculateSavings() {
      setIsLoading(true);
      setError(null);

      if (!formData.courier || !formData.courierService || !formData.currentCostPerParcel) {
        setError("Missing required data for calculation");
        setIsLoading(false);
        return;
      }
      try {
        const [r1, r2] = await Promise.all([
          calculateForCarrier(formData),
          hasDualCarrier 
            ? calculateForCarrier(formData, formData.courier2, formData.courierService2, formData.currentCostPerParcel2)
            : Promise.resolve(null),
        ]);
        setResult(r1);
        setResult2(r2);
      } catch (err) {
        console.error("Error calculating savings:", err);
        setError("Failed to calculate savings. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    calculateSavings();
  }, [formData]);

  const courierName = courierDisplayName;
  const serviceName = getServiceName(formData.courierService);

  // Excitement animations - must be called before early returns (hooks rule)
  const savingsPercent = result?.savingsPercent ?? 0;
  const isExciting = savingsPercent > 15 && result?.type === 'savings' && !isLoading;
  const displayPercent = useCountUp(savingsPercent, isExciting);

  // Loading state
  if (isLoading) {
    return <div className="space-y-10 py-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            <TrendingDown className="w-4 h-4" />
            Calculating Your Savings...
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20">
          <div className="text-center space-y-4">
            <Skeleton className="h-16 w-48 mx-auto" />
            <Skeleton className="h-6 w-64 mx-auto" />
            <Skeleton className="h-4 w-40 mx-auto" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>;
  }

  // Summary cards component
  const SummaryCards = () => <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
      <div className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-card border border-border">
        <Package className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
        <div>
          <div className="text-xs md:text-body-sm text-text-secondary">Weekly volume</div>
          <div className="font-semibold text-sm md:text-base text-text-primary">{formData.weeklyVolume || 0} parcels</div>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-card border border-border">
        <Truck className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
        <div>
          <div className="text-xs md:text-body-sm text-text-secondary">Courier & Service</div>
          <div className="font-semibold text-sm md:text-base text-text-primary">
            {courierName}
            {serviceName && <span className="block text-caption text-text-tertiary font-normal mt-0.5">
                {serviceName}
              </span>}
          </div>
        </div>
      </div>
    </div>;

  // Single carrier result card
  const CarrierResultCard = ({ 
    carrierResult, 
    carrierKey, 
    carrierServiceKey,
    cost,
    isSecond = false 
  }: { 
    carrierResult: CalculationResult | null; 
    carrierKey: string | null;
    carrierServiceKey: string | null;
    cost: number | null;
    isSecond?: boolean;
  }) => {
    const name = getCourierDisplayLabel(carrierKey);
    const svcName = getServiceName(carrierServiceKey);
    const logo = carrierKey ? CARRIER_LOGOS[carrierKey] : null;

    if (!carrierResult || carrierResult.type === 'error' || carrierResult.type === 'no_rule') {
      return (
        <div role="button" tabIndex={0} onClick={onGetQuote} onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" ")onGetQuote();}} className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-5 md:p-6 border border-primary/20 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3">
            {logo ? <img src={logo} alt={name} className="w-6 h-6 rounded object-contain" /> : <Package className="w-5 h-5 text-text-secondary" />}
            <span className="font-semibold text-text-primary">{name}</span>
            {svcName && <span className="text-caption text-text-tertiary">({svcName})</span>}
          </div>
          <div className="text-center">
            <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-body-sm text-text-secondary">We can provide competitive rates — get a personalised quote.</p>
          </div>
        </div>
      );
    }

    if (carrierResult.type === 'too_high') {
      return (
        <div role="button" tabIndex={0} onClick={onGetQuote} onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" ")onGetQuote();}} className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl p-5 md:p-6 border border-amber-500/20 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3">
            {logo ? <img src={logo} alt={name} className="w-6 h-6 rounded object-contain" /> : <Package className="w-5 h-5 text-text-secondary" />}
            <span className="font-semibold text-text-primary">{name}</span>
          </div>
          <div className="text-center">
            <Fuel className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <p className="text-heading-md text-text-primary">£{cost?.toFixed(2)}/parcel</p>
            <p className="text-body-sm text-text-secondary mt-1">Above market rate — we highly recommend talking to us.</p>
          </div>
        </div>
      );
    }

    if (carrierResult.type === 'too_low') {
      return (
        <div role="button" tabIndex={0} onClick={onGetQuote} onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" ")onGetQuote();}} className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent rounded-2xl p-5 md:p-6 border border-emerald-500/20 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-3">
            {logo ? <img src={logo} alt={name} className="w-6 h-6 rounded object-contain" /> : <Package className="w-5 h-5 text-text-secondary" />}
            <span className="font-semibold text-text-primary">{name}</span>
          </div>
          <div className="text-center">
            <PartyPopper className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-heading-md text-text-primary">£{cost?.toFixed(2)}/parcel</p>
            <p className="text-body-sm text-text-secondary mt-1">Impressive rate! You're a master negotiator.</p>
          </div>
        </div>
      );
    }

    // Savings result
    return (
      <div role="button" tabIndex={0} onClick={onGetQuote} onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" ")onGetQuote();}} className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-5 md:p-6 border border-primary/20 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all">
        <div className="flex items-center gap-2 mb-3">
          {logo ? <img src={logo} alt={name} className="w-6 h-6 rounded object-contain" /> : <Package className="w-5 h-5 text-text-secondary" />}
          <span className="font-semibold text-text-primary">{name}</span>
          {svcName && <span className="text-caption text-text-tertiary">({svcName})</span>}
        </div>
        <div className="text-center">
          <div className="text-stat-xl text-primary mb-1">
            {carrierResult.savingsPercent}%
          </div>
          <div className="text-sm text-text-primary font-medium">potential savings</div>
          <div className="mt-2 text-caption text-text-tertiary">
            Based on £{cost?.toFixed(2)}/parcel
          </div>
        </div>
      </div>
    );
  };

  // DUAL CARRIER RESULTS
  if (hasDualCarrier) {
    return (
      <div className="space-y-6 md:space-y-10 py-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <h2 className="text-display-lg text-text-primary mb-2">
            Your Savings with ITD
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CarrierResultCard 
            carrierResult={result} 
            carrierKey={formData.courier} 
            carrierServiceKey={formData.courierService}
            cost={formData.currentCostPerParcel} 
          />
          <CarrierResultCard 
            carrierResult={result2} 
            carrierKey={formData.courier2} 
            carrierServiceKey={formData.courierService2}
            cost={formData.currentCostPerParcel2} 
            isSecond 
          />
        </div>

        <SummaryCards />

        <AlternativeCarriers courier={formData.courier} shipmentType={formData.shipmentType} costPerParcel={formData.currentCostPerParcel} savingsPercent={result?.savingsPercent ?? 0} onGetQuote={onGetQuote} />

        <div className="text-center pt-4">
          <Button onClick={onGetQuote} className={CTA_CLASS}>
            Give me my personalised quote
            <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>

        {/* Marketing sections */}
        <div className="space-y-4 pt-4">
          <WhatWeDoSection />
          <CaseStudiesSection />
        </div>

        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-caption text-text-tertiary text-center max-w-lg mx-auto font-thin">Estimated savings are based on assumptions and aggregated market benchmarks. Actual pricing is subject to validation, carrier approval, volume commitments, and contractual terms. Parcel Rate Checker results exclude fuel, environmental, peak, and out-of-area surcharges. Any personalised quote will include a customised rate card aligned with your specific business requirements.</p>
        </div>
      </div>
    );
  }

  // SINGLE CARRIER RESULTS
  
  // State: Error
  if (error || !result) {
    return <div className="space-y-10 py-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Great News!
          </div>
          <h2 className="text-display-md text-text-primary mb-2">
            We Can Help With Your Shipping
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Based on your profile, our team can provide competitive rates tailored to your needs.
          </p>
        </div>
        <SummaryCards />
        <AlternativeCarriers courier={formData.courier} shipmentType={formData.shipmentType} costPerParcel={formData.currentCostPerParcel} savingsPercent={result?.savingsPercent ?? 0} onGetQuote={onGetQuote} />
        <div className="text-center pt-4">
          <Button onClick={onGetQuote} className={CTA_CLASS}>
            Get Your Personalised Quote
            <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
        {/* Marketing sections */}
        <div className="space-y-4 pt-4">
          <WhatWeDoSection />
          <CaseStudiesSection />
        </div>
      </div>;
  }

  if (result.type === 'no_rule') {
    return <div className="space-y-10 py-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Great News!
          </div>
          <h2 className="text-display-md text-text-primary mb-2">
            We Can Help With Your Shipping
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Based on your profile, our team can provide competitive rates tailored to your needs.
          </p>
        </div>
        <SummaryCards />
        <AlternativeCarriers courier={formData.courier} shipmentType={formData.shipmentType} costPerParcel={formData.currentCostPerParcel} savingsPercent={result?.savingsPercent ?? 0} onGetQuote={onGetQuote} />
        <div className="text-center pt-4">
          <Button onClick={onGetQuote} className={CTA_CLASS}>
            Get Your Personalised Quote
            <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
        {/* Marketing sections */}
        <div className="space-y-4 pt-4">
          <WhatWeDoSection />
          <CaseStudiesSection />
        </div>
      </div>;
  }

  if (result.type === 'too_high') {
    return <div className="space-y-10 py-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 font-medium mb-4">
            <Fuel className="w-4 h-4" />
            Wow. Too much fuel there..😉
          </div>
          <h2 className="text-display-md text-text-primary mb-2">
            Let's Talk About Your Rates
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            If you pay that high there is no point showing you savings benchmark. 
            We highly recommend you to talk with us.
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl p-8 border border-amber-500/20">
          <div className="text-center">
            <p className="text-text-secondary mb-4">
              At <span className="font-semibold text-text-primary">£{formData.currentCostPerParcel?.toFixed(2)}</span> per parcel, 
              you're paying significantly above market rates. Our team can help you find much better options.
            </p>
          </div>
        </div>

        <SummaryCards />

        <AlternativeCarriers courier={formData.courier} shipmentType={formData.shipmentType} costPerParcel={formData.currentCostPerParcel} savingsPercent={result?.savingsPercent ?? 0} onGetQuote={onGetQuote} />

        <div className="text-center pt-4">
          <Button onClick={onGetQuote} className={CTA_CLASS}>
            Talk to Our Team
            <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>

        {/* Marketing sections */}
        <div className="space-y-4 pt-4">
          <WhatWeDoSection />
          <CaseStudiesSection />
        </div>

        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-caption text-text-tertiary text-center max-w-lg mx-auto">Estimated savings are based on assumptions and aggregated market benchmarks. Actual pricing is subject to validation, carrier approval, volume commitments, and contractual terms. Parcel Rate Checker results exclude fuel, environmental, peak, and out-of-area surcharges. Any personalised quote will include a customised rate card aligned with your specific business requirements.</p>
        </div>
      </div>;
  }

  if (result.type === 'too_low') {
    return <div className="space-y-10 py-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 font-medium mb-4">
            <PartyPopper className="w-4 h-4" />
            Nice Try! 🎉
          </div>
          <h2 className="text-display-md text-text-primary mb-2">
            You've Got Amazing Rates!
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            At <span className="font-semibold">£{formData.currentCostPerParcel?.toFixed(2)}</span> per parcel, 
            you're clearly a master negotiator. We're impressed!
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent rounded-2xl p-8 border border-emerald-500/20">
          <div className="text-center">
            <p className="text-text-secondary mb-4">
              That's one of the best prices we've seen in the market. 
              Whoever gave you that rate must really like you!
            </p>
            <p className="text-body-sm text-text-secondary">
              If your circumstances ever change, we'd love to chat.
            </p>
          </div>
        </div>

        <SummaryCards />

        <AlternativeCarriers courier={formData.courier} shipmentType={formData.shipmentType} costPerParcel={formData.currentCostPerParcel} savingsPercent={result?.savingsPercent ?? 0} onGetQuote={onGetQuote} />

        <div className="text-center pt-4">
          <Button onClick={onGetQuote} variant="outline" className="w-full px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold border-primary text-primary hover:bg-primary/10 shadow-lg hover:shadow-xl transition-all btn-cta">
            Keep Us in Mind
            <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>

        {/* Marketing sections */}
        <div className="space-y-4 pt-4">
          <WhatWeDoSection />
          <CaseStudiesSection />
        </div>

        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-caption text-text-tertiary text-center max-w-lg mx-auto">
            Estimated savings are based on assumptions and aggregated market benchmarks. 
            Actual pricing is subject to validation, carrier approval, volume commitments, 
            and contractual terms. Rates are exclusive from Fuel, Greens, Peak, Out of Area surcharges.
          </p>
        </div>
      </div>;
  }

  // Success state with savings percentage from rules
  return <div className="space-y-6 md:space-y-10 py-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-display-lg text-text-primary mb-2">
          Your potential parcel cost savings
        </h2>
      </div>

      <div className={`bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-5 md:p-8 border border-primary/20 ${isExciting ? 'card-glow-pulse' : ''}`}>
        <div className="text-center mb-4 md:mb-6">
          <div className="text-stat-3xl text-primary mb-2">
            {isExciting ? displayPercent : result.savingsPercent}%
          </div>
          <div className="text-base md:text-lg text-text-primary font-medium">
            potential savings per parcel
          </div>
          
          <div className="mt-4 md:mt-6 text-sm md:text-body-md text-text-secondary">
            Based on your current cost of{" "}
            <span className="font-semibold text-text-primary">£{formData.currentCostPerParcel?.toFixed(2)}</span>{" "}
            per parcel
          </div>

          {formData.weeklyVolume && result.savingsPercent > 0 && <div className="mt-3 md:mt-4 text-sm md:text-body-md text-text-secondary">
              At {formData.weeklyVolume} parcels/week, this represents{" "}
              <span className="font-semibold text-primary">significant cost savings potential</span>
            </div>}
        </div>
        <p className="text-center text-xs md:text-body-sm text-text-secondary">
          Based on your shipping profile
        </p>
      </div>

      <SummaryCards />

      <AlternativeCarriers courier={formData.courier} shipmentType={formData.shipmentType} costPerParcel={formData.currentCostPerParcel} savingsPercent={result?.savingsPercent ?? 0} onGetQuote={onGetQuote} />

      <div className="text-center pt-4">
        <Button onClick={onGetQuote} className={CTA_CLASS}>
          Give me my personalised quote
          <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
        </Button>
      </div>

      {/* Marketing sections */}
      <div className="space-y-4 pt-4">
        <WhatWeDoSection />
        <CaseStudiesSection />
      </div>

      <div className="mt-8 pt-4 border-t border-border">
        <p className="text-caption text-text-tertiary text-center max-w-lg mx-auto font-thin">Estimated savings are based on assumptions and aggregated market benchmarks. Actual pricing is subject to validation, carrier approval, volume commitments, and contractual terms. Parcel Rate Checker results exclude fuel, environmental, peak, and out-of-area surcharges. Any personalised quote will include a customised rate card aligned with your specific business requirements.</p>
      </div>
    </div>;
}
