"use client";

import { useEffect, useRef, useState } from "react";
import {
  PhoneCall,
  Sparkles,
  Activity,
  Ticket,
  CalendarDays,
  Receipt,
  MessageSquare,
  ListChecks,
  Mail,
  Check,
  X,
  ArrowRight,
  Clock,
  CornerUpRight,
  HelpCircle,
  Calendar,
  CheckCircle2,
  Send,
  Lock,
  type LucideIcon,
} from "lucide-react";

const JOB = {
  customer: "Maria G.",
  issue: "Upstairs A/C not cooling",
  ticket: "1042",
  tech: "Luis R.",
};

const SUMMARY =
  "Existing customer, upstairs A/C not cooling since last night. Home after 3pm, wants a same-day visit.";

const tags = ["Existing customer", "HVAC", "Same-day"];

type ModId =
  | "live"
  | "tickets"
  | "schedule"
  | "invoices"
  | "messages"
  | "tasks"
  | "email";

const MODULES: { id: ModId; label: string; icon: LucideIcon; badge?: string; soon?: boolean }[] = [
  { id: "live", label: "Live", icon: Activity },
  { id: "tickets", label: "Tickets", icon: Ticket, badge: "1" },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "invoices", label: "Invoices", icon: Receipt },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "tasks", label: "Tasks", icon: ListChecks, badge: "3" },
  { id: "email", label: "Email", icon: Mail, soon: true },
];

const NEXT: Partial<Record<ModId, { id: ModId; label: string }>> = {
  live: { id: "tickets", label: "See the ticket" },
  tickets: { id: "schedule", label: "Schedule it" },
  schedule: { id: "invoices", label: "Invoice the job" },
  invoices: { id: "messages", label: "Text the customer" },
  messages: { id: "tasks", label: "See the tasks" },
};

type Phase = "transcribing" | "summarizing" | "typing" | "done";

const SLOTS = ["1:00", "2:30", "3:30", "5:00"];

type TaskState = "pending" | "acted" | "ignored";

export default function HeroAppMock() {
  const [active, setActive] = useState<ModId>("live");
  const [phase, setPhase] = useState<Phase>("transcribing");
  const [typed, setTyped] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<"draft" | "sent" | "paid">("draft");
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>([
    { me: true, text: `Hi Maria, this is OneBy for Summit HVAC. Luis is booked for your A/C diagnostic today at 3:30.` },
    { me: false, text: "Perfect, thank you!" },
  ]);
  const [tasks, setTasks] = useState<Record<number, TaskState>>({ 1: "pending", 2: "pending", 3: "pending" });

  // replay the whole demo when it scrolls back into view
  const rootRef = useRef<HTMLDivElement>(null);
  const wasVisible = useRef(false);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible.current) {
          wasVisible.current = true;
          setActive("live");
          setPhase("transcribing");
          setTyped(0);
          setSlot(null);
          setInvoice("draft");
          setTasks({ 1: "pending", 2: "pending", 3: "pending" });
        } else if (!entry.isIntersecting) {
          wasVisible.current = false;
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (phase === "transcribing") {
      const t = setTimeout(() => setPhase("summarizing"), 950);
      return () => clearTimeout(t);
    }
    if (phase === "summarizing") {
      const t = setTimeout(() => setPhase("typing"), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing") return;
    if (typed >= SUMMARY.length) {
      const t = setTimeout(() => setPhase("done"), 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped((n) => Math.min(n + 3, SUMMARY.length)), 26);
    return () => clearTimeout(t);
  }, [phase, typed]);

  const next = NEXT[active];

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-5xl">
      <div className="absolute -left-4 top-1/3 z-10 hidden rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lg)] lg:block">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-faint">AI answered</p>
        <p className="text-sm font-semibold text-navy">In 2 rings ⚡</p>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-line bg-surface shadow-[0_40px_90px_-30px_rgba(4,3,79,0.35)]">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-line bg-canvas/70 px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 inline-flex items-center gap-1.5">
            <span className="grid h-6 w-6 place-items-center rounded-md border border-line bg-white shadow-sm sm:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/oneby-mark.svg" alt="" className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold text-faint">OneBy · Workspace</span>
          </span>
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
            <div className="mb-5 flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/oneby-mark.svg" alt="OneBy" className="h-6 w-6" />
              </span>
              <span className="text-base font-bold tracking-tight text-navy">OneBy</span>
            </div>
            <nav className="space-y-1">
              {MODULES.map((m) => {
                const on = m.id === active;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => !m.soon && setActive(m.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[0.85rem] font-medium transition-colors ${
                      on ? "bg-blue/10 text-blue" : m.soon ? "text-faint" : "text-ink/70 hover:bg-canvas-2"
                    }`}
                  >
                    <m.icon size={16} />
                    {m.label}
                    {m.badge && (
                      <span className="ml-auto rounded-full bg-blue px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {m.badge}
                      </span>
                    )}
                    {m.soon && (
                      <span className="ml-auto rounded-full bg-canvas-2 px-1.5 py-0.5 text-[9px] font-bold uppercase text-faint">
                        Soon
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* main */}
          <div className="flex min-h-[420px] flex-col p-4 sm:p-6">
            {/* mobile module pills */}
            <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 sm:hidden">
              {MODULES.filter((m) => !m.soon).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActive(m.id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    m.id === active ? "bg-blue text-white" : "bg-canvas-2 text-ink/70"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="flex-1">
              {active === "live" && (
                <LiveView phase={phase} typed={typed} />
              )}
              {active === "tickets" && <TicketsView />}
              {active === "schedule" && <ScheduleView slot={slot} setSlot={setSlot} />}
              {active === "invoices" && <InvoicesView state={invoice} setState={setInvoice} />}
              {active === "messages" && <MessagesView msgs={msgs} setMsgs={setMsgs} />}
              {active === "tasks" && <TasksView tasks={tasks} setTasks={setTasks} />}
              {active === "email" && <EmailView />}
            </div>

            {/* next step */}
            {next && (active !== "live" || phase === "done") && (
              <button
                type="button"
                onClick={() => setActive(next.id)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 self-start rounded-lg bg-navy px-3.5 py-2 text-[0.8rem] font-semibold text-white transition-opacity hover:opacity-90"
              >
                {next.label}
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-bold text-navy">{title}</h3>
      <p className="text-xs text-faint">{sub}</p>
    </div>
  );
}

function Dots() {
  return (
    <span className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue" style={{ animationDelay: `${i * 140}ms` }} />
      ))}
    </span>
  );
}

function LiveView({ phase, typed }: { phase: Phase; typed: number }) {
  const done = phase === "done";
  const processing = phase === "transcribing" || phase === "summarizing";
  return (
    <div>
      <ModuleHeader title="Live activity" sub="A call just came in" />
      <div className="rounded-xl border border-line bg-canvas px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green/10 text-green-600">
            <PhoneCall size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-[0.95rem] font-semibold text-navy">Call with {JOB.customer}</p>
            <p className="truncate text-xs text-muted">Desk phone · 4:12 · completed</p>
          </div>
          {done ? (
            <span className="ml-auto shrink-0 rounded-full bg-blue/10 px-2.5 py-1 text-[11px] font-semibold text-blue">AI summarized</span>
          ) : (
            <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue/10 px-2.5 py-1 text-[11px] font-semibold text-blue">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue" /> Summarizing
            </span>
          )}
        </div>
        {done && (
          <div className="animate-rise mt-3 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="rounded-md border border-line bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-ink/70">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

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
            {phase === "typing" && <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-blue align-middle" />}
          </p>
        )}
      </div>

      {done && (
        <p className="animate-rise mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green/10 px-3 py-2 text-[0.8rem] font-semibold text-green-600">
          <Ticket size={15} /> Turned into Ticket #{JOB.ticket}, automatically
        </p>
      )}
    </div>
  );
}

function TicketsView() {
  return (
    <div>
      <ModuleHeader title="Tickets" sub="One open job" />
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-faint">#{JOB.ticket}</span>
          <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase text-warning">Urgent</span>
        </div>
        <p className="mt-2 text-[0.95rem] font-semibold text-navy">{JOB.issue}</p>
        <p className="mt-1 text-sm text-muted">{JOB.customer} · existing customer</p>
        <div className="mt-3 rounded-lg border border-blue/15 bg-blue/[0.04] px-3 py-2 text-[0.82rem] leading-relaxed text-ink">
          {SUMMARY}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.78rem]">
          <span className="inline-flex items-center gap-1 rounded-md bg-canvas-2 px-2 py-1 font-semibold text-navy">
            <Clock size={13} /> Status: New
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-canvas-2 px-2 py-1 font-semibold text-navy">
            Assigned: {JOB.tech}
          </span>
        </div>
      </div>
    </div>
  );
}

function ScheduleView({ slot, setSlot }: { slot: string | null; setSlot: (s: string) => void }) {
  return (
    <div>
      <ModuleHeader title="Schedule" sub="Today · drop the job on a slot" />
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-navy">
          <Calendar size={15} className="text-blue" /> {JOB.tech}, today
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {SLOTS.map((s) => {
            const on = slot === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={`rounded-lg border px-2 py-3 text-center text-[0.8rem] font-semibold transition-colors ${
                  on ? "border-green/40 bg-green/10 text-green-600" : "border-line bg-canvas text-ink/70 hover:border-blue"
                }`}
              >
                {s}
                {on && <Check size={13} className="mx-auto mt-1" />}
              </button>
            );
          })}
        </div>
        {slot ? (
          <div className="animate-rise mt-4 flex items-start gap-2.5 rounded-lg border border-green/25 bg-green/[0.07] px-3.5 py-3">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-green-600" />
            <div>
              <p className="text-[0.85rem] font-semibold text-navy">Booked: {JOB.tech}, {slot} PM</p>
              <p className="text-[0.75rem] text-muted">Synced to Google Calendar · {JOB.customer} texted a confirmation</p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-[0.8rem] text-faint">Tap a time to book the diagnostic.</p>
        )}
      </div>
    </div>
  );
}

function InvoicesView({ state, setState }: { state: "draft" | "sent" | "paid"; setState: (s: "draft" | "sent" | "paid") => void }) {
  const lines = [
    { label: "A/C diagnostic", amt: 89 },
    { label: "Capacitor replacement", amt: 100 },
  ];
  const total = lines.reduce((n, l) => n + l.amt, 0);
  return (
    <div>
      <ModuleHeader title="Invoices" sub={`Job #${JOB.ticket} · ${JOB.customer}`} />
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="space-y-1.5">
          {lines.map((l) => (
            <div key={l.label} className="flex items-center justify-between text-[0.85rem]">
              <span className="text-ink">{l.label}</span>
              <span className="font-semibold text-navy">${l.amt}</span>
            </div>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-line pt-2 text-[0.95rem]">
            <span className="font-bold text-navy">Total</span>
            <span className="font-extrabold text-navy">${total}</span>
          </div>
        </div>

        {state === "draft" && (
          <button
            type="button"
            onClick={() => setState("sent")}
            className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue px-3 py-2.5 text-[0.85rem] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Send size={15} /> Send invoice + pay link
          </button>
        )}
        {state === "sent" && (
          <div className="animate-rise mt-4">
            <div className="flex items-start gap-2.5 rounded-lg border border-blue/20 bg-blue/[0.05] px-3.5 py-3">
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue" />
              <div>
                <p className="text-[0.85rem] font-semibold text-navy">Invoice sent</p>
                <p className="text-[0.75rem] text-muted">Pay link texted to {JOB.customer}. Tap to pay by card.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setState("paid")}
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-green/30 bg-green/10 px-3 py-2 text-[0.82rem] font-semibold text-green-600"
            >
              Mark as paid
            </button>
          </div>
        )}
        {state === "paid" && (
          <div className="animate-rise mt-4 flex items-center justify-center gap-2 rounded-lg border border-green/30 bg-green/[0.09] px-3 py-3 text-[0.9rem] font-bold text-green-600">
            <CheckCircle2 size={18} /> Paid ${total}
          </div>
        )}
      </div>
    </div>
  );
}

function MessagesView({ msgs, setMsgs }: { msgs: { me: boolean; text: string }[]; setMsgs: (m: { me: boolean; text: string }[]) => void }) {
  const quick = ["On our way 🚐", "Running 10 min late", "All done, invoice sent"];
  return (
    <div>
      <ModuleHeader title="Messages" sub={`Texting ${JOB.customer}`} />
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="space-y-2">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
              <span
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-[0.82rem] leading-snug ${
                  m.me ? "bg-blue text-white" : "bg-canvas-2 text-ink"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {quick.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setMsgs([...msgs, { me: true, text: q }])}
              className="inline-flex items-center gap-1 rounded-full border border-line bg-canvas px-2.5 py-1 text-[0.74rem] font-medium text-ink/70 transition-colors hover:border-blue hover:text-blue"
            >
              <Send size={11} /> {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const TASKS = [
  { id: 1, icon: Calendar, title: "Schedule A/C diagnostic", meta: "Dispatch · today", acted: "Added to today's schedule" },
  { id: 2, icon: CornerUpRight, title: "Text Maria her arrival window", meta: "Follow-up", acted: "Text queued to Maria" },
  { id: 3, icon: HelpCircle, title: "Confirm: upstairs unit, not downstairs?", meta: "Asks before assuming", acted: "Confirmed with the caller" },
];

function TasksView({ tasks, setTasks }: { tasks: Record<number, TaskState>; setTasks: (t: Record<number, TaskState>) => void }) {
  const set = (id: number, s: TaskState) => setTasks({ ...tasks, [id]: s });
  return (
    <div>
      <ModuleHeader title="Tasks" sub="Act on what the call needs" />
      <div className="space-y-2">
        {TASKS.map((it) => {
          const st = tasks[it.id];
          if (st === "ignored")
            return (
              <div key={it.id} className="flex items-center gap-3 rounded-xl border border-line bg-canvas/60 px-3.5 py-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-line/60 text-faint"><X size={15} /></span>
                <p className="min-w-0 truncate text-[0.85rem] font-medium text-faint line-through">{it.title}</p>
                <button type="button" onClick={() => set(it.id, "pending")} className="ml-auto shrink-0 text-[0.72rem] font-semibold text-blue hover:underline">Undo</button>
              </div>
            );
          if (st === "acted")
            return (
              <div key={it.id} className="flex items-center gap-3 rounded-xl border border-green/30 bg-green/[0.09] px-3.5 py-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-green text-white"><Check size={16} /></span>
                <div className="min-w-0">
                  <p className="truncate text-[0.85rem] font-semibold text-navy">{it.title}</p>
                  <p className="text-[0.72rem] font-medium text-green-600">{it.acted}</p>
                </div>
                <button type="button" onClick={() => set(it.id, "pending")} className="ml-auto shrink-0 text-[0.72rem] font-semibold text-muted hover:underline">Undo</button>
              </div>
            );
          return (
            <div key={it.id} className="rounded-xl border border-line bg-canvas px-3.5 py-2.5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue"><it.icon size={16} /></span>
                <div className="min-w-0">
                  <p className="truncate text-[0.85rem] font-semibold text-navy">{it.title}</p>
                  <p className="text-[0.72rem] text-muted">{it.meta}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => set(it.id, "ignored")} className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[0.72rem] font-semibold text-muted hover:bg-canvas">Ignore</button>
                <button type="button" onClick={() => set(it.id, "acted")} className="inline-flex items-center gap-1 rounded-lg bg-blue px-2.5 py-1 text-[0.72rem] font-semibold text-white hover:opacity-90"><Check size={13} /> Act</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EmailView() {
  return (
    <div>
      <ModuleHeader title="Email" sub="One more channel" />
      <div className="grid place-items-center rounded-xl border border-dashed border-line bg-canvas/40 px-6 py-12 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue/10 text-blue">
          <Mail size={22} />
        </span>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-canvas-2 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-faint">
          <Lock size={11} /> Coming soon
        </p>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
          Send and track email from the same customer timeline as your calls, texts, and jobs. Launching soon.
        </p>
      </div>
    </div>
  );
}
