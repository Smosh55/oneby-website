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
