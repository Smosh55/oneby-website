// Founding-member / crowdfunding campaign content. Single source of truth for
// the tiers and stretch goals so the pricing stays easy to keep honest.
//
// Cost basis (per Solo): ~$60/yr AI + ~$15/yr calls = ~$75/yr to serve, plus
// ~$50 one-time per phone. Locked renewal rates below sit well above that, so a
// founding member is profitable every year. The founder rate is held for two
// years past the first (prepaid) year, then rolls to standard pricing: a
// bounded promise we can always keep. We never sell "pay once, free forever"
// because the per-year cost never goes away.

export const founderPricing = {
  soloRetailMonthly: 39,
  soloLockedMonthly: 29,
  // Pro is per user now (teams pay per seat).
  proRetailMonthly: 49,
  proLockedMonthly: 35,
};

export type FounderTier = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  includes: string[];
  locked?: string;
  hardware?: boolean;
  highlight?: boolean;
  badge?: string;
};

export const founderTiers: FounderTier[] = [
  {
    id: "believer",
    name: "Believer",
    price: 10,
    tagline: "Cheer us on and grab a spot at the front of the line.",
    includes: [
      "Founding member badge in the app",
      "Your name on the founders wall",
      "A sticker pack in the mail",
      "First invite to the beta",
    ],
  },
  {
    id: "founding-solo",
    name: "Founding Solo",
    price: 129,
    tagline: "A full year of OneBy, then your founder rate, locked for two years.",
    highlight: true,
    badge: "Most popular",
    includes: [
      "A full year of OneBy Solo",
      "One number, keep the phone you already have",
      "AI answers, summarizes, and builds your tasks",
      "Call recording and searchable history",
    ],
    locked: `$${founderPricing.soloLockedMonthly}/mo`,
  },
  {
    id: "oneby-phone",
    name: "OneBy Phone",
    price: 199,
    tagline: "Everything in Founding Solo, plus a phone that works the second you plug it in.",
    hardware: true,
    badge: "Home + solo",
    includes: [
      "A ready-to-go OneBy phone, home cordless or desk, your pick",
      "A full year of OneBy Solo",
      "Plug it in and it just works, no setup",
      "Keep your number or pick a new one",
    ],
    locked: `$${founderPricing.soloLockedMonthly}/mo`,
  },
  {
    id: "founding-pro",
    name: "Founding Pro",
    price: 349,
    tagline: "Built for a small team that lives on the phone.",
    includes: [
      "A full year of Pro for 2 seats",
      "Multiple numbers and team members",
      "Shared inbox, assignments, and integrations",
      "Priority support",
    ],
    locked: `$${founderPricing.proLockedMonthly}/user`,
  },
  {
    id: "office-starter",
    name: "Office Starter",
    price: 799,
    tagline: "Three desks, one tidy phone system, zero IT headache.",
    hardware: true,
    includes: [
      "Three ready-to-go OneBy desk phones",
      "A full year of Pro service for 3 seats",
      "Multi-line, shared inbox, assignments",
      "We set it up with you on a call",
    ],
    locked: `$${founderPricing.proLockedMonthly}/user`,
  },
  {
    id: "founding-partner",
    name: "Founding Partner",
    price: 2500,
    tagline: "The white-glove package for a serious operation.",
    badge: "Limited",
    includes: [
      "Up to five ready-to-go phones",
      "A branded AI voice for your business",
      "White-glove setup, done with you",
      "A one-on-one call with the founder",
      "Your founder rate, locked for two years",
    ],
  },
];

// Stretch goals are things NOT yet in the product. Calendar sync, the mobile
// app, and invoicing/payments already shipped, so they were retired from this
// list. Keep this list to genuinely-ahead features so it stays honest.
export const stretchGoals = [
  {
    amount: "$25k",
    title: "Bilingual AI",
    body: "A natural Spanish-speaking AI so you never lose a caller to a language gap.",
  },
  {
    amount: "$50k",
    title: "Online booking page",
    body: "Customers book you from your website or a link, and it lands straight on your schedule.",
  },
  {
    amount: "$75k",
    title: "Automated review requests",
    body: "After a paid job, OneBy asks happy customers for a Google review on its own.",
  },
  {
    amount: "$100k",
    title: "QuickBooks and Xero sync",
    body: "Push invoices, customers, and payments to your books automatically, no double entry.",
  },
];
