"use client";
import dynamic from "next/dynamic";

const RateCheckerSection = dynamic(() => import("./RateCheckerSection"), { ssr: false });

type RateCheckerType = 'domestic' | 'international' | '3pl' | 'export' | 'import';

export function RateCheckerLoader({ type }: { type: RateCheckerType }) {
  return <RateCheckerSection type={type} />;
}
