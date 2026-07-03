import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

const links: [string, string][] = [
  ["Platform", "/product"],
  ["Pricing", "/pricing"],
  ["Industries", "/industries"],
  ["Compare", "/compare"],
  ["Blog", "/blog"],
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="container-x flex min-h-[72vh] flex-col items-center justify-center py-24 pt-36 text-center">
        <span className="eyebrow rounded-full border border-blue/20 bg-blue/5 px-3 py-1.5">
          404
        </span>
        <h1 className="mt-5 text-[2.4rem] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-6xl">
          This one slipped through the cracks.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          The page you're after isn't here. Fitting, since OneBy exists so nothing
          slips through the cracks. Here's the way back.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary text-base">
            <Home size={18} /> Back home
          </Link>
          <Link href="/#waitlist" className="btn btn-ghost text-base">
            Join the waitlist <ArrowRight size={18} />
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-blue hover:underline">
              {label}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
