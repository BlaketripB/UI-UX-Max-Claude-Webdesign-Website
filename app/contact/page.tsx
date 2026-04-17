import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project, ask a question, or just say hello. We respond within one business day.",
};

type InquiryChannel = {
  label: string;
  email: string;
  description: string;
};

const channels: InquiryChannel[] = [
  {
    label: "New business",
    email: "hello@lockedinweb.design",
    description: "Project briefs, pricing, and partnership questions.",
  },
  {
    label: "Press + media",
    email: "press@lockedinweb.design",
    description: "Interviews, case studies, and speaking requests.",
  },
  {
    label: "Careers",
    email: "careers@lockedinweb.design",
    description:
      "Portfolio + a short note. We hire senior designers and engineers.",
  },
];

type Step = { number: string; title: string; when: string; body: string };

const steps: Step[] = [
  {
    number: "01",
    title: "Send a note",
    when: "Today",
    body: "Fill the form or drop us an email — a few sentences is plenty.",
  },
  {
    number: "02",
    title: "Quick reply",
    when: "Within 1 business day",
    body: "We respond with questions and a time to chat if it's a fit.",
  },
  {
    number: "03",
    title: "Discovery call",
    when: "Within 1 week",
    body: "A 30-minute call to align on scope, timeline, and budget.",
  },
  {
    number: "04",
    title: "Written proposal",
    when: "Following week",
    body: "A fixed-scope proposal with deliverables, price, and a start date.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Contact
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Get in <span className="text-accent">touch.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-secondary sm:text-lg">
            A full site, a specific piece of engineering, or just a quick
            question — we read everything and respond within one business day.
          </p>
        </div>
      </section>

      <section className="relative border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-5">
            <aside className="md:col-span-2">
              <div className="rounded-2xl border border-border bg-surface p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Now booking for Q2
                </div>

                <dl className="mt-8 space-y-6">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                      Email
                    </dt>
                    <dd className="mt-1 text-base text-foreground">
                      <a
                        href="mailto:hello@lockedinweb.design"
                        className="transition-colors hover:text-accent"
                      >
                        hello@lockedinweb.design
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                      Studio
                    </dt>
                    <dd className="mt-1 text-base text-foreground">
                      Remote-first · New York / London
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                      Hours
                    </dt>
                    <dd className="mt-1 text-base text-foreground">
                      Mon–Fri, 9am–6pm ET
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                      Response time
                    </dt>
                    <dd className="mt-1 text-base text-foreground">
                      Within one business day
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-surface p-8">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                  Other inquiries
                </h2>
                <ul className="mt-6 space-y-5">
                  {channels.map((channel) => (
                    <li key={channel.label}>
                      <div className="text-sm font-medium text-foreground">
                        {channel.label}
                      </div>
                      <a
                        href={`mailto:${channel.email}`}
                        className="mt-0.5 block text-sm text-secondary transition-colors hover:text-accent"
                      >
                        {channel.email}
                      </a>
                      <p className="mt-1 text-sm text-muted">
                        {channel.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="md:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              What happens next
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              From hello to start date.
            </h2>
            <p className="mt-4 text-base text-secondary">
              Here&apos;s what the first two weeks look like. We keep it short
              and decision-focused.
            </p>
          </div>

          <ol className="mt-16 grid gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.number}
                className="relative flex flex-col rounded-2xl border border-border bg-surface p-6"
              >
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <span className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
                  {step.when}
                </span>
                <p className="mt-3 text-sm text-secondary">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
