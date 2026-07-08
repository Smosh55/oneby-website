# Product vs. website audit (living doc)

Date: July 5, 2026. Source: screenshots of the real platform at dev1.elygrp.com,
reviewed against everything oneby.ai currently promises. Update this doc as more
of the product is reviewed or built.
Updated July 8, 2026 with a 49-screenshot capability sweep (see the July 8
section near the bottom).

## Verdict in one paragraph

The "runs the job" half of the pitch is real and deeper than the website shows:
booking, dispatch, scheduling with crews and skills, tasks, Good/Better/Best
estimates, a full billing suite, a form builder, integrations UI, multi-location,
and per-trade vocabulary presets. The "AI catches the call" half, which is the
website's headline promise, is explicitly marked Coming Soon in the product.
The phone system itself (numbers, calls, voicemail, SMS, eFax) is live. The
launch risk is concentrated in exactly one place: whether live AI answering
ships by August.

## What is confirmed real

- Phone system: real call history (ring time, talk time, direction, outcomes),
  3 numbers, extensions, voicemail, SMS, eFax nav, phone system settings.
- Call-to-work pipe (manual): Create job and Add task buttons on call detail.
- Booking flow: service type, trade routing, availability day picker, book-later
  to dispatch board, text/email confirmations, 24h reminder, assignee notify.
- Schedule: per-person columns, skills and crews, unscheduled staging lane,
  drag to assign, By person / Week / Board views.
- Tasks: My Day, team views, shared lists, automations entry, workload view.
- Billing: invoices (draft, templates, recurring, deposits, per-line tax, PO),
  quotes, estimates, price book, recurring invoices, templates.
- Estimates: Good/Better/Best three-option builder with recommended flag,
  per-option deposit, price book lines, customer view. Flagship feature.
- Forms: 16 field types incl. signature, photo, video, location; attach to
  jobs/tasks/customers/surveys; live mobile/desktop preview; autosave.
- Users and roles: role-scoped invites, local logins, extensions, pending state.
- RBAC: Roles & Permissions with a permission matrix, custom roles, Owner role
  carrying 105 granular permissions, roles scoped to business or location.
- Schedule Board view: day columns for the week, per-person capacity (6h/8h
  booked), drag to reschedule/assign/unassign, Lock Day, unassigned lane with
  1d/2d/3d aging filters, week totals (7 scheduled, 0 unassigned, 29h est).
- Dispatch: open jobs across customers by next visit, status chips (In
  progress, Scheduled, Quoted, Inspection), multi-visit jobs ("2 visits").
- Business texting setup: a guided A2P/10DLC carrier registration wizard
  (legal name + tax ID, use-case declaration, number selection, carrier review
  in 1 to 3 days with failure guidance). This is real carrier compliance
  machinery, strong evidence the SMS/telephony backbone is genuinely wired.
- Invoices list: live and empty for the real tenant ($0.00, 0 invoices, "First
  month" badge, status filters, smart sort). Live-wired module, unlike the
  estimates screen which is badged Mock.
- Modules: business-type presets (General, HVAC, Plumbing/electrical,
  Legal/professional, General contractor) that rename vocabulary app-wide,
  plus Customize Words. Text messaging toggle; eFax as a $10/mo add-on.
- Multi-location tenant switcher.

## What is mock or unconfirmed

- AI follow-ups: marked COMING SOON in call detail. No AI answering, summaries,
  or transcripts exist in the product yet.
- Tech mobile view (My Jobs Today, On my way, timer, photos, signature):
  watermarked "Mock, demo only".
- Estimates screen: badge says Mock (the builder UI exists; unclear if send/
  accept/deposit collection works end to end).
- Integrations grid: connected accounts show "Acme Plumbing" sample data.
  Unknown which OAuth flows actually work vs. display-only.
- Demo persona "Eli" appears in greetings on some pages.

## The one strategic question

Which of these ships in August?
1. Live AI answering: AI picks up calls humans miss, talks to the caller,
   books the visit. This is what the website currently sells.
2. Post-call AI: AI listens/transcribes after the fact, drafts follow-ups,
   recap, quality score. This is what the Coming Soon panel describes.

If (2) is the honest August scope, the website should be softened now:
hero "catches the rest" language, the HeroAppMock "AI answered" badges, the
ai-receptionist page, and the ads kit claims. Founders refunds are the
downside of overpromising. Decision owner: Moshe + partner.

## Where the website undersells the product (fix soon, high ROI)

1. Good/Better/Best estimates: not mentioned anywhere on the site. Add to every
   trade landing page and pricing page; write a blog post ("Send three options,
   most people pick the middle one"). No phone-first competitor has this.
2. Modules / per-trade vocabulary: the product literally renames itself per
   trade. This is hard proof of the "bespoke for your trade" positioning across
   the 11 mini-sites. Add a "OneBy speaks your trade" section.
3. Form builder: quietly replaces Jotform/paper forms. Worth a feature bullet
   and a blog post.
4. Integrations (pending reality check): QuickBooks, Stripe, Slack, HubSpot,
   Google Calendar, Zapier, webhooks, ServiceTitan, Housecall Pro, Xero,
   Mailchimp, Teams, Salesforce, CompanyCam, Freshdesk. If real, "works with
   QuickBooks" belongs on the pricing page, and the founders-page stretch goal
   "Calendar sync at $25k" is stale (it already exists) and should be replaced
   with something bigger.
5. Multi-location: mention for the property-management and MSP verticals.
6. Guided texting compliance: A2P/10DLC registration is a notorious pain point
   (blocked texts, opaque carrier rejections). "We walk you through carrier
   registration in 3 steps" is a marketable bullet and a blog post ("Why your
   business texts get blocked, and how to fix registration").
7. Scheduling depth: capacity per tech, Lock Day, aging unassigned-job filters.
   Worth a line on trade pages that dispatch-heavy buyers will notice.
8. RBAC: "owner, admin, member, plus custom roles with 105 granular
   permissions" reassures the office-manager buyer; a trust bullet on pricing.

## Product punch list (pre-beta)

P0 (blocks demos / trust):
- [ ] Invoice builder: "Customer list didn't load" error on Bill To.
- [ ] UTF-8 encoding bug on Tasks page (broken em dashes and emoji render as
      "â€"", "ðŸ'‹"). Likely missing charset/meta or wrong Content-Type.
- [ ] Call detail: "Answered" badge alongside "Answered by: No one".

P1 (before first founder/beta login):
- [ ] Brand: one name everywhere. Site says OneBy; product logo says Oneby.Ai;
      footer says "(c) 2026 One by IT"; invoice header says "Oneby AI".
- [ ] Onboarding must force a real business profile (invoice shows placeholder
      "1 Market St, Suite 400, San Francisco" with NYC-area phone numbers).
- [ ] Strip em dashes from product UI copy (style rule; also sidesteps the
      encoding class of bugs). Examples: tenant switcher, job titles, hints.
- [ ] Demo persona greetings ("Hi Eli") should follow the logged-in user.
- [ ] Google Calendar tile shows Token expired; fine if real, confusing if mock.
- [ ] Move product to app.oneby.ai before beta invites (currently
      dev1.elygrp.com); founders' first login should match the brand.

P2 (nice before launch):
- [ ] Add business-type presets for the site's other verticals: roofing,
      restoration, garage door, pest control, property management, MSP,
      medical offices (vocabulary bundles on top of Customize Words).
- [ ] Missed calls on Home should offer a next action (call back, create job)
      rather than sit as dead log entries, especially pre-AI.

## Website punch list (depends on AI answer)

- [x] Decide August AI scope. ANSWERED (July 6): v1 ships without live AI
      answering; summaries ~3 weeks (by the August opening), agents ~2 months.
      Site now sequences the promise: founders page "What ships when" section,
      day-one FAQ, year-starts-at-activation, early-access framing on pricing
      and drip email 4. Live answering is dated only as "founders first this
      fall". REMAINING: if summaries slip past the August opening, soften the
      day-one copy; revisit ads kit A-series angles before ads resume.
- [ ] Add Good/Better/Best estimates section + blog post.
- [ ] Add "speaks your trade" Modules section.
- [ ] Refresh founders stretch goals (calendar sync already built).
- [ ] Add integrations logos once confirmed real.

## July 8 capability sweep (49 screenshots, bugs ignored by request)

New confirmed capabilities, beyond everything above:

Phone system (deeper than previously known):
- Call types: normal, voicemail, parked, transfer, conference. Call recording
  with playback ("only recorded calls" filter). Rich filtering: direction,
  outcome, ring/talk time ranges, per-number, extensions.
- Create job / Add task directly from a call; "What happened" plain-English
  call timeline; call tagging.
- Missed-call KPIs on Home; dark mode across the app.

Automation engine (real builder, not just toggles):
- Cross-module triggers: voicemail received, missed call, job moves to stage,
  visit scheduled/completed, task created/status/priority/due/assigned.
- Conditions (e.g. contact tag has any of X), multi-step actions (notify
  teammate, custom message), plain-English rule summary, preview.
- Missed-call text-back is a first-class example flow.

Tickets (full field-service object):
- Lifecycle actions: On my way, Reschedule, Put on hold, Cancel; status
  banner; Office / Field / Dispatch role views on the same ticket.
- Two-way customer SMS and calling embedded in the ticket; field photos;
  notes; timeline with activity log; checklists and attachable inspection
  forms (e.g. "HVAC Inspection" from the Forms module).
- Custom fields on tickets: 8 field types (text, long text, number, dropdown,
  multi-select, checkbox, date, rating), built inline, live-editable.
- Parts + labor ("The work") with running total; billing card offering
  "bill it all at once" or progress billing ("bill in stages").
- List / Board / Schedule views inside Tickets (note: duplicates the
  standalone Schedule; unification spec sent to Eli July 8).

Price book (much deeper than the import modal suggested):
- 118 services + 23 products in the seeded catalog; import; categories;
  active/archived.
- Per-item: margin/profit display, taxable toggle, variants (size/model/
  finish each with own price), volume/contractor price tiers, bundles/kits
  composed of other items, requirements (skills/equipment/permits) that gate
  which techs can be scheduled.
- "Improve with AI" description writer on items: the first LIVE AI feature
  observed in the product.

Estimates:
- Good/Better/Best builder confirmed with per-trade starter template importer
  (HVAC 2, Plumbing 2, Electrical 1, Roofing 1), customer view (tap-to-pick),
  per-option deposit %, star recommended, create-price-book-item-on-the-fly,
  add a 4th option. End-to-end send/accept/deposit still unverified.
- Quote-to-invoice conversion endpoint exists (/quotes/{id}/convert).

Billing:
- Recurring invoices with auto-charge each cycle (weekly/monthly/quarterly/
  yearly/custom) and first-run preview; progress billing from tickets.

Tasks (project-management grade):
- Projects, epics, watchers, custom fields, dependencies (blocked by/blocks/
  relates to), time tracking (estimate + log), reminders, recurring tasks,
  skill-based assignment, @-mention comments, private and shared lists,
  Board/Table/Calendar/Timeline/Workload views, custom statuses, swimlanes.
- Universal linking from tasks to: Lead, Contact, Client, Voicemail, Call,
  Message, Ticket, Quote, Invoice (confirms Leads exist as an object).

Settings / org:
- Customizable job-status pipeline (9 defaults: Unscheduled, Quoted, Approved,
  Scheduled, In progress, On hold, Completed, Invoiced, Paid), reorderable,
  hideable. Matches the unified-lifecycle spec sent to Eli.
- Skills & crews: jobs can require a skill, soft-warn when scheduling someone
  without it; crews as dispatch groups with their own board column.
- Multi-BUSINESS tenancy (separate businesses under one account) on top of
  multi-location; "Look & branding" and "Emails we send" customization.
- Users + groups; contacts with multi email/phone, labels, company, title,
  account rep.

Website implications (queue behind the AI-sequencing work already shipped):
1. Missed-call text-back deserves its own feature bullet everywhere (it works
   TODAY without the AI receptionist; competitors charge for it).
2. Automations page/section can now show real triggers and the builder story.
3. Price book depth (variants, contractor tiers, bundles, margin) is a
   feature page of its own; "Improve with AI" is honest AI-today proof.
4. Estimates starter templates strengthen the planned G/B/B section: "import
   5 ready-made estimates for your trade" (template build prompt sent to Eli
   July 8, covers 35 industries).
5. Progress billing + recurring auto-charge belong on pricing/features pages.
6. Custom fields + inspection forms + Office/Field/Dispatch views are
   credibility details for the trades pages (dispatch-heavy buyers notice).
7. Call recording, park/transfer/conference, extensions: table stakes rows
   for the compare pages vs RingCentral/Nextiva/Dialpad, all honest now.
8. Time tracking + projects/epics could anchor a "runs your office too"
   angle for MSP/law-firm verticals.
