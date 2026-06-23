import Link from "next/link";
import {
  PhoneCall,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  MapPin,
} from "lucide-react";
import type { Industry } from "@/data/industries";
import { type City, nearbyCities } from "@/data/locations";
import { getIcon } from "@/components/industry/iconMap";
import Reveal from "@/components/Reveal";

export default function LocalLanding({
  industry,
  city,
}: {
  industry: Industry;
  city: City;
}) {
  const Icon = getIcon(industry.icon);
  const place = `${city.name}, ${city.state}`;
  const trade = industry.shortName.toLowerCase();
  const hoods = city.neighborhoods;
  const codes = city.areaCodes;
  const nearby = nearbyCities(city.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[920px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
        </div>
        <div className="container-x">
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="hover:text-navy">
              Home
            </Link>
            <ChevronRight size={14} className="text-faint" />
            <Link href="/industries" className="hover:text-navy">
              Industries
            </Link>
            <ChevronRight size={14} className="text-faint" />
            <Link href={`/industries/${industry.slug}`} className="hover:text-navy">
              {industry.shortName}
            </Link>
            <ChevronRight size={14} className="text-faint" />
            <span className="font-medium text-navy">{city.name}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
              <MapPin size={14} /> Serving {place}
            </span>
            <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[3rem]">
              {industry.name} answering service in {city.name}.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {city.name} {trade} businesses live on the phone, and the calls
              you miss go straight to the competitor down the road. From{" "}
              {hoods[0]} to {hoods[1]}, OneBy answers every call across{" "}
              {city.region}, captures the details, and turns it into a booked
              job. Keep your local {codes[0]} or {codes[1]} number, no new
              hardware required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demo" className="btn btn-primary text-base">
                Book a demo <ArrowRight size={18} />
              </Link>
              <Link href={`/industries/${industry.slug}`} className="btn btn-ghost text-base">
                See the {industry.shortName} playbook
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why local teams choose OneBy */}
      <section className="pb-12 lg:pb-16">
        <div className="container-x">
          <Reveal className="mb-8 max-w-2xl">
            <span className="eyebrow">
              <Icon size={14} /> Built for {city.name} {trade}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Win the jobs your {city.name} competitors miss.
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {industry.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="surface-card h-full rounded-2xl p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue/10 to-green/10 text-blue">
                    <CheckCircle2 size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scenario mock */}
      <section className="pb-12 lg:pb-16">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-xl surface-card rounded-2xl p-5 shadow-[var(--shadow-lg)]">
              <div className="flex items-center gap-2 pb-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-green/10 text-green-600">
                  <PhoneCall size={16} />
                </span>
                <span className="text-xs font-medium text-faint">
                  OneBy · {city.name} {industry.shortName} line
                </span>
              </div>
              <div className="rounded-xl border border-blue/15 bg-gradient-to-b from-blue/[0.06] to-transparent px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-blue" />
                  <span className="text-xs font-bold uppercase tracking-wide text-blue">
                    AI summary
                  </span>
                </div>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink">
                  {industry.scenarioSummary}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-green/25 bg-green/[0.07] px-4 py-3">
                <CheckCircle2 size={18} className="shrink-0 text-green-600" />
                <p className="text-sm font-semibold text-navy">
                  {industry.scenarioTask}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Local coverage */}
      <section className="pb-12 lg:pb-16">
        <div className="container-x">
          <Reveal>
            <div className="rounded-2xl border border-line bg-canvas/50 p-7 sm:p-9">
              <span className="eyebrow">
                <MapPin size={14} /> Local coverage
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                From {hoods[0]} to {hoods[hoods.length - 1]}, we have{" "}
                {city.region} covered.
              </h2>
              <p className="mt-3 max-w-2xl text-muted">
                OneBy answers calls for {trade} teams across {city.name} and the
                surrounding metro, day and night, so a missed call never turns
                into a missed job.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {hoods.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium text-ink/70"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Local FAQ */}
      <section className="bg-canvas py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="surface-card rounded-2xl p-6">
              <h3 className="font-semibold text-navy">
                Do you serve {place}?
              </h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                Yes. OneBy covers {city.name} and the wider {city.region}, from{" "}
                {hoods[0]} and {hoods[1]} to {hoods[2]} and {hoods[3]}. Wherever
                your crew is working, the AI catches the calls they can't.
              </p>
            </div>
            <div className="surface-card rounded-2xl p-6">
              <h3 className="font-semibold text-navy">
                Can I keep my {city.name} number?
              </h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                Of course. Keep your {codes[0]} or {codes[1]} number, porting is
                free, and there's no new hardware to install to get started.
              </p>
            </div>
            {industry.faqs.slice(0, 2).map((f) => (
              <div key={f.q} className="surface-card rounded-2xl p-6">
                <h3 className="font-semibold text-navy">{f.q}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby metros (internal links) */}
      <section className="pt-14 lg:pt-20">
        <div className="container-x">
          <Reveal>
            <h2 className="text-xl font-bold tracking-tight text-navy">
              OneBy also answers {trade} calls nearby
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/industries/${industry.slug}/${c.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-navy transition-colors hover:border-blue"
                >
                  <span>
                    {industry.shortName} in {c.name}
                  </span>
                  <ArrowRight
                    size={15}
                    className="shrink-0 text-faint transition-colors group-hover:text-blue"
                  />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

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
                Stop losing {city.name} jobs to voicemail.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                See OneBy answer your next missed call and turn it into a booked
                {" "}
                {trade} job. Live in a day.
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
