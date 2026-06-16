import Link from "next/link";
import Prose from "@/components/blog/Prose";
import type { LegalDoc as LegalDocType } from "@/data/legal";

const others = [
  { slug: "terms", label: "Terms & Conditions" },
  { slug: "privacy", label: "Privacy Policy" },
  { slug: "refunds", label: "Refund & Subscription" },
];

export default function LegalDoc({ doc }: { doc: LegalDocType }) {
  return (
    <section className="pt-28 pb-20 lg:pt-32 lg:pb-28">
      <div className="container-x max-w-3xl">
        <h1 className="text-[2.1rem] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-[2.75rem]">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm font-medium text-faint">
          Effective Date: {doc.effective}
        </p>

        <nav className="mt-6 flex flex-wrap gap-2 border-y border-line py-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/${o.slug}`}
              className={`rounded-full px-3 py-1.5 text-[0.8rem] font-medium transition-colors ${
                o.slug === doc.slug
                  ? "bg-navy text-white"
                  : "bg-canvas-2 text-ink/80 hover:bg-line"
              }`}
            >
              {o.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          <Prose content={doc.body} />
        </div>
      </div>
    </section>
  );
}
