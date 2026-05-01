"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useContactPrefill } from "@/components/ContactPrefillProvider";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success"; message: string };

const idleStatus: Status = { kind: "idle" };

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

const labelClass =
  "block text-xs font-medium uppercase tracking-[0.12em] text-muted";

const SUCCESS_MESSAGE =
  "Thanks — I'll get back to you within one business day.";

export default function ContactForm() {
  const { prefill, version } = useContactPrefill();

  const [status, setStatus] = useState<Status>(idleStatus);
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("studio");
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      projectType: String(data.get("projectType") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    };

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: unknown = await res.json().catch(() => ({}));
      const errorMessage =
        json &&
        typeof json === "object" &&
        "error" in json &&
        typeof (json as { error: unknown }).error === "string"
          ? (json as { error: string }).error
          : null;

      if (!res.ok) {
        setStatus({
          kind: "error",
          message:
            errorMessage ?? "Something went wrong. Please try again in a moment.",
        });
        return;
      }

      form.reset();
      setMessage("");
      setProjectType("studio");
      setStatus({ kind: "success", message: SUCCESS_MESSAGE });
    } catch (err) {
      console.error("Contact form submission failed", err);
      setStatus({
        kind: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-2xl border border-accent/40 bg-surface p-8">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <h3 className="text-base font-semibold text-foreground">
            Message sent
          </h3>
        </div>
        <p className="mt-3 text-sm text-secondary">{status.message}</p>
        <button
          type="button"
          onClick={() => setStatus(idleStatus)}
          className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
        >
          Send another <span aria-hidden>→</span>
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
            className={inputClass + " resize-y"}
          />
        </div>
      </div>

      {/* Honeypot — visually hidden, off-screen. Bots auto-fill every input;
          humans never see this. Submissions with a non-empty value are dropped. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        style={{ clip: "rect(0 0 0 0)", clipPath: "inset(50%)", left: "-9999px" }}
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          aria-live="polite"
          className={
            "text-sm " +
            (status.kind === "error" ? "text-red-400" : "text-muted")
          }
        >
          {status.kind === "error"
            ? status.message
            : "We respond within one business day."}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting && (
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-4 w-4 animate-spin"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
          )}
          {submitting ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
