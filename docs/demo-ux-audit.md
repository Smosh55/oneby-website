# Demo UX Audit + Build Sheet (HeroAppMock)

Goal: make the homepage interactive demo (`src/components/HeroAppMock.tsx`) read
like the real product, not a mock. Audited against the bar: "could a service-
business owner mistake this for the live app." Current demo: 11 modules (Home,
Live, Tickets, Schedule, Customers, Team, Catalog, Billing, Messages, Tasks,
Email-soon) + voicemail.

## Part 1 — App shell gaps (every real app has these)
- Global search in the top bar (find a customer, ticket, invoice).
- Notifications bell + activity feed (new call, payment received, tech late).
- Account/workspace menu (avatar, switch business, settings, log out).
- Settings (business hours, number/porting, calendar connect, team invite, AI voice).
- Command palette (Cmd-K) — optional power-user signal.
- Breadcrumbs / Back when drilling into a record.
- Empty / loading / error states (skeletons, "no results," failed-send toast). #1 mock tell.
- Toasts + Undo on every action (Tasks has undo, nothing else does).
- Keyboard nav + focus rings + ARIA on the module tabs (click-only today).
- "Saved" affirmation when a field is edited.

## Part 2 — Per-module gaps
- Home/Dashboard: real KPIs (jobs today, unbilled $, missed calls caught, collected), a "needs attention" queue, clickable tiles that deep-link.
- Live/Calls: call log (history), active-call screen (AI answering live, streaming transcript), recording playback, voicemail with transcription + create-task.
- Tickets: a list/board (kanban by status), filters/sort, detail with photo/file attachments, checklist, status-advance. Only one ticket today.
- Schedule: tech filter + color-coding ("see techs"), job duration, real new-job composer (time + duration + tech + service), status chips, day/week toggle, drag-to-reschedule, map/route, recurring jobs.
- Team: tech detail (route, jobs done, contact), roles/permissions, availability/on-call, assign-from-here.
- Catalog: categories (service/part/fee), search, tax codes, units (each/hour/lb).
- Billing: quantity (qty x price), tax % + discount, payment status / AR, PDF preview, partial payments, receipt after Paid.
- Customers: full list (search/filter), click-into detail, editable fields (name/phone/email/address/tags), open balance, new customer. Only Maria today.
- Messages: real composer, inbox list (multiple threads, unread), MMS/photos, templates. Quick-replies only today.
- Tasks: due dates, assignee, filters (mine/all/overdue), AI-created badge + confidence.
- Email: keep as "coming soon" (correct).

## Part 3 — Realism layer
- Multiple records everywhere (6+ customers, 8+ tickets, a week of jobs).
- Edit everything, with confirms on destructive/important actions (Tasks + tech-assign have this; extend to delete/send/reassign).
- Cross-links: customer name on a ticket -> customer; job on schedule -> ticket.
- Optimistic updates + persistence cues.

## Part 4 — Build Suggestion Sheet (prioritized; S/M/L effort)

### P0 — makes it read as a real app (and sells the moat)
1. Active-call + voicemail with streaming transcript & create-task (Live) — M
2. Call log / history list (Live) — S
3. Customer list -> click -> detail -> edit fields (Customers) — M
4. Ticket board (kanban) + click-into detail (Tickets) — M
5. Schedule: tech filter + color + duration + real new-job form (Schedule) — M
6. Invoice quantity (qty x price) + tax/discount (Billing) — S
7. Global search + notifications + account menu (Shell) — M
8. Empty/loading/error states + toasts (Shell) — S

### P1 — depth that holds up to clicking around
9. Payment status / AR + receipt + PDF preview (Billing) — M
10. Messages: composer + inbox list + unread + templates (Messages) — M
11. Tech detail + roles/availability + assign (Team) — M
12. Ticket attachments + checklist + status workflow (Tickets) — M
13. Catalog: categories + units + search (Catalog) — S
14. Tasks: due dates + assignee + filters (Tasks) — S
15. Dashboard KPIs + needs-attention queue (Home) — M
16. Cross-links between records (All) — S

### P2 — polish beyond a prototype
17. Drag-to-reschedule + map/route view (Schedule) — L
18. Recurring jobs / maintenance plans (Schedule) — M
19. Settings panel (Shell) — M
20. Command palette Cmd-K (Shell) — S
21. Keyboard nav + focus rings + ARIA (Shell) — S
22. Multiple seed records across modules (Data) — S

## Top recommendation
Ship the P0 row and the demo crosses from "nice mock" to "is this the real
product." Highest-leverage single item: #1 (live-call/voicemail), because it
shows the moat (the phone catching the call) that no competitor demo does.
