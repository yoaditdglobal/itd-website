"use client";
import { useState } from "react";
import { InvoiceAnalysis, ShipmentType, calculateVolumetricWeight, getChargeableWeight } from "./types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Package, Truck, Receipt, AlertCircle, ChevronDown, ChevronUp, Scale, Info } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { InvoiceSavingsPreview } from "./InvoiceSavingsPreview";
interface InvoiceAnalysisSummaryProps {
  analysis: InvoiceAnalysis;
  shipmentType: ShipmentType;
  userSelectedCourier?: string | null;
  userSelectedService?: string | null;
  onUseValues: () => void;
  onUploadDifferent: () => void;
}
export function InvoiceAnalysisSummary({
  analysis,
  shipmentType,
  userSelectedCourier,
  userSelectedService,
  onUseValues,
  onUploadDifferent
}: InvoiceAnalysisSummaryProps) {
  const [expandedLanes, setExpandedLanes] = useState<Set<number>>(new Set());
  const {
    parcel,
    pricing,
    surcharges,
    context,
    confidence,
    extractedFields,
    notes,
    lanes,
    filtering
  } = analysis;
  const formatCurrency = (value: number | null) => {
    if (value === null) return "—";
    return `£${value.toFixed(2)}`;
  };
  const formatDimension = (value: number | null, unit: string) => {
    if (value === null) return "—";
    return `${value} ${unit}`;
  };
  const formatWeight = (value: number | null) => {
    if (value === null) return "—";
    return `${value.toFixed(2)} kg`;
  };
  const confidenceColor = {
    high: "bg-primary/10 text-primary border-primary/20",
    medium: "bg-accent/10 text-accent-foreground border-accent",
    low: "bg-destructive/10 text-destructive border-destructive/20"
  };

  // Calculate total surcharges
  const totalSurcharges = [surcharges.fuel, surcharges.remoteArea, surcharges.oversize, surcharges.residential, surcharges.saturdayDelivery, surcharges.signature, surcharges.insurance, ...(surcharges.other?.map(s => s.amount) || [])].reduce((sum, val) => (sum ?? 0) + (val || 0), 0);
  const hasSurcharges = totalSurcharges ?? 0 > 0;
  const hasParcelInfo = parcel.weight || parcel.length || parcel.height || parcel.width;
  const hasPricing = pricing.basePrice !== null || pricing.totalPrice !== null;
  const hasLanes = lanes && lanes.length > 0;

  // Calculate shipment statistics
  const totalShipments = lanes?.length || 0;
  const destinationCounts = lanes?.reduce((acc, lane) => {
    const dest = lane.destination;
    acc[dest] = (acc[dest] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};
  const uniqueDestinations = Object.keys(destinationCounts).length;

  // Calculate volumetric weight if dimensions available
  const volumetricWeight = parcel.length && parcel.width && parcel.height ? calculateVolumetricWeight(parcel.length, parcel.width, parcel.height) : null;
  const chargeableWeight = parcel.weight && volumetricWeight ? getChargeableWeight(parcel.weight, volumetricWeight) : null;
  const toggleLaneExpansion = (index: number) => {
    setExpandedLanes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  return <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <Check className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Analysis Complete</h3>
        </div>
        <Badge variant="outline" className={confidenceColor[confidence]}>
          {confidence.charAt(0).toUpperCase() + confidence.slice(1)} confidence
        </Badge>
      </div>

      {/* Filtering notification */}
      {filtering && (filtering.excludedCount > 0 || filtering.unidentifiedCount && filtering.unidentifiedCount > 0) && <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-text-primary">
                {filtering.excludedCount > 0 && <>
                    <span className="font-medium">{filtering.excludedCount} {filtering.excludedType} shipment{filtering.excludedCount > 1 ? 's' : ''}</span>
                    {' '}excluded from analysis.
                  </>}
                {filtering.excludedCount > 0 && filtering.unidentifiedCount && filtering.unidentifiedCount > 0 && ' '}
                {filtering.unidentifiedCount && filtering.unidentifiedCount > 0 && <>
                    <span className="font-medium">{filtering.unidentifiedCount} unidentified</span>
                    {' '}charge{filtering.unidentifiedCount > 1 ? 's' : ''} (fees/surcharges) also excluded.
                  </>}
              </p>
              <p className="text-caption text-text-tertiary mt-0.5">
                Showing {filtering.filteredLaneCount} shipment{filtering.filteredLaneCount > 1 ? 's' : ''} relevant to your selected flow.
              </p>
            </div>
          </div>
        </div>}

      {/* Context for single-lane extraction when no filtering occurred */}
      {lanes?.length === 1 && !filtering && <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-text-primary">
                We found <span className="font-medium">1 shipment</span> to {lanes[0].destination} in your invoice.
              </p>
              <p className="text-caption text-text-tertiary mt-0.5">
                If your invoice contains additional destinations, you can try uploading again or enter details manually.
              </p>
            </div>
          </div>
        </div>}

      {/* Context info */}
      {(context.carrier || context.serviceLevel || context.origin || context.destination) && <div className="flex flex-wrap items-center gap-2 text-body-sm text-text-secondary">
          {context.carrier && <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              {context.carrier}
            </span>}
          {context.serviceLevel && <span className="bg-muted px-2 py-0.5 rounded text-xs">{context.serviceLevel}</span>}
          {context.origin && context.destination && <span>{context.origin} → {context.destination}</span>}
        </div>}

      {/* Parcel Details with Volumetric Weight */}
      {hasParcelInfo && <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="w-4 h-4 text-text-secondary" />
              Parcel Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Weight</span>
                <p className="font-medium">{formatDimension(parcel.weight, "kg")}</p>
              </div>
              <div>
                <span className="text-text-secondary">Length</span>
                <p className="font-medium">{formatDimension(parcel.length, "cm")}</p>
              </div>
              <div>
                <span className="text-text-secondary">Height</span>
                <p className="font-medium">{formatDimension(parcel.height, "cm")}</p>
              </div>
              <div>
                <span className="text-text-secondary">Width</span>
                <p className="font-medium">{formatDimension(parcel.width, "cm")}</p>
              </div>
            </div>

            {/* Volumetric Weight Comparison */}
            {volumetricWeight !== null && <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm font-medium">Weight Calculation</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Actual</span>
                    <p className="font-medium">{formatWeight(parcel.weight)}</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Volumetric</span>
                    <p className="font-medium">{formatWeight(volumetricWeight)}</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Chargeable</span>
                    <p className="font-semibold text-primary">{formatWeight(chargeableWeight)}</p>
                  </div>
                </div>
              </div>}
          </CardContent>
        </Card>}

      {/* Per-Lane Pricing Breakdown */}
      {hasLanes && <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Truck className="w-4 h-4 text-text-secondary" />
              Pricing by Destination ({totalShipments} {totalShipments !== 1 ? 'shipments' : 'shipment'} to {uniqueDestinations} {uniqueDestinations !== 1 ? 'destinations' : 'destination'})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(() => {
          const displayedDestinations = new Set<string>();
          return lanes.map((lane, index) => {
            const isFirstOccurrence = !displayedDestinations.has(lane.destination);
            if (destinationCounts[lane.destination] > 1) {
              displayedDestinations.add(lane.destination);
            }

            // Get display weight with fallback logic
            const displayWeight = lane.chargeableWeight ?? lane.actualWeight ?? lane.volumetricWeight;
            return <Collapsible key={index} open={expandedLanes.has(index)} onOpenChange={() => toggleLaneExpansion(index)}>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-3 rounded-lg transition-colors bg-[#0284c5]/[0.42]">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{lane.destination}</span>
                          {destinationCounts[lane.destination] > 1 && isFirstOccurrence && <Badge variant="outline" className="text-xs">
                              {destinationCounts[lane.destination]} shipments
                            </Badge>}
                          {displayWeight && <Badge variant="secondary" className="text-xs">
                              {displayWeight.toFixed(1)} kg
                            </Badge>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{formatCurrency(lane.pricing.totalPrice)}</span>
                          {expandedLanes.has(index) ? <ChevronUp className="w-4 h-4 text-text-secondary" /> : <ChevronDown className="w-4 h-4 text-text-secondary" />}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-3 pt-2 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Base Rate</span>
                          <span>{formatCurrency(lane.pricing.basePrice)}</span>
                        </div>
                        {lane.surcharges.fuel !== null && <div className="flex justify-between">
                            <span className="text-text-secondary pl-3">Fuel</span>
                            <span>{formatCurrency(lane.surcharges.fuel)}</span>
                          </div>}
                        {lane.surcharges.remoteArea !== null && <div className="flex justify-between">
                            <span className="text-text-secondary pl-3">Remote Area</span>
                            <span>{formatCurrency(lane.surcharges.remoteArea)}</span>
                          </div>}
                        {lane.surcharges.other?.map((s, i) => <div key={i} className="flex justify-between">
                            <span className="text-text-secondary pl-3">{s.name}</span>
                            <span>{formatCurrency(s.amount)}</span>
                          </div>)}
                        {lane.actualWeight && <div className="pt-2 mt-2 border-t border-border text-caption text-text-tertiary">
                            Actual: {lane.actualWeight}kg
                            {lane.volumetricWeight && ` | Vol: ${lane.volumetricWeight.toFixed(1)}kg`}
                            {lane.chargeableWeight && lane.chargeableWeight !== lane.actualWeight && ` | Chargeable: ${lane.chargeableWeight.toFixed(1)}kg`}
                          </div>}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>;
          });
        })()}
          </CardContent>
        </Card>}

      {/* Cost Breakdown (aggregate) */}
      {hasPricing && <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Receipt className="w-4 h-4 text-text-secondary" />
              {hasLanes ? "Total Cost Summary" : "Cost Breakdown"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {pricing.basePrice !== null && <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Base Rate</span>
                  <span className="font-medium">{formatCurrency(pricing.basePrice)}</span>
                </div>}
              
              {hasSurcharges && <>
                  <div className="border-t border-border pt-2 mt-2">
                    <p className="text-caption text-text-tertiary mb-2">Surcharges</p>
                  </div>
                  
                  {surcharges.fuel !== null && <div className="flex justify-between text-sm">
                      <span className="text-text-secondary pl-3">Fuel Surcharge</span>
                      <span>{formatCurrency(surcharges.fuel)}</span>
                    </div>}
                  {surcharges.remoteArea !== null && <div className="flex justify-between text-sm">
                      <span className="text-text-secondary pl-3">Out of Area</span>
                      <span>{formatCurrency(surcharges.remoteArea)}</span>
                    </div>}
                  {surcharges.oversize !== null && <div className="flex justify-between text-sm">
                      <span className="text-text-secondary pl-3">Oversize</span>
                      <span>{formatCurrency(surcharges.oversize)}</span>
                    </div>}
                  {surcharges.residential !== null && <div className="flex justify-between text-sm">
                      <span className="text-text-secondary pl-3">Residential</span>
                      <span>{formatCurrency(surcharges.residential)}</span>
                    </div>}
                  {surcharges.saturdayDelivery !== null && <div className="flex justify-between text-sm">
                      <span className="text-text-secondary pl-3">Saturday Delivery</span>
                      <span>{formatCurrency(surcharges.saturdayDelivery)}</span>
                    </div>}
                  {surcharges.signature !== null && <div className="flex justify-between text-sm">
                      <span className="text-text-secondary pl-3">Signature</span>
                      <span>{formatCurrency(surcharges.signature)}</span>
                    </div>}
                  {surcharges.insurance !== null && <div className="flex justify-between text-sm">
                      <span className="text-text-secondary pl-3">Insurance</span>
                      <span>{formatCurrency(surcharges.insurance)}</span>
                    </div>}
                  {surcharges.other?.map((item, index) => <div key={index} className="flex justify-between text-sm">
                      <span className="text-text-secondary pl-3">{item.name}</span>
                      <span>{formatCurrency(item.amount)}</span>
                    </div>)}
                </>}
            </div>

            {pricing.totalPrice !== null && <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg">{formatCurrency(pricing.totalPrice)}</span>
              </div>}
          </CardContent>
        </Card>}

      {/* Notes */}
      {notes && <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm">
          <AlertCircle className="w-4 h-4 text-text-secondary mt-0.5 shrink-0" />
          <p className="text-text-secondary">{notes}</p>
        </div>}

      {/* Extracted fields count */}
      <p className="text-caption text-text-tertiary text-center">
        {extractedFields} field{extractedFields !== 1 ? 's' : ''} extracted from invoice
      </p>

      {/* Savings Preview */}
      <InvoiceSavingsPreview 
        invoiceAnalysis={analysis} 
        shipmentType={shipmentType}
        userSelectedCourier={userSelectedCourier}
        userSelectedService={userSelectedService}
      />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button variant="outline" onClick={onUploadDifferent} className="flex-1">
          Upload Different Invoice
        </Button>
        <Button onClick={onUseValues} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
          <Check className="w-4 h-4 mr-2" />
          Use These Values
        </Button>
      </div>
    </div>;
}