"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, TrendingUp, FileCheck } from "lucide-react";

interface LiveStats {
  totalSessions: number;
  avgSavingsPercent: number;
  reportsGenerated: number;
}

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (target <= 0) return;
    if (prefersReduced) {
      setValue(target);
      setDone(true);
      return;
    }
    const steps = 30;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        setDone(true);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration]);

  return { value, done };
}

function useLiveTick(
  base: number,
  minDelay: number,
  maxDelay: number,
  ready: boolean
) {
  const [extra, setExtra] = useState(0);
  const [bumped, setBumped] = useState(false);
  const cap = Math.max(Math.floor(base * 0.4), 10);

  useEffect(() => {
    if (!ready || prefersReduced || base <= 0) return;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const delay = Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
      timeout = setTimeout(() => {
        const increment = Math.random() < 0.25 ? 2 : 1;
        setExtra((prev) => (prev >= cap ? prev : prev + increment));
        setBumped(true);
        setTimeout(() => setBumped(false), 500);
        tick();
      }, delay);
    };
    tick();
    return () => clearTimeout(timeout);
  }, [ready, base, minDelay, maxDelay, cap]);

  return { total: base + extra, bumped };
}

function useWobble(
  base: number,
  minDelay: number,
  maxDelay: number,
  ready: boolean
) {
  const [offset, setOffset] = useState(0);
  const [bumped, setBumped] = useState(false);
  const maxOffset = 6;

  useEffect(() => {
    if (!ready || prefersReduced || base <= 0) return;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const delay = Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
      timeout = setTimeout(() => {
        setOffset((prev) => {
          const adjustment = Math.floor(Math.random() * 4) - 1; // -1 to +2
          const next = prev + adjustment;
          return Math.max(0, Math.min(next, maxOffset));
        });
        setBumped(true);
        setTimeout(() => setBumped(false), 500);
        tick();
      }, delay);
    };
    tick();
    return () => clearTimeout(timeout);
  }, [ready, base, minDelay, maxDelay]);

  return { value: base + offset, bumped };
}

export default function LiveActivityBanner() {
  const [stats, setStats] = useState<LiveStats | null>(null);

  useEffect(() => {
    supabase.functions
      .invoke("live-stats", { method: "GET" })
      .then(({ data, error }) => {
        if (!error && data && (data.totalSessions > 0 || data.avgSavingsPercent > 0)) {
          setStats(data);
        }
      })
      .catch(() => {});
  }, []);

  if (!stats) return null;

  return (
    <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 px-4 py-4">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="text-eyebrow text-primary">
          Live
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <TickingStatCard
          icon={<Users className="h-4 w-4 text-primary" />}
          base={stats.totalSessions}
          suffix="+"
          label="businesses checked rates this week"
          minDelay={3000}
          maxDelay={7000}
        />
        <WobblingStatCard
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
          base={stats.avgSavingsPercent}
          suffix="%"
          label="average savings found"
          minDelay={6000}
          maxDelay={12000}
        />
        <TickingStatCard
          icon={<FileCheck className="h-4 w-4 text-primary" />}
          base={stats.reportsGenerated}
          suffix="+"
          label="savings reports generated today"
          minDelay={5000}
          maxDelay={10000}
        />
      </div>
    </div>
  );
}

function TickingStatCard({
  icon, base, suffix, label, minDelay, maxDelay,
}: {
  icon: React.ReactNode; base: number; suffix: string; label: string; minDelay: number; maxDelay: number;
}) {
  const { value: countUpValue, done } = useCountUp(base);
  const { total, bumped } = useLiveTick(base, minDelay, maxDelay, done);
  const displayValue = done ? total : countUpValue;

  return (
    <div className="flex items-center gap-2.5">
      <div className={`shrink-0 rounded-md p-1.5 transition-colors duration-500 ${bumped ? "bg-primary/25" : "bg-primary/10"}`}>
        {icon}
      </div>
      <div>
        <p
          className={`text-xl font-bold text-primary leading-none transition-transform duration-300 ${bumped ? "scale-125" : "scale-100"}`}
          style={{ transformOrigin: "left center", display: "inline-block" }}
        >
          {displayValue}{suffix}
        </p>
        <p className="text-caption text-text-tertiary mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function WobblingStatCard({
  icon, base, suffix, label, minDelay, maxDelay,
}: {
  icon: React.ReactNode; base: number; suffix: string; label: string; minDelay: number; maxDelay: number;
}) {
  const { value: countUpValue, done } = useCountUp(base);
  const { value: wobbleValue, bumped } = useWobble(base, minDelay, maxDelay, done);
  const displayValue = done ? wobbleValue : countUpValue;

  return (
    <div className="flex items-center gap-2.5">
      <div className={`shrink-0 rounded-md p-1.5 transition-colors duration-500 ${bumped ? "bg-primary/25" : "bg-primary/10"}`}>
        {icon}
      </div>
      <div>
        <p
          className={`text-xl font-bold text-primary leading-none transition-transform duration-300 ${bumped ? "scale-125" : "scale-100"}`}
          style={{ transformOrigin: "left center", display: "inline-block" }}
        >
          {displayValue}{suffix}
        </p>
        <p className="text-caption text-text-tertiary mt-0.5">{label}</p>
      </div>
    </div>
  );
}
