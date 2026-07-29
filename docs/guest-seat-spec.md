# Guest Seat ("Looped"), product spec

Market name (Moshe, July 29): **Looped**, from the in-product tagline "keep
them looped." Working name in earlier docs: Guest Pass. Trademark screening
done (see docs/legal/looped-trademark-check.md): no live standalone LOOPED
registration, but the LOOP field is crowded, so the posture is house-branded
"OneBy Looped" externally, bare "Looped" inside the product, and no standalone
registration attempt. The base tier is Looped; the AI layer is Looped+.

## Status visual language (states and meaning; implementation is yours)

The loop mark is the tier language, decided July 29:

- **Grey open loop** (dashed, with the guest's dot sitting at the gap): the
  $0.99 base guest. Incomplete, not wrong.
- **Amber open loop**: the premium guest (Looped+, $3.99): warmer, closer,
  still open. Amber is reserved for this tier state only, never for warnings.
- **Green closed loop**: a full OneBy user. The upgrade language everywhere
  is "close the loop."

Pricing runway note: if Looped proves popular, the base seat may move from
$0.99 to $4.99 for NEW passes. Passes already granted keep the price they
were granted at (same grandfathering rule as the promotional terms).

For the platform build. This defines what a guest seat is, the rules it obeys,
and the monetization logic. How to model or implement any of it is your call.
Nothing here prescribes schema or build steps.

## The idea in one line

A paying OneBy business (the host) can grant an outside party they work with
constantly, a vendor, a subcontractor, an adjuster, a process server, a $0.99/mo
guest seat that puts that one relationship inside OneBy: the guest sees and acts
on only what the host shares (their work orders, their tasks, their
appointments), the host sees and controls everything, and the AI layer (call
summaries and transcripts related to their shared jobs) is a $3.99 unlock on top.

The power dynamic is the product: the host runs the relationship on their turf,
with their rules, and can revoke it in one tap. The guest gets enough real value
(the actionables, the schedule, the paper trail) that saying no to the invite
means staying out of the loop.

## Why this exists (strategy, so the shape makes sense)

1. Revenue is not the point of the $0.99. The point is that every guest is a
   tradesperson or professional who now uses OneBy every day from the weak side
   of the table. They are the exact buyer of our free invoicing tier and,
   eventually, the AI Suite. The guest seat is a self-propagating acquisition
   channel where the invite email is the ad and the host does the selling.
2. A host whose vendor network lives inside their workspace does not churn.
   Every connected guest raises switching cost.
3. No competitor can follow cleanly. Phone-only products (Quo, OpenPhone) have
   no jobs or tasks to share. Field-service products (Jobber, Housecall Pro)
   have no call layer, so they cannot share the thing that starts every job:
   what the customer said on the phone. We own both ends, so the call itself is
   the shareable object.

## Two kinds of guests, one mechanic

The seat covers two host-side sells with identical mechanics:

1. **Vendors and partners** (the original case): subs, adjusters, process
   servers, referral partners. The host dispatches work to them.
2. **Regulars** (the personal case): the people the host talks to constantly
   about ongoing work but does not dispatch to. The property owner who calls
   for updates, the facility manager at a commercial account, the realtor or
   insurance agent who refers jobs monthly, the client on a long-running
   matter, the builder or developer the host does recurring project work for.
   For these the pass is read-mostly: their jobs, their statuses, their
   appointments, and (with the $3.99 layer) the call summaries about their
   stuff, so they stop calling the host for updates.

   Note the power dynamic can run either way here and the mechanics hold both
   ways. A vendor needs the host's work; a developer guest may be the host's
   biggest client. In that case the host grants the pass to keep the account
   (the client who can watch their own jobs move does not shop the
   relationship), and the host still controls scope completely.

   The multi-host effect matters most for this kind of guest: a developer
   holding passes from their plumber, electrician, and roofer on one build has
   assembled a bird's-eye view of their own project inside OneBy without
   buying anything. That guest is the ripest host-conversion target in the
   funnel; the upgrade pitch is running the whole project from their side.

The boundary that keeps positioning clean: a seat is for a RECURRING
relationship with an ongoing stream of jobs, tasks, or referrals. One-off
customers never get seats; they get the normal share surfaces (estimate view,
invoice pay link). If Guest Pass reads as a paid customer portal, competitors
give that away free and we lose the story. Recurring is the word that guards it.

## The relationship object

A guest seat is always scoped to a named relationship between one host business
and one outside party. Everything the guest can ever see hangs off that scope:

- The host creates the relationship (e.g. "Rodriguez Plumbing, vendor") and
  invites the guest by email or by texting an invite to their phone number,
  which we likely already have from call history.
- One guest can hold seats with many hosts (a plumber serving three property
  managers has three separate guest views; nothing crosses between them).
- One host can hold many relationships. Each is granted, priced, and revocable
  independently.
- Revocation is instant, one action, host side only. The record of everything
  that happened stays with the host. The guest loses access, never the host's
  history.

## The guest timeline: a shared system of record, not a feed (July 29)

The reason a seat beats a text thread or a plain automated notification is that
it is a persistent, trusted record of the relationship, not a stream of
disposable alerts. An automation can push "job done" to a phone; it cannot be
the place both sides point to when they disagree about what was approved. That
record is the moat (automations are a commodity; a mutually trusted ledger is
not), and it must hold four properties or the seat degrades into "just
notifications":

1. **Persistent and authoritative.** Every shared action (status change,
   approval, upload, completed form, comment) is timestamped, attributed to a
   named identity, and not silently editable after the fact. The value is that
   there is one version of events, not two.
2. **Bi-directional.** The guest acts inside the timeline (accepts, checks off,
   uploads, requests a reschedule, comments), not just receives. A guest who
   only receives has a feed; a guest who contributes has a shared record.
3. **Scoped identity.** The timeline is THE home for this one relationship, the
   shared history of the host and this one party, with nothing else bleeding in.
4. **Neutral within the shared scope.** The host controls what is shared and can
   revoke access, but what has been shared forms an authoritative record that
   neither side can quietly rewrite. This is what makes the guest trust it enough
   to rely on it, and what turns "the contractor's app" into a record that
   protects the guest too.

This complements, and does not soften, host control. The host still owns the
full audit trail across all their relationships; what is new is that within a
single shared relationship, the record is authoritative to both parties. Host
control over SCOPE and the mutual trustworthiness of the shared RECORD are not in
tension: the host decides what enters the record, and once it is in, it reads the
same for both.

Design consequence, and it is a hard rule: every element on the timeline should
be something both parties would independently want to exist. If the timeline
reads only as the host watching the guest, guests stop opening it (the
field-service portal graveyard). If it reads as the one place neither side can
get burned, they return unprompted, no mandate required. A guest wanting their
own copy of "what was authorized" is the reason they show up, not a threat.

Notifications are a spoke, never the product. Outbound alerts to the guest (SMS
from the host's number, or email) exist only to pull them back into the timeline
when something needs them; this is one-directional alerting and gives the guest
no telephony, consistent with the host-only phone ceiling below. Anything that
must be remembered, referenced, or trusted lives in the timeline, not the text.

## Guest identity and sign-in (July 29)

Guests sign in. A seat is a real authenticated account, not an anonymous share
link, because attribution is what makes the timeline trustworthy (property 1
above): an anonymous link cannot say who approved what.

- Guests authenticate through existing single sign-on (the Google or Microsoft
  account they already have). This is both the low-friction on-ramp (one tap, no
  new password, nothing to set up beyond the login) and the identity anchor that
  stamps every guest action with a verified person.
- One SSO identity carries across every host a guest works with: one sign-in,
  many passes. A sub serving five general contractors has one Looped identity and
  five scoped relationship timelines, and each host sees only their own. This is
  what removes the "another login per relationship" friction while keeping every
  host fully isolated from the others.
- Because the identity is verified and known, not an anonymous recipient, every
  guest is a named, reachable future customer. That is what makes the conversion
  funnel later in this doc real rather than aspirational.

## What a guest can see and do (the default grant)

Only objects the host has explicitly linked to the relationship, and only these
kinds of objects:

- Work orders / jobs assigned to them: status, address, scope, checklists,
  attached forms, photos. Guests can update status (accepted, on my way, done),
  complete checklists and forms, and upload photos. They cannot see the
  customer's other jobs, the money, or anything unassigned to them.
- Tasks assigned to them or where the host added them as a watcher, with
  comments and @mentions scoped to those tasks.
- Appointments involving them: their visits on the calendar, reschedule
  requests (request, not unilateral change; the host approves).
- A message thread per shared job, so coordination stops living in personal
  texts. Free for guests up to a monthly cap (see the messaging rules below);
  this is in-platform messaging, not SMS through the phone system, which
  stays host-only.

Explicitly NOT in the default grant: call summaries, transcripts, recordings,
customer contact history, invoices and money, the host's price book, other
vendors, anything about the host's business beyond the shared objects.

One hard ceiling above all toggles (corrected July 28): **the guest seat is
the CRM/collaboration layer only. Telephony is host-only, at every permission
level.** Calling, phone lines, SMS through the phone system, voicemail, and
anything else that touches the phone stack is never part of a guest seat, at
any price. Two reasons:

- The phone is the paid wedge. A $0.99 seat that can call would cannibalize
  the $15 line. A guest who wants to call through the platform has exactly
  one path: become a host.
- It keeps the power dynamic physical. The host owns the number the customer
  calls; the guest works downstream of it.

The guest's toolkit is relationship management for this one relationship:
shared jobs, tasks, appointments, forms, photos, notes, and messaging. The
host's customer list stays protected by relationship scoping as defined
above (guests only ever see objects linked to their relationship), not by
removing the collaboration tools that make the seat worth having.

**Messaging: free but capped.** Guests get in-platform messaging on their
shared threads at no charge, up to a monthly cap, so coordination moves off
personal texts and into the workspace (that is the stickiness and the data)
without the seat becoming a free comms product. Recommendation: bundle
unlimited messaging into the $3.99 layer, which gives that tier a second
compelling reason to exist and gives the cap a clean release valve. Cap size
and reset cadence are business decisions, flagged below.

## The $3.99 AI unlock (per relationship, per month)

Adds the post-call layer to that one relationship:

- AI call summaries for calls the host has linked to the guest's shared jobs.
- Transcripts of those same calls where the host allows it.
- AI-drafted handoff notes ("here is what the tenant said, here is what to
  bring") generated from the call, pushed to the guest with the work order.

The host always controls, call by call or as a default rule, whether a given
call's summary is shareable at all. The unlock buys access to what the host
shares, never to the host's call history.

## Permission logic (the asymmetry, made explicit)

- The host holds every permission. Guest capabilities are a strict subset,
  granted per relationship, editable any time, built from the existing granular
  permission model rather than a new one.
- The primary control surface is host-side, per guest, per object type: for
  each of jobs/work orders, tasks, appointments, photos, forms, and messages,
  the host toggles view / add / edit / delete independently. The host decides
  what each relationship deserves; the product does not decide for them. No
  industry assumptions baked in anywhere.
- Presets exist only as optional quick starts so a host is never forced to
  build from toggles: Field vendor (work orders + schedule + photos + forms),
  Referral partner (status visibility on referred jobs, no field actions),
  Reviewer (read-only on shared items), Regular (read-only across the jobs
  tied to their properties, accounts, or matters, plus their appointments).
  Picking a preset just sets the toggles; the host can change any of them
  after.
- Everything a guest does is stamped in the host's timeline (status changes,
  photo uploads, form completions, comments). The audit trail belongs to the
  host.
- Guests never see each other. Two vendors on the same job each see only their
  own slice unless the host explicitly opens a shared thread.

## Automations hooks (reuse the existing engine)

The automation builder should treat guests as first-class targets so hosts can
wire the loop once and forget it:

- Trigger: job assigned to a relationship -> action: notify guest, share the
  linked call summary (if unlocked), request acceptance.
- Trigger: guest marks done -> action: notify host, open invoice task, request
  completion form.
- Trigger: guest has not accepted within X hours -> action: notify host or
  offer to next vendor.

## How seats get sold (in-product, not campaigns)

The primary sales channel is the product itself, triggered by data we uniquely
have because we run the host's phone. The go-to-market decision (Moshe,
July 28) is explicitly NOT industry targeting: sell it to every host at the
moment the product can see the relationship, and let hosts decide who is
worth a seat. The tagline, in the host's own product surfaces:

> Talk to them all the time? Keep them in the loop for 99 cents.

The trigger logic:

- The call log knows who the host talks to constantly. When a contact crosses
  a frequency line (repeated calls or texts over a rolling window), surface
  the offer on that contact, on the post-call screen, and in the call detail:
  "You've talked to this number 14 times this month. Keep them looped for
  $0.99." One tap starts the invite.
- Same trigger when a host repeatedly forwards, copies, or texts job details
  to the same outside number: that is the manual version of what the seat
  automates, and the moment the pitch is self-evident.
- The invite is delivered as a text from the HOST'S own number (we run their
  phone). The guest receives access from a person they already work with,
  not marketing from us. Follow-up email optional, the text is primary.
- Exact thresholds and prompt frequency are tuning decisions; the principle
  is fixed: offers appear where the relationship is already visible in the
  host's data, and never as generic upsell banners.

## Monetization and billing rules

- $0.99 per relationship per month, billed to the host (working assumption;
  see flagged decision 2). It is deliberately trivial: the host expenses their
  whole vendor network without a thought, and the per-seat price exists mainly
  so seats are real, countable, and spam-free rather than free-forever ghosts.
  Where a host hesitates, the answer is host-side promotion in the product,
  not routing billing to the guest.
- The $3.99 AI unlock can be bought by EITHER side. When the guest buys it, the
  weak side is paying us to stay in the loop, and we now hold a billing
  relationship with a future customer. Both sides buying is fine; do not
  double-charge, treat it as covered.
- Every host gets 3 guest invites free, permanently (Moshe, July 28). Seats
  beyond 3 are $0.99 each. The first three exist purely to seed the loop:
  they cost nothing to serve and every activated guest is an acquisition
  candidate. Founders may get more as a launch perk; number pending.

## The conversion path (guest -> customer)

The guest experience is also an onboarding funnel, and should be built as one:

- The guest's home view shows their shared work clearly, and shows the rest of
  the platform honestly locked, the same visible-but-locked pattern as the free
  invoicing tier: one line on what each module does, one upgrade action, never
  a dead end.
- A guest holding seats with 2 or more hosts is living in OneBy daily. That is
  the moment to offer: run your own business here, invoicing is free forever.
  Their upgrade creates a full business account alongside their guest seats;
  guest seats never convert away, they accumulate.
- Measure this. The KPI for the whole feature is guest-to-account conversion,
  not seat revenue.

## Boundaries and safety rails

- Privacy: transcripts and summaries can contain customer personal details.
  Sharing is always host-initiated, per call or per rule, and every share is
  logged. Nothing is shared by default.
- Verticals with confidentiality duties (law firms especially) need the
  Reviewer preset and share-nothing-by-default posture; the host decides what
  crosses, item by item.
- A guest seat is not a lite license for the host's own employees. If a host
  tries to run techs on guest seats, seat limits and the permission ceiling
  (no price book, no invoicing, no customer list) make that self-defeating.
  Flag abuse patterns rather than policing them pre-emptively.

## Platform capabilities Looped assumes (confirm before building, July 29)

These are the assumptions the feature rests on, stated as what Looped needs to be
TRUE about the platform, not as instructions on how to make it true. The
architecture is yours. Flagging them because the answer to the first one decides
whether Looped is an additive feature or needs groundwork first.

1. **One user, many tenants.** Looped assumes a single authenticated identity can
   hold guest membership in many separate host tenants at once, under one login.
   The fork: if a user is already global with many-to-many membership into
   tenants, a guest is simply a new, heavily scoped membership type and this is
   additive. If a user is today pinned to exactly one tenant, a
   tenant-independent identity layer is the prerequisite and comes first. SSO
   already working points toward the global-identity case, which is the good
   outcome. Confirm which is true before scoping the rest, it changes the size of
   the job more than anything else here.

2. **Record-level scoping below the tenant line.** Existing multitenancy isolates
   whole tenants from each other. Looped additionally needs a guest to see only a
   SLICE of a host's tenant (the objects linked to their one relationship), not
   the tenant as a whole. This finer-grained, per-record visibility is distinct
   from tenant isolation and is where most of the feature's real work
   concentrates.

3. **Isolation on the aggregated guest surface.** The guest's cross-host view
   (their list of passes spanning many hosts) is the one place the system
   deliberately reads across tenants for a single identity. It must never leak one
   host to another: a guest must never surface host B inside host A's context, and
   a host must never learn which other hosts their guest serves. This aggregated
   surface is exactly what tenant isolation does NOT cover on its own, so it is
   the security-critical part to design and test hardest. Cross-tenant leakage
   here is the highest-severity failure mode of the whole feature.

4. **Verified attribution across the boundary.** Every guest action taken inside a
   host's tenant must carry the guest's verified (SSO) identity and a timestamp
   into that host's record, so the shared timeline stays authoritative (see the
   system-of-record properties above).

## Decisions flagged for Moshe (not build questions)

1. Included free guest seats for founders (how many, how long).
2. Who can pay the $0.99 base seat. Status: under discussion between Moshe and
   Eli. Moshe leans host-paid only, with in-product host-side promotion as the
   answer when a host hesitates (advertise the seat to the host, do not route
   billing around them). Treat host-paid as the working assumption; do not
   assume guest-paid base seats unless that discussion lands otherwise. The
   $3.99 AI unlock staying either-side is a separate question and unchanged
   for now.
3. Seat cap per host on lower tiers, if any.
4. Whether transcripts (not summaries) sit only in the $3.99 tier or need the
   host's per-call approval as well (I lean both).
5. The free messaging cap: size and reset cadence (e.g. N messages per
   relationship per month), and whether unlimited messaging bundles into the
   $3.99 layer (recommended above).

## Out of scope for this document

How to store relationships, scope permissions, or bill any of it is entirely
your call. This spec only defines what a guest seat does and the rules it obeys.
