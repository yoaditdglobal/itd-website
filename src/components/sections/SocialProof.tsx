import AnimatedCounter from "@/components/ui/AnimatedCounter";
import LogoTicker from "@/components/ui/LogoTicker";

const stats = [
  { end: 2400000, suffix: "+", label: "Shipments processed", prefix: "" },
  { end: 85, suffix: "+", label: "Carriers connected", prefix: "" },
  { end: 42, suffix: "+", label: "Countries covered", prefix: "" },
  { end: 99, suffix: "%", label: "Platform uptime", prefix: "" },
];

export default function SocialProof() {
  return (
    <section className="bg-bg-dark py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
        <LogoTicker />
      </div>
    </section>
  );
}
