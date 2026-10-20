# OneBy hero animation brief — "One call, start to finish"

A looping ~12s animation for the **right side** of the homepage hero, showing the
OneBy chain: **call comes in → AI answers → ticket created → tech dispatched →
job done → business paid**, resolving into the OneBy logo.

## Brand specs (give these to the tool/animator)
- **Deep Navy** `#04034F` — text, dark surfaces, primary brand
- **Professional Blue** `#008FE0` — primary actions, links, the "connecting line"
- **Accent Green** `#1CDB96` — success, the "paid"/"done" moments, call indicator
- Background: white `#FFFFFF` or very light `#F6F8FB` (must sit on a light hero)
- Font: **Inter** (600/700/800)
- Logo: the OneBy "1" mark (supply SVG). Appears at the start as the "answering"
  pulse and at the end as the resolve.
- Canvas: **1000 × 1000** (1:1) or **1080 × 1350** (4:5). Transparent background
  preferred so it floats on the hero.
- Duration: ~12s, **seamless loop**, gentle ease-in/out. No audio needed.
- Style: clean vector UI cards, rounded corners, soft shadows. Snappy, confident,
  not bouncy-cartoonish. Each step is a small UI card that lights up as a
  blue→green line threads through all of them (the "chain").

## The script / storyboard (scene by scene)

**Scene 0 — Incoming call (0.0–1.5s)**
- Visual: a call card slides in: a phone-ring glyph, "Incoming call", "Maria G. ·
  (602) 555-0192". A faint second line "You're on a job…" implies it would be missed.
- Motion: card drops in from top, phone glyph shakes twice (ringing).
- On-screen text: **Incoming call**

**Scene 1 — OneBy answers (1.5–3.5s)**
- Visual: the OneBy "1" mark pulses with a soft blue halo; a live waveform; a
  speech bubble "A/C out, needs same-day." Small label "AI answering."
- Motion: the "1" scales up with a ping ring; waveform animates; bubble types in.
- On-screen text: **OneBy picks up**

**Scene 2 — Summary → Ticket (3.5–5.5s)**
- Visual: the call collapses into a ticket card: "#1042 · HVAC · Same-day ·
  Maria G." with a one-line summary and an assignee avatar.
- Motion: waveform folds into the card; card stamps in; a green check ticks the
  "created" state.
- On-screen text: **Summary written, ticket opened**

**Scene 3 — Scheduled + dispatched (5.5–7.5s)**
- Visual: the ticket drops onto a calendar slot (3–5 PM) next to a tech avatar;
  a small van icon travels along a dotted route line to a house pin.
- Motion: ticket slides to the calendar; van drives the route; pin bounces.
- On-screen text: **Booked and on the way**

**Scene 4 — Job done (7.5–9.0s)**
- Visual: a wrench glyph turns into a green check on the ticket; status flips to
  "Completed."
- Motion: quick wrench spin → morph to check; subtle confetti tick.
- On-screen text: **Work done**

**Scene 5 — Paid (9.0–11.0s)**
- Visual: an invoice card with a tap-to-pay button; a card taps it; a green
  "PAID" stamp drops; amount ticks up (e.g., "$285.00").
- Motion: card tap ripple; "PAID" stamp rotates in; green glow.
- On-screen text: **Invoice sent, paid by card**

**Scene 6 — Resolve to logo (11.0–12.0s)**
- Visual: all the step cards shrink and flow along the blue→green line into the
  OneBy "1" mark, centered. Tagline fades in.
- Motion: cards collapse into the mark; mark settles; then loop.
- On-screen text: **Every call. Every job. One place.**

**Through-line:** a single blue→green line connects every scene and "fills"
from top to bottom as the chain progresses, so it reads as one continuous flow,
not six separate clips.

## One-paragraph prompt (to paste into an AI tool)
> A clean, looping 12-second vector motion-graphic for a SaaS hero, light
> background, brand colors deep navy #04034F, professional blue #008FE0, accent
> green #1CDB96, Inter font. It shows a chain of small UI cards lighting up one
> after another, connected by a blue-to-green line: an incoming phone call → an
> AI answering (a pulsing "1" logo + waveform) → a support ticket card being
> created → the ticket dropped on a calendar with a tech van driving a route →
> a green "completed" check → an invoice with a "PAID" stamp → everything
> collapsing into a single "1" logo with the line "Every call. Every job. One
> place." Smooth, confident, premium, seamless loop, transparent background.

## Recommended tools (ranked)
1. **Build it in code (best for a web hero).** An inline animated SVG or a
   hand-authored Lottie matches the hero pixel-for-pixel, is a few KB, scales
   crisply, loops forever, and costs nothing. I (your web lead) can build this
   from the storyboard above. **Recommended.**
2. **Jitter** (jitter.video) — purpose-built for clean product/brand motion.
   Import the logo, set brand colors, build the 6 scenes, use its AI "Magic
   Animate" for transitions, export **Lottie** (.json) for web plus MP4/GIF.
   Best "feed a storyboard, get a polished result" tool.
3. **LottieLab** (lottielab.com) — vector animation that exports **Lottie JSON**,
   the ideal web format. More hands-on than Jitter, most "correct" output.
4. Script-to-video AI (**Steve.ai**, **InVideo AI**, **Pictory**) — fastest, but
   generic "explainer" quality, weaker brand control.
5. Cinematic AI video (**Runway Gen-4**, **Google Veo 3**, **OpenAI Sora**) —
   NOT recommended here: they garble exact UI, readable text, and logos. Great
   for a mood film, wrong for a precise 6-step product chain.

## Step by step (Jitter path)
1. Create a free account at jitter.video; new project; canvas 1000×1000,
   transparent background.
2. Upload the OneBy "1" logo (SVG). Add brand colors #04034F / #008FE0 /
   #1CDB96 to the project palette. Set font to Inter.
3. Create 6 frames, one per scene above. Lay out each scene's cards/glyphs using
   Jitter's shapes and icon library (phone, ticket, calendar, van, invoice).
4. Add the connecting blue→green line across all frames; stagger each node's
   entrance so it "threads" through.
5. Use "Magic Animate" between frames for smooth transitions; set total duration
   to ~12s; enable loop; ease in/out.
6. Export **Lottie (.json)** for the site, plus **MP4/WebM (transparent)** and a
   **GIF** as fallbacks.
7. Send me the files and I'll drop them into the hero's right column.

## Hero layout change (text left, animation right)
Restructure the hero into two columns on desktop: **copy on the left, the
animation on the right** (a Lottie/`<video>` in a soft rounded frame). On mobile
it stacks: copy first, animation below. The interactive demo switcher moves just
beneath the hero. (I can implement this two-column layout now with a placeholder
on the right so the animation drops straight in when it's ready.)
