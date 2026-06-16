import Reveal from "./Reveal";
import { Phone, MessageSquare, Bot, ListChecks, Clock, Users } from "lucide-react";

const pillars = [
  {
    icon: Bot,
    title: "Communication-first AI",
    body: "Not a chatbot bolted onto a CRM. OneBy starts where the customer starts, with the conversation, and works outward from there.",
  },
  {
    icon: ListChecks,
    title: "Workflow-native",
    body: "Every call, text, and voicemail becomes a task with an owner and a due date. Nothing lives in a recording nobody listens to.",
  },
  {
    icon: Clock,
    title: "Action-focused",
    body: "We don't sell minutes or dial tone. We sell outcomes: leads captured, jobs booked, customers followed up with.",
  },
];

export default function Solution() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">One platform, not five tools</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              OneBy turns conversations into action.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Calling, SMS, an AI receptionist, summaries, customer timelines,
              and task automation, all in one system that actually fits
              together. The phone setup that finally remembers everything and
              does something about it.
            </p>

            <ul className="mt-8 space-y-4">
              {pillars.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
                    <p.icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy">{p.title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* unified inbox mock */}
          <Reveal delay={100}>
            <div className="surface-card rounded-2xl p-2 shadow-[var(--shadow-lg)]">
              <div className="rounded-xl bg-navy p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Shared team inbox
                </p>
                <div className="mt-4 space-y-2.5">
                  <InboxRow
                    icon={<Phone size={15} />}
                    name="Inbound call · James R."
                    meta="Booked: water heater install"
                    tone="green"
                  />
                  <InboxRow
                    icon={<MessageSquare size={15} />}
                    name="SMS · Dana P."
                    meta="“Can someone come Thursday?”"
                    tone="blue"
                  />
                  <InboxRow
                    icon={<Bot size={15} />}
                    name="AI receptionist · Unknown"
                    meta="New lead, roof leak, details captured"
                    tone="green"
                  />
                  <InboxRow
                    icon={<Users size={15} />}
                    name="Voicemail · Property Mgr."
                    meta="Transcribed + task created"
                    tone="blue"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InboxRow({
  icon,
  name,
  meta,
  tone,
}: {
  icon: React.ReactNode;
  name: string;
  meta: string;
  tone: "green" | "blue";
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/[0.06] px-3 py-2.5">
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
          tone === "green"
            ? "bg-green/20 text-green"
            : "bg-blue/20 text-[#7cc8f4]"
        }`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[0.8rem] font-semibold">{name}</p>
        <p className="truncate text-[0.75rem] text-white/55">{meta}</p>
      </div>
    </div>
  );
}
