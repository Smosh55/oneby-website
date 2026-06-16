"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Does OneBy only work on missed calls?",
    a: "No — OneBy works on every call. Answered or missed, on your desk phone or the mobile app, after any call it transcribes the conversation, writes a summary, and creates and assigns the follow-up task. AI answering of unanswered calls is just one capability.",
  },
  {
    q: "Does OneBy replace my current phone number?",
    a: "No. You can keep your existing business number — we port it over or forward to it. There's no new hardware to buy and nothing to rip out.",
  },
  {
    q: "What does the AI receptionist actually do?",
    a: "When a call goes unanswered, the AI answers in a natural voice, asks the right questions to understand what the caller needs, captures their details, and creates a summary and a task for your team — then notifies you instantly.",
  },
  {
    q: "Will customers know they're talking to AI?",
    a: "The assistant is transparent and professional. Most callers simply feel heard and helped — and you get the details you need without missing the lead.",
  },
  {
    q: "How long does it take to set up?",
    a: "Most teams are live the same day. Connect your number, set your hours, pick how tasks get routed, and you're capturing calls within minutes.",
  },
  {
    q: "Does it work with the tools I already use?",
    a: "Growth and Pro plans integrate with popular CRMs and field-service software so tasks and customer records stay in sync.",
  },
  {
    q: "What happens during the free trial?",
    a: "You get full access for 14 days — AI receptionist, summaries, tasks, and the shared inbox. No contract, and you can cancel anytime.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-canvas py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Questions, answered.
          </h2>
          <p className="mt-5 text-[0.975rem] leading-relaxed text-muted">
            Still curious? Book a 20-minute demo and we&apos;ll walk through
            your exact call flow.
          </p>
          <a href="#demo" className="btn btn-ghost mt-6">
            Talk to us
          </a>
        </Reveal>

        <Reveal delay={80} className="divide-y divide-line rounded-2xl border border-line bg-white px-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[1rem] font-semibold text-navy">
                    {f.q}
                  </span>
                  <Plus
                    size={20}
                    className={`shrink-0 text-blue transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="px-4 pb-5 text-[0.95rem] leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
