# OneBy Product Strategy: The All-in-One for Small Service Shops

Decision (2025): OneBy is **the all-in-one operating system for small service
businesses** (HVAC, plumbing, roofing, property management, and similar trades).
One tool to answer the phone, capture the job, ticket it, schedule it, invoice
it, and get paid. The lightweight alternative to ServiceTitan / Jobber /
Housecall Pro, for the shop that finds those too heavy, too expensive, or too
slow to set up.

## The spearhead (why we win, not just what we sell)
Every all-in-one competitor already does tickets, scheduling, and invoicing.
**None of them answer your phone.** That is our wedge and it stays the headline:

> OneBy is the only all-in-one that picks up the call, understands it, and turns
> it into a booked, assigned, invoiced job on its own.

So we lead marketing and product with **AI communications** (answer -> summarize
-> task), then expand down the same loop into ticketing, scheduling, and
payments. The conversation is the moat; the rest is the wallet share.

## The product loop (this is the whole company in one line)
```
Call/text  ->  AI summary  ->  Ticket (assigned)  ->  Scheduled  ->  Done  ->  Invoice  ->  Paid
            (the wedge nobody else has)        (table stakes we must reach to be all-in-one)
```

## What changes vs the "comms-layer" plan
- **Tickets are core, now** (not a someday): a ticket is the task model with
  status, priority, assignee, customer, and history. Already implied by the
  MSP/property-management promises.
- **Invoicing + payments are core** (Phase 2-3, not optional): owning the money
  flow is what makes an all-in-one sticky, and the 0.4% platform fee is real
  expansion revenue.
- **Scheduling / dispatch becomes a real roadmap item** (it was "never build,
  integrate" under the comms-layer plan). To credibly be all-in-one for a small
  shop you need at least lightweight scheduling: a calendar, assign a tech to a
  ticket, a day view. Not ServiceTitan-grade dispatch optimization, just enough.
- **Competitive stance flips:** vs ServiceTitan/Jobber/Housecall/AppFolio we are
  now an **alternative**, not a complement. Honest framing: "simpler, faster to
  set up, and it answers your phone, which they don't." Still acknowledge their
  depth (they win on mature scheduling, accounting, integrations).

## Honest trade-offs (go in eyes-open)
- **Bigger, slower build.** All-in-one is more surface than the comms wedge:
  scheduling UI, invoicing/billing, payments compliance, more support load.
  Full parity is quarters, not weeks.
- **You're now on incumbents' turf.** Jobber and Housecall are entrenched and
  funded. You beat them on AI + simplicity for the *smallest* shops, not on
  feature breadth. Stay down-market and sharp; do not chase enterprise FSM.
- **Focus risk.** The temptation will be to build scheduling/inventory/estimates
  to "match" them. Resist. Match only what a 5-tech shop actually uses daily.
  Depth they don't use is wasted effort that delays the wedge.
- **Don't lose the spearhead.** If a quarter goes by where the AI receptionist
  didn't get better, you've drifted into being a worse Jobber. The AI is the
  reason to switch; keep it the best part.

## Walk before you run (the gate)

Decision (2026-06-16): invoicing and payments are **deferred**. We walk first.
Do not start "the run" until "the walk" is live, in real shops, and loved.

**THE WALK (the operational core, built around the AI spearhead):**
1. **Call/text -> AI summary -> ticket** (status, assignee, due, customer
   timeline). Notifications + routing. *The differentiator.*
2. **AI receptionist** (rented Vapi/Retell, then self-host). *The spearhead. The
   reason a shop leaves Jobber for you. Keep it the best part.*
3. **SMS shared inbox.**
4. **Lightweight scheduling + calendar sync.** Assign a ticket to a tech and a
   time, see a day view, and 2-way sync to Google Calendar / Microsoft 365.
   Ticketing and scheduling are coupled, so build them together. The calendar
   *integration* is cheap; lean on it instead of building a dispatch board.

Pitch it as "OneBy answers your phone, books the job, and puts it on your
calendar," NOT as "another scheduling app." The AI is the wedge; ticketing and
scheduling are the table stakes that surround it.

**THE RUN (deferred until the walk is live and loved):**
5. **Invoicing + payments** (Stripe Connect, 0.4% platform fee): invoice a done
   ticket, text a pay link, take a card, auto-reconcile. *Real expansion
   revenue, real added surface (billing, PCI, disputes). Not before the walk.*
6. **Dispatch depth + polish:** availability/conflict handling, recurring and
   maintenance plans, reporting, mobile app, "ask your calls" search, QuickBooks
   integration (integrate accounting, don't build it).

> Scope guardrail for scheduling: ship "assign ticket -> tech + time -> sync to
> their calendar." Do NOT build route optimization, drag-drop dispatch boards,
> or crew logistics in v1. That depth is where you bleed time for little gain at
> 5-tech scale; it's "the run," and only if customers ask.

The all-in-one is still the destination. We just don't sprint to it. The fastest
way to lose is to ship a me-too FSM while the AI receptionist is still mediocre.

## What we still integrate, never build
Accounting (QuickBooks), heavy dispatch optimization, inventory/procurement,
payroll. A 5-tech shop wants these to *connect*, not to live in OneBy.

## The one-sentence test for any new feature
"Does a 5-tech shop touch this every week, and does it make the call-to-cash
loop tighter?" If no, integrate it or skip it.
