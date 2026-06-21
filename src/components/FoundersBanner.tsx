import Link from "next/link";
import { Gift, ArrowRight, Lock } from "lucide-react";

export default function FoundersBanner() {
  return (
    <section className="container-x py-12 lg:py-16">
      <div className="relative overflow-hidden rounded-[28px] border border-green/25 bg-gradient-to-br from-green/[0.08] via-surface to-blue/[0.06] px-7 py-10 sm:px-12 sm:py-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.25),transparent)]" />
        <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow rounded-full border border-green/30 bg-green/10 px-3 py-1.5 text-green-600">
              <Gift size={14} /> Founding member pre-sale
            </span>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Get in early and lock the lowest price for life.
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Back OneBy now, lock a founder rate that never goes up, and grab an
              optional phone that works the second you plug it in.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
              <Lock size={14} /> Price frozen for life, no contract
            </p>
          </div>
          <Link href="/founders" className="btn btn-primary shrink-0 text-base">
            Become a founder <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
