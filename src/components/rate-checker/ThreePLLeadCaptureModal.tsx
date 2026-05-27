"use client";
import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button";
import { Loader2, User, Building2, MapPin, Mail, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(100),
  companyName: z.string().trim().min(2, "Company name is required").max(100),
  postcode: z.string().trim().max(10).optional(),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Phone number is required").max(30),
});

type FormData = z.infer<typeof schema>;

interface ThreePLLeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submissionData: Record<string, unknown>;
  onSubmitted?: () => void;
}

export function ThreePLLeadCaptureModal({ open, onOpenChange, submissionData, onSubmitted }: ThreePLLeadCaptureModalProps) {
  const [form, setForm] = useState<FormData>({ fullName: "", companyName: "", postcode: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((err) => { fieldErrors[err.path[0] as keyof FormData] = err.message; });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-3pl-lead", {
        body: {
          lead: {
            full_name: form.fullName.trim(),
            company_name: form.companyName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            postcode: form.postcode?.trim() || null,
          },
          submission: submissionData,
        },
      });

      if (error || !data?.leadId) throw new Error("Submission failed");

      // Send confirmation email (fire-and-forget)
      supabase.functions.invoke("send-lead-confirmation", {
        body: {
          email: form.email.trim(),
          fullName: form.fullName.trim(),
          companyName: form.companyName.trim(),
          leadType: "3pl_inquiry",
          phone: form.phone.trim(),
          postcode: form.postcode?.trim(),
          profileType: submissionData.profile_type,
          boxesPerDay: submissionData.boxes_per_day,
          boxDimensions: submissionData.box_dimensions,
          currentCarriers: submissionData.current_carriers,
          currentRate: submissionData.current_rate,
          parcelTypes: submissionData.parcel_types,
          painPoints: submissionData.pain_points,
          industries: submissionData.industries,
          volumeByType: submissionData.volume_by_type,
          rateByCarrier: submissionData.rate_by_carrier,
          collectionPostcode: submissionData.collection_postcode,
        },
      });

      // Send webhook (fire-and-forget)
      supabase.functions.invoke("send-lead-webhook", {
        body: {
          fullName: form.fullName.trim(),
          companyName: form.companyName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          postcode: form.postcode?.trim(),
          leadType: "3pl_inquiry",
          ...submissionData,
        },
      });

      toast({ title: "Thank you!", description: "We'll be in touch with your personalised quote shortly." });
      onOpenChange(false);
      onSubmitted?.();
    } catch {
      toast({ variant: "destructive", title: "Something went wrong", description: "Please try again or contact us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get your personalised 3PL quote</DialogTitle>
          <DialogDescription>We'll review your details and get back to you with a tailored proposal.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {([
            { key: "fullName" as const, label: "Full Name", icon: User, placeholder: "John Smith" },
            { key: "companyName" as const, label: "Company Name", icon: Building2, placeholder: "Acme Fulfilment" },
            { key: "postcode" as const, label: "Collection Postcode", icon: MapPin, placeholder: "SW1A 1AA" },
            { key: "email" as const, label: "Email", icon: Mail, placeholder: "john@company.com" },
            { key: "phone" as const, label: "Phone", icon: Phone, placeholder: "07700 900000" },
          ]).map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key} className="space-y-1">
              <Label htmlFor={key} className="text-sm">{label}</Label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  id={key}
                  value={form[key] ?? ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                  className={`pl-9 ${errors[key] ? "border-destructive" : ""}`}
                />
              </div>
              {errors[key] && <p className="text-xs text-destructive">{errors[key]}</p>}
            </div>
          ))}
          <Button type="submit" className="w-full btn-cta" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Get my quote"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
