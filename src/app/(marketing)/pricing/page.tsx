import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Check, Minus, ArrowRight, Phone, Sparkles } from "lucide-react";
import { plans, matrix, addOns } from "@/data/pricing";
import Reveal from "@/components/Reveal";
import PricingEstimator from "@/components/PricingEstimator";
import { jsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Pricing: Cheap Lines, AI Only Where You Need It",
  description:
    "Put a basic line on the phones that just dial, and AI seats on the lines that book jobs. Estimate your plan in seconds. Start free for 14 days, cancel anytime.",
  alternates: { canonical: "/pricing" },
};

const cols = plans.map((p) => p.name);

const pricingFaqs = [
  {
    q: "Do I need the full AI suite on every phone?",
    a: "Nope, and you shouldn't pay for it. Put a Basic Line on the warehouse phone, the break room, and the back office. Add an AI seat only on the lines that book jobs, like dispatch, intake, and sales.",
  },
  {
    q: "What's the difference between a line and an AI seat?",
    a: "A Basic Line is the phone system: calling, desk phone, SMS, and fax. An AI seat is a line plus the brain: 24/7 AI receptionist, post-call automation, summaries, and tasks that create and assign themselves.",
  },
  {
    q: "What about lobby, conference, and paging phones?",
    a: "Those run as common-area phones at a flat low rate. Dialtone only, no user license, so a hallway handset never costs you a full seat.",
  },
  {
    q: "Can I move AI from one line to another?",
    a: "Anytime. Turn an AI seat on for the busy season and back to a Basic Line when things slow down. You're never locked in.",
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-green/15 text-green-600">
        <Check size={14} strokeWidth={3} />
      </span>
    );
  if (value === false)
    return (
      <span className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-canvas-2 text-faint">
        <Minus size={13} />
      </span>
    );
  return <span className="text-[0.85rem] font-medium text-navy">{value}</span>;
}

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";
const productJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "OneBy",
      description:
        "The AI Communications OS: calling, desk phones, SMS, and fax, plus post-call automation that turns every call into a summary and an assigned task.",
      brand: { "@type": "Brand", name: "OneBy" },
      url: `${base}/pricing`,
      offers: plans
        .filter((p) => p.price !== "Custom")
        .map((p) => ({
          "@type": "Offer",
          name: `${p.name} plan`,
          price: p.price,
          priceCurrency: "USD",
          url: `${base}/pricing`,
          availability: "https://schema.org/InStock",
        })),
    },
    {
      "@type": "FAQPage",
      mainEntity: pricingFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd(productJsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-10 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[440px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.12),transparent)]" />
        </div>
        <div className="container-x text-center">
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            Pricing
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.25rem]">
            Pay for a dialtone where you need a dialtone.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Not every phone needs a brain. Put a cheap Basic Line on the
            extensions that just dial, and add an AI seat only on the lines that
            book jobs. Start free for 14 days, cancel anytime.
          </p>
        </div>
      </section>

      {/* Two things you buy */}
      <section className="pb-4">
        <div className="container-x">
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="surface-card rounded-2xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-green/10 text-green-600">
                <Phone size={20} />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-navy">
                1. Lines, for every phone
              </h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                Calling, desk phone with auto-provisioning, SMS, and fax. Cheap
                enough to put on every extension, including the ones that just
                need a dialtone.
              </p>
            </div>
            <div className="surface-card rounded-2xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10 text-blue">
                <Sparkles size={20} />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-navy">
                2. AI seats, where they pay off
              </h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                Add the AI receptionist, post-call automation, and auto-assigned
                tasks only on the lines that book jobs. The brain goes where the
                revenue is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="pb-8">
        <div className="container-x">
          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 80}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl p-7 ${
                    plan.featured
                      ? "bg-navy text-white shadow-[var(--shadow-xl)] ring-1 ring-blue/40"
                      : "surface-card"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-[var(--shadow-md)]">
                      Most popular
                    </span>
                  )}
                  <h2
                    className={`text-lg font-bold ${
                      plan.featured ? "text-white" : "text-navy"
                    }`}
                  >
                    {plan.name}
                  </h2>
                  <p
                    className={`mt-1 text-sm ${
                      plan.featured ? "text-white/65" : "text-muted"
                    }`}
                  >
                    {plan.tagline}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    {plan.price !== "Custom" && (
                      <span
                        className={`text-2xl font-semibold ${
                          plan.featured ? "text-white/70" : "text-muted"
                        }`}
                      >
                        $
                      </span>
                    )}
                    <span
                      className={`text-5xl font-extrabold tracking-tight ${
                        plan.featured ? "text-white" : "text-navy"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`ml-1 text-sm ${
                        plan.featured ? "text-white/60" : "text-faint"
                      }`}
                    >
                      {plan.unit}
                    </span>
                  </div>
                  <Link
                    href="/demo"
                    className={`btn mt-6 w-full ${
                      plan.featured ? "btn-white" : plan.ctaClass
                    }`}
                  >
                    {plan.cta}
                  </Link>
                  <ul className="mt-7 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            plan.featured
                              ? "bg-green/20 text-green"
                              : "bg-green/15 text-green-600"
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span
                          className={`text-[0.9rem] ${
                            plan.featured ? "text-white/85" : "text-ink"
                          }`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto mb-8 max-w-2xl text-center">
            <span className="eyebrow">Build your plan</span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Mix lines and AI seats. See the price instantly.
            </h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">
              Most teams run a handful of AI seats and a pile of basic lines.
              Drag the numbers around and watch the total.
            </p>
          </Reveal>
          <PricingEstimator />
        </div>
      </section>

      {/* Comparison matrix */}
      <section className="pb-16 lg:pb-20">
        <div className="container-x">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Every feature, side by side
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-[var(--shadow-sm)]">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-line bg-canvas/70">
                  <th className="px-5 py-4 text-left text-sm font-semibold text-muted">
                    Feature
                  </th>
                  {cols.map((c, i) => (
                    <th
                      key={c}
                      className={`px-4 py-4 text-center text-sm font-bold ${
                        i === 1 ? "bg-blue/5 text-blue" : "text-navy"
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((grp) => (
                  <Fragment key={grp.group}>
                    <tr>
                      <td
                        colSpan={4}
                        className="bg-canvas/40 px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-wide text-faint"
                      >
                        {grp.group}
                      </td>
                    </tr>
                    {grp.rows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-line last:border-0"
                      >
                        <td className="px-5 py-3.5 text-[0.9rem] font-medium text-ink">
                          {row.label}
                        </td>
                        {row.values.map((v, i) => (
                          <td
                            key={i}
                            className={`px-4 py-3.5 text-center ${
                              i === 1 ? "bg-blue/5" : ""
                            }`}
                          >
                            <Cell value={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="pb-16">
        <div className="container-x">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Add-ons, when you need them
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((a) => (
              <div key={a.name} className="surface-card rounded-2xl p-6">
                <h3 className="font-semibold text-navy">{a.name}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                  {a.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="pb-16">
        <div className="container-x">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Questions about how it's priced
          </h2>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {pricingFaqs.map((f) => (
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
                Try it free. Keep the jobs you book.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Spin up OneBy in a day, port your number, and watch your next
                missed call turn into a booked job.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/demo" className="btn btn-primary text-base">
                  Book a demo <ArrowRight size={18} />
                </Link>
                <Link href="/demo" className="btn btn-white text-base">
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
