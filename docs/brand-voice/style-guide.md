# ITD Style Guide — Anti-AI Patterns

The hard rules. Every piece of copy on the site passes this checklist before publishing. If a rule breaks, the copy is wrong and gets rewritten — not "fine in context".

Use alongside `brand-voice.md` (the why and the examples). This doc is the what.

---

## Rule 1 — No em-dashes as connectors

**Em-dash (—) is the single strongest AI-tell in commercial copy.** Banned as a clause connector.

| Wrong | Right |
|---|---|
| Connexx unifies your shipping stack — so you can focus on selling. | Connexx unifies your shipping stack. You focus on selling. |
| Multi-carrier shipping — without the chaos. | Multi-carrier shipping, without the chaos. |
| Save money on every parcel — guaranteed. | Save money on every parcel. Guaranteed. |

**Allowed:** em-dashes in parenthetical asides (rare, in long-form only). Even then, prefer parentheses or commas.

**Replace with:** full stop, comma, "and", "but", "so", or just delete the second clause.

---

## Rule 2 — Ban list (hard)

These words are not used on the site. Period. No exceptions. If you find one in a draft, rewrite.

```
delve, robust, seamless, leverage, harness, moreover, furthermore,
unlock, elevate, empower, ecosystem, transformative, revolutionary,
cutting-edge, world-class, best-in-class, game-changer, disrupt,
paradigm, synergy, holistic, navigate the complexities,
in today's fast-paced world, in today's digital age,
the modern landscape, modern businesses, forward-thinking
```

Reason: every word in this list appears in the top-50 most overused terms in LLM-generated marketing copy. Using any of them tells the reader (and AI models indexing the site) that the content is generated.

---

## Rule 3 — Soft ban (use with care)

Allowed if you can defend it. Default to rewriting.

```
journey  → only when literally a parcel journey
solution → use "Connexx", "the platform", or the specific feature
experience → only when literally end-customer experience
comprehensive → cut, or replace with specifics
end-to-end → cut, or describe the actual end points
streamline → use "simplify", "automate", or describe the action
optimise outcomes → say what outcome
drive value → say what value
mission-critical → say why
scalable → "handles 10,000 parcels a day" beats "scalable"
```

---

## Rule 4 — No tricolons

Three-item lists of adjectives or single nouns ("faster, cheaper, smarter") are an AI-tell.

| Wrong | Right |
|---|---|
| Faster, cheaper, smarter shipping. | Cheaper shipping, fewer manual steps. |
| Built for speed, scale, and savings. | Built to dispatch 500 parcels an hour with one operator. |
| Reliable, scalable, secure. | Cut as a sentence. Replace with specifics elsewhere. |

If you need a list, use two items or four. Three is the suspect number.

---

## Rule 5 — Numbers must be sourceable

Every quantitative claim ties to one of:

1. A named case study on the site
2. ITD platform data (footnote: "ITD platform, [month/year]")
3. A carrier's public data
4. A regulator's public data (HMRC, EU Commission, Royal Mail rate card)

**Wrong:** "Studies show 73% of shoppers abandon at checkout due to shipping costs."
**Right:** "In our Peak Commerce case study, shipping costs dropped 42% in the first quarter."

**Wrong:** "Save up to 30%."
**Right:** "Atlas Industrial cut redelivery costs to near zero across 500 weekly pallet shipments." (Then in body: link the case study.)

If no source exists, cut the claim. Don't manufacture credibility.

---

## Rule 6 — British English

Spelling, currency, geography, date format. Every page.

| Wrong | Right |
|---|---|
| optimize | optimise |
| organization | organisation |
| behavior | behaviour |
| center | centre |
| analyze | analyse |
| program (n.) | programme |
| color | colour |
| favorite | favourite |
| zip code | postcode |
| $ | £ |
| March 12, 2026 | 12 March 2026 |
| April 1st | 1 April |
| 5 PM | 5pm |

Exception: keep US spelling inside quoted product names (e.g. "Microsoft Dynamics 365 — Service Center" if that's the official name).

---

## Rule 7 — Pronouns

| Use | Don't use |
|---|---|
| You | Businesses like yours, companies in your sector, organisations |
| We | The ITD team, our experts, our specialists |
| Connexx | The Connexx platform (used twice in a row), our solution |

"You" and "we" are direct. Anything else is corporate filler.

---

## Rule 8 — Sentence rhythm

Three-beat paragraph structure (see `brand-voice.md` for full explanation):

1. **Setup** — short, in the buyer's language
2. **Evidence** — medium, with a specific number/name
3. **Consequence** — short to medium, what it means

Vary sentence length. A paragraph of three 20-word sentences is monotone. Mix six-word sentences with twenty-word sentences.

---

## Rule 9 — Opening sentences

A page or section never opens with:

- A rhetorical question ("Tired of...?", "What if...?", "Have you ever...?")
- An abstract noun phrase ("The modern landscape...", "In an era where...")
- A statistic without context ("73% of...")
- A self-introduction ("Welcome to ITD, the leading...")
- A tricolon ("Faster, cheaper, smarter...")

A page or section opens with:

- A specific situation the reader is in
- A specific number that anchors the claim
- A direct action the reader can take

---

## Rule 10 — CTA verbs

Every CTA is an action verb + a concrete outcome. No "Learn more", no "Get started", no "Discover".

| Wrong | Right |
|---|---|
| Learn more | See how 3PL routing works |
| Get started | Get my rate card |
| Discover Connexx | Run the savings estimator |
| Contact us | Book a 20-minute review |
| Sign up | Create my account |

The outcome answers "what will I have after I click?". If you can't fill in the outcome, cut the CTA.

---

## Rule 11 — Headings

- **H1 (page title)**: 8-12 words. Declarative. Subject + verb + specific outcome or specific problem. No colons.
- **H2 (section heading)**: 3-7 words. Often imperative ("Compare every UK carrier") or noun phrase ("Customs without surprises").
- **H3 (subsection)**: 2-5 words. Noun phrase. Often the specific thing (a feature name, an integration, a stage).

H1 examples (good):
- "Multi-carrier shipping for UK retailers."
- "Customs automation that scales with your export volume."
- "One platform, every UK and EU carrier."

H1 examples (bad):
- "Welcome to Connexx — the future of logistics." (welcome verb, em-dash, ban-list word)
- "Empower your shipping with ITD." (banned word)
- "Discover smarter, faster, cheaper delivery." (CTA verb, tricolon)

---

## Rule 12 — Microcopy

Form labels, button text, placeholder text, error messages, empty states.

- **Form labels**: 1-3 words. Sentence case. "Your work email" not "Email Address (required)".
- **Buttons**: action verb + outcome (Rule 10).
- **Placeholders**: example values, not instructions. "name@yourcompany.com" not "Please enter your email".
- **Errors**: tell the user what to fix and how. "We need an email so we can send your rate card. Try a work address." not "Invalid input."
- **Empty states**: tell the user the next action. "No saved rate cards yet. Run the estimator to save one." not "Nothing here."

---

## Rule 13 — Lists

- **Bulleted lists** are for parallel items only. If the items aren't truly parallel, use prose.
- **Numbered lists** are for sequences (steps, ranked options). Not for unordered items.
- **Tables** are for comparisons (two or more dimensions). Use them aggressively for GEO — AI models love structured tables.
- **Three items per bulleted list is suspect** (Rule 4). Two or four is safer.

---

## Rule 14 — FAQ format

Every FAQ entry follows this structure (it's what AI models extract and quote):

```markdown
**Question in the buyer's exact phrasing?**

Direct answer in the first sentence. Yes, no, or the specific answer.

Context sentence with the named entity, the number, or the caveat.

Closing sentence with the next action or the relevant link.
```

Word count: 40-80 per answer. Longer means the AI model won't quote it; shorter means it's not useful.

---

## Rule 15 — Read-aloud test

Before any page ships, read it aloud to yourself. Out loud, not in your head.

Flags that mean rewrite:

- You stumble. (Sentence too long, rewrite.)
- You hear an AI voice in your head. (Voice off, rewrite.)
- You'd never say this in a real conversation. (Tone wrong, rewrite.)
- You can't tell what the page is actually about by the end. (Buried lead, rewrite.)

Pass: you sound like yourself, talking to someone you respect.

---

## Quick checklist (paste at top of every draft)

```
- [ ] Zero em-dashes used as connectors
- [ ] Zero ban-list words
- [ ] Every number has a source
- [ ] British spellings throughout
- [ ] "You" and "we" only (no "businesses like yours")
- [ ] Opens with situation/number/action, not abstract or rhetorical
- [ ] CTAs are verb + outcome
- [ ] Read aloud and sounds human
```

---

## Rule 16 — Typography utilities (locked)

Every text element on the site uses one of these utility classes (defined in `src/app/globals.css`). Combine with colour utilities (`text-text-primary`, `text-text-secondary`, `text-accent`, `text-accent-dark`, etc.) — colour stays orthogonal to size and weight.

| Token | Use |
|---|---|
| `.text-display-xl` | Page H1, hero |
| `.text-display-lg` | Section H2 |
| `.text-display-md` | Subsection H3 |
| `.text-heading-lg` | Large card title, modal title |
| `.text-heading-md` | Medium card title |
| `.text-heading-sm` | Small card title, FAQ question, list-item heading |
| `.text-body-lg` | Hero subhead, intro paragraph |
| `.text-body-md` | Default running paragraph |
| `.text-body-sm` | Supporting paragraph, table cell |
| `.text-label` | Form labels |
| `.text-eyebrow` | UPPERCASE section labels above headings, table headers |
| `.text-caption` | Meta text, timestamps |
| `.text-micro` | Status pills, badges, micro labels |
| `.text-stat-xl` | Hero dashboard metric, case study big number |
| `.text-stat-lg` | Card stat |

**Never set `text-xs` / `text-sm` / `text-base` / `font-bold` etc. directly outside one of these utilities.** If a new use case can't fit one of the tokens above, extend the system in `globals.css` first.

Example:

```tsx
// ❌ Wrong — direct Tailwind utilities, no semantic meaning
<h2 className="text-2xl font-bold tracking-tight text-text-primary">...</h2>

// ✅ Right — semantic class + orthogonal colour
<h2 className="text-display-lg text-text-primary">...</h2>
```

