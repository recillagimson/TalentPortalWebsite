import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="logo" style={{ marginBottom: 16 }} aria-label="TalentPortal — home">
              <span className="logo-mark">
                <img src="/favicon.png" alt="" width={26} height={26} />
              </span>
              <span>TalentPortal</span>
            </Link>
            <p className="muted" style={{ fontSize: 14, marginTop: 14, maxWidth: 280 }}>
              The friendly HRIS and Payroll platform built for growing teams.
            </p>
            <div className="footer-tag" style={{ marginTop: 24 }}>
              Powered by{" "}
              <a
                href="https://highthrive.io"
                style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                Highthrive.io
              </a>
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Product</div>
            <ul>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/features#payroll">Payroll</Link></li>
              <li><Link to="/features#org">Org chart</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#customers">Customers</a></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Legal</div>
            <ul>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#dpa">DPA</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TalentPortal. All rights reserved.</span>
          <span className="footer-tag">v 2.4 · last deploy 2 days ago</span>
        </div>
      </div>
    </footer>
  );
}
