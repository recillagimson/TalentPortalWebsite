export default function OrgChartPreview() {
  return (
    <div className="right org-preview">
      <div className="org-canvas">
        <div className="org-tier">
          <div className="org-card head">
            <span className="org-avatar">AL</span>
            <div>
              <div className="org-nm">Ana Lopez</div>
              <div className="org-rl">CEO</div>
            </div>
          </div>
        </div>
        <div className="org-link org-link-down" />
        <div className="org-link org-link-h" />
        <div className="org-tier org-tier-3">
          <div className="org-stub">
            <div className="org-card">
              <span className="org-avatar">JT</span>
              <div>
                <div className="org-nm">June Tan</div>
                <div className="org-rl">HR Lead</div>
              </div>
            </div>
          </div>
          <div className="org-stub">
            <div className="org-card focus">
              <span className="org-avatar">RC</span>
              <div>
                <div className="org-nm">Renz Cruz</div>
                <div className="org-rl">Eng Manager</div>
              </div>
              <span className="org-dot">3</span>
            </div>
          </div>
          <div className="org-stub">
            <div className="org-card">
              <span className="org-avatar">DV</span>
              <div>
                <div className="org-nm">Diego V.</div>
                <div className="org-rl">Marketing</div>
              </div>
            </div>
          </div>
        </div>
        <div className="org-watermark">⇄ drag to reorganize</div>
      </div>
    </div>
  );
}
