import Reveal from "./Reveal";
import { PhoneOff, Unplug, UserX } from "lucide-react";

const stats = [
  {
    icon: PhoneOff,
    stat: "Missed calls",
    label: "leak leads. Callers rarely leave a voicemail. They just dial the next company.",
  },
  {
    icon: Unplug,
    stat: "Scattered tools",
    label: "lose the job. Your phone, your scheduler, and your invoicing app don't talk, so details fall between them.",
  },
  {
    icon: UserX,
    stat: "Follow-ups",
    label: "fall through. No ticket, no task, no invoice, and nobody on the hook to do it.",
  },
];

export default function Problem() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-error">The hidden leak</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            You're losing jobs to the phone, and to the apps that don't talk.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            The calls you miss go straight to a competitor. The calls you answer
            get scattered across a phone system, an answering service, a
            scheduler, and an invoicing app that never sync. The job falls
            through the cracks between them.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="surface-card h-full rounded-2xl p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-error/10 text-error">
                  <s.icon size={20} />
                </span>
                <p className="mt-5 text-2xl font-bold tracking-tight text-navy">
                  {s.stat}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* one place for the whole job */}
        <Reveal delay={100} className="mt-12 text-center">
          <p className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
            So we built one place for the whole job.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-[0.975rem] text-muted">
            OneBy catches every call, then summarizes, tickets, schedules, and
            invoices it, without jumping between four apps.
          </p>
        </Reveal>

        {/* old way vs new way teaser */}
        <Reveal delay={160} className="mt-8">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-line bg-canvas px-6 py-5 text-center sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
            <span className="text-sm font-semibold text-muted line-through decoration-error/60">
              Call → Voicemail → four apps → dropped
            </span>
            <span className="hidden text-faint sm:block">→</span>
            <span className="text-sm font-bold text-navy">
              Call → Summary → Ticket → Scheduled → Invoiced → Paid
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
