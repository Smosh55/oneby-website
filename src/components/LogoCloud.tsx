const partners = [
  "Summit HVAC",
  "BlueLine Plumbing",
  "Apex Electric",
  "Ridgeway Roofing",
  "Sentry Pest",
  "Cornerstone PM",
];

export default function LogoCloud() {
  return (
    <section className="border-y border-line bg-canvas/60 py-10">
      <div className="container-x">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-faint">
          Trusted by the teams who answer the phone for a living
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((p) => (
            <span
              key={p}
              className="text-base font-bold tracking-tight text-navy/35 transition-colors hover:text-navy/60"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
