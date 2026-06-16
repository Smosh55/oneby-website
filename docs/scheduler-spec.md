# OneBy Scheduler — v1 Build Spec

The lightweight, book-by-phone scheduler built into OneBy. This document
front-loads every decision so the build is typing, not guessing. Scheduling is
the one domain where "looks done" and "actually correct" diverge the most — the
edge-case decisions and the concurrency model below are the real product.

> Guiding principle: **own the calendar for operators who have no booking tool.**
> We are NOT replacing Vagaro/Mindbody. We are the phone + AI + booking hub for
> solo and small operators (barbers, trainers, estheticians, massage therapists,
> new shops) who today run on paper, texts, or a personal Google Calendar. For
> them, "OneBy answers the call and books the appointment" is a complete product
> with nothing to integrate.

---

## 1. Scope

### In scope (v1)
- Services, providers (staff), and per-provider availability.
- **Slot computation** — the bookable-times engine (the core algorithm).
- **Book by phone** — the voice AI queries availability mid-call and writes the
  booking. This is the headline feature.
- **Manual booking** — admin creates/edits appointments in a calendar UI.
- **Reschedule / cancel / no-show.**
- **SMS confirmations + reminders** via Telnyx (already in the stack).
- **One-way push** of bookings to the provider's personal Google/Outlook calendar
  (Nylas or Cronofy) so they see appointments on their phone.
- **Multi-tenant** isolation (one business never sees another's data).

### Out of scope (deferred — do NOT build in v1)
- Payments, deposits, no-show fees (needs Stripe — Phase 2).
- Memberships, packages, gift cards, payroll, commissions.
- Client-facing self-serve online booking page (Phase 2; book-by-phone first).
- Group classes, waitlists, recurring appointments.
- **Two-way sync with external booking platforms** (Vagaro/Mindbody/Fresha).
  OneBy is the system of record in v1.
- Marketing, reviews, reporting dashboards.

If a request touches the "out of scope" list, it is a Phase 2 conversation, not a
v1 scope creep. Protecting this line is what keeps v1 to ~2–3 weeks.

---

## 2. Stack

Aligns with `build-plan.md`:

- **DB:** Supabase (Postgres). All schema below is Postgres.
- **App / API:** Next.js (this repo). Read `node_modules/next/dist/docs/` before
  writing route code — this is not the Next.js you know.
- **SMS:** Telnyx (reuse the carrier).
- **Calendar push:** Nylas **or** Cronofy (one provider; one-way only).
- **Voice AI:** Vapi/Retell calls the availability + booking APIs over HTTPS
  during the call.
- **Timezone math:** a real IANA tz library (e.g. Luxon). Never hand-roll DST.

---

## 3. Core invariants (the rules that must never break)

1. **No double-booking, ever.** Two bookings for the same provider may never
   overlap. This is enforced at the database level, not just in app code (see §6).
2. **All instants are stored in UTC** (`timestamptz`). Availability *rules* are
   wall-clock local time; they are resolved to absolute instants per-day with the
   business timezone, accounting for DST.
3. **The business timezone is the display timezone.** Slots are computed and shown
   in the business's IANA timezone.
4. **Every row is scoped to a `business_id`.** No query crosses tenants.
5. **Booking writes are idempotent.** A retried create (common with voice AI)
   must not create a second appointment.

---

## 4. Data model

```sql
-- Tenant. One row per shop/operator.
create table businesses (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  timezone        text not null,              -- IANA, e.g. 'America/New_York'
  -- booking policy defaults (overridable per service where noted)
  slot_granularity_min  int  not null default 15,   -- offered start times every N min
  min_lead_time_min     int  not null default 120,  -- can't book sooner than this
  max_advance_days      int  not null default 60,   -- can't book further out than this
  cancel_window_min     int  not null default 1440, -- free cancel up to N min before
  created_at      timestamptz not null default now()
);

create table providers (             -- staff / the person delivering the service
  id              uuid primary key default gen_random_uuid(),
  business_id     uuid not null references businesses(id) on delete cascade,
  name            text not null,
  active          boolean not null default true,
  -- optional one-way calendar push target
  calendar_account_id text,           -- Nylas/Cronofy account id, null if not connected
  created_at      timestamptz not null default now()
);

create table services (
  id              uuid primary key default gen_random_uuid(),
  business_id     uuid not null references businesses(id) on delete cascade,
  name            text not null,
  duration_min    int  not null,
  buffer_before_min int not null default 0,   -- prep/setup time blocked before
  buffer_after_min  int not null default 0,   -- cleanup time blocked after
  price_cents     int,                         -- DISPLAY ONLY in v1, no payments
  active          boolean not null default true,
  created_at      timestamptz not null default now()
);

-- Which providers offer which services (many-to-many).
create table provider_services (
  provider_id     uuid not null references providers(id) on delete cascade,
  service_id      uuid not null references services(id) on delete cascade,
  duration_override_min int,          -- optional: this provider takes longer/less
  primary key (provider_id, service_id)
);

-- Recurring weekly availability, in LOCAL wall-clock time.
create table provider_hours (
  id              uuid primary key default gen_random_uuid(),
  provider_id     uuid not null references providers(id) on delete cascade,
  weekday         int  not null check (weekday between 0 and 6),  -- 0 = Sunday
  start_time      time not null,       -- local, e.g. '09:00'
  end_time        time not null,       -- local, e.g. '17:00'
  check (start_time < end_time)
);
-- A provider can have multiple rows per weekday (e.g. split shift around lunch).

-- One-off blocks that subtract from availability (vacation, lunch, appointment
-- the operator booked elsewhere). Absolute instants.
create table provider_time_off (
  id              uuid primary key default gen_random_uuid(),
  provider_id     uuid not null references providers(id) on delete cascade,
  start_at        timestamptz not null,
  end_at          timestamptz not null,
  reason          text,
  check (start_at < end_at)
);

create table clients (
  id              uuid primary key default gen_random_uuid(),
  business_id     uuid not null references businesses(id) on delete cascade,
  name            text,
  phone           text,                -- E.164, the match key from caller ID
  email           text,
  notes           text,
  created_at      timestamptz not null default now(),
  unique (business_id, phone)
);

create table appointments (
  id              uuid primary key default gen_random_uuid(),
  business_id     uuid not null references businesses(id) on delete cascade,
  provider_id     uuid not null references providers(id),
  service_id      uuid not null references services(id),
  client_id       uuid references clients(id),
  start_at        timestamptz not null,
  end_at          timestamptz not null,   -- start + duration (buffers are NOT in here, see note)
  status          text not null default 'booked'
                    check (status in ('booked','confirmed','completed','cancelled','no_show')),
  source          text not null default 'phone_ai'
                    check (source in ('phone_ai','manual','online')),
  notes           text,
  idempotency_key text,                   -- unique per business; dedupes retried creates
  external_event_id text,                 -- Nylas/Cronofy pushed event id, for update/delete
  created_at      timestamptz not null default now(),
  unique (business_id, idempotency_key)
);
```

### Buffer modeling decision
`end_at` holds **only** the service duration (what the client experiences).
Buffers are applied when computing conflicts and availability: a candidate
booking occupies `[start - buffer_before, end + buffer_after]` for the purpose of
overlap checks. This keeps the displayed appointment honest while still blocking
prep/cleanup time. The exclusion constraint in §6 therefore guards the
**buffered** interval, stored in a generated column.

---

## 5. The slot-computation engine

**Input:** `business_id`, `service_id`, optional `provider_id`, a date range
(`from`, `to`), optional "earliest acceptable" instant.
**Output:** a list of bookable start instants (UTC), each tagged with the
provider who can take it, in the business timezone for display.

### Algorithm
```
slots(business, service, providerFilter, from, to):
  providers = active providers offering `service`
              (filtered to providerFilter if given)
  tz = business.timezone
  result = []

  for each provider in providers:
    duration = provider_services.duration_override_min ?? service.duration_min
    bBefore  = service.buffer_before_min
    bAfter   = service.buffer_after_min

    for each calendar day D in [from .. to]:           # iterate in business tz
      # 1. Build raw availability windows for D from provider_hours(weekday(D)),
      #    converting each local start/end to an absolute instant in tz on date D.
      #    (This is the DST-sensitive step — use the tz library, per day.)
      windows = provider_hours(provider, weekday(D)) -> [ [winStart, winEnd], ... ]

      # 2. Subtract busy intervals: existing active appointments (buffered) and
      #    time_off blocks that intersect D.
      busy = active appointments(provider) overlapping D
               -> each as [start - itsBufferBefore, end + itsBufferAfter]
           + time_off(provider) overlapping D
      free = subtractIntervals(windows, busy)

      # 3. Walk each free interval in slot_granularity steps. A start S is
      #    bookable iff the buffered span fits entirely inside a single free
      #    interval:
      #        [S - bBefore, S + duration + bAfter]  ⊆  freeInterval
      for S in step(free, business.slot_granularity_min):
        if buffered span of S fits in its free interval
           and S >= now + business.min_lead_time_min
           and S <= now + business.max_advance_days
           and S >= earliestAcceptable:
          result.add({ start: S, provider: provider.id })

  return result sorted by start
```

### Things the engine MUST get right (and the tests in §11 prove)
- **Buffers fit inside the window**, not hanging off the edge of the shift.
- **Back-to-back bookings** with buffers leave exactly the right gap (off-by-one
  on buffer minutes is the classic bug).
- **DST days**: a spring-forward day has 23 hours, fall-back has 25. Per-day
  local→instant conversion handles this; never add `24h` to get the next day.
- **Split shifts** (two `provider_hours` rows for one weekday) produce two
  windows with the lunch gap correctly excluded.
- **Lead time and max-advance** clamp the ends of the range.

### Latency
The voice AI calls this live during a conversation. Budget **< 800 ms** for a
single-day / single-service query. Keep it fast by: indexing appointments on
`(provider_id, start_at)`, querying only the needed date range, and computing in
memory. Do not scan all appointments.

---

## 6. Concurrency — how double-booking is made physically impossible

App-level "check then insert" is not enough; two phone calls can pass the check
simultaneously. Enforce it in Postgres with an **exclusion constraint** over the
buffered time range, so the database itself rejects any overlap.

```sql
create extension if not exists btree_gist;

-- Buffered span as a generated range column (service buffers folded in at write).
alter table appointments
  add column buffered_span tstzrange;        -- set in the create transaction

-- No two ACTIVE appointments for the same provider may have overlapping spans.
alter table appointments
  add constraint no_overlap
  exclude using gist (
    provider_id with =,
    buffered_span with &&
  )
  where (status in ('booked','confirmed'));
```

### Write path (create / reschedule)
1. Begin transaction.
2. Compute `start_at`, `end_at`, and `buffered_span = [start - bBefore, end + bAfter)`.
3. Insert (or update) the row.
4. If the `no_overlap` constraint or the `idempotency_key` unique constraint
   fires → the slot was taken (or this is a retry). Catch it and return a clean
   `409 slot_unavailable` (for a true conflict) or the existing appointment (for
   an idempotency-key match). **Never** surface a raw DB error to the AI.
5. Commit, then fire side effects (SMS, calendar push) — see §8, §9.

This makes the race condition a non-event: the loser of the race gets a 409 and
the AI offers the next slot.

---

## 7. API surface (contracts, not implementation)

All endpoints are tenant-scoped; `business_id` comes from auth, never the body.

| Method / path | Purpose | Notes |
| --- | --- | --- |
| `GET /api/availability` | Bookable slots | params: `service_id`, `provider_id?`, `from`, `to`. Returns `[{start, provider_id}]`. The hot path for voice AI. |
| `POST /api/appointments` | Create booking | body includes `idempotency_key`. Returns 201 + appointment, or 409 `slot_unavailable`, or 200 + existing on idempotency match. |
| `PATCH /api/appointments/:id` | Reschedule | re-runs the §6 write path against the new time. |
| `POST /api/appointments/:id/cancel` | Cancel | sets status `cancelled`, frees the slot, cancels calendar push + reminders. |
| `POST /api/appointments/:id/no-show` | Mark no-show | status `no_show`. |
| `GET /api/appointments` | Calendar view | range + provider filter, for the admin UI. |
| CRUD | `services`, `providers`, `provider_hours`, `provider_time_off`, `clients` | admin setup. |

### Idempotency
The voice AI sends a stable `idempotency_key` per booking attempt (e.g. a UUID it
generates when it starts confirming the appointment). A retry with the same key
returns the original appointment, never a duplicate.

---

## 8. Book-by-phone flow (the headline feature)

```
Caller dials -> FusionPBX -> (no human answer / after hours) -> Voice AI agent
  AI: greets, identifies service wanted ("a haircut with Sarah Thursday?")
  AI -> GET /api/availability  (service, providerFilter, day-range)   [< 800ms]
  AI: offers up to ~3 concrete times from the result
  Caller picks a time
  AI -> POST /api/appointments  (with idempotency_key)
        -> 201: confirm out loud, end call
        -> 409: "that just got taken — I also have 3:15 or 4:00?"  (offer next)
  On 201: system sends SMS confirmation (§9) and pushes to provider calendar (§10)
```

### Caller identity
Match the caller's E.164 number against `clients(business_id, phone)`. Found →
attach `client_id`. Not found → create a `clients` row (name captured by the AI,
or left null and filled later). This is how the timeline stays unified with the
rest of OneBy.

### Failure handling the AI must cover
- **Nothing available in range** → widen the range or offer the next open day.
- **Caller changes their mind mid-booking** → new availability query; the old
  idempotency key is simply never used (no row was written).
- **Ambiguous provider** ("anyone") → `provider_id` omitted; engine returns slots
  across all qualified providers; AI picks the earliest or asks.

---

## 9. SMS (Telnyx)

| Trigger | Message |
| --- | --- |
| On create | Confirmation: service, provider, date/time, address, "reply C to confirm, X to cancel". |
| T-24h before | Reminder (configurable per business). |
| T-2h before | Final reminder (configurable). |
| On reschedule | New time + same confirm/cancel options. |
| On cancel | Cancellation acknowledgement. |

- Reminders are scheduled jobs keyed to `start_at`; cancel/reschedule must cancel
  or reschedule the pending jobs.
- **Inbound replies** (C / X) are a Telnyx inbound-SMS webhook -> match the most
  recent appointment for that phone -> confirm or cancel. This reuses the
  build-plan's SMS inbox pipeline. Two-way SMS is *optional* for v1 (outbound
  confirms/reminders are the must-have).
- Respect 10DLC registration (already accounted for in Terms).

---

## 10. One-way calendar push (Nylas or Cronofy)

Purpose: solo operators want appointments on their own phone calendar. **One-way
only** — OneBy is the source of truth; we never read their personal calendar back
in as bookings (that's the brittle two-way trap we deliberately avoid).

- On create: push event to the provider's connected Google/Outlook account; store
  the returned id in `appointments.external_event_id`.
- On reschedule/cancel: update/delete that event by `external_event_id`.
- If the provider has no connected calendar (`calendar_account_id` null): skip
  silently. The feature is additive, never a dependency.
- Pick **one** of Nylas or Cronofy and wrap it behind a small internal interface
  so the rest of the app doesn't care which.

---

## 11. Test plan (write these BEFORE wiring the UI)

Scheduling bugs are silent and expensive. The slot engine (§5) and the write path
(§6) get hard tests first.

### Slot-engine unit tests
- Empty day (no hours) → no slots.
- Full 9–5 day, 30-min service, 0 buffers, 15-min granularity → correct count and
  boundaries (last slot starts 4:30, not 4:45).
- Service with `buffer_before=15, buffer_after=15` → first slot starts no earlier
  than 9:15-worth of room; buffered span never exceeds the shift edge.
- One existing appointment mid-day → the gap around it (incl. its buffers) is
  excluded; the slot immediately after respects the after-buffer.
- Back-to-back: existing 10:00–10:30 + 10-min buffers, next service is 30 min →
  next bookable start is exactly 10:40, not 10:30 or 10:45.
- Split shift (9–12, 13–17) → lunch 12–13 has no slots.
- `min_lead_time` and `max_advance_days` clamp correctly relative to "now".
- **DST spring-forward** (e.g. America/New_York, 2nd Sun March): the 2 a.m. hour
  doesn't exist; a 9–5 day still yields correct local slots.
- **DST fall-back**: the 1 a.m. hour repeats; no duplicate/oversized windows.

### Concurrency / correctness tests
- **Race:** fire N=20 simultaneous `POST /api/appointments` for the same slot →
  exactly one 201, the rest 409. (This is the test that proves §6 works.)
- **Idempotency:** same `idempotency_key` sent twice → one row, second call
  returns the first appointment with 200.
- **Reschedule into a taken slot** → 409, original booking untouched.
- **Cancel frees the slot** → previously-409 slot now books.

### Side-effect tests
- Cancel/reschedule cancels the pending SMS reminder jobs.
- Cancel deletes the pushed calendar event.

---

## 12. Build order (fastest path to a scheduler you'd trust)

1. **Schema + slot engine + its unit tests.** No UI yet. This is the risky core;
   get it provably correct first. (§4, §5, §11)
2. **Write path + exclusion constraint + concurrency test.** Double-booking made
   impossible. (§6, §11)
3. **Availability + appointment APIs.** (§7)
4. **Book-by-phone wiring** to the voice AI. The headline demo. (§8)
5. **SMS confirmations + reminders.** (§9)
6. **Admin calendar UI** (view + manual create/edit). (§7)
7. **One-way calendar push.** (§10)
8. **Ship to one friendly solo operator.** Let reality correct the workflow before
   polishing.

Steps 1–2 are where the time and the danger are — spend the care there. Steps 3–7
are the kind of CRUD/UI/glue that goes fast. Step 8 is what tells you what v1
actually needs.

---

## 13. Open decisions to confirm before building

- **Calendar vendor:** Nylas vs Cronofy (pick one).
- **Slot granularity default:** 15 min assumed — confirm per target vertical.
- **Reminder timings:** 24h + 2h assumed — confirm.
- **Two-way SMS (reply C/X) in v1 or Phase 2?** Spec treats it as optional.
- **Who is the first design-partner operator?** The build should be aimed at one
  real shop's actual workflow, not a hypothetical average.
