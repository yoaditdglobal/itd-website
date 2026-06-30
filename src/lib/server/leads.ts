import { sendMail, isEmailConfigured } from "./email";

/**
 * Small shared helpers for the lead/ticket capture routes: name splitting for
 * Zoho's mandatory Last_Name, HTML escaping, and a last-resort "email the raw
 * submission to the team" so a lead is NEVER lost when the CRM write fails or
 * isn't configured yet.
 */

export function splitName(full: string): { first?: string; last: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { last: parts[0] || "Website lead" };
  return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1]! };
}

export function esc(s: unknown): string {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function tableHtml(rows: Record<string, unknown>): string {
  const cells = Object.entries(rows)
    .filter(([, v]) => v != null && v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => {
      const val = typeof v === "object" ? JSON.stringify(v) : v;
      return `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">${esc(k)}</td><td style="padding:4px 0">${esc(val)}</td></tr>`;
    })
    .join("");
  return `<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">${cells}</table>`;
}

/** Email a submission to the team. Returns true if sent. Never throws. */
export async function emailTeam(opts: {
  to?: string;
  subject: string;
  intro?: string;
  rows: Record<string, unknown>;
}): Promise<boolean> {
  if (!opts.to || !isEmailConfigured()) return false;
  try {
    const html = `${opts.intro ? `<p>${esc(opts.intro)}</p>` : ""}${tableHtml(opts.rows)}`;
    await sendMail({ to: opts.to, subject: opts.subject, html });
    return true;
  } catch {
    return false;
  }
}

/** Confirmation email to a form submitter. Returns true if sent. Never throws. */
export async function emailSubmitter(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  if (!isEmailConfigured()) return false;
  try {
    await sendMail(opts);
    return true;
  } catch {
    return false;
  }
}
