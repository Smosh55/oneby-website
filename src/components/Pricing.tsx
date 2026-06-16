import Reveal from "./Reveal";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    tagline: "For solo operators and small crews",
    price: "49",
    unit: "/user / mo",
    cta: "Start free trial",
    ctaClass: "btn-ghost",
    features: [
      "Business calling & SMS",
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
      "Automatic task creation & routing",
      "Shared team inbox",
      "Workflow automation",
      "Call recording + AI search",
    ],
  },
  {
    name: "Pro",
    tagline: "For multi-location & high volume",
    price: "Custom",
    unit: "talk to sales",
    cta: "Contact sales",
    ctaClass: "btn-navy",
    features: [
      "Everything in Growth",
      "Multi-location routing",
      "Advanced analytics & reporting",
      "CRM & field-software integrations",
      "Priority support & onboarding",
      "Dedicated success manager",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Plans that pay for themselves in one saved job.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Start free for 14 days. No phone hardware, no contracts, cancel
            anytime.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 90}>
              <div
                className={`relative flex h-full flex-col rounded-2xl p-7 ${
                  plan.featured
                    ? "bg-navy text-white shadow-[var(--shadow-xl)] ring-1 ring-blue/40 lg:-mt-4 lg:mb-0"
                    : "surface-card"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-[var(--shadow-md)]">
                    Most popular
                  </span>
                )}
                <h3
                  className={`text-lg font-bold ${
                    plan.featured ? "text-white" : "text-navy"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    plan.featured ? "text-white/65" : "text-muted"
                  }`}
                >
                  {plan.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  {plan.price !== "Custom" && (
                    <span
                      className={`text-2xl font-semibold ${
                        plan.featured ? "text-white/70" : "text-muted"
                      }`}
                    >
                      $
                    </span>
                  )}
                  <span
                    className={`text-5xl font-extrabold tracking-tight ${
                      plan.featured ? "text-white" : "text-navy"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`ml-1 text-sm ${
                      plan.featured ? "text-white/60" : "text-faint"
                    }`}
                  >
                    {plan.unit}
                  </span>
                </div>

                <a
                  href="#demo"
                  className={`btn mt-6 w-full ${
                    plan.featured ? "btn-white" : plan.ctaClass
                  }`}
                >
                  {plan.cta}
                </a>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                          plan.featured
                            ? "bg-green/20 text-green"
                            : "bg-green/15 text-green-600"
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span
                        className={`text-[0.9rem] ${
                          plan.featured ? "text-white/85" : "text-ink"
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
