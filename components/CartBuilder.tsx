"use client";

import { useMemo, useState } from "react";
import {
  scrollToContact,
  useContactPrefill,
} from "@/components/ContactPrefillProvider";

type CheckItem = {
  id: string;
  name: string;
  price: number;
  kind: "check";
};
type ExclusiveItem = {
  id: string;
  name: string;
  price: number;
  kind: "exclusive";
  group: string;
};
type QtyItem = {
  id: string;
  name: string;
  price: number;
  kind: "qty";
  unitLabel: string;
  max?: number;
};
type MonthlyItem = {
  id: string;
  name: string;
  price: number;
  kind: "monthly";
};

type Item = CheckItem | ExclusiveItem | QtyItem | MonthlyItem;

type Category = {
  id: string;
  name: string;
  emoji: string;
  items: Item[];
};

const catalog: Category[] = [
  {
    id: "foundations",
    name: "Foundations",
    emoji: "🏗️",
    items: [
      {
        id: "single-landing",
        name: "Single landing page",
        price: 800,
        kind: "exclusive",
        group: "pages",
      },
      {
        id: "multi-5",
        name: "Multi-page website (up to 5 pages)",
        price: 1500,
        kind: "exclusive",
        group: "pages",
      },
      {
        id: "multi-10",
        name: "Multi-page website (up to 10 pages)",
        price: 2800,
        kind: "exclusive",
        group: "pages",
      },
      {
        id: "additional-page",
        name: "Each additional page",
        price: 200,
        kind: "qty",
        unitLabel: "each",
        max: 20,
      },
      { id: "blog-setup", name: "Blog / article setup", price: 500, kind: "check" },
      {
        id: "member-portal",
        name: "Member portal / login system",
        price: 1500,
        kind: "check",
      },
    ],
  },
  {
    id: "design",
    name: "Design & Branding",
    emoji: "🎨",
    items: [
      { id: "logo", name: "Custom logo design", price: 400, kind: "check" },
      {
        id: "brand-identity",
        name: "Full brand identity package",
        price: 800,
        kind: "check",
      },
      { id: "illustrations", name: "Custom illustrations", price: 300, kind: "check" },
      { id: "photo-direction", name: "Photography direction", price: 200, kind: "check" },
      { id: "custom-404", name: "Custom 404 page", price: 150, kind: "check" },
      {
        id: "preloader",
        name: "Loading animation / preloader",
        price: 200,
        kind: "check",
      },
    ],
  },
  {
    id: "functionality",
    name: "Functionality & Integrations",
    emoji: "⚙️",
    items: [
      { id: "contact-form", name: "Contact form", price: 100, kind: "check" },
      {
        id: "multi-step-form",
        name: "Advanced multi-step form",
        price: 300,
        kind: "check",
      },
      {
        id: "booking",
        name: "Booking system (Calendly / Cal.com)",
        price: 400,
        kind: "check",
      },
      { id: "newsletter", name: "Newsletter / email capture", price: 150, kind: "check" },
      {
        id: "ecommerce",
        name: "E-commerce setup (Stripe, up to 20 products)",
        price: 1200,
        kind: "check",
      },
      {
        id: "membership",
        name: "Membership / paid content",
        price: 1500,
        kind: "check",
      },
      { id: "live-chat", name: "Live chat integration", price: 200, kind: "check" },
      { id: "google-maps", name: "Google Maps embed", price: 100, kind: "check" },
      {
        id: "video-embeds",
        name: "Video embeds (YouTube / Vimeo)",
        price: 100,
        kind: "check",
      },
      { id: "custom-motion", name: "Custom motion + animations", price: 500, kind: "check" },
      { id: "darkmode", name: "Dark/light mode toggle", price: 300, kind: "check" },
    ],
  },
  {
    id: "content-sections",
    name: "Content Sections",
    emoji: "📱",
    items: [
      { id: "gallery", name: "Photo gallery (lightbox)", price: 250, kind: "check" },
      { id: "testimonials", name: "Testimonials section", price: 200, kind: "check" },
      { id: "faq", name: "FAQ section", price: 200, kind: "check" },
      { id: "team-page", name: "Team / About page", price: 250, kind: "check" },
      { id: "case-studies", name: "Case studies section", price: 400, kind: "check" },
    ],
  },
  {
    id: "marketing-seo",
    name: "Marketing & SEO",
    emoji: "📈",
    items: [
      { id: "basic-seo", name: "Basic SEO setup", price: 300, kind: "check" },
      { id: "seo-overhaul", name: "SEO + metadata overhaul", price: 500, kind: "check" },
      {
        id: "analytics",
        name: "Analytics setup (GA4 + Search Console)",
        price: 200,
        kind: "check",
      },
      { id: "lead-magnet", name: "Lead magnet / opt-in setup", price: 300, kind: "check" },
      { id: "google-reviews", name: "Google Reviews widget", price: 150, kind: "check" },
      { id: "instagram", name: "Instagram feed integration", price: 200, kind: "check" },
      {
        id: "social-graphics",
        name: "Social media graphics package",
        price: 300,
        kind: "check",
      },
    ],
  },
  {
    id: "content-writing",
    name: "Content Writing",
    emoji: "📝",
    items: [
      {
        id: "copy-per-page",
        name: "Copywriting (per page)",
        price: 200,
        kind: "qty",
        unitLabel: "each",
        max: 20,
      },
      {
        id: "full-copy-5",
        name: "Full website copy (up to 5 pages)",
        price: 800,
        kind: "check",
      },
      {
        id: "blog-post",
        name: "Blog post writing (per post)",
        price: 150,
        kind: "qty",
        unitLabel: "each",
        max: 50,
      },
    ],
  },
  {
    id: "technical",
    name: "Technical Setup",
    emoji: "🛠️",
    items: [
      { id: "domain", name: "Domain registration help", price: 50, kind: "check" },
      {
        id: "email-setup",
        name: "Email setup (Google Workspace)",
        price: 100,
        kind: "check",
      },
      { id: "migration", name: "Existing site migration", price: 500, kind: "check" },
      { id: "ssl", name: "SSL & security setup", price: 200, kind: "check" },
      { id: "speed-opt", name: "Speed optimization", price: 300, kind: "check" },
    ],
  },
  {
    id: "ongoing",
    name: "Ongoing Services",
    emoji: "🔄",
    items: [
      { id: "maintenance", name: "Basic maintenance", price: 150, kind: "monthly" },
      { id: "content-updates", name: "Content updates", price: 200, kind: "monthly" },
      { id: "seo-reporting", name: "SEO + reporting", price: 400, kind: "monthly" },
      {
        id: "full-management",
        name: "Full management & growth",
        price: 600,
        kind: "monthly",
      },
    ],
  },
];

const itemIndex = new Map<string, { item: Item; category: Category }>();
for (const cat of catalog) {
  for (const item of cat.items) {
    itemIndex.set(item.id, { item, category: cat });
  }
}

const SELECT_ALL_CATEGORIES = new Set([
  "design",
  "content-sections",
  "marketing-seo",
  "technical",
  "ongoing",
]);

function formatPrice(n: number) {
  return "$" + n.toLocaleString("en-US");
}

export default function CartBuilder() {
  const { setPrefill } = useContactPrefill();
  const [state, setState] = useState<Record<string, number>>({});
  const [expanded, setExpanded] = useState(false);

  const totals = useMemo(() => {
    let oneTime = 0;
    let monthly = 0;
    for (const [id, qty] of Object.entries(state)) {
      if (qty <= 0) continue;
      const ref = itemIndex.get(id);
      if (!ref) continue;
      if (ref.item.kind === "monthly") monthly += ref.item.price * qty;
      else oneTime += ref.item.price * qty;
    }
    return { oneTime, monthly };
  }, [state]);

  const selectedByCategory = useMemo(() => {
    const out: { category: Category; entries: { item: Item; qty: number }[] }[] = [];
    for (const category of catalog) {
      const entries: { item: Item; qty: number }[] = [];
      for (const item of category.items) {
        const qty = state[item.id] ?? 0;
        if (qty > 0) entries.push({ item, qty });
      }
      if (entries.length) out.push({ category, entries });
    }
    return out;
  }, [state]);

  const totalSelected = selectedByCategory.reduce(
    (sum, group) => sum + group.entries.length,
    0,
  );

  function toggleCheck(id: string) {
    setState((prev) => {
      const next = { ...prev };
      next[id] = (prev[id] ?? 0) > 0 ? 0 : 1;
      return next;
    });
  }

  function selectExclusive(id: string, group: string) {
    setState((prev) => {
      const next = { ...prev };
      const isOn = (prev[id] ?? 0) > 0;
      for (const cat of catalog) {
        for (const item of cat.items) {
          if (item.kind === "exclusive" && item.group === group) {
            next[item.id] = 0;
          }
        }
      }
      next[id] = isOn ? 0 : 1;
      return next;
    });
  }

  function setQty(id: string, qty: number, max = 99) {
    setState((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(max, qty)),
    }));
  }

  function reset() {
    setState({});
  }

  function toggleSelectAllCategory(categoryId: string) {
    const category = catalog.find((c) => c.id === categoryId);
    if (!category) return;
    setState((prev) => {
      const allSelected = category.items.every(
        (item) => (prev[item.id] ?? 0) > 0,
      );
      const next = { ...prev };
      for (const item of category.items) {
        next[item.id] = allSelected ? 0 : 1;
      }
      return next;
    });
  }

  function buildSummary() {
    const lines: string[] = ["Custom plan request:", ""];
    for (const group of selectedByCategory) {
      lines.push(`${group.category.name}:`);
      for (const { item, qty } of group.entries) {
        const subtotal = item.price * qty;
        const qtyLabel =
          item.kind === "qty" && qty > 1 ? ` × ${qty}` : "";
        const monthlySuffix = item.kind === "monthly" ? "/mo" : "";
        lines.push(
          `- ${item.name}${qtyLabel}: ${formatPrice(subtotal)}${monthlySuffix}`,
        );
      }
      lines.push("");
    }
    lines.push(`ONE-TIME TOTAL: ${formatPrice(totals.oneTime)}`);
    lines.push(`MONTHLY TOTAL: ${formatPrice(totals.monthly)}/mo`);
    lines.push("");
    lines.push("──────────────");
    lines.push("");
    lines.push(
      "Best contact method (phone, email, or text): [Fill in here]",
    );
    lines.push("Best phone number to reach me: [Fill in here]");
    lines.push("Best time to reach me: [Fill in here]");
    lines.push(
      "Anything else I should know about your project: [Fill in here]",
    );
    lines.push("");
    lines.push("Looking forward to hearing back!");
    return lines.join("\n");
  }

  function buildEmptyFallback() {
    return [
      "I'd like to put together a custom plan but I'm still figuring out which pieces I need. Can we talk it through?",
      "",
      "──────────────",
      "",
      "Best contact method (phone, email, or text): [Fill in here]",
      "Best phone number to reach me: [Fill in here]",
      "Best time to reach me: [Fill in here]",
      "Anything else I should know about your project: [Fill in here]",
      "",
      "Looking forward to hearing back!",
    ].join("\n");
  }

  function submitQuote() {
    if (totalSelected === 0) {
      setPrefill({
        message: buildEmptyFallback(),
        projectType: "custom",
      });
    } else {
      setPrefill({ message: buildSummary(), projectType: "custom" });
    }
    scrollToContact();
  }

  return (
    <section
      id="build-your-own"
      className="relative border-b border-border bg-surface/20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-20 h-[420px] w-[420px] rounded-full bg-accent-2/10 blur-[140px]" />
        <div className="absolute left-10 bottom-20 h-[360px] w-[360px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
            À la carte
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Build your <span className="gradient-text">own plan.</span>
          </h2>
          <p className="mt-5 text-base text-secondary sm:text-lg">
            Pick exactly what you need. Live pricing as you customize. Starts at
            $0 — you only pay for what you add.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls="build-your-own-panel"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-strong"
            >
              {expanded ? "Close the plan builder" : "Open the plan builder"}
              <span
                aria-hidden
                className={
                  "transition-transform duration-300 " +
                  (expanded
                    ? "-translate-y-0.5"
                    : "group-hover:translate-x-0.5")
                }
              >
                {expanded ? "↑" : "→"}
              </span>
            </button>
            {totalSelected > 0 && !expanded && (
              <p className="text-xs text-muted">
                {totalSelected} item{totalSelected === 1 ? "" : "s"} saved ·{" "}
                {formatPrice(totals.oneTime)}
                {totals.monthly > 0 && (
                  <span> + {formatPrice(totals.monthly)}/mo</span>
                )}
              </p>
            )}
          </div>
        </div>

        <div
          id="build-your-own-panel"
          className="grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out motion-reduce:transition-none"
          style={{
            gridTemplateRows: expanded ? "1fr" : "0fr",
            opacity: expanded ? 1 : 0,
            marginTop: expanded ? "4rem" : "0rem",
          }}
          aria-hidden={!expanded}
        >
          <div
            className={
              "min-h-0 overflow-hidden " + (expanded ? "" : "pointer-events-none")
            }
          >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-10">
            {catalog.map((category) => {
              const showSelectAll = SELECT_ALL_CATEGORIES.has(category.id);
              const allSelected =
                showSelectAll &&
                category.items.every((item) => (state[item.id] ?? 0) > 0);
              return (
              <div key={category.id}>
                <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span aria-hidden className="text-2xl">
                      {category.emoji}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {category.name}
                    </h3>
                  </div>
                  {showSelectAll && (
                    <button
                      type="button"
                      onClick={() => toggleSelectAllCategory(category.id)}
                      aria-pressed={allSelected}
                      className={
                        "shrink-0 rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors " +
                        (allSelected
                          ? "border-accent/60 bg-accent/15 text-accent-glow"
                          : "border-border text-muted hover:border-border-strong hover:text-foreground")
                      }
                    >
                      {allSelected ? "Deselect all" : "Select all"}
                    </button>
                  )}
                </div>
                <ul className="mt-2 divide-y divide-border/60">
                  {category.items.map((item) => (
                    <li key={item.id}>
                      <ItemRow
                        item={item}
                        qty={state[item.id] ?? 0}
                        onToggleCheck={() => toggleCheck(item.id)}
                        onSelectExclusive={(group) =>
                          selectExclusive(item.id, group)
                        }
                        onSetQty={(qty) =>
                          setQty(item.id, qty, "max" in item ? item.max ?? 99 : 99)
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface-elevated/80 p-6 backdrop-blur">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Your custom plan
                </h3>
                <span className="text-xs uppercase tracking-[0.18em] text-muted">
                  {totalSelected} item{totalSelected === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-5 max-h-[340px] overflow-y-auto pr-1">
                {selectedByCategory.length === 0 ? (
                  <p className="text-sm text-muted">
                    No items yet. Tick anything from the list to start building
                    your plan.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {selectedByCategory.map((group) => (
                      <li key={group.category.id}>
                        <div className="text-xs uppercase tracking-[0.18em] text-muted">
                          {group.category.name}
                        </div>
                        <ul className="mt-2 space-y-2">
                          {group.entries.map(({ item, qty }) => {
                            const subtotal = item.price * qty;
                            const showQty = item.kind === "qty" && qty > 1;
                            return (
                              <li
                                key={item.id}
                                className="flex items-start justify-between gap-4 text-sm"
                              >
                                <span className="text-secondary">
                                  {item.name}
                                  {showQty && (
                                    <span className="text-muted"> × {qty}</span>
                                  )}
                                </span>
                                <span className="whitespace-nowrap font-medium text-foreground">
                                  {formatPrice(subtotal)}
                                  {item.kind === "monthly" && (
                                    <span className="text-xs text-muted">
                                      {" "}
                                      /mo
                                    </span>
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-muted">
                    One-time total
                  </span>
                  <span className="text-3xl font-semibold tracking-tight gradient-text transition-all duration-300">
                    {formatPrice(totals.oneTime)}
                  </span>
                </div>
                {totals.monthly > 0 && (
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-muted">
                      Monthly total
                    </span>
                    <span className="text-xl font-semibold text-foreground">
                      {formatPrice(totals.monthly)}
                      <span className="text-sm text-muted">/mo</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={submitQuote}
                  className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-strong"
                >
                  Get my custom quote
                </button>
                <button
                  type="button"
                  onClick={reset}
                  disabled={totalSelected === 0}
                  className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm text-secondary transition-colors hover:border-border-strong hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </aside>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ItemRow({
  item,
  qty,
  onToggleCheck,
  onSelectExclusive,
  onSetQty,
}: {
  item: Item;
  qty: number;
  onToggleCheck: () => void;
  onSelectExclusive: (group: string) => void;
  onSetQty: (qty: number) => void;
}) {
  const active = qty > 0;
  const priceLabel =
    item.kind === "monthly"
      ? `${formatPrice(item.price)}/mo`
      : item.kind === "qty"
        ? `${formatPrice(item.price)} ${item.unitLabel}`
        : formatPrice(item.price);

  if (item.kind === "qty") {
    return (
      <div className="flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <div className="text-sm text-foreground">{item.name}</div>
          <div className="text-xs text-muted">{priceLabel}</div>
        </div>
        <QtyControl
          value={qty}
          max={item.max ?? 99}
          onChange={(next) => onSetQty(next)}
        />
      </div>
    );
  }

  const handleClick = () => {
    if (item.kind === "exclusive") onSelectExclusive(item.group);
    else onToggleCheck();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      className={
        "flex w-full items-center justify-between gap-4 py-3 text-left transition-colors " +
        (active ? "text-foreground" : "text-secondary hover:text-foreground")
      }
    >
      <div className="flex min-w-0 items-start gap-3">
        <span
          aria-hidden
          className={
            "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border transition-all " +
            (active
              ? "border-accent bg-accent text-foreground shadow-[0_0_0_4px_rgba(99,102,241,0.18)]"
              : "border-border-strong/70 bg-background")
          }
        >
          {active && (
            <svg
              viewBox="0 0 20 20"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10.5l4 4 8-9" />
            </svg>
          )}
        </span>
        <span className="text-sm">{item.name}</span>
      </div>
      <span
        className={
          "whitespace-nowrap text-sm font-medium transition-colors " +
          (active ? "text-accent-glow" : "text-muted")
        }
      >
        {priceLabel}
      </span>
    </button>
  );
}

function QtyControl({
  value,
  max,
  onChange,
}: {
  value: number;
  max: number;
  onChange: (next: number) => void;
}) {
  return (
    <div
      className={
        "inline-flex items-center gap-1 rounded-full border bg-background p-1 transition-colors " +
        (value > 0 ? "border-accent/60" : "border-border")
      }
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 0}
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>
      <span
        aria-live="polite"
        className={
          "min-w-[1.5rem] text-center text-sm font-medium tabular-nums " +
          (value > 0 ? "text-foreground" : "text-muted")
        }
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
