// Founding-member content, under the new pricing model: the CRM software is
// free, the phone line is $15/user/mo (the always-on floor), and the AI Suite is
// $49/user/mo with a 30-day public trial. Founders get the AI Suite free for 6
// months, then a rate locked at $39/mo (vs $49 standard) for two years. One clean
// offer, claimed free, no prepaid tiers.

export const founderPricing = {
  standardMonthly: 49, // AI Suite, standard per seat
  founderMonthly: 39, // founder locked rate, held two years
  lineMonthly: 15, // the always-on phone line
  freeMonths: 6, // AI Suite free window for founders (public trial is 30 days)
};

// The single founding-member offer, shown as one clean card.
export const founderPerks: string[] = [
  "The full AI Suite free for 6 months, not the public 30-day trial",
  `Then locked at $${founderPricing.founderMonthly}/mo for two years, while everyone else pays $${founderPricing.standardMonthly}`,
  "A founder AI allowance that never shrinks",
  "Founder badge, first beta invite, and priority support",
];

// Stretch goals: features NOT yet in the product. Kept honest and forward.
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
