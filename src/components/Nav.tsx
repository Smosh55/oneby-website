"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Gift } from "lucide-react";
import { industryGroups } from "@/data/industries";
import { getIcon } from "@/components/industry/iconMap";
import { useSiteIndustry } from "@/lib/useSiteIndustry";
import { isFocusedSite } from "@/config/site";

const links = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileIndustries, setMobileIndustries] = useState(false);

  // When the visitor is in a single-industry context (a dedicated deployment or
  // an /industries/<slug> page), drop the cross-industry chrome so it reads as a
  // business that only serves that trade.
  const industry = useSiteIndustry();
  const homeHref = !industry ? "/" : isFocusedSite ? "/" : `/${industry.slug}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-6">
        <Link href={homeHref} className="flex items-center shrink-0" aria-label="OneBy home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/oneby-logo.svg" alt="OneBy" className="h-7 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {/* Industries mega-dropdown — hidden in single-industry context */}
          {!industry && (
          <div className="group relative">
            <Link
              href="/industries"
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-[0.9375rem] font-medium text-ink/80 hover:text-navy hover:bg-canvas-2 transition-colors"
            >
              Industries
              <ChevronDown
                size={15}
                className="text-faint transition-transform group-hover:rotate-180"
              />
            </Link>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="w-[34rem] rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-lg)]">
                <div className="grid grid-cols-2 gap-x-4">
                  {industryGroups.map((grp) => (
                    <div key={grp.group}>
                      <p className="px-3 pb-1 pt-2 text-[0.7rem] font-bold uppercase tracking-wide text-faint">
                        {grp.group}
                      </p>
                      {grp.items.map((ind) => {
                        const Icon = getIcon(ind.icon);
                        return (
                          <Link
                            key={ind.slug}
                            href={`/${ind.slug}`}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.875rem] font-medium text-ink/80 hover:bg-canvas-2 hover:text-navy"
                          >
                            <Icon size={16} className="text-blue" />
                            {ind.shortName}
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <Link
                  href="/industries"
                  className="mt-3 block rounded-lg bg-canvas px-3 py-2.5 text-center text-[0.85rem] font-semibold text-blue hover:bg-canvas-2"
                >
                  View all industries →
                </Link>
              </div>
            </div>
          </div>
          )}

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 rounded-lg text-[0.9375rem] font-medium text-ink/80 hover:text-navy hover:bg-canvas-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/founders"
            className="inline-flex items-center gap-1.5 rounded-full border border-green/30 bg-green/10 px-3 py-1.5 text-[0.875rem] font-semibold text-green-600 transition-colors hover:bg-green/15"
          >
            <Gift size={14} /> Founders
          </Link>
          <Link
            href={isFocusedSite ? "/#demo-form" : "/#demo"}
            className="px-3.5 py-2 rounded-lg text-[0.9375rem] font-medium text-ink/80 hover:text-navy transition-colors"
          >
            Sign in
          </Link>
          <Link href="/demo" className="btn btn-primary text-[0.9375rem]">
            Start free
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-navy hover:bg-canvas-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-line bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container-x py-4 flex flex-col gap-1">
            {!industry && (<>
            <button
              onClick={() => setMobileIndustries((v) => !v)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-[0.95rem] font-medium text-ink hover:bg-canvas-2"
              aria-expanded={mobileIndustries}
            >
              Industries
              <ChevronDown
                size={16}
                className={`text-faint transition-transform ${
                  mobileIndustries ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileIndustries && (
              <div className="mb-1 grid grid-cols-2 gap-1 pl-2">
                {industryGroups.flatMap((g) => g.items).map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/${ind.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-[0.85rem] text-ink/75 hover:bg-canvas-2"
                  >
                    {ind.shortName}
                  </Link>
                ))}
              </div>
            )}
            </>)}

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-[0.95rem] font-medium text-ink hover:bg-canvas-2"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/founders"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-lg bg-green/10 px-3 py-3 text-[0.95rem] font-semibold text-green-600"
            >
              <Gift size={16} /> Founding Members
            </Link>
            <div className="flex flex-col gap-2 pt-3">
              <Link
                href={isFocusedSite ? "/#demo-form" : "/#demo"}
                onClick={() => setOpen(false)}
                className="btn btn-ghost w-full"
              >
                Sign in
              </Link>
              <Link
                href="/demo"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                Start free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
