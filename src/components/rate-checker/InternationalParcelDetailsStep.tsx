"use client";
import { useRef, useState, useMemo, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Upload, FileText, X, Package, Loader2, AlertCircle, PoundSterling, AlertTriangle, Scale, Check, Info, ArrowLeft } from "lucide-react";
import { InvoiceAnalysis, ShipmentType, CourierProvider, calculateVolumetricWeight, getCourierDisplayLabel } from "./types";
import { InvoiceAnalysisSummary } from "./InvoiceAnalysisSummary";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { ParcelLimits, validateParcelLimits } from "@/components/rate-checker/useCourierServices";

// Import carrier logos for dual cost display

const CARRIER_LOGOS: Record<string, string> = {
  'amazon-shipping': '/logos/rate-checker/carriers/amazon-shipping.png',
  'royal-mail': '/logos/rate-checker/carriers/royal-mail.png',
  'apc-domestic': '/logos/rate-checker/carriers/apc-domestic.png',
  'dhl-parcel': '/logos/rate-checker/carriers/dhl-parcel.png',
  'dx': '/logos/rate-checker/carriers/dx.png',
  'fedex-domestic': '/logos/rate-checker/carriers/fedex.png',
  'parcel-force-domestic': '/logos/rate-checker/carriers/parcel-force-domestic.png',
  'evri-eu': '/logos/rate-checker/carriers/evri-eu.png',
  'royal-mail-international': '/logos/rate-checker/carriers/royal-mail.png',
  'parcel-force': '/logos/rate-checker/carriers/parcel-force.png',
  'spring-global': '/logos/rate-checker/carriers/spring-global.png',
};;
interface FlowMismatchError {
  message: string;
  suggestion: string;
}

interface AnalysisErrorDetails {
  errorCode?: string;
  message: string;
  details?: string;
  suggestion?: string;
  canRetry?: boolean;
}
interface InternationalParcelDetailsStepProps {
  shipmentType: ShipmentType;
  weight: number | null;
  length: number | null;
  height: number | null;
  width: number | null;
  currentCost: number | null;
  invoiceFile: File | null;
  invoiceAnalysis: InvoiceAnalysis | null;
  parcelLimits?: ParcelLimits | null;
  courierLabel?: string;
  serviceLabel?: string;
  courier?: string | null;
  courierService?: string | null;
  // Second carrier props
  courier2?: CourierProvider | null;
  courierService2?: string | null;
  currentCost2?: number | null;
  // Second carrier parcel dimensions
  weight2?: number | null;
  length2?: number | null;
  height2?: number | null;
  width2?: number | null;
  onWeightChange: (value: number | null) => void;
  onLengthChange: (value: number | null) => void;
  onHeightChange: (value: number | null) => void;
  onWidthChange: (value: number | null) => void;
  onCurrentCostChange: (value: number | null) => void;
  onCurrentCost2Change?: (value: number | null) => void;
  onWeight2Change?: (value: number | null) => void;
  onLength2Change?: (value: number | null) => void;
  onHeight2Change?: (value: number | null) => void;
  onWidth2Change?: (value: number | null) => void;
  onInvoiceUpload: (file: File | null) => void;
  onAnalysisComplete: (analysis: InvoiceAnalysis | null) => void;
  onCarrierDetected?: (carrier: string) => void;
  onContinue?: () => void;
  onBack?: () => void;
}
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix to get just the base64 string
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}

// Extracted to module scope to prevent remounting on parent re-render
const DimensionInput = ({ 
  id, label, unit, value: inputVal, onChange: onInputChange, tabIdx, required 
}: { 
  id: string; label: string; unit: string; value: number | null; onChange: (v: number | null) => void; tabIdx: number; required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const [localStr, setLocalStr] = useState<string>(inputVal != null ? String(inputVal) : '');
  const filled = inputVal !== null && inputVal > 0;

  // Sync from parent when value changes externally (e.g. invoice autofill)
  useEffect(() => {
    if (!focused) {
      setLocalStr(inputVal != null ? String(inputVal) : '');
    }
  }, [inputVal, focused]);

  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[hsl(215,16%,65%)] mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          tabIndex={tabIdx}
          placeholder="—"
          value={localStr}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            const cleaned = localStr.replace(/\.$/, '');
            setLocalStr(cleaned);
            if (cleaned === '') { onInputChange(null); return; }
            const num = parseFloat(cleaned);
            if (!isNaN(num)) onInputChange(num);
          }}
          onChange={(e) => {
            const v = e.target.value;
            if (v !== '' && !/^\d*\.?\d*$/.test(v)) return;
            setLocalStr(v);
            if (v === '') { onInputChange(null); return; }
            const num = parseFloat(v);
            if (!isNaN(num)) onInputChange(num);
          }}
          className={`
            w-full h-16 rounded-[10px] px-4 pr-14 text-[24px] font-bold text-[hsl(222,47%,8%)]
            placeholder:text-[hsl(215,20%,80%)] placeholder:font-normal
            transition-all duration-[180ms] ease-out outline-none
            ${focused 
              ? 'bg-white border-2 border-[hsl(181,47%,51%)] shadow-[0_0_0_4px_rgba(58,158,165,0.10)]' 
              : filled 
                ? 'bg-[hsl(210,40%,98%)] border border-[hsl(181,47%,51%)]' 
                : 'bg-[hsl(210,40%,98%)] border border-[hsl(214,32%,91%)]'
            }
          `}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {filled && (
            <Check className="w-4 h-4 text-[hsl(181,47%,51%)] animate-[fadeIn_200ms_ease-out]" />
          )}
          <span className="text-[13px] font-medium text-[hsl(215,16%,65%)]">{unit}</span>
        </div>
      </div>
    </div>
  );
};
export function InternationalParcelDetailsStep({
  shipmentType,
  weight,
  length,
  height,
  width,
  currentCost,
  invoiceFile,
  invoiceAnalysis,
  parcelLimits,
  courierLabel,
  serviceLabel,
  courier,
  courierService,
  courier2,
  courierService2,
  currentCost2,
  weight2,
  length2,
  height2,
  width2,
  onWeightChange,
  onLengthChange,
  onHeightChange,
  onWidthChange,
  onCurrentCostChange,
  onCurrentCost2Change,
  onWeight2Change,
  onLength2Change,
  onHeight2Change,
  onWidth2Change,
  onInvoiceUpload,
  onAnalysisComplete,
  onCarrierDetected,
  onContinue,
  onBack
}: InternationalParcelDetailsStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<AnalysisErrorDetails | null>(null);
  const [flowMismatchError, setFlowMismatchError] = useState<FlowMismatchError | null>(null);
  const [costInputValue, setCostInputValue] = useState<string>(currentCost?.toString() ?? '');
  const [costError, setCostError] = useState<string | null>(null);
  const [cost2InputValue, setCost2InputValue] = useState<string>(currentCost2?.toString() ?? '');
  const [cost2Error, setCost2Error] = useState<string | null>(null);
  const {
    toast
  } = useToast();

  // Validate parcel against service limits
  const parcelValidation = useMemo(() => {
    return validateParcelLimits(parcelLimits || null, weight, length, width, height, courierLabel, serviceLabel);
  }, [parcelLimits, weight, length, width, height, courierLabel, serviceLabel]);

  // Calculate volumetric weight for international flows
  const volumetricWeight = useMemo(() => {
    // Only show for international flows
    if (shipmentType === 'domestic' || shipmentType === null) return null;
    // Need all three dimensions
    if (!length || !width || !height || length <= 0 || width <= 0 || height <= 0) return null;
    return calculateVolumetricWeight(length, width, height);
  }, [length, width, height, shipmentType]);

  // Calculate volumetric weight for carrier 2 (international only)
  const volumetricWeight2 = useMemo(() => {
    if (shipmentType === 'domestic' || shipmentType === null) return null;
    if (!length2 || !width2 || !height2 || length2 <= 0 || width2 <= 0 || height2 <= 0) return null;
    return calculateVolumetricWeight(length2, width2, height2);
  }, [length2, width2, height2, shipmentType]);
  const analyzeInvoice = async (file: File, isRetry = false) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setFlowMismatchError(null);
    try {
      const base64 = await fileToBase64(file);
      const {
        data,
        error
      } = await supabase.functions.invoke("analyze-invoice", {
        body: {
          pdfBase64: base64,
          shipmentType: shipmentType
        }
      });

      // Check for flow mismatch in error response (400 status puts response in error)
      if (error) {
        console.error("Invoice analysis error:", error);

        // Try to parse error body for flowMismatch or specific error codes
        let parsedError: any = null;
        try {
          const errorBody = (error as any).context?.body || error.message;
          parsedError = typeof errorBody === 'string' ? JSON.parse(errorBody) : errorBody;
        } catch {}
        
        if (parsedError?.flowMismatch) {
          setFlowMismatchError({
            message: parsedError.details,
            suggestion: parsedError.suggestion
          });
          return;
        }
        
        // Handle specific error codes from the edge function
        if (parsedError?.errorCode) {
          setAnalysisError({
            errorCode: parsedError.errorCode,
            message: parsedError.error || "Analysis failed",
            details: parsedError.details,
            suggestion: parsedError.suggestion,
            canRetry: parsedError.canRetry ?? false
          });
          return;
        }
        
        // Generic error fallback
        setAnalysisError({
          message: parsedError?.error || error.message || "Failed to analyze invoice",
          suggestion: "Please try again or enter details manually.",
          canRetry: true
        });
        return;
      }

      // Handle flow mismatch in successful response (just in case)
      if (data?.flowMismatch) {
        setFlowMismatchError({
          message: data.details,
          suggestion: data.suggestion
        });
        return;
      }
      if (data?.error) {
        setAnalysisError({
          message: data.error,
          details: data.details,
          suggestion: data.suggestion || "Please try again or enter details manually.",
          canRetry: data.canRetry ?? true
        });
        return;
      }

      // Ensure lanes array exists
      const analysisData: InvoiceAnalysis = {
        ...data,
        lanes: data.lanes || [],
        filtering: data.filtering || undefined
      };
      onAnalysisComplete(analysisData);

      // Notify parent about detected carrier for reconciliation
      if (analysisData.context?.carrier && onCarrierDetected) {
        onCarrierDetected(analysisData.context.carrier);
      }

      // Toast notifications removed - no longer needed
    } catch (err) {
      console.error("Analysis failed:", err);
      setAnalysisError({
        message: "Unable to analyze invoice",
        suggestion: "Please try again or enter details manually.",
        canRetry: true
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleRetryAnalysis = async () => {
    if (invoiceFile) {
      await analyzeInvoice(invoiceFile, true);
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF file."
      });
      return;
    }
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Maximum file size is 10MB."
      });
      return;
    }
    onInvoiceUpload(file);
    await analyzeInvoice(file);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF file."
      });
      return;
    }
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Maximum file size is 10MB."
      });
      return;
    }
    onInvoiceUpload(file);
    await analyzeInvoice(file);
  };
  const handleNumberInput = (value: string, setter: (value: number | null) => void) => {
    if (value === "") {
      setter(null);
      return;
    }
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0) {
      setter(num);
    }
  };
  const validateCostInput = (rawValue: string) => {
    setCostInputValue(rawValue);
    if (rawValue.trim() === '') {
      setCostError(null);
      onCurrentCostChange(null);
      return;
    }

    // Valid: "0", "5", "123", "5.5", "5.50", "0.99"
    // Invalid: "0405", "-5", "abc", ".5", "5.", "5.555"
    const isValidCost = /^(?:0|[1-9]\d*)(?:\.\d{0,2})?$/.test(rawValue.trim());
    if (!isValidCost) {
      setCostError('Please enter a valid number');
      onCurrentCostChange(null);
      return;
    }
    setCostError(null);
    onCurrentCostChange(parseFloat(rawValue.trim()));
  };
  const validateCost2Input = (rawValue: string) => {
    setCost2InputValue(rawValue);
    if (rawValue.trim() === '') {
      setCost2Error(null);
      onCurrentCost2Change?.(null);
      return;
    }
    const isValidCost = /^(?:0|[1-9]\d*)(?:\.\d{0,2})?$/.test(rawValue.trim());
    if (!isValidCost) {
      setCost2Error('Please enter a valid number');
      onCurrentCost2Change?.(null);
      return;
    }
    setCost2Error(null);
    onCurrentCost2Change?.(parseFloat(rawValue.trim()));
  };
  const handleUseAnalyzedValues = () => {
    if (invoiceAnalysis) {
      // Populate form fields from analysis
      if (invoiceAnalysis.parcel.weight !== null) {
        onWeightChange(invoiceAnalysis.parcel.weight);
      }
      if (invoiceAnalysis.parcel.length !== null) {
        onLengthChange(invoiceAnalysis.parcel.length);
      }
      if (invoiceAnalysis.parcel.height !== null) {
        onHeightChange(invoiceAnalysis.parcel.height);
      }
      if (invoiceAnalysis.parcel.width !== null) {
        onWidthChange(invoiceAnalysis.parcel.width);
      }

      // Advance to next step (same as clicking Continue)
      onContinue?.();
    }
  };
  const handleUploadDifferent = () => {
    onInvoiceUpload(null);
    onAnalysisComplete(null);
    setAnalysisError(null);
    setFlowMismatchError(null);
    fileInputRef.current?.click();
  };
  const handleTryDifferentInvoice = () => {
    onInvoiceUpload(null);
    setFlowMismatchError(null);
    fileInputRef.current?.click();
  };

  // Show flow mismatch error
  if (flowMismatchError && invoiceFile) {
    return <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-display-md text-text-primary">
            Parcel Details
          </h2>
          <p className="text-text-secondary">
            Help us understand your typical shipment to estimate savings
          </p>
        </div>

        <div className="p-5 rounded-lg border border-warning/30 bg-warning/5 space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-text-primary">
                Wrong flow for this invoice
              </p>
              <p className="text-body-sm text-text-secondary mt-1">
                {flowMismatchError.message}
              </p>
              <p className="text-body-sm text-warning mt-2">
                {flowMismatchError.suggestion}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={handleTryDifferentInvoice}>
              <Upload className="w-4 h-4 mr-2" />
              Try a Different Invoice
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {
            onInvoiceUpload(null);
            setFlowMismatchError(null);
          }}>
              Enter Details Manually
            </Button>
          </div>
        </div>
      </div>;
  }

  // Show analysis summary if we have results
  if (invoiceAnalysis && invoiceFile) {
    return <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-display-md text-text-primary">
            Invoice Analysis
          </h2>
          <p className="text-text-secondary">
            Review the extracted data from your shipping invoice
          </p>
        </div>

        <InvoiceAnalysisSummary 
          analysis={invoiceAnalysis} 
          shipmentType={shipmentType} 
          userSelectedCourier={courier}
          userSelectedService={courierService}
          onUseValues={handleUseAnalyzedValues} 
          onUploadDifferent={handleUploadDifferent} 
        />
      </div>;
  }
  const hasWeight = weight !== null && weight > 0;
  const canContinue = hasWeight && (!courier2 || ((weight2 ?? null) !== null && (weight2 ?? 0) > 0));




  return <div>
    {/* DARK HEADER BAND */}
    <div className="bg-[hsl(222,47%,8%)] px-5 md:px-10 pt-7 pb-6">
      <h2 className="text-display-md text-white">
        Your typical parcel
      </h2>
      <p className="text-[14px] font-normal text-[hsl(215,16%,47%)] mt-1.5">
        We use this to build your personalised rate estimate.
      </p>
    </div>

    {/* DIMENSIONS SECTION */}
    <div className="px-5 md:px-10 pt-8">
      <div className="flex items-center gap-3 mb-1.5">
        <div className="w-0.5 h-3.5 bg-[hsl(181,47%,51%)] rounded-full" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[hsl(181,47%,51%)]">
          Parcel Dimensions
        </span>
      </div>
      <p className="text-[11px] text-[hsl(215,16%,65%)] mb-5 ml-[14px]">
        Fields marked <span className="text-red-500">*</span> are required
      </p>

      {courier2 ? (
        // DUAL CARRIER LAYOUT
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Carrier 1 */}
          <div className="p-4 rounded-xl border border-[hsl(214,32%,91%)] bg-[hsl(210,40%,98%)] space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[hsl(214,32%,91%)]">
              {courier && CARRIER_LOGOS[courier] ? (
                <img src={CARRIER_LOGOS[courier]} alt="" className="w-5 h-5 rounded object-contain" />
              ) : (
                <Package className="w-4 h-4 text-[hsl(215,16%,65%)]" />
              )}
              <span className="text-sm font-medium text-[hsl(222,47%,8%)]">{getCourierDisplayLabel(courier ?? null)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <DimensionInput id="w1" label="Weight" unit="kg" value={weight} onChange={onWeightChange} tabIdx={1} required />
              <DimensionInput id="l1" label="Length" unit="cm" value={length} onChange={onLengthChange} tabIdx={2} />
              <DimensionInput id="wi1" label="Width" unit="cm" value={width} onChange={onWidthChange} tabIdx={3} />
              <DimensionInput id="h1" label="Height" unit="cm" value={height} onChange={onHeightChange} tabIdx={4} />
            </div>
          </div>
          {/* Carrier 2 */}
          <div className="p-4 rounded-xl border border-[hsl(214,32%,91%)] bg-[hsl(210,40%,98%)] space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[hsl(214,32%,91%)]">
              {courier2 && CARRIER_LOGOS[courier2] ? (
                <img src={CARRIER_LOGOS[courier2]} alt="" className="w-5 h-5 rounded object-contain" />
              ) : (
                <Package className="w-4 h-4 text-[hsl(215,16%,65%)]" />
              )}
              <span className="text-sm font-medium text-[hsl(222,47%,8%)]">{getCourierDisplayLabel(courier2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <DimensionInput id="w2" label="Weight" unit="kg" value={weight2 ?? null} onChange={onWeight2Change || (() => {})} tabIdx={1} required />
              <DimensionInput id="l2" label="Length" unit="cm" value={length2 ?? null} onChange={onLength2Change || (() => {})} tabIdx={2} />
              <DimensionInput id="wi2" label="Width" unit="cm" value={width2 ?? null} onChange={onWidth2Change || (() => {})} tabIdx={3} />
              <DimensionInput id="h2" label="Height" unit="cm" value={height2 ?? null} onChange={onHeight2Change || (() => {})} tabIdx={4} />
            </div>
          </div>
        </div>
      ) : (
        // SINGLE CARRIER LAYOUT
        <div className="grid grid-cols-2 gap-3">
          <DimensionInput id="weight" label="Weight" unit="kg" value={weight} onChange={onWeightChange} tabIdx={1} required />
          <DimensionInput id="length" label="Length" unit="cm" value={length} onChange={onLengthChange} tabIdx={2} />
          <DimensionInput id="width" label="Width" unit="cm" value={width} onChange={onWidthChange} tabIdx={3} />
          <DimensionInput id="height" label="Height" unit="cm" value={height} onChange={onHeightChange} tabIdx={4} />
        </div>
      )}

      {/* Static volumetric weight helper */}
      <div className="flex items-start gap-2 mt-3">
        <Info className="w-3.5 h-3.5 text-[hsl(215,16%,65%)] mt-0.5 shrink-0" />
        <p className="text-[12px] text-[hsl(215,16%,65%)]">
          Carriers price on whichever is greater — actual weight or volumetric weight (L×W×H÷5000).
        </p>
      </div>

      {/* Parcel Limit Warnings */}
      {parcelValidation.warnings.length > 0 && (
        <div className="p-4 rounded-lg border border-warning/30 bg-warning/5 space-y-2 mt-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-label text-text-primary">Parcel exceeds service limits</p>
              {parcelValidation.warnings.map((warning, idx) => <p key={idx} className="text-body-sm text-text-secondary">• {warning}</p>)}
            </div>
          </div>
        </div>
      )}
    </div>

    {/* COST SECTION */}
    <div className="px-5 md:px-10 pt-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-0.5 h-3.5 bg-[hsl(181,47%,51%)] rounded-full" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[hsl(181,47%,51%)]">
          Current Cost Per Parcel
        </span>
      </div>

      {courier2 ? (
        // DUAL CARRIER COST
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[hsl(215,16%,65%)] mb-1.5">
              {getCourierDisplayLabel(courier ?? null)}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] font-bold text-[hsl(181,47%,51%)]">£</span>
              <input
                type="text"
                inputMode="decimal"
                tabIndex={5}
                placeholder="—"
                value={costInputValue}
                onChange={e => validateCostInput(e.target.value)}
                className={`
                  w-full h-16 rounded-[10px] pl-10 pr-4 text-[24px] font-bold text-[hsl(222,47%,8%)]
                  placeholder:text-[hsl(215,20%,80%)] placeholder:font-normal placeholder:text-base
                  bg-[hsl(210,40%,98%)] border transition-all duration-[180ms] ease-out outline-none
                  ${costError 
                    ? 'border-destructive focus:border-destructive focus:shadow-[0_0_0_4px_rgba(239,68,68,0.10)]' 
                    : costInputValue 
                      ? 'border-[hsl(181,47%,51%)]' 
                      : 'border-[hsl(214,32%,91%)]'
                  }
                  focus:bg-white focus:border-2 focus:border-[hsl(181,47%,51%)] focus:shadow-[0_0_0_4px_rgba(58,158,165,0.10)]
                `}
              />
            </div>
            {costError && <p className="text-xs text-destructive mt-1">{costError}</p>}
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[hsl(215,16%,65%)] mb-1.5">
              {getCourierDisplayLabel(courier2)}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] font-bold text-[hsl(181,47%,51%)]">£</span>
              <input
                type="text"
                inputMode="decimal"
                tabIndex={6}
                placeholder="—"
                value={cost2InputValue}
                onChange={e => validateCost2Input(e.target.value)}
                className={`
                  w-full h-16 rounded-[10px] pl-10 pr-4 text-[24px] font-bold text-[hsl(222,47%,8%)]
                  placeholder:text-[hsl(215,20%,80%)] placeholder:font-normal placeholder:text-base
                  bg-[hsl(210,40%,98%)] border transition-all duration-[180ms] ease-out outline-none
                  ${cost2Error 
                    ? 'border-destructive focus:border-destructive focus:shadow-[0_0_0_4px_rgba(239,68,68,0.10)]' 
                    : cost2InputValue 
                      ? 'border-[hsl(181,47%,51%)]' 
                      : 'border-[hsl(214,32%,91%)]'
                  }
                  focus:bg-white focus:border-2 focus:border-[hsl(181,47%,51%)] focus:shadow-[0_0_0_4px_rgba(58,158,165,0.10)]
                `}
              />
            </div>
            {cost2Error && <p className="text-xs text-destructive mt-1">{cost2Error}</p>}
          </div>
        </div>
      ) : (
        // SINGLE CARRIER COST
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] font-bold text-[hsl(181,47%,51%)]">£</span>
            <input
              type="text"
              inputMode="decimal"
              tabIndex={5}
              placeholder="—"
              value={costInputValue}
              onChange={e => validateCostInput(e.target.value)}
              className={`
                w-full h-16 rounded-[10px] pl-10 pr-4 text-[24px] font-bold text-[hsl(222,47%,8%)]
                placeholder:text-[hsl(215,20%,80%)] placeholder:font-normal placeholder:text-base
                bg-[hsl(210,40%,98%)] border transition-all duration-[180ms] ease-out outline-none
                ${costError 
                  ? 'border-destructive focus:border-destructive focus:shadow-[0_0_0_4px_rgba(239,68,68,0.10)]' 
                  : costInputValue 
                    ? 'border-[hsl(181,47%,51%)]' 
                    : 'border-[hsl(214,32%,91%)]'
                }
                focus:bg-white focus:border-2 focus:border-[hsl(181,47%,51%)] focus:shadow-[0_0_0_4px_rgba(58,158,165,0.10)]
              `}
            />
          </div>
          {costError && <p className="text-xs text-destructive mt-1">{costError}</p>}
          <p className="text-[12px] text-[hsl(215,16%,65%)] mt-1.5">
            Not sure of the exact figure? A rough estimate works fine.
          </p>
        </div>
      )}
    </div>

    {/* NAVIGATION ROW */}
    <div className="px-5 md:px-10 pt-7 pb-3 flex items-center justify-between gap-4">
      {onBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[14px] font-medium text-[hsl(215,16%,65%)] hover:text-[hsl(215,16%,47%)] hover:underline transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
      ) : <div />}
      
      <div className="flex flex-col items-center sm:items-end">
        <button
          tabIndex={6}
          disabled={!canContinue}
          onClick={() => canContinue && onContinue?.()}
          className={`
            h-[52px] w-full sm:w-auto sm:min-w-[200px] rounded-[10px] text-[15px] font-semibold
            transition-all duration-300 ease-out
            ${canContinue 
              ? 'bg-[hsl(181,47%,51%)] text-white cursor-pointer hover:bg-[hsl(181,47%,46%)] hover:-translate-y-px active:translate-y-0 active:bg-[hsl(181,47%,42%)]' 
              : 'bg-[hsl(214,32%,91%)] text-[hsl(215,14%,66%)] cursor-not-allowed'
            }
          `}
        >
          Continue
        </button>
        {!canContinue && (
          <p className="text-[11px] text-red-400 mt-1.5">
            {"\n"}
          </p>
        )}
      </div>
    </div>

    {/* FOOTER AREA */}
    <div className="px-5 md:px-10 pb-7 text-center space-y-2">
      <p className="text-[13px] text-[hsl(215,16%,65%)]">
        Have a shipping invoice?{' '}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-[hsl(181,47%,51%)] hover:underline font-medium"
        >
          Upload it instead.
        </button>
      </p>
      <p className="text-[12px] text-[hsl(215,16%,65%)]">
        Your data is used solely to generate your rate estimate and is never shared.
      </p>

      {/* Hidden file input for invoice upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.csv,.xlsx,.xls"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onInvoiceUpload(file);
            analyzeInvoice(file);
          }
          e.target.value = '';
        }}
      />
    </div>

    {/* Analysis overlay */}
    {isAnalyzing && (
      <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-2xl z-10">
        <Loader2 className="w-10 h-10 text-[hsl(181,47%,51%)] animate-spin mb-4" />
        <p className="text-text-primary font-medium">Analyzing your invoice...</p>
        <p className="text-body-sm text-text-secondary mt-1">
          Extracting parcel details and cost breakdown
        </p>
      </div>
    )}
  </div>;
}