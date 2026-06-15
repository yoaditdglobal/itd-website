import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// Static fallbacks — used when Supabase is unavailable (no credentials or network error)
const FALLBACK_COURIERS: Record<'domestic' | 'international', CourierOption[]> = {
  domestic: [
    { value: 'amazon-shipping', label: 'Amazon Shipping' },
    { value: 'apc-domestic', label: 'APC' },
    { value: 'dhl-parcel', label: 'DHL Parcel' },
    { value: 'dpd', label: 'DPD' },
    { value: 'dx', label: 'DX' },
    { value: 'evri', label: 'Evri' },
    { value: 'parcel-force-domestic', label: 'Parcel Force' },
    { value: 'royal-mail', label: 'Royal Mail' },
    { value: 'ups', label: 'UPS' },
    { value: 'yodel', label: 'InPost' },
  ],
  international: [
    { value: 'dhl', label: 'DHL Express' },
    { value: 'dhl-parcel', label: 'DHL Parcel' },
    { value: 'evri-eu', label: 'Evri EU' },
    { value: 'fedex', label: 'FedEx' },
    { value: 'parcel-force', label: 'Parcel Force' },
    { value: 'royal-mail-international', label: 'Royal Mail International' },
    { value: 'spring-global', label: 'Spring Global' },
    { value: 'ups', label: 'UPS' },
  ],
};

const FALLBACK_SERVICES: Record<string, CourierServiceOption[]> = {
  'royal-mail':            [{ value: 'tracked-24', label: 'Tracked 24' }, { value: 'tracked-48', label: 'Tracked 48' }, { value: 'first-class', label: 'First Class' }, { value: 'second-class', label: 'Second Class' }],
  'evri':                  [{ value: 'standard', label: 'Standard' }, { value: 'next-day', label: 'Next Day' }],
  'dpd':                   [{ value: 'next-day', label: 'Next Day' }, { value: 'two-day', label: 'Two Day' }, { value: 'saturday', label: 'Saturday' }],
  'dhl-parcel':            [{ value: 'next-day', label: 'Next Day' }, { value: 'two-day', label: 'Two Day' }],
  'apc-domestic':          [{ value: 'next-day', label: 'Next Day' }, { value: 'two-day', label: 'Two Day' }],
  'amazon-shipping':       [{ value: 'standard', label: 'Standard' }, { value: 'next-day', label: 'Next Day' }],
  'yodel':                 [{ value: 'standard', label: 'Standard' }, { value: 'next-day', label: 'Next Day' }],
  'ups':                   [{ value: 'express', label: 'Express' }, { value: 'standard', label: 'Standard' }],
  'dx':                    [{ value: 'next-day', label: 'Next Day' }, { value: 'two-day', label: 'Two Day' }],
  'parcel-force-domestic': [{ value: 'express24', label: 'Express 24' }, { value: 'express48', label: 'Express 48' }],
  'dhl':                   [{ value: 'express', label: 'Express' }, { value: 'economy-select', label: 'Economy Select' }],
  'fedex':                 [{ value: 'international-priority', label: 'International Priority' }, { value: 'international-economy', label: 'International Economy' }],
  'parcel-force':          [{ value: 'global-express', label: 'Global Express' }, { value: 'global-economy', label: 'Global Economy' }],
  'royal-mail-international': [{ value: 'tracked', label: 'Tracked' }, { value: 'untracked', label: 'Untracked' }],
  'spring-global':         [{ value: 'standard', label: 'Standard' }, { value: 'tracked', label: 'Tracked' }],
  'evri-eu':               [{ value: 'standard', label: 'Standard' }],
};

export interface CourierServiceOption {
  value: string;
  label: string;
}

export interface CourierOption {
  value: string;
  label: string;
}

export interface ParcelLimits {
  maxWeightKg: number | null;
  maxLengthCm: number | null;
  maxWidthCm: number | null;
  maxHeightCm: number | null;
  maxCombinedCm: number | null;
}

export interface CourierServiceWithLimits {
  value: string;
  label: string;
  limits: ParcelLimits;
}

interface SavingsRule {
  courier: string;
  courier_label: string;
  service_type: string;
  service_label: string;
  is_active: boolean;
  max_weight_kg: number | null;
  max_length_cm: number | null;
  max_width_cm: number | null;
  max_height_cm: number | null;
  max_combined_cm: number | null;
}

/**
 * Fetch unique couriers from the savings_display_rules table for a given flow type
 */
export function useCouriers(flowType: 'domestic' | 'international') {
  return useQuery({
    queryKey: ['couriers', flowType],
    queryFn: async (): Promise<CourierOption[]> => {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return FALLBACK_COURIERS[flowType];
      }
      try {
        const { data, error } = await supabase
          .from('savings_display_rules')
          .select('courier, courier_label')
          .eq('flow_type', flowType)
          .eq('is_active', true);

        if (error || !data?.length) {
          return FALLBACK_COURIERS[flowType];
        }

        // Get unique couriers
        const uniqueCouriers = new Map<string, string>();
        (data as SavingsRule[] || []).forEach(rule => {
          if (!uniqueCouriers.has(rule.courier)) {
            uniqueCouriers.set(rule.courier, rule.courier_label);
          }
        });

        const couriers: CourierOption[] = [];
        uniqueCouriers.forEach((label, value) => {
          couriers.push({ value, label });
        });

        return couriers.sort((a, b) => a.label.localeCompare(b.label));
      } catch {
        return FALLBACK_COURIERS[flowType];
      }
    },
    // Ensure we recover quickly from backend policy changes (e.g. after RLS updates)
    // and don't get stuck showing a cached empty list.
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 30 * 1000, // 30s
  });
}

/**
 * Fetch services for a specific courier from the savings_display_rules table
 * Now includes parcel limits for each service
 */
export function useCourierServices(flowType: 'domestic' | 'international', courier: string | null) {
  return useQuery({
    queryKey: ['courier-services', flowType, courier],
    queryFn: async (): Promise<CourierServiceOption[]> => {
      if (!courier || courier === 'other') {
        return [];
      }

      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return FALLBACK_SERVICES[courier] ?? [];
      }

      try {
        const { data, error } = await supabase
          .from('savings_display_rules')
          .select('service_type, service_label')
          .eq('flow_type', flowType)
          .eq('courier', courier)
          .eq('is_active', true)
          .order('service_label');

        if (error || !data?.length) {
          return FALLBACK_SERVICES[courier] ?? [];
        }

        return (data as SavingsRule[] || []).map(rule => ({
          value: rule.service_type,
          label: rule.service_label,
        }));
      } catch {
        return FALLBACK_SERVICES[courier] ?? [];
      }
    },
    enabled: !!courier && courier !== 'other',
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 30 * 1000,
  });
}

/**
 * Fetch services with parcel limits for a specific courier
 */
export function useCourierServicesWithLimits(flowType: 'domestic' | 'international', courier: string | null) {
  return useQuery({
    queryKey: ['courier-services-with-limits', flowType, courier],
    queryFn: async (): Promise<CourierServiceWithLimits[]> => {
      if (!courier || courier === 'other') {
        return [];
      }

      const { data, error } = await supabase
        .from('savings_display_rules')
        .select('service_type, service_label, max_weight_kg, max_length_cm, max_width_cm, max_height_cm, max_combined_cm')
        .eq('flow_type', flowType)
        .eq('courier', courier)
        .eq('is_active', true)
        .order('service_label');

      if (error) {
        console.error('Error fetching courier services with limits:', error);
        return [];
      }

      return (data as SavingsRule[] || []).map(rule => ({
        value: rule.service_type,
        label: rule.service_label,
        limits: {
          maxWeightKg: rule.max_weight_kg,
          maxLengthCm: rule.max_length_cm,
          maxWidthCm: rule.max_width_cm,
          maxHeightCm: rule.max_height_cm,
          maxCombinedCm: rule.max_combined_cm,
        },
      }));
    },
    enabled: !!courier && courier !== 'other',
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 30 * 1000,
  });
}

/**
 * Get the limits for a specific service
 */
export function useServiceLimits(
  flowType: 'domestic' | 'international',
  courier: string | null,
  serviceType: string | null
) {
  return useQuery({
    queryKey: ['service-limits', flowType, courier, serviceType],
    queryFn: async (): Promise<ParcelLimits | null> => {
      if (!courier || !serviceType || courier === 'other') {
        return null;
      }

      const { data, error } = await supabase
        .from('savings_display_rules')
        .select('max_weight_kg, max_length_cm, max_width_cm, max_height_cm, max_combined_cm')
        .eq('flow_type', flowType)
        .eq('courier', courier)
        .eq('service_type', serviceType)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        return null;
      }

      const typedData = data as SavingsRule;
      return {
        maxWeightKg: typedData.max_weight_kg,
        maxLengthCm: typedData.max_length_cm,
        maxWidthCm: typedData.max_width_cm,
        maxHeightCm: typedData.max_height_cm,
        maxCombinedCm: typedData.max_combined_cm,
      };
    },
    enabled: !!courier && !!serviceType && courier !== 'other',
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 30 * 1000,
  });
}

/**
 * Check if a rule exists for a courier/service combo and get the savings range
 */
export interface SavingsRuleResult {
  exists: boolean;
  minSavingsPercent: number;
  maxSavingsPercent: number;
  minRealisticPrice: number;
}

export function useSavingsRule(
  flowType: 'domestic' | 'international',
  courier: string | null,
  serviceType: string | null
) {
  return useQuery({
    queryKey: ['savings-rule', flowType, courier, serviceType],
    queryFn: async (): Promise<SavingsRuleResult> => {
      if (!courier || !serviceType || courier === 'other') {
        return {
          exists: false,
          minSavingsPercent: 0,
          maxSavingsPercent: 0,
          minRealisticPrice: 0,
        };
      }

      const { data, error } = await supabase
        .from('savings_display_rules')
        .select('min_savings_percent, max_savings_percent, min_realistic_price')
        .eq('flow_type', flowType)
        .eq('courier', courier)
        .eq('service_type', serviceType)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        return {
          exists: false,
          minSavingsPercent: 0,
          maxSavingsPercent: 0,
          minRealisticPrice: 0,
        };
      }

      const typedData = data as { 
        min_savings_percent: number; 
        max_savings_percent: number; 
        min_realistic_price: number; 
      };

      return {
        exists: true,
        minSavingsPercent: typedData.min_savings_percent,
        maxSavingsPercent: typedData.max_savings_percent,
        minRealisticPrice: typedData.min_realistic_price,
      };
    },
    enabled: !!courier && !!serviceType && courier !== 'other',
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 30 * 1000,
  });
}

/**
 * Validate parcel against service limits
 */
export interface ParcelValidationResult {
  valid: boolean;
  warnings: string[];
}

export function validateParcelLimits(
  limits: ParcelLimits | null,
  weight: number | null,
  length: number | null,
  width: number | null,
  height: number | null,
  courierLabel?: string,
  serviceLabel?: string
): ParcelValidationResult {
  const warnings: string[] = [];
  
  if (!limits) {
    return { valid: true, warnings: [] };
  }

  const serviceName = serviceLabel 
    ? `${courierLabel || 'This service'} ${serviceLabel}` 
    : (courierLabel || 'This service');

  if (limits.maxWeightKg && weight && weight > limits.maxWeightKg) {
    warnings.push(`${serviceName} has a maximum weight of ${limits.maxWeightKg}kg`);
  }

  if (limits.maxLengthCm && length && length > limits.maxLengthCm) {
    warnings.push(`Maximum length is ${limits.maxLengthCm}cm`);
  }

  if (limits.maxWidthCm && width && width > limits.maxWidthCm) {
    warnings.push(`Maximum width is ${limits.maxWidthCm}cm`);
  }

  if (limits.maxHeightCm && height && height > limits.maxHeightCm) {
    warnings.push(`Maximum height is ${limits.maxHeightCm}cm`);
  }

  // Combined dimension check: L + 2*(W+H) is a common carrier formula
  if (limits.maxCombinedCm && length && width && height) {
    const combined = length + 2 * (width + height);
    if (combined > limits.maxCombinedCm) {
      warnings.push(`Combined dimensions (L + 2×(W+H) = ${combined}cm) exceed ${limits.maxCombinedCm}cm limit`);
    }
  }

  return { valid: warnings.length === 0, warnings };
}
