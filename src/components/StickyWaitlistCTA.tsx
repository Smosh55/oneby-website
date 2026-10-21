"use client";

import { useEffect, useState } from "react";

// Sticky mobile CTA for the homepage. Hides itself when the waitlist form is on
// screen, so it never covers the form's own Request-an-invite button.
export default function StickyWaitlistCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById("waitlist");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a href="#waitlist" className="btn btn-primary w-full">
        Request an invite, from $15/mo
      </a>
    </div>
  );
}
