import { Link } from "react-router-dom";

export default function PayrollShowcase() {
  return (
    <section className="section container">
      <div className="showcase">
        <div>
          <span className="eyebrow">Payroll</span>
          <h2 style={{ marginTop: 14 }}>
            Pay your <em>US &amp; remote</em> team in minutes.
          </h2>
          <p className="muted" style={{ marginTop: 18, fontSize: 16, maxWidth: 440 }}>
            Built for distributed teams. Run payroll for full-time talents, contractors, and freelancers — across
            the US and anywhere your team works.
          </p>
          <div className="stat-list">
            <div className="stat-item">
              <span className="v">
                93<sup>%</sup>
              </span>
              <span className="t">less time per cycle vs. spreadsheets + manual transfers</span>
            </div>
            <div className="stat-item">
              <span className="v">
                US<sup>+</sup>
              </span>
              <span className="t">pay US W-2 employees and 1099 contractors in one workflow</span>
            </div>
            <div className="stat-item">
              <span className="v">
                1<sup>click</sup>
              </span>
              <span className="t">to release payslips to every talent's dashboard</span>
            </div>
          </div>
          <div style={{ marginTop: 32 }}>
            <Link className="btn btn-primary" to="/features#payroll">
              See payroll in action <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
        <div className="placeholder" style={{ aspectRatio: "4 / 3" }}>
          <span className="placeholder-label">Payroll screen — real shot</span>
        </div>
      </div>
    </section>
  );
}
