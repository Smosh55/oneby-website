import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import MissedCallCalculator from "@/components/MissedCallCalculator";
import { industries } from "@/data/industries";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Missed Call Cost Calculator for Service Businesses",
  description:
    "How much are missed calls really costing your business? Plug in your numbers and see the lost revenue per week, month, and year, plus what answering every call would win back.",
  keywords: [
    "missed call cost calculator",
    "cost of missed calls",
    "missed call revenue calculator",
    "how much do missed calls cost",
    "lost revenue from missed calls",
  ],
  alternates: { canonical: "/missed-call-calculator" },
  openGraph: {
    title: "Missed Call Cost Calculator · OneBy",
    description:
      "See exactly what missed calls cost your business per week, month, and year.",
    type: "website",
    url: "/missed-call-calculator",
  },
};

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

const faqs = [
  {
    q: "How do you calculate the cost of a missed call?",
    a: "We multiply your weekly call volume by the share you miss, the share of those that are real job opportunities, and your close rate, then multiply by your average job value. That gives the revenue from jobs you never got a chance to win.",
  },
  {
    q: "Why assume only some missed calls are lost jobs?",
    a: "Not every call is a new customer. Some are vendors, wrong numbers, or existing jobs. The calculator lets you set the share that are genuine opportunities so the number stays honest.",
  },
  {
    q: "Do people really not leave a voicemail?",
    a: "Most don't. The majority of callers to a small business will hang up and dial the next company rather than leave a message, especially when they have an urgent problem.",
  },
];

export default function CalculatorPage() {
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
            name: "Missed Call Calculator",
            item: `${base}/missed-call-calculator`,
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
      <section className="relative overflow-hidden pt-28 pb-10 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[920px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
        </div>
        <div className="container-x max-w-3xl text-center">
          <span className="eyebrow justify-center rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            <Calculator size={14} /> Free calculator
          </span>
          <h1 className="mt-5 text-[2.2rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl">
            What are missed calls really costing you?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Most owners have no idea. Move the sliders to your reality and watch
            the number add up. Fair warning: it stings.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-14">
        <div className="container-x max-w-5xl">
          <MissedCallCalculator />
        </div>
      </section>

      {/* How the math works */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            How the math works
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            A missed call is rarely a missed call. It is a missed job. Here is
            the chain: the phone rings, nobody can grab it, and the caller hangs
            up and dials the next company on their list. They almost never leave
            a voicemail. So the cost is not the call, it is the booked job you
            never got to quote.
          </p>
          <div className="mt-6 rounded-2xl border border-line bg-canvas/50 p-6 font-mono text-sm leading-relaxed text-ink">
            calls per week
            <br />
            × percent missed
            <br />
            × share that are real opportunities
            <br />
            × your close rate
            <br />
            × average job value
            <br />
            <span className="font-bold text-navy">= revenue walking out the door</span>
          </div>

          <div className="mt-10 space-y-3">
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

      {/* Internal links to industries */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            See how OneBy answers for your trade
          </h2>
          <p className="mt-3 text-muted">
            Every industry loses calls a little differently. Here is how we catch
            them in yours.
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
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/ai-receptionist" className="btn btn-ghost">
              How an AI receptionist works
            </Link>
            <Link href="/demo" className="btn btn-primary">
              Book a demo <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
