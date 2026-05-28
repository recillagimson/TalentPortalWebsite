import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
      <div className="container nav">
        <div className="nav-left">
          <Link to="/" className="logo" aria-label="TalentPortal — home">
            <span className="logo-mark">
              <img src="/favicon.png" alt="" width={26} height={26} />
            </span>
            <span>TalentPortal</span>
          </Link>
          <nav className="nav-menu">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="nav-right">
          <a className="btn btn-ghost" href="#signin">Sign in</a>
          <Link className="btn btn-primary" to="/contact">Book a demo</Link>
          <button
            className="mobile-nav-toggle"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.to} to={item.to}>{item.label}</Link>
        ))}
      </div>
    </div>
  );
}
