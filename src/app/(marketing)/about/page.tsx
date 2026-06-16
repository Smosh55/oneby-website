import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles, Target, HeartHandshake } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About OneBy: The Communications OS for Real Businesses",
  description:
    "We built OneBy because the phone is still where business happens, and most of it was getting lost. Here's what we believe and who we build for.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  {
    icon: Phone,
    title: "The phone still runs the business",
    body: "For most service companies, the phone is the cash register. We think the tools around it should be just as serious as the work itself.",
  },
  {
    icon: Sparkles,
    title: "Software should do the boring part",
    body: "Nobody got into HVAC or law to type up call notes. The summary, the task, the follow-up: that's the machine's job, not yours.",
  },
  {
    icon: Target,
    title: "Sell outcomes, not minutes",
    body: "We don't care how many minutes you talk. We care whether the call became a booked job. Everything we ship points at that.",
  },
  {
    icon: HeartHandshake,
    title: "Simple beats clever",
    body: "Plug in a phone and it works. Miss a call and it's handled. If a feature needs a manual, we probably built it wrong.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
          <div className="absolute top-12 right-[10%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.16),transparent)]" />
        </div>
        <div className="container-x">
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            About OneBy
          </span>
          <h1 className="mt-5 max-w-3xl text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.25rem]">
            We got tired of watching good businesses lose customers to a beep.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            The phone rings, nobody can grab it, and a paying customer quietly
            moves on. Meanwhile the calls that do get answered leak details and
            follow-ups the second everyone hangs up. We built OneBy to close that
            gap for good.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 lg:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              The whole idea, in one sentence
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted">
              <p>
                Most businesses have two separate worlds. There's the
                conversation (calls, texts, voicemails) and there's the work
                (jobs, tasks, the schedule). Between them sits a wobbly bridge
                made of sticky notes and good intentions.
              </p>
              <p>
                OneBy is the bridge. It's a complete communications suite, so
                calling, desk phones, SMS, and fax all live in one place. Then
                the AI on top listens to every call, writes the summary, and
                creates and assigns the follow-up task. The conversation becomes
                the work, on its own.
              </p>
              <p>
                That's it. No new hardware to rip out, no second tool to babysit.
                Plug in, port your number, and stop letting the phone cost you
                customers.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Beliefs */}
      <section className="py-12 lg:py-16">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What we believe</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              A few opinions we build around.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 80}>
                <div className="surface-card h-full rounded-2xl p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue/10 to-green/10 text-blue">
                    <b.icon size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-12">
        <div className="container-x">
          <Reveal>
            <div className="rounded-[24px] border border-line bg-canvas px-7 py-12 text-center sm:px-14">
              <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Built for the people who answer the phone for a living.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
                Home services, property management, IT shops, law firms, clinics,
                and any team of any size where a missed call is a missed
                paycheck. If your business runs on conversations, OneBy is for
                you.
              </p>
              <Link
                href="/industries"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:underline"
              >
                See your industry <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.1]">
                Come see what your phone has been hiding.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Book a quick demo and we'll show you every call turning into
                action, live.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/#demo" className="btn btn-primary text-base">
                  Book a demo <ArrowRight size={18} />
                </Link>
                <Link href="/pricing" className="btn btn-white text-base">
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
