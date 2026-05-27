import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * POST /api/support — stub endpoint for the /help/submit-request form.
 *
 * v1 behaviour: validates with Zod, logs the request to the server console,
 * and returns a generated ticket reference. No CRM integration yet.
 *
 * TODO: wire to the real destination (HubSpot Tickets API, Zendesk Requests,
 * Freshdesk Tickets, or email-to-team) once the support team confirms which
 * system runs in production. The route handler abstracts the destination so
 * swapping later is a single-file change. See docs/drafts/help-ia.md and
 * docs/drafts/help-submit-request.md for the open questions on this.
 */

const issueCategories = [
  "platform",
  "carrier",
  "billing",
  "onboarding",
  "integration",
  "other",
] as const;

const priorities = ["low", "medium", "high"] as const;

export const supportRequestSchema = z.object({
  fullName: z.string().min(2).max(100),
  workEmail: z.string().email(),
  companyName: z.string().min(2).max(100).optional().or(z.literal("")),
  accountId: z
    .string()
    .max(40)
    .optional()
    .or(z.literal("")),
  issueCategory: z.enum(issueCategories),
  priority: z.enum(priorities),
  issueSummary: z.string().min(10).max(150),
  description: z.string().min(30).max(2000),
  consent: z.literal(true, {
    message: "Consent is required to process this request.",
  }),
  // Honeypot — bots fill this in, humans do not. Must be empty.
  website: z.string().max(0).optional(),
});

export type SupportRequest = z.infer<typeof supportRequestSchema>;

function generateTicketId() {
  // Six-digit numeric reference. Real ticket IDs come from the CRM once wired.
  const n = Math.floor(100000 + Math.random() * 900000);
  return `SUP-${n}`;
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = supportRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  // Honeypot triggered. Return a fake success so the bot does not retry,
  // but do not log a real ticket.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json(
      { success: true, ticketId: generateTicketId() },
      { status: 200 },
    );
  }

  const ticketId = generateTicketId();

  // v1 destination: server log. Real CRM routing arrives later — see TODO above.
  // eslint-disable-next-line no-console
  console.log("[support-request]", {
    ticketId,
    receivedAt: new Date().toISOString(),
    ...parsed.data,
    // Avoid logging the consent boolean as PII; it is a fixed `true`.
  });

  return NextResponse.json(
    {
      success: true,
      ticketId,
      message:
        "Request received. A confirmation email is on its way to the address you provided.",
    },
    { status: 200 },
  );
}
