import Link from "next/link";
import Reveal from "../Reveal";
import { Check, X } from "lucide-react";

// Honest head-to-head. Jobber and Housecall Pro are strong at the jobs-to-paid
// workflow — OneBy matches that, then adds the things a plain field CRM doesn't
// have: a built-in business phone, an open AI connector, and a free CRM tier.
const rows: { label: string; cells: boolean[] }[] = [
  { label: "Jobs, scheduling & dispatch", cells: [true, true, true] },
  { label: "Estimates & invoicing with card payments", cells: [true, true, true] },
  { label: "Customer history & timeline", cells: [true, true, true] },
  { label: "Built-in business phone & SMS", cells: [true, false, false] },
  { label: "Open AI connector (bring Claude, ChatGPT, Gemini)", cells: [true, false, false] },
  { label: "Onboarding + a dedicated rep on every plan", cells: [true, false, false] },
  { label: "Customizations to fit your workflow", cells: [true, false, false] },
];

const cols = [
  { name: "OneBy", oneby: true },
  { name: "Jobber", note: "Field CRM" },
  { name: "Housecall Pro", note: "Field CRM" },
];

export default function CrmComparison() {
  return (
    <section className="bg-canvas py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Why OneBy</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            The same jobs-to-paid workflow. Plus your phone and your AI.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Jobber and Housecall Pro are good at running jobs. OneBy runs jobs
            too, then adds the business phone, an open connector for the AI you
            already use, and a dedicated rep with onboarding on every plan.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-sm)]">
            {/* header */}
            <div className="grid grid-cols-[1.8fr_repeat(3,1fr)] border-b border-line bg-canvas/70">
              <div className="px-5 py-4 text-sm font-semibold text-muted">
                Capability
              </div>
              {cols.map((c) => (
                <div
                  key={c.name}
                  className={`px-3 py-4 text-center ${c.oneby ? "bg-blue/5" : ""}`}
                >
                  <p className={`text-sm font-bold ${c.oneby ? "text-blue" : "text-navy"}`}>
                    {c.name}
                  </p>
                  {c.note && (
                    <p className="mt-0.5 text-[10px] leading-tight text-faint">{c.note}</p>
                  )}
                </div>
              ))}
            </div>

            {/* rows */}
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.8fr_repeat(3,1fr)] items-center border-b border-line last:border-0"
              >
                <div className="px-5 py-4 text-[0.9rem] font-medium text-ink">
                  {row.label}
                </div>
                {row.cells.map((on, ci) => (
                  <div
                    key={ci}
                    className={`flex justify-center px-3 py-4 ${ci === 0 ? "bg-blue/5" : ""}`}
                  >
                    {on ? (
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-full ${
                          ci === 0
                            ? "bg-green/15 text-green-600"
                            : "bg-canvas-2 text-muted"
                        }`}
                      >
                        <Check size={14} strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-canvas-2 text-faint">
                        <X size={13} strokeWidth={2.5} />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-faint">
            Comparison reflects typical product positioning. Competitor names are
            trademarks of their respective owners.
          </p>
          <div className="mt-6 text-center">
            <Link
              href="/compare"
              className="inline-flex text-sm font-semibold text-blue hover:underline"
            >
              See the full head-to-head comparisons →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
