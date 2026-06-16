import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Zap, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers at OneBy",
  description:
    "We're a small team building the AI Communications OS for the businesses that keep the world running. No open roles posted right now, but we always want to meet great people.",
  alternates: { canonical: "/careers" },
};

const values = [
  {
    icon: Zap,
    title: "Ship fast, stay simple",
    body: "We'd rather ship something useful this week than something perfect next quarter. Simple beats clever.",
  },
  {
    icon: Heart,
    title: "Build for real people",
    body: "Our customers are plumbers, dispatchers, and front desks. We sweat the details that save them an hour.",
  },
  {
    icon: Users,
    title: "Small team, big ownership",
    body: "Everyone here owns real outcomes. No layers, no politics, no busywork.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
        </div>
        <div className="container-x max-w-3xl">
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            Careers
          </span>
          <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.25rem]">
            Come help us kill voicemail for good.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            We're a small team building the AI Communications OS for the
            businesses that keep the world running. We don't have formal roles
            posted right now, but we're always happy to meet sharp, kind people
            who want to build something useful.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="surface-card h-full rounded-2xl p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue/10 to-green/10 text-blue">
                  <v.icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy">
                  {v.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.1]">
                Think you'd be a fit?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Tell us what you're great at and why OneBy. We read every note.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="mailto:careers@oneby.ai" className="btn btn-primary text-base">
                  Email us <ArrowRight size={18} />
                </a>
                <Link href="/about" className="btn btn-white text-base">
                  Read our story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
