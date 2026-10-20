import { CheckCircle2, ArrowRight } from "lucide-react";
import DemoSwitcher from "./DemoSwitcher";
import HeroFlow from "./HeroFlow";
import { launch } from "@/config/site";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
      {/* Brand background: an asymmetric navy wash on the left and a green
          corner glow, instead of the generic centered gradient. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-48 -top-28 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(4,3,79,0.07),transparent)]" />
        <div className="absolute right-[-8%] top-6 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.16),transparent)]" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Left: editorial copy */}
          <div className="max-w-xl">
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
              Stop losing customers to a{" "}
              <span className="relative whitespace-nowrap">
                beep
                <span className="absolute -bottom-1 left-0 h-[0.16em] w-full rounded-full bg-green" />
              </span>
              .
            </h1>

            <p
              className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
              style={{ animationDelay: "120ms" }}
            >
              OneBy answers the calls you can&apos;t, writes the summary, opens
              the ticket, and books the job. The phone system, AI receptionist,
              and CRM in one, from the IT firm that already runs the phones for
              real businesses.
            </p>

            <div
              className="animate-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "180ms" }}
            >
              <a href="#waitlist" className="btn btn-primary text-base">
                Request an invite <ArrowRight size={18} />
              </a>
              <a href="#demo" className="btn btn-ghost text-base">
                See a real call become a ticket
              </a>
            </div>

            {/* price anchor */}
            <p
              className="animate-rise mt-4 text-sm font-medium text-muted"
              style={{ animationDelay: "210ms" }}
            >
              <a href="/founders" className="transition-colors hover:text-navy">
                Founders lock the AI at{" "}
                <span className="font-bold text-navy">$39/mo</span>, not the $49
                standard
              </a>
            </p>

            {/* edge row — the two things nobody else in the category can say */}
            <div
              className="animate-rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-muted"
              style={{ animationDelay: "240ms" }}
            >
              {["Plugs into ChatGPT & Claude", "No per-call meter", "Keep your number"].map(
                (r) => (
                  <span key={r} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-green" /> {r}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right: looping "one call, start to finish" animation */}
          <div className="animate-rise" style={{ animationDelay: "160ms" }}>
            <HeroFlow />
          </div>
        </div>

        {/* Oversized, interactive app mock with an industry switcher */}
        <div className="animate-rise mt-16 lg:mt-20" style={{ animationDelay: "220ms" }}>
          <DemoSwitcher />
        </div>
      </div>
    </section>
  );
}
