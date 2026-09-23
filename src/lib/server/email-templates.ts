import { esc } from "./leads";

/**
 * Branded HTML emails sent to form submitters. Bulletproof-email rules:
 * tables for layout, inline styles only, no external CSS, PNG images only
 * (Outlook desktop can't render webp — the header logo is a PNG export of
 * the nav wordmark, with alt text for image-blocking clients). Palette
 * mirrors the site: dark #15192b band, cream #faf8f4 body, accent #1d3fb8.
 * Every template also ships a plain-text twin (Resend sends both parts).
 */

const SITE = "https://itdglobal.com";
const LINKEDIN = "https://www.linkedin.com/company/itd-global/";
const LOGO = `${SITE}/brand/email-logo.png`;
const BOOKING =
  "https://bookings.cloud.microsoft/book/ITDGlobal1@NLGITDglobal.onmicrosoft.com/?ismsaljsauthenabled=true";
const FONT = "system-ui,-apple-system,'Segoe UI',Arial,sans-serif";

/** Shared shell: hidden preheader → navy logo band → white card → footer. */
function emailShell({ preheader, body }: { preheader: string; body: string }): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
</head>
<body style="margin:0;padding:0;background-color:#faf8f4">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${esc(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf8f4">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8e4dc">
          <!-- Header band -->
          <tr>
            <td style="background-color:#15192b;padding:22px 32px">
              <a href="${SITE}" style="text-decoration:none">
                <img src="${LOGO}" width="120" height="50" alt="ITD Global" style="display:block;border:0;outline:none;font-family:${FONT};font-size:20px;font-weight:800;color:#ffffff" />
              </a>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;font-family:${FONT};color:#15192b">
${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background-color:#faf8f4;border-top:1px solid #e8e4dc;font-family:${FONT}">
              <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:#8a8f9c">
                ITD Global &middot; 20+ years of logistics &middot; Manchester, UK
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5">
                <a href="${SITE}" style="color:#1d3fb8;text-decoration:none">itdglobal.com</a>
                &nbsp;&middot;&nbsp;
                <a href="${LINKEDIN}" style="color:#1d3fb8;text-decoration:none">LinkedIn</a>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-family:${FONT};font-size:11px;color:#a7abb5">
          You&rsquo;re receiving this because you contacted ITD Global via itdglobal.com.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** One numbered row of the "what happens next" journey. */
function stepRow(n: string, title: string, sub: string, first: boolean): string {
  const border = first ? "" : "border-top:1px solid #f0ede6;";
  return `<tr>
  <td width="44" valign="top" style="${border}padding:14px 0;font-family:${FONT};font-size:20px;font-weight:800;color:#1d3fb8">${n}</td>
  <td valign="top" style="${border}padding:14px 0">
    <p style="margin:0;font-family:${FONT};font-size:15px;font-weight:600;color:#15192b">${title}</p>
    <p style="margin:2px 0 0;font-family:${FONT};font-size:13px;line-height:1.5;color:#6b7080">${sub}</p>
  </td>
</tr>`;
}

/** Label/value row for the "what you sent us" summary. */
function summaryRow(label: string, value: string): string {
  return `<tr>
  <td valign="top" style="padding:4px 16px 4px 0;font-family:${FONT};font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#8a8f9c;white-space:nowrap">${esc(label)}</td>
  <td valign="top" style="padding:4px 0;font-family:${FONT};font-size:14px;font-weight:500;color:#15192b">${esc(value)}</td>
</tr>`;
}

export interface ContactAckFields {
  firstName?: string;
  company?: string;
  shippingType?: string;
  weeklyVolume?: string;
  mainLanes?: string[];
}

const ACK_PREHEADER =
  "We'll come back within one business day with rates for the way you ship.";

const ACK_STEPS: [string, string][] = [
  ["We review the way you ship", "Your volumes, lanes and service needs, against the carrier network."],
  ["An account manager comes back to you", "Within one business day, with what we'd change and why."],
  ["You get rates against your current setup", "Compared like-for-like, so the saving is easy to see."],
];

function ackSummary(d: ContactAckFields): [string, string][] {
  const rows: [string, string][] = [];
  if (d.shippingType?.trim()) rows.push(["Enquiry", d.shippingType.trim()]);
  if (d.company?.trim()) rows.push(["Company", d.company.trim()]);
  if (d.weeklyVolume?.trim()) rows.push(["Weekly volume", d.weeklyVolume.trim()]);
  if (d.mainLanes && d.mainLanes.length > 0) rows.push(["Main lanes", d.mainLanes.join(", ")]);
  return rows;
}

/** Acknowledgement sent to a Contact Sales submitter. */
export function contactAckHtml(d: ContactAckFields): string {
  const hi = d.firstName?.trim() ? `Hi ${esc(d.firstName.trim())},` : "Hi,";
  const what = d.shippingType?.trim()
    ? `Your ${esc(d.shippingType.trim().toLowerCase())} enquiry`
    : "Your enquiry";
  const summary = ackSummary(d);

  const summaryBlock =
    summary.length === 0
      ? ""
      : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;background-color:#faf8f4;border:1px solid #e8e4dc;border-radius:12px">
  <tr>
    <td style="padding:18px 20px">
      <p style="margin:0 0 10px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8a8f9c">What you sent us</p>
      <table role="presentation" cellpadding="0" cellspacing="0">
${summary.map(([l, v]) => summaryRow(l, v)).join("\n")}
      </table>
    </td>
  </tr>
</table>`;

  const body = `              <h1 style="margin:0 0 16px;font-family:${FONT};font-size:25px;line-height:1.25;font-weight:700">We&rsquo;ve got your enquiry</h1>
              <p style="margin:0 0 14px;font-family:${FONT};font-size:15px;line-height:1.6;color:#3d4353">${hi}</p>
              <p style="margin:0;font-family:${FONT};font-size:15px;line-height:1.6;color:#3d4353">
                Thanks for getting in touch with ITD Global. ${what} is with our team now &mdash; here&rsquo;s what happens next:
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0 0">
${ACK_STEPS.map(([t, s], i) => stepRow(`0${i + 1}`, t, s, i === 0)).join("\n")}
              </table>
${summaryBlock}
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 0">
                <tr>
                  <td style="border-radius:9999px;background-color:#1d3fb8">
                    <a href="${SITE}/resources/case-studies" style="display:inline-block;padding:12px 24px;font-family:${FONT};font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:9999px">Read customer stories</a>
                  </td>
                  <td style="padding-left:16px">
                    <a href="${BOOKING}" style="font-family:${FONT};font-size:14px;font-weight:600;color:#1d3fb8;text-decoration:none">Book a call &rarr;</a>
                  </td>
                </tr>
              </table>
              <p style="margin:28px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:#3d4353">
                Speak soon,<br />
                <strong>The ITD Global team</strong>
              </p>`;

  return emailShell({ preheader: ACK_PREHEADER, body });
}

/** Plain-text twin of the acknowledgement (Resend multipart; better deliverability). */
export function contactAckText(d: ContactAckFields): string {
  const hi = d.firstName?.trim() ? `Hi ${d.firstName.trim()},` : "Hi,";
  const what = d.shippingType?.trim()
    ? `Your ${d.shippingType.trim().toLowerCase()} enquiry`
    : "Your enquiry";
  const summary = ackSummary(d);
  return [
    hi,
    "",
    `Thanks for getting in touch with ITD Global. ${what} is with our team now — here's what happens next:`,
    "",
    ...ACK_STEPS.map(([t], i) => `${i + 1}. ${t}`),
    ...(summary.length > 0
      ? ["", "What you sent us:", ...summary.map(([l, v]) => `- ${l}: ${v}`)]
      : []),
    "",
    `Customer stories: ${SITE}/resources/case-studies`,
    `Book a call: ${BOOKING}`,
    "",
    "Speak soon,",
    "The ITD Global team",
    SITE,
  ].join("\n");
}

/** Confirmation sent to a support-request submitter. */
export function supportAckHtml(d: { fullName: string; ticketId: string; issueSummary: string }): string {
  const body = `              <h1 style="margin:0 0 16px;font-family:${FONT};font-size:25px;line-height:1.25;font-weight:700">We&rsquo;ve received your request</h1>
              <p style="margin:0 0 14px;font-family:${FONT};font-size:15px;line-height:1.6;color:#3d4353">Hi ${esc(d.fullName)},</p>
              <p style="margin:0 0 20px;font-family:${FONT};font-size:15px;line-height:1.6;color:#3d4353">
                Thanks for getting in touch with ITD Global support. We&rsquo;ve logged your request and the team will be in touch.
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf8f4;border:1px solid #e8e4dc;border-radius:12px">
                <tr>
                  <td style="padding:18px 20px">
                    <p style="margin:0 0 6px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8a8f9c">Your reference</p>
                    <p style="margin:0 0 12px;font-family:'Courier New',Courier,monospace;font-size:18px;font-weight:700;color:#1d3fb8">${esc(d.ticketId)}</p>
                    <p style="margin:0 0 4px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8a8f9c">Summary</p>
                    <p style="margin:0;font-family:${FONT};font-size:14px;line-height:1.5;color:#15192b">${esc(d.issueSummary)}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:#3d4353">
                &mdash; <strong>ITD Global Support</strong>
              </p>`;

  return emailShell({
    preheader: `Your reference is ${d.ticketId}. The team will be in touch.`,
    body,
  });
}

/** Plain-text twin of the support confirmation. */
export function supportAckText(d: { fullName: string; ticketId: string; issueSummary: string }): string {
  return [
    `Hi ${d.fullName},`,
    "",
    "Thanks for getting in touch with ITD Global support. We've logged your request and the team will be in touch.",
    "",
    `Your reference: ${d.ticketId}`,
    `Summary: ${d.issueSummary}`,
    "",
    "— ITD Global Support",
    SITE,
  ].join("\n");
}
