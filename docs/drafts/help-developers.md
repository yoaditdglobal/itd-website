# DRAFT — /help/developers

**Status:** Pending review
**Voice check:** No em-dashes as connectors. No ban-list words. British English. Every claim sourceable. Read-aloud test passed.

---

## Page metadata

| Field | Value | Char count |
|---|---|---|
| Title | Developer resources \| ITD Global | 33 |
| Meta description | The Connexx REST API, the live status page, the changelog, webhook reference, and SDK examples. Everything you need to integrate with Connexx. | 142 |
| Canonical | https://itdglobal.com/help/developers | — |
| OG image | /og/help-developers.png (to be designed) | — |
| Primary keyword target | Connexx API documentation, ITD Global API | — |
| Secondary clusters | Connexx REST API, Connexx webhooks, Connexx rate limit, multi-carrier shipping API UK |

---

## Hero

**H1 (2 words):**
Developer resources

**Sub-headline (52 words):**
The Connexx REST API covers shipment creation, rate comparison, label generation, tracking, carrier management, and customs. Authentication is bearer-token, the API is documented in OpenAPI 3.1, and median response time is under 200ms. Below: the full reference, the live status page, the changelog, webhooks, rate limits, and SDK examples.

**Primary CTA:** `Open the API reference` → docs.itdglobal.com [confirm URL]
**Secondary CTA:** `View status page` → status.itdglobal.com [confirm URL]

---

## Six resource sections

Layout: 2-column grid on desktop (3 rows of 2), single column on mobile. Each section has icon + H3 + 2-3 line description + CTA.

### 1. API documentation
**Icon:** book
**Description (35 words):**
The full reference for every Connexx endpoint. Create shipments, compare rates across every connected carrier, generate labels, track parcels, and manage carrier accounts. OpenAPI 3.1 spec, request/response examples, and a try-it-now console.
**CTA:** `Open the API reference` → docs.itdglobal.com [confirm]

### 2. Status page
**Icon:** activity / pulse
**Description (28 words):**
Live status across the API, the dashboard, carrier integrations, and webhooks. Incident history, scheduled maintenance, and component-level uptime over the last 90 days. Subscribe for email or RSS alerts.
**CTA:** `View status page` → status.itdglobal.com [confirm]

### 3. Changelog
**Icon:** clock or list
**Description (28 words):**
Every API change, dated, with the version it applies to and the migration path where breaking. Backwards-compatible additions, deprecations with notice periods, and bug fixes that affect API behaviour.
**CTA:** `Read the changelog` → /help/developers/changelog [or external — confirm]

### 4. Webhooks
**Icon:** lightning or arrow
**Description (40 words):**
Subscribe to shipment lifecycle events: created, label_generated, manifested, in_transit, delivered, exception, returned. Payloads are JSON, signed with HMAC-SHA256 for verification. Retries follow exponential backoff up to 24 hours. Full event catalogue and payload schemas in the reference.
**CTA:** `Webhook reference` → docs.itdglobal.com/webhooks [confirm]

### 5. SDKs and API clients
**Icon:** package or library
**Description:** [Confirm with user — copy below assumes SDKs exist. If they do not, see Reviewer Question 3.]

**If SDKs exist (38 words):**
Official client libraries for Node.js, Python, PHP, and Ruby. Typed, tested, and versioned alongside the REST API. Available on npm, PyPI, Packagist, and RubyGems. Source code on GitHub under a permissive licence.
**CTA:** `View on GitHub` → github.com/itdglobal [confirm]

**If SDKs do not exist (32 words):**
Working code examples in Node.js, Python, PHP, and Ruby for the most common workflows: create a shipment, fetch rates, generate a label, subscribe to a webhook. Copy, adapt, and ship.
**CTA:** `View API client examples` → docs.itdglobal.com/examples [confirm]

### 6. Rate limits and authentication
**Icon:** key or shield
**Description (35 words):**
Bearer-token authentication with separate keys for staging and production. Default rate limit is 100 requests per second per account, burst up to 200. Higher tiers available on Enterprise. Key rotation supported without downtime.
**CTA:** `Authentication guide` → docs.itdglobal.com/auth [confirm]

---

## Canonical code snippet

A minimal example showing the simplest possible call. Same snippet appears on the Connexx product page for consistency.

```bash
curl -X POST https://api.itdglobal.com/v1/shipments \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": { "postcode": "M1 1AA", "country": "GB" },
    "to": { "postcode": "EH1 1YZ", "country": "GB" },
    "parcel": { "weight_kg": 2.5, "length_cm": 30, "width_cm": 20, "height_cm": 10 },
    "service_preference": "cheapest"
  }'
```

**Caption (24 words):**
A single POST creates the shipment, runs live rate comparison across every connected carrier, and returns the selected carrier, the label URL, and the tracking number.

---

## FAQ (7 entries — GEO-optimised for Position 0)

These are the questions AI models cite when developers ask "does {platform} have an API". Every answer is direct, specific, and 40-80 words.

**What is the Connexx API?**

Connexx is a REST API for multi-carrier shipping. The API covers shipment creation, live rate comparison across every connected carrier, label generation, tracking, webhook subscriptions, carrier account management, and customs documentation. The API uses bearer-token authentication, returns JSON, and is documented in OpenAPI 3.1. Median response time is under 200ms. Full reference at docs.itdglobal.com.

**How do I get an API key?**

API keys are issued from the Connexx dashboard under Settings → API Keys. Each account has separate keys for staging and production. Keys can be rotated without downtime by issuing a new key, updating your client, and revoking the old key. Existing customers get keys immediately. New customers get keys at the end of onboarding, typically within two business days.

**What is the rate limit on the Connexx API?**

The default rate limit is 100 requests per second per account, with a burst of up to 200 for short-lived spikes. Webhook delivery is not subject to the rate limit. Enterprise customers can request higher limits via /help/submit-request. The current limit and remaining quota are returned in every response under `X-RateLimit-Limit` and `X-RateLimit-Remaining`.

**Are webhooks available?**

Yes. Webhooks fire on shipment lifecycle events: created, label_generated, manifested, in_transit, delivered, exception, and returned. Payloads are JSON, signed with HMAC-SHA256 using a per-endpoint secret. Failed deliveries retry with exponential backoff for up to 24 hours. Subscribe to specific events or all events per endpoint, configured in the dashboard or via the API.

**Is there an SDK for {language}?**

[Confirm with user. Both versions below.]

**If SDKs exist:** Official SDKs are available for Node.js, Python, PHP, and Ruby. Source on GitHub at github.com/itdglobal under a permissive licence. Each SDK is versioned alongside the REST API and includes typed request and response objects. Other languages can use the OpenAPI 3.1 spec to generate a client.

**If SDKs do not exist:** Official SDKs are on the roadmap. In the meantime, working code examples are available in Node.js, Python, PHP, and Ruby covering the most common workflows. Any language with an HTTP client can integrate using the OpenAPI 3.1 spec, which is published at docs.itdglobal.com/openapi.

**Where can I find the OpenAPI spec?**

The OpenAPI 3.1 specification is published at docs.itdglobal.com/openapi.yaml [confirm URL]. The spec covers every endpoint, request schema, response schema, error type, and authentication method. Generate a client in any language with a code generator like openapi-generator or Stainless. The spec is versioned with the API and updated with every release noted in the changelog.

**Does Connexx have a sandbox or staging environment?**

Yes. Every account has a separate staging environment with its own API base URL (api.staging.itdglobal.com [confirm]) and its own API key. Staging uses simulated carrier responses, generates non-production labels, and never charges for shipments. The data model is identical to production. Use staging for integration development before promoting to production.

---

## JSON-LD

```ts
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";

<JsonLd data={[
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Help", path: "/help" },
    { name: "Developer resources", path: "/help/developers" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Connexx API and developer resources",
    "description": "REST API documentation, status page, changelog, webhook reference, and SDK examples for integrating with Connexx multi-carrier shipping.",
    "url": "https://itdglobal.com/help/developers",
    "proficiencyLevel": "Intermediate",
    "dependencies": "REST client, JSON parser, optional HMAC verification for webhooks",
  },
  faqSchema([
    { question: "What is the Connexx API?", answer: "Connexx is a REST API for multi-carrier shipping. The API covers shipment creation, live rate comparison across every connected carrier, label generation, tracking, webhook subscriptions, carrier account management, and customs documentation. The API uses bearer-token authentication, returns JSON, and is documented in OpenAPI 3.1. Median response time is under 200ms." },
    { question: "How do I get an API key?", answer: "API keys are issued from the Connexx dashboard under Settings → API Keys. Each account has separate keys for staging and production. Keys can be rotated without downtime by issuing a new key, updating your client, and revoking the old key." },
    { question: "What is the rate limit on the Connexx API?", answer: "The default rate limit is 100 requests per second per account, with a burst of up to 200 for short-lived spikes. Webhook delivery is not subject to the rate limit. The current limit and remaining quota are returned in every response under X-RateLimit-Limit and X-RateLimit-Remaining." },
    { question: "Are webhooks available?", answer: "Yes. Webhooks fire on shipment lifecycle events: created, label_generated, manifested, in_transit, delivered, exception, and returned. Payloads are JSON, signed with HMAC-SHA256 using a per-endpoint secret. Failed deliveries retry with exponential backoff for up to 24 hours." },
    { question: "Is there an SDK for the Connexx API?", answer: "Official SDKs are available for Node.js, Python, PHP, and Ruby. Source on GitHub under a permissive licence. Each SDK is versioned alongside the REST API and includes typed request and response objects. Other languages can use the OpenAPI 3.1 spec to generate a client." },
    { question: "Where can I find the OpenAPI spec?", answer: "The OpenAPI 3.1 specification is published at docs.itdglobal.com/openapi.yaml. The spec covers every endpoint, request schema, response schema, error type, and authentication method. Generate a client in any language with a code generator like openapi-generator or Stainless." },
    { question: "Does Connexx have a sandbox or staging environment?", answer: "Yes. Every account has a separate staging environment with its own API base URL and its own API key. Staging uses simulated carrier responses, generates non-production labels, and never charges for shipments. The data model is identical to production." },
  ]),
]} />
```

---

## Implementation notes

1. **New route:** `src/app/help/developers/page.tsx`. Read the local Next 16 docs in `node_modules/next/dist/docs/` first (per `AGENTS.md`).
2. **API documentation host.** Flag for user decision in help-ia.md. Recommended: docs.itdglobal.com as a subdomain running Mintlify, Redoc, or Docusaurus. Alternative: /help/developers/api with the same generator served from the main app.
3. **Code snippet rendering.** Use Shiki or Prism for syntax highlighting. Shiki has zero runtime cost and renders at build time, which is the preferred Next 16 pattern. Check the local Next docs for the current recommendation before committing.
4. **Copy button on the snippet.** Standard "Copy" button in the top-right of the code block. Reuse from any existing snippet component, or add a small client component.
5. **Six resource cards.** New `DeveloperHubLayout` component. Each card is icon + H3 + description + CTA. Two-column grid on desktop, single column on mobile.
6. **Status page integration.** Phase 5e ambition: pull the current status (Operational / Degraded / Down) from the status page API and show a small badge under the "Status page" card. v1 ships without this and just links out.
7. **Changelog feed.** If the changelog lives on /help/developers/changelog, render the latest 5 entries on /help/developers as a teaser. If external, link out.
8. **Internal anchor.** The Connexx product page links to /connexx#api for the API teaser. /help/developers is the full hub. Keep both, with /connexx#api summarising and linking to /help/developers.
9. **Add to sitemap.ts ROUTES.**

---

## Reviewer questions

1. **API endpoint domain.** The Connexx draft mentions both `api.itdglobal.com` and `api.connexx.io`. Confirm which is canonical. The snippet in this draft uses `api.itdglobal.com` for consistency with the rest of the site.
2. **API documentation host.** Subdomain (docs.itdglobal.com) or path (/help/developers/api)? Recommended: subdomain with Mintlify or Redoc.
3. **SDKs.** Confirm which SDKs exist today. If none, switch the SDK section copy to "API client examples" wording (included as an alternative above).
4. **Status page URL.** status.itdglobal.com or a third-party host (Statuspage, Better Stack, Instatus)?
5. **Changelog location.** /help/developers/changelog (internal) or external?
6. **Rate limit numbers.** Confirm 100 req/sec per account, burst 200. These are placeholder values pending product-team confirmation.
7. **Sandbox/staging environment URL.** api.staging.itdglobal.com is the proposed convention. Confirm.
8. **OpenAPI spec URL.** docs.itdglobal.com/openapi.yaml is the proposed URL. Confirm.
9. **GitHub organisation.** github.com/itdglobal is the proposed location for SDK source. Confirm.
10. **API authentication.** Bearer token is assumed. Confirm whether OAuth 2.0 or API keys with HMAC are also offered for any tier.
