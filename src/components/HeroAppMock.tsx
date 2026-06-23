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
  Users,
  FileText,
  Flag,
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
  ChevronLeft,
  ChevronRight,
  Plus,
  Pencil,
  Tag,
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

type ModId =
  | "live"
  | "tickets"
  | "schedule"
  | "team"
  | "billing"
  | "messages"
  | "tasks"
  | "email";

const MODULES: { id: ModId; label: string; icon: LucideIcon; badge?: string; soon?: boolean }[] = [
  { id: "live", label: "Live", icon: Activity },
  { id: "tickets", label: "Tickets", icon: Ticket, badge: "1" },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "team", label: "Team", icon: Users },
  { id: "billing", label: "Billing", icon: Receipt },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "tasks", label: "Tasks", icon: ListChecks, badge: "3" },
  { id: "email", label: "Email", icon: Mail, soon: true },
];

const NEXT: Partial<Record<ModId, { id: ModId; label: string }>> = {
  live: { id: "tickets", label: "See the ticket" },
  tickets: { id: "schedule", label: "Schedule it" },
  schedule: { id: "team", label: "See the crew" },
  team: { id: "billing", label: "Bill the job" },
  billing: { id: "messages", label: "Text the customer" },
  messages: { id: "tasks", label: "See the tasks" },
};

type Phase = "transcribing" | "summarizing" | "typing" | "done";
type TaskState = "pending" | "acted" | "ignored";
type Job = { time: string; title: string; tech: string; hot?: boolean };

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MLEN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function dateFor(offset: number, i: number) {
  let m = 5; // June
  let d = 9 + offset * 7 + i;
  while (d > MLEN[m]) {
    d -= MLEN[m];
    m = (m + 1) % 12;
  }
  while (d < 1) {
    m = (m + 11) % 12;
    d += MLEN[m];
  }
  return { dow: DOW[i], d, m };
}

const DAY_JOBS: Record<number, Job[]> = {
  0: [{ time: "10:00", title: "No-cool · Ortiz", tech: "Sam K." }],
  1: [{ time: "8:30", title: "Maintenance · Oak HOA", tech: "Luis R." }],
  2: [
    { time: "9:00", title: "Tune-up · Garcia", tech: "Sam K." },
    { time: "1:00", title: "Install · Lee", tech: "Luis R." },
    { time: "3:30", title: "A/C diagnostic · Maria G.", tech: "Luis R.", hot: true },
  ],
  3: [{ time: "11:00", title: "Estimate · Park Ave", tech: "Sam K." }],
  4: [{ time: "2:00", title: "Install · Reyes", tech: "Luis R." }],
};

const TEAM = [
  { name: "Luis R.", role: "Lead tech", status: "On a job", jobs: "3 today", dot: "bg-green" },
  { name: "Sam K.", role: "Tech", status: "Available", jobs: "2 today", dot: "bg-blue" },
  { name: "Dana P.", role: "Dispatch", status: "Online", jobs: "Routing", dot: "bg-green" },
  { name: "Mia T.", role: "Tech", status: "Off today", jobs: "0 today", dot: "bg-line" },
];

const TAG_POOL = ["Warranty", "Repeat customer", "Upsell: maintenance plan", "VIP"];
const EXTRA_LINES = [
  { label: "Labor (1 hr)", amt: 120 },
  { label: "Service call fee", amt: 49 },
  { label: "Refrigerant top-up", amt: 85 },
];
const MILESTONES = [
  { label: "Deposit (30%)", amt: 1200 },
  { label: "On completion (70%)", amt: 2800 },
];

export default function HeroAppMock() {
  const [active, setActive] = useState<ModId>("live");
  const [phase, setPhase] = useState<Phase>("transcribing");
  const [typed, setTyped] = useState(0);
  const [day, setDay] = useState(2);
  const [weekOffset, setWeekOffset] = useState(0);
  const [extra, setExtra] = useState<Record<string, Job[]>>({});
  const [billTab, setBillTab] = useState<"quote" | "invoice" | "milestones">("quote");
  const [quote, setQuote] = useState<"draft" | "sent" | "approved">("draft");
  const [invoice, setInvoice] = useState<"draft" | "sent" | "paid">("draft");
  const [mile, setMile] = useState<"draft" | "sent">("draft");
  const [lines, setLines] = useState([
    { label: "A/C diagnostic", amt: 89 },
    { label: "Capacitor replacement", amt: 100 },
  ]);
  const [editBill, setEditBill] = useState(false);
  const [tags, setTags] = useState<string[]>(["Existing customer", "HVAC", "Same-day"]);
  const [notes, setNotes] = useState<string[]>(["Prefers afternoon visits.", "Gate code 4417."]);
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>([
    { me: true, text: `Hi Maria, this is OneBy for Summit HVAC. Luis is booked for your A/C diagnostic today at 3:30.` },
    { me: false, text: "Perfect, thank you!" },
  ]);
  const [tasks, setTasks] = useState<Record<number, TaskState>>({ 1: "pending", 2: "pending", 3: "pending" });

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
          setDay(2);
          setWeekOffset(0);
          setExtra({});
          setBillTab("quote");
          setQuote("draft");
          setInvoice("draft");
          setMile("draft");
          setLines([
            { label: "A/C diagnostic", amt: 89 },
            { label: "Capacitor replacement", amt: 100 },
          ]);
          setEditBill(false);
          setTags(["Existing customer", "HVAC", "Same-day"]);
          setNotes(["Prefers afternoon visits.", "Gate code 4417."]);
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

  const addJob = (key: string, time: string) =>
    setExtra((e) => ({ ...e, [key]: [...(e[key] ?? []), { time, title: "New job", tech: "Unassigned" }] }));
  const addTag = () => {
    const avail = TAG_POOL.find((x) => !tags.includes(x));
    if (avail) setTags([...tags, avail]);
  };
  const addNote = (text: string) => setNotes([...notes, text]);

  const next = NEXT[active];

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-5xl">
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
          <div className="flex min-h-[460px] flex-col p-4 sm:p-6">
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
              {active === "live" && <LiveView phase={phase} typed={typed} tags={tags} />}
              {active === "tickets" && <TicketsView tags={tags} addTag={addTag} notes={notes} addNote={addNote} />}
              {active === "schedule" && (
                <ScheduleView day={day} setDay={setDay} weekOffset={weekOffset} setWeekOffset={setWeekOffset} extra={extra} addJob={addJob} />
              )}
              {active === "team" && <TeamView />}
              {active === "billing" && (
                <BillingView
                  tab={billTab}
                  setTab={setBillTab}
                  quote={quote}
                  setQuote={setQuote}
                  invoice={invoice}
                  setInvoice={setInvoice}
                  mile={mile}
                  setMile={setMile}
                  lines={lines}
                  setLines={setLines}
                  editBill={editBill}
                  setEditBill={setEditBill}
                />
              )}
              {active === "messages" && <MessagesView msgs={msgs} setMsgs={setMsgs} />}
              {active === "tasks" && <TasksView tasks={tasks} setTasks={setTasks} />}
              {active === "email" && <EmailView />}
            </div>

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

function TagRow({ tags, addTag }: { tags: string[]; addTag: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map((t) => (
        <span key={t} className="rounded-md border border-line bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-ink/70">
          {t}
        </span>
      ))}
      <button
        type="button"
        onClick={addTag}
        className="inline-flex items-center gap-0.5 rounded-md border border-dashed border-line px-2 py-0.5 text-[0.7rem] font-medium text-faint transition-colors hover:border-blue hover:text-blue"
      >
        <Tag size={11} /> Tag
      </button>
    </div>
  );
}

function LiveView({ phase, typed, tags }: { phase: Phase; typed: number; tags: string[] }) {
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
            <p className="truncate text-xs text-muted">Desk phone · answered in 2 rings · 4:12</p>
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

function TicketsView({ tags, addTag, notes, addNote }: { tags: string[]; addTag: () => void; notes: string[]; addNote: (t: string) => void }) {
  const [n, setN] = useState("");
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

        <div className="mt-3">
          <TagRow tags={tags} addTag={addTag} />
        </div>

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

        {/* notes */}
        <div className="mt-4 border-t border-line pt-3">
          <p className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">Notes</p>
          <div className="mt-2 space-y-1.5">
            {notes.map((note, i) => (
              <p key={i} className="rounded-md bg-canvas px-2.5 py-1.5 text-[0.78rem] text-ink">{note}</p>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              value={n}
              onChange={(e) => setN(e.target.value)}
              placeholder="Add a note for the tech"
              className="min-w-0 flex-1 rounded-lg border border-line bg-canvas px-2.5 py-1.5 text-[0.78rem] text-ink outline-none placeholder:text-faint focus:border-blue"
            />
            <button
              type="button"
              onClick={() => {
                if (n.trim()) {
                  addNote(n.trim());
                  setN("");
                }
              }}
              className="shrink-0 rounded-lg bg-blue px-2.5 py-1.5 text-[0.76rem] font-semibold text-white hover:opacity-90"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleView({
  day,
  setDay,
  weekOffset,
  setWeekOffset,
  extra,
  addJob,
}: {
  day: number;
  setDay: (d: number) => void;
  weekOffset: number;
  setWeekOffset: (n: number) => void;
  extra: Record<string, Job[]>;
  addJob: (key: string, time: string) => void;
}) {
  const [t, setT] = useState("");
  const key = `${weekOffset}:${day}`;
  const base = weekOffset === 0 ? DAY_JOBS[day] ?? [] : [];
  const jobs = [...base, ...(extra[key] ?? [])];
  const head = dateFor(weekOffset, 0);

  return (
    <div>
      <ModuleHeader title="Schedule" sub="Book the crew, today or weeks out" />
      <div className="rounded-xl border border-line bg-surface p-4">
        {/* week nav */}
        <div className="mb-3 flex items-center justify-between">
          <button type="button" onClick={() => setWeekOffset(weekOffset - 1)} className="grid h-7 w-7 place-items-center rounded-lg border border-line text-muted hover:border-blue hover:text-blue">
            <ChevronLeft size={15} />
          </button>
          <span className="text-[0.82rem] font-bold text-navy">{MONTHS[head.m]} 2026</span>
          <div className="flex items-center gap-1.5">
            {weekOffset !== 0 && (
              <button type="button" onClick={() => { setWeekOffset(0); setDay(2); }} className="rounded-md bg-canvas-2 px-2 py-1 text-[0.7rem] font-semibold text-navy">
                Today
              </button>
            )}
            <button type="button" onClick={() => setWeekOffset(weekOffset + 1)} className="grid h-7 w-7 place-items-center rounded-lg border border-line text-muted hover:border-blue hover:text-blue">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* days */}
        <div className="grid grid-cols-5 gap-1.5">
          {DOW.map((_, i) => {
            const dt = dateFor(weekOffset, i);
            const on = i === day;
            const today = weekOffset === 0 && i === 2;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setDay(i)}
                className={`rounded-lg border px-1 py-2 text-center transition-colors ${
                  on ? "border-blue/40 bg-blue/10 text-blue" : "border-line bg-canvas text-ink/70 hover:border-blue"
                }`}
              >
                <span className="block text-[0.65rem] font-semibold uppercase">{dt.dow}</span>
                <span className="block text-[0.95rem] font-bold">{dt.d}</span>
                {today && <span className="mx-auto mt-0.5 block h-1 w-1 rounded-full bg-green" />}
              </button>
            );
          })}
        </div>

        {/* agenda */}
        <div className="mt-4 space-y-2">
          {jobs.length === 0 && <p className="py-3 text-center text-[0.8rem] text-faint">Nothing booked. Add a time below.</p>}
          {jobs.map((j, i) => (
            <div
              key={`${j.time}-${i}`}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${j.hot ? "border-green/30 bg-green/[0.07]" : "border-line bg-canvas"}`}
            >
              <span className="w-12 shrink-0 text-[0.78rem] font-bold text-navy">{j.time}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.82rem] font-semibold text-navy">{j.title}</p>
                <p className="text-[0.72rem] text-muted">{j.tech}</p>
              </div>
              {j.hot && <CheckCircle2 size={16} className="shrink-0 text-green-600" />}
            </div>
          ))}
        </div>

        {/* custom time */}
        <div className="mt-3 flex gap-2">
          <input
            value={t}
            onChange={(e) => setT(e.target.value)}
            placeholder="Add a custom time, e.g. 4:45 PM"
            className="min-w-0 flex-1 rounded-lg border border-line bg-canvas px-2.5 py-1.5 text-[0.78rem] text-ink outline-none placeholder:text-faint focus:border-blue"
          />
          <button
            type="button"
            onClick={() => { if (t.trim()) { addJob(key, t.trim()); setT(""); } }}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-blue px-2.5 py-1.5 text-[0.76rem] font-semibold text-white hover:opacity-90"
          >
            <Plus size={13} /> Add
          </button>
        </div>

        <p className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] text-faint">
          <Calendar size={12} /> Synced two-way with Google and Microsoft calendars
        </p>
      </div>
    </div>
  );
}

function TeamView() {
  return (
    <div>
      <ModuleHeader title="Team" sub="3 techs · 7 jobs today" />
      <div className="space-y-2">
        {TEAM.map((t) => (
          <div key={t.name} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5">
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-[0.7rem] font-bold text-white">
              {t.name.split(" ").map((p) => p[0]).join("")}
              <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface ${t.dot}`} />
            </span>
            <div className="min-w-0">
              <p className="text-[0.85rem] font-semibold text-navy">{t.name}</p>
              <p className="text-[0.72rem] text-muted">{t.role}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-[0.74rem] font-semibold text-navy">{t.status}</p>
              <p className="text-[0.68rem] text-faint">{t.jobs}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingView({
  tab,
  setTab,
  quote,
  setQuote,
  invoice,
  setInvoice,
  mile,
  setMile,
  lines,
  setLines,
  editBill,
  setEditBill,
}: {
  tab: "quote" | "invoice" | "milestones";
  setTab: (t: "quote" | "invoice" | "milestones") => void;
  quote: "draft" | "sent" | "approved";
  setQuote: (s: "draft" | "sent" | "approved") => void;
  invoice: "draft" | "sent" | "paid";
  setInvoice: (s: "draft" | "sent" | "paid") => void;
  mile: "draft" | "sent";
  setMile: (s: "draft" | "sent") => void;
  lines: { label: string; amt: number }[];
  setLines: (l: { label: string; amt: number }[]) => void;
  editBill: boolean;
  setEditBill: (b: boolean) => void;
}) {
  const total = lines.reduce((n, l) => n + l.amt, 0);
  const addLine = () => setLines([...lines, EXTRA_LINES[lines.length % EXTRA_LINES.length]]);
  const removeLine = (i: number) => setLines(lines.filter((_, idx) => idx !== i));

  const TABS: { id: "quote" | "invoice" | "milestones"; label: string; icon: LucideIcon }[] = [
    { id: "quote", label: "Quote", icon: FileText },
    { id: "invoice", label: "Invoice", icon: Receipt },
    { id: "milestones", label: "Milestones", icon: Flag },
  ];

  const editable = (tab === "quote" && quote === "draft") || (tab === "invoice" && invoice === "draft");

  return (
    <div>
      <ModuleHeader title="Billing" sub={`Job #${JOB.ticket} · ${JOB.customer}`} />
      <div className="mb-3 inline-flex rounded-lg border border-line bg-canvas p-0.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[0.76rem] font-semibold transition-colors ${
              tab === t.id ? "bg-white text-navy shadow-sm" : "text-muted"
            }`}
          >
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-surface p-4">
        {(tab === "quote" || tab === "invoice") && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">Line items</span>
              {editable && (
                <button
                  type="button"
                  onClick={() => setEditBill(!editBill)}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.7rem] font-semibold ${editBill ? "bg-blue/10 text-blue" : "text-muted hover:text-blue"}`}
                >
                  <Pencil size={11} /> {editBill ? "Done" : "Edit"}
                </button>
              )}
            </div>

            <div className="mt-2 space-y-1.5">
              {lines.map((l, i) => (
                <div key={`${l.label}-${i}`} className="flex items-center justify-between text-[0.85rem]">
                  <span className="flex items-center gap-2 text-ink">
                    {editBill && (
                      <button type="button" onClick={() => removeLine(i)} className="grid h-4 w-4 place-items-center rounded-full bg-warning/15 text-warning">
                        <X size={11} />
                      </button>
                    )}
                    {l.label}
                  </span>
                  <span className="font-semibold text-navy">${l.amt}</span>
                </div>
              ))}
              {editBill && (
                <button type="button" onClick={addLine} className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue hover:underline">
                  <Plus size={12} /> Add line item
                </button>
              )}
              <div className="mt-2 flex items-center justify-between border-t border-line pt-2 text-[0.95rem]">
                <span className="font-bold text-navy">Total</span>
                <span className="font-extrabold text-navy">${total}</span>
              </div>
            </div>

            {tab === "quote" && quote === "draft" && <SendBtn label="Send quote for approval" onClick={() => setQuote("sent")} />}
            {tab === "quote" && quote === "sent" && (
              <div className="animate-rise mt-4">
                <Banner title="Quote sent" body={`Texted to ${JOB.customer}. She can approve with one tap.`} />
                <button type="button" onClick={() => setQuote("approved")} className="mt-2 w-full rounded-lg border border-green/30 bg-green/10 px-3 py-2 text-[0.82rem] font-semibold text-green-600">Mark approved</button>
              </div>
            )}
            {tab === "quote" && quote === "approved" && (
              <div className="animate-rise mt-4 flex items-center justify-center gap-2 rounded-lg border border-green/30 bg-green/[0.09] px-3 py-3 text-[0.85rem] font-bold text-green-600"><CheckCircle2 size={17} /> Approved, ready to invoice</div>
            )}

            {tab === "invoice" && invoice === "draft" && <SendBtn label="Send invoice + pay link" onClick={() => setInvoice("sent")} />}
            {tab === "invoice" && invoice === "sent" && (
              <div className="animate-rise mt-4">
                <Banner title="Invoice sent" body={`Pay link texted to ${JOB.customer}. Tap to pay by card.`} />
                <button type="button" onClick={() => setInvoice("paid")} className="mt-2 w-full rounded-lg border border-green/30 bg-green/10 px-3 py-2 text-[0.82rem] font-semibold text-green-600">Mark as paid</button>
              </div>
            )}
            {tab === "invoice" && invoice === "paid" && (
              <div className="animate-rise mt-4 flex items-center justify-center gap-2 rounded-lg border border-green/30 bg-green/[0.09] px-3 py-3 text-[0.9rem] font-bold text-green-600"><CheckCircle2 size={18} /> Paid ${total}</div>
            )}
          </>
        )}

        {tab === "milestones" && (
          <>
            <p className="mb-2 text-[0.78rem] text-muted">Full system install · $4,000</p>
            <div className="space-y-1.5">
              {MILESTONES.map((m) => (
                <div key={m.label} className="flex items-center justify-between rounded-lg bg-canvas px-3 py-2 text-[0.82rem]">
                  <span className="inline-flex items-center gap-1.5 text-ink"><Flag size={13} className="text-blue" /> {m.label}</span>
                  <span className="font-semibold text-navy">${m.amt.toLocaleString()}</span>
                </div>
              ))}
            </div>
            {mile === "draft" ? (
              <SendBtn label="Send milestone schedule" onClick={() => setMile("sent")} />
            ) : (
              <div className="animate-rise mt-4">
                <Banner title="Milestones sent" body={`Deposit link texted to ${JOB.customer}. The rest bills on completion.`} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SendBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue px-3 py-2.5 text-[0.85rem] font-semibold text-white transition-opacity hover:opacity-90"
    >
      <Send size={15} /> {label}
    </button>
  );
}

function Banner({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-blue/20 bg-blue/[0.05] px-3.5 py-3">
      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue" />
      <div>
        <p className="text-[0.85rem] font-semibold text-navy">{title}</p>
        <p className="text-[0.75rem] text-muted">{body}</p>
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
              <span className={`max-w-[80%] rounded-2xl px-3 py-2 text-[0.82rem] leading-snug ${m.me ? "bg-blue text-white" : "bg-canvas-2 text-ink"}`}>
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
