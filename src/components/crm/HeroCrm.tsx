/* eslint-disable @next/next/no-img-element */
import { CheckCircle2, ArrowRight, CalendarCheck, CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { launch } from "@/config/site";

// CRM-first hero. Leads with the CRM (jobs, scheduling, invoicing, customers)
// and positions against Jobber / Housecall Pro, with the open MCP connector as
// the edge. The AI answering story is parked, so it stays out of here.
export default function HeroCrm() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-48 -top-28 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(4,3,79,0.07),transparent)]" />
        <div className="absolute right-[-8%] top-6 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.16),transparent)]" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Left: editorial copy */}
          <div className="min-w-0 max-w-xl">
            <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3.5 py-1.5 text-[0.8rem] font-semibold text-navy shadow-[var(--shadow-sm)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              {launch.statusLabel}
            </span>

            <h1
              className="animate-rise mt-6 text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-[4rem]"
              style={{ animationDelay: "60ms" }}
            >
              Run your whole team and all your work in{" "}
              <span className="relative whitespace-nowrap">
                one place
                <span className="absolute -bottom-0.5 left-0 h-[5px] w-full rounded-full bg-green" />
              </span>
              .
            </h1>

            <p
              className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
              style={{ animationDelay: "120ms" }}
            >
              OneBy gives your whole team one place to manage customers,
              projects, scheduling, and invoicing, from the first request to the
              final payment, for any business in any industry. Tailored to how
              you work, with a dedicated account rep and an open connector for
              the AI you already use.
            </p>

            <div
              className="animate-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "180ms" }}
            >
              <a href="#waitlist" className="btn btn-primary text-base">
                Request an invite <ArrowRight size={18} />
              </a>
              <Link href="/compare" className="btn btn-ghost text-base">
                See how it compares
              </Link>
            </div>

            <p
              className="animate-rise mt-4 text-sm font-medium text-muted"
              style={{ animationDelay: "210ms" }}
            >
              <Link href="/founders" className="transition-colors hover:text-navy">
                Founding members lock in early pricing{" "}
                <span className="font-bold text-navy">→</span>
              </Link>
            </p>

            {/* edge row — the things a plain field CRM can't all say */}
            <div
              className="animate-rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-muted"
              style={{ animationDelay: "240ms" }}
            >
              {[
                "$15 per user, every feature included",
                "Complimentary onboarding + a dedicated rep",
                "Open connector — works with any AI model",
              ].map((r) => (
                <span key={r} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-green" /> {r}
                </span>
              ))}
            </div>
          </div>

          {/* Right: a real screen from the product on a soft brand stage, with
              small floating status cards for life (Jobber / Housecall-Pro feel).
              Labels are illustrative product events only — no stats or reviews. */}
          <div className="animate-rise relative min-w-0" style={{ animationDelay: "160ms" }}>
            {/* soft tinted stage behind the product */}
            <div className="pointer-events-none absolute -inset-x-5 -top-6 bottom-0 -z-0 rounded-[32px] bg-[linear-gradient(135deg,rgba(28,219,150,0.16),rgba(0,143,224,0.10))]" />

            {/* framed real screenshot */}
            <div className="relative z-10 mx-auto w-full max-w-xl overflow-hidden rounded-[18px] border border-line bg-white shadow-[var(--shadow-xl)]">
              <div className="flex items-center gap-1.5 border-b border-line bg-canvas px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="ml-2 text-[0.72rem] font-semibold text-muted">
                  Work board
                </span>
              </div>
              <img
                src="/product/jobs-board.png"
                width={1512}
                height={791}
                alt="A OneBy work board with jobs moving across Active, In progress, On hold, and Done columns, each showing the customer, schedule, and assigned person."
                className="block h-auto w-full"
              />
            </div>

            {/* floating status card — top left */}
            <div
              className="animate-rise absolute -left-4 top-12 z-20 hidden items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lg)] sm:flex"
              style={{ animationDelay: "340ms" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green/15 text-green-600">
                <CalendarCheck size={16} />
              </span>
              <div className="leading-tight">
                <p className="text-[0.8rem] font-bold text-navy">Job scheduled</p>
                <p className="text-[0.72rem] text-muted">Added to the board</p>
              </div>
            </div>

            {/* floating status card — bottom right */}
            <div
              className="animate-rise absolute -right-3 bottom-10 z-20 hidden items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lg)] sm:flex"
              style={{ animationDelay: "440ms" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue/12 text-blue">
                <CircleDollarSign size={16} />
              </span>
              <div className="leading-tight">
                <p className="text-[0.8rem] font-bold text-navy">Invoice paid</p>
                <p className="text-[0.72rem] text-muted">Marked on the job</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
