export default function PoweredByHighthrive() {
  return (
    <section className="powered-by container">
      <div className="powered-tag">Engineered by</div>
      <h2>
        Built on the <a href="https://highthrive.io" target="_blank" rel="noopener noreferrer">
          <em>Highthrive</em>
        </a> platform.
      </h2>
      <p className="powered-sub">
        TalentPortal runs on Highthrive.io the HR infrastructure layer trusted to handle workforce data for US and
        globally-distributed teams. Same engineering team, same uptime, same security posture.
      </p>
      <div className="powered-brand">
        <span className="ht-by">Powered by</span>
        <img className="ht-mark" src="/favicon.png" alt="Highthrive" />
        <span className="ht-name">
          <a href="https://highthrive.io" target="_blank" rel="noopener noreferrer">
            Highthrive<span style={{ color: "var(--text-faint)" }}>.io</span>
          </a>
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
        </div>
    </section>
  );
}
