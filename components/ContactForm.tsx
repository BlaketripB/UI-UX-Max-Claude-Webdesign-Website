"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions";
import { useContactPrefill } from "@/components/ContactPrefillProvider";

const initialState: ContactState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

const labelClass = "block text-xs font-medium uppercase tracking-[0.12em] text-muted";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );
  const { prefill, version } = useContactPrefill();

  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("studio");
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (version === 0) return;
    setMessage(prefill.message);
    if (prefill.projectType) setProjectType(prefill.projectType);
    const node = messageRef.current;
    if (!node) return;
    const t = window.setTimeout(() => {
      node.focus({ preventScroll: true });
      const match = node.value.match(
        /\[(?:Tell me about your project here|Fill in here|User fills in here)\]/,
      );
      if (match && match.index !== undefined) {
        node.setSelectionRange(match.index, match.index + match[0].length);
      } else {
        node.setSelectionRange(node.value.length, node.value.length);
      }
    }, 600);
    return () => window.clearTimeout(t);
  }, [version, prefill]);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-surface p-8">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <h3 className="text-base font-semibold text-foreground">
            Message sent
          </h3>
        </div>
        <p className="mt-3 text-sm text-secondary">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="jane@company.com"
            className={inputClass}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="company" className={labelClass}>
            Company <span className="text-muted/70">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Inc."
            className={inputClass}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="projectType" className={labelClass}>
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className={inputClass}
          >
            <option value="launch">Launch — landing site</option>
            <option value="studio">Studio — full marketing site</option>
            <option value="scale">Scale — ongoing partnership</option>
            <option value="custom">Custom plan (à la carte)</option>
            <option value="other">Not sure yet</option>
          </select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            ref={messageRef}
            required
            rows={message.length > 200 ? 12 : 6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about the site, timeline, and any goals you're chasing."
            className={inputClass + " resize-y"}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          aria-live="polite"
          className={
            "text-sm " +
            (state.status === "error" ? "text-red-400" : "text-muted")
          }
        >
          {state.message || "We respond within one business day."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
