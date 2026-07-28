# Free Invoicing Tier, product spec

For the platform build. This is what the free tier should do and the rules it
follows. How to model, store, or implement any of it is your call. Nothing here
prescribes schema or build steps.

## The idea in one line

Give away invoicing as the front door. A free user is a real OneBy account with
only the get-paid tools usable; the phone line, the AI, and the ops tools are
visible but locked. Getting paid is the one thing every owner does every week,
so it lands them inside the product, and the upgrade to the AI Suite is one tap
away in front of a logged-in user who already trusts us with their money.

Why this and not "free CRM": owners search for "free invoice software" by the
thousands and never search for "free CRM." Invoicing is the wedge. It also
finishes the funnel we just started on the website: the free estimate templates
at /templates send people looking for exactly this.

## The one rule that makes it work

A free user is a real platform account, not a separate tool or a stripped export.
Same login, same data model, same invoicing module we already built. The only
difference is entitlements: the get-paid tools are on, everything else is locked.
No duplicate system, no migration later. Upgrading flips entitlements, nothing
moves.

## What a free account can do (unlocked)

The "get paid" stack, genuinely usable end to end:

- Create, brand, and send invoices (their logo, their terms, their business
  profile).
- Good/Better/Best estimates, and convert an accepted estimate into an invoice.
- Price book, so line items are reusable across estimates and invoices.
- Get paid online (customer pays from the invoice).
- Deposits, partial payments, and recurring invoices.
- Payment status and reminders (sent, viewed, paid, overdue, nudge).
- The client records that invoicing needs: name, contact, and that client's
  own invoice and estimate history. Not the full CRM, just what billing touches.
- A simple money dashboard: outstanding, paid, overdue.

The guiding line: invoicing is not crippled to force an upgrade. It is a real,
complete, free invoicing product. The gate is the other modules, not a worse
invoice. A free tool people quietly recommend is worth more than a demo that
nags.

## What is visible but locked (the upgrade surface)

Everything that is not the get-paid stack shows in the product but is locked
behind a single, honest upgrade action:

- The business phone line and number ($15 line).
- AI receptionist: call answering, summaries, transcripts, follow-ups (AI Suite).
- Tickets / jobs / work orders and their field views.
- Scheduling, dispatch, crews, and the board.
- The automation builder and missed-call text-back.
- Two-way SMS / messaging and eFax.
- Forms and inspections.
- Paid integrations, multi-location, and extra team seats beyond the free limit.

Rules for locked modules:

- Show what the module does in one line and one screenshot-quality preview, then
  one clear upgrade button. Never a dead end, never a broken or fake-data screen.
- A free user never hits an error where a paid feature would be. Locked reads as
  "here is what you unlock," never as "something is wrong."

## The upgrade logic (when to surface the paid pitch)

Surface the AI Suite at moments of earned value and clear intent, not as a
constant nag:

- Value-first triggers: after the first payment is collected, after a set number
  of invoices sent, or after the first estimate is accepted. The user has felt
  the product work, then we say: OneBy can also answer the calls that bring these
  jobs in, and turn them into the invoices you just sent.
- Intent triggers: whenever a free user opens a locked module, show that module's
  upgrade card.
- One quiet, always-available upgrade path (a single persistent entry point), so
  a ready buyer never has to hunt for it.

The offer shown, consistent with the website and founder flow:

- Invoicing stays free forever.
- The business line is $15.
- The AI Suite is $49. Pre-launch and for founders: locked at $39 for two years
  with the first 6 months free. No per-call meter.

## Boundaries that keep it honestly free

- Unlimited invoices and estimates on free. No invoice cap that makes the tool
  useless; that would kill the word-of-mouth the wedge depends on.
- Team seats: free is for the owner or a very small team. More seats is a paid
  reason. Exact free seat count is a business decision, flag it back to Moshe.
- Online payment processing fees: whether the free tier uses the owner's own
  processor connection or ours, and at what rate, is a business and margin
  decision, not a build one. Flag it back to Moshe before wiring payment.

## How free connects to the rest of the funnel

- Website /templates (free estimate templates, live now) is the top of this
  funnel: search "free estimate template" -> use it -> "build and send this in
  OneBy free" -> free account.
- Every free account is a warm upgrade target for the $15 line and the $49 AI
  Suite. The pre-signups and founders flow feed the same accounts.

## Pre-launch coordination (not a build instruction)

The public signup engine is not live yet; retail launch is October 2026. Until
free signup is on, the website's free-invoicing page captures early access into
the same founder/waitlist list. When free signup goes live, that page points at
real account creation. The tier itself can be built and tested against that date.

## Out of scope for this document

How to store entitlements, model invoices, or structure any of this is entirely
your call. This spec only defines what the free tier does and the rules it obeys.
