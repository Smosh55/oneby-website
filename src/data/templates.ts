// Free-template lead magnets. Each entry is a genuinely useful, ready-to-use
// estimate template for one trade, built around the Good/Better/Best option
// layout that OneBy's estimate builder produces. The template renders in full on
// the page (free, printable, no gate); the email capture below it offers early
// access to build and send the same thing inside OneBy. This is the honest
// version of the classic "free template" acquisition play: the value is on the
// page, the signup is for the product, and no number is presented as real data.
//
// To add a template: add an entry here. The route, sitemap, and hub pick it up
// automatically. Keep prices as blank fill-in fields, never invented amounts.

export type EstimateLine = {
  label: string;
  detail?: string;
};

export type EstimateTier = {
  tier: "Good" | "Better" | "Best";
  name: string;
  blurb: string;
  recommended?: boolean;
  lines: EstimateLine[];
};

export type TemplateFaq = { q: string; a: string };

export type Template = {
  slug: string; // e.g. "hvac-estimate-template"
  tradeSlug: string; // industry slug for accent + cross-link (e.g. "hvac")
  trade: string; // "HVAC"
  kind: "Estimate"; // room to grow: Invoice, Service Agreement, etc.
  // The concrete job the sample estimate is built around.
  scenario: string; // "AC system replacement"
  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  // Hero
  h1: string;
  heroSub: string;
  // Two short intro paragraphs above the template.
  intro: string[];
  // The three-option sample estimate.
  tiers: EstimateTier[];
  // Trade-specific "why three options" note appended to the shared guidance.
  optionsNote: string;
  faqs: TemplateFaq[];
  // Cross-links.
  relatedFeature: { label: string; href: string };
};

export const templates: Template[] = [
  {
    slug: "hvac-estimate-template",
    tradeSlug: "hvac",
    trade: "HVAC",
    kind: "Estimate",
    scenario: "AC system replacement",
    metaTitle: "Free HVAC Estimate Template (Good / Better / Best)",
    metaDescription:
      "A free, ready-to-use HVAC estimate template with the three-option layout that books more jobs. Print it, copy it, or build and send it in seconds with OneBy.",
    keywords: [
      "hvac estimate template",
      "free hvac estimate template",
      "hvac proposal template",
      "air conditioning estimate template",
      "hvac quote template",
      "good better best hvac estimate",
    ],
    h1: "Free HVAC Estimate Template",
    heroSub:
      "A clean, three-option estimate your customer can actually understand, built around a real AC replacement. Use it as-is, or build and send it in two taps inside OneBy.",
    intro: [
      "This is the layout the best shops use to win the bigger job without pressure: one page, three clear options, the recommended one in the middle. The customer picks the level of fix they want instead of shopping your single price against the next company.",
      "Everything below is yours to use free. Print it, copy the structure into your own paperwork, or fill it in on screen. The prices are left blank on purpose, drop in yours.",
    ],
    tiers: [
      {
        tier: "Good",
        name: "Repair the existing system",
        blurb: "Get them cooling again for the least money today.",
        lines: [
          { label: "Diagnostic and system inspection" },
          { label: "Replace failed component", detail: "capacitor, contactor, or motor" },
          { label: "Refrigerant top-off as needed" },
          { label: "Full system test and airflow check" },
        ],
      },
      {
        tier: "Better",
        name: "New 14.3 SEER2 system",
        blurb: "Right-sized, efficient, and under warranty. The one most owners pick.",
        recommended: true,
        lines: [
          { label: "New 14.3 SEER2 condenser and matched coil" },
          { label: "New line set and pad as needed" },
          { label: "Permit, startup, and haul-away of old unit" },
          { label: "10-year parts warranty, 1-year labor" },
        ],
      },
      {
        tier: "Best",
        name: "High-efficiency system + smart thermostat",
        blurb: "Lowest bills, quietest run, longest coverage.",
        lines: [
          { label: "Variable-speed high-efficiency system" },
          { label: "Smart thermostat and whole-home surge protector" },
          { label: "Duct sealing and airflow balancing" },
          { label: "Extended labor warranty + year-one maintenance plan" },
        ],
      },
    ],
    optionsNote:
      "On a no-cool call the honest cheap fix and the new system both belong on the page. Let the homeowner weigh a repair on an aging unit against a warrantied replacement, most will move up on their own.",
    faqs: [
      {
        q: "What should an HVAC estimate include?",
        a: "Your business and license details, the customer and job address, a clear scope for each option, the equipment and warranty, any permit or haul-away, the price, and a line for the customer to accept. The template below covers all of it.",
      },
      {
        q: "Why give three options on an HVAC estimate?",
        a: "A single price gets shopped against the next company. Three options change the question from yes-or-no to which-one, and the middle option gives most homeowners a comfortable place to land. Shops that quote this way tend to win larger tickets.",
      },
      {
        q: "Can I send this estimate from my phone?",
        a: "With OneBy you build the three options once as a reusable template, then send a branded estimate from your phone while you are still standing in the driveway. The customer taps to accept and it becomes a scheduled job. Join the founders list for early access.",
      },
    ],
    relatedFeature: { label: "See the estimate builder", href: "/features/estimates" },
  },
  {
    slug: "plumbing-estimate-template",
    tradeSlug: "plumbing",
    trade: "Plumbing",
    kind: "Estimate",
    scenario: "Water heater replacement",
    metaTitle: "Free Plumbing Estimate Template (Good / Better / Best)",
    metaDescription:
      "A free plumbing estimate template built around a water heater replacement, with the three-option layout that wins bigger jobs. Print it or build and send it in OneBy.",
    keywords: [
      "plumbing estimate template",
      "free plumbing estimate template",
      "plumbing quote template",
      "water heater estimate template",
      "plumbing proposal template",
      "plumbing invoice and estimate template",
    ],
    h1: "Free Plumbing Estimate Template",
    heroSub:
      "A three-option estimate built around a real water heater replacement, clear enough that the customer decides for themselves. Use it as-is, or build and send it in two taps inside OneBy.",
    intro: [
      "The strongest plumbing estimates give the homeowner a choice instead of a single take-it-or-leave-it number. Three options on one page: the basic swap, the upgrade most people choose, and the premium path. The decision becomes which one, not whether.",
      "This template is free to use. Print it, copy the structure into your own forms, or fill it in on screen. Prices are left blank, add yours.",
    ],
    tiers: [
      {
        tier: "Good",
        name: "40-gallon tank, like-for-like",
        blurb: "The straight replacement to get hot water back today.",
        lines: [
          { label: "40-gallon atmospheric tank, supply and install" },
          { label: "New flex connectors and gas or water shutoff" },
          { label: "Haul-away and disposal of old unit" },
          { label: "Code updates required to pass inspection" },
        ],
      },
      {
        tier: "Better",
        name: "50-gallon high-recovery + expansion tank",
        blurb: "More hot water, code-ready, longer warranty. The popular pick.",
        recommended: true,
        lines: [
          { label: "50-gallon high-recovery tank" },
          { label: "Thermal expansion tank and drip pan" },
          { label: "New shutoff valve and dielectric unions" },
          { label: "6-year manufacturer warranty" },
        ],
      },
      {
        tier: "Best",
        name: "Tankless on-demand system",
        blurb: "Endless hot water, wall-mounted, longest life.",
        lines: [
          { label: "Condensing tankless unit, supply and install" },
          { label: "Gas line and venting upsized as needed" },
          { label: "Isolation service valves for easy descaling" },
          { label: "12-year manufacturer warranty" },
        ],
      },
    ],
    optionsNote:
      "A leaking tank is urgent, but that is exactly when a homeowner will spend on the upgrade if you show it plainly. Put the tankless option on the page and a good share of customers will reach for it.",
    faqs: [
      {
        q: "What should a plumbing estimate include?",
        a: "Your business and license info, the customer and job address, a clear scope per option, the fixtures and warranty, permits and disposal, the price, and an acceptance line. The template below has all of it.",
      },
      {
        q: "Should a plumbing estimate show more than one option?",
        a: "Yes. A single number invites the customer to price-shop it. Three options, the basic swap, a code-ready upgrade, and tankless, turn the conversation into a choice and routinely lift the average ticket.",
      },
      {
        q: "Can I send this from the job site?",
        a: "In OneBy you save the three options as a reusable template and send a branded estimate from your phone at the sink. The customer taps accept and it becomes a scheduled job. Join the founders list for early access.",
      },
    ],
    relatedFeature: { label: "See the estimate builder", href: "/features/estimates" },
  },
  {
    slug: "electrician-estimate-template",
    tradeSlug: "electricians",
    trade: "Electrical",
    kind: "Estimate",
    scenario: "Electrical panel upgrade",
    metaTitle: "Free Electrical Estimate Template (Good / Better / Best)",
    metaDescription:
      "A free electrical estimate template built around a panel upgrade, with the three-option layout that wins bigger jobs. Print it or build and send it in OneBy.",
    keywords: [
      "electrical estimate template",
      "free electrical estimate template",
      "electrician estimate template",
      "electrical quote template",
      "panel upgrade estimate template",
      "electrical proposal template",
    ],
    h1: "Free Electrical Estimate Template",
    heroSub:
      "A three-option estimate built around a real 200-amp panel upgrade, clear enough that the customer decides for themselves. Use it as-is, or build and send it in two taps inside OneBy.",
    intro: [
      "Panel and service work is where a clear estimate earns its keep. Give the homeowner three options on one page, the code-minimum upgrade, the protected upgrade most choose, and the future-ready build, and the decision becomes which level, not whether to call someone else.",
      "This template is free to use. Print it, copy the structure into your own forms, or fill it in on screen. Prices are left blank, add yours.",
    ],
    tiers: [
      {
        tier: "Good",
        name: "100A to 200A panel upgrade",
        blurb: "Bring the service up to code and capacity.",
        lines: [
          { label: "New 200A panel and main breaker" },
          { label: "Transfer existing circuits, new breakers" },
          { label: "Grounding and bonding to current code" },
          { label: "Permit and utility coordination" },
        ],
      },
      {
        tier: "Better",
        name: "200A upgrade + whole-home surge",
        blurb: "Same upgrade, protected against surges. The common pick.",
        recommended: true,
        lines: [
          { label: "Everything in the 200A upgrade" },
          { label: "Whole-home surge protective device" },
          { label: "New grounding electrodes and labeled directory" },
          { label: "AFCI/GFCI breakers where code requires" },
        ],
      },
      {
        tier: "Best",
        name: "200A + surge + EV and generator ready",
        blurb: "Built for what the home will need next.",
        lines: [
          { label: "Everything in the protected upgrade" },
          { label: "Dedicated EV charger circuit, roughed in" },
          { label: "Generator interlock kit and inlet" },
          { label: "Whole-panel AFCI/GFCI and surge protection" },
        ],
      },
    ],
    optionsNote:
      "Homeowners upgrading a panel are usually planning for something, an EV, an addition, a generator. Showing the future-ready option on the same page lets them pay once instead of calling you back next year.",
    faqs: [
      {
        q: "What should an electrical estimate include?",
        a: "Your business and license number, the customer and job address, a clear scope per option, materials and permit, the price, and a line for the customer to accept. The template below covers all of it.",
      },
      {
        q: "Why show three options on an electrical estimate?",
        a: "A single price is easy to shop against the next licensed electrician. Three options, code-minimum, protected, and future-ready, reframe the choice and let homeowners plan for an EV or generator now instead of paying twice.",
      },
      {
        q: "Can I send this from the panel?",
        a: "In OneBy you save the three options as a reusable template and send a branded estimate from your phone on site. The customer taps accept and it becomes a scheduled job. Join the founders list for early access.",
      },
    ],
    relatedFeature: { label: "See the estimate builder", href: "/features/estimates" },
  },
];

export function getTemplate(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function allTemplateSlugs(): string[] {
  return templates.map((t) => t.slug);
}
