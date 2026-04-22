import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const footerGroups: Record<string, { href: string; label: string }[]> = {
  Studio: [
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#process", label: "Process" },
  ],
  Services: [
    { href: "#services", label: "Web Design" },
    { href: "#services", label: "Development" },
    { href: "#services", label: "Branding" },
  ],
  Connect: [
    { href: "#contact", label: "Contact" },
    { href: "https://twitter.com", label: "Twitter" },
    { href: "https://linkedin.com", label: "LinkedIn" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-surface/60">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[140%] h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-accent/20 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              Locked In<span className="text-accent-2">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              A modern web design and development studio building cinematic
              sites for ambitious brands.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Available for Q2 2026
            </div>
          </div>

          {Object.entries(footerGroups).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                {group}
              </h3>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary transition-colors hover:text-accent-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Huge wordmark */}
        <ScrollReveal className="mt-20">
          <div
            aria-hidden
            className="select-none bg-gradient-to-b from-foreground/25 to-transparent bg-clip-text text-center text-[22vw] font-semibold leading-none tracking-tight text-transparent"
          >
            LOCKED IN
          </div>
        </ScrollReveal>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center">
          <p>© {year} Locked In Web Design. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
