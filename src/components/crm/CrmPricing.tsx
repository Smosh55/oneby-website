import Link from "next/link";
import Reveal from "../Reveal";
import { Check, ArrowRight } from "lucide-react";

// CRM-first pricing teaser: one simple per-user price, every feature included.
// The full plan detail lives on /pricing.
const points = [
  "Every feature included — no locked tiers, no add-on upsells",
  "Complimentary one-hour onboarding to get your team live",
  "A dedicated account rep, and customizations for how you work",
  "No contract, cancel anytime",
];

export default function CrmPricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            One price. Every feature.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            No tiers to decode and nothing held back. The whole platform, for
            every seat on your team.
          </p>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 max-w-xl">
          <div className="rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-sm)]">
            <div className="flex items-baseline justify-center gap-1.5 border-b border-line pb-7">
              <span className="text-2xl font-semibold text-muted">$</span>
              <span className="text-6xl font-extrabold tracking-tight text-navy">15</span>
              <span className="ml-1 text-base text-faint">/ user / month</span>
            </div>
            <ul className="mt-7 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green/15 text-green-600">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-ink">{p}</span>
                </li>
              ))}
            </ul>
            <Link href="/pricing" className="btn btn-primary mt-8 w-full text-base">
              See the full pricing <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
