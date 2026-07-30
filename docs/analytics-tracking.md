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

## GA4 setup — one-time, in the GA4/GTM UI

1. **DELETE the `generate_lead` "Create event" rule** (Admin → Events) that fires on
   `page_view` where `page_path starts with /contact`. **This is what inflated leads
   to ~175** (every contact-page view counted as a lead). After deletion,
   `generate_lead` = real submits only.
2. Mark **`generate_lead`** as a **Key Event**. Unmark `purchase` (no data, unused).
3. Register **custom dimensions** (Admin → Custom definitions, event-scoped):
   `lead_source`, `shipping_type`, `weekly_volume`, `journey`, `intent`.
4. **Fix the double `page_view`:** GTM *and* gtag both load. If GTM also has a GA4
   tag for this property, `page_view` fires twice. Pick one owner — remove GA4 from
   GTM, **or** keep GTM and set the gtag `config` to `send_page_view:false`.
5. **Google Ads:** contact keeps its dataLayer push, so a GTM→Ads conversion still
   works. To count chat leads in Ads too, link GA4↔Ads and import the `generate_lead`
   key event.
6. **Leads report** (Explore): `generate_lead` count × `lead_source`, broken down by
   `shipping_type` / `journey` / `intent`.

## Known gaps (follow-ups)

- **No Consent Mode / cookie banner** — analytics fire unconditionally. For UK/EU
  compliance add a consent banner + GA4 Consent Mode v2 (separate task).
- `LEAD_VALUE_GBP` is `0` (value omitted) until a real average lead value is set.
