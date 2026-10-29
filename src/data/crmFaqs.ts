// CRM-first homepage FAQ content. Rendered by <FAQ faqs={crmFaqs} /> and
// serialized as FAQPage JSON-LD on the homepage. No AI answering-service copy —
// that story is parked until public launch.
export const crmFaqs: { q: string; a: string }[] = [
  {
    q: "Is OneBy really one app for jobs, scheduling, and invoicing?",
    a: "Yes. Jobs and tickets, scheduling and dispatch, estimates, invoicing and card payments, the price book, equipment history, and every customer's record live in one place, so a job goes from request to paid without jumping between apps and a spreadsheet.",
  },
  {
    q: "How is OneBy different from Jobber or Housecall Pro?",
    a: "You get the same jobs-to-paid workflow, plus the things a plain field CRM doesn't have: a built-in business phone and SMS, an open connector for the AI assistant you already use, online fax, and a CRM that's free to start.",
  },
  {
    q: "Can I connect my own AI assistant?",
    a: "Yes. OneBy opens a secure connector to the assistants you already use — Claude, ChatGPT, Gemini, Cursor, and any model that allows connections. Ask about your customers, jobs, and invoices in plain English, and let it do the busywork when you allow it. It's over 500 actions, read-only by default, scoped to exactly what you permit.",
  },
  {
    q: "How does getting paid work?",
    a: "Turn a finished job into an invoice and text the customer a pay link they tap to pay by card. You can send quotes for approval first, bill bigger jobs in milestones, and set up recurring invoices that charge the card on file each cycle.",
  },
  {
    q: "Do I have to move everything over at once?",
    a: "No. Most shops start with jobs and invoicing, then turn on scheduling, the price book, and the rest when they're ready. Keep your current number and tools running in the meantime.",
  },
  {
    q: "Can my whole team use it?",
    a: "Yes. Role-based access means owners see everything while office staff and field techs get exactly the view they need. There's a mobile app for the field, and you can run several businesses or locations under one login.",
  },
  {
    q: "What does it cost?",
    a: "The CRM is free to use, and a dedicated business line is $15 a month. No per-seat traps, no contract, and no surprise bill. See the pricing page for the full plans.",
  },
  {
    q: "How long does it take to get set up?",
    a: "Most teams are running the same day. Add your customers (or import them), set your services and prices in the price book, and start booking and invoicing jobs within minutes.",
  },
];
