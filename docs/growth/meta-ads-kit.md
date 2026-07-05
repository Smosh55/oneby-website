# Meta Ads Kit — Pre-Launch (Waitlist + Founders)

Ready to run. Budget: $40/day total to start ($10/day × 4 ad sets). Objective: Leads
(website conversions on waitlist signup) — optimize for the `waitlist_submit` GA4/Pixel
event, fall back to landing-page views for the first 50 conversions if the pixel is thin.

Launch date context: founders pre-sale is live now; retail launch ~Aug 2026. Every ad
sends to a trade page or /founders with full UTMs. Nothing in an ad promises anything
the site doesn't say.

---

## 1. Campaign structure

One campaign per trade. Two trades to start (highest volume + best after-hours pain):

```
Campaign: OneBy — HVAC (Leads, ABO)
├── Ad set: hvac-pain      $10/day → oneby.ai/hvac
│     └── 6 ads (P1–P6)
└── Ad set: hvac-founders  $10/day → oneby.ai/founders
      └── 6 ads (F1–F6)

Campaign: OneBy — Plumbing (Leads, ABO)
├── Ad set: plumbing-pain      $10/day → oneby.ai/plumbing
│     └── 6 ads (P1–P6, plumbing wording)
└── Ad set: plumbing-founders  $10/day → oneby.ai/founders
      └── 6 ads (F1–F6, plumbing wording)
```

- ABO (ad set budgets), not CBO, so a cheap-click angle can't starve the other.
- Placements: Advantage+ placements ON to start (Meta needs the liquidity at $10/day).
  If Audience Network eats budget with junk clicks after ~5 days, restrict to
  FB Feed + IG Feed + Reels.
- Start 3 of the 6 ads per ad set live, rotate in the next 3 as losers die. Meta
  spreads $10/day too thin across 6.
- Schedule: run 24/7. Owners scroll at night; that's also when the pain happens.

## 2. Audience targeting

Not a special ad category (not housing/credit/employment/politics), so full targeting
is available.

**Base for every ad set:** US, age 25–60, all genders.

**Interest stacks (Detailed Targeting, OR within the stack).** Note: Meta keeps pruning
detailed-targeting options; verify each still exists in Ads Manager when building —
anything missing, just drop it.

- Trade layer (HVAC): HVAC, Heating ventilating and air conditioning, Air conditioning,
  Heat pump, Furnace
- Trade layer (Plumbing): Plumbing, Plumber, Pipefitter, Water heating
- Owner layer (narrow with AND if audience > ~2M): Small business, Entrepreneurship,
  Business owner, plus software they'd only know as owners/office staff:
  ServiceTitan, Jobber, Housecall Pro, Angi, Thumbtack, QuickBooks
- Behavior layer (optional narrow): Facebook Page admins (Business page admins) —
  availability varies by account; use if present.

**Ad set recipe:** Trade layer AND (Owner layer OR Behavior layer). If the resulting
audience is under ~500k, drop the AND and go trade-layer only — the creative
("your techs", "your dispatcher") self-selects owners.

**Also build (week 2+):**
- Retargeting ad set (founders angle only): site visitors 30 days + video viewers 75%,
  excluding waitlist confirmations. This will be your cheapest CPL; it just needs
  traffic to exist first.
- Lookalike 1% of waitlist emails once the list passes ~500.

**Exclusions everywhere:** existing waitlist/customer email list (upload as custom
audience), job titles aren't targetable reliably — don't bother.

## 3. Ad copy — Angle A: "missed call = lost job" (pain)

CTA button on all: **Learn More** (pain angle sells the click, not the signup).
Destination: oneby.ai/hvac or oneby.ai/plumbing.
Swap the bracketed trade tokens; HVAC wording shown, plumbing swap noted.

**P1 — the 9pm call**
- Headline: The 9pm no-cool call went to your competitor
- Primary text: Somebody's AC died at 9 last night. [Plumbing: Somebody's water
  heater let go at 9 last night.] They called you first. It rang, hit voicemail,
  and they dialed the next company on the list. OneBy's AI picks up when you can't,
  gets the address and the symptom, and drops a ready-to-dispatch job in your queue
  for the morning. See how it works on a real call.

**P2 — the math, framed honestly**
- Headline: What does a missed call actually cost you?
- Primary text: Quick example, not a promise: if you miss 10 calls a week, 4 are
  real jobs, you'd close half, and your average ticket is $400 — that's $800 a week
  walking. Your numbers are different. Plug them in and see. Free calculator, no
  email required.
- Destination override: oneby.ai/missed-call-calculator

**P3 — the crawl space**
- Headline: Your techs can't answer from a crawl space
- Primary text: [HVAC: Rooftops and crawl spaces.] [Plumbing: Under a house with a
  pipe wrench in both hands.] That's where the work is — and exactly when the phone
  rings. OneBy answers, asks the questions your dispatcher would ask, and writes it
  up as a task. You call back with the details already in front of you.

**P4 — voicemail is where jobs die**
- Headline: Most callers won't leave a voicemail
- Primary text: When a homeowner has water on the floor, they don't leave a message —
  they hang up and call the next company. OneBy picks up on the first ring, 24/7,
  sounds like a sharp office assistant, and texts you the summary in seconds.

**P5 — the vague callback**
- Headline: "Call me back about my AC" tells you nothing
- Primary text: [Plumbing: "Call me back about my water heater" tells you nothing.]
  A voicemail like that wastes a callback and sometimes a truck roll. OneBy grabs
  the unit, the symptom, the address, and when they're home — before you ever pick
  up the phone. Hear a sample call on the site.

**P6 — one-man-shop angle**
- Headline: You're the tech, the dispatcher, and the office
- Primary text: When it's just you, every call you can't take is a job you didn't
  quote. OneBy is the office you haven't hired yet: it answers, writes the summary,
  and lines up your callbacks. Runs on the number you already have.

## 4. Ad copy — Angle B: founders deal

CTA button on all: **Sign Up**. Destination: oneby.ai/founders.

**F1 — the straight offer**
- Headline: $29/mo. Locked for life. Ends at launch.
- Primary text: OneBy answers your calls with AI, writes the summary, and turns it
  into a task — phone system and CRM in one. Back us before the August launch and
  your rate locks at $29/mo for as long as you stay. Standard pricing will be higher
  and will keep climbing. Yours won't.

**F2 — why not free forever (honesty as the hook)**
- Headline: We won't sell you "pay once, free forever"
- Primary text: Answering your calls costs us real money every month, so a
  free-forever deal would mean cutting corners later. Instead: back OneBy now, get
  a full year, then a locked founder rate that never goes up. A deal we can both
  keep. That's the whole pitch.

**F3 — the phone tier**
- Headline: A phone that works the second you plug it in
- Primary text: The OneBy Phone tier: a ready-to-go desk or cordless phone, a full
  year of service, and AI that answers when you can't. $199 once, then a locked
  founder rate. No IT guy, no setup call, no forwarding maze. Keep your number or
  pick a new one.

**F4 — early access + skin in the game**
- Headline: Founding members get the first invites
- Primary text: We're building OneBy for [HVAC companies / plumbing shops] and
  founding members shape it — first beta invites, a say in what we build next, and
  the lowest rate we'll ever offer, locked. From $10 to hold your spot.

**F5 — versus an answering service**
- Headline: After-hours coverage without the answering service bill
- Primary text: A human answering service charges by the minute and still just takes
  a message. OneBy answers 24/7, asks the right questions for your trade, and builds
  the dispatch task itself. Founders lock in at $29/mo — less than most services
  charge for a slow Tuesday.

**F6 — deadline plain**
- Headline: Founder pricing ends when we launch in August
- Primary text: No fake countdown timers. One real deadline: when OneBy launches in
  August, founder tiers close and standard pricing starts. Until then, a year of
  service plus a locked-for-life rate starts at $129. Read the tiers — the math is
  all on the page.

## 5. UTM templates

Exact template (append to every destination URL):

```
?utm_source=fb&utm_medium=paid&utm_campaign=<trade>-<angle>&utm_content=<variant>
```

- `<trade>`: `hvac` | `plumbing`
- `<angle>`: `pain` | `founders`
- `<variant>`: `p1`–`p6`, `f1`–`f6`

All 24 final URLs follow the pattern; examples:

| Ad | Final URL |
|---|---|
| HVAC P1 | `https://oneby.ai/hvac?utm_source=fb&utm_medium=paid&utm_campaign=hvac-pain&utm_content=p1` |
| HVAC P2 | `https://oneby.ai/missed-call-calculator?utm_source=fb&utm_medium=paid&utm_campaign=hvac-pain&utm_content=p2` |
| HVAC F1 | `https://oneby.ai/founders?utm_source=fb&utm_medium=paid&utm_campaign=hvac-founders&utm_content=f1` |
| Plumbing P4 | `https://oneby.ai/plumbing?utm_source=fb&utm_medium=paid&utm_campaign=plumbing-pain&utm_content=p4` |
| Plumbing F3 | `https://oneby.ai/founders?utm_source=fb&utm_medium=paid&utm_campaign=plumbing-founders&utm_content=f3` |

## 6. Kill / scale rules

CPL = cost per waitlist signup (pain angle) or per founders-page signup/pre-order
lead (founders angle). Check daily at the same time; act on ad sets, judge ads
inside them.

**Kill:**
- Ad: $15 spent (1.5 days), zero leads → pause, promote the next variant.
- Ad: 10+ leads and CPL > $5 → pause.
- Ad set: $50 spent, blended CPL > $5 → pause the angle for that trade, rebuild
  with the two best-CTR ads and a fresh hook before respending.
- Never judge anything on less than $15 spend or 1,000 impressions.

**Scale:**
- Ad set with CPL ≤ $5 over a trailing 3 days → raise budget 20%/day
  ($10 → 12 → 14.40 → ~17 → ~21…). Never more than 20% in a day; bigger jumps
  reset learning.
- Stop scaling when CPL crosses $5 for 2 consecutive days; hold, don't cut,
  for 3 days before deciding.
- A winning ad graduates: duplicate it into the retargeting ad set too.

**Weekly:** kill the bottom half of ads by CPL, write 2 new variants riffing on the
top performer's hook, keep total live ads per ad set at 3–4.

**Sanity ceiling:** founders leads are worth more than waitlist leads. If founders
ad sets run $5–8 CPL but pre-orders are landing (check Stripe/GA4 against
utm_campaign), keep them — the kill rule bends for proven revenue, never for hope.
