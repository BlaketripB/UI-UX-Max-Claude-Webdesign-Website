"use client";

import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf: number | null = null;

    const dot = document.createElement("div");
    dot.setAttribute("aria-hidden", "true");
    dot.style.cssText = `
      position: fixed;
      left: 0; top: 0;
      width: 560px; height: 560px;
      border-radius: 9999px;
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(99,102,241,0.22), rgba(34,211,238,0.08) 40%, transparent 70%);
      mix-blend-mode: screen;
      filter: blur(40px);
      opacity: 0.9;
      transition: opacity 400ms ease;
    `;
    document.body.appendChild(dot);

    function loop() {
      tx += (x - tx) * 0.12;
      ty += (y - ty) * 0.12;
      dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
    }
    function onLeave() {
      dot.style.opacity = "0";
    }
    function onEnter() {
      dot.style.opacity = "0.9";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      if (raf) cancelAnimationFrame(raf);
      dot.remove();
    };
  }, []);

  return null;
}
