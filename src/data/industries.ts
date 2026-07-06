// Industry landing page content. One entry per page; the template at
// src/app/industries/[slug]/page.tsx renders these. Icon is a lucide-react
// name resolved in src/components/industry/iconMap.ts.

export type Pain = { title: string; body: string };
export type Outcome = { stat: string; label: string };
export type Capability = { title: string; body: string };
export type FAQ = { q: string; a: string };

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  group: "Home Services" | "More Verticals";
  priority?: boolean;
  icon: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  // Hero
  heroEyebrow: string;
  heroTitle: string;
  heroSub: string;
  // A single punchy hero stat
  heroStat: Outcome;
  // The cost-of-missing-calls problem, in their words
  pains: Pain[];
  // A concrete "what happens" scenario built on Call -> AI -> Summary -> Task
  scenarioCaller: string;
  scenarioSummary: string;
  scenarioTask: string;
  // Outcomes band
  outcomes: Outcome[];
  // Why OneBy for this trade
  capabilities: Capability[];
  // Social proof (optional; omitted pre-launch to avoid any fabricated
  // testimonials, so the section only renders when a real quote exists)
  quote?: string;
  quoteName?: string;
  quoteRole?: string;
  // Industry FAQ
  faqs: FAQ[];
};

export const industries: Industry[] = [
  {
    slug: "hvac",
    name: "HVAC Companies",
    shortName: "HVAC",
    group: "Home Services",
    priority: true,
    icon: "Wind",
    metaTitle: "AI Receptionist & Phone System for HVAC Companies",
    metaDescription:
      "OneBy answers every HVAC call you can't get to, grabs the job details, and builds the dispatch task on its own. Stop handing service calls to voicemail.",
    keywords: [
      "HVAC answering service",
      "HVAC AI receptionist",
      "HVAC call answering",
      "HVAC dispatch software",
      "HVAC missed calls",
    ],
    heroEyebrow: "Built for HVAC",
    heroTitle: "Never lose another no-cooling call to voicemail.",
    heroSub:
      "Your techs are on rooftops and in crawl spaces, not glued to the phone. When a call lands and nobody can grab it, OneBy's AI picks up, gets the address and the symptom, and drops a ready-to-dispatch task in your queue. From there the same platform schedules the tech, invoices the job, and texts the arrival window, so the whole job runs in one place.",
    heroStat: { stat: "+31%", label: "more service calls booked" },
    pains: [
      {
        title: "Peak season buries the front desk",
        body: "The first 90° day brings 200 calls. Every one that hits voicemail is a customer dialing your competitor before you've finished the job you're already on.",
      },
      {
        title: "After-hours emergencies walk",
        body: "No heat at 9pm is somebody's same-night job. If your line just rings and rings, that emergency premium goes to whoever picks up first.",
      },
      {
        title: "Vague voicemails waste truck rolls",
        body: "“Call me back about my AC” tells your dispatcher exactly nothing. OneBy grabs the unit, the symptom, and the access details up front.",
      },
    ],
    scenarioCaller:
      "Upstairs unit stopped cooling overnight, home after 3pm, existing customer.",
    scenarioSummary:
      "Existing customer. Upstairs A/C not cooling since last night. Available after 3pm. Wants a same-day diagnostic.",
    scenarioTask: "Schedule A/C diagnostic (assign to Dispatch, due today)",
    outcomes: [
      { stat: "24/7", label: "after-hours coverage with no answering service" },
      { stat: "8 sec", label: "from missed call to owner notification" },
      { stat: "0", label: "leads lost to a full voicemail box" },
    ],
    capabilities: [
      {
        title: "Captures the right job details",
        body: "Unit type, symptom, address, urgency. The stuff your dispatcher actually needs to send the right tech.",
      },
      {
        title: "Routes emergencies instantly",
        body: "No-heat and no-cool calls flag as urgent and ping on-call staff the second they land.",
      },
      {
        title: "Books while you sleep",
        body: "After-hours and overflow calls turn into morning tasks, already triaged and ready to dispatch.",
      },
    ],
    faqs: [
      {
        q: "Can OneBy handle emergency no-cool and no-heat calls?",
        a: "Yes. The AI hears the urgency, flags the call as an emergency, and pings your on-call team right away while logging every detail for the dispatcher.",
      },
      {
        q: "Will it work with my existing dispatch software?",
        a: "OneBy creates structured tasks you can act on directly, and on Solo and Pro plans it plugs into popular field-service tools to keep jobs in sync.",
      },
      {
        q: "Do I have to change my phone number?",
        a: "Nope. Keep your number. We forward unanswered and after-hours calls to OneBy so nothing slips by.",
      },
      {
        q: "Does the AI sound like a robot?",
        a: "Not at all. It answers in a natural, professional voice and most callers just feel taken care of, while you get a clean summary and a task.",
      },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing Companies",
    shortName: "Plumbing",
    group: "Home Services",
    priority: true,
    icon: "Droplets",
    metaTitle: "AI Receptionist & Call Answering for Plumbers",
    metaDescription:
      "Burst pipes don't check your business hours. OneBy answers every plumbing call, grabs the emergency details, and creates the job on its own, 24/7.",
    keywords: [
      "plumber answering service",
      "plumbing AI receptionist",
      "plumber call answering",
      "emergency plumbing calls",
      "plumbing scheduling software",
    ],
    heroEyebrow: "Built for plumbing",
    heroTitle: "A burst pipe can't wait for a callback.",
    heroSub:
      "Plumbing emergencies love midnight, Sundays, and the exact moment you're under a sink across town. OneBy answers, calms the customer down, gets what's flooding and where, and turns it into an urgent job your team can act on. Then it books the visit, sends the quote, and collects payment, all without leaving the platform.",
    heroStat: { stat: "4 hrs", label: "saved per day on callbacks" },
    pains: [
      {
        title: "Emergencies go to whoever answers first",
        body: "A flooding basement is a right-now problem. If your line rings out, that high-ticket emergency call is gone inside 30 seconds.",
      },
      {
        title: "You can't answer with two hands in a job",
        body: "Mid-repair, you can't drop everything to take a call. OneBy makes sure the next customer still gets a real answer.",
      },
      {
        title: "Weekend and night calls slip away",
        body: "Without someone answering 24/7, your most profitable leads (the after-hours ones) quietly leak to competitors.",
      },
    ],
    scenarioCaller:
      "Water heater leaking into the garage, needs someone today, has a shutoff valve.",
    scenarioSummary:
      "Leaking water heater flooding the garage. Customer already found the shutoff. Wants same-day service.",
    scenarioTask: "Dispatch water-heater leak (urgent, assign on-call tech)",
    outcomes: [
      { stat: "24/7", label: "emergency call coverage" },
      { stat: "100%", label: "of calls answered, even mid-job" },
      { stat: "+28%", label: "after-hours jobs captured" },
    ],
    capabilities: [
      {
        title: "Triages emergencies first",
        body: "Floods, leaks, and no-water calls get flagged urgent and pushed to your on-call tech instantly.",
      },
      {
        title: "Guides the caller",
        body: "The AI can ask for the basics, like where the leak is and whether the water's shut off, so your tech shows up ready.",
      },
      {
        title: "One timeline per customer",
        body: "Every call, text, and job for an address sits in one place, so repeat customers never have to re-explain a thing.",
      },
    ],
    faqs: [
      {
        q: "Can it tell an emergency from a routine call?",
        a: "Yes. OneBy reads intent and urgency, flags the true emergencies, and pings your on-call team right away while routine requests become scheduled tasks.",
      },
      {
        q: "What happens to after-hours calls?",
        a: "The AI answers them live, captures detailed tasks, and notifies your team. So a 2am burst pipe is a booked job by morning, or sooner if it can't wait.",
      },
      {
        q: "Can customers text us too?",
        a: "Yep. OneBy comes with a shared business SMS inbox, so texts and calls live together instead of getting stranded on one person's phone.",
      },
      {
        q: "How fast can we go live?",
        a: "Most plumbing teams are live the same day. Connect your number, set your hours and on-call routing, and you're capturing calls in minutes.",
      },
    ],
  },
  {
    slug: "electricians",
    name: "Electricians",
    shortName: "Electrical",
    group: "Home Services",
    icon: "Zap",
    metaTitle: "AI Call Answering for Electricians & Electrical Contractors",
    metaDescription:
      "From panel upgrades to power outages, OneBy answers every electrical call, captures the scope, and creates the job, so you never miss a quote request.",
    keywords: [
      "electrician answering service",
      "electrical contractor AI receptionist",
      "electrician call answering",
      "electrical lead capture",
    ],
    heroEyebrow: "Built for electrical",
    heroTitle: "Stop letting quote requests ring out.",
    heroSub:
      "Panel upgrades, EV chargers, outages, inspections. Electrical leads are worth real money and easy to lose. OneBy answers the call, captures the scope and the property details, and turns it into a quote-ready task. From the same place you send the estimate, schedule the work, and invoice it when the job is done.",
    heroStat: { stat: "+34%", label: "more estimate requests captured" },
    pains: [
      {
        title: "High-ticket jobs hang up fast",
        body: "A homeowner pricing a panel upgrade calls three electricians. The one who actually picks up gets the estimate.",
      },
      {
        title: "Safety calls can't wait",
        body: "Sparking outlets and partial outages are urgent. A missed call here costs you revenue and leaves a worried customer hanging.",
      },
      {
        title: "Scope gets lost in voicemail",
        body: "“Need an electrician” isn't a quote. OneBy captures the actual job scope so you can price and schedule it right.",
      },
    ],
    scenarioCaller:
      "Wants a quote to add an EV charger in the garage, 200A panel, evenings best.",
    scenarioSummary:
      "Estimate request: install a Level 2 EV charger in the attached garage, existing 200A panel. Prefers evening appointments.",
    scenarioTask: "Schedule EV charger estimate (assign to estimator)",
    outcomes: [
      { stat: "24/7", label: "coverage for urgent electrical calls" },
      { stat: "100%", label: "of quote requests captured" },
      { stat: "8 sec", label: "to owner notification on new leads" },
    ],
    capabilities: [
      {
        title: "Captures full job scope",
        body: "Service type, panel size, property details, timing. Everything your estimator needs to put a number on it.",
      },
      {
        title: "Flags safety urgency",
        body: "Sparking, burning smells, and outages get recognized as urgent and escalated on the spot.",
      },
      {
        title: "Quote-ready tasks",
        body: "Every lead becomes an assigned task with context, so your estimates go out before the competition's.",
      },
    ],
    faqs: [
      {
        q: "Can it qualify quote requests?",
        a: "Yes. The AI grabs service type, scope, and property details so your estimator has what they need before the callback.",
      },
      {
        q: "Will urgent safety calls get escalated?",
        a: "Absolutely. Outages and safety hazards get flagged urgent and your on-call team hears about it right away.",
      },
      {
        q: "Does it work alongside our scheduling tools?",
        a: "Yep. OneBy creates structured tasks and plugs into popular field-service software on Solo and Pro plans.",
      },
      {
        q: "Can we keep our current number?",
        a: "Of course. Keep your number and forward unanswered or after-hours calls to OneBy.",
      },
    ],
  },
  {
    slug: "roofing",
    name: "Roofing Companies",
    shortName: "Roofing",
    group: "Home Services",
    priority: true,
    icon: "Home",
    metaTitle: "AI Receptionist for Roofing Companies & Contractors",
    metaDescription:
      "Storm season floods your phone. OneBy answers every roofing call, captures the damage and address, and creates the inspection task, so no lead slips through.",
    keywords: [
      "roofing answering service",
      "roofing AI receptionist",
      "roofer call answering",
      "storm damage leads",
      "roofing lead capture",
    ],
    heroEyebrow: "Built for roofing",
    heroTitle: "Catch every storm-season lead.",
    heroSub:
      "When a storm rolls through, the phone doesn't stop. OneBy answers every call, captures the damage details and the address, and books the inspection, so you fill the schedule instead of the voicemail box. Then OneBy tickets the job, schedules the crew, and invoices the work, start to finish in one platform.",
    heroStat: { stat: "+40%", label: "more inspections booked after storms" },
    pains: [
      {
        title: "Storm spikes overwhelm the office",
        body: "One hailstorm can 10x your call volume in a day. Every call you miss is a roof someone else gets to inspect.",
      },
      {
        title: "Leads have a short shelf life",
        body: "A homeowner with a leak keeps dialing until someone picks up. Speed to lead wins the job.",
      },
      {
        title: "Crews can't field calls from a roof",
        body: "Your team is working, not answering. OneBy keeps the pipeline full while they stay on the job.",
      },
    ],
    scenarioCaller:
      "Missing shingles and a ceiling stain after last night's hailstorm, wants an inspection.",
    scenarioSummary:
      "Storm damage: missing shingles and an interior ceiling stain after hail. Wants a roof inspection this week.",
    scenarioTask: "Book roof inspection (assign to field estimator)",
    outcomes: [
      { stat: "10x", label: "call surges handled without extra staff" },
      { stat: "100%", label: "of storm leads captured" },
      { stat: "8 sec", label: "to notify your team of a new lead" },
    ],
    capabilities: [
      {
        title: "Scales with storm volume",
        body: "The AI answers every call at once. No busy signals, no overflow to voicemail right when it matters most.",
      },
      {
        title: "Captures damage details",
        body: "Type of damage, address, and insurance context, all ready for your inspector.",
      },
      {
        title: "Speed-to-lead built in",
        body: "Owners and estimators get notified instantly, so you reach storm leads before competitors do.",
      },
    ],
    faqs: [
      {
        q: "Can it handle a sudden storm call surge?",
        a: "Yes. The AI answers unlimited simultaneous calls, so a hailstorm spike never dumps customers into voicemail.",
      },
      {
        q: "Does it capture insurance details?",
        a: "It captures the context you configure, including damage type and whether the homeowner is filing a claim, so your estimator shows up prepared.",
      },
      {
        q: "Can we keep our number and just forward overflow?",
        a: "Yep. Forward unanswered and after-hours calls to OneBy while keeping your existing line.",
      },
      {
        q: "How quickly are we notified of a new lead?",
        a: "Within seconds. Owners and estimators get a notification the moment a lead is captured.",
      },
    ],
  },
  {
    slug: "restoration",
    name: "Restoration Companies",
    shortName: "Restoration",
    group: "Home Services",
    icon: "Waves",
    metaTitle: "24/7 AI Call Answering for Water & Fire Restoration",
    metaDescription:
      "Restoration is an emergency business. OneBy answers every call day or night, captures the loss details, and dispatches the job, so you win the first-call advantage.",
    keywords: [
      "restoration answering service",
      "water damage AI receptionist",
      "fire restoration call answering",
      "24/7 restoration calls",
    ],
    heroEyebrow: "Built for restoration",
    heroTitle: "In restoration, the first call answered wins the job.",
    heroSub:
      "Water, fire, and mold losses are emergencies, and they almost always go to the company that picks up first. OneBy answers 24/7, captures the loss details, and dispatches instantly so you're on site before anyone else. The same platform tracks the job, schedules the crew, and invoices the loss, all in one place.",
    heroStat: { stat: "24/7", label: "live emergency answering" },
    pains: [
      {
        title: "Every minute is billable urgency",
        body: "A flooded home needs mitigation now. The first person to answer the phone usually walks away with the contract.",
      },
      {
        title: "Night and weekend losses are the norm",
        body: "Disasters don't keep business hours. Without 24/7 coverage, your best jobs end up at a competitor's answering service.",
      },
      {
        title: "Insurance details get muddled",
        body: "Loss type, cause, and timeline all matter for the claim. OneBy captures them cleanly on the first call.",
      },
    ],
    scenarioCaller:
      "Basement flooded from a supply line break two hours ago, standing water, needs mitigation now.",
    scenarioSummary:
      "Water loss: supply line break, standing water in basement for about 2 hrs. Wants emergency mitigation tonight.",
    scenarioTask: "Dispatch emergency water mitigation (notify on-call crew now)",
    outcomes: [
      { stat: "24/7", label: "live answering, every loss" },
      { stat: "100%", label: "of emergency calls captured" },
      { stat: "1st", label: "to respond beats the competition" },
    ],
    capabilities: [
      {
        title: "Always-on emergency answering",
        body: "Every call answered live, any hour, with instant escalation to your on-call crew.",
      },
      {
        title: "Captures the loss cleanly",
        body: "Loss type, cause, timing, and property details, all structured for dispatch and the eventual claim.",
      },
      {
        title: "Instant dispatch notifications",
        body: "Your crew gets alerted the second a loss is logged, so trucks roll faster.",
      },
    ],
    faqs: [
      {
        q: "Is the answering truly 24/7?",
        a: "Yes. OneBy answers every call live around the clock and escalates emergencies to your on-call crew right away.",
      },
      {
        q: "Can it capture the details we need for claims?",
        a: "Yes. Loss type, cause, timing, and property context all get captured on the first call and saved to the customer timeline.",
      },
      {
        q: "How does dispatch get notified?",
        a: "Your on-call crew hears about it within seconds of a loss being logged, with the full summary attached.",
      },
      {
        q: "Do we keep our existing number?",
        a: "Yep. Keep your number and route after-hours and overflow calls to OneBy.",
      },
    ],
  },
  {
    slug: "garage-door",
    name: "Garage Door Companies",
    shortName: "Garage Door",
    group: "Home Services",
    icon: "DoorOpen",
    metaTitle: "AI Receptionist for Garage Door Repair Companies",
    metaDescription:
      "A stuck garage door is a same-day call. OneBy answers it, captures the door type and issue, and books the repair, so you never miss a service request.",
    keywords: [
      "garage door answering service",
      "garage door AI receptionist",
      "garage door repair calls",
      "garage door lead capture",
    ],
    heroEyebrow: "Built for garage doors",
    heroTitle: "A car stuck in the garage is a same-day job.",
    heroSub:
      "Broken springs and stuck doors are urgent, high-intent calls. OneBy answers every one, captures the door type and the symptom, and books the repair before the customer dials the next company on the list. From there it schedules the tech, sends the invoice, and texts the customer, the whole job in one place.",
    heroStat: { stat: "+27%", label: "more same-day repairs booked" },
    pains: [
      {
        title: "Stuck-door calls won't wait",
        body: "A customer who can't get their car out is calling everyone in town. First to answer wins.",
      },
      {
        title: "Techs are on jobs, not by the phone",
        body: "Your installers are heads-down working. OneBy makes sure the next call still books.",
      },
      {
        title: "Wrong parts mean wasted trips",
        body: "Door type, spring vs. opener, brand. OneBy grabs it all so your tech rolls up with the right parts.",
      },
    ],
    scenarioCaller:
      "Garage door won't open, broken spring, car stuck inside, needs same-day service.",
    scenarioSummary:
      "Broken torsion spring: door won't open, vehicle trapped inside. Wants same-day repair.",
    scenarioTask: "Book same-day spring repair (assign nearest tech)",
    outcomes: [
      { stat: "100%", label: "of service calls answered" },
      { stat: "8 sec", label: "to notify your team" },
      { stat: "0", label: "same-day jobs lost to voicemail" },
    ],
    capabilities: [
      {
        title: "Captures the right repair details",
        body: "Door type, spring vs. opener, brand, and symptom, so techs roll out with the right parts.",
      },
      {
        title: "Prioritizes stuck-door urgency",
        body: "Trapped-vehicle and security-risk calls get flagged for fast scheduling.",
      },
      {
        title: "Books overflow automatically",
        body: "Calls you can't get to turn into scheduled jobs instead of missed revenue.",
      },
    ],
    faqs: [
      {
        q: "Does it capture the door and part details?",
        a: "Yes. Door type, spring vs. opener, brand, and symptom all get captured so your tech brings the right parts.",
      },
      {
        q: "Can it prioritize trapped-vehicle calls?",
        a: "Yep. Urgent stuck-door situations get flagged for same-day scheduling and your team hears about it right away.",
      },
      {
        q: "Will it work with our scheduling system?",
        a: "OneBy creates structured tasks and plugs into popular field-service tools on Solo and Pro plans.",
      },
      {
        q: "Do we keep our phone number?",
        a: "Yes. Keep your number and forward unanswered calls to OneBy.",
      },
    ],
  },
  {
    slug: "pest-control",
    name: "Pest Control Companies",
    shortName: "Pest Control",
    group: "Home Services",
    icon: "Bug",
    metaTitle: "AI Call Answering for Pest Control Companies",
    metaDescription:
      "OneBy answers every pest control call, captures the pest and property details, and books the treatment, so urgent infestations never reach voicemail.",
    keywords: [
      "pest control answering service",
      "pest control AI receptionist",
      "pest control call answering",
      "pest control scheduling",
    ],
    heroEyebrow: "Built for pest control",
    heroTitle: "An infestation is an emotional, urgent call.",
    heroSub:
      "Someone staring at a wasp nest or bed bugs wants help today, not tomorrow. OneBy answers, captures the pest and the property details, and books the treatment, turning anxious callers into scheduled jobs. Then OneBy schedules the route, invoices the visit, and texts reminders, all from one platform.",
    heroStat: { stat: "+25%", label: "more treatments scheduled" },
    pains: [
      {
        title: "Urgent pests can't wait for a callback",
        body: "Stinging insects and bed bugs are emotional, right-now calls. Voicemail loses them in minutes.",
      },
      {
        title: "Route techs can't answer mid-treatment",
        body: "Your team is treating homes, not fielding calls. OneBy keeps the schedule filling up.",
      },
      {
        title: "Recurring plans get dropped",
        body: "A missed call about quarterly service quietly churns revenue. OneBy keeps every request on the timeline.",
      },
    ],
    scenarioCaller:
      "Wasp nest by the front door, kids allergic, wants someone out today.",
    scenarioSummary:
      "Active wasp nest at the front entry, household member with an allergy. Wants same-day treatment.",
    scenarioTask: "Schedule same-day wasp treatment (assign nearest route tech)",
    outcomes: [
      { stat: "100%", label: "of calls answered, even on route" },
      { stat: "8 sec", label: "to team notification" },
      { stat: "+25%", label: "more jobs booked" },
    ],
    capabilities: [
      {
        title: "Captures pest and property details",
        body: "Pest type, location, severity, plus any allergy or safety notes, all ready for the route tech.",
      },
      {
        title: "Flags urgent infestations",
        body: "Stinging insects, rodents, and bed bugs get bumped up for fast scheduling.",
      },
      {
        title: "Supports recurring revenue",
        body: "Every call about quarterly or annual plans becomes a tracked task, so renewals don't slip away.",
      },
    ],
    faqs: [
      {
        q: "Can it prioritize urgent pests?",
        a: "Yes. Stinging insects, rodents, and bed bug calls get flagged for same-day scheduling and your team hears about it immediately.",
      },
      {
        q: "Does it capture safety and allergy notes?",
        a: "Yes. The AI captures the details you configure, including allergies and pets, so your tech shows up prepared.",
      },
      {
        q: "Can it help with recurring service plans?",
        a: "Every request becomes a tracked task on the customer timeline, so recurring service and renewals don't fall through the cracks.",
      },
      {
        q: "Do we keep our number?",
        a: "Yep. Keep your line and route unanswered calls to OneBy.",
      },
    ],
  },
  {
    slug: "property-management",
    name: "Property Management",
    shortName: "Property Mgmt",
    group: "More Verticals",
    priority: true,
    icon: "Building2",
    metaTitle: "AI Call Answering & Maintenance Intake for Property Managers",
    metaDescription:
      "OneBy answers every tenant call, captures the maintenance issue and unit, and creates a tracked ticket on its own, so nothing slips through across your portfolio.",
    keywords: [
      "property management answering service",
      "tenant maintenance intake",
      "property manager AI receptionist",
      "maintenance request software",
    ],
    heroEyebrow: "Built for property management",
    heroTitle: "Every tenant call becomes a tracked ticket.",
    heroSub:
      "Across hundreds of units, the tenant calls never stop. Leaks, lockouts, no heat, noise. OneBy answers each one, captures the unit and the issue, and spins up a routed maintenance ticket on its own, so nothing slips between buildings. From there the ticket schedules the tech, tracks the work, and invoices the owner, all in one place.",
    heroStat: { stat: "0", label: "missed maintenance requests" },
    pains: [
      {
        title: "Volume scatters across the portfolio",
        body: "With 600 units, the phone never stops. A maintenance call you miss today is a bigger, pricier problem tomorrow.",
      },
      {
        title: "After-hours emergencies create liability",
        body: "No heat or a burst pipe at night can't wait. Miss it and you're risking the property and the tenant relationship.",
      },
      {
        title: "Requests get lost between buildings",
        body: "Sticky notes and voicemails don't scale. OneBy turns every call into a routed, trackable ticket.",
      },
    ],
    scenarioCaller:
      "Tenant in unit 4B reports no hot water since this morning, available all day.",
    scenarioSummary:
      "Unit 4B: no hot water since this morning. Tenant available all day for access.",
    scenarioTask: "Create maintenance ticket (no hot water, Unit 4B, route to plumber)",
    outcomes: [
      { stat: "24/7", label: "tenant call coverage" },
      { stat: "100%", label: "of requests captured as tickets" },
      { stat: "0", label: "lost or duplicated requests" },
    ],
    capabilities: [
      {
        title: "Automatic maintenance intake",
        body: "Unit, issue, urgency, and access details captured and turned into a routed ticket. No front-desk bottleneck.",
      },
      {
        title: "Routes by property and vendor",
        body: "Tickets land with the right manager or vendor automatically, so the right person can act fast.",
      },
      {
        title: "A timeline per unit and tenant",
        body: "Every call, text, and request for an address in one place, ready for audits and owner reports.",
      },
    ],
    faqs: [
      {
        q: "Can it route tickets by property or vendor?",
        a: "Yes. OneBy routes each maintenance ticket to the right manager or vendor based on the property and issue type.",
      },
      {
        q: "Does it cover after-hours emergencies?",
        a: "Yes. Emergencies like no heat or active leaks get flagged urgent 24/7 and escalated to your on-call contact right away.",
      },
      {
        q: "Will it integrate with our PM software?",
        a: "OneBy creates structured tickets and plugs into popular property-management platforms on Solo and Pro plans.",
      },
      {
        q: "Can tenants text in requests too?",
        a: "Yep. The shared SMS inbox captures texts alongside calls, so every request lives in one timeline.",
      },
    ],
  },
  {
    slug: "msp-it",
    name: "MSPs & IT Services",
    shortName: "MSP / IT",
    group: "More Verticals",
    icon: "Server",
    metaTitle: "AI Call Answering & Ticket Intake for MSPs and IT Providers",
    metaDescription:
      "OneBy answers support calls, captures the issue and account, and creates a ticket with context, so your MSP never misses an SLA on an inbound call.",
    keywords: [
      "MSP answering service",
      "IT support call answering",
      "MSP AI receptionist",
      "help desk ticket intake",
    ],
    heroEyebrow: "Built for MSPs & IT",
    heroTitle: "Turn every support call into a ticket with context.",
    heroSub:
      "When a client's network goes down, they call. OneBy answers, figures out the account and the issue, and creates a triaged ticket, so SLAs hold even when your techs are heads-down on another incident. The same platform schedules the work, tracks it to resolution, and invoices the account.",
    heroStat: { stat: "100%", label: "of inbound issues ticketed" },
    pains: [
      {
        title: "Techs are deep in another incident",
        body: "Your engineers can't drop a critical fix to grab the phone. OneBy makes sure the next client still gets through.",
      },
      {
        title: "SLA clocks start at first contact",
        body: "A missed call is a missed SLA. Capturing every issue the moment it lands protects your agreements.",
      },
      {
        title: "Context gets lost in callbacks",
        body: "“It's broken” isn't a ticket. OneBy captures the account, the system, and the symptom up front.",
      },
    ],
    scenarioCaller:
      "Caller from Northwind Co. reports the whole office can't reach email since 9am.",
    scenarioSummary:
      "Northwind Co.: office-wide email outage since 9am, affecting all staff. Priority incident.",
    scenarioTask: "Create P1 ticket (Northwind email outage, escalate to on-call engineer)",
    outcomes: [
      { stat: "24/7", label: "inbound coverage for clients" },
      { stat: "100%", label: "of calls captured as tickets" },
      { stat: "8 sec", label: "to escalate a priority incident" },
    ],
    capabilities: [
      {
        title: "Account-aware intake",
        body: "Identifies the client and captures the affected system and symptom, so tickets land with real context.",
      },
      {
        title: "Priority escalation",
        body: "Outages and P1 incidents get flagged and pushed straight to your on-call engineer.",
      },
      {
        title: "Clean ticket handoff",
        body: "Every call becomes a structured ticket, ready to drop into your PSA on Solo and Pro plans.",
      },
    ],
    faqs: [
      {
        q: "Can it identify which client is calling?",
        a: "Yes. OneBy captures the account and affected systems so the ticket carries the context your engineers need.",
      },
      {
        q: "How are priority incidents handled?",
        a: "Outages and P1 issues get flagged and escalated to your on-call engineer within seconds.",
      },
      {
        q: "Does it integrate with our PSA?",
        a: "OneBy creates structured tickets and plugs into popular PSA and ticketing tools on Solo and Pro plans.",
      },
      {
        q: "Can we route by time of day?",
        a: "Yep. Set up business-hours, after-hours, and on-call routing so the right person always gets the ping.",
      },
    ],
  },
  {
    slug: "law-firms",
    name: "Small Law Firms",
    shortName: "Law Firms",
    group: "More Verticals",
    icon: "Scale",
    metaTitle: "AI Receptionist & Client Intake for Small Law Firms",
    metaDescription:
      "OneBy answers every call, qualifies the matter, and captures intake details, so your firm books consultations without paying for a live answering service.",
    keywords: [
      "law firm answering service",
      "legal client intake",
      "attorney AI receptionist",
      "law firm call answering",
    ],
    heroEyebrow: "Built for law firms",
    heroTitle: "Capture every new matter, even in court.",
    heroSub:
      "A prospective client who hits voicemail just dials the next firm on the list. OneBy answers, qualifies the matter, and captures the intake details, so you book consultations while you're still in session. Then it schedules the consult, tracks the matter, and invoices the client, all in one place.",
    heroStat: { stat: "+35%", label: "more consultations booked" },
    pains: [
      {
        title: "You can't answer from the courtroom",
        body: "When you're in court or with a client, new-matter calls go unanswered, and prospects rarely bother leaving a message.",
      },
      {
        title: "Intake details get lost",
        body: "Matter type, jurisdiction, and timing all matter. OneBy captures them cleanly on the first call.",
      },
      {
        title: "Answering services are costly and generic",
        body: "Live services charge by the minute and rarely qualify the matter. OneBy does it for you.",
      },
    ],
    scenarioCaller:
      "Prospective client in a car accident two weeks ago, other driver at fault, seeking representation.",
    scenarioSummary:
      "Potential PI matter: auto accident about 2 weeks ago, caller says the other driver was at fault. Seeking representation.",
    scenarioTask: "Schedule intake consultation (PI matter, assign to intake attorney)",
    outcomes: [
      { stat: "24/7", label: "intake coverage" },
      { stat: "100%", label: "of new-matter calls captured" },
      { stat: "0", label: "prospects lost to voicemail" },
    ],
    capabilities: [
      {
        title: "Qualifies the matter",
        body: "Matter type, jurisdiction, and timing all captured so you know which calls to prioritize.",
      },
      {
        title: "Professional first impression",
        body: "A natural, courteous voice greets every caller, with none of that generic answering-service feel.",
      },
      {
        title: "Confidential, organized intake",
        body: "Each new matter becomes a structured task on the client timeline, ready for your intake team.",
      },
    ],
    faqs: [
      {
        q: "Can it qualify a potential matter?",
        a: "Yes. OneBy captures matter type, jurisdiction, and timing so your intake team can prioritize the right calls.",
      },
      {
        q: "Is it more affordable than a live answering service?",
        a: "Yes. No per-minute charges, and the AI actually qualifies the matter instead of just scribbling down a message.",
      },
      {
        q: "Is the intake information kept organized?",
        a: "Every new matter becomes a structured task on the client timeline, ready for follow-up.",
      },
      {
        q: "Can we keep our existing number?",
        a: "Yep. Keep your number and route unanswered or after-hours calls to OneBy.",
      },
    ],
  },
  {
    slug: "medical-offices",
    name: "Medical Offices",
    shortName: "Medical",
    group: "More Verticals",
    icon: "Stethoscope",
    metaTitle: "AI Call Answering for Medical & Dental Offices",
    metaDescription:
      "OneBy handles overflow and after-hours calls for medical offices, captures the reason for the call, and creates a task your front desk can act on.",
    keywords: [
      "medical office answering service",
      "medical practice AI receptionist",
      "patient call overflow",
      "dental office call answering",
    ],
    heroEyebrow: "Built for medical & dental",
    heroTitle: "Handle overflow without overwhelming the front desk.",
    heroSub:
      "When every line is busy, patients get hold music or voicemail. OneBy answers the overflow, captures the reason for the call, and creates a task your front desk can clear quickly, so no patient is left waiting. The same platform schedules the visit, texts reminders, and keeps every call on the patient's record.",
    heroStat: { stat: "0", label: "patients stuck in voicemail" },
    pains: [
      {
        title: "Front desks get slammed at peak",
        body: "Monday mornings and lunch hours bury the staff. Overflow calls hit voicemail and patients just give up.",
      },
      {
        title: "After-hours calls need triage",
        body: "Patients call after close with real needs. OneBy captures them so nothing sits unaddressed until morning.",
      },
      {
        title: "Callbacks pile up",
        body: "Messages with no context turn into endless phone tag. OneBy grabs the reason up front.",
      },
    ],
    scenarioCaller:
      "Existing patient needs to reschedule Thursday's appointment and refill a prescription.",
    scenarioSummary:
      "Existing patient: wants to reschedule Thursday's appointment and needs a prescription refill.",
    scenarioTask: "Front-desk task (reschedule appt + refill request, call back)",
    outcomes: [
      { stat: "24/7", label: "overflow & after-hours coverage" },
      { stat: "100%", label: "of calls answered, never voicemail" },
      { stat: "Less", label: "phone tag, thanks to context-rich tasks" },
    ],
    capabilities: [
      {
        title: "Overflow answering",
        body: "When the front desk is slammed, OneBy picks up instead of dumping patients into hold or voicemail.",
      },
      {
        title: "Captures the reason for the call",
        body: "Scheduling, refills, billing, or questions. Each one becomes a clear task your staff can clear quickly.",
      },
      {
        title: "Reduces phone tag",
        body: "Context-rich tasks mean fewer rounds of callbacks and a faster response for the patient.",
      },
    ],
    faqs: [
      {
        q: "Is OneBy a substitute for clinical triage?",
        a: "No. OneBy captures the reason for the call and creates a task for your staff. It doesn't give medical advice or clinical triage, and for emergencies it points callers to the right care.",
      },
      {
        q: "Can it handle scheduling and refill requests?",
        a: "Yes. It captures the request as a clear task (reschedule, refill, billing question) so your front desk can act quickly.",
      },
      {
        q: "Does it help during peak call times?",
        a: "Yes. OneBy answers the overflow when every line is busy, so patients never get stranded in voicemail.",
      },
      {
        q: "Can we keep our current phone system?",
        a: "Yep. Keep your number and route overflow and after-hours calls to OneBy.",
      },
    ],
  },
  {
    slug: "dental",
    name: "Dental Practices",
    shortName: "Dental",
    group: "More Verticals",
    icon: "Smile",
    metaTitle: "AI Receptionist & Call Answering for Dental Practices",
    metaDescription:
      "OneBy answers the calls your front desk can't, captures why the patient is calling, and books the visit, so no new patient lands in voicemail.",
    keywords: [
      "dental answering service",
      "dental AI receptionist",
      "dental office call answering",
      "new patient phone calls",
      "dental appointment scheduling",
    ],
    heroEyebrow: "Built for dental",
    heroTitle: "Never send a new patient to voicemail.",
    heroSub:
      "Your front desk can only hold so many lines at once. When the phones stack up at lunch or after close, OneBy's AI answers, captures why the patient is calling, and books or routes the visit, so a new patient never hangs up and calls the practice down the street. The same platform schedules the chair, sends the reminder, and keeps every call on the patient's record.",
    heroStat: { stat: "+30%", label: "more new patients booked" },
    pains: [
      {
        title: "Peak hours bury the front desk",
        body: "Mondays and lunch breaks stack the lines. A new patient who hits hold music just dials the next office on their list.",
      },
      {
        title: "New patients are worth too much to miss",
        body: "A single new patient can be worth thousands over the years. Losing that call to voicemail is the most expensive miss in the practice.",
      },
      {
        title: "After-hours calls go cold",
        body: "A cracked tooth on a Friday night becomes a Monday patient for whoever picks up. If your line just rings, that visit walks.",
      },
    ],
    scenarioCaller:
      "New patient chipped a front tooth, in mild pain, wants to be seen today, has PPO insurance.",
    scenarioSummary:
      "New patient chipped a front tooth, mild pain, wants the earliest same-day visit. Has PPO coverage and will bring insurance details.",
    scenarioTask: "Book emergency exam (new patient, same day, verify PPO benefits)",
    outcomes: [
      { stat: "0", label: "new patients lost to voicemail" },
      { stat: "24/7", label: "overflow & after-hours coverage" },
      { stat: "8 sec", label: "from missed call to front-desk task" },
    ],
    capabilities: [
      {
        title: "Catches overflow and after-hours",
        body: "When every line is busy or the office is closed, OneBy answers instead of dropping the patient into hold or voicemail.",
      },
      {
        title: "Captures the reason for the call",
        body: "New patient, emergency, reschedule, or an insurance question. Each becomes a clear task your front desk can clear fast.",
      },
      {
        title: "Protects new-patient calls",
        body: "First-time callers get a warm, professional answer and a booked or routed visit, not a beep.",
      },
    ],
    faqs: [
      {
        q: "Does OneBy give dental or medical advice?",
        a: "No. OneBy captures why the patient is calling and creates a task for your team. It does not provide clinical advice or triage, and it points true emergencies to urgent or emergency care.",
      },
      {
        q: "Can it handle scheduling and reschedules?",
        a: "Yes. It captures the request as a clear task (new patient, reschedule, emergency, billing question) so your front desk can act quickly, and on Solo and Pro it plugs into popular practice tools.",
      },
      {
        q: "Does it help during the lunch rush?",
        a: "Yes. OneBy answers the overflow when every line is busy, so patients are never stranded in hold music or voicemail.",
      },
      {
        q: "Can we keep our current phone number?",
        a: "Yep. Keep your number and route overflow and after-hours calls to OneBy.",
      },
    ],
  },
  {
    slug: "barber",
    name: "Barbershops & Salons",
    shortName: "Barber",
    group: "More Verticals",
    icon: "Scissors",
    metaTitle: "AI Receptionist & Booking Line for Barbershops & Salons",
    metaDescription:
      "When your barbers are cutting, OneBy answers the phone, books the chair, and captures the service and preferred barber, so no booking rings out.",
    keywords: [
      "barbershop answering service",
      "barbershop booking software",
      "salon AI receptionist",
      "barber appointment scheduling",
      "barbershop missed calls",
    ],
    heroEyebrow: "Built for barbershops",
    heroTitle: "Every missed call is a chair someone else filled.",
    heroSub:
      "When your hands are in a fade, you can't grab the phone. OneBy answers, books the chair, and captures the service and the barber they want, so the booking lands on your calendar instead of the shop down the block. The same platform confirms the appointment, sends the reminder, and rebooks the cancellations that would have gone empty.",
    heroStat: { stat: "+22%", label: "more bookings captured" },
    pains: [
      {
        title: "You can't cut hair and answer the phone",
        body: "Every barber is mid-cut when the phone rings. That call rolls to voicemail, and most people don't leave one, they just book somewhere else.",
      },
      {
        title: "No-shows leave chairs empty",
        body: "A forgotten appointment is money you can't get back. Without confirmations and reminders, the gaps add up fast.",
      },
      {
        title: "Cancellations go unfilled",
        body: "A late cancel is a chance to rebook, but only if someone catches it and works the waitlist before the slot goes cold.",
      },
    ],
    scenarioCaller:
      "Regular client wants a skin fade and beard trim before an event Friday, wants his usual barber.",
    scenarioSummary:
      "Regular client, skin fade and beard trim, wants his usual barber before an event Friday. Flexible on the exact time.",
    scenarioTask: "Book fade + beard with preferred barber (Friday, confirm the time)",
    outcomes: [
      { stat: "0", label: "bookings lost while you're cutting" },
      { stat: "24/7", label: "booking line, even after close" },
      { stat: "Fewer", label: "no-shows with auto confirmations" },
    ],
    capabilities: [
      {
        title: "Books the chair while you work",
        body: "The AI answers every call, captures the service and preferred barber, and puts the appointment on your calendar.",
      },
      {
        title: "Cuts down no-shows",
        body: "Automatic confirmations and reminders keep appointments, and a late cancellation becomes a task to rebook the slot.",
      },
      {
        title: "One place for every client",
        body: "Calls, texts, and visits for each client sit together, so regulars never have to re-explain what they want.",
      },
    ],
    faqs: [
      {
        q: "Can it book with a specific barber?",
        a: "Yes. OneBy captures the service and the barber the client wants and creates the booking task, so the right chair gets filled.",
      },
      {
        q: "Will it help with no-shows?",
        a: "Yes. Automatic confirmations and reminders reduce no-shows, and a late cancellation becomes a task to rebook the slot.",
      },
      {
        q: "Can clients text to book?",
        a: "Yep. OneBy includes a shared business SMS inbox, so texts and calls live in one place instead of one person's phone.",
      },
      {
        q: "Do we keep our number?",
        a: "Of course. Keep your number and forward unanswered and after-hours calls to OneBy.",
      },
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping & Lawn Care",
    shortName: "Landscaping",
    group: "Home Services",
    icon: "Sprout",
    metaTitle: "AI Receptionist & Call Answering for Landscaping & Lawn Care",
    metaDescription:
      "Your crews are on mowers, not phones. OneBy answers every call, captures the property and the service, and books the estimate, so spring leads never hit voicemail.",
    keywords: [
      "landscaping answering service",
      "lawn care AI receptionist",
      "landscaping lead capture",
      "lawn care scheduling",
      "landscaping estimate calls",
    ],
    heroEyebrow: "Built for landscaping",
    heroTitle: "Win the spring rush instead of missing it.",
    heroSub:
      "When the season hits, the phone rings faster than your crew can answer from behind a mower. OneBy picks up every call, captures the property details and the service they want, and books the estimate, so leads fill your schedule instead of your voicemail. The same platform routes the crew, invoices the job, and texts the customer, start to finish in one place.",
    heroStat: { stat: "+33%", label: "more estimates booked in season" },
    pains: [
      {
        title: "Crews can't answer from the field",
        body: "Your team is on mowers and behind blowers, not by the phone. Every call they can't take is an estimate someone else books.",
      },
      {
        title: "Spring buries the office",
        body: "The first warm week can triple your call volume. The leads you miss in that rush are the season's easiest revenue, gone.",
      },
      {
        title: "Recurring clients slip away",
        body: "A missed call about renewals or an add-on quietly churns the maintenance revenue your route depends on.",
      },
    ],
    scenarioCaller:
      "Homeowner wants a quote for weekly mowing plus a spring cleanup, wants someone to walk the property this week.",
    scenarioSummary:
      "Homeowner wants weekly mowing plus a spring cleanup. Wants a property walk this week for a quote. Flexible on the day.",
    scenarioTask: "Book estimate visit (weekly mowing + spring cleanup, this week)",
    outcomes: [
      { stat: "100%", label: "of estimate calls captured" },
      { stat: "8 sec", label: "from missed call to team notification" },
      { stat: "24/7", label: "coverage through the busy season" },
    ],
    capabilities: [
      {
        title: "Answers when the crew can't",
        body: "Every call gets picked up, even when the whole team is out on routes, so no estimate request slips away.",
      },
      {
        title: "Captures the property details",
        body: "Service type, property size, and access notes, all ready for the estimator or the route.",
      },
      {
        title: "Protects recurring revenue",
        body: "Renewals, add-ons, and maintenance requests become tracked tasks, so route density and repeat work hold.",
      },
    ],
    faqs: [
      {
        q: "Can it handle the spring call surge?",
        a: "Yes. The AI answers unlimited calls at once, so a busy first warm week never dumps leads into voicemail.",
      },
      {
        q: "Does it capture what the estimator needs?",
        a: "Yes. Service type, property details, and access notes are captured on the first call, so the estimate or the visit is ready to go.",
      },
      {
        q: "Can it help with recurring maintenance?",
        a: "Every call about renewals or an add-on becomes a tracked task on the customer timeline, so recurring work does not slip.",
      },
      {
        q: "Do we keep our number?",
        a: "Yep. Keep your line and route unanswered and after-hours calls to OneBy.",
      },
    ],
  },
];

export const industriesBySlug = Object.fromEntries(
  industries.map((i) => [i.slug, i])
);

export const industryGroups: Array<{
  group: Industry["group"];
  items: Industry[];
}> = [
  {
    group: "Home Services",
    items: industries.filter((i) => i.group === "Home Services"),
  },
  {
    group: "More Verticals",
    items: industries.filter((i) => i.group === "More Verticals"),
  },
];
