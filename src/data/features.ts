// Feature deep-dive pages. One entry per /features/[slug] page, rendered by
// src/components/feature/FeatureLanding.tsx. Grouped on the /product hub.

export type Feature = {
  slug: string;
  name: string;
  group:
    | "AI & automation"
    | "Jobs & billing"
    | "Calling & devices"
    | "Collaboration"
    | "Operations & insights";
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
    slug: "missed-call-text-back",
    name: "Missed-Call Text Back",
    group: "AI & automation",
    icon: "MessageSquareReply",
    metaTitle: "Missed-Call Text Back for Business",
    metaDescription:
      "Miss a call and OneBy texts the caller back in seconds, so they get a reply instead of dialing your competitor. Turn it on once and it runs on its own.",
    keywords: ["missed call text back", "auto text missed calls", "missed call auto reply", "text back software"],
    heroEyebrow: "Missed-Call Text Back",
    heroTitle: "Miss the call, catch the customer anyway.",
    heroSub:
      "When you can't pick up, the worst outcome is silence. OneBy texts the caller back the second the call is missed, so they get a real reply in their hand instead of dialing the next number on the list.",
    bullets: [
      "Every missed call gets an automatic text back in seconds",
      "Send your own message or a ready-made template",
      "Different replies for after-hours versus every-line-busy",
      "Works the day you turn it on, no AI receptionist required",
    ],
    how: [
      { step: "The call goes unanswered", body: "Busy on a job, after hours, or every line tied up. OneBy sees the miss the moment it happens." },
      { step: "A text goes out", body: "The caller gets a friendly message from your business number within seconds, so they feel answered instead of ignored." },
      { step: "The conversation continues", body: "Their reply lands in your shared inbox and on the customer timeline, ready for anyone on the team to pick up." },
    ],
    faqs: [
      { q: "Do I need the AI receptionist for this?", a: "No. Missed-call text back works on its own from day one. You can layer the AI receptionist on later." },
      { q: "Can I customize the message?", a: "Yes. Write your own or start from a template, and send different texts for after-hours versus when every line is busy. It always sends from your business number." },
    ],
    cardline: "Miss the call, text back in seconds.",
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
    slug: "automations",
    name: "Automations",
    group: "AI & automation",
    icon: "Workflow",
    metaTitle: "Workflow Automations for Service Businesses",
    metaDescription:
      "Build simple if-this-then-that rules across calls, jobs, and tasks. When a voicemail lands, text the caller and alert the on-call tech, on its own.",
    keywords: ["workflow automation", "business automation", "if this then that", "missed call automation"],
    heroEyebrow: "Automations",
    heroTitle: "Set the rule once. It runs every time.",
    heroSub:
      "The follow-ups you keep forgetting become rules that fire on their own. Pick a trigger, add a condition, choose what happens. No code, just plain English.",
    bullets: [
      "Triggers across calls, voicemails, jobs, visits, and tasks",
      "Conditions so a rule only fires when it should",
      "Multi-step actions: text the customer, alert the on-call tech, and more",
      "Reads back in plain English before you switch it on",
    ],
    how: [
      { step: "Pick a trigger", body: "A missed call, a new voicemail, a job that moves to a stage, a task coming due. Choose what starts the rule." },
      { step: "Add your conditions", body: "Only for VIP customers, only after hours, only for emergencies. The rule fires when it matters and stays quiet when it doesn't." },
      { step: "Choose what happens", body: "Send a text, alert a teammate, move the job, open a task. Stack several steps into one rule." },
    ],
    faqs: [
      { q: "Do I need to be technical?", a: "No. You pick from menus, and OneBy shows the finished rule as a plain-English sentence before it goes live." },
      { q: "What can trigger an automation?", a: "Calls and voicemails, job and visit stages, and task events like created, assigned, or due. We add more triggers over time." },
    ],
    cardline: "If this, then that, for your whole shop.",
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
    metaTitle: "Scheduling: Book the Job on the Call",
    metaDescription:
      "Assign a job to a tech and a time, see your whole week, and send the customer an automatic confirmation text. Scheduling built right into the call.",
    keywords: ["job scheduling software", "field service scheduling", "appointment scheduling", "dispatch scheduling"],
    heroEyebrow: "Scheduling",
    heroTitle: "Book the job before you hang up.",
    heroSub:
      "Assign a ticket to a tech and a time and see the whole week at a glance. The job is on the books before the call ends, and the customer gets a confirmation text automatically.",
    bullets: [
      "Assign a tech and a time straight from the ticket",
      "A week view, not just today",
      "Reschedule or reassign in a tap",
      "The customer gets a confirmation text automatically",
    ],
    how: [
      { step: "Pick a slot", body: "Drop the job on a tech and a time from the ticket or the calendar." },
      { step: "It's on the board", body: "The job lands on the schedule for that tech and time, visible to the whole team." },
      { step: "Everyone knows", body: "The tech sees their day and the customer gets a heads-up text." },
    ],
    faqs: [
      { q: "Can I sync it with Google or Microsoft calendar?", a: "Calendar sync is on the roadmap. For now, your schedule lives in OneBy with a clean week view, and customers get an automatic confirmation text so nobody misses the appointment." },
      { q: "Is this a full dispatch board?", a: "It is lightweight scheduling for small teams: assign a tech and a time, see the week, and go. No bloated dispatch software to learn." },
    ],
    cardline: "Book the job, text the confirmation.",
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
      "Recurring invoices that auto-charge the card each cycle",
    ],
    how: [
      { step: "Send the quote", body: "Turn the job into a quote and text it over for one-tap approval." },
      { step: "Invoice the work", body: "When it's done, the quote becomes an invoice with a pay link." },
      { step: "Get paid", body: "The customer taps to pay by card, and it reconciles against the job." },
    ],
    faqs: [
      { q: "Can customers pay by card?", a: "Yes. They tap the texted pay link and pay by card, no app or login needed." },
      { q: "Can I bill big jobs in stages?", a: "Yes. Use milestone billing for a deposit up front and the balance on completion." },
      { q: "Can I bill recurring customers automatically?", a: "Yes. Set up a recurring invoice (weekly, monthly, quarterly, or yearly) and OneBy charges the card on file each cycle, with no manual sending." },
    ],
    cardline: "Quote, bill, and get paid in one place.",
  },
  {
    slug: "estimates",
    name: "Estimates",
    group: "Jobs & billing",
    icon: "Layers",
    metaTitle: "Good, Better, Best Estimates That Win Bigger Jobs",
    metaDescription:
      "Send three options instead of one price. OneBy builds Good, Better, Best estimates with a recommended pick and deposits, and most customers choose the middle.",
    keywords: ["good better best estimates", "option based pricing", "service estimate software", "three option quote"],
    heroEyebrow: "Estimates",
    heroTitle: "Give them three choices, not one price.",
    heroSub:
      "A single price is a yes or no. Three options turns the question into which one, and most customers pick the middle. OneBy builds Good, Better, Best estimates in a couple of taps, with a recommended option and a deposit on approval.",
    bullets: [
      "Good, Better, Best options on one clean estimate",
      "Star the option you recommend, and most people take it",
      "Each option pulls from your price book and can collect a deposit",
      "The customer taps to pick and approve, right from their phone",
    ],
    how: [
      { step: "Build three options", body: "Start from a trade template or your price book. Good, Better, and Best, each with its own line items and total." },
      { step: "Recommend one", body: "Star the middle option so it stands out as the pick, which is the one most customers choose." },
      { step: "Send and get paid", body: "The customer sees a clean, tap-to-pick version, approves the option they want, and puts a deposit down to start." },
    ],
    faqs: [
      { q: "Why offer three options?", a: "One price is a yes-or-no decision. Three options shifts the customer to choosing which level they want, which lifts your average ticket and closes more jobs." },
      { q: "Do I have to build them from scratch?", a: "No. Start from a ready-made set for your trade or reuse your own template, then edit anything before you send." },
    ],
    cardline: "Good, Better, Best. Most pick the middle.",
  },
  {
    slug: "price-book",
    name: "Price Book",
    group: "Jobs & billing",
    icon: "Tags",
    metaTitle: "Flat-Rate Price Book for Service Businesses",
    metaDescription:
      "Set your prices once and reuse them on every estimate and invoice. Variants, contractor tiers, bundles, and margin tracking, with AI to write the descriptions.",
    keywords: ["flat rate price book", "service pricing software", "price book software", "flat rate pricing"],
    heroEyebrow: "Price Book",
    heroTitle: "Price it once. Use it everywhere.",
    heroSub:
      "Your services and parts, priced and ready. Build an estimate or an invoice from the same catalog every time, so quoting is fast and your prices stay consistent across the whole team.",
    bullets: [
      "One catalog of services and parts, reused on every quote and invoice",
      "Variants and volume or contractor pricing tiers",
      "Bundles and kits that combine parts and labor into one line",
      "Margin tracking, so you see the profit on every item",
    ],
    how: [
      { step: "Build your book", body: "Add your services and parts with prices, or import a ready-made starter for your trade and trim it." },
      { step: "Quote in seconds", body: "Type a line on any estimate or invoice and pick from the book. No re-keying prices, no guessing." },
      { step: "Keep it sharp", body: "Track margin per item, set contractor and volume tiers, and let AI draft clean customer-facing descriptions." },
    ],
    faqs: [
      { q: "Can I set different prices for contractors or volume?", a: "Yes. Each item can carry price tiers, so a bulk or contractor rate applies automatically at the right quantity." },
      { q: "What are bundles?", a: "A bundle combines several products and services into one priced line, like an install that includes the equipment and the labor, so you add it in one tap." },
    ],
    cardline: "Set prices once, reuse everywhere.",
  },
  {
    slug: "connect-your-ai-assistant",
    name: "Connect Your AI Assistant",
    group: "AI & automation",
    icon: "Plug",
    metaTitle: "Connect Claude, ChatGPT, or Gemini to Your Business",
    metaDescription:
      "OneBy has a secure connector so you can plug your own AI assistant, Claude, ChatGPT, Gemini, Cursor, or any model that allows connections, straight into your business and ask it anything or have it get work done.",
    keywords: ["MCP connector", "connect AI to CRM", "ChatGPT business connector", "Claude business data", "AI assistant integration"],
    heroEyebrow: "Connect Your AI Assistant",
    heroTitle: "Bring your own AI. Point it at your business.",
    heroSub:
      "OneBy opens a secure connector to the assistants you already use. Ask Claude, ChatGPT, Gemini, Cursor, or any model that allows connections about your customers, calls, jobs, and invoices in plain English, and let it do the busywork, with your permission.",
    bullets: [
      "Works with Claude, ChatGPT, Gemini, Cursor, and any model that allows connections",
      "Ask about customers, calls, jobs, invoices, and payments in plain English",
      "Let it draft a text, build an invoice, or schedule a visit, only when you allow it",
      "You control what it can see and whether it can make changes, read-only by default",
    ],
    how: [
      { step: "Connect once", body: "Add the OneBy connector to your assistant with a guided, step-by-step setup. No code." },
      { step: "Set the guardrails", body: "Choose what the assistant can reach and whether it can only read or also make changes. You stay in control." },
      { step: "Just ask", body: "“Which customers asked about financing last month?” or “Text the Johnsons their invoice.” It answers, or does it, with your say-so." },
    ],
    faqs: [
      { q: "Which assistants can I connect?", a: "Claude (web, desktop, and Code), ChatGPT, Gemini, and Cursor, with guided setup for each, plus any AI model or app that supports connections. The connector is open, so if your assistant can connect to outside tools, it works." },
      { q: "Is my data safe?", a: "You decide what the assistant can access, and it is read-only unless you turn on changes for it. Every connection is scoped to your account and you can turn it off anytime." },
    ],
    cardline: "Plug your own AI into your business.",
  },
  {
    slug: "equipment-warranties",
    name: "Equipment & Warranties",
    group: "Jobs & billing",
    icon: "Wrench",
    metaTitle: "Equipment and Warranty Tracking for Service Businesses",
    metaDescription:
      "Track the equipment you install, its serial numbers and warranties, and its full service history. OneBy flags maintenance that's due and files warranty claims.",
    keywords: ["equipment tracking", "warranty tracking software", "asset tracking field service", "HVAC equipment history", "serial number tracking"],
    heroEyebrow: "Equipment & Warranties",
    heroTitle: "Know every unit you've ever installed.",
    heroSub:
      "Log the equipment you install against the customer and the job, keep serial numbers and warranties on file, and see the whole service history in one place. When maintenance is due, OneBy tells you.",
    bullets: [
      "Track installed units by customer, location, and job",
      "Serial numbers, models, and warranty terms on file",
      "Full service history for every piece of equipment",
      "Maintenance-due list and one-tap warranty claims",
    ],
    how: [
      { step: "Log it on the job", body: "When you install or service a unit, record the model, serial, and warranty right from the job." },
      { step: "It builds the history", body: "Every visit, repair, and part attaches to that unit, so the whole story is in one place." },
      { step: "Stay ahead of it", body: "See what's due for maintenance, and file a warranty claim in a tap when something fails." },
    ],
    faqs: [
      { q: "Who is this for?", a: "Any trade that installs or services equipment: HVAC, appliances, garage doors, generators, pumps, and property maintenance. It turns one-time installs into ongoing service relationships." },
      { q: "Can I see what's under warranty?", a: "Yes. Each unit carries its warranty terms, so you know in seconds whether a repair is covered before you quote it." },
    ],
    cardline: "Every installed unit, tracked for life.",
  },
  {
    slug: "forms-checklists",
    name: "Forms & Checklists",
    group: "Jobs & billing",
    icon: "ClipboardCheck",
    metaTitle: "Digital Forms and Checklists for the Field",
    metaDescription:
      "Build your own forms or start from ready-made packs, then attach them to jobs and customers: inspections, work authorizations, safety checks, and before-and-after photos.",
    keywords: ["field service forms", "digital inspection forms", "job checklists", "work order forms", "custom forms software"],
    heroEyebrow: "Forms & Checklists",
    heroTitle: "Every job, done the same way every time.",
    heroSub:
      "Inspections, work authorizations, safety checks, punch lists. Build the forms your trade needs or start from a ready-made pack, attach them to the job, and your team fills them in from the field.",
    bullets: [
      "Drag-and-drop form builder, or start from ready-made packs",
      "Attach forms to jobs and customers automatically",
      "Photos, signatures, checkboxes, and required fields",
      "Completed forms saved to the job and the customer record",
    ],
    how: [
      { step: "Pick or build a form", body: "Import a ready-made pack for your trade, or build your own with the drag-and-drop editor." },
      { step: "Attach it to the work", body: "Forms ride along on the job, so the tech has the right checklist in hand on site." },
      { step: "File it automatically", body: "Completed forms, photos, and signatures save to the job and the customer, ready to show or send." },
    ],
    faqs: [
      { q: "Do I have to build forms from scratch?", a: "No. Start from ready-made starter packs and trim them, or build your own from scratch. Either way they attach to jobs on their own." },
      { q: "Can techs fill them in from the field?", a: "Yes. Forms work on the mobile app, with photos and signatures captured right on site." },
    ],
    cardline: "The right checklist on every job.",
  },
  {
    slug: "service-plans",
    name: "Service Plans & Recurring Billing",
    group: "Jobs & billing",
    icon: "Repeat",
    metaTitle: "Service Plans and Recurring Billing",
    metaDescription:
      "Turn one-time jobs into recurring revenue. Set up service plans and recurring invoices that charge the card on file each cycle, plus milestone billing for big jobs.",
    keywords: ["recurring billing", "service plans", "maintenance agreements", "subscription invoicing", "milestone billing"],
    heroEyebrow: "Service Plans & Recurring Billing",
    heroTitle: "Turn one-off jobs into recurring revenue.",
    heroSub:
      "Maintenance agreements, monthly retainers, and seasonal plans run themselves. Set up a recurring invoice once and OneBy charges the card on file every cycle, and bills big jobs by milestone.",
    bullets: [
      "Recurring invoices on any cycle: weekly, monthly, quarterly, or yearly",
      "Charges the card on file automatically, no manual sending",
      "Milestone billing for deposits and big installs",
      "Payment terms and net-30 style billing for commercial accounts",
    ],
    how: [
      { step: "Set the plan", body: "Build a recurring invoice or a milestone schedule once, with the amount, cycle, and customer." },
      { step: "It bills itself", body: "OneBy charges the card on file each cycle or at each milestone, and reconciles it against the job." },
      { step: "You keep the revenue", body: "Predictable monthly income with no chasing, and a clear record of what's billed and paid." },
    ],
    faqs: [
      { q: "Who uses recurring billing?", a: "Property managers, maintenance-plan shops, and anyone on a retainer. It turns a one-time customer into steady monthly revenue." },
      { q: "Can I bill big jobs in stages?", a: "Yes. Milestone billing takes a deposit up front and the balance on completion, all tracked against the same job." },
    ],
    cardline: "Recurring revenue that bills itself.",
  },
  {
    slug: "time-tracking",
    name: "Time Tracking & Timesheets",
    group: "Operations & insights",
    icon: "Clock",
    metaTitle: "Time Tracking and Timesheets for Field Teams",
    metaDescription:
      "Your team clocks in and out from the app, hours roll up into timesheets you can review, approve, and lock, so payroll and job costing are accurate.",
    keywords: ["time tracking", "timesheets", "clock in clock out app", "field team hours", "job costing"],
    heroEyebrow: "Time Tracking & Timesheets",
    heroTitle: "Clock in from the truck. Approve from the office.",
    heroSub:
      "Your team clocks in and out right from the app, and their hours roll up into timesheets you can review, approve, and lock. Payroll and job costing stop being a guessing game.",
    bullets: [
      "One-tap clock in and out from the mobile app",
      "Hours roll up into clean weekly timesheets",
      "Review, approve, and lock before payroll",
      "See labor time against the job it belongs to",
    ],
    how: [
      { step: "The team clocks in", body: "Techs start and stop their time from the app, on site or on the road." },
      { step: "Hours roll up", body: "Time lands on a weekly timesheet per person, ready for review." },
      { step: "You approve and lock", body: "Check the week, approve it, and lock it so the numbers are final for payroll." },
    ],
    faqs: [
      { q: "Can I correct a mistake before payroll?", a: "Yes. Review and edit the week, then lock it so nothing changes after it's approved." },
      { q: "Does it tie time to jobs?", a: "Yes. Labor time attaches to the job, so you can see what a job actually cost in hours." },
    ],
    cardline: "Clock in, roll up, approve, done.",
  },
  {
    slug: "reports-insights",
    name: "Reports & Insights",
    group: "Operations & insights",
    icon: "BarChart3",
    metaTitle: "Business Reports and Insights for Service Pros",
    metaDescription:
      "Know your numbers at a glance: revenue, money owed and aging, sales by product or service, and tax summaries, all built in, no spreadsheet required.",
    keywords: ["business reports", "revenue report", "accounts receivable aging", "sales by product", "service business analytics"],
    heroEyebrow: "Reports & Insights",
    heroTitle: "Know your numbers without a spreadsheet.",
    heroSub:
      "Revenue, who owes you and for how long, what's selling, and what you owe in tax. The reports that tell you how the business is really doing are built in and always up to date.",
    bullets: [
      "Revenue over time, and revenue by customer",
      "Accounts-receivable aging, so you know who's overdue",
      "Sales by product or service, to see what actually pays",
      "Tax summaries, ready for filing time",
    ],
    how: [
      { step: "It adds up on its own", body: "Every invoice and payment feeds the reports automatically. Nothing to export or re-key." },
      { step: "See the whole picture", body: "Open a report and see revenue, receivables, and what's selling, up to date to the minute." },
      { step: "Act on it", body: "Spot overdue customers, your best-selling work, and your tax position, then do something about it." },
    ],
    faqs: [
      { q: "Do I need an accountant to read these?", a: "No. The reports are built for owners: plain numbers that answer what you earned, who owes you, and what's selling." },
      { q: "Is the data current?", a: "Yes. Reports update as invoices and payments happen, so you're never looking at last month's picture." },
    ],
    cardline: "Revenue, receivables, and what's selling.",
  },
  {
    slug: "texting-compliance",
    name: "Texting Compliance Built In",
    group: "Operations & insights",
    icon: "ShieldCheck",
    metaTitle: "Business Texting Compliance: 10DLC and Opt-Outs",
    metaDescription:
      "OneBy handles the parts of business texting that get you blocked: 10DLC registration, STOP opt-out handling, and spam controls, so your texts actually get delivered.",
    keywords: ["10DLC registration", "business texting compliance", "STOP opt-out", "A2P messaging", "SMS deliverability"],
    heroEyebrow: "Texting Compliance Built In",
    heroTitle: "The texting rules, handled for you.",
    heroSub:
      "Business texting has rules now, and breaking them gets your messages blocked. OneBy walks you through 10DLC registration, honors STOP opt-outs on its own, and keeps your number in good standing so your texts land.",
    bullets: [
      "Guided 10DLC business-texting registration",
      "STOP and opt-out requests honored automatically",
      "Block and spam controls for problem numbers",
      "Emergency (E911) address handling for your lines",
    ],
    how: [
      { step: "Register the right way", body: "OneBy walks you through 10DLC registration so carriers trust your number from day one." },
      { step: "Stay compliant on autopilot", body: "Opt-outs are honored automatically, and you can block or report problem numbers in a tap." },
      { step: "Keep landing in the inbox", body: "A registered, well-behaved number means your texts get delivered instead of filtered." },
    ],
    faqs: [
      { q: "What is 10DLC and do I need it?", a: "It's the carrier registration required to text customers from a business number in the US. OneBy guides you through it so your texts don't get blocked." },
      { q: "Do I have to manage opt-outs myself?", a: "No. When a customer texts STOP, OneBy stops texting them automatically and keeps you compliant." },
    ],
    cardline: "10DLC and opt-outs, handled.",
  },
  {
    slug: "multi-location-teams",
    name: "Multi-Location & Teams",
    group: "Operations & insights",
    icon: "Building2",
    metaTitle: "Multi-Location and Team Roles in OneBy",
    metaDescription:
      "Run several businesses or locations under one login, with role-based access so each person sees exactly what they should. Scales from a solo shop to a multi-site team.",
    keywords: ["multi-location software", "multi-business management", "team roles and permissions", "franchise field service software"],
    heroEyebrow: "Multi-Location & Teams",
    heroTitle: "One login. Every location. The right access.",
    heroSub:
      "Run more than one business or location without juggling logins, and give each person a role that shows them exactly what they need. OneBy grows from a one-person shop to a multi-site team.",
    bullets: [
      "Multiple businesses and locations under one account",
      "Role-based access for owners, office staff, and field techs",
      "Route calls, texts, and jobs by location",
      "Add and remove team members in a couple of taps",
    ],
    how: [
      { step: "Add your locations", body: "Set up each business or location, with its own numbers, hours, and routing." },
      { step: "Give people the right role", body: "Owners see everything; office and field roles see just what they need to do their job." },
      { step: "Run it from one place", body: "Switch between locations in a tap, with the whole operation under one login." },
    ],
    faqs: [
      { q: "Can I run more than one business?", a: "Yes. Manage several businesses or locations under one account and switch between them instantly." },
      { q: "Can I limit what my team sees?", a: "Yes. Roles control what each person can see and do, so field techs and office staff get the right, scoped view." },
    ],
    cardline: "Every location, one login, right access.",
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
  { group: "Operations & insights", items: features.filter((f) => f.group === "Operations & insights") },
];
