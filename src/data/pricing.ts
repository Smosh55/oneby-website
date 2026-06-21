// Pricing data shared by the homepage preview (Pricing.tsx) and the full
// /pricing page. Model: a cheap "Line" (the phone system) plus AI plans (Solo,
// Pro) that add the brain. Priced to undercut the AI-receptionist market while
// staying margin-safe (cost to serve a Solo is ~$75/yr).

export type Plan = {
  name: string;
  tagline: string;
  price: string; // "15" or "Custom"
  unit: string;
  cta: string;
  ctaClass: string; // btn-* class for the homepage card
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Line",
    tagline: "For phones that just need to work",
    price: "15",
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
    name: "Solo",
    tagline: "The AI that answers and books the job",
    price: "39",
    unit: "/mo",
    cta: "Start free trial",
    ctaClass: "btn-primary",
    featured: true,
    features: [
      "Everything in Line",
      "24/7 AI receptionist",
      "Post-call automation on every call",
      "Create AND assign tasks automatically",
      "Call recording + AI search",
      "Popular CRM & tool integrations",
    ],
  },
  {
    name: "Pro",
    tagline: "For teams that run on the phone",
    price: "99",
    unit: "/mo",
    cta: "Book a demo",
    ctaClass: "btn-navy",
    features: [
      "Everything in Solo",
      "Multiple users & numbers",
      "Shared team inbox & workflow automation",
      "Advanced analytics & reporting",
      "Custom integrations",
      "Priority support",
    ],
  },
];

// Per-unit monthly rates used by the interactive estimator.
export const estimatorRates = {
  aiSeat: 39, // a Solo line with the AI brain
  basicLine: 15, // a Line, dialtone only
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
      { label: "Included phone numbers", values: ["1", "1", "3+"] },
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
      { label: "Included users", values: ["1", "1", "Up to 5"] },
      { label: "Customer timeline", values: [true, true, true] },
      { label: "Shared team inbox", values: [false, false, true] },
      { label: "Analytics & reporting", values: ["Basic", "Standard", "Advanced"] },
      { label: "CRM & tool integrations", values: [false, "Popular tools", "Custom"] },
      { label: "Support", values: ["Email", "Priority", "Dedicated"] },
    ],
  },
];

export const addOns: { name: string; detail: string }[] = [
  { name: "Extra phone numbers", detail: "Local or toll-free, add as many as you need." },
  { name: "Desk phone hardware", detail: "Plug-and-play handsets that provision themselves." },
  { name: "Extra basic lines", detail: "Phones that just dial, $15 each, no AI needed." },
  { name: "Multi-location & Enterprise", detail: "Custom routing, a branded AI voice, and a dedicated manager. Talk to sales." },
];
