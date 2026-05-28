export default function PoweredByHighthrive() {
  return (
    <section className="powered-by container">
      <div className="powered-tag">Engineered by</div>
      <h2>
        Built on the <em>Highthrive</em> platform.
      </h2>
      <p className="powered-sub">
        TalentPortal runs on Highthrive.io — the HR infrastructure layer trusted to handle workforce data for US and
        globally-distributed teams. Same engineering team, same uptime, same security posture.
      </p>
      <div className="powered-brand">
        <span className="ht-by">Powered by</span>
        <span className="ht-mark">H</span>
        <span className="ht-name">
          Highthrive<span style={{ color: "var(--text-faint)" }}>.io</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 28,
          justifyContent: "center",
          marginTop: 36,
          flexWrap: "wrap",
        }}
      >
        <div className="mono" style={{ fontSize: 12, color: "var(--text-faint)" }}>SOC 2 Type II</div>
        <div className="mono" style={{ fontSize: 12, color: "var(--text-faint)" }}>ISO 27001</div>
        <div className="mono" style={{ fontSize: 12, color: "var(--text-faint)" }}>99.97% uptime · last 12 mo</div>
        <div className="mono" style={{ fontSize: 12, color: "var(--text-faint)" }}>GDPR + CCPA</div>
      </div>
    </section>
  );
}
