# ITD Global — Brand Voice

The reference for how ITD writes. Anchored in the case study quotes from `src/lib/data.ts`, which are the highest-fidelity voice signal currently available.

---

## Who we sound like

A senior operator who has run UK shipping for a decade. They've seen every carrier portal, every customs hold, every WISMO storm at Black Friday. They don't sell; they explain what works and what doesn't. When they recommend something, you take it seriously because they're not hyping anything.

Not: a SaaS marketer. Not: a logistics consultancy. Not: a tech evangelist.

---

## Five voice anchors

### 1. Specific over abstract

Every claim has a number, a name, or a concrete action. Round numbers are suspicious; specific numbers earn trust.

**Yes:** "Documentation preparation dropped from 4 hours to 1 hour per shipment."
**No:** "Significant time savings through automation."

**Yes:** "Connexx connects to Royal Mail for Tracked 24, Tracked 48, Signed, and First/Second Class."
**No:** "Comprehensive Royal Mail integration covering all major services."

### 2. Consequence-led, not feature-led

Lead with what breaks when the problem exists, or what changes when it's fixed. Features come second.

**Yes:** "Customs holds due to paperwork errors dropped 90%."
**No:** "Automated customs documentation."

**Yes:** "Your CS team can't answer 'where's my order' without logging into four different portals."
**No:** "Unified tracking dashboard for customer service teams."

### 3. Operator language

Use the words a logistics manager uses in a Monday meeting. Not the words a marketing agency translates them into.

**They say:** dispatch, manifest, WISMO, out-of-area, surcharge, lane, SLA, child account, POD, EORI, IOSS, HS code
**They don't say:** journey, experience, solution stack, transformation, empowerment

### 4. British commercial English

Spelling: optimise, organise, behaviour, centre, kilometres, programme, recognised, analyse.
Currency: £ (not $ or USD unless the case explicitly references it).
Geography: postcode (not zip), Mainland UK, Highlands & Islands, Channel Islands, BFPO.
Date format: 12 March 2026 (not March 12, 2026).
Punctuation: single quotes for quotation, full stop inside the closing quote only when the quoted sentence ends with the quote.

### 5. Short, declarative, no hedging

Cut "may", "might", "could potentially", "in many cases". Say the thing. If you're not confident enough to say it, cut it.

**Yes:** "We compare every active carrier on every shipment."
**No:** "We aim to provide comprehensive carrier comparison where possible."

---

## Vocabulary — do list

Terms ITD owns and uses confidently:

| Term | When to use |
|---|---|
| Multi-carrier | The product category. Use early and often. |
| Dispatch | The act of sending. "Dispatch decisions", "dispatch team", "dispatch volume". |
| Consolidation | Combining shipments or carrier contracts. |
| Manifest | The list of parcels in a collection. |
| WISMO | Where Is My Order — the customer service ticket type. |
| Out-of-area | Postcodes outside standard delivery zones. UK term. |
| Mainland UK | Excludes Highlands, Islands, Channel Islands, NI. |
| Highlands & Islands | The surcharge zone every UK shipper knows. |
| Fuel surcharge | The variable cost line every carrier adds. |
| Tariff classification | The HS code lookup. |
| EORI / IOSS / HS code | Customs terms. Use without explaining unless on a beginner page. |
| Lane | A shipping route, especially international. "UK to Germany lane". |
| Child account | A sub-account under a parent carrier contract. |
| POD | Proof of delivery. |
| SLA | Service Level Agreement — the carrier's delivery promise. |
| Rate card | The carrier's pricing schedule. |
| Negotiated rates | Better than rack rates. The thing ITD unlocks. |
| Carrier portal | What ITD replaces. |
| Label format | Each carrier has its own. ITD abstracts this. |
| Rate engine | The mechanism that compares carriers in real time. |
| Pre-clearance | Customs work done before goods arrive. |
| Landed cost | Total cost including duty, tax, surcharges. |
| Surcharge zone | Postcodes that cost extra. |

---

## Vocabulary — don't list

These words appear constantly in AI-written copy and immediately make text feel synthetic. They are banned unless used in direct quotation.

**Hard ban:**
delve, robust, seamless, leverage, harness, moreover, furthermore, navigate the complexities, unlock, elevate, empower, ecosystem, transformative, revolutionary, cutting-edge, world-class, best-in-class, game-changer, disrupt, paradigm, synergy, holistic, in today's fast-paced world, in today's digital age, the modern landscape.

**Soft ban — use only with a specific reason:**
journey (unless literally a parcel journey), solution (use "the platform" or "Connexx"), experience (unless literally end-customer experience), comprehensive, end-to-end, streamline, optimise outcomes, drive value, value proposition, mission-critical, scalable.

**Why these matter:** they're the AI-tells that signal copy was generated, not written. They also fail the operator-test — a logistics manager would never use them in conversation.

---

## Sentence rhythm

ITD copy follows a three-beat rhythm at the paragraph level:

**Beat 1 — Setup (short).** The situation, in plain language. Often a fragment or a six-to-twelve word sentence.

**Beat 2 — Evidence (medium).** The specific number, named carrier, named region, named integration that makes Beat 1 real.

**Beat 3 — Consequence (short to medium).** What this means for the reader. Often the action or outcome.

**Example (from Peak Commerce case study, lightly edited):**

> Peak Commerce was managing 8 carriers manually across 12 markets. *(Setup)*
> Each carrier had its own portal, its own label format, its own tracking system, and the operations team spent 3 hours daily reconciling shipments. *(Evidence)*
> Costs were ballooning because no one could compare rates at scale. *(Consequence)*

**Don't:** open with an abstract noun phrase ("The modern eCommerce landscape demands..."), open with a question ("Tired of carrier chaos?"), open with a tricolon ("Faster, cheaper, smarter shipping.").

**Do:** open with the buyer's situation in their language.

---

## Connectors

Use full stops and commas. Use "and" and "but" liberally.

**Avoid as connectors:**
- Em-dashes (—) used to glue clauses together. They're the strongest AI-tell. Use a full stop instead.
- Semi-colons. Almost always replaceable with a full stop and clearer.
- "However" and "thus" at the start of sentences. Use "But" and "So" if you must.

**Example before:**
> Connexx unifies your shipping stack — so you can focus on selling, not dispatching.

**Example after:**
> Connexx unifies your shipping stack. You focus on selling. We handle dispatch.

---

## Numbers and claims

Every number on the site needs to survive a "where did that come from?" question.

**Acceptable sources:**
- Case study results (cite the case study by name)
- ITD platform telemetry ("processing X parcels per month")
- Carrier-published data ("Royal Mail covers every UK postcode")
- Regulatory facts ("EU IOSS applies to consignments under €150")

**Unacceptable:**
- Unsourced industry statistics ("Studies show 73% of shoppers...")
- Made-up benchmarks ("Industry-average savings of 25%")
- Comparative claims without a named comparison ("The fastest", "the cheapest")

If a number can't be sourced, cut it or replace with a directional statement: "in the first quarter" instead of "by 42%".

---

## Pronouns

**You** — the prospect/reader. Always. Even in formal contexts.
**We** — ITD. Not "the ITD team", not "our experts", not "our award-winning platform". Just we.
**Connexx** — the product name. Use it as a proper noun. "Connexx routes...", "Connexx integrates with...". Never "the Connexx platform" twice in a row.

Avoid: "Businesses like yours", "Companies in your sector", "Forward-thinking operators". These are tells.

---

## Tone in different contexts

| Context | Tone shift |
|---|---|
| Hero headline | Declarative, confident, problem-aware. 8-12 words. |
| Pain points | Specific consequence. The reader nods. 20-30 words per point. |
| Features (How Connexx solves it) | What it does, not why it's clever. 20-30 words. |
| Case study | Operator-to-operator. Quote leads. Numbers second. |
| FAQ answer | Direct first sentence (yes/no/the answer is X), then context. 40-60 words. |
| CTA | Action verb + outcome. "Get my rate card", "See how 3PL routing works". |
| Error/empty state | Apologetic but specific. Tell them what to do next. |

---

## What to do when in doubt

1. Read the sentence aloud. If it sounds like a press release, it's wrong.
2. Ask: would a Head of Operations say this in a Slack message? If no, rewrite.
3. Cut the first sentence. The second sentence is usually the real opener.
4. If a paragraph has three adjectives, two are doing nothing. Cut.
5. If a sentence has the word "solution" in it, rewrite with the actual thing it does.

---

## Reference quotes (the gold standard)

These came from real ITD customers and capture the voice we're calibrating to:

> "We went from drowning in carrier portals to having complete control. Connexx didn't just save us money. It gave us back our time."
> — Sarah Chen, Head of Operations, Peak Commerce

> "Every marketplace has different rules. Connexx made them all feel like one system. Our penalty fees went to zero overnight."
> — Marcus Webb, Founder, Velocity Sellers

> "Our accuracy was our biggest vulnerability. Now it's our strongest selling point. We close new clients by showing them the Connexx dashboard."
> — James Thornton, Managing Director, SwiftLog Fulfilment

> "We used to dread regulatory changes. Now the system handles them before we even know they've happened."
> — Anna Kovacs, Export Manager, Meridian Trade Co

> "Knowing the exact duty cost before goods arrive changed how we price everything. No more margin erosion from surprise charges."
> — David Park, Operations Director, Northgate Imports

> "Our dispatch team used to be on the phone all day. Now the system does the routing and they focus on exceptions. It's a completely different operation."
> — Robert Hayes, Supply Chain Director, Atlas Industrial

Notice what these have in common:
- Past-tense problem, present-tense outcome
- Specific numbers or specific tasks ("on the phone all day", "two-week onboarding")
- One feeling word per quote ("drowning", "dread", "vulnerability") and not more
- No marketing language at all

That's the bar.
