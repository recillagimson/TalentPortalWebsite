import { Link } from "react-router-dom";
import UiMock from "../ui/UiMock";

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-variant-split">
        <div className="hero-copy">
          <span className="eyebrow">HRIS · Payroll · One platform</span>
          <h1>
            HR that <em>finally</em> feels like it was built for your team.
          </h1>
          <p className="sub">
            TalentPortal handles employee records, payroll, leaves, org charts and tickets — so you can stop
            juggling spreadsheets and start growing the team you actually want.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary btn-lg" to="/contact">
              Book a demo <span className="btn-arrow">→</span>
            </Link>
            <Link className="btn btn-secondary btn-lg" to="/pricing">
              See pricing
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <UiMock src="/dashboard.png" alt="TalentPortal executive overview dashboard" />
        </div>
      </div>
    </section>
  );
}
