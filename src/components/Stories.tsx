import Reveal from "./Reveal";

const stories = [
  {
    quote:
      "We were losing 15 to 20 calls a week to voicemail. OneBy answers them now and books the job before I'm even off the roof. It paid for itself in the first weekend.",
    name: "Marcus T.",
    role: "Owner, Ridgeway Roofing",
    metric: "+31%",
    metricLabel: "more jobs booked",
  },
  {
    quote:
      "The summaries are the magic. My techs read one line and know exactly what the customer needs. No more 'let me listen to the voicemail again.'",
    name: "Priya N.",
    role: "Ops Manager, BlueLine Plumbing",
    metric: "4 hrs",
    metricLabel: "saved per day on callbacks",
  },
  {
    quote:
      "I manage 600 units. OneBy catches every tenant call and turns it into a ticket automatically. Nothing slips through anymore.",
    name: "Derek S.",
    role: "Director, Cornerstone PM",
    metric: "0",
    metricLabel: "missed maintenance requests",
  },
];

export default function Stories() {
  return (
    <section id="stories" className="bg-canvas py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Customer stories</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Teams that stopped losing customers to voicemail.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.name} delay={i * 90}>
              <figure className="surface-card flex h-full flex-col rounded-2xl p-7">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-blue">
                    {s.metric}
                  </span>
                  <span className="text-sm font-medium text-muted">
                    {s.metricLabel}
                  </span>
                </div>
                <blockquote className="mt-5 flex-1 text-[0.975rem] leading-relaxed text-ink">
                  “{s.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                    {s.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{s.name}</p>
                    <p className="text-xs text-muted">{s.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
