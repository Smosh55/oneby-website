// AUTO-GENERATED from the OneBy pipeline output for MD Auto Rental's real calls.
// Do not edit by hand; regenerate with make_cards_ts.py.

export type CallAction = {
  type: string;
  title: string;
  contact: string | null;
  when: string | null;
  amount: string | null;
  confidence: string;
  clarification: string | null;
};

export type CallCard = {
  id: string;
  time: string;
  insurer: string;
  summary: string;
  actions: CallAction[];
};

export const mdAutoCalls: CallCard[] = [
  {
    id: "call-1",
    time: "11:59 AM",
    insurer: "Progressive",
    summary: "Jacqueline from MD Auto Rental called Progressive to follow up on payment status for two claims on behalf of a customer. The first claim number 26-822-868-409 was confirmed as closed for a New York claim with Makita as the file owner. The second claim number 26-886-748-730 was also confirmed as closed for New York. Jacqueline was transferred to Makita, who indicated they were currently waiting for approval on a check and expected to have an update by end of day, though no payment had been processed yet. Makita clarified they had been communicating via email rather than phone calls regarding the claim.",
    actions: [
      { type: "follow_up", title: "Await payment approval from Makita (Progressive) for customer claim", contact: "Makita at Progressive", when: "end of day", amount: null, confidence: "high", clarification: null }
    ],
  },
  {
    id: "call-2",
    time: "11:59 AM",
    insurer: "Progressive",
    summary: "Jacqueline from MD Auto Rental called Progressive to follow up on a payment status for claim number 26200012160 under the name Fischel Dollar, involving an invoice for a rental amount of $5,641.39. The initial automated system could not locate her policy information and transferred her to a claims representative. Jacqueline explained that she had sent the invoice to the adjuster Regina on May 14th and followed up with another email on May 29th but received no response. The representative confirmed they did not see the payment recorded in that amount and agreed to send a request to Regina to contact Jacqueline at the callback number 732-479-2886 with a payment status update.",
    actions: [
      { type: "follow_up", title: "Await payment status update from Regina (adjuster) on claim 26200012160", contact: "Regina (Progressive adjuster)", when: null, amount: "$5,641.39", confidence: "high", clarification: null }
    ],
  },
  {
    id: "call-3",
    time: "11:59 AM",
    insurer: "Liberty Mutual",
    summary: "Eric from MD AutoRental called claim number 060-572-810 regarding a rental dispute for claimant Mary Levi Manisham. Eric argued that MD AutoRental has negotiated rates with Enterprise and should only be reimbursed at those partner rates rather than the higher daily rate of $80–$90 that was charged; he stated Enterprise support confirmed a medium-sized SUV would cost less per day with taxes and fees included, and he cited New Jersey law requiring insurance to pay market rates for comparable vehicles. Chris from Liberty Mutual said he could not approve a higher reimbursement amount himself and would need supervisor authorization to discuss a settlement, noting that the dispute amounts to over $1,000. A secondary issue emerged regarding whether Chris had previously promised full payment: Chris denied saying he would pay the full amount, only that he would \"get payment out the door,\" while Eric contended they had discussed this multiple times, including on the morning the claimant brought the vehicle to the shop. Chris offered to send Eric his supervisor's contact information via email so Eric could follow up directly about a possible compromise.",
    actions: [
      { type: "follow_up", title: "Await supervisor contact info from Chris to discuss claim resolution", contact: "Christopher Gomez, Liberty Mutual Insurance", when: null, amount: null, confidence: "high", clarification: null },
      { type: "follow_up", title: "Follow up with Liberty Mutual supervisor regarding claim dispute and rate adjustment for Mary Levi Manisham rental", contact: "Liberty Mutual Insurance supervisor", when: null, amount: "$1,000+ difference in dispute", confidence: "high", clarification: "Confirm whether Liberty Mutual will adjust their offered amount or if MD Auto Rental will bill the customer" },
      { type: "follow_up", title: "Send email to customer with rental rate information and request response", contact: null, when: null, amount: null, confidence: "high", clarification: null }
    ],
  },
  {
    id: "call-4",
    time: "11:59 AM",
    insurer: "Allstate",
    summary: "Eric from MD Auto Rental called Allstate regarding claim 082-669-7657 to inquire about payment status for an invoice under customer Ricardo Polino in the amount of $3,082.60. Douglas confirmed the payment is still pending review by the rental review team and should be completed by end of day today or afternoon tomorrow. Douglas agreed to have the team contact MD Auto Rental once the payment is resolved, either by phone at 732-479-2886 or by email.",
    actions: [
      { type: "follow_up", title: "Await payment notification from Allstate for claim 082-669-7657", contact: "Allstate", when: "by end of day today or afternoon tomorrow", amount: "$3,082.60", confidence: "high", clarification: null }
    ],
  },
  {
    id: "call-5",
    time: "12:00 PM",
    insurer: "Progressive",
    summary: "Jacqueline called Progressive to check on claim number 26-2000-43444 related to Esther Werner. She was initially connected to Victoria, who helped her locate the correct adjuster, Sebastian, for this claim. Jacqueline explained that the automated system has been directing her calls inconsistently and provided the main Progressive claims number (800-776-4737) as an alternative. When she reached Sebastian's voicemail, she left a message on behalf of MD Auto Rental inquiring whether Progressive had received an invoice they submitted and whether any payment had been issued or was under review.",
    actions: [
      { type: "follow_up", title: "Await callback from Sebastian (Progressive Claims) regarding claim 26-2000-43444 and invoice status", contact: "Sebastian, Progressive Claims", when: null, amount: null, confidence: "high", clarification: "Confirm whether Progressive received the invoice submitted for claim 26-2000-43444 (Esther Werner) and whether payment has been issued" }
    ],
  },
  {
    id: "call-6",
    time: "12:00 PM",
    insurer: "Allstate",
    summary: "Matthew Orlando from Allstate's Claim Resolution Department spoke with Eric regarding claim 0825-454-929 about a loss of use dispute for a rental vehicle that was down for 43 days. The core issue centered on conflicting rental rates: Enterprise's standard daily rates ($80-$85 for full-size vehicles) versus Allstate's negotiated rates ($28-$35-$40 range), with Matthew stating Allstate can only approve based on its contracted rates, not market rates. Eric claimed a loss of business during the 43-day period when the vehicle was unavailable and stated he had no other vehicles to mitigate the loss, but Matthew requested documentation proving that the unavailable vehicle caused actual business loss and that no replacement rentals from other vehicles could have offset the damages. Matthew proposed the claimant could alternatively provide fleet management records or proof that all available vehicles were rented during that period to substantiate the loss of business claim. Eric agreed to have his supervisor respond to the earlier email and provide whatever fleet availability documentation was available so Allstate could review it further.",
    actions: [
      { type: "follow_up", title: "Await fleet management documentation proving loss of use claim for 43-day vehicle downtime", contact: "MD Auto Rental", when: null, amount: null, confidence: "high", clarification: "Allstate requires proof that the unavailable vehicle caused actual business loss—specifically, documentation (fleet management system records, rental logs, or similar) showing all available vehicles were rented out during the 43-day period and demand exceeded supply due to the downed vehicle." },
      { type: "follow_up", title: "Inform supervisor about rental rate negotiation and proof of business loss requirement", contact: null, when: null, amount: null, confidence: "high", clarification: null },
      { type: "follow_up", title: "Await fleet/vehicle availability documentation from other party for 43-day period", contact: null, when: null, amount: null, confidence: "high", clarification: null },
      { type: "follow_up", title: "Respond to lost email with full response for supervisor review", contact: null, when: null, amount: null, confidence: "high", clarification: null }
    ],
  },
  {
    id: "call-7",
    time: "12:01 PM",
    insurer: "GEICO",
    summary: "Jacqueline from MD Auto Rental called Geico Claims on behalf of Abraham Halberstam, whose claim number is 875344-331-0000004, to inquire about rental coverage details for a vehicle rented 14 days ago. The rental company wanted to know how many days of rental coverage Abraham was authorized under his policy. Jennifer, the Geico claims representative, explained that she could not provide rental or coverage information because there was no adjuster assigned to the claim and no information on file indicating the rental company was handling damages or rental arrangements. Jennifer stated she would need direct permission from Abraham before releasing any information and attempted to contact Abraham's wife while Jacqueline held, but was unable to confirm sufficient details since Abraham himself was unavailable. The call concluded with Jennifer agreeing to follow up once she could speak directly with Abraham to get authorization, after which Geico could provide the requested coverage information to MD Auto Rental.",
    actions: [
      { type: "follow_up", title: "Obtain correct first name for insured Halberstam to access claim details", contact: "Jacqueline / MD Auto Rental", when: null, amount: null, confidence: "high", clarification: "Geico has claim 875344-331-0000004 under a different first name than 'Regard' for the insured; confirm whether it is Abraham Halberstam or another name on file" },
      { type: "follow_up", title: "Follow up with insurance (Geico) after they speak to Abraham about claim details and rental authorization days", contact: "Geico", when: null, amount: null, confidence: "high", clarification: null },
      { type: "follow_up", title: "Await confirmation from Geico on number of authorized rental days for Abraham Halberstam", contact: "Geico", when: null, amount: null, confidence: "high", clarification: null },
      { type: "follow_up", title: "Speak to Abraham regarding claim information", contact: "Abraham", when: null, amount: null, confidence: "high", clarification: null }
    ],
  },
  {
    id: "call-8",
    time: "12:01 PM",
    insurer: "Plymouth Rock",
    summary: "Jacqueline from MD Auto Rental called Plymouth Rock Assurance to check the payment status on claim number 682-002-729-120 for customer Rivka Kaplan. Jake, the claims representative, reviewed the claim and determined that while MD Auto Rental had submitted a rental bill for $99 per day for 25 days, Plymouth Rock's covered rental rate for the customer is $50 per day, and the total rental coverage limit is $1,500. Jake indicated he would issue a check for $1,250 (calculated as $50 per day times 25 days) plus rental tax of $163.97, for a total of at least $1,413.97, stating that any additional fees on the bill would need to be covered by the customer as they exceed the policy limits. Jake directed the check to be sent to the address on the invoice.",
    actions: [
      { type: "follow_up", title: "Await check payment from Plymouth Rock Assurance for claim 682-002-729-120", contact: "Plymouth Rock Assurance / Jake", when: null, amount: "$1,250", confidence: "high", clarification: null },
      { type: "follow_up", title: "Await check from insurance company for $1,413.97", contact: "Insurance company", when: null, amount: "$1,413.97", confidence: "high", clarification: null },
      { type: "follow_up", title: "Track potential additional coverage up to $1,500 limit from insurance company", contact: "Insurance company", when: null, amount: null, confidence: "medium", clarification: "Insurance company stated they may issue additional funds if other fees fall under the $1,500 policy limit; confirm if any additional amount is sent" }
    ],
  },
  {
    id: "call-9",
    time: "12:01 PM",
    insurer: "GEICO",
    summary: "Jacqueline from MD Auto Rental called Geico's claims department to follow up on payment status for two auto claims on behalf of the insured parties. For the first claim (883-600-241-0000-0002) related to Mayor Lando with an invoice amount of $5,001.69, the adjuster Jaina confirmed that payment had not yet been issued and indicated she would message the auto damage adjuster to review the invoice and authorize payment. For the second claim (027-826-014-0101-071) related to Samuel Koslowitz, Jaina verified that Geico had already issued payment of $1,500 on the 8th of the month, which represents the policy limit maximum despite the requested amount being $2,783.97, and she sent proof of payment to claims@mdautorental.com. Jaina summarized the next steps for both claims and offered additional assistance if needed.",
    actions: [
      { type: "follow_up", title: "Await payment status update from Geico adjuster Winsome Batson", contact: "Geico (adjuster: Winsome Batson)", when: null, amount: "$5,001.69", confidence: "high", clarification: null },
      { type: "follow_up", title: "Message auto damage adjuster to review invoice ($5,001.69) and authorize payment timeline", contact: "auto damage adjuster", when: null, amount: "$5,001.69", confidence: "high", clarification: null },
      { type: "follow_up", title: "Await proof of payment confirmation from claims team on second claim (Koslowitz, $1,500)", contact: null, when: null, amount: "$1,500", confidence: "medium", clarification: "Verify proof of payment was actually sent to claims@mdautorental.com with rental number in subject line" }
    ],
  },
  {
    id: "call-10",
    time: "12:02 PM",
    insurer: "Plymouth Rock",
    summary: "Jacqueline from MD Auto Rental called Plymouth Rock Assurance to follow up on a claim for customer Miriam Gross (claim number 685-102-761-751) regarding payment status. After being transferred through the system, she reached Melanie Mack's voicemail, the claims representative assigned to the case. Jacqueline left a message requesting an update on whether repairs have been completed and whether Melanie had reviewed the invoice, noting that in a previous call Melanie had indicated repairs were still ongoing with no updates available at that time. Jacqueline provided her callback number and indicated availability until 4 p.m. Eastern time.",
    actions: [
      { type: "follow_up", title: "Await callback from Melanie Mack (Plymouth Rock) re: claim payment status", contact: "Melanie Mack, Plymouth Rock Assurance", when: "by 4 p.m. Eastern", amount: null, confidence: "high", clarification: null },
      { type: "follow_up", title: "Track repair completion and invoice review status for Miriam Gross claim 685-102-761-751", contact: "Melanie Mack, Plymouth Rock Assurance", when: null, amount: null, confidence: "high", clarification: "Confirm whether repairs are complete and whether Plymouth Rock has reviewed the invoice" }
    ],
  },
  {
    id: "call-11",
    time: "12:02 PM",
    insurer: "USAA",
    summary: "Jacqueline from MD Auto Rental called USAA to follow up on an existing auto insurance claim numbered 0-1-9-2-2-9-5-4-7-8-0-0 involving an accident in New Jersey. She inquired about the payment status for an invoice amount of $3,722.30 that had been submitted for the claim. USAA representative Kiara confirmed that no payment of that amount had been issued by the adjuster and transferred the call to the assigned adjuster, LaShawn, at extension 44761. When LaShawn did not answer, Jacqueline left a voicemail message with LaShawn Madison in the non-injury claims department providing her callback number 732-479-2886 and noting she was available until 4 p.m. EST, requesting follow-up on the payment status for claim 019229547800 related to Schmuel Hyman.",
    actions: [
      { type: "follow_up", title: "Follow up with LaShawn Madison (adjuster) on $3,722.30 payment status for claim 0-1-9-2-9-5-4-7-8-0-0", contact: "LaShawn Madison, USAA adjuster", when: null, amount: "$3,722.30", confidence: "high", clarification: null },
      { type: "follow_up", title: "Await payment of $3,722.30 from USAA on claim 0-1-9-2-9-5-4-7-8-0-0", contact: "USAA", when: null, amount: "$3,722.30", confidence: "high", clarification: null },
      { type: "follow_up", title: "Await payment from USAA for claim 019229547800 (Schmuel Hyman)", contact: "USAA", when: null, amount: null, confidence: "high", clarification: null }
    ],
  },
  {
    id: "call-12",
    time: "12:02 PM",
    insurer: "Insurer",
    summary: "Jacqueline from MD Auto Rental called to follow up on payment status for four claims. For claim 0442785920101015 involving claimant Kalman Rosen with an incident date of May 6, 2026, a $15,000 payment was issued on June 10th and proof of payment was sent to claims@mdautorental.com. For claim 06-311-345-3000000003, a $1,500 payment was made on June 10th to MD Auto Rental and proof was emailed. For claim 04-053-6422000000007 involving claimant Israel Cohen, no payment had been issued; the adjuster assigned is Dominic Lofranco (478-444-6397), and a payment review request for $3,295.71 was submitted to the adjuster and supervisor. For claim 05-966-8703000000004 involving claimant Moshe Haas, no payment had been verified and an invoice was found to still be under review; this was escalated to the adjuster and supervisor with a note requesting follow-up.",
    actions: [
      { type: "follow_up", title: "Await payment status update from GEICO Claims on invoice for Kalman Rosen claim", contact: "GEICO Claims (Ariel)", when: null, amount: null, confidence: "high", clarification: "Ariel was pulling up payment information at end of call; confirm whether payment has been issued and amount" },
      { type: "follow_up", title: "Await proof of payment email for $15,000 claim (issued 6/10)", contact: "Insurance company", when: null, amount: "$15,000", confidence: "high", clarification: null },
      { type: "follow_up", title: "Await proof of payment email for $1,500 claim (issued 6/10)", contact: "Insurance company", when: null, amount: "$1,500", confidence: "high", clarification: null },
      { type: "follow_up", title: "Follow up on $3,295.71 payment status for claim 04-05-36-422-000007 (under AD review)", contact: "Insurance company", when: null, amount: "$3,295.71", confidence: "high", clarification: "Confirm whether the insurance company's AD (adjuster) has approved/issued payment for this claim; no payment was issued at time of call" },
      { type: "follow_up", title: "Obtain auto damage adjuster name and phone number for claim 04-05-36-422-000007", contact: "Insurance company", when: null, amount: null, confidence: "high", clarification: "Clarify correct claimant name on this claim (Israel Cohen vs. R-A-A-A-A-B discrepancy) and obtain adjuster contact details" },
      { type: "follow_up", title: "Await payment review from auto damage adjuster Dominic Lofranco for claim payment 29571", contact: "Dominic Lofranco", when: null, amount: null, confidence: "high", clarification: null },
      { type: "follow_up", title: "Follow up on invoice review status for claim 059-668-703 with adjuster and supervisor", contact: null, when: null, amount: null, confidence: "high", clarification: "Confirm whether the invoice sent for this claim has been reviewed" },
      { type: "follow_up", title: "Await verification and response from auto damage adjuster or supervisor on claim with $3,295.71 payment for Moshe Haas", contact: "auto damage adjuster / supervisor", when: null, amount: "$3,295.71", confidence: "high", clarification: null },
      { type: "follow_up", title: "Await escalation response on rental invoice still under review", contact: "supervisors", when: null, amount: null, confidence: "high", clarification: null }
    ],
  }
];
