"use client";

interface FilterPillsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterPills({ options, active, onChange }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${
            active === option
              ? "bg-bg-dark text-white"
              : "bg-bg-secondary text-text-secondary hover:bg-gray-200 border border-border"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
