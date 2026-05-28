import { Link } from "react-router-dom";

export default function FinalCta() {
  return (
    <section className="section container">
      <div className="cta-final">
        <div>
          <span className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>
            Ready when you are
          </span>
          <h2 style={{ marginTop: 12 }}>
            Stop managing HR. <em>Start growing</em> the team.
          </h2>
        </div>
        <div className="cta-actions">
          <Link className="btn btn-primary btn-lg" to="/contact">
            Book a 20-min demo <span className="btn-arrow">→</span>
          </Link>
          <Link className="btn btn-ghost btn-lg" to="/pricing">
            View pricing
          </Link>
          <p className="mono" style={{ fontSize: 11.5, opacity: 0.6, marginTop: 6 }}>
            Avg. setup time: 47 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
