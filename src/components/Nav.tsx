"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const links = [
  { label: "Product", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#stories" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          ? "bg-white/80 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center shrink-0" aria-label="OneBy home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/oneby-logo.svg" alt="OneBy" className="h-7 w-auto" />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 rounded-lg text-[0.9375rem] font-medium text-ink/80 hover:text-navy hover:bg-canvas-2 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href="#"
            className="px-3.5 py-2 rounded-lg text-[0.9375rem] font-medium text-ink/80 hover:text-navy transition-colors"
          >
            Sign in
          </a>
          <a href="#demo" className="btn btn-primary text-[0.9375rem]">
            Book a demo
          </a>
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
        <div className="lg:hidden border-t border-line bg-white">
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-3 rounded-lg text-[0.95rem] font-medium text-ink hover:bg-canvas-2"
              >
                {l.label}
                <ChevronDown size={16} className="text-faint -rotate-90" />
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <a href="#" className="btn btn-ghost w-full">
                Sign in
              </a>
              <a
                href="#demo"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
