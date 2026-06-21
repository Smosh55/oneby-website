"use client";

import { useEffect, useState } from "react";
import {
  PhoneCall,
  Sparkles,
  Calendar,
  CornerUpRight,
  HelpCircle,
  Activity,
  Phone,
  ListChecks,
  Inbox,
  Users,
  Check,
  X,
  Plus,
  FileText,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

const nav = [
  { icon: Activity, label: "Live", active: true },
  { icon: Phone, label: "Calls" },
  { icon: ListChecks, label: "Tasks", badge: "7" },
  { icon: Inbox, label: "Inbox" },
  { icon: Users, label: "Customers" },
];

const tags = ["Existing customer", "HVAC", "Same-day"];

const SUMMARY =
  "Existing customer, upstairs A/C not cooling since last night. Home after 3pm, wants a same-day visit.";

type Tone = "green" | "blue" | "amber";

type Item = {
  id: number;
  icon: LucideIcon;
  tone: Tone;
  title: string;
  meta: string;
  badge: string;
  badgeTone: "green" | "amber";
  acted: string;
};

const items: Item[] = [
  {
    id: 1,
    icon: Calendar,
    tone: "green",
    title: "Schedule A/C diagnostic",
    meta: "Dispatch · today",
    badge: "Confident",
    badgeTone: "green",
    acted: "Added to today's schedule",
  },
  {
    id: 2,
    icon: CornerUpRight,
    tone: "blue",
    title: "Text Maria her arrival window",
    meta: "Follow-up",
    badge: "Confident",
    badgeTone: "green",
    acted: "Text queued to Maria",
  },
  {
    id: 3,
    icon: HelpCircle,
    tone: "amber",
    title: "Confirm: upstairs unit, not downstairs?",
    meta: "Asks before assuming",
    badge: "Review",
    badgeTone: "amber",
    acted: "Confirmed with the caller",
  },
];

const transcript = [
  { who: "Caller", line: "Hi, my upstairs A/C stopped cooling overnight. It's getting warm up there." },
  { who: "OneBy", line: "Sorry to hear that. I can get a technician out today. Is someone home after 3pm?" },
  { who: "Caller", line: "Yeah, after three works. I've used you all before, last summer I think." },
  { who: "OneBy", line: "Got it, welcome back. I'll book a same-day diagnostic and text you the arrival window." },
];

type Phase = "transcribing" | "summarizing" | "typing" | "done";

export default function HeroAppMock() {
  const [phase, setPhase] = useState<Phase>("transcribing");
  const [typed, setTyped] = useState(0);
  const [openTranscript, setOpenTranscript] = useState(false);
  const [status, setStatus] = useState<Record<number, "pending" | "acted" | "ignored">>({
    1: "pending",
    2: "pending",
    3: "pending",
  });

  // processing -> summarizing -> typing
  useEffect(() => {
    if (phase === "transcribing") {
      const t = setTimeout(() => setPhase("summarizing"), 1000);
      return () => clearTimeout(t);
    }
    if (phase === "summarizing") {
      const t = setTimeout(() => setPhase("typing"), 850);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // typewriter for the summary (chunked so it stays smooth and finishes
  // even when timers are throttled in a backgrounded tab)
  useEffect(() => {
    if (phase !== "typing") return;
    if (typed >= SUMMARY.length) {
      const t = setTimeout(() => setPhase("done"), 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped((n) => Math.min(n + 3, SUMMARY.length)), 28);
    return () => clearTimeout(t);
  }, [phase, typed]);

  const processing = phase === "transcribing" || phase === "summarizing";
  const done = phase === "done";
  const set = (id: number, s: "pending" | "acted" | "ignored") =>
    setStatus((prev) => ({ ...prev, [id]: s }));

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* floating chips */}
      <div className="absolute -left-4 top-16 z-10 hidden rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lg)] lg:block">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-faint">AI answered</p>
        <p className="text-sm font-semibold text-navy">In 2 rings ⚡</p>
      </div>
      <div
        className={`absolute -right-4 bottom-24 z-10 hidden rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lg)] transition-all duration-500 lg:block ${
          done ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-faint">Owner notified</p>
        <p className="text-sm font-semibold text-navy">Summary + tasks · 8s</p>
      </div>

      {/* window */}
      <div className="overflow-hidden rounded-[20px] border border-line bg-surface shadow-[0_40px_90px_-30px_rgba(4,3,79,0.35)]">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-line bg-canvas/70 px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs font-semibold text-faint">OneBy · Workspace</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-green/10 px-2.5 py-1 text-[11px] font-semibold text-green-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            Live
          </span>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 sm:grid-cols-[184px_1fr]">
          {/* sidebar */}
          <aside className="hidden border-r border-line bg-canvas/40 p-4 sm:block">
            <div className="mb-5 flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-navy">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/oneby-mark.svg" alt="" className="h-4 w-4" />
              </span>
              <span className="text-[0.95rem] font-bold tracking-tight text-navy">OneBy</span>
            </div>
            <nav className="space-y-1">
              {nav.map((n) => (
                <div
                  key={n.label}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.85rem] font-medium ${
                    n.active ? "bg-blue/10 text-blue" : "text-ink/70"
                  }`}
                >
                  <n.icon size={16} />
                  {n.label}
                  {n.badge && (
                    <span className="ml-auto rounded-full bg-blue px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {n.badge}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* main */}
          <div className="p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Live activity</h3>
              <span className="text-xs text-faint">Today</span>
            </div>

            {/* handled call */}
            <div className="rounded-xl border border-line bg-canvas px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green/10 text-green-600">
                  <PhoneCall size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.95rem] font-semibold text-navy">Call with Maria G.</p>
                  <p className="truncate text-xs text-muted">Desk phone · 4:12 · completed</p>
                </div>
                {done ? (
                  <span className="ml-auto shrink-0 rounded-full bg-blue/10 px-2.5 py-1 text-[11px] font-semibold text-blue">
                    AI summarized
                  </span>
                ) : (
                  <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue/10 px-2.5 py-1 text-[11px] font-semibold text-blue">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue" /> Summarizing
                  </span>
                )}
              </div>

              {/* tags */}
              {done && (
                <div className="animate-rise mt-3 flex flex-wrap items-center gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-0.5 rounded-md border border-dashed border-line px-2 py-0.5 text-[0.7rem] font-medium text-faint">
                    <Plus size={11} /> Tag
                  </span>
                </div>
              )}
            </div>

            {/* summary */}
            <div className="mt-3 rounded-xl border border-blue/15 bg-gradient-to-b from-blue/[0.06] to-transparent px-4 py-4">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-blue" />
                <span className="text-xs font-bold uppercase tracking-wide text-blue">AI summary</span>
              </div>

              {processing ? (
                <div className="mt-3 flex items-center gap-2.5">
                  <Dots />
                  <span className="text-[0.85rem] font-medium text-muted">
                    {phase === "transcribing" ? "Transcribing the call" : "Writing the summary"}
                  </span>
                </div>
              ) : (
                <p className="mt-2 min-h-[2.75rem] text-[0.9rem] leading-relaxed text-ink">
                  {SUMMARY.slice(0, typed)}
                  {phase === "typing" && (
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-blue align-middle" />
                  )}
                </p>
              )}

              {/* read full transcript */}
              {done && (
                <div className="animate-rise">
                  <button
                    type="button"
                    onClick={() => setOpenTranscript((v) => !v)}
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-blue hover:underline"
                    aria-expanded={openTranscript}
                  >
                    <FileText size={14} />
                    {openTranscript ? "Hide transcript" : "Read full transcript"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openTranscript ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openTranscript && (
                    <div className="mt-3 space-y-2 rounded-lg border border-line bg-surface px-3.5 py-3">
                      {transcript.map((t, i) => (
                        <p key={i} className="text-[0.8rem] leading-relaxed text-ink">
                          <span
                            className={`font-semibold ${t.who === "OneBy" ? "text-blue" : "text-navy"}`}
                          >
                            {t.who}:
                          </span>{" "}
                          {t.line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* action items */}
            {done && (
              <div className="mt-4">
                <div className="animate-rise flex items-center gap-2 px-1 pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-faint">
                    Action items
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>

                <div className="space-y-2">
                  {items.map((it, i) => (
                    <div
                      key={it.id}
                      className="animate-rise"
                      style={{ animationDelay: `${i * 110}ms` }}
                    >
                      <ActionRow
                        item={it}
                        status={status[it.id]}
                        onAct={() => set(it.id, "acted")}
                        onIgnore={() => set(it.id, "ignored")}
                        onUndo={() => set(it.id, "pending")}
                      />
                    </div>
                  ))}
                </div>

                <p className="px-1 pt-2.5 text-[0.72rem] leading-snug text-faint">
                  It never invents facts. When it&apos;s unsure, it asks instead of guessing.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dots() {
  return (
    <span className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue"
          style={{ animationDelay: `${i * 140}ms` }}
        />
      ))}
    </span>
  );
}

function ActionRow({
  item,
  status,
  onAct,
  onIgnore,
  onUndo,
}: {
  item: Item;
  status: "pending" | "acted" | "ignored";
  onAct: () => void;
  onIgnore: () => void;
  onUndo: () => void;
}) {
  const Icon = item.icon;

  if (status === "ignored") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas/60 px-3.5 py-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-line/60 text-faint">
          <X size={15} />
        </span>
        <p className="min-w-0 truncate text-[0.85rem] font-medium text-faint line-through">
          {item.title}
        </p>
        <button
          type="button"
          onClick={onUndo}
          className="ml-auto shrink-0 text-[0.72rem] font-semibold text-blue hover:underline"
        >
          Undo
        </button>
      </div>
    );
  }

  if (status === "acted") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-green/30 bg-green/[0.09] px-3.5 py-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-green text-white">
          <Check size={16} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.85rem] font-semibold text-navy">{item.title}</p>
          <p className="text-[0.72rem] font-medium text-green-600">{item.acted}</p>
        </div>
        <button
          type="button"
          onClick={onUndo}
          className="ml-auto shrink-0 text-[0.72rem] font-semibold text-muted hover:underline"
        >
          Undo
        </button>
      </div>
    );
  }

  const iconBg = {
    green: "bg-green/15 text-green-600",
    blue: "bg-blue/10 text-blue",
    amber: "bg-warning/15 text-warning",
  }[item.tone];
  const border = {
    green: "border-green/25 bg-green/[0.07]",
    blue: "border-line bg-canvas",
    amber: "border-warning/30 bg-warning/[0.07]",
  }[item.tone];
  const dot = item.badgeTone === "green" ? "text-green-600" : "text-warning";
  const dotBg = item.badgeTone === "green" ? "bg-green" : "bg-warning";

  return (
    <div className={`rounded-xl border px-3.5 py-2.5 ${border}`}>
      <div className="flex items-center gap-3">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${iconBg}`}>
          <Icon size={16} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.85rem] font-semibold text-navy">{item.title}</p>
          <p className="text-[0.72rem] text-muted">{item.meta}</p>
        </div>
        <span
          className={`ml-auto inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold ${dot}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dotBg}`} /> {item.badge}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onIgnore}
          className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[0.72rem] font-semibold text-muted transition-colors hover:bg-canvas"
        >
          Ignore
        </button>
        <button
          type="button"
          onClick={onAct}
          className="inline-flex items-center gap-1 rounded-lg bg-blue px-2.5 py-1 text-[0.72rem] font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Check size={13} /> Act
        </button>
      </div>
    </div>
  );
}
