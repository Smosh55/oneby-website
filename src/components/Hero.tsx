import { Sparkles, CheckCircle2, ArrowRight, Star } from "lucide-react";
import HeroAppMock from "./HeroAppMock";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[680px] w-[1200px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.16),transparent)]" />
        <div className="absolute top-24 right-[12%] h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.18),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(4,3,79,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(4,3,79,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 75% 50% at 50% 30%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 50% at 50% 30%, black, transparent)",
          }}
        />
      </div>

      <div className="container-x">
        {/* Centered copy */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="animate-rise eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            <Sparkles size={14} /> The AI Communications OS for every business
          </span>

          <h1
            className="animate-rise mt-5 text-[2.6rem] leading-[1.04] font-extrabold tracking-tight text-navy sm:text-6xl lg:text-[4.25rem]"
            style={{ animationDelay: "60ms" }}
          >
            Turn every call <span className="text-gradient">into action.</span>
          </h1>

          <p
            className="animate-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: "120ms" }}
          >
            OneBy answers your calls, writes the summary, and turns each one into
            the next action. Answered or missed, desk phone or mobile, nothing
            slips through.
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <a href="/demo" className="btn btn-primary text-base">
              Book a demo <ArrowRight size={18} />
            </a>
            <a href="/pricing" className="btn btn-ghost text-base">
              Start free trial
            </a>
          </div>

          <div
            className="animate-rise mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted"
            style={{ animationDelay: "240ms" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={15} className="fill-green text-green" />
                ))}
              </span>
              4.9/5 from teams everywhere
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-green" /> Live in a day, keep
              your number
            </span>
          </div>
        </div>

        {/* Oversized, interactive app mock */}
        <div className="animate-rise mt-14 lg:mt-16" style={{ animationDelay: "220ms" }}>
          <HeroAppMock />
        </div>
      </div>
    </section>
  );
}
