import Link from "next/link";
import Reveal from "./Reveal";
import { Check } from "lucide-react";
import { plans } from "@/data/pricing";

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
            Cheap lines for the phones that just dial. AI seats only on the
            lines that book jobs. Start free for 14 days, cancel anytime.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-flex text-sm font-semibold text-blue hover:underline"
          >
            Build your plan with the estimator →
          </Link>
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
