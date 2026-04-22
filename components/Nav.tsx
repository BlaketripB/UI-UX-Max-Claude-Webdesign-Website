"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((n): n is HTMLElement => !!n);

    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive("#" + visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent")
      }
    >
      <nav
        className={
          "mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 " +
          (scrolled ? "py-3" : "py-5")
        }
      >
        <Link
          href="/"
          className="group relative flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
        >
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute inset-0 rounded-md bg-gradient-to-br from-accent to-accent-2 opacity-80 blur-sm transition-opacity group-hover:opacity-100" />
            <span className="relative flex h-5 w-5 items-center justify-center rounded-md bg-background font-mono text-[11px] font-bold text-foreground">
              L
            </span>
          </span>
          <span>
            Locked In<span className="text-accent-2">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-border bg-surface/40 p-1 backdrop-blur md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    "relative inline-flex rounded-full px-4 py-1.5 text-xs font-medium transition-colors " +
                    (isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground")
                  }
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent/20 to-accent-2/20 ring-1 ring-inset ring-white/10"
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-accent to-accent-strong px-4 py-2 text-sm font-medium text-foreground shadow-[0_10px_30px_-10px_rgba(99,102,241,0.8)] transition-transform hover:scale-[1.02] hover:shadow-[0_14px_34px_-10px_rgba(99,102,241,0.9)] md:inline-flex"
          >
            Start a project
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative h-10 w-10 rounded-full border border-border bg-surface/60 md:hidden"
          >
            <span
              className={
                "absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-foreground transition-all " +
                (open ? "rotate-45" : "-translate-y-1.5")
              }
            />
            <span
              className={
                "absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-foreground transition-all " +
                (open ? "-rotate-45" : "translate-y-1.5")
              }
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={
          "fixed inset-x-0 top-0 -z-10 origin-top border-b border-border bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden " +
          (open
            ? "pointer-events-auto opacity-100 [transform:scaleY(1)]"
            : "pointer-events-none opacity-0 [transform:scaleY(0.9)]")
        }
      >
        <ul className="flex flex-col gap-1 px-6 pb-8 pt-24">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${i * 60 + 100}ms` : "0ms" }}
              className={
                "transition-all duration-500 " +
                (open
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0")
              }
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border/60 py-4 text-2xl font-semibold tracking-tight text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-6">
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-gradient-to-r from-accent to-accent-strong px-6 py-3.5 text-center text-sm font-medium text-foreground"
            >
              Start a project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
