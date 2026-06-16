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
  // Social proof
  quote: string;
  quoteName: string;
  quoteRole: string;
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
      "OneBy answers every HVAC call you can't get to, captures the job details, and creates the dispatch task automatically. Stop losing service calls to voicemail.",
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
      "Your techs are on rooftops and in crawl spaces, not by the phone. When a call comes in and nobody can answer, OneBy's AI picks up, gets the address and the symptom, and drops a ready-to-dispatch task in your queue.",
    heroStat: { stat: "+31%", label: "more service calls booked" },
    pains: [
      {
        title: "Peak season buries the front desk",
        body: "The first 90° day brings 200 calls. Every one that hits voicemail is a customer dialing your competitor before you finish the job you're on.",
      },
      {
        title: "After-hours emergencies walk",
        body: "No heat at 9pm is a same-night job for someone. If your line just rings, that emergency premium goes to whoever answers first.",
      },
      {
        title: "Vague voicemails waste truck rolls",
        body: "“Call me back about my AC” tells your dispatcher nothing. OneBy captures the unit, the symptom, and the access details up front.",
      },
    ],
    scenarioCaller:
      "Upstairs unit stopped cooling overnight, home after 3pm, existing customer.",
    scenarioSummary:
      "Existing customer — upstairs A/C not cooling since last night. Available after 3pm. Requesting same-day diagnostic.",
    scenarioTask: "Schedule A/C diagnostic — assign to Dispatch, due today",
    outcomes: [
      { stat: "24/7", label: "after-hours coverage with no answering service" },
      { stat: "8 sec", label: "from missed call to owner notification" },
      { stat: "0", label: "leads lost to a full voicemail box" },
    ],
    capabilities: [
      {
        title: "Captures the right job details",
        body: "Unit type, symptom, address, and urgency — the things your dispatcher actually needs to schedule the right tech.",
      },
      {
        title: "Routes emergencies instantly",
        body: "No-heat and no-cool calls flag as urgent and notify on-call staff the moment they land.",
      },
      {
        title: "Books while you sleep",
        body: "After-hours and overflow calls become morning tasks, already triaged and ready to dispatch.",
      },
    ],
    quote:
      "We were losing 15–20 calls a week to voicemail during summer. OneBy answers them now and books the job before my tech is off the roof.",
    quoteName: "Marcus T.",
    quoteRole: "Owner, Summit HVAC",
    faqs: [
      {
        q: "Can OneBy handle emergency no-cool and no-heat calls?",
        a: "Yes. The AI recognizes urgency, flags the call as an emergency, and notifies your on-call team immediately while logging every detail for the dispatcher.",
      },
      {
        q: "Will it work with my existing dispatch software?",
        a: "OneBy creates structured tasks you can act on directly, and on Growth and Pro plans it integrates with popular field-service tools to keep jobs in sync.",
      },
      {
        q: "Do I have to change my phone number?",
        a: "No. Keep your number — we forward unanswered and after-hours calls to OneBy so nothing is missed.",
      },
      {
        q: "Does the AI sound like a robot?",
        a: "No. It answers in a natural, professional voice and most callers simply feel helped — while you get a clean summary and a task.",
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
      "Burst pipes don't wait for business hours. OneBy answers every plumbing call, captures the emergency details, and creates the job automatically — 24/7.",
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
      "Plumbing emergencies happen at midnight, on Sundays, and while you're under a sink across town. OneBy answers, calms the customer, captures what's flooding and where, and turns it into an urgent job your team can act on.",
    heroStat: { stat: "4 hrs", label: "saved per day on callbacks" },
    pains: [
      {
        title: "Emergencies go to whoever answers first",
        body: "A flooding basement is a now problem. If your line rings out, that high-ticket emergency call is gone in 30 seconds.",
      },
      {
        title: "You can't answer with two hands in a job",
        body: "Mid-repair, you can't stop to take a call. OneBy makes sure the next customer still gets a real answer.",
      },
      {
        title: "Weekend and night calls slip away",
        body: "Without a 24/7 answer, after-hours leads — your most profitable — quietly leak to competitors.",
      },
    ],
    scenarioCaller:
      "Water heater leaking into the garage, needs someone today, has a shutoff valve.",
    scenarioSummary:
      "Leaking water heater flooding the garage. Customer located the shutoff. Requesting same-day service.",
    scenarioTask: "Dispatch water-heater leak — urgent, assign on-call tech",
    outcomes: [
      { stat: "24/7", label: "emergency call coverage" },
      { stat: "100%", label: "of calls answered, even mid-job" },
      { stat: "+28%", label: "after-hours jobs captured" },
    ],
    capabilities: [
      {
        title: "Triages emergencies first",
        body: "Floods, leaks, and no-water calls are flagged urgent and pushed to your on-call tech instantly.",
      },
      {
        title: "Guides the caller",
        body: "The AI can prompt for the basics — location of the leak, whether the water's shut off — so your tech arrives ready.",
      },
      {
        title: "One timeline per customer",
        body: "Every call, text, and job for an address in one place, so repeat customers never have to re-explain.",
      },
    ],
    quote:
      "The summaries are the magic. My techs read one line and know exactly what they're walking into. No more replaying voicemails.",
    quoteName: "Priya N.",
    quoteRole: "Ops Manager, BlueLine Plumbing",
    faqs: [
      {
        q: "Can it tell an emergency from a routine call?",
        a: "Yes. OneBy understands intent and urgency, flags true emergencies, and notifies your on-call team right away while routine requests become scheduled tasks.",
      },
      {
        q: "What happens to after-hours calls?",
        a: "They're answered live by the AI, captured as detailed tasks, and your team is notified — so a 2am burst pipe is a booked job by morning, or sooner if it's urgent.",
      },
      {
        q: "Can customers text us too?",
        a: "Yes. OneBy includes a shared business SMS inbox so texts and calls live together and never strand on one person's phone.",
      },
      {
        q: "How fast can we go live?",
        a: "Most plumbing teams are live the same day — connect your number, set your hours and on-call routing, and you're capturing calls in minutes.",
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
      "From panel upgrades to power outages, OneBy answers every electrical call, captures the scope, and creates the job — so you never miss a quote request.",
    keywords: [
      "electrician answering service",
      "electrical contractor AI receptionist",
      "electrician call answering",
      "electrical lead capture",
    ],
    heroEyebrow: "Built for electrical",
    heroTitle: "Stop letting quote requests ring out.",
    heroSub:
      "Panel upgrades, EV chargers, outages, inspections — electrical leads are high value and easy to lose. OneBy answers the call, captures the scope and the property details, and turns it into a quote-ready task.",
    heroStat: { stat: "+34%", label: "more estimate requests captured" },
    pains: [
      {
        title: "High-ticket jobs hang up fast",
        body: "A homeowner pricing a panel upgrade calls three electricians. The one who answers gets the estimate.",
      },
      {
        title: "Safety calls can't wait",
        body: "Sparking outlets and partial outages are urgent. A missed call here is both lost revenue and a worried customer.",
      },
      {
        title: "Scope gets lost in voicemail",
        body: "“Need an electrician” isn't a quote. OneBy captures the job scope so you can price and schedule accurately.",
      },
    ],
    scenarioCaller:
      "Wants a quote to add an EV charger in the garage, 200A panel, evenings best.",
    scenarioSummary:
      "Estimate request — install Level 2 EV charger in attached garage, existing 200A panel. Prefers evening appointments.",
    scenarioTask: "Schedule EV charger estimate — assign to estimator",
    outcomes: [
      { stat: "24/7", label: "coverage for urgent electrical calls" },
      { stat: "100%", label: "of quote requests captured" },
      { stat: "8 sec", label: "to owner notification on new leads" },
    ],
    capabilities: [
      {
        title: "Captures full job scope",
        body: "Service type, panel size, property details, and timing — everything your estimator needs to quote.",
      },
      {
        title: "Flags safety urgency",
        body: "Sparking, burning smells, and outages are recognized as urgent and escalated immediately.",
      },
      {
        title: "Quote-ready tasks",
        body: "Every lead becomes an assigned task with context, so estimates go out faster than your competitors'.",
      },
    ],
    quote:
      "Half our jobs start as a quote call. OneBy makes sure we never miss one — even when the whole crew is on a site.",
    quoteName: "Tomás R.",
    quoteRole: "Owner, Apex Electric",
    faqs: [
      {
        q: "Can it qualify quote requests?",
        a: "Yes. The AI captures service type, scope, and property details so your estimator has what they need before the callback.",
      },
      {
        q: "Will urgent safety calls get escalated?",
        a: "Absolutely. Outages and safety hazards are flagged urgent and your on-call team is notified immediately.",
      },
      {
        q: "Does it work alongside our scheduling tools?",
        a: "Yes — OneBy creates structured tasks and integrates with popular field-service software on Growth and Pro plans.",
      },
      {
        q: "Can we keep our current number?",
        a: "Yes. Keep your number and forward unanswered or after-hours calls to OneBy.",
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
      "Storm season floods your phone. OneBy answers every roofing call, captures the damage and address, and creates the inspection task — so no lead slips through.",
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
      "When a storm rolls through, the phone doesn't stop. OneBy answers every call, captures the damage details and the address, and books the inspection — so you fill the schedule instead of the voicemail box.",
    heroStat: { stat: "+40%", label: "more inspections booked after storms" },
    pains: [
      {
        title: "Storm spikes overwhelm the office",
        body: "One hailstorm can 10x your call volume in a day. Every missed call is a roof someone else inspects.",
      },
      {
        title: "Leads have a short shelf life",
        body: "Homeowners with a leak call until someone answers. Speed to lead wins the job.",
      },
      {
        title: "Crews can't field calls from a roof",
        body: "Your team is working, not answering. OneBy keeps the pipeline full while they do.",
      },
    ],
    scenarioCaller:
      "Missing shingles and a ceiling stain after last night's hailstorm, wants an inspection.",
    scenarioSummary:
      "Storm damage — missing shingles and interior ceiling stain after hail. Requesting a roof inspection this week.",
    scenarioTask: "Book roof inspection — assign to field estimator",
    outcomes: [
      { stat: "10x", label: "call surges handled without extra staff" },
      { stat: "100%", label: "of storm leads captured" },
      { stat: "8 sec", label: "to notify your team of a new lead" },
    ],
    capabilities: [
      {
        title: "Scales with storm volume",
        body: "The AI answers every call at once — no busy signals, no overflow to voicemail when it matters most.",
      },
      {
        title: "Captures damage details",
        body: "Type of damage, address, and insurance context, ready for your inspector.",
      },
      {
        title: "Speed-to-lead built in",
        body: "Owners and estimators are notified instantly so you reach storm leads before competitors do.",
      },
    ],
    quote:
      "We were losing 15–20 calls a week to voicemail. OneBy answers them now and books the inspection before I'm even off the roof. It paid for itself in the first weekend.",
    quoteName: "Marcus T.",
    quoteRole: "Owner, Ridgeway Roofing",
    faqs: [
      {
        q: "Can it handle a sudden storm call surge?",
        a: "Yes — the AI answers unlimited simultaneous calls, so a hailstorm spike never sends customers to voicemail.",
      },
      {
        q: "Does it capture insurance details?",
        a: "It captures the context you configure, including damage type and whether the homeowner is filing a claim, so your estimator arrives prepared.",
      },
      {
        q: "Can we keep our number and just forward overflow?",
        a: "Yes. Forward unanswered and after-hours calls to OneBy while keeping your existing line.",
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
      "Restoration is an emergency business. OneBy answers every call day or night, captures the loss details, and dispatches the job — so you win the first-call advantage.",
    keywords: [
      "restoration answering service",
      "water damage AI receptionist",
      "fire restoration call answering",
      "24/7 restoration calls",
    ],
    heroEyebrow: "Built for restoration",
    heroTitle: "In restoration, the first call answered wins the job.",
    heroSub:
      "Water, fire, and mold losses are emergencies — and they almost always go to the company that picks up first. OneBy answers 24/7, captures the loss details, and dispatches instantly so you're on site before anyone else.",
    heroStat: { stat: "24/7", label: "live emergency answering" },
    pains: [
      {
        title: "Every minute is billable urgency",
        body: "A flooded home needs mitigation now. The first responder on the phone is usually the one who gets the contract.",
      },
      {
        title: "Night and weekend losses are the norm",
        body: "Disasters don't keep business hours. Without 24/7 coverage, your best jobs go to a competitor's answering service.",
      },
      {
        title: "Insurance details get muddled",
        body: "Loss type, cause, and timeline matter for the claim. OneBy captures them cleanly on the first call.",
      },
    ],
    scenarioCaller:
      "Basement flooded from a supply line break two hours ago, standing water, needs mitigation now.",
    scenarioSummary:
      "Water loss — supply line break, standing water in basement ~2 hrs. Requesting emergency mitigation tonight.",
    scenarioTask: "Dispatch emergency water mitigation — notify on-call crew now",
    outcomes: [
      { stat: "24/7", label: "live answering, every loss" },
      { stat: "100%", label: "of emergency calls captured" },
      { stat: "1st", label: "to respond beats the competition" },
    ],
    capabilities: [
      {
        title: "Always-on emergency answering",
        body: "Every call answered live, any hour, with immediate escalation to your on-call crew.",
      },
      {
        title: "Captures the loss cleanly",
        body: "Loss type, cause, timing, and property details — structured for dispatch and the eventual claim.",
      },
      {
        title: "Instant dispatch notifications",
        body: "Your crew is alerted the second a loss is logged, so trucks roll faster.",
      },
    ],
    quote:
      "In our business, whoever answers the 2am call gets the job. OneBy means that's always us now.",
    quoteName: "Karen W.",
    quoteRole: "GM, Restore First",
    faqs: [
      {
        q: "Is the answering truly 24/7?",
        a: "Yes. OneBy answers every call live around the clock and escalates emergencies to your on-call crew immediately.",
      },
      {
        q: "Can it capture the details we need for claims?",
        a: "Yes — loss type, cause, timing, and property context are captured on the first call and saved to the customer timeline.",
      },
      {
        q: "How does dispatch get notified?",
        a: "Your on-call crew is notified within seconds of a loss being logged, with the full summary attached.",
      },
      {
        q: "Do we keep our existing number?",
        a: "Yes. Keep your number and route after-hours and overflow calls to OneBy.",
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
      "A stuck garage door is a same-day call. OneBy answers it, captures the door type and issue, and books the repair — so you never miss a service request.",
    keywords: [
      "garage door answering service",
      "garage door AI receptionist",
      "garage door repair calls",
      "garage door lead capture",
    ],
    heroEyebrow: "Built for garage doors",
    heroTitle: "A car stuck in the garage is a same-day job.",
    heroSub:
      "Broken springs and stuck doors are urgent, high-intent calls. OneBy answers every one, captures the door type and the symptom, and books the repair before the customer dials the next company.",
    heroStat: { stat: "+27%", label: "more same-day repairs booked" },
    pains: [
      {
        title: "Stuck-door calls won't wait",
        body: "A customer who can't get their car out is calling everyone. First to answer wins.",
      },
      {
        title: "Techs are on jobs, not by the phone",
        body: "Your installers are working. OneBy makes sure the next call still books.",
      },
      {
        title: "Wrong parts mean wasted trips",
        body: "Door type, spring vs. opener, brand — OneBy captures it so your tech arrives with the right parts.",
      },
    ],
    scenarioCaller:
      "Garage door won't open, broken spring, car stuck inside, needs same-day service.",
    scenarioSummary:
      "Broken torsion spring — door won't open, vehicle trapped inside. Requesting same-day repair.",
    scenarioTask: "Book same-day spring repair — assign nearest tech",
    outcomes: [
      { stat: "100%", label: "of service calls answered" },
      { stat: "8 sec", label: "to notify your team" },
      { stat: "0", label: "same-day jobs lost to voicemail" },
    ],
    capabilities: [
      {
        title: "Captures the right repair details",
        body: "Door type, spring vs. opener, brand, and symptom — so techs roll with the right parts.",
      },
      {
        title: "Prioritizes stuck-door urgency",
        body: "Trapped-vehicle and security-risk calls are flagged for fast scheduling.",
      },
      {
        title: "Books overflow automatically",
        body: "Calls you can't get to become scheduled jobs, not missed revenue.",
      },
    ],
    quote:
      "Every missed call was a job we handed to a competitor. Now OneBy answers and books it before we even see the voicemail.",
    quoteName: "Dave L.",
    quoteRole: "Owner, ClearPath Garage Doors",
    faqs: [
      {
        q: "Does it capture the door and part details?",
        a: "Yes — door type, spring vs. opener, brand, and symptom are captured so your tech brings the right parts.",
      },
      {
        q: "Can it prioritize trapped-vehicle calls?",
        a: "Yes. Urgent stuck-door situations are flagged for same-day scheduling and your team is notified right away.",
      },
      {
        q: "Will it work with our scheduling system?",
        a: "OneBy creates structured tasks and integrates with popular field-service tools on Growth and Pro plans.",
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
      "OneBy answers every pest control call, captures the pest and property details, and books the treatment — so urgent infestations never reach voicemail.",
    keywords: [
      "pest control answering service",
      "pest control AI receptionist",
      "pest control call answering",
      "pest control scheduling",
    ],
    heroEyebrow: "Built for pest control",
    heroTitle: "An infestation is an emotional, urgent call.",
    heroSub:
      "Customers with a wasp nest or bed bugs want help today. OneBy answers, captures the pest and the property details, and books the treatment — so you turn anxious callers into scheduled jobs.",
    heroStat: { stat: "+25%", label: "more treatments scheduled" },
    pains: [
      {
        title: "Urgent pests can't wait for a callback",
        body: "Stinging insects and bed bugs are emotional, immediate calls. Voicemail loses them in minutes.",
      },
      {
        title: "Route techs can't answer mid-treatment",
        body: "Your team is treating homes, not fielding calls. OneBy keeps the schedule filling.",
      },
      {
        title: "Recurring plans get dropped",
        body: "Missed calls about quarterly service quietly churn revenue. OneBy keeps every request on the timeline.",
      },
    ],
    scenarioCaller:
      "Wasp nest by the front door, kids allergic, wants someone out today.",
    scenarioSummary:
      "Active wasp nest at front entry, household member with allergy. Requesting same-day treatment.",
    scenarioTask: "Schedule same-day wasp treatment — assign nearest route tech",
    outcomes: [
      { stat: "100%", label: "of calls answered, even on route" },
      { stat: "8 sec", label: "to team notification" },
      { stat: "+25%", label: "more jobs booked" },
    ],
    capabilities: [
      {
        title: "Captures pest and property details",
        body: "Pest type, location, severity, and any allergy or safety notes — ready for the route tech.",
      },
      {
        title: "Flags urgent infestations",
        body: "Stinging insects, rodents, and bed bugs are prioritized for fast scheduling.",
      },
      {
        title: "Supports recurring revenue",
        body: "Every call about quarterly or annual plans becomes a tracked task, so renewals don't slip.",
      },
    ],
    quote:
      "People who call about bugs want to talk to someone right now. OneBy makes sure they always can.",
    quoteName: "Sandra B.",
    quoteRole: "Owner, Sentry Pest",
    faqs: [
      {
        q: "Can it prioritize urgent pests?",
        a: "Yes — stinging insects, rodents, and bed bug calls are flagged for same-day scheduling and your team is notified immediately.",
      },
      {
        q: "Does it capture safety and allergy notes?",
        a: "Yes. The AI captures the details you configure, including allergies and pets, so your tech arrives prepared.",
      },
      {
        q: "Can it help with recurring service plans?",
        a: "Every request becomes a tracked task on the customer timeline, so recurring service and renewals don't fall through.",
      },
      {
        q: "Do we keep our number?",
        a: "Yes. Keep your line and route unanswered calls to OneBy.",
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
      "OneBy answers every tenant call, captures the maintenance issue and unit, and creates a tracked ticket automatically — so nothing slips through across your portfolio.",
    keywords: [
      "property management answering service",
      "tenant maintenance intake",
      "property manager AI receptionist",
      "maintenance request software",
    ],
    heroEyebrow: "Built for property management",
    heroTitle: "Every tenant call becomes a tracked ticket.",
    heroSub:
      "Across hundreds of units, tenant calls never stop — leaks, lockouts, no heat, noise. OneBy answers each one, captures the unit and the issue, and creates a routed maintenance ticket automatically, so nothing slips between buildings.",
    heroStat: { stat: "0", label: "missed maintenance requests" },
    pains: [
      {
        title: "Volume scatters across the portfolio",
        body: "With 600 units, the phone never stops. A missed maintenance call becomes a bigger, costlier problem.",
      },
      {
        title: "After-hours emergencies create liability",
        body: "No heat or a burst pipe at night can't wait. Missing it risks the property and the tenant relationship.",
      },
      {
        title: "Requests get lost between buildings",
        body: "Sticky notes and voicemails don't scale. OneBy turns every call into a routed, trackable ticket.",
      },
    ],
    scenarioCaller:
      "Tenant in unit 4B reports no hot water since this morning, available all day.",
    scenarioSummary:
      "Unit 4B — no hot water since this morning. Tenant available all day for access.",
    scenarioTask: "Create maintenance ticket — no hot water, Unit 4B, route to plumber",
    outcomes: [
      { stat: "24/7", label: "tenant call coverage" },
      { stat: "100%", label: "of requests captured as tickets" },
      { stat: "0", label: "lost or duplicated requests" },
    ],
    capabilities: [
      {
        title: "Automatic maintenance intake",
        body: "Unit, issue, urgency, and access details captured and turned into a routed ticket — no front-desk bottleneck.",
      },
      {
        title: "Routes by property and vendor",
        body: "Tickets go to the right manager or vendor automatically, so the right person acts fast.",
      },
      {
        title: "A timeline per unit and tenant",
        body: "Every call, text, and request for an address in one place, ready for audits and owner reports.",
      },
    ],
    quote:
      "I manage 600 units. OneBy catches every tenant call and turns it into a ticket automatically. Nothing slips through anymore.",
    quoteName: "Derek S.",
    quoteRole: "Director, Cornerstone PM",
    faqs: [
      {
        q: "Can it route tickets by property or vendor?",
        a: "Yes. OneBy routes each maintenance ticket to the right manager or vendor based on the property and issue type.",
      },
      {
        q: "Does it cover after-hours emergencies?",
        a: "Yes — emergencies like no heat or active leaks are flagged urgent 24/7 and escalated to your on-call contact immediately.",
      },
      {
        q: "Will it integrate with our PM software?",
        a: "OneBy creates structured tickets and integrates with popular property-management platforms on Growth and Pro plans.",
      },
      {
        q: "Can tenants text in requests too?",
        a: "Yes. The shared SMS inbox captures texts alongside calls so every request lives in one timeline.",
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
      "OneBy answers support calls, captures the issue and account, and creates a ticket with context — so your MSP never misses an SLA on an inbound call.",
    keywords: [
      "MSP answering service",
      "IT support call answering",
      "MSP AI receptionist",
      "help desk ticket intake",
    ],
    heroEyebrow: "Built for MSPs & IT",
    heroTitle: "Turn every support call into a ticket with context.",
    heroSub:
      "When a client's network is down, they call. OneBy answers, identifies the account and the issue, and creates a triaged ticket — so SLAs are met even when your techs are heads-down on another incident.",
    heroStat: { stat: "100%", label: "of inbound issues ticketed" },
    pains: [
      {
        title: "Techs are deep in another incident",
        body: "Your engineers can't drop a critical fix to answer the phone. OneBy makes sure the next client still gets through.",
      },
      {
        title: "SLA clocks start at first contact",
        body: "A missed call is a missed SLA. Capturing every issue immediately protects your agreements.",
      },
      {
        title: "Context gets lost in callbacks",
        body: "“It's broken” isn't a ticket. OneBy captures the account, the system, and the symptom up front.",
      },
    ],
    scenarioCaller:
      "Caller from Northwind Co. reports the whole office can't reach email since 9am.",
    scenarioSummary:
      "Northwind Co. — office-wide email outage since 9am, affecting all staff. Priority incident.",
    scenarioTask: "Create P1 ticket — Northwind email outage, escalate to on-call engineer",
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
        body: "Outages and P1 incidents are flagged and pushed to your on-call engineer immediately.",
      },
      {
        title: "Clean ticket handoff",
        body: "Every call becomes a structured ticket, ready to drop into your PSA on Growth and Pro plans.",
      },
    ],
    quote:
      "Inbound calls used to interrupt our techs or hit voicemail. Now every one becomes a ticket with context, and our SLAs are safe.",
    quoteName: "Alan P.",
    quoteRole: "Service Manager, Northgate IT",
    faqs: [
      {
        q: "Can it identify which client is calling?",
        a: "Yes. OneBy captures the account and affected systems so the ticket has the context your engineers need.",
      },
      {
        q: "How are priority incidents handled?",
        a: "Outages and P1 issues are flagged and escalated to your on-call engineer within seconds.",
      },
      {
        q: "Does it integrate with our PSA?",
        a: "OneBy creates structured tickets and integrates with popular PSA and ticketing tools on Growth and Pro plans.",
      },
      {
        q: "Can we route by time of day?",
        a: "Yes. Configure business-hours, after-hours, and on-call routing so the right person is always notified.",
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
      "OneBy answers every call, qualifies the matter, and captures intake details — so your firm books consultations without paying for a live answering service.",
    keywords: [
      "law firm answering service",
      "legal client intake",
      "attorney AI receptionist",
      "law firm call answering",
    ],
    heroEyebrow: "Built for law firms",
    heroTitle: "Capture every new matter, even in court.",
    heroSub:
      "A prospective client who reaches voicemail calls the next firm on the list. OneBy answers, qualifies the matter, and captures the intake details — so you book consultations while you're in session.",
    heroStat: { stat: "+35%", label: "more consultations booked" },
    pains: [
      {
        title: "You can't answer from the courtroom",
        body: "When you're in court or with a client, new-matter calls go unanswered — and prospects don't leave messages.",
      },
      {
        title: "Intake details get lost",
        body: "Matter type, jurisdiction, and timing matter. OneBy captures them cleanly on the first call.",
      },
      {
        title: "Answering services are costly and generic",
        body: "Live services charge per minute and rarely qualify the matter. OneBy does it automatically.",
      },
    ],
    scenarioCaller:
      "Prospective client in a car accident two weeks ago, other driver at fault, seeking representation.",
    scenarioSummary:
      "Potential PI matter — auto accident ~2 weeks ago, caller states other driver at fault. Seeking representation.",
    scenarioTask: "Schedule intake consultation — PI matter, assign to intake attorney",
    outcomes: [
      { stat: "24/7", label: "intake coverage" },
      { stat: "100%", label: "of new-matter calls captured" },
      { stat: "0", label: "prospects lost to voicemail" },
    ],
    capabilities: [
      {
        title: "Qualifies the matter",
        body: "Matter type, jurisdiction, and timing captured so you know which calls to prioritize.",
      },
      {
        title: "Professional first impression",
        body: "A natural, courteous voice greets every caller — no generic answering-service feel.",
      },
      {
        title: "Confidential, organized intake",
        body: "Each new matter becomes a structured task on the client timeline, ready for your intake team.",
      },
    ],
    quote:
      "I used to lose new clients every time I was in court. Now OneBy captures the matter and books the consult before I'm back at my desk.",
    quoteName: "Rebecca H.",
    quoteRole: "Managing Partner, Hale & Associates",
    faqs: [
      {
        q: "Can it qualify a potential matter?",
        a: "Yes. OneBy captures matter type, jurisdiction, and timing so your intake team can prioritize the right calls.",
      },
      {
        q: "Is it more affordable than a live answering service?",
        a: "Yes — there are no per-minute charges, and the AI qualifies the matter automatically rather than just taking a message.",
      },
      {
        q: "Is the intake information kept organized?",
        a: "Every new matter becomes a structured task on the client timeline, ready for follow-up.",
      },
      {
        q: "Can we keep our existing number?",
        a: "Yes. Keep your number and route unanswered or after-hours calls to OneBy.",
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
      "When every line is busy, patients hit hold music or voicemail. OneBy answers the overflow, captures the reason for the call, and creates a task your front desk can clear quickly — so no patient is left waiting.",
    heroStat: { stat: "0", label: "patients stuck in voicemail" },
    pains: [
      {
        title: "Front desks get slammed at peak",
        body: "Monday mornings and lunch hours overwhelm staff. Overflow calls hit voicemail and patients give up.",
      },
      {
        title: "After-hours calls need triage",
        body: "Patients call after close with real needs. OneBy captures them so nothing waits until morning unaddressed.",
      },
      {
        title: "Callbacks pile up",
        body: "Messages without context create endless phone tag. OneBy captures the reason up front.",
      },
    ],
    scenarioCaller:
      "Existing patient needs to reschedule Thursday's appointment and refill a prescription.",
    scenarioSummary:
      "Existing patient — requesting to reschedule Thursday's appointment and a prescription refill.",
    scenarioTask: "Front-desk task — reschedule appt + refill request, call back",
    outcomes: [
      { stat: "24/7", label: "overflow & after-hours coverage" },
      { stat: "100%", label: "of calls answered, never voicemail" },
      { stat: "Less", label: "phone tag with context-rich tasks" },
    ],
    capabilities: [
      {
        title: "Overflow answering",
        body: "When the front desk is busy, OneBy answers instead of sending patients to hold or voicemail.",
      },
      {
        title: "Captures the reason for the call",
        body: "Scheduling, refills, billing, or questions — each becomes a clear task your staff can clear quickly.",
      },
      {
        title: "Reduces phone tag",
        body: "Context-rich tasks mean fewer rounds of callbacks and faster patient response.",
      },
    ],
    quote:
      "Our front desk was drowning at peak hours. OneBy catches the overflow and turns it into tidy tasks we clear in minutes.",
    quoteName: "Dr. Lena M.",
    quoteRole: "Practice Owner, Cedar Family Care",
    faqs: [
      {
        q: "Is OneBy a substitute for clinical triage?",
        a: "No. OneBy captures the reason for the call and creates a task for your staff; it does not provide medical advice or clinical triage. For emergencies, callers are directed to appropriate care.",
      },
      {
        q: "Can it handle scheduling and refill requests?",
        a: "Yes — it captures the request as a clear task (reschedule, refill, billing question) so your front desk can act quickly.",
      },
      {
        q: "Does it help during peak call times?",
        a: "Yes. OneBy answers overflow when every line is busy, so patients are never stuck in voicemail.",
      },
      {
        q: "Can we keep our current phone system?",
        a: "Yes. Keep your number and route overflow and after-hours calls to OneBy.",
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
