type Cell = string | { yes: true; suffix?: string };

interface Row {
  feature: string;
  basic: Cell;
  premium: Cell;
  enterprise: Cell;
}

interface Section {
  head: string;
  rows: Row[];
}

const YES: Cell = { yes: true };

const SECTIONS: Section[] = [
  {
    head: "People & records",
    rows: [
      { feature: "Manage Employees", basic: YES, premium: YES, enterprise: YES },
      { feature: "Document storage per talent", basic: "2 GB", premium: "10 GB", enterprise: "Unlimited" },
      { feature: "Custom fields", basic: "10", premium: "50", enterprise: "Unlimited" },
    ],
  },
  {
    head: "Dashboards & insights",
    rows: [
      { feature: "HR Dashboard", basic: YES, premium: YES, enterprise: YES },
      { feature: "Talent Dashboard (self-service)", basic: YES, premium: YES, enterprise: YES },
      { feature: "Custom reports", basic: "—", premium: YES, enterprise: YES },
    ],
  },
  {
    head: "Org & structure",
    rows: [
      { feature: "Interactive Org Chart", basic: "View only", premium: YES, enterprise: YES },
      { feature: "Public org-chart links", basic: "—", premium: YES, enterprise: YES },
    ],
  },
  {
    head: "Leaves & time off",
    rows: [
      { feature: "Leave request & approval", basic: YES, premium: YES, enterprise: YES },
      { feature: "Configurable leave policies", basic: "3", premium: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    head: "Documents",
    rows: [
      { feature: "COE & Payslip self-download", basic: YES, premium: YES, enterprise: YES },
    ],
  },
  {
    head: "Payroll",
    rows: [
      { feature: "Full payroll engine", basic: "—", premium: YES, enterprise: YES },
      { feature: "US W-2 & 1099 payroll", basic: "—", premium: YES, enterprise: YES },
      { feature: "Multi-currency payroll", basic: "—", premium: "—", enterprise: YES },
    ],
  },
  {
    head: "Ticketing",
    rows: [
      { feature: "Internal HR tickets", basic: "Lite", premium: { yes: true, suffix: " Full" }, enterprise: { yes: true, suffix: " Full" } },
    ],
  },
  {
    head: "Security & admin",
    rows: [
      { feature: "SSO / SAML", basic: "—", premium: "—", enterprise: YES },
      { feature: "SCIM provisioning", basic: "—", premium: "—", enterprise: YES },
      { feature: "Audit logs", basic: "30 days", premium: "1 year", enterprise: "Forever" },
    ],
  },
  {
    head: "Support",
    rows: [
      { feature: "Response time SLA", basic: "24 h", premium: "4 h", enterprise: "1 h · CSM" },
    ],
  },
];

function renderCell(cell: Cell) {
  if (typeof cell === "string") return cell;
  return <><span className="yes">●</span>{cell.suffix ?? ""}</>;
}

export default function ComparisonTable() {
  return (
    <section className="container compare-section">
      <h2>What's included in each tier</h2>
      <p className="lede">Full breakdown of every feature, per plan.</p>

      <div className="compare-table">
        <div className="compare-row compare-head">
          <div className="cell">Feature</div>
          <div className="cell">Basic</div>
          <div className="cell featured-col">Premium</div>
          <div className="cell">Enterprise</div>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.head}>
            <div className="compare-row">
              <div className="cell section-head">{section.head}</div>
            </div>
            {section.rows.map((row) => (
              <div key={row.feature} className="compare-row">
                <div className="cell">{row.feature}</div>
                <div className="cell">{renderCell(row.basic)}</div>
                <div className="cell featured-col">{renderCell(row.premium)}</div>
                <div className="cell">{renderCell(row.enterprise)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
