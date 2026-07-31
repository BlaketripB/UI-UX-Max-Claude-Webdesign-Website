"use client";

import { useEffect } from "react";

const STORAGE_KEY = "lockedin_ref";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
const REF_RE = /^[a-zA-Z0-9_-]{1,50}$/;

export default function RefTracker() {
  useEffect(() => {
    try {
      const raw = new URLSearchParams(window.location.search).get("ref");
      if (!raw) return;
      if (!REF_RE.test(raw)) return;
      const record = { value: raw, expiresAt: Date.now() + TTL_MS };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // localStorage may be unavailable (private mode, quota); silently skip.
    }
  }, []);

  return null;
}

export function readStoredRef(): string {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return "";
    const parsed: unknown = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof (parsed as { value?: unknown }).value !== "string" ||
      typeof (parsed as { expiresAt?: unknown }).expiresAt !== "number"
    ) {
      return "";
    }
    const { value, expiresAt } = parsed as { value: string; expiresAt: number };
    if (Date.now() > expiresAt) {
      window.localStorage.removeItem(STORAGE_KEY);
      return "";
    }
    if (!REF_RE.test(value)) return "";
    return value;
  } catch {
    return "";
  }
}
