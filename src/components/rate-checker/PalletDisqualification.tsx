"use client";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";

interface PalletDisqualificationProps {
  onContact: () => void;
  onBack: () => void;
}

export function PalletDisqualification({ onContact, onBack }: PalletDisqualificationProps) {
  return (
    <div className="text-center space-y-6 py-8 animate-fade-in-up">
      <div className="mx-auto w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center">
        <AlertTriangle className="h-8 w-8 text-slate-400" />
      </div>
      <div className="space-y-3 max-w-md mx-auto">
        <h2 className="text-heading-lg text-slate-100">
          Unfortunately, this is not a service area we currently support through this tool.
        </h2>
        <p className="text-body-sm text-slate-400">
          We currently focus on parcel, box-based and eCommerce fulfilment operations. If your requirements are broader, our team may still be able to advise.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button variant="ghost" className="gap-2 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-slate-100" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button size="lg" className="gap-2 btn-cta" onClick={onContact}>
          Speak to our team <ArrowRight className="h-4 w-4 bounce-arrow" />
        </Button>
      </div>
    </div>
  );
}
