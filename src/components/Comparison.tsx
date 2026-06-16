import Reveal from "./Reveal";
import { Check, X } from "lucide-react";

const rows = [
  "AI answers unanswered calls",
  "Turns conversations into tasks automatically",
  "Unified call + SMS + voicemail timeline",
  "Built for field & home-service teams",
  "Works without new phone hardware",
  "Action-focused, not just communication",
];

const cols = [
  { name: "OneBy", oneby: true },
  { name: "VoIP / phone systems", note: "RingCentral, Dialpad, Zoom" },
  { name: "Field CRMs", note: "ServiceTitan, Jobber" },
];

// which competitor columns get a check for each row (oneby always true)
const matrix: boolean[][] = [
  [true, false, false],
  [true, false, false],
  [true, true, false],
  [true, false, true],
  [true, false, true],
  [true, false, false],
];

export default function Comparison() {
  return (
    <section className="bg-canvas py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Why OneBy</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Not another phone system. Not another CRM.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Phone systems move minutes. CRMs store records. OneBy sits in the
            middle and turns the conversation itself into action.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-sm)]">
            {/* header */}
            <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] border-b border-line bg-canvas/70">
              <div className="px-5 py-4 text-sm font-semibold text-muted">
                Capability
              </div>
              {cols.map((c) => (
                <div
                  key={c.name}
                  className={`px-3 py-4 text-center ${
                    c.oneby ? "bg-blue/5" : ""
                  }`}
                >
                  <p
                    className={`text-sm font-bold ${
                      c.oneby ? "text-blue" : "text-navy"
                    }`}
                  >
                    {c.name}
                  </p>
                  {c.note && (
                    <p className="mt-0.5 text-[10px] leading-tight text-faint">
                      {c.note}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* rows */}
            {rows.map((row, ri) => (
              <div
                key={row}
                className="grid grid-cols-[1.6fr_repeat(3,1fr)] items-center border-b border-line last:border-0"
              >
                <div className="px-5 py-4 text-[0.9rem] font-medium text-ink">
                  {row}
                </div>
                {matrix[ri].map((on, ci) => (
                  <div
                    key={ci}
                    className={`flex justify-center px-3 py-4 ${
                      ci === 0 ? "bg-blue/5" : ""
                    }`}
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
            Comparison reflects typical product positioning. Competitor names
            are trademarks of their respective owners.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
