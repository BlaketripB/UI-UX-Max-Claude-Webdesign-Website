"use client";

import {
  scrollToContact,
  useContactPrefill,
} from "@/components/ContactPrefillProvider";

const TALK_TO_BLAKE_MESSAGE = [
  "Hi Blake, I'm not exactly sure what I need for my project. Can we talk through it together? Here's a bit about what I'm working on:",
  "",
  "[Tell me about your project here]",
  "",
  "──────────────",
  "",
  "Best contact method (phone, email, or text): [Fill in here]",
  "Best phone number to reach me: [Fill in here]",
  "Best time to reach me: [Fill in here]",
].join("\n");

export default function NotSureBanner() {
  const { setPrefill } = useContactPrefill();

  function handleClick() {
    setPrefill({ message: TALK_TO_BLAKE_MESSAGE, projectType: "other" });
    scrollToContact();
  }

  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated/80 p-10 text-center backdrop-blur sm:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[260px] w-[600px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
            <div className="absolute right-0 bottom-0 h-[200px] w-[400px] rounded-full bg-accent-2/15 blur-[120px]" />
          </div>

          <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
            Lead capture
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Not sure what <span className="gradient-text">you need?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-secondary sm:text-lg">
            Tell me about your project and I&apos;ll put a custom plan together
            for you. No commitment, just a conversation.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleClick}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-strong"
            >
              Talk to Blake
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
