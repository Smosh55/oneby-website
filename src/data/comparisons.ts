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
        body: "Put cheap Basic Lines on the phones that just dial and AI seats on the lines that book jobs. No paying enterprise prices across every extension.",
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
      { label: "AI receptionist for missed calls", oneby: true, them: false },
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
      { label: "Live in-call transcription", oneby: true, them: true },
      { label: "Post-call summary + assigned task", oneby: true, them: "Summaries only" },
      { label: "AI receptionist for missed calls", oneby: true, them: "Varies" },
      { label: "Online fax", oneby: true, them: "Add-on" },
      { label: "Mix cheap lines with AI seats", oneby: true, them: false },
      { label: "Per-industry playbooks", oneby: true, them: false },
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
    slug: "servicetitan",
    competitor: "ServiceTitan",
    category: "Field service software",
    metaTitle: "OneBy vs ServiceTitan: Honest Comparison",
    metaDescription:
      "ServiceTitan is powerful field service management. OneBy is the communications layer that captures and summarizes every call and feeds your tools. They work better together.",
    keywords: [
      "OneBy vs ServiceTitan",
      "ServiceTitan alternative",
      "ServiceTitan phone integration",
      "field service call automation",
    ],
    heroTitle: "OneBy vs ServiceTitan",
    heroSub:
      "ServiceTitan is heavy-duty field service management. OneBy isn't trying to replace your job and dispatch software. It's the communications layer that captures every call, summarizes it, and turns it into a task.",
    theirStrengths: [
      "Deep job, dispatch, and invoicing for large trades",
      "Rich reporting and financials",
      "Built specifically for established home-service businesses",
    ],
    wins: [
      {
        title: "It's the actual phone system",
        body: "OneBy is your calling, desk phones, SMS, and fax. ServiceTitan manages the job, but the conversation starts on the phone, and that's where OneBy lives.",
      },
      {
        title: "Every call captured and summarized",
        body: "Answered or missed, OneBy transcribes the call, writes the summary, and creates the task, so nothing said on the phone gets lost before it reaches your system.",
      },
      {
        title: "Lighter and faster to adopt",
        body: "Not every shop wants an enterprise rollout. OneBy is live in a day and plays nicely alongside the tools you already run.",
      },
    ],
    matrix: [
      { label: "Cloud phone system + desk phones", oneby: true, them: false },
      { label: "AI receptionist for missed calls", oneby: true, them: false },
      { label: "Post-call summaries + tasks", oneby: true, them: "Limited" },
      { label: "Job, dispatch & invoicing depth", oneby: "Via integration", them: true },
      { label: "Built for large trades", oneby: true, them: true },
      { label: "Live in a day", oneby: true, them: false },
    ],
    pickThemIf:
      "You need deep, all-in-one job management, financials, and reporting for an established trade business.",
    pickOneByIf:
      "You want a modern phone system that captures and summarizes every call, on its own or feeding the field software you already use.",
    faqs: [
      {
        q: "Is OneBy a ServiceTitan replacement?",
        a: "Usually not. OneBy is the communications layer (calling and call automation). It complements field-service software and can feed it tasks.",
      },
      {
        q: "Can the two work together?",
        a: "Yes. On Growth and Pro, OneBy integrates with popular field-service tools so call summaries and tasks flow into your workflow.",
      },
    ],
  },
  {
    slug: "housecall-pro",
    competitor: "Housecall Pro",
    category: "Field service software",
    metaTitle: "OneBy vs Housecall Pro: Honest Comparison",
    metaDescription:
      "Housecall Pro is friendly field service software for home pros. OneBy is the phone system and call-automation layer that captures every call and turns it into a task.",
    keywords: [
      "OneBy vs Housecall Pro",
      "Housecall Pro alternative",
      "Housecall Pro phone",
      "home service call automation",
    ],
    heroTitle: "OneBy vs Housecall Pro",
    heroSub:
      "Housecall Pro is friendly software for scheduling and invoicing home-service jobs. OneBy is the phone system and AI on top of it, capturing every call and turning it into an assigned task.",
    theirStrengths: [
      "Easy scheduling, invoicing, and payments",
      "Approachable for small home-service teams",
      "Nice customer-facing booking features",
    ],
    wins: [
      {
        title: "OneBy answers the phone",
        body: "Housecall Pro runs the job after it's booked. OneBy makes sure the call gets answered, captured, and summarized so the job exists in the first place.",
      },
      {
        title: "Nothing said on a call gets lost",
        body: "Every call is transcribed and summarized, and the follow-up task creates and assigns itself, even when the crew is on a job.",
      },
      {
        title: "A real communications suite",
        body: "Calling, desk phones with auto-provisioning, SMS, and fax in one place, with an AI receptionist for the calls you can't grab.",
      },
    ],
    matrix: [
      { label: "Cloud phone system + desk phones", oneby: true, them: false },
      { label: "AI receptionist for missed calls", oneby: true, them: false },
      { label: "Post-call summaries + assigned tasks", oneby: true, them: false },
      { label: "Scheduling, invoicing & payments", oneby: "Via integration", them: true },
      { label: "Online booking for customers", oneby: false, them: true },
      { label: "Live in a day", oneby: true, them: true },
    ],
    pickThemIf:
      "You mostly need easy scheduling, invoicing, and payments for a small home-service business.",
    pickOneByIf:
      "You're losing calls and details on the phone and want every conversation captured, summarized, and turned into a task.",
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
      "Jobber is clean job management for small home-service teams. OneBy is the phone system and call automation that captures every call and turns it into an assigned task.",
    keywords: [
      "OneBy vs Jobber",
      "Jobber alternative",
      "Jobber phone integration",
      "home service phone system",
    ],
    heroTitle: "OneBy vs Jobber",
    heroSub:
      "Jobber is tidy job management for small home-service crews. OneBy is the communications side of the business: the calls, the AI receptionist, and the summaries and tasks that come out of every conversation.",
    theirStrengths: [
      "Simple quoting, scheduling, and invoicing",
      "Great fit for small and growing crews",
      "Clean mobile experience for the field",
    ],
    wins: [
      {
        title: "Capture the call before it's a job",
        body: "Jobber manages booked work. OneBy makes sure the call that creates the work gets answered, summarized, and turned into a task first.",
      },
      {
        title: "Answer every call, even mid-job",
        body: "The AI receptionist picks up when the crew can't, captures the details, and notifies the team in seconds.",
      },
      {
        title: "The whole phone system in one place",
        body: "Calling, desk phones, SMS, and fax, with post-call automation running on every line.",
      },
    ],
    matrix: [
      { label: "Cloud phone system + desk phones", oneby: true, them: false },
      { label: "AI receptionist for missed calls", oneby: true, them: false },
      { label: "Post-call summaries + assigned tasks", oneby: true, them: false },
      { label: "Quoting, scheduling & invoicing", oneby: "Via integration", them: true },
      { label: "Built for small crews", oneby: true, them: true },
      { label: "Live in a day", oneby: true, them: true },
    ],
    pickThemIf:
      "You want straightforward quoting, scheduling, and invoicing for a small crew.",
    pickOneByIf:
      "You're missing calls and losing details, and you want every conversation captured and turned into a task automatically.",
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
      "AppFolio is full property management software. OneBy is the phone and call-automation layer that turns every tenant call into a tracked, assigned maintenance ticket.",
    keywords: [
      "OneBy vs AppFolio",
      "AppFolio alternative",
      "AppFolio phone system",
      "tenant call automation",
    ],
    heroTitle: "OneBy vs AppFolio",
    heroSub:
      "AppFolio runs the property management business end to end. OneBy is the communications layer that makes sure every tenant call is answered, summarized, and turned into a routed ticket.",
    theirStrengths: [
      "End-to-end property accounting and leasing",
      "Owner and tenant portals",
      "Built for property managers at scale",
    ],
    wins: [
      {
        title: "Every tenant call becomes a ticket",
        body: "OneBy answers the call (even after hours), captures the unit and the issue, and creates and routes a maintenance ticket, so nothing slips between buildings.",
      },
      {
        title: "It's the phone system",
        body: "Calling, desk phones, SMS, and fax with an AI receptionist, so your office isn't drowning in calls or sending tenants to voicemail.",
      },
      {
        title: "Works alongside your PM software",
        body: "OneBy captures and summarizes the conversation and can pass the ticket into the platform you already use for accounting and leasing.",
      },
    ],
    matrix: [
      { label: "Cloud phone system + desk phones", oneby: true, them: false },
      { label: "AI receptionist for tenant calls", oneby: true, them: false },
      { label: "Auto-captured maintenance tickets", oneby: true, them: "Manual / portal" },
      { label: "Accounting, leasing & portals", oneby: false, them: true },
      { label: "Post-call summaries + tasks", oneby: true, them: false },
      { label: "Live in a day", oneby: true, them: false },
    ],
    pickThemIf:
      "You need full property accounting, leasing, and owner portals in one platform.",
    pickOneByIf:
      "Tenant calls are slipping through and you want every one answered, summarized, and turned into a routed maintenance ticket.",
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
        a: "Yes. On Growth and Pro, OneBy integrates with popular CRMs so call summaries and tasks flow into your records.",
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
];
