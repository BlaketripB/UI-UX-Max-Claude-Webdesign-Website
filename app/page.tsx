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

type Project = {
  slug: string;
  name: string;
  tag: string;
  year: string;
  description: string;
  cover: string;
};

const projects: Project[] = [
  {
    slug: "northwind-labs",
    name: "Northwind Labs",
    tag: "SaaS · Marketing site",
    year: "2026",
    description:
      "Repositioned an infra startup with a new brand system and a marketing site that lifted demo requests by 62%.",
    cover:
      "bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_60%),linear-gradient(135deg,#0f172a,#0a0a0a)]",
  },
  {
    slug: "hearth-and-co",
    name: "Hearth & Co.",
    tag: "E-commerce · Shopify",
    year: "2025",
    description:
      "A calm, editorial storefront for a home goods brand. Headless Shopify, custom PDPs, and bespoke motion.",
    cover:
      "bg-[radial-gradient(circle_at_75%_30%,rgba(37,99,235,0.30),transparent_55%),linear-gradient(210deg,#141414,#0a0a0a)]",
  },
  {
    slug: "meridian-capital",
    name: "Meridian Capital",
    tag: "Financial · Corporate",
    year: "2025",
    description:
      "Trust-first design for a private credit firm. Rigorous typography, serious color, and a data room that ships.",
    cover:
      "bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.28),transparent_60%),linear-gradient(150deg,#0a0a0a,#1c1c1c)]",
  },
  {
    slug: "volt-fitness",
    name: "Volt Fitness",
    tag: "D2C · Mobile-first",
    year: "2024",
    description:
      "A kinetic, mobile-first product site for a connected fitness brand. 98 Lighthouse, 1.2s LCP on 4G.",
    cover:
      "bg-[radial-gradient(circle_at_70%_70%,rgba(37,99,235,0.40),transparent_60%),linear-gradient(20deg,#0a0a0a,#141414)]",
  },
];

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

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center md:py-40">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-secondary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Now booking projects for Q2
          </span>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Websites that <span className="text-accent">convert</span>,
            <br className="hidden sm:block" /> not just exist.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-secondary sm:text-lg">
            Locked In is a design and development studio building fast, modern
            sites for ambitious brands. Clean code, sharp visuals, measurable
            results.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-strong"
            >
              Start a project
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-secondary transition-colors hover:border-border-strong hover:text-foreground"
            >
              See our work →
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="relative border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Services
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Pick the tier that fits your stage.
            </h2>
            <p className="mt-4 text-base text-secondary sm:text-lg">
              Transparent, fixed pricing. No hidden fees, no drawn-out
              contracts — just great work, shipped on time.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
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
                      <span className="text-sm text-muted">
                        {tier.priceSuffix}
                      </span>
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

          <p className="mt-10 text-center text-sm text-muted">
            Need something different?{" "}
            <Link
              href="/contact"
              className="text-secondary underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Tell us about your project
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="work" className="relative border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Selected work
              </span>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Recent projects.
              </h2>
              <p className="mt-4 text-base text-secondary sm:text-lg">
                A handful of sites we&apos;ve shipped lately for founders,
                funds, and fast-moving brands.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-foreground"
            >
              View all work
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong"
              >
                <div
                  className={
                    "relative aspect-[16/10] overflow-hidden " + project.cover
                  }
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
                  />
                  <div className="absolute inset-0 flex items-end p-8">
                    <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                      {project.name}
                    </span>
                  </div>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-8">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span className="uppercase tracking-[0.14em]">
                      {project.tag}
                    </span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-1 text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent"
                    >
                      →
                    </span>
                  </div>
                  <p className="text-sm text-secondary">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
