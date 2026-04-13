import { NextRequest, NextResponse } from "next/server";

// Stores submissions in memory for now — will be replaced with PostgreSQL/Prisma
const submissions: Array<{
  id: string;
  shippingType?: string;
  mainLanes?: string[];
  weeklyVolume?: string;
  collectionPostcode?: string;
  company?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  source?: string;
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    shippingType,
    mainLanes,
    weeklyVolume,
    collectionPostcode,
    company,
    firstName,
    lastName,
    email,
    phone,
    source,
  } = body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const submission = {
    id: crypto.randomUUID(),
    shippingType: shippingType || undefined,
    mainLanes: Array.isArray(mainLanes) ? mainLanes : undefined,
    weeklyVolume: weeklyVolume || undefined,
    collectionPostcode: collectionPostcode || undefined,
    company: company || undefined,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    email,
    phone: phone || undefined,
    source: source || undefined,
    createdAt: new Date().toISOString(),
  };

  submissions.push(submission);

  return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
}
