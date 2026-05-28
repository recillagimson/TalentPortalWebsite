import { useState } from "react";
import BillingToggle from "../components/pricing/BillingToggle";
import PricingCard from "../components/pricing/PricingCard";
import ComparisonTable from "../components/pricing/ComparisonTable";
import FAQ from "../components/pricing/FAQ";
import { TIERS } from "../lib/pricing";
import type { BillingMode, PricingTier } from "../lib/pricing";

export default function Pricing() {
  const [committed, setCommitted] = useState<BillingMode>("monthly");
  const [preview, setPreview] = useState<BillingMode>("monthly");

  function handleSubscribe(tierId: PricingTier["id"], billing: BillingMode) {
    // TODO(stripe): POST /api/checkout { tierId, billing } → redirect to session.url
    console.info("[stripe stub] would start checkout for", { tierId, billing });
    window.location.assign("/contact");
  }

  return (
    <>
      <section className="container pricing-hero">
        <span className="eyebrow">Pricing</span>
        <h1>
          Simple, fair pricing that <em>grows</em> with your team.
        </h1>
        <p>
          Flat platform fee + a small per-talent rate. No surprise add-ons. No annual lock-in unless you want the
          discount.
        </p>

        <BillingToggle
          committed={committed}
          preview={preview}
          onPreview={setPreview}
          onCommit={(m) => {
            setCommitted(m);
            setPreview(m);
          }}
          onLeave={() => setPreview(committed)}
        />
      </section>

      <section className="container">
        <div className="promo-banner">
          <strong>🎁 Premium · 20% off</strong> — limited launch promo, locks in for the first 12 months
        </div>

        <div className="pricing-grid">
          {TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} billing={preview} onSubscribe={handleSubscribe} />
          ))}
        </div>
      </section>

      <ComparisonTable />
      <FAQ />
    </>
  );
}
