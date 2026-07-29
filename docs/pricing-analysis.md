# OneBy pricing analysis and recommendation

Date: July 24, 2026. Source: a deep-research run (111 verification agents, ~3.7M
tokens) whose final auto-synthesis crashed; findings recovered from the run
journal and synthesized here. Figures marked (verified) survived 3-vote
adversarial verification; the run explicitly corrected several weak blog sources.

## The market, in numbers (verified)

Phone / comms per user/month:
- Quo (OpenPhone): Starter $15, Business $23, Scale $35 (annual; monthly
  $19/$33/$47). Its Sona AI is a separate per-call credit meter, overage $1.00
  down to $0.45/call, off by default.
- RingCentral: Core ~$20/user annual ($30 monthly), Advanced ~$25 ($35). Real
  bills run 20-35% over advertised (compliance fees, add-ons).
- Nextiva / Dialpad / Grasshopper cluster in the $20-35/user range.

Field-service software:
- Housecall Pro entry $59/mo, 14-day trial. Workiz ~$225-325/mo. ServiceTitan
  ~$300-500/tech/mo plus $5k-50k setup.

AI receptionists (the closest analog to our AI Suite):
- Cluster at $49-99/mo: Rosie $49/$149/$299, Goodcall from $59-79, Dialzara
  $29-$349, My AI Front Desk $65-125. Smith.ai AI base ~$95/mo PLUS $6.50-9.75
  per-call overage (routinely $200+/mo).
- Human answering is far pricier: Smith.ai human $292.50-$1,950/mo, Ruby human
  $235-$1,725/mo, PATLive $199, ReceptionHQ $175, AnswerConnect $325. Most SMBs
  who buy answering pay $150-300/mo.

Willingness to pay (verified value anchor):
- A plumber missing ~30 calls/mo at a 35% close rate loses about $3,675/mo.
  HVAC missed-call value runs $350-1,200 per call. AI answering at $49 is a
  ~75x ROI story. There is large WTP headroom above where we plan to price.

## What the evidence says about the model

Freemium vs trial (verified):
- Median B2B free-to-paid is ~8% (2026 report, 200 products); First Page Sage
  avg 3.7%; tightly-targeted high-intent SaaS runs 5-15% (OneBy is tightly
  targeted, so upper end).
- Freemium generates ~2x the signups of a trial (90 vs 45 per 1,000 visitors)
  and freemium-acquired customers retain longer (~28 vs ~24 months) with ~2x
  36-month LTV. Good for land-and-expand.
- BUT for products over ~$50 ACV with complex workflows, a TRIAL converts
  40-60% better than freemium. Long free windows delay revenue and kill
  urgency.
- Implication: free CRM forever = the freemium land (cheap signups, sticky).
  The AI is the >$50 complex product, so it should convert on a shorter,
  trial-style window, not a 6-12 month giveaway.

Usage vs flat (verified):
- Usage/credit models grew 126% YoY, but 78% of buyers report unexpected
  charges from consumption AI pricing. Visible metering is the #1 complaint.
- Best practice is hybrid: a flat plan with included volume, per-unit cost
  FALLING as you scale (bundles), upgrade to a bigger flat tier as usage grows.
  This is the "toner" done right and exactly our no-visible-meter decision.

Choice architecture (verified):
- Conversion drops ~17% moving from 3 to 5+ options. Keep the page to 3 visible
  choices.

Founder / lifetime deals (verified):
- Founding members typically pay 20-30% below eventual standard, locked. Our
  earlier $29 (42% off $49) over-discounts and gives away MRR.
- True lifetime deals: ~16-17% refund rate, attract deal-hunters, destroy MRR
  predictability. Avoid. A 2-year lock is the right call.
- Run a founder window 3-6 months, then grandfather buyers and close it.
- Self-host the offer (keep 95%+ vs ~30% net on AppSumo). One founder made
  $3k in 10 minutes with a LinkedIn post + a Stripe link.
- Waitlist converts ~20% to paid if you convert within a month of signup, then
  it decays. Convert fast at launch.

## Recommended structure

Three visible options, all-in, no meter:
1. Free — the full CRM. $0. (The freemium land: cheap signups, sticky, high LTV.)
2. Line — $15/user/mo. Phone plus the free CRM. At or below market (Quo $15,
   RingCentral $20-30). The always-on floor and the downgrade.
3. AI Suite — $49/user/mo, all-in (line + AI + generous included volume).
   Positioned at the AI-receptionist floor while including the whole job, not
   just answering. Add it only to the seats that need it; extra lines stay $15.

Free AI window (the one change from our plan): give the PUBLIC a punchy free
trial of the AI (recommend 30 days), not 6 months. Reserve the long free window
as the founder perk. This follows the trial-beats-freemium evidence for a $50
product and creates urgency to convert.

Single founder / early-access offer (no tier ladder):
- AI Suite free for 6 months, then locked at $39/mo for 2 years (about 20% under
  the $49 standard, in the best-practice band, versus a $29 that bleeds MRR).
- The 6-month free window is the founder hook; the modest locked rate is the
  sustainable sweetener. One lever strong, not two giveaways stacked.
- Claim free (or a small refundable deposit), self-hosted, 3-6 month window,
  then grandfather and close. Phone is an onboarding upsell, not a tier.

Why $49 not $49.98: the cents buy nothing the AI-receptionist floor ($49) does
not already give, and $49 is cleaner. Given the WTP headroom ($3,675/mo lost to
missed calls), $49 is a deliberate land price; the expansion tiers recapture
margin as usage grows.

## Key risks
- Free CRM forever means carrying hosting on non-payers. Mitigated: active users
  need a $15 line, and freemium LTV runs high.
- $49 underprices vs willingness to pay. Intentional for land; test $59-79 once
  there is usage data, and let the higher-volume flat tier capture growth.
- A long free AI window delays revenue and softens urgency. Keep the public
  window short; make length the founder lever.
- Metering must stay invisible even though tokens run internally. Visible meters
  are the single most-complained-about thing in AI pricing.

## The two calls that differ from our earlier plan
1. Free AI window: 30-day public trial + 6-month founder perk (was 6-month
   public / 12-month founder).
2. Founder locked rate: $39 (best-practice ~20% off) instead of $29 (42% off).

## Addendum, July 28: the free-phone-year proposal (Moshe)

Proposal under discussion: give a business its line free for year one, then
$15/line, with 1 month of free AI, 3 free guest invites, then $0.99 per seat,
so the platform spreads ("infects") through real usage.

Unit math (ranges, not promises):
- A free line is not free to us: number rental, minutes, E911, carrier fees.
  Realistic COGS for an active line runs about $4-8/mo, so a free year costs
  $50-100 per business. Against SMB SaaS paid CAC of $150-400+, that is cheap
  acquisition IF the account is a real business.
- Payback: a $15 line conversion repays the free year in roughly half a year
  of margin; an AI conversion at $39-49 repays it in weeks. If ~1/3 of
  free-line businesses convert to anything paid, the offer clearly pays.

The two guardrails that make it work:
1. Port to qualify. The free year requires porting (or forwarding) the real
   business number. Freeloaders and fraudsters will not port; real businesses
   will, and a ported number is the deepest lock-in the product has. The
   free year is really buying custody of the number for ~$75.
2. Fraud controls. Free VoIP attracts SMS-pumping and toll fraud: fair-use
   minute caps, international off by default, SMS limited until paid.

Resolved (Moshe, July 28): the $35 is NOT a third price. It is the unbundled
AI portion of the same ~$50 bill: $49.89 total, $15 of it the line, $35 the
AI. As a pitch it anchors the AI against the line ("you pay $15 for a phone
anyway, the AI that answers it is $35"), which is stronger than anchoring
against zero. The public ladder is unchanged.

Structure (resolved): this is an IN-PERSON sales offer first, sold personally
by Moshe, not a public online offer. Rep-controlled and naturally bounded, so
it is a pilot, not a repricing. COGS confirmed at roughly $5/line/mo, so a
free year costs ~$60 per signed business per line.

Offer terms (per Moshe, July 29): the free year covers ALL the business's
lines, $15 per line per month after. The AI Suite is per USER, not flat:
$35/user/mo in this framing ($50 total per user with their line). Multi-line
shops raise the free-year cost (2 lines ~= $120/yr) but also the converted
value ($15 x lines + $35 x users), so the payback math holds or improves
with size.

Whole-company discount (sales lever, NOT advertised): a whole-company AI
option exists as a closing tool in the sales conversation only. It is off
the brochure and the /free-year page on purpose; the rep offers it when it
closes the deal. Rules and open math:
- Gate it at 3+ users. Below that, "whole company" is just a discount with
  no volume behind it.
- At the stated 25% off: 3 users = $78.75/mo ($26.25/user). Moshe's target
  number was ~$71/mo for 3 users; that is ~32% off (about $23.67/user).
  Decision pending: keep a clean 25%, or set the whole-company price to hit
  the ~$71 point. One or the other, not both.

Pilot economics and the online-rollout trigger:
- A converted account yields roughly $35-40/mo margin ($10 line, $25-30 AI),
  so one conversion covers about 20 months of another business's free year.
- Break-even conversion is therefore only ~10-15%.
- Decision rule set in advance: if the in-person cohort converts north of
  ~30% after the free year (or simply keeps the $15 line), roll a version
  out online. Under ~15%, keep it as an in-person tool for hand-picked
  shops. In between, tune the offer (shorter free window, annual-AI
  requirement) and rerun.
- Port-to-qualify and the fraud caps still apply in person; porting is what
  makes the $60 buy custody of the number.

The 3-free-guest-invites piece is adopted into the guest seat spec already
(3 free permanently, $0.99 after). Decision owner on all of the above: Moshe
with Eli on provisioning cost reality.

Launch sequencing update (July 29, Moshe): converting starts NOW, ahead of
the October retail launch. AI call summaries ship this week; live AI
answering arrives ~October. The sequencing rules:

- Convert immediately: port + lines + CRM + summaries, free year running.
  Converting now needs NO billing infrastructure: everything the customer
  touches is free until the AI upsell, so the first dollar ever charged is
  live answering. Day-one dependencies are only porting workflow, A2P
  texting registration (days to weeks per number; start at onboarding), and
  onboarding capacity. Confirm all three with Eli before volume.
- The free AI month clock starts at live-answering GA, never at summaries.
  Summaries are free during the gap: the daily-habit taste that primes the
  $35/user upsell. Customer-facing line: "the clock never runs on something
  you do not have yet."
- The upsell moment is when answering ships: weeks of summaries in their
  inbox make the pitch "you have read what you missed; now it picks up."
- /free-year and the brochure now say onboarding is open. The PUBLIC site
  (homepage chips, founders page, drip) still says October; flipping that to
  "early access open" is a separate call for Moshe when platform readiness
  is confirmed, not implied by the in-person pilot.
