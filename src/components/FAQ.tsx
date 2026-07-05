"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { homeFaqs as faqs } from "@/data/homeFaqs";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-canvas py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Questions, answered.
          </h2>
          <p className="mt-5 text-[0.975rem] leading-relaxed text-muted">
            Still curious? Book a 20-minute demo and we&apos;ll walk through
            your exact call flow.
          </p>
          <a href="#demo" className="btn btn-ghost mt-6">
            Talk to us
          </a>
        </Reveal>

        <Reveal delay={80} className="divide-y divide-line rounded-2xl border border-line bg-white px-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[1rem] font-semibold text-navy">
                    {f.q}
                  </span>
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
        </Reveal>
      </div>
    </section>
  );
}
