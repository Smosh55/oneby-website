import Link from "next/link";
import { ChevronRight, ArrowRight, Check } from "lucide-react";
import type { Feature } from "@/data/features";
import { getFeatureIcon } from "./iconMap";
import Reveal from "@/components/Reveal";

export default function FeatureLanding({ feature }: { feature: Feature }) {
  const Icon = getFeatureIcon(feature.icon);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[960px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
          <div className="absolute top-16 right-[10%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.16),transparent)]" />
        </div>
        <div className="container-x">
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="hover:text-navy">
              Home
            </Link>
            <ChevronRight size={14} className="text-faint" />
            <Link href="/product" className="hover:text-navy">
              Product
            </Link>
            <ChevronRight size={14} className="text-faint" />
            <span className="font-medium text-navy">{feature.name}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
              <Icon size={14} /> {feature.heroEyebrow}
            </span>
            <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[3.25rem]">
              {feature.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {feature.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demo" className="btn btn-primary text-base">
                Book a demo <ArrowRight size={18} />
              </Link>
              <Link href="/pricing" className="btn btn-ghost text-base">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bullets */}
      <section className="pb-12 lg:pb-16">
        <div className="container-x">
          <div className="grid gap-3 sm:grid-cols-2">
            {feature.bullets.map((b, i) => (
              <Reveal key={b} delay={(i % 2) * 70}>
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white px-5 py-4">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green/15 text-green-600">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-[0.975rem] text-ink">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-canvas py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Three steps, then it runs itself.
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {feature.how.map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <div className="surface-card h-full rounded-2xl p-7">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-navy">
                    {s.step}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {feature.faqs.map((f) => (
              <div key={f.q} className="surface-card rounded-2xl p-6">
                <h3 className="font-semibold text-navy">{f.q}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/product"
              className="inline-flex text-sm font-semibold text-blue hover:underline"
            >
              See the whole platform →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-14 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.1]">
                See it on your own calls.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Book a quick demo and watch {feature.name} work on a real call,
                live.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/demo" className="btn btn-primary text-base">
                  Book a demo <ArrowRight size={18} />
                </Link>
                <Link href="/founders" className="btn btn-white text-base">
                  See founding offers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
