interface SectionLabelProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  surface?: "light" | "dark";
}

export default function SectionLabel({
  title,
  subtitle,
  align = "left",
  surface = "light",
}: SectionLabelProps) {
  const alignment = align === "center" ? "text-center" : "text-left";
  const textColor = surface === "dark" ? "text-white" : "text-text-primary";
  const subColor = surface === "dark" ? "text-white/70" : "text-text-secondary";

  return (
    <div className={`${alignment} mb-8 md:mb-12`}>
      <h2 className={`text-display-lg ${textColor}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-body-lg max-w-2xl ${subColor} ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
