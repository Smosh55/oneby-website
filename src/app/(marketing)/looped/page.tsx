import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Camera,
  Check,
  ClipboardList,
  Lock,
  MessageSquare,
  Repeat,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";
import { jsonLd as serializeJsonLd } from "@/lib/jsonld";

// Looped: the guest-access feature explainer. Public and indexable; the
// feature ships with launch, so every CTA lands on the founder/waitlist
// capture. Spec: docs/guest-seat-spec.md.
export const metadata: Metadata = {
  title: "Looped: Keep Anyone in the Loop for 99 Cents",
  description:
    "Looped gives the people you work with every day, vendors, property owners, builders, a 99-cent pass into your OneBy workspace. They see only what you share. You control everything.",
  keywords: [
    "vendor portal for contractors",
    "subcontractor access software",
    "share work orders with vendors",
    "property owner portal",
    "client collaboration field service",
  ],
  alternates: { canonical: "/looped" },
  openGraph: {
    title: "Looped · OneBy",
    description:
      "Talk to them all the time? Keep them looped for 99 cents. Guest access to your workspace that you control completely.",
    type: "website",
    url: "/looped",
  },
};

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai";

const people = [
  "The plumber you dispatch every week",
  "The property owner who calls for updates",
  "The builder you rough-in for",
  "The realtor who refers you jobs",
  "The adjuster who wants the paper trail",
  "A friend helping on the job",
];

const featureSet = [
  { icon: Briefcase, label: "Shared jobs and status", body: "They see the jobs you share with them, live status included, and nothing else." },
  { icon: ClipboardList, label: "Tasks and checklists", body: "Assign work, watch it get checked off, keep the record on your timeline." },
  { icon: Calendar, label: "Appointments", body: "Their visits on the calendar. Reschedules are requests you approve, not surprises." },
  { icon: Camera, label: "Photos and forms", body: "Field photos and completed forms land on the job, not in a text thread you lose." },
  { icon: MessageSquare, label: "Job messaging", body: "A thread per shared job, so coordination stops living on your personal cell." },
  { icon: ShieldCheck, label: "You hold every control", body: "Per-guest permissions for view, add, edit, and delete. Change them any time." },
];

const hostRules = [
  "Your customer list is never visible to a guest. The CRM is yours alone.",
  "Guests cannot call or text from your lines. The phone is yours alone.",
  "Guests see only the jobs, tasks, and appointments you link to them.",
  "Every guest action is stamped on your timeline.",
  "Revoke a pass in one tap. The history stays with you.",
];

const faqs = [
  {
    q: "Can a guest see my customers or my prices?",
    a: "No. The CRM, your customer list, your price book, and your money are never visible to a guest at any permission level. A pass is a window into the specific work you share, nothing more.",
  },
  {
    q: "Can a guest make calls on my number?",
    a: "No. Calling and texting stay on your side, always. Guests coordinate through job messaging inside the workspace.",
  },
  {
    q: "What does Looped cost?",
    a: "Every OneBy account includes 5 passes free. More passes are 99 cents a month each. Looped+ adds AI call summaries on shared jobs and unlimited messaging for $3.99 a month per pass.",
  },
  {
    q: "What does the guest need?",
    a: "Just the invite, which arrives as a text or email from you. No card, no download, no account setup beyond a login. They see your workspace's shared view from any device.",
  },
  {
    q: "What if I stop working with them?",
    a: "Revoke the pass in one tap. They lose access immediately, and everything that happened stays on your timeline.",
  },
];

export default function LoopedPage() {
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
          { "@type": "ListItem", position: 2, name: "Looped", item: `${base}/looped` },
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
            <Repeat size={14} /> Looped · arrives with launch
          </span>
          <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.2rem]">
            Talk to them all the time? Keep them looped.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Looped gives the people you coordinate with every day a 99-cent
            pass into your workspace. They see exactly what you share, they
            stop calling you for updates, and you control every pixel.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#claim" className="btn btn-primary">
              Get Looped at launch <ArrowRight size={17} />
            </a>
            <Link href="/product" className="btn btn-ghost">
              See the platform
            </Link>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="pb-6">
        <div className="container-x max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            Built for the people already in your call log
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((p) => (
              <div key={p} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 text-[0.92rem] font-medium text-navy">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                  <Repeat size={15} />
                </span>
                {p}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.95rem] leading-relaxed text-muted">
            If you find yourself forwarding the same details to the same person
            every week, that person belongs on a pass. Looped is for recurring
            relationships, not one-off customers; those get your estimates and
            invoices the normal way.
          </p>
        </div>
      </section>

      {/* Feature set */}
      <section className="py-14 lg:py-20">
        <div className="container-x max-w-5xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            What a pass includes
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureSet.map((f) => (
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

      {/* The power dynamic, honest */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-x max-w-4xl">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Your workspace. Your rules.
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                A pass is not a seat at your table. It is a window you open
                exactly as far as you want, and close whenever you want.
              </p>
              <ul className="mt-6 space-y-3">
                {hostRules.map((r) => (
                  <li key={r} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink">
                    <Check size={18} className="mt-0.5 shrink-0 text-green-600" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tiers */}
            <div className="space-y-4">
              <div className="rounded-2xl border-2 border-line bg-surface p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold text-navy">Looped</h3>
                  <p className="text-right">
                    <span className="text-2xl font-extrabold text-navy">$0.99</span>
                    <span className="text-sm text-muted">/mo per pass</span>
                  </p>
                </div>
                <p className="mt-1 text-[0.85rem] font-semibold text-green-600">
                  5 passes free with every account
                </p>
                <ul className="mt-4 space-y-2 text-[0.9rem] text-muted">
                  <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-blue" /> Shared jobs, tasks, and appointments</li>
                  <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-blue" /> Photos, forms, and checklists</li>
                  <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-blue" /> Job messaging, generous free allowance</li>
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-[#f6b21b]/60 bg-[#f6b21b]/[0.06] p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="inline-flex items-center gap-2 text-lg font-bold text-navy">
                    <Sparkles size={17} className="text-[#c98d0a]" /> Looped+
                  </h3>
                  <p className="text-right">
                    <span className="text-2xl font-extrabold text-navy">$3.99</span>
                    <span className="text-sm text-muted">/mo per pass</span>
                  </p>
                </div>
                <p className="mt-1 text-[0.85rem] font-semibold text-[#c98d0a]">
                  The post-call layer
                </p>
                <ul className="mt-4 space-y-2 text-[0.9rem] text-muted">
                  <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#c98d0a]" /> AI call summaries on the jobs you share</li>
                  <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#c98d0a]" /> Unlimited job messaging</li>
                  <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#c98d0a]" /> You approve what is shareable, call by call</li>
                </ul>
              </div>
              <p className="flex items-start gap-2 text-[0.8rem] leading-relaxed text-faint">
                <Lock size={13} className="mt-0.5 shrink-0" />
                Calls, texting, and your CRM never transfer to a guest at any
                tier. Launch pricing; passes keep the price they were granted at.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Claim */}
      <section id="claim" className="scroll-mt-24 bg-navy py-16 lg:py-24">
        <div className="container-x max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Looped arrives with launch. Be first.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
            Join the list and you are in line for early access, and founders
            lock the AI Suite at $39 for two years while everyone else pays
            $49.
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
            Looped questions
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
            <Link href="/product" className="btn btn-ghost">
              The whole platform
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              Pricing
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
