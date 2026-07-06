import Link from "next/link";
import {
  PhoneMissed,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Phone,
  Calendar,
  Bot,
  Ticket,
  Receipt,
} from "lucide-react";
import type { Industry } from "@/data/industries";
import type { PostMeta } from "@/lib/blog";
import { cities } from "@/data/locations";
import { getIcon } from "./iconMap";
import Reveal from "@/components/Reveal";
import IndustryFAQ from "./IndustryFAQ";
import DemoForm from "@/components/DemoForm";
import IndustryDemo from "@/components/IndustryDemo";
import IndustryHeroArt from "./IndustryHeroArt";
import PostCard from "@/components/blog/PostCard";
import WaitlistForm from "@/components/WaitlistForm";
import { getDemo } from "@/data/demo";
import { industryAccentStyle } from "@/data/industryThemes";

const trustChips = [
  "Free trial, no credit card",
  "Live in a day",
  "Keep your number",
  "No contract",
];

export default function IndustryLanding({
  industry,
  relatedPosts = [],
  asHome = false,
}: {
  industry: Industry;
  relatedPosts?: PostMeta[];
  asHome?: boolean;
}) {
  const Icon = getIcon(industry.icon);
  // Real, industry-specific jobs pulled from this vertical's demo workspace.
  const useCases = getDemo(industry.slug).tickets.slice(0, 3);

  return (
    <div style={industryAccentStyle(industry.slug)}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <IndustryHeroArt slug={industry.slug} icon={industry.icon} />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[1000px] rounded-full bg-[radial-gradient(closest-side,rgba(var(--accent-rgb),0.14),transparent)]" />
          <div className="absolute top-16 right-[10%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.16),transparent)]" />
        </div>

        <div className="container-x">
          {/* breadcrumb — omitted when this landing is the site root */}
          {!asHome && (
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
          )}

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div className="max-w-xl min-w-0">
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
                <a href="#demo-form" className="btn btn-primary text-base">
                  Get early access <ArrowRight size={18} />
                </a>
                <Link href="/founders" className="btn btn-ghost text-base">
                  Lock founding pricing
                </Link>
              </div>
              {/* price anchor */}
              <p className="mt-4 text-sm font-medium text-muted">
                <Link
                  href="/founders"
                  className="transition-colors hover:text-navy"
                >
                  Founders pricing from{" "}
                  <span className="font-bold text-navy">$29/mo</span>, locked
                  for two years
                </Link>
              </p>
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
            <Reveal delay={80} className="min-w-0">
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
                    AI summarized
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

                <div className="mt-3">
                  <div className="flex items-center gap-2 px-1 pb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-faint">
                      Action item
                    </span>
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-green/25 bg-green/[0.07] px-3.5 py-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-green/15 text-green-600">
                      <Calendar size={16} />
                    </span>
                    <p className="min-w-0 text-[0.82rem] font-semibold text-navy">
                      {industry.scenarioTask}
                    </p>
                    <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green" /> Confident
                    </span>
                  </div>
                  <p className="px-1 pt-2 text-[0.7rem] leading-snug text-faint">
                    Unsure items get flagged with a question, never guessed.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-line bg-canvas/60 py-6">
        <div className="container-x flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8">
          <div className="inline-flex items-center gap-2 text-sm text-muted">
            <Sparkles size={15} className="text-green" />
            <span>
              Built for{" "}
              <span className="font-semibold text-navy">
                {industry.shortName}
              </span>{" "}
              · Launching August 2026
            </span>
          </div>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
            {trustChips.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-green" /> {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Live interactive demo, loaded with this industry's data */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Live demo</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              See OneBy run a real {industry.shortName.toLowerCase()} call.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              This is the real workspace, loaded with{" "}
              {industry.shortName.toLowerCase()} calls, tickets, and jobs. Click
              into anything.
            </p>
          </Reveal>
          <IndustryDemo slug={industry.slug} />
        </div>
      </section>

      {/* Early-access capture — the low-friction ask for cold (ad) traffic */}
      <section className="pb-18 lg:pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-12 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(var(--accent-rgb),0.35),transparent)]" />
              <div className="absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green/40 bg-green/10 px-3.5 py-1.5 text-[0.8rem] font-bold uppercase tracking-wide text-green">
                Launching August 2026
              </span>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Be the first {industry.shortName.toLowerCase()} shop in your
                market on OneBy.
              </h2>
              <div className="mt-6">
                <WaitlistForm />
              </div>
            </div>
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

      {/* Real jobs — use cases pulled from this vertical's workspace */}
      <section className="pb-18 lg:pb-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Real {industry.shortName.toLowerCase()} jobs</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              See how a {industry.shortName} job runs, start to finish.
            </h2>
            <p className="mt-4 text-muted">
              Straight from the workspace above: real calls captured, ticketed,
              scheduled, and billed, without anyone chained to the phone.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {useCases.map((t, i) => (
              <Reveal key={t.id} delay={i * 80}>
                <div className="surface-card flex h-full flex-col rounded-2xl p-6">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue/10 px-2.5 py-1 text-[11px] font-semibold text-blue">
                      {t.status}
                    </span>
                    {t.urgent && (
                      <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warning">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug text-navy">
                    {t.issue}
                  </h3>
                  <p className="mt-1 text-[0.78rem] font-medium text-faint">
                    {t.customer} · {t.relationship}
                  </p>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">
                    {t.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-line bg-canvas px-2 py-0.5 text-[0.7rem] font-medium text-ink/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* All-in-one loop */}
      <section className="pb-18 lg:pb-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">One platform, not four</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              The whole {industry.shortName.toLowerCase()} job, in one place.
            </h2>
            <p className="mt-4 text-muted">
              OneBy catches the call, then tickets, schedules, and invoices the
              job, so it goes from first ring to paid without leaving the
              platform.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Bot, t: "AI answers every call", b: "Overflow and after-hours included, captured, never sent to voicemail." },
              { icon: Ticket, t: "Tickets the job", b: `Every call becomes an assigned ${industry.shortName} ticket on its own.` },
              { icon: Calendar, t: "Schedules the work", b: "Book a tech and a time, synced two-way with Google and Microsoft calendars." },
              { icon: Receipt, t: "Invoices and gets paid", b: "Send a pay link, take a card, and close the job out." },
            ].map((m, i) => (
              <Reveal key={m.t} delay={i * 70}>
                <div className="surface-card h-full rounded-2xl p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10 text-blue">
                    <m.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-semibold text-navy">{m.t}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{m.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote (only when a real, attributable testimonial exists) */}
      {industry.quote && (
        <section className="pb-18 lg:pb-24">
          <div className="container-x">
            <Reveal>
              <figure className="mx-auto max-w-3xl rounded-[24px] border border-line bg-canvas px-7 py-12 text-center sm:px-14">
                <Sparkles size={24} className="mx-auto text-blue" />
                <blockquote className="mt-5 text-xl font-medium leading-relaxed text-navy sm:text-2xl">
                  “{industry.quote}”
                </blockquote>
                {industry.quoteName && (
                  <figcaption className="mt-6 text-sm text-muted">
                    <span className="font-semibold text-navy">
                      {industry.quoteName}
                    </span>{" "}
                    · {industry.quoteRole}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      {/* Embedded lead form */}
      <section id="demo-form" className="bg-canvas py-18 lg:py-24">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
          <Reveal className="min-w-0 lg:pt-4">
            <span className="eyebrow">Book your {industry.shortName} demo</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              See it answer a real {industry.shortName} call.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Tell us about your shop and we&apos;ll show you OneBy turn a call
              into a summary, a ticket, a booked job, and an invoice. Live in a
              day, and you keep your number.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "A 20-minute walkthrough on your real call flow",
                "Watch a call become a summary and an assigned ticket",
                "No pressure, no contract, cancel anytime",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/15 text-green-600">
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </span>
                  <span className="text-[0.95rem] text-ink">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="min-w-0">
            <DemoForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-18 lg:py-24">
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

      {/* Local areas served — hidden on focused deployments, where the city
          pages aren't served (every /industries/* URL redirects to the root) */}
      {!asHome && (
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
                    href={`/${industry.slug}/${c.slug}`}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.85rem] font-medium text-ink/80 transition-colors hover:border-blue/40 hover:text-blue"
                  >
                    {c.name}, {c.state}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href={asHome ? "/blog" : `/${industry.slug}/blog`}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:underline"
              >
                See all {industry.shortName} articles
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
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
                <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(var(--accent-rgb),0.35),transparent)]" />
                <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
              </div>
              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.1]">
                  Stop letting the phone cost you {industry.shortName.toLowerCase()} jobs.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">
                  See OneBy answer every call and run the job from first ring to
                  paid: ticketed, scheduled, and invoiced in one place. Live in a
                  day, no new hardware.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a href="#demo-form" className="btn btn-primary text-base">
                    Get early access <ArrowRight size={18} />
                  </a>
                  <Link href="/founders" className="btn btn-white text-base">
                    See founding offers
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a href="tel:+16266632944" className="btn btn-ghost flex-1">
          <Phone size={17} /> Call
        </a>
        <a href="#demo-form" className="btn btn-primary flex-1">
          Book a demo
        </a>
      </div>
    </div>
  );
}
