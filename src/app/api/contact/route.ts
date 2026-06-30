import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, clientIp } from "@/lib/server/rate-limit";
import { createLead, isZohoConfigured } from "@/lib/server/zoho";
import { getNotifyEmails } from "@/lib/server/env";
import { splitName, emailTeam } from "@/lib/server/leads";

/**
 * POST /api/contact — capture a website enquiry as a Zoho CRM Lead.
 *
 * Previously this pushed to an in-memory array that was never read and wiped on
 * every redeploy (the lead was silently lost). Now it validates, rate-limits,
 * creates a Zoho Lead (Lead_Source "ITD Website"), and notifies the team.
 * Degrades gracefully: when Zoho isn't configured, or the write fails, it emails
 * the raw submission to the team so a lead is never lost.
 */

export const runtime = "nodejs";

const fileMeta = z
  .object({ name: z.string().max(255), size: z.number(), type: z.string().max(120) })
  .partial()
  .optional();

const contactSchema = z.object({
  shippingType: z.string().max(80).optional().or(z.literal("")),
  mainLanes: z.array(z.string().max(80)).max(20).optional(),
  weeklyVolume: z.string().max(80).optional().or(z.literal("")),
  freightType: z.string().max(80).optional().or(z.literal("")),
  quantity: z.string().max(80).optional().or(z.literal("")),
  weight: z.string().max(80).optional().or(z.literal("")),
  dimensions: z
    .object({
      length: z.string().max(40).optional(),
      width: z.string().max(40).optional(),
      height: z.string().max(40).optional(),
    })
    .partial()
    .optional(),
  supplierInvoice: fileMeta,
  freightPhoto: fileMeta,
  collectionPostcode: z.string().max(16).optional().or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  firstName: z.string().max(80).optional().or(z.literal("")),
  lastName: z.string().max(80).optional().or(z.literal("")),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  source: z.string().max(80).optional().or(z.literal("")),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (rateLimit(ip, { windowMs: 60_000, max: 10, bucket: "contact" })) {
    return NextResponse.json(
      { error: "Too many requests — please try again shortly." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const d = parsed.data;

  // Honeypot triggered — pretend success, do nothing.
  if (d.website && d.website.length > 0) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const lastName =
    (d.lastName && d.lastName.trim()) ||
    splitName(d.firstName || d.email.split("@")[0] || "Website lead").last;

  const dims = d.dimensions;
  const description = [
    d.shippingType && `Shipping type: ${d.shippingType}`,
    d.mainLanes?.length && `Main lanes: ${d.mainLanes.join(", ")}`,
    d.weeklyVolume && `Weekly volume: ${d.weeklyVolume}`,
    d.freightType && `Freight type: ${d.freightType}`,
    d.quantity && `Quantity: ${d.quantity}`,
    d.weight && `Weight: ${d.weight}`,
    dims &&
      (dims.length || dims.width || dims.height) &&
      `Dimensions (LxWxH): ${dims.length ?? "?"} x ${dims.width ?? "?"} x ${dims.height ?? "?"}`,
    d.collectionPostcode && `Collection postcode: ${d.collectionPostcode}`,
    d.supplierInvoice?.name && `Supplier invoice attached: ${d.supplierInvoice.name}`,
    d.freightPhoto?.name && `Freight photo attached: ${d.freightPhoto.name}`,
    d.source && `Form source: ${d.source}`,
  ]
    .filter(Boolean)
    .join("\n");

  const leadFields: Record<string, unknown> = {
    Last_Name: lastName,
    First_Name: d.firstName || undefined,
    Company: d.company || "(not provided)",
    Email: d.email,
    Phone: d.phone || undefined,
    Lead_Source: "ITD Website",
    Description: description || undefined,
  };

  const notify = getNotifyEmails();
  const subject = `New website enquiry — ${d.company || d.email}`;

  // Not configured (local dev / before Phase-0 secrets) — never lose the lead.
  if (!isZohoConfigured()) {
    console.warn("[/api/contact] Zoho not configured; lead not persisted:", {
      email: d.email,
      company: d.company,
    });
    const emailed = await emailTeam({ to: notify.leads, subject, rows: d });
    return NextResponse.json({ success: true, persisted: false, fallbackEmailed: emailed }, { status: 201 });
  }

  try {
    const { id } = await createLead(leadFields);
    await emailTeam({ to: notify.leads, subject, rows: { ...d, zohoLeadId: id } });
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error(
      "[/api/contact] Zoho createLead failed:",
      err instanceof Error ? err.message : err,
    );
    // Soft success to the user; email the team so the lead is never lost.
    const emailed = await emailTeam({
      to: notify.leads,
      subject: `⚠ Website enquiry (CRM write failed) — ${d.company || d.email}`,
      intro: "Zoho lead create failed — captured here as a fallback.",
      rows: d,
    });
    return NextResponse.json(
      { success: true, persisted: false, fallbackEmailed: emailed },
      { status: 201 },
    );
  }
}
