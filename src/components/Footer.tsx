import Link from "next/link";

type FooterLink = { label: string; href: string };

const groups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "AI Receptionist", href: "/#features" },
      { label: "Smart Summaries", href: "/#features" },
      { label: "Customer Timeline", href: "/#features" },
      { label: "Business SMS", href: "/#features" },
      { label: "Workflow Automation", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "HVAC", href: "/industries/hvac" },
      { label: "Plumbing", href: "/industries/plumbing" },
      { label: "Roofing", href: "/industries/roofing" },
      { label: "Property Management", href: "/industries/property-management" },
      { label: "All industries", href: "/industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Customers", href: "/#stories" },
      { label: "FAQ", href: "/#pricing" },
      { label: "Book a demo", href: "/#demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#how" },
      { label: "Careers", href: "/#demo" },
      { label: "Contact", href: "/#demo" },
    ],
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
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[0.9rem] text-white/70 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} OneBy. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/#demo" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/#demo" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/#demo" className="transition-colors hover:text-white">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
