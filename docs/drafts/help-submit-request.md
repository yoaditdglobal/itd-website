# DRAFT — /help/submit-request

**Status:** Pending review
**Voice check:** No em-dashes as connectors. No ban-list words. British English. Every claim sourceable. Read-aloud test passed.

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Submit a support request \| ITD Global | 39 |
| Meta description | Tell us what's happening and we respond within 1 business day. Platform-down issues are responded to within 1 hour, around the clock. | 132 |
| Canonical | https://itdglobal.com/help/submit-request | — |
| OG image | /og/help-submit-request.png (to be designed) | — |
| Primary keyword target | ITD Global support request, Connexx support contact | — |
| Secondary clusters | Connexx support form, ITD ticket submission | — |

---

## Hero

**H1 (3 words):**
Submit a request

**Sub-headline (40 words):**
Tell us what's happening and we respond within 1 business day. Platform-down issues are responded to within 1 hour, around the clock. Confirmation arrives by email within 5 minutes of submission with a ticket reference for follow-up.

---

## Form

Two-column layout on desktop: form on the left (8 cols), SLA panel on the right (4 cols). Stacked on mobile, form first.

### Field specification

| Field | Label | Type | Required | Validation | Placeholder |
|---|---|---|---|---|---|
| `fullName` | Your name | text | Yes | 2-100 chars | `Jane Patel` |
| `workEmail` | Work email | email | Yes | RFC 5322, no free-mail domains for high-priority | `jane@yourcompany.com` |
| `companyName` | Company name | text | No | 2-100 chars | `Your company` |
| `accountId` | Connexx account ID | text | No | Alphanumeric, 6-20 chars | `e.g. CNX-12345` |
| `issueCategory` | Issue category | select | Yes | Enum (see below) | `Choose one...` |
| `priority` | Priority | select | Yes | Enum (see below) | `Choose one...` |
| `issueSummary` | One-line summary | text | Yes | 10-150 chars | `Shopify orders not syncing since 9am` |
| `description` | What's happening | textarea | Yes | 30-2000 chars | `Tell us what you were doing, what you expected to happen, and what actually happened. Include order IDs, error messages, and screenshots where useful.` |
| `attachments` | Attachments | file | No | Max 10MB per file, 3 files max, PNG/JPG/PDF/CSV/LOG only | (no placeholder) |
| `consent` | Consent | checkbox | Yes | Must be true | `I agree to ITD processing this request under the privacy policy.` |

### Issue category options

- Platform issue (Connexx is down, slow, or behaving unexpectedly)
- Carrier issue (label printing, manifesting, carrier account)
- Billing (invoices, payments, rate cards)
- Onboarding (new account setup, carrier or integration linking)
- Integration (eCommerce platform, ERP, WMS, marketplace)
- Other (anything not in the categories above)

### Priority options

- **Low** — General question, no operational impact (response within 1 business day).
- **Medium** — Operational issue with a workaround (response within 4 business hours).
- **High** — Platform-down with no workaround (response within 1 hour, 24/7).

Note in the form: "High priority is reserved for production-down incidents. We may downgrade non-urgent requests so the team can respond to genuine emergencies first."

### Submit button

**CTA:** `Submit request`

---

## Success state

After successful submission, replace the form with a confirmation card.

**H2:** Request received

**Body (50 words):**
Your ticket reference is **{ticketId}**. A confirmation email is on its way to {workEmail} with the reference number and a summary of what you sent. The team is reviewing your request and will respond within your priority SLA. If you need to add information, reply to the confirmation email.

**CTA:** `Back to Help Centre` → /help/centre

---

## SLA panel (right sidebar)

A static, scannable panel that sits next to the form.

**Heading:** Response times

| Priority | Response within | Hours |
|---|---|---|
| High (platform-down) | 1 hour | 24/7 |
| Medium (operational issue) | 4 business hours | Mon-Fri, 8am-6pm UK |
| Low (general question) | 1 business day | Mon-Fri, 8am-6pm UK |

**Sub-heading:** What "platform-down" means

Plain-text definition (30 words):
A platform-down issue is one where Connexx is not accepting orders, not generating labels, or not routing dispatches. A delay or a single carrier issue is medium priority unless your full operation is blocked.

**Sub-heading:** Before you submit

Three bullet points:
- Check the status page at status.itdglobal.com [confirm URL] for any open incidents.
- Search the Help Centre at /help/centre for existing articles.
- Include your account ID, the action you were taking, the expected result, and the actual result.

---

## FAQ (4 entries)

**How long does ITD support take to respond?**

We respond to high-priority platform-down issues within 1 hour around the clock, medium-priority operational issues within 4 business hours, and low-priority general questions within 1 business day. Confirmation emails are sent within 5 minutes of submission. Enterprise customers with a custom SLA in their contract may have different response times.

**Do you offer phone support?**

[Confirm with user — placeholder answer below.]

Phone support is available for existing customers on a Connexx Pro or Enterprise plan. Submit a request first and a member of the team will call back within the priority SLA. We do not operate a public support line. For platform-down issues, mark the request as high priority and the team will call you.

**What information should I include in a support request?**

Include your Connexx account ID, the action you were taking when the issue occurred, the expected result, the actual result, and the time it started. Add screenshots, error messages, and any order IDs or tracking numbers involved. The more specific the request, the faster the resolution. Vague requests get a clarifying email first, which adds a round-trip.

**Can I escalate a critical issue?**

Yes. Set the priority to High when submitting and the request routes directly to the on-call team, who respond within 1 hour 24/7. If the request is genuinely platform-down for your operation, mark it High even outside business hours. Non-urgent requests submitted as High may be reclassified so the on-call team is available for real emergencies.

---

## JSON-LD

```ts
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Submit a support request",
    "url": "https://itdglobal.com/help/submit-request",
    "description": "Submit a support request to ITD Global. We respond within 1 business day for general questions and within 1 hour for platform-down issues.",
  },
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Help", path: "/help" },
    { name: "Submit a request", path: "/help/submit-request" },
  ]),
  faqSchema([
    { question: "How long does ITD support take to respond?", answer: "We respond to high-priority platform-down issues within 1 hour around the clock, medium-priority operational issues within 4 business hours, and low-priority general questions within 1 business day. Confirmation emails are sent within 5 minutes of submission." },
    { question: "Do you offer phone support?", answer: "Phone support is available for existing customers on a Connexx Pro or Enterprise plan. Submit a request first and a member of the team will call back within the priority SLA. We do not operate a public support line." },
    { question: "What information should I include in a support request?", answer: "Include your Connexx account ID, the action you were taking when the issue occurred, the expected result, the actual result, and the time it started. Add screenshots, error messages, and any order IDs or tracking numbers involved." },
    { question: "Can I escalate a critical issue?", answer: "Yes. Set the priority to High when submitting and the request routes directly to the on-call team, who respond within 1 hour 24/7. If the request is genuinely platform-down for your operation, mark it High even outside business hours." },
  ]),
]} />
```

---

## Implementation notes

1. **New route:** `src/app/help/submit-request/page.tsx`. Read the local Next 16 docs in `node_modules/next/dist/docs/` first (per `AGENTS.md`).
2. **Form submission API route:** `src/app/api/support/route.ts`. POST endpoint. Validates with Zod, forwards to the configured CRM destination.
3. **Validation:** Zod schema matching the field spec table above. Reuse the validation pattern from the rate checker and the lead-capture form.
4. **CRM routing.** Flag for user. Default v1 destination is email-to-team (support@itdglobal.com) if no CRM is configured. Abstract the destination behind a single function `routeSupportRequest()` so swapping HubSpot/Zendesk/Freshdesk later is a one-file change.
5. **File uploads.** Use a presigned URL pattern (S3 or equivalent) so files do not pass through the route handler memory. Strip executable file types. Max 10MB per file, 3 files per request.
6. **Rate limiting.** 1 submission per IP per minute to prevent abuse. Use an existing rate-limit helper if available, otherwise add one.
7. **Honeypot field.** Hidden `website` field that bots fill in and humans don't. Rejected submissions are silent (return 200 with the success state).
8. **Toast pattern.** Reuse from the rate checker. On submit, show a loading state; on success, swap the form for the success card; on error, show the toast with a retry option.
9. **Confirmation email.** Sent via the existing transactional email provider. Template includes the ticket ID, summary, priority, expected response time, and a "reply to this email to add information" line.
10. **High-priority routing.** When priority is High, the route handler also pages the on-call rota (PagerDuty, OpsGenie, or equivalent). Confirm the paging system with the user.
11. **Accessibility.** Every field has an associated `<label>`. Errors are announced via `aria-live`. The form is fully keyboard-navigable. File upload has a text alternative for keyboard users.
12. **Add to sitemap.ts ROUTES.**

---

## Reviewer questions

1. **CRM destination.** HubSpot, Zendesk, Freshdesk, or email-to-team for v1?
2. **SLA wording and tier definitions.** Confirm the response times in the SLA panel.
3. **Phone support.** Confirm whether it is offered and for which plans. Placeholder answer is in the FAQ.
4. **Status page URL.** status.itdglobal.com, or a third-party host?
5. **Max file size and accepted formats.** Proposed: 10MB per file, 3 files max, PNG/JPG/PDF/CSV/LOG. Confirm.
6. **High-priority paging.** Which on-call system gets paged for High requests? PagerDuty, OpsGenie, or a Slack channel?
7. **Free-mail domains.** Should the form reject Gmail/Hotmail/Outlook for High-priority requests, or accept any work-looking email?
8. **Account ID format.** Confirm the format (proposed: `CNX-` prefix + numeric).
