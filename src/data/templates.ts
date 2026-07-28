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
  {
    slug: "roofing-estimate-template",
    tradeSlug: "roofing",
    trade: "Roofing",
    kind: "Estimate",
    scenario: "Asphalt shingle roof replacement",
    metaTitle: "Free Roofing Estimate Template (Good / Better / Best)",
    metaDescription:
      "A free roofing estimate template built around a shingle roof replacement, with the three-option layout that wins bigger jobs. Print it or build and send it in OneBy.",
    keywords: [
      "roofing estimate template",
      "free roofing estimate template",
      "roof replacement estimate template",
      "roofing quote template",
      "roofing proposal template",
      "roofing bid template",
    ],
    h1: "Free Roofing Estimate Template",
    heroSub:
      "A three-option estimate built around a real shingle roof replacement, clear enough that the homeowner decides for themselves. Use it as-is, or build and send it in two taps inside OneBy.",
    intro: [
      "A roof is a big number, and a single price sends the homeowner straight to two more contractors. Give them three options on one page, the patch, the full replacement most choose, and the premium system, and the decision becomes which one instead of who else to call.",
      "This template is free to use. Print it, copy the structure into your own forms, or fill it in on screen. Prices are left blank, add yours.",
    ],
    tiers: [
      {
        tier: "Good",
        name: "Repair and patch",
        blurb: "Stop the leak and buy time on an aging roof.",
        lines: [
          { label: "Replace damaged and missing shingles" },
          { label: "Reseal flashing and pipe boots" },
          { label: "Spot-replace rotten decking as found" },
          { label: "Roof inspection and photo report" },
        ],
      },
      {
        tier: "Better",
        name: "Full architectural shingle replacement",
        blurb: "Complete tear-off and new roof, under warranty. The common pick.",
        recommended: true,
        lines: [
          { label: "Tear off to deck and inspect sheathing" },
          { label: "Synthetic underlayment and new architectural shingles" },
          { label: "New flashing, boots, and ridge ventilation" },
          { label: "Manufacturer and workmanship warranty" },
        ],
      },
      {
        tier: "Best",
        name: "Impact-resistant premium system",
        blurb: "Toughest, longest coverage, may lower insurance.",
        lines: [
          { label: "Class 4 impact-resistant shingles" },
          { label: "Full ice-and-water shield and upgraded ventilation" },
          { label: "Transferable manufacturer warranty" },
          { label: "Documentation for a possible insurance discount" },
        ],
      },
    ],
    optionsNote:
      "Storm-damaged roofs are urgent and often partly insured, so put the patch and the full system side by side. Many homeowners move up once they see the warranty and the impact-resistant option in plain terms.",
    faqs: [
      {
        q: "What should a roofing estimate include?",
        a: "Your business and license info, the customer and property address, a clear scope per option, materials and warranty, tear-off and disposal, the price, and an acceptance line. The template below has all of it.",
      },
      {
        q: "Why give three options on a roofing estimate?",
        a: "A roof is expensive enough that a single price gets bid against two other contractors. Three options keep the conversation with you and let the homeowner weigh a repair against a warrantied replacement, which routinely lifts the average job.",
      },
      {
        q: "Can I send this from the roof?",
        a: "In OneBy you save the three options as a reusable template and send a branded estimate from your phone on site. The customer taps accept and it becomes a scheduled job. Join the founders list for early access.",
      },
    ],
    relatedFeature: { label: "See the estimate builder", href: "/features/estimates" },
  },
  {
    slug: "garage-door-estimate-template",
    tradeSlug: "garage-door",
    trade: "Garage Door",
    kind: "Estimate",
    scenario: "Garage door replacement",
    metaTitle: "Free Garage Door Estimate Template (Good / Better / Best)",
    metaDescription:
      "A free garage door estimate template built around a door replacement, with the three-option layout that wins bigger jobs. Print it or build and send it in OneBy.",
    keywords: [
      "garage door estimate template",
      "free garage door estimate template",
      "garage door quote template",
      "garage door replacement estimate",
      "garage door proposal template",
      "garage door repair estimate template",
    ],
    h1: "Free Garage Door Estimate Template",
    heroSub:
      "A three-option estimate built around a real garage door replacement, clear enough that the customer decides for themselves. Use it as-is, or build and send it in two taps inside OneBy.",
    intro: [
      "Most garage door calls start as a repair and turn into a bigger sale when the customer sees the options. Put them on one page, the repair, the new door most choose, and the insulated door with a smart opener, and the choice becomes which one instead of just fix it.",
      "This template is free to use. Print it, copy the structure into your own forms, or fill it in on screen. Prices are left blank, add yours.",
    ],
    tiers: [
      {
        tier: "Good",
        name: "Repair the existing door",
        blurb: "Get it opening again for the least money today.",
        lines: [
          { label: "Replace broken springs, cables, or rollers" },
          { label: "Realign track and tune the opener" },
          { label: "Safety sensor check and balance test" },
          { label: "Lubricate and adjust hardware" },
        ],
      },
      {
        tier: "Better",
        name: "New steel door and hardware",
        blurb: "Fresh door, quiet hardware, under warranty. The popular pick.",
        recommended: true,
        lines: [
          { label: "New steel sectional door, installed" },
          { label: "New springs, rollers, and quiet nylon hardware" },
          { label: "Haul-away of old door" },
          { label: "Manufacturer and labor warranty" },
        ],
      },
      {
        tier: "Best",
        name: "Insulated door + smart opener",
        blurb: "Quietest, most efficient, phone-controlled.",
        lines: [
          { label: "Insulated door with upgraded panels and windows" },
          { label: "Smart Wi-Fi opener with phone control" },
          { label: "Battery backup and new weather seal" },
          { label: "Extended warranty on door and opener" },
        ],
      },
    ],
    optionsNote:
      "A snapped spring is the moment to show the new door. The customer is already stuck at home waiting, so laying the repair next to an insulated upgrade with a smart opener turns a service call into a replacement more often than you would think.",
    faqs: [
      {
        q: "What should a garage door estimate include?",
        a: "Your business and license info, the customer and job address, a clear scope per option, the door and opener specs, warranty, haul-away, the price, and an acceptance line. The template below covers all of it.",
      },
      {
        q: "Why give three options on a garage door estimate?",
        a: "A single repair price rarely surfaces the bigger sale. Three options let the customer weigh a fix against a new insulated door and a smart opener, and a good share move up once they see it side by side.",
      },
      {
        q: "Can I send this from the driveway?",
        a: "In OneBy you save the three options as a reusable template and send a branded estimate from your phone on site. The customer taps accept and it becomes a scheduled job. Join the founders list for early access.",
      },
    ],
    relatedFeature: { label: "See the estimate builder", href: "/features/estimates" },
  },
  {
    slug: "pest-control-quote-template",
    tradeSlug: "pest-control",
    trade: "Pest Control",
    kind: "Estimate",
    scenario: "Recurring pest control service",
    metaTitle: "Free Pest Control Quote Template (Good / Better / Best)",
    metaDescription:
      "A free pest control quote template with one-time, quarterly, and premium plan options, the three-tier layout that wins recurring accounts. Print it or build it in OneBy.",
    keywords: [
      "pest control quote template",
      "free pest control quote template",
      "pest control estimate template",
      "pest control proposal template",
      "pest control service agreement template",
      "pest control pricing template",
    ],
    h1: "Free Pest Control Quote Template",
    heroSub:
      "A three-option quote built around recurring service, from one-time treatment to a premium plan, so the customer chooses the coverage they want. Use it as-is, or build and send it in two taps inside OneBy.",
    intro: [
      "Pest control lives on recurring accounts, and the fastest way to win one is to show the plans side by side. Put a one-time treatment next to a quarterly plan and a premium plan, and most customers step up to recurring on their own instead of calling once and disappearing.",
      "This template is free to use. Print it, copy the structure into your own forms, or fill it in on screen. Prices are left blank, add yours.",
    ],
    tiers: [
      {
        tier: "Good",
        name: "One-time treatment",
        blurb: "Knock down the problem today.",
        lines: [
          { label: "Full interior and exterior inspection" },
          { label: "Targeted treatment for the active pest" },
          { label: "Exterior barrier application" },
          { label: "30-day retreatment if they come back" },
        ],
      },
      {
        tier: "Better",
        name: "Quarterly protection plan",
        blurb: "Year-round coverage, free re-services. The best value.",
        recommended: true,
        lines: [
          { label: "Initial treatment plus quarterly visits" },
          { label: "Covers common household pests" },
          { label: "Free re-services between visits" },
          { label: "No long-term contract required" },
        ],
      },
      {
        tier: "Best",
        name: "Premium plan + termite monitoring",
        blurb: "Total coverage with termite and rodent protection.",
        lines: [
          { label: "Everything in the quarterly plan" },
          { label: "Termite monitoring stations and inspection" },
          { label: "Rodent control and exclusion" },
          { label: "Priority scheduling and annual report" },
        ],
      },
    ],
    optionsNote:
      "A one-time call is a customer you will chase again next season. Showing the quarterly and premium plans on the same page turns a single treatment into a recurring account, which is the number that actually grows a pest business.",
    faqs: [
      {
        q: "What should a pest control quote include?",
        a: "Your business and license info, the customer and service address, a clear scope per plan, what pests are covered, the service frequency, re-service terms, the price, and an acceptance line. The template below covers all of it.",
      },
      {
        q: "Why give three options on a pest control quote?",
        a: "A single one-time price wins one visit. Three tiers, one-time, quarterly, and premium, let the customer choose recurring coverage themselves, and recurring accounts are what build predictable revenue in pest control.",
      },
      {
        q: "Can I send this from the customer's yard?",
        a: "In OneBy you save the three plans as a reusable template and send a branded quote from your phone on site. The customer taps accept and it becomes a scheduled, recurring job. Join the founders list for early access.",
      },
    ],
    relatedFeature: { label: "See the estimate builder", href: "/features/estimates" },
  },
  {
    slug: "landscaping-estimate-template",
    tradeSlug: "landscaping",
    trade: "Landscaping",
    kind: "Estimate",
    scenario: "Front yard landscape renovation",
    metaTitle: "Free Landscaping Estimate Template (Good / Better / Best)",
    metaDescription:
      "A free landscaping estimate template built around a yard renovation, with the three-option layout that wins bigger jobs. Print it or build and send it in OneBy.",
    keywords: [
      "landscaping estimate template",
      "free landscaping estimate template",
      "lawn care estimate template",
      "landscaping quote template",
      "landscaping proposal template",
      "landscaping bid template",
    ],
    h1: "Free Landscaping Estimate Template",
    heroSub:
      "A three-option estimate built around a real yard renovation, so the customer chooses the scope they want. Use it as-is, or build and send it in two taps inside OneBy.",
    intro: [
      "Landscaping budgets are wide open, so a single number rarely matches what the customer had in mind. Give them three options on one page, the cleanup, the renovation most choose, and the full design build, and they pick the scope that fits their budget instead of shopping the whole job.",
      "This template is free to use. Print it, copy the structure into your own forms, or fill it in on screen. Prices are left blank, add yours.",
    ],
    tiers: [
      {
        tier: "Good",
        name: "Cleanup and refresh",
        blurb: "Make the yard look cared for again.",
        lines: [
          { label: "Cleanup, pruning, and weeding" },
          { label: "Re-edge beds and fresh mulch" },
          { label: "Seasonal color at the entry" },
          { label: "Haul-away of debris" },
        ],
      },
      {
        tier: "Better",
        name: "Renovation with new plantings",
        blurb: "New beds, plants, and irrigation tune-up. The popular pick.",
        recommended: true,
        lines: [
          { label: "Bed redesign and soil prep" },
          { label: "New shrubs, perennials, and mulch" },
          { label: "Irrigation repair and tune-up" },
          { label: "Sod patching and cleanup" },
        ],
      },
      {
        tier: "Best",
        name: "Full design build",
        blurb: "Designed landscape with irrigation and lighting.",
        lines: [
          { label: "Landscape design and plan" },
          { label: "Hardscape accents and new plantings" },
          { label: "New drip irrigation system" },
          { label: "Low-voltage lighting and plant warranty" },
        ],
      },
    ],
    optionsNote:
      "Curb appeal sells itself once the customer can picture it. Putting a simple refresh next to a designed build lets them reach for more yard than they first asked for, without you having to push.",
    faqs: [
      {
        q: "What should a landscaping estimate include?",
        a: "Your business info, the customer and property address, a clear scope per option, materials and plantings, cleanup and haul-away, the price, and an acceptance line. The template below covers all of it.",
      },
      {
        q: "Why give three options on a landscaping estimate?",
        a: "Landscaping budgets vary widely, so a single price often misses. Three options let the customer choose between a refresh, a renovation, and a full design build, which keeps the job with you and lifts the average ticket.",
      },
      {
        q: "Can I send this from the job site?",
        a: "In OneBy you save the three options as a reusable template and send a branded estimate from your phone in the yard. The customer taps accept and it becomes a scheduled job. Join the founders list for early access.",
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
