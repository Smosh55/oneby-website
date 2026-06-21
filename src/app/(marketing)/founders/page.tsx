import type { Metadata } from "next";
import Link from "next/link";
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
import {
  founderTiers,
  stretchGoals,
  founderPricing,
  type FounderTier,
} from "@/data/founders";

export const metadata: Metadata = {
  title: "Become a OneBy Founding Member",
  description:
    "Back OneBy early and lock the lowest price we will ever offer, for life. Get a year of service, an optional plug-and-play phone, and an honest founder rate that never jumps.",
  alternates: { canonical: "/founders" },
};

const faqs = [
  {
    q: "What does \"founder rate locked for life\" actually mean?",
    a: `You pay your pledge today, which covers your first full year. After that, your plan renews at your locked founder rate ($${founderPricing.soloLockedMonthly}/mo for Solo, $${founderPricing.proLockedMonthly}/mo for Pro), and that rate is frozen for as long as you stay subscribed. Standard pricing will go up over time. Yours won't.`,
  },
  {
    q: "Why isn't it free forever after I pay?",
    a: "Because running your line costs us real money every single month: the AI that answers and writes things up, and the actual phone calls. A \"pay once, free forever\" promise would force us to cut corners later or go out of business, and then you'd have nothing. A fair locked rate keeps OneBy healthy and your bill flat. That's a deal we can both keep for years.",
  },
  {
    q: "When do I get it?",
    a: "Founding members get the first beta invites as we roll out, in the order you backed. Phones ship as your tier unlocks. We'll keep you posted with real updates, not vague ones.",
  },
  {
    q: "Do I have to take a phone?",
    a: "Not at all. Founding Solo uses the phone and number you already have. The OneBy Phone and Office Starter tiers add a ready-to-go device for folks who want to plug in and forget about setup.",
  },
  {
    q: "What if it's not for me?",
    a: "You're covered by a straightforward refund window, and you're never locked into a contract. The only thing locked is your price, and only if you want it.",
  },
];

export default function FoundersPage() {
  return (
    <>
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
              Get in early. Lock the{" "}
              <span className="text-gradient">lowest price for life.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              OneBy answers your calls, writes the summary, and turns each one
              into the next thing to do. Back us now and you lock the cheapest
              rate we will ever offer, plus an optional phone that works the
              second you plug it in.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#tiers" className="btn btn-primary text-base">
                See the tiers <ArrowRight size={18} />
              </a>
              <a href="#how" className="btn btn-ghost text-base">
                How the price lock works
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Lock size={16} className="text-green" /> Price frozen for life
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

      {/* How the price lock works (transparency) */}
      <section id="how" className="border-y border-line bg-canvas/50 py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center text-blue">
              <Lock size={14} /> Founder pricing, in plain numbers
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              The lowest price we will ever offer, and it never moves.
            </h2>
            <p className="mt-4 text-muted">
              No fine print, no bait and switch. Here is exactly what you pay,
              now and later.
            </p>
          </div>

          {/* standard vs locked */}
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <PriceCard
              label="Standard price (later)"
              tone="muted"
              rows={[
                ["Solo", `$${founderPricing.soloRetailMonthly}/mo`],
                ["Pro", `$${founderPricing.proRetailMonthly}/mo`],
              ]}
              foot="What everyone else pays after launch."
            />
            <PriceCard
              label="Your founder rate (locked for life)"
              tone="primary"
              rows={[
                ["Solo", `$${founderPricing.soloLockedMonthly}/mo`],
                ["Pro", `$${founderPricing.proLockedMonthly}/mo`],
              ]}
              foot="Frozen for as long as you stay. It never goes up."
            />
          </div>

          {/* the three steps */}
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "You pledge today",
                b: "Your pledge covers your first full year of OneBy. That part is done, paid, and yours.",
              },
              {
                n: "2",
                t: "Year two renews at your locked rate",
                b: `After year one, your plan renews at your founder rate, $${founderPricing.soloLockedMonthly}/mo for Solo. Not the standard $${founderPricing.soloRetailMonthly}.`,
              },
              {
                n: "3",
                t: "That price is frozen, for good",
                b: "As long as you stay subscribed, your rate never increases. Standard prices climb. Yours doesn't.",
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
                Why we don't promise "free forever."
              </span>{" "}
              Every line costs real money to run each month: the AI that answers
              and writes things up, and the actual phone calls. A pay-once,
              free-forever deal would force us to cut corners later or fold, and
              then you'd be left with nothing. A fair, locked rate keeps OneBy
              healthy and keeps your bill flat. We would rather both still be
              here in five years.
            </p>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center text-blue">
              <Sparkles size={14} /> Pick your founding tier
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Every tier locks your founder rate for life.
            </h2>
            <p className="mt-4 text-muted">
              Start with what you have, or grab a phone that works out of the box.
              The deeper tiers just add hardware and hands-on help.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {founderTiers.map((t) => (
              <TierCard key={t.id} tier={t} />
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-faint">
            Phones come pre-configured for OneBy and ready to plug in. Year one of
            service is included in every paid tier; it renews after at your locked
            founder rate.
          </p>
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
            Lock the lowest price OneBy will ever offer and help shape what we
            build next. Reserve your spot and we'll bring you in first.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/demo" className="btn btn-white text-base">
              Reserve your founder spot <ArrowRight size={18} />
            </Link>
            <a
              href="#tiers"
              className="btn border border-white/25 text-base text-white hover:bg-white/10"
            >
              Compare tiers
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

function TierCard({ tier }: { tier: FounderTier }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 ${
        tier.highlight
          ? "border-blue/40 bg-blue/[0.03] shadow-[var(--shadow-lg)]"
          : "border-line bg-surface"
      }`}
    >
      {tier.badge && (
        <span
          className={`absolute -top-3 left-6 rounded-full px-2.5 py-1 text-[11px] font-bold ${
            tier.highlight ? "bg-blue text-white" : "bg-navy text-white"
          }`}
        >
          {tier.badge}
        </span>
      )}

      <div className="flex items-center gap-2">
        {tier.hardware ? (
          <Phone size={16} className="text-blue" />
        ) : (
          <Sparkles size={16} className="text-blue" />
        )}
        <h3 className="font-bold text-navy">{tier.name}</h3>
      </div>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold tracking-tight text-navy">
          ${tier.price}
        </span>
        <span className="text-sm font-medium text-faint">one time</span>
      </div>

      {tier.locked ? (
        <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md bg-green/10 px-2 py-1 text-[0.78rem] font-semibold text-green-600">
          <Lock size={12} /> then {tier.locked}, locked for life
        </div>
      ) : (
        <div className="mt-2 text-[0.78rem] font-medium text-faint">
          One-time pledge
        </div>
      )}

      <p className="mt-4 text-sm leading-relaxed text-muted">{tier.tagline}</p>

      <ul className="mt-4 space-y-2.5">
        {tier.includes.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-sm text-ink">
            <Check
              size={16}
              strokeWidth={3}
              className="mt-0.5 shrink-0 text-green-600"
            />
            {it}
          </li>
        ))}
      </ul>

      <Link
        href="/demo"
        className={`mt-6 ${
          tier.highlight ? "btn btn-primary" : "btn btn-ghost"
        } w-full`}
      >
        Reserve this tier
      </Link>
    </div>
  );
}

function PhoneArt() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* floating price lock badge */}
      <div className="absolute -right-2 top-6 z-10 rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lg)]">
        <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-faint">
          <Lock size={11} /> Locked for life
        </p>
        <p className="text-sm font-extrabold text-navy">
          ${founderPricing.soloLockedMonthly}/mo
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
          <div className="mt-2 space-y-1.5">
            <div className="h-2 w-full rounded-full bg-white/15" />
            <div className="h-2 w-4/5 rounded-full bg-white/15" />
            <div className="h-2 w-2/3 rounded-full bg-blue/40" />
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
