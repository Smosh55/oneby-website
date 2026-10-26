import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { launch } from "@/config/site";

// Parked-feature screen. Middleware rewrites the AI answering / automation
// routes here in CRM-first mode (the real page files stay on disk, untouched),
// passing the original path as ?from= so we can name what's coming. Never
// indexed: these are intentionally thin "coming soon" placeholders.
export const metadata: Metadata = {
  title: `Coming soon — shipping ${launch.publicLaunch} | OneBy`,
  robots: { index: false, follow: false },
};

// Turn a parked path into a friendly feature name for the headline.
function labelFor(from: string | undefined): string | null {
  if (!from) return null;
  const slug = from.replace(/^\/(features\/)?/, "").replace(/\/$/, "");
  if (!slug) return null;
  const named: Record<string, string> = {
    "ai-receptionist": "The AI Receptionist",
    "ai-voicemail-replacement": "AI Voicemail Replacement",
    "missed-call-text-back": "Missed-Call Text Back",
    "smart-summaries": "Smart Call Summaries",
    "honest-ai": "Honest AI",
    "task-automation": "Automatic Task Creation",
    "automations": "Automations",
    "call-recording": "Call Recording & AI Search",
    "missed-call-calculator": "The Missed-Call Calculator",
    "looped": "Looped",
    "voip-crm": "The AI phone system",
  };
  return (
    named[slug] ??
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

export default async function ComingSoon({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const feature = labelFor(from);

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(4,3,79,0.07),transparent)]" />
        <div className="absolute right-[-6%] top-10 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(28,219,150,0.16),transparent)]" />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue/5 px-4 py-1.5 text-[0.82rem] font-bold uppercase tracking-wide text-blue">
            <Sparkles size={15} /> Shipping {launch.publicLaunch}
          </span>

          <h1 className="mt-7 text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl">
            {feature ? (
              <>
                {feature} is{" "}
                <span className="relative whitespace-nowrap">
                  on the way
                  <span className="absolute -bottom-1 left-0 h-[0.16em] w-full rounded-full bg-green" />
                </span>
                .
              </>
            ) : (
              <>
                This one&apos;s{" "}
                <span className="relative whitespace-nowrap">
                  on the way
                  <span className="absolute -bottom-1 left-0 h-[0.16em] w-full rounded-full bg-green" />
                </span>
                .
              </>
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            OneBy is live today as the all-in-one CRM for service businesses, and
            it&apos;s open to early-access members now. The piece you just looked
            for lands with our public launch in {launch.publicLaunch}. Get an
            invite and you&apos;ll be first in line when it does.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#waitlist" className="btn btn-primary text-base">
              Request an invite <ArrowRight size={18} />
            </Link>
            <Link href="/" className="btn btn-ghost text-base">
              Explore the CRM
            </Link>
          </div>

          <p className="mt-6 text-sm font-medium text-faint">
            {launch.statusLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
