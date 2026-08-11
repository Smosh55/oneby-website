import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";

// The field-services division page: informative, established-company voice,
// deliberately free of funnels and action buttons. OneBy began as a low
// voltage contractor; this page carries that business (cabling, cameras,
// access control, VoIP installs) and can be unlinked from the footer any time
// without touching the rest of the site.
export const metadata: Metadata = {
  title: "Low Voltage, Wiring & Field Services",
  description:
    "OneBy provides structured cabling, video surveillance, access control, and VoIP business phone installations for grocery stores, healthcare facilities, schools, and commercial buildings.",
  keywords: [
    "low voltage contractor",
    "structured cabling installer",
    "security camera installation",
    "access control installer",
    "voip phone system installation",
    "network cabling contractor",
  ],
  alternates: { canonical: "/low-voltage" },
};

const services = [
  {
    title: "Structured cabling",
    body: "Category 6 and 6A copper installations: horizontal runs, backbone pathways, patch panels, and workstation drops. Every run is terminated to standard, tested end to end, and labeled at both ends, with a port map delivered at completion.",
  },
  {
    title: "Business telephone systems (VoIP)",
    body: "Cloud-based telephone systems for offices, stores, and facilities: desk phones, auto attendants, ring groups, overhead paging, and fax. We port existing numbers, configure call flows, and install the cabling the phones run on. Deployments run on OneBy, our own cloud phone platform, so the people who installed your system are the people who support it.",
  },
  {
    title: "Video surveillance",
    body: "IP camera systems for interior and exterior coverage: sales floors, entrances, loading areas, corridors, and common areas. We handle camera placement and aiming, recorder configuration, retention settings, and remote viewing for authorized staff.",
  },
  {
    title: "Access control",
    body: "Card, fob, and keypad systems with door controllers, electric strikes and maglocks, scheduled locking, and entry logs. Systems are configured so administrators can add and remove credentials without calling a vendor for every change.",
  },
  {
    title: "Equipment racks and remediation",
    body: "New rack and enclosure builds, and remediation of existing closets: cable dressing, re-termination, labeling, and documentation of equipment that has accumulated over years of piecemeal work.",
  },
];

const industries = [
  {
    name: "Grocery and retail",
    body: "Camera coverage for sales floors, points of sale, receiving, and exterior lots; network cabling for registers, scales, and back-office systems, installed without interrupting trading hours.",
  },
  {
    name: "Nursing homes and assisted living",
    body: "Surveillance of common areas and entries, door control that supports resident safety, and cabling for nurse call and administrative systems, performed by technicians accustomed to working respectfully in residents' living environment.",
  },
  {
    name: "Schools and campuses",
    body: "Classroom and corridor cabling, building entry control, and camera systems, with work scheduled around the academic calendar and staff background documentation available to administrators.",
  },
  {
    name: "Offices and warehouses",
    body: "Full network cabling for fit-outs and expansions, camera and access systems, VoIP phone systems with desk phones and paging, and equipment room builds coordinated with general contractors and IT vendors.",
  },
];

const standards = [
  "Terminations and testing to ANSI/TIA-568 standards; test results provided with the closeout package.",
  "Both ends of every run labeled, with a port map and as-built documentation at handoff.",
  "Camera systems documented with a view map, retention configuration, and administrator credentials transferred to the owner.",
  "Technicians are background checked, and identification is provided in advance for facilities that require it.",
  "Work areas are left clean at the end of each shift; ceiling tiles are closed and debris removed nightly.",
  "Licensed and insured. Certificate of insurance available on request.",
];

// Resolved at build time: use the real job photo when it exists in
// public/wiring/, otherwise the branded placeholder, so the page never shows
// a broken image while photos are pending.
function shotSrc(n: number): string {
  const real = `work-${n}.jpg`;
  return existsSync(path.join(process.cwd(), "public", "wiring", real))
    ? `/wiring/${real}`
    : `/wiring/placeholder-${n}.svg`;
}

const shots = [
  { src: shotSrc(1), alt: "Dressed cable bundles entering patch panels", caption: "Horizontal runs dressed and bundled into the rack" },
  { src: shotSrc(2), alt: "Patch panels during termination", caption: "Patch panel termination in progress, mid-build" },
  { src: shotSrc(3), alt: "Completed rack with labeled panels, switches, and camera monitor", caption: "Completed rack: labeled panels, switching, and camera recording" },
  { src: shotSrc(4), alt: "Overhead ladder rack cable pathways", caption: "Overhead pathways on ladder rack above the equipment room" },
];

export default function LowVoltagePage() {
  return (
    <>
      {/* Banner */}
      <section className="border-b border-line bg-canvas pt-28 pb-10 lg:pt-32">
        <div className="container-x max-w-4xl">
          <p className="eyebrow">Field services</p>
          <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.15] tracking-tight text-navy sm:text-[2.6rem]">
            Structured cabling, surveillance, access control, and VoIP
          </h1>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">
            Before OneBy was a software platform, it was a low voltage
            contracting company, and it still is. We design, install, and
            service the wiring and systems commercial buildings run on: network
            cabling, camera systems, door access, and business telephone
            systems, for facilities that operate around the clock and cannot
            close for construction.
          </p>
          <p className="mt-3 text-sm italic text-faint">
            Serving the Hudson Valley, North Jersey, and the NYC metropolitan area.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 lg:py-16">
        <div className="container-x max-w-4xl">
          <h2 className="border-b border-line pb-2 text-2xl font-bold tracking-tight text-navy">
            Services
          </h2>
          <div className="mt-6 space-y-7">
            {services.map((s) => (
              <div key={s.title}>
                <h3 className="text-[1.05rem] font-bold text-navy">{s.title}</h3>
                <p className="mt-1.5 max-w-3xl leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-t border-line bg-canvas/60 py-12 lg:py-16">
        <div className="container-x max-w-4xl">
          <h2 className="border-b border-line pb-2 text-2xl font-bold tracking-tight text-navy">
            Industries served
          </h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">
            Most of our work is in occupied, operating facilities.
            Installations are scheduled and sequenced so normal operations
            continue: overnight and off-hours work, section-by-section
            cutovers, and clean, closed ceilings at the end of every shift.
          </p>
          <ul className="mt-5 max-w-3xl space-y-4">
            {industries.map((i) => (
              <li key={i.name} className="leading-relaxed text-muted">
                <strong className="text-navy">{i.name}.</strong> {i.body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work */}
      <section className="py-12 lg:py-16">
        <div className="container-x max-w-4xl">
          <h2 className="border-b border-line pb-2 text-2xl font-bold tracking-tight text-navy">
            Our work
          </h2>
          <p className="mt-4 text-muted">Photographs from recent installations.</p>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {shots.map((s) => (
              <figure key={s.src} className="border border-line bg-white p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.alt}
                  className="aspect-[3/4] w-full object-cover"
                />
                <figcaption className="px-1 py-2 text-xs leading-snug text-faint">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="border-t border-line bg-canvas/60 py-12 lg:py-16">
        <div className="container-x max-w-4xl">
          <h2 className="border-b border-line pb-2 text-2xl font-bold tracking-tight text-navy">
            Standards and practices
          </h2>
          <ul className="mt-6 max-w-3xl list-disc space-y-2.5 pl-5 leading-relaxed text-muted">
            {standards.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact, plain and informative */}
      <section className="py-12 lg:py-20">
        <div className="container-x max-w-4xl">
          <h2 className="border-b border-line pb-2 text-2xl font-bold tracking-tight text-navy">
            Contact
          </h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">
            For proposals, site visits, or service on an existing system,
            contact our office. Plans and photographs are helpful for preparing
            accurate proposals but are not required.
          </p>
          <div className="mt-6 max-w-xl border border-line bg-canvas px-6 py-5">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[0.95rem]">
              <dt className="font-bold text-navy">Telephone</dt>
              <dd><a href="tel:+18452566329" className="text-blue-700 hover:underline">(845) 256-6329</a></dd>
              <dt className="font-bold text-navy">Email</dt>
              <dd><a href="mailto:info@oneby.ai" className="text-blue-700 hover:underline">info@oneby.ai</a></dd>
              <dt className="font-bold text-navy">Service area</dt>
              <dd className="text-muted">Hudson Valley, North Jersey, and the NYC metropolitan area</dd>
            </dl>
            <p className="mt-3 text-[0.8rem] text-faint">
              Licensed and insured. Certificate of insurance available on request.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
