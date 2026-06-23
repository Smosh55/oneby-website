# Scope: Live, workable demo on every industry page

## Objective
Give each of the 11 industry pages its own **live, interactive workspace demo**
(the same one from the homepage hero), but speaking that trade's language: the
inbound call, the summary, the catalog, tickets/jobs, schedule, team, billing,
messages, and tasks all phrased for that industry. A plumber sees a burst-pipe
job and a drain-snake catalog; a law firm sees an intake and a consult, not a
"ticket."

## The one engineering decision that makes this sane
Do **not** fork the demo 11 times. The current `HeroAppMock.tsx` is hardcoded
(Summit HVAC, Maria G., A/C diagnostic). Refactor it into a single
**presentational, config-driven component** and drive every instance from data:

```
<LiveDemo config={industryDemos[slug]} />   // industry page
<LiveDemo config={industryDemos["hvac"]} /> // homepage hero (or a generic)
```

One component, eleven data objects. All wording, catalog, and module labels live
in the config. New industries become a data edit, not a code edit.

## Architecture & files
- **`src/components/LiveDemo.tsx`** — the refactored, presentational demo. Takes
  a typed `DemoConfig`. Keeps all current behavior: typing intro, module
  switching, week calendar, editable catalog/billing, notes/tags, voicemail
  playback, customer timeline, home dashboard, replay-on-scroll, the
  "Live demo, edit anything" cue, mobile pill switcher.
- **`src/data/industryDemos.ts`** — `Record<slug, DemoConfig>` for all 11 (plus
  a shared default). Strict brand voice; zero em dashes.
- **`src/components/HeroAppMock.tsx`** — becomes a thin wrapper that renders
  `<LiveDemo config={industryDemos.hvac} />` (or keep the name, swap the body).
- **`src/components/industry/IndustryLanding.tsx`** — replace the small static
  "scenario mock" section with `<LiveDemo config={demo} />`; keep the trust bar,
  embedded lead form, and sticky mobile CTA. Pass the per-industry config in
  from `industries/[slug]/page.tsx`.

## DemoConfig data model (sketch)
```ts
type Billing = {
  mode: "standard" | "recurring" | "retainer" | "copay";
  lines: { label: string; amt: number }[];
  milestones?: { label: string; amt: number }[]; // big-ticket jobs only
};

type DemoConfig = {
  slug: string;
  business: string;                 // "Summit HVAC"
  labels?: Partial<Record<ModuleId, string>>; // rename modules per trade
  // the inbound call (a HUMAN answered it, AI summarized it)
  customer: string;
  answeredBy: string;               // "Dana" — reinforces human-first
  issue: string;                    // "Upstairs A/C not cooling"
  summary: string;                  // AI summary, faithful, trade-specific
  tags: string[];
  ticketNo: string;
  priority: string;                 // "Urgent" / "Emergency" / "New patient"
  // earlier-today log (the safety net in action)
  voicemail: { from: string; duration: string; transcript: string };
  missedCaught: { title: string; detail: string }; // AI-answered missed call
  // schedule + team
  techs: { name: string; role: string; status: string; jobs: string }[];
  dayJobs: Record<number, { time: string; title: string; tech: string; hot?: boolean }[]>;
  assignedTech: string;
  // catalog: the trade's services + parts, priced
  catalog: { name: string; type: "Service" | "Part"; price: number }[];
  billing: Billing;
  // messages, tasks, timeline, dashboard, notes
  messages: { me: boolean; text: string }[];
  quickReplies: string[];
  tasks: { title: string; meta: string; acted: string; flag?: boolean }[];
  timeline: { when: string; kind: "call"|"text"|"invoice"|"job"|"first"; title: string; body: string }[];
  stats: { label: string; value: string }[];
  notes: string[];
};
```

## Industry-specific language: module-label map
The Billing/Tickets/etc. modules keep one engine but relabel per trade:

| Industry | "Tickets" → | "Schedule" stays | Billing mode | Catalog flavor |
|---|---|---|---|---|
| HVAC, Plumbing, Electrical, Garage Door | Jobs | Schedule | standard + milestones (installs) | diagnostics, parts, installs |
| Roofing, Restoration | Jobs | Schedule | milestones (deposit/completion) | inspection, materials, full replacement |
| Pest Control | Jobs | Schedule | recurring (quarterly plan) | one-time treatment, plans |
| Property Management | Work orders | Schedule | standard | handyman visit, appliance repair, turnover |
| MSP / IT | Tickets | Schedule | recurring (managed plan) + hourly | remote/onsite support, managed seats |
| Law Firms | Matters / Intake | Calendar | retainer (trust, no tap-to-pay headline) | consultation, retainer |
| Medical / Dental | Appointments / Visits | Calendar | copay + insurance | office visit, copay |

Notes:
- **Law:** the AI does **intake and books the consult**; a human attorney always
  handles the matter. No legal advice. Billing = retainer/engagement, not a
  pay-link. Keep it tasteful and compliant.
- **Medical:** operational only (scheduling, reminders, messages). No PHI, no
  medical advice. Billing shows copay/insurance, not a tap-to-pay job invoice.
- **Pest / MSP:** lead the billing with a **recurring plan** (subscription), since
  that is how those trades actually bill.

## Per-industry demo concept (the inbound scenario, in their words)
1. **HVAC** — "Upstairs A/C not cooling overnight, wants same-day." (existing)
2. **Plumbing** — "Water heater leaking in the garage, water everywhere."
3. **Electrical** — "Half the house lost power, breaker keeps tripping."
4. **Roofing** — "Shingles blew off in last night's storm." (estimate → milestones)
5. **Restoration** — "Basement flooded overnight." (emergency, after-hours catch)
6. **Garage Door** — "Door won't open, spring snapped, car is stuck inside."
7. **Pest Control** — "Wasp nest by the front door." (offer quarterly plan)
8. **Property Management** — "Tenant in 4B: no hot water." (work order, unit/tenant)
9. **MSP / IT** — "Server's down at the office, nobody can work." (SLA/priority)
10. **Law Firms** — "Car accident yesterday, looking for a lawyer." (intake → consult)
11. **Medical / Dental** — "New patient, needs to book a cleaning." (appointment)

Each config also needs: a believable week of `dayJobs`, a 3-4 person `team`, an
8-item `catalog`, a `voicemail` transcript, an AI-caught missed call, a customer
`timeline`, dashboard `stats`, 2-3 `notes`, 3 `tasks`, and a short SMS thread,
all in the trade's vocabulary.

## Page integration
- `industries/[slug]/page.tsx` looks up `industryDemos[slug]` and passes it to
  `IndustryLanding`, which renders `<LiveDemo config={demo} />` where the static
  scenario mock is today (high on the page, under the hero/trust bar).
- Falls back to a sensible default if a slug has no config yet (so nothing
  breaks during rollout).
- Keep the page static (SSG); `LiveDemo` is a client component, code-split per
  route automatically.

## Phasing
- **P0 — Refactor (no new content):** extract `LiveDemo` + `DemoConfig`, move the
  current HVAC content into `industryDemos.hvac`, point the homepage at it.
  Verify the homepage demo is byte-for-byte the same experience.
- **P1 — 3 flagships:** author configs for HVAC (done), Plumbing, Property
  Management; wire their pages; confirm label overrides + billing modes work
  (standard, work-order, recurring).
- **P2 — Remaining 8:** author the rest. Parallelizable: one writer per industry.
- **P3 — Variant polish + QA:** law (retainer/intake), medical (copay), pest/MSP
  (recurring) billing variants; full build + em-dash + link check; mobile pass.

## Parallelization
Once P0 lands (the type + component exist and compile), author the 8 remaining
configs with parallel subagents, one industry each, given: the `DemoConfig`
type, the HVAC config as the worked example, the scenario line above, strict
voice rules (playful, human, zero em dashes, nothing AI-sounding, "launching at
go-live" honesty), and the label/billing-mode for that trade. Then verify every
config centrally (build, em-dash grep, spot-read).

## Risks & mitigations
- **Concurrent edits:** the other session is editing `IndustryLanding` and
  industry data right now. Do P0 only when the industry files are stable, or it
  will collide. Coordinate before the refactor.
- **Performance:** only one demo renders per page and it is code-split, so cost
  is the same as the homepage today. No regression expected.
- **Law/medical sensitivity:** AI handles intake/scheduling only; humans handle
  the work; no advice, no PHI, compliant billing framing.
- **Honesty:** modules are "launching at go-live"; the demo is a clearly
  illustrative mock, no fake live data.
- **Scope creep:** resist adding new modules per trade. Same module engine,
  different labels + data. New behavior only if a trade truly needs it
  (recurring billing is the one real variant worth building).

## Acceptance criteria
- One `LiveDemo` component drives the homepage and all 11 industry pages.
- Each industry page shows a working demo a visitor can click and edit, with the
  call, summary, catalog, and module labels in that trade's language.
- Billing mode is correct per trade (standard / recurring / retainer / copay).
- `npm run build` passes; all 11 generate; zero em/en dashes; internal links
  resolve; mobile switcher works; replay-on-scroll works.
- Removing or renaming a module is a one-line data change, not a code change.
