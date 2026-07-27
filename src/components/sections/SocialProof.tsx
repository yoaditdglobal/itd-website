import AnimatedCounter from "@/components/ui/AnimatedCounter";
import LogoTicker from "@/components/ui/LogoTicker";

const stats = [
  { end: 17.5, suffix: "m", label: "Labels a year", prefix: "", decimals: 1 },
  { end: 2.7, suffix: "s", label: "Between new labels", prefix: "", decimals: 1 },
  { end: 152, suffix: "", label: "Countries covered", prefix: "" },
  { end: 6000, suffix: "+", label: "Trusted businesses", prefix: "" },
];

export default function SocialProof() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
