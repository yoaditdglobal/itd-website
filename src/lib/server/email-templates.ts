import { esc } from "./leads";

/**
 * Branded HTML emails sent to form submitters. Bulletproof-email rules:
 * tables for layout, inline styles only, no external CSS, no webp images
 * (Outlook desktop can't render webp — the header uses a styled wordmark
 * instead of the logo asset). Palette mirrors the site: dark #15192b band,
 * cream #faf8f4 body, accent #1d3fb8.
 */

const SITE = "https://itdglobal.com";
const LINKEDIN = "https://www.linkedin.com/company/itd-global/";

/** Acknowledgement sent to a Contact Sales submitter. */
export function contactAckHtml({ firstName }: { firstName?: string }): string {
  const hi = firstName?.trim() ? `Hi ${esc(firstName.trim())},` : "Hi,";
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background-color:#faf8f4">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf8f4">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8e4dc">
          <!-- Header band -->
          <tr>
            <td style="background-color:#15192b;padding:24px 32px">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;letter-spacing:0.5px;color:#2bb8b3">ITD</span>
              <span style="font-family:Georgia,serif;font-style:italic;font-size:16px;color:#f2c94c">&nbsp;Global</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;color:#15192b">
              <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;font-weight:700">We&rsquo;ve got your enquiry</h1>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#3d4353">${hi}</p>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#3d4353">
                Thanks for getting in touch with ITD Global. Your enquiry is with our team now.
                An account manager will come back to you <strong>within one business day</strong>
                with what the carrier network can do on price for the way you ship.
              </p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3d4353">
                In the meantime, see how businesses like yours ship with us:
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:9999px;background-color:#1d3fb8">
                    <a href="${SITE}/resources/case-studies" style="display:inline-block;padding:12px 24px;font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:9999px">Read customer stories</a>
                  </td>
                </tr>
              </table>
              <p style="margin:28px 0 0;font-size:15px;line-height:1.6;color:#3d4353">
                Speak soon,<br />
                <strong>The ITD Global team</strong>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background-color:#faf8f4;border-top:1px solid #e8e4dc;font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif">
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
        <p style="margin:16px 0 0;font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;font-size:11px;color:#a7abb5">
          You&rsquo;re receiving this because you contacted ITD Global via itdglobal.com.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
