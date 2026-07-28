import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Send,
  CreditCard,
  Check,
  Lock,
  Repeat,
  BadgeDollarSign,
} from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Free Invoicing Software for Contractors & the Trades",
  description:
    "Send professional invoices, estimates, and get paid online, free forever, no card. OneBy's free invoicing is the front door to the CRM and AI phone system built for home-service pros.",
  keywords: [
    "free invoicing software",
    "free invoice software",
    "free invoicing app for contractors",
    "free invoice app for small business",
    "contractor invoicing software free",
    "free estimate and invoice software",
  ],
  alternates: { canonical: "/free-invoicing" },
  openGraph: {
    title: "Free Invoicing Software for the Trades · OneBy",
    description:
      "Send invoices and estimates, get paid online, free forever. Then add the AI that answers your phone when you're ready.",
    type: "website",
    url: "/free-invoicing",
  },
};

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

const freeStack = [
  { icon: FileText, label: "Branded invoices", body: "Your logo, your terms, sent in seconds." },
  { icon: BadgeDollarSign, label: "Good/Better/Best estimates", body: "Three options that win the bigger job, converted to an invoice in one tap." },
  { icon: CreditCard, label: "Get paid online", body: "Customers pay from the invoice. Deposits and partial payments too." },
  { icon: Repeat, label: "Recurring invoices", body: "Set it once and it bills every cycle on its own." },
  { icon: Send, label: "Reminders that chase for you", body: "Sent, viewed, paid, overdue. Nudge the slow payers automatically." },
  { icon: FileText, label: "Reusable price book", body: "Your services and prices, ready to drop into any estimate or invoice." },
];

const steps = [
  { n: "1", title: "Build it", body: "Pull from your price book or type it in. Add three options if it's a bigger job." },
  { n: "2", title: "Send it", body: "Text or email a branded invoice or estimate from your phone, on the job." },
  { n: "3", title: "Get paid", body: "They pay online, you see it clear, and reminders handle the rest." },
];

const faqs = [
  {
    q: "Is the invoicing really free?",
    a: "Yes. Send unlimited invoices and estimates and get paid online, free forever, no credit card to start. There is no invoice cap and no trial clock on it. We make money when you add the $15 business line or the AI Suite that answers your phone, not by charging you to send an invoice.",
  },
  {
    q: "What's the catch?",
    a: "No catch on invoicing. The rest of OneBy, the business phone line, the AI receptionist that answers calls you miss, scheduling, and automations, is a paid upgrade. You see those tools in your account and unlock them whenever you're ready. Your invoices and clients stay exactly where they are.",
  },
  {
    q: "Can I collect payments online?",
    a: "Yes. Customers can pay directly from the invoice, including deposits and partial payments, and you can set invoices to recur and auto-charge on a schedule.",
  },
  {
    q: "Do I have to buy anything to keep using it?",
    a: "No. Invoicing stays free for as long as you use it. Upgrading to the phone line or the AI Suite is optional and only flips on the extra tools, nothing about your invoicing changes.",
  },
  {
    q: "Is this built for my trade?",
    a: "OneBy is built for home-service and trade businesses, HVAC, plumbing, electrical, roofing, landscaping, and more. The estimates and price book speak your trade out of the box.",
  },
];

export default function FreeInvoicingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "OneBy Free Invoicing",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Free invoicing and estimates for home-service and trade businesses. Send invoices, collect payments online, and convert estimates to invoices.",
      },
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
            name: "Free Invoicing",
            item: `${base}/free-invoicing`,
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
          <span className="eyebrow justify-center rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            <BadgeDollarSign size={14} /> Free forever, no card
          </span>
          <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.2rem]">
            Free invoicing for the trades. Send it, get paid, keep every cent.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Professional invoices and Good/Better/Best estimates, paid online,
            free for as long as you use it. When you're ready, the same account
            answers your phone with AI. Start with the part you do every week.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#start" className="btn btn-primary">
              Claim your free account <ArrowRight size={17} />
            </a>
            <Link href="/features/invoicing" className="btn btn-ghost">
              See how it works
            </Link>
          </div>
          <p className="mt-4 text-[0.8rem] text-faint">
            Launching October 2026. Claim your spot now, no card, invoicing stays free.
          </p>
        </div>
      </section>

      {/* What's free */}
      <section className="pb-6">
        <div className="container-x max-w-5xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Everything you need to get paid, free
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {freeStack.map((f) => (
              <div key={f.label} className="surface-card rounded-2xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10 text-blue">
                  <f.icon size={20} />
                </span>
                <h3 className="mt-4 text-[1.05rem] font-bold text-navy">{f.label}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 lg:py-20">
        <div className="container-x max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            From job done to money in the bank
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-navy text-lg font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The wedge: free vs upgrade, honest */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Free where it counts. Paid only when you want more.
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            We would rather you invoice free for a year and never pay us than nag
            you from day one. Here is the honest line between what is free and
            what you would ever pay for.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-green/30 bg-green/[0.05] p-6">
              <p className="text-[0.72rem] font-bold uppercase tracking-wide text-green-600">
                Free forever
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Unlimited invoices and estimates",
                  "Get paid online, deposits and recurring",
                  "Good/Better/Best estimate builder",
                  "Reusable price book and client records",
                  "Automatic payment reminders",
                ].map((x) => (
                  <li key={x} className="flex gap-2.5 text-[0.92rem] text-ink">
                    <Check size={17} className="mt-0.5 shrink-0 text-green-600" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-[0.72rem] font-bold uppercase tracking-wide text-blue">
                Add when you're ready
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "A business phone line for $15",
                  "AI that answers the calls you miss",
                  "Call summaries, tickets, and scheduling",
                  "Automations and missed-call text-back",
                  "No per-call meter, ever",
                ].map((x) => (
                  <li key={x} className="flex gap-2.5 text-[0.92rem] text-muted">
                    <Lock size={16} className="mt-0.5 shrink-0 text-faint" />
                    {x}
                  </li>
                ))}
              </ul>
              <Link
                href="/founders"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue hover:underline"
              >
                Founders lock the AI at $39 <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signup capture */}
      <section id="start" className="scroll-mt-24 bg-navy py-16 lg:py-24">
        <div className="container-x max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Claim your free invoicing account
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
            We open in October. Claim your spot now and you're first in when free
            invoicing goes live, no card, and the founder rate on the AI Suite is
            yours if you ever want it.
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Free invoicing questions
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

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/templates" className="btn btn-ghost">
              Free estimate templates
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              See full pricing
            </Link>
            <Link href="/founders" className="btn btn-primary">
              Founding member rate <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
