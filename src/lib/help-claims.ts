// Help Centre — Claims policies by carrier. Single source of truth for
// /help/centre/account/claims and for the help search index.
//
// Values are transcribed VERBATIM from the ITD "Claims Policy" documents (one
// per carrier). Each policy has a Loss and a Damage column with: the ITD claim-
// start countdown (calendar days + the event it counts from), the max claim
// value, and the customer requirements. Some carriers do not accept damage
// claims (allowed: false → rendered as "Not available").

export type ClaimDetail = {
  allowed: boolean;
  countdownDays?: number;
  countdownFrom?: string;
  maxValue?: string;
  requirements?: string[];
};

export type ClaimsPolicy = {
  slug: string; // anchor + deep-link hash, e.g. "dhl", "dhl-parcel", "dpd-uk"
  carrier: string; // display name
  aliases: string[]; // search/routing synonyms (lower-case)
  loss: ClaimDetail;
  damage: ClaimDetail;
  submissionToResultDays: number;
  notes: string[];
};

// Footnotes apply to every policy.
export const CLAIMS_FOOTNOTES = [
  "All countdown and submission-to-result figures are calendar days.",
  "A query is not classed as ‘submitted’ until ITD have received all correct supporting documentation.",
];

// Frequently repeated requirement lines (kept as single constants so the
// wording stays identical across carriers).
const COST_INVOICE =
  "Cost invoice and goods description — cost and retail price must be included";
const SUPPORTING =
  "Any supporting detail to identify items (pictures, branding etc)";
const COURIER_DETAIL =
  "Tracking number of consignment, Contact Name, Number, Email address, Full goods description (including brand names), References, Colours and materials. Full description of packaging including colour, type and any specific barcodes or references on the outer and/or inner cartons, photos of damage";
const UPS_TRACER =
  "A tracer request is sent to the customer to provide the goods description, customs value, type of packaging, barcodes, references";
const NO_SCAN = "Claims are not accepted where there has been no scan.";

export const CLAIMS_POLICIES: ClaimsPolicy[] = [
  {
    slug: "amazon-shipping",
    carrier: "Amazon Shipping",
    aliases: ["amazon", "amazon shipping"],
    loss: {
      allowed: true,
      countdownDays: 26,
      countdownFrom: "First Actual Scan",
      maxValue: "£25",
      requirements: [
        "Sales invoice and goods description — Sales price must be included — Invoice to show proof of refund",
        SUPPORTING,
      ],
    },
    damage: {
      allowed: true,
      countdownDays: 7,
      countdownFrom: "Damage Scan / Delivered Date",
      maxValue: "£25",
      requirements: [
        "Sales invoice and goods description — retail price must be included — Invoice to show proof of refund",
        "Must provide photo or video evidence of the damage",
      ],
    },
    submissionToResultDays: 40,
    notes: [],
  },
  {
    slug: "dhl",
    carrier: "DHL",
    aliases: ["dhl", "dhl express"],
    loss: {
      allowed: true,
      countdownDays: 12,
      countdownFrom: "Collection Date",
      maxValue: "£50",
      requirements: [
        "Tracking number, cost invoice and goods description — cost and retail price must be included",
        SUPPORTING,
      ],
    },
    damage: {
      allowed: true,
      countdownDays: 5,
      countdownFrom: "Collection Date",
      maxValue: "£50",
      requirements: [
        "Tracking number, cost invoice and goods description — cost and retail price must be included",
        SUPPORTING,
      ],
    },
    submissionToResultDays: 40,
    notes: [NO_SCAN],
  },
  {
    slug: "dhl-parcel",
    carrier: "DHL (Parcel)",
    aliases: ["dhl parcel", "dhl ecommerce"],
    loss: {
      allowed: true,
      countdownDays: 14,
      countdownFrom: "Delivery Date",
      maxValue: "£75",
      requirements: [
        "Tracking number, cost invoice and goods description — cost and retail price must be included",
        SUPPORTING,
      ],
    },
    damage: {
      allowed: true,
      countdownDays: 14,
      countdownFrom: "Delivery Date",
      maxValue: "£75",
      requirements: [
        "Tracking number, cost invoice and goods description — cost and retail price must be included",
        SUPPORTING,
      ],
    },
    submissionToResultDays: 28,
    notes: [NO_SCAN],
  },
  {
    slug: "dpd-europe",
    carrier: "DPD Europe",
    aliases: ["dpd europe", "dpd eu"],
    loss: {
      allowed: true,
      countdownDays: 26,
      countdownFrom: "First Actual Scan",
      maxValue: "£50",
      requirements: [COST_INVOICE, SUPPORTING],
    },
    damage: {
      allowed: true,
      countdownDays: 12,
      countdownFrom: "First Actual Scan",
      maxValue: "£50",
      requirements: [COST_INVOICE, SUPPORTING],
    },
    submissionToResultDays: 40,
    notes: [NO_SCAN],
  },
  {
    slug: "dpd-uk",
    carrier: "DPD UK",
    aliases: ["dpd", "dpd uk"],
    loss: {
      allowed: true,
      countdownDays: 12,
      countdownFrom: "Label Creation",
      maxValue: "£100",
      requirements: [COST_INVOICE, SUPPORTING],
    },
    damage: { allowed: false },
    submissionToResultDays: 40,
    notes: ["No claims allowed for damaged items on DPD UK services.", NO_SCAN],
  },
  {
    slug: "evri",
    carrier: "Evri",
    aliases: ["evri", "hermes"],
    loss: {
      allowed: true,
      countdownDays: 26,
      countdownFrom: "Label Created",
      maxValue: "£25",
      requirements: [
        "DOR if disputing delivery (See ITD Customer Knowledge Centre for the DOR form)",
        "Cost invoice and description",
        SUPPORTING,
      ],
    },
    damage: { allowed: false },
    submissionToResultDays: 40,
    notes: ["No claims allowed for damaged items on Evri services.", NO_SCAN],
  },
  {
    slug: "fedex",
    carrier: "FedEx",
    aliases: ["fedex", "fed ex", "federal express"],
    loss: {
      allowed: true,
      countdownDays: 19,
      countdownFrom: "Delivery / Due Date",
      maxValue: "£50",
      requirements: [COST_INVOICE, COURIER_DETAIL],
    },
    damage: {
      allowed: true,
      countdownDays: 19,
      countdownFrom: "Delivery / Due Date",
      maxValue: "£50",
      requirements: [COST_INVOICE, COURIER_DETAIL],
    },
    submissionToResultDays: 40,
    notes: [NO_SCAN],
  },
  {
    slug: "landmark",
    carrier: "Landmark",
    aliases: ["landmark", "landmark global"],
    loss: {
      allowed: true,
      countdownDays: 26,
      countdownFrom: "Label Created",
      maxValue: "CMR",
      requirements: [COST_INVOICE, SUPPORTING],
    },
    damage: {
      allowed: true,
      countdownDays: 26,
      countdownFrom: "Label Created",
      maxValue: "CMR",
      requirements: [COST_INVOICE, SUPPORTING],
    },
    submissionToResultDays: 40,
    notes: [NO_SCAN],
  },
  {
    slug: "p2p",
    carrier: "P2P",
    aliases: ["p2p", "trakpak"],
    loss: {
      allowed: true,
      countdownDays: 26,
      countdownFrom: "Despatch Date",
      maxValue: "£50",
      requirements: [COST_INVOICE, SUPPORTING],
    },
    damage: {
      allowed: true,
      countdownDays: 26,
      countdownFrom: "Despatch Date",
      maxValue: "£50",
      requirements: [COST_INVOICE, SUPPORTING],
    },
    submissionToResultDays: 40,
    notes: [NO_SCAN],
  },
  {
    slug: "royal-mail",
    carrier: "Royal Mail",
    aliases: ["royal mail", "rm"],
    loss: {
      allowed: true,
      countdownDays: 78,
      countdownFrom: "First Actual Scan",
      maxValue: "£150",
      requirements: [COST_INVOICE, SUPPORTING],
    },
    damage: {
      allowed: true,
      countdownDays: 78,
      countdownFrom: "Damage Scan",
      maxValue: "£150",
      requirements: [
        "Proof of damaged goods — images",
        "Damaged goods to be retained for inspection by receiver. Maximum liability £150.00",
      ],
    },
    submissionToResultDays: 40,
    notes: [],
  },
  {
    slug: "starlinks",
    carrier: "Starlinks",
    aliases: ["starlinks", "star links"],
    loss: {
      allowed: true,
      countdownDays: 28,
      countdownFrom: "First Actual Scan",
      maxValue: "£50",
      requirements: [
        "Cost invoice and goods description — cost and retail price must be included — Invoice to show proof of refund",
        SUPPORTING,
      ],
    },
    damage: {
      allowed: true,
      countdownDays: 7,
      countdownFrom: "Damage Scan",
      maxValue: "£25 + Shipping",
      requirements: [
        "Cost invoice and goods description — cost and retail price must be included — Invoice to show proof of refund",
        SUPPORTING,
        "Photos of damage",
      ],
    },
    submissionToResultDays: 40,
    notes: [],
  },
  {
    slug: "tnt",
    carrier: "TNT",
    aliases: ["tnt"],
    loss: {
      allowed: true,
      countdownDays: 19,
      countdownFrom: "Delivery / Due Date",
      maxValue: "£50",
      requirements: [COST_INVOICE, COURIER_DETAIL],
    },
    damage: {
      allowed: true,
      countdownDays: 19,
      countdownFrom: "Delivery / Due Date",
      maxValue: "£50",
      requirements: [COST_INVOICE, COURIER_DETAIL],
    },
    submissionToResultDays: 40,
    notes: [NO_SCAN],
  },
  {
    slug: "ups",
    carrier: "UPS",
    aliases: ["ups", "united parcel"],
    loss: {
      allowed: true,
      countdownDays: 58,
      countdownFrom: "Collection Date",
      maxValue: "CMR £8/kg",
      requirements: [UPS_TRACER, SUPPORTING],
    },
    damage: {
      allowed: true,
      countdownDays: 12,
      countdownFrom: "Delivery / Due Date",
      maxValue: "CMR £8/kg",
      requirements: [UPS_TRACER, SUPPORTING],
    },
    submissionToResultDays: 40,
    notes: [NO_SCAN],
  },
  {
    slug: "ups-nl",
    carrier: "UPS NL",
    aliases: ["ups nl", "ups netherlands"],
    loss: {
      allowed: true,
      countdownDays: 58,
      countdownFrom: "Collection Date",
      maxValue: "CMR £8/kg",
      requirements: [UPS_TRACER, SUPPORTING],
    },
    damage: {
      allowed: true,
      countdownDays: 12,
      countdownFrom: "Delivery / Due Date",
      maxValue: "CMR £8/kg",
      requirements: [UPS_TRACER, SUPPORTING],
    },
    submissionToResultDays: 40,
    notes: [NO_SCAN],
  },
];

export function getClaimsPolicy(slug: string): ClaimsPolicy | undefined {
  return CLAIMS_POLICIES.find((p) => p.slug === slug);
}
