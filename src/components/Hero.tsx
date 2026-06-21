import {
  PhoneCall,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Star,
  Calendar,
  CornerUpRight,
  HelpCircle,
  Activity,
  Phone,
  ListChecks,
  Inbox,
  Users,
} from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[680px] w-[1200px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.16),transparent)]" />
        <div className="absolute top-24 right-[12%] h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.18),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(4,3,79,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(4,3,79,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 75% 50% at 50% 30%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 50% at 50% 30%, black, transparent)",
          }}
        />
      </div>

      <div className="container-x">
        {/* Centered copy */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="animate-rise eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            <Sparkles size={14} /> The AI Communications OS for every business
          </span>

          <h1
            className="animate-rise mt-5 text-[2.6rem] leading-[1.04] font-extrabold tracking-tight text-navy sm:text-6xl lg:text-[4.25rem]"
            style={{ animationDelay: "60ms" }}
          >
            Turn every call <span className="text-gradient">into action.</span>
          </h1>

          <p
            className="animate-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: "120ms" }}
          >
            OneBy answers your calls, writes the summary, and turns each one into
            the next action. Answered or missed, desk phone or mobile, nothing
            slips through.
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <a href="/demo" className="btn btn-primary text-base">
              Book a demo <ArrowRight size={18} />
            </a>
            <a href="/pricing" className="btn btn-ghost text-base">
              Start free trial
            </a>
          </div>

          <div
            className="animate-rise mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted"
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
              <CheckCircle2 size={16} className="text-green" /> Live in a day, keep
              your number
            </span>
          </div>
        </div>

        {/* Oversized app mock */}
        <div
          className="animate-rise mt-14 lg:mt-16"
          style={{ animationDelay: "220ms" }}
        >
          <AppMock />
        </div>
      </div>
    </section>
  );
}

const nav = [
  { icon: Activity, label: "Live", active: true },
  { icon: Phone, label: "Calls" },
  { icon: ListChecks, label: "Tasks", badge: "7" },
  { icon: Inbox, label: "Inbox" },
  { icon: Users, label: "Customers" },
];

function AppMock() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* floating chips */}
      <div className="absolute -left-4 top-16 z-10 hidden rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lg)] lg:block">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-faint">
          AI answered
        </p>
        <p className="text-sm font-semibold text-navy">In 2 rings ⚡</p>
      </div>
      <div className="absolute -right-4 bottom-20 z-10 hidden rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lg)] lg:block">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-faint">
          Owner notified
        </p>
        <p className="text-sm font-semibold text-navy">Summary + tasks · 8s</p>
      </div>

      {/* window */}
      <div className="overflow-hidden rounded-[20px] border border-line bg-surface shadow-[0_40px_90px_-30px_rgba(4,3,79,0.35)]">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-line bg-canvas/70 px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs font-semibold text-faint">
            OneBy · Workspace
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-green/10 px-2.5 py-1 text-[11px] font-semibold text-green-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            Live
          </span>
        </div>

        {/* body */}
        <div className="grid grid-cols-1 sm:grid-cols-[184px_1fr]">
          {/* sidebar */}
          <aside className="hidden border-r border-line bg-canvas/40 p-4 sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/oneby-logo.svg"
              alt="OneBy"
              className="mb-5 h-6 w-auto"
            />
            <nav className="space-y-1">
              {nav.map((n) => (
                <div
                  key={n.label}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.85rem] font-medium ${
                    n.active
                      ? "bg-blue/10 text-blue"
                      : "text-ink/70"
                  }`}
                >
                  <n.icon size={16} />
                  {n.label}
                  {n.badge && (
                    <span className="ml-auto rounded-full bg-blue px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {n.badge}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* main */}
          <div className="p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy">Live activity</h3>
              <span className="text-xs text-faint">Today</span>
            </div>

            {/* handled call */}
            <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-4 py-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-green/10 text-green-600">
                <PhoneCall size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-[0.95rem] font-semibold text-navy">
                  Call with Maria G.
                </p>
                <p className="truncate text-xs text-muted">
                  Desk phone · 4:12 · completed
                </p>
              </div>
              <span className="ml-auto shrink-0 rounded-full bg-blue/10 px-2.5 py-1 text-[11px] font-semibold text-blue">
                AI summarized
              </span>
            </div>

            {/* summary */}
            <div className="mt-3 rounded-xl border border-blue/15 bg-gradient-to-b from-blue/[0.06] to-transparent px-4 py-4">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-blue" />
                <span className="text-xs font-bold uppercase tracking-wide text-blue">
                  AI summary
                </span>
              </div>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink">
                Existing customer, upstairs A/C not cooling since last night.
                Home after 3pm, wants a same-day visit.
              </p>
            </div>

            {/* action items */}
            <div className="mt-4">
              <div className="flex items-center gap-2 px-1 pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-faint">
                  Action items
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>

              <div className="space-y-2">
                <ActionRow
                  icon={<Calendar size={16} />}
                  tone="green"
                  title="Schedule A/C diagnostic"
                  meta="Dispatch · today"
                  badge="Confident"
                  badgeTone="green"
                />
                <ActionRow
                  icon={<CornerUpRight size={16} />}
                  tone="blue"
                  title="Text Maria her arrival window"
                  meta="Follow-up"
                  badge="Confident"
                  badgeTone="green"
                />
                <ActionRow
                  icon={<HelpCircle size={16} />}
                  tone="amber"
                  title="Confirm: upstairs unit, not downstairs?"
                  meta="Asks before assuming"
                  badge="Review"
                  badgeTone="amber"
                />
              </div>

              <p className="px-1 pt-2.5 text-[0.72rem] leading-snug text-faint">
                It never invents facts. When it&apos;s unsure, it asks instead of
                guessing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionRow({
  icon,
  tone,
  title,
  meta,
  badge,
  badgeTone,
}: {
  icon: React.ReactNode;
  tone: "green" | "blue" | "amber";
  title: string;
  meta: string;
  badge: string;
  badgeTone: "green" | "amber";
}) {
  const iconBg = {
    green: "bg-green/15 text-green-600",
    blue: "bg-blue/10 text-blue",
    amber: "bg-warning/15 text-warning",
  }[tone];
  const border = {
    green: "border-green/25 bg-green/[0.07]",
    blue: "border-line bg-canvas",
    amber: "border-warning/30 bg-warning/[0.07]",
  }[tone];
  const dot = badgeTone === "green" ? "text-green-600" : "text-warning";
  const dotBg = badgeTone === "green" ? "bg-green" : "bg-warning";

  return (
    <div className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${border}`}>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${iconBg}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[0.85rem] font-semibold text-navy">{title}</p>
        <p className="text-[0.72rem] text-muted">{meta}</p>
      </div>
      <span className={`ml-auto inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold ${dot}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dotBg}`} /> {badge}
      </span>
    </div>
  );
}
