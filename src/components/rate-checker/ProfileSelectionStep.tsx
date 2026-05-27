"use client";
import { ProfileCard3D, type IconType } from "./ProfileCard3D";

export type ThreePLProfile = "pallet" | "box-picking" | "ecommerce";

const profiles: { id: ThreePLProfile; title: string; iconType: IconType }[] = [
  {
    id: "ecommerce",
    title: "eCommerce Fulfilment, DTC & Marketplace",
    iconType: "cart",
  },
  {
    id: "box-picking",
    title: "Box Picking B2B, FBA Prep",
    iconType: "box",
  },
  {
    id: "pallet",
    title: "Pallet B2B Storage, Handling and B2B Fulfilment",
    iconType: "warehouse",
  },
];

interface ProfileSelectionStepProps {
  selected: ThreePLProfile | null;
  onSelect: (profile: ThreePLProfile) => void;
}

export function ProfileSelectionStep({ selected, onSelect }: ProfileSelectionStepProps) {
  return (
    <div className="py-8 px-2 sm:px-4 space-y-8">
      <div className="text-center space-y-2">
        <h2
          className="text-xl sm:text-2xl font-semibold text-slate-100 leading-tight"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          Tell us what best describes your profile
        </h2>
        <p
          className="text-sm text-slate-400"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
        >
          Select the option below that most closely matches your operation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {profiles.map((p) => (
            <ProfileCard3D
              key={p.id}
              selected={selected === p.id}
              onClick={() => onSelect(p.id)}
              iconType={p.iconType}
              title={p.title}
            />
        ))}
      </div>
    </div>
  );
}
