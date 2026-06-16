import {
  PhoneCall,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Star,
} from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[640px] w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.16),transparent)]" />
        <div className="absolute top-20 right-[8%] h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.18),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(4,3,79,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(4,3,79,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 80% 55% at 50% 35%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 55% at 50% 35%, black, transparent)",
          }}
        />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <div className="max-w-xl">
          <span className="animate-rise eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            <Sparkles size={14} /> The AI Communications OS for every business
          </span>

          <h1
            className="animate-rise mt-5 text-[2.6rem] leading-[1.05] font-extrabold tracking-tight text-navy sm:text-6xl"
            style={{ animationDelay: "60ms" }}
          >
            Turn every call{" "}
            <span className="text-gradient">into action.</span>
          </h1>

          <p
            className="animate-rise mt-6 text-lg leading-relaxed text-muted"
            style={{ animationDelay: "120ms" }}
          >
            Answered or missed, desk phone or mobile, OneBy listens to every
            call, writes the summary, and spins up the follow-up task (then
            hands it to the right person). Every conversation, instantly
            smarter. Built for teams of every size.
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <a href="#demo" className="btn btn-primary text-base">
              Book a demo <ArrowRight size={18} />
            </a>
            <a href="#pricing" className="btn btn-ghost text-base">
              Start free trial
            </a>
          </div>

          <div
            className="animate-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted"
            style={{ animationDelay: "240ms" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={15} className="fill-green text-green" />
                ))}
              </span>
              4.9/5 from teams everywhere
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-green" /> Works on answered &amp; missed calls
            </span>
          </div>
        </div>

        {/* Visual: the story, as product UI */}
        <HeroMock />
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="animate-rise relative" style={{ animationDelay: "160ms" }}>
      {/* main app window */}
      <div className="surface-card rounded-2xl p-5 shadow-[var(--shadow-xl)]">
        <div className="flex items-center gap-2 pb-4">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs font-medium text-faint">
            OneBy · Live activity
          </span>
        </div>

        {/* handled call, answered on the desk phone */}
        <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-4 py-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-green/10 text-green-600">
            <PhoneCall size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy">Call with Maria G.</p>
            <p className="truncate text-xs text-muted">Desk phone · 4:12 · completed</p>
          </div>
          <span className="ml-auto rounded-full bg-blue/10 px-2.5 py-1 text-[11px] font-semibold text-blue">
            AI summarized
          </span>
        </div>

        {/* AI summary */}
        <div className="mt-3 rounded-xl border border-blue/15 bg-gradient-to-b from-blue/[0.06] to-transparent px-4 py-3.5">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-blue" />
            <span className="text-xs font-bold uppercase tracking-wide text-blue">
              AI summary
            </span>
          </div>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-ink">
            No A/C upstairs, not cooling since last night. Customer&apos;s home after 3pm.
            Existing client, last service Aug 2024. Wants a same-day visit.
          </p>
        </div>

        {/* generated task */}
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-green/25 bg-green/[0.07] px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-green/15 text-green-600">
            <CheckCircle2 size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-navy">
              Task created &amp; assigned · Schedule A/C diagnostic
            </p>
            <p className="text-xs text-muted">Assigned to Dispatch · Due today</p>
          </div>
        </div>
      </div>

      {/* floating notification chip */}
      <div className="absolute -right-3 -top-4 hidden rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lg)] sm:block">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-faint">
          Team notified
        </p>
        <p className="text-sm font-semibold text-navy">Summary + task in 8s ⚡</p>
      </div>
    </div>
  );
}
