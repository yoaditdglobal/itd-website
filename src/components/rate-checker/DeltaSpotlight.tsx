"use client";
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, RefreshCw, Store, TrendingUp, Settings, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
const deltaLogo = '/logos/rate-checker/carriers/dhl.png'; // placeholder

const challenges = [
  {
    title: "Retail Brands",
    description: "Managing delivery expectations, cost pressures and service consistency across multiple customer accounts.",
    icon: ShoppingBag,
  },
  {
    title: "Subscription Brands",
    description: "Balancing recurring shipment predictability with margin pressure, cut-off sensitivity and retention risk.",
    icon: RefreshCw,
  },
  {
    title: "Marketplace Customers",
    description: "Handling fast-moving seller expectations, account complexity and operational responsiveness across multiple channels.",
    icon: Store,
  },
  {
    title: "Retention & Growth",
    description: "Keeping existing customers happy while building a carrier proposition that helps win new business.",
    icon: TrendingUp,
  },
  {
    title: "Billing, Setup & IT Integrations",
    description: "Reducing friction across onboarding, account structures, customer-specific setup and reporting visibility.",
    icon: Settings,
  },
  {
    title: "Multi-Carrier Management",
    description: "Getting competitive rates usually comes with hard volume commitments, making it difficult to offer multiple carrier options based on volume alone.",
    icon: Truck,
  },
];

export function DeltaSpotlight() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ rx: -y * 10, ry: x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  return (
    <section className="py-16">
      <div className="text-center space-y-3 mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <img src={deltaLogo} alt="Delta Fulfilment" className="h-16 w-auto object-contain" />
        </div>
        <h2 className="text-display-md text-text-primary">
          We understand the realities of operating a 3PL.{" "}
          <span style={{ color: '#029ea7' }}>We own one.</span>
        </h2>
        <p className="text-body-md text-text-secondary max-w-2xl mx-auto">
          3PLs Are Expected to Do More, With Less.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {challenges.map((c, index) => {
          const Icon = c.icon;
          const isHovered = hoveredIndex === index;
          return (
            <Card
              key={c.title}
              onMouseMove={(e) => {
                setHoveredIndex(index);
                handleMouseMove(e);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "border-border/60 cursor-default active:scale-[0.98]",
                "transition-[box-shadow,border-color] duration-300 ease-out",
                isHovered && "border-primary/40 shadow-lg"
              )}
              style={{
                transform: isHovered
                  ? `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
                  : "perspective(800px) rotateX(0deg) rotateY(0deg)",
                transition: isHovered
                  ? "transform 0.35s ease-out"
                  : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                transformStyle: "preserve-3d",
                animationDelay: `${index * 80}ms`,
                animationFillMode: "both",
              }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center",
                      "transition-all duration-300 ease-out",
                      isHovered && "scale-110 shadow-lg shadow-primary/20 bg-primary/15"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 text-primary transition-transform duration-300",
                      isHovered && "scale-110"
                    )} />
                  </div>
                  <CardTitle className="text-base">{c.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-text-secondary leading-relaxed">{c.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
