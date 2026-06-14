"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Sparkles, Phone, ThumbsUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { InvoiceAnalysis, ShipmentType } from "./types";

interface InvoiceSavingsPreviewProps {
  invoiceAnalysis: InvoiceAnalysis;
  shipmentType: ShipmentType;
  userSelectedCourier?: string | null;
  userSelectedService?: string | null;
}

// Extract and normalize carrier from invoice context
function extractCarrierFromInvoice(carrier: string | undefined | null): string | null {
  if (!carrier) return null;
  // "DHL Express" -> "dhl", "FedEx" -> "fedex", etc.
  return carrier
    .toLowerCase()
    .replace(/\s+express$/i, '')  // Remove "Express" suffix
    .replace(/\s+/g, '-')
    .trim() || null;
}

// Extract and normalize service level from invoice context
// Strips carrier prefixes and trailing hyphens for reliable matching
function extractServiceFromInvoice(serviceLevel: string | undefined | null, carrier: string | null): string | null {
  if (!serviceLevel) return null;
  
  let normalized = serviceLevel.toLowerCase().replace(/\s+/g, '-').trim();
  
  // Strip trailing hyphens
  normalized = normalized.replace(/-+$/, '');
  
  // If service starts with carrier prefix, strip it (e.g., "dpd-next-day" -> "next-day")
  if (carrier) {
    const carrierPrefix = `${carrier}-`;
    if (normalized.startsWith(carrierPrefix)) {
      normalized = normalized.slice(carrierPrefix.length);
    }
  }
  
  return normalized || null;
}

type ResultType = 'savings' | 'too_low' | 'too_high' | 'no_rule';

interface CalculationResult {
  type: ResultType;
  savingsPercent: number;
  minPrice?: number;
  threshold?: number;
  ruleExists: boolean;
}

function calculateAverageCostFromInvoice(analysis: InvoiceAnalysis): number | null {
  // If we have lanes, calculate the average cost per parcel
  if (analysis.lanes && analysis.lanes.length > 0) {
    const totalCost = analysis.lanes.reduce((sum, lane) => {
      // Use totalPrice if available, otherwise sum up all pricing
      const laneCost = lane.pricing.totalPrice ?? lane.pricing.basePrice ?? 0;
      return sum + laneCost;
    }, 0);
    return totalCost / analysis.lanes.length;
  }
  
  // Fallback to aggregate pricing
  if (analysis.pricing.totalPrice !== null) {
    return analysis.pricing.totalPrice;
  }
  
  return analysis.pricing.basePrice;
}

export function InvoiceSavingsPreview({
  invoiceAnalysis,
  shipmentType,
  userSelectedCourier,
  userSelectedService,
}: InvoiceSavingsPreviewProps) {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Prioritize user-selected courier over invoice extraction
  // This handles reseller invoices (e.g., ParcelHero) where the actual carrier is different
  const carrier = userSelectedCourier 
    ? userSelectedCourier.toLowerCase().replace(/\s+/g, '-')
    : extractCarrierFromInvoice(invoiceAnalysis.context.carrier);
  
  // Prioritize user-selected service over invoice extraction
  const serviceType = userSelectedService
    ? userSelectedService.toLowerCase().replace(/\s+/g, '-')
    : extractServiceFromInvoice(invoiceAnalysis.context.serviceLevel, carrier);
  
  const isDomestic = shipmentType === 'domestic';

  useEffect(() => {
    async function calculateSavings() {
      // Skip if missing carrier - but service can be optional
      if (!carrier) {
        console.log('InvoiceSavingsPreview: No carrier extracted from invoice');
        setIsLoading(false);
        setResult({ type: 'no_rule', savingsPercent: 0, ruleExists: false });
        return;
      }

      const currentCost = calculateAverageCostFromInvoice(invoiceAnalysis);
      if (currentCost === null || currentCost <= 0) {
        console.log('InvoiceSavingsPreview: Invalid currentCost:', currentCost);
        setIsLoading(false);
        setResult({ type: 'no_rule', savingsPercent: 0, ruleExists: false });
        return;
      }

      // Determine flow type
      const flowType = shipmentType === 'domestic' ? 'domestic' : 'international';

      // For domestic, let backend default to 'standard'; for international default to 'express'
      const effectiveService = serviceType || (isDomestic ? '' : 'express');
      
      console.log('InvoiceSavingsPreview: Calling calculate-savings with:', {
        flowType,
        carrier,
        serviceType: effectiveService,
        currentCost,
      });

      try {
        const { data, error: fnError } = await supabase.functions.invoke('calculate-savings', {
          body: {
            flowType,
            courier: carrier,
            serviceType: effectiveService,
            currentCost,
          },
        });

        if (fnError) {
          console.error('Savings calculation error:', fnError);
          setError(true);
          setIsLoading(false);
          return;
        }

        console.log('InvoiceSavingsPreview: Result:', data);
        setResult(data as CalculationResult);
      } catch (err) {
        console.error('Failed to calculate savings:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    calculateSavings();
  }, [invoiceAnalysis, shipmentType, carrier, serviceType]);

  // Loading state
  if (isLoading) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error or no rule - show "we can help" message
  if (error || !result || result.type === 'no_rule') {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-text-primary">We Can Help Lower Your Costs</p>
              <p className="text-body-sm text-text-secondary mt-1">
                Continue to see how ITD can optimize your shipments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Too low - user has great rates
  if (result.type === 'too_low') {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-primary/10">
              <ThumbsUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-text-primary">You Have Great Rates!</p>
              <p className="text-body-sm text-text-secondary mt-1">
                Your current pricing looks competitive. Let's see what else ITD can offer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Too high - let's talk
  if (result.type === 'too_high') {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-text-primary">Let's Talk</p>
              <p className="text-body-sm text-text-secondary mt-1">
                We'd love to discuss your shipping needs. Continue to connect with our team.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Savings found - show percentage
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <CardContent className="p-5 relative">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-primary/15">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-label text-text-secondary">Potential Savings</p>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-stat-lg text-primary mt-1">
              {result.savingsPercent}%
            </p>
            <p className="text-caption text-text-tertiary mt-1">
              Based on your invoice analysis
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
