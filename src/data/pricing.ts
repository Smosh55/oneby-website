// Pricing data shared by the homepage preview (Pricing.tsx) and the full
// /pricing page. Model: the CRM software is free; a business phone Line is
// $15/user/mo (the always-on floor); the AI Suite adds the AI receptionist and
// automation for $49/user/mo, all-in, with a 30-day free trial and generous
// usage included (no visible per-call meter). Founders lock a better rate.

export type Plan = {
  name: string;
  tagline: string;
  price: string; // "0", "15", "49", or "Custom"
  unit: string;
  cta: string;
  ctaClass: string; // btn-* class for the homepage card
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Free",
    tagline: "The whole CRM, on the house",
    price: "0",
    unit: "forever",
    cta: "Reserve the free CRM",
    ctaClass: "btn-ghost",
    features: [
      "Tickets, scheduling, and invoicing",
      "Good, Better, Best estimates and price book",
      "Customer timeline and tasks",
      "Add a phone line whenever you're ready",
    ],
  },
  {
    name: "Line",
    tagline: "Your business phone, always $15",
    price: "15",
    unit: "/user / mo",
    cta: "Reserve a line",
    ctaClass: "btn-navy",
    features: [
      "Everything in Free",
      "Business calling and voicemail",
      "Desk phone with auto-provisioning",
      "Online fax and mobile app",
      "Keep your number (free porting)",
      "Missed-call text back",
    ],
  },
  {
    name: "AI Suite",
    tagline: "The AI that answers and books the job",
    price: "49",
    unit: "/user / mo",
    cta: "Reserve the AI trial",
    ctaClass: "btn-primary",
    featured: true,
    features: [
      "Everything in Line",
      "24/7 AI receptionist",
      "Call summaries and auto-created tasks",
      "Automations across calls and jobs",
      "Call recording and AI search",
      "Generous usage included, no per-call meter",
    ],
  },
];

// Feature comparison matrix. value: true = included, false = not,
// or a string for plan-specific detail. Columns map to plans above
// (Free, Line, AI Suite).
export type MatrixRow = {
  label: string;
  values: [boolean | string, boolean | string, boolean | string];
};
export type MatrixGroup = { group: string; rows: MatrixRow[] };

export const matrix: MatrixGroup[] = [
  {
    group: "The CRM (free, always)",
    rows: [
      { label: "Tickets, scheduling, and invoicing", values: [true, true, true] },
      { label: "Good, Better, Best estimates", values: [true, true, true] },
      { label: "Price book", values: [true, true, true] },
      { label: "Customer timeline and tasks", values: [true, true, true] },
      { label: "Team members and roles", values: [true, true, true] },
    ],
  },
  {
    group: "Phone system (the $15 line)",
    rows: [
      { label: "Business calling and voicemail", values: [false, true, true] },
      { label: "Keep / port your number", values: [false, true, true] },
      { label: "Desk phones with auto-provisioning", values: [false, true, true] },
      { label: "Online fax", values: [false, true, true] },
      { label: "Mobile app", values: [false, true, true] },
      { label: "Missed-call text back", values: [false, true, true] },
    ],
  },
  {
    group: "AI Suite (the brain)",
    rows: [
      { label: "24/7 AI receptionist", values: [false, false, true] },
      { label: "Call summaries and auto-tasks", values: [false, false, true] },
      { label: "Automations across calls and jobs", values: [false, false, true] },
      { label: "Call recording + AI search", values: [false, false, true] },
      { label: "Included AI usage", values: [false, false, "Generous, no meter"] },
      { label: "Free trial", values: [false, false, "30 days"] },
    ],
  },
  {
    group: "Collaboration and admin",
    rows: [
      { label: "Shared team inbox", values: [false, true, true] },
      { label: "Analytics and reporting", values: ["Basic", "Standard", "Advanced"] },
      { label: "Integrations", values: ["Core set", "Core set", "Popular + custom"] },
      { label: "Priority support", values: [false, false, true] },
    ],
  },
];

export const addOns: { name: string; detail: string }[] = [
  { name: "Extra phone numbers", detail: "Local or toll-free, add as many as you need." },
  { name: "Business texting", detail: "Two-way SMS on your number, carrier-registered (10DLC): $19.99/mo per number, includes 2,000 monthly texts under fair use." },
  { name: "Desk phone hardware", detail: "Plug-and-play handsets that provision themselves." },
  { name: "Extra lines", detail: "Phones that just dial, $15 each, no AI needed." },
  { name: "Multi-location and Enterprise", detail: "Custom routing, a branded AI voice, and a dedicated manager. Talk to sales." },
];
