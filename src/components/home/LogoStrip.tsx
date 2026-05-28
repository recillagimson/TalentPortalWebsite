const LOGOS = [
  "◆ Northwind",
  "⌬ Lumera",
  "▣ Kinto Labs",
  "◐ Brevity",
  "✶ Forager",
  "▼ Stillwater",
];

export default function LogoStrip() {
  return (
    <section className="logos-section">
      <div className="container">
        <div className="label">Trusted by 1,400+ teams running US & remote payroll</div>
        <div className="logos-strip">
          {LOGOS.map((logo) => (
            <span key={logo} className="logo-faux">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
