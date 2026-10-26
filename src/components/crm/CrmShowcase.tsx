import Link from "next/link";
import Reveal from "../Reveal";
import {
  Ticket,
  CalendarDays,
  Layers,
  Receipt,
  History,
  Tags,
  Wrench,
  BarChart3,
  ArrowRight,
} from "lucide-react";

// The CRM capability grid. Every card points at a live feature page — the AI
// answering/automation features are parked, so none appear here.
const items = [
  { icon: Ticket, title: "Jobs & tickets", body: "Every job in one place, from first request to paid — status, priority, owner, and history on each one.", href: "/features/ticketing" },
  { icon: CalendarDays, title: "Scheduling & dispatch", body: "Assign a tech and a time, see the whole week, and the customer gets a confirmation text automatically.", href: "/features/scheduling" },
  { icon: Layers, title: "Estimates & quotes", body: "Send Good, Better, Best options the customer approves and puts a deposit on, right from their phone.", href: "/features/estimates" },
  { icon: Receipt, title: "Invoicing & payments", body: "Invoice the finished job and text a pay link they tap to pay by card. Milestones and recurring, too.", href: "/features/invoicing" },
  { icon: History, title: "Customers & timeline", body: "Every job, note, and interaction for a customer on one timeline the whole team can see.", href: "/features/customer-timeline" },
  { icon: Tags, title: "Price book", body: "Set your services and parts once, then build every estimate and invoice from the same catalog.", href: "/features/price-book" },
  { icon: Wrench, title: "Equipment & warranties", body: "Track every unit you install, its serial and warranty, and its full service history for life.", href: "/features/equipment-warranties" },
  { icon: BarChart3, title: "Reports & insights", body: "Revenue, who owes you and for how long, and what's actually selling — built in, always current.", href: "/features/reports-insights" },
];

export default function CrmShowcase() {
  return (
    <section id="crm" className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The CRM</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Everything to run the work, in one place.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            The job, the schedule, the money, and the customer — all together,
            instead of stitching five apps and a spreadsheet into something that
            sort of works.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={(i % 4) * 80}>
                <Link
                  href={it.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10 text-blue">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-bold text-navy">
                    {it.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">
                    {it.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[0.82rem] font-semibold text-blue">
                    Learn more
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
