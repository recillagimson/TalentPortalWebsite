const FAQS = [
  {
    q: 'What counts as a "talent"?',
    a: "Anyone with an active employment record in TalentPortal — full-time, part-time, contract, or intern. Inactive / archived records don't count toward your limit.",
  },
  {
    q: "Can I switch plans anytime?",
    a: "Yes — upgrade instantly, downgrade at the end of your current billing cycle. We pro-rate everything automatically.",
  },
  {
    q: "What's the difference between monthly and annual billing?",
    a: "Annual billing is paid upfront for 12 months and saves you 15–25% depending on tier. Monthly is invoiced each month with no commitment.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — 14 days, full Premium feature set, no credit card required. We'll help you import your employee data so you can really test it.",
  },
  {
    q: "Is the per-talent rate billed monthly or annually?",
    a: "Same cadence as your plan. On annual billing, we project headcount and reconcile at renewal. On monthly, we charge the exact head count at the end of each cycle.",
  },
  {
    q: "Where is my data hosted?",
    a: "TalentPortal runs on Highthrive.io infrastructure with primary hosting in the US (AWS us-east-1) and full multi-region replication. SOC 2 Type II, ISO 27001, GDPR and CCPA compliant.",
  },
];

export default function FAQ() {
  return (
    <section className="faq-section">
      <div className="container">
        <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 3.8vw, 44px)", letterSpacing: "-0.025em" }}>
          Common questions
        </h2>
        <p
          className="lede"
          style={{ textAlign: "center", color: "var(--text-muted)", maxWidth: 540, margin: "12px auto 0" }}
        >
          If something's not here, our team replies same-day.
        </p>
        <div className="faq-grid">
          {FAQS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <div className="answer">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
