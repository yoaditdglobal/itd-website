"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, User, Building2, Mail, Phone, Loader2, MessageCircle } from "lucide-react";
import PostSubmissionContent from "./PostSubmissionContent";
import { WhatWeDoSection, BookACallSection } from "./MarketingContent";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Zod schema for client-side validation
const lowVolumeFormSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100, "Name is too long"),
  companyName: z.string().trim().min(1, "Company name is required").max(150, "Company name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(30, "Phone number is too long"),
  postcode: z.string().trim().min(1, "Postcode is required").max(10, "Postcode is too long"),
});

interface LowVolumeScreenProps {
  weeklyVolume: number | null;
  onBack: () => void;
}

export function LowVolumeScreen({ weeklyVolume, onBack }: LowVolumeScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    postcode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Validate inputs client-side
      const validationResult = lowVolumeFormSchema.safeParse(formData);
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
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          postcode: formData.postcode.trim().toUpperCase(),
          monthly_volume: `< 150/week (${weeklyVolume || 0}/week - collection route inquiry)`,
          lead_type: 'low_volume_inquiry',
        },
      });

      if (leadFnError || !leadData?.leadId) {
        console.error('Error creating low volume lead via function:', leadFnError, leadData);
        toast({
          title: "Submission failed",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
        return;
      }

      const leadId: string = leadData.leadId;

      // 4. Send confirmation email (fire and forget)
      supabase.functions.invoke('send-lead-confirmation', {
        body: {
          email: formData.email.trim(),
          fullName: formData.fullName.trim(),
          companyName: formData.companyName.trim(),
          leadType: 'low_volume_inquiry',
          weeklyVolume: weeklyVolume,
          postcode: formData.postcode.trim().toUpperCase(),
          phone: formData.phone.trim(),
        },
      }).then(({ error: emailError }) => {
        if (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        } else {
          console.log('Confirmation email sent successfully');
        }
      });

      // 5. Send webhook to Make.com using the same leadId (fire and forget)
      supabase.functions.invoke('send-lead-webhook', {
        body: {
          leadId: leadId,
          fullName: formData.fullName.trim(),
          companyName: formData.companyName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          postcode: formData.postcode.trim().toUpperCase(),
          submittedAt: new Date().toISOString(),
          leadType: 'low_volume_inquiry',
          weeklyVolume: weeklyVolume,
        },
      }).then(({ error: webhookError }) => {
        if (webhookError) {
          console.error('Failed to send lead webhook:', webhookError);
        } else {
          console.log('Lead webhook sent successfully');
        }
      });

      setSubmitted(true);
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

  if (submitted) {
    return <PostSubmissionContent onStartOver={onBack} leadType="low_volume_inquiry" />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-7 h-7 text-primary" />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-text-primary">
          Let's see if we can still help
        </h2>
        <p className="text-text-secondary max-w-lg mx-auto">
          While higher volumes tend to unlock the most aggressive pricing, we don't rule anything out based on volume alone. Depending on your postcode and service needs, there may already be opportunities worth exploring.
        </p>
      </div>

      {/* Lead Capture Form */}
      <div className="border border-border rounded-xl p-6 bg-card/50 space-y-6">
        <p className="text-text-secondary text-center">
          Leave your details and we'll quickly sense-check whether our collection routes or rates could work for you now — or soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-text-primary text-sm">Full name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="pl-10 bg-background border-border"
                  placeholder="John Smith"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-text-primary text-sm">Company name *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="companyName"
                  required
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="pl-10 bg-background border-border"
                  placeholder="Acme Ltd"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-text-primary text-sm">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-10 bg-background border-border"
                  placeholder="john@acme.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-text-primary text-sm">Phone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="pl-10 bg-background border-border"
                  placeholder="+44 123 456 7890"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="postcode" className="text-text-primary text-sm">Collection postcode *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                id="postcode"
                required
                value={formData.postcode}
                onChange={(e) => handleChange('postcode', e.target.value.toUpperCase())}
                className="pl-10 bg-background border-border uppercase"
                placeholder="SW1A 1AA"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 md:py-4 text-sm md:text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 btn-cta"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                Speak to our team
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Marketing sections */}
      <div className="space-y-4">
        <h3 className="text-center text-label text-text-secondary uppercase tracking-wider">
          While you wait…
        </h3>
        <WhatWeDoSection />
        <BookACallSection />
      </div>

      {/* Back button */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to adjust volume
        </Button>
      </div>
    </div>
  );
}
