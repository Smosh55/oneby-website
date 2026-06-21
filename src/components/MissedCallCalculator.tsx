"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingDown, PhoneMissed } from "lucide-react";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

type Field = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
};

const fields: Field[] = [
  { key: "calls", label: "Inbound calls per week", min: 10, max: 500, step: 5 },
  { key: "missed", label: "Percent you miss", min: 0, max: 80, step: 1, suffix: "%" },
  { key: "opp", label: "Share that are real job opportunities", min: 0, max: 100, step: 5, suffix: "%" },
  { key: "value", label: "Average job value", min: 50, max: 5000, step: 50, prefix: "$" },
  { key: "close", label: "Your close rate on answered calls", min: 5, max: 90, step: 5, suffix: "%" },
];

export default function MissedCallCalculator() {
  const [v, setV] = useState<Record<string, number>>({
    calls: 100,
    missed: 25,
    opp: 50,
    value: 450,
    close: 40,
  });

  const lostJobsWeek =
    v.calls * (v.missed / 100) * (v.opp / 100) * (v.close / 100);
  const week = lostJobsWeek * v.value;
  const month = week * 4.33;
  const year = week * 52;
  const recovered = year * 0.5; // recovering even half of missed opportunities

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Inputs */}
      <div className="surface-card rounded-2xl p-6 sm:p-7">
        <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
          <PhoneMissed size={18} className="text-blue" /> Your numbers
        </h2>
        <div className="mt-6 space-y-6">
          {fields.map((f) => (
            <div key={f.key}>
              <div className="flex items-baseline justify-between">
                <label htmlFor={f.key} className="text-sm font-medium text-ink">
                  {f.label}
                </label>
                <span className="text-sm font-bold text-navy">
                  {f.prefix}
                  {f.key === "value" ? v[f.key].toLocaleString() : v[f.key]}
                  {f.suffix}
                </span>
              </div>
              <input
                id={f.key}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={v[f.key]}
                onChange={(e) =>
                  setV((p) => ({ ...p, [f.key]: Number(e.target.value) }))
                }
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-line"
                style={{ accentColor: "var(--color-blue)" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-warning/30 bg-warning/[0.06] p-6 sm:p-7">
          <div className="flex items-center gap-2 text-warning">
            <TrendingDown size={18} />
            <span className="text-xs font-bold uppercase tracking-wide">
              Walking out the door
            </span>
          </div>
          <p className="mt-3 text-5xl font-extrabold tracking-tight text-navy">
            {money(year)}
            <span className="ml-2 text-base font-semibold text-muted">/ year</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            That is about {Math.round(lostJobsWeek * 52)} jobs a year you never
            got the chance to win, roughly {money(month)} every month.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-surface px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-faint">
                Per week
              </p>
              <p className="mt-1 text-xl font-extrabold text-navy">{money(week)}</p>
            </div>
            <div className="rounded-xl border border-line bg-surface px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-faint">
                Per month
              </p>
              <p className="mt-1 text-xl font-extrabold text-navy">{money(month)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-green/30 bg-green/[0.07] p-6 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wide text-green-600">
            Recover even half
          </p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy">
            {money(recovered)}
            <span className="ml-2 text-base font-semibold text-muted">/ year</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            If OneBy answered the calls you miss and booked even half of them,
            that is what comes back. For a fraction of the cost.
          </p>
          <Link href="/demo" className="btn btn-primary mt-5 w-full">
            See it answer your calls <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
