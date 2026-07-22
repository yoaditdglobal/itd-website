interface SectionLabelProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  surface?: "light" | "dark";
  /** Heading size. "display" (default) = text-display-lg; "heading" = the smaller,
   *  more structured text-display-md — use for sub-sections like Customer Stories. */
  size?: "display" | "heading";
}

export default function SectionLabel({
  title,
  subtitle,
  align = "left",
  surface = "light",
  size = "display",
}: SectionLabelProps) {
  const alignment = align === "center" ? "text-center" : "text-left";
  const textColor = surface === "dark" ? "text-white" : "text-text-primary";
  const subColor = surface === "dark" ? "text-white/70" : "text-text-secondary";
  const titleSize = size === "heading" ? "text-display-md" : "text-display-lg";

  return (
    <div className={`${alignment} mb-8 md:mb-12`}>
      <h2 className={`${titleSize} ${textColor}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-body-lg max-w-2xl ${subColor} ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
