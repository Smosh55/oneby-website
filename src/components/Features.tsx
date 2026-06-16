import Reveal from "./Reveal";
import {
  Bot,
  FileText,
  History,
  MessageSquare,
  Workflow,
  Smartphone,
  Mic,
  Search,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Receptionist",
    body: "Answers unanswered calls, collects information, understands intent, and never puts a customer on hold.",
    span: true,
  },
  {
    icon: FileText,
    title: "Smart Summaries",
    body: "Every conversation distilled into a clean, scannable recap — automatically.",
  },
  {
    icon: History,
    title: "Customer Timeline",
    body: "Every call, text, voicemail, task, and note for a customer in one place.",
  },
  {
    icon: MessageSquare,
    title: "Business SMS",
    body: "A shared team inbox so texts never get stranded on one person's phone.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    body: "Tasks created automatically from conversations and routed to the right person.",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    body: "Run your business communications from anywhere — the truck, the office, the couch.",
  },
  {
    icon: Mic,
    title: "Call Recording",
    body: "Searchable recordings with AI insights you can actually act on.",
    span: true,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The platform</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Everything you need to never drop a customer.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Each feature feeds the next. Calls become summaries, summaries
            become tasks, tasks become resolved jobs.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 3) * 70}
              className={f.span ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <div className="group surface-card h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] hover:border-blue/30">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue/10 to-green/10 text-blue transition-colors group-hover:from-blue/15 group-hover:to-green/15">
                  <f.icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy">
                  {f.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}

          {/* search highlight card */}
          <Reveal delay={140} className="sm:col-span-2 lg:col-span-2">
            <div className="surface-card flex h-full flex-col justify-between gap-6 rounded-2xl bg-navy p-7 text-white sm:flex-row sm:items-center">
              <div className="max-w-sm">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-green">
                  <Search size={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">
                  Ask your conversations anything
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">
                  “Which customers asked about financing last month?” Search
                  across every call and text in plain English.
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.06] p-4 sm:w-64">
                <div className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white/80">
                  financing requests · April
                </div>
                <div className="mt-2 space-y-1.5 text-[0.8rem] text-white/60">
                  <p className="rounded-md bg-white/[0.05] px-3 py-1.5">
                    3 matches found
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
