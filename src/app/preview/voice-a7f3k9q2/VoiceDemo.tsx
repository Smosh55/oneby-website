import {
  PhoneOutgoing,
  Receipt,
  CalendarClock,
  CornerUpRight,
  FileText,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { mdAutoCalls, type CallAction } from "@/data/md-auto-calls";

// Action-type -> label, icon, and the site's semantic tint (mirrors HeroAppMock).
const TYPE_META: Record<string, { label: string; icon: typeof Receipt; cls: string }> = {
  follow_up: { label: "Follow-up", icon: CornerUpRight, cls: "bg-blue/10 text-blue" },
  invoice: { label: "Invoice", icon: Receipt, cls: "bg-warning/15 text-warning" },
  scheduled_task: { label: "Scheduled task", icon: CalendarClock, cls: "bg-green/10 text-green-600" },
  other: { label: "Action", icon: FileText, cls: "bg-canvas-2 text-muted" },
};

function metaLine(a: CallAction) {
  return [a.contact, a.when, a.amount].filter(Boolean).join(" · ");
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function VoiceDemo() {
  const totalActions = mdAutoCalls.reduce((n, c) => n + c.actions.length, 0);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      {/* header */}
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-blue">
          <Sparkles size={13} /> Call intelligence by OneBy
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-[2.4rem] sm:leading-[1.08]">
          MD Auto Rental — every claim call, done for you
        </h1>
        <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
          These are your own recorded calls, run through OneBy. Each one is transcribed, summarized, and
          turned into the exact next steps — who owes what, which check to chase, what to collect — so nothing
          slips. {mdAutoCalls.length} calls, {totalActions} action items surfaced.
        </p>
      </div>

      {/* call cards */}
      <div className="space-y-5">
        {mdAutoCalls.map((c) => (
          <article key={c.id} className="rounded-2xl border border-line bg-surface p-5 shadow-[0_18px_50px_-30px_rgba(4,3,79,0.35)] sm:p-6">
            <header className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue/10 text-[0.82rem] font-bold text-blue">
                {initials(c.insurer)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.98rem] font-bold text-navy">Called {c.insurer}</p>
                <p className="flex items-center gap-1 text-xs text-faint">
                  <PhoneOutgoing size={12} /> Outbound · MD Auto Rental · {c.time}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-blue/10 px-2.5 py-1 text-[11px] font-semibold text-blue">
                {c.actions.length} action{c.actions.length === 1 ? "" : "s"}
              </span>
            </header>

            {/* AI summary */}
            <div className="rounded-xl border border-blue/15 bg-gradient-to-b from-blue/[0.06] to-transparent px-4 py-3.5">
              <div className="mb-1.5 flex items-center gap-1.5">
                <Sparkles size={13} className="text-blue" />
                <span className="text-[0.68rem] font-bold uppercase tracking-wide text-blue">AI summary</span>
              </div>
              <p className="text-[0.9rem] leading-relaxed text-ink">{c.summary}</p>
            </div>

            {/* action items */}
            <p className="mb-2 mt-4 text-[0.68rem] font-bold uppercase tracking-wide text-faint">Action items</p>
            <div className="space-y-2">
              {c.actions.map((a, i) => {
                const t = TYPE_META[a.type] ?? TYPE_META.other;
                const Icon = t.icon;
                const meta = metaLine(a);
                return (
                  <div key={i} className="flex gap-3 rounded-xl border border-line bg-canvas px-3.5 py-3">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${t.cls}`}>
                      <Icon size={15} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[0.86rem] font-semibold text-navy">{a.title}</p>
                        <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${t.cls}`}>{t.label}</span>
                      </div>
                      {meta && <p className="mt-0.5 text-[0.74rem] text-muted">{meta}</p>}
                      {a.clarification && (
                        <p className="mt-1.5 flex items-start gap-1 text-[0.74rem] text-blue">
                          <HelpCircle size={12} className="mt-0.5 shrink-0" /> {a.clarification}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-faint">
        Unlisted preview for MD Auto Rental · processed by OneBy — the all-in-one CRM that catches every call
      </p>
    </main>
  );
}
