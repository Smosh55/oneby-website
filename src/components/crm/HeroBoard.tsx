// Hero visual for the CRM-first homepage: a real-looking "Today" board from the
// product — jobs moving across stages, with scheduling, techs, and invoices in
// one view. Static, a few KB, brand-colored. Swap for a live screenshot later
// without touching the hero layout. Demo data only; no real customers.

type Stage = "scheduled" | "progress" | "invoiced" | "paid";

const jobs: {
  customer: string;
  service: string;
  tech: string;
  initials: string;
  when: string;
  amount?: string;
  stage: Stage;
  priority?: boolean;
}[] = [
  { customer: "Rivera Residence", service: "A/C not cooling", tech: "Luis M.", initials: "LM", when: "2:00 PM", stage: "scheduled", priority: true },
  { customer: "Hillside Dental", service: "Rooftop unit — no heat", tech: "Sam R.", initials: "SR", when: "9:30 AM", stage: "progress" },
  { customer: "Brooks, Dana", service: "Thermostat install", tech: "Dana K.", initials: "DK", when: "Today", amount: "$240", stage: "invoiced" },
  { customer: "Alvarez HVAC Plan", service: "Seasonal tune-up", tech: "Luis M.", initials: "LM", when: "Today", amount: "$520", stage: "paid" },
];

const stageMeta: Record<Stage, { label: string; cls: string }> = {
  scheduled: { label: "Scheduled", cls: "hb-blue" },
  progress: { label: "In progress", cls: "hb-amber" },
  invoiced: { label: "Invoiced", cls: "hb-navy" },
  paid: { label: "Paid", cls: "hb-green" },
};

export default function HeroBoard() {
  return (
    <div className="hb-root relative mx-auto w-full max-w-lg select-none">
      <style>{css}</style>

      <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[var(--shadow-xl)]">
        {/* header chrome */}
        <div className="flex items-center justify-between border-b border-line bg-canvas px-5 py-3">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/oneby-logo.svg" alt="OneBy" className="h-5 w-auto" />
            <span className="text-[0.78rem] font-semibold text-muted">
              Maple Leaf Heating &amp; Air
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-muted">
            <span className="h-2 w-2 rounded-full bg-green hb-live" /> Live
          </span>
        </div>

        {/* tab row */}
        <div className="flex items-center gap-1 border-b border-line px-4 py-2.5">
          {["Jobs", "Schedule", "Invoices", "Customers"].map((t, i) => (
            <span
              key={t}
              className={`rounded-lg px-2.5 py-1 text-[0.74rem] font-semibold ${
                i === 0 ? "bg-navy text-white" : "text-faint"
              }`}
            >
              {t}
            </span>
          ))}
          <span className="ml-auto text-[0.72rem] font-semibold text-blue">
            + New job
          </span>
        </div>

        {/* job rows */}
        <div className="divide-y divide-line">
          {jobs.map((j) => {
            const m = stageMeta[j.stage];
            return (
              <div key={j.customer} className="flex items-center gap-3 px-5 py-3.5">
                <span className="hb-avatar">{j.initials}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[0.9rem] font-bold text-navy">
                      {j.customer}
                    </p>
                    {j.priority && <span className="hb-chip hb-priority">Priority</span>}
                  </div>
                  <p className="truncate text-[0.8rem] text-muted">
                    {j.service} &middot; {j.tech} &middot; {j.when}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className={`hb-chip ${m.cls}`}>{m.label}</span>
                  {j.amount && (
                    <span className="text-[0.8rem] font-bold text-navy">{j.amount}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* footer stat bar */}
        <div className="flex items-center justify-between border-t border-line bg-canvas px-5 py-3">
          <p className="text-[0.76rem] font-semibold text-navy">
            Today &middot; 12 jobs &middot;{" "}
            <span className="text-green-600">$4,180 invoiced</span>
          </p>
          <p className="text-[0.72rem] font-semibold text-muted">Everything in one place</p>
        </div>
      </div>
    </div>
  );
}

const css = `
.hb-avatar {
  display: grid; place-items: center; width: 34px; height: 34px; flex: none;
  border-radius: 50%; background: #04034F; color: #fff;
  font-size: 0.68rem; font-weight: 700;
}
.hb-chip {
  display: inline-flex; align-items: center;
  font-size: 0.66rem; font-weight: 700; letter-spacing: 0.01em;
  border-radius: 999px; padding: 2px 9px; white-space: nowrap;
}
.hb-blue { color:#0b6cc0; background:#E8F4FD; border:1px solid #BFE0F7; }
.hb-amber { color:#92400e; background:#FEF3E2; border:1px solid #F7D9AE; }
.hb-navy { color:#3b3a7a; background:#ECECF7; border:1px solid #D4D4EC; }
.hb-green { color:#0f8f63; background:#E4FAF1; border:1px solid #B5EBD5; }
.hb-priority { color:#b4232a; background:#FDECEC; border:1px solid #F6CBCB; }
.hb-live { animation: hb-blink 1.8s ease-in-out infinite; }
@keyframes hb-blink { 0%,100%{opacity:1} 50%{opacity:.25} }
@media (prefers-reduced-motion: reduce) { .hb-live { animation: none; } }
`;
