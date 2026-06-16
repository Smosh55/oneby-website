import Link from "next/link";
import {
  PhoneMissed,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import type { Industry } from "@/data/industries";
import type { PostMeta } from "@/lib/blog";
import { cities } from "@/data/locations";
import { getIcon } from "./iconMap";
import Reveal from "@/components/Reveal";
import IndustryFAQ from "./IndustryFAQ";

export default function IndustryLanding({
  industry,
  relatedPosts = [],
}: {
  industry: Industry;
  relatedPosts?: PostMeta[];
}) {
  const Icon = getIcon(industry.icon);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[1000px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.14),transparent)]" />
          <div className="absolute top-16 right-[10%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.16),transparent)]" />
        </div>

        <div className="container-x">
          {/* breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="hover:text-navy">
              Home
            </Link>
            <ChevronRight size={14} className="text-faint" />
            <Link href="/industries" className="hover:text-navy">
              Industries
            </Link>
            <ChevronRight size={14} className="text-faint" />
            <span className="font-medium text-navy">{industry.shortName}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div className="max-w-xl">
              <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
                <Icon size={14} /> {industry.heroEyebrow}
              </span>
              <h1 className="mt-5 text-[2.3rem] leading-[1.08] font-extrabold tracking-tight text-navy sm:text-[3.25rem]">
                {industry.heroTitle}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {industry.heroSub}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/demo" className="btn btn-primary text-base">
                  Book a demo <ArrowRight size={18} />
                </Link>
                <Link href="/#pricing" className="btn btn-ghost text-base">
                  Start free trial
                </Link>
              </div>
              <div className="mt-7 inline-flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-blue">
                  {industry.heroStat.stat}
                </span>
                <span className="text-sm font-medium text-muted">
                  {industry.heroStat.label}
                </span>
              </div>
            </div>

            {/* scenario mock */}
            <Reveal delay={80}>
              <div className="surface-card rounded-2xl p-5 shadow-[var(--shadow-xl)]">
                <div className="flex items-center gap-2 pb-4">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-xs font-medium text-faint">
                    OneBy · {industry.shortName} line
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-4 py-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-error/10 text-error">
                    <PhoneMissed size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy">
                      Missed call · captured by AI
                    </p>
                    <p className="truncate text-xs text-muted">
                      {industry.scenarioCaller}
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full bg-blue/10 px-2.5 py-1 text-[11px] font-semibold text-blue">
                    AI answered
                  </span>
                </div>

                <div className="mt-3 rounded-xl border border-blue/15 bg-gradient-to-b from-blue/[0.06] to-transparent px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} className="text-blue" />
                    <span className="text-xs font-bold uppercase tracking-wide text-blue">
                      AI summary
                    </span>
                  </div>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink">
                    {industry.scenarioSummary}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-3 rounded-xl border border-green/25 bg-green/[0.07] px-4 py-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green/15 text-green-600">
                    <CheckCircle2 size={18} />
                  </span>
                  <p className="text-sm font-semibold text-navy">
                    {industry.scenarioTask}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pains */}
      <section className="py-18 lg:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-error">The cost of a lost conversation</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              What {industry.shortName.toLowerCase()} teams lose on every call.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {industry.pains.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="surface-card h-full rounded-2xl p-7">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-error/10 text-error text-sm font-bold">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes band */}
      <section className="bg-navy py-14 text-white">
        <div className="container-x grid gap-8 sm:grid-cols-3">
          {industry.outcomes.map((o) => (
            <div key={o.label} className="text-center">
              <p className="text-4xl font-extrabold tracking-tight text-green">
                {o.stat}
              </p>
              <p className="mx-auto mt-2 max-w-[15rem] text-sm text-white/70">
                {o.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Every call, not just missed */}
      <section className="py-18 lg:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Not just missed calls</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Every call gets smarter, answered ones too.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Missed-call answering is just the start. After <em>every</em>{" "}
              {industry.shortName.toLowerCase()} call, picked up at the desk, on
              a mobile, or by the AI, OneBy transcribes it, writes the summary,
              and creates and assigns the follow-up task. Nothing said on a call
              slips through again.
            </p>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { k: "Capture", v: "Every call recorded & transcribed" },
              { k: "Summarize", v: "The key details, written for you" },
              { k: "Assign", v: "A task on the right person's plate" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border border-line bg-canvas px-5 py-6 text-center"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-blue">
                  {s.k}
                </p>
                <p className="mt-2 text-[0.95rem] text-muted">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="pb-18 lg:pb-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why {industry.shortName} teams choose OneBy</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Purpose-built for how you actually work.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {industry.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="surface-card h-full rounded-2xl p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue/10 to-green/10 text-blue">
                    <CheckCircle2 size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="pb-18 lg:pb-24">
        <div className="container-x">
          <Reveal>
            <figure className="mx-auto max-w-3xl rounded-[24px] border border-line bg-canvas px-7 py-12 text-center sm:px-14">
              <Sparkles size={24} className="mx-auto text-blue" />
              <blockquote className="mt-5 text-xl font-medium leading-relaxed text-navy sm:text-2xl">
                “{industry.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="font-semibold text-navy">
                  {industry.quoteName}
                </span>{" "}
                · {industry.quoteRole}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-canvas py-18 lg:py-24">
        <div className="container-x">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {industry.shortName} questions, answered.
            </h2>
          </Reveal>
          <IndustryFAQ faqs={industry.faqs} />
        </div>
      </section>

      {/* Local areas served */}
      <section className="pb-4">
        <div className="container-x">
          <div className="rounded-2xl border border-line bg-canvas px-6 py-7 sm:px-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-faint">
              {industry.shortName} answering service by city
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/industries/${industry.slug}/${c.slug}`}
                  className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.85rem] font-medium text-ink/80 transition-colors hover:border-blue/40 hover:text-blue"
                >
                  {c.name}, {c.state}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related reading (pillar -> cluster) */}
      {relatedPosts.length > 0 && (
        <section className="py-18 lg:py-24">
          <div className="container-x">
            <Reveal className="mb-8 flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight text-navy">
                More on {industry.shortName.toLowerCase()} and the phone
              </h2>
              <span className="h-px flex-1 bg-line" />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-3">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group surface-card flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
                >
                  <span className="w-fit rounded-full bg-canvas-2 px-2.5 py-1 text-[11px] font-semibold text-navy">
                    {p.category}
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-muted">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue">
                    Read
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-18 lg:py-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-14 text-center sm:px-16">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
                <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
              </div>
              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.1]">
                  Stop letting the phone cost you {industry.shortName.toLowerCase()} jobs.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">
                  See OneBy answer your next missed call and turn it into booked
                  work. Live in a day, no new hardware.
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
