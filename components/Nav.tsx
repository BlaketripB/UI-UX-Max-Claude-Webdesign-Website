"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Locked In<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    "group relative text-sm transition-colors " +
                    (active
                      ? "text-foreground"
                      : "text-secondary hover:text-foreground")
                  }
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={
                      "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 " +
                      (active ? "w-full" : "w-0 group-hover:w-full")
                    }
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent-strong hover:shadow-[0_0_24px_-6px_rgba(59,130,246,0.6)] md:inline-flex"
          >
            Start a project
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-border-strong md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-4 w-4"
              aria-hidden
            >
              {open ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={
          "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 ease-out md:hidden " +
          (open ? "max-h-96 opacity-100" : "max-h-0 opacity-0")
        }
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    "flex items-center justify-between rounded-lg px-4 py-3 text-base transition-colors " +
                    (active
                      ? "bg-surface text-foreground"
                      : "text-secondary hover:bg-surface hover:text-foreground")
                  }
                >
                  {link.label}
                  <span aria-hidden className="text-muted">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="mt-2 px-2">
            <Link
              href="/contact"
              className="flex items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-strong"
            >
              Start a project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
