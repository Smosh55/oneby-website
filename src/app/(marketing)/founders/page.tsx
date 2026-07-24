import type { Metadata } from "next";
import {
  Check,
  Lock,
  Zap,
  Phone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Gift,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import WaitlistForm from "@/components/WaitlistForm";
import { founderPerks, stretchGoals, founderPricing } from "@/data/founders";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

export const metadata: Metadata = {
  title: "Become a OneBy Founding Member",
  description:
    "Back OneBy before launch and lock the AI Suite at $39 a month for two years, while everyone else pays $49. Get it free for your first 6 months. The software is free and your line is $15, always.",
  alternates: { canonical: "/founders" },
};

const faqs = [
  {
    q: "What does the founder rate actually get me?",
    a: `The software is free and your line is $${founderPricing.lineMonthly} a month, always. As a founder you get the full AI Suite free for your first 6 months (the public gets a 30-day trial), and after that it locks at $${founderPricing.founderMonthly}/mo for two years while everyone else pays $${founderPricing.standardMonthly}. When the two years are up you roll to standard pricing, and we always tell you before anything changes.`,
  },
  {
    q: "Is there a per-call meter or a surprise bill?",
    a: "No. The AI Suite is a flat monthly price with generous usage included. There is no per-call meter and no surprise bill, no matter how busy your month gets.",
  },
  {
    q: "What's live on day one?",
    a: "Early access opens to founding members in October, in the order you backed. Day one is the full platform: calls and texting, jobs, scheduling, invoicing, and AI call summaries with drafted follow-ups on every call. The AI receptionist that answers calls live rolls out to founding members first, shortly after.",
  },
  {
    q: "Do I have to pay anything to claim it?",
    a: "No. Claiming your founder spot is free, no card. You add a payment method later, when early access opens and you decide to turn the AI Suite on.",
  },
  {
    q: "What if it's not for me?",
    a: "You're never locked into a contract. Start the free CRM, add the $15 line when you want a phone, and try the AI Suite free. Cancel anytime.",
  },
];

const foundersJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        {
          "@type": "ListItem",
          position: 2,
          name: "Founding Members",
          item: `${base}/founders`,
        },
      ],
    },
  ],
};

export default function FoundersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(foundersJsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[560px] w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.16),transparent)]" />
          <div className="absolute top-20 right-[14%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.18),transparent)]" />
        </div>

        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
              <Gift size={14} /> Founding member pre-sale, launching soon
            </span>
            <h1 className="mt-5 text-[2.5rem] leading-[1.05] font-extrabold tracking-tight text-navy sm:text-6xl">
              Get in early. Lock the AI at{" "}
              <span className="text-gradient">${founderPricing.founderMonthly}.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              OneBy answers your calls, writes the summary, and turns each one
              into the next thing to do. The software is free and your line is
              ${founderPricing.lineMonthly} a month, always. Founders get the
              full AI Suite free for 6 months, then locked at $
              {founderPricing.founderMonthly} while everyone else pays $
              {founderPricing.standardMonthly}.
            </p>
            <p className="mt-3 text-sm font-semibold text-navy">
              Founder rates end when early access opens in October. After that,
              standard pricing applies.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#claim" className="btn btn-primary text-base">
                Claim your spot <ArrowRight size={18} />
              </a>
              <a href="#how" className="btn btn-ghost text-base">
                How the lock works
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Lock size={16} className="text-green" /> Locked at $
                {founderPricing.founderMonthly} for two years
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-green" /> No contract, cancel anytime
              </span>
            </div>
          </div>

          <Reveal>
            <PhoneArt />
          </Reveal>
        </div>
      </section>

      {/* How the lock works (transparency) */}
      <section id="how" className="border-y border-line bg-canvas/50 py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center text-blue">
              <Lock size={14} /> Founder pricing, in plain numbers
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Your founder rate, in plain numbers.
            </h2>
            <p className="mt-4 text-muted">
              No fine print, no bait and switch. Here is exactly what you pay,
              now and through the lock.
            </p>
          </div>

          {/* standard vs founder */}
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <PriceCard
              label="Standard price (later)"
              tone="muted"
              rows={[["AI Suite", `$${founderPricing.standardMonthly}/mo`]]}
              foot="What everyone else pays after launch."
            />
            <PriceCard
              label="Your founder rate (locked 2 years)"
              tone="primary"
              rows={[["AI Suite", `$${founderPricing.founderMonthly}/mo`]]}
              foot="Free for your first 6 months, then locked for two years."
            />
          </div>

          {/* the three steps */}
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "Claim your spot, free",
                b: "No card. You're a founding member and your rate is reserved.",
              },
              {
                n: "2",
                t: "6 months of AI, free",
                b: "At launch the full AI Suite is on us for six months, not the public 30 days.",
              },
              {
                n: "3",
                t: `Then $${founderPricing.founderMonthly}/mo, locked 2 years`,
                b: `While standard is $${founderPricing.standardMonthly}. Your $${founderPricing.lineMonthly} line and free software never change.`,
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-line bg-surface p-6"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-blue/10 text-sm font-bold text-blue">
                  {s.n}
                </span>
                <h3 className="mt-4 font-bold text-navy">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.b}</p>
              </div>
            ))}
          </div>

          {/* honesty note */}
          <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-blue/15 bg-blue/[0.04] p-5">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-blue" />
            <p className="text-sm leading-relaxed text-ink">
              <span className="font-semibold text-navy">
                Why the software is free but the AI isn't.
              </span>{" "}
              The CRM costs us very little to run, so it's free, forever. The AI
              that answers your calls, and the calls themselves, cost real money
              every month. So the AI Suite is a fair flat price with no per-call
              meter, and founders lock it low for two years. A deal we can both
              keep.
            </p>
          </div>
        </div>
      </section>

      {/* What ships when (honest rollout) */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center text-blue">
              <Sparkles size={14} /> What ships when
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Founders get every piece first.
            </h2>
            <p className="mt-4 text-muted">
              No vague promises. Here is what's live at each step, before the
              public sees any of it.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              {
                n: "Oct",
                t: "Early access opens",
                b: "Founding members onboard first: port your number, set up your team, trades, and price book. The full platform is live: calls, texting, jobs, scheduling, invoicing, and AI call summaries with drafted follow-ups on every call.",
              },
              {
                n: "Then",
                t: "AI answering goes live",
                b: "The AI receptionist starts picking up the calls you can't, founding members first. By then it has been listening to and summarizing your real calls for weeks.",
              },
              {
                n: "Later",
                t: "Public launch",
                b: "We open to everyone at standard pricing. Your founder rate is already locked for two years, and you've been running on OneBy since day one.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-line bg-surface p-6"
              >
                <span className="grid h-9 w-14 place-items-center rounded-full bg-blue/10 text-sm font-bold text-blue">
                  {s.n}
                </span>
                <h3 className="mt-4 font-bold text-navy">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The offer (one clean card) */}
      <section id="claim" className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center text-blue">
              <Gift size={14} /> Your founder offer
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              One offer. Claim it free.
            </h2>
            <p className="mt-4 text-muted">
              No tiers to compare, no pledge to puzzle over. Lock the rate now,
              decide the rest at launch.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl">
            <div className="relative rounded-3xl border border-blue/40 bg-blue/[0.03] p-8 shadow-[var(--shadow-lg)] sm:p-10">
              <span className="absolute -top-3 left-8 rounded-full bg-blue px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                Founding member
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight text-navy">
                Free to claim
              </h3>
              <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md bg-green/10 px-2 py-1 text-[0.78rem] font-semibold text-green-600">
                <Lock size={12} /> then ${founderPricing.founderMonthly}/mo, locked 2 years
              </div>
              <ul className="mt-6 space-y-3">
                {founderPerks.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-sm text-ink"
                  >
                    <Check
                      size={16}
                      strokeWidth={3}
                      className="mt-0.5 shrink-0 text-green-600"
                    />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <WaitlistForm />
              </div>
              <p className="mt-4 text-center text-xs text-faint">
                No card to claim. Running a team?{" "}
                <a
                  href="/demo"
                  className="font-semibold text-blue hover:underline"
                >
                  Talk to us about founder seats
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stretch goals */}
      <section className="border-y border-line bg-canvas/50 py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center text-blue">
              <Zap size={14} /> Stretch goals
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Hit these together and everyone gets more.
            </h2>
            <p className="mt-4 text-muted">
              The more founders we bring in, the more we build, and every
              founding member gets it included.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {stretchGoals.map((g) => (
              <div
                key={g.amount}
                className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-6"
              >
                <span className="shrink-0 rounded-lg bg-green/10 px-3 py-1.5 text-sm font-bold text-green-600">
                  {g.amount}
                </span>
                <div>
                  <h3 className="font-bold text-navy">{g.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {g.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live demo line teaser */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-line bg-gradient-to-b from-blue/[0.05] to-transparent p-8 text-center sm:p-12">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue/10 text-blue">
              <Phone size={22} />
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Soon you'll be able to call our AI yourself.
            </h2>
            <p className="max-w-xl text-muted">
              We're standing up a live demo line so you can pick up your phone,
              talk to OneBy like a real caller, and watch it turn the
              conversation into a summary and a task. It launches with the
              campaign.
            </p>
            <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-faint">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green" />
              Demo line going live soon
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-16 lg:py-20">
        <div className="container-x">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Straight answers
          </h2>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                  {f.q}
                  <span className="shrink-0 text-faint transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-x pb-20">
        <div className="rounded-3xl bg-navy px-8 py-14 text-center text-white sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Be a founder, not a follower.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Lock the AI Suite at ${founderPricing.founderMonthly} a month for two
            years and help shape what we build next. Claim your spot free, before
            it's ${founderPricing.standardMonthly}.
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
          <div className="mt-6">
            <a
              href="#how"
              className="btn border border-white/25 text-base text-white hover:bg-white/10"
            >
              How the lock works
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function PriceCard({
  label,
  tone,
  rows,
  foot,
}: {
  label: string;
  tone: "muted" | "primary";
  rows: [string, string][];
  foot: string;
}) {
  const primary = tone === "primary";
  return (
    <div
      className={`rounded-2xl border p-6 ${
        primary ? "border-blue/30 bg-blue/[0.04]" : "border-line bg-surface"
      }`}
    >
      <div className="flex items-center gap-2">
        {primary && <Lock size={15} className="text-blue" />}
        <p
          className={`text-xs font-bold uppercase tracking-wide ${
            primary ? "text-blue" : "text-faint"
          }`}
        >
          {label}
        </p>
      </div>
      <div className="mt-4 space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-muted">{k}</span>
            <span
              className={`text-xl font-extrabold ${
                primary ? "text-navy" : "text-ink line-through decoration-faint/40"
              }`}
            >
              {v}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-faint">{foot}</p>
    </div>
  );
}

function PhoneArt() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* floating price lock badge */}
      <div className="absolute -right-2 top-6 z-10 rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lg)]">
        <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-faint">
          <Lock size={11} /> Locked 2 years
        </p>
        <p className="text-sm font-extrabold text-navy">
          ${founderPricing.founderMonthly}/mo
        </p>
      </div>

      {/* device */}
      <div className="rounded-[28px] border border-line bg-surface p-5 shadow-[0_40px_90px_-30px_rgba(4,3,79,0.4)]">
        {/* handset */}
        <div className="mx-auto mb-4 h-5 w-3/4 rounded-full bg-gradient-to-r from-blue/30 via-line to-green/30" />

        {/* screen */}
        <div className="rounded-2xl bg-navy p-5">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/15 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/oneby-mark.svg" alt="OneBy" className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold text-white">OneBy</span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green/20 px-2 py-0.5 text-[10px] font-semibold text-green-200">
              <span className="h-1.5 w-1.5 rounded-full bg-green" /> On
            </span>
          </div>
          <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-wide text-white/40">
            Incoming, answered by AI
          </p>

          {/* caller */}
          <div className="mt-3 flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[0.7rem] font-bold text-white">
              RM
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[0.82rem] font-semibold text-white">
                Rebecca M.
              </p>
              <p className="text-[0.68rem] text-white/45">
                (602) 555-0148 · 0:42
              </p>
            </div>
            <span className="ml-auto rounded-md bg-green/20 px-1.5 py-0.5 text-[0.6rem] font-semibold text-green-200">
              Booked
            </span>
          </div>

          {/* AI summary */}
          <div className="mt-3 rounded-xl bg-white/[0.06] p-3">
            <p className="text-[0.58rem] font-semibold uppercase tracking-wide text-white/40">
              AI summary
            </p>
            <p className="mt-1 text-[0.75rem] leading-snug text-white/80">
              New customer, upstairs AC out since last night. Wants same-day,
              home after 3pm.
            </p>
          </div>

          {/* resulting task */}
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-blue/20 px-2.5 py-1.5">
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-blue">
              <Check size={10} strokeWidth={3} className="text-white" />
            </span>
            <p className="text-[0.7rem] font-medium text-white/85">
              Book A/C diagnostic, today 3 to 5pm
            </p>
          </div>
        </div>

        {/* keypad */}
        <div className="mt-5 grid grid-cols-3 gap-3 px-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="mx-auto grid h-9 w-9 place-items-center rounded-full border border-line bg-canvas text-xs font-semibold text-faint"
            >
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"][i]}
            </span>
          ))}
        </div>
      </div>

      {/* caption chip */}
      <div className="absolute -bottom-4 left-4 z-10 rounded-xl border border-line bg-white px-3.5 py-2 shadow-[var(--shadow-lg)]">
        <p className="text-sm font-semibold text-navy">Plug in. It answers. ⚡</p>
      </div>
    </div>
  );
}
