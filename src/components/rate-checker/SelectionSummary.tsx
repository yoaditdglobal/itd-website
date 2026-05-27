"use client";
import { FormData, getCourierDisplayLabel, ShipmentType } from "./types";
import { Package, Globe, ArrowDownToLine } from "lucide-react";

// Import carrier logos - Domestic

// Import carrier logos - International

const CARRIER_LOGOS: Record<string, string> = {
  'amazon-shipping': '/logos/rate-checker/carriers/amazon-shipping.png',
  'royal-mail': '/logos/rate-checker/carriers/royal-mail.png',
  'apc-domestic': '/logos/rate-checker/carriers/apc-domestic.png',
  'dhl-parcel': '/logos/rate-checker/carriers/dhl-parcel.png',
  'dx': '/logos/rate-checker/carriers/dx.png',
  'fedex-domestic': '/logos/rate-checker/carriers/fedex.png',
  'parcel-force-domestic': '/logos/rate-checker/carriers/parcel-force-domestic.png',
  'evri-eu': '/logos/rate-checker/carriers/evri-eu.png',
  'spring-global': '/logos/rate-checker/carriers/spring-global.png',
  'parcel-force': '/logos/rate-checker/carriers/parcel-force.png',
  'royal-mail-international': '/logos/rate-checker/carriers/royal-mail.png',
};;

function formatServiceLabel(serviceValue: string): string {
  // Convert service-type to Service Type (e.g., "tracked-24" -> "Tracked 24")
  return serviceValue
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


const SHIPMENT_TYPE_LABELS: Record<string, { label: string; icon: React.ReactNode }> = {
  'domestic': { label: 'Domestic UK', icon: <Package className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  'international-export': { label: 'International Export', icon: <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  'international-import': { label: 'International Import', icon: <ArrowDownToLine className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
};

interface SelectionSummaryProps {
  formData: FormData;
  currentStep: number;
}

export function SelectionSummary({ formData, currentStep }: SelectionSummaryProps) {
  const isInternational = formData.shipmentType === 'international-export' || 
                          formData.shipmentType === 'international-import';
  
  // Don't show if no shipment type selected
  if (formData.shipmentType === null) return null;
  
  // Show from step 2 onwards (after shipment type is selected)
  if (currentStep < 2) return null;

  const shipmentInfo = SHIPMENT_TYPE_LABELS[formData.shipmentType];
  const courierName = formData.courier ? getCourierDisplayLabel(formData.courier) : null;
  const courier2Name = formData.courier2 ? getCourierDisplayLabel(formData.courier2) : null;
  const serviceName = formData.courierService ? formatServiceLabel(formData.courierService) : null;
  const logo = formData.courier ? CARRIER_LOGOS[formData.courier] : null;
  const logo2 = formData.courier2 ? CARRIER_LOGOS[formData.courier2] : null;

  return (
    <div className="mt-4 mb-2 flex flex-wrap items-center justify-center gap-1.5 md:gap-2 text-xs md:text-sm text-white/70">
      {/* Shipment type badge */}
      {shipmentInfo && (
        <div className="flex items-center gap-1.5">
          {shipmentInfo.icon}
          <span className="font-medium text-white">{shipmentInfo.label}</span>
        </div>
      )}

      {/* Primary Courier with logo */}
      {courierName && (
        <>
          <span className="text-white/40">•</span>
          <div className="flex items-center gap-1.5">
            {logo ? (
              <img
                src={logo}
                alt={courierName}
                className="w-4 h-4 md:w-5 md:h-5 rounded object-contain"
              />
            ) : (
              <Package className="w-3.5 h-3.5 md:w-4 md:h-4" />
            )}
            <span className="font-medium text-white">{courierName}</span>
          </div>
        </>
      )}

      {/* Second carrier */}
      {courier2Name && (
        <>
          <span className="text-white/40">&</span>
          <div className="flex items-center gap-1.5">
            {logo2 ? (
              <img
                src={logo2}
                alt={courier2Name}
                className="w-4 h-4 md:w-5 md:h-5 rounded object-contain"
              />
            ) : (
              <Package className="w-3.5 h-3.5 md:w-4 md:h-4" />
            )}
            <span className="font-medium text-white">{courier2Name}</span>
          </div>
        </>
      )}

      {/* Service name - only show if available and no second carrier */}
      {serviceName && !courier2Name && (
        <>
          <span className="text-white/40">•</span>
          <span className="text-white/70">{serviceName}</span>
        </>
      )}

      {/* Weekly volume */}
      {(formData.weeklyVolume || formData.weeklyVolume2) && (
        <>
          <span className="text-white/40">•</span>
          <span className="text-white/70">{((formData.weeklyVolume || 0) + (formData.weeklyVolume2 || 0)).toLocaleString()} parcels/week</span>
        </>
      )}
    </div>
  );
}
