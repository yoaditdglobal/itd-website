"use client";
import { useMemo, useState } from "react";
import { CourierProvider, ShipmentType, ShippingLane } from "./types";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Loader2, Plus, X } from "lucide-react";
import { useCouriers, useCourierServices } from "@/components/rate-checker/useCourierServices";

// Domestic carrier logos

// International carrier logos

import { CARRIER_LOGOS } from "./carrierLogos";

interface CourierStepProps {
  shipmentType: ShipmentType;
  courier: CourierProvider | null;
  otherCourierName: string;
  courierService: string | null;
  shippingLanes?: ShippingLane[];
  courier2?: CourierProvider | null;
  courierService2?: string | null;
  onCourierChange: (courier: CourierProvider) => void;
  onOtherCourierNameChange: (name: string) => void;
  onCourierServiceChange: (service: string) => void;
  onCourier2Change?: (courier: CourierProvider | null) => void;
  onCourierService2Change?: (service: string) => void;
}

export function CourierStep({
  shipmentType,
  courier,
  otherCourierName,
  courierService,
  shippingLanes = [],
  courier2 = null,
  courierService2 = null,
  onCourierChange,
  onOtherCourierNameChange,
  onCourierServiceChange,
  onCourier2Change,
  onCourierService2Change,
}: CourierStepProps) {
  const isInternational = shipmentType === 'international-export' || shipmentType === 'international-import';
  const flowType = isInternational ? 'international' : 'domestic';
  const [showSecondCarrier, setShowSecondCarrier] = useState(!!courier2);
  
  // Fetch couriers dynamically from the database
  const { data: couriers = [], isLoading: couriersLoading } = useCouriers(flowType);
  
  // Fetch services for the selected courier
  const { data: courierServices = [], isLoading: servicesLoading } = useCourierServices(flowType, courier);

  // Fetch services for second courier
  const { data: courier2Services = [], isLoading: services2Loading } = useCourierServices(flowType, courier2);

  // Filter couriers based on shipment type and selected lanes
  const filteredCouriers = useMemo(() => {
    let result = [...couriers];
    
    // Hide Evri EU for International Import only
    if (shipmentType === 'international-import') {
      result = result.filter(c => c.value !== 'evri-eu');
    }
    
    // Hide UPS for Asia-Pacific imports only
    if (shipmentType === 'international-import' && shippingLanes.includes('asia-pacific')) {
      result = result.filter(c => c.value !== 'ups');
    }
    
    return result;
  }, [couriers, shipmentType, shippingLanes]);

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-heading-lg text-text-primary mb-2">
            Who do you mainly ship with today?
          </h2>
        </div>
        
        {couriersLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-text-secondary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {filteredCouriers.map((provider) => {
              const logo = CARRIER_LOGOS[provider.value];
              
              return (
                <button
                  key={provider.value}
                  type="button"
                  onClick={() => onCourierChange(provider.value as CourierProvider)}
                  className={cn(
                    "flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200",
                    "hover:border-primary hover:shadow-md",
                    courier === provider.value
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card"
                  )}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center overflow-hidden bg-white border border-border/30 shadow-sm">
                    {logo ? (
                      <img
                        src={logo}
                        alt={`${provider.label} logo`}
                        loading="eager"
                        className={cn(
                          "object-contain rounded-lg",
                          provider.value === 'royal-mail' || provider.value === 'royal-mail-international' || provider.value === 'dx'
                            ? "w-11 h-11 sm:w-14 sm:h-14"
                            : "w-10 h-10 sm:w-12 sm:h-12"
                        )}
                      />
                    ) : (
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-text-secondary" />
                    )}
                  </div>
                  <span className="font-medium text-xs sm:text-sm text-text-primary text-center">{provider.label}</span>
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Service dropdown - shows when courier is selected and has services */}
      {courier && (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-heading-lg text-text-primary mb-2">
              Which service do you mainly use?
            </h2>
          </div>
          
          {servicesLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-text-secondary" />
            </div>
          ) : courierServices.length > 0 ? (
            <Select
              value={courierService || undefined}
              onValueChange={(value) => onCourierServiceChange(value)}
            >
              <SelectTrigger className="w-full max-w-md mx-auto bg-card border-border">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent 
                className="bg-popover border-border z-[100]"
                position="popper"
                sideOffset={4}
              >
                {courierServices.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-center text-body-sm text-text-secondary">
              No services configured for this courier yet. Contact admin to add services.
            </p>
          )}
        </div>
      )}

      {/* Add another carrier button - show after primary courier + service are selected */}
      {courier && (courierService || isInternational) && !showSecondCarrier && onCourier2Change && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowSecondCarrier(true)}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Add another courier
          </button>
        </div>
      )}

      {/* Second carrier selection */}
      {showSecondCarrier && onCourier2Change && onCourierService2Change && (
        <div className="space-y-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-heading-md text-text-primary">
              Choose another courier
            </h2>
            <button
              type="button"
              onClick={() => {
                setShowSecondCarrier(false);
                onCourier2Change(null);
              }}
              className="inline-flex items-center gap-1 text-body-sm text-text-secondary hover:text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          </div>
          
          {couriersLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-text-secondary" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {filteredCouriers
                .filter(p => p.value !== courier) // Exclude primary carrier
                .map((provider) => {
                  const logo = CARRIER_LOGOS[provider.value];
                  return (
                    <button
                      key={provider.value}
                      type="button"
                      onClick={() => onCourier2Change(provider.value as CourierProvider)}
                      className={cn(
                        "flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200",
                        "hover:border-primary hover:shadow-md",
                        courier2 === provider.value
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-card"
                      )}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center overflow-hidden bg-white border border-border/30 shadow-sm">
                        {logo ? (
                          <img
                            src={logo}
                            alt={`${provider.label} logo`}
                            loading="eager"
                            className={cn(
                              "object-contain rounded-lg",
                              provider.value === 'royal-mail' || provider.value === 'royal-mail-international' || provider.value === 'dx'
                                ? "w-11 h-11 sm:w-14 sm:h-14"
                                : "w-10 h-10 sm:w-12 sm:h-12"
                            )}
                          />
                        ) : (
                          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-text-secondary" />
                        )}
                      </div>
                      <span className="font-medium text-xs sm:text-sm text-text-primary text-center">{provider.label}</span>
                    </button>
                  );
                })}
            </div>
          )}

          {/* Second carrier service dropdown */}
          {courier2 && (
            <div className="space-y-3">
              <h3 className="text-heading-sm text-text-primary text-center">
                Which service for the second carrier?
              </h3>
              {services2Loading ? (
                <div className="flex justify-center py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-text-secondary" />
                </div>
              ) : courier2Services.length > 0 ? (
                <Select
                  value={courierService2 || undefined}
                  onValueChange={(value) => onCourierService2Change(value)}
                >
                  <SelectTrigger className="w-full max-w-md mx-auto bg-card border-border">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent 
                    className="bg-popover border-border z-[100]"
                    position="popper"
                    sideOffset={4}
                  >
                    {courier2Services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-center text-body-sm text-text-secondary">
                  No services configured for this courier yet.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
