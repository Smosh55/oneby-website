import Link from "next/link";
import {
  Check,
  Minus,
  ChevronRight,
  ArrowRight,
  ThumbsUp,
  Sparkles,
} from "lucide-react";
import type { Comparison, CompareRow } from "@/data/comparisons";
import Reveal from "@/components/Reveal";

function Val({ value, strong }: { value: boolean | string; strong?: boolean }) {
  if (value === true)
    return (
      <span
        className={`mx-auto grid h-6 w-6 place-items-center rounded-full ${
          strong ? "bg-green/15 text-green-600" : "bg-canvas-2 text-muted"
        }`}
      >
        <Check size={14} strokeWidth={3} />
      </span>
    );
  if (value === false)
    return (
      <span className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-canvas-2 text-faint">
        <Minus size={13} />
      </span>
    );
  return (
    <span className="text-[0.82rem] font-medium text-navy">{value}</span>
  );
}

export default function ComparisonLanding({ data }: { data: Comparison }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[960px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
        </div>
        <div className="container-x">
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="hover:text-navy">
              Home
            </Link>
            <ChevronRight size={14} className="text-faint" />
            <Link href="/compare" className="hover:text-navy">
              Compare
            </Link>
            <ChevronRight size={14} className="text-faint" />
            <span className="font-medium text-navy">{data.competitor}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
              {data.category}
            </span>
            <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.25rem]">
              {data.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {data.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demo" className="btn btn-primary text-base">
                Book a demo <ArrowRight size={18} />
              </Link>
              <Link href="/pricing" className="btn btn-ghost text-base">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Where they're strong (fair) */}
      <section className="py-12 lg:py-16">
        <div className="container-x">
          <Reveal>
            <div className="rounded-2xl border border-line bg-canvas px-6 py-8 sm:px-10">
              <div className="flex items-center gap-2">
                <ThumbsUp size={18} className="text-navy" />
                <h2 className="text-lg font-bold text-navy">
                  Where {data.competitor} is genuinely strong
                </h2>
              </div>
              <p className="mt-2 text-[0.95rem] text-muted">
                Credit where it's due. {data.competitor} does some things really
                well.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {data.theirStrengths.map((s) => (
                  <li
                    key={s}
                    className="rounded-xl border border-line bg-white px-4 py-3 text-[0.9rem] text-ink"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Where OneBy wins */}
      <section className="pb-12 lg:pb-16">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Where OneBy wins</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Why teams switch to OneBy
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {data.wins.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div className="surface-card h-full rounded-2xl p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue/10 to-green/10 text-blue">
                    <Sparkles size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {w.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Matrix */}
      <section className="pb-12 lg:pb-16">
        <div className="container-x">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            OneBy vs {data.competitor}, side by side
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-[var(--shadow-sm)]">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-line bg-canvas/70">
                  <th className="px-5 py-4 text-left text-sm font-semibold text-muted">
                    Capability
                  </th>
                  <th className="bg-blue/5 px-4 py-4 text-center text-sm font-bold text-blue">
                    OneBy
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-navy">
                    {data.competitor}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.matrix.map((row: CompareRow) => (
                  <tr
                    key={row.label}
                    className="border-b border-line last:border-0"
                  >
                    <td className="px-5 py-3.5 text-[0.9rem] font-medium text-ink">
                      {row.label}
                    </td>
                    <td className="bg-blue/5 px-4 py-3.5 text-center">
                      <Val value={row.oneby} strong />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Val value={row.them} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-faint">
            {data.competitor} is a trademark of its respective owner. Comparison
            reflects typical positioning and is provided in good faith.
          </p>
        </div>
      </section>

      {/* Who should pick what */}
      <section className="pb-12 lg:pb-16">
        <div className="container-x grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="surface-card h-full rounded-2xl p-7">
              <h3 className="text-lg font-semibold text-navy">
                Pick {data.competitor} if
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {data.pickThemIf}
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-2xl bg-navy p-7 text-white">
              <h3 className="text-lg font-semibold">Pick OneBy if</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/75">
                {data.pickOneByIf}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-12 lg:pb-16">
        <div className="container-x">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {data.faqs.map((f) => (
              <div key={f.q} className="surface-card rounded-2xl p-6">
                <h3 className="font-semibold text-navy">{f.q}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.1]">
                See the difference on your own calls.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Book a quick demo and watch OneBy turn a real call into a summary
                and an assigned task, live.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/demo" className="btn btn-primary text-base">
                  Book a demo <ArrowRight size={18} />
                </Link>
                <Link href="/#pricing" className="btn btn-white text-base">
                  Start free trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
