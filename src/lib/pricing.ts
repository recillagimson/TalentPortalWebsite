export type BillingMode = "monthly" | "annual";

export interface PricingTier {
  id: "basic" | "premium" | "enterprise";
  name: string;
  cap: string;
  priceMonthly: number;
  priceAnnual: number;
  perTalentMonthly: string;
  perTalentAnnual: string;
  perTalentWasMonthly?: string;
  perTalentWasAnnual?: string;
  strikeMonthly?: string;
  strikeAnnual?: string;
  beatsMonthly: string;
  beatsAnnual: string;
  features: string[];
  ctaLabel: string;
  ctaVariant: "primary" | "secondary";
  featured?: boolean;
  badge?: string;
  // TODO(stripe): fill these once Stripe Products are configured
  priceIdMonthly: string | null;
  priceIdAnnual: string | null;
}

export const TIERS: PricingTier[] = [
  {
    id: "basic",
    name: "Basic",
    cap: "Up to 50 talents",
    priceMonthly: 180,
    priceAnnual: 153,
    perTalentMonthly: "$6",
    perTalentAnnual: "$5.10",
    beatsMonthly: "Beats BambooHR Core by $20+/mo",
    beatsAnnual: "Annual · save 15% vs. monthly",
    features: [
      "Manage Employees + records",
      "HR & Talent dashboards",
      "Leaves request & approval",
      "COE & Payslip downloads",
      "Email support · 24h response",
    ],
    ctaLabel: "Start with Basic",
    ctaVariant: "secondary",
    priceIdMonthly: null,
    priceIdAnnual: null,
  },
  {
    id: "premium",
    name: "Premium",
    cap: "Up to 200 talents",
    priceMonthly: 224,
    priceAnnual: 179,
    perTalentMonthly: "$8.80",
    perTalentAnnual: "$7.04",
    perTalentWasMonthly: "(was $11)",
    perTalentWasAnnual: "(was $8.80)",
    strikeMonthly: "$280",
    strikeAnnual: "$224",
    beatsMonthly: "Beats BambooHR Pro by $186/mo",
    beatsAnnual: "Annual · save 20% more",
    features: [
      "Everything in Basic",
      "Full Payroll engine · US W-2 + 1099",
      "Interactive Org Chart",
      "Ticketing System",
      "Priority support · 4h response",
    ],
    ctaLabel: "Start with Premium",
    ctaVariant: "primary",
    featured: true,
    badge: "Most popular · 20% off",
    priceIdMonthly: null,
    priceIdAnnual: null,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    cap: "Unlimited talents",
    priceMonthly: 480,
    priceAnnual: 360,
    perTalentMonthly: "$15",
    perTalentAnnual: "$11.25",
    beatsMonthly: "Beats BambooHR Elite by $20+/mo",
    beatsAnnual: "Annual · save 25%",
    features: [
      "Everything in Premium",
      "Unlimited talents & admin seats",
      "SSO / SAML, audit logs, SCIM",
      "Custom workflows & integrations",
      "Dedicated CSM · 1h response",
    ],
    ctaLabel: "Talk to sales",
    ctaVariant: "secondary",
    priceIdMonthly: null,
    priceIdAnnual: null,
  },
];
