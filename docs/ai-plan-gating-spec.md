# AI Plan Gating: task assignment and enrichment, product spec

For the platform build. Defines what the AI Suite ($35/user) gates around the AI
agent assigning work, and the entitlement rules that protect per-seat AI revenue
without taxing users who only receive work. Behavior and logic only. How to model
entitlements or implement the gate is your call. Nothing here prescribes schema or
build steps.

## The question this answers

When the AI agent creates a job or task and assigns it to a person, who can it
assign to, and what does that person see. The goal is to protect per-seat AI
revenue (so one AI seat cannot silently run a whole unpaid team) without pricing
out the receivers who do not consume the AI themselves (e.g. a field tech who
just needs the job).

## Chosen model (Moshe, July 29): enrichment is the upsell

The primary lever, and Moshe's preferred approach: **the AI enrichment on a task
is what the AI plan buys, not the ability to receive a task.**

- A user on a paid seat who is NOT on the AI plan can still be assigned a task,
  and sees the plain task: address, job type, scope, status, checklist.
- A user on the AI plan sees the enriched task: the AI call summary, AI-drafted
  handoff notes (what the customer said, what to bring), and AI
  prioritization/scheduling suggestions.

Same task, visibly better on the AI plan. The gate sells itself through visible
value rather than blocking basic dispatch. This is the lever to build around.

## The two guardrails that make it work

1. **Account level.** The AI generating or assigning work at all requires the
   account to hold the AI Suite (the owner/office seat that actually runs the AI).
   No AI Suite means no AI dispatch. This is the primary $35 gate.
2. **Assignable equals a paid seat.** To be in the dispatch pool a user must hold
   a paid seat (a line seat or an AI seat), not a free seat. This closes the leak
   where one AI seat could route work to many unpaid users. It does NOT require
   the full AI seat to receive work.

Net rule: **assignable = any paid seat; AI enrichment = AI plan.** Explicitly not:
assignable = full AI plan. Requiring the full AI seat just to receive a job would
tax every field tech at the AI rate and suppress adoption, which is the outcome to
avoid.

## Gap flagged for Moshe (decision, not a build question)

This likely requires a cheap **field/tech receiver seat** sitting between the free
tier and the $35 AI seat: assignable, sees their own jobs, updates status, no AI
brain, no phone line. Without it the jump is binary and a receiver gets priced at
the full AI rate. Pricing and naming of that seat is a Moshe decision; flagging it
because guardrail 2 above assumes such a seat exists.

## Out of scope

How to store entitlements, model tasks, or implement the gate is entirely your
call. This spec only defines what the gate does and the rules it obeys.
