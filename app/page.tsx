import Link from "next/link";

export default function Home() {
  return (
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
  );
}
