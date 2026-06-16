# OneBy: From Website Promises to a Working Product

How to make everything the site claims actually work, in the most affordable,
pragmatic order, building on the FusionPBX you already run.

> Guiding principle: **buy the hard parts, build the glue.** You already own the
> telephony engine (FusionPBX). Don't rebuild calling, provisioning, or fax.
> Rent the AI voice and transcription (per-minute, no infra), and build only the
> thin app layer that turns calls into summaries and tasks. Ship value in weeks,
> not quarters.

---

## 1. The big picture

OneBy is three layers stacked on what you already have:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  APP LAYER  (the "OneBy" product the website sells)          │
  │  Customer timeline · tasks + assignment · shared inbox ·     │
  │  workflow automation · notifications · dashboard             │
  │  -> Next.js (this repo) + Postgres (Supabase)                │
  └───────────────▲─────────────────────────▲────────────────────┘
                  │ webhooks/APIs            │
  ┌───────────────┴──────────┐   ┌───────────┴───────────────────┐
  │  AI LAYER (rented)        │   │  AUTOMATION GLUE              │
  │  Voice AI receptionist    │   │  n8n (self-host) or workers:  │
  │  STT (transcribe)         │   │  call-ended -> transcribe ->  │
  │  LLM (summarize/classify) │   │  summarize -> task -> notify  │
  └───────────────▲──────────┘   └───────────────────────────────┘
                  │ SIP / media stream / recordings
  ┌───────────────┴───────────────────────────────────────────────┐
  │  TELEPHONY LAYER  (you already own this)                       │
  │  FusionPBX / FreeSWITCH: extensions, desk phones + auto-       │
  │  provisioning, call routing, IVR, voicemail, recording, fax    │
  └───────────────▲───────────────────────────────────────────────┘
                  │ SIP trunk + DIDs + SMS + 10DLC
  ┌───────────────┴───────────────────────────────────────────────┐
  │  CARRIER / CPaaS:  Telnyx (recommended) or SignalWire          │
  └───────────────────────────────────────────────────────────────┘
```

**Why this shape is the cheapest path:** FusionPBX already does ~half the
feature list for $0 extra. The AI pieces are pay-per-minute, so you pay only
when a call actually happens. The app layer is the only real software you build,
and it starts tiny.

---

## 2. Every website promise -> how to deliver it

| Promise on the site | How to deliver it | Lean on / vendor | Build effort |
| --- | --- | --- | --- |
| **Business calling** | Already works in FusionPBX | FusionPBX + SIP trunk | Done |
| **Desk phones + auto-provisioning** | FusionPBX has built-in device provisioning templates (Yealink, Grandstream, Polycom) | FusionPBX "Devices" + cheap Yealink/Grandstream handsets | Done / config |
| **Keep/port number, multiple DIDs** | Order/port DIDs on the trunk | Telnyx / SignalWire | Config |
| **Business SMS + shared inbox** | DIDs are SMS-enabled; webhook inbound SMS into the app | Telnyx/SignalWire SMS API + app inbox | Small |
| **Fax (online)** | FusionPBX fax server (T.38) + fax-to-email, or carrier fax API | FusionPBX Fax, or Telnyx Fax | Config |
| **Call recording** | Native in FusionPBX (per-extension/route) | FusionPBX recordings -> object storage | Done / config |
| **Call transcription** | Send recording (or live audio) to STT | Deepgram (~$0.0043/min) or self-host Whisper | Small |
| **AI summaries** | Feed transcript to an LLM with a summary prompt | GPT-4o-mini / Claude Haiku (fractions of a cent/call) | Small |
| **AI receptionist / AI call answering** | Route no-answer/after-hours to a voice-AI agent over SIP | Vapi / Retell / Synthflow (SIP inbound, ~$0.05-0.10/min) | Medium |
| **AI voicemail replacement** | Point the "no answer" timeout at the AI agent instead of the voicemail box | FusionPBX dialplan + voice-AI agent | Small once AI agent exists |
| **Customer timeline** | One row per interaction (call/SMS/voicemail/task) keyed to a contact | Postgres (Supabase) + app UI | Medium |
| **Task management + assignment** | Tasks table with owner + due date; auto-created from summaries | Postgres + app UI | Medium |
| **Workflow automation** | Event pipeline: call-ended -> transcribe -> summarize -> create+assign task -> notify | n8n (self-host) or app worker | Medium |
| **Notifications** | Email + SMS + (later) push on new task/lead | Resend (email) + Telnyx (SMS) | Small |
| **Mobile app** | Start as a responsive PWA of the app; native later | Next.js PWA -> Expo/React Native | Medium |
| **Search ("ask your calls")** | Store transcripts + embeddings; semantic search | Postgres + pgvector (free in Supabase) | Medium |

---

## 3. Recommended stack (the affordable picks)

- **Telephony:** FusionPBX / FreeSWITCH (already running). Keep it as the core.
- **Carrier / CPaaS: Telnyx** (recommended) or **SignalWire**.
  - Telnyx: very low per-minute and per-message rates, clean APIs, built-in
    **10DLC** registration (matches the $199 brand fee in your Terms), SIP
    trunking, programmable voice, fax.
  - SignalWire is the FreeSWITCH-native alternative (same creators) and pairs
    beautifully with FusionPBX if you want one vendor for everything.
- **Voice AI receptionist: Vapi or Retell AI** (or Synthflow for low-code).
  All accept **inbound SIP**, so FusionPBX just forwards the call. They bundle
  speech-to-text + LLM + text-to-speech with good turn-taking, so you don't
  build real-time audio infra on day one.
- **Transcription: Deepgram** (cheap, fast, streaming) or self-hosted
  **faster-whisper** on your existing server to cut per-minute cost to ~$0.
- **Summaries / classification: GPT-4o-mini or Claude Haiku.** Pennies per call.
- **App + DB: Next.js (this repo) + Supabase** (managed Postgres, auth,
  storage, realtime, pgvector). Generous free tier, ~$25/mo to start.
- **Automation glue: n8n** (open-source, self-host on the same box as
  FusionPBX). Visual webhook -> step -> step flows; perfect for the
  call-to-task pipeline without writing a job queue.
- **Email: Resend** (cheap, simple). **SMS: Telnyx** (reuse the carrier).
- **Hosting:** Vercel for the marketing site + app frontend; your existing
  VPS/server for FusionPBX + n8n + (optional) Whisper.

---

## 4. The core data flow (what makes "every call becomes a task" real)

1. A call ends in FusionPBX (answered by a human, by a desk phone, or by the AI
   receptionist).
2. FusionPBX writes the **recording** + **CDR** (call detail record). Fire a
   webhook to n8n (FusionPBX can POST on hangup, or n8n polls the recordings
   folder / CDR table).
3. n8n sends the recording to **Deepgram** -> transcript.
4. n8n sends the transcript to the **LLM** with a fixed prompt -> `{summary,
   caller_need, urgency, suggested_task, assignee_hint}`.
5. n8n calls the **app API** to: upsert the contact, append to the customer
   **timeline**, create an assigned **task**, and send a **notification**.
6. For **missed/after-hours** calls, FusionPBX's dialplan routes to the **voice
   AI agent** (Vapi/Retell) over SIP first; the agent's transcript flows through
   the same pipeline. That is the "AI receptionist + voicemail replacement."

Everything after step 2 is the same pipeline whether a human or the AI answered.
That is the whole product in one sentence.

---

## 5. Phased rollout (ship value early, spend little)

### Phase 0 - Foundation (days)
- Point FusionPBX at a **Telnyx** SIP trunk; port/order your DIDs.
- Register **10DLC** brand + campaign (the $199 your Terms references) so SMS
  delivers reliably.
- Turn on **call recording** and **device auto-provisioning** in FusionPBX
  (both already there). Order a few Yealink/Grandstream handsets to demo.
- **Delivers:** real calling, desk phones, fax, recording. About half the site.

### Phase 1 - "Every call becomes a summary + task" (the wow, ~2-3 weeks)
- Stand up **Supabase** (contacts, interactions/timeline, tasks, users).
- Build the n8n pipeline: recording -> **Deepgram** -> **LLM summary** ->
  create+assign task -> email/SMS notify.
- Build the minimal app UI: customer timeline + task list (you already have the
  design system in this repo).
- **Delivers:** the headline promise, on *answered* calls, with zero real-time
  voice AI yet. This alone is demo-ready and sellable.

### Phase 2 - AI receptionist + voicemail replacement (~2-3 weeks)
- Sign up for **Vapi/Retell**, build the receptionist agent (greeting, intent
  questions, capture fields), expose it as a **SIP** endpoint.
- In FusionPBX dialplan: on no-answer / after-hours, route to the AI agent
  instead of voicemail. Its transcript flows into the Phase 1 pipeline.
- **Delivers:** AI answering, "we killed voicemail," 24/7 capture.

### Phase 3 - SMS inbox, automation depth, search, mobile (ongoing)
- Inbound SMS webhook -> shared inbox in the app.
- More n8n workflows (routing by call type, escalations, follow-up reminders).
- Transcript **embeddings + pgvector** for "ask your calls anything."
- Ship the app as a **PWA**, then a thin **Expo** wrapper for app stores.

---

## 6. Rough monthly cost (small deployment, ~5 seats)

| Item | Estimate |
| --- | --- |
| FusionPBX server (VPS you likely already pay for) | ~$20-40 |
| Telnyx DIDs (~$1 each) + usage (voice ~$0.005/min, SMS ~$0.004) | ~$15-50 + usage |
| 10DLC brand registration | $199 one-time + a few $/mo |
| Deepgram transcription (or self-host Whisper = ~$0) | ~$0.0043/min |
| LLM summaries (GPT-4o-mini / Haiku) | a few cents/day at low volume |
| Voice AI agent (Vapi/Retell), only on AI-answered calls | ~$0.05-0.10/min |
| Supabase | $0 -> $25 |
| Resend email | $0 -> $20 |
| Vercel hosting | $0 -> $20 |
| n8n (self-host on the FusionPBX box) | ~$0 |
| **Baseline before call/AI usage** | **~$60-150/mo** |

Usage costs scale with real traffic, which means they scale with revenue. You
can run a pilot for well under $200/mo all-in.

---

## 7. Compliance + gotchas (don't skip)

- **10DLC is mandatory** for US A2P SMS. Register before promising SMS; your
  Terms already account for the $199 fee.
- **Call-recording consent** varies by state (your Terms note one-party NY).
  Add a recording disclosure to the AI greeting and inbound IVR.
- **AI accuracy:** summaries can be wrong. Keep the recording + transcript
  attached to every task so a human can verify (your Terms cover this).
- **STIR/SHAKEN + caller ID reputation:** register your numbers and warm them
  so outbound calls aren't flagged spam. Telnyx helps here.
- **FusionPBX security:** keep it behind a firewall, fail2ban on SIP, strong
  SIP passwords. PBXs are a common attack target.
- **Data:** encrypt recordings at rest (object storage), restrict access; your
  Privacy Policy and Terms commit to this.

---

## 8. The honest one-liner

You are ~50% there the moment you point FusionPBX at a modern trunk. Phase 1
(transcribe -> summarize -> task) is the part that makes the website true, and
it is a few weeks of glue, not a moonshot. The AI receptionist is rented, not
built. Start there.
