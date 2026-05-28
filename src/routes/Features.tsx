import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SECTIONS = [
  { id: "employees", label: "Employees" },
  { id: "hr-dashboard", label: "HR Dashboard" },
  { id: "talent-dashboard", label: "Talent Dashboard" },
  { id: "org", label: "Org Chart" },
  { id: "leaves", label: "Leaves" },
  { id: "docs", label: "COE & Payslip" },
  { id: "payroll", label: "Payroll" },
  { id: "tickets", label: "Tickets" },
  { id: "settings", label: "Settings" },
];

const Check = () => (
  <svg viewBox="0 0 12 12">
    <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" />
  </svg>
);

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span className="b-dot"><Check /></span>
      {children}
    </li>
  );
}

const DASH_BARS = [30, 38, 35, 42, 48, 45, 55, 60, 58, 65, 72, 78, 82, 88];

interface Employee { initials: string; name: string; role: string; active: boolean }
const EMPLOYEES: Employee[] = [
  { initials: "MA", name: "Maya Aldana", role: "Product Designer", active: true },
  { initials: "RC", name: "Renz Cruz", role: "Backend Engineer", active: true },
  { initials: "JT", name: "June Tan", role: "HR Lead", active: true },
  { initials: "DV", name: "Diego Velez", role: "Marketing Mgr", active: false },
  { initials: "KS", name: "Kira Salud", role: "Customer Success", active: true },
  { initials: "NR", name: "Noel Ramos", role: "Finance Analyst", active: true },
];

type LeaveMod = "leave" | "leave alt" | "muted" | null;
interface LeaveDay { day: string; mod: LeaveMod }
const LEAVE_DAYS: LeaveDay[] = [
  { day: "1", mod: null }, { day: "2", mod: null }, { day: "3", mod: null }, { day: "4", mod: null },
  { day: "5", mod: null }, { day: "6", mod: "muted" }, { day: "7", mod: "muted" },
  { day: "8", mod: null }, { day: "9", mod: "leave" }, { day: "10", mod: "leave" }, { day: "11", mod: null },
  { day: "12", mod: "leave alt" }, { day: "13", mod: "muted" }, { day: "14", mod: "muted" },
  { day: "15", mod: null }, { day: "16", mod: null }, { day: "17", mod: null },
  { day: "18", mod: "leave alt" }, { day: "19", mod: "leave alt" }, { day: "20", mod: "muted" }, { day: "21", mod: "muted" },
  { day: "22", mod: null }, { day: "23", mod: "leave" }, { day: "24", mod: null }, { day: "25", mod: null },
  { day: "26", mod: null }, { day: "27", mod: "muted" }, { day: "28", mod: "muted" },
];

interface DocRow { icon: string; title: string; meta: string }
const DOC_ROWS: DocRow[] = [
  { icon: "COE", title: "Certificate of Employment", meta: "Generated · May 24, 2026" },
  { icon: "PDF", title: "Payslip · April 2026", meta: "$3,420 · Released Apr 30" },
  { icon: "PDF", title: "Payslip · March 2026", meta: "$3,420 · Released Mar 30" },
  { icon: "W-2", title: "W-2 · 2025 wage statement", meta: "Tax year 2025 · Annual" },
  { icon: "DOC", title: "Employment Contract", meta: "Signed · Mar 14, 2023" },
];

interface PayRow { name: string; gross: string; deductions: string; net: string }
const PAY_ROWS: PayRow[] = [
  { name: "Maya Aldana", gross: "$3,800", deductions: "$612", net: "$3,188" },
  { name: "Renz Cruz", gross: "$5,200", deductions: "$910", net: "$4,290" },
  { name: "June Tan", gross: "$4,400", deductions: "$748", net: "$3,652" },
  { name: "Kira Salud", gross: "$2,900", deductions: "$435", net: "$2,465" },
];

interface Ticket { id: string; tag: string; tagClass: "hr" | "fin" | "it"; title: string; meta: string }
const TICKETS: Ticket[] = [
  { id: "#TP-2841", tag: "HR", tagClass: "hr", title: "Update W-4 withholding (Single → Married, 1 dep.)", meta: "June Tan · 2 hours ago · Awaiting docs" },
  { id: "#TP-2840", tag: "Finance", tagClass: "fin", title: "Reimbursement: client lunch · $48.20", meta: "Diego Velez · yesterday · Approved" },
  { id: "#TP-2839", tag: "IT", tagClass: "it", title: "New laptop request — Q3 hire onboarding", meta: "Renz Cruz · 2 days ago · In progress" },
  { id: "#TP-2838", tag: "HR", tagClass: "hr", title: "Update direct deposit account", meta: "Maya Aldana · 3 days ago · Done" },
];

interface SettingRow { label: string; sub: string; on: boolean }
const SETTING_ROWS: SettingRow[] = [
  { label: "Two-factor authentication", sub: "Require 2FA for all admin accounts", on: true },
  { label: "Auto-approve leaves under 1 day", sub: "Skip manager approval for half-day & 1-day leaves", on: true },
  { label: "Allow public org chart link", sub: "Share read-only chart with anyone with the URL", on: false },
  { label: "Email payslips automatically", sub: "Send each talent their payslip on release day", on: true },
  { label: "Anonymous attrition survey", sub: "Quarterly pulse, anonymized at the talent level", on: false },
];

export default function Features() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const location = useLocation();

  // Scroll to hash section on mount / hash change
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      // Defer to let layout settle
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [location.hash]);

  // Active-section scroll spy
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      let active = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) active = s.id;
      }
      setActiveSection(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="container features-hero">
        <span className="eyebrow">Features</span>
        <h1>
          Every tool your HR team will <em>actually use</em>.
        </h1>
        <p>Nine modules, one platform. Each built to feel obvious within minutes of opening it.</p>
      </section>

      <div className="feature-nav">
        <div className="container">
          <div className="feature-nav-inner">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={activeSection === s.id ? "active" : undefined}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {/* 1. Manage Employees */}
        <section className="feature-block" id="employees">
          <div className="feature-row">
            <div className="feature-copy">
              <span className="eyebrow">Module 01 · Records</span>
              <h2>One <em>source of truth</em> for every team member.</h2>
              <p>
                Profiles, documents, contracts, employment history — searchable, exportable, and always up to date.
                Built for HR teams who are tired of "where's that file?"
              </p>
              <ul className="feature-bullets">
                <Bullet>Full profile + employment timeline per talent</Bullet>
                <Bullet>Bulk import from CSV or your old HRIS</Bullet>
                <Bullet>Custom fields, custom views, custom everything</Bullet>
              </ul>
            </div>
            <div className="feature-vis">
              <div className="vis-directory">
                {EMPLOYEES.map((e) => (
                  <div key={e.initials} className="emp-card">
                    <div className="emp-avatar">{e.initials}</div>
                    <div>
                      <div className="nm">{e.name}</div>
                      <div className="rl">{e.role}</div>
                    </div>
                    <span className={`badge${e.active ? "" : " off"}`}>{e.active ? "Active" : "On leave"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. HR Dashboard */}
        <section className="feature-block" id="hr-dashboard">
          <div className="feature-row reverse">
            <div className="feature-copy">
              <span className="eyebrow">Module 02 · Insights</span>
              <h2>Numbers that <em>tell the story</em>, not hide it.</h2>
              <p>
                Real-time headcount, payroll, attrition, time-off — at-a-glance. Drill into any metric. Export
                anything as PDF or CSV.
              </p>
              <ul className="feature-bullets">
                <Bullet>Live KPIs across the whole company</Bullet>
                <Bullet>Customizable widget layouts per role</Bullet>
                <Bullet>Saved reports + scheduled email digests</Bullet>
              </ul>
            </div>
            <div className="feature-vis">
              <div className="vis-dashboard">
                <div className="widget">
                  <div className="w-label">Headcount</div>
                  <div className="w-val">128</div>
                  <div className="w-delta">+4 this month</div>
                </div>
                <div className="widget">
                  <div className="w-label">Attrition · YTD</div>
                  <div className="w-val">3.1%</div>
                  <div className="w-delta" style={{ color: "var(--text-muted)" }}>vs 6.4% industry</div>
                </div>
                <div className="widget w-wide">
                  <div className="w-label">Talent growth · last 14 weeks</div>
                  <div className="w-bars">
                    {DASH_BARS.map((h, i) => (
                      <span key={i} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="widget">
                  <div className="w-label">Pending leaves</div>
                  <div className="w-val">7</div>
                  <div className="w-delta" style={{ color: "var(--text-muted)" }}>3 awaiting approval</div>
                </div>
                <div className="widget">
                  <div className="w-label">Open tickets</div>
                  <div className="w-val">12</div>
                  <div className="w-delta" style={{ color: "var(--text-muted)" }}>avg resolve 4.2h</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Talent Dashboard */}
        <section className="feature-block" id="talent-dashboard">
          <div className="feature-row">
            <div className="feature-copy">
              <span className="eyebrow">Module 03 · Self-service</span>
              <h2>A talent dashboard people <em>actually open</em>.</h2>
              <p>
                Their info, their leaves, their payslips, their tickets. Self-service that takes the load off HR and
                makes talents feel in control.
              </p>
              <ul className="feature-bullets">
                <Bullet>Personalized home view per talent</Bullet>
                <Bullet>Request leaves, download docs, submit tickets</Bullet>
                <Bullet>Mobile-friendly. Works on any browser.</Bullet>
              </ul>
            </div>
            <div className="feature-vis" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 14, borderBottom: "1px solid var(--border-soft)" }}>
                <div className="emp-avatar" style={{ width: 48, height: 48, fontSize: 14 }}>JT</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>Welcome back, June</div>
                  <div style={{ fontSize: 12.5, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>HR Lead · since Mar 2023</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                <div className="widget" style={{ padding: 12 }}>
                  <div className="w-label">Leave balance</div>
                  <div className="w-val" style={{ fontSize: 22 }}>
                    11<span style={{ fontSize: 12, color: "var(--text-muted)" }}>days</span>
                  </div>
                </div>
                <div className="widget" style={{ padding: 12 }}>
                  <div className="w-label">Next payslip</div>
                  <div className="w-val" style={{ fontSize: 14, fontFamily: "var(--font-mono)", letterSpacing: 0 }}>May 30</div>
                </div>
                <div className="widget" style={{ padding: 12 }}>
                  <div className="w-label">Open tickets</div>
                  <div className="w-val" style={{ fontSize: 22 }}>2</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-faint)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Quick actions
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span className="chip chip-green">Request leave</span>
                  <span className="chip">Download COE</span>
                  <span className="chip">Download payslip</span>
                  <span className="chip">Update info</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Org Chart */}
        <section className="feature-block" id="org">
          <div className="feature-row reverse">
            <div className="feature-copy">
              <span className="eyebrow">Module 04 · Structure</span>
              <h2>An org chart that <em>draws itself</em>.</h2>
              <p>
                Add a hire, change a reporting line — the chart updates automatically. Drag to reorganize. Share a
                public link with the whole team.
              </p>
              <ul className="feature-bullets">
                <Bullet>Drag-and-drop hierarchy editing</Bullet>
                <Bullet>Public read-only links for the whole team</Bullet>
                <Bullet>Export as PDF, PNG, or SVG</Bullet>
              </ul>
            </div>
            <div className="feature-vis vis-org">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: "100%" }}>
                <div className="org-node head"><div className="nm">Ana Lopez</div><div className="rl">CEO</div></div>
                <div className="org-line" />
                <div className="org-row" style={{ width: "100%", maxWidth: 380, position: "relative" }}>
                  <div style={{ position: "absolute", top: -1, left: "25%", right: "25%", height: 1, background: "var(--border-strong)" }} />
                  <div className="org-node"><div className="nm">June Tan</div><div className="rl">HR Lead</div></div>
                  <div className="org-node"><div className="nm">Renz Cruz</div><div className="rl">Eng Mgr</div></div>
                  <div className="org-node"><div className="nm">Diego Velez</div><div className="rl">Mkt Mgr</div></div>
                </div>
                <div className="org-line" />
                <div className="org-row" style={{ width: "100%", maxWidth: 420 }}>
                  <div className="org-node"><div className="nm">Kira Salud</div><div className="rl">CS Specialist</div></div>
                  <div className="org-node"><div className="nm">Maya Aldana</div><div className="rl">Designer</div></div>
                  <div className="org-node"><div className="nm">Noel Ramos</div><div className="rl">Analyst</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Leaves */}
        <section className="feature-block" id="leaves">
          <div className="feature-row">
            <div className="feature-copy">
              <span className="eyebrow">Module 05 · Time off</span>
              <h2>Leave requests that resolve in <em>one tap</em>.</h2>
              <p>
                Talents request from any device. Managers approve from email, mobile, or dashboard. Calendar
                reflects it instantly. Policies you can configure to fit your company.
              </p>
              <ul className="feature-bullets">
                <Bullet>Auto-accrual, custom policies per team</Bullet>
                <Bullet>Team calendar, conflict warnings</Bullet>
                <Bullet>Holiday calendars for US federal + 30+ country presets</Bullet>
              </ul>
            </div>
            <div className="feature-vis vis-leaves">
              <div className="leave-cal-head">
                <span className="leave-cal-month">May 2026</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>3 on leave</span>
              </div>
              <div className="leave-cal-grid">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} className="leave-cal-day head">{d}</div>
                ))}
                {LEAVE_DAYS.map((d, i) => (
                  <div
                    key={i}
                    className={`leave-cal-day${d.mod && d.mod !== "muted" ? " " + d.mod : ""}`}
                    style={d.mod === "muted" ? { color: "var(--text-faint)" } : undefined}
                  >
                    {d.day}
                  </div>
                ))}
              </div>
              <div className="leave-list">
                <div className="row">
                  <span className="dot" />
                  <span className="nm">Maya Aldana</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 11.5 }}>Vacation</span>
                  <span className="rg">May 9–10</span>
                  <span className="status app">Approved</span>
                </div>
                <div className="row">
                  <span className="dot" style={{ background: "var(--accent)" }} />
                  <span className="nm">Diego Velez</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 11.5 }}>Sick</span>
                  <span className="rg">May 12</span>
                  <span className="status pen">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Docs */}
        <section className="feature-block" id="docs">
          <div className="feature-row reverse">
            <div className="feature-copy">
              <span className="eyebrow">Module 06 · Documents</span>
              <h2>Self-service docs. <em>No more</em> "can I get my COE?" emails.</h2>
              <p>
                Talents download their Certificate of Employment, payslips, W-2s, 1099s, and contracts on demand.
                Auto-generated with your branding.
              </p>
              <ul className="feature-bullets">
                <Bullet>One-click COE generation with auto-signature</Bullet>
                <Bullet>Full payslip archive, downloadable anytime</Bullet>
                <Bullet>Custom templates per document type</Bullet>
              </ul>
            </div>
            <div className="feature-vis vis-docs">
              {DOC_ROWS.map((d) => (
                <div key={d.title} className="doc-row">
                  <div className="doc-icon">{d.icon}</div>
                  <div>
                    <div className="nm">{d.title}</div>
                    <div className="meta">{d.meta}</div>
                  </div>
                  <span className="btn-mini">Download</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Payroll */}
        <section className="feature-block" id="payroll">
          <div className="feature-row">
            <div className="feature-copy">
              <span className="eyebrow">Module 07 · Payroll</span>
              <h2>Payroll built for <em>US &amp; remote</em> teams.</h2>
              <p>
                Pay full-time talents, contractors, and freelancers — across the US and worldwide. Compute, review,
                approve. Payslips released to every dashboard in a click.
              </p>
              <ul className="feature-bullets">
                <Bullet>US W-2 employees and 1099 contractors in one workflow</Bullet>
                <Bullet>Multi-currency payouts for remote talents worldwide</Bullet>
                <Bullet>Multiple pay schedules + off-cycle bonus runs</Bullet>
                <Bullet>One-click payslip release to every talent</Bullet>
              </ul>
            </div>
            <div className="feature-vis vis-payroll">
              <div className="pay-header">
                <div>
                  <div className="lab">May 2026 · Total payroll</div>
                  <div className="tot">$284,612.40</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="lab">Run status</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--positive)" }}>● Approved · ready to pay</div>
                </div>
              </div>
              <div className="pay-rows">
                <div className="pay-row head">
                  <div>Talent</div>
                  <div className="num">Gross</div>
                  <div className="num">Deductions</div>
                  <div className="num">Net</div>
                </div>
                {PAY_ROWS.map((p) => (
                  <div key={p.name} className="pay-row">
                    <div className="nm">{p.name}</div>
                    <div className="num">{p.gross}</div>
                    <div className="num">{p.deductions}</div>
                    <div className="num net">{p.net}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. Tickets */}
        <section className="feature-block" id="tickets">
          <div className="feature-row reverse">
            <div className="feature-copy">
              <span className="eyebrow">Module 08 · Tickets</span>
              <h2>Every HR request <em>tracked</em>, none lost.</h2>
              <p>
                Talents submit. HR responds. Everything logged with full history. No more inbox archaeology trying
                to find that one request from last quarter.
              </p>
              <ul className="feature-bullets">
                <Bullet>Categories, priorities, SLAs</Bullet>
                <Bullet>Auto-routing to HR, Finance, or IT</Bullet>
                <Bullet>Email + in-app notifications</Bullet>
              </ul>
            </div>
            <div className="feature-vis vis-tickets">
              {TICKETS.map((t) => (
                <div key={t.id} className="ticket">
                  <div className="t-head">
                    <span className="t-id">{t.id}</span>
                    <span className={`t-tag ${t.tagClass}`}>{t.tag}</span>
                  </div>
                  <div className="t-title">{t.title}</div>
                  <div className="t-meta">{t.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Settings */}
        <section className="feature-block" id="settings">
          <div className="feature-row">
            <div className="feature-copy">
              <span className="eyebrow">Module 09 · Settings</span>
              <h2>Configure <em>your way</em>, not ours.</h2>
              <p>
                Every workflow, policy, role, and template — tunable from a single Settings hub. No "contact your
                account manager to change a leave policy."
              </p>
              <ul className="feature-bullets">
                <Bullet>Granular role-based permissions</Bullet>
                <Bullet>Custom approval workflows per process</Bullet>
                <Bullet>Branding: logos, colors, email templates</Bullet>
              </ul>
            </div>
            <div className="feature-vis vis-settings">
              {SETTING_ROWS.map((r) => (
                <div key={r.label} className={`setting-row${r.on ? " on" : ""}`}>
                  <div>
                    <div className="lab">{r.label}</div>
                    <div className="sub">{r.sub}</div>
                  </div>
                  <div className="switch" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="final-cta-strip">
          <span className="eyebrow">Convinced?</span>
          <h2 style={{ marginTop: 12 }}>
            See it all in action in a <em>20-minute</em> demo.
          </h2>
          <p>Bring your messiest HR question. We'll show you how TalentPortal handles it — live, with real data.</p>
          <div className="actions">
            <Link className="btn btn-primary btn-lg" to="/contact">
              Book a demo <span className="btn-arrow">→</span>
            </Link>
            <Link className="btn btn-secondary btn-lg" to="/pricing">
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
