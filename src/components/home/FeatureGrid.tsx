import OrgChartPreview from "./OrgChartPreview";

const SimpleFeatures = [
  {
    num: "01 · Records",
    title: "Manage Employees",
    body:
      "One source of truth for every team member — profiles, documents, contracts, history. Search anything, find it in milliseconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="7" r="3" />
        <path d="M4 16c0-3 2.5-5 6-5s6 2 6 5" />
      </svg>
    ),
  },
  {
    num: "02 · Insights",
    title: "HR Dashboard",
    body:
      "Headcount, turnover, leaves, payroll — at a glance. Real-time numbers, no spreadsheets, no waiting on reports.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="14" height="12" rx="1.5" />
        <path d="M3 9h14M7 4v12" />
      </svg>
    ),
  },
  {
    num: "03 · People",
    title: "Talent Dashboard",
    body:
      "Every talent's growth, leaves, payslips, COEs and tickets — in one screen they actually want to open.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12l4-4 3 3 7-7" />
        <path d="M13 4h4v4" />
      </svg>
    ),
  },
];

const TailFeatures = [
  {
    num: "05 · Time off",
    title: "Leaves Request & Approval",
    body:
      "Talents request from any device, managers approve in one tap, the calendar reflects it instantly. Policies you can actually configure.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="14" height="13" rx="1.5" />
        <path d="M3 8h14M7 2v4M13 2v4" />
        <path d="M7 12l1.5 1.5L13 9.5" />
      </svg>
    ),
  },
  {
    num: "06 · Documents",
    title: "COE & Payslip downloads",
    body:
      "Self-service certificates of employment and payslips. Talents stop emailing HR, HR stops drowning in tickets.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="14" height="14" rx="1.5" />
        <path d="M7 7h6M7 10h6M7 13h4" />
      </svg>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <section className="section container">
      <div className="features-intro">
        <span className="eyebrow">What's inside</span>
        <h2>
          Everything HR needs. <em>Nothing</em> it doesn't.
        </h2>
      </div>

      <div className="feature-grid">
        {SimpleFeatures.map((f) => (
          <article key={f.num} className="feature-card">
            <div className="ico">{f.icon}</div>
            <span className="num">{f.num}</span>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </article>
        ))}

        <article className="feature-card feature-card-wide">
          <div className="left">
            <div className="ico">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="7" y="2" width="6" height="4" rx="1" />
                <rect x="2" y="12" width="6" height="4" rx="1" />
                <rect x="12" y="12" width="6" height="4" rx="1" />
                <path d="M10 6v3M10 9H5v3M10 9h5v3" />
              </svg>
            </div>
            <span className="num">04 · Structure</span>
            <h3>Org Chart that draws itself</h3>
            <p>
              Add a hire, change a reporting line — the chart updates automatically. Drag to reorganize. Share a
              public link with the team.
            </p>
            <div className="badge-strip" style={{ marginTop: 8 }}>
              <span className="chip">Drag &amp; drop</span>
              <span className="chip">Public links</span>
              <span className="chip">Export to PDF</span>
            </div>
          </div>
          <OrgChartPreview />
        </article>

        {TailFeatures.map((f) => (
          <article key={f.num} className="feature-card">
            <div className="ico">{f.icon}</div>
            <span className="num">{f.num}</span>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
