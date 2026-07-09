"use client";

import Link from "next/link";
import { cities } from "@/data/locations";
import { useSiteIndustry } from "@/lib/useSiteIndustry";
import { isFocusedSite } from "@/config/site";

type FooterLink = { label: string; href: string };

const groups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "AI Receptionist", href: "/features/ai-receptionist" },
      { label: "Missed-Call Text Back", href: "/features/missed-call-text-back" },
      { label: "Automations", href: "/features/automations" },
      { label: "Ticketing", href: "/features/ticketing" },
      { label: "Scheduling", href: "/features/scheduling" },
      { label: "Estimates", href: "/features/estimates" },
      { label: "Invoicing & Payments", href: "/features/invoicing" },
      { label: "Price Book", href: "/features/price-book" },
      { label: "AI Voicemail Replacement", href: "/features/ai-voicemail-replacement" },
      { label: "Desk Phones & Fax", href: "/features/desk-phones" },
      { label: "Task Automation", href: "/features/task-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "HVAC", href: "/hvac" },
      { label: "Plumbing", href: "/plumbing" },
      { label: "Roofing", href: "/roofing" },
      { label: "Landscaping", href: "/landscaping" },
      { label: "Property Management", href: "/property-management" },
      { label: "Dental", href: "/dental" },
      { label: "Barber", href: "/barber" },
      { label: "All industries", href: "/industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "AI Receptionist Guide", href: "/ai-receptionist" },
      { label: "Missed Call Calculator", href: "/missed-call-calculator" },
      { label: "Founding Members", href: "/founders" },
      { label: "Blog", href: "/blog" },
      { label: "Compare", href: "/compare" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  // In a single-industry context, replace the cross-industry column with links
  // scoped to that trade (overview + local service areas) so the footer doesn't
  // advertise every other vertical.
  const industry = useSiteIndustry();
  const displayGroups = !industry
    ? groups
    : groups.map((g) =>
        g.title !== "Industries"
          ? g
          : {
              title: industry.shortName,
              links: [
                {
                  label: "Overview",
                  href: isFocusedSite ? "/" : `/${industry.slug}`,
                },
                // City pages aren't served on focused deployments (they
                // redirect to the root), so link the trade's insights instead.
                ...(isFocusedSite
                  ? [{ label: `${industry.shortName} insights`, href: "/blog" }]
                  : cities.slice(0, 4).map((c) => ({
                      label: `${c.name}, ${c.state}`,
                      href: `/${industry.slug}/${c.slug}`,
                    }))),
              ],
            }
      );

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
              The all-in-one CRM for small business. Never miss a customer
              because you&apos;re busy.
            </p>
            <div className="mt-5 space-y-1 text-[0.9rem] text-white/70">
              <a href="mailto:support@oneby.ai" className="block hover:text-white">
                support@oneby.ai
              </a>
              <a href="tel:+16266632944" className="block hover:text-white">
                (626) ONE-BY44
              </a>
            </div>
          </div>

          {displayGroups.map((g) => (
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
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/refunds" className="transition-colors hover:text-white">
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
