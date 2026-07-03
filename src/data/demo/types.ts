import type { LucideIcon } from "lucide-react";

export type ModId =
  | "home"
  | "live"
  | "calls"
  | "tickets"
  | "schedule"
  | "customers"
  | "team"
  | "catalog"
  | "billing"
  | "messages"
  | "tasks"
  | "automations"
  | "receptionist"
  | "email";

export type Job = { time: string; title: string; tech: string; hot?: boolean; duration?: string; ticket?: string };
export type Line = { label: string; qty: number; price: number };
export type Item = { id: number; name: string; type: "Service" | "Part"; price: number; tasks?: string[] };
export type Subtask = { id: number; label: string; assignee: string; done: boolean };
export type SubtaskSetter = (u: Subtask[] | ((p: Subtask[]) => Subtask[])) => void;

export type TeamMember = {
  name: string;
  role: string;
  status: string;
  jobs: string;
  dot: string;
  phone: string;
  skills: string[];
};

export type Ticket = {
  id: string;
  issue: string;
  customer: string;
  status: string;
  urgent: boolean;
  summary: string;
  relationship: string;
  tech: string;
  tags: string[];
  notes: string[];
  subtasks: Subtask[];
};

export type CallEntry = {
  id: number;
  dir: "in" | "out" | "missed";
  name: string;
  meta: string;
  dur: string;
  tag: string;
  tone: "green" | "blue" | "warning" | "muted";
  ticket?: string;
  recording?: boolean;
  // "AI captured: …" sentence for recording rows; falls back to `meta`.
  captured?: string;
};

export type CallGroup = { group: string; calls: CallEntry[] };

export type Msg = { me: boolean; text: string };
export type Thread = { id: string; name: string; unread?: number; msgs: Msg[] };

export type Rule = { id: number; icon: LucideIcon; trigger: string; action: string; on: boolean; runs: string };

export type Customer = {
  id: number;
  name: string;
  initials: string;
  phone: string;
  email: string;
  address: string;
  since: string;
  tags: string[];
  balance: number;
  vip?: boolean;
  last: string;
};

export type TLEntry = { when: string; icon: LucideIcon; tone: string; title: string; body: string };

export type TaskItem = {
  id: number;
  icon: LucideIcon;
  title: string;
  meta: string;
  go: ModId;
  goLabel: string;
  options: string[];
  acted: (o: string) => string;
};

export type HomeUpNext = { time: string; title: string; tech: string; ticket?: string };
export type HomeNeed = { title: string; body: string; icon: LucideIcon; tone: string; go: ModId };

export type CustomerRecords = {
  jobs: { title: string; when: string; status: string; amount: number }[];
  tickets: { id: string; issue: string; status: string }[];
  invoices: { id: string; amount: number; status: string }[];
  convos: { kind: string; when: string; text: string }[];
  assets: { name: string; meta: string; warranty: string }[];
  files: { name: string; meta: string }[];
};

export type DemoData = {
  slug: string;
  company: string;
  primaryCustomer: string;
  primaryIssue: string;
  primaryTicket: string;
  summary: string;
  liveTags: string[];
  liveNotes: string[];
  primaryTech: string;
  primaryMessages: Msg[];
  subtaskSeed: Subtask[];
  dayJobs: Record<number, Job[]>;
  team: TeamMember[];
  techDot: Record<string, string>;
  catalog: Item[];
  tickets: Ticket[];
  linesSeed: Record<string, Line[]>;
  callGroups: CallGroup[];
  customers: Customer[];
  primaryTimeline: TLEntry[];
  custRecords: CustomerRecords;
  messageThreads: Thread[];
  messageTemplates: string[];
  tasks: TaskItem[];
  automations: Rule[];
  greeting: string;
  scheduleFlows: Record<string, string[]>;
  schedulePlaceholder: string;
  mileItem: string;
  mileBase: number;
  billingAlertNote: string;
  homeCallsCaught: string;
  homeCollected: string;
  homeRevenueNote: string;
  homeUpNext: HomeUpNext[];
  homeNeeds: HomeNeed[];
  hearTranscript: { who: string; line: string }[];
};
