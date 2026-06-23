import type { Metadata } from "next";
import Link from "next/link";
import { Bot, ArrowRight, Check, Phone, Sparkles } from "lucide-react";
import { industries } from "@/data/industries";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AI Receptionist: How It Works and Why It Books More Jobs",
  description:
    "An AI receptionist answers every call in a natural voice, understands what the caller needs, and turns it into a summary and a booked job. Here is how it works, what it costs, and how it compares to voicemail and answering services.",
  keywords: [
    "AI receptionist",
    "what is an AI receptionist",
    "AI receptionist for small business",
    "AI phone answering",
    "virtual AI receptionist",
    "AI answering service",
  ],
  alternates: { canonical: "/ai-receptionist" },
  openGraph: {
    title: "AI Receptionist: How It Works · OneBy",
    description:
      "Answer every call, capture the details, and book the job, without hiring a front desk.",
    type: "article",
    url: "https://oneby.ai/ai-receptionist",
  },
};

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

const steps = [
  {
    t: "It answers, instantly",
    b: "Every call gets picked up in a natural voice, day or night, even when ten ring at once. No hold music, no voicemail, no missed customer.",
  },
  {
    t: "It understands the caller",
    b: "It asks your questions, hears the problem, and figures out what they actually need, the same way a sharp front-desk person would.",
  },
  {
    t: "It writes the summary",
    b: "The conversation becomes a clean, faithful recap: who called, what they want, how urgent it is. No notes to take.",
  },
  {
    t: "It books the job",
    b: "The summary turns into a typed task, assigned and ready, and your team gets pinged in seconds. The call becomes work, not a sticky note.",
  },
];

const faqs = [
  {
    q: "What is an AI receptionist?",
    a: "An AI receptionist is software that answers your business phone in a natural voice, understands what the caller needs, and turns the conversation into a summary and a follow-up task. Unlike a voicemail box or a generic answering service, its job is to capture the outcome, not just take a message.",
  },
  {
    q: "Is an AI receptionist better than an answering service?",
    a: "For most small businesses, yes, on cost and consistency. Answering services bill per minute and only take a message. An AI receptionist is a flat monthly rate, answers unlimited calls at once, is configured around your business, and turns calls into booked work. A human still wins on genuinely unusual or sensitive calls, which is why a good setup keeps a human escalation path.",
  },
  {
    q: "Will callers know it is AI?",
    a: "It answers in a natural, professional voice, and most callers simply feel taken care of. The point is not to trick anyone, it is to make sure every caller gets a real answer instead of a voicemail beep.",
  },
  {
    q: "How much does an AI receptionist cost?",
    a: "Far less than a full-time front desk and usually less than a busy month on a per-minute answering service. See OneBy pricing for exact numbers, and use the missed call calculator to see what not having one costs you.",
  },
  {
    q: "What happens on an emergency call?",
    a: "A well-built AI receptionist flags urgent calls (a flood, no heat, a safety issue) and pings your on-call team right away, while still logging every detail for the record.",
  },
];

export default function AiReceptionistPage() {
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
            name: "AI Receptionist",
            item: `${base}/ai-receptionist`,
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
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[960px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.14),transparent)]" />
        </div>
        <div className="container-x max-w-3xl">
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            <Bot size={14} /> The complete guide
          </span>
          <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-6xl">
            The AI receptionist that books the job, not just the message.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            An AI receptionist answers the calls your team can't get to, in a
            natural voice, understands what the caller needs, and turns the
            conversation into a summary and a booked job. No missed leads, no
            calls to voicemail, no front desk to hire. Here is exactly how it
            works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/demo" className="btn btn-primary text-base">
              Hear it on a real call <ArrowRight size={18} />
            </Link>
            <Link href="/missed-call-calculator" className="btn btn-ghost text-base">
              What missed calls cost you
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-14 lg:pb-20">
        <div className="container-x">
          <div className="mx-auto mb-10 max-w-2xl">
            <span className="eyebrow text-blue">
              <Sparkles size={14} /> How it works
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Four steps, every single call.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.t} className="surface-card rounded-2xl p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-blue/10 text-sm font-bold text-blue">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-bold text-navy">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it beats the old ways */}
      <section className="border-y border-line bg-canvas/50 py-14 lg:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Voicemail takes messages. An answering service relays them. This
            books the work.
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            Voicemail loses most callers outright, because people hang up and
            dial the next company rather than leave a message. A traditional
            answering service does better, but it bills per minute, follows a
            generic script, and hands you a message, not a booked job. An AI
            receptionist is configured around your business, answers unlimited
            calls at once for a flat rate, and turns each one into work your team
            can act on. We broke down the trade-offs in{" "}
            <Link
              href="/blog/ai-receptionist-vs-answering-service"
              className="font-semibold text-blue hover:underline"
            >
              AI receptionist vs answering service
            </Link>
            , and you can see how OneBy stacks up against specific tools on our{" "}
            <Link href="/compare" className="font-semibold text-blue hover:underline">
              comparison pages
            </Link>
            .
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "Every call answered live, never dumped to voicemail",
              "A flat monthly rate, not a per-minute meter that punishes busy months",
              "Configured to your business, your questions, your emergencies",
              "Faithful summaries that never invent facts, and ask when unsure",
              "Calls become assigned tasks, not sticky notes",
            ].map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-ink">
                <Check size={17} strokeWidth={3} className="mt-1 shrink-0 text-green-600" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it's for (industry links) */}
      <section className="py-14 lg:py-20">
        <div className="container-x max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Built for businesses that live on the phone.
          </h2>
          <p className="mt-3 text-muted">
            The pain is universal, the details are not. See how an AI
            receptionist works in your trade.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-navy transition-colors hover:border-blue"
              >
                {i.shortName}
                <ArrowRight
                  size={15}
                  className="text-faint transition-colors group-hover:text-blue"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-2xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            AI receptionist FAQ
          </h2>
          <div className="mt-10 divide-y divide-line">
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

      {/* CTA */}
      <section className="container-x max-w-5xl pb-20">
        <div className="rounded-3xl bg-navy px-8 py-14 text-center text-white sm:px-12">
          <span className="grid h-12 w-12 mx-auto place-items-center rounded-2xl bg-white/10">
            <Phone size={22} />
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Hear your own AI receptionist answer a call.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            We will play a real call end to end and show you the summary and the
            task it creates. Live in a day, keep your number.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/demo" className="btn btn-white text-base">
              Book a demo <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="btn border border-white/25 text-base text-white hover:bg-white/10">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
