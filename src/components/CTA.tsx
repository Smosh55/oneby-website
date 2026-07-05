import Reveal from "./Reveal";
import { CheckCircle2 } from "lucide-react";
import WaitlistForm from "./WaitlistForm";

export default function CTA() {
  return (
    <section id="demo" className="py-20 lg:py-28">
      <div id="waitlist" className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-16 text-center sm:px-16">
            {/* glow accents */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green/40 bg-green/10 px-3.5 py-1.5 text-[0.8rem] font-bold uppercase tracking-wide text-green">
                Launching August 2026
              </span>
              <p className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-sm font-medium text-white/70">
                <CheckCircle2 size={16} className="shrink-0 text-green" />
                Don&apos;t take our word for it — the full product is live on
                this page. Click through it above.
              </p>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-[2.75rem] sm:leading-[1.1]">
                Be first in line when doors open.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Join the waitlist and get first access at launch, plus the
                chance to lock founding-member pricing before it&apos;s gone
                for good.
              </p>
              <div className="mt-8">
                <WaitlistForm />
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
                {["Founder rate locked 2 years", "Keep your number", "No contract"].map(
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
