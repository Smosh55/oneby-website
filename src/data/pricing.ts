// Pricing data shared by the homepage preview (Pricing.tsx) and the full
// /pricing page. Edit plans/matrix here once.

export type Plan = {
  name: string;
  tagline: string;
  price: string; // "49" or "Custom"
  unit: string;
  cta: string;
  ctaClass: string; // btn-* class for the homepage card
  featured?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "For solo operators and small crews",
    price: "49",
    unit: "/user / mo",
    cta: "Start free trial",
    ctaClass: "btn-ghost",
    features: [
      "Business calling & SMS",
      "Keep your number (free porting)",
      "AI receptionist (after-hours)",
      "Call transcription & summaries",
      "Customer timeline",
      "Mobile app",
    ],
  },
  {
    name: "Growth",
    tagline: "For teams that live on the phone",
    price: "89",
    unit: "/user / mo",
    cta: "Book a demo",
    ctaClass: "btn-primary",
    featured: true,
    features: [
      "Everything in Starter",
      "24/7 AI receptionist",
      "Create AND assign tasks automatically",
      "Desk phones with auto-provisioning",
      "Online fax",
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

// Feature comparison matrix. value: true = included, false = not,
// or a string for plan-specific detail.
export type MatrixRow = { label: string; values: [boolean | string, boolean | string, boolean | string] };
export type MatrixGroup = { group: string; rows: MatrixRow[] };

export const matrix: MatrixGroup[] = [
  {
    group: "Calling & devices",
    rows: [
      { label: "Cloud business phone system", values: [true, true, true] },
      { label: "Keep / port your number", values: [true, true, true] },
      { label: "Included phone numbers", values: ["1", "3", "Custom"] },
      { label: "Business SMS", values: [true, true, true] },
      { label: "Mobile app", values: [true, true, true] },
      { label: "Desk phones with auto-provisioning", values: [false, true, true] },
      { label: "Online fax", values: ["Add-on", true, true] },
      { label: "Multi-location routing", values: [false, false, true] },
    ],
  },
  {
    group: "AI & automation",
    rows: [
      { label: "AI receptionist", values: ["After-hours", "24/7", "24/7"] },
      { label: "Call transcription & summaries", values: [true, true, true] },
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
