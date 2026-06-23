import Reveal from "./Reveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CTA() {
  return (
    <section id="demo" className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-16 text-center sm:px-16">
            {/* glow accents */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.75rem] sm:leading-[1.1]">
                Your phone should book jobs, not lose them.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Start free with a trial number, watch the AI answer and turn the
                call into a booked, invoiced job, then add your line when you're
                ready. No credit card to start.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a href="/demo" className="btn btn-primary text-base">
                  Start free, no credit card <ArrowRight size={18} />
                </a>
                <a href="/pricing" className="btn btn-white text-base">
                  See pricing
                </a>
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
                {["No credit card", "No contract", "Keep your number", "Live in a day"].map(
                  (t) => (
                    <span key={t} className="inline-flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-green" /> {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
