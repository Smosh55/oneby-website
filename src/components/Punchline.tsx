import Reveal from "./Reveal";
import { Phone, MessageSquare, Sparkles, CalendarDays, CheckCircle2 } from "lucide-react";

const caps = [
  { icon: Phone, label: "Calls" },
  { icon: MessageSquare, label: "Texts" },
  { icon: Sparkles, label: "AI" },
  { icon: CalendarDays, label: "Scheduling" },
  { icon: CheckCircle2, label: "Follow-up" },
];

export default function Punchline() {
  return (
    <section className="container-x py-10 lg:py-14">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-navy px-7 py-16 text-center sm:px-12 lg:py-20">
          {/* ambient glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.5),transparent)]" />
            <div className="absolute -right-20 -bottom-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.45),transparent)]" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
              }}
            />
          </div>

          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-[2.1rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
              The phone system built for{" "}
              <span className="bg-gradient-to-r from-[#7cc8f4] to-[#5fe3b0] bg-clip-text text-transparent">
                busy people.
              </span>
            </h2>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
              {caps.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                >
                  <c.icon size={15} className="text-[#5fe3b0]" /> {c.label}
                </span>
              ))}
              <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-extrabold text-navy shadow-[var(--shadow-md)]">
                One platform
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
