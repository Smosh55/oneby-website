// Pricing data shared by the homepage preview (Pricing.tsx) and the full
// /pricing page. Model: cheap universal "lines" (the phone system) plus
// "AI seats" you add only on the lines that need the brain.

export type Plan = {
  name: string;
  tagline: string;
  price: string; // "18" or "Custom"
  unit: string;
  cta: string;
  ctaClass: string; // btn-* class for the homepage card
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Basic Line",
    tagline: "For phones that just need to work",
    price: "18",
    unit: "/line / mo",
    cta: "Start free trial",
    ctaClass: "btn-ghost",
    features: [
      "Business calling & SMS",
      "Desk phone with auto-provisioning",
      "Online fax",
      "Keep your number (free porting)",
      "Mobile app",
      "Customer timeline",
    ],
  },
  {
    name: "Growth",
    tagline: "AI seat for the lines that book jobs",
    price: "89",
    unit: "/seat / mo",
    cta: "Book a demo",
    ctaClass: "btn-primary",
    featured: true,
    features: [
      "Everything in Basic Line",
      "24/7 AI receptionist",
      "Post-call automation on every call",
      "Create AND assign tasks automatically",
      "Shared team inbox & workflow automation",
      "Call recording + AI search",
    ],
  },
  {
    name: "Pro",
    tagline: "For multi-location and high volume",
    price: "Custom",
    unit: "talk to sales",
    cta: "Contact sales",
    ctaClass: "btn-navy",
    features: [
      "Everything in Growth",
      "Multi-location call routing",
      "Advanced analytics & reporting",
      "CRM & field-software integrations",
      "Priority support & onboarding",
      "Dedicated success manager",
    ],
  },
];

// Per-unit monthly rates used by the interactive estimator.
export const estimatorRates = {
  aiSeat: 89, // a Growth AI seat
  basicLine: 18, // a Basic Line
  commonArea: 6, // shared/common-area device (lobby, conference, paging)
};

// Feature comparison matrix. value: true = included, false = not,
// or a string for plan-specific detail. Columns map to plans above.
export type MatrixRow = {
  label: string;
  values: [boolean | string, boolean | string, boolean | string];
};
export type MatrixGroup = { group: string; rows: MatrixRow[] };

export const matrix: MatrixGroup[] = [
  {
    group: "Calling & devices (on every line)",
    rows: [
      { label: "Cloud business phone system", values: [true, true, true] },
      { label: "Keep / port your number", values: [true, true, true] },
      { label: "Included phone numbers", values: ["1", "3", "Custom"] },
      { label: "Business SMS", values: [true, true, true] },
      { label: "Online fax", values: [true, true, true] },
      { label: "Desk phones with auto-provisioning", values: [true, true, true] },
      { label: "Mobile app", values: [true, true, true] },
      { label: "Multi-location routing", values: [false, false, true] },
    ],
  },
  {
    group: "AI & automation (the brain)",
    rows: [
      { label: "AI receptionist", values: [false, "24/7", "24/7"] },
      { label: "Call transcription & summaries", values: [false, true, true] },
      { label: "Create AND assign tasks", values: [false, true, true] },
      { label: "Workflow automation", values: [false, true, true] },
      { label: "Call recording + AI search", values: [false, true, true] },
    ],
  },
  {
    group: "Collaboration & admin",
    rows: [
      { label: "Customer timeline", values: [true, true, true] },
      { label: "Shared team inbox", values: [false, true, true] },
      { label: "Analytics & reporting", values: ["Basic", "Standard", "Advanced"] },
      { label: "CRM & field-software integrations", values: [false, "Popular tools", "Custom"] },
      { label: "Support", values: ["Email", "Priority", "Dedicated CSM"] },
    ],
  },
];

export const addOns: { name: string; detail: string }[] = [
  { name: "Extra phone numbers", detail: "Local or toll-free, add as many as you need." },
  { name: "Desk phone hardware", detail: "Plug-and-play handsets that provision themselves." },
  { name: "Additional fax pages", detail: "For the months the paperwork piles up." },
  { name: "Extra AI minutes", detail: "For high-volume seasons when the phone never stops." },
];
