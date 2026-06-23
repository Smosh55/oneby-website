import Reveal from "./Reveal";
import { PhoneCall, FileText, Ticket, CalendarDays, Receipt } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    k: "01",
    title: "A call comes in",
    body: "Answered by your team or by OneBy's AI, on a desk phone or the mobile app, day or night.",
  },
  {
    icon: FileText,
    k: "02",
    title: "AI summarizes it",
    body: "Recorded, transcribed, and boiled down to a clean summary: who called, what they need, and how urgent.",
  },
  {
    icon: Ticket,
    k: "03",
    title: "It becomes a ticket",
    body: "The summary turns into a structured ticket, assigned and ready, on the customer's timeline.",
  },
  {
    icon: CalendarDays,
    k: "04",
    title: "You schedule it",
    body: "Drop the job on a tech and a time, synced two-way with Google and Microsoft calendars.",
  },
  {
    icon: Receipt,
    k: "05",
    title: "Invoice it, get paid",
    body: "Send a pay link, take a card, and the job goes from first ring to paid without leaving OneBy.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-canvas py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            From the first ring to paid, in one flow.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            This is the loop OneBy runs on every job. No app to open, no recording
            to replay, no sticky note to lose under a coffee cup.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-blue/10 via-blue/40 to-green/40 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.k} delay={i * 80} className="relative">
                <div className="flex flex-col items-start lg:items-center lg:text-center">
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-line bg-white text-blue shadow-[var(--shadow-sm)]">
                    <s.icon size={22} />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-navy text-[10px] font-bold text-white">
                      {s.k}
                    </span>
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[15rem] text-[0.9rem] leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
