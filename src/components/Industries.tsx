import Reveal from "./Reveal";
import {
  Wrench,
  Building2,
  Server,
  Scale,
  Stethoscope,
  ArrowUpRight,
} from "lucide-react";

const industries = [
  {
    icon: Wrench,
    title: "Home Services",
    body: "HVAC, plumbing, electrical, roofing, restoration, garage doors, pest control. Capture every job, even from the field.",
    featured: true,
  },
  {
    icon: Building2,
    title: "Property Management",
    body: "Turn every tenant call into a tracked maintenance ticket — automatically routed to the right vendor.",
    featured: true,
  },
  {
    icon: Server,
    title: "MSPs & IT Services",
    body: "Triage support calls into tickets with context, so SLAs are never missed.",
  },
  {
    icon: Scale,
    title: "Law Firms",
    body: "Intake new matters and qualify callers without paying for an answering service.",
  },
  {
    icon: Stethoscope,
    title: "Medical Offices",
    body: "Handle overflow and after-hours calls with summaries your front desk can act on.",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Built for the field</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Made for businesses that can&apos;t always pick up.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal
              key={ind.title}
              delay={(i % 3) * 70}
              className={ind.featured ? "lg:row-span-1" : ""}
            >
              <a
                href="#demo"
                className={`group flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  ind.featured
                    ? "bg-gradient-to-br from-navy to-navy-700 text-white shadow-[var(--shadow-lg)]"
                    : "surface-card hover:border-blue/30 hover:shadow-[var(--shadow-md)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl ${
                      ind.featured
                        ? "bg-white/10 text-green"
                        : "bg-blue/10 text-blue"
                    }`}
                  >
                    <ind.icon size={22} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      ind.featured ? "text-white/50" : "text-faint"
                    }`}
                  />
                </div>
                <h3
                  className={`mt-5 text-lg font-semibold ${
                    ind.featured ? "text-white" : "text-navy"
                  }`}
                >
                  {ind.title}
                </h3>
                <p
                  className={`mt-2 text-[0.95rem] leading-relaxed ${
                    ind.featured ? "text-white/70" : "text-muted"
                  }`}
                >
                  {ind.body}
                </p>
                {ind.featured && (
                  <span className="mt-4 inline-flex w-fit rounded-full bg-green/15 px-2.5 py-1 text-[11px] font-semibold text-green">
                    Priority industry
                  </span>
                )}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
