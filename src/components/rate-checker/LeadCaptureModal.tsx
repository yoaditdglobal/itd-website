"use client";
import { useState } from "react";
import { LeadFormData, FormData } from "./types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Building2, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Zod schema for client-side validation
const leadFormSchema = z.object({
  fullName: z.string().trim().max(100, "Name is too long").optional().or(z.literal("")),
  companyName: z.string().trim().max(150, "Company name is too long").optional().or(z.literal("")),
  collectionPostcode: z.string().trim().max(10, "Postcode is too long").optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
  phone: z.string().trim().max(30, "Phone number is too long").optional().or(z.literal("")),
});

// Helper to convert File to base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rateCheckerData: FormData;
  onSubmitted?: () => void;
}

export function LeadCaptureModal({ open, onOpenChange, rateCheckerData, onSubmitted }: LeadCaptureModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    companyName: '',
    collectionPostcode: '',
    email: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Validate inputs client-side
      const validationResult = leadFormSchema.safeParse(formData);
      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        toast({
          title: "Invalid input",
          description: firstError.message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // 2. Create/reuse a lead for today via backend function (handles daily unique constraint safely)
      const { data: leadData, error: leadFnError } = await supabase.functions.invoke('create-lead', {
        body: {
          full_name: formData.fullName.trim(),
          company_name: formData.companyName.trim(),
          postcode: formData.collectionPostcode.trim().toUpperCase(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          monthly_volume: rateCheckerData.weeklyVolume ? `${rateCheckerData.weeklyVolume * 4}/month` : null,
          lead_type: 'rate_checker',
        },
      });

      if (leadFnError || !leadData?.leadId) {
        console.error('Error creating lead via function:', leadFnError, leadData);
        toast({
          title: "Submission failed",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
        return;
      }

      const leadId: string = leadData.leadId;

      // 4. Insert rate checker submission linked to lead
      if (!rateCheckerData.shipmentType) {
        console.error('No shipment type selected');
        toast({
          title: "Submission failed",
          description: "Please complete all required fields.",
          variant: "destructive",
        });
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: submissionError } = await supabase
        .from('rate_checker_submissions')
        .insert({
          lead_id: leadId,
          shipment_type: rateCheckerData.shipmentType,
          courier: rateCheckerData.courier,
          other_courier_name: rateCheckerData.otherCourierName || null,
          courier_service: rateCheckerData.courierService,
          weekly_volume: rateCheckerData.weeklyVolume,
          current_cost_per_parcel: rateCheckerData.currentCostPerParcel,
          parcel_weight: rateCheckerData.parcelWeight,
          parcel_dimensions: rateCheckerData.parcelLength ? {
            length: rateCheckerData.parcelLength,
            width: rateCheckerData.parcelWidth,
            height: rateCheckerData.parcelHeight,
          } : null,
          invoice_analysis: rateCheckerData.invoiceAnalysis as any,
          shipping_lanes: rateCheckerData.shippingLanes,
          selected_destinations: rateCheckerData.selectedDestinations,
          out_of_area_zones: rateCheckerData.outOfAreaZones,
          mainland_percentage: rateCheckerData.mainlandPercentage !== 100 ? rateCheckerData.mainlandPercentage : null,
          remote_percentage: rateCheckerData.remotePercentage !== 0 ? rateCheckerData.remotePercentage : null,
          fuel_surcharge: rateCheckerData.fuelSurcharge,
          courier2: rateCheckerData.courier2 || null,
          courier_service2: rateCheckerData.courierService2 || null,
          current_cost_per_parcel2: rateCheckerData.currentCostPerParcel2 || null,
          parcel_weight2: rateCheckerData.parcelWeight2 || null,
          parcel_dimensions2: rateCheckerData.parcelLength2 ? {
            length: rateCheckerData.parcelLength2,
            width: rateCheckerData.parcelWidth2,
            height: rateCheckerData.parcelHeight2,
          } : null,
        } as any);

      if (submissionError) {
        console.error('Error saving submission:', submissionError);
      }

      // 5. Upload invoice if present
      if (rateCheckerData.shippingInvoiceFile) {
        try {
          const base64 = await fileToBase64(rateCheckerData.shippingInvoiceFile);
          const { error: uploadError } = await supabase.functions.invoke('upload-lead-invoice', {
            body: {
              leadId: leadId,
              fileBase64: base64,
              fileName: rateCheckerData.shippingInvoiceFile.name,
              contentType: rateCheckerData.shippingInvoiceFile.type,
            },
          });
          if (uploadError) {
            console.error('Error uploading invoice:', uploadError);
          } else {
            console.log('Invoice uploaded successfully');
          }
        } catch (uploadErr) {
          console.error('Failed to upload invoice:', uploadErr);
        }
      }

      // 6. Send confirmation email + internal notification (fire and forget - don't block on this)
      supabase.functions.invoke('send-lead-confirmation', {
        body: {
          email: formData.email.trim(),
          fullName: formData.fullName.trim(),
          companyName: formData.companyName.trim(),
          leadType: 'rate_checker',
          courier: rateCheckerData.courier,
          courierService: rateCheckerData.courierService,
          shipmentType: rateCheckerData.shipmentType,
          weeklyVolume: rateCheckerData.weeklyVolume,
          postcode: formData.collectionPostcode.trim().toUpperCase(),
          phone: formData.phone.trim(),
          currentCostPerParcel: rateCheckerData.currentCostPerParcel,
          parcelWeight: rateCheckerData.parcelWeight,
          parcelLength: rateCheckerData.parcelLength,
          parcelWidth: rateCheckerData.parcelWidth,
          parcelHeight: rateCheckerData.parcelHeight,
          courier2: rateCheckerData.courier2,
          courierService2: rateCheckerData.courierService2,
          currentCostPerParcel2: rateCheckerData.currentCostPerParcel2,
          parcelWeight2: rateCheckerData.parcelWeight2,
          parcelLength2: rateCheckerData.parcelLength2,
          parcelWidth2: rateCheckerData.parcelWidth2,
          parcelHeight2: rateCheckerData.parcelHeight2,
          shippingLanes: rateCheckerData.shippingLanes,
          selectedDestinations: rateCheckerData.selectedDestinations,
        },
      }).then(({ error }) => {
        if (error) {
          console.error('Failed to send confirmation email:', error);
        } else {
          console.log('Confirmation email sent successfully');
        }
      });

      // 7. Send webhook to Make.com with all data (fire and forget)
      (async () => {
        try {
          // Prepare invoice file data if available
          let invoiceFileData: { fileName: string; contentType: string; base64: string } | undefined;
          if (rateCheckerData.shippingInvoiceFile) {
            const base64Data = await fileToBase64(rateCheckerData.shippingInvoiceFile);
            invoiceFileData = {
              fileName: rateCheckerData.shippingInvoiceFile.name,
              contentType: rateCheckerData.shippingInvoiceFile.type,
              base64: base64Data,
            };
          }

          const webhookPayload = {
            // Contact Info
            leadId: leadId,
            fullName: formData.fullName.trim(),
            companyName: formData.companyName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            postcode: formData.collectionPostcode.trim().toUpperCase(),
            submittedAt: new Date().toISOString(),
            
            // Lead Type
            leadType: 'rate_checker' as const,
            
            // Rate Checker Data
            shipmentType: rateCheckerData.shipmentType,
            courier: rateCheckerData.courier,
            otherCourierName: rateCheckerData.otherCourierName || null,
            courierService: rateCheckerData.courierService,
            courier2: rateCheckerData.courier2 || null,
            courierService2: rateCheckerData.courierService2 || null,
            currentCostPerParcel2: rateCheckerData.currentCostPerParcel2 || null,
            weeklyVolume: rateCheckerData.weeklyVolume,
            currentCostPerParcel: rateCheckerData.currentCostPerParcel,
            parcelWeight: rateCheckerData.parcelWeight,
            parcelDimensions: rateCheckerData.parcelLength ? {
              length: rateCheckerData.parcelLength,
              width: rateCheckerData.parcelWidth,
              height: rateCheckerData.parcelHeight,
            } : null,
            parcelWeight2: rateCheckerData.parcelWeight2,
            parcelDimensions2: rateCheckerData.parcelLength2 ? {
              length: rateCheckerData.parcelLength2,
              width: rateCheckerData.parcelWidth2,
              height: rateCheckerData.parcelHeight2,
            } : null,
            shippingLanes: rateCheckerData.shippingLanes,
            selectedDestinations: rateCheckerData.selectedDestinations,
            outOfAreaZones: rateCheckerData.outOfAreaZones,
            mainlandPercentage: rateCheckerData.mainlandPercentage,
            remotePercentage: rateCheckerData.remotePercentage,
            fuelSurcharge: rateCheckerData.fuelSurcharge,
            invoiceAnalysis: rateCheckerData.invoiceAnalysis,
            
            // Invoice file (if available)
            invoiceFile: invoiceFileData,
          };

          const { error: webhookError } = await supabase.functions.invoke('send-lead-webhook', {
            body: webhookPayload,
          });

          if (webhookError) {
            console.error('Failed to send lead webhook:', webhookError);
          } else {
            console.log('Lead webhook sent successfully');
          }
        } catch (webhookErr) {
          console.error('Error sending lead webhook:', webhookErr);
        }
      })();

      console.log('Lead and submission saved successfully');
      onSubmitted?.();
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-text-primary">
            Get your ITD quote
          </DialogTitle>
          <DialogDescription className="text-text-secondary">
            No obligation. We'll benchmark your profile and come back with a tailored rate card.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-text-primary">Full name <span className="text-text-secondary font-normal">(optional)</span></Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="pl-10 bg-background border-border"
                placeholder=""
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-text-primary">Company name <span className="text-text-secondary font-normal">(optional)</span></Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="pl-10 bg-background border-border"
                placeholder=""
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="collectionPostcode" className="text-text-primary">Collection Postcode <span className="text-text-secondary font-normal">(optional)</span></Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                id="collectionPostcode"
                value={formData.collectionPostcode}
                onChange={(e) => handleChange('collectionPostcode', e.target.value.toUpperCase())}
                className="pl-10 bg-background border-border uppercase"
                placeholder=""
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-text-primary">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="pl-10 bg-background border-border"
                placeholder=""
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-text-primary">Phone <span className="text-text-secondary font-normal">(optional)</span></Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="pl-10 bg-background border-border"
                placeholder=""
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Get my ITD quote'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
