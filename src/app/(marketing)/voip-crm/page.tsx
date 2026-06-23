import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Ticket,
  CalendarDays,
  Receipt,
  MessageSquare,
  ArrowRight,
  Check,
  Phone,
} from "lucide-react";
import { industries } from "@/data/industries";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "VoIP CRM: The All-in-One That Answers Your Phone",
  description:
    "A VoIP CRM is a phone system and a CRM in one. OneBy answers every call with AI, then tickets, schedules, and invoices the job. Here is how it works and who it's for.",
  keywords: [
    "VoIP CRM",
    "CRM with phone system",
    "all-in-one CRM for service business",
    "field service CRM",
    "CRM that answers the phone",
  ],
  alternates: { canonical: "/voip-crm" },
  openGraph: {
    title: "VoIP CRM: The All-in-One That Answers Your Phone · OneBy",
    description:
      "Answer the call, ticket it, schedule it, invoice it, get paid. One platform, built around the phone.",
    type: "article",
    url: "https://oneby.ai/voip-crm",
  },
};

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

const modules = [
  { icon: Bot, name: "AI Receptionist", href: "/features/ai-receptionist", body: "Answers the calls your team can't, in a natural voice, day or night." },
  { icon: Ticket, name: "Ticketing", href: "/features/ticketing", body: "Every call becomes a structured, assigned ticket on its own." },
  { icon: CalendarDays, name: "Scheduling", href: "/features/scheduling", body: "Book a tech and a time, synced two-way with Google and Microsoft." },
  { icon: Receipt, name: "Invoicing & Payments", href: "/features/invoicing", body: "Quote it, invoice it, and text a pay link the customer taps to pay." },
  { icon: MessageSquare, name: "Business SMS", href: "/features/business-sms", body: "A shared text inbox, so messages never strand on one phone." },
  { icon: Phone, name: "Calling & desk phones", href: "/features/desk-phones", body: "A full phone system: calling, desk phones, and fax, ready in a day." },
];

const faqs = [
  {
    q: "What is a VoIP CRM?",
    a: "A VoIP CRM combines a cloud phone system (VoIP) with a CRM in one platform, so the call and the customer record live in the same place. OneBy goes further: the AI answers the call, then turns it into a ticket, a schedule, and an invoice automatically.",
  },
  {
    q: "How is it different from a regular CRM?",
    a: "A regular CRM stores contacts and deals, and you bolt a phone on the side. A VoIP CRM is built around the phone: it actually answers calls and captures the work, instead of waiting for someone to log it.",
  },
  {
    q: "Is a VoIP CRM good for service businesses?",
    a: "It's ideal for them. Service businesses live on the phone, and the job starts with a call. A VoIP CRM catches that call and runs it all the way to a paid invoice without jumping between apps.",
  },
  {
    q: "Do I have to replace my phone system?",
    a: "OneBy is the phone system, so it replaces it. You keep your number (porting is free) and you're usually live in a day.",
  },
];

export default function VoipCrmPage() {
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
          { "@type": "ListItem", position: 2, name: "VoIP CRM", item: `${base}/voip-crm` },
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
            The complete guide
          </span>
          <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-6xl">
            The VoIP CRM that catches every call and runs the job.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            A VoIP CRM is a phone system and a CRM in one. OneBy is the version
            built for service businesses: your team answers what it can, the AI
            catches the rest, and every call becomes a ticket, a schedule, and an
            invoice. One platform, not four apps that don't talk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/demo" className="btn btn-primary text-base">
              Start free, no credit card <ArrowRight size={18} />
            </Link>
            <Link href="/missed-call-calculator" className="btn btn-ghost text-base">
              What missed calls cost you
            </Link>
          </div>
        </div>
      </section>

      {/* The loop */}
      <section className="border-y border-line bg-canvas/50 py-14 lg:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Why "built around the phone" matters.
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            Most CRMs treat the phone as an afterthought: a click-to-dial button
            and a place to paste notes after the fact. For a service business,
            that's backwards. The job <em>starts</em> with a call, and the call
            is where the details, the urgency, and the money live. A VoIP CRM
            puts the phone at the center, so nothing has to be re-typed and
            nothing falls through. The loop looks like this:
          </p>
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center font-semibold text-navy">
            Call <span className="text-faint">→</span> AI summary{" "}
            <span className="text-faint">→</span> Ticket{" "}
            <span className="text-faint">→</span> Scheduled{" "}
            <span className="text-faint">→</span> Invoiced{" "}
            <span className="text-faint">→</span> Paid
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-14 lg:py-20">
        <div className="container-x">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Everything in one platform.
            </h2>
            <p className="mt-4 text-muted">
              The modules that turn a call into a paid job, built to work together.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <Link
                key={m.name}
                href={m.href}
                className="group surface-card flex h-full flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10 text-blue">
                  <m.icon size={20} />
                </span>
                <h3 className="mt-4 font-semibold text-navy">{m.name}</h3>
                <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">{m.body}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue">
                  Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Built for businesses that live on the phone.
          </h2>
          <p className="mt-3 text-muted">See the VoIP CRM in your trade.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-navy transition-colors hover:border-blue"
              >
                {i.shortName}
                <ArrowRight size={15} className="text-faint transition-colors group-hover:text-blue" />
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/compare" className="btn btn-ghost">
              Compare OneBy to the alternatives
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-2xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            VoIP CRM FAQ
          </h2>
          <div className="mt-10 divide-y divide-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                  {f.q}
                  <span className="shrink-0 text-faint transition-transform group-open:rotate-45">+</span>
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
            One platform, from the first ring to paid.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Start free with a trial number, watch the AI catch a call and turn it
            into a job, then add your line when you're ready.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/demo" className="btn btn-white text-base">
              Start free, no credit card <ArrowRight size={18} />
            </Link>
            <Link href="/ai-receptionist" className="btn border border-white/25 text-base text-white hover:bg-white/10">
              How the AI works
            </Link>
          </div>
          <p className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-white/60">
            {["No credit card", "Keep your number", "Live in a day"].map((r) => (
              <span key={r} className="inline-flex items-center gap-1.5">
                <Check size={15} className="text-green" /> {r}
              </span>
            ))}
          </p>
        </div>
      </section>
    </>
  );
}
