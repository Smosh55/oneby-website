"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { industryGroups } from "@/data/industries";
import { getIcon } from "@/components/industry/iconMap";

const links = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileIndustries, setMobileIndustries] = useState(false);

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
        <Link href="/" className="flex items-center shrink-0" aria-label="OneBy home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/oneby-logo.svg" alt="OneBy" className="h-7 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {/* Industries mega-dropdown */}
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
                            href={`/industries/${ind.slug}`}
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
            href="/#demo"
            className="px-3.5 py-2 rounded-lg text-[0.9375rem] font-medium text-ink/80 hover:text-navy transition-colors"
          >
            Sign in
          </Link>
          <Link href="/#demo" className="btn btn-primary text-[0.9375rem]">
            Book a demo
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
                    href={`/industries/${ind.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-[0.85rem] text-ink/75 hover:bg-canvas-2"
                  >
                    {ind.shortName}
                  </Link>
                ))}
              </div>
            )}

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
            <div className="flex flex-col gap-2 pt-3">
              <Link
                href="/#demo"
                onClick={() => setOpen(false)}
                className="btn btn-ghost w-full"
              >
                Sign in
              </Link>
              <Link
                href="/#demo"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
