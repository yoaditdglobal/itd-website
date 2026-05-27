"use client";
import { cn } from "@/lib/utils";
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}
export function ProgressBar({
  currentStep,
  totalSteps
}: ProgressBarProps) {
  const progress = (currentStep - 1) / (totalSteps - 1) * 100;
  return <div className="w-full">
      <div className="flex justify-between text-sm text-slate-400 mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="tabular-nums transition-all duration-500">{Math.round(progress)}% complete</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-slate-700/50">
        <div className={cn("h-full bg-primary transition-all duration-500 ease-out rounded-full progress-bar-animated")} style={{
        width: `${progress}%`
      }} />
      </div>
    </div>;
}