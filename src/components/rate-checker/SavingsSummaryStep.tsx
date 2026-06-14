"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { InvoiceAnalysis, LanePricing, CourierProvider } from "./types";
import { getSessionToken } from "@/components/rate-checker/useAdminAuth";
import { WhatWeDoSection, CaseStudiesSection } from "./MarketingContent";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingDown, Truck, Package, Fuel, MapPin, Shield, Sparkles, PartyPopper } from "lucide-react";
import { supabase } from "@/lib/supabase";


interface SavingsSummaryStepProps {
  invoiceAnalysis: InvoiceAnalysis;
  weeklyVolume: number | null;
  shipmentType: 'domestic' | 'international-export' | 'international-import';
  courier: CourierProvider | null;
  courierService: string | null;
  sessionId: string;
  onGetQuote: () => void;
}

type ResultType = 'savings' | 'too_low' | 'too_high' | 'no_rule';

interface CalculationResult {
  type: ResultType;
  savingsPercent: number;
  minPrice?: number;
  threshold?: number;
  ruleExists: boolean;
}

interface CalculationState {
  isLoading: boolean;
  result: CalculationResult | null;
  error: string | null;
}

function formatCurrency(value: number): string {
  return `£${value.toFixed(2)}`;
}

// Calculate lane total - prefer extracted totalPrice, fall back to manual calculation
function calculateLaneTotal(lane: LanePricing): number {
  if (lane.pricing?.totalPrice != null) {
    return lane.pricing.totalPrice;
  }
  
  const basePrice = lane.pricing?.basePrice || 0;
  const fuel = lane.surcharges?.fuel || 0;
  const remoteArea = lane.surcharges?.remoteArea || 0;
  const oversize = lane.surcharges?.oversize || 0;
  const residential = lane.surcharges?.residential || 0;
  const otherSurcharges = (lane.surcharges?.other || [])
    .reduce((sum, item) => sum + (item.amount || 0), 0);
  
  return basePrice + fuel + remoteArea + oversize + residential + otherSurcharges;
}

// Confetti burst component - pure CSS, no library
function ConfettiBurst() {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    if (prefersReducedMotion) { setVisible(false); return; }
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!visible || prefersReducedMotion) return null;

  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--primary) / 0.7)',
    'hsl(198 93% 59%)',
    'hsl(48 96% 53%)',
    'hsl(142 71% 45%)',
    'hsl(280 67% 55%)',
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10px`,
            width: `${6 + Math.random() * 6}px`,
            height: `${6 + Math.random() * 6}px`,
            backgroundColor: colors[i % colors.length],
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confetti-fall ${1.5 + Math.random() * 1.5}s ease-out ${Math.random() * 0.5}s forwards`,
          }}
        />
      ))}
    </div>
  );
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
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled, duration, prefersReducedMotion]);

  return value;
}

export function SavingsSummaryStep({
  invoiceAnalysis,
  weeklyVolume,
  shipmentType,
  courier,
  courierService,
  sessionId,
  onGetQuote,
}: SavingsSummaryStepProps) {
  const viewLoggedRef = useRef(false);
  const [calculation, setCalculation] = useState<CalculationState>({
    isLoading: true,
    result: null,
    error: null,
  });

  // Auto-open the lead form 10s after summary mounts (every visit)
  useEffect(() => {
    const t = window.setTimeout(() => onGetQuote(), 10_000);
    return () => window.clearTimeout(t);
  }, [onGetQuote]);

  const isDomestic = shipmentType === 'domestic';
  const lanes = invoiceAnalysis.lanes || [];
  
  // Normalize carrier name to match database format
  // Prefer user-selected courier over invoice-extracted carrier
  // "DHL Express" -> "dhl", "FedEx" -> "fedex", "Royal Mail" -> "royal-mail"
  const rawCarrier = courier || invoiceAnalysis.context.carrier?.toLowerCase() || '';
  const normalizedCarrier = rawCarrier
    .toString()
    .toLowerCase()
    .replace(/\s+express$/i, '')  // Remove "Express" suffix
    .replace(/\s+/g, '-')
    .trim() || '';
  
  // PRIORITY: Use user-selected courierService first, then fall back to invoice extraction
  // This ensures the final step uses the same service the user selected in the courier step
  const normalizeService = (svc: string | null | undefined): string => {
    if (!svc) return '';
    let normalized = svc.toLowerCase().replace(/\s+/g, '-').trim();
    // Strip trailing hyphens
    normalized = normalized.replace(/-+$/, '');
    // Strip carrier prefix if present (e.g., "dpd-next-day" -> "next-day")
    if (normalizedCarrier) {
      const prefix = `${normalizedCarrier}-`;
      if (normalized.startsWith(prefix)) {
        normalized = normalized.slice(prefix.length);
      }
    }
    return normalized;
  };
  
  // Prefer user-selected service, then invoice-extracted, then flow-based default
  const rawService = courierService || invoiceAnalysis.context.serviceLevel || '';
  const serviceType = normalizeService(rawService) || (isDomestic ? '' : 'express');

  // Calculate total from invoice
  const totalCost = invoiceAnalysis.pricing.totalPrice ?? lanes.reduce((sum, lane) => sum + calculateLaneTotal(lane), 0);
  const averageCostPerParcel = lanes.length > 0 ? totalCost / lanes.length : totalCost;

  // Excitement animations - must be called before any early returns (hooks rule)
  const savingsPercent = calculation.result?.savingsPercent ?? 0;
  const isExciting = savingsPercent > 15 && calculation.result?.type === 'savings';
  const displayPercent = useCountUp(savingsPercent, isExciting && !calculation.isLoading);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isExciting && !calculation.isLoading) {
      setShowConfetti(true);
    }
  }, [isExciting, calculation.isLoading]);

  useEffect(() => {
    async function calculateSavings() {
      if (!normalizedCarrier) {
        setCalculation({
          isLoading: false,
          result: { type: 'no_rule', savingsPercent: 0, ruleExists: false },
          error: null,
        });
        return;
      }

      try {
        const flowType = isDomestic ? 'domestic' : 'international';
        
        console.log('SavingsSummaryStep: Calling calculate-savings with:', {
          flowType,
          courier: normalizedCarrier,
          serviceType,
          currentCost: averageCostPerParcel,
        });
        
        const { data, error: fnError } = await supabase.functions.invoke('calculate-savings', {
          body: {
            flowType,
            courier: normalizedCarrier,
            serviceType,
            currentCost: averageCostPerParcel,
          },
        });

        if (fnError) {
          console.error("Edge function error:", fnError);
          setCalculation({
            isLoading: false,
            result: { type: 'no_rule', savingsPercent: 0, ruleExists: false },
            error: null,
          });
          return;
        }

        console.log('SavingsSummaryStep: Result:', data);
        setCalculation({
          isLoading: false,
          result: data as CalculationResult,
          error: null,
        });
      } catch (err) {
        console.error("Error calculating savings:", err);
        setCalculation({
          isLoading: false,
          result: { type: 'no_rule', savingsPercent: 0, ruleExists: false },
          error: "Failed to calculate savings",
        });
      }
    }

    calculateSavings();
  }, [normalizedCarrier, serviceType, averageCostPerParcel, isDomestic]);

  // Log savings summary view for abandoned lead tracking
  useEffect(() => {
    if (calculation.isLoading || viewLoggedRef.current) return;
    viewLoggedRef.current = true;

    supabase
      .from('savings_summary_views' as any)
      .insert({
        session_id: sessionId,
        courier: normalizedCarrier || null,
        courier_service: courierService || null,
        shipment_type: shipmentType,
        weekly_volume: weeklyVolume,
        average_cost: averageCostPerParcel,
        result_type: calculation.result?.type || null,
        savings_percent: calculation.result?.savingsPercent || null,
        is_internal: !!getSessionToken(),
      })
      .then(({ error }: any) => {
        if (error) console.error('Failed to log savings view:', error);
        else console.log('Savings summary view logged');
      });
  }, [calculation.isLoading]);

  // Loading state
  if (calculation.isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-heading-lg text-text-primary mb-2">
            Calculating Your Savings...
          </h2>
          <p className="text-body-sm text-text-secondary">
            Analyzing your invoice data
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const result = calculation.result;

  // Context badges component
  const ContextBadges = () => (
    <div className="flex flex-wrap justify-center gap-2">
      {invoiceAnalysis.context.carrier && (
        <button
          type="button"
          onClick={onGetQuote}
          aria-label="Get a quote"
          className="rounded-full"
        >
          <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 cursor-pointer hover:bg-primary/10 transition-colors">
            <Truck className="w-3.5 h-3.5" />
            {invoiceAnalysis.context.carrier}
          </Badge>
        </button>
      )}
      {invoiceAnalysis.context.serviceLevel && (
        <button
          type="button"
          onClick={onGetQuote}
          aria-label="Get a quote"
          className="rounded-full"
        >
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 cursor-pointer hover:bg-primary/10 transition-colors">
            {invoiceAnalysis.context.serviceLevel}
          </Badge>
        </button>
      )}
      {lanes.length > 0 && (
        <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1">
          <Package className="w-3.5 h-3.5" />
          {lanes.length} {lanes.length === 1 ? 'shipment' : 'shipments'}
        </Badge>
      )}
    </div>
  );

  // State: No rule found - show positive message
  if (!result || result.type === 'no_rule') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Great News!
          </div>
          <h2 className="text-heading-lg text-text-primary mb-2">
            We Can Help With Your Shipping
          </h2>
          <p className="text-body-sm text-text-secondary">
            Based on your invoice, our team can provide competitive rates tailored to your needs.
          </p>
        </div>

        <ContextBadges />

        {/* Cost Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              Invoice Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-body-sm text-text-secondary">Shipments</p>
                <p className="text-stat-lg text-text-primary">{lanes.length || 1}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-body-sm text-text-secondary">Total Cost</p>
                <p className="text-stat-lg text-text-primary">{formatCurrency(totalCost)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center pt-4">
          <Button size="lg" onClick={onGetQuote} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 btn-cta">
            Get My Personalised Quote
          </Button>
        </div>

        {/* Marketing sections */}
        <div className="space-y-4 pt-4">
          <WhatWeDoSection />
          <CaseStudiesSection />
        </div>
      </div>
    );
  }

  // State: Price too low - "Nice try!" cheeky message
  if (result.type === 'too_low') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 font-medium mb-4">
            <PartyPopper className="w-4 h-4" />
            Nice Try! 🎉
          </div>
          <h2 className="text-heading-lg text-text-primary mb-2">
            You've Got Amazing Rates!
          </h2>
          <p className="text-body-sm text-text-secondary">
            At {formatCurrency(averageCostPerParcel)} per parcel, you're clearly a master negotiator. We're impressed!
          </p>
        </div>

        <ContextBadges />

        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-text-secondary mb-4">
                That's one of the best prices we've seen in the market. 
                Whoever gave you that rate must really like you!
              </p>
              <p className="text-body-sm text-text-secondary">
                If your circumstances ever change, we'd love to chat.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center pt-4">
          <Button 
            size="lg" 
            onClick={onGetQuote} 
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 px-8 btn-cta"
          >
            Keep Us in Mind
          </Button>
        </div>

        {/* Marketing sections */}
        <div className="space-y-4 pt-4">
          <WhatWeDoSection />
          <CaseStudiesSection />
        </div>
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-caption text-text-tertiary text-center max-w-lg mx-auto">
            Estimated savings are based on assumptions and aggregated market benchmarks. Actual pricing is subject to validation, carrier approval, volume commitments, and contractual terms. Parcel Rate Checker results exclude fuel, environmental, peak, and out-of-area surcharges. Any personalised quote will include a customised rate card aligned with your specific business requirements.
          </p>
        </div>
      </div>
    );
  }

  // State: Price too HIGH (domestic £12+) - "Too much fuel!" message
  if (result.type === 'too_high') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 font-medium mb-4">
            <Fuel className="w-4 h-4" />
            Wow. Too much fuel there..😉
          </div>
          <h2 className="text-heading-lg text-text-primary mb-2">
            Let's Talk About Your Rates
          </h2>
          <p className="text-body-sm text-text-secondary">
            If you pay that high there is no point showing you savings benchmark. 
            We highly recommend you to talk with us.
          </p>
        </div>

        <ContextBadges />

        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-text-secondary mb-4">
                At {formatCurrency(averageCostPerParcel)} per parcel, 
                you're paying significantly above market rates. Our team can help you find much better options.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center pt-4">
          <Button 
            size="lg" 
            onClick={onGetQuote} 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 btn-cta"
          >
            Talk to Our Team
          </Button>
        </div>

        {/* Marketing sections */}
        <div className="space-y-4 pt-4">
          <WhatWeDoSection />
          <CaseStudiesSection />
        </div>
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-caption text-text-tertiary text-center max-w-lg mx-auto">
            Estimated savings are based on assumptions and aggregated market benchmarks. Actual pricing is subject to validation, carrier approval, volume commitments, and contractual terms. Parcel Rate Checker results exclude fuel, environmental, peak, and out-of-area surcharges. Any personalised quote will include a customised rate card aligned with your specific business requirements.
          </p>
        </div>
      </div>
    );
  }

  // State: Show savings percentage
  return (
    <div className="space-y-6">
      {showConfetti && <ConfettiBurst />}
      <div className="text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium mb-4 ${isExciting ? 'bg-primary/10 text-primary animate-scale-in' : 'bg-primary/10 text-primary'}`}>
          {isExciting ? <PartyPopper className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {isExciting ? 'Amazing Savings!' : 'Your Results'}
        </div>
        <h2 className="text-heading-lg text-text-primary mb-2">
          Your Potential Savings with ITD
        </h2>
        <p className="text-body-sm text-text-secondary">
          Based on your invoice analysis
        </p>
      </div>

      <ContextBadges />

      {/* Cost Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />
            Invoice Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Element</TableHead>
                <TableHead className="text-right">Your Cost</TableHead>
                <TableHead className="text-right bg-primary/5">Potential Savings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceAnalysis.pricing.basePrice && invoiceAnalysis.pricing.basePrice > 0 && (
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-text-secondary" />
                      Base Rate
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-text-secondary">
                    {formatCurrency(invoiceAnalysis.pricing.basePrice)}
                  </TableCell>
                  <TableCell className="text-right bg-primary/5">
                    <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/10">
                      {result.savingsPercent}%
                    </Badge>
                  </TableCell>
                </TableRow>
              )}
              {invoiceAnalysis.surcharges.fuel && invoiceAnalysis.surcharges.fuel > 0 && (
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-text-secondary" />
                      Fuel Surcharge
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-text-secondary">
                    {formatCurrency(invoiceAnalysis.surcharges.fuel)}
                  </TableCell>
                  <TableCell className="text-right bg-primary/5">
                    <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/10">
                      {Math.round(result.savingsPercent * 1.2)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              )}
              {invoiceAnalysis.surcharges.remoteArea && invoiceAnalysis.surcharges.remoteArea > 0 && (
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-text-secondary" />
                      Remote Area
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-text-secondary">
                    {formatCurrency(invoiceAnalysis.surcharges.remoteArea)}
                  </TableCell>
                  <TableCell className="text-right bg-primary/5">
                    <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/10">
                      {Math.round(result.savingsPercent * 0.9)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              )}
              {invoiceAnalysis.surcharges.insurance && invoiceAnalysis.surcharges.insurance > 0 && (
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-text-secondary" />
                      Insurance
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-text-secondary">
                    {formatCurrency(invoiceAnalysis.surcharges.insurance)}
                  </TableCell>
                  <TableCell className="text-right bg-primary/5">
                    <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/10">
                      {Math.round(result.savingsPercent * 0.8)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              )}
              <TableRow className="border-t-2 border-border">
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold text-text-secondary">
                  {formatCurrency(totalCost)}
                </TableCell>
                <TableCell className="text-right bg-primary/5">
                  <Badge className="bg-primary text-primary-foreground">
                    {result.savingsPercent}%
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Per-Lane Breakdown (if multiple lanes) */}
      {lanes.length > 1 && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="lanes">
            <AccordionTrigger className="text-sm">
              View shipment breakdown ({lanes.length} shipments)
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Destination</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Potential</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lanes.map((lane, index) => (
                    <TableRow key={index}>
                      <TableCell>{lane.destination}</TableCell>
                      <TableCell className="text-right text-text-secondary">
                        {formatCurrency(calculateLaneTotal(lane))}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="text-primary">
                          {result.savingsPercent}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* Total Savings Highlight */}
      <Card className={`bg-primary/5 border-primary/20 ${isExciting ? 'card-glow-pulse' : ''}`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-body-sm text-text-secondary mb-1">Potential Savings</p>
            <p className="text-stat-xl text-primary">
              {isExciting ? displayPercent : result.savingsPercent}%
            </p>
            <p className="text-body-sm text-text-secondary mt-1">
              Based on your current shipping costs
            </p>
            {lanes.length > 0 && (
              <p className="text-caption text-text-tertiary mt-2">
                Based on {lanes.length} {lanes.length !== 1 ? 'shipments' : 'shipment'} in your invoice
              </p>
            )}
            {weeklyVolume && weeklyVolume > 1 && result.savingsPercent > 0 && (
              <p className="text-caption text-text-tertiary mt-2">
                At {weeklyVolume} parcels/week, this represents{" "}
                <span className="font-semibold text-primary">significant weekly savings potential</span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>


      <div className="text-center pt-4">
        <Button
          size="lg"
          onClick={onGetQuote}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 btn-cta"
        >
          Get My Personalised Quote
        </Button>
        <p className="text-caption text-text-tertiary mt-3">
          Our team will prepare a custom rate card based on your specific shipping profile.
        </p>
      </div>

      {/* Marketing sections */}
      <div className="space-y-4 pt-4">
        <WhatWeDoSection />
        <CaseStudiesSection />
      </div>

      {/* Disclaimer */}
      <div className="mt-8 pt-4 border-t border-border">
        <p className="text-caption text-text-tertiary text-center max-w-lg mx-auto">
          Estimated savings are based on assumptions and aggregated market benchmarks. Actual pricing is subject to validation, carrier approval, volume commitments, and contractual terms. Parcel Rate Checker results exclude fuel, environmental, peak, and out-of-area surcharges. Any personalised quote will include a customised rate card aligned with your specific business requirements.
        </p>
      </div>
    </div>
  );
}
