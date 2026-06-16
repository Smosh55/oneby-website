"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Bot, User, Sparkles, CheckCircle2 } from "lucide-react";

type Line = { who: "ai" | "caller"; text: string };

const script: Line[] = [
  { who: "ai", text: "Thanks for calling Summit HVAC, this is the OneBy assistant. How can I help?" },
  { who: "caller", text: "Hi — my upstairs A/C stopped cooling overnight." },
  { who: "ai", text: "I'm sorry to hear that. Is this for the home on file, and are you available this afternoon?" },
  { who: "caller", text: "Yes, same address. I'm home after 3." },
  { who: "ai", text: "Perfect. I've logged the details and our dispatch team will confirm a same-day visit shortly." },
];

export default function ReceptionistDemo() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [visible, setVisible] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const play = () => {
    clearTimers();
    setPhase("playing");
    setVisible(0);
    script.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setVisible(i + 1), 700 + i * 1150)
      );
    });
    timers.current.push(
      setTimeout(() => setPhase("done"), 700 + script.length * 1150)
    );
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <section className="bg-navy py-20 text-white lg:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="max-w-lg">
          <span className="eyebrow text-green">See it live</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Hear how the AI handles a real missed call.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Press play. Watch a call get answered, understood, and turned into
            an assigned task — exactly what happens when you&apos;re too busy to
            pick up.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={play}
              className="btn btn-primary text-base"
              disabled={phase === "playing"}
              suppressHydrationWarning
            >
              {phase === "playing" ? (
                "Playing…"
              ) : (
                <>
                  <Play size={18} /> Play the call
                </>
              )}
            </button>
            {phase === "done" && (
              <button onClick={play} className="btn btn-white text-base">
                <RotateCcw size={17} /> Replay
              </button>
            )}
          </div>
        </div>

        {/* transcript + result */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <span className="relative flex h-2.5 w-2.5">
              {phase === "playing" && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
              )}
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  phase === "idle" ? "bg-white/30" : "bg-green"
                }`}
              />
            </span>
            <span className="text-xs font-semibold text-white/60">
              {phase === "idle"
                ? "Call ready"
                : phase === "playing"
                ? "Live · AI receptionist"
                : "Call complete"}
            </span>
          </div>

          <div className="mt-4 min-h-[18rem] space-y-3">
            {phase === "idle" && (
              <p className="py-16 text-center text-sm text-white/40">
                Press “Play the call” to start the simulation.
              </p>
            )}

            {script.slice(0, visible).map((line, i) => (
              <div
                key={i}
                className={`flex items-start gap-2.5 ${
                  line.who === "caller" ? "flex-row-reverse" : ""
                }`}
              >
                <span
                  className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                    line.who === "ai"
                      ? "bg-blue/25 text-[#7cc8f4]"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {line.who === "ai" ? <Bot size={14} /> : <User size={14} />}
                </span>
                <p
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[0.85rem] leading-relaxed ${
                    line.who === "ai"
                      ? "rounded-tl-sm bg-white/[0.07] text-white/85"
                      : "rounded-tr-sm bg-blue text-white"
                  }`}
                >
                  {line.text}
                </p>
              </div>
            ))}

            {phase === "done" && (
              <div className="space-y-2.5 pt-2">
                <div className="rounded-xl border border-blue/30 bg-blue/10 px-3.5 py-3">
                  <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-[#7cc8f4]">
                    <Sparkles size={12} /> AI summary
                  </p>
                  <p className="mt-1.5 text-[0.82rem] leading-relaxed text-white/85">
                    Existing customer — upstairs A/C not cooling. Available after
                    3pm today. Requesting same-day diagnostic.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-green/30 bg-green/10 px-3.5 py-3">
                  <CheckCircle2 size={18} className="text-green" />
                  <p className="text-[0.82rem] font-semibold">
                    Task created · Schedule A/C diagnostic — due today
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
