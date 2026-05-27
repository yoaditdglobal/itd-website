export type ShipmentType = 'domestic' | 'international-export' | 'international-import' | null;

export type ShippingLane = 'eu' | 'usa' | 'middle-east' | 'asia-pacific' | 'rest-of-world';

export type DomesticCourier = 'evri' | 'yodel' | 'amazon-shipping' | 'royal-mail' | 'dhl' | 'dpd' | 'fedex' | 'ups' | 'apc-domestic' | 'dhl-parcel' | 'dx' | 'fedex-domestic' | 'parcel-force-domestic';

export type InternationalCourier = 'evri-eu' | 'royal-mail-international' | 'parcel-force' | 'dhl' | 'fedex' | 'ups' | 'apc' | 'landmark' | 'spring-global' | 'starlinks';

export type CourierProvider = DomesticCourier | InternationalCourier;

export type ServiceLevel = 'tracked-48' | 'tracked-24' | 'next-day' | 'economy-international' | 'express-international';

export interface CourierServiceOption {
  value: string;
  label: string;
}

export type OutOfAreaZone = 'bepo' | 'northern-ireland' | 'isle-of-man-wight' | 'scottish-highlands' | 'channel-islands';

export const OUT_OF_AREA_ZONES: { value: OutOfAreaZone; label: string }[] = [
  { value: 'bepo', label: 'BEPO' },
  { value: 'northern-ireland', label: 'Northern Ireland' },
  { value: 'isle-of-man-wight', label: 'Isle of Man / Isle of Wight' },
  { value: 'scottish-highlands', label: 'Scottish Highlands & Islands' },
  { value: 'channel-islands', label: 'Channel Islands' },
];

// Volumetric weight calculation constants
export const VOLUMETRIC_DIVISOR = 5000; // Standard for international air freight

// Helper functions for weight calculations
export function calculateVolumetricWeight(length: number, width: number, height: number): number {
  return (length * width * height) / VOLUMETRIC_DIVISOR;
}

export function getChargeableWeight(actualWeight: number, volumetricWeight: number): number {
  return Math.max(actualWeight, volumetricWeight);
}

/**
 * Pricing breakdown for a specific destination country.
 * "Lane" refers to a shipping route/destination, NOT a carrier/courier.
 */
export interface LanePricing {
  /** The destination country or region name */
  destination: string;
  actualWeight: number | null;
  volumetricWeight: number | null;
  chargeableWeight: number | null;
  dimensions: {
    length: number | null;
    width: number | null;
    height: number | null;
  };
  pricing: {
    basePrice: number | null;
    totalPrice: number | null;
  };
  surcharges: {
    fuel: number | null;
    remoteArea: number | null;
    oversize: number | null;
    residential: number | null;
    other: Array<{ name: string; amount: number }>;
  };
}

// Extraction summary for transparency
export interface InvoiceExtraction {
  totalExtracted: number;
  identifiable: number;
  afterFlowFilter: number;
}

// Filtering metadata for flow-aware invoice analysis
export interface InvoiceFiltering {
  originalLaneCount: number;
  filteredLaneCount: number;
  excludedCount: number;
  excludedType: string;
  unidentifiedCount?: number;
  appliedFilter: ShipmentType;
}

// Invoice analysis result from AI extraction
export interface InvoiceAnalysis {
  parcel: {
    weight: number | null;
    length: number | null;
    height: number | null;
    width: number | null;
  };
  pricing: {
    basePrice: number | null;
    totalPrice: number | null;
  };
  surcharges: {
    fuel: number | null;
    remoteArea: number | null;
    oversize: number | null;
    residential: number | null;
    saturdayDelivery: number | null;
    signature: number | null;
    insurance: number | null;
    other: Array<{ name: string; amount: number }>;
  };
  context: {
    carrier: string | null;
    serviceLevel: string | null;
    origin: string | null;
    destination: string | null;
  };
  // Per-lane breakdown for multi-destination invoices
  lanes: LanePricing[];
  confidence: 'high' | 'medium' | 'low';
  extractedFields: number;
  notes: string | null;
  // Extraction summary (always present for transparency)
  extraction?: InvoiceExtraction;
  // Filtering metadata (present when lanes were filtered based on flow)
  filtering?: InvoiceFiltering;
}

// Map AI-extracted carrier names to form values
export const CARRIER_NAME_MAP: Record<string, CourierProvider> = {
  'dhl': 'dhl',
  'dhl express': 'dhl',
  'dhl parcel': 'dhl-parcel',
  'dhl parcel uk': 'dhl-parcel',
  'fedex': 'fedex',
  'federal express': 'fedex',
  'ups': 'ups',
  'united parcel service': 'ups',
  'royal mail': 'royal-mail',
  'royal mail international': 'royal-mail-international',
  'parcel force': 'parcel-force',
  'parcelforce': 'parcel-force',
  'evri': 'evri',
  'evri eu': 'evri-eu',
  'hermes': 'evri', // Old name
  'yodel': 'yodel',
  'amazon shipping': 'amazon-shipping',
  'amazon': 'amazon-shipping',
  'dpd': 'dpd',
  'apc': 'apc',
  'apc overnight': 'apc-domestic',
  'dx': 'dx',
  'dx delivery': 'dx',
  'landmark': 'landmark',
  'spring global': 'spring-global',
  'spring': 'spring-global',
  'starlinks': 'starlinks',
  'star links': 'starlinks',
};

export function mapCarrierNameToProvider(carrierName: string): CourierProvider | null {
  if (!carrierName) return null;
  const normalized = carrierName.toLowerCase().trim();
  return CARRIER_NAME_MAP[normalized] || null;
}

export interface FormData {
  shipmentType: ShipmentType;
  shippingLanes: ShippingLane[];
  selectedDestinations: Partial<Record<ShippingLane, string[]>>;
  courier: CourierProvider | null;
  otherCourierName: string;
  serviceLevel: ServiceLevel | null;
  courierService: string | null;
  weeklyVolume: number | null;
  weeklyVolume2: number | null;
  mainlandPercentage: number;
  remotePercentage: number;
  outOfAreaZones: OutOfAreaZone[];
  fuelSurcharge: number | null;
  currentCostPerParcel: number | null;
  // Second carrier for benchmarking (optional, manual entry only)
  courier2: CourierProvider | null;
  courierService2: string | null;
  currentCostPerParcel2: number | null;
  // International-specific parcel details (Step 5)
  parcelWeight: number | null;
  parcelLength: number | null;
  parcelHeight: number | null;
  parcelWidth: number | null;
  // Second carrier parcel dimensions (dual-carrier benchmarking)
  parcelWeight2: number | null;
  parcelLength2: number | null;
  parcelHeight2: number | null;
  parcelWidth2: number | null;
  shippingInvoiceFile: File | null;
  // Invoice analysis results
  invoiceAnalysis: InvoiceAnalysis | null;
}

export interface CountryOption {
  code: string;
  name: string;
}

// Regions that require country specification (USA is excluded)
export const REGIONS_WITH_AUTOCOMPLETE: ShippingLane[] = ['eu', 'middle-east', 'asia-pacific', 'rest-of-world'];

export const COUNTRIES_BY_REGION: Record<ShippingLane, CountryOption[]> = {
  'eu': [
    { code: 'AT', name: 'Austria' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'HR', name: 'Croatia' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czechia' },
    { code: 'DK', name: 'Denmark' },
    { code: 'EE', name: 'Estonia' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'GR', name: 'Greece' },
    { code: 'HU', name: 'Hungary' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IT', name: 'Italy' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'MT', name: 'Malta' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'RO', name: 'Romania' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'ES', name: 'Spain' },
    { code: 'SE', name: 'Sweden' },
  ],
  'usa': [], // No country autocomplete for USA
  'middle-east': [
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'QA', name: 'Qatar' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'OM', name: 'Oman' },
    { code: 'IL', name: 'Israel' },
    { code: 'JO', name: 'Jordan' },
    { code: 'LB', name: 'Lebanon' },
  ],
  'asia-pacific': [
    { code: 'AU', name: 'Australia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'JP', name: 'Japan' },
    { code: 'CN', name: 'China' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'SG', name: 'Singapore' },
    { code: 'KR', name: 'South Korea' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TH', name: 'Thailand' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'PH', name: 'Philippines' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'IN', name: 'India' },
  ],
  'rest-of-world': [
    // Africa
    { code: 'ZA', name: 'South Africa' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'KE', name: 'Kenya' },
    { code: 'EG', name: 'Egypt' },
    { code: 'MA', name: 'Morocco' },
    // South America
    { code: 'BR', name: 'Brazil' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colombia' },
    { code: 'PE', name: 'Peru' },
    // Europe (non-EU)
    { code: 'NO', name: 'Norway' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'TR', name: 'Turkey' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'RU', name: 'Russia' },
    // North America (non-USA)
    { code: 'CA', name: 'Canada' },
    { code: 'MX', name: 'Mexico' },
  ],
};

// Note: Courier services are now fetched dynamically from the savings_display_rules table
// via the useCourierServices hook. The admin portal manages these through the Savings Rules tab.

export interface LeadFormData {
  fullName: string;
  companyName: string;
  collectionPostcode: string;
  email: string;
  phone: string;
}

export const SHIPPING_LANES: { value: ShippingLane; label: string }[] = [
  { value: 'eu', label: 'EU' },
  { value: 'usa', label: 'USA' },
  { value: 'middle-east', label: 'Middle East' },
  { value: 'asia-pacific', label: 'Asia-Pacific' },
  { value: 'rest-of-world', label: 'Rest of World' },
];

export const DOMESTIC_COURIERS: { value: DomesticCourier; label: string }[] = [
  { value: 'evri', label: 'Evri' },
  { value: 'yodel', label: 'Yodel' },
  { value: 'amazon-shipping', label: 'Amazon Shipping' },
  { value: 'royal-mail', label: 'Royal Mail' },
  { value: 'dhl', label: 'DHL' },
  { value: 'dpd', label: 'DPD' },
  { value: 'fedex', label: 'FedEx' },
  { value: 'ups', label: 'UPS' },
  { value: 'apc-domestic', label: 'APC' },
  { value: 'dhl-parcel', label: 'DHL Parcel' },
  { value: 'dx', label: 'DX' },
  { value: 'fedex-domestic', label: 'FedEx' },
  { value: 'parcel-force-domestic', label: 'Parcel Force' },
];

export const INTERNATIONAL_COURIERS: { value: InternationalCourier; label: string }[] = [
  { value: 'evri-eu', label: 'Evri EU' },
  { value: 'royal-mail-international', label: 'Royal Mail International' },
  { value: 'parcel-force', label: 'Parcel Force' },
  { value: 'dhl', label: 'DHL' },
  { value: 'fedex', label: 'FedEx' },
  { value: 'ups', label: 'UPS' },
  { value: 'apc', label: 'APC' },
  { value: 'landmark', label: 'Landmark' },
  { value: 'spring-global', label: 'Spring Global' },
  { value: 'starlinks', label: 'Starlinks' },
];

export const SERVICE_LEVELS: { value: ServiceLevel; label: string }[] = [
  { value: 'tracked-48', label: 'Tracked 48' },
  { value: 'tracked-24', label: 'Tracked 24' },
  { value: 'next-day', label: 'Next Day' },
  { value: 'economy-international', label: 'Economy International' },
  { value: 'express-international', label: 'Express International' },
];

/**
 * Get the correct display label for a courier value.
 * Looks up the proper branded name (e.g., "DHL" not "Dhl", "FedEx" not "Fedex").
 */
export function getCourierDisplayLabel(courierValue: string | null): string {
  if (!courierValue) return 'Not specified';
  
  // Check domestic couriers
  const domestic = DOMESTIC_COURIERS.find(c => c.value === courierValue);
  if (domestic) return domestic.label;
  
  // Check international couriers
  const international = INTERNATIONAL_COURIERS.find(c => c.value === courierValue);
  if (international) return international.label;
  
  // Fallback: format the value nicely
  return courierValue
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
