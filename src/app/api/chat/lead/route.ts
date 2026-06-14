import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

/**
 * POST /api/chat/lead — capture a lead from the Connexx Assistant chat widget.
 *
 * Inserts into the Supabase `chat_leads` table. Uses the service-role key
 * (server-only) so the write isn't gated on a public RLS insert policy. When
 * Supabase isn't configured (local dev), it logs and returns success so the
 * widget's capture flow still works end-to-end.
 *
 * Required table (run in Supabase SQL editor):
 *   create table if not exists chat_leads (
 *     id uuid primary key default gen_random_uuid(),
 *     session_id text,
 *     name text not null,
 *     email text not null,
 *     company text,
 *     pain text,
 *     transcript jsonb,
 *     source text default 'chat-widget',
 *     created_at timestamptz default now()
 *   );
 */

export const runtime = "nodejs";

const leadSchema = z.object({
  sessionId: z.string().max(64).optional().or(z.literal("")),
  name: z.string().min(1).max(120),
  email: z.string().email(),
  company: z.string().max(160).optional().or(z.literal("")),
  pain: z.string().max(2000).optional().or(z.literal("")),
  transcript: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(8000) }))
    .max(60)
    .optional(),
  consent: z.literal(true, { message: "Consent is required." }),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { sessionId, name, email, company, pain, transcript } = parsed.data;
  const row = {
    session_id: sessionId || null,
    name,
    email,
    company: company || null,
    pain: pain || null,
    transcript: transcript ?? null,
    source: "chat-widget",
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !serviceKey || url.includes("placeholder")) {
    // Not configured yet — don't lose the lead silently; log it for now.
    console.warn("[/api/chat/lead] Supabase not configured; lead not persisted:", {
      name,
      email,
      company,
    });
    return NextResponse.json({ success: true, persisted: false });
  }

  try {
    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
    const { error } = await supabase.from("chat_leads").insert(row);
    if (error) {
      console.error("[/api/chat/lead] insert error:", error.message);
      return NextResponse.json({ error: "Could not save your details" }, { status: 500 });
    }
    return NextResponse.json({ success: true, persisted: true });
  } catch (err) {
    console.error("[/api/chat/lead] unexpected error:", err);
    return NextResponse.json({ error: "Could not save your details" }, { status: 500 });
  }
}
