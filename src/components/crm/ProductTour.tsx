/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Reveal from "../Reveal";
import { ArrowRight } from "lucide-react";

// Real product screenshots from a live OneBy account (demo data only). These are
// actual screens, not mockups — the honest "here's what you get" proof. Images
// live in /public/product. Swap the files to refresh; keep the width/height so
// the layout doesn't shift while they load.

type Shot = {
  src: string;
  w: number;
  h: number;
  label: string; // the little browser-chrome tag
  title: string;
  body: string;
  alt: string;
};

// Tall, full-screen views shown two-up on desktop.
const grid: Shot[] = [
  {
    src: "/product/job-detail.jpg",
    w: 1568,
    h: 722,
    label: "Jobs",
    title: "Every job, first request to final payment",
    body: "One screen follows the work across every stage — scheduled, on site, done, invoiced, paid — with the customer, the visit, and the money all in view.",
    alt: "A job in OneBy showing its progress bar from unscheduled to paid, the customer, the service visit, and the amount due.",
  },
  {
    src: "/product/task-board.jpg",
    w: 1568,
    h: 722,
    label: "Tasks",
    title: "The team's work, assigned and tracked",
    body: "A simple board of who's doing what, with priorities and due dates, filtered to one person or the whole team.",
    alt: "A OneBy task board with To do, In progress, and Done columns, each task showing an owner and due date.",
  },
  {
    src: "/product/customer-record.jpg",
    w: 1568,
    h: 722,
    label: "Customers",
    title: "One timeline for every customer",
    body: "Open balance, open jobs, contacts, and every note and invoice on a single record the whole team can see.",
    alt: "A customer record in OneBy showing outstanding balance, open jobs, contacts, and recent activity.",
  },
  {
    src: "/product/invoice.jpg",
    w: 1568,
    h: 722,
    label: "Invoices",
    title: "Invoice the work, get paid by card",
    body: "Build the invoice from the job, turn on card payments, and track it from created to sent to paid.",
    alt: "An itemized invoice in OneBy with a balance due, a card-payment toggle, and a created-to-paid status track.",
  },
  {
    src: "/product/estimate.jpg",
    w: 1568,
    h: 722,
    label: "Estimates",
    title: "Estimates the customer can approve",
    body: "Itemized quotes with your prices, sent for approval and turned into a job the moment they say yes.",
    alt: "An itemized estimate in OneBy with line items, rates, and a total, ready to send for approval.",
  },
];

function Frame({ shot }: { shot: Shot }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-md)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-canvas px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-2 text-[0.72rem] font-semibold text-muted">
          {shot.label}
        </span>
      </div>
      <img
        src={shot.src}
        width={shot.w}
        height={shot.h}
        alt={shot.alt}
        loading="lazy"
        className="block h-auto w-full"
      />
    </div>
  );
}

export default function ProductTour() {
  return (
    <section id="tour" className="bg-canvas py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">A look inside</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            The actual product, not a mockup.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            These are real screens from a live OneBy account. Here's what your
            team sees from day one.
          </p>
        </Reveal>

        {/* Wide banner: the week at a glance */}
        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-md)]">
            <div className="flex items-center gap-1.5 border-b border-line bg-canvas px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="ml-2 text-[0.72rem] font-semibold text-muted">
                Schedule
              </span>
            </div>
            <img
              src="/product/schedule-week.png"
              width={1568}
              height={163}
              alt="A week view in OneBy showing scheduled visits across the days, each with the customer and the assigned person."
              loading="lazy"
              className="block h-auto w-full"
            />
          </div>
          <p className="mt-3 text-center text-[0.95rem] font-medium text-muted">
            See the whole week at a glance — who's going where, and when.
          </p>
        </Reveal>

        {/* Two-up grid of full screens, with a CTA filling the last cell */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {grid.map((shot, i) => (
            <Reveal key={shot.src} delay={(i % 2) * 80}>
              <Frame shot={shot} />
              <h3 className="mt-4 text-[1.05rem] font-bold text-navy">
                {shot.title}
              </h3>
              <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">
                {shot.body}
              </p>
            </Reveal>
          ))}

          {/* CTA cell balances the grid */}
          <Reveal delay={80}>
            <div className="flex h-full min-h-[220px] flex-col justify-center rounded-2xl border border-dashed border-navy/20 bg-white p-8 text-center">
              <p className="text-lg font-bold text-navy">
                Want the full walkthrough?
              </p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                We'll set OneBy up around how your team already works, with a
                dedicated rep to get you going.
              </p>
              <a
                href="#waitlist"
                className="btn btn-primary mt-5 self-center text-base"
              >
                Request an invite <ArrowRight size={18} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Wide banner: connect your AI (bridges into the connector section) */}
        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-md)]">
            <div className="flex items-center gap-1.5 border-b border-line bg-canvas px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="ml-2 text-[0.72rem] font-semibold text-muted">
                Integrations
              </span>
            </div>
            <img
              src="/product/ai-connectors.png"
              width={1568}
              height={299}
              alt="OneBy's connect-an-AI-assistant screen with one-click cards for Claude, ChatGPT, Gemini, Cursor, and VS Code."
              loading="lazy"
              className="block h-auto w-full"
            />
          </div>
          <p className="mt-3 text-center text-[0.95rem] font-medium text-muted">
            Connect the AI you already use — Claude, ChatGPT, Gemini, Cursor,
            and more.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
