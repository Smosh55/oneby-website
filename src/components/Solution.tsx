import Reveal from "./Reveal";
import { Phone, MessageSquare, Bot, Users, Ticket, CalendarDays, Receipt } from "lucide-react";

const pillars = [
  {
    icon: Bot,
    title: "It catches every call",
    body: "Your team answers what they can. The AI catches the rest, overflow and after-hours included, so nothing goes to voicemail.",
  },
  {
    icon: Ticket,
    title: "It tickets the job",
    body: "The call becomes a structured ticket on its own: who called, what they need, how urgent, assigned and ready.",
  },
  {
    icon: CalendarDays,
    title: "It schedules the work",
    body: "Drop the job on a tech and a time, synced two-way with Google and Microsoft calendars.",
  },
  {
    icon: Receipt,
    title: "It invoices and gets paid",
    body: "Invoice the finished job and text a pay link. The customer taps to pay by card.",
  },
];

export default function Solution() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="min-w-0">
            <span className="eyebrow">One platform, not five tools</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              The whole job, from the first ring to paid.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Your team answers the calls they can; the AI catches the rest, so
              you never miss one. Then every call, whoever picks up, gets
              summarized and flows straight into a ticket, a schedule, and an
              invoice. One platform built around the call.
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
          <Reveal delay={100} className="min-w-0">
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
