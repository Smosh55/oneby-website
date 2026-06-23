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
  Package,
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
  Search,
  Bell,
  Plus,
  Pencil,
  Tag,
  MousePointerClick,
  LayoutDashboard,
  UserRound,
  Voicemail,
  Play,
  Pause,
  DollarSign,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const JOB = { customer: "Maria G.", issue: "Upstairs A/C not cooling", ticket: "1042" };

const SUMMARY =
  "Existing customer, upstairs A/C not cooling since last night. Home after 3pm, wants a same-day visit.";

type ModId = "home" | "live" | "tickets" | "schedule" | "customers" | "team" | "catalog" | "billing" | "messages" | "tasks" | "email";

const MODULES: { id: ModId; label: string; icon: LucideIcon; badge?: string; soon?: boolean }[] = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "live", label: "Live", icon: Activity },
  { id: "tickets", label: "Tickets", icon: Ticket, badge: "1" },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "customers", label: "Customers", icon: UserRound },
  { id: "team", label: "Team", icon: Users },
  { id: "catalog", label: "Catalog", icon: Package },
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
type Job = { time: string; title: string; tech: string; hot?: boolean; duration?: string };
type Line = { label: string; qty: number; price: number };
type Item = { id: number; name: string; type: "Service" | "Part"; price: number; tasks?: string[] };

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MLEN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function dateFor(offset: number, i: number) {
  let m = 5;
  let d = 9 + offset * 7 + i;
  while (d > MLEN[m]) { d -= MLEN[m]; m = (m + 1) % 12; }
  while (d < 1) { m = (m + 11) % 12; d += MLEN[m]; }
  return { dow: DOW[i], d, m };
}

const DAY_JOBS: Record<number, Job[]> = {
  0: [{ time: "10:00", title: "No-cool · Ortiz", tech: "Sam K.", duration: "1h" }],
  1: [{ time: "8:30", title: "Maintenance · Oak HOA", tech: "Luis R.", duration: "2h" }],
  2: [
    { time: "9:00", title: "Tune-up · Garcia", tech: "Sam K.", duration: "1h" },
    { time: "1:00", title: "Install · Lee", tech: "Luis R.", duration: "Half day" },
    { time: "3:30", title: "A/C diagnostic · Maria G.", tech: "Luis R.", hot: true, duration: "1h" },
  ],
  3: [{ time: "11:00", title: "Estimate · Park Ave", tech: "Sam K.", duration: "30m" }],
  4: [{ time: "2:00", title: "Install · Reyes", tech: "Luis R.", duration: "Half day" }],
};

const TEAM = [
  { name: "Luis R.", role: "Lead tech", status: "On a job", jobs: "3 today", dot: "bg-green" },
  { name: "Sam K.", role: "Tech", status: "Available", jobs: "2 today", dot: "bg-blue" },
  { name: "Dana P.", role: "Dispatch", status: "Online", jobs: "Routing", dot: "bg-green" },
  { name: "Mia T.", role: "Tech", status: "Off today", jobs: "0 today", dot: "bg-line" },
];

const TAG_POOL = ["Warranty", "Repeat customer", "Upsell: maintenance plan", "VIP"];
const MILESTONES = [
  { label: "Deposit (30%)", amt: 1200 },
  { label: "On completion (70%)", amt: 2800 },
];
const CATALOG_SEED: Item[] = [
  { id: 1, name: "A/C diagnostic", type: "Service", price: 89, tasks: ["Inspect unit and airflow", "Test capacitor and contactor", "Check refrigerant levels", "Review findings with customer"] },
  { id: 2, name: "System tune-up", type: "Service", price: 129, tasks: ["Replace air filter", "Clean coils", "Test thermostat", "Log readings"] },
  { id: 3, name: "Labor (per hour)", type: "Service", price: 120 },
  { id: 4, name: "Full system install", type: "Service", price: 4000, tasks: ["Confirm load calc and permit", "Remove old equipment", "Install and braze new unit", "Charge system and verify", "Walk through with customer"] },
  { id: 5, name: "Capacitor", type: "Part", price: 100 },
  { id: 6, name: "Contactor", type: "Part", price: 65 },
  { id: 7, name: "Refrigerant (per lb)", type: "Part", price: 85 },
  { id: 8, name: "Air filter", type: "Part", price: 25 },
];

type ToastFn = (msg: string) => void;
const toastListeners = new Set<ToastFn>();
function toast(msg: string) {
  toastListeners.forEach((f) => f(msg));
}

function ToastHost() {
  const [items, setItems] = useState<{ id: number; msg: string }[]>([]);
  useEffect(() => {
    const fn: ToastFn = (msg) => {
      const id = Date.now() + Math.random();
      setItems((xs) => [...xs, { id, msg }]);
      setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 2600);
    };
    toastListeners.add(fn);
    return () => {
      toastListeners.delete(fn);
    };
  }, []);
  if (items.length === 0) return null;
  return (
    <div className="pointer-events-none absolute bottom-3 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-1.5">
      {items.map((t) => (
        <div key={t.id} className="animate-rise pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-navy px-3 py-2 text-[0.78rem] font-semibold text-white shadow-[0_20px_45px_-15px_rgba(4,3,79,0.6)]">
          <CheckCircle2 size={14} className="text-green" /> {t.msg}
        </div>
      ))}
    </div>
  );
}

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
  const [lines, setLines] = useState<Line[]>([
    { label: "A/C diagnostic", qty: 1, price: 89 },
    { label: "Capacitor replacement", qty: 1, price: 100 },
  ]);
  const [editBill, setEditBill] = useState(false);
  const [catalog, setCatalog] = useState<Item[]>(CATALOG_SEED);
  const [assignedTech, setAssignedTech] = useState("Luis R.");
  const [tags, setTags] = useState<string[]>(["Existing customer", "HVAC", "Same-day"]);
  const [notes, setNotes] = useState<string[]>(["Prefers afternoon visits.", "Gate code 4417."]);
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>([
    { me: true, text: `Hi Maria, this is OneBy for Summit HVAC. Luis is booked for your A/C diagnostic today at 3:30.` },
    { me: false, text: "Perfect, thank you!" },
  ]);
  const [tasks, setTasks] = useState<Record<number, TaskState>>({ 1: "pending", 2: "pending", 3: "pending" });
  const [ticketSel, setTicketSel] = useState<string | null>(null);
  const [custSel, setCustSel] = useState<number | null>(null);
  const openCustomer = (name: string) => { const c = CUSTOMERS.find((x) => x.name === name); setCustSel(c ? c.id : null); setActive("customers"); };
  const openTicket = (id: string | null) => { setTicketSel(id); setActive("tickets"); };

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
          setTicketSel(null);
          setCustSel(null);
          setBillTab("quote");
          setQuote("draft");
          setInvoice("draft");
          setMile("draft");
          setLines([
            { label: "A/C diagnostic", qty: 1, price: 89 },
            { label: "Capacitor replacement", qty: 1, price: 100 },
          ]);
          setEditBill(false);
          setCatalog(CATALOG_SEED);
          setAssignedTech("Luis R.");
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

  const addJob = (key: string, job: Job) =>
    setExtra((e) => ({ ...e, [key]: [...(e[key] ?? []), job] }));
  const addTag = () => {
    const avail = TAG_POOL.find((x) => !tags.includes(x));
    if (avail) setTags([...tags, avail]);
  };
  const addNote = (text: string) => setNotes([...notes, text]);

  const next = NEXT[active];

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-5xl">
      {/* interactive cue */}
      <div className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-blue px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-[var(--shadow-lg)]">
          <MousePointerClick size={13} className="animate-bounce" /> Live demo, edit anything
        </span>
      </div>

      <div className="relative overflow-hidden rounded-[20px] border border-line bg-surface shadow-[0_40px_90px_-30px_rgba(4,3,79,0.35)]">
        <ToastHost />
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
          <div className="ml-auto flex items-center gap-2">
            <TopBarActions />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green/10 px-2.5 py-1 text-[11px] font-semibold text-green-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              Live
            </span>
          </div>
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
                      <span className="ml-auto rounded-full bg-blue px-1.5 py-0.5 text-[10px] font-bold text-white">{m.badge}</span>
                    )}
                    {m.soon && (
                      <span className="ml-auto rounded-full bg-canvas-2 px-1.5 py-0.5 text-[9px] font-bold uppercase text-faint">Soon</span>
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
              {active === "home" && <HomeView setActive={setActive} openTicket={openTicket} />}
              {active === "customers" && <CustomersView sel={custSel} setSel={setCustSel} />}
              {active === "live" && <LiveView phase={phase} typed={typed} tags={tags} />}
              {active === "tickets" && (
                <TicketsView tags={tags} addTag={addTag} notes={notes} addNote={addNote} assignedTech={assignedTech} setAssignedTech={setAssignedTech} sel={ticketSel} setSel={setTicketSel} openCustomer={openCustomer} catalog={catalog} />
              )}
              {active === "schedule" && (
                <ScheduleView day={day} setDay={setDay} weekOffset={weekOffset} setWeekOffset={setWeekOffset} extra={extra} addJob={addJob} openTicket={openTicket} />
              )}
              {active === "team" && <TeamView assignedTech={assignedTech} />}
              {active === "catalog" && <CatalogView catalog={catalog} setCatalog={setCatalog} />}
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
                  catalog={catalog}
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

const inputCls = "min-w-0 rounded-lg border border-line bg-canvas px-2.5 py-1.5 text-[0.8rem] text-ink outline-none placeholder:text-faint focus:border-blue";

function LiveView({ phase, typed, tags }: { phase: Phase; typed: number; tags: string[] }) {
  const done = phase === "done";
  const processing = phase === "transcribing" || phase === "summarizing";
  return (
    <div>
      <ModuleHeader title="Live activity" sub="One call active, one just wrapped" />

      <ActiveCallCard />

      <div className="rounded-xl border border-line bg-canvas px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green/10 text-green-600"><PhoneCall size={18} /></span>
          <div className="min-w-0">
            <p className="text-[0.95rem] font-semibold text-navy">Call with {JOB.customer}</p>
            <p className="truncate text-xs text-muted">Answered by Dana · desk phone · 4:12</p>
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
              <span key={t} className="rounded-md border border-line bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-ink/70">{t}</span>
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
            <span className="text-[0.85rem] font-medium text-muted">{phase === "transcribing" ? "Transcribing the call" : "Writing the summary"}</span>
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

      {/* recent calls / phone log */}
      <div className="mt-5">
        <p className="px-1 pb-2 text-[11px] font-bold uppercase tracking-wide text-faint">Earlier today</p>
        <div className="space-y-2">
          <VoicemailRow />
          <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-3.5 py-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green/10 text-green-600"><PhoneCall size={16} /></span>
            <div className="min-w-0">
              <p className="text-[0.84rem] font-semibold text-navy">Missed call, caught by AI</p>
              <p className="truncate text-[0.72rem] text-muted">New lead · roof leak · details captured</p>
            </div>
            <span className="ml-auto shrink-0 rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-semibold text-green-600">AI answered</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBarActions() {
  const [notif, setNotif] = useState(false);
  const items = [
    { icon: PhoneCall, tone: "text-green-600 bg-green/10", title: "Missed call caught by AI", time: "2m" },
    { icon: Receipt, tone: "text-blue bg-blue/10", title: "James R. paid invoice, $240", time: "18m" },
    { icon: Clock, tone: "text-warning bg-warning/15", title: "Luis is running 10 min late", time: "33m" },
  ];
  return (
    <div className="flex items-center gap-2">
      <div className="relative hidden w-36 md:block">
        <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-faint" />
        <input placeholder="Search" aria-label="Search" className="w-full rounded-md border border-line bg-surface py-1 pl-7 pr-2 text-[0.72rem] text-ink outline-none placeholder:text-faint focus:border-blue" />
      </div>
      <div className="relative">
        <button type="button" aria-label="Notifications" onClick={() => setNotif(!notif)} className="relative grid h-6 w-6 place-items-center rounded-md text-muted transition-colors hover:bg-canvas-2 hover:text-navy">
          <Bell size={15} />
          <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-warning" />
        </button>
        {notif && (
          <div className="absolute right-0 top-8 z-30 w-60 rounded-xl border border-line bg-surface p-1.5 shadow-[var(--shadow-lg)]">
            <p className="px-2 py-1 text-[0.64rem] font-bold uppercase tracking-wide text-faint">Notifications</p>
            {items.map((it, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-canvas-2">
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${it.tone}`}><it.icon size={12} /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.74rem] font-medium text-navy">{it.title}</p>
                  <p className="text-[0.64rem] text-faint">{it.time} ago</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-[0.58rem] font-bold text-white">SM</span>
    </div>
  );
}

function ActiveCallCard() {
  return (
    <div className="mb-3 overflow-hidden rounded-xl border border-green/30 bg-green/[0.05]">
      <div className="flex items-center gap-2 border-b border-green/20 bg-green/10 px-4 py-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
        </span>
        <span className="text-[0.7rem] font-bold uppercase tracking-wide text-green-600">Call in progress · AI answering</span>
        <span className="ml-auto flex items-end gap-0.5">
          {[3, 7, 4, 8, 5].map((h, i) => (
            <span key={i} className="w-0.5 animate-pulse rounded-full bg-green" style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }} />
          ))}
        </span>
        <span className="text-[0.7rem] font-semibold text-green-600">0:14</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green/10 text-green-600"><PhoneCall size={18} /></span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.85rem] font-semibold text-navy">Incoming · James R. · (602) 555-0192</p>
          <p className="text-[0.74rem] text-muted">The AI is handling it. The summary, transcript, and ticket land the moment the call wraps.</p>
        </div>
      </div>
    </div>
  );
}

function VoicemailRow() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="rounded-xl border border-line bg-canvas px-3.5 py-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue text-white transition-opacity hover:opacity-90"
        >
          {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Voicemail size={13} className="text-blue" />
            <p className="text-[0.84rem] font-semibold text-navy">Voicemail · Dana P.</p>
            <span className="ml-auto text-[0.72rem] text-faint">0:42</span>
          </div>
          {/* progress bar */}
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line">
            <div className={`h-full rounded-full bg-blue ${playing ? "animate-pulse" : ""}`} style={{ width: playing ? "100%" : "0%", transition: playing ? "width 42s linear" : "none" }} />
          </div>
        </div>
      </div>
      <p className="mt-2.5 rounded-lg bg-surface px-3 py-2 text-[0.78rem] leading-relaxed text-ink">
        <span className="font-semibold text-blue">Transcript: </span>
        Hi, it&apos;s Dana, my A/C is making a grinding noise and not blowing cold. Can someone come take a look this week? Thanks.
      </p>
    </div>
  );
}

const TICKETS = [
  { id: "1042", issue: "Upstairs A/C not cooling", customer: "Maria G.", status: "Scheduled", urgent: true, summary: "Existing customer, no cooling upstairs since this morning. Wants the earliest slot. Filter was clogged last visit, likely a capacitor or airflow issue." },
  { id: "1041", issue: "Water heater leaking", customer: "James R.", status: "New", urgent: true, summary: "New caller, water heater leaking onto the garage floor. Not actively flooding. Wants someone out today, flexible on the time." },
  { id: "1039", issue: "Annual maintenance, 12 units", customer: "Oak Street HOA", status: "Scheduled", urgent: false, summary: "Recurring maintenance contract. Twelve rooftop units, needs a half-day block and a COI on file before the crew arrives." },
  { id: "1038", issue: "Thermostat replacement", customer: "Dana P.", status: "In progress", urgent: false, summary: "Smart thermostat install. Customer supplied the unit, just needs labor. Tech is on site now." },
  { id: "1035", issue: "Full system install", customer: "Reyes Family", status: "Invoiced", urgent: false, summary: "New three-ton system installed Tuesday. Job complete, invoice sent, awaiting payment." },
  { id: "1031", issue: "Walk-in cooler service", customer: "Sun City Diner", status: "Done", urgent: false, summary: "Walk-in cooler not holding temp. Replaced the fan motor, verified temps, signed off." },
];
const TICKET_STATUSES = ["New", "Scheduled", "In progress", "Invoiced", "Done"];

function TicketsView({
  tags,
  addTag,
  notes,
  addNote,
  assignedTech,
  setAssignedTech,
  sel,
  setSel,
  openCustomer,
  catalog,
}: {
  tags: string[];
  addTag: () => void;
  notes: string[];
  addNote: (t: string) => void;
  assignedTech: string;
  setAssignedTech: (t: string) => void;
  sel: string | null;
  setSel: (s: string | null) => void;
  openCustomer: (name: string) => void;
  catalog: Item[];
}) {
  const [n, setN] = useState("");
  const [picking, setPicking] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const FLOWS: Record<string, string[]> = {
    "Standard repair": ["New", "Scheduled", "In progress", "Invoiced", "Paid"],
    "New install": ["New", "Quoted", "Approved", "Scheduled", "Installed", "Paid"],
    "Warranty claim": ["New", "Verified", "Scheduled", "Resolved"],
    "Maintenance plan": ["Due", "Scheduled", "Serviced", "Logged"],
  };
  const [flow, setFlow] = useState("Standard repair");
  const [stage, setStage] = useState(1);
  const [nt, setNt] = useState("");
  const [svcPick, setSvcPick] = useState(false);
  const [subtasks, setSubtasks] = useState<{ id: number; label: string; assignee: string; done: boolean }[]>([
    { id: 1, label: "Confirm arrival window", assignee: "Luis R.", done: true },
    { id: 2, label: "Bring a spare capacitor", assignee: "Luis R.", done: false },
    { id: 3, label: "Collect payment on site", assignee: "Dana P.", done: false },
  ]);
  const applyService = (it: Item) => {
    const steps = it.tasks ?? [];
    setSubtasks((xs) => [...xs, ...steps.map((label, k) => ({ id: Date.now() + k, label, assignee: assignedTech, done: false }))]);
    setSvcPick(false);
    toast(`${steps.length} tasks from ${it.name}, assigned to ${assignedTech}`);
  };
  const stages = FLOWS[flow];
  const STAGE_ACTION: Record<string, string> = {
    New: "Schedule the job",
    Due: "Schedule the visit",
    Quoted: "Send quote for approval",
    Approved: "Schedule the install",
    Verified: "Schedule the repair",
    Scheduled: "Start the job",
    "In progress": "Create the invoice",
    Installed: "Create the invoice",
    Serviced: "Log the visit",
    Resolved: "Close the ticket",
    Invoiced: "Collect payment",
    Paid: "Close the ticket",
    Logged: "Close the ticket",
  };
  const [flash, setFlash] = useState<string | null>(null);
  const action = STAGE_ACTION[stages[stage]] ?? "Advance";
  const atEnd = stage >= stages.length - 1;
  const tk = TICKETS.find((t) => t.id === sel);

  if (!tk) {
    return (
      <div>
        <ModuleHeader title="Tickets" sub={`${TICKETS.length} open jobs`} />
        <div className="space-y-4">
          {TICKET_STATUSES.map((s) => {
            const inCol = TICKETS.filter((t) => t.status === s);
            if (inCol.length === 0) return null;
            return (
              <div key={s}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">{s}</span>
                  <span className="rounded-full bg-canvas-2 px-1.5 text-[0.66rem] font-bold text-muted">{inCol.length}</span>
                </div>
                <div className="space-y-2">
                  {inCol.map((t) => (
                    <button key={t.id} type="button" onClick={() => setSel(t.id)} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
                      {t.urgent && <span className="h-2 w-2 shrink-0 rounded-full bg-warning" />}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.84rem] font-semibold text-navy">{t.issue}</p>
                        <p className="truncate text-[0.72rem] text-muted">#{t.id} · {t.customer}</p>
                      </div>
                      <ChevronRight size={16} className="shrink-0 text-faint" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <ModuleHeader title="Tickets" sub={`Ticket #${tk.id}`} />
      <button type="button" onClick={() => setSel(null)} className="mb-3 inline-flex items-center gap-1 text-[0.76rem] font-semibold text-muted transition-colors hover:text-navy"><ChevronLeft size={14} /> Board</button>
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-faint">#{tk.id}</span>
          {tk.urgent && <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase text-warning">Urgent</span>}
        </div>
        <p className="mt-2 text-[0.95rem] font-semibold text-navy">{tk.issue}</p>
        <p className="mt-1 text-sm text-muted"><button type="button" onClick={() => openCustomer(tk.customer)} className="font-semibold text-blue hover:underline">{tk.customer}</button> · existing customer</p>

        <div className="mt-3"><TagRow tags={tags} addTag={addTag} /></div>

        <div className="mt-3 rounded-lg border border-blue/15 bg-blue/[0.04] px-3 py-2 text-[0.82rem] leading-relaxed text-ink">{tk.summary}</div>

        {/* status + assignment */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.78rem]">
          <span className="inline-flex items-center gap-1 rounded-md bg-canvas-2 px-2 py-1 font-semibold text-navy"><Clock size={13} /> Status: {stages[stage]}</span>
          <button
            type="button"
            onClick={() => { setPicking(!picking); setPending(null); }}
            className="inline-flex items-center gap-1 rounded-md bg-canvas-2 px-2 py-1 font-semibold text-navy hover:ring-1 hover:ring-blue/40"
          >
            Assigned: {assignedTech} <Pencil size={11} className="text-faint" />
          </button>
        </div>

        {picking && !pending && (
          <div className="animate-rise mt-2 rounded-lg border border-line bg-canvas p-2">
            <p className="px-1 pb-1 text-[0.68rem] font-bold uppercase text-faint">Reassign to</p>
            {TEAM.filter((t) => t.role !== "Dispatch").map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setPending(t.name)}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[0.8rem] text-ink hover:bg-canvas-2"
              >
                {t.name}
                <span className="text-[0.68rem] text-faint">{t.status}</span>
              </button>
            ))}
          </div>
        )}

        {pending && (
          <div className="animate-rise mt-2 flex items-center justify-between rounded-lg border border-blue/25 bg-blue/[0.05] px-3 py-2">
            <span className="text-[0.8rem] font-medium text-navy">Assign this job to {pending}?</span>
            <span className="flex gap-1.5">
              <button type="button" onClick={() => { setPending(null); }} className="rounded-md border border-line bg-surface px-2 py-1 text-[0.72rem] font-semibold text-muted">Cancel</button>
              <button type="button" onClick={() => { setAssignedTech(pending); toast(`Assigned to ${pending}`); setPending(null); setPicking(false); }} className="rounded-md bg-blue px-2 py-1 text-[0.72rem] font-semibold text-white">Confirm</button>
            </span>
          </div>
        )}

        {/* workflow */}
        <div className="mt-4 border-t border-line pt-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">Workflow</p>
            <select value={flow} onChange={(e) => { setFlow(e.target.value); setStage(1); }} aria-label="Workflow" className={`${inputCls} py-1`}>
              {Object.keys(FLOWS).map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1">
            {stages.map((s, i) => (
              <button key={s} type="button" onClick={() => setStage(i)} className={`rounded-full px-2 py-0.5 text-[0.68rem] font-semibold transition-colors ${i < stage ? "bg-green/15 text-green-600" : i === stage ? "bg-blue text-white" : "bg-canvas-2 text-faint"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* tasks with assignees */}
        <div className="mt-4 border-t border-line pt-3">
          <p className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">Tasks</p>
          <div className="mt-2 space-y-1.5">
            {subtasks.map((st) => (
              <div key={st.id} className="flex items-center gap-2">
                <button type="button" aria-label="Toggle done" onClick={() => setSubtasks(subtasks.map((x) => (x.id === st.id ? { ...x, done: !x.done } : x)))} className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${st.done ? "border-green bg-green text-white" : "border-line"}`}>
                  {st.done && <Check size={11} />}
                </button>
                <span className={`min-w-0 flex-1 truncate text-[0.8rem] ${st.done ? "text-faint line-through" : "text-ink"}`}>{st.label}</span>
                <select value={st.assignee} onChange={(e) => setSubtasks(subtasks.map((x) => (x.id === st.id ? { ...x, assignee: e.target.value } : x)))} aria-label="Assignee" className={`${inputCls} shrink-0 py-1`}>
                  {TEAM.map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input value={nt} onChange={(e) => setNt(e.target.value)} placeholder="Add a task" className={`${inputCls} min-w-0 flex-1`} />
            <button type="button" onClick={() => { if (nt.trim()) { setSubtasks([...subtasks, { id: Date.now(), label: nt.trim(), assignee: TEAM[0].name, done: false }]); setNt(""); toast("Task added"); } }} className="shrink-0 rounded-lg bg-blue px-2.5 py-1.5 text-[0.76rem] font-semibold text-white hover:opacity-90">Add</button>
          </div>
          <div className="mt-2">
            <button type="button" onClick={() => setSvcPick(!svcPick)} className="inline-flex items-center gap-1 text-[0.76rem] font-semibold text-blue hover:underline"><Package size={12} /> Apply a service checklist</button>
            {svcPick && (
              <div className="animate-rise mt-1.5 rounded-lg border border-line bg-canvas p-1.5">
                {catalog.filter((c) => c.type === "Service" && (c.tasks?.length ?? 0) > 0).map((c) => (
                  <button key={c.id} type="button" onClick={() => applyService(c)} className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[0.8rem] text-ink hover:bg-canvas-2">
                    <span className="truncate">{c.name}</span>
                    <span className="ml-2 shrink-0 text-[0.7rem] font-semibold text-faint">{c.tasks!.length} steps</span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
            <input value={n} onChange={(e) => setN(e.target.value)} placeholder="Add a note for the tech" className={`${inputCls} flex-1`} />
            <button type="button" onClick={() => { if (n.trim()) { addNote(n.trim()); setN(""); } }} className="shrink-0 rounded-lg bg-blue px-2.5 py-1.5 text-[0.76rem] font-semibold text-white hover:opacity-90">Add</button>
          </div>
        </div>

        {/* contextual action, driven by the workflow stage */}
        <div className="mt-4 border-t border-line pt-3">
          {flash && (
            <p className="animate-rise mb-2 inline-flex items-center gap-1.5 rounded-md bg-green/10 px-2.5 py-1 text-[0.74rem] font-semibold text-green-600"><CheckCircle2 size={13} /> {flash}</p>
          )}
          <button
            type="button"
            disabled={atEnd}
            onClick={() => { if (!atEnd) { const next = stages[stage + 1]; setStage(stage + 1); setFlash(`Moved to ${next}`); } }}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[0.82rem] font-semibold transition-colors ${atEnd ? "cursor-default bg-canvas-2 text-faint" : "bg-navy text-white hover:opacity-90"}`}
          >
            {atEnd ? "Ticket complete" : (<><ChevronRight size={15} /> {action}</>)}
          </button>
          <p className="mt-1.5 text-center text-[0.68rem] text-faint">Next step for the {flow} workflow</p>
        </div>
      </div>
    </div>
  );
}

function TagRow({ tags, addTag }: { tags: string[]; addTag: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map((t) => (
        <span key={t} className="rounded-md border border-line bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-ink/70">{t}</span>
      ))}
      <button type="button" onClick={addTag} className="inline-flex items-center gap-0.5 rounded-md border border-dashed border-line px-2 py-0.5 text-[0.7rem] font-medium text-faint transition-colors hover:border-blue hover:text-blue">
        <Tag size={11} /> Tag
      </button>
    </div>
  );
}

function ScheduleView({
  day, setDay, weekOffset, setWeekOffset, extra, addJob, openTicket,
}: {
  day: number; setDay: (d: number) => void; weekOffset: number; setWeekOffset: (n: number) => void;
  extra: Record<string, Job[]>; addJob: (key: string, job: Job) => void; openTicket: (id: string | null) => void;
}) {
  const TECH_DOT: Record<string, string> = { "Luis R.": "bg-blue", "Sam K.": "bg-green", "Mia T.": "bg-warning" };
  const SCHED_TECHS = TEAM.filter((x) => x.role !== "Dispatch").map((x) => x.name);
  const [tech, setTech] = useState("All");
  const [nt, setNt] = useState("");
  const [ntitle, setNtitle] = useState("");
  const [ntech, setNtech] = useState(SCHED_TECHS[0]);
  const [ndur, setNdur] = useState("1h");
  const key = `${weekOffset}:${day}`;
  const base = weekOffset === 0 ? DAY_JOBS[day] ?? [] : [];
  const allJobs = [...base, ...(extra[key] ?? [])];
  const jobs = tech === "All" ? allJobs : allJobs.filter((j) => j.tech === tech);
  const head = dateFor(weekOffset, 0);

  return (
    <div>
      <ModuleHeader title="Schedule" sub="Book the crew, today or weeks out" />
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="mb-3 flex items-center justify-between">
          <button type="button" onClick={() => setWeekOffset(weekOffset - 1)} className="grid h-7 w-7 place-items-center rounded-lg border border-line text-muted hover:border-blue hover:text-blue"><ChevronLeft size={15} /></button>
          <span className="text-[0.82rem] font-bold text-navy">{MONTHS[head.m]} 2026</span>
          <div className="flex items-center gap-1.5">
            {weekOffset !== 0 && (
              <button type="button" onClick={() => { setWeekOffset(0); setDay(2); }} className="rounded-md bg-canvas-2 px-2 py-1 text-[0.7rem] font-semibold text-navy">Today</button>
            )}
            <button type="button" onClick={() => setWeekOffset(weekOffset + 1)} className="grid h-7 w-7 place-items-center rounded-lg border border-line text-muted hover:border-blue hover:text-blue"><ChevronRight size={15} /></button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {DOW.map((_, i) => {
            const dt = dateFor(weekOffset, i);
            const on = i === day;
            const today = weekOffset === 0 && i === 2;
            return (
              <button key={i} type="button" onClick={() => setDay(i)} className={`rounded-lg border px-1 py-2 text-center transition-colors ${on ? "border-blue/40 bg-blue/10 text-blue" : "border-line bg-canvas text-ink/70 hover:border-blue"}`}>
                <span className="block text-[0.65rem] font-semibold uppercase">{dt.dow}</span>
                <span className="block text-[0.95rem] font-bold">{dt.d}</span>
                {today && <span className="mx-auto mt-0.5 block h-1 w-1 rounded-full bg-green" />}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {["All", ...SCHED_TECHS].map((tn) => (
            <button key={tn} type="button" onClick={() => setTech(tn)} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold transition-colors ${tech === tn ? "bg-blue text-white" : "bg-canvas-2 text-ink/70"}`}>
              {tn !== "All" && <span className={`h-1.5 w-1.5 rounded-full ${TECH_DOT[tn] ?? "bg-line"}`} />}
              {tn === "All" ? "All techs" : tn}
            </button>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          {jobs.length === 0 && <p className="py-3 text-center text-[0.8rem] text-faint">{tech === "All" ? "Nothing booked. Add a job below." : `Nothing booked for ${tech}.`}</p>}
          {jobs.map((j, i) => {
            const jt = TICKETS.find((t) => j.title.includes(t.customer.split(" ")[0]));
            return (
            <button key={`${j.time}-${i}`} type="button" onClick={() => openTicket(jt ? jt.id : null)} className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors hover:border-blue ${j.hot ? "border-green/30 bg-green/[0.07]" : "border-line bg-canvas"}`}>
              <span className="w-12 shrink-0 text-[0.78rem] font-bold text-navy">{j.time}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.82rem] font-semibold text-navy">{j.title}</p>
                <p className="flex items-center gap-1.5 text-[0.72rem] text-muted">
                  <span className={`h-1.5 w-1.5 rounded-full ${TECH_DOT[j.tech] ?? "bg-line"}`} />
                  {j.tech}{j.duration ? ` · ${j.duration}` : ""}
                </p>
              </div>
              {j.hot && <CheckCircle2 size={16} className="shrink-0 text-green-600" />}
              <ChevronRight size={15} className="shrink-0 text-faint" />
            </button>
            );
          })}
        </div>

        <div className="mt-3 rounded-lg border border-line bg-canvas/40 p-2.5">
          <p className="mb-1.5 text-[0.66rem] font-bold uppercase tracking-wide text-faint">Add a job</p>
          <div className="flex flex-wrap gap-1.5">
            <input value={nt} onChange={(e) => setNt(e.target.value)} placeholder="Time" aria-label="Time" className={`${inputCls} w-16`} />
            <select value={ndur} onChange={(e) => setNdur(e.target.value)} aria-label="Duration" className={inputCls}>{["30m", "1h", "2h", "Half day"].map((d) => <option key={d} value={d}>{d}</option>)}</select>
            <select value={ntech} onChange={(e) => setNtech(e.target.value)} aria-label="Tech" className={inputCls}>{[...SCHED_TECHS, "Unassigned"].map((tn) => <option key={tn} value={tn}>{tn}</option>)}</select>
          </div>
          <div className="mt-1.5 flex gap-1.5">
            <input value={ntitle} onChange={(e) => setNtitle(e.target.value)} placeholder="Job, e.g. A/C diagnostic" className={`${inputCls} min-w-0 flex-1`} />
            <button type="button" onClick={() => { if (nt.trim()) { addJob(key, { time: nt.trim(), title: ntitle.trim() || "New job", tech: ntech, duration: ndur }); setNt(""); setNtitle(""); toast("Job added to the schedule"); } }} className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-blue px-2.5 py-1.5 text-[0.76rem] font-semibold text-white hover:opacity-90"><Plus size={13} /> Add</button>
          </div>
        </div>

        <p className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] text-faint"><Calendar size={12} /> Synced two-way with Google and Microsoft calendars</p>
      </div>
    </div>
  );
}

function TeamView({ assignedTech }: { assignedTech: string }) {
  return (
    <div>
      <ModuleHeader title="Team" sub="3 techs · 7 jobs today" />
      <div className="space-y-2">
        {TEAM.map((t) => (
          <div key={t.name} className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${t.name === assignedTech ? "border-blue/30 bg-blue/[0.04]" : "border-line bg-surface"}`}>
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-[0.7rem] font-bold text-white">
              {t.name.split(" ").map((p) => p[0]).join("")}
              <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface ${t.dot}`} />
            </span>
            <div className="min-w-0">
              <p className="text-[0.85rem] font-semibold text-navy">{t.name}{t.name === assignedTech && <span className="ml-1.5 text-[0.68rem] font-bold text-blue">· on #{JOB.ticket}</span>}</p>
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

function CatalogView({ catalog, setCatalog }: { catalog: Item[]; setCatalog: (c: Item[]) => void }) {
  const [edit, setEdit] = useState(false);
  const update = (i: number, field: "name" | "price", v: string) =>
    setCatalog(catalog.map((it, idx) => (idx === i ? { ...it, [field]: field === "price" ? Number(v) || 0 : v } : it)));
  const add = () => setCatalog([...catalog, { id: Date.now(), name: "New item", type: "Service", price: 0, tasks: [] }]);
  const remove = (i: number) => setCatalog(catalog.filter((_, idx) => idx !== i));
  const updTask = (i: number, ti: number, v: string) => setCatalog(catalog.map((it, idx) => (idx === i ? { ...it, tasks: (it.tasks ?? []).map((t, j) => (j === ti ? v : t)) } : it)));
  const addTask = (i: number) => setCatalog(catalog.map((it, idx) => (idx === i ? { ...it, tasks: [...(it.tasks ?? []), "New step"] } : it)));
  const removeTask = (i: number, ti: number) => setCatalog(catalog.map((it, idx) => (idx === i ? { ...it, tasks: (it.tasks ?? []).filter((_, j) => j !== ti) } : it)));

  return (
    <div>
      <ModuleHeader title="Catalog" sub="Your services and parts, priced once" />
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">{catalog.length} items</span>
          <button type="button" onClick={() => setEdit(!edit)} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.7rem] font-semibold ${edit ? "bg-blue/10 text-blue" : "text-muted hover:text-blue"}`}><Pencil size={11} /> {edit ? "Done" : "Edit"}</button>
        </div>
        <div className="space-y-1.5">
          {catalog.map((it, i) => (
            <div key={it.id} className="rounded-lg bg-canvas px-2.5 py-1.5">
              <div className="flex items-center gap-2">
                {edit && (
                  <button type="button" onClick={() => remove(i)} className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-warning/15 text-warning"><X size={11} /></button>
                )}
                <span className={`shrink-0 rounded px-1.5 py-0.5 text-[0.6rem] font-bold uppercase ${it.type === "Service" ? "bg-blue/10 text-blue" : "bg-green/10 text-green-600"}`}>{it.type === "Service" ? "Svc" : "Part"}</span>
                {edit ? (
                  <input value={it.name} onChange={(e) => update(i, "name", e.target.value)} className={`${inputCls} flex-1`} />
                ) : (
                  <span className="min-w-0 flex-1 truncate text-[0.82rem] text-ink">{it.name}</span>
                )}
                {edit ? (
                  <span className="inline-flex items-center gap-0.5"><span className="text-[0.8rem] text-faint">$</span><input type="number" value={it.price} onChange={(e) => update(i, "price", e.target.value)} className={`${inputCls} w-16 text-right`} /></span>
                ) : (
                  <span className="shrink-0 text-[0.82rem] font-semibold text-navy">${it.price.toLocaleString()}</span>
                )}
              </div>
              {it.type === "Service" && (edit || (it.tasks && it.tasks.length > 0)) && (
                <div className="mt-1.5 border-t border-line/70 pt-1.5">
                  <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-wide text-faint">Job checklist, auto-added when used</p>
                  {edit ? (
                    <div className="space-y-1">
                      {(it.tasks ?? []).map((t, ti) => (
                        <div key={ti} className="flex items-center gap-1.5">
                          <button type="button" onClick={() => removeTask(i, ti)} className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-warning/15 text-warning"><X size={9} /></button>
                          <input value={t} onChange={(e) => updTask(i, ti, e.target.value)} className={`${inputCls} flex-1`} />
                        </div>
                      ))}
                      <button type="button" onClick={() => addTask(i)} className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-blue hover:underline"><Plus size={11} /> Add step</button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {it.tasks!.map((t, ti) => (
                        <span key={ti} className="inline-flex items-center gap-1 rounded bg-surface px-1.5 py-0.5 text-[0.66rem] text-muted"><Check size={9} className="text-faint" /> {t}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {edit && (
          <button type="button" onClick={add} className="mt-2 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue hover:underline"><Plus size={12} /> Add item</button>
        )}
      </div>
    </div>
  );
}

function BillingView({
  tab, setTab, quote, setQuote, invoice, setInvoice, mile, setMile, lines, setLines, editBill, setEditBill, catalog,
}: {
  tab: "quote" | "invoice" | "milestones"; setTab: (t: "quote" | "invoice" | "milestones") => void;
  quote: "draft" | "sent" | "approved"; setQuote: (s: "draft" | "sent" | "approved") => void;
  invoice: "draft" | "sent" | "paid"; setInvoice: (s: "draft" | "sent" | "paid") => void;
  mile: "draft" | "sent"; setMile: (s: "draft" | "sent") => void;
  lines: Line[]; setLines: (l: Line[]) => void; editBill: boolean; setEditBill: (b: boolean) => void; catalog: Item[];
}) {
  const [pick, setPick] = useState(false);
  const [pdf, setPdf] = useState(false);
  const ar = CUSTOMERS.reduce((n, c) => n + c.balance, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.price, 0);
  const update = (i: number, field: "label" | "qty" | "price", v: string) =>
    setLines(lines.map((l, idx) => (idx === i ? { ...l, [field]: field === "label" ? v : Number(v) || 0 } : l)));
  const addCustom = () => setLines([...lines, { label: "", qty: 1, price: 0 }]);
  const addItem = (it: Item) => { setLines([...lines, { label: it.name, qty: 1, price: it.price }]); setPick(false); };
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

      <div className="mb-3 flex items-center gap-3 rounded-xl border border-warning/25 bg-warning/[0.06] px-3.5 py-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-warning/15 text-warning"><DollarSign size={16} /></span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.82rem] font-bold text-navy">${ar.toLocaleString()} outstanding</p>
          <p className="truncate text-[0.72rem] text-muted">Across 3 customers · Sun City Diner $1,280 is 21 days overdue</p>
        </div>
      </div>

      <div className="mb-3 inline-flex rounded-lg border border-line bg-canvas p-0.5">
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[0.76rem] font-semibold transition-colors ${tab === t.id ? "bg-white text-navy shadow-sm" : "text-muted"}`}><t.icon size={13} /> {t.label}</button>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-surface p-4">
        {(tab === "quote" || tab === "invoice") && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">Line items</span>
              <div className="flex items-center gap-1.5">
                {tab === "invoice" && (
                  <button type="button" onClick={() => setPdf(!pdf)} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.7rem] font-semibold ${pdf ? "bg-blue/10 text-blue" : "text-muted hover:text-blue"}`}><FileText size={11} /> PDF</button>
                )}
                {editable && (
                  <button type="button" onClick={() => { setEditBill(!editBill); setPick(false); }} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.7rem] font-semibold ${editBill ? "bg-blue/10 text-blue" : "text-muted hover:text-blue"}`}><Pencil size={11} /> {editBill ? "Done" : "Edit"}</button>
                )}
              </div>
            </div>

            <div className="mt-2 space-y-1.5">
              {lines.map((l, i) =>
                editBill ? (
                  <div key={i} className="flex items-center gap-1.5">
                    <button type="button" onClick={() => removeLine(i)} className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-warning/15 text-warning"><X size={11} /></button>
                    <input value={l.label} onChange={(e) => update(i, "label", e.target.value)} placeholder="Item or service" className={`${inputCls} min-w-0 flex-1`} />
                    <input type="number" value={l.qty} onChange={(e) => update(i, "qty", e.target.value)} aria-label="Quantity" className={`${inputCls} w-9 text-center`} />
                    <span className="text-[0.78rem] text-faint">×</span>
                    <span className="text-[0.78rem] text-faint">$</span>
                    <input type="number" value={l.price} onChange={(e) => update(i, "price", e.target.value)} aria-label="Price" className={`${inputCls} w-14 text-right`} />
                  </div>
                ) : (
                  <div key={i} className="flex items-center justify-between gap-2 text-[0.85rem]">
                    <span className="min-w-0 truncate text-ink">
                      {l.label || "Untitled"}
                      {l.qty > 1 && <span className="text-faint"> · {l.qty} × ${l.price}</span>}
                    </span>
                    <span className="shrink-0 font-semibold text-navy">${(l.qty * l.price).toLocaleString()}</span>
                  </div>
                )
              )}

              {editBill && (
                <div className="flex flex-wrap gap-3 pt-0.5">
                  <button type="button" onClick={() => setPick(!pick)} className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue hover:underline"><Package size={12} /> Add from catalog</button>
                  <button type="button" onClick={addCustom} className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue hover:underline"><Plus size={12} /> Add custom line</button>
                </div>
              )}

              {editBill && pick && (
                <div className="animate-rise mt-1 max-h-36 overflow-y-auto rounded-lg border border-line bg-canvas p-1.5">
                  {catalog.map((it) => (
                    <button key={it.id} type="button" onClick={() => addItem(it)} className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[0.78rem] text-ink hover:bg-canvas-2">
                      <span className="truncate">{it.name}</span>
                      <span className="ml-2 shrink-0 font-semibold text-navy">${it.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-2 flex items-center justify-between border-t border-line pt-2 text-[0.95rem]">
                <span className="font-bold text-navy">Total</span>
                <span className="font-extrabold text-navy">${total.toLocaleString()}</span>
              </div>
            </div>

            {tab === "invoice" && pdf && (
              <div className="animate-rise mt-3 rounded-lg border border-line bg-white p-4">
                <div className="flex items-center justify-between border-b border-line pb-2">
                  <span className="text-sm font-extrabold tracking-tight text-navy">INVOICE</span>
                  <span className="text-[0.7rem] text-muted">#{JOB.ticket}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[0.7rem]">
                  <div><p className="font-bold uppercase text-faint">From</p><p className="text-navy">Summit HVAC</p></div>
                  <div><p className="font-bold uppercase text-faint">Bill to</p><p className="text-navy">{JOB.customer}</p></div>
                </div>
                <div className="mt-2 space-y-1 border-t border-line pt-2 text-[0.72rem]">
                  {lines.map((l, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-ink">{l.label || "Untitled"}{l.qty > 1 ? ` (x${l.qty})` : ""}</span>
                      <span className="text-navy">${(l.qty * l.price).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-line pt-1 font-bold"><span className="text-navy">Total</span><span className="text-navy">${total.toLocaleString()}</span></div>
                </div>
                <button type="button" onClick={() => toast("PDF downloaded")} className="mt-3 inline-flex items-center gap-1 text-[0.74rem] font-semibold text-blue hover:underline"><FileText size={12} /> Download PDF</button>
              </div>
            )}

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

            {tab === "invoice" && invoice === "draft" && <SendBtn label="Send invoice + pay link" onClick={() => { setInvoice("sent"); toast("Invoice sent with pay link"); }} />}
            {tab === "invoice" && invoice === "sent" && (
              <div className="animate-rise mt-4">
                <Banner title="Invoice sent" body={`Pay link texted to ${JOB.customer}. Tap to pay by card.`} />
                <button type="button" onClick={() => setInvoice("paid")} className="mt-2 w-full rounded-lg border border-green/30 bg-green/10 px-3 py-2 text-[0.82rem] font-semibold text-green-600">Mark as paid</button>
              </div>
            )}
            {tab === "invoice" && invoice === "paid" && (
              <div className="animate-rise mt-4 rounded-xl border border-green/30 bg-green/[0.05] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-bold text-green-600"><CheckCircle2 size={16} /> Paid in full</span>
                  <span className="rounded-full border border-green/30 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-green-600">Receipt</span>
                </div>
                <div className="mt-2 space-y-0.5 text-[0.74rem] text-muted">
                  <div className="flex justify-between"><span>Invoice</span><span className="font-semibold text-navy">#{JOB.ticket}</span></div>
                  <div className="flex justify-between"><span>Paid by</span><span className="font-semibold text-navy">Visa ending 4242</span></div>
                  <div className="flex justify-between"><span>Date</span><span className="font-semibold text-navy">Jun 23, 2026</span></div>
                  <div className="flex justify-between border-t border-green/20 pt-1 text-[0.85rem]"><span className="font-bold text-navy">Total</span><span className="font-extrabold text-green-600">${total.toLocaleString()}</span></div>
                </div>
                <button type="button" onClick={() => toast("Receipt emailed to the customer")} className="mt-2.5 w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-[0.78rem] font-semibold text-navy transition-colors hover:border-blue">Email receipt</button>
              </div>
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
              <div className="animate-rise mt-4"><Banner title="Milestones sent" body={`Deposit link texted to ${JOB.customer}. The rest bills on completion.`} /></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SendBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue px-3 py-2.5 text-[0.85rem] font-semibold text-white transition-opacity hover:opacity-90"><Send size={15} /> {label}</button>
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

type Msg = { me: boolean; text: string };
type Thread = { id: string; name: string; unread?: number; msgs: Msg[] };

function MessagesView({ msgs, setMsgs }: { msgs: Msg[]; setMsgs: (m: Msg[]) => void }) {
  const TEMPLATES = ["On our way 🚐", "Running 10 min late", "All done, invoice sent", "Confirming your appointment"];
  const [others, setOthers] = useState<Thread[]>([
    { id: "james", name: "James R.", unread: 2, msgs: [{ me: false, text: "Is someone still coming today?" }, { me: false, text: "My water heater is getting worse." }] },
    { id: "oak", name: "Oak Street HOA", msgs: [{ me: true, text: "Crew is booked for the 12-unit maintenance Thursday at 8:30." }, { me: false, text: "Great, the COI is on file." }] },
    { id: "dana", name: "Dana P.", unread: 1, msgs: [{ me: false, text: "Is the thermostat still blinking after the install?" }] },
  ]);
  const [sel, setSel] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const mariaThread: Thread = { id: "maria", name: JOB.customer, msgs };
  const allThreads = [mariaThread, ...others];
  const cur = allThreads.find((t) => t.id === sel);

  const send = (text: string) => {
    if (!text.trim()) return;
    if (sel === "maria") setMsgs([...msgs, { me: true, text }]);
    else setOthers((xs) => xs.map((t) => (t.id === sel ? { ...t, msgs: [...t.msgs, { me: true, text }] } : t)));
    setDraft("");
    toast("Message sent");
  };

  if (!cur) {
    return (
      <div>
        <ModuleHeader title="Messages" sub={`${allThreads.length} conversations`} />
        <div className="space-y-2">
          {allThreads.map((t) => {
            const last = t.msgs[t.msgs.length - 1];
            const ini = t.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
            return (
              <button key={t.id} type="button" onClick={() => { setSel(t.id); setOthers((xs) => xs.map((x) => (x.id === t.id ? { ...x, unread: undefined } : x))); }} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue/10 text-[0.72rem] font-bold text-blue">{ini}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.84rem] font-semibold text-navy">{t.name}</p>
                  <p className="truncate text-[0.74rem] text-muted">{last ? (last.me ? "You: " : "") + last.text : "No messages"}</p>
                </div>
                {t.unread ? <span className="grid h-5 min-w-[1.25rem] shrink-0 place-items-center rounded-full bg-blue px-1 text-[0.66rem] font-bold text-white">{t.unread}</span> : <ChevronRight size={16} className="shrink-0 text-faint" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <ModuleHeader title="Messages" sub={`Texting ${cur.name}`} />
      <button type="button" onClick={() => setSel(null)} className="mb-3 inline-flex items-center gap-1 text-[0.76rem] font-semibold text-muted transition-colors hover:text-navy"><ChevronLeft size={14} /> Inbox</button>
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="space-y-2">
          {cur.msgs.map((m, i) => (
            <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
              <span className={`max-w-[80%] rounded-2xl px-3 py-2 text-[0.82rem] leading-snug ${m.me ? "bg-blue text-white" : "bg-canvas-2 text-ink"}`}>{m.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {TEMPLATES.map((q) => (
            <button key={q} type="button" onClick={() => send(q)} className="inline-flex items-center gap-1 rounded-full border border-line bg-canvas px-2.5 py-1 text-[0.74rem] font-medium text-ink/70 transition-colors hover:border-blue hover:text-blue"><Send size={11} /> {q}</button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(draft); }} placeholder="Type a message" className={`${inputCls} flex-1`} />
          <button type="button" onClick={() => send(draft)} className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-blue px-3 py-1.5 text-[0.78rem] font-semibold text-white hover:opacity-90"><Send size={13} /> Send</button>
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
  const [confirming, setConfirming] = useState<number | null>(null);
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
              {confirming === it.id ? (
                <div className="mt-2 flex items-center justify-between rounded-lg bg-blue/[0.05] px-2.5 py-1.5">
                  <span className="text-[0.74rem] font-medium text-navy">Add this to the schedule?</span>
                  <span className="flex gap-1.5">
                    <button type="button" onClick={() => setConfirming(null)} className="rounded-md border border-line bg-surface px-2 py-1 text-[0.72rem] font-semibold text-muted">Cancel</button>
                    <button type="button" onClick={() => { set(it.id, "acted"); setConfirming(null); }} className="rounded-md bg-blue px-2 py-1 text-[0.72rem] font-semibold text-white">Confirm</button>
                  </span>
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-end gap-2">
                  <button type="button" onClick={() => set(it.id, "ignored")} className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[0.72rem] font-semibold text-muted hover:bg-canvas">Ignore</button>
                  <button type="button" onClick={() => setConfirming(it.id)} className="inline-flex items-center gap-1 rounded-lg bg-blue px-2.5 py-1 text-[0.72rem] font-semibold text-white hover:opacity-90"><Check size={13} /> Act</button>
                </div>
              )}
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
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue/10 text-blue"><Mail size={22} /></span>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-canvas-2 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-faint"><Lock size={11} /> Coming soon</p>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">Send and track email from the same customer timeline as your calls, texts, and jobs. Launching soon.</p>
      </div>
    </div>
  );
}

function HomeView({ setActive, openTicket }: { setActive: (m: ModId) => void; openTicket: (id: string | null) => void }) {
  const stats: { label: string; value: string; icon: LucideIcon; tone: string; go: ModId }[] = [
    { label: "Jobs today", value: "7", icon: CalendarDays, tone: "bg-blue/10 text-blue", go: "schedule" },
    { label: "Calls caught", value: "12", icon: PhoneCall, tone: "bg-green/10 text-green-600", go: "live" },
    { label: "Unbilled", value: "$2,480", icon: Receipt, tone: "bg-warning/15 text-warning", go: "billing" },
    { label: "Collected this week", value: "$9,120", icon: DollarSign, tone: "bg-green/10 text-green-600", go: "billing" },
  ];
  const upNext = [
    { time: "1:00", title: "Install · Lee", tech: "Luis R." },
    { time: "3:30", title: "A/C diagnostic · Maria G.", tech: "Luis R." },
  ];
  const needs: { title: string; body: string; icon: LucideIcon; tone: string; go: ModId }[] = [
    { title: "$1,280 overdue · Sun City Diner", body: "Invoice 21 days past due", icon: Receipt, tone: "bg-warning/15 text-warning", go: "billing" },
    { title: "Urgent ticket unassigned", body: "#1041 water heater leaking · James R.", icon: Ticket, tone: "bg-warning/15 text-warning", go: "tickets" },
    { title: "2 voicemails to review", body: "Transcribed, waiting on you", icon: Voicemail, tone: "bg-blue/10 text-blue", go: "live" },
  ];
  return (
    <div>
      <ModuleHeader title="Today" sub="Your whole shop at a glance" />
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s) => (
          <button key={s.label} type="button" onClick={() => setActive(s.go)} className="rounded-xl border border-line bg-surface p-3.5 text-left transition-colors hover:border-blue">
            <span className={`grid h-8 w-8 place-items-center rounded-lg ${s.tone}`}><s.icon size={16} /></span>
            <p className="mt-2 text-xl font-extrabold tracking-tight text-navy">{s.value}</p>
            <p className="text-[0.72rem] text-muted">{s.label}</p>
          </button>
        ))}
      </div>
      <p className="mt-3 inline-flex items-center gap-1 text-[0.72rem] font-semibold text-green-600">
        <TrendingUp size={12} /> Revenue up 18% vs last month
      </p>

      <div className="mt-4">
        <p className="px-1 pb-2 text-[11px] font-bold uppercase tracking-wide text-faint">Needs attention</p>
        <div className="space-y-2">
          {needs.map((n) => (
            <button key={n.title} type="button" onClick={() => setActive(n.go)} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${n.tone}`}><n.icon size={15} /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.82rem] font-semibold text-navy">{n.title}</p>
                <p className="truncate text-[0.72rem] text-muted">{n.body}</p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-faint" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="px-1 pb-2 text-[11px] font-bold uppercase tracking-wide text-faint">Up next</p>
        <div className="space-y-2">
          {upNext.map((j) => {
            const jt = TICKETS.find((t) => j.title.includes(t.customer.split(" ")[0]));
            return (
            <button key={j.time} type="button" onClick={() => openTicket(jt ? jt.id : null)} className="flex w-full items-center gap-3 rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-left transition-colors hover:border-blue">
              <span className="w-12 shrink-0 text-[0.78rem] font-bold text-navy">{j.time}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.82rem] font-semibold text-navy">{j.title}</p>
                <p className="text-[0.72rem] text-muted">{j.tech}</p>
              </div>
              <ChevronRight size={15} className="shrink-0 text-faint" />
            </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type Customer = { id: number; name: string; initials: string; phone: string; email: string; address: string; since: string; tags: string[]; balance: number; vip?: boolean; last: string };
type TLEntry = { when: string; icon: LucideIcon; tone: string; title: string; body: string };

const CUSTOMERS: Customer[] = [
  { id: 1, name: "Maria G.", initials: "MG", phone: "(602) 555-0148", email: "maria.g@email.com", address: "1420 N 3rd Ave, Phoenix AZ", since: "2023", tags: ["HVAC", "VIP"], balance: 0, vip: true, last: "Call today, 4:12" },
  { id: 2, name: "James R.", initials: "JR", phone: "(602) 555-0192", email: "jrowe@email.com", address: "88 E Camelback Rd, Phoenix AZ", since: "2024", tags: ["Plumbing"], balance: 240, last: "Invoice sent Jun 18" },
  { id: 3, name: "Oak Street HOA", initials: "OH", phone: "(480) 555-0110", email: "manager@oakstreethoa.com", address: "Oak St, Tempe AZ", since: "2022", tags: ["Commercial", "Maintenance plan"], balance: 0, last: "Tune-up Jun 10" },
  { id: 4, name: "Dana P.", initials: "DP", phone: "(623) 555-0177", email: "dana.p@email.com", address: "45 W Glendale Ln, Glendale AZ", since: "2025", tags: ["New"], balance: 89, last: "First call Jun 20" },
  { id: 5, name: "Reyes Family", initials: "RF", phone: "(480) 555-0143", email: "reyes.home@email.com", address: "7 S Mesa Dr, Mesa AZ", since: "2021", tags: ["HVAC", "Install"], balance: 0, last: "Install Apr 3" },
  { id: 6, name: "Sun City Diner", initials: "SD", phone: "(602) 555-0166", email: "book@suncitydiner.com", address: "900 W Grand Ave, Phoenix AZ", since: "2023", tags: ["Commercial"], balance: 1280, vip: true, last: "Quote sent Jun 21" },
];

const MARIA_TIMELINE: TLEntry[] = [
  { when: "Today, 4:12", icon: PhoneCall, tone: "bg-green/10 text-green-600", title: "Call · A/C not cooling", body: "AI summarized, became Ticket #1042" },
  { when: "Today, 4:13", icon: MessageSquare, tone: "bg-blue/10 text-blue", title: "Text · arrival window sent", body: "Luis arriving 3:30" },
  { when: "Jun 2", icon: Receipt, tone: "bg-green/10 text-green-600", title: "Invoice · $189", body: "Paid by card" },
  { when: "Last summer", icon: Ticket, tone: "bg-blue/10 text-blue", title: "Job · A/C install", body: "$4,200 · 12-month warranty" },
  { when: "2023", icon: UserRound, tone: "bg-canvas-2 text-muted", title: "First call", body: "Found you on Google" },
];

function custTimeline(c: Customer): TLEntry[] {
  if (c.id === 1) return MARIA_TIMELINE;
  return [
    { when: c.last.replace(/^[A-Za-z ]+/, "").trim() || "Recent", icon: PhoneCall, tone: "bg-green/10 text-green-600", title: c.last, body: "Logged to the customer timeline" },
    { when: c.since, icon: Receipt, tone: "bg-blue/10 text-blue", title: c.balance > 0 ? `Open balance · $${c.balance}` : "All invoices paid", body: c.balance > 0 ? "Reminder scheduled" : "No outstanding balance" },
    { when: c.since, icon: UserRound, tone: "bg-canvas-2 text-muted", title: `Customer since ${c.since}`, body: c.tags.join(" · ") },
  ];
}

function CustomersView({ sel, setSel }: { sel: number | null; setSel: (n: number | null) => void }) {
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS);
  const [edit, setEdit] = useState(false);
  const [q, setQ] = useState("");

  const c = customers.find((x) => x.id === sel) || null;
  const upd = (field: "phone" | "email" | "address", v: string) =>
    setCustomers(customers.map((x) => (x.id === sel ? { ...x, [field]: v } : x)));

  if (!c) {
    const filtered = customers.filter((x) => x.name.toLowerCase().includes(q.toLowerCase()));
    return (
      <div>
        <ModuleHeader title="Customers" sub={`${customers.length} customers · click to open`} />
        <div className="relative mb-3">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers" className={`${inputCls} w-full pl-8`} />
        </div>
        <div className="space-y-1.5">
          {filtered.map((x) => (
            <button key={x.id} type="button" onClick={() => { setSel(x.id); setEdit(false); }} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-[0.7rem] font-bold text-white">{x.initials}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.85rem] font-semibold text-navy">{x.name}{x.vip && <span className="ml-1.5 rounded bg-green/10 px-1 py-0.5 text-[9px] font-bold text-green-600">VIP</span>}</p>
                <p className="truncate text-[0.72rem] text-muted">{x.phone} · {x.last}</p>
              </div>
              {x.balance > 0 && <span className="shrink-0 rounded-md bg-warning/15 px-2 py-0.5 text-[0.7rem] font-semibold text-warning">${x.balance} due</span>}
              <ChevronRight size={15} className="shrink-0 text-faint" />
            </button>
          ))}
          {filtered.length === 0 && <p className="py-4 text-center text-[0.8rem] text-faint">No customers match that search.</p>}
        </div>
      </div>
    );
  }

  const tl = custTimeline(c);
  return (
    <div>
      <button type="button" onClick={() => { setSel(null); setEdit(false); }} className="mb-3 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue hover:underline"><ChevronLeft size={14} /> All customers</button>
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">{c.initials}</span>
          <div className="min-w-0">
            <p className="text-[0.95rem] font-semibold text-navy">{c.name}{c.vip && <span className="ml-1.5 rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-semibold text-green-600">VIP</span>}</p>
            <p className="text-xs text-muted">Customer since {c.since}{c.balance > 0 ? ` · $${c.balance} balance` : ""}</p>
          </div>
          <button type="button" onClick={() => { if (edit) toast("Customer saved"); setEdit(!edit); }} className={`ml-auto inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.7rem] font-semibold ${edit ? "bg-blue/10 text-blue" : "text-muted hover:text-blue"}`}><Pencil size={11} /> {edit ? "Done" : "Edit"}</button>
        </div>

        <div className="mt-3 space-y-2">
          {([["phone", "Phone"], ["email", "Email"], ["address", "Address"]] as const).map(([f, label]) => (
            <div key={f} className="flex items-center gap-2">
              <span className="w-14 shrink-0 text-[0.66rem] font-bold uppercase text-faint">{label}</span>
              {edit ? (
                <input value={c[f]} onChange={(e) => upd(f, e.target.value)} className={`${inputCls} min-w-0 flex-1`} />
              ) : (
                <span className="min-w-0 flex-1 truncate text-[0.82rem] text-ink">{c[f]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <span key={t} className="rounded-md border border-line bg-canvas px-2 py-0.5 text-[0.7rem] font-medium text-ink/70">{t}</span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="px-1 pb-2 text-[11px] font-bold uppercase tracking-wide text-faint">Timeline</p>
        <div className="space-y-2.5">
          {tl.map((e, i) => (
            <div key={i} className="flex gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${e.tone}`}><e.icon size={15} /></span>
              <div className="min-w-0 flex-1 border-b border-line pb-2.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[0.82rem] font-semibold text-navy">{e.title}</p>
                  <span className="shrink-0 text-[0.68rem] text-faint">{e.when}</span>
                </div>
                <p className="text-[0.74rem] text-muted">{e.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
