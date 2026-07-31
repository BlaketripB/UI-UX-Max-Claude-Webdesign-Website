import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ServicesAccordion from "@/components/ServicesAccordion";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Everything Locked In Web Design brings to the table — custom design and development, security, performance, SEO, and ongoing care for ambitious small businesses.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-24 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[160px]" />
          <div className="absolute right-[-160px] top-[40%] h-[420px] w-[420px] rounded-full bg-accent-2/15 blur-[150px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-36 pb-20 md:pt-44 md:pb-28">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
              Services
            </span>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Everything we bring{" "}
              <span className="gradient-text">to the table.</span>
            </h1>
            <p className="mt-6 text-base text-secondary sm:text-lg">
              We don&apos;t just build websites. We build infrastructure your
              business can rely on.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Full accordion */}
      <section className="relative border-b border-border bg-surface/20">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
          <ServicesAccordion services={services} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated/80 p-10 text-center backdrop-blur sm:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute left-1/2 top-0 h-[260px] w-[600px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
              <div className="absolute right-0 bottom-0 h-[200px] w-[400px] rounded-full bg-accent-2/15 blur-[120px]" />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Ready to <span className="gradient-text">get started?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-secondary sm:text-lg">
              Tell me about your project and I&apos;ll put a plan together.
              Replies within one business day.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-accent-strong"
              >
                Start a project
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
