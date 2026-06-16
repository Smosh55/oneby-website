const groups = [
  {
    title: "Product",
    links: ["AI Receptionist", "Smart Summaries", "Customer Timeline", "Business SMS", "Workflow Automation", "Mobile App"],
  },
  {
    title: "Industries",
    links: ["Home Services", "Property Management", "MSPs & IT", "Law Firms", "Medical Offices"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Pricing", "Help Center", "API Docs", "Status", "Security"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/oneby-logo-white.svg"
              alt="OneBy"
              className="h-7 w-auto"
            />
            <p className="mt-5 text-[0.95rem] leading-relaxed text-white/60">
              The AI Communications OS for small business. Never miss a customer
              because you&apos;re busy.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-[0.8rem] font-bold uppercase tracking-wide text-white/40">
                {g.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[0.9rem] text-white/70 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} OneBy. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
