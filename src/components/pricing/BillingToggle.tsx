import type { BillingMode } from "../../lib/pricing";

interface Props {
  committed: BillingMode;
  preview: BillingMode;
  onPreview: (mode: BillingMode) => void;
  onCommit: (mode: BillingMode) => void;
  onLeave: () => void;
}

export default function BillingToggle({ committed, preview, onPreview, onCommit, onLeave }: Props) {
  return (
    <>
      <div
        className="billing-toggle"
        data-mode={preview}
        aria-label="Billing period"
        onMouseLeave={onLeave}
      >
        <div className="pill-bg" />
        <button
          type="button"
          className={preview === "monthly" ? "active" : undefined}
          onMouseEnter={() => onPreview("monthly")}
          onClick={() => onCommit("monthly")}
          aria-pressed={committed === "monthly"}
        >
          Monthly
        </button>
        <button
          type="button"
          className={preview === "annual" ? "active" : undefined}
          onMouseEnter={() => onPreview("annual")}
          onClick={() => onCommit("annual")}
          aria-pressed={committed === "annual"}
        >
          Annual <span className="save-chip">save up to 25%</span>
        </button>
      </div>
      <span className="billing-hint">Hover or tap a tab — prices update live</span>
    </>
  );
}
