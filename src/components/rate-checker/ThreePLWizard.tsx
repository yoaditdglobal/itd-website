"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileSelectionStep, type ThreePLProfile } from "./ProfileSelectionStep";
import { PalletDisqualification } from "./PalletDisqualification";
import { BoxPickingFlow, type BoxPickingData } from "./BoxPickingFlow";
import { EcommerceFlow, type EcommerceData } from "./EcommerceFlow";
import { SavingsSummary } from "./SavingsSummary";
import { ThreePLLeadCaptureModal } from "./ThreePLLeadCaptureModal";
import { ParticleNetwork } from "./ParticleNetwork";

const initialBoxData: BoxPickingData = {
  boxesPerDay: null, length: "", width: "", height: "", weight: "", postcode: "", carrier: null, rate: "",
};

const initialEcomData: EcommerceData = {
  parcelTypes: [], painPoints: [], industries: [], volumeByType: {}, carriers: [], averageRate: {},
};

export function ThreePLWizard() {
  const router = useRouter();
  const [profile, setProfile] = useState<ThreePLProfile | null>(null);
  const [boxData, setBoxData] = useState<BoxPickingData>(initialBoxData);
  const [ecomData, setEcomData] = useState<EcommerceData>(initialEcomData);
  const [savingsPercent, setSavingsPercent] = useState<number | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showPostSubmission, setShowPostSubmission] = useState(false);

  const getSubmissionData = (): Record<string, unknown> => {
    switch (profile) {
      case "pallet":
        return { profile_type: "pallet" };
      case "box-picking":
        return {
          profile_type: "box-picking",
          boxes_per_day: boxData.boxesPerDay,
          box_dimensions: { length: boxData.length, width: boxData.width, height: boxData.height, weight: boxData.weight },
          collection_postcode: boxData.postcode,
          current_carriers: boxData.carrier ? [boxData.carrier] : [],
          current_rate: parseFloat(boxData.rate) || null,
        };
      case "ecommerce":
        return {
          profile_type: "ecommerce",
          parcel_types: ecomData.parcelTypes,
          pain_points: ecomData.painPoints,
          industries: ecomData.industries,
          volume_by_type: ecomData.volumeByType,
          current_carriers: ecomData.carriers,
          rate_by_carrier: Object.fromEntries(
            Object.entries(ecomData.averageRate).map(([k, v]) => [k, parseFloat(v) || null])
          ),
        };
      default:
        return { profile_type: "unknown" };
    }
  };

  useEffect(() => {
    if (profile === "pallet") {
      router.push('/contact?enquiry=3pl-pallet');
    }
  }, [profile, router]);

  const handleReset = () => {
    setProfile(null);
    setBoxData(initialBoxData);
    setEcomData(initialEcomData);
    setSavingsPercent(null);
    setShowPostSubmission(false);
  };

  if (showPostSubmission) {
    return (
      <section id="wizard" className="py-16 border-white">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl wizard-ambient-bg">
          <ParticleNetwork />
          <div className="relative z-10 p-6 md:p-10 text-center space-y-4">
            <h2 className="text-display-md text-slate-100">We've received your details</h2>
            <p className="text-slate-400">Our team will review your operation and reach out with a tailored proposal.</p>
            <button onClick={handleReset} className="text-sm text-[hsl(182,96%,33%)] underline hover:no-underline">Start again</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="wizard" className="py-16 border-white">
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl wizard-ambient-bg">
          <ParticleNetwork />
          <div className="relative z-10 p-4 md:p-6 lg:p-10">
            {!profile && (
              <ProfileSelectionStep selected={profile} onSelect={setProfile} />
            )}

            {profile === "pallet" && null}

            {profile === "box-picking" && savingsPercent === null && (
              <BoxPickingFlow
                data={boxData}
                onChange={setBoxData}
                onComplete={(s) => setSavingsPercent(s)}
                onBack={handleReset}
              />
            )}

            {profile === "box-picking" && savingsPercent !== null && (
              <SavingsSummary
                savingsPercent={savingsPercent}
                profileType="box-picking"
                onGetQuote={() => setShowLeadModal(true)}
              />
            )}

            {profile === "ecommerce" && savingsPercent === null && (
              <EcommerceFlow
                data={ecomData}
                onChange={setEcomData}
                onComplete={(s) => setSavingsPercent(s)}
                onBack={handleReset}
              />
            )}

            {profile === "ecommerce" && savingsPercent !== null && (
              <SavingsSummary
                savingsPercent={savingsPercent}
                profileType="ecommerce"
                onGetQuote={() => setShowLeadModal(true)}
              />
            )}
          </div>
        </div>

      <ThreePLLeadCaptureModal
        open={showLeadModal}
        onOpenChange={setShowLeadModal}
        submissionData={getSubmissionData()}
        onSubmitted={() => setShowPostSubmission(true)}
      />
    </section>
  );
}
