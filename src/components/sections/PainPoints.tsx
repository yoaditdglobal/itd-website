import ScrollReveal from "@/components/animations/ScrollReveal";

const pains = [
  {
    num: "01",
    title: "Carrier fragmentation",
    desc: "Managing multiple carriers across portals, formats, and tracking systems wastes hours daily and hides cost-saving opportunities.",
  },
  {
    num: "02",
    title: "Manual compliance risk",
    desc: "Hand-built customs documents and tariff classifications cause delays, fines, and angry customers when errors reach the border.",
  },
  {
    num: "03",
    title: "No single source of truth",
    desc: "Shipment data scattered across systems means your team can't answer customer queries, spot problems, or optimise routes.",
  },
];

export default function PainPoints() {
  return (
    <section className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {pains.map((pain, i) => (
            <ScrollReveal key={pain.num} delay={i * 0.1}>
              <div className="flex gap-4">
                <span className="text-3xl md:text-4xl font-bold text-accent/20 leading-none flex-shrink-0">
                  {pain.num}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-text-primary mb-1">
                    {pain.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {pain.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
