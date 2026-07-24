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

function tableHtml(rows: Record<string, unknown>, opts?: { keepEmpty?: boolean }): string {
  const cells = Object.entries(rows)
    .filter(
      ([, v]) =>
        opts?.keepEmpty ||
        (v != null && v !== "" && !(Array.isArray(v) && v.length === 0)),
    )
    .map(([k, v]) => {
      const empty = v == null || v === "" || (Array.isArray(v) && v.length === 0);
      const val = empty ? "—" : typeof v === "object" ? JSON.stringify(v) : v;
      return `<tr><td style="padding:6px 16px 6px 0;font-weight:600;vertical-align:top;white-space:nowrap;border-bottom:1px solid #ececec">${esc(k)}</td><td style="padding:6px 0;border-bottom:1px solid #ececec;${empty ? "color:#9aa0ab" : ""}">${esc(val)}</td></tr>`;
    })
    .join("");
  return `<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;width:100%;max-width:640px">${cells}</table>`;
}

/** Email a submission to the team. Returns true if sent. Never throws. */
export async function emailTeam(opts: {
  to?: string;
  cc?: string;
  /** Submitter's address — team hits Reply and answers the lead directly. */
  replyTo?: string;
  subject: string;
  /** Large one-line headline rendered above the table. */
  heading?: string;
  intro?: string;
  rows: Record<string, unknown>;
  /** Render every row, showing "—" for blanks (constant table shape). */
  keepEmptyRows?: boolean;
  attachments?: import("@/lib/server/email").MailAttachment[];
}): Promise<boolean> {
  if (!opts.to || !isEmailConfigured()) return false;
  try {
    const html = [
      opts.heading
        ? `<h2 style="margin:0 0 4px;font-family:system-ui,sans-serif;font-size:20px;line-height:1.3;color:#15192b">${esc(opts.heading)}</h2>`
        : "",
      opts.intro
        ? `<p style="margin:0 0 12px;font-family:system-ui,sans-serif;font-size:14px;color:#4b5160">${esc(opts.intro)}</p>`
        : "",
      opts.heading && !opts.intro ? `<div style="height:12px"></div>` : "",
      tableHtml(opts.rows, { keepEmpty: opts.keepEmptyRows }),
    ].join("");
    await sendMail({
      to: opts.to,
      cc: opts.cc,
      replyTo: opts.replyTo,
      subject: opts.subject,
      html,
      attachments: opts.attachments,
    });
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
