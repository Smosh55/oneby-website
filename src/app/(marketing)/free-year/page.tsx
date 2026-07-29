import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  PhoneForwarded,
  BadgeDollarSign,
  Bot,
  Users,
  Check,
  Handshake,
} from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

// The in-person offer's companion page. Reached by QR code from the printed
// brochure (docs/growth/brochure/), never by navigation: it is deliberately
// noindex and excluded from the sitemap and footer so the public pricing
// ladder is never undercut by a Google-able better deal. The copy mirrors the
// face-to-face pitch so the page continues the conversation, not restarts it.
export const metadata: Metadata = {
  title: "Your Phone Lines, Free for a Year",
  description:
    "The offer you just heard, in writing. Port your business number to OneBy: every line is free for 12 months, the AI answers free for your first month, and 3 Guest Passes are included.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/free-year" },
};

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

const deal = [
  {
    icon: PhoneForwarded,
    title: "Port your number, keep your number",
    body: "The number on your trucks and your Google listing stays yours. We move it onto OneBy and it works day one: calls, texts, voicemail, all of it.",
  },
  {
    icon: BadgeDollarSign,
    title: "Every line is free for 12 months",
    body: "All the lines your business runs, free for a full year. After the year each line is $15 a month, and that is the whole phone bill, no per-minute games.",
  },
  {
    icon: Bot,
    title: "The AI answers free for your first month",
    body: "Miss a call and the AI picks up, gets the address and the problem, and leaves a ready-to-go job on your board. After the free month it is $35 a month per user.",
  },
  {
    icon: Users,
    title: "3 Guest Passes included",
    body: "Put the people you talk to all the time, a vendor, a property owner, a builder, inside your workspace so they stop calling you for updates. Three seats free, 99 cents each after.",
  },
];

const faqs = [
  {
    q: "Do I lose my phone number?",
    a: "No. Porting moves your existing number onto OneBy; it stays your number, and you can port it away again any time. Nothing about how customers reach you changes.",
  },
  {
    q: "What does the free year cost me?",
    a: "Nothing, and there is no card required to claim it. Normal business use is covered; your lines are for your business calls and texts, not call-center volume, and international calling is off unless you ask for it.",
  },
  {
    q: "What happens after the free year?",
    a: "Each line is $15 a month, and that is the whole phone bill. If you added the AI, it is $35 a month per user. No per-call meter, no surprise bill, and the CRM and invoicing underneath are free forever either way.",
  },
  {
    q: "When does this start?",
    a: "OneBy opens in October 2026. Claim now and you are first in line: we reach out, handle the port with you, and your free year starts the day your number goes live, not the day you signed up.",
  },
  {
    q: "Why are you doing this?",
    a: "Because the product sells itself once your phone runs on it. A year is long enough for you to know for sure. If it is not for you, you port out and it cost you nothing.",
  },
];

export default function FreeYearPage() {
  const jsonLd = {
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
            name: "Free Year",
            item: `${base}/free-year`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[920px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
        </div>
        <div className="container-x max-w-3xl text-center">
          <span className="eyebrow justify-center rounded-full border border-green/30 bg-green/10 px-3 py-1.5 text-green-600">
            <Handshake size={14} /> The offer you just heard, in writing
          </span>
          <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.2rem]">
            Your phone lines. Free for a year.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Port your business number to OneBy and every line you run costs
            nothing for 12 months. The AI that answers the calls you miss is
            free for your first month. No card to claim it, and your number
            stays yours.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#claim" className="btn btn-primary">
              Claim my free year <ArrowRight size={17} />
            </a>
          </div>
          <p className="mt-4 text-[0.8rem] text-faint">
            Doors open October 2026. Your year starts when your number goes
            live, not today.
          </p>
        </div>
      </section>

      {/* The deal */}
      <section className="pb-6">
        <div className="container-x max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            The whole deal, no fine print voice
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {deal.map((d, i) => (
              <div key={d.title} className="surface-card rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
                    <d.icon size={20} />
                  </span>
                  <span className="text-[0.72rem] font-bold uppercase tracking-wide text-faint">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-[1.05rem] font-bold text-navy">{d.title}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The math */}
      <section className="py-14 lg:py-20">
        <div className="container-x max-w-3xl">
          <div className="rounded-2xl border border-line bg-canvas/60 p-7">
            <h2 className="text-xl font-bold tracking-tight text-navy">
              The math we showed you
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              An example, not a promise: miss 10 calls a week, say 4 are real
              jobs, you close half, and your average ticket is $400. That is
              about $800 a week walking to whoever picks up. Your numbers are
              different, which is the point. Run them yourself:
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/missed-call-calculator" className="btn btn-ghost">
                Run my numbers
              </Link>
              <ul className="w-full space-y-2 pt-3">
                {[
                  "Year one: $0 for every line. $35/user for the AI if you keep it after the free month.",
                  "Year two on: $15 per line plus $35 per user for the AI.",
                  "No per-call meter. Your busiest month costs the same as your slowest.",
                ].map((x) => (
                  <li key={x} className="flex gap-2.5 text-[0.92rem] text-ink">
                    <Check size={17} className="mt-0.5 shrink-0 text-green-600" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Claim */}
      <section id="claim" className="scroll-mt-24 bg-navy py-16 lg:py-24">
        <div className="container-x max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Claim your free year
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
            Leave your name and email and you are locked in. We reach out,
            schedule your onboarding, walk the port with you, and your 12 free
            months start the day your number goes live. No card.
          </p>
          <div className="mt-8">
            <WaitlistForm requireClaimCode />
          </div>
          <p className="mt-4 text-[0.8rem] text-white/50">
            Your claim code is the 5 digits written on your brochure. One code
            per business. No code? Text the person who gave it to you.
          </p>
          <p className="mt-6 text-sm text-white/60">
            Want to pick your onboarding time right now?{" "}
            <Link href="/demo" className="font-semibold text-green underline-offset-2 hover:underline">
              Book it here
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Fair questions
          </h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-line bg-surface p-5">
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
    </>
  );
}
