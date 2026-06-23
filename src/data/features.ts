// Feature deep-dive pages. One entry per /features/[slug] page, rendered by
// src/components/feature/FeatureLanding.tsx. Grouped on the /product hub.

export type Feature = {
  slug: string;
  name: string;
  group: "AI & automation" | "Jobs & billing" | "Calling & devices" | "Collaboration";
  icon: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroEyebrow: string;
  heroTitle: string;
  heroSub: string;
  bullets: string[];
  how: { step: string; body: string }[];
  faqs: { q: string; a: string }[];
  cardline: string;
};

export const features: Feature[] = [
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    group: "AI & automation",
    icon: "Bot",
    metaTitle: "AI Receptionist for Business Calls",
    metaDescription:
      "When you can't pick up, OneBy's AI receptionist answers in a natural voice, captures the details, and hands your team a ready-to-action task.",
    keywords: ["AI receptionist", "AI call answering", "virtual receptionist", "after-hours answering"],
    heroEyebrow: "AI Receptionist",
    heroTitle: "A receptionist that never takes a lunch break.",
    heroSub:
      "When nobody can grab the phone, the AI answers in a natural voice, figures out what the caller needs, captures the details, and notifies your team in seconds.",
    bullets: [
      "Answers unanswered and after-hours calls, 24/7",
      "Understands intent and asks the right follow-up questions",
      "Flags emergencies and escalates to on-call staff",
      "Hands off a clean summary and a task, not a voicemail",
    ],
    how: [
      { step: "It picks up", body: "After a few rings with no answer, the AI answers instead of sending the caller to voicemail." },
      { step: "It listens and asks", body: "It captures the name, the need, the urgency, and any details your team needs to act." },
      { step: "It hands off", body: "You get a summary and an assigned task in seconds, ready to dispatch or call back." },
    ],
    faqs: [
      { q: "Does it sound like a robot?", a: "No. It answers in a natural, professional voice, and most callers simply feel helped." },
      { q: "Can it handle emergencies?", a: "Yes. It recognizes urgency, flags the call, and notifies your on-call team immediately." },
    ],
    cardline: "Answers the calls you can't, 24/7.",
  },
  {
    slug: "ai-voicemail-replacement",
    name: "AI Voicemail Replacement",
    group: "AI & automation",
    icon: "Voicemail",
    metaTitle: "AI Voicemail Replacement: Stop Losing Leads to Voicemail",
    metaDescription:
      "Voicemail records a message nobody listens to. OneBy replaces it with an AI that answers, understands, and turns the call into an assigned task.",
    keywords: ["voicemail replacement", "AI voicemail", "replace voicemail", "no more voicemail"],
    heroEyebrow: "AI Voicemail Replacement",
    heroTitle: "Stop losing leads to voicemail.",
    heroSub:
      "Voicemail is where leads go to die. A caller hits the beep, hangs up, and dials your competitor. OneBy replaces voicemail with an AI that actually answers and acts.",
    bullets: [
      "No more 'leave a message after the tone'",
      "Callers talk to a helpful AI, not a dead end",
      "Every call becomes a summary and a task",
      "You stop losing the customers who refuse to leave a message",
    ],
    how: [
      { step: "The beep is gone", body: "Instead of recording a message, the AI answers the call live." },
      { step: "The caller is helped", body: "It captures what they need and reassures them someone is on it." },
      { step: "You get action", body: "A summary and an assigned task land in your queue, not an unheard recording." },
    ],
    faqs: [
      { q: "Do callers know it's not voicemail?", a: "They know they reached a helpful assistant instead of a beep, and most prefer it to leaving a message." },
      { q: "Can I still get a recording?", a: "Yes. Calls are recorded and transcribed, but you also get the summary and the task, which is what you actually need." },
    ],
    cardline: "Replace the beep with an AI that acts.",
  },
  {
    slug: "smart-summaries",
    name: "Smart Summaries",
    group: "AI & automation",
    icon: "FileText",
    metaTitle: "AI Call Summaries for Every Conversation",
    metaDescription:
      "OneBy automatically turns every call into a clean, scannable summary: who called, what they need, and what's next. No more replaying recordings.",
    keywords: ["AI call summaries", "call summary", "call notes automation", "conversation summary"],
    heroEyebrow: "Smart Summaries",
    heroTitle: "Read one line. Know the whole call.",
    heroSub:
      "Every conversation, answered or missed, gets boiled down to the essentials automatically. No replaying recordings, no scribbled notes, no guessing.",
    bullets: [
      "Automatic summary of every call",
      "Name, need, urgency, and next step, in seconds",
      "Searchable across every conversation",
      "Your team reads one line and knows exactly what to do",
    ],
    how: [
      { step: "The call ends", body: "OneBy transcribes the conversation the moment it wraps." },
      { step: "AI distills it", body: "The transcript becomes a short, useful summary written for a busy team." },
      { step: "It's on the timeline", body: "The summary lands on the customer's timeline and the related task." },
    ],
    faqs: [
      { q: "Does it work on answered calls too?", a: "Yes. Every call gets summarized, not just the ones the AI answers." },
      { q: "Can I search old summaries?", a: "Yes. Ask in plain English and OneBy finds the conversations that match." },
    ],
    cardline: "Every call, distilled to what matters.",
  },
  {
    slug: "honest-ai",
    name: "Honest AI That Asks",
    group: "AI & automation",
    icon: "ShieldCheck",
    metaTitle: "AI Call Summaries That Don't Make Things Up",
    metaDescription:
      "OneBy stays faithful to what was actually said. When it's unsure, it flags the item with a question instead of guessing, so a wrong fact never lands in your task list.",
    keywords: ["accurate AI call summaries", "AI that doesn't hallucinate", "trustworthy call AI", "faithful call summary"],
    heroEyebrow: "Honest AI",
    heroTitle: "It asks when it's unsure. It never makes things up.",
    heroSub:
      "The fastest way to lose trust in AI is one confident wrong answer. OneBy sticks to what was actually said, flags anything it isn't sure about with a question, and never pads or invents.",
    bullets: [
      "Faithful to the call, never invents facts",
      "Low-confidence items flagged with a clarifying question",
      "Every summary and action links back to the recording",
      "No padding, no filler, just what was said",
    ],
    how: [
      { step: "It summarizes only what was said", body: "No guessing, no embellishing. If it wasn't in the call, it isn't in the summary." },
      { step: "It rates its own confidence", body: "Every action item is tagged confident, review, or low-confidence, so you know what to trust." },
      { step: "It asks instead of asserting", body: "When something is ambiguous, you get a question to confirm, not a wrong fact to clean up later." },
    ],
    faqs: [
      { q: "How do I know the AI got it right?", a: "Every summary and action ties back to the recording and transcript, so anyone can verify in a tap. And low-confidence items are flagged, not buried." },
      { q: "What if the AI mishears something?", a: "It rates its own confidence and asks you to confirm anything ambiguous, instead of asserting a wrong detail." },
    ],
    cardline: "Faithful summaries. Flags what it's unsure of.",
  },
  {
    slug: "task-automation",
    name: "Task Creation & Assignment",
    group: "AI & automation",
    icon: "UserCheck",
    metaTitle: "Turn Calls Into Assigned Tasks Automatically",
    metaDescription:
      "OneBy turns every conversation into a task with an owner and a due date, routed to the right person. Nothing said on a call falls through.",
    keywords: ["task automation", "create tasks from calls", "workflow automation", "task assignment"],
    heroEyebrow: "Task Creation & Assignment",
    heroTitle: "The follow-up assigns itself.",
    heroSub:
      "A summary is nice. A task with an owner and a due date is what actually gets the job done. OneBy creates it and routes it to the right person, every time.",
    bullets: [
      "Tasks created automatically from conversations",
      "Assigned to the right person with a due date",
      "Routed by what the call was about",
      "Nothing depends on someone remembering",
    ],
    how: [
      { step: "Summary becomes a task", body: "The call's summary turns into a clear, actionable task." },
      { step: "It gets an owner", body: "OneBy routes it to dispatch, the on-call tech, or the office automatically." },
      { step: "It gets done", body: "The owner is notified, the customer gets follow-up, the work closes out." },
    ],
    faqs: [
      { q: "Can I customize routing?", a: "Yes. Route tasks by call type, team, location, or time of day." },
      { q: "Does it sync with my other tools?", a: "On Solo and Pro, tasks flow into popular CRM and field-service software." },
    ],
    cardline: "Calls become owned, due-dated tasks.",
  },
  {
    slug: "customer-timeline",
    name: "Customer Timeline",
    group: "Collaboration",
    icon: "History",
    metaTitle: "Customer Timeline: Every Interaction in One Place",
    metaDescription:
      "Every call, text, voicemail, task, and note for a customer in one timeline, so anyone on the team can see the whole story at a glance.",
    keywords: ["customer timeline", "customer history", "interaction history", "unified customer view"],
    heroEyebrow: "Customer Timeline",
    heroTitle: "The whole story, one screen.",
    heroSub:
      "Every call, text, voicemail, task, and note for a customer, in one place. No more digging through three apps or asking the customer to re-explain.",
    bullets: [
      "Every interaction for a customer in one view",
      "Calls, texts, voicemails, tasks, and notes together",
      "Anyone on the team can pick up where it left off",
      "Ends phone tag and repeated explanations",
    ],
    how: [
      { step: "Everything logs itself", body: "Calls, texts, and tasks attach to the customer automatically." },
      { step: "The team sees it", body: "Open a customer and the full history is right there, newest first." },
      { step: "Follow-up is effortless", body: "No re-explaining, no lost context, no dropped balls." },
    ],
    faqs: [
      { q: "Does it work across the team?", a: "Yes. Everyone sees the same timeline, so handoffs are clean." },
      { q: "Does it include text messages?", a: "Yes. Calls and SMS live together on the same timeline." },
    ],
    cardline: "Every interaction, one timeline.",
  },
  {
    slug: "business-sms",
    name: "Business SMS",
    group: "Collaboration",
    icon: "MessageSquare",
    metaTitle: "Business SMS with a Shared Team Inbox",
    metaDescription:
      "Text customers from your business number with a shared team inbox, so messages never get stranded on one person's phone.",
    keywords: ["business SMS", "shared team inbox", "business texting", "team text messaging"],
    heroEyebrow: "Business SMS",
    heroTitle: "Texts that don't get stuck on one phone.",
    heroSub:
      "Customers want to text. OneBy gives you business texting with a shared team inbox, so any message can be seen and answered by whoever's free.",
    bullets: [
      "Text from your business number",
      "Shared inbox the whole team can see",
      "Texts live on the customer timeline",
      "No more messages trapped on a personal phone",
    ],
    how: [
      { step: "A text comes in", body: "It lands in the shared inbox, not on one person's cell." },
      { step: "Anyone can answer", body: "Whoever's available replies, with full context from the timeline." },
      { step: "It's all on record", body: "Every text is saved to the customer's history automatically." },
    ],
    faqs: [
      { q: "Can customers text my main number?", a: "Yes. Your business line handles calls and texts together." },
      { q: "Can the AI help with texts?", a: "Summaries and tasks work across channels, so a text request becomes a task too." },
    ],
    cardline: "Team texting, nothing stranded.",
  },
  {
    slug: "desk-phones",
    name: "Desk Phones & Auto-Provisioning",
    group: "Calling & devices",
    icon: "Phone",
    metaTitle: "Desk Phones with Auto-Provisioning",
    metaDescription:
      "OneBy is a full phone system with desk phones that provision themselves. Plug in a handset and it configures automatically, no IT visit required.",
    keywords: ["desk phones", "auto-provisioning", "VoIP desk phones", "business phone hardware"],
    heroEyebrow: "Desk Phones & Auto-Provisioning",
    heroTitle: "Plug it in. It just works.",
    heroSub:
      "OneBy is a real phone system, desk phones included. Auto-provisioning means a handset configures itself the moment it's plugged in. No config files, no IT ticket.",
    bullets: [
      "Plug-and-play desk phone hardware",
      "Auto-provisioning, zero manual setup",
      "Works alongside the mobile app",
      "Keep your existing number with free porting",
    ],
    how: [
      { step: "Order the handset", body: "Pick the desk phones you need, or bring supported models you already own." },
      { step: "Plug it in", body: "The phone provisions itself with your settings automatically." },
      { step: "Start taking calls", body: "It's live on your number with the AI working behind every call." },
    ],
    faqs: [
      { q: "Do I have to use desk phones?", a: "No. Use desk phones, the mobile app, or both. Lines and AI seats work either way." },
      { q: "Can I keep my number?", a: "Yes. Porting is free and there's no new hardware to rip out." },
    ],
    cardline: "Real desk phones that set themselves up.",
  },
  {
    slug: "online-fax",
    name: "Online Fax",
    group: "Calling & devices",
    icon: "Printer",
    metaTitle: "Online Fax for Business",
    metaDescription:
      "Send and receive fax right from OneBy, no machine required. For the customers, vendors, and forms that still run on paper.",
    keywords: ["online fax", "business fax", "digital fax", "send fax from computer"],
    heroEyebrow: "Online Fax",
    heroTitle: "Yes, fax. Because some things still run on paper.",
    heroSub:
      "Permits, vendors, insurers, and plenty of customers still fax. OneBy includes digital fax so you can send and receive it from the app, no clunky machine in the corner.",
    bullets: [
      "Send and receive fax from the app",
      "No fax machine or extra line",
      "Faxes stored with the rest of the record",
      "One less vendor to pay",
    ],
    how: [
      { step: "Get a fax number", body: "Add a fax number or port an existing one into OneBy." },
      { step: "Send and receive digitally", body: "Faxes go out and come in right from the app." },
      { step: "It's all in one place", body: "No separate fax service, no paper jams, no mystery beeps." },
    ],
    faqs: [
      { q: "Do I need a fax machine?", a: "No. It's fully digital, sent and received from the app." },
      { q: "Can I keep my fax number?", a: "Yes. Port your existing fax number over." },
    ],
    cardline: "Digital fax, no machine required.",
  },
  {
    slug: "call-recording",
    name: "Call Recording & AI Search",
    group: "AI & automation",
    icon: "Mic",
    metaTitle: "Call Recording with AI Search",
    metaDescription:
      "Searchable call recordings with AI insights. Ask your conversations anything in plain English and find the call you need in seconds.",
    keywords: ["call recording", "searchable call recording", "AI call search", "call analytics"],
    heroEyebrow: "Call Recording & AI Search",
    heroTitle: "Ask your calls anything.",
    heroSub:
      "Every call is recorded and transcribed, then made searchable. 'Which customers asked about financing last month?' Ask in plain English and get the answer.",
    bullets: [
      "Automatic recording and transcription",
      "Search across every call in plain English",
      "AI insights on what customers are asking for",
      "Settle 'who said what' in seconds",
    ],
    how: [
      { step: "Calls are captured", body: "Recording and transcription happen automatically on every call." },
      { step: "Everything is indexed", body: "Transcripts become searchable across your whole history." },
      { step: "You ask, it answers", body: "Plain-English search surfaces the exact calls and trends you need." },
    ],
    faqs: [
      { q: "Is recording compliant?", a: "You control recording settings and disclosures to match your local requirements." },
      { q: "Can I search by topic?", a: "Yes. Search by topic, customer, or what was said, not just by date." },
    ],
    cardline: "Searchable recordings with AI insights.",
  },
  {
    slug: "mobile-app",
    name: "Mobile App",
    group: "Calling & devices",
    icon: "Smartphone",
    metaTitle: "OneBy Mobile App for Business Calls",
    metaDescription:
      "Run your business communications from anywhere with the OneBy mobile app: calls, texts, summaries, and tasks in your pocket.",
    keywords: ["business phone app", "mobile business phone", "VoIP mobile app", "business calling app"],
    heroEyebrow: "Mobile App",
    heroTitle: "Your business line, in your pocket.",
    heroSub:
      "Take calls, send texts, read summaries, and clear tasks from anywhere. The truck, the job site, the couch. Your business number goes where you go.",
    bullets: [
      "Calls and texts from your business number",
      "Summaries and tasks on the go",
      "Keep personal and business separate",
      "Works alongside desk phones",
    ],
    how: [
      { step: "Install the app", body: "Sign in and your business number is ready on your phone." },
      { step: "Work from anywhere", body: "Answer calls, reply to texts, and clear tasks between jobs." },
      { step: "Stay in sync", body: "Everything syncs with desk phones and the shared timeline." },
    ],
    faqs: [
      { q: "Does it use my personal number?", a: "No. You use your business number, keeping personal and work separate." },
      { q: "Does it sync with desk phones?", a: "Yes. Mobile and desk phones share the same line, timeline, and tasks." },
    ],
    cardline: "Your business line, anywhere.",
  },
  {
    slug: "ticketing",
    name: "Ticketing",
    group: "Jobs & billing",
    icon: "Ticket",
    metaTitle: "Ticketing: Turn Every Call Into a Tracked Job",
    metaDescription:
      "Every call becomes a structured ticket on its own: who called, what they need, how urgent, assigned and ready. No more sticky notes or lost jobs.",
    keywords: ["ticketing software", "service ticketing", "job ticketing", "turn calls into tickets"],
    heroEyebrow: "Ticketing",
    heroTitle: "Every call becomes a ticket, on its own.",
    heroSub:
      "The AI turns each conversation into a structured ticket with the customer, the problem, the urgency, and an owner. Nothing lives on a sticky note or in someone's memory.",
    bullets: [
      "Calls, texts, and voicemails become tickets automatically",
      "Status, priority, assignee, and customer on every job",
      "The call summary and full history attached",
      "Nothing slips, because every job has a home",
    ],
    how: [
      { step: "The call becomes a ticket", body: "The AI opens a ticket from the conversation, filled in with the details, the moment the call ends." },
      { step: "It gets routed", body: "Priority and assignee are set, so the right person picks it up without a huddle." },
      { step: "It moves to done", body: "Schedule it, work it, and invoice it, all from the same ticket." },
    ],
    faqs: [
      { q: "Do I have to create tickets by hand?", a: "No. Every call turns into a ticket on its own. You just work them." },
      { q: "Can tickets sync to my other tools?", a: "Yes. On the Pro plan, tickets and summaries flow into popular CRM and field-service tools." },
    ],
    cardline: "Every call becomes a tracked job.",
  },
  {
    slug: "scheduling",
    name: "Scheduling",
    group: "Jobs & billing",
    icon: "CalendarDays",
    metaTitle: "Scheduling: Book the Job, Sync the Calendar",
    metaDescription:
      "Assign a job to a tech and a time, see your whole week, and sync two-way with Google and Microsoft calendars. Scheduling built right into the call.",
    keywords: ["job scheduling software", "field service scheduling", "appointment scheduling", "dispatch scheduling"],
    heroEyebrow: "Scheduling",
    heroTitle: "Book the job before you hang up.",
    heroSub:
      "Assign a ticket to a tech and a time, see the whole week at a glance, and let it sync both ways with Google and Microsoft calendars. The job is on the books before the call ends.",
    bullets: [
      "Assign a tech and a time straight from the ticket",
      "A week view, not just today",
      "Two-way Google and Microsoft calendar sync",
      "The customer gets a confirmation text automatically",
    ],
    how: [
      { step: "Pick a slot", body: "Drop the job on a tech and a time from the ticket or the calendar." },
      { step: "It syncs", body: "The booking lands on your calendar and theirs, both ways, instantly." },
      { step: "Everyone knows", body: "The tech sees their day and the customer gets a heads-up text." },
    ],
    faqs: [
      { q: "Does it sync with my calendar?", a: "Yes, two-way with Google Calendar and Microsoft 365, so nothing double-books." },
      { q: "Is this a full dispatch board?", a: "It is lightweight scheduling for small teams: assign a tech and a time, see the week, and go. No bloated dispatch software to learn." },
    ],
    cardline: "Book the job, sync the calendar.",
  },
  {
    slug: "invoicing",
    name: "Invoicing & Payments",
    group: "Jobs & billing",
    icon: "Receipt",
    metaTitle: "Invoicing and Payments: Quote, Bill, Get Paid",
    metaDescription:
      "Send a quote for approval, invoice the finished job, and text a pay link your customer taps to pay by card. Milestone billing for the big jobs, too.",
    keywords: ["invoicing software", "contractor invoicing", "field service invoicing", "text to pay"],
    heroEyebrow: "Invoicing & Payments",
    heroTitle: "Quote it, bill it, get paid. One place.",
    heroSub:
      "Send a quote for approval, invoice the finished job, and text a pay link your customer taps to pay by card. For bigger jobs, bill by milestone. All from the same ticket.",
    bullets: [
      "Quotes the customer can approve with one tap",
      "Invoice the finished job in a couple of taps",
      "Text a pay link, take a card, get paid faster",
      "Milestone billing for deposits and big installs",
    ],
    how: [
      { step: "Send the quote", body: "Turn the job into a quote and text it over for one-tap approval." },
      { step: "Invoice the work", body: "When it's done, the quote becomes an invoice with a pay link." },
      { step: "Get paid", body: "The customer taps to pay by card, and it reconciles against the job." },
    ],
    faqs: [
      { q: "Can customers pay by card?", a: "Yes. They tap the texted pay link and pay by card, no app or login needed." },
      { q: "Can I bill big jobs in stages?", a: "Yes. Use milestone billing for a deposit up front and the balance on completion." },
    ],
    cardline: "Quote, bill, and get paid in one place.",
  },
];

export const featuresBySlug = Object.fromEntries(
  features.map((f) => [f.slug, f])
);

export const featureGroups: Array<{ group: Feature["group"]; items: Feature[] }> = [
  { group: "AI & automation", items: features.filter((f) => f.group === "AI & automation") },
  { group: "Jobs & billing", items: features.filter((f) => f.group === "Jobs & billing") },
  { group: "Calling & devices", items: features.filter((f) => f.group === "Calling & devices") },
  { group: "Collaboration", items: features.filter((f) => f.group === "Collaboration") },
];
