import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroBoard from "./HeroBoard";
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
              className="animate-rise mt-6 text-[2.75rem] font-extrabold leading-[1.0] tracking-tight text-navy sm:text-6xl lg:text-[4rem]"
              style={{ animationDelay: "60ms" }}
            >
              The CRM your service business actually{" "}
              <span className="relative whitespace-nowrap">
                runs on
                <span className="absolute -bottom-1 left-0 h-[0.16em] w-full rounded-full bg-green" />
              </span>
              .
            </h1>

            <p
              className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
              style={{ animationDelay: "120ms" }}
            >
              Jobs, scheduling, estimates, invoicing, and every customer&apos;s
              history in one place. Built and run every day by an IT company that
              lives in it. The straightforward alternative to Jobber and Housecall
              Pro.
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
                "Open API — plug in Claude, ChatGPT & Gemini",
                "Built by an MSP that runs on it",
                "The CRM is free",
              ].map((r) => (
                <span key={r} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-green" /> {r}
                </span>
              ))}
            </div>
          </div>

          {/* Right: real-looking CRM board */}
          <div className="animate-rise min-w-0" style={{ animationDelay: "160ms" }}>
            <HeroBoard />
          </div>
        </div>
      </div>
    </section>
  );
}
