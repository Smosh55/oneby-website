# Do AI call summaries (without recordings) break recording laws? Research memo

Date: July 29, 2026. Deep web research, synthesized. NOT legal advice; several
core questions are in active litigation and unsettled. Terms at /terms were
updated the same day to reflect this memo.

## The plain-language answer

Yes, summaries without recordings are still legally risky in the all-party
consent states. Not keeping the audio does not exit these laws:

1. The statutes prohibit INTERCEPTION, not just recording. Federal Wiretap Act
   and state analogs punish acquiring the contents of a communication with a
   device. A summary is downstream of interception: to summarize, the system
   acquired and processed the call in transit. Skipping the .mp3 removes an
   evidence artifact, not the violation.
2. Several states reach listening/transcribing explicitly: California (PC 631
   "reads or learns the contents while in transit", no recording needed),
   Illinois (statute literally names transcription), Massachusetts ("secretly
   hears" alone violates), Washington (intercept OR record).
3. The 2025-2026 class-action wave targets the VENDOR as a "third-party
   eavesdropper" (Ambriz v. Google, N.D. Cal. 2025: a vendor with the mere
   CAPABILITY to use call data for its own purposes, like model training, can
   be a wiretapper). The Otter.ai consolidated class action (MTD ruling pending
   as of mid-2026) is the same theory against an AI note-taker. Important:
   a terms clause shifting blame to the customer does NOT protect OneBy from
   this theory; only OneBy's own conduct does (see product requirements).
4. Good precedent for our model: Lisota v. Heartland Dental & RingCentral
   (N.D. Ill., Jan 2026) held integrated AI transcription/summaries inside a
   communications platform fall within ECPA's ordinary-course-of-business
   exception. OneBy's integrated posture matches; keep AI features integral to
   the phone platform, never a standalone listening product.

## Risk tiers

- HIGH (all-party consent; disclosure mandatory): CA, IL, MA, WA, FL, PA, MD,
  MT, NH, NV (treat as all-party per case law).
- CAUTION/ambiguous (treat as all-party): CT (civil beep/announcement rule),
  DE, MI, OR (in-person all-party), VT (common law).
- One-party (rest): business-side consent suffices federally, BUT interstate
  calls import the caller's state law (a CA caller makes it a CA call, and you
  cannot know location from area code). Conclusion: uniform disclosure
  everywhere is the only sane default.

## When the AI itself answers

Mostly favorable: the AI is arguably the business's agent and thus a party to
the call (industry working theory, not yet court-tested). But talking to the
AI is not consent to transcription: the greeting must still disclose. Bonus:
the AI identifying itself as an AI satisfies the new AI/bot disclosure laws
(Utah, Maine, California bot law, more coming) in the same sentence. The WORSE
posture is the silent summarizer on a human-answered call (the exact Otter
fact pattern): never silently summarize.

## Product requirements (for Eli: what and why, not how)

1. Default-ON call disclosure on every line with any AI processing: "This call
   may be recorded and transcribed by an AI assistant." Played at the start of
   the call. Say "recorded" even where we only summarize; it covers the
   broader conduct.
2. The AI receptionist's greeting self-identifies AND discloses: "You've
   reached [Business]'s AI assistant. This call is recorded and transcribed so
   the team can follow up." One sentence, two laws.
3. Log that the disclosure played on each call. That log is the consent
   evidence.
4. Turning the disclosure off is a customer election behind a clear warning,
   and the election is logged.
5. OneBy must never train generalized models on customer call content (or
   strictly opt-in). This is what defeats the third-party-eavesdropper theory
   aimed at the vendor, and the terms now promise it.
6. Per-line toggle to disable AI summaries entirely.
7. No voiceprint or speaker-identification features without a separate BIPA
   (Illinois) analysis.

## Customer guidance (for onboarding materials later)

Leave the announcement on everywhere; never promise a caller "this isn't
recorded"; mention recording/AI transcription in their own privacy policy.

## What the terms now say (updated July 29)

Section 6 covers: recording, transcription, and AI note-taking treated alike
whether or not audio is retained; all-party states named; customer solely
responsible for notices/consents; enabling features = representation of
consent; disclosure mechanisms are customer-configured and disabling is the
customer's election; OneBy is appointed the customer's agent for answering and
documenting calls (supports the party/agency defense); OneBy does not train
generalized models on call content without opt-in (the anti-Ambriz clause);
customer responsible for AI/bot disclosure laws; indemnification via §12.

## Key open questions (do not present as settled)

- No court has decided the exact "summary generated, no audio retained"
  pattern under an all-party statute yet.
- Otter.ai MTD ruling pending; Ambriz is pleading-stage only.
- "AI voice agent is a party to the call" is untested industry theory.

Sources: see the full citation list in the research transcript; primary items
include 18 U.S.C. 2511; CA PC 631/632; 720 ILCS 5/14-2; MA G.L. c.272 s.99;
RCW 9.73.030; Ambriz v. Google (N.D. Cal. 2025); In re Otter.AI Privacy
Litigation (N.D. Cal., consolidated Dec 2025); Lisota v. Heartland Dental &
RingCentral (N.D. Ill. Jan 2026); Kearney v. Salomon Smith Barney (Cal.).
