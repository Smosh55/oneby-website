import Reveal from "./Reveal";
import { PhoneOff, Voicemail, Trash2 } from "lucide-react";

const stats = [
  {
    icon: PhoneOff,
    stat: "1 in 4",
    label: "calls to small businesses go unanswered",
  },
  {
    icon: Voicemail,
    stat: "80%",
    label: "of callers won't leave a voicemail — they call the next company",
  },
  {
    icon: Trash2,
    stat: "$1,200+",
    label: "average value of a single missed home-service job",
  },
];

export default function Problem() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-error">The hidden leak</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Every missed call is a customer handing money to your competitor.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            You&apos;re on a ladder, under a sink, or driving to the next job.
            The phone rings, nobody answers, and the lead is gone before you
            ever knew it existed. Voicemail doesn&apos;t fix it — it just
            records the loss.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="surface-card h-full rounded-2xl p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-error/10 text-error">
                  <s.icon size={20} />
                </span>
                <p className="mt-5 text-4xl font-extrabold tracking-tight text-navy">
                  {s.stat}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* old way vs new way teaser */}
        <Reveal delay={120} className="mt-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-line bg-canvas px-6 py-5 text-center sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
            <span className="text-sm font-semibold text-muted line-through decoration-error/60">
              Call → Voicemail → Forgotten
            </span>
            <span className="hidden text-faint sm:block">→</span>
            <span className="text-sm font-bold text-navy">
              Call → AI → Summary → Task → Resolution
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
