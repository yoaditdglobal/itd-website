// Help Centre › Integrations — per-integration setup guides.
//
// Content transcribed verbatim from the HC_Integrations_*.docx source docs
// (one per integration). Each guide renders through the shared dynamic route
// at /help/centre/integrations/[slug]. Related-article links are remapped to
// live routes; the docs' references to not-yet-built pages
// (/help/platform/*, /help/carriers/*) are omitted until those pages exist.

export type IntegrationGuideStep = {
  title: string;
  actions: string[];
};

export type IntegrationGuide = {
  /** URL slug under /help/centre/integrations/ (per the source docs). */
  slug: string;
  /** Display name, e.g. "TikTok Shop". */
  name: string;
  /** Brand logo path (same asset the marketing pages use). */
  logo: string;
  /** The integration's marketing page (/integrations/tech/<slug>). */
  marketingHref: string;
  /** SEO title from the doc. */
  metaTitle: string;
  /** SEO meta description from the doc. */
  metaDescription: string;
  /** SEO target keywords from the doc (feeds help search). */
  keywords: string[];
  overview: string;
  beforeYouStart: string[];
  steps: IntegrationGuideStep[];
  important: string;
  troubleshooting: { issue: string; fix: string }[];
  related: { label: string; href: string }[];
};

const BASE = "/help/centre/integrations";

export const INTEGRATION_GUIDES: IntegrationGuide[] = [
  {
    slug: "shopify",
    name: "Shopify",
    logo: "/logos/ecommerce/shopify_logo.png",
    marketingHref: "/integrations/tech/shopify",
    metaTitle: "How to Connect Shopify to ITD Global",
    metaDescription:
      "Connect your Shopify store to ITD Global for multi-carrier rate comparison, label generation, and tracking synced back to Shopify with each label printed.",
    keywords: [
      "shopify shipping integration uk",
      "connect shopify to itd global",
      "shopify multi-carrier shipping",
      "shopify order fulfilment",
      "shopify itd platform setup",
      "shopify carrier rate comparison",
      "shopify shipping labels",
      "shopify ecommerce shipping",
    ],
    overview:
      "Connect your Shopify store to the ITD Platform. Orders come through in near real-time, ready for carrier selection and label generation. Print a label and the tracking number goes back to the Shopify order.",
    beforeYouStart: [
      "Have admin access to your Shopify store",
      "Have your Shopify store domain to hand (e.g. my-store.myshopify.com)",
      "Make sure shipping rules are configured in the ITD Platform before going live — contact your account manager if unsure",
    ],
    steps: [
      {
        title: "Find your Shopify store domain",
        actions: [
          "Log in to your Shopify admin.",
          "Go to Settings in the bottom-left of the sidebar.",
          "Find your store domain under Store details — it looks like my-store.myshopify.com.",
          "Copy it. You will need it in Step 3.",
        ],
      },
      {
        title: "Open Integrations in the ITD Platform",
        actions: [
          "Log in to the ITD Platform.",
          "Click the cog wheel icon in the top-right to open Settings.",
          "Click Integrations in the left sidebar.",
          "Find Shopify and click Manage.",
        ],
      },
      {
        title: "Add your store and connect",
        actions: [
          "Click Add New Store.",
          "Paste your Shopify domain into the field.",
          "Click Connect to Shopify.",
          "You will be taken to your Shopify store.",
        ],
      },
      {
        title: "Install the ITD Global app",
        actions: [
          "Review the permissions on the installation screen.",
          "Click Install.",
          "You will be returned to the ITD Platform.",
          "Your store is now connected and orders will start coming through.",
        ],
      },
    ],
    important:
      "Make sure shipping rules are configured before the integration goes live. Without them, the ITD Platform will not know which carrier to assign to incoming orders. Contact your account manager to set these up.",
    troubleshooting: [
      {
        issue: "Orders are not appearing in the ITD Platform",
        fix: "Check the integration shows as Active in Settings > Integrations > Shopify. If it shows Disconnected, click Reconnect and repeat the authorisation step.",
      },
      {
        issue: "I cannot find my store domain",
        fix: "Log in to Shopify and go to Settings > Domains. Your primary domain (ending in .myshopify.com) is listed there.",
      },
      {
        issue: "The Shopify install screen is showing an error",
        fix: "Check you are logged in to the correct Shopify store and that your account has Owner or Admin permissions. Staff accounts may not be able to install apps.",
      },
    ],
    related: [
      { label: "Connecting TikTok Shop to ITD Global", href: `${BASE}/tiktok` },
      { label: "Connecting eBay to ITD Global", href: `${BASE}/ebay` },
    ],
  },
  {
    slug: "ebay",
    name: "eBay",
    logo: "/logos/marketplaces/ebay-icon.png",
    marketingHref: "/integrations/tech/ebay",
    metaTitle: "How to Connect eBay to ITD Global",
    metaDescription:
      "Connect your eBay store to ITD Global for multi-carrier shipping and tracking sent back to eBay with each label printed.",
    keywords: [
      "ebay shipping integration uk",
      "ebay tracking itd global",
      "connect ebay to itd global",
      "ebay multi-carrier shipping",
      "ebay order fulfilment uk",
      "ebay itd platform",
    ],
    overview:
      "Connect your eBay store to the ITD Platform. Orders come through to your dispatch queue ready for carrier selection and label printing. Print a label and the tracking number goes back to the eBay order — no need to upload tracking separately to eBay Seller Hub.",
    beforeYouStart: [
      "Make sure shipping rules are set up in the ITD Platform before going live — contact your account manager to configure these",
    ],
    steps: [
      {
        title: "Open Integrations in the ITD Platform",
        actions: [
          "Log in to the ITD Platform.",
          "Go to Settings > Integrations.",
          "Find eBay and click Add Store.",
        ],
      },
      {
        title: "Log in to eBay and authorise",
        actions: [
          "You will be taken to an eBay login screen.",
          "Enter your eBay seller credentials.",
          "Follow the on-screen steps to grant access to ITD Global.",
          "You will be returned to the ITD Platform.",
        ],
      },
      {
        title: "Name your store and go live",
        actions: [
          "Enter a Store Name — use something you will recognise (e.g. eBay UK Main).",
          "Click Save.",
          "The integration is now active. Orders will start appearing in your dispatch queue.",
        ],
      },
    ],
    important:
      "Set up Shipping Rules in the ITD Platform before going live. Without them, incoming orders will not have a carrier assigned. Contact your account manager to set these up.",
    troubleshooting: [
      {
        issue: "eBay orders are not appearing in the ITD Platform",
        fix: "Check the integration shows as Active in Settings > Integrations > eBay. If not, deactivate and reactivate the integration.",
      },
      {
        issue: "I authorised the wrong eBay account",
        fix: "Go to Settings > Integrations > eBay, disconnect the store, and repeat the setup with the correct account credentials.",
      },
      {
        issue: "I have multiple eBay stores",
        fix: "Repeat the setup for each store and give each a distinct Store Name so you can identify them in your dispatch queue.",
      },
    ],
    related: [
      { label: "Connecting Shopify to ITD Global", href: `${BASE}/shopify` },
      { label: "Connecting TikTok Shop to ITD Global", href: `${BASE}/tiktok` },
    ],
  },
  {
    slug: "tiktok",
    name: "TikTok Shop",
    logo: "/logos/marketplaces/tiktok-tile.png",
    marketingHref: "/integrations/tech/tiktok-shop",
    metaTitle: "How to Connect TikTok Shop to ITD Global",
    metaDescription:
      "Connect your TikTok Shop to ITD Global for multi-carrier shipping and label printing. Orders pull through every 3 minutes. Cancellations come through before a label is printed.",
    keywords: [
      "tiktok shop shipping uk",
      "tiktok shop integration itd global",
      "tiktok shop fulfilment",
      "tiktok order management shipping",
      "tiktok shop carrier integration",
      "tiktok shop dispatch uk",
    ],
    overview:
      "Connect your TikTok Shop to the ITD Platform and orders pull through every 3 minutes, ready to dispatch. If a customer cancels before you print a label, the cancellation comes through too — no wasted labels or carrier charges.",
    beforeYouStart: [
      "Have admin access to your TikTok Seller Centre",
      "Make sure shipping rules are set up in the ITD Platform before going live — contact your account manager if needed",
    ],
    steps: [
      {
        title: "Open Integrations in the ITD Platform",
        actions: [
          "Log in to the ITD Platform.",
          "Click the cog wheel icon in the top-right to open Settings.",
          "Click Integrations in the left sidebar.",
          "Find TikTok and click Manage.",
        ],
      },
      {
        title: "Authorise the TikTok Shop connection",
        actions: [
          "Follow the authorisation steps shown on screen — do not skip any.",
          "You will be taken to TikTok Seller Centre to grant access.",
          "Log in and approve the request.",
          "You will be returned to the ITD Platform.",
        ],
      },
      {
        title: "Name your store and save",
        actions: [
          "Enter a Store Name for this connection — use something you will recognise.",
          "Click Save.",
          "The integration is now active. Orders will pull through within 3 minutes.",
        ],
      },
    ],
    important:
      "The ITD Platform checks for new TikTok Shop orders every 3 minutes. Cancellations made before a label is printed will cancel the order in the ITD Platform too, preventing accidental label generation.",
    troubleshooting: [
      {
        issue: "Orders are not pulling through after setup",
        fix: "Wait up to 3 minutes after setup for the first sync. If orders still do not appear, go to Settings > Integrations > TikTok and check the status shows Active. If not, deactivate and reactivate the integration.",
      },
      {
        issue: "Authorisation is failing",
        fix: "Check you are logged in to the correct TikTok Seller Centre account and that it has admin permissions on the TikTok Shop.",
      },
      {
        issue: "A cancelled order is still showing in the ITD Platform",
        fix: "Cancellations sync on the same 3-minute cycle. Refresh after 3–5 minutes. If it persists, contact support.",
      },
      {
        issue: "I have multiple TikTok shops — can I connect them all?",
        fix: "Yes. Repeat the setup for each store and give each a distinct Store Name in Step 3.",
      },
    ],
    related: [
      { label: "Connecting Shopify to ITD Global", href: `${BASE}/shopify` },
      { label: "Connecting eBay to ITD Global", href: `${BASE}/ebay` },
    ],
  },
  {
    slug: "selro",
    name: "Selro",
    logo: "/logos/erp-wms/selro-mark.png",
    marketingHref: "/integrations/tech/selro",
    metaTitle: "How to Connect Selro to ITD Global",
    metaDescription:
      "Add ITD Global as a courier in Selro to compare carrier rates and print labels without leaving your Selro account. Step-by-step setup guide.",
    keywords: [
      "selro shipping integration uk",
      "selro courier setup itd global",
      "selro multi-carrier shipping",
      "selro label printing integration",
      "selro order management shipping",
      "connect selro to itd global",
      "selro carrier api",
    ],
    overview:
      "Add ITD Global as a courier in Selro so you can compare rates and print labels without leaving your Selro account. Have your ITD Global API key to hand before you start.",
    beforeYouStart: [
      "Have access to Shipping configuration settings in your Selro account",
      "Have your ITD Global API key to hand — request it from your account manager if you do not have one",
    ],
    steps: [
      {
        title: "Open Shipping Courier Setup in Selro",
        actions: [
          "Log in to Selro.",
          "Click the Shipping tab in the top navigation.",
          "Select Shipping Courier Setup from the dropdown.",
        ],
      },
      {
        title: "Find and set up ITD Global",
        actions: [
          "Click Available Couriers.",
          "Find ITD Global in the list — it may appear as Connexx in older Selro versions.",
          "Click Set Up next to ITD Global.",
        ],
      },
      {
        title: "Enter your API key",
        actions: [
          "Fill in the credentials form.",
          "Enter the API Key provided by your ITD Global account manager.",
          "Complete any other required fields as directed.",
          "Click Save.",
        ],
      },
      {
        title: "Enable ITD Global in Registered Couriers",
        actions: [
          "Go back to Registered Couriers.",
          "Tick the Enable checkbox next to ITD Global.",
          "Click Set Up to open service configuration.",
        ],
      },
      {
        title: "Select your shipping services",
        actions: [
          "Click the Shipping Services tab.",
          "Tick the checkbox next to each service you want to use.",
          "Set a default carrier if needed.",
          "Click Save Changes.",
        ],
      },
    ],
    important:
      "The integration is active as soon as you save in Step 5. Go to the Orders tab in Selro to create and print labels through ITD Global.",
    troubleshooting: [
      {
        issue: "ITD Global does not appear in Available Couriers",
        fix: "Contact ITD Global support and ask them to add ITD Global (Connexx) as an available courier on your Selro account.",
      },
      {
        issue: "My API key is not being accepted",
        fix: "Check for extra spaces when pasting the key. If it still fails, request a fresh key from your ITD Global account manager.",
      },
      {
        issue: "No services appear in the Shipping Services tab",
        fix: "Return to Step 3, re-enter the API key and save again. If the issue continues, contact ITD Global support.",
      },
      {
        issue: "Labels are not printing after setup",
        fix: "Check your ITD Global account has at least one active carrier account. Contact your account manager to confirm your carriers are configured.",
      },
    ],
    related: [
      { label: "Connecting Linnworks to ITD Global", href: `${BASE}/linnworks` },
      { label: "Connecting Veeqo to ITD Global", href: `${BASE}/veeqo` },
    ],
  },
  {
    slug: "linnworks",
    name: "Linnworks",
    logo: "/logos/erp-wms/linnworks_logo.png",
    marketingHref: "/integrations/tech/linnworks",
    metaTitle: "How to Connect Linnworks to ITD Global",
    metaDescription:
      "Add ITD Global as a shipping integration in Linnworks for multi-carrier dispatch and tracking sync. Covers adding the integration, selecting services, and updating vendor names.",
    keywords: [
      "linnworks shipping integration uk",
      "linnworks itd global setup",
      "linnworks multi-carrier shipping",
      "linnworks carrier integration",
      "linnworks tracking sync",
      "connect linnworks to itd global",
      "linnworks vendor name update",
    ],
    overview:
      "Add ITD Global as a shipping integration in Linnworks so your team can dispatch orders and sync tracking without leaving the platform. Setup has three parts: adding the integration, selecting services, and updating vendor names.",
    beforeYouStart: [
      "Have your ITD Global Account Name confirmed by your account manager — it must start with 'ITD ' followed by a space and your business name",
      "Have your ITD Global Customer Reference number to hand — it starts with 16 and is in your welcome email or contract",
      "Have admin access to Linnworks",
    ],
    steps: [
      {
        title: "Navigate to Integrations in Linnworks",
        actions: [
          "Log in to Linnworks.",
          "Click Shipping in the left sidebar.",
          "Click Integrations from the submenu.",
        ],
      },
      {
        title: "Install the ITD Global integration",
        actions: [
          "Click Add Integration in the top-right corner.",
          "Search for ITD Global or Connexx.",
          "Click Install Application next to the result.",
        ],
      },
      {
        title: "Configure with your credentials",
        actions: [
          "Click Add Integration again in the top-right corner.",
          "Search for Connexx and this time click Integrate.",
          "Enter your Account Name — it must start with 'ITD ' followed by a space (e.g. ITD YourBusinessName).",
          "Click Next.",
          "Enter your Customer Reference number (starts with 16).",
          "Click Next. Registration is now complete.",
        ],
      },
      {
        title: "Add your shipping services",
        actions: [
          "On the Integrations page, click Services next to your ITD Global line.",
          "Click the dropdown to see all available services.",
          "Click a service name, then click Add. Repeat for each service you need.",
          "Edit the Linnworks Service column name if you want to change what your team sees.",
          "Click Finish when done.",
        ],
      },
      {
        title: "Update the Vendor Name for each service",
        actions: [
          "Go to Shipping > Postal Services in the sidebar.",
          "Click the Vendor column header to sort.",
          "Find rows showing CONNEXX Integration in the Vendor column.",
          "Replace each one with the carrier name at the start of the service name (e.g. Royal Mail for Royal Mail Tracked 24).",
          "Each change saves as you go. Close and reopen Postal Services to confirm.",
        ],
      },
    ],
    important:
      "Repeat Step 5 each time you add a new service. Without the correct vendor name, tracking data will not route to the carrier and tracking updates may fail.",
    troubleshooting: [
      {
        issue: "I cannot find ITD Global or Connexx in the search",
        fix: "Try both search terms: 'ITD Global' and 'Connexx'. If neither works, contact ITD Global support to confirm the integration is available on your account.",
      },
      {
        issue: "The Account Name is being rejected",
        fix: "The name must start with exactly 'ITD ' — capital letters followed by a space. Copy it from your welcome email to avoid typos.",
      },
      {
        issue: "My Customer Reference number is not being accepted",
        fix: "Customer Reference numbers begin with 16. Check your welcome email or ask your account manager to confirm the correct number.",
      },
      {
        issue: "Services are not appearing in the dropdown",
        fix: "Wait 2–3 minutes after setup and refresh. If services still do not appear, contact ITD Global support with your Account Name.",
      },
      {
        issue: "Tracking is not writing back to Linnworks",
        fix: "Confirm the Vendor Name for each service has been updated correctly in Step 5. If vendor names are correct and tracking is still missing, contact support with the Linnworks order reference.",
      },
    ],
    related: [
      { label: "Connecting Selro to ITD Global", href: `${BASE}/selro` },
      { label: "Connecting Veeqo to ITD Global", href: `${BASE}/veeqo` },
    ],
  },
  {
    slug: "veeqo",
    name: "Veeqo",
    logo: "/logos/ecommerce/veeqo-icon.webp",
    marketingHref: "/integrations/tech/veeqo",
    metaTitle: "How to Connect Veeqo to ITD Global",
    metaDescription:
      "Add ITD Global as a custom carrier in Veeqo for multi-carrier shipping and tracking sync. Step-by-step guide to completing the connection with the ITD Global team.",
    keywords: [
      "veeqo shipping integration uk",
      "veeqo itd global setup",
      "veeqo carrier integration uk",
      "veeqo multi-carrier shipping",
      "connect veeqo to itd global",
      "veeqo custom carrier",
    ],
    overview:
      "The connection is set up as a custom carrier integration. The process involves both you and the ITD Global team. Step 1 — getting Veeqo to add the carrier — takes the longest as it requires action from Veeqo. Once confirmed, the remaining steps take around 10–15 minutes.",
    beforeYouStart: ["Have admin access to your Veeqo account"],
    steps: [
      {
        title: "Ask Veeqo to add ITD Global as a custom carrier",
        actions: [
          "Contact Veeqo support at https://www.veeqo.com/gb/contact-us",
          "Ask them to add ITD Global (also known as Connexx) as a custom carrier on your account.",
          "Wait for Veeqo to confirm before continuing.",
        ],
      },
      {
        title: "Enter the ITD Global integration details in Veeqo",
        actions: [
          "Once Veeqo confirms, log in to Veeqo and go to your carrier or shipping settings.",
          "Find the ITD Global (Connexx) custom carrier entry.",
          "Enter the following details exactly: Base URL: https://production-Veeqo.onrender.com · Integration Name: Connexx · External Carrier Name: Connexx · Tracking URL: https://production-veeqo.onrender.com/tracking?id=[tracking_number]",
          "Save the settings.",
        ],
      },
      {
        title: "Send your token to the ITD Global team",
        actions: [
          "After saving, Veeqo will give you an integration token.",
          "Copy the token.",
          "Send it to your ITD Global account manager via a secure channel.",
          "We will complete the connection and let you know when it is live.",
        ],
      },
    ],
    important:
      "This integration needs action from both you and the ITD Global team. Send the token promptly — we cannot activate the integration until we receive it.",
    troubleshooting: [
      {
        issue: "Veeqo says they cannot add ITD Global as a carrier",
        fix: "ITD Global (Connexx) will not appear in Veeqo's carrier search — it must be added manually by the Veeqo team. Share this guide with the Veeqo support agent and ask them to add it as a custom carrier integration.",
      },
      {
        issue: "The Base URL or Tracking URL fields are not saving",
        fix: "Make sure you are copying the URLs exactly as shown in Step 2 with no trailing spaces. The tracking URL must include the [tracking_number] placeholder exactly as written.",
      },
      {
        issue: "I sent the token but the integration is still not active",
        fix: "Contact your ITD Global account manager to confirm they received the token. Activation typically takes up to 1 business day.",
      },
    ],
    related: [
      { label: "Connecting Linnworks to ITD Global", href: `${BASE}/linnworks` },
      { label: "Connecting Selro to ITD Global", href: `${BASE}/selro` },
    ],
  },
];

export function getIntegrationGuide(slug: string): IntegrationGuide | undefined {
  return INTEGRATION_GUIDES.find((g) => g.slug === slug);
}
