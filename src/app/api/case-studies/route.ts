import { NextRequest, NextResponse } from "next/server";
import { getCaseStudies } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const industry = searchParams.get("industry") || undefined;

  const studies = getCaseStudies(industry);

  const result = studies.map(({ id, slug, brandName, industry, metric, summary }) => ({
    id,
    slug,
    brandName,
    industry,
    metric,
    summary,
  }));

  return NextResponse.json(result);
}
