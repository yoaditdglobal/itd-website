"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface OtherData {
  freeText: string;
  email: string;
}

interface OtherFlowProps {
  data: OtherData;
  onChange: (data: OtherData) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function OtherFlow({ data, onChange, onSubmit, onBack }: OtherFlowProps) {
  const canSubmit = data.freeText.trim().length > 5 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-slate-100">Tell us a bit more about your operation</h2>
        <p className="text-sm text-slate-400">We'll have a specialist get in touch</p>
      </div>
      <div className="max-w-md mx-auto space-y-4">
        <Textarea
          placeholder="Describe your operation, volumes, and what you're looking for..."
          value={data.freeText}
          onChange={(e) => onChange({ ...data, freeText: e.target.value })}
          className="min-h-[120px] bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
        />
        <Input
          type="email"
          placeholder="Your email address"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          className="bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
        />
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-slate-100">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={onSubmit} disabled={!canSubmit} className="gap-2 btn-cta">
          Speak to a specialist <ArrowRight className="h-4 w-4 bounce-arrow" />
        </Button>
      </div>
    </div>
  );
}
