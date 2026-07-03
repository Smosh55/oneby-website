"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import {
  Play,
  Pause,
  ShieldCheck,
  UserCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";
import type { DemoData } from "@/data/demo/types";
import { hvacDemo } from "@/data/demo/hvac";
import { useHomeDemo } from "./HomeDemoContext";

const trust = [
  { icon: ShieldCheck, title: "It asks when it's unsure", body: "It asks a clarifying question instead of guessing. It never invents an answer or makes a promise you can't keep." },
  { icon: UserCheck, title: "It hands off to a human", body: "Anything unusual or sensitive routes straight to your on-call person, with the details already captured." },
  { icon: Headphones, title: "You can hear every call", body: "Every call is recorded, transcribed, and summarized. Nothing happens on your line that you can't review." },
];

export default function HearItWork({ data: dataProp }: { data?: DemoData }) {
  // On the homepage this follows the hero switcher's selection (shared via
  // HomeDemoContext); elsewhere it uses the prop or falls back to HVAC.
  const shared = useHomeDemo();
  const data = shared?.data ?? dataProp ?? hvacDemo;
  const [playing, setPlaying] = useState(false);
  const transcript = data.hearTranscript;

  return (
    <section className="border-y border-line bg-canvas/50 py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center text-blue">
            <Headphones size={14} /> The part owners worry about
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Scared the AI will fumble a customer call? Listen.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            It answers like your best front-desk person on their best day, and it
            knows when to ask instead of guess.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-6 lg:grid-cols-[1fr_1fr]">
          {/* call player */}
          <Reveal>
            <div className="surface-card rounded-2xl p-5 shadow-[var(--shadow-lg)]">
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue text-white transition-opacity hover:opacity-90"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy">Inbound call · {data.company}</p>
                  <p className="text-xs text-faint">AI answered · 0:38</p>
                </div>
                {/* waveform */}
                <div className="flex h-8 items-center gap-0.5">
                  {[6, 14, 9, 20, 12, 24, 16, 10, 22, 8, 18, 13, 26, 11, 7].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full ${playing ? "animate-pulse bg-blue" : "bg-line"}`}
                      style={{ height: `${h}px`, animationDelay: `${i * 60}ms` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                {transcript.map((t, i) => (
                  <p key={i} className="text-[0.85rem] leading-relaxed text-ink">
                    <span className={`font-semibold ${t.who === "OneBy" ? "text-blue" : "text-navy"}`}>{t.who}:</span>{" "}
                    {t.line}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* trust points */}
          <Reveal delay={100}>
            <ul className="space-y-4">
              {trust.map((t) => (
                <li key={t.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-green/10 text-green-600">
                    <t.icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy">{t.title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{t.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-faint">Works with what you've got</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {["Keep your number", "Google Calendar", "Microsoft 365", "QuickBooks"].map((w) => (
                  <span key={w} className="rounded-full border border-line bg-canvas px-3 py-1 text-[0.8rem] font-medium text-ink/75">
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <a href="/demo" className="btn btn-primary mt-6">
              Hear it answer your calls <ArrowRight size={17} />
            </a>
            <p className="mt-2 text-xs text-faint">A live call-in demo line launches with the campaign.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
