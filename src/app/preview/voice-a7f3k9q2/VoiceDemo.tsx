"use client";

import { Calendar, Receipt, Package, FileText, CornerUpRight, HelpCircle, Sparkles } from "lucide-react";
import HeroAppMock from "@/components/HeroAppMock";
import { hvacDemo } from "@/data/demo/hvac";
import type { DemoData, TaskItem } from "@/data/demo/types";

// The "next tasks" OneBy files after the call — deliberately spanning every action
// type, not just follow-ups: a scheduled task, an invoice, a parts order, a document
// to send, a follow-up, and a low-confidence item the AI flags instead of guessing.
const TASKS: TaskItem[] = [
  {
    id: 1,
    icon: Calendar,
    title: "Schedule the A/C diagnostic",
    meta: "Scheduled task · dispatch today",
    go: "schedule",
    goLabel: "Schedule",
    options: ["Today 3:30 PM · Luis R.", "Today 4:30 PM · Luis R.", "Tomorrow 9:00 AM · Sam K."],
    acted: (o) => `Booked ${o}`,
  },
  {
    id: 2,
    icon: Receipt,
    title: "Send the invoice for the capacitor repair",
    meta: "Invoice · $189",
    go: "billing",
    goLabel: "Billing",
    options: ["$189 · capacitor + labor", "$238 · incl. $49 diagnostic", "Waive the diagnostic fee"],
    acted: (o) => `Invoice sent — ${o}`,
  },
  {
    id: 3,
    icon: Package,
    title: "Order a replacement capacitor",
    meta: "Parts · low stock",
    go: "catalog",
    goLabel: "Catalog",
    options: ["45/5 MFD dual-run", "40/5 MFD dual-run", "Universal capacitor"],
    acted: (o) => `Ordered ${o}`,
  },
  {
    id: 4,
    icon: FileText,
    title: "Send Maria the maintenance plan",
    meta: "Document · $199/yr",
    go: "messages",
    goLabel: "Messages",
    options: ["Annual plan · $199/yr", "Semi-annual · $129", "Skip for now"],
    acted: (o) => `Sent: ${o}`,
  },
  {
    id: 5,
    icon: CornerUpRight,
    title: "Follow up on the unpaid balance",
    meta: "Follow-up · 6 days out",
    go: "messages",
    goLabel: "Messages",
    options: ["Friendly reminder", "Second notice", "Call instead"],
    acted: (o) => `Follow-up: ${o}`,
  },
  {
    id: 6,
    icon: HelpCircle,
    title: "Confirm: upstairs unit, not downstairs?",
    meta: "Flagged · asks before assuming",
    go: "tickets",
    goLabel: "Ticket",
    options: ["Upstairs unit", "Downstairs unit", "Both units"],
    acted: (o) => `Confirmed: ${o}`,
  },
];

const demoData: DemoData = { ...hvacDemo, tasks: TASKS };

export default function VoiceDemo() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-blue">
          <Sparkles size={13} /> Voice recording → action items
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-[2.6rem] sm:leading-[1.05]">
          Every call becomes a summary and the next tasks
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-muted">
          OneBy transcribes the recording, writes the summary, and files the exact next tasks —
          <span className="font-semibold text-ink"> schedule a job, send an invoice, order parts, send a document, follow up</span> —
          each one a tap away. Open <span className="font-semibold text-ink">Tasks</span> to act on them.
        </p>
      </div>

      <HeroAppMock data={demoData} />

      <p className="mt-10 text-center text-xs text-faint">
        Unlisted preview · OneBy · the all-in-one CRM that catches every call
      </p>
    </main>
  );
}
