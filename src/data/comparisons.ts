// Competitor comparison pages. One entry per /compare/[slug] page, rendered by
// src/components/compare/ComparisonLanding.tsx. Tone is fair and honest: we
// name where the competitor is genuinely strong, then where OneBy wins.
// Competitor names are trademarks of their respective owners.

export type CompareRow = {
  label: string;
  oneby: boolean | string;
  them: boolean | string;
};

export type CompareWin = { title: string; body: string };

export type Comparison = {
  slug: string;
  competitor: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroSub: string;
  theirStrengths: string[];
  wins: CompareWin[];
  matrix: CompareRow[];
  pickThemIf: string;
  pickOneByIf: string;
  faqs: { q: string; a: string }[];
};

export const comparisons: Comparison[] = [
  {
    slug: "ringcentral",
    competitor: "RingCentral",
    category: "Phone system",
    metaTitle: "OneBy vs RingCentral: Honest Comparison",
    metaDescription:
      "RingCentral is a big, capable phone system. OneBy adds post-call automation that turns every call into a summary and an assigned task. Here's the honest comparison.",
    keywords: [
      "OneBy vs RingCentral",
      "RingCentral alternative",
      "RingCentral comparison",
      "AI phone system",
    ],
    heroTitle: "OneBy vs RingCentral",
    heroSub:
      "RingCentral is a serious, enterprise-grade phone system. OneBy is a full communications suite too, but the reason to switch is the AI on top: every call turns into a summary and an assigned task, on its own.",
    theirStrengths: [
      "Deep enterprise feature set and global calling",
      "Big catalog of integrations and contact-center add-ons",
      "Proven at very large scale",
    ],
    wins: [
      {
        title: "Every call becomes action",
        body: "RingCentral moves the call. OneBy works the call afterward: it transcribes, summarizes, and creates and assigns the follow-up task automatically.",
      },
      {
        title: "Pay for AI only where it helps",
        body: "Put cheap Lines on the phones that just dial and AI seats on the lines that book jobs. No paying enterprise prices across every extension.",
      },
      {
        title: "Simple enough to run yourself",
        body: "No professional-services engagement to get value. Port your number, plug in a desk phone, and you're live in a day.",
      },
    ],
    matrix: [
      { label: "Cloud phone system + desk phones", oneby: true, them: true },
      { label: "Business SMS + fax", oneby: true, them: true },
      { label: "AI receptionist included", oneby: true, them: "Add-on" },
      { label: "Post-call automation on every call", oneby: true, them: false },
      { label: "Creates AND assigns tasks from calls", oneby: true, them: false },
      { label: "Mix cheap lines with AI seats", oneby: true, them: false },
      { label: "Live in a day, no pro-services", oneby: true, them: "Varies" },
      { label: "Runs the job too: tickets, scheduling, invoicing", oneby: true, them: false },
    ],
    pickThemIf:
      "You're a large enterprise that needs a global contact center, deep admin controls, and a long list of legacy integrations.",
    pickOneByIf:
      "You're a small or midsize team that wants the calls themselves to turn into booked work, without paying enterprise rates on every phone.",
    faqs: [
      {
        q: "Can OneBy replace RingCentral as our phone system?",
        a: "Yes. OneBy is a full communications suite: calling, desk phones with auto-provisioning, SMS, and fax. You can port your existing numbers over.",
      },
      {
        q: "What does OneBy do that RingCentral doesn't?",
        a: "OneBy automatically turns every call into a summary and an assigned task. That post-call automation is the core of the product, not a bolt-on.",
      },
    ],
  },
  {
    slug: "openphone",
    competitor: "OpenPhone",
    category: "Phone system",
    metaTitle: "OneBy vs OpenPhone: Honest Comparison",
    metaDescription:
      "OpenPhone is a clean, modern business phone app. OneBy adds desk phones, fax, and post-call automation that turns every call into an assigned task. Compare the two.",
    keywords: [
      "OneBy vs OpenPhone",
      "OpenPhone alternative",
      "OpenPhone comparison",
      "business phone with AI",
    ],
    heroTitle: "OneBy vs OpenPhone",
    heroSub:
      "OpenPhone is a lovely, modern phone app for startups and small teams. OneBy goes further: a full suite with desk phones and fax, plus AI that turns every call into a summary and an assigned task.",
    theirStrengths: [
      "Clean, friendly app that's quick to set up",
      "Nice shared numbers and lightweight team texting",
      "Approachable pricing for small teams",
    ],
    wins: [
      {
        title: "A full suite, not just an app",
        body: "OneBy adds desk phones with auto-provisioning and online fax, so you can retire the old phone system entirely, not just the softphone.",
      },
      {
        title: "Calls turn into tasks, automatically",
        body: "OpenPhone records and can transcribe. OneBy goes the last mile: it summarizes every call and creates and assigns the follow-up task for you.",
      },
      {
        title: "Built for businesses that dispatch",
        body: "Field teams, front desks, and on-call routing are first-class. The AI receptionist captures jobs when nobody can pick up.",
      },
    ],
    matrix: [
      { label: "Calling + business SMS", oneby: true, them: true },
      { label: "Desk phones with auto-provisioning", oneby: true, them: false },
      { label: "Online fax", oneby: true, them: false },
      { label: "AI receptionist included", oneby: true, them: false },
      { label: "Post-call automation on every call", oneby: true, them: "Transcripts only" },
      { label: "Creates AND assigns tasks from calls", oneby: true, them: false },
      { label: "Customer timeline + workflow automation", oneby: true, them: "Limited" },
    ],
    pickThemIf:
      "You're a small remote team that mainly needs tidy shared numbers and texting in a simple app.",
    pickOneByIf:
      "You run a business that lives on the phone and wants every call to become a summary and a task, with real desk phones and fax in the mix.",
    faqs: [
      {
        q: "Is OneBy harder to set up than OpenPhone?",
        a: "No. Setup is same-day. Port your number, set your hours and routing, and you're capturing calls in minutes, with more in the box.",
      },
      {
        q: "Does OpenPhone create tasks from calls?",
        a: "OpenPhone focuses on calling, texting, and transcripts. OneBy adds the automation layer that turns each call into an assigned, tracked task.",
      },
    ],
  },
  {
    slug: "quo",
    competitor: "Quo",
    category: "Phone system",
    metaTitle: "OneBy vs Quo (formerly OpenPhone): Honest Comparison",
    metaDescription:
      "Quo (formerly OpenPhone) is a polished phone system with a separately metered AI agent. OneBy includes the AI receptionist flat and runs the whole job: tickets, scheduling, invoicing. Compare them.",
    keywords: [
      "OneBy vs Quo",
      "Quo alternative",
      "OpenPhone vs Quo",
      "Quo pricing",
      "Sona AI cost",
    ],
    heroTitle: "OneBy vs Quo (formerly OpenPhone)",
    heroSub:
      "Quo, the rebranded OpenPhone, is a polished business phone with an AI agent (Sona) that's metered separately in call credits. OneBy includes the AI receptionist in one flat price, and keeps going after the call: ticket, schedule, invoice, payment, in one place.",
    theirStrengths: [
      "Polished apps on every platform, with strong reviews (G2 4.7, per G2, July 2026)",
      "Established at scale: 90,000+ businesses, per their site",
      "Big integration catalog (Salesforce, HubSpot, Slack, Jobber)",
    ],
    wins: [
      {
        title: "AI included, one flat price",
        body: "Quo's Sona agent is a separate credit meter: $25 to $199/mo by call volume, with $0.45 to $1.00 per-call overage (per quo.com, July 2026). OneBy's AI receptionist is included in the flat monthly price, so a busy month never spikes your bill.",
      },
      {
        title: "It runs the whole job",
        body: "Sona answers, takes a message, captures the lead, and transfers, then hands the rest to your CRM. Their own home-services page points to Jobber to finish the work. OneBy turns the call into a ticket, schedules it, invoices it, and collects payment in one system.",
      },
      {
        title: "Trade-deep, not vertical-wide",
        body: "Quo serves everyone from startups to law firms. OneBy is built specifically for service businesses, with per-trade setups, emergency flagging, and dispatch that fit how a shop actually runs.",
      },
    ],
    matrix: [
      { label: "Polished apps on every platform", oneby: "Web + mobile", them: true },
      { label: "Established review corpus", oneby: "Pre-launch", them: "G2 4.7 (July 2026)" },
      { label: "Big integration catalog", oneby: "Core set", them: true },
      { label: "AI receptionist included in flat price", oneby: true, them: "Metered ($25–$199/mo)" },
      { label: "Turns calls into tickets automatically", oneby: true, them: "Message + handoff" },
      { label: "Scheduling, invoicing & payments built in", oneby: true, them: "Via integrations" },
      { label: "Built specifically for the trades", oneby: true, them: "Broad SMB" },
      {
        label: "Example: 1 seat + AI on ~100 calls/mo",
        oneby: "$29 flat (founders)",
        them: "≈ $72/mo",
      },
      {
        label: "Example: busy month, ~250 AI calls",
        oneby: "$29 flat (founders)",
        them: "≈ $122/mo",
      },
    ],
    pickThemIf:
      "You're a distributed SMB team that mainly wants a beautiful phone app with deep integrations into a CRM you already run, and per-call AI credits fit your volume. Quo is mature today; OneBy launches August 2026.",
    pickOneByIf:
      "You run a service business and want every call answered by AI and turned into a scheduled, invoiced job, at one flat price you can budget in busy season.",
    faqs: [
      {
        q: "Is Quo the same as OpenPhone?",
        a: "Yes. OpenPhone rebranded to Quo in September 2025. Same product and team, with a bigger push behind their AI agent, Sona.",
      },
      {
        q: "Isn't Quo cheaper than OneBy?",
        a: "The seat is, the total often isn't. Per quo.com as of July 2026, plans run $15 to $35 per user/month (annual), and Sona AI is metered separately at $25 to $199/mo with $0.45 to $1.00 per-call overage. One seat plus AI on about 100 calls a month lands near $72/mo. OneBy founders pricing is $29/mo flat, AI included ($39 retail at launch).",
      },
      {
        q: "Does Quo's AI run the job like OneBy does?",
        a: "No. Sona answers, takes messages, answers FAQs, captures leads, and transfers, then hands off to your CRM or job software. OneBy carries the same call through to a ticket, a schedule slot, an invoice, and a payment in one system.",
      },
    ],
  },
  {
    slug: "dialpad",
    competitor: "Dialpad",
    category: "Phone system",
    metaTitle: "OneBy vs Dialpad: Honest Comparison",
    metaDescription:
      "Dialpad has strong real-time call AI. OneBy focuses on post-call automation: turning every call into a summary and an assigned task, plus a full suite. Compare them.",
    keywords: [
      "OneBy vs Dialpad",
      "Dialpad alternative",
      "Dialpad comparison",
      "AI business phone",
    ],
    heroTitle: "OneBy vs Dialpad",
    heroSub:
      "Dialpad is known for slick real-time call AI. OneBy is built around what happens after the call: a clean summary and a follow-up task that creates and assigns itself, on every line.",
    theirStrengths: [
      "Strong live transcription and in-call AI assist",
      "Polished apps and contact-center options",
      "Good fit for larger sales and support teams",
    ],
    wins: [
      {
        title: "From summary to assigned task",
        body: "Dialpad is great in the call. OneBy turns the finished call into action: the summary becomes a task with an owner and a due date, automatically.",
      },
      {
        title: "Built for field and service work",
        body: "Dispatch routing, the AI receptionist, and per-trade playbooks fit how home-service and local businesses actually run.",
      },
      {
        title: "Lines + AI pricing",
        body: "Put basic lines on the phones that just dial and AI seats where the jobs come in, instead of one premium plan for everyone.",
      },
    ],
    matrix: [
      { label: "Cloud phone system + desk phones", oneby: true, them: true },
      { label: "Live in-call transcription", oneby: false, them: true },
      { label: "Post-call summary + assigned task", oneby: true, them: "Summaries only" },
      { label: "AI receptionist included", oneby: true, them: "Varies" },
      { label: "Online fax", oneby: true, them: "Add-on" },
      { label: "Mix cheap lines with AI seats", oneby: true, them: false },
      { label: "Per-industry playbooks", oneby: true, them: false },
      { label: "Runs the job too: tickets, scheduling, invoicing", oneby: true, them: false },
    ],
    pickThemIf:
      "Your priority is real-time AI coaching for a large sales or support floor.",
    pickOneByIf:
      "You want the call to turn into booked, assigned work afterward, with pricing that doesn't put a premium seat on every phone.",
    faqs: [
      {
        q: "Both have call AI. What's the difference?",
        a: "Dialpad shines during the call. OneBy focuses on after the call: summarizing it and creating and assigning the follow-up task so nothing gets dropped.",
      },
      {
        q: "Can OneBy handle our desk phones?",
        a: "Yes, with auto-provisioning. Plug a handset in and it configures itself.",
      },
    ],
  },
  {
    slug: "zoom-phone",
    competitor: "Zoom Phone",
    category: "Phone system",
    metaTitle: "OneBy vs Zoom Phone: Honest Comparison",
    metaDescription:
      "Zoom Phone is a solid calling add-on to Zoom. OneBy is a full communications suite with post-call automation that turns every call into an assigned task. Compare them.",
    keywords: [
      "OneBy vs Zoom Phone",
      "Zoom Phone alternative",
      "Zoom Phone comparison",
      "AI phone system for business",
    ],
    heroTitle: "OneBy vs Zoom Phone",
    heroSub:
      "Zoom Phone is a dependable calling add-on if you already live in Zoom. OneBy is a purpose-built communications suite where every call becomes a summary and an assigned task.",
    theirStrengths: [
      "Natural fit if your company runs on Zoom meetings",
      "Reliable calling and familiar admin",
      "Easy to bundle with the rest of Zoom",
    ],
    wins: [
      {
        title: "Communication-first, not a meetings add-on",
        body: "OneBy is built around the phone call as the start of the work, with an AI receptionist, summaries, and tasks at the center, not bolted onto video.",
      },
      {
        title: "Every call becomes a task",
        body: "Zoom Phone handles the call. OneBy summarizes it and creates and assigns the follow-up, so the conversation actually turns into action.",
      },
      {
        title: "Made for local and field businesses",
        body: "Dispatch routing, desk phones with auto-provisioning, and per-trade playbooks fit home services, property management, and clinics.",
      },
    ],
    matrix: [
      { label: "Cloud phone system + desk phones", oneby: true, them: true },
      { label: "Business SMS + fax", oneby: true, them: "SMS; fax add-on" },
      { label: "AI receptionist included", oneby: true, them: false },
      { label: "Post-call automation on every call", oneby: true, them: false },
      { label: "Creates AND assigns tasks from calls", oneby: true, them: false },
      { label: "Per-industry playbooks", oneby: true, them: false },
      { label: "Mix cheap lines with AI seats", oneby: true, them: false },
      { label: "Runs the job too: tickets, scheduling, invoicing", oneby: true, them: false },
    ],
    pickThemIf:
      "Your team already runs everything in Zoom and you just want calling in the same place.",
    pickOneByIf:
      "You want a phone system that captures every call and turns it into booked, assigned work, built for businesses that run on the phone.",
    faqs: [
      {
        q: "Do we need Zoom to use OneBy?",
        a: "No. OneBy is a standalone communications suite with its own calling, desk phones, SMS, and fax.",
      },
      {
        q: "What's the headline difference?",
        a: "Zoom Phone is calling attached to meetings. OneBy is communication-first, with post-call automation that turns calls into tasks.",
      },
    ],
  },
  {
    slug: "nextiva",
    competitor: "Nextiva",
    category: "Phone system",
    metaTitle: "OneBy vs Nextiva: Honest Comparison",
    metaDescription:
      "Nextiva is a mature, well-supported business phone system. OneBy adds an AI receptionist and post-call automation that turns every call into a summary and an assigned task. Compare them.",
    keywords: [
      "OneBy vs Nextiva",
      "Nextiva alternative",
      "Nextiva comparison",
      "AI business phone system",
    ],
    heroTitle: "OneBy vs Nextiva",
    heroSub:
      "Nextiva is a dependable, well-supported business phone system with a deep feature set. OneBy is a full suite too, but the reason to switch is the AI on top: every call becomes a summary and an assigned task, on its own.",
    theirStrengths: [
      "Mature platform with a strong support reputation",
      "Broad feature set and contact-center options",
      "Reliable at scale for established businesses",
    ],
    wins: [
      {
        title: "Every call becomes action",
        body: "Nextiva moves the call. OneBy works the call afterward: it transcribes, summarizes, and creates and assigns the follow-up task automatically.",
      },
      {
        title: "Pay for AI only where it helps",
        body: "Put cheap Lines on the phones that just dial and AI seats on the lines that book jobs, instead of one plan priced across every seat.",
      },
      {
        title: "Live in a day",
        body: "Port your number, plug in a desk phone, and you're capturing calls the same day. No long onboarding.",
      },
    ],
    matrix: [
      { label: "Cloud phone system + desk phones", oneby: true, them: true },
      { label: "Business SMS + fax", oneby: true, them: true },
      { label: "AI receptionist included", oneby: true, them: "Add-on" },
      { label: "Post-call automation on every call", oneby: true, them: false },
      { label: "Creates AND assigns tasks from calls", oneby: true, them: false },
      { label: "Mix cheap lines with AI seats", oneby: true, them: false },
      { label: "Runs the job too: tickets, scheduling, invoicing", oneby: true, them: false },
    ],
    pickThemIf:
      "You want a mature, broadly supported phone system with contact-center options and you don't need calls turned into tasks.",
    pickOneByIf:
      "You want every call to become booked, assigned work, with AI only on the lines that need it.",
    faqs: [
      {
        q: "Can OneBy replace Nextiva?",
        a: "Yes. OneBy is a full communications suite with calling, desk phones, SMS, and fax, and you can port your existing numbers.",
      },
      {
        q: "What does OneBy add over Nextiva?",
        a: "An AI receptionist and post-call automation that turns every call into a summary and an assigned task, as the core of the product.",
      },
    ],
  },
  {
    slug: "google-voice",
    competitor: "Google Voice",
    category: "Phone system",
    metaTitle: "OneBy vs Google Voice: Honest Comparison",
    metaDescription:
      "Google Voice is a cheap, simple second number. OneBy is a real business phone system with an AI receptionist that answers, summarizes, and turns every call into a task. Compare them.",
    keywords: [
      "OneBy vs Google Voice",
      "Google Voice alternative",
      "Google Voice for business",
      "business phone with AI",
    ],
    heroTitle: "OneBy vs Google Voice",
    heroSub:
      "Google Voice is a cheap, simple way to get a second number. OneBy is a real business phone system: an AI receptionist that answers every call, summarizes it, and turns it into an assigned task.",
    theirStrengths: [
      "Very cheap and simple to start",
      "Tidy if you already live in Google Workspace",
      "Fine for a basic second number",
    ],
    wins: [
      {
        title: "It actually answers for you",
        body: "Google Voice rings and takes a voicemail. OneBy answers with an AI receptionist, captures the details, and books the job even when you can't pick up.",
      },
      {
        title: "Calls become summaries and tasks",
        body: "No more replaying voicemails. Every call turns into a clean summary and an assigned follow-up task automatically.",
      },
      {
        title: "A real business suite",
        body: "Desk phones with auto-provisioning, business SMS, fax, and routing, not just a forwarding number.",
      },
    ],
    matrix: [
      { label: "Get a business number fast", oneby: true, them: true },
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Post-call summaries + assigned tasks", oneby: true, them: false },
      { label: "Desk phones with auto-provisioning", oneby: true, them: false },
      { label: "Business SMS + fax", oneby: true, them: "Basic SMS" },
      { label: "Real support + call routing", oneby: true, them: "Limited" },
    ],
    pickThemIf:
      "You just want a cheap second number for occasional calls and don't need anyone, or anything, to answer for you.",
    pickOneByIf:
      "You run a business on the phone and want every call answered, summarized, and turned into a booked job.",
    faqs: [
      {
        q: "Is OneBy more expensive than Google Voice?",
        a: "It costs more than a bare number because it does far more: it answers calls with AI, summarizes them, and creates tasks. The missed calls it catches usually pay for it many times over.",
      },
      {
        q: "Can I port my Google Voice number?",
        a: "In most cases yes. Porting is free and you keep your number.",
      },
    ],
  },
  {
    slug: "grasshopper",
    competitor: "Grasshopper",
    category: "Phone system",
    metaTitle: "OneBy vs Grasshopper: Honest Comparison",
    metaDescription:
      "Grasshopper is a simple virtual phone for solopreneurs. OneBy adds an AI receptionist that actually answers, summarizes every call, and turns it into a task. Compare them.",
    keywords: [
      "OneBy vs Grasshopper",
      "Grasshopper alternative",
      "Grasshopper comparison",
      "virtual phone with AI",
    ],
    heroTitle: "OneBy vs Grasshopper",
    heroSub:
      "Grasshopper is a simple virtual phone number for solo operators and small teams. OneBy goes further: an AI receptionist that answers every call, summarizes it, and turns it into a booked job.",
    theirStrengths: [
      "Quick to set up, no hardware",
      "Friendly for solopreneurs and side businesses",
      "Simple call forwarding and voicemail",
    ],
    wins: [
      {
        title: "Something actually answers",
        body: "Grasshopper forwards calls and takes voicemail. OneBy answers with an AI receptionist and captures the job, so callers don't hang up on a beep.",
      },
      {
        title: "Calls become tasks, not voicemails",
        body: "Every call turns into a summary and an assigned follow-up, so nothing lives in a voicemail box you forget to check.",
      },
      {
        title: "Grows with you",
        body: "Add desk phones, team members, and routing when you're ready. It's a real system, not just a forwarding number.",
      },
    ],
    matrix: [
      { label: "Virtual business number", oneby: true, them: true },
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Post-call summaries + assigned tasks", oneby: true, them: false },
      { label: "Desk phones with auto-provisioning", oneby: true, them: false },
      { label: "Business SMS + fax", oneby: true, them: "SMS only" },
      { label: "Scales to a team", oneby: true, them: "Limited" },
    ],
    pickThemIf:
      "You're a solo operator who just wants a separate business line with voicemail and forwarding.",
    pickOneByIf:
      "You want every call answered and turned into a booked job, with room to grow into a full phone system.",
    faqs: [
      {
        q: "Is OneBy overkill for a solo business?",
        a: "Not at all. The Solo plan is built for one-person businesses, and the AI answering pays for itself the first time it catches a job you would have missed.",
      },
      {
        q: "Does Grasshopper answer calls with AI?",
        a: "No. Grasshopper forwards calls and takes messages. OneBy answers with an AI receptionist and turns the call into a task.",
      },
    ],
  },
  {
    slug: "smith-ai",
    competitor: "Smith.ai",
    category: "Answering service",
    metaTitle: "OneBy vs Smith.ai: Honest Comparison",
    metaDescription:
      "Smith.ai offers human receptionists billed per call. OneBy is a flat-rate AI receptionist that answers unlimited calls and turns each into a summary and a task. Compare them.",
    keywords: [
      "OneBy vs Smith.ai",
      "Smith.ai alternative",
      "AI receptionist vs Smith.ai",
      "answering service alternative",
    ],
    heroTitle: "OneBy vs Smith.ai",
    heroSub:
      "Smith.ai gives you real human receptionists who answer and book calls. OneBy is a flat-rate AI receptionist that answers every call, never waits on hold, and turns each one into a summary and an assigned task.",
    theirStrengths: [
      "Real humans who handle nuanced, sensitive calls",
      "Live appointment booking and warm transfers",
      "Great for callers who refuse to talk to a machine",
    ],
    wins: [
      {
        title: "Flat rate, not per call",
        body: "Smith.ai bills per call or per minute, so a busy month gets expensive fast. OneBy is a flat monthly rate no matter how the phone rings.",
      },
      {
        title: "Never busy, never on hold",
        body: "The AI answers unlimited calls at once, instantly, day or night. No queue when your call volume spikes.",
      },
      {
        title: "Configured to your business",
        body: "It asks your questions, flags your emergencies, and turns every call into a summary and an assigned task, the same way at 2pm or 2am.",
      },
    ],
    matrix: [
      { label: "Answers every call live", oneby: true, them: true },
      { label: "Flat monthly pricing", oneby: true, them: "Per call / minute" },
      { label: "Unlimited simultaneous calls", oneby: true, them: "Limited" },
      { label: "Post-call summaries + assigned tasks", oneby: true, them: "Messages" },
      { label: "Your own phone system + desk phones", oneby: true, them: false },
      { label: "Human escalation for complex calls", oneby: "On request", them: true },
    ],
    pickThemIf:
      "Your calls are often complex or sensitive and you specifically want a trained human on every one, and per-call pricing works for your volume.",
    pickOneByIf:
      "You want every call answered instantly at a flat rate and turned into a booked job, with a human escalation path when it's needed.",
    faqs: [
      {
        q: "Is an AI receptionist as good as Smith.ai's humans?",
        a: "For capturing the details, booking the job, and never missing a call, the AI is consistent and always available. Humans still win on genuinely unusual or sensitive calls, which is why OneBy keeps a human escalation path.",
      },
      {
        q: "How does pricing compare?",
        a: "Smith.ai bills per call or minute, so cost climbs with volume. OneBy is a flat monthly rate, so a busy season does not spike your bill.",
      },
    ],
  },
  {
    slug: "servicetitan",
    competitor: "ServiceTitan",
    category: "Field service software",
    metaTitle: "OneBy vs ServiceTitan: Honest Comparison",
    metaDescription:
      "OneBy answers your phone with AI and turns every call into a ticket, simpler than ServiceTitan. ServiceTitan has deep scheduling and financials today; OneBy is the all-in-one that also answers your phone.",
    keywords: [
      "OneBy vs ServiceTitan",
      "ServiceTitan alternative",
      "ServiceTitan phone integration",
      "field service call automation",
    ],
    heroTitle: "OneBy vs ServiceTitan",
    heroSub:
      "OneBy answers your phone with an AI receptionist and turns every call into an assigned ticket, with business calling and SMS, and you're live in a day, which is simpler and faster to start than ServiceTitan. ServiceTitan is genuinely deep for established trade businesses today, with dispatch, invoicing, and financials. Now it is the all-in-one: calls, tickets, scheduling, invoicing, and payments in one place, launching at go-live.",
    theirStrengths: [
      "Deep job, dispatch, and invoicing for large trades",
      "Rich reporting and financials",
      "Built specifically for established home-service businesses",
    ],
    wins: [
      {
        title: "It actually answers your phone",
        body: "ServiceTitan manages the job, but the work starts with a call. OneBy answers it with an AI receptionist, captures the details, and turns the call into a ticket on its own. ServiceTitan has no AI receptionist.",
      },
      {
        title: "Calls become tickets, in one simple place",
        body: "Every call turns into a summary and an assigned ticket, alongside business calling and SMS, so nothing slips. It's one simple place for the conversation and the follow-up.",
      },
      {
        title: "One place, first ring to paid",
        body: "OneBy is simple and live in a day today. Calls, tickets, scheduling, invoicing, and payments live in one place, so a job goes from first ring to paid without ever leaving OneBy.",
      },
    ],
    matrix: [
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Turns calls into tickets automatically", oneby: true, them: "Manual" },
      { label: "Business calling + SMS", oneby: true, them: false },
      { label: "Invoicing & payments", oneby: true, them: true },
      { label: "Scheduling & dispatch", oneby: true, them: true },
      { label: "Simple, live in a day", oneby: true, them: false },
    ],
    pickThemIf:
      "You're a larger, established trade business that needs deep dispatch, financials, and reporting right now, and you have the budget and team to run it.",
    pickOneByIf:
      "You're a small shop that wants every call answered and turned into a ticket in something simple you're live in a day, all in one place that also answers your phone.",
    faqs: [
      {
        q: "Is OneBy a ServiceTitan replacement?",
        a: "Usually not. OneBy is the communications layer (calling and call automation). It complements field-service software and can feed it tasks.",
      },
      {
        q: "Can the two work together?",
        a: "Yes. On Solo and Pro, OneBy integrates with popular field-service tools so call summaries and tasks flow into your workflow.",
      },
    ],
  },
  {
    slug: "housecall-pro",
    competitor: "Housecall Pro",
    category: "Field service software",
    metaTitle: "OneBy vs Housecall Pro: Honest Comparison",
    metaDescription:
      "OneBy answers your phone with AI and turns every call into a ticket, simpler than Housecall Pro. Housecall Pro has scheduling, invoicing, and payments today; OneBy is the all-in-one that also answers your phone.",
    keywords: [
      "OneBy vs Housecall Pro",
      "Housecall Pro alternative",
      "Housecall Pro phone",
      "home service call automation",
    ],
    heroTitle: "OneBy vs Housecall Pro",
    heroSub:
      "OneBy answers your phone with an AI receptionist and turns every call into a ticket, with business calling and SMS, and you're live in a day, which is simpler and faster to start than Housecall Pro. Housecall Pro is a solid job platform today with real scheduling, invoicing, and payments, but it doesn't answer your phone. Now it is the all-in-one: calls, tickets, scheduling, invoicing, and payments in one place, launching at go-live.",
    theirStrengths: [
      "Easy scheduling, invoicing, and payments",
      "Approachable for small home-service teams",
      "Nice customer-facing booking features",
    ],
    wins: [
      {
        title: "It actually answers your phone",
        body: "Housecall Pro runs the job after it's booked. OneBy makes sure the call gets answered by an AI receptionist, captured, and turned into a ticket so the job exists in the first place. Housecall Pro has no AI receptionist.",
      },
      {
        title: "Calls become tickets, in one simple place",
        body: "Every call turns into a summary and an assigned ticket, alongside business calling and SMS, so the calls you can't grab still get captured in one simple place.",
      },
      {
        title: "Simple, and live in a day",
        body: "OneBy is simple to start and live in a day today. Calls, tickets, scheduling, invoicing, and payments live in one place, so a job goes from first ring to paid without ever leaving OneBy.",
      },
    ],
    matrix: [
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Turns calls into tickets automatically", oneby: true, them: "Manual" },
      { label: "Business calling + SMS", oneby: true, them: false },
      { label: "Invoicing & payments", oneby: true, them: true },
      { label: "Scheduling & dispatch", oneby: true, them: true },
      { label: "Simple, live in a day", oneby: true, them: true },
    ],
    pickThemIf:
      "You're an established home-service business that wants deep scheduling, customer booking, invoicing, and payments right now, and you have the team to run it.",
    pickOneByIf:
      "You're a small shop that wants every call answered and turned into a ticket in something simple you're live in a day, all in one place that also answers your phone.",
    faqs: [
      {
        q: "Do I have to choose one or the other?",
        a: "No. Many teams run OneBy as the phone and call-automation layer alongside their scheduling software, with summaries and tasks flowing between them.",
      },
      {
        q: "Does Housecall Pro answer your calls?",
        a: "It's job-management software, not a phone system. OneBy is the calling layer that captures and summarizes every call.",
      },
    ],
  },
  {
    slug: "jobber",
    competitor: "Jobber",
    category: "Field service software",
    metaTitle: "OneBy vs Jobber: Honest Comparison",
    metaDescription:
      "OneBy answers your phone with AI and turns every call into a ticket, simpler than Jobber. Jobber has quoting, scheduling, and invoicing today; OneBy is the all-in-one that also answers your phone.",
    keywords: [
      "OneBy vs Jobber",
      "Jobber alternative",
      "Jobber phone integration",
      "home service phone system",
    ],
    heroTitle: "OneBy vs Jobber",
    heroSub:
      "OneBy answers your phone with an AI receptionist and turns every call into a ticket, with business calling and SMS, and you're live in a day, which is simpler and faster to start than Jobber. Jobber is tidy job management today with real quoting, scheduling, and invoicing for established crews, but it doesn't answer your phone. Now it is the all-in-one: calls, tickets, scheduling, invoicing, and payments in one place, launching at go-live.",
    theirStrengths: [
      "Simple quoting, scheduling, and invoicing",
      "Great fit for small and growing crews",
      "Clean mobile experience for the field",
    ],
    wins: [
      {
        title: "It actually answers your phone",
        body: "Jobber manages booked work. OneBy answers the call that creates the work with an AI receptionist, even mid-job, captures the details, and turns it into a ticket first. Jobber has no AI receptionist.",
      },
      {
        title: "Calls become tickets, in one simple place",
        body: "Every call turns into a summary and an assigned ticket, alongside business calling and SMS, so the call that creates the job is captured in one simple place.",
      },
      {
        title: "Simple, and live in a day",
        body: "OneBy is simple to start and live in a day today. Calls, tickets, scheduling, invoicing, and payments live in one place, so a job goes from first ring to paid without ever leaving OneBy.",
      },
    ],
    matrix: [
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Turns calls into tickets automatically", oneby: true, them: "Manual" },
      { label: "Business calling + SMS", oneby: true, them: false },
      { label: "Invoicing & payments", oneby: true, them: true },
      { label: "Scheduling & dispatch", oneby: true, them: true },
      { label: "Simple, live in a day", oneby: true, them: true },
    ],
    pickThemIf:
      "You're an established crew that wants deep quoting, scheduling, and invoicing in a mature job platform right now, and you have the team to run it.",
    pickOneByIf:
      "You're a small shop that wants every call answered and turned into a ticket in something simple you're live in a day, all in one place that also answers your phone.",
    faqs: [
      {
        q: "Can OneBy and Jobber work together?",
        a: "Yes. Run OneBy as your phone and call-automation layer, and pass summaries and tasks into your job-management workflow.",
      },
      {
        q: "Is OneBy a scheduling tool?",
        a: "No. OneBy is communication-first: calling plus the AI that turns calls into summaries and tasks. It feeds your scheduling software.",
      },
    ],
  },
  {
    slug: "appfolio",
    competitor: "AppFolio",
    category: "Property management software",
    metaTitle: "OneBy vs AppFolio: Honest Comparison",
    metaDescription:
      "OneBy answers your phone with AI and turns every tenant call into a maintenance ticket, simpler than AppFolio. AppFolio has full accounting, leasing, invoicing, and payments today; OneBy is the all-in-one that also answers your phone.",
    keywords: [
      "OneBy vs AppFolio",
      "AppFolio alternative",
      "AppFolio phone system",
      "tenant call automation",
    ],
    heroTitle: "OneBy vs AppFolio",
    heroSub:
      "OneBy answers tenant calls with an AI receptionist and turns every one into a maintenance ticket, with business calling and SMS, and you're live in a day, which is simpler and faster to start than AppFolio. AppFolio is genuinely deep for property managers at scale today, with full accounting, leasing, invoicing, and payments, but it doesn't answer your phone. Now it is the all-in-one: calls, tickets, scheduling, invoicing, and payments in one place, launching at go-live.",
    theirStrengths: [
      "End-to-end property accounting and leasing",
      "Owner and tenant portals",
      "Built for property managers at scale",
    ],
    wins: [
      {
        title: "It actually answers your phone",
        body: "OneBy answers every tenant call with an AI receptionist (even after hours), captures the unit and the issue, and turns it into a routed maintenance ticket on its own. AppFolio has no AI receptionist.",
      },
      {
        title: "Calls become tickets, in one simple place",
        body: "Every tenant call turns into a summary and an assigned maintenance ticket, alongside business calling and SMS, so your office isn't drowning in calls and nothing slips.",
      },
      {
        title: "One place, first ring to paid",
        body: "OneBy is simple and live in a day today. Calls, tickets, scheduling, invoicing, and payments live in one place, so a job goes from first ring to paid without ever leaving OneBy.",
      },
    ],
    matrix: [
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Turns calls into maintenance tickets automatically", oneby: true, them: "Manual" },
      { label: "Business calling + SMS", oneby: true, them: false },
      { label: "Invoicing & payments", oneby: true, them: true },
      { label: "Accounting, leasing & scheduling", oneby: true, them: true },
      { label: "Simple, live in a day", oneby: true, them: false },
    ],
    pickThemIf:
      "You're a property manager at scale that needs full accounting, leasing, owner portals, invoicing, and payments right now, and you have the budget and team to run it.",
    pickOneByIf:
      "You're a small operation that wants every tenant call answered and turned into a ticket in something simple you're live in a day, all in one place that also answers your phone.",
    faqs: [
      {
        q: "Is OneBy a property management platform?",
        a: "No. OneBy is the communications layer. It captures and summarizes tenant calls and creates tickets, then works alongside your PM software.",
      },
      {
        q: "Can it handle after-hours emergencies?",
        a: "Yes. The AI receptionist answers around the clock, flags emergencies, and notifies your on-call contact immediately.",
      },
    ],
  },
  {
    slug: "hubspot",
    competitor: "HubSpot",
    category: "CRM",
    metaTitle: "OneBy vs HubSpot: Honest Comparison",
    metaDescription:
      "HubSpot is a powerful CRM and marketing platform. OneBy is the communications layer that captures and summarizes every call and turns it into a task. Compare them.",
    keywords: [
      "OneBy vs HubSpot",
      "HubSpot alternative",
      "HubSpot for small business",
      "HubSpot phone system",
    ],
    heroTitle: "OneBy vs HubSpot",
    heroSub:
      "HubSpot is a deep CRM and marketing suite. OneBy isn't trying to be your CRM. It's the communications layer that answers the phone, summarizes every call, and turns it into an assigned task, then feeds the record wherever it needs to go.",
    theirStrengths: [
      "Deep CRM, marketing, and sales pipeline tooling",
      "Huge app marketplace and integrations",
      "Great for content and email marketing at scale",
    ],
    wins: [
      {
        title: "Communication-first, not record-first",
        body: "HubSpot stores the contact. OneBy starts at the conversation: it answers the call, captures what was said, and creates the follow-up automatically.",
      },
      {
        title: "Light enough for the trades",
        body: "Most home-service and local teams find a full CRM heavy. OneBy is live in a day and built around the phone, not a sales pipeline.",
      },
      {
        title: "Every call becomes a task",
        body: "No manual logging. Answered or missed, the call turns into a summary and an assigned task on its own.",
      },
    ],
    matrix: [
      { label: "Cloud phone system + desk phones", oneby: true, them: false },
      { label: "AI receptionist + call answering", oneby: true, them: false },
      { label: "Post-call summaries + assigned tasks", oneby: true, them: "Manual logging" },
      { label: "CRM, marketing & pipeline depth", oneby: "Via integration", them: true },
      { label: "Simple enough for non-sales teams", oneby: true, them: "Can be heavy" },
      { label: "Live in a day", oneby: true, them: "Varies" },
    ],
    pickThemIf:
      "You're a sales or marketing org that needs a full CRM, pipelines, and marketing automation.",
    pickOneByIf:
      "You live on the phone and want every call answered, summarized, and turned into a task without running a heavy CRM.",
    faqs: [
      {
        q: "Is OneBy a CRM?",
        a: "No. OneBy is the communications layer. It captures and summarizes calls and creates tasks, and it can sync those into a CRM you already use.",
      },
      {
        q: "Can OneBy work with HubSpot?",
        a: "Yes. On Solo and Pro, OneBy integrates with popular CRMs so call summaries and tasks flow into your records.",
      },
    ],
  },
  {
    slug: "salesforce",
    competitor: "Salesforce",
    category: "CRM",
    metaTitle: "OneBy vs Salesforce: Honest Comparison",
    metaDescription:
      "Salesforce is enterprise CRM. OneBy is the communications layer for businesses that live on the phone, capturing and summarizing every call into an assigned task.",
    keywords: [
      "OneBy vs Salesforce",
      "Salesforce alternative",
      "Salesforce for small business",
      "Salesforce phone integration",
    ],
    heroTitle: "OneBy vs Salesforce",
    heroSub:
      "Salesforce is the heavyweight CRM for enterprise sales orgs. OneBy is the opposite kind of tool: a communications suite that answers your calls and turns each one into a summary and an assigned task, with no admin team required.",
    theirStrengths: [
      "Enormously configurable enterprise CRM",
      "Deep reporting, automation, and ecosystem",
      "The standard for large, complex sales orgs",
    ],
    wins: [
      {
        title: "No admin, no implementation project",
        body: "Salesforce often needs a consultant and weeks of setup. OneBy is live in a day, configured around your phone, not a sales process.",
      },
      {
        title: "It answers the phone",
        body: "Salesforce is a database. OneBy is the actual phone system plus the AI that captures and summarizes every call.",
      },
      {
        title: "Built for small and local teams",
        body: "The trades and local businesses don't need enterprise CRM. They need every call caught and turned into a booked job.",
      },
    ],
    matrix: [
      { label: "Cloud phone system + desk phones", oneby: true, them: false },
      { label: "AI receptionist + call answering", oneby: true, them: false },
      { label: "Post-call summaries + assigned tasks", oneby: true, them: "Manual logging" },
      { label: "Enterprise CRM & reporting depth", oneby: "Via integration", them: true },
      { label: "No implementation project", oneby: true, them: false },
      { label: "Live in a day", oneby: true, them: false },
    ],
    pickThemIf:
      "You're a large enterprise with a complex sales process and a team to administer the CRM.",
    pickOneByIf:
      "You're a small or local business that wants every call captured and turned into action, without an enterprise rollout.",
    faqs: [
      {
        q: "Can OneBy replace Salesforce?",
        a: "For communication-first teams, often yes. For complex enterprise sales, OneBy complements the CRM by feeding it call summaries and tasks.",
      },
      {
        q: "Does OneBy need a long implementation?",
        a: "No. Most teams are live the same day. Port your number, set routing, and you're capturing calls in minutes.",
      },
    ],
  },
  {
    slug: "zoho",
    competitor: "Zoho CRM",
    category: "CRM",
    metaTitle: "OneBy vs Zoho CRM: Honest Comparison",
    metaDescription:
      "Zoho CRM is a deep, affordable sales CRM. OneBy is the all-in-one for service businesses that answers your phone and runs the whole job. Compare them.",
    keywords: ["OneBy vs Zoho", "Zoho CRM alternative", "Zoho for service business", "Zoho phone system"],
    heroTitle: "OneBy vs Zoho CRM",
    heroSub:
      "Zoho CRM is a deep, budget-friendly sales CRM with a huge suite around it. OneBy is the opposite kind of tool: an all-in-one for service businesses that answers the phone and turns the call into a booked, invoiced job.",
    theirStrengths: [
      "Deep, customizable sales CRM at a low price",
      "A huge connected suite (books, desk, campaigns)",
      "Great for pipeline-driven sales teams",
    ],
    wins: [
      { title: "It answers your phone", body: "Zoho stores the contact. OneBy is the phone system that answers the call with AI and turns it into a ticket on its own." },
      { title: "One place, first ring to paid", body: "Calls, tickets, scheduling, invoicing, and payments live together, built for the trades, not a sales pipeline." },
      { title: "Live in a day, no admin", body: "No consultant and no module configuration. Port your number and go." },
    ],
    matrix: [
      { label: "Answers your phone with AI", oneby: true, them: false },
      { label: "Turns calls into tickets", oneby: true, them: "Manual" },
      { label: "Scheduling & dispatch", oneby: true, them: "Add-on" },
      { label: "Invoicing & payments", oneby: true, them: "Via Zoho Books" },
      { label: "Built for the trades", oneby: true, them: false },
      { label: "Live in a day", oneby: true, them: "Varies" },
    ],
    pickThemIf:
      "You're a sales-driven team that wants a deeply customizable CRM and already lives in the Zoho suite.",
    pickOneByIf:
      "You run a service business and want every call answered and turned into a booked, invoiced job in one place.",
    faqs: [
      { q: "Is OneBy a CRM?", a: "It's a communications-first platform with a customer timeline and jobs built in. It can also sync to a CRM you already use." },
      { q: "Can OneBy replace Zoho?", a: "For service businesses that live on the phone, often yes. For complex sales pipelines, OneBy complements the CRM by feeding it calls and tasks." },
    ],
  },
  {
    slug: "pipedrive",
    competitor: "Pipedrive",
    category: "CRM",
    metaTitle: "OneBy vs Pipedrive: Honest Comparison",
    metaDescription:
      "Pipedrive is a slick sales-pipeline CRM. OneBy is the all-in-one for service businesses that answers the phone and turns calls into booked, invoiced jobs.",
    keywords: ["OneBy vs Pipedrive", "Pipedrive alternative", "Pipedrive for service business", "Pipedrive phone"],
    heroTitle: "OneBy vs Pipedrive",
    heroSub:
      "Pipedrive is a clean, visual sales-pipeline CRM built for closing deals. OneBy is built for service businesses that run on the phone: it answers the call and turns it into a booked, scheduled, invoiced job.",
    theirStrengths: [
      "Simple, visual sales pipeline",
      "Quick to set up for sales teams",
      "Good deal tracking and reporting",
    ],
    wins: [
      { title: "It answers your phone", body: "Pipedrive tracks deals. OneBy answers the call with AI and turns it into a ticket, even after hours." },
      { title: "The whole job, not just the deal", body: "Tickets, scheduling, invoicing, and payments in one place, built for service work rather than a sales funnel." },
      { title: "No pipeline to babysit", body: "You don't manage stages and deals. You answer calls and get jobs done." },
    ],
    matrix: [
      { label: "Answers your phone with AI", oneby: true, them: false },
      { label: "Turns calls into tickets", oneby: true, them: "Manual" },
      { label: "Scheduling & dispatch", oneby: true, them: false },
      { label: "Invoicing & payments", oneby: true, them: "Add-on" },
      { label: "Built for the trades", oneby: true, them: false },
      { label: "Live in a day", oneby: true, them: true },
    ],
    pickThemIf: "You're a sales team that lives in a deal pipeline and wants simple deal tracking.",
    pickOneByIf:
      "You run a service business and want calls answered and turned into booked, invoiced jobs, not deals tracked.",
    faqs: [
      { q: "Is OneBy a sales CRM?", a: "No. It's a communications-first platform for service businesses, with jobs and a customer timeline instead of a sales pipeline." },
      { q: "Can they work together?", a: "Yes. OneBy can pass calls, summaries, and tasks into a sales CRM if you run one." },
    ],
  },
  {
    slug: "servicem8",
    competitor: "ServiceM8",
    category: "Field service software",
    metaTitle: "OneBy vs ServiceM8: Honest Comparison",
    metaDescription:
      "ServiceM8 is tidy job management for small trades. OneBy adds the missing piece: it answers your phone with AI and turns every call into the job. Compare them.",
    keywords: ["OneBy vs ServiceM8", "ServiceM8 alternative", "ServiceM8 phone", "field service software with phone"],
    heroTitle: "OneBy vs ServiceM8",
    heroSub:
      "ServiceM8 is a tidy job-management app for small trades, with quoting, scheduling, and invoicing. OneBy does those too, and adds the part ServiceM8 doesn't: it answers your phone with AI and turns the call into the job.",
    theirStrengths: [
      "Clean job management for small trades",
      "Quoting, scheduling, and invoicing",
      "Good mobile app for the field",
    ],
    wins: [
      { title: "It answers your phone", body: "ServiceM8 manages the job once it exists. OneBy answers the call that creates it, captures the details, and opens the ticket. ServiceM8 has no AI receptionist." },
      { title: "Calls become jobs, in one place", body: "Calling, SMS, AI answering, tickets, scheduling, and invoicing live together, so the call that starts the job is captured." },
      { title: "Simple, and live in a day", body: "Port your number, plug in, and go. The all-in-one that also runs your phone." },
    ],
    matrix: [
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Business calling + SMS", oneby: true, them: false },
      { label: "Turns calls into tickets", oneby: true, them: "Manual" },
      { label: "Scheduling & dispatch", oneby: true, them: true },
      { label: "Invoicing & payments", oneby: true, them: true },
      { label: "Simple, live in a day", oneby: true, them: true },
    ],
    pickThemIf: "You want a mature small-trade job app and you're happy keeping your phone system separate.",
    pickOneByIf:
      "You want the call answered and turned into a scheduled, invoiced job in one place, phone system included.",
    faqs: [
      { q: "Does ServiceM8 answer your phone?", a: "No, it's job-management software. OneBy is the all-in-one that includes the phone system and AI answering." },
      { q: "Can OneBy do quoting and invoicing too?", a: "Yes. Quotes, invoices, milestone billing, and card payments are built in." },
    ],
  },
  {
    slug: "workiz",
    competitor: "Workiz",
    category: "Field service software",
    metaTitle: "OneBy vs Workiz: Honest Comparison",
    metaDescription:
      "Workiz is field-service software with scheduling, invoicing, and some calling. OneBy is the all-in-one whose AI actually answers and turns calls into jobs.",
    keywords: ["OneBy vs Workiz", "Workiz alternative", "Workiz phone", "field service software AI"],
    heroTitle: "OneBy vs Workiz",
    heroSub:
      "Workiz is solid field-service software for trades, with scheduling, invoicing, and built-in calling. OneBy goes further on the phone: an AI receptionist that answers every call and turns it into a booked, invoiced job, in one place.",
    theirStrengths: [
      "Built for field-service trades",
      "Scheduling, invoicing, and dispatch",
      "Has its own calling and SMS",
    ],
    wins: [
      { title: "AI that actually answers", body: "Workiz has calling, but you still have to pick up. OneBy's AI receptionist answers the overflow and after-hours calls and turns them into tickets on its own." },
      { title: "Every call becomes a job", body: "The conversation flows straight into a ticket, a schedule, and an invoice, with the AI doing the data entry." },
      { title: "Honest, faithful AI", body: "It captures what was said, asks when unsure instead of guessing, and never sends a caller to voicemail." },
    ],
    matrix: [
      { label: "AI receptionist answers your calls", oneby: true, them: "Limited" },
      { label: "Turns calls into tickets automatically", oneby: true, them: "Manual" },
      { label: "Business calling + SMS", oneby: true, them: true },
      { label: "Scheduling & dispatch", oneby: true, them: true },
      { label: "Invoicing & payments", oneby: true, them: true },
      { label: "Simple, live in a day", oneby: true, them: "Varies" },
    ],
    pickThemIf: "You want established field-service software and you'll staff the phones yourself.",
    pickOneByIf:
      "You want an AI that answers every call and turns it into a job, with scheduling and invoicing in the same place.",
    faqs: [
      { q: "Doesn't Workiz already have calling?", a: "It does, but a human still has to answer. OneBy adds an AI receptionist that catches the calls your team can't." },
      { q: "Is OneBy a full field-service platform?", a: "It runs the call-to-cash loop: answering, tickets, scheduling, invoicing, and payments. For heavy dispatch or inventory, it integrates." },
    ],
  },
  {
    slug: "weave",
    competitor: "Weave",
    category: "Dental & practice software",
    metaTitle: "OneBy vs Weave: Honest Comparison",
    metaDescription:
      "Weave is a mature patient-communication platform for dental and healthcare practices. OneBy answers the phone with AI and turns every call into a task, at one flat price. Compare them.",
    keywords: ["OneBy vs Weave", "Weave alternative", "Weave dental phones", "dental phone system with AI"],
    heroTitle: "OneBy vs Weave",
    heroSub:
      "Weave is a polished communication platform built specifically for dental and healthcare practices, with phones, texting, reviews, and payments. OneBy is a communications-first all-in-one whose AI actually answers the calls your front desk can't, and turns each one into a task.",
    theirStrengths: [
      "Purpose-built for dental and healthcare practices",
      "Mature patient texting, reviews, and payments",
      "Deep integrations with practice management systems",
    ],
    wins: [
      { title: "AI that answers the overflow", body: "Weave rings your front desk. OneBy's AI receptionist picks up the calls the desk can't, captures why the patient is calling, and creates the task, so no new patient lands in voicemail." },
      { title: "One flat price, AI included", body: "OneBy includes the AI receptionist in a flat monthly price, so a busy Monday never spikes your bill." },
      { title: "Runs the whole visit", body: "The call becomes a task, a booked visit, and an invoice in one place, not just a note on the patient's file." },
    ],
    matrix: [
      { label: "Built for dental practices", oneby: "Trade setups", them: true },
      { label: "Patient texting + reminders", oneby: true, them: true },
      { label: "AI receptionist answers your calls", oneby: true, them: "Limited" },
      { label: "Turns calls into assigned tasks", oneby: true, them: false },
      { label: "Reviews & payments", oneby: "Payments built in", them: true },
      { label: "Live in a day", oneby: true, them: "Varies" },
    ],
    pickThemIf:
      "You want a mature, dental-specific communication suite with established reviews and payments, and you are staffing the phones yourself.",
    pickOneByIf:
      "You want the AI to answer the calls your front desk misses and turn each into a booked visit, at one flat price. Weave is mature today; OneBy launches August 2026.",
    faqs: [
      { q: "Is OneBy dental-specific like Weave?", a: "OneBy is built for service businesses with per-trade setups, including dental. Weave is dental and healthcare specialized and mature today; OneBy launches August 2026." },
      { q: "What does OneBy add over Weave?", a: "An AI receptionist that answers overflow and after-hours calls and turns each into an assigned task, included in a flat price." },
    ],
  },
  {
    slug: "nexhealth",
    competitor: "NexHealth",
    category: "Dental & practice software",
    metaTitle: "OneBy vs NexHealth: Honest Comparison",
    metaDescription:
      "NexHealth is a patient-experience platform with online scheduling and real-time practice-management sync. OneBy answers the phone with AI and turns calls into tasks. Compare them.",
    keywords: ["OneBy vs NexHealth", "NexHealth alternative", "dental online scheduling", "dental AI phone"],
    heroTitle: "OneBy vs NexHealth",
    heroSub:
      "NexHealth is a patient-experience platform known for online scheduling and real-time sync with practice management systems. OneBy comes at it from the phone: an AI receptionist that answers the calls your desk can't and turns each into a task.",
    theirStrengths: [
      "Strong online booking and patient self-scheduling",
      "Real-time write-back to practice management systems",
      "Good patient reminders and forms",
    ],
    wins: [
      { title: "It answers the phone", body: "NexHealth shines at online self-scheduling. OneBy catches the patients who call instead of booking online, answers with AI, and creates the task." },
      { title: "Every call becomes action", body: "Answered or missed, the call turns into a summary and an assigned front-desk task, not just a form submission." },
      { title: "One flat price", body: "The AI receptionist is included, so overflow days never meter up your bill." },
    ],
    matrix: [
      { label: "Online patient self-scheduling", oneby: "Booking flow", them: true },
      { label: "AI receptionist answers phone calls", oneby: true, them: false },
      { label: "Turns calls into assigned tasks", oneby: true, them: false },
      { label: "Practice-management sync", oneby: "Via integration", them: true },
      { label: "Patient reminders", oneby: true, them: true },
      { label: "Live in a day", oneby: true, them: "Varies" },
    ],
    pickThemIf:
      "Your priority is online self-scheduling with deep real-time sync into your practice management system.",
    pickOneByIf:
      "You want the calls your front desk misses answered by AI and turned into booked visits. NexHealth is mature today; OneBy launches August 2026.",
    faqs: [
      { q: "Does OneBy replace NexHealth?", a: "They solve different halves. NexHealth is online scheduling and practice-management sync; OneBy answers the phone and turns calls into tasks. Many practices would run both." },
      { q: "Does OneBy sync with my practice software?", a: "OneBy creates structured tasks and, on Solo and Pro, plugs into popular practice tools." },
    ],
  },
  {
    slug: "booksy",
    competitor: "Booksy",
    category: "Booking & scheduling apps",
    metaTitle: "OneBy vs Booksy: Honest Comparison",
    metaDescription:
      "Booksy is a popular booking app and marketplace for barbers and salons. OneBy answers the phone with AI and books the chair, so calls do not ring out. Compare them.",
    keywords: ["OneBy vs Booksy", "Booksy alternative", "barbershop booking app", "barber phone answering"],
    heroTitle: "OneBy vs Booksy",
    heroSub:
      "Booksy is a well-known booking app and consumer marketplace where clients find and book barbers and salons online. OneBy handles the other half, the phone: its AI answers the calls you can't take mid-cut and books the chair.",
    theirStrengths: [
      "Large consumer marketplace that drives discovery",
      "Mature online booking and client app",
      "Established across barbershops and salons",
    ],
    wins: [
      { title: "It answers your phone", body: "Booksy handles online bookings. OneBy catches the clients who call instead, answers with AI even when your hands are full, and books the chair." },
      { title: "Every call becomes a booking or task", body: "Missed or answered, the call turns into a booking or a follow-up task, so nothing rings out to voicemail." },
      { title: "The whole business, not just the calendar", body: "Calls, texts, bookings, and payments live together, so you are not stitching a phone line onto a booking app." },
    ],
    matrix: [
      { label: "Online booking + client app", oneby: "Booking flow", them: true },
      { label: "Consumer discovery marketplace", oneby: false, them: true },
      { label: "AI answers your phone calls", oneby: true, them: false },
      { label: "Turns calls into bookings/tasks", oneby: true, them: false },
      { label: "Business SMS + reminders", oneby: true, them: true },
      { label: "Live in a day", oneby: true, them: true },
    ],
    pickThemIf:
      "You mainly want the consumer marketplace and online booking app that clients already use to discover barbers.",
    pickOneByIf:
      "You want the phone answered and every call turned into a booked chair. Booksy is mature today; OneBy launches August 2026.",
    faqs: [
      { q: "Does OneBy have a client-facing booking marketplace?", a: "No. Booksy's strength is its consumer marketplace. OneBy focuses on answering your phone and turning calls into bookings, and it can run alongside a booking app." },
      { q: "Can OneBy take card payments?", a: "Yes. Card payments and invoicing are built in." },
    ],
  },
  {
    slug: "squire",
    competitor: "Squire",
    category: "Booking & scheduling apps",
    metaTitle: "OneBy vs Squire: Honest Comparison",
    metaDescription:
      "Squire is a booking and point-of-sale platform built for barbershops. OneBy answers the phone with AI and turns calls into booked chairs. Compare them.",
    keywords: ["OneBy vs Squire", "Squire alternative", "barbershop software", "barber booking and POS"],
    heroTitle: "OneBy vs Squire",
    heroSub:
      "Squire is a polished booking and point-of-sale platform made for barbershops, with online booking, payments, and shop management. OneBy adds the piece a booking app does not cover: an AI receptionist that answers the phone and books the chair.",
    theirStrengths: [
      "Barbershop-specific booking and POS",
      "Strong payments and shop management",
      "Nice client-facing booking experience",
    ],
    wins: [
      { title: "It answers the phone", body: "Squire runs bookings and checkout. OneBy answers the clients who call instead of booking online, captures the service and barber, and books the chair." },
      { title: "Calls become bookings", body: "Every call turns into a booking or a rebook task, so a missed call is not a lost chair." },
      { title: "One flat price with AI", body: "The AI receptionist is included, with no per-call metering on a busy Saturday." },
    ],
    matrix: [
      { label: "Barbershop booking + POS", oneby: "Booking + payments", them: true },
      { label: "AI answers your phone calls", oneby: true, them: false },
      { label: "Turns calls into bookings/tasks", oneby: true, them: false },
      { label: "Card payments", oneby: true, them: true },
      { label: "No-show reminders + rebooking", oneby: true, them: true },
      { label: "Live in a day", oneby: true, them: "Varies" },
    ],
    pickThemIf:
      "You want a barbershop-specific booking and POS system and you are staffing the phones yourself.",
    pickOneByIf:
      "You want every call answered and turned into a booked chair, with payments in the same place. Squire is mature today; OneBy launches August 2026.",
    faqs: [
      { q: "Is OneBy a POS like Squire?", a: "OneBy includes invoicing and card payments, but Squire's checkout and shop management are more specialized. OneBy's focus is answering the phone and booking the chair." },
      { q: "Can they work together?", a: "Yes. Run OneBy as the phone and call-automation layer alongside a booking or POS app." },
    ],
  },
  {
    slug: "yardbook",
    competitor: "Yardbook",
    category: "Field service software",
    metaTitle: "OneBy vs Yardbook: Honest Comparison",
    metaDescription:
      "Yardbook is free landscaping business software for estimates, scheduling, and invoicing. OneBy answers the phone with AI and turns calls into jobs. Compare them.",
    keywords: ["OneBy vs Yardbook", "Yardbook alternative", "landscaping software", "lawn care phone answering"],
    heroTitle: "OneBy vs Yardbook",
    heroSub:
      "Yardbook is popular free software for landscaping businesses, with estimates, scheduling, and invoicing. OneBy adds the part Yardbook does not cover: an AI receptionist that answers the calls your crew cannot take from the field, and turns each into a job.",
    theirStrengths: [
      "Free to start, landscaping-specific",
      "Estimates, scheduling, and invoicing",
      "A large base of green-industry users",
    ],
    wins: [
      { title: "It answers your phone", body: "Yardbook manages the work once it exists. OneBy answers the call that creates the work, even when the crew is on a mower, and books the estimate." },
      { title: "Every call becomes a job", body: "Missed or answered, the call becomes a summary and an assigned job, so a spring-rush lead does not slip to voicemail." },
      { title: "Answering and ops in one place", body: "Calling, SMS, AI answering, scheduling, and invoicing live together, so the call that starts the job is captured." },
    ],
    matrix: [
      { label: "Landscaping estimates + invoicing", oneby: true, them: true },
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Business calling + SMS", oneby: true, them: false },
      { label: "Turns calls into jobs automatically", oneby: true, them: "Manual" },
      { label: "Scheduling & routing", oneby: true, them: true },
      { label: "Free tier", oneby: false, them: true },
    ],
    pickThemIf:
      "You want free landscaping software for estimates and invoicing and you are happy answering the phones yourself.",
    pickOneByIf:
      "You want every estimate call answered and turned into a booked job, phone system included. Yardbook is available today; OneBy launches August 2026.",
    faqs: [
      { q: "Is OneBy free like Yardbook?", a: "No. OneBy is a paid all-in-one that includes the phone system and AI answering, with founders pricing from $29/mo. The missed calls it catches typically pay for it." },
      { q: "Does Yardbook answer your phone?", a: "No, it is business-management software. OneBy is the calling and AI-answering layer that captures the calls." },
    ],
  },
  {
    slug: "singleops",
    competitor: "SingleOps",
    category: "Field service software",
    metaTitle: "OneBy vs SingleOps: Honest Comparison",
    metaDescription:
      "SingleOps is deep business software for the green industry. OneBy answers the phone with AI and turns every call into a job, at one flat price. Compare them.",
    keywords: ["OneBy vs SingleOps", "SingleOps alternative", "green industry software", "landscaping CRM with phone"],
    heroTitle: "OneBy vs SingleOps",
    heroSub:
      "SingleOps is capable, green-industry business software with CRM, estimating, scheduling, and invoicing for established landscaping and tree-care companies. OneBy comes at it from the phone: an AI receptionist that answers every call and turns it into a job.",
    theirStrengths: [
      "Deep green-industry CRM and estimating",
      "Scheduling, invoicing, and payments",
      "Built for established landscaping and tree-care firms",
    ],
    wins: [
      { title: "It answers your phone", body: "SingleOps manages the operation. OneBy answers the call that feeds it, even mid-route, captures the property details, and books the estimate. SingleOps has no AI receptionist." },
      { title: "Every call becomes a job", body: "The conversation flows into a summary and an assigned job, with the AI doing the intake." },
      { title: "Simple, and live in a day", body: "No implementation project. Port your number, plug in, and go." },
    ],
    matrix: [
      { label: "Green-industry CRM & estimating", oneby: "Core set", them: true },
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Business calling + SMS", oneby: true, them: false },
      { label: "Turns calls into jobs automatically", oneby: true, them: "Manual" },
      { label: "Scheduling & invoicing", oneby: true, them: true },
      { label: "Simple, live in a day", oneby: true, them: "Varies" },
    ],
    pickThemIf:
      "You are an established green-industry company that wants deep estimating and operations software right now, and you have the team to run it.",
    pickOneByIf:
      "You want every call answered and turned into a booked job in something simple, phone system included. SingleOps is mature today; OneBy launches August 2026.",
    faqs: [
      { q: "Is OneBy as deep as SingleOps for estimating?", a: "No. SingleOps has deeper green-industry estimating and operations. OneBy's focus is answering the phone and turning calls into jobs, and it can complement heavier ops software." },
      { q: "Can they work together?", a: "Yes. Run OneBy as the phone and call-automation layer and pass jobs into your operations software." },
    ],
  },
  {
    slug: "acculynx",
    competitor: "AccuLynx",
    category: "Field service software",
    metaTitle: "OneBy vs AccuLynx: Honest Comparison",
    metaDescription:
      "AccuLynx is deep, roofing-specific business software for production, insurance, and financials. OneBy answers the phone with AI and turns storm calls into inspections. Compare them.",
    keywords: ["OneBy vs AccuLynx", "AccuLynx alternative", "roofing CRM", "roofing phone answering"],
    heroTitle: "OneBy vs AccuLynx",
    heroSub:
      "AccuLynx is capable, roofing-specific software for job production, insurance and supplement workflows, aerial measurement, and financials. OneBy comes at it from the phone: an AI receptionist that answers every storm-season call and turns it into a booked inspection.",
    theirStrengths: [
      "Deep roofing production and job management",
      "Insurance, supplement, and aerial measurement workflows",
      "Built for established roofing companies",
    ],
    wins: [
      { title: "It answers your phone", body: "AccuLynx manages the job once it exists. OneBy answers the storm-day calls that create the jobs, at unlimited volume, and books the inspection. AccuLynx has no AI receptionist." },
      { title: "It handles the storm surge", body: "A hailstorm can multiply call volume in a day. OneBy answers every simultaneous call, so leads do not overflow to voicemail." },
      { title: "Calls become inspections", body: "Each call turns into a summary and an assigned inspection task, with the damage and address captured." },
    ],
    matrix: [
      { label: "Roofing production & financials", oneby: "Core set", them: true },
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Handles simultaneous storm calls", oneby: true, them: false },
      { label: "Business calling + SMS", oneby: true, them: false },
      { label: "Turns calls into inspections", oneby: true, them: "Manual" },
      { label: "Simple, live in a day", oneby: true, them: "Varies" },
    ],
    pickThemIf:
      "You are an established roofing company that needs deep production, insurance, and financial workflows right now, and you have the team to run it.",
    pickOneByIf:
      "You want every storm-season call answered and turned into an inspection, phone system included. AccuLynx is mature today; OneBy launches August 2026.",
    faqs: [
      { q: "Is OneBy an AccuLynx replacement?", a: "Usually not. AccuLynx has deep roofing production and financials. OneBy is the phone and call-automation layer that captures the calls and can feed your production software." },
      { q: "Can they work together?", a: "Yes. Run OneBy as the answering and intake layer and pass inspections and summaries into AccuLynx." },
    ],
  },
  {
    slug: "jobnimbus",
    competitor: "JobNimbus",
    category: "Field service software",
    metaTitle: "OneBy vs JobNimbus: Honest Comparison",
    metaDescription:
      "JobNimbus is a popular roofing and contractor CRM with pipelines and project management. OneBy answers the phone with AI and turns calls into jobs. Compare them.",
    keywords: ["OneBy vs JobNimbus", "JobNimbus alternative", "roofing CRM", "contractor phone answering"],
    heroTitle: "OneBy vs JobNimbus",
    heroSub:
      "JobNimbus is a widely used CRM and project-management tool for roofers and contractors, with boards, pipelines, and integrations. OneBy adds the part a CRM does not cover: an AI receptionist that answers every call and turns it into a job.",
    theirStrengths: [
      "Flexible roofing and contractor pipelines",
      "Project management boards and documents",
      "Good integration catalog",
    ],
    wins: [
      { title: "It answers your phone", body: "JobNimbus organizes the pipeline. OneBy answers the calls that fill it, even during a storm surge, and books the inspection. JobNimbus has no AI receptionist." },
      { title: "Every call becomes a job", body: "Missed or answered, the call turns into a summary and an assigned job, so leads do not sit in voicemail." },
      { title: "One place, first ring to paid", body: "Calls, tickets, scheduling, invoicing, and payments live together, so the job runs without leaving OneBy." },
    ],
    matrix: [
      { label: "Roofing/contractor CRM & pipelines", oneby: "Core set", them: true },
      { label: "AI receptionist answers your calls", oneby: true, them: false },
      { label: "Handles simultaneous storm calls", oneby: true, them: false },
      { label: "Business calling + SMS", oneby: true, them: false },
      { label: "Turns calls into jobs automatically", oneby: true, them: "Manual" },
      { label: "Simple, live in a day", oneby: true, them: true },
    ],
    pickThemIf:
      "You want a flexible roofing and contractor CRM with pipelines and project boards right now, and you will staff the phones yourself.",
    pickOneByIf:
      "You want every call answered and turned into a job, phone system included. JobNimbus is mature today; OneBy launches August 2026.",
    faqs: [
      { q: "Does OneBy replace JobNimbus?", a: "For teams that mainly need calls answered and turned into jobs, often yes. For deep pipeline and document management, OneBy complements the CRM by feeding it calls and tasks." },
      { q: "Can they work together?", a: "Yes. On Solo and Pro, OneBy passes call summaries and jobs into popular CRMs." },
    ],
  },
];

export const comparisonsBySlug = Object.fromEntries(
  comparisons.map((c) => [c.slug, c])
);

export const comparisonCategories: Array<{ category: string; items: Comparison[] }> = [
  {
    category: "Phone systems",
    items: comparisons.filter((c) => c.category === "Phone system"),
  },
  {
    category: "Answering services",
    items: comparisons.filter((c) => c.category === "Answering service"),
  },
  {
    category: "Field service software",
    items: comparisons.filter((c) => c.category === "Field service software"),
  },
  {
    category: "Property management software",
    items: comparisons.filter((c) => c.category === "Property management software"),
  },
  {
    category: "CRMs",
    items: comparisons.filter((c) => c.category === "CRM"),
  },
  {
    category: "Dental & practice software",
    items: comparisons.filter((c) => c.category === "Dental & practice software"),
  },
  {
    category: "Booking & scheduling apps",
    items: comparisons.filter((c) => c.category === "Booking & scheduling apps"),
  },
];
