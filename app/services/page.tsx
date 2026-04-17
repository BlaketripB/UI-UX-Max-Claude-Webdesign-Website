import type { Metadata } from "next";
import Link from "next/link";
import PricingTiers from "@/components/PricingTiers";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, engineering, brand, and ongoing optimization — delivered by a small senior team.",
};

type Capability = {
  name: string;
  blurb: string;
  items: string[];
};

const capabilities: Capability[] = [
  {
    name: "Web design",
    blurb:
      "UX research, UI, and design systems built to survive real editorial work — not just the launch screenshot.",
    items: [
      "Discovery + audit",
      "Wireframes + IA",
      "UI + interaction design",
      "Design systems in Figma",
    ],
  },
  {
    name: "Engineering",
    blurb:
      "Modern, typed React with a bias toward the platform. Fast first paint, solid accessibility, clean code.",
    items: [
      "Next.js + React + TypeScript",
      "Tailwind / component libraries",
      "Headless CMS integrations",
      "Core Web Vitals tuning",
    ],
  },
  {
    name: "Brand + identity",
    blurb:
      "Logo, typography, and visual language that hold up across a homepage hero and a tiny OG image.",
    items: [
      "Brand strategy",
      "Logo + wordmark",
      "Type + color systems",
      "Guidelines + assets",
    ],
  },
  {
    name: "Growth + optimization",
    blurb:
      "Post-launch, we help you keep shipping — analytics, SEO, A/B tests, and quarterly iterations.",
    items: [
      "Analytics + events",
      "On-page SEO",
      "A/B testing",
      "Quarterly roadmaps",
    ],
  },
];

type Step = {
  number: string;
  title: string;
  duration: string;
  body: string;
};

const process: Step[] = [
  {
    number: "01",
    title: "Discovery",
    duration: "Week 1",
    body: "Kickoff call, stakeholder interviews, audit of the current site, and a written strategy brief with scope and timeline.",
  },
  {
    number: "02",
    title: "Design",
    duration: "Weeks 2–4",
    body: "Moodboards, IA, wireframes, then high-fidelity UI. We share work in Figma and review in short, focused syncs.",
  },
  {
    number: "03",
    title: "Build",
    duration: "Weeks 4–8",
    body: "Engineering in Next.js with a staging URL from day one. Content, CMS, accessibility, and QA happen in parallel.",
  },
  {
    number: "04",
    title: "Launch",
    duration: "Week 9",
    body: "Cutover, DNS, redirects, analytics, and a handoff doc. We stay on for post-launch fixes and performance tuning.",
  },
];

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "How long does a typical project take?",
    a: "Launch projects ship in 3–4 weeks. Studio projects run 8–10 weeks end to end. Scale engagements are ongoing.",
  },
  {
    q: "Do you work with our existing design or engineering team?",
    a: "Yes. We can lead the whole thing, embed with your team, or consult on specific pieces (design systems, performance, brand).",
  },
  {
    q: "What tech stack do you use?",
    a: "Next.js, React, TypeScript, and Tailwind by default. Headless CMS when content editors need control. Deploy on Vercel unless you prefer otherwise.",
  },
  {
    q: "Do you handle hosting and maintenance?",
    a: "We set up hosting and the CI pipeline, and can stay on retainer for maintenance. Or we hand off a clean repo your team can run themselves.",
  },
  {
    q: "What if we need changes after launch?",
    a: "Studio includes 4 weeks of post-launch support. Beyond that, you can retain us monthly or pay hourly for targeted updates.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Services
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Everything you need to{" "}
            <span className="text-accent">ship a site that works.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-secondary sm:text-lg">
            One senior team across design, engineering, and brand. Fixed-scope
            projects or ongoing partnerships — priced up-front, delivered on
            time.
          </p>
        </div>
      </section>

      <section className="relative border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Capabilities
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              What we do, end to end.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {capabilities.map((cap) => (
              <div
                key={cap.name}
                className="rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-border-strong"
              >
                <h3 className="text-xl font-semibold text-foreground">
                  {cap.name}
                </h3>
                <p className="mt-3 text-sm text-secondary sm:text-base">
                  {cap.blurb}
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Pricing
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Three tiers. Fixed scope.
            </h2>
            <p className="mt-4 text-base text-secondary sm:text-lg">
              Pick the stage that fits. Every tier includes a senior team, a
              staging URL from day one, and a fixed launch date.
            </p>
          </div>

          <div className="mt-16">
            <PricingTiers />
          </div>
        </div>
      </section>

      <section className="relative border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Process
              </span>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                How it works.
              </h2>
              <p className="mt-4 text-base text-secondary">
                Four phases, one shared Slack channel, and a staging link from
                week one. No surprises at the end.
              </p>
            </div>

            <ol className="relative md:col-span-8">
              <div
                aria-hidden
                className="absolute left-[11px] top-2 bottom-2 w-px bg-border md:left-[15px]"
              />
              {process.map((step) => (
                <li key={step.number} className="relative flex gap-6 pb-10 last:pb-0">
                  <span className="relative z-10 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-accent/60 bg-background md:h-8 md:w-8">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <span className="text-xs text-muted">
                        · {step.duration}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-secondary sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                FAQ
              </span>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Common questions.
              </h2>
              <p className="mt-4 text-base text-secondary">
                Don&apos;t see yours?{" "}
                <Link
                  href="/contact"
                  className="text-secondary underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Just ask
                </Link>
                .
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-foreground">
                      {faq.q}
                      <span
                        aria-hidden
                        className="text-accent transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-secondary sm:text-base">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated p-10 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.2),transparent_60%)]"
            />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Have a project in mind?
                </h2>
                <p className="mt-3 text-base text-secondary">
                  Tell us a bit about it and we&apos;ll get back within one
                  business day.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-strong"
              >
                Start a project
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
