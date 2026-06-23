import type { Metadata } from "next";
import { CheckCircle2, Clock, PhoneCall, Sparkles } from "lucide-react";
import DemoForm from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "Book a Demo: See OneBy Turn a Call Into Action",
  description:
    "Book a 20-minute OneBy demo. We'll show you a real call become a summary and an assigned task, live, and map it to your business.",
  alternates: { canonical: "/demo" },
  // Pure lead-capture page: keep it out of the index, still follow its links.
  robots: { index: false, follow: true },
};

const points = [
  {
    icon: PhoneCall,
    title: "We use your real call flow",
    body: "Bring a typical call. We'll show you exactly what OneBy does with it.",
  },
  {
    icon: Sparkles,
    title: "Watch a call become a task",
    body: "See the summary write itself and the follow-up task get created and assigned.",
  },
  {
    icon: Clock,
    title: "Twenty minutes, tops",
    body: "No slideshow marathon. A quick, useful walkthrough built around your business.",
  },
];

export default function DemoPage() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[960px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
        <div className="absolute top-16 right-[8%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.16),transparent)]" />
      </div>

      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Pitch */}
        <div className="max-w-xl min-w-0 lg:pt-6">
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            Book a demo
          </span>
          <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl">
            See your phone finally pull its weight.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Fill this out and we'll set up a quick demo. We'll take one of your
            real calls and show you it turning into a summary and an assigned
            task, no imagination required.
          </p>

          <ul className="mt-8 space-y-5">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
                  <p.icon size={18} />
                </span>
                <div>
                  <h3 className="font-semibold text-navy">{p.title}</h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-green" /> Free trial, no credit card
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-green" /> Live in a day
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="min-w-0 lg:sticky lg:top-24">
          <DemoForm />
        </div>
      </div>
    </section>
  );
}
