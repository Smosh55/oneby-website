"use client";

import { Check, Printer, Star } from "lucide-react";
import type { Template } from "@/data/templates";
import { industryAccentStyle } from "@/data/industryThemes";

// The free deliverable, rendered in full on the page: a clean, printable
// estimate sheet with the trade's Good/Better/Best options. Fillable fields are
// left blank so an owner can print it and write on it, or copy the structure.
// Print styles collapse everything but the sheet. Accent is themed by trade.
export default function EstimateTemplateDoc({ template }: { template: Template }) {
  return (
    <div style={industryAccentStyle(template.tradeSlug)}>
      {/* Toolbar (hidden on print) */}
      <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
        <p className="text-sm text-muted">
          Free to use. Fill in your prices, print it, or copy the layout.
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="btn btn-ghost !min-h-[38px] text-sm"
        >
          <Printer size={15} /> Print
        </button>
      </div>

      {/* The estimate sheet */}
      <div
        id="template-sheet"
        className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-md)] print:rounded-none print:border-0 print:shadow-none"
      >
        {/* Sheet header */}
        <div className="border-b border-line bg-canvas/60 px-6 py-5 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="h-7 w-40 rounded border border-dashed border-line bg-white" />
              <p className="mt-1.5 text-[0.7rem] uppercase tracking-wide text-faint">
                Your business name, license #, phone
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-extrabold tracking-tight text-navy">ESTIMATE</p>
              <p className="mt-1 text-[0.75rem] text-faint">
                No. __________ · Date __________
              </p>
              <p className="text-[0.75rem] text-faint">Valid for 30 days</p>
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Prepared for" hint="Customer name" />
            <Field label="Job address" hint="Street, city, state" />
          </div>
          <div className="mt-3">
            <Field label="Scope" hint={template.scenario} />
          </div>
        </div>

        {/* Three options */}
        <div className="grid gap-px bg-line sm:grid-cols-3">
          {template.tiers.map((tier) => (
            <div
              key={tier.tier}
              className={`relative flex flex-col bg-white p-5 ${
                tier.recommended ? "ring-2 ring-inset ring-blue" : ""
              }`}
            >
              {tier.recommended && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-blue/10 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-blue">
                  <Star size={10} className="fill-blue" /> Recommended
                </span>
              )}
              <p className="text-[0.7rem] font-bold uppercase tracking-wide text-faint">
                {tier.tier}
              </p>
              <h3 className="mt-1 text-[1.05rem] font-bold leading-snug text-navy">
                {tier.name}
              </h3>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">
                {tier.blurb}
              </p>

              <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                {tier.lines.map((line) => (
                  <li key={line.label} className="flex gap-2 text-[0.82rem] leading-snug">
                    <Check size={14} className="mt-0.5 shrink-0 text-blue" />
                    <span className="text-ink">
                      {line.label}
                      {line.detail && (
                        <span className="block text-[0.72rem] text-faint">
                          {line.detail}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
                <span className="text-[0.72rem] uppercase tracking-wide text-faint">
                  Your price
                </span>
                <span className="text-lg font-extrabold text-navy">$________</span>
              </div>
              <label className="mt-3 flex items-center gap-2 text-[0.75rem] text-muted">
                <span className="grid h-4 w-4 place-items-center rounded border border-line" />
                Accept this option
              </label>
            </div>
          ))}
        </div>

        {/* Terms + signature */}
        <div className="border-t border-line px-6 py-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Deposit to schedule" hint="$ or % due to book the job" />
            <Field label="Estimated start" hint="Date or lead time" />
          </div>
          <p className="mt-4 text-[0.72rem] leading-relaxed text-faint">
            Prices assume conditions described above. Work not listed is quoted
            separately. Warranty and payment terms: __________________________.
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <SignLine label="Customer signature" />
            <SignLine label="Date" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint }: { label: string; hint: string }) {
  return (
    <div>
      <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-faint">
        {label}
      </p>
      <div className="mt-1 flex h-8 items-end border-b border-dashed border-line">
        <span className="pb-0.5 text-[0.78rem] italic text-faint/70">{hint}</span>
      </div>
    </div>
  );
}

function SignLine({ label }: { label: string }) {
  return (
    <div>
      <div className="h-8 border-b border-line" />
      <p className="mt-1 text-[0.7rem] uppercase tracking-wide text-faint">{label}</p>
    </div>
  );
}
