import Link from "next/link";
import Reveal from "../Reveal";
import { Plug, ShieldCheck, Zap, Check, ArrowRight } from "lucide-react";

// The MCP connector — the real edge over a plain field CRM. Framed honestly:
// OneBy isn't an "AI product," it opens a secure connector so the assistant
// YOU already use can read and (with permission) run your business.
const bullets = [
  { icon: Plug, text: "Works with Claude, ChatGPT, Gemini & Cursor" },
  { icon: Zap, text: "100+ actions — customers, jobs, invoices, scheduling, reports" },
  { icon: ShieldCheck, text: "Read-only by default. You choose what it can change." },
];

export default function McpSection() {
  return (
    <section id="mcp" className="bg-navy py-20 text-white lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* copy */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3.5 py-1.5 text-[0.8rem] font-bold uppercase tracking-wide text-green">
              <Plug size={14} /> The open connector
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Point your own AI at your business.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              OneBy opens a secure connector to the assistants you already use.
              Ask about your customers, jobs, and invoices in plain English, and
              let it do the busywork when you say so. No in-house black box, no
              new tool to learn — bring the AI you already trust.
            </p>

            <ul className="mt-7 space-y-3">
              {bullets.map((b) => {
                const Icon = b.icon;
                return (
                  <li key={b.text} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-green">
                      <Icon size={14} />
                    </span>
                    <span className="text-[0.95rem] text-white/85">{b.text}</span>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/features/connect-your-ai-assistant"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[0.95rem] font-semibold text-navy transition-transform hover:-translate-y-0.5"
            >
              See how the connector works
              <ArrowRight size={16} />
            </Link>
          </Reveal>

          {/* chat visual */}
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] shadow-[var(--shadow-xl)] backdrop-blur">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-2 text-[0.72rem] font-semibold text-white/50">
                  Your AI assistant · connected to OneBy
                </span>
              </div>
              <div className="space-y-3 p-5">
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-blue px-4 py-2.5 text-[0.88rem] leading-snug text-white">
                  Which customers still owe me money, and how much?
                </div>
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5 text-[0.88rem] leading-snug text-white/90">
                  3 open invoices, $1,740 total. Rivera ($520, 12 days),
                  Hillside Dental ($980, 5 days), Brooks ($240, today). Want me to
                  text each a payment link?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-blue px-4 py-2.5 text-[0.88rem] leading-snug text-white">
                  Yes, and book the Rivera follow-up for Friday afternoon.
                </div>
                <div className="flex max-w-[90%] items-center gap-2 rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5 text-[0.88rem] leading-snug text-white/90">
                  <Check size={16} className="shrink-0 text-green" />
                  Done. Pay links sent and Rivera is on the schedule Fri 2–4 PM.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
