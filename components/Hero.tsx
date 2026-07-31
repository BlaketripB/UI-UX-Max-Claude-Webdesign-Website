"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import MagneticButton from "@/components/MagneticButton";

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sceneRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf: number | null = null;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    function onMove(e: MouseEvent) {
      const rect = node!.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    function loop() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      node!.style.setProperty("--px", cx.toFixed(3));
      node!.style.setProperty("--py", cy.toFixed(3));
      raf = requestAnimationFrame(loop);
    }

    node.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      node.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      className="relative isolate overflow-hidden grain"
      style={{ "--px": "0", "--py": "0" } as React.CSSProperties}
    >
      {/* Animated background: gradient orbs + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/4 h-[560px] w-[560px] rounded-full bg-accent/40 blur-[160px] animate-drift" />
        <div className="absolute right-[-160px] top-[10%] h-[520px] w-[520px] rounded-full bg-accent-2/25 blur-[160px] animate-drift-slow" />
        <div className="absolute left-1/2 bottom-[-200px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent-glow/20 blur-[180px] animate-drift" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] grid-mask animate-grid-pan" />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center md:pt-40 md:pb-28">
        {/* Status pill */}
        <div className="kinetic-mask">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-secondary backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Booking projects — Q2 2026
          </span>
        </div>

        {/* Kinetic headline */}
        <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-[96px]">
          <span className="kinetic-mask">
            <span style={{ animationDelay: "80ms" }} className="gradient-text">
              Premium websites,
            </span>
          </span>
          <br />
          <span className="kinetic-mask">
            <span style={{ animationDelay: "180ms" }}>locked in.</span>
          </span>
        </h1>

        <div className="kinetic-mask mt-7 max-w-2xl">
          <span
            style={{ animationDelay: "280ms" }}
            className="block text-base text-secondary sm:text-lg"
          >
            A design &amp; engineering studio building fast, cinematic sites for
            founders and brands who refuse to look average.
          </span>
        </div>

        <div
          style={{
            animation:
              "kinetic-up 0.9s var(--ease-out-expo) 380ms both",
          }}
          className="mt-10 flex w-full max-w-xs flex-col gap-3 md:w-auto md:max-w-none md:flex-row md:items-center md:gap-4"
        >
          <MagneticButton
            href="#contact"
            className="hover-glow w-full rounded-full border border-transparent bg-accent px-7 py-3.5 text-sm font-medium text-foreground hover:bg-accent-strong md:w-auto"
          >
            Start a project
            <span aria-hidden className="ml-2">
              →
            </span>
          </MagneticButton>
          <Link
            href="#work"
            className="w-full rounded-full border border-border bg-surface/60 px-7 py-3.5 text-center text-sm font-medium text-secondary backdrop-blur transition-colors hover:border-border-strong hover:text-foreground md:w-auto"
          >
            See selected work
          </Link>
        </div>

        {/* 3D floating scene — mouse parallax cards */}
        <div
          className="perspective relative mt-20 h-[320px] w-full max-w-5xl sm:h-[420px]"
          aria-hidden
        >
          <div
            className="absolute inset-0 preserve-3d"
            style={{
              transform:
                "rotateX(calc(var(--py) * -6deg)) rotateY(calc(var(--px) * 10deg))",
              transition: "transform 250ms var(--ease-out-expo)",
            }}
          >
            {/* Back layer — browser frame */}
            <div
              className="absolute left-1/2 top-1/2 h-[280px] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border/80 bg-surface/70 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur sm:h-[360px]"
              style={{ transform: "translate3d(calc(var(--px) * -14px), calc(var(--py) * -10px), -80px)" }}
            >
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-4 font-mono text-[11px] text-muted">
                  lockedin.design/clients/northwind
                </span>
              </div>
              <div className="grid h-[calc(100%-36px)] grid-cols-3 gap-3 p-4">
                <div className="col-span-2 rounded-lg bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.6),rgba(34,211,238,0.2)_50%,transparent_70%)]" />
                <div className="rounded-lg bg-gradient-to-br from-accent/25 to-accent-2/10" />
                <div className="rounded-lg bg-surface-elevated" />
                <div className="col-span-2 rounded-lg bg-surface-elevated" />
              </div>
            </div>

            {/* Middle — big glass card */}
            <div
              className="absolute left-[8%] top-1/2 h-[200px] w-[44%] -translate-y-1/2 rounded-2xl glass p-5 sm:h-[260px]"
              style={{ transform: "translate3d(calc(var(--px) * 28px), calc(var(--py) * 20px), 40px) rotateZ(-3deg)" }}
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Performance
              </div>
              <div className="mt-2 font-mono text-4xl font-semibold text-foreground sm:text-5xl">
                1.2<span className="text-accent-2">s</span>
              </div>
              <div className="mt-1 text-xs text-secondary">
                LCP on 4G — Lighthouse 98
              </div>
              <div className="mt-5 space-y-1.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-accent to-accent-2" />
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-accent-glow to-accent" />
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-accent-2 to-accent-glow" />
                </div>
              </div>
            </div>

            {/* Front — conversion stat */}
            <div
              className="absolute right-[6%] top-1/2 h-[180px] w-[38%] -translate-y-1/2 rounded-2xl border border-border-strong bg-surface-elevated/95 p-5 shadow-[0_30px_80px_-20px_rgba(99,102,241,0.4)] backdrop-blur sm:h-[240px]"
              style={{ transform: "translate3d(calc(var(--px) * 44px), calc(var(--py) * 32px), 110px) rotateZ(4deg)" }}
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Conversion lift
              </div>
              <div className="mt-2 font-mono text-5xl font-semibold tracking-tight sm:text-6xl">
                <span className="gradient-text">+62%</span>
              </div>
              <div className="mt-1 text-xs text-secondary">
                Demo requests, 90-day avg
              </div>
              <svg
                viewBox="0 0 200 60"
                className="mt-4 h-14 w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="sp" x1="0" x2="1">
                    <stop offset="0" stopColor="#6366f1" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 C20,40 35,48 55,35 C75,22 95,30 115,20 C135,12 160,18 200,5"
                  fill="none"
                  stroke="url(#sp)"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            {/* Floating accent orb */}
            <div
              className="absolute left-[52%] top-[12%] h-16 w-16 rounded-full bg-gradient-to-br from-accent-glow to-accent-2 shadow-[0_0_60px_rgba(99,102,241,0.8)] animate-float-y"
              style={{ transform: "translate3d(calc(var(--px) * 50px), calc(var(--py) * -30px), 160px)" }}
            />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex flex-col items-center gap-2 text-muted">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="relative h-10 w-[1px] overflow-hidden bg-border">
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-accent to-transparent animate-float-y" />
          </div>
        </div>
      </div>
    </section>
  );
}
