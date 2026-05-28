import type React from "react";
import type { BillingMode, PricingTier } from "../../lib/pricing";

interface Props {
  tier: PricingTier;
  billing: BillingMode;
  onSubscribe: (tierId: PricingTier["id"], billing: BillingMode) => void;
}

const Check = () => (
  <svg viewBox="0 0 12 12">
    <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" />
  </svg>
);

const TIER_ICONS: Record<PricingTier["id"], React.ReactElement> = {
  basic: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 4l-5 5 5 5 5-5z" />
      <path d="M7 12l3-3 3 3" />
    </svg>
  ),
  premium: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 2l2.6 5.3 5.9.9-4.3 4.1 1 5.7-5.2-2.7-5.2 2.7 1-5.7L1.5 8.2l5.9-.9z" />
    </svg>
  ),
  enterprise: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="14" height="13" />
      <path d="M3 8h14M7 4v13M13 4v13" />
    </svg>
  ),
};

export default function PricingCard({ tier, billing, onSubscribe }: Props) {
  const price = billing === "annual" ? tier.priceAnnual : tier.priceMonthly;
  const perTalent = billing === "annual" ? tier.perTalentAnnual : tier.perTalentMonthly;
  const perTalentWas = billing === "annual" ? tier.perTalentWasAnnual : tier.perTalentWasMonthly;
  const strike = billing === "annual" ? tier.strikeAnnual : tier.strikeMonthly;
  const beats = billing === "annual" ? tier.beatsAnnual : tier.beatsMonthly;

  return (
    <article className={`price-card${tier.featured ? " featured" : ""}`} data-tier={tier.id}>
      {tier.badge && <div className="price-card-badge">{tier.badge}</div>}

      <div className="tier-head">
        <div className="tier-icon">{TIER_ICONS[tier.id]}</div>
        <div>
          <div className="tier-name">{tier.name}</div>
          <div className="tier-cap">{tier.cap}</div>
        </div>
      </div>

      <div className="price-display">
        {strike && <span className="strike">{strike}</span>}
        <span className="currency">$</span>
        <span className="amount">{price}</span>
        <span className="period">/mo</span>
      </div>

      <div className="per-talent">
        + <span>{perTalent}</span> per talent{" "}
        {perTalentWas ? (
          <span className="was">{perTalentWas}</span>
        ) : (
          <span className="period" style={{ color: "var(--text-faint)", fontSize: 13 }}>
            / month
          </span>
        )}
      </div>

      <div className="beats-note">{beats}</div>

      <ul className="feature-list">
        {tier.features.map((f) => (
          <li key={f}>
            <span className="check"><Check /></span>
            {f}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`btn btn-${tier.ctaVariant}`}
        onClick={() => onSubscribe(tier.id, billing)}
      >
        {tier.ctaLabel}
      </button>
    </article>
  );
}
