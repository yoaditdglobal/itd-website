"use client";
import { useState, forwardRef } from "react";
import { ShippingLane, SHIPPING_LANES, COUNTRIES_BY_REGION, REGIONS_WITH_AUTOCOMPLETE } from "./types";
import { cn } from "@/lib/utils";
import { Check, X, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";

interface ShippingLanesStepProps {
  value: ShippingLane[];
  destinations: Partial<Record<ShippingLane, string[]>>;
  onChange: (lanes: ShippingLane[]) => void;
  onDestinationsChange: (destinations: Partial<Record<ShippingLane, string[]>>) => void;
}

export const ShippingLanesStep = forwardRef<HTMLDivElement, ShippingLanesStepProps>(
  function ShippingLanesStep({ value, destinations, onChange, onDestinationsChange }, ref) {
  const [openPopovers, setOpenPopovers] = useState<Record<ShippingLane, boolean>>({} as Record<ShippingLane, boolean>);

  const toggleLane = (lane: ShippingLane) => {
    if (value.includes(lane)) {
      // Remove lane and its destinations
      onChange(value.filter((l) => l !== lane));
      const newDestinations = { ...destinations };
      delete newDestinations[lane];
      onDestinationsChange(newDestinations);
    } else {
      onChange([...value, lane]);
      // Initialize empty destinations for this lane
      onDestinationsChange({ ...destinations, [lane]: [] });
    }
  };

  const addCountry = (lane: ShippingLane, countryCode: string) => {
    const currentDestinations = destinations[lane] || [];
    if (!currentDestinations.includes(countryCode)) {
      onDestinationsChange({
        ...destinations,
        [lane]: [...currentDestinations, countryCode],
      });
    }
    setOpenPopovers({ ...openPopovers, [lane]: false });
  };

  const removeCountry = (lane: ShippingLane, countryCode: string) => {
    const currentDestinations = destinations[lane] || [];
    onDestinationsChange({
      ...destinations,
      [lane]: currentDestinations.filter((c) => c !== countryCode),
    });
  };

  const getCountryName = (lane: ShippingLane, code: string) => {
    const country = COUNTRIES_BY_REGION[lane]?.find((c) => c.code === code);
    return country?.name || code;
  };

  const showAutocomplete = (lane: ShippingLane) => {
    return value.includes(lane) && REGIONS_WITH_AUTOCOMPLETE.includes(lane);
  };

  const getAvailableCountries = (lane: ShippingLane) => {
    const selected = destinations[lane] || [];
    return COUNTRIES_BY_REGION[lane]?.filter((c) => !selected.includes(c.code)) || [];
  };

  const getLaneLabel = (lane: ShippingLane) => {
    return SHIPPING_LANES.find((l) => l.value === lane)?.label || lane;
  };

  return (
    <div ref={ref} className="space-y-6">
      <div className="text-center">
        <h2 className="text-heading-lg text-text-primary mb-2">
          Main shipping lanes
        </h2>
        <p className="text-body-sm text-text-secondary">
          Select the regions you ship to most frequently.
        </p>
      </div>
      
      {/* Region chips */}
      <div className="flex flex-wrap justify-center gap-3">
        {SHIPPING_LANES.map((lane) => {
          const isSelected = value.includes(lane.value);
          return (
            <button
              key={lane.value}
              type="button"
              onClick={() => toggleLane(lane.value)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-full border-2 transition-all duration-200 font-medium",
                "hover:border-primary hover:shadow-md",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-text-primary"
              )}
            >
              {isSelected && <Check className="w-4 h-4" />}
              {lane.label}
            </button>
          );
        })}
      </div>

      {/* Country autocomplete sections for selected regions */}
      {value.length > 0 && (
        <div className="space-y-6 mt-8">
          {value.map((lane) => {
            // Skip USA - no country autocomplete needed
            if (lane === 'usa') {
              return (
                <div key={lane} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="font-medium text-text-primary">USA</span>
                    <span className="text-body-sm text-text-secondary">— No specific destinations needed</span>
                  </div>
                </div>
              );
            }

            if (!showAutocomplete(lane)) return null;

            const selectedCountries = destinations[lane] || [];
            const availableCountries = getAvailableCountries(lane);

            return (
              <div key={lane} className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
                <div className="font-medium text-text-primary">
                  {getLaneLabel(lane)} Destinations
                </div>
                
                {/* Autocomplete input */}
                <Popover 
                  open={openPopovers[lane] || false} 
                  onOpenChange={(open: boolean) => setOpenPopovers({ ...openPopovers, [lane]: open })}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openPopovers[lane] || false}
                      className="w-full justify-start text-text-secondary bg-background border-input hover:bg-accent hover:text-accent-foreground"
                    >
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      Type to search countries...
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-full min-w-[300px] p-0 bg-popover border-border" 
                    align="start"
                    side="bottom"
                    avoidCollisions={false}
                  >
                    <Command>
                      <CommandInput placeholder="Search countries..." />
                      <CommandList>
                        <CommandEmpty>No countries found.</CommandEmpty>
                        <CommandGroup>
                          {availableCountries.map((country) => (
                            <CommandItem
                              key={country.code}
                              value={country.name}
                              onSelect={() => addCountry(lane, country.code)}
                              className="cursor-pointer"
                            >
                              {country.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Selected countries as badges */}
                {selectedCountries.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCountries.map((code) => (
                      <Badge
                        key={code}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary border-primary/20"
                      >
                        {getCountryName(lane, code)}
                        <button
                          type="button"
                          onClick={() => removeCountry(lane, code)}
                          className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
