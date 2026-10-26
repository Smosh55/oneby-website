import Reveal from "../Reveal";
import { Headset, GraduationCap, SlidersHorizontal, Plug, CheckCircle2 } from "lucide-react";
import WaitlistForm from "../WaitlistForm";
import { launch } from "@/config/site";

// CRM-first closing CTA. Professional, any-industry framing with the concrete
// promises every account gets. Keeps the site-wide #demo and #waitlist anchors
// the nav, hero, and pricing link to.
const included = [
  {
    icon: Headset,
    title: "A dedicated account rep",
    body: "A real person who knows your account, not a ticket queue.",
  },
  {
    icon: GraduationCap,
    title: "Complimentary onboarding",
    body: "A free one-hour session to get your whole team up and running.",
  },
  {
    icon: SlidersHorizontal,
    title: "Built to fit you",
    body: "Custom fields, workflows, and configurations for how you work.",
  },
  {
    icon: Plug,
    title: "Open AI connector",
    body: "Bring Claude, ChatGPT, or Gemini, read and write, with your permission.",
  },
];

export default function CrmCTA() {
  return (
    <section id="demo" className="py-20 lg:py-28">
      <div id="waitlist" className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-navy-700 px-7 py-16 text-center sm:px-14">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(0,143,224,0.35),transparent)]" />
              <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.3),transparent)]" />
            </div>

            <div className="relative mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green/40 bg-green/10 px-3.5 py-1.5 text-[0.8rem] font-bold uppercase tracking-wide text-green">
                {launch.statusLabel}
              </span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-[2.75rem] sm:leading-[1.1]">
                Run it all on OneBy, with a team behind you.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                One platform for your customers, your team, and your entire sales
                cycle, for any business in any industry. $15 per user per month,
                every feature included, onboarding and support on us.
              </p>

              {/* what every account gets */}
              <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
                {included.map((it) => {
                  const Icon = it.icon;
                  return (
                    <div
                      key={it.title}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-green">
                        <Icon size={18} />
                      </span>
                      <div>
                        <p className="text-[0.95rem] font-bold text-white">{it.title}</p>
                        <p className="mt-0.5 text-[0.85rem] leading-snug text-white/65">
                          {it.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10">
                <WaitlistForm />
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
                {["$15 / user / month", "No contract", "Cancel anytime"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-green" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
