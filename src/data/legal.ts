export type LegalDoc = { slug: string; title: string; effective: string; body: string };

export const legalDocs: Record<"terms" | "privacy" | "refunds", LegalDoc> = {
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    effective: "November 10, 2025",
    body: `Welcome to oneby.ai. These Terms & Conditions ("Terms") govern your access to and use of our website, software, and services at https://oneby.ai (the "Service"). By accessing or using the Service, you agree to these Terms and to the policies referenced herein, including our Privacy Policy and Refund & Subscription Policy.

## 1. Acceptance & Electronic Agreement

By clicking accept, creating an account, or using the Service, you agree these Terms form a legally binding electronic agreement. Continued use after any update constitutes acceptance of the revised Terms.

## 2. Services Overview; Changes & Beta Features

OneBy provides a cloud platform for communications and AI-assisted productivity. We may modify, suspend, or discontinue features at any time without liability. Access to beta or experimental features is provided as-is and may be withdrawn at any time.

## 3. Customer Responsibilities

- Provide accurate registration and billing information and keep it current.
- Use the Service only for lawful business purposes and in compliance with all applicable laws.
- Assume full responsibility for activity under your account, including actions by employees or contractors.
- Maintain your own data exports, backups, and reasonable security on devices and networks.

## 4. Account Access, Security & Data Backups

You are responsible for safeguarding credentials and restricting access. We may suspend or terminate accounts for suspicious, abusive, or unlawful activity. OneBy is not a data-backup service and is not liable for loss or corruption of data due to user actions, integrations, or third-party systems.

## 5. AI Features, Outputs & Processing

The Service may generate AI outputs such as transcriptions, summaries, or classifications. AI outputs may contain errors and are for informational purposes only. You are responsible for verifying outputs before relying on them. OneBy does not sell AI-processed data for advertising; data is encrypted in transit and at rest.

## 6. Call Recording & Consent Laws

OneBy operates in a one-party consent jurisdiction (New York). Other jurisdictions may require two-party or all-party consent. You are solely responsible for determining, obtaining, and maintaining all legally required notices and consents before recording or transcribing any communication. OneBy provides recording only as a technical feature and disclaims liability for compliance.

## 7. Subscription, Billing & Fees

Subscriptions are billed monthly or annually and renew automatically unless canceled before the renewal date.

### a) Billing & Payment; Price Changes

- All charges are due at the start of each billing cycle and are final upon activation.
- By continuing to use the Service after renewal, you authorize charges at the then-current rate; we will provide at least 15 days' notice of price changes.

### b) Refunds

Subscription fees are generally non-refundable. Refund requests must be submitted within seven days of charge and may only be approved in limited circumstances such as duplicate billing or confirmed technical failure.

### c) 10DLC Registration

U.S. A2P messaging may require 10DLC brand or campaign registration. A one-time, non-refundable $199 fee per brand may apply for filing, verification, and administration. Failure to complete registration or maintain compliance does not entitle you to a refund and may limit messaging functionality.

### d) Equipment; Returns

- Hardware supplied by OneBy must be returned in its original packaging and condition with all accessories.
- Missing packaging or materials incur a $100 per device replacement charge.
- Devices not returned within 15 days of cancellation are deemed purchased and may be charged accordingly.
- Customer is responsible for return shipping unless otherwise agreed in writing.

### e) Free Trials, Upgrades & Downgrades

- Trials convert to paid service unless canceled before expiration.
- Upgrades take effect immediately and may be prorated.
- Downgrades take effect at renewal; premium features or data may become unavailable.

### f) Chargebacks & Non-Payment

Initiating a chargeback without contacting support may result in account suspension. Late fees up to 1.5% per month (or the maximum allowed by law) may apply, and we may recover reasonable collection and attorney fees.

## 8. Acceptable Use; Enforcement

You may not use the Service to violate law, infringe rights, send spam, disrupt the platform, or misuse AI tools. We may immediately suspend or terminate accounts for prohibited use without refund.

## 9. Privacy & Data Protection

Personal data is processed pursuant to our Privacy Policy and applicable law. Data is retained only as needed for Service delivery and legal obligations. You may request access, correction, or deletion of your data as described in the Privacy Policy.

## 10. Security

Data, including voice and AI data, is encrypted in transit and at rest. Access is restricted to authorized personnel under confidentiality and data-protection standards.

## 11. No Warranties; Limitation of Liability

The Service is provided as-is and as-available. OneBy does not guarantee uninterrupted or error-free operation. OneBy's total liability is limited to the fees you paid in the three months preceding the claim. We are not liable for indirect, incidental, consequential, or punitive damages.

## 12. Indemnification

You agree to indemnify and hold harmless OneBy and its affiliates from any claim, loss, liability, cost, or expense arising out of your use of the Service, including regulatory fines, privacy complaints, or intellectual property disputes.

## 13. No Reliance

No statement, demonstration, or marketing material creates any warranty or obligation not expressly stated in these Terms.

## 14. Governing Law; Arbitration; Class-Action Waiver

Any dispute arising from or relating to these Terms shall be resolved by binding arbitration administered by the American Arbitration Association in New York County, New York. Class or collective actions are waived; claims may be brought only on an individual basis.

## 15. Modifications

We may update these Terms at any time. Updates take effect upon posting to our website. Continued use of the Service constitutes acceptance.

## 16. Contact

For questions, contact support@oneby.ai or visit https://oneby.ai.

## 17. SMS & 10DLC Compliance Disclaimer

OneBy may send SMS messages to customers who have provided their mobile number and given permission to receive communications. By submitting your phone number through our website, forms, or account settings, you consent to receive SMS messages from OneBy related to your account, onboarding, verification, customer support, product updates, or other service-related notifications.

Message frequency varies. Message and data rates may apply. You may opt out at any time by replying STOP. Reply HELP for support or additional information. OneBy does not sell or share your phone number with third parties for marketing purposes. SMS delivery may be subject to your mobile carrier's coverage and limitations.

Your phone number will only be used for communications directly related to OneBy services and will be stored securely in accordance with this Privacy Policy and applicable law.`,
  },
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    effective: "November 10, 2025",
    body: `At OneBy, accessible from https://oneby.ai, protecting your privacy is one of our highest priorities. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your personal data.

## 1. Information We Collect

- Information you provide directly (e.g., name, email, company, or contact details).
- Information collected automatically, including IP address, browser, device, and usage data.
- Communications data, such as messages or recorded calls, used only to provide the requested service.

## 2. How We Use Information

- Operate and maintain our website and platform services.
- Respond to customer inquiries and provide technical support.
- Analyze trends and improve functionality.
- Send service-related notices and security alerts.
- Ensure legal compliance and prevent fraud or abuse.

## 3. AI and Voice Processing

Certain OneBy features use AI to process voice or text data (for transcriptions, summaries, or analytics). This data is encrypted in transit and at rest, used only for service delivery, and never sold for advertising purposes.

## 4. Cookies & Analytics

We use cookies to improve user experience. You may disable cookies in your browser, but some features may not function properly.

## 5. Data Retention

We retain personal data only as long as necessary to fulfill service obligations or comply with legal requirements.

## 6. Your Rights

- Request access to your personal data.
- Request correction or deletion of inaccurate data.
- Withdraw consent for processing where applicable.
- Object to or restrict certain data uses.

## 7. Children's Privacy

OneBy does not knowingly collect data from children under 13. If you believe such data was provided, please contact us to remove it immediately.

## 8. Third-Party Services

Our website may include links to external services with independent privacy practices. Review those policies before sharing any data with third parties.

## 9. Security

We implement technical and organizational measures to protect your data. While no system is entirely secure, we take reasonable precautions to reduce risk.

## 10. International Transfers

Your data may be transferred to or processed in other countries under equivalent data protection safeguards.

## 11. Updates

We may update this Policy periodically. Revisions take effect immediately upon posting to this page.

## 12. Governing Law; Arbitration; Class-Action Waiver

Any dispute arising from or relating to this Privacy Policy shall be resolved by binding arbitration administered by the American Arbitration Association in New York County, New York. Class or collective actions are waived; claims may be brought only on an individual basis.

## 13. Contact Us

For privacy inquiries, contact support@oneby.ai or visit https://oneby.ai.

## 14. SMS & 10DLC Compliance Disclaimer

OneBy may send SMS messages to customers who have provided their mobile number and given permission to receive communications. By submitting your phone number through our website, forms, or account settings, you consent to receive SMS messages from OneBy related to your account, onboarding, verification, customer support, product updates, or other service-related notifications.

Message frequency varies. Message and data rates may apply. You may opt out at any time by replying STOP. Reply HELP for support or additional information. OneBy does not sell or share your phone number with third parties for marketing purposes. SMS delivery may be subject to your mobile carrier's coverage and limitations.

Your phone number will only be used for communications directly related to OneBy services and will be stored securely in accordance with this Privacy Policy.`,
  },
  refunds: {
    slug: "refunds",
    title: "Refund & Subscription Policy",
    effective: "November 10, 2025",
    body: `This Refund & Subscription Policy explains how billing, renewals, refunds, and related fees are handled for services provided by OneBy. By purchasing or using any paid plan, you agree to this Policy in addition to our Terms & Conditions and Privacy Policy.

## 1. Subscription Overview

OneBy provides access to its communication and AI productivity platform on a recurring subscription basis. Plans may be billed monthly or annually and renew automatically unless canceled as described below.

## 2. Billing & Payment

- All subscription fees are due at the start of each billing cycle and are final upon activation.
- By subscribing, you authorize OneBy (or its processor) to charge your payment method automatically at renewal.
- You are responsible for keeping billing information accurate and up to date.

## 3. Automatic Renewal

Unless canceled prior to the renewal date, your subscription renews for the same term at the then-current price. We will provide at least 15 days' notice of price changes.

## 4. Refund Eligibility

Because access is granted immediately, subscription fees are generally non-refundable. Refund requests may be considered only if:

- There is duplicate billing or an accidental overcharge confirmed by our team.
- A documented technical failure prevents access and remains unresolved within a reasonable period.
- Your plan explicitly states a money-back guarantee period, and you cancel within that timeframe.

Requests must be submitted in writing within seven (7) days of the charge. Approved refunds are issued to the original payment method within 5 to 10 business days.

## 5. 10DLC Registration Fees

Some messaging features require U.S. A2P 10DLC brand/campaign registration. When applicable, a one-time, non-refundable $199 USD per brand fee may be charged for carrier filing, verification, and administration. Failure to complete or maintain registration, or carrier blocking, does not entitle you to a refund and may limit messaging functionality.

## 6. Equipment Returns & Device Policy

If OneBy provides hardware (e.g., phones, headsets), you must return it within the agreed timeframe in its original packaging and condition with all included accessories.

- Returning equipment without original packaging/materials will incur a $100 per device replacement charge.
- Devices not returned within 15 days of cancellation are deemed purchased and may be charged accordingly.
- Return shipping is the customer's responsibility unless otherwise agreed in writing.

## 7. Cancellations

You may cancel at any time via your account portal or by contacting support. Cancellation takes effect at the end of the current billing cycle; access remains active until that date. We do not provide prorated refunds for partial periods.

## 8. Free Trials

If a free trial is offered and you do not cancel before it ends, your account converts to a paid plan and your payment method is charged for the upcoming billing period.

## 9. Upgrades & Downgrades

- Upgrades: Take effect immediately; prorated charges may apply for the remainder of the billing cycle.
- Downgrades: Take effect at the next renewal; some features or stored data may become unavailable afterward.

## 10. Chargebacks

Initiating a chargeback without first contacting support may result in account suspension. If a dispute is found invalid, you may be responsible for associated fees or collection costs.

## 11. Termination for Non-Payment

Overdue accounts may be suspended or terminated. OneBy is not responsible for any data loss resulting from termination due to non-payment or unreturned equipment.

## 12. Pricing & Policy Changes

We may update pricing, 10DLC fees, or this Policy at any time. Changes take effect on your next renewal and will be communicated in advance where applicable.

## 13. No Refunds for Violations

No refunds will be granted for accounts terminated due to violations of our Terms & Conditions, misuse of the service, or failure to comply with applicable laws (including call-recording consent requirements).

## 14. Governing Law; Arbitration; Class-Action Waiver

Any dispute arising from or relating to this Refund & Subscription Policy shall be resolved by binding arbitration administered by the American Arbitration Association in New York County, New York. Class or collective actions are waived; claims may be brought only on an individual basis.

## 15. Contact Us

For billing, refund, or subscription questions, contact support@oneby.ai or visit https://oneby.ai.`,
  },
};
