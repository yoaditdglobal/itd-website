import AnimatedCounter from "@/components/ui/AnimatedCounter";
import LogoTicker from "@/components/ui/LogoTicker";

const stats = [
  { end: 16, suffix: "", label: "Carrier integrations", prefix: "" },
  { end: 20, suffix: "+", label: "Tech integrations", prefix: "" },
  { end: 42, suffix: "+", label: "Countries covered", prefix: "" },
  { end: 99, suffix: "%", label: "Platform uptime", prefix: "" },
];

export default function SocialProof() {
  return (
    <section className="bg-white border-y border-border py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-text-tertiary mb-6">
          Connected to the carriers and platforms you already run.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} surface="light" {...stat} />
          ))}
        </div>
        <LogoTicker />
      </div>
    </section>
  );
}
