"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import {
  Ticket,
  CalendarDays,
  UserRound,
  Receipt,
  ListChecks,
  Check,
  Phone,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

// A/B variant centerpiece: the organization story, told as a user-driven
// tabbed showcase (a "slider" that respects the visitor, not an auto-rotating
// carousel they ignore). Deliberately AI-free: this beat is about everything
// living in one place, not about the AI answering.

type Tab = {
  id: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  body: string;
  Visual: () => ReactElement;
};

const TABS: Tab[] = [
  {
    id: "jobs",
    label: "Jobs",
    icon: Ticket,
    headline: "One board for every job",
    body: "See every job and exactly where it stands, from the first call to paid. Nothing lives in someone's head or a text thread.",
    Visual: JobsVisual,
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: CalendarDays,
    headline: "A schedule the whole crew shares",
    body: "Who is on what, today and next week, synced two-way with Google and Microsoft calendars. Drag a job to a tech and a time.",
    Visual: ScheduleVisual,
  },
  {
    id: "customers",
    label: "Customers",
    icon: UserRound,
    headline: "Every customer's whole history",
    body: "Pull up anyone and see every call, job, invoice, and text in one timeline. No more digging through four apps to remember who they are.",
    Visual: CustomersVisual,
  },
  {
    id: "money",
    label: "Money",
    icon: Receipt,
    headline: "Money you can actually see",
    body: "Know what's owed, what's paid, and what to chase, at a glance. Text a pay link and watch it clear.",
    Visual: MoneyVisual,
  },
  {
    id: "tasks",
    label: "Follow-ups",
    icon: ListChecks,
    headline: "Nothing slips",
    body: "The next step is always captured and assigned, so follow-ups just happen instead of getting forgotten by Friday.",
    Visual: TasksVisual,
  },
];

export default function OrganizedShowcase() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const t = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % TABS.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const cur = TABS[active];
  const Visual = cur.Visual;

  return (
    <section className="relative overflow-hidden border-y border-line bg-canvas/50 py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Everything in one place</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Get the whole shop organized.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Jobs, schedule, customers, and money in one system, so the work
            stops slipping through the cracks and everyone knows what&apos;s
            next. Click through it.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <div
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
            onFocusCapture={() => (paused.current = true)}
            onBlurCapture={() => (paused.current = false)}
          >
            {/* tabs */}
            <div
              role="tablist"
              aria-label="What OneBy keeps organized"
              className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2"
            >
              {TABS.map((t, i) => {
                const on = i === active;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={on}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.85rem] font-semibold transition-colors ${
                      on
                        ? "border-blue bg-blue text-white"
                        : "border-line bg-surface text-ink/70 hover:border-blue/50 hover:text-blue"
                    }`}
                  >
                    <t.icon size={15} /> {t.label}
                  </button>
                );
              })}
            </div>

            {/* panel */}
            <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="min-w-0 lg:pl-6">
                <h3 className="text-2xl font-bold tracking-tight text-navy">
                  {cur.headline}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {cur.body}
                </p>
                <a
                  href="#waitlist"
                  className="mt-6 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-blue hover:underline"
                >
                  See it in the live demo below
                </a>
              </div>

              <div key={cur.id} className="animate-rise min-w-0">
                <div className="surface-card rounded-2xl p-3 shadow-[var(--shadow-lg)]">
                  <Visual />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- lightweight static visuals (their own look, echoing the demo) ---- */

const STATUS_TONE: Record<string, string> = {
  New: "bg-warning/15 text-warning",
  Scheduled: "bg-blue/10 text-blue",
  "In progress": "bg-blue/10 text-blue",
  Invoiced: "bg-green/10 text-green-600",
};

function JobsVisual() {
  const cols: { name: string; jobs: string[] }[] = [
    { name: "New", jobs: ["A/C not cooling · Maria G.", "Water heater · James R."] },
    { name: "Scheduled", jobs: ["Maintenance · Oak HOA"] },
    { name: "In progress", jobs: ["Thermostat · Dana P."] },
    { name: "Invoiced", jobs: ["Install · Reyes"] },
  ];
  return (
    <div className="rounded-xl bg-canvas p-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cols.map((c) => (
          <div key={c.name}>
            <div className="mb-1.5 flex items-center gap-1">
              <span className={`rounded px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide ${STATUS_TONE[c.name]}`}>
                {c.name}
              </span>
              <span className="text-[0.62rem] font-bold text-faint">{c.jobs.length}</span>
            </div>
            <div className="space-y-1.5">
              {c.jobs.map((j) => (
                <div key={j} className="rounded-lg border border-line bg-surface px-2 py-1.5 text-[0.68rem] font-medium leading-tight text-navy">
                  {j}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleVisual() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const jobs: Record<number, { time: string; title: string; tone: string }[]> = {
    0: [{ time: "10a", title: "Ortiz", tone: "bg-green/15 text-green-600" }],
    2: [
      { time: "9a", title: "Garcia", tone: "bg-blue/10 text-blue" },
      { time: "1p", title: "Lee", tone: "bg-blue/10 text-blue" },
      { time: "3p", title: "Maria G.", tone: "bg-green/15 text-green-600" },
    ],
    3: [{ time: "11a", title: "Park Ave", tone: "bg-blue/10 text-blue" }],
    4: [{ time: "2p", title: "Reyes", tone: "bg-blue/10 text-blue" }],
  };
  return (
    <div className="rounded-xl bg-canvas p-3">
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d, i) => (
          <div key={d}>
            <div className={`mb-1.5 rounded-md py-1 text-center text-[0.62rem] font-bold uppercase ${i === 2 ? "bg-blue text-white" : "text-faint"}`}>
              {d}
            </div>
            <div className="space-y-1">
              {(jobs[i] ?? []).map((j, k) => (
                <div key={k} className={`rounded-md px-1 py-1 text-center text-[0.6rem] font-semibold leading-tight ${j.tone}`}>
                  <span className="block">{j.time}</span>
                  <span className="block truncate">{j.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomersVisual() {
  const rows: { icon: LucideIcon; label: string; meta: string; tone: string }[] = [
    { icon: Phone, label: "Call · 4:12", meta: "A/C not cooling, wants same-day", tone: "bg-green/10 text-green-600" },
    { icon: Ticket, label: "Job #1042", meta: "Scheduled today, 3:30 with Luis", tone: "bg-blue/10 text-blue" },
    { icon: MessageSquare, label: "Text sent", meta: "Arrival window confirmed", tone: "bg-blue/10 text-blue" },
    { icon: Receipt, label: "Invoice · $189", meta: "Paid by card in June", tone: "bg-green/10 text-green-600" },
  ];
  return (
    <div className="rounded-xl bg-canvas p-3">
      <div className="mb-2.5 flex items-center gap-2.5 px-1">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-[0.72rem] font-bold text-white">MG</span>
        <div>
          <p className="text-[0.82rem] font-bold text-navy">Maria G.</p>
          <p className="text-[0.66rem] text-muted">Customer since 2023 · Phoenix AZ</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5">
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${r.tone}`}><r.icon size={12} /></span>
            <div className="min-w-0">
              <p className="text-[0.72rem] font-semibold text-navy">{r.label}</p>
              <p className="truncate text-[0.66rem] text-muted">{r.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MoneyVisual() {
  const rows: { name: string; amt: string; state: "Paid" | "Sent" | "Overdue" }[] = [
    { name: "Reyes · Install", amt: "$4,000", state: "Paid" },
    { name: "Maria G. · Diagnostic", amt: "$189", state: "Sent" },
    { name: "Sun City Diner", amt: "$1,280", state: "Overdue" },
  ];
  const tone = { Paid: "bg-green/10 text-green-600", Sent: "bg-blue/10 text-blue", Overdue: "bg-warning/15 text-warning" };
  return (
    <div className="rounded-xl bg-canvas p-3">
      <div className="mb-2.5 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-green/20 bg-green/[0.06] px-3 py-2">
          <p className="text-lg font-extrabold text-navy">$9,120</p>
          <p className="text-[0.64rem] font-medium text-faint">Collected this week</p>
        </div>
        <div className="rounded-lg border border-warning/25 bg-warning/[0.06] px-3 py-2">
          <p className="text-lg font-extrabold text-navy">$1,469</p>
          <p className="text-[0.64rem] font-medium text-faint">Outstanding</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5">
            <span className="min-w-0 truncate text-[0.72rem] font-medium text-navy">{r.name}</span>
            <span className="flex shrink-0 items-center gap-2">
              <span className="text-[0.74rem] font-bold text-navy">{r.amt}</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[0.58rem] font-bold uppercase ${tone[r.state]}`}>{r.state}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TasksVisual() {
  const rows: { label: string; who: string; done: boolean }[] = [
    { label: "Text Maria her arrival window", who: "Luis R.", done: true },
    { label: "Order capacitor for tomorrow", who: "Sam K.", done: true },
    { label: "Follow up on Reyes payment", who: "Dana P.", done: false },
    { label: "Send Oak HOA the COI", who: "Dana P.", done: false },
  ];
  return (
    <div className="rounded-xl bg-canvas p-3">
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg border border-line bg-surface px-2.5 py-2">
            <span className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${r.done ? "border-green bg-green text-white" : "border-line"}`}>
              {r.done && <Check size={11} />}
            </span>
            <span className={`min-w-0 flex-1 truncate text-[0.74rem] ${r.done ? "text-faint line-through" : "font-medium text-navy"}`}>
              {r.label}
            </span>
            <span className="shrink-0 rounded-full bg-canvas-2 px-1.5 py-0.5 text-[0.62rem] font-semibold text-muted">{r.who}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
