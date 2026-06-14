// Guided lead-qualification funnel for the ITD Global chat widget.
//
// PURE data + logic — no React, no server-only imports — so the exact same
// routing runs in the widget (to show a tailored outcome) AND in the
// /api/chat/lead route (which recomputes routing it can trust rather than
// believing a client-stamped value).
//
// Mirrors SPEC_website-chat-funnel.md: the decision tree (§2), the routing
// priority order (§4), and the five ICP journeys (§1). Volume bands are WEEKLY
// (the unit reconciliation in §3 — matches the existing /contact form).

// ── Answer vocabulary (controlled) ──
export type ProductType = "parcels" | "freight" | "both";
export type Direction = "domestic" | "international" | "both";
export type TradeDirection = "export" | "import" | "both";
export type Lane = "uk-eu" | "uk-us" | "uk-row" | "china-uk" | "other";
export type VolumeBand = "u150" | "150-500" | "500-1000" | "1000-5000" | "5000+";
export type Segment =
  | "ecommerce"
  | "marketplace"
  | "3pl"
  | "retail-b2b"
  | "manufacturer"
  | "other";

export interface FunnelAnswers {
  productType?: ProductType;
  direction?: Direction;
  tradeDirection?: TradeDirection;
  lanes?: Lane[];
  volumeBand?: VolumeBand;
  segment?: Segment;
}

// ── Step config (the decision-tree cards the widget renders) ──
export type StepId = "product" | "direction" | "trade" | "lanes" | "volume" | "segment";

export interface Choice {
  label: string;
  value: string;
}
export interface StepConfig {
  id: StepId;
  question: string;
  choices: Choice[];
  multi?: boolean;
  skippable?: boolean;
}

export const STEPS: Record<StepId, StepConfig> = {
  product: {
    id: "product",
    question: "First up — what are you shipping?",
    choices: [
      { label: "Parcels", value: "parcels" },
      { label: "Freight (pallets & containers)", value: "freight" },
      { label: "Both", value: "both" },
    ],
  },
  direction: {
    id: "direction",
    question: "And where does it go?",
    choices: [
      { label: "UK domestic", value: "domestic" },
      { label: "International", value: "international" },
      { label: "Both", value: "both" },
    ],
  },
  trade: {
    id: "trade",
    question: "Which way does it move?",
    choices: [
      { label: "Export (UK → overseas)", value: "export" },
      { label: "Import (overseas → UK)", value: "import" },
      { label: "Both", value: "both" },
    ],
  },
  lanes: {
    id: "lanes",
    question: "Your main lanes? Pick any that apply.",
    multi: true,
    skippable: true,
    choices: [
      { label: "UK ↔ EU", value: "uk-eu" },
      { label: "UK → US", value: "uk-us" },
      { label: "UK → rest of world", value: "uk-row" },
      { label: "China / Far East → UK", value: "china-uk" },
      { label: "Other", value: "other" },
    ],
  },
  volume: {
    id: "volume",
    question: "Roughly how much do you ship a week?",
    choices: [
      { label: "Under 150", value: "u150" },
      { label: "150–500", value: "150-500" },
      { label: "500–1,000", value: "500-1000" },
      { label: "1,000–5,000", value: "1000-5000" },
      { label: "5,000+", value: "5000+" },
    ],
  },
  segment: {
    id: "segment",
    question: "Last one — what best describes you?",
    skippable: true,
    choices: [
      { label: "eCommerce store", value: "ecommerce" },
      { label: "Marketplace seller", value: "marketplace" },
      { label: "3PL / fulfilment", value: "3pl" },
      { label: "Retailer or B2B brand", value: "retail-b2b" },
      { label: "Manufacturer / wholesaler", value: "manufacturer" },
      { label: "Other", value: "other" },
    ],
  },
};

export const FIRST_STEP: StepId = "product";

const isIntl = (d?: Direction) => d === "international" || d === "both";

/**
 * The ordered step path for the current answers. Branching (SPEC §2): the
 * trade-direction and lanes steps appear only when shipping International or
 * Both — so a domestic-parcels visitor reaches the minimum viable qualification
 * (product + direction + volume) in three taps.
 */
export function stepPath(a: FunnelAnswers): StepId[] {
  const path: StepId[] = ["product", "direction"];
  if (isIntl(a.direction)) path.push("trade", "lanes");
  path.push("volume", "segment");
  return path;
}

/** Next step after `current` given answers so far, or null when complete. */
export function nextStep(current: StepId, a: FunnelAnswers): StepId | null {
  const path = stepPath(a);
  const i = path.indexOf(current);
  if (i === -1 || i === path.length - 1) return null;
  return path[i + 1];
}

/** Human-readable label for a chosen value, for the chat transcript bubbles. */
export function choiceLabel(stepId: StepId, value: string): string {
  return STEPS[stepId].choices.find((c) => c.value === value)?.label ?? value;
}

// ── Routing (SPEC §4 — priority order; first match wins) ──
export type IntentGrade = "hot" | "warm";

export interface RoutingResult {
  icpJourney: 1 | 2 | 3 | 4 | 5;
  journeyName: string;
  routeTo: string;
  intentGrade: IntentGrade;
  /** Tailored one-liner shown before we ask for any contact details (SPEC §6). */
  outcome: string;
  /** Label for the capture CTA, matched to the journey's first action (SPEC §1). */
  ctaLabel: string;
  /** A real, matched ITD case study to show as proof before capture. */
  proof?: { client: string; line: string; href: string };
}

// Real case studies (live detail pages) used as matched proof. Capability-framed,
// no invented savings figures (SPEC §5 guardrail).
const PROOF = {
  sme: {
    client: "Tatti Lashes",
    line: "added delivery choice at checkout and won margin back on every order after putting Evri alongside DPD",
    href: "/resources/case-studies/tatti-lashes",
  },
  midmarket: {
    client: "West Ham United",
    line: "moved to one managed multi-carrier framework with a clear view of UK and international spend",
    href: "/resources/case-studies/west-ham-united",
  },
  partner: {
    client: "RIOZ Global",
    line: "turned competitive carrier rates into a revenue stream — five new clients in six months",
    href: "/resources/case-studies/rioz-global",
  },
  export: {
    client: "Arlo Fulfilment",
    line: "unlocked international with the right express lane, turning a gap in their offering into an advantage",
    href: "/resources/case-studies/arlo-fulfilment",
  },
  import: {
    client: "Home Bargains",
    line: "consolidated 60 buyers' scattered sample shipments into one weekly air freight from China",
    href: "/resources/case-studies/home-bargains",
  },
} as const;

/**
 * Route a completed (or partial) qualification to one of the five ICP journeys.
 * Priority order from SPEC §4 — segment and product type override volume:
 *   1. 3PL / fulfilment / agency        → Journey 4 (Partner)
 *   2. Freight, or volume >= 5,000/wk    → Journey 3 (Freight, human-fast)
 *   3. Any International                 → Journey 5 (International)
 *   4. Domestic parcels < 1,000/wk       → Journey 1 (SME)
 *   5. Domestic parcels >= 1,000/wk      → Journey 2 (Mid-market)
 *
 * Intent grade (SPEC §4): International, Freight, or >= 1,000/wk = hot (notify a
 * BDM live, in parallel with nurture); lower-volume domestic = warm. A visitor
 * who ships "both" parcels and freight is graded hot even when routed by another
 * rule, so the freight interest never sits in a silent drip (SPEC risk #4).
 */
export function routeLead(a: FunnelAnswers): RoutingResult {
  const vol = a.volumeBand;
  const ge5000 = vol === "5000+";
  const ge1000 = vol === "1000-5000" || vol === "5000+";
  const intl = isIntl(a.direction);
  const freightOnly = a.productType === "freight";
  const shipsFreight = a.productType === "freight" || a.productType === "both";
  const hot: IntentGrade = intl || shipsFreight || ge1000 ? "hot" : "warm";

  // 1. Partner / 3PL
  if (a.segment === "3pl") {
    return {
      icpJourney: 4,
      journeyName: "Agency / 3PL partner",
      routeTo: "Channel / Partnership BDM",
      intentGrade: "hot",
      outcome:
        "As a 3PL you can offer your clients competitive multi-carrier rates without holding the accounts yourself — and earn margin on the shipping you handle for them.",
      ctaLabel: "Arrange a partner call",
      proof: PROOF.partner,
    };
  }

  // 2. Freight & contract (route to a human fast)
  if (freightOnly || ge5000) {
    return {
      icpJourney: 3,
      journeyName: "Freight & contract",
      routeTo: "Freight Director",
      intentGrade: "hot",
      outcome:
        "Freight and high-volume contract logistics is a hands-on conversation — I'll get our freight team to pull together an audit and an exec summary for your lanes.",
      ctaLabel: "Request a freight audit",
    };
  }

  // 3. International
  if (intl) {
    return {
      icpJourney: 5,
      journeyName: "International exporter",
      routeTo: "International BDM",
      intentGrade: "hot",
      outcome:
        "International is where the customs automation earns its keep — HS codes, EORI, IOSS and country paperwork handled for you, on competitive cross-border rates.",
      ctaLabel: "Get an international rate review",
      proof: a.tradeDirection === "import" ? PROOF.import : PROOF.export,
    };
  }

  // 4. / 5. Domestic parcels, split by volume
  if (ge1000) {
    return {
      icpJourney: 2,
      journeyName: "Mid-market retailer",
      routeTo: "Mid-market BDM",
      intentGrade: "hot",
      outcome:
        "At your volume the win is consolidating carriers into one dashboard, with the rate logic and reporting to keep cost under control as you scale.",
      ctaLabel: "Book a benchmark call",
      proof: PROOF.midmarket,
    };
  }

  return {
    icpJourney: 1,
    journeyName: "eCommerce SME",
    routeTo: "SME BDM",
    intentGrade: hot,
    outcome:
      "Switching from Royal Mail or Evri is exactly where Connexx helps — it compares carriers on each parcel, routes to the cheapest compliant option, and prints the label in one click.",
    ctaLabel: "Get a rate review",
    proof: PROOF.sme,
  };
}
