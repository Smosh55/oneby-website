import Link from "next/link";
import Reveal from "../Reveal";
import { Check, ArrowRight } from "lucide-react";

// Honest, CRM-first pricing teaser. No AI-suite line items (that's parked); the
// full plan comparison lives on /pricing.
const points = [
  "The CRM is free to use — jobs, scheduling, estimates, invoicing, customers",
  "A dedicated business line is $15/mo",
  "No per-seat traps, no contract, no surprise bill",
];

export default function CrmPricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Starts free. Scales when you do.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Most CRMs charge per seat and lock you into a contract before you&apos;ve
            booked a single job. OneBy doesn&apos;t.
          </p>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 max-w-xl">
          <div className="rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-sm)]">
            <ul className="space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green/15 text-green-600">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-ink">{p}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/pricing"
              className="btn btn-primary mt-8 w-full text-base"
            >
              See the full pricing <ArrowRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
