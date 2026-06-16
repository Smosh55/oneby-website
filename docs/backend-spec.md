# OneBy Backend Engineering Spec

The wiring that turns calls into action, plus the invoicing + payments layer.
Written to sit on top of what you already have (400-line PBX, Telnyx trunking,
and the app with users + permissions your CTO built).

> Scope: data model, the call-to-task pipeline, the AI agent integration
> contract, SMS, invoicing + the 0.4% payments take-rate, webhooks, and the
> compliance notes that matter. Stack-agnostic, but examples assume
> Postgres + a Node/TypeScript service + Stripe + Telnyx.

---

## 1. Services at a glance

```
PBX/FreeSWITCH ──hangup webhook──▶ ingest-svc ──▶ queue ──▶ workers
   │  (recording URL, CDR)                          ├─ transcribe (Deepgram/Whisper)
   │                                                ├─ summarize+extract (LLM)
   │                                                ├─ upsert contact + timeline
   │                                                ├─ create+assign task
   │                                                └─ notify (email/SMS/push)
Voice AI (Vapi/Retell or self-host) ──capture_call function──▶ ingest-svc
Telnyx SMS ──inbound webhook──▶ messaging-svc ──▶ shared inbox + timeline
App (Next.js + existing auth/RBAC) ──▶ Postgres ◀── all of the above
Stripe Connect ──payment webhooks──▶ billing-svc (invoices, 0.4% fee)
```

Use a lightweight queue (Postgres `SELECT ... FOR UPDATE SKIP LOCKED`, BullMQ/Redis,
or n8n) so a call spike never drops events. Everything is idempotent on a
provider event ID.

---

## 2. Data model (Postgres)

Multi-tenant: every row carries `org_id` (the HVAC company). Reuse your existing
`orgs` and `users` tables. RLS or app-layer scoping per `org_id`.

```sql
-- People who call/text the business
create table contacts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id),
  name text,
  phone text not null,
  address text,
  is_customer boolean default false,
  created_at timestamptz default now(),
  unique (org_id, phone)
);

-- One row per call (inbound/outbound, human- or AI-answered)
create table calls (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id),
  contact_id uuid references contacts(id),
  direction text check (direction in ('inbound','outbound')),
  answered_by text check (answered_by in ('human','ai','voicemail','missed')),
  from_number text, to_number text,
  started_at timestamptz, ended_at timestamptz, duration_sec int,
  recording_url text,                 -- object storage, encrypted at rest
  provider_call_id text,              -- Telnyx/PBX id, for idempotency
  status text default 'received',     -- received|transcribed|summarized|done
  created_at timestamptz default now(),
  unique (org_id, provider_call_id)
);

create table transcripts (
  id uuid primary key default gen_random_uuid(),
  call_id uuid not null references calls(id),
  text text, words jsonb,             -- word-level timing optional
  language text, engine text,         -- 'deepgram'|'whisper'
  created_at timestamptz default now()
);

-- SMS, both directions
create table messages (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id),
  contact_id uuid references contacts(id),
  direction text, body text,
  from_number text, to_number text,
  provider_message_id text,
  created_at timestamptz default now(),
  unique (org_id, provider_message_id)
);

-- The thing that makes the product real
create table tasks (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id),
  contact_id uuid references contacts(id),
  call_id uuid references calls(id),
  title text not null,
  summary text,
  urgency text check (urgency in ('emergency','same_day','routine')),
  status text default 'open',         -- open|in_progress|done|dismissed
  assignee_id uuid references users(id),
  due_at timestamptz,
  created_by text default 'ai',       -- 'ai'|'system'|user id
  created_at timestamptz default now()
);

-- Unified timeline = a view/union over calls + messages + tasks + invoices
-- keyed by (org_id, contact_id), ordered by created_at desc.
```

Invoicing/payments tables are in section 6.

---

## 3. The call-to-task pipeline

1. **Hangup event.** FreeSWITCH posts on `CHANNEL_HANGUP_COMPLETE` (or poll the
   CDR table / recordings dir). Payload: call ids, numbers, direction, duration,
   recording path. `ingest-svc` writes/updates the `calls` row (idempotent on
   `provider_call_id`) and enqueues a job.
2. **Transcribe.** Worker fetches the recording, sends to Deepgram (or local
   faster-whisper), stores `transcripts`. Mark `calls.status = 'transcribed'`.
3. **Summarize + extract.** Send transcript to the LLM with the
   `capture_call` tool/function (same schema the live AI agent uses, section 4).
   Output: `{summary, suggested_task, urgency, ...}`. Mark `summarized`.
4. **Apply.** Upsert `contacts`, append to timeline, create `tasks` row, set
   `assignee_id` from routing rules (section 7), `due_at` from urgency.
5. **Notify.** Email (Resend) + SMS (Telnyx) + push to the assignee; emergencies
   page on-call immediately.

Answered-by-human and answered-by-AI calls converge at step 2, so there is one
pipeline, not two.

---

## 4. AI agent integration (the receptionist)

The agent is configured from `src/data/agentPrompts.ts`:
`buildSystemPrompt(industrySlug, businessName)` produces the system prompt, and
`CALL_EXTRACTION_SCHEMA` is the function the agent must call to hand off
structured data.

**Rented path (fastest): Vapi or Retell.**
- Create one assistant per org (or per industry template), system prompt =
  `buildSystemPrompt(...)`, tool = `capture_call` (the schema).
- Expose the assistant as a **SIP endpoint**. In FreeSWITCH, route no-answer /
  after-hours to that SIP URI.
- On call end, the platform POSTs the `capture_call` arguments + recording +
  transcript to `POST /webhooks/agent`. Feed it into the pipeline at step 4
  (you already have summary/task from the function call, so you can skip
  re-summarizing).

**Self-host path (cheaper at 400 lines): FreeSWITCH + `mod_audio_stream`.**
- Stream call audio over WebSocket to a media server.
- STT (Deepgram streaming or local whisper) -> LLM (function-calling with
  `CALL_EXTRACTION_SCHEMA`) -> TTS (Cartesia / Deepgram Aura / Piper) back into
  the call. Barge-in + ~500ms turn latency is the bar.
- Same `capture_call` output -> same pipeline. Marginal cost ~$0.02-0.03/min
  vs ~$0.07 rented; worth it once volume is steady.

Recording-consent disclosure is built into the base prompt. Keep it.

---

## 5. SMS (shared inbox)

- Inbound: Telnyx posts to `POST /webhooks/telnyx/sms`. Upsert contact, insert
  `messages`, push to the org's shared inbox (websocket/realtime), add to
  timeline. Optionally run the same extract step to spin a task from a text.
- Outbound: app/API sends via Telnyx; store the message; respect STOP/HELP
  (10DLC) automatically.
- 10DLC: register the brand + campaign per org before sending (the $199 brand
  fee in the Terms). Gate outbound until the campaign is approved.

---

## 6. Invoicing + payments (the 0.4% take-rate)

### The model: platform fee, not consumer surcharge
Use **Stripe Connect**. Each service company is a **connected account** (Express
or Standard). OneBy creates invoices/payments on their behalf and takes a
**0.4% application fee** on each successful charge. Stripe routes the 0.4% to
the OneBy platform automatically; Stripe's own processing fee
(~2.9% + 30¢) is borne by the connected account.

> **Important compliance distinction.** The 0.4% as described here is OneBy's
> **platform fee charged to the merchant** (the HVAC company). That is the
> standard, clean integrated-payments model (Housecall Pro, Jobber, ServiceTitan
> all do this). It is **not** a "surcharge" added to the homeowner's card.
> If you ever pass a fee to the END consumer, that triggers card-network
> surcharge rules: registration with the networks, a cap at your cost of
> acceptance, no surcharging debit cards, and outright prohibition in a few
> states. Keep it a merchant-side platform fee and you avoid all of that.

### Tables

```sql
create table invoices (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id),
  contact_id uuid references contacts(id),
  task_id uuid references tasks(id),        -- invoice often follows a job
  number text not null,                     -- human-friendly, per-org sequence
  status text default 'draft',              -- draft|sent|viewed|paid|void|refunded
  currency text default 'usd',
  subtotal_cents int not null default 0,
  tax_cents int not null default 0,
  total_cents int not null default 0,
  stripe_invoice_id text,
  stripe_payment_intent_id text,
  hosted_url text,                          -- pay link sent via email/SMS
  due_at date,
  created_at timestamptz default now(),
  paid_at timestamptz
);

create table invoice_line_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  description text not null,
  quantity numeric not null default 1,
  unit_price_cents int not null,
  amount_cents int not null
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id),
  invoice_id uuid references invoices(id),
  stripe_payment_intent_id text unique,
  amount_cents int not null,
  application_fee_cents int not null,       -- OneBy's 0.4%
  stripe_fee_cents int,                     -- processor fee (informational)
  status text,                              -- succeeded|refunded|failed
  created_at timestamptz default now()
);
```

### Charge flow (taking 0.4%)

```ts
// On "collect payment" for an invoice on a connected account:
const intent = await stripe.paymentIntents.create({
  amount: invoice.total_cents,
  currency: "usd",
  application_fee_amount: Math.round(invoice.total_cents * 0.004), // 0.4% to OneBy
  // process on the merchant's connected account:
}, { stripeAccount: org.stripe_account_id });
```

For a hosted experience, create a Stripe **Invoice** or **Payment Link** on the
connected account with `application_fee_percent: 0.4`, then text/email
`hosted_url` to the homeowner.

### Lifecycle
`draft` -> `sent` (email + SMS pay link) -> `viewed` -> `paid` (Stripe
`payment_intent.succeeded` webhook -> insert `payments`, mark invoice paid,
add to timeline, close the task) -> optional `refunded`.

### Invoice creation from a job
Most invoices follow a completed `task`. UI: "Create invoice" on a done task ->
prefill contact + a line item -> add labor/parts -> send. This closes the loop
the site promises: call -> task -> resolved -> invoiced -> paid, all on one
timeline.

---

## 7. Webhooks + routing

| Endpoint | Source | Does |
| --- | --- | --- |
| `POST /webhooks/pbx/hangup` | FreeSWITCH | create/update call, enqueue pipeline |
| `POST /webhooks/agent` | Vapi/Retell | apply `capture_call` output, recording |
| `POST /webhooks/telnyx/sms` | Telnyx | inbound SMS -> inbox + timeline |
| `POST /webhooks/telnyx/voice` | Telnyx | optional call-control events |
| `POST /webhooks/stripe` | Stripe | payment succeeded/refunded -> reconcile |

All verify provider signatures, are idempotent on the provider event id, and
return 200 fast (enqueue, don't process inline).

**Task routing rules** (start simple, table-driven later): by urgency
(emergency -> on-call user), by call type (keyword -> team), by time of day
(after-hours -> AI + on-call), round-robin within a team.

---

## 8. Security + compliance checklist

- **Recording consent:** disclosure in the AI greeting + IVR; store consent
  state per call. Respect two-party-consent states.
- **10DLC:** brand + campaign per org before outbound SMS.
- **PCI:** never touch raw card data; Stripe Elements / hosted pages only.
- **Encryption:** recordings + transcripts encrypted at rest; signed,
  expiring URLs for playback; access scoped by `org_id` + RBAC.
- **PBX hardening:** firewall SIP, fail2ban, strong creds (PBXs get attacked).
- **Idempotency + retries** on every webhook and worker.
- **Audit log** for who viewed/exported recordings (privacy requests).

---

## 9. Build order (matches the cost/effort plan)

1. `pbx/hangup` -> calls table -> transcribe -> summarize -> **ticket** (the
   `tasks` table is the ticket model: status, priority, assignee, customer). The wow.
2. Notifications + simple routing.
3. SMS inbox.
4. AI receptionist (rented first, self-host later).
5. Invoicing + Stripe Connect 0.4% (core, per the all-in-one strategy).
6. Lightweight scheduling: calendar + assign-tech-to-ticket + day view
   (enough to run a small shop; integrate Google Calendar). See `product-strategy.md`.
7. Search (pgvector over transcripts), mobile PWA, QuickBooks integration.
