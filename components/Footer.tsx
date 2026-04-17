import Link from "next/link";

const footerGroups: Record<string, { href: string; label: string }[]> = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ],
  Services: [
    { href: "/services/web-design", label: "Web Design" },
    { href: "/services/development", label: "Development" },
    { href: "/services/branding", label: "Branding" },
  ],
  Social: [
    { href: "https://twitter.com", label: "Twitter" },
    { href: "https://github.com", label: "GitHub" },
    { href: "https://linkedin.com", label: "LinkedIn" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              Locked In<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              A modern web design and development studio.
            </p>
          </div>

          {Object.entries(footerGroups).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-medium text-foreground">{group}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center">
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
