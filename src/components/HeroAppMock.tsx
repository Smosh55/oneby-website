"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
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
  Calendar,
  CheckCircle2,
  Send,
  Lock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Bell,
  Plus,
  Pencil,
  Tag,
  MousePointerClick,
  LayoutDashboard,
  UserRound,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Zap,
  Bot,
  Globe,
  Play,
  Pause,
  DollarSign,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import type {
  ModId,
  Job,
  Line,
  Item,
  Subtask,
  SubtaskSetter,
  Ticket as TicketData,
  CallEntry,
  Msg,
  Thread,
  Rule,
  Customer,
  TLEntry,
  TaskItem,
  DemoData,
} from "@/data/demo/types";
import { hvacDemo } from "@/data/demo/hvac";

const DemoContext = createContext<DemoData>(hvacDemo);
function useDemo() {
  return useContext(DemoContext);
}

const MODULES: { id: ModId; label: string; icon: LucideIcon; badge?: string; soon?: boolean }[] = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "live", label: "Live", icon: Activity },
  { id: "calls", label: "Calls", icon: PhoneCall },
  { id: "tickets", label: "Tickets", icon: Ticket, badge: "1" },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "customers", label: "Customers", icon: UserRound },
  { id: "team", label: "Team", icon: Users },
  { id: "catalog", label: "Catalog", icon: Package },
  { id: "billing", label: "Billing", icon: Receipt },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "tasks", label: "Tasks", icon: ListChecks, badge: "3" },
  { id: "automations", label: "Automations", icon: Zap },
  { id: "receptionist", label: "Receptionist", icon: Bot },
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

// Compact (homepage hero) variant: the core loop plus the two differentiators
// (Automations, Receptionist). The full 14-module workspace renders on /product.
const CORE: ModId[] = ["live", "calls", "tickets", "schedule", "billing", "messages", "automations", "receptionist"];
const CORE_NEXT: Partial<Record<ModId, { id: ModId; label: string }>> = {
  live: { id: "tickets", label: "See the ticket" },
  tickets: { id: "schedule", label: "Schedule it" },
  schedule: { id: "billing", label: "Bill the job" },
  billing: { id: "messages", label: "Text the customer" },
};

type Phase = "transcribing" | "summarizing" | "typing" | "done";
type TaskState = "pending" | "acted" | "ignored" | "snoozed";

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
    <div role="status" aria-live="polite" className="pointer-events-none absolute bottom-3 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-1.5">
      {items.map((t) => (
        <div key={t.id} className="animate-rise pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-navy px-3 py-2 text-[0.78rem] font-semibold text-white shadow-[0_20px_45px_-15px_rgba(4,3,79,0.6)]">
          <CheckCircle2 size={14} className="text-green" /> {t.msg}
        </div>
      ))}
    </div>
  );
}

export default function HeroAppMock({ compact = false, data = hvacDemo, showCue = true }: { compact?: boolean; data?: DemoData; showCue?: boolean }) {
  const [active, setActive] = useState<ModId>("live");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("transcribing");
  const [typed, setTyped] = useState(0);
  const [day, setDay] = useState(2);
  const [weekOffset, setWeekOffset] = useState(0);
  const [extra, setExtra] = useState<Record<string, Job[]>>({});
  const [billTab, setBillTab] = useState<"quote" | "invoice" | "milestones">("quote");
  const [quote, setQuote] = useState<"draft" | "sent" | "approved">("draft");
  const [invoice, setInvoice] = useState<"draft" | "sent" | "paid">("draft");
  const [mile, setMile] = useState<"draft" | "sent">("draft");
  const [linesBy, setLinesBy] = useState<Record<string, Line[]>>(data.linesSeed);
  const [editBill, setEditBill] = useState(false);
  const [catalog, setCatalog] = useState<Item[]>(data.catalog);
  const [assignedTech, setAssignedTech] = useState(data.primaryTech);
  const [tags, setTags] = useState<string[]>(data.liveTags);
  const [notes, setNotes] = useState<string[]>(data.liveNotes);
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>(data.primaryMessages);
  const [tasks, setTasks] = useState<Record<number, TaskState>>({ 1: "pending", 2: "pending", 3: "pending" });
  const [ticketSel, setTicketSel] = useState<string | null>(null);
  const [custSel, setCustSel] = useState<number | null>(null);
  const [customers, setCustomers] = useState<Customer[]>(data.customers);
  const [subtasks, setSubtasks] = useState<Subtask[]>(data.subtaskSeed);
  const [newTickets, setNewTickets] = useState<TicketData[]>([]);
  // Edits to non-primary tickets, keyed by id, lifted here so they survive
  // leaving and re-entering the Tickets module. #1042 keeps using the shared
  // state above (tags/notes/subtasks/assignedTech) that also feeds Live/Billing/Team.
  const [tagsBy, setTagsBy] = useState<Record<string, string[]>>({});
  const [notesBy, setNotesBy] = useState<Record<string, string[]>>({});
  const [subsBy, setSubsBy] = useState<Record<string, Subtask[]>>({});
  const [techBy, setTechBy] = useState<Record<string, string>>({});
  const openCustomer = (name: string) => { const c = data.customers.find((x) => x.name === name); setCustSel(c ? c.id : null); setActive("customers"); };
  const openTicket = (id: string | null) => { setTicketSel(id); setActive("tickets"); };
  const addTicket = () => {
    // "T" prefix so a generated id can never collide with the seeded numeric ids.
    const id = `T${String(Date.now()).slice(-4)}`;
    setNewTickets((xs) => [{ id, issue: "New ticket", customer: "New customer", status: "New", urgent: false, summary: "Created manually. Add the details, schedule it, and assign a tech.", relationship: "New", tech: data.team[0].name, tags: [], notes: [], subtasks: [] }, ...xs]);
    setTicketSel(id);
    setActive("tickets");
    toast("New ticket created");
  };

  const rootRef = useRef<HTMLDivElement>(null);
  const wasVisible = useRef(false);
  const interacted = useRef(false);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible.current) {
          wasVisible.current = true;
          // Only replay the intro for a passive scroller. Once someone has
          // clicked into the demo, leave their place and state intact.
          if (interacted.current) return;
          setActive("live");
          setPhase("transcribing");
          setTyped(0);
          setDay(2);
          setWeekOffset(0);
          setExtra({});
          setTicketSel(null);
          setNewTickets([]);
          setTagsBy({});
          setNotesBy({});
          setSubsBy({});
          setTechBy({});
          setCustSel(null);
          setCustomers(data.customers);
          setSubtasks(data.subtaskSeed);
          setBillTab("quote");
          setQuote("draft");
          setInvoice("draft");
          setMile("draft");
          setLinesBy(data.linesSeed);
          setEditBill(false);
          setCatalog(data.catalog);
          setAssignedTech(data.primaryTech);
          setTags(data.liveTags);
          setNotes(data.liveNotes);
          setMsgs(data.primaryMessages);
          setTasks({ 1: "pending", 2: "pending", 3: "pending" });
        } else if (!entry.isIntersecting) {
          wasVisible.current = false;
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [data]);

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
    if (typed >= data.summary.length) {
      const t = setTimeout(() => setPhase("done"), 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped((n) => Math.min(n + 3, data.summary.length)), 26);
    return () => clearTimeout(t);
  }, [phase, typed, data.summary]);

  const addJob = (key: string, job: Job) =>
    setExtra((e) => ({ ...e, [key]: [...(e[key] ?? []), job] }));
  const addNote = (text: string) => setNotes([...notes, text]);

  const mods = compact ? MODULES.filter((m) => CORE.includes(m.id)) : MODULES;
  const next = (compact ? CORE_NEXT : NEXT)[active];

  return (
    <DemoContext.Provider value={data}>
    <div
      ref={rootRef}
      onClickCapture={() => {
        interacted.current = true;
      }}
      onKeyDownCapture={() => {
        interacted.current = true;
      }}
      className="relative mx-auto w-full max-w-5xl"
    >
      {/* interactive cue */}
      {showCue && (
        <div className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-blue px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-[var(--shadow-lg)]">
            <MousePointerClick size={13} className="animate-bounce" /> Live demo, edit anything
          </span>
        </div>
      )}

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
              {mods.map((m) => {
                const on = m.id === active;
                return (
                  <button
                    key={m.id}
                    type="button"
                    disabled={m.soon}
                    aria-disabled={m.soon}
                    onClick={() => !m.soon && setActive(m.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[0.85rem] font-medium transition-colors ${
                      on ? "bg-blue/10 text-blue" : m.soon ? "text-faint" : "text-ink/70 hover:bg-canvas-2"
                    }`}
                  >
                    <m.icon size={16} />
                    {m.label}
                    {m.badge && (
                      <span className="ml-auto rounded-full bg-blue px-1.5 py-0.5 text-[11px] sm:text-[10px] font-bold text-white">{m.badge}</span>
                    )}
                    {m.soon && (
                      <span className="ml-auto rounded-full bg-canvas-2 px-1.5 py-0.5 text-[11px] sm:text-[9px] font-bold uppercase text-faint">Soon</span>
                    )}
                  </button>
                );
              })}
            </nav>
            {compact && (
              <a
                href="/product"
                className="mt-3 flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.8rem] font-semibold text-blue hover:bg-blue/10"
              >
                Full workspace <ArrowRight size={14} />
              </a>
            )}
          </aside>

          {/* main */}
          <div className="flex min-h-[460px] flex-col p-4 sm:p-6">
            {(() => {
              const activeMod = MODULES.find((m) => m.id === active);
              return (
                <div className="relative mb-4 sm:hidden">
                  <button
                    type="button"
                    onClick={() => setPickerOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={pickerOpen}
                    className="flex w-full items-center gap-2.5 rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-left"
                  >
                    {activeMod && <activeMod.icon size={18} className="shrink-0 text-blue" />}
                    <span className="flex-1 text-[0.92rem] font-bold text-navy">{activeMod?.label ?? "Menu"}</span>
                    {activeMod?.badge && <span className="rounded-full bg-blue px-1.5 py-0.5 text-[11px] sm:text-[10px] font-bold text-white">{activeMod.badge}</span>}
                    <ChevronDown size={18} className={`shrink-0 text-faint transition-transform ${pickerOpen ? "rotate-180" : ""}`} />
                  </button>
                  {pickerOpen && (
                    <>
                      <button type="button" aria-label="Close menu" onClick={() => setPickerOpen(false)} className="fixed inset-0 z-30 cursor-default" />
                      <div role="menu" className="animate-rise absolute left-0 right-0 top-full z-40 mt-1.5 max-h-[19rem] overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-[var(--shadow-lg)]">
                        {mods.map((m) => {
                          const on = m.id === active;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              role="menuitem"
                              disabled={m.soon}
                              onClick={() => { if (!m.soon) { setActive(m.id); setPickerOpen(false); } }}
                              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[0.92rem] font-medium ${on ? "bg-blue/10 text-blue" : m.soon ? "text-faint" : "text-ink/80"}`}
                            >
                              <m.icon size={18} className="shrink-0" />
                              <span className="flex-1">{m.label}</span>
                              {m.badge && <span className="rounded-full bg-blue px-1.5 py-0.5 text-[11px] sm:text-[10px] font-bold text-white">{m.badge}</span>}
                              {m.soon && <span className="rounded-full bg-canvas-2 px-1.5 py-0.5 text-[11px] sm:text-[9px] font-bold uppercase text-faint">Soon</span>}
                              {on && !m.badge && <Check size={16} className="shrink-0 text-blue" />}
                            </button>
                          );
                        })}
                        {compact && (
                          <a href="/product" className="mt-1 flex items-center gap-2.5 rounded-lg border-t border-line px-3 py-2.5 text-[0.92rem] font-semibold text-blue">
                            <ArrowRight size={16} className="shrink-0" /> Full workspace
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })()}

            <div className="flex-1">
              {active === "home" && <HomeView setActive={setActive} openTicket={openTicket} />}
              {active === "customers" && <CustomersView sel={custSel} setSel={setCustSel} customers={customers} setCustomers={setCustomers} setActive={setActive} openTicket={openTicket} />}
              {active === "live" && <LiveView phase={phase} typed={typed} tags={tags} openTicket={openTicket} openCalls={() => setActive("calls")} />}
              {active === "calls" && <CallsView openTicket={openTicket} />}
              {active === "tickets" && (
                <TicketsView tags={tags} setTags={setTags} notes={notes} addNote={addNote} assignedTech={assignedTech} setAssignedTech={setAssignedTech} sel={ticketSel} setSel={setTicketSel} openCustomer={openCustomer} catalog={catalog} subtasks={subtasks} setSubtasks={setSubtasks} addJob={addJob} setActive={setActive} newTickets={newTickets} addTicket={addTicket} tagsBy={tagsBy} setTagsBy={setTagsBy} notesBy={notesBy} setNotesBy={setNotesBy} subsBy={subsBy} setSubsBy={setSubsBy} techBy={techBy} setTechBy={setTechBy} />
              )}
              {active === "schedule" && (
                <ScheduleView day={day} setDay={setDay} weekOffset={weekOffset} setWeekOffset={setWeekOffset} extra={extra} addJob={addJob} openTicket={openTicket} />
              )}
              {active === "team" && <TeamView assignedTech={assignedTech} setActive={setActive} />}
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
                  linesBy={linesBy}
                  setLinesBy={setLinesBy}
                  editBill={editBill}
                  setEditBill={setEditBill}
                  catalog={catalog}
                  setCatalog={setCatalog}
                  setSubtasks={setSubtasks}
                  assignedTech={assignedTech}
                  ticketSel={ticketSel}
                />
              )}
              {active === "messages" && <MessagesView msgs={msgs} setMsgs={setMsgs} />}
              {active === "tasks" && <TasksView tasks={tasks} setTasks={setTasks} setActive={setActive} />}
              {active === "automations" && <AutomationsView />}
              {active === "receptionist" && <ReceptionistView />}
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
    </DemoContext.Provider>
  );
}

function ModuleHeader({ title, sub, action }: { title: string; sub: string; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-navy">{title}</h3>
        <p className="text-xs text-faint">{sub}</p>
      </div>
      {action && (
        <button type="button" onClick={action.onClick} className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-blue px-2.5 py-1.5 text-[0.74rem] font-semibold text-white transition-opacity hover:opacity-90">
          <Plus size={13} /> {action.label}
        </button>
      )}
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
const numCls = `${inputCls} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;

function LiveView({ phase, typed, tags, openTicket, openCalls }: { phase: Phase; typed: number; tags: string[]; openTicket: (id: string | null) => void; openCalls: () => void }) {
  const demo = useDemo();
  const JOB = { customer: demo.primaryCustomer, issue: demo.primaryIssue, ticket: demo.primaryTicket };
  const SUMMARY = demo.summary;
  const done = phase === "done";
  const processing = phase === "transcribing" || phase === "summarizing";
  return (
    <div>
      <ModuleHeader title="Live activity" sub="One call active, one just wrapped" action={{ label: "Log call", onClick: () => toast("Call logged") }} />

      <ActiveCallCard />

      <div className="rounded-xl border border-line bg-canvas px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green/10 text-green-600"><PhoneCall size={18} /></span>
          <div className="min-w-0">
            <p className="text-[0.95rem] font-semibold text-navy">Call with {JOB.customer}</p>
            <p className="truncate text-xs text-muted">Answered by {demo.team[2].name.split(" ")[0]} · desk phone · 4:12</p>
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
        <button type="button" onClick={() => openTicket(JOB.ticket)} className="animate-rise mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green/10 px-3 py-2 text-[0.8rem] font-semibold text-green-600 transition-colors hover:bg-green/15">
          <Ticket size={15} /> Turned into Ticket #{JOB.ticket}, automatically <ChevronRight size={14} />
        </button>
      )}

      {done && (
        <button type="button" onClick={() => openCalls()} className="animate-rise mt-3 ml-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.8rem] font-semibold text-blue transition-colors hover:bg-blue/10">
          <PhoneCall size={15} /> See call history <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function TopBarActions() {
  const demo = useDemo();
  const [notif, setNotif] = useState(false);
  const items = [
    { icon: PhoneCall, tone: "text-green-600 bg-green/10", title: "Missed call caught by AI", time: "2m" },
    { icon: Receipt, tone: "text-blue bg-blue/10", title: `${demo.customers[1].name} paid invoice, $${demo.customers[1].balance}`, time: "18m" },
    { icon: Clock, tone: "text-warning bg-warning/15", title: `${demo.team[0].name.split(" ")[0]} is running 10 min late`, time: "33m" },
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
            <p className="px-2 py-1 text-[0.7rem] sm:text-[0.64rem] font-bold uppercase tracking-wide text-faint">Notifications</p>
            {items.map((it, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-canvas-2">
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${it.tone}`}><it.icon size={12} /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.74rem] font-medium text-navy">{it.title}</p>
                  <p className="text-[0.7rem] sm:text-[0.64rem] text-faint">{it.time} ago</p>
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
  const demo = useDemo();
  const caller = demo.customers[1];
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
          <p className="text-[0.85rem] font-semibold text-navy">Incoming · {caller.name} · {caller.phone}</p>
          <p className="text-[0.74rem] text-muted">The AI is handling it. The summary, transcript, and ticket land the moment the call wraps.</p>
        </div>
      </div>
    </div>
  );
}

function AnsweredCallRow({ c }: { c: CallEntry }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="rounded-xl border border-line bg-canvas px-3.5 py-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={playing ? "Pause recording" : "Play recording"}
          onClick={() => setPlaying((p) => !p)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green text-white transition-opacity hover:opacity-90"
        >
          {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <PhoneCall size={13} className="text-green-600" />
            <p className="text-[0.84rem] font-semibold text-navy">AI answered · {c.name}</p>
            <span className="ml-auto text-[0.72rem] text-faint">{c.dur}</span>
          </div>
          {/* progress bar */}
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line">
            <div className={`h-full rounded-full bg-green ${playing ? "animate-pulse" : ""}`} style={{ width: playing ? "100%" : "0%", transition: playing ? "width 42s linear" : "none" }} />
          </div>
        </div>
      </div>
      <p className="mt-2.5 rounded-lg bg-surface px-3 py-2 text-[0.78rem] leading-relaxed text-ink">
        <span className="font-semibold text-green-600">AI captured: </span>
        {c.captured ?? `${c.meta}. Picked up on the second ring, no voicemail.`}
      </p>
    </div>
  );
}

const TONE_CLS: Record<CallEntry["tone"], string> = {
  green: "bg-green/10 text-green-600",
  blue: "bg-blue/10 text-blue",
  warning: "bg-warning/15 text-warning",
  muted: "bg-canvas-2 text-muted",
};

function CallRow({ c, openTicket }: { c: CallEntry; openTicket: (id: string | null) => void }) {
  const DirIcon = c.dir === "out" ? PhoneOutgoing : c.dir === "missed" ? PhoneMissed : PhoneIncoming;
  const dirTone = c.dir === "missed" ? "bg-warning/10 text-warning" : c.dir === "out" ? "bg-blue/10 text-blue" : "bg-green/10 text-green-600";
  const clickable = !!c.ticket;
  const inner = (
    <>
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${dirTone}`}><DirIcon size={16} /></span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.84rem] font-semibold text-navy">{c.name}</p>
        <p className="truncate text-[0.72rem] text-muted">{c.meta}</p>
      </div>
      <span className="shrink-0 text-[0.72rem] text-faint">{c.dur}</span>
      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] sm:text-[10px] font-semibold ${TONE_CLS[c.tone]}`}>{c.tag}</span>
      {clickable && <ChevronRight size={15} className="shrink-0 text-faint" />}
    </>
  );
  if (clickable) {
    return (
      <button type="button" onClick={() => openTicket(c.ticket!)} className="flex w-full items-center gap-3 rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-left transition-colors hover:border-blue">
        {inner}
      </button>
    );
  }
  return <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-3.5 py-2.5">{inner}</div>;
}

function CallsView({ openTicket }: { openTicket: (id: string | null) => void }) {
  const demo = useDemo();
  const CALL_GROUPS = demo.callGroups;
  const stats: [string, string][] = [["Calls today", "14"], ["Answered by AI", "9"], ["Turned into tickets", "4"]];
  return (
    <div>
      <ModuleHeader title="Call history" sub="Every call logged, recorded, and summarized" action={{ label: "Log call", onClick: () => toast("Call logged") }} />
      <div className="mb-4 grid grid-cols-3 gap-2">
        {stats.map(([label, val]) => (
          <div key={label} className="rounded-xl border border-line bg-canvas px-3 py-2.5">
            <p className="text-lg font-bold text-navy">{val}</p>
            <p className="text-[0.7rem] sm:text-[0.68rem] font-medium text-faint">{label}</p>
          </div>
        ))}
      </div>
      {CALL_GROUPS.map((g) => (
        <div key={g.group} className="mb-4">
          <p className="px-1 pb-2 text-[11px] font-bold uppercase tracking-wide text-faint">{g.group}</p>
          <div className="space-y-2">
            {g.calls.map((c) => (c.recording ? <AnsweredCallRow key={c.id} c={c} /> : <CallRow key={c.id} c={c} openTicket={openTicket} />))}
          </div>
        </div>
      ))}
    </div>
  );
}

const TICKET_STATUSES = ["New", "Scheduled", "In progress", "Invoiced", "Done"];

function TicketsView({
  tags,
  setTags,
  notes,
  addNote,
  assignedTech,
  setAssignedTech,
  sel,
  setSel,
  openCustomer,
  catalog,
  subtasks,
  setSubtasks,
  addJob,
  setActive,
  newTickets,
  addTicket,
  tagsBy,
  setTagsBy,
  notesBy,
  setNotesBy,
  subsBy,
  setSubsBy,
  techBy,
  setTechBy,
}: {
  tags: string[];
  setTags: (t: string[]) => void;
  notes: string[];
  addNote: (t: string) => void;
  assignedTech: string;
  setAssignedTech: (t: string) => void;
  sel: string | null;
  setSel: (s: string | null) => void;
  openCustomer: (name: string) => void;
  catalog: Item[];
  subtasks: Subtask[];
  setSubtasks: SubtaskSetter;
  addJob: (key: string, job: Job) => void;
  setActive: (m: ModId) => void;
  newTickets: TicketData[];
  addTicket: () => void;
  tagsBy: Record<string, string[]>;
  setTagsBy: (m: Record<string, string[]>) => void;
  notesBy: Record<string, string[]>;
  setNotesBy: (m: Record<string, string[]>) => void;
  subsBy: Record<string, Subtask[]>;
  setSubsBy: (m: Record<string, Subtask[]>) => void;
  techBy: Record<string, string>;
  setTechBy: (m: Record<string, string>) => void;
}) {
  const demo = useDemo();
  const TICKETS = demo.tickets;
  const TEAM = demo.team;
  const [n, setN] = useState("");
  const [picking, setPicking] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const FLOWS = demo.scheduleFlows;
  const flowKeys = Object.keys(FLOWS);
  const [flow, setFlow] = useState(() => flowKeys[0]);
  const [stage, setStage] = useState(1);
  const [nt, setNt] = useState("");
  const [svcPick, setSvcPick] = useState(false);
  const [sched, setSched] = useState(false);
  const [schDay, setSchDay] = useState(2);
  const [schTime, setSchTime] = useState("");
  const [schTech, setSchTech] = useState("");
  const SCHED_SLOTS = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const applyService = (it: Item) => {
    const steps = it.tasks ?? [];
    setCurSubs((xs) => [...xs, ...steps.map((label, k) => ({ id: Date.now() + k, label, assignee: curTech, done: false }))]);
    setSvcPick(false);
    toast(`${steps.length} tasks from ${it.name}, assigned to ${curTech}`);
  };
  const stages = FLOWS[flow] ?? FLOWS[flowKeys[0]] ?? [];
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
  const action = STAGE_ACTION[stages[stage]] ?? "Advance";
  const atEnd = stage >= stages.length - 1;
  const isSchedAction = action.startsWith("Schedule");
  const allTickets = [...newTickets, ...TICKETS];
  const tk = allTickets.find((t) => t.id === sel);

  // Each ticket opens to its own real status, and the workflow never leaks
  // from one ticket to the next.
  useEffect(() => {
    const t = allTickets.find((x) => x.id === sel);
    const stageIdx: Record<string, number> = { New: 0, Scheduled: 1, "In progress": 2, Invoiced: 3, Done: 4 };
    const firstFlow = flowKeys[0];
    setFlow(firstFlow);
    const idx = t ? stageIdx[t.status] ?? 1 : 1;
    setStage(Math.min(idx, (FLOWS[firstFlow]?.length ?? 5) - 1));
  }, [sel]);

  // Show the selected ticket's own data. #1042 stays wired to the lifted state
  // (so its edits flow to Live/Billing/Team); other tickets use their own copy.
  const sid = sel ?? "";
  const isPrimary = sel === demo.primaryTicket;
  const curTags = isPrimary ? tags : (tagsBy[sid] ?? tk?.tags ?? []);
  const curNotes = isPrimary ? notes : (notesBy[sid] ?? tk?.notes ?? []);
  const curSubs = isPrimary ? subtasks : (subsBy[sid] ?? tk?.subtasks ?? []);
  const curTech = isPrimary ? assignedTech : (techBy[sid] ?? tk?.tech ?? TEAM[0].name);
  const setCurTags = (t: string[]) => (isPrimary ? setTags(t) : setTagsBy({ ...tagsBy, [sid]: t }));
  const addCurNote = (t: string) => (isPrimary ? addNote(t) : setNotesBy({ ...notesBy, [sid]: [...(notesBy[sid] ?? tk?.notes ?? []), t] }));
  const setCurSubs: SubtaskSetter = (u) => {
    if (isPrimary) { setSubtasks(u); return; }
    const cur = subsBy[sid] ?? tk?.subtasks ?? [];
    setSubsBy({ ...subsBy, [sid]: typeof u === "function" ? u(cur) : u });
  };
  const setCurTech = (t: string) => (isPrimary ? setAssignedTech(t) : setTechBy({ ...techBy, [sid]: t }));

  if (!tk) {
    return (
      <div>
        <ModuleHeader title="Tickets" sub={`${allTickets.length} open jobs`} action={{ label: "New ticket", onClick: addTicket }} />
        <div className="space-y-4">
          {TICKET_STATUSES.map((s) => {
            const inCol = allTickets.filter((t) => t.status === s);
            if (inCol.length === 0) return null;
            return (
              <div key={s}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">{s}</span>
                  <span className="rounded-full bg-canvas-2 px-1.5 text-[0.7rem] sm:text-[0.66rem] font-bold text-muted">{inCol.length}</span>
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
          {tk.urgent && <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[11px] sm:text-[10px] font-bold uppercase text-warning">Urgent</span>}
        </div>
        <p className="mt-2 text-[0.95rem] font-semibold text-navy">{tk.issue}</p>
        <p className="mt-1 text-sm text-muted"><button type="button" onClick={() => openCustomer(tk.customer)} className="font-semibold text-blue hover:underline">{tk.customer}</button> · {tk.relationship}</p>

        <div className="mt-3"><TagRow tags={curTags} setTags={setCurTags} /></div>

        <div className="mt-3 rounded-lg border border-blue/15 bg-blue/[0.04] px-3 py-2 text-[0.82rem] leading-relaxed text-ink">{tk.summary}</div>

        {/* status + assignment */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.78rem]">
          <button
            type="button"
            onClick={() => { setPicking(!picking); setPending(null); }}
            className="inline-flex items-center gap-1 rounded-md bg-canvas-2 px-2 py-1 font-semibold text-navy hover:ring-1 hover:ring-blue/40"
          >
            Assigned: {curTech} <Pencil size={11} className="text-faint" />
          </button>
        </div>

        {picking && !pending && (
          <div className="animate-rise mt-2 rounded-lg border border-line bg-canvas p-2">
            <p className="px-1 pb-1 text-[0.7rem] sm:text-[0.68rem] font-bold uppercase text-faint">Reassign to</p>
            {TEAM.filter((t) => t.role !== "Dispatch").map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setPending(t.name)}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[0.8rem] text-ink hover:bg-canvas-2"
              >
                {t.name}
                <span className="text-[0.7rem] sm:text-[0.68rem] text-faint">{t.status}</span>
              </button>
            ))}
          </div>
        )}

        {pending && (
          <div className="animate-rise mt-2 flex items-center justify-between rounded-lg border border-blue/25 bg-blue/[0.05] px-3 py-2">
            <span className="text-[0.8rem] font-medium text-navy">Assign this job to {pending}?</span>
            <span className="flex gap-1.5">
              <button type="button" onClick={() => { setPending(null); }} className="rounded-md border border-line bg-surface px-2 py-1 text-[0.72rem] font-semibold text-muted">Cancel</button>
              <button type="button" onClick={() => { setCurTech(pending); toast(`Assigned to ${pending}`); setPending(null); setPicking(false); }} className="rounded-md bg-blue px-2 py-1 text-[0.72rem] font-semibold text-white">Confirm</button>
            </span>
          </div>
        )}

        {/* next step - the one clear action once it is a ticket */}
        <div className="mt-4 rounded-xl border border-blue/20 bg-blue/[0.05] p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[0.7rem] sm:text-[0.64rem] font-bold uppercase tracking-wide text-faint">Current stage</p>
              <p className="text-[0.95rem] font-bold text-navy">{stages[stage]}</p>
            </div>
            {atEnd ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-green/10 px-3 py-2 text-[0.82rem] font-bold text-green-600"><CheckCircle2 size={15} /> Job complete</span>
            ) : (
              <button type="button" onClick={() => { if (isSchedAction) { setSched((v) => !v); } else { const next = stages[stage + 1]; setStage(stage + 1); toast(`Ticket moved to ${next}`); } }} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-navy px-3.5 py-2.5 text-[0.84rem] font-semibold text-white transition-opacity hover:opacity-90">
                {action} <ChevronRight size={15} />
              </button>
            )}
          </div>
          <div className="mt-3 flex items-center gap-1">
            {stages.map((s, i) => (
              <div key={s} title={s} className={`h-1.5 flex-1 rounded-full ${i <= stage ? "bg-blue" : "bg-line"}`} />
            ))}
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <span className="text-[0.7rem] text-muted">Step {stage + 1} of {stages.length} · {flow}</span>
            <select value={flow} onChange={(e) => { setFlow(e.target.value); setStage(1); }} aria-label="Change workflow" className="shrink-0 rounded-md border border-line bg-canvas px-1.5 py-0.5 text-[0.7rem] font-medium text-muted">
              {Object.keys(FLOWS).map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          {!atEnd && isSchedAction && sched && (
            <div className="animate-rise mt-3 rounded-lg border border-line bg-canvas p-2.5">
              <p className="mb-1.5 text-[0.7rem] sm:text-[0.66rem] font-bold uppercase tracking-wide text-faint">Pick a slot and tech</p>
              <div className="flex flex-wrap gap-1.5">
                <select value={schDay} onChange={(e) => setSchDay(Number(e.target.value))} aria-label="Day" className={inputCls}>
                  {DOW.map((d, i) => <option key={d} value={i}>{d}</option>)}
                </select>
                <select value={schTime} onChange={(e) => setSchTime(e.target.value)} aria-label="Time" className={inputCls}>
                  <option value="">Time</option>
                  {SCHED_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={schTech || curTech} onChange={(e) => setSchTech(e.target.value)} aria-label="Tech" className={inputCls}>
                  {TEAM.filter((t) => t.role !== "Dispatch").map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}
                </select>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <button type="button" onClick={() => setActive("schedule")} className="inline-flex items-center gap-1 text-[0.74rem] font-semibold text-blue hover:underline">Open the full schedule <ChevronRight size={12} /></button>
                <button type="button" disabled={!schTime} onClick={() => {
                  const tech = schTech || curTech;
                  addJob(`0:${schDay}`, { time: schTime, title: `${tk.issue} · ${tk.customer}`, tech, duration: "1h", ticket: tk.id });
                  setCurTech(tech);
                  const si = stages.indexOf("Scheduled");
                  if (si >= 0 && si > stage) setStage(si);
                  setSched(false);
                  toast(`Scheduled ${DOW[schDay]} ${schTime} with ${tech}`);
                }} className={`rounded-lg px-3 py-1.5 text-[0.78rem] font-semibold text-white ${schTime ? "bg-blue hover:opacity-90" : "cursor-not-allowed bg-line"}`}>Add to schedule</button>
              </div>
            </div>
          )}
        </div>

        {/* tasks with assignees */}
        <div className="mt-4 border-t border-line pt-3">
          <p className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">Tasks</p>
          <div className="mt-2 space-y-1.5">
            {curSubs.map((st) => (
              <div key={st.id} className="flex items-center gap-2">
                <button type="button" aria-label={`Toggle done: ${st.label}`} onClick={() => setCurSubs(curSubs.map((x) => (x.id === st.id ? { ...x, done: !x.done } : x)))} className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${st.done ? "border-green bg-green text-white" : "border-line"}`}>
                  {st.done && <Check size={11} />}
                </button>
                <span className={`min-w-0 flex-1 truncate text-[0.8rem] ${st.done ? "text-faint line-through" : "text-ink"}`}>{st.label}</span>
                <select value={st.assignee} onChange={(e) => setCurSubs(curSubs.map((x) => (x.id === st.id ? { ...x, assignee: e.target.value } : x)))} aria-label="Assignee" className={`${inputCls} shrink-0 py-1`}>
                  {TEAM.map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input value={nt} onChange={(e) => setNt(e.target.value)} placeholder="Add a task" className={`${inputCls} min-w-0 flex-1`} />
            <button type="button" onClick={() => { if (nt.trim()) { setCurSubs([...curSubs, { id: Date.now(), label: nt.trim(), assignee: TEAM[0].name, done: false }]); setNt(""); toast("Task added"); } }} className="shrink-0 rounded-lg bg-blue px-2.5 py-1.5 text-[0.76rem] font-semibold text-white hover:opacity-90">Add</button>
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
            {curNotes.map((note, i) => (
              <p key={i} className="rounded-md bg-canvas px-2.5 py-1.5 text-[0.78rem] text-ink">{note}</p>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input value={n} onChange={(e) => setN(e.target.value)} placeholder="Add a note for the tech" className={`${inputCls} flex-1`} />
            <button type="button" onClick={() => { if (n.trim()) { addCurNote(n.trim()); setN(""); } }} className="shrink-0 rounded-lg bg-blue px-2.5 py-1.5 text-[0.76rem] font-semibold text-white hover:opacity-90">Add</button>
          </div>
        </div>

      </div>
    </div>
  );
}

function TagRow({ tags, setTags }: { tags: string[]; setTags: (t: string[]) => void }) {
  const [adding, setAdding] = useState(false);
  const [val, setVal] = useState("");
  const add = () => { const v = val.trim(); if (v && !tags.includes(v)) setTags([...tags, v]); setVal(""); setAdding(false); };
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-ink/70">
          {t}
          <button type="button" aria-label={`Remove ${t}`} onClick={() => setTags(tags.filter((x) => x !== t))} className="text-faint transition-colors hover:text-warning"><X size={10} /></button>
        </span>
      ))}
      {adding ? (
        <input autoFocus value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") add(); if (e.key === "Escape") { setAdding(false); setVal(""); } }} onBlur={add} placeholder="New tag" aria-label="New tag" className={`${inputCls} w-24 py-0.5`} />
      ) : (
        <button type="button" onClick={() => setAdding(true)} className="inline-flex items-center gap-0.5 rounded-md border border-dashed border-line px-2 py-0.5 text-[0.7rem] font-medium text-faint transition-colors hover:border-blue hover:text-blue">
          <Tag size={11} /> Tag
        </button>
      )}
    </div>
  );
}

function ScheduleView({
  day, setDay, weekOffset, setWeekOffset, extra, addJob, openTicket,
}: {
  day: number; setDay: (d: number) => void; weekOffset: number; setWeekOffset: (n: number) => void;
  extra: Record<string, Job[]>; addJob: (key: string, job: Job) => void; openTicket: (id: string | null) => void;
}) {
  const demo = useDemo();
  const TEAM = demo.team;
  const DAY_JOBS = demo.dayJobs;
  const TICKETS = demo.tickets;
  const TECH_DOT = demo.techDot;
  const SCHED_TECHS = TEAM.filter((x) => x.role !== "Dispatch").map((x) => x.name);
  const [tech, setTech] = useState("All");
  const [reassign, setReassign] = useState<Record<string, string>>({});
  const [reassignKey, setReassignKey] = useState<string | null>(null);
  const [nt, setNt] = useState("");
  const [ntitle, setNtitle] = useState("");
  const [ntech, setNtech] = useState(SCHED_TECHS[0]);
  const [ndur, setNdur] = useState("1h");
  const TIME_SLOTS = (() => {
    const out: string[] = [];
    for (let h = 6; h <= 20; h++) {
      for (const min of [0, 15, 30, 45]) {
        if (h === 20 && min > 0) break;
        const ampm = h < 12 ? "AM" : "PM";
        const hr = h % 12 === 0 ? 12 : h % 12;
        out.push(`${hr}:${String(min).padStart(2, "0")} ${ampm}`);
      }
    }
    return out;
  })();
  const key = `${weekOffset}:${day}`;
  const base = weekOffset === 0 ? DAY_JOBS[day] ?? [] : [];
  const allJobs = [...base, ...(extra[key] ?? [])];
  const jobKeyOf = (j: Job) => `${key}|${j.time}|${j.title}`;
  const techOf = (j: Job) => reassign[jobKeyOf(j)] ?? j.tech;
  const jobs = tech === "All" ? allJobs : allJobs.filter((j) => techOf(j) === tech);
  const head = dateFor(weekOffset, 0);
  const addDt = dateFor(weekOffset, day);
  const suggestSlot = () => {
    const taken = new Set(allJobs.map((j) => j.time));
    const free = TIME_SLOTS.find((t) => !taken.has(t)) ?? TIME_SLOTS[0];
    setNt(free);
    toast(`${free} is the first opening`);
  };
  const addJobNow = () => {
    if (!nt) return;
    addJob(key, { time: nt, title: ntitle.trim() || "New job", tech: ntech, duration: ndur });
    setNt("");
    setNtitle("");
    toast(`Booked ${addDt.dow} ${nt}${ntech !== "Unassigned" ? ` with ${ntech}` : ""}`);
  };

  return (
    <div>
      <ModuleHeader title="Schedule" sub="Book the crew, today or weeks out" action={{ label: "New job", onClick: () => { addJob(key, { time: "12:00 PM", title: "New job", tech: ntech, duration: ndur }); toast("Job added to the schedule"); } }} />
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
            const linked = !!j.ticket && TICKETS.some((t) => t.id === j.ticket);
            const jk = jobKeyOf(j);
            const jt = techOf(j);
            const reassigning = reassignKey === jk;
            return (
              <div key={`${j.time}-${i}`} className={`rounded-lg border px-3 py-2.5 ${j.hot ? "border-green/30 bg-green/[0.07]" : "border-line bg-canvas"}`}>
                <div className="flex items-center gap-3">
                  <span className="w-[4.75rem] shrink-0 text-[0.78rem] font-bold text-navy">{j.time}</span>
                  {linked ? (
                    <button type="button" onClick={() => openTicket(j.ticket!)} className="min-w-0 flex-1 text-left">
                      <p className="truncate text-[0.82rem] font-semibold text-navy transition-colors hover:text-blue">{j.title}</p>
                    </button>
                  ) : (
                    <p className="min-w-0 flex-1 truncate text-[0.82rem] font-semibold text-navy">{j.title}</p>
                  )}
                  {j.hot && <CheckCircle2 size={16} className="shrink-0 text-green-600" />}
                  {linked && <ChevronRight size={15} className="shrink-0 text-faint" />}
                </div>
                <div className="mt-1 pl-[4.75rem]">
                  <button type="button" onClick={() => setReassignKey(reassigning ? null : jk)} className="inline-flex items-center gap-1.5 rounded-full bg-canvas-2 px-2 py-0.5 text-[0.72rem] font-medium text-muted transition-colors hover:text-navy">
                    <span className={`h-1.5 w-1.5 rounded-full ${TECH_DOT[jt] ?? "bg-line"}`} />
                    {jt}{j.duration ? ` · ${j.duration}` : ""}
                    <Pencil size={10} className="text-faint" />
                  </button>
                  {reassigning && (
                    <div className="animate-rise mt-1.5 w-44 rounded-lg border border-line bg-canvas p-1.5">
                      <p className="px-1 pb-1 text-[0.7rem] sm:text-[0.64rem] font-bold uppercase tracking-wide text-faint">Reassign to</p>
                      {SCHED_TECHS.map((tn) => (
                        <button key={tn} type="button" onClick={() => { setReassign({ ...reassign, [jk]: tn }); setReassignKey(null); toast(`Reassigned to ${tn}`); }} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[0.8rem] text-ink hover:bg-canvas-2">
                          <span className={`h-1.5 w-1.5 rounded-full ${TECH_DOT[tn] ?? "bg-line"}`} />{tn}
                          {tn === jt && <Check size={12} className="ml-auto text-blue" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border border-line bg-gradient-to-b from-canvas to-transparent p-3.5">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <p className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-faint"><Plus size={12} className="text-blue" /> Add a job</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-canvas-2 px-2 py-0.5 text-[0.7rem] sm:text-[0.68rem] font-semibold text-muted"><CalendarDays size={11} /> {addDt.dow} · {MONTHS[addDt.m].slice(0, 3)} {addDt.d}</span>
          </div>

          <div className="relative">
            <Ticket size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
            <input value={ntitle} onChange={(e) => setNtitle(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addJobNow(); }} placeholder={demo.schedulePlaceholder} className={`${inputCls} w-full py-2 pl-9`} />
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2">
            <div>
              <label className="mb-1 block text-[0.7rem] sm:text-[0.62rem] font-bold uppercase tracking-wide text-faint">Time</label>
              <div className="relative">
                <Clock size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-faint" />
                <select value={nt} onChange={(e) => setNt(e.target.value)} aria-label="Time" className={`${inputCls} w-full pl-7 ${nt ? "text-ink" : "text-faint"}`}>
                  <option value="">Pick</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[0.7rem] sm:text-[0.62rem] font-bold uppercase tracking-wide text-faint">Length</label>
              <select value={ndur} onChange={(e) => setNdur(e.target.value)} aria-label="Duration" className={`${inputCls} w-full`}>{["30m", "1h", "2h", "Half day"].map((d) => <option key={d} value={d}>{d}</option>)}</select>
            </div>
            <div>
              <label className="mb-1 block text-[0.7rem] sm:text-[0.62rem] font-bold uppercase tracking-wide text-faint">Assign to</label>
              <select value={ntech} onChange={(e) => setNtech(e.target.value)} aria-label="Tech" className={`${inputCls} w-full`}>{[...SCHED_TECHS, "Unassigned"].map((tn) => <option key={tn} value={tn}>{tn}</option>)}</select>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-2">
            <button type="button" onClick={suggestSlot} className="inline-flex items-center gap-1.5 rounded-lg border border-blue/30 bg-blue/[0.06] px-2.5 py-1.5 text-[0.74rem] font-semibold text-blue transition-colors hover:bg-blue/10"><Sparkles size={13} /> Next open slot</button>
            <button type="button" disabled={!nt} onClick={addJobNow} className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-[0.8rem] font-bold text-white transition-opacity ${nt ? "bg-blue hover:opacity-90" : "cursor-not-allowed bg-line"}`}><Plus size={15} /> Add job</button>
          </div>
        </div>

        <p className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] text-faint"><Calendar size={12} /> Synced two-way with Google and Microsoft calendars</p>
      </div>
    </div>
  );
}

function TeamView({ assignedTech, setActive }: { assignedTech: string; setActive: (m: ModId) => void }) {
  const demo = useDemo();
  const TEAM = demo.team;
  const DAY_JOBS = demo.dayJobs;
  const JOB = { ticket: demo.primaryTicket };
  const [sel, setSel] = useState<string | null>(null);
  const [newMembers, setNewMembers] = useState<typeof TEAM>([]);
  const allTeam = [...TEAM, ...newMembers];
  const t = allTeam.find((x) => x.name === sel);
  const addMember = () => {
    const n = newMembers.length + 1;
    setNewMembers([...newMembers, { name: `New teammate ${n}`, role: "Technician", dot: "bg-green", status: "Available", jobs: "0 jobs today", skills: ["New"], phone: "(555) 000-0000" }]);
    toast("Teammate added");
  };

  if (!t) {
    return (
      <div>
        <ModuleHeader title="Team" sub={`${allTeam.length} techs · ${Object.values(DAY_JOBS).flat().length} jobs this week`} action={{ label: "Add teammate", onClick: addMember }} />
        <div className="space-y-2">
          {allTeam.map((m) => (
            <button key={m.name} type="button" onClick={() => setSel(m.name)} className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors hover:border-blue ${m.name === assignedTech ? "border-blue/30 bg-blue/[0.04]" : "border-line bg-surface"}`}>
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-[0.7rem] font-bold text-white">
                {m.name.split(" ").map((p) => p[0]).join("")}
                <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface ${m.dot}`} />
              </span>
              <div className="min-w-0">
                <p className="text-[0.85rem] font-semibold text-navy">{m.name}{m.name === assignedTech && <span className="ml-1.5 text-[0.7rem] sm:text-[0.68rem] font-bold text-blue">· on #{JOB.ticket}</span>}</p>
                <p className="text-[0.72rem] text-muted">{m.role}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-[0.74rem] font-semibold text-navy">{m.status}</p>
                <p className="text-[0.7rem] sm:text-[0.68rem] text-faint">{m.jobs}</p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-faint" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  const todays = (DAY_JOBS[2] ?? []).filter((j) => j.tech === t.name);
  return (
    <div>
      <ModuleHeader title="Team" sub={t.name} />
      <button type="button" onClick={() => setSel(null)} className="mb-3 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue hover:underline"><ChevronLeft size={14} /> All techs</button>
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex items-center gap-3">
          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">
            {t.name.split(" ").map((p) => p[0]).join("")}
            <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface ${t.dot}`} />
          </span>
          <div className="min-w-0">
            <p className="text-[0.95rem] font-bold text-navy">{t.name}</p>
            <p className="text-[0.76rem] text-muted">{t.role} · {t.status}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {t.skills.map((s) => (
            <span key={s} className="rounded-md border border-line bg-canvas px-2 py-0.5 text-[0.7rem] font-medium text-ink/70">{s}</span>
          ))}
        </div>

        <a href={`tel:${t.phone.replace(/[^0-9]/g, "")}`} className="mt-3 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-blue hover:underline"><PhoneCall size={13} /> {t.phone}</a>

        <div className="mt-4 border-t border-line pt-3">
          <p className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">Today, {todays.length} {todays.length === 1 ? "job" : "jobs"}</p>
          <div className="mt-2 space-y-1.5">
            {todays.length === 0 && <p className="py-2 text-center text-[0.8rem] text-faint">No jobs scheduled today.</p>}
            {todays.map((j, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-line bg-canvas px-3 py-2">
                <span className="w-[4.75rem] shrink-0 text-[0.78rem] font-bold text-navy">{j.time}</span>
                <p className="min-w-0 flex-1 truncate text-[0.82rem] font-semibold text-navy">{j.title}</p>
                {j.duration && <span className="shrink-0 text-[0.72rem] text-muted">{j.duration}</span>}
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setActive("schedule")} className="mt-2 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue hover:underline">View on the schedule <ChevronRight size={13} /></button>
        </div>
      </div>
    </div>
  );
}

function CatalogView({ catalog, setCatalog }: { catalog: Item[]; setCatalog: (c: Item[]) => void }) {
  const [edit, setEdit] = useState(false);
  const [filter, setFilter] = useState<"All" | "Service" | "Part">("All");
  const update = (i: number, field: "name" | "price", v: string) =>
    setCatalog(catalog.map((it, idx) => (idx === i ? { ...it, [field]: field === "price" ? Number(v) || 0 : v } : it)));
  const toggleType = (i: number) => setCatalog(catalog.map((it, idx) => (idx === i ? { ...it, type: it.type === "Service" ? "Part" : "Service" } : it)));
  const add = () => setCatalog([...catalog, { id: Date.now(), name: "New item", type: "Service", price: 0, tasks: [] }]);
  const remove = (i: number) => setCatalog(catalog.filter((_, idx) => idx !== i));
  const updTask = (i: number, ti: number, v: string) => setCatalog(catalog.map((it, idx) => (idx === i ? { ...it, tasks: (it.tasks ?? []).map((t, j) => (j === ti ? v : t)) } : it)));
  const addTask = (i: number) => setCatalog(catalog.map((it, idx) => (idx === i ? { ...it, tasks: [...(it.tasks ?? []), "New step"] } : it)));
  const removeTask = (i: number, ti: number) => setCatalog(catalog.map((it, idx) => (idx === i ? { ...it, tasks: (it.tasks ?? []).filter((_, j) => j !== ti) } : it)));

  return (
    <div>
      <ModuleHeader title="Catalog" sub="Your services and parts, priced once" action={{ label: "New item", onClick: () => { add(); setEdit(true); toast("Item added"); } }} />
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">{catalog.length} items</span>
          <button type="button" onClick={() => setEdit(!edit)} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.7rem] font-semibold ${edit ? "bg-blue/10 text-blue" : "text-muted hover:text-blue"}`}><Pencil size={11} /> {edit ? "Done" : "Edit"}</button>
        </div>
        <div className="mb-2 flex gap-1.5">
          {(["All", "Service", "Part"] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-full px-2.5 py-1 text-[0.72rem] font-semibold transition-colors ${filter === f ? "bg-blue text-white" : "bg-canvas-2 text-ink/70"}`}>{f === "All" ? "All" : f === "Service" ? "Services" : "Parts"}</button>
          ))}
        </div>
        <div className="space-y-1.5">
          {catalog.map((it, i) => {
            if (filter !== "All" && it.type !== filter) return null;
            return (
            <div key={it.id} className="rounded-lg bg-canvas px-2.5 py-1.5">
              <div className="flex items-center gap-2">
                {edit && (
                  <button type="button" aria-label={`Remove ${it.name}`} onClick={() => remove(i)} className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-warning/15 text-warning"><X size={11} /></button>
                )}
                {edit ? (
                  <button type="button" onClick={() => toggleType(i)} aria-label="Toggle type" className={`shrink-0 rounded px-1.5 py-0.5 text-[0.6rem] font-bold uppercase ${it.type === "Service" ? "bg-blue/10 text-blue" : "bg-green/10 text-green-600"}`}>{it.type === "Service" ? "Svc" : "Part"}</button>
                ) : (
                  <span className={`shrink-0 rounded px-1.5 py-0.5 text-[0.6rem] font-bold uppercase ${it.type === "Service" ? "bg-blue/10 text-blue" : "bg-green/10 text-green-600"}`}>{it.type === "Service" ? "Svc" : "Part"}</span>
                )}
                {edit ? (
                  <input value={it.name} onChange={(e) => update(i, "name", e.target.value)} className={`${inputCls} flex-1`} />
                ) : (
                  <span className="min-w-0 flex-1 truncate text-[0.82rem] text-ink">{it.name}</span>
                )}
                {edit ? (
                  <span className="inline-flex items-center gap-0.5"><span className="text-[0.8rem] text-faint">$</span><input type="number" value={it.price} onChange={(e) => update(i, "price", e.target.value)} className={`${numCls} w-16 text-right`} /></span>
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
                          <button type="button" aria-label="Remove step" onClick={() => removeTask(i, ti)} className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-warning/15 text-warning"><X size={9} /></button>
                          <input value={t} onChange={(e) => updTask(i, ti, e.target.value)} className={`${inputCls} flex-1`} />
                        </div>
                      ))}
                      <button type="button" onClick={() => addTask(i)} className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-blue hover:underline"><Plus size={11} /> Add step</button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {it.tasks!.map((t, ti) => (
                        <span key={ti} className="inline-flex items-center gap-1 rounded bg-surface px-1.5 py-0.5 text-[0.7rem] sm:text-[0.66rem] text-muted"><Check size={9} className="text-faint" /> {t}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            );
          })}
        </div>
        {edit && (
          <button type="button" onClick={add} className="mt-2 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue hover:underline"><Plus size={12} /> Add item</button>
        )}
      </div>
    </div>
  );
}

function BillingView({
  tab, setTab, quote, setQuote, invoice, setInvoice, mile, setMile, linesBy, setLinesBy, editBill, setEditBill, catalog, setCatalog, setSubtasks, assignedTech, ticketSel,
}: {
  tab: "quote" | "invoice" | "milestones"; setTab: (t: "quote" | "invoice" | "milestones") => void;
  quote: "draft" | "sent" | "approved"; setQuote: (s: "draft" | "sent" | "approved") => void;
  invoice: "draft" | "sent" | "paid"; setInvoice: (s: "draft" | "sent" | "paid") => void;
  mile: "draft" | "sent"; setMile: (s: "draft" | "sent") => void;
  linesBy: Record<string, Line[]>; setLinesBy: (m: Record<string, Line[]>) => void; editBill: boolean; setEditBill: (b: boolean) => void; catalog: Item[]; setCatalog: (c: Item[]) => void;
  setSubtasks: SubtaskSetter; assignedTech: string; ticketSel: string | null;
}) {
  const demo = useDemo();
  const TICKETS = demo.tickets;
  const CUSTOMERS = demo.customers;
  const billTicket = TICKETS.find((t) => t.id === ticketSel) ?? TICKETS[0];
  const lines = linesBy[billTicket.id] ?? [];
  const setLines = (l: Line[]) => setLinesBy({ ...linesBy, [billTicket.id]: l });
  const [pick, setPick] = useState(false);
  const [pickQ, setPickQ] = useState("");
  const [pdf, setPdf] = useState(false);
  const [discPct, setDiscPct] = useState(0);
  const [taxPct, setTaxPct] = useState(0);
  const [showAdj, setShowAdj] = useState(false);
  const [payMethod, setPayMethod] = useState("Card");
  const [deposit, setDeposit] = useState(0);
  const [editMile, setEditMile] = useState(false);
  const [miles, setMiles] = useState<{ label: string; pct: number }[]>([
    { label: "Deposit", pct: 30 },
    { label: "On completion", pct: 70 },
  ]);
  const [mileItem, setMileItem] = useState(demo.mileItem);
  const [mileBase, setMileBase] = useState(demo.mileBase);
  const pctTotal = miles.reduce((n, m) => n + m.pct, 0);
  const updMile = (i: number, field: "label" | "pct", v: string) =>
    setMiles(miles.map((m, idx) => (idx === i ? { ...m, [field]: field === "pct" ? Number(v) || 0 : v } : m)));
  const addMile = () => setMiles([...miles, { label: "New milestone", pct: 0 }]);
  const removeMile = (i: number) => setMiles(miles.filter((_, idx) => idx !== i));
  const ar = CUSTOMERS.reduce((n, c) => n + c.balance, 0);
  const subtotal = lines.reduce((n, l) => n + l.qty * l.price, 0);
  const discAmt = Math.round((subtotal * discPct) / 100);
  const taxAmt = Math.round(((subtotal - discAmt) * taxPct) / 100);
  const total = subtotal - discAmt + taxAmt;
  const due = Math.max(total - deposit, 0);
  const PAY_LABEL: Record<string, string> = { Card: "Visa ending 4242", ACH: "Bank transfer (ACH)", Cash: "Cash", Check: "Check #1042" };
  const update = (i: number, field: "label" | "qty" | "price", v: string) =>
    setLines(lines.map((l, idx) => (idx === i ? { ...l, [field]: field === "label" ? v : Number(v) || 0 } : l)));
  const addCustom = () => setLines([...lines, { label: "", qty: 1, price: 0 }]);
  const saveToCatalog = (l: Line) => {
    const name = l.label.trim();
    if (!name) return;
    setCatalog([...catalog, { id: Date.now(), name, type: "Service", price: l.price, tasks: [] }]);
    toast(`${name} saved to catalog`);
  };
  const addItem = (it: Item) => {
    setLines([...lines, { label: it.name, qty: 1, price: it.price }]);
    if (it.type === "Service" && it.tasks && it.tasks.length > 0) {
      setSubtasks((xs) => [...xs, ...it.tasks!.map((label, k) => ({ id: Date.now() + k, label, assignee: assignedTech, done: false }))]);
      toast(`${it.tasks.length} tasks from ${it.name} added to the job, assigned to ${assignedTech}`);
    }
    setPick(false);
  };
  const removeLine = (i: number) => setLines(lines.filter((_, idx) => idx !== i));

  const TABS: { id: "quote" | "invoice" | "milestones"; label: string; icon: LucideIcon }[] = [
    { id: "quote", label: "Quote", icon: FileText },
    { id: "invoice", label: "Invoice", icon: Receipt },
    { id: "milestones", label: "Milestones", icon: Flag },
  ];
  const editable = (tab === "quote" && quote === "draft") || (tab === "invoice" && invoice === "draft");

  return (
    <div>
      <ModuleHeader title="Billing" sub={`Job #${billTicket.id} · ${billTicket.customer}`} action={{ label: "New invoice", onClick: () => { setTab("invoice"); setInvoice("draft"); setEditBill(true); toast("New invoice drafted"); } }} />

      <div className="mb-3 flex items-center gap-3 rounded-xl border border-warning/25 bg-warning/[0.06] px-3.5 py-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-warning/15 text-warning"><DollarSign size={16} /></span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.82rem] font-bold text-navy">${ar.toLocaleString()} outstanding</p>
          <p className="truncate text-[0.72rem] text-muted">{demo.billingAlertNote}</p>
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
                  <div key={i} className="rounded-lg border border-line bg-canvas/60 p-2">
                    <div className="flex items-center gap-1.5">
                      <input value={l.label} onChange={(e) => update(i, "label", e.target.value)} placeholder="Item or service" className={`${inputCls} min-w-0 flex-1`} />
                      <button type="button" onClick={() => removeLine(i)} aria-label="Remove line" className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-warning/15 text-warning"><X size={12} /></button>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[0.78rem] text-faint">
                      <span>Qty</span>
                      <input type="number" value={l.qty} onChange={(e) => update(i, "qty", e.target.value)} aria-label="Quantity" className={`${numCls} w-12 text-center`} />
                      <span>×</span>
                      <span>$</span>
                      <input type="number" value={l.price} onChange={(e) => update(i, "price", e.target.value)} aria-label="Price" className={`${numCls} w-16 text-right`} />
                      <span className="ml-auto font-semibold text-navy">${(l.qty * l.price).toLocaleString()}</span>
                    </div>
                    {l.label.trim() && !catalog.some((c) => c.name.toLowerCase() === l.label.trim().toLowerCase()) && (
                      <button type="button" onClick={() => saveToCatalog(l)} className="mt-1.5 inline-flex items-center gap-1 text-[0.72rem] font-semibold text-blue hover:underline"><Package size={11} /> Save to catalog</button>
                    )}
                  </div>
                ) : (
                  <div key={i} className="flex items-start justify-between gap-2 text-[0.85rem]">
                    <div className="min-w-0">
                      <p className="truncate text-ink">{l.label || "Untitled"}</p>
                      <p className="text-[0.72rem] text-faint">Qty {l.qty} × ${l.price.toLocaleString()}</p>
                    </div>
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
                <div className="animate-rise mt-1 rounded-lg border border-line bg-canvas p-1.5">
                  <div className="relative mb-1.5">
                    <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-faint" />
                    <input value={pickQ} onChange={(e) => setPickQ(e.target.value)} placeholder="Search catalog" aria-label="Search catalog" className={`${inputCls} w-full pl-7`} />
                  </div>
                  <div className="max-h-32 overflow-y-auto">
                    {catalog.filter((it) => it.name.toLowerCase().includes(pickQ.toLowerCase())).map((it) => (
                      <button key={it.id} type="button" onClick={() => addItem(it)} className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[0.78rem] text-ink hover:bg-canvas-2">
                        <span className="truncate">{it.name}{it.type === "Service" && it.tasks && it.tasks.length > 0 ? <span className="ml-1 text-[0.7rem] sm:text-[0.66rem] text-faint">· {it.tasks.length} steps</span> : ""}</span>
                        <span className="ml-2 shrink-0 font-semibold text-navy">${it.price.toLocaleString()}</span>
                      </button>
                    ))}
                    {catalog.filter((it) => it.name.toLowerCase().includes(pickQ.toLowerCase())).length === 0 && (
                      <p className="px-2 py-2 text-center text-[0.74rem] text-faint">No matches</p>
                    )}
                  </div>
                </div>
              )}

              {discPct > 0 || taxPct > 0 || deposit > 0 ? (
                <div className="mt-2 space-y-1 border-t border-line pt-2 text-[0.82rem]">
                  <div className="flex items-center justify-between text-muted"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                  {discPct > 0 && <div className="flex items-center justify-between text-green-600"><span>Discount {discPct}%</span><span>-${discAmt.toLocaleString()}</span></div>}
                  {taxPct > 0 && <div className="flex items-center justify-between text-muted"><span>Tax {taxPct}%</span><span>+${taxAmt.toLocaleString()}</span></div>}
                  <div className="flex items-center justify-between border-t border-line pt-1 text-[0.95rem]"><span className="font-bold text-navy">Total</span><span className="font-extrabold text-navy">${total.toLocaleString()}</span></div>
                  {deposit > 0 && (
                    <>
                      <div className="flex items-center justify-between text-green-600"><span>Deposit paid</span><span>-${deposit.toLocaleString()}</span></div>
                      <div className="flex items-center justify-between font-bold text-navy"><span>Balance due</span><span>${due.toLocaleString()}</span></div>
                    </>
                  )}
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-between border-t border-line pt-2 text-[0.95rem]">
                  <span className="font-bold text-navy">Total</span>
                  <span className="font-extrabold text-navy">${total.toLocaleString()}</span>
                </div>
              )}

              {editable && (
                <div className="mt-2">
                  <button type="button" onClick={() => setShowAdj(!showAdj)} className="inline-flex items-center gap-1 text-[0.74rem] font-semibold text-blue hover:underline"><Pencil size={11} /> Discount &amp; tax</button>
                  {showAdj && (
                    <div className="animate-rise mt-1.5 space-y-1.5 rounded-lg border border-line bg-canvas p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[0.74rem] font-semibold text-muted">Discount</span>
                        <div className="flex gap-1">
                          {[0, 5, 10, 15].map((p) => (
                            <button key={p} type="button" onClick={() => setDiscPct(p)} className={`rounded-md px-2 py-0.5 text-[0.72rem] font-semibold transition-colors ${discPct === p ? "bg-blue text-white" : "bg-canvas-2 text-ink/70"}`}>{p === 0 ? "None" : `${p}%`}</button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[0.74rem] font-semibold text-muted">Tax</span>
                        <div className="flex gap-1">
                          {[0, 7.5, 8.5].map((p) => (
                            <button key={p} type="button" onClick={() => setTaxPct(p)} className={`rounded-md px-2 py-0.5 text-[0.72rem] font-semibold transition-colors ${taxPct === p ? "bg-blue text-white" : "bg-canvas-2 text-ink/70"}`}>{p === 0 ? "None" : `${p}%`}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {tab === "invoice" && pdf && (
              <div className="animate-rise mt-3 rounded-lg border border-line bg-white p-4">
                <div className="flex items-center justify-between border-b border-line pb-2">
                  <span className="text-sm font-extrabold tracking-tight text-navy">INVOICE</span>
                  <span className="text-[0.7rem] text-muted">#{billTicket.id}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[0.7rem]">
                  <div><p className="font-bold uppercase text-faint">From</p><p className="text-navy">{demo.company}</p></div>
                  <div><p className="font-bold uppercase text-faint">Bill to</p><p className="text-navy">{billTicket.customer}</p></div>
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
                <Banner title="Quote sent" body={`Texted to ${billTicket.customer}. One tap to approve.`} />
                <button type="button" onClick={() => setQuote("approved")} className="mt-2 w-full rounded-lg border border-green/30 bg-green/10 px-3 py-2 text-[0.82rem] font-semibold text-green-600">Mark approved</button>
              </div>
            )}
            {tab === "quote" && quote === "approved" && (
              <div className="animate-rise mt-4 flex items-center justify-center gap-2 rounded-lg border border-green/30 bg-green/[0.09] px-3 py-3 text-[0.85rem] font-bold text-green-600"><CheckCircle2 size={17} /> Approved, ready to invoice</div>
            )}

            {tab === "invoice" && invoice === "draft" && <SendBtn label="Send invoice + pay link" onClick={() => { setInvoice("sent"); toast("Invoice sent with pay link"); }} />}
            {tab === "invoice" && invoice === "sent" && (
              <div className="animate-rise mt-4">
                <Banner title="Invoice sent" body={`Pay link texted to ${billTicket.customer}. They can pay by card or bank.`} />
                <div className="mt-3 rounded-lg border border-line bg-canvas p-2.5">
                  <p className="mb-1.5 text-[0.7rem] sm:text-[0.66rem] font-bold uppercase tracking-wide text-faint">How did they pay?</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Card", "ACH", "Cash", "Check"].map((m) => (
                      <button key={m} type="button" onClick={() => setPayMethod(m)} className={`rounded-full px-2.5 py-1 text-[0.74rem] font-semibold transition-colors ${payMethod === m ? "bg-blue text-white" : "bg-canvas-2 text-ink/70"}`}>{m}</button>
                    ))}
                  </div>
                  {deposit > 0 && <p className="mt-2 text-[0.72rem] font-medium text-green-600">Deposit of ${deposit.toLocaleString()} collected · ${due.toLocaleString()} still due</p>}
                  <div className="mt-2.5 flex gap-1.5">
                    {deposit === 0 && (
                      <button type="button" onClick={() => { setDeposit(Math.round(total * 0.3)); toast(`30% deposit collected by ${payMethod}`); }} className="flex-1 rounded-lg border border-blue/30 bg-blue/[0.06] px-3 py-2 text-[0.78rem] font-semibold text-blue transition-colors hover:bg-blue/10">Take 30% deposit</button>
                    )}
                    <button type="button" onClick={() => { setInvoice("paid"); toast(`Marked paid by ${payMethod}`); }} className="flex-1 rounded-lg border border-green/30 bg-green/10 px-3 py-2 text-[0.82rem] font-semibold text-green-600">Mark paid in full</button>
                  </div>
                </div>
              </div>
            )}
            {tab === "invoice" && invoice === "paid" && (
              <div className="animate-rise mt-4 rounded-xl border border-green/30 bg-green/[0.05] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-bold text-green-600"><CheckCircle2 size={16} /> Paid in full</span>
                  <span className="rounded-full border border-green/30 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-green-600">Receipt</span>
                </div>
                <div className="mt-2 space-y-0.5 text-[0.74rem] text-muted">
                  <div className="flex justify-between"><span>Invoice</span><span className="font-semibold text-navy">#{billTicket.id}</span></div>
                  <div className="flex justify-between"><span>Paid by</span><span className="font-semibold text-navy">{PAY_LABEL[payMethod]}</span></div>
                  {deposit > 0 && <div className="flex justify-between"><span>Deposit (prior)</span><span className="font-semibold text-navy">${deposit.toLocaleString()}</span></div>}
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
            <div className="mb-2 flex items-center justify-between gap-2">
              {editMile ? (
                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                  <input value={mileItem} onChange={(e) => setMileItem(e.target.value)} aria-label="Milestone item" className={`${inputCls} min-w-0 flex-1`} />
                  <span className="text-[0.78rem] text-faint">$</span>
                  <input type="number" value={mileBase} onChange={(e) => setMileBase(Number(e.target.value) || 0)} aria-label="Milestone total" className={`${numCls} w-20 text-right`} />
                </div>
              ) : (
                <p className="min-w-0 truncate text-[0.78rem] text-muted">{mileItem} · ${mileBase.toLocaleString()}</p>
              )}
              <button type="button" onClick={() => setEditMile(!editMile)} className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[0.7rem] font-semibold ${editMile ? "bg-blue/10 text-blue" : "text-muted hover:text-blue"}`}><Pencil size={11} /> {editMile ? "Done" : "Edit"}</button>
            </div>
            <div className="space-y-1.5">
              {miles.map((m, i) => (
                <div key={i} className="flex items-center gap-1.5 rounded-lg bg-canvas px-2.5 py-2 text-[0.82rem]">
                  <Flag size={13} className="shrink-0 text-blue" />
                  {editMile ? (
                    <>
                      <input value={m.label} onChange={(e) => updMile(i, "label", e.target.value)} className={`${inputCls} min-w-0 flex-1`} />
                      <input type="number" value={m.pct} onChange={(e) => updMile(i, "pct", e.target.value)} aria-label="Percent" className={`${numCls} w-12 text-right`} />
                      <span className="shrink-0 text-faint">%</span>
                      <button type="button" aria-label={`Remove milestone ${m.label}`} onClick={() => removeMile(i)} className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-warning/15 text-warning"><X size={11} /></button>
                    </>
                  ) : (
                    <>
                      <span className="min-w-0 flex-1 truncate text-ink">{m.label} <span className="text-faint">· {m.pct}%</span></span>
                      <span className="shrink-0 font-semibold text-navy">${Math.round((mileBase * m.pct) / 100).toLocaleString()}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
            {editMile && (
              <div className="mt-2 flex items-center justify-between">
                <button type="button" onClick={addMile} className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue hover:underline"><Plus size={12} /> Add milestone</button>
                <span className={`text-[0.72rem] font-bold ${pctTotal === 100 ? "text-green-600" : "text-warning"}`}>{pctTotal}% allocated</span>
              </div>
            )}
            {mile === "draft" ? (
              <SendBtn label="Send milestone schedule" onClick={() => setMile("sent")} />
            ) : (
              <div className="animate-rise mt-4"><Banner title="Milestones sent" body={`Deposit link texted to ${billTicket.customer}. The rest bills on completion.`} /></div>
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

function MessagesView({ msgs, setMsgs }: { msgs: Msg[]; setMsgs: (m: Msg[]) => void }) {
  const demo = useDemo();
  const TEMPLATES = demo.messageTemplates;
  const [others, setOthers] = useState<Thread[]>(demo.messageThreads);
  const [sel, setSel] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const mariaThread: Thread = { id: "maria", name: demo.primaryCustomer, msgs };
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
        <ModuleHeader title="Messages" sub={`${allThreads.length} conversations`} action={{ label: "New message", onClick: () => toast("New conversation started") }} />
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
                {t.unread ? <span className="grid h-5 min-w-[1.25rem] shrink-0 place-items-center rounded-full bg-blue px-1 text-[0.7rem] sm:text-[0.66rem] font-bold text-white">{t.unread}</span> : <ChevronRight size={16} className="shrink-0 text-faint" />}
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

function TasksView({ tasks, setTasks, setActive }: { tasks: Record<number, TaskState>; setTasks: (t: Record<number, TaskState>) => void; setActive: (m: ModId) => void }) {
  const demo = useDemo();
  const TASKS = demo.tasks;
  const TEAM = demo.team;
  const [confirming, setConfirming] = useState<number | null>(null);
  const [choices, setChoices] = useState<Record<number, string>>({});
  const [newTasks, setNewTasks] = useState<{ id: number; title: string }[]>([]);
  const [assignees, setAssignees] = useState<Record<number, string>>({});
  const set = (id: number, s: TaskState) => setTasks({ ...tasks, [id]: s });
  const choiceFor = (it: TaskItem) => choices[it.id] ?? it.options[0];
  const who = (id: number) => assignees[id] ?? TEAM[0].name;
  return (
    <div>
      <ModuleHeader title="Tasks" sub="Act on what the call needs" action={{ label: "New task", onClick: () => { setNewTasks([{ id: Date.now(), title: "New task" }, ...newTasks]); toast("Task added"); } }} />
      <div className="space-y-2">
        {newTasks.map((t) => (
          <div key={t.id} className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-3.5 py-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue"><Check size={15} /></span>
            <p className="min-w-0 flex-1 truncate text-[0.85rem] font-semibold text-navy">{t.title}</p>
            <button type="button" onClick={() => { setNewTasks(newTasks.filter((x) => x.id !== t.id)); toast("Task done"); }} className="shrink-0 rounded-lg bg-blue px-2.5 py-1 text-[0.72rem] font-semibold text-white hover:opacity-90">Done</button>
            <button type="button" onClick={() => setNewTasks(newTasks.filter((x) => x.id !== t.id))} className="shrink-0 text-[0.72rem] font-semibold text-muted hover:underline">Remove</button>
          </div>
        ))}
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
          if (st === "snoozed")
            return (
              <div key={it.id} className="flex items-center gap-3 rounded-xl border border-line bg-canvas/60 px-3.5 py-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-warning/15 text-warning"><Clock size={15} /></span>
                <div className="min-w-0">
                  <p className="truncate text-[0.85rem] font-medium text-muted">{it.title}</p>
                  <p className="text-[0.72rem] text-faint">Snoozed til tomorrow · {who(it.id)}</p>
                </div>
                <button type="button" onClick={() => set(it.id, "pending")} className="ml-auto shrink-0 text-[0.72rem] font-semibold text-blue hover:underline">Wake</button>
              </div>
            );
          if (st === "acted")
            return (
              <div key={it.id} className="flex items-center gap-3 rounded-xl border border-green/30 bg-green/[0.09] px-3.5 py-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-green text-white"><Check size={16} /></span>
                <div className="min-w-0">
                  <p className="truncate text-[0.85rem] font-semibold text-navy">{it.title}</p>
                  <p className="text-[0.72rem] font-medium text-green-600">{it.acted(choiceFor(it))}</p>
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
                <div className="mt-2 rounded-lg bg-blue/[0.05] p-2.5">
                  <p className="mb-1.5 text-[0.7rem] sm:text-[0.66rem] font-bold uppercase tracking-wide text-faint">Refine, then act</p>
                  <div className="flex items-center gap-1.5">
                    <select value={choiceFor(it)} onChange={(e) => setChoices({ ...choices, [it.id]: e.target.value })} aria-label="Refine selection" className={`${inputCls} min-w-0 flex-1`}>
                      {it.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <button type="button" onClick={() => setActive(it.go)} className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-line bg-surface px-2 py-1.5 text-[0.72rem] font-semibold text-blue transition-colors hover:border-blue">Open {it.goLabel} <ChevronRight size={12} /></button>
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-1.5">
                    <button type="button" onClick={() => setConfirming(null)} className="rounded-md border border-line bg-surface px-2 py-1 text-[0.72rem] font-semibold text-muted">Cancel</button>
                    <button type="button" onClick={() => { set(it.id, "acted"); setConfirming(null); toast(it.acted(choiceFor(it))); }} className="rounded-md bg-blue px-2 py-1 text-[0.72rem] font-semibold text-white">Confirm</button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="shrink-0 text-[0.7rem] text-faint">To</span>
                    <select value={who(it.id)} onChange={(e) => { setAssignees({ ...assignees, [it.id]: e.target.value }); toast(`Assigned to ${e.target.value}`); }} aria-label="Assign task to" className={`${inputCls} min-w-0 py-1`}>
                      {TEAM.map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </select>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button type="button" onClick={() => { set(it.id, "snoozed"); toast("Snoozed til tomorrow"); }} className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-2 py-1 text-[0.72rem] font-semibold text-muted hover:bg-canvas"><Clock size={12} /> Snooze</button>
                    <button type="button" onClick={() => set(it.id, "ignored")} className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[0.72rem] font-semibold text-muted hover:bg-canvas">Ignore</button>
                    <button type="button" onClick={() => setConfirming(it.id)} className="inline-flex items-center gap-1 rounded-lg bg-blue px-2.5 py-1 text-[0.72rem] font-semibold text-white hover:opacity-90"><Check size={13} /> Act</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TRIGGERS = ["a call is missed", "a call wraps", "a job is booked", "a job is marked done", "an invoice is unpaid for 3 days", "a new lead comes in after hours"];
const ACTIONS = ["text the caller back", "create a ticket", "assign the right tech", "send a confirmation text", "send the invoice", "notify the on-call tech", "add a follow-up task"];

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onClick} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors sm:h-5 sm:w-9 ${on ? "bg-green" : "bg-line"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all sm:h-4 sm:w-4 ${on ? "left-[1.375rem] sm:left-[1.125rem]" : "left-0.5"}`} />
    </button>
  );
}

type Channel = { id: string; icon: LucideIcon; name: string; sub: string; on: boolean; soon?: boolean };

function ReceptionistView() {
  const demo = useDemo();
  const [answering, setAnswering] = useState(true);
  const [afterHours, setAfterHours] = useState(true);
  const [voice, setVoice] = useState("Ava");
  const [greeting, setGreeting] = useState(demo.greeting);
  const [editGreeting, setEditGreeting] = useState(false);
  const VOICES: { id: string; desc: string }[] = [
    { id: "Ava", desc: "Warm, friendly" },
    { id: "Marcus", desc: "Calm, professional" },
    { id: "Sky", desc: "Neutral, clear" },
  ];
  const [channels, setChannels] = useState<Channel[]>([
    { id: "phone", icon: PhoneCall, name: "Phone calls", sub: "AI answers and books the job", on: true },
    { id: "missed", icon: PhoneMissed, name: "Missed-call text-back", sub: "Texts the caller back in seconds", on: true },
    { id: "web", icon: Globe, name: "Website form", sub: "Form submissions become tickets", on: true },
    { id: "sms", icon: MessageSquare, name: "Inbound SMS", sub: "Texts land in the same inbox", on: true },
    { id: "wa", icon: Send, name: "WhatsApp", sub: "Same loop, one more channel", on: false, soon: true },
  ]);
  const toggleCh = (id: string) =>
    setChannels(channels.map((c) => (c.id === id ? { ...c, on: !c.on } : c)));
  return (
    <div>
      <ModuleHeader title="AI Receptionist" sub="How OneBy answers when you can't" />

      <div className={`mb-3 flex items-center gap-3 rounded-xl border px-4 py-3 ${answering ? "border-green/25 bg-green/[0.05]" : "border-line bg-canvas/40"}`}>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${answering ? "bg-green/10 text-green-600" : "bg-canvas-2 text-faint"}`}><Bot size={18} /></span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.9rem] font-bold text-navy">{answering ? "Answering now · 24/7" : "Paused"}</p>
          <p className="truncate text-[0.74rem] text-muted">{answering ? "Picks up on the second ring, every time" : "Calls ring through to the team only"}</p>
        </div>
        <Toggle on={answering} onClick={() => { setAnswering(!answering); toast(answering ? "Receptionist paused" : "Receptionist answering"); }} label="Toggle receptionist" />
      </div>

      {/* voice */}
      <div className="mb-3 rounded-xl border border-line bg-surface p-3.5">
        <p className="mb-2 text-[0.7rem] sm:text-[0.66rem] font-bold uppercase tracking-wide text-faint">Voice</p>
        <div className="grid grid-cols-3 gap-2">
          {VOICES.map((v) => (
            <button key={v.id} type="button" onClick={() => setVoice(v.id)} className={`rounded-lg border px-2 py-2 text-center transition-colors ${voice === v.id ? "border-blue/40 bg-blue/[0.06]" : "border-line bg-canvas hover:border-blue"}`}>
              <p className={`text-[0.82rem] font-bold ${voice === v.id ? "text-blue" : "text-navy"}`}>{v.id}</p>
              <p className="text-[0.7rem] sm:text-[0.66rem] text-faint">{v.desc}</p>
            </button>
          ))}
        </div>
        <button type="button" onClick={() => toast(`Playing a sample of ${voice}`)} className="mt-2 inline-flex items-center gap-1.5 text-[0.74rem] font-semibold text-blue hover:underline"><Play size={12} /> Preview {voice}</button>
      </div>

      {/* greeting */}
      <div className="mb-3 rounded-xl border border-line bg-surface p-3.5">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-[0.7rem] sm:text-[0.66rem] font-bold uppercase tracking-wide text-faint">Greeting</p>
          <button type="button" onClick={() => setEditGreeting(!editGreeting)} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.7rem] font-semibold ${editGreeting ? "bg-blue/10 text-blue" : "text-muted hover:text-blue"}`}><Pencil size={11} /> {editGreeting ? "Done" : "Edit"}</button>
        </div>
        {editGreeting ? (
          <textarea value={greeting} onChange={(e) => setGreeting(e.target.value)} rows={2} aria-label="Greeting" className={`${inputCls} w-full resize-none`} />
        ) : (
          <p className="rounded-lg bg-canvas px-3 py-2 text-[0.82rem] italic leading-relaxed text-ink">&ldquo;{greeting}&rdquo;</p>
        )}
      </div>

      {/* hours */}
      <div className="mb-3 flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue"><Clock size={16} /></span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.82rem] font-semibold text-navy">Answer after hours</p>
          <p className="truncate text-[0.72rem] text-muted">Open Mon to Fri, 8:00 AM to 6:00 PM · after that, AI books the job</p>
        </div>
        <Toggle on={afterHours} onClick={() => setAfterHours(!afterHours)} label="Toggle after-hours answering" />
      </div>

      {/* channels */}
      <p className="mb-2 px-1 text-[0.7rem] sm:text-[0.66rem] font-bold uppercase tracking-wide text-faint">Answers on these channels</p>
      <div className="space-y-2">
        {channels.map((c) => (
          <div key={c.id} className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${c.on ? "border-line bg-canvas" : "border-line bg-canvas/40"}`}>
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${c.on ? "bg-blue/10 text-blue" : "bg-canvas-2 text-faint"}`}><c.icon size={16} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.82rem] font-semibold text-navy">{c.name}</p>
              <p className="truncate text-[0.72rem] text-muted">{c.sub}</p>
            </div>
            {c.soon ? (
              <span className="shrink-0 rounded-full bg-canvas-2 px-2 py-0.5 text-[11px] sm:text-[9px] font-bold uppercase text-faint">Soon</span>
            ) : (
              <Toggle on={c.on} onClick={() => toggleCh(c.id)} label={`Toggle ${c.name}`} />
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] text-faint"><Sparkles size={12} /> However it comes in, the summary and ticket land after the call ends</p>
    </div>
  );
}

function AutomationsView() {
  const demo = useDemo();
  const AUTOMATION_SEED = demo.automations;
  const [rules, setRules] = useState<Rule[]>(AUTOMATION_SEED);
  const [building, setBuilding] = useState(false);
  const [trg, setTrg] = useState(TRIGGERS[0]);
  const [act, setAct] = useState(ACTIONS[0]);
  const onCount = rules.filter((r) => r.on).length;
  const totalRuns = rules.filter((r) => r.on).reduce((n, r) => n + (parseInt(r.runs) || 0), 0);
  const toggle = (id: number) =>
    setRules(rules.map((r) => (r.id === id ? { ...r, on: !r.on, runs: !r.on ? "Just turned on" : "Paused" } : r)));
  const addRule = () => {
    setRules([...rules, { id: Date.now(), icon: Zap, trigger: trg, action: act, on: true, runs: "Just turned on" }]);
    setBuilding(false);
    toast("Automation turned on");
  };
  return (
    <div>
      <ModuleHeader title="Automations" sub="Rules that run the busywork for you" action={{ label: "New automation", onClick: () => setBuilding((v) => !v) }} />

      <div className="mb-4 flex items-center gap-3 rounded-xl border border-blue/15 bg-blue/[0.04] px-4 py-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue"><Zap size={18} /></span>
        <div className="min-w-0">
          <p className="text-[0.9rem] font-bold text-navy">{onCount} automations running</p>
          <p className="text-[0.74rem] text-muted">{totalRuns} actions handled for you this week, no clicks</p>
        </div>
      </div>

      {building && (
        <div className="animate-rise mb-3 rounded-xl border border-blue/25 bg-blue/[0.04] p-3">
          <p className="mb-2 text-[0.7rem] sm:text-[0.66rem] font-bold uppercase tracking-wide text-faint">New automation</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-10 shrink-0 text-[0.72rem] font-bold text-faint">When</span>
              <select value={trg} onChange={(e) => setTrg(e.target.value)} aria-label="Trigger" className={`${inputCls} min-w-0 flex-1`}>{TRIGGERS.map((t) => <option key={t} value={t}>{t}</option>)}</select>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 shrink-0 text-[0.72rem] font-bold text-faint">Then</span>
              <select value={act} onChange={(e) => setAct(e.target.value)} aria-label="Action" className={`${inputCls} min-w-0 flex-1`}>{ACTIONS.map((a) => <option key={a} value={a}>{a}</option>)}</select>
            </div>
          </div>
          <div className="mt-2.5 flex justify-end gap-1.5">
            <button type="button" onClick={() => setBuilding(false)} className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[0.74rem] font-semibold text-muted">Cancel</button>
            <button type="button" onClick={addRule} className="inline-flex items-center gap-1.5 rounded-lg bg-blue px-3 py-1.5 text-[0.78rem] font-bold text-white hover:opacity-90"><Zap size={13} /> Turn it on</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {rules.map((r) => (
          <div key={r.id} className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors ${r.on ? "border-line bg-canvas" : "border-line bg-canvas/40"}`}>
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${r.on ? "bg-blue/10 text-blue" : "bg-canvas-2 text-faint"}`}><r.icon size={16} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.82rem] font-semibold text-navy"><span className="text-faint">When</span> {r.trigger}</p>
              <p className="truncate text-[0.76rem] text-muted"><span className="text-faint">then</span> {r.action}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <Toggle on={r.on} onClick={() => toggle(r.id)} label={`Toggle: when ${r.trigger}`} />
              <span className="text-[0.7rem] sm:text-[0.62rem] font-medium text-faint">{r.runs}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] text-faint"><Sparkles size={12} /> Every rule runs after the call, never on a live one</p>
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
  const demo = useDemo();
  const DAY_JOBS = demo.dayJobs;
  const CUSTOMERS = demo.customers;
  const jobsWeek = Object.values(DAY_JOBS).flat().length;
  const openBal = CUSTOMERS.reduce((n, c) => n + c.balance, 0);
  const stats: { label: string; value: string; icon: LucideIcon; tone: string; go: ModId }[] = [
    { label: "Jobs this week", value: String(jobsWeek), icon: CalendarDays, tone: "bg-blue/10 text-blue", go: "schedule" },
    { label: "Calls caught", value: demo.homeCallsCaught, icon: PhoneCall, tone: "bg-green/10 text-green-600", go: "calls" },
    { label: "Open balance", value: `$${openBal.toLocaleString()}`, icon: Receipt, tone: "bg-warning/15 text-warning", go: "billing" },
    { label: "Collected this week", value: demo.homeCollected, icon: DollarSign, tone: "bg-green/10 text-green-600", go: "billing" },
  ];
  const upNext = demo.homeUpNext;
  const needs = demo.homeNeeds;
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
        <TrendingUp size={12} /> {demo.homeRevenueNote}
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
            const content = (
              <>
                <span className="w-[4.75rem] shrink-0 text-[0.78rem] font-bold text-navy">{j.time}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.82rem] font-semibold text-navy">{j.title}</p>
                  <p className="text-[0.72rem] text-muted">{j.tech}</p>
                </div>
              </>
            );
            const cls = "flex w-full items-center gap-3 rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-left";
            return j.ticket ? (
              <button key={j.time} type="button" onClick={() => openTicket(j.ticket!)} className={`${cls} transition-colors hover:border-blue`}>
                {content}
                <ChevronRight size={15} className="shrink-0 text-faint" />
              </button>
            ) : (
              <div key={j.time} className={cls}>{content}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CustomersView({ sel, setSel, customers, setCustomers, setActive, openTicket }: { sel: number | null; setSel: (n: number | null) => void; customers: Customer[]; setCustomers: (c: Customer[]) => void; setActive: (m: ModId) => void; openTicket: (id: string | null) => void }) {
  const demo = useDemo();
  const custTimeline = (c: Customer): TLEntry[] => {
    if (c.id === 1) return demo.primaryTimeline;
    return [
      { when: c.last.replace(/^[A-Za-z ]+/, "").trim() || "Recent", icon: PhoneCall, tone: "bg-green/10 text-green-600", title: c.last, body: "Logged to the customer timeline" },
      { when: c.since, icon: Receipt, tone: "bg-blue/10 text-blue", title: c.balance > 0 ? `Open balance · $${c.balance}` : "All invoices paid", body: c.balance > 0 ? "Reminder scheduled" : "No outstanding balance" },
      { when: c.since, icon: UserRound, tone: "bg-canvas-2 text-muted", title: `Customer since ${c.since}`, body: c.tags.join(" · ") },
    ];
  };
  const [edit, setEdit] = useState(false);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"activity" | "jobs" | "tickets" | "invoices" | "messages" | "assets" | "files">("activity");

  const c = customers.find((x) => x.id === sel) || null;
  const upd = (field: "name" | "phone" | "email" | "address", v: string) =>
    setCustomers(customers.map((x) => (x.id === sel ? { ...x, [field]: v } : x)));
  const setCustTags = (t: string[]) => setCustomers(customers.map((x) => (x.id === sel ? { ...x, tags: t } : x)));
  const newCustomer = () => {
    const id = Date.now();
    setCustomers([...customers, { id, name: "New customer", initials: "NC", phone: "", email: "", address: "", since: "2026", tags: [], balance: 0, last: "Added just now" }]);
    setSel(id);
    setEdit(true);
    toast("Customer created");
  };

  if (!c) {
    const filtered = customers.filter((x) => x.name.toLowerCase().includes(q.toLowerCase()));
    return (
      <div>
        <ModuleHeader title="Customers" sub={`${customers.length} customers · click to open`} action={{ label: "New customer", onClick: newCustomer }} />
        <div className="relative mb-3">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers" className={`${inputCls} w-full pl-8`} />
        </div>
        <div className="space-y-1.5">
          {filtered.map((x) => (
            <button key={x.id} type="button" onClick={() => { setSel(x.id); setEdit(false); }} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-[0.7rem] font-bold text-white">{x.initials}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.85rem] font-semibold text-navy">{x.name}{x.vip && <span className="ml-1.5 rounded bg-green/10 px-1 py-0.5 text-[11px] sm:text-[9px] font-bold text-green-600">VIP</span>}</p>
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
  const rec = {
    ...demo.custRecords,
    invoices: demo.custRecords.invoices.map((iv, i) =>
      i === 0 ? { ...iv, status: c.balance > 0 ? "Due" : "Paid" } : iv
    ),
  };
  const lifetime = rec.invoices.reduce((n, i) => n + i.amount, 0);
  const TABS = [
    { id: "activity", label: "Activity" },
    { id: "jobs", label: "Jobs" },
    { id: "tickets", label: "Tickets" },
    { id: "invoices", label: "Invoices" },
    { id: "messages", label: "Conversations" },
    { id: "assets", label: "Equipment" },
    { id: "files", label: "Files" },
  ] as const;
  const pill = (s: string) => {
    if (["Done", "Paid", "Closed"].includes(s)) return "bg-green/10 text-green-600";
    if (["Due", "Open"].includes(s)) return "bg-warning/15 text-warning";
    return "bg-blue/10 text-blue";
  };
  return (
    <div>
      <button type="button" onClick={() => { setSel(null); setEdit(false); }} className="mb-3 inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue hover:underline"><ChevronLeft size={14} /> All customers</button>
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">{c.initials}</span>
          <div className="min-w-0 flex-1">
            {edit ? (
              <input value={c.name} onChange={(e) => upd("name", e.target.value)} aria-label="Customer name" className={`${inputCls} w-full font-semibold`} />
            ) : (
              <p className="text-[0.95rem] font-semibold text-navy">{c.name}{c.vip && <span className="ml-1.5 rounded-full bg-green/10 px-2 py-0.5 text-[11px] sm:text-[10px] font-semibold text-green-600">VIP</span>}</p>
            )}
            <p className="mt-0.5 text-xs text-muted">Customer since {c.since}{c.balance > 0 ? ` · $${c.balance} balance` : ""}</p>
          </div>
          <button type="button" onClick={() => { if (edit) toast("Customer saved"); setEdit(!edit); }} className={`ml-auto inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.7rem] font-semibold ${edit ? "bg-blue/10 text-blue" : "text-muted hover:text-blue"}`}><Pencil size={11} /> {edit ? "Done" : "Edit"}</button>
        </div>

        <div className="mt-3 space-y-2">
          {([["phone", "Phone"], ["email", "Email"], ["address", "Address"]] as const).map(([f, label]) => (
            <div key={f} className="flex items-center gap-2">
              <span className="w-14 shrink-0 text-[0.7rem] sm:text-[0.66rem] font-bold uppercase text-faint">{label}</span>
              {edit ? (
                <input value={c[f]} onChange={(e) => upd(f, e.target.value)} className={`${inputCls} min-w-0 flex-1`} />
              ) : (
                <span className="min-w-0 flex-1 truncate text-[0.82rem] text-ink">{c[f]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {edit ? (
            <TagRow tags={c.tags} setTags={setCustTags} />
          ) : (
            c.tags.map((t) => (
              <span key={t} className="rounded-md border border-line bg-canvas px-2 py-0.5 text-[0.7rem] font-medium text-ink/70">{t}</span>
            ))
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => toast("New job started")} className="inline-flex items-center gap-1.5 rounded-lg bg-blue px-3 py-1.5 text-[0.78rem] font-semibold text-white transition-opacity hover:opacity-90"><Plus size={13} /> New job</button>
        <button type="button" onClick={() => toast("Invoice drafted")} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[0.78rem] font-semibold text-navy transition-colors hover:border-blue"><Receipt size={13} /> New invoice</button>
        <button type="button" onClick={() => toast("Note added")} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[0.78rem] font-semibold text-navy transition-colors hover:border-blue"><Pencil size={13} /> Add note</button>
      </div>

      {/* source of truth: value + records */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-line bg-canvas px-3 py-2.5">
          <p className="text-[0.7rem] sm:text-[0.62rem] font-bold uppercase tracking-wide text-faint">Lifetime</p>
          <p className="mt-0.5 text-[0.95rem] font-extrabold text-navy">${lifetime.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-line bg-canvas px-3 py-2.5">
          <p className="text-[0.7rem] sm:text-[0.62rem] font-bold uppercase tracking-wide text-faint">Open balance</p>
          <p className={`mt-0.5 text-[0.95rem] font-extrabold ${c.balance > 0 ? "text-warning" : "text-navy"}`}>${c.balance}</p>
        </div>
        <div className="rounded-xl border border-line bg-canvas px-3 py-2.5">
          <p className="text-[0.7rem] sm:text-[0.62rem] font-bold uppercase tracking-wide text-faint">Jobs</p>
          <p className="mt-0.5 text-[0.95rem] font-extrabold text-navy">{rec.jobs.length}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-1.5 overflow-x-auto border-b border-line">
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`shrink-0 border-b-2 px-2.5 pb-2 text-[0.8rem] font-semibold transition-colors ${tab === t.id ? "border-blue text-blue" : "border-transparent text-muted hover:text-navy"}`}>{t.label}</button>
        ))}
      </div>

      <div className="mt-3">
        {tab === "activity" && (
          <div className="space-y-2.5">
            {tl.map((e, i) => (
              <div key={i} className="flex gap-3">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${e.tone}`}><e.icon size={15} /></span>
                <div className="min-w-0 flex-1 border-b border-line pb-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[0.82rem] font-semibold text-navy">{e.title}</p>
                    <span className="shrink-0 text-[0.7rem] sm:text-[0.68rem] text-faint">{e.when}</span>
                  </div>
                  <p className="text-[0.74rem] text-muted">{e.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "jobs" && (
          <div className="space-y-2">
            {rec.jobs.map((j) => (
              <button type="button" key={j.title} onClick={() => setActive("schedule")} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue"><CalendarDays size={15} /></span>
                <div className="min-w-0 flex-1"><p className="truncate text-[0.84rem] font-semibold text-navy">{j.title}</p><p className="text-[0.72rem] text-muted">{j.when}</p></div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] sm:text-[0.66rem] font-semibold ${pill(j.status)}`}>{j.status}</span>
                <span className="shrink-0 text-[0.82rem] font-semibold text-navy">${j.amount}</span>
                <ChevronRight size={14} className="shrink-0 text-faint" />
              </button>
            ))}
          </div>
        )}
        {tab === "tickets" && (
          <div className="space-y-2">
            {rec.tickets.map((t) => (
              <button type="button" key={t.id} onClick={() => openTicket(t.id)} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue"><Ticket size={15} /></span>
                <div className="min-w-0 flex-1"><p className="truncate text-[0.84rem] font-semibold text-navy">{t.issue}</p><p className="text-[0.72rem] text-muted">#{t.id}</p></div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] sm:text-[0.66rem] font-semibold ${pill(t.status)}`}>{t.status}</span>
                <ChevronRight size={14} className="shrink-0 text-faint" />
              </button>
            ))}
          </div>
        )}
        {tab === "invoices" && (
          <div className="space-y-2">
            {rec.invoices.map((iv) => (
              <button type="button" key={iv.id} onClick={() => setActive("billing")} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue"><Receipt size={15} /></span>
                <div className="min-w-0 flex-1"><p className="truncate text-[0.84rem] font-semibold text-navy">{iv.id}</p></div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] sm:text-[0.66rem] font-semibold ${pill(iv.status)}`}>{iv.status}</span>
                <span className="shrink-0 text-[0.82rem] font-semibold text-navy">${iv.amount.toLocaleString()}</span>
                <ChevronRight size={14} className="shrink-0 text-faint" />
              </button>
            ))}
          </div>
        )}
        {tab === "messages" && (
          <div className="space-y-2">
            {rec.convos.map((m, i) => (
              <button type="button" key={i} onClick={() => setActive(m.kind === "Call" ? "live" : "messages")} className="flex w-full gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-green/10 text-green-600">{m.kind === "Call" ? <PhoneCall size={15} /> : <MessageSquare size={15} />}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2"><p className="text-[0.8rem] font-semibold text-navy">{m.kind}</p><span className="shrink-0 text-[0.7rem] sm:text-[0.68rem] text-faint">{m.when}</span></div>
                  <p className="text-[0.74rem] leading-relaxed text-muted">{m.text}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        {tab === "assets" && (
          <div className="space-y-2">
            {rec.assets.map((a) => (
              <button type="button" key={a.name} onClick={() => toast("Opening equipment record")} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue"><Package size={15} /></span>
                <div className="min-w-0 flex-1"><p className="truncate text-[0.84rem] font-semibold text-navy">{a.name}</p><p className="truncate text-[0.72rem] text-muted">{a.meta}</p></div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] sm:text-[0.66rem] font-semibold ${a.warranty === "Under warranty" ? "bg-green/10 text-green-600" : "bg-canvas-2 text-faint"}`}>{a.warranty}</span>
              </button>
            ))}
          </div>
        )}
        {tab === "files" && (
          <div className="space-y-2">
            {rec.files.map((fl) => (
              <button type="button" key={fl.name} onClick={() => toast(`Opening ${fl.name}`)} className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-blue">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue"><FileText size={15} /></span>
                <div className="min-w-0 flex-1"><p className="truncate text-[0.84rem] font-semibold text-navy">{fl.name}</p><p className="truncate text-[0.72rem] text-muted">{fl.meta}</p></div>
                <ChevronRight size={15} className="shrink-0 text-faint" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
