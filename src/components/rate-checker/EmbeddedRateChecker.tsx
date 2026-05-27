"use client";
import { useState, useMemo, lazy, Suspense, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { FormData, ShipmentType, mapCarrierNameToProvider } from "./types";
import { ShipmentTypeStep } from "./ShipmentTypeStep";
import { ProgressBar } from "./ProgressBar";
import { SelectionSummary } from "./SelectionSummary";
import { useServiceLimits, useCourierServicesWithLimits } from "./useCourierServices";
import { getSessionToken } from "./useAdminAuth";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

const ShippingLanesStep = lazy(() => import("./ShippingLanesStep").then((m) => ({ default: m.ShippingLanesStep })));
const CourierStep = lazy(() => import("./CourierStep").then((m) => ({ default: m.CourierStep })));
const VolumeStep = lazy(() => import("./VolumeStep").then((m) => ({ default: m.VolumeStep })));
const LowVolumeScreen = lazy(() => import("./LowVolumeScreen").then((m) => ({ default: m.LowVolumeScreen })));
const InternationalParcelDetailsStep = lazy(() => import("./InternationalParcelDetailsStep").then((m) => ({ default: m.InternationalParcelDetailsStep })));
const SavingsSummaryStep = lazy(() => import("./SavingsSummaryStep").then((m) => ({ default: m.SavingsSummaryStep })));
const ResultsSection = lazy(() => import("./ResultsSection").then((m) => ({ default: m.ResultsSection })));
const LeadCaptureModal = lazy(() => import("./LeadCaptureModal").then((m) => ({ default: m.LeadCaptureModal })));
const PostSubmissionContent = lazy(() => import("./PostSubmissionContent"));

const MIN_WEEKLY_VOLUME = 50;

const initialFormData: FormData = {
  shipmentType: null, shippingLanes: [], selectedDestinations: {}, courier: null,
  otherCourierName: '', serviceLevel: null, courierService: null, weeklyVolume: null,
  weeklyVolume2: null, mainlandPercentage: 100, remotePercentage: 0, outOfAreaZones: [],
  fuelSurcharge: null, currentCostPerParcel: null, courier2: null, courierService2: null,
  currentCostPerParcel2: null, parcelWeight: null, parcelLength: null, parcelHeight: null,
  parcelWidth: null, parcelWeight2: null, parcelLength2: null, parcelHeight2: null,
  parcelWidth2: null, shippingInvoiceFile: null, invoiceAnalysis: null,
};

interface EmbeddedRateCheckerProps {
  initialType?: ShipmentType;
  lockType?: boolean;
  /** Restricts the step-1 tile grid to a subset of shipment types. */
  availableTypes?: ShipmentType[];
}

export function EmbeddedRateChecker({ initialType, lockType, availableTypes }: EmbeddedRateCheckerProps) {
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    shipmentType: initialType ?? null,
  });
  const [currentStep, setCurrentStep] = useState(lockType && initialType ? 2 : 1);
  const [showResults, setShowResults] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showLowVolumeScreen, setShowLowVolumeScreen] = useState(false);
  const [showPostSubmission, setShowPostSubmission] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const { toast } = useToast();
  const loggedStepsRef = useRef<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleCarrierDetected = (detectedCarrier: string) => {
    const mappedCarrier = mapCarrierNameToProvider(detectedCarrier);
    if (mappedCarrier && mappedCarrier !== formData.courier) {
      setFormData((prev) => ({ ...prev, courier: mappedCarrier, courierService: null, otherCourierName: '' }));
      toast({ title: "Carrier updated", description: `Carrier updated to match invoice: ${detectedCarrier}` });
    }
  };

  const isInternational = formData.shipmentType === 'international-export' || formData.shipmentType === 'international-import';

  useEffect(() => {
    if (loggedStepsRef.current.has(currentStep)) return;
    loggedStepsRef.current.add(currentStep);
    // Skip funnel logging when Supabase isn't configured (placeholder credentials).
    // Avoids noisy console errors in environments without analytics wired up.
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
    const stepNames = isInternational
      ? ["shipment_type", "shipping_lanes", "courier", "volume", "parcel_details", "savings_summary"]
      : ["shipment_type", "courier", "volume", "parcel_details", "savings_summary"];
    const stepName = stepNames[currentStep - 1] || `step_${currentStep}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase.from("funnel_events" as any).insert({
      session_id: sessionId, step_number: currentStep, step_name: stepName,
      shipment_type: formData.shipmentType, is_internal: !!getSessionToken(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then(({ error }: any) => {
      // Silently swallow — analytics failure should never affect the user experience.
      if (error && process.env.NODE_ENV === "development") {
        console.warn("funnel_events insert failed (non-fatal):", error.message);
      }
    });
  }, [currentStep, sessionId, formData.shipmentType, isInternational]);

  const { data: serviceLimits } = useServiceLimits('domestic', formData.courier, formData.courierService);
  const { data: servicesWithLimits } = useCourierServicesWithLimits('domestic', formData.courier);

  const selectedServiceLabel = useMemo(() => {
    if (!servicesWithLimits || !formData.courierService) return undefined;
    return servicesWithLimits.find((s) => s.value === formData.courierService)?.label;
  }, [servicesWithLimits, formData.courierService]);

  const courierLabel = useMemo(() => {
    if (!formData.courier) return undefined;
    return formData.courier.charAt(0).toUpperCase() + formData.courier.slice(1).replace(/-/g, ' ');
  }, [formData.courier]);

  // When type is locked, step 1 is skipped — adjust total steps
  const totalSteps = isInternational ? 6 : 5;
  const effectiveTotalSteps = lockType ? totalSteps - 1 : totalSteps;

  const getStepContent = () => {
    if (showLowVolumeScreen) {
      return <LowVolumeScreen weeklyVolume={formData.weeklyVolume} onBack={() => setShowLowVolumeScreen(false)} />;
    }
    if (showResults) {
      return <ResultsSection formData={formData} onGetQuote={() => setShowLeadModal(true)} />;
    }

    // When lockType, currentStep starts at 2 but we still route through the same logic
    const logicalStep = lockType ? currentStep : currentStep;

    if (!lockType && logicalStep === 1) {
      return (
        <ShipmentTypeStep
          value={formData.shipmentType}
          onChange={(type) => setFormData((prev) => ({ ...prev, shipmentType: type, shippingLanes: [], courier: null, otherCourierName: '', courier2: null, courierService2: null, currentCostPerParcel2: null, weeklyVolume2: null }))}
          onAutoAdvance={() => setCurrentStep((prev) => prev + 1)}
          availableTypes={availableTypes}
        />
      );
    }

    if (isInternational && logicalStep === 2) {
      return (
        <ShippingLanesStep
          value={formData.shippingLanes}
          destinations={formData.selectedDestinations}
          onChange={(lanes) => setFormData((prev) => ({ ...prev, shippingLanes: lanes }))}
          onDestinationsChange={(destinations) => setFormData((prev) => ({ ...prev, selectedDestinations: destinations }))}
        />
      );
    }

    const adjustedStep = isInternational ? logicalStep : logicalStep + 1;

    switch (adjustedStep) {
      case 3:
        return (
          <CourierStep
            shipmentType={formData.shipmentType!} courier={formData.courier}
            otherCourierName={formData.otherCourierName} courierService={formData.courierService}
            shippingLanes={formData.shippingLanes} courier2={formData.courier2} courierService2={formData.courierService2}
            onCourierChange={(courier) => setFormData((prev) => ({ ...prev, courier, courierService: null }))}
            onOtherCourierNameChange={(otherCourierName) => setFormData((prev) => ({ ...prev, otherCourierName }))}
            onCourierServiceChange={(courierService) => setFormData((prev) => ({ ...prev, courierService }))}
            onCourier2Change={(courier2) => setFormData((prev) => ({ ...prev, courier2, courierService2: null, currentCostPerParcel2: null, weeklyVolume2: null, parcelWeight2: null, parcelLength2: null, parcelHeight2: null, parcelWidth2: null }))}
            onCourierService2Change={(courierService2) => setFormData((prev) => ({ ...prev, courierService2 }))}
          />
        );
      case 4:
        return (
          <VolumeStep
            value={formData.weeklyVolume} onChange={(weeklyVolume) => setFormData((prev) => ({ ...prev, weeklyVolume }))}
            value2={formData.weeklyVolume2} onChange2={(weeklyVolume2) => setFormData((prev) => ({ ...prev, weeklyVolume2 }))}
            courier={formData.courier} courier2={formData.courier2} shipmentType={formData.shipmentType!} onNext={handleNext}
          />
        );
      case 5:
        return (
          <InternationalParcelDetailsStep
            shipmentType={formData.shipmentType!} weight={formData.parcelWeight} length={formData.parcelLength}
            height={formData.parcelHeight} width={formData.parcelWidth} currentCost={formData.currentCostPerParcel}
            invoiceFile={formData.shippingInvoiceFile} invoiceAnalysis={formData.invoiceAnalysis}
            parcelLimits={formData.shipmentType === 'domestic' ? serviceLimits : null}
            courierLabel={courierLabel} serviceLabel={selectedServiceLabel}
            courier={formData.courier} courierService={formData.courierService}
            courier2={formData.courier2} courierService2={formData.courierService2}
            currentCost2={formData.currentCostPerParcel2}
            weight2={formData.parcelWeight2} length2={formData.parcelLength2}
            height2={formData.parcelHeight2} width2={formData.parcelWidth2}
            onWeightChange={(v) => setFormData((prev) => ({ ...prev, parcelWeight: v }))}
            onLengthChange={(v) => setFormData((prev) => ({ ...prev, parcelLength: v }))}
            onHeightChange={(v) => setFormData((prev) => ({ ...prev, parcelHeight: v }))}
            onWidthChange={(v) => setFormData((prev) => ({ ...prev, parcelWidth: v }))}
            onCurrentCostChange={(v) => setFormData((prev) => ({ ...prev, currentCostPerParcel: v }))}
            onCurrentCost2Change={(v) => setFormData((prev) => ({ ...prev, currentCostPerParcel2: v }))}
            onWeight2Change={(v) => setFormData((prev) => ({ ...prev, parcelWeight2: v }))}
            onLength2Change={(v) => setFormData((prev) => ({ ...prev, parcelLength2: v }))}
            onHeight2Change={(v) => setFormData((prev) => ({ ...prev, parcelHeight2: v }))}
            onWidth2Change={(v) => setFormData((prev) => ({ ...prev, parcelWidth2: v }))}
            onInvoiceUpload={(f) => setFormData((prev) => ({ ...prev, shippingInvoiceFile: f }))}
            onAnalysisComplete={(analysis) => setFormData((prev) => ({ ...prev, invoiceAnalysis: analysis }))}
            onCarrierDetected={handleCarrierDetected} onContinue={handleNext} onBack={handleBack}
          />
        );
      case 6:
        if (formData.invoiceAnalysis) {
          return (
            <SavingsSummaryStep
              invoiceAnalysis={formData.invoiceAnalysis} weeklyVolume={formData.weeklyVolume}
              shipmentType={formData.shipmentType!} courier={formData.courier}
              courierService={formData.courierService} sessionId={sessionId}
              onGetQuote={() => setShowLeadModal(true)}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  const adjustedStepForNav = isInternational ? currentStep : currentStep + 1;
  const isOnSavingsSummary = adjustedStepForNav === 6 && formData.invoiceAnalysis !== null;
  const isParcelDetailsStep = adjustedStepForNav === 5;

  const canProceed = useMemo(() => {
    if (!lockType && currentStep === 1) return formData.shipmentType !== null;
    if (isInternational && currentStep === 2) {
      if (formData.shippingLanes.length === 0) return false;
      for (const lane of formData.shippingLanes) {
        if (lane === 'usa') continue;
        if ((formData.selectedDestinations[lane] || []).length === 0) return false;
      }
      return true;
    }
    const adjustedStep = isInternational ? currentStep : currentStep + 1;
    switch (adjustedStep) {
      case 3:
        if (!formData.courier) return false;
        if (isInternational) return true;
        if (!formData.courierService) return false;
        if (formData.courier2 && !formData.courierService2) return false;
        return true;
      case 4:
        if (formData.courier2) return !!formData.weeklyVolume && formData.weeklyVolume > 0 && !!formData.weeklyVolume2 && formData.weeklyVolume2 > 0;
        return !!formData.weeklyVolume && formData.weeklyVolume > 0;
      case 5:
        if (formData.shippingInvoiceFile) return true;
        const hasWeight = formData.parcelWeight !== null && formData.parcelWeight > 0;
        const hasWeight2 = !formData.courier2 || (formData.parcelWeight2 !== null && formData.parcelWeight2 > 0);
        return hasWeight && hasWeight2;
      case 6:
        return formData.invoiceAnalysis !== null;
      default:
        return false;
    }
  }, [currentStep, formData, isInternational, lockType]);

  const handleNext = () => {
    const adjustedStep = isInternational ? currentStep : currentStep + 1;
    if (adjustedStep === 4 && formData.shipmentType === 'domestic') {
      const totalVolume = (formData.weeklyVolume || 0) + (formData.weeklyVolume2 || 0);
      if (totalVolume > 0 && totalVolume < MIN_WEEKLY_VOLUME) { setShowLowVolumeScreen(true); return; }
    }
    if (adjustedStep === 5 && !formData.invoiceAnalysis) { setShowResults(true); return; }
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
    else setShowResults(true);
  };

  const handleBack = () => {
    if (showLowVolumeScreen) { setShowLowVolumeScreen(false); }
    else if (showResults) { setShowResults(false); }
    else if (currentStep > (lockType ? 2 : 1)) { setCurrentStep((prev) => prev - 1); }
  };

  const handleReset = () => {
    setFormData({ ...initialFormData, shipmentType: initialType ?? null });
    setCurrentStep(lockType && initialType ? 2 : 1);
    setShowResults(false); setShowLowVolumeScreen(false); setShowPostSubmission(false);
  };

  // Display step number adjusted for locked type (skip step 1 in progress bar)
  const displayStep = lockType ? currentStep - 1 : currentStep;
  const displayTotal = lockType ? totalSteps - 1 : totalSteps;

  return (
    <div ref={sectionRef} className="w-full">
      {showPostSubmission ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-10">
          <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
            <PostSubmissionContent onStartOver={handleReset} leadType="rate_checker" />
          </Suspense>
        </div>
      ) : (
        <>
          {!showResults && !showLowVolumeScreen && (
            <div className="mb-4 md:mb-8">
              <ProgressBar currentStep={displayStep} totalSteps={displayTotal} />
              <SelectionSummary formData={formData} currentStep={currentStep} />
            </div>
          )}

          <div className={cn(
            "bg-white rounded-2xl border border-gray-200 shadow-lg",
            isParcelDetailsStep ? "p-0 overflow-hidden" : showResults ? "p-6 md:p-8 lg:p-12" : "p-4 md:p-6 lg:p-10"
          )}>
            <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
              {getStepContent()}
            </Suspense>

            {!showResults && !showLowVolumeScreen && !isOnSavingsSummary && !isParcelDetailsStep && currentStep !== (lockType ? 2 : 1) && (
              <div className="flex justify-between items-center mt-6 md:mt-10 pt-4 md:pt-6 border-t border-gray-100">
                <button onClick={handleBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleNext} disabled={!canProceed}
                  className={cn("flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                    canProceed ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed")}
                >
                  {currentStep === totalSteps ? 'See my results' : 'Continue'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {isOnSavingsSummary && (
              <div className="flex justify-center items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <button onClick={handleBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Adjust my inputs
                </button>
                <button onClick={handleReset} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
                  <RotateCcw className="w-4 h-4" /> Start Over
                </button>
              </div>
            )}
          </div>

          {/* First step nav */}
          {!showResults && !showLowVolumeScreen && !isOnSavingsSummary && (currentStep === (lockType ? 2 : 1)) && !lockType && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext} disabled={!canProceed}
                className={cn("flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                  canProceed ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed")}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Continue button for locked first step (courier step) */}
          {lockType && currentStep === 2 && !showResults && !showLowVolumeScreen && !isOnSavingsSummary && !isParcelDetailsStep && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext} disabled={!canProceed}
                className={cn("flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                  canProceed ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed")}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {currentStep > (lockType ? 2 : 1) && !showResults && !showLowVolumeScreen && !isOnSavingsSummary && (
            <div className="mt-4 text-center">
              <button onClick={handleReset} className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors mx-auto">
                <RotateCcw className="w-3 h-3" /> Start Over
              </button>
            </div>
          )}

          {showResults && (
            <div className="mt-6 text-center">
              <button onClick={handleBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mx-auto">
                <ArrowLeft className="w-4 h-4" /> Adjust my inputs
              </button>
            </div>
          )}
        </>
      )}

      <Suspense fallback={null}>
        <LeadCaptureModal
          open={showLeadModal}
          onOpenChange={setShowLeadModal}
          rateCheckerData={formData}
          onSubmitted={() => {
            setShowPostSubmission(true);
            supabase.functions.invoke('mark-view-converted', { body: { session_id: sessionId } })
              .then(({ error }) => { if (error) console.error('Failed to mark view as converted:', error); });
          }}
        />
      </Suspense>
    </div>
  );
}
