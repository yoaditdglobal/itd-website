import { NextRequest, NextResponse } from "next/server";
import { getIntegrations } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type") || undefined;
  const category = searchParams.get("category") || undefined;

  const result = getIntegrations(type, category);

  return NextResponse.json(result);
}
