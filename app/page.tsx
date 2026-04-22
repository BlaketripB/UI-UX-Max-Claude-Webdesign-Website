import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import Marquee from "@/components/Marquee";
import CountUp from "@/components/CountUp";

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
    tag: "SaaS · Marketing",
    year: "2026",
    description:
      "Repositioned an infra startup with a new brand system and a marketing site that lifted demo requests by 62%.",
    cover:
      "bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.45),transparent_60%),linear-gradient(135deg,#0f1025,#070709)]",
  },
  {
    slug: "hearth-and-co",
    name: "Hearth & Co.",
    tag: "E-commerce · Shopify",
    year: "2025",
    description:
      "A calm, editorial storefront for a home goods brand. Headless Shopify, custom PDPs, and bespoke motion.",
    cover:
      "bg-[radial-gradient(circle_at_75%_30%,rgba(34,211,238,0.35),transparent_55%),linear-gradient(210deg,#0a1520,#070709)]",
  },
  {
    slug: "meridian-capital",
    name: "Meridian Capital",
    tag: "Financial · Corporate",
    year: "2025",
    description:
      "Trust-first design for a private credit firm. Rigorous typography, serious color, and a data room that ships.",
    cover:
      "bg-[radial-gradient(circle_at_20%_80%,rgba(129,140,248,0.35),transparent_60%),linear-gradient(150deg,#070709,#141828)]",
  },
  {
    slug: "volt-fitness",
    name: "Volt Fitness",
    tag: "D2C · Mobile-first",
    year: "2024",
    description:
      "A kinetic, mobile-first product site for a connected fitness brand. 98 Lighthouse, 1.2s LCP on 4G.",
    cover:
      "bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.5),transparent_60%),linear-gradient(20deg,#070709,#1a1330)]",
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
    cta: { href: "#contact", label: "Get started" },
  },
  {
    name: "Studio",
    price: "$7,500",
    description:
      "A full marketing site with CMS, cinematic motion, and performance tuning.",
    features: [
      "Up to 15 pages",
      "Custom brand + design system",
      "Headless CMS integration",
      "Motion + interaction design",
      "Analytics + SEO setup",
      "4 weeks of post-launch support",
    ],
    cta: { href: "#contact", label: "Get started" },
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
    cta: { href: "#contact", label: "Contact sales" },
  },
];

const process = [
  {
    step: "01",
    title: "Discover",
    body: "Kickoff workshop, audience interviews, competitive teardown. We leave with a sharpened narrative and a design brief.",
  },
  {
    step: "02",
    title: "Design",
    body: "Custom type, art direction, and a component system in Figma. Cinematic prototypes — not wireframes.",
  },
  {
    step: "03",
    title: "Build",
    body: "Next.js + Tailwind. Scroll and 3D motion engineered with care, tuned for Lighthouse 95+.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Vercel deploy, analytics, SEO and social metadata dialed in. Iterate with real data post-launch.",
  },
];

const marqueeWords = [
  "Design",
  "Development",
  "Motion",
  "Branding",
  "SEO",
  "CMS",
  "E-commerce",
  "Performance",
  "3D",
  "Interaction",
];

function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 flex-none text-accent-2"
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
      <Hero />

      {/* Marquee of capabilities */}
      <section
        aria-label="Capabilities"
        className="relative border-y border-border bg-surface/40 py-8"
      >
        <Marquee speed="normal">
          {marqueeWords.map((word) => (
            <span
              key={word}
              className="flex items-center gap-10 text-3xl font-semibold tracking-tight text-foreground/70 sm:text-5xl"
            >
              {word}
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* Services */}
      <section id="services" className="relative border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/3 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
              Services
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Pick the tier that fits your stage.
            </h2>
            <p className="mt-5 text-base text-secondary sm:text-lg">
              Transparent, fixed pricing. No drawn-out contracts — just great
              work, shipped on time.
            </p>
          </ScrollReveal>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 120}>
                <TiltCard
                  intensity={6}
                  className={
                    "h-full rounded-2xl border p-8 transition-colors " +
                    (tier.featured
                      ? "border-accent/60 bg-surface-elevated shadow-[0_30px_80px_-30px_rgba(99,102,241,0.7)]"
                      : "border-border bg-surface hover:border-border-strong")
                  }
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1 text-xs font-medium text-foreground shadow-lg">
                      Most popular
                    </span>
                  )}

                  <div className="relative z-10 flex h-full flex-col">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {tier.name}
                      </h3>
                      <p className="mt-2 min-h-[3rem] text-sm text-muted">
                        {tier.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-baseline gap-2">
                      <span
                        className={
                          "text-5xl font-semibold tracking-tight " +
                          (tier.featured ? "gradient-text" : "text-foreground")
                        }
                      >
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
                        "mt-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors " +
                        (tier.featured
                          ? "mt-10 bg-accent text-foreground hover:bg-accent-strong"
                          : "mt-10 border border-border bg-background text-secondary hover:border-border-strong hover:text-foreground")
                      }
                    >
                      {tier.cta.label}
                    </Link>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <ScrollReveal className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
                Selected work
              </span>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
                Recent <span className="gradient-text">projects.</span>
              </h2>
              <p className="mt-5 text-base text-secondary sm:text-lg">
                A handful of sites we&apos;ve shipped lately for founders,
                funds, and fast-moving brands.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-foreground"
              >
                Start your project
                <span aria-hidden>→</span>
              </Link>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 120}>
                <TiltCard
                  intensity={6}
                  className="group h-full overflow-hidden rounded-2xl border border-border bg-surface"
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="flex h-full flex-col"
                  >
                    <div
                      className={
                        "relative aspect-[16/10] overflow-hidden " +
                        project.cover
                      }
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] grid-mask transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-end p-8">
                        <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                          {project.name}
                        </span>
                      </div>
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      />
                      <div
                        aria-hidden
                        className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-foreground/90 backdrop-blur"
                      >
                        {project.year}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-8">
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span className="uppercase tracking-[0.18em]">
                          {project.tag}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-semibold text-foreground">
                          {project.name}
                        </h3>
                        <span
                          aria-hidden
                          className="mt-1 text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-2"
                        >
                          →
                        </span>
                      </div>
                      <p className="text-sm text-secondary">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process — 3D sticky timeline */}
      <section
        id="process"
        className="relative border-b border-border bg-surface/30"
      >
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <ScrollReveal className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
              Process
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              From kickoff to launch, <br />
              in <span className="gradient-text">four acts.</span>
            </h2>
          </ScrollReveal>

          <div className="perspective-tight mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((phase, i) => (
              <ScrollReveal key={phase.step} delay={i * 140}>
                <TiltCard
                  intensity={8}
                  className="group relative h-full rounded-2xl border border-border bg-surface-elevated/60 p-7 backdrop-blur"
                >
                  <div
                    aria-hidden
                    className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="font-mono text-xs tracking-[0.2em] text-accent-glow">
                    {phase.step}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-sm text-secondary">{phase.body}</p>
                  <div
                    aria-hidden
                    className="mt-8 h-px w-full bg-gradient-to-r from-border via-border-strong to-transparent"
                  />
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.18),transparent_70%)]"
        />
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <ScrollReveal className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
              About
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              A studio built on craft, speed,{" "}
              <span className="gradient-text">and clarity.</span>
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-12 md:grid-cols-5">
            <ScrollReveal
              delay={120}
              className="space-y-5 text-base text-secondary md:col-span-3 sm:text-lg"
            >
              <p>
                Locked In is a small, senior team of designers and engineers.
                We partner directly with founders, marketing leads, and product
                teams — no account managers, no handoffs, no slide decks.
              </p>
              <p>
                We&apos;ve shipped for early-stage startups, public companies,
                and everything in between. What unites the work is a bias
                toward sharp typography, considered motion, and pages that load
                fast everywhere they&apos;re opened.
              </p>
              <p>
                If you care about how your site looks, feels, and performs
                under load — we&apos;re probably a good fit.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={260} className="md:col-span-2">
              <TiltCard
                intensity={6}
                className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <Stat value={40} suffix="+" label="Sites shipped" border="r b" />
                <Stat value={6} suffix=" yrs" label="In business" border="b" />
                <Stat
                  value={120}
                  prefix="$"
                  suffix="M"
                  label="Revenue influenced"
                  border="r"
                />
                <Stat value={12} label="Countries served" />
              </TiltCard>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid gap-6 border-t border-border pt-12 md:grid-cols-3">
            {[
              {
                title: "Craft first",
                body: "Every pixel, every line of code. Design systems that hold up, components that compose, type that earns its space.",
              },
              {
                title: "Ship fast",
                body: "Weeks, not quarters. We scope tightly, decide quickly, and protect the launch date without cutting corners.",
              },
              {
                title: "Real partnership",
                body: "You work with the people doing the work. One Slack channel, one roadmap, zero telephone game.",
              },
            ].map((principle, i) => (
              <ScrollReveal key={principle.title} delay={i * 140}>
                <div className="group rounded-xl border border-transparent p-4 transition-colors hover:border-border">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent transition-all group-hover:scale-150 group-hover:bg-accent-2" />
                    <h3 className="text-base font-semibold text-foreground">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-secondary">{principle.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-200px] top-1/3 h-[500px] w-[500px] rounded-full bg-accent-2/15 blur-[160px] animate-drift-slow" />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="grid gap-12 md:grid-cols-5">
            <ScrollReveal className="md:col-span-2">
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
                Contact
              </span>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
                Let&apos;s build something{" "}
                <span className="gradient-text">sharp.</span>
              </h2>
              <p className="mt-5 text-base text-secondary sm:text-lg">
                Tell us about your project and we&apos;ll get back within one
                business day with next steps, timeline, and a quote.
              </p>

              <dl className="mt-10 space-y-6 border-t border-border pt-8">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                    Email
                  </dt>
                  <dd className="mt-1 text-base text-foreground">
                    <a
                      href="mailto:hello@lockedinweb.design"
                      className="transition-colors hover:text-accent-2"
                    >
                      hello@lockedinweb.design
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                    Studio
                  </dt>
                  <dd className="mt-1 text-base text-foreground">
                    Remote-first · New York / London
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                    Response time
                  </dt>
                  <dd className="mt-1 text-base text-foreground">
                    Within one business day
                  </dd>
                </div>
              </dl>
            </ScrollReveal>

            <ScrollReveal delay={180} className="md:col-span-3">
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  value,
  label,
  prefix,
  suffix,
  border = "",
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  border?: string;
}) {
  const classes = [
    "relative p-6",
    border.includes("r") ? "border-r border-border" : "",
    border.includes("b") ? "border-b border-border" : "",
  ].join(" ");
  return (
    <div className={classes}>
      <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        <CountUp
          to={value}
          prefix={prefix}
          suffix={suffix}
          className="gradient-text"
        />
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
    </div>
  );
}
