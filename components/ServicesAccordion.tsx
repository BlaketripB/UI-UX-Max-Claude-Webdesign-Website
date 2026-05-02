"use client";

import { useState } from "react";
import type { Service } from "@/lib/services";

type Props = {
  services: Service[];
};

export default function ServicesAccordion({ services }: Props) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(idx: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  return (
    <ul className="space-y-3">
      {services.map((service, idx) => {
        const isOpen = open.has(idx);
        const num = String(idx + 1).padStart(2, "0");
        const buttonId = `service-trigger-${idx}`;
        const panelId = `service-panel-${idx}`;
        return (
          <li
            key={service.title}
            className={
              "rounded-2xl border bg-surface/40 backdrop-blur transition-colors " +
              (isOpen
                ? "border-accent/60 bg-surface-elevated/60"
                : "border-border hover:border-border-strong")
            }
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(idx)}
              className="flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-6 sm:px-7 sm:py-6"
            >
              <span
                aria-hidden
                className={
                  "flex-none font-mono text-xs tracking-[0.22em] transition-colors " +
                  (isOpen ? "text-accent-glow" : "text-muted")
                }
              >
                {num}
              </span>
              <span className="flex-1 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {service.title}
              </span>
              <span
                aria-hidden
                className={
                  "flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-all duration-300 " +
                  (isOpen
                    ? "rotate-180 border-accent/60 bg-accent/15 text-accent-glow"
                    : "border-border bg-background text-muted")
                }
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div
                className={
                  "min-h-0 overflow-hidden " +
                  (isOpen ? "" : "pointer-events-none")
                }
              >
                <p className="px-5 pb-6 pl-[3.25rem] pr-6 text-sm text-secondary sm:px-7 sm:pb-7 sm:pl-[5rem] sm:pr-8 sm:text-base sm:leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
