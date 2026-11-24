/**
 * Customer reviews for the homepage reviews carousel — hand-picked, copied
 * VERBATIM from ITD's public Google and Trustpilot profiles (screenshots
 * supplied Nov 2026). Never edit a review's wording.
 *
 * Rules (UK DMCC Act 2024 — no misleading presentation of reviews):
 * - This is a SELECTION of 4 and 5 star reviews. The section's "selected
 *   reviews" label and full-profile link (TRUSTPILOT_URL) were removed at the
 *   user's direction (Nov 2026); don't add an aggregate score unless it's the
 *   live figure from the platform.
 * - Reviews cut off on the platform ("More" / "See more") end with "…" at the
 *   exact point the source was truncated — never complete them.
 * - Google only shows relative dates ("11 months ago"), so Google reviews
 *   carry the approximate YEAR, derived from the relative date at capture
 *   (Nov 2026). Trustpilot reviews carry their exact date.
 *
 * Avatars: the reviewer's own profile logo/photo, cropped from the platform
 * (public/reviews/*.png, 128px circles). No avatar when the reviewer has
 * none (Trustpilot initials placeholders are not images) — render nothing.
 *
 * Adding a review: append an entry, drop its avatar (if any) into
 * public/reviews/ under a new filename.
 */

export type ReviewSource = "google" | "trustpilot";

export interface Review {
  id: string;
  source: ReviewSource;
  /** 1–5 */
  rating: number;
  author: string;
  /** Business the reviewer wrote on behalf of, when stated in the review. */
  company?: string;
  /** Circular avatar image (logo or photo), or omitted when none exists. */
  avatar?: string;
  /** Trustpilot review title. Google reviews have none. */
  title?: string;
  /** Verbatim review text. Blank lines separate paragraphs. */
  body: string;
  /** ISO date (Trustpilot) or year (Google, approximate — see header).
   *  Record only — dates are NOT displayed (user-directed, Nov 2026). */
  date: string;
}

export const TRUSTPILOT_URL = "https://uk.trustpilot.com/review/www.itdglobal.com";

/** Display order: strongest first, sources interleaved. */
export const REVIEWS: Review[] = [
  {
    id: "tp-hadifi",
    source: "trustpilot",
    rating: 5,
    author: "M Hadifi",
    title: "Excellent service from start to finish",
    body:
      "Excellent service from start to finish. Communication has been great, collections and deliveries are well organised, and the team is always helpful and responsive. Really reliable shipping partner, highly recommended!",
    date: "2026-02-23",
  },
  {
    id: "g-leigh-harwood",
    source: "google",
    rating: 5,
    author: "Leigh Harwood",
    avatar: "/reviews/leigh-harwood.png",
    body:
      "We have been working with ITD Global for around five years, using them to access a range of UK and international parcel services across multiple major couriers. The ability to manage Royal Mail, Evri and others through a single, well-priced …",
    date: "2025",
  },
  {
    id: "tp-woolfstein",
    source: "trustpilot",
    rating: 5,
    author: "Alex Woolfstein",
    company: "BargainMax",
    avatar: "/reviews/bargainmax.png",
    title: "Great logistics partner",
    body:
      "We’ve had a very positive experience working with ITD Global at BargainMax. The team is responsive, reliable, and easy to work with. Communication is clear and shipments are handled smoothly, with any issues dealt with quickly and professionally.\n\nHighly recommended.",
    date: "2025-12-21",
  },
  {
    id: "g-warwickshire-clothing",
    source: "google",
    rating: 5,
    author: "Warwickshire Clothing",
    avatar: "/reviews/warwickshire-clothing.png",
    body:
      "Excellent service from ITD Global. As a business, we rely on dependable logistics, always helpful and great communication.",
    date: "2025",
  },
  {
    id: "tp-faltynski",
    source: "trustpilot",
    rating: 5,
    author: "Hubert Faltynski",
    title: "As a small business owner",
    body:
      "As a small business owner, I can’t say enough good things about ITD Global. Their shipping rates are competitive - significantly lower than what I was getting from the major carriers directly.\n\nThe multi-carrier platform they offer has made a big difference, saving me time and giving me more flexibility, especially with their consolidated collection service. Everything runs smoothly, and their customer service team is always quick to respond and really helpful.\n\nI definitely recommend considering ITD Global as they’ve been a reliable partner for us.",
    date: "2025-12-03",
  },
  {
    id: "g-bag-market",
    source: "google",
    rating: 5,
    author: "Bag Market",
    avatar: "/reviews/bag-market.png",
    body:
      "Been with ITD for a few years now. Competitive rates and good customer service. Haylee our account manager is brilliant.",
    date: "2026",
  },
  {
    id: "tp-mujahid",
    source: "trustpilot",
    rating: 5,
    author: "Abdul Rahman Mujahid",
    avatar: "/reviews/abdul-rahman-mujahid.png",
    title: "Haylee made our setup incredibly Fast",
    body:
      "Haylee made our setup incredibly Fast\nWithin just two days of our first email, everything was ready to go. She even worked outside of normal hours to provide us with the best customer service. If you need someone to handle shipping for your company, I couldn’t recommend anyone more highly.",
    date: "2025-12-03",
  },
  {
    id: "tp-freedom-fire",
    source: "trustpilot",
    rating: 5,
    author: "Freedom Fire",
    body:
      "Outstanding service from ITD Global. Special mention to Klieo, who has genuinely gone above and beyond for us consistently. No matter the issue, whether by phone or email, she is always …",
    date: "2026-05-19",
  },
  {
    id: "g-retrotouch",
    source: "google",
    rating: 5,
    author: "Retrotouch",
    avatar: "/reviews/retrotouch.png",
    body:
      "We've been using ITD for a few months now after switching from other couriers due to issues. This was the best move we've made. We've had nothing but smooth dealings with the company and their customer service is ace! I deal with Rafi on a …",
    date: "2018",
  },
  {
    id: "tp-spotbuyer",
    source: "trustpilot",
    rating: 4,
    author: "Alex Spotbuyer",
    title: "Very satisfied with the services ITD provide..",
    body:
      "Very satisfied with the services ITD provide for us and have saved us a lot of money on courier services. My only critique would be that response times could be quickened as customers want answers as quickly as possible but can sometimes take 2-3 days to hear a response.\n\nHowever, when this is the case we contact our account manager Haylee who is extremely helpful and speeds up the process of answers if anything is urgent. She also made the transition to ITD easy for us and checks in regularly to see if we are happy with their services.",
    date: "2026-02-13",
  },
  {
    id: "tp-tarmeet-bains",
    source: "trustpilot",
    rating: 5,
    author: "Tarmeet Bains",
    title: "Very Happy!",
    body:
      "We switched over a few months ago to ITD, very happy with the service from Haylee and the wider team. they really do go the extra mile and having that personal touch also makes such a difference.",
    date: "2025-11-28",
  },
  {
    id: "g-style-aloud",
    source: "google",
    rating: 5,
    author: "Style Aloud",
    avatar: "/reviews/style-aloud.png",
    body:
      "We had been customers with ITD for over 18 months. excellent service and parcels are delivered promptly without any delay.",
    date: "2016",
  },
  {
    id: "tp-stocksale",
    source: "trustpilot",
    rating: 5,
    author: "Stocksale Ltd",
    title: "ITD Global services have been excellent...",
    body:
      "ITD Global services have been excellent Haylee has been a very good account manager for ourselves",
    date: "2026-02-19",
  },
  {
    id: "tp-ace-supply",
    source: "trustpilot",
    rating: 5,
    author: "Ace Supply",
    title: "Sylwia has been a great account manager...",
    body:
      "Sylwia has been a great account manager since starting on our account. Very responsive and always come back with answers and solutions.",
    date: "2025-12-01",
  },
];
