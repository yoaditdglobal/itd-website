# Analytics & lead tracking — measurement spec

GA4 property `G-V31LJTEG1R` (also GTM container `GTM-M6QJM8F6`). This is the single
source of truth for what the site tracks and how leads are counted.

## The one conversion: `generate_lead`

Both the **contact form** and the **chat widget** fire a single GA4 event —
`generate_lead` — **only on a confirmed successful submit** (after the API returns
`ok`). Same event name + schema from both, so GA4 aggregates them as **one
conversion**. This is the event to mark as your **Key Event**.

| param | example | notes |
|---|---|---|
| `lead_source` | `contact_form` \| `chat` | which surface produced the lead |
| `form_name` | `contact_sales` | contact form only |
| `shipping_type` | `Export`, `Air Freight`… | contact form |
| `weekly_volume` | `250` | contact form (freight sends quantity) |
| `journey` | `ecommerce`, `3pl`… | chat — ICP journey |
| `intent` | `hot` \| `warm` \| `cold` | chat — intent grade |
| `value` + `currency` | `50`, `GBP` | optional; set `LEAD_VALUE_GBP` in `src/lib/analytics.ts` to enable value-based reporting/bidding |

Code: `src/lib/analytics.ts` owns the schema (`LEAD_EVENT`, `leadParams`, `track`,
`trackLead`). Contact fires via the **GTM dataLayer** (`ContactForm.tsx`); chat fires
via **gtag** (`ChatWidget.tsx`). A "lead" = a **Zoho CRM Lead** (contact → `Lead_Source
"ITD Website"` via Make webhook; chat → `"Chat"` direct). GA events are decoupled
client signals — the CRM is the system of record.

## Funnel diagnostics (engagement, NOT conversions — do not mark as Key Events)

`chat_open`, `chat_guided_start`, `chat_step {step, answer}`, `chat_qualified
{journey, intent}`, `chat_ask_start`, `chat_talk_to_person`, `chat_booking_open`,
`chat_existing_customer`, `chat_resume`, `chat_delete_conversation`, `chat_message`,
`chat_proactive_shown`.

## Link & CTA clicks: `cta_click`

`LinkClickTracker.tsx`, mounted once in `SiteChrome`, uses a single delegated
capture-phase listener on `document`. Every anchor click on the site is captured, so
no component needs instrumenting and new CTAs are covered automatically. In-page
anchors (`#…`), `mailto:` and `tel:` are ignored.

| param | example | notes |
|---|---|---|
| `link_text` | `Contact Us` | visible label, whitespace-collapsed, capped at 100 chars |
| `link_url` | `/solutions/3pl` | internal path + query, or `host + path` when external |
| `link_location` | `nav` \| `footer` \| `closing_cta` \| `body` | read from the nearest `data-analytics-location` ancestor, else by element ancestry |
| `is_lead_cta` | `true` | link points at `/contact` |
| `page_path` | `/shipping/domestic` | the page the click happened **on** |

A section can name its own location by setting `data-analytics-location="…"` on a
wrapper. `ClosingCTA` already does this. This is what powers "which pages send people
to Contact Sales" and click-through on the Shipping and Solutions nav.

## Booking: `booking_view` (and why there is no `booking_complete`)

The Microsoft Bookings embed on `/contact` is a **cross-origin iframe** pointing at
`outlook.office.com`. Nothing inside it is readable from the page, so a completed
booking **cannot** be tracked in GA4 — no event, no callback, no postMessage. Do not
add a "Meetings Booked" tile to any dashboard sourced from GA4.

What exists instead: `booking_view` fires once per page view when the embed is at
least 50% on screen, via IntersectionObserver. Treat it as **intent**, not outcome.
**Booked-meeting counts must come from Outlook**, which is the system of record.

Note `chat_booking_open` is also intent only — it fires when the chat *shows* a
booking card, not when anyone books.

## GA4 setup — state as of 30 Jul 2026

1. ~~Delete the `generate_lead` "Create event" rule~~ — **verified gone.** Admin →
   Events → Custom configurations shows no custom events and no modifications on the
   `itdglobal` stream. Loading `/contact` without submitting pushes only
   `gtm.js`, `js`, `config`, `gtm.dom`, `gtm.load`.
2. **`generate_lead` is marked as a Key Event.** `purchase` is still marked and has no
   data — unmark it so "Key events" equals leads.
3. **Custom dimensions registered** (Admin → Custom definitions, event-scoped):
   `form_name`, `shipping_type`, `weekly_volume` (23 Jul); `lead_source`, `link_text`,
   `link_url`, `link_location`, `is_lead_cta` (30 Jul). Still to add if chat volume
   justifies it: `journey`, `intent`.
4. ~~Double `page_view`~~ — **not happening.** A single `/g/collect` request with
   `en=page_view` fires per load. GTM's Google Tag is the only owner of gtag.
5. **GTM:** the `generate_lead` GA4 tag fires on the `CE - generate_lead` custom event
   trigger and passes `form_name`, `shipping_type`, `weekly_volume`, `lead_source`
   (added in version 5, 30 Jul). `cta_click` and `booking_view` bypass GTM entirely —
   they go direct via gtag, so no container change is needed for them.
6. **Google Ads:** contact keeps its dataLayer push, so a GTM→Ads conversion still
   works. To count chat leads in Ads too, link GA4↔Ads and import the `generate_lead`
   key event.

## Data quality: the 30 July 2026 cutoff

**GA4 lead data before 30 Jul 2026 is inflated and must not be used as a baseline.**
In the 28 days to 29 Jul, GA4 recorded 169 `generate_lead` events from 68 users
(2.49 each) against only 131 `form_start` events. More submissions than form starts is
impossible. Clean tracking landed 30 Jul (`a82c7a9`); the correct dataLayer push
landed 23 Jul (`7bd5238`). Any report should start its date range at 30 Jul 2026.

## Known gaps (follow-ups)

- **No Consent Mode / cookie banner** — analytics fire unconditionally. For UK/EU
  compliance add a consent banner + GA4 Consent Mode v2 (separate task).
- `LEAD_VALUE_GBP` is `0` (value omitted) until a real average lead value is set.
- **Booked meetings are not measurable in GA4** (see above). Counting them needs a
  pull from Outlook, or replacing the iframe with a flow that returns to a
  confirmation page on this domain.
- Nav dropdown *opens* (Shipping, Solutions) are not tracked, only the link clicks
  inside them. Add if open-rate vs click-rate becomes a question.
