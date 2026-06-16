"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FAQ } from "@/data/industries";

export default function IndustryFAQ({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line bg-white px-2">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[1rem] font-semibold text-navy">{f.q}</span>
              <Plus
                size={20}
                className={`shrink-0 text-blue transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <p className="px-4 pb-5 text-[0.95rem] leading-relaxed text-muted">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
