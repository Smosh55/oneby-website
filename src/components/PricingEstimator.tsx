"use client";

import { useState } from "react";
import { Minus, Plus, Sparkles, Phone, Building } from "lucide-react";
import { estimatorRates } from "@/data/pricing";

type RowKey = "aiSeats" | "basicLines" | "commonArea";

const rows: {
  key: RowKey;
  rate: number;
  label: string;
  hint: string;
  icon: typeof Sparkles;
  accent: string;
}[] = [
  {
    key: "aiSeats",
    rate: estimatorRates.aiSeat,
    label: "AI seats (Solo)",
    hint: "For the lines that book jobs: dispatch, intake, sales, the owner.",
    icon: Sparkles,
    accent: "text-blue",
  },
  {
    key: "basicLines",
    rate: estimatorRates.basicLine,
    label: "Basic lines",
    hint: "Calling, desk phone, SMS, and fax for phones that just need to work.",
    icon: Phone,
    accent: "text-green-600",
  },
  {
    key: "commonArea",
    rate: estimatorRates.commonArea,
    label: "Common-area phones",
    hint: "Lobby, conference, and paging handsets. Dialtone only, no license.",
    icon: Building,
    accent: "text-muted",
  },
];

export default function PricingEstimator() {
  const [counts, setCounts] = useState<Record<RowKey, number>>({
    aiSeats: 3,
    basicLines: 10,
    commonArea: 2,
  });

  const set = (key: RowKey, delta: number) =>
    setCounts((c) => ({ ...c, [key]: Math.max(0, c[key] + delta) }));

  const setVal = (key: RowKey, v: string) =>
    setCounts((c) => ({ ...c, [key]: Math.max(0, Math.min(9999, parseInt(v || "0", 10) || 0)) }));

  const total =
    counts.aiSeats * estimatorRates.aiSeat +
    counts.basicLines * estimatorRates.basicLine +
    counts.commonArea * estimatorRates.commonArea;

  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-[1.3fr_1fr]">
      {/* Inputs */}
      <div className="surface-card rounded-2xl p-6 sm:p-8">
        <div className="space-y-5">
          {rows.map((r) => (
            <div
              key={r.key}
              className="flex flex-col gap-3 border-b border-line pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 ${r.accent}`}>
                  <r.icon size={20} />
                </span>
                <div>
                  <p className="font-semibold text-navy">
                    {r.label}{" "}
                    <span className="text-sm font-normal text-faint">
                      ${r.rate}/mo each
                    </span>
                  </p>
                  <p className="mt-0.5 max-w-sm text-[0.85rem] leading-relaxed text-muted">
                    {r.hint}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => set(r.key, -1)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line text-navy transition-colors hover:bg-canvas-2"
                  aria-label={`Decrease ${r.label}`}
                >
                  <Minus size={16} />
                </button>
                <input
                  inputMode="numeric"
                  value={counts[r.key]}
                  onChange={(e) => setVal(r.key, e.target.value)}
                  className="h-9 w-14 rounded-lg border border-line text-center text-[0.95rem] font-semibold text-navy focus:border-blue focus:outline-none"
                  aria-label={`${r.label} count`}
                />
                <button
                  onClick={() => set(r.key, 1)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line text-navy transition-colors hover:bg-canvas-2"
                  aria-label={`Increase ${r.label}`}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex flex-col justify-between rounded-2xl bg-navy p-6 text-white sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
            Estimated monthly total
          </p>
          <p className="mt-2 text-5xl font-extrabold tracking-tight">
            ${total.toLocaleString()}
            <span className="ml-1 text-base font-medium text-white/50">/mo</span>
          </p>
          <div className="mt-6 space-y-2 text-[0.85rem] text-white/65">
            <Line n={counts.aiSeats} unit="AI seat" rate={estimatorRates.aiSeat} />
            <Line n={counts.basicLines} unit="basic line" rate={estimatorRates.basicLine} />
            <Line
              n={counts.commonArea}
              unit="common-area phone"
              rate={estimatorRates.commonArea}
            />
          </div>
        </div>
        <div className="mt-6">
          <a href="/demo" className="btn btn-white w-full">
            Get this exact quote
          </a>
          <p className="mt-3 text-center text-[0.75rem] text-white/45">
            Estimate only. Pro and add-ons priced separately.
          </p>
        </div>
      </div>
    </div>
  );
}

function Line({ n, unit, rate }: { n: number; unit: string; rate: number }) {
  if (n === 0) return null;
  return (
    <div className="flex items-center justify-between">
      <span>
        {n} {unit}
        {n === 1 ? "" : "s"} &times; ${rate}
      </span>
      <span className="font-semibold text-white/85">
        ${(n * rate).toLocaleString()}
      </span>
    </div>
  );
}
