"use client";
import { useRef, useState, useCallback } from "react";
import { ShipmentType } from "./types";
import { cn } from "@/lib/utils";
import { Icon3DDomesticBox, Icon3DExportGlobe, Icon3DImportGlobe } from "./Icon3DShipment";

interface ShipmentTypeStepProps {
  value: ShipmentType;
  onChange: (type: ShipmentType) => void;
  onAutoAdvance?: () => void;
  /** When provided, only these shipment types are shown as tiles. Used by the
   * international page to hide the Domestic UK option. */
  availableTypes?: ShipmentType[];
}

const options: {
  value: ShipmentType;
  label: string;
  iconType: "domestic" | "export" | "import";
  description: string;
}[] = [
  {
    value: "domestic",
    label: "Domestic UK",
    iconType: "domestic",
    description: "Shipping within the UK",
  },
  {
    value: "international-export",
    label: "International Export",
    iconType: "export",
    description: "Shipping from UK to abroad",
  },
  {
    value: "international-import",
    label: "International Import",
    iconType: "import",
    description: "Shipping to UK from abroad",
  },
];

function ShipmentCard({
  option,
  selected,
  onSelect,
}: {
  option: (typeof options)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovering, setHovering] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) / (rect.width / 2);
    const y = (e.clientY - cy) / (rect.height / 2);
    setTilt({ rx: -y * 10, ry: x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const handleClick = useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), 400);
    onSelect();
  }, [onSelect]);

  const iconTilt = tilt;

  return (
    <button
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        "relative flex flex-col items-center gap-3 md:gap-4 p-5 md:p-7 rounded-xl border text-center",
        "transition-[box-shadow,border-color] duration-200 ease-out cursor-pointer",
        "backdrop-blur-sm bg-card/80",
        "active:scale-[0.97]",
        hovering &&
          !selected &&
          "border-primary/40 shadow-[0_0_20px_hsla(200,98%,39%,0.12)]",
        selected
          ? "border-primary/70 shadow-[0_0_24px_hsla(200,98%,39%,0.18)] bg-primary/5"
          : "border-border",
        flash && "selection-pulse-active"
      )}
      style={{
        transform: hovering
          ? `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.02)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: hovering
          ? "transform 0.1s ease-out"
          : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D icon */}
      <div
        className="transition-transform duration-150 ease-out"
        style={{
          transform: hovering
            ? `translate3d(${-tilt.ry * 0.6}px, ${tilt.rx * 0.6}px, 16px)`
            : "translate3d(0, 0, 0)",
          transformStyle: "preserve-3d",
        }}
      >
        {option.iconType === "domestic" && (
          <Icon3DDomesticBox tilt={iconTilt} />
        )}
        {option.iconType === "export" && (
          <Icon3DExportGlobe tilt={iconTilt} />
        )}
        {option.iconType === "import" && (
          <Icon3DImportGlobe tilt={iconTilt} />
        )}
      </div>

      <div className="text-center">
        <div className="font-semibold text-sm md:text-base text-text-primary">
          {option.label}
        </div>
        <div className="text-xs md:text-body-sm text-text-secondary mt-1">
          {option.description}
        </div>
      </div>

      {/* Selection indicator */}
      {selected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center animate-scale-in">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </button>
  );
}

export function ShipmentTypeStep({
  value,
  onChange,
  onAutoAdvance,
  availableTypes,
}: ShipmentTypeStepProps) {
  const hasSelection = !!value;
  const visibleOptions = availableTypes
    ? options.filter((o) => availableTypes.includes(o.value))
    : options;
  const gridColsClass =
    visibleOptions.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-heading-lg text-text-primary mb-1">
          What type of parcel shipping do you want to check?
        </h2>
        <p className="text-body-sm text-text-secondary">
          Select one to get started — no signup required
        </p>
      </div>
      <div className={cn("grid grid-cols-1 gap-3 md:gap-4", gridColsClass)}>
        {visibleOptions.map((option) => (
          <ShipmentCard
            key={option.value}
            option={option}
            selected={value === option.value}
            onSelect={() => onChange(option.value)}
          />
        ))}
      </div>

      {/* Explicit Continue button — fades in on selection */}
      <div
        className="transition-opacity duration-200"
        style={{
          opacity: hasSelection ? 1 : 0,
          pointerEvents: hasSelection ? "auto" : "none",
        }}
      >
        <button
          type="button"
          onClick={() => onAutoAdvance?.()}
          className="w-full text-white font-semibold text-base"
          style={{
            background: "#3A9EA5",
            borderRadius: 10,
            height: 52,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
