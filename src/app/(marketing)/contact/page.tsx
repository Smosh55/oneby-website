import type { Metadata } from "next";
import { Mail, Phone, CalendarClock } from "lucide-react";
import DemoForm from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "Contact OneBy",
  description:
    "Get in touch with OneBy. Book a demo, ask a question, or talk to a human. We answer fast, it's kind of our whole thing.",
  alternates: { canonical: "/contact" },
};

const ways = [
  {
    icon: Mail,
    label: "Email",
    value: "support@oneby.ai",
    href: "mailto:support@oneby.ai",
  },
  {
    icon: Phone,
    label: "Call or text",
    value: "(626) ONE-BY44",
    href: "tel:+16266632944",
  },
  {
    icon: CalendarClock,
    label: "Response time",
    value: "Within one business day",
  },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[920px] rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.13),transparent)]" />
      </div>

      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="min-w-0 max-w-xl lg:pt-6">
          <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
            Contact
          </span>
          <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl">
            Talk to a human. Fast, naturally.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Questions about the product, pricing, or whether OneBy fits your
            business? Send it over. Answering quickly is sort of the whole point
            of what we build.
          </p>

          <ul className="mt-8 space-y-4">
            {ways.map((w) => (
              <li key={w.label} className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
                  <w.icon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-faint">
                    {w.label}
                  </p>
                  {w.href ? (
                    <a
                      href={w.href}
                      className="font-semibold text-navy hover:text-blue"
                    >
                      {w.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-navy">{w.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <DemoForm />
        </div>
      </div>
    </section>
  );
}
