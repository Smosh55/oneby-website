import Reveal from "./Reveal";

// The per-trade vocabulary story (the product's Modules system). OneBy renames
// its core objects to match how each trade talks. These examples mirror the
// business-type presets in the product.
const trades: { name: string; terms: string[] }[] = [
  { name: "HVAC & trades", terms: ["Jobs", "Customers", "Visits", "Technicians"] },
  { name: "Law firm", terms: ["Matters", "Clients", "Meetings", "Attorneys"] },
  { name: "Barbershop & salon", terms: ["Appointments", "Clients", "Chairs", "Stylists"] },
  { name: "Property management", terms: ["Work orders", "Tenants", "Visits", "Vendors"] },
];

export default function SpeaksYourTrade() {
  return (
    <section className="border-y border-line bg-canvas/50 py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Built around your trade</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            OneBy speaks your trade.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Pick your business type and OneBy renames itself to match how you
            talk. Jobs or matters, customers or patients, visits or
            appointments. The whole workspace fits your trade, not the other way
            around.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trades.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 70}>
              <div className="surface-card h-full rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-blue">
                  {t.name}
                </h3>
                <ul className="mt-4 space-y-2">
                  {t.terms.map((term) => (
                    <li
                      key={term}
                      className="text-[0.95rem] font-medium text-navy"
                    >
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-sm text-muted">
            Not your exact words? Rename anything, and it updates across every
            menu, button, and page.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
