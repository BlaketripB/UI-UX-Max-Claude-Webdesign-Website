"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = { href: string; label: string };

const navLinks: NavLink[] = [
  { href: "/#work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

function hashOf(href: string): string | null {
  const i = href.indexOf("#");
  return i === -1 ? null : href.slice(i + 1);
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isHome = pathname === "/";
    const sections = isHome
      ? navLinks
          .map((l) => {
            const id = hashOf(l.href);
            if (!id) return null;
            const el = document.getElementById(id);
            return el ? { href: l.href, el } : null;
          })
          .filter((s): s is { href: string; el: HTMLElement } => !!s)
          .sort((a, b) =>
            a.el.compareDocumentPosition(b.el) &
            Node.DOCUMENT_POSITION_FOLLOWING
              ? -1
              : 1,
          )
      : [];

    let ticking = false;

    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);

      if (sections.length === 0) {
        setActive("");
        return;
      }

      const doc = document.documentElement;
      const scrollBottom = window.scrollY + window.innerHeight;
      // Snap to last nav section when within 8px of the document bottom so
      // short trailing sections (e.g. Contact) still highlight reliably.
      if (scrollBottom >= doc.scrollHeight - 8) {
        setActive(sections[sections.length - 1].href);
        return;
      }

      // Probe line ~30% down from the viewport top — comfortably below the
      // sticky nav and above the fold midpoint.
      const probe = window.innerHeight * 0.3;
      let current = "";
      for (const s of sections) {
        if (s.el.getBoundingClientRect().top <= probe) current = s.href;
        else break;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

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
          aria-label="Locked In Web Design home"
          className="flex items-center"
        >
          <Image
            src="/logo.svg"
            alt="Locked In Web Design"
            width={200}
            height={41}
            priority
            className="h-7 w-auto sm:h-8 md:h-9"
          />
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-border bg-surface/40 p-1 backdrop-blur md:flex">
          {navLinks.map((link) => {
            const isPath = !link.href.includes("#");
            const isActive = isPath
              ? pathname === link.href
              : pathname === "/" && active === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    "relative inline-flex rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-300 " +
                    (isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground")
                  }
                >
                  <span
                    aria-hidden
                    className={
                      "absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent/20 to-accent-2/20 ring-1 ring-inset ring-white/10 transition-opacity duration-300 " +
                      (isActive ? "opacity-100" : "opacity-0")
                    }
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
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
              href="/#contact"
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
