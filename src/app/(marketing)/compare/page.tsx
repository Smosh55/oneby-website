import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { comparisonCategories } from "@/data/comparisons";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Compare OneBy to Other Phone Systems and Field Tools",
  description:
    "Honest, side-by-side comparisons of OneBy versus RingCentral, OpenPhone, Dialpad, Zoom Phone, ServiceTitan, Housecall Pro, Jobber, and AppFolio.",
  alternates: { canonical: "/compare" },
};

export default function CompareHub() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[440px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.12),transparent)]" />
        </div>
        <div className="container-x text-center">
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            Compare
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.25rem]">
            Honest comparisons, no mudslinging.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Every tool here is good at something. We'll tell you where each one
            shines and where OneBy pulls ahead, so you can pick the right fit
            instead of the loudest one.
          </p>
        </div>
      </section>

      {comparisonCategories.map((cat) => (
        <section key={cat.category} className="py-10">
          <div className="container-x">
            <div className="mb-7 flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight text-navy">
                {cat.category}
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((c, i) => (
                <Reveal key={c.slug} delay={(i % 3) * 60}>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="group surface-card flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-navy">
                        OneBy vs {c.competitor}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                    <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">
                      {c.heroSub.split(".")[0]}.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue">
                      Read the comparison
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.1]">
                Still deciding? Let the calls decide.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Book a demo and see OneBy turn one of your real calls into a
                summary and an assigned task.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/demo" className="btn btn-primary text-base">
                  Book a demo <ArrowRight size={18} />
                </Link>
                <Link href="/pricing" className="btn btn-white text-base">
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
