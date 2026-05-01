"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ContactPrefill = {
  message: string;
  projectType?: string;
};

type ContactPrefillContextValue = {
  prefill: ContactPrefill;
  version: number;
  setPrefill: (next: ContactPrefill) => void;
};

const ContactPrefillContext = createContext<ContactPrefillContextValue | null>(
  null,
);

export function ContactPrefillProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefillState] = useState<ContactPrefill>({
    message: "",
    projectType: "studio",
  });
  const [version, setVersion] = useState(0);

  const setPrefill = useCallback((next: ContactPrefill) => {
    setPrefillState(next);
    setVersion((v) => v + 1);
  }, []);

  const value = useMemo(
    () => ({ prefill, version, setPrefill }),
    [prefill, version, setPrefill],
  );

  return (
    <ContactPrefillContext.Provider value={value}>
      {children}
    </ContactPrefillContext.Provider>
  );
}

export function useContactPrefill() {
  const ctx = useContext(ContactPrefillContext);
  if (!ctx) {
    throw new Error(
      "useContactPrefill must be used inside <ContactPrefillProvider>",
    );
  }
  return ctx;
}

export function scrollToContact() {
  if (typeof window === "undefined") return;
  const el = document.getElementById("contact");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
