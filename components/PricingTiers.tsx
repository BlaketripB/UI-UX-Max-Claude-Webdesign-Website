import Link from "next/link";

type Tier = {
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  cta: { href: string; label: string };
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Launch",
    price: "$2,500",
    description:
      "A sharp, modern landing site to get your brand online and converting.",
    features: [
      "Up to 5 responsive pages",
      "Custom design system",
      "On-page SEO + metadata",
      "2 rounds of revisions",
      "Deploy on Vercel",
    ],
    cta: { href: "/contact?tier=launch", label: "Get started" },
  },
  {
    name: "Studio",
    price: "$7,500",
    description:
      "A full marketing site with CMS, animations, and performance tuning.",
    features: [
      "Up to 15 pages",
      "Custom brand + design system",
      "Headless CMS integration",
      "Motion + interaction design",
      "Analytics + SEO setup",
      "4 weeks of post-launch support",
    ],
    cta: { href: "/contact?tier=studio", label: "Get started" },
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    description:
      "Ongoing design + engineering for complex products and enterprise sites.",
    features: [
      "Unlimited pages + routes",
      "Custom apps and integrations",
      "Dedicated design + dev team",
      "Continuous delivery pipeline",
      "Priority support + SLA",
    ],
    cta: { href: "/contact?tier=scale", label: "Contact sales" },
  },
];

function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 flex-none text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export default function PricingTiers() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => {
        const featured = tier.featured;
        return (
          <div
            key={tier.name}
            className={
              "relative flex flex-col rounded-2xl border p-8 transition-colors " +
              (featured
                ? "border-accent/60 bg-surface-elevated shadow-[0_20px_60px_-30px_rgba(59,130,246,0.5)]"
                : "border-border bg-surface hover:border-border-strong")
            }
          >
            {featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground">
                Most popular
              </span>
            )}

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {tier.name}
              </h3>
              <p className="mt-2 min-h-[3rem] text-sm text-muted">
                {tier.description}
              </p>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tight text-foreground">
                {tier.price}
              </span>
              {tier.priceSuffix && (
                <span className="text-sm text-muted">{tier.priceSuffix}</span>
              )}
            </div>

            <ul className="mt-8 space-y-3 text-sm text-secondary">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={tier.cta.href}
              className={
                "mt-10 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors " +
                (featured
                  ? "bg-accent text-foreground hover:bg-accent-strong"
                  : "border border-border bg-background text-secondary hover:border-border-strong hover:text-foreground")
              }
            >
              {tier.cta.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
