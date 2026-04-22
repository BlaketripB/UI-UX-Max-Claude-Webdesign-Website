"use client";

import {
  useRef,
  type ReactNode,
  type CSSProperties,
  type MouseEvent,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  style?: CSSProperties;
};

export default function TiltCard({
  children,
  className = "",
  intensity = 10,
  glare = true,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * intensity;
    const ry = (px - 0.5) * intensity;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      node.style.setProperty("--rx", `${rx}deg`);
      node.style.setProperty("--ry", `${ry}deg`);
      node.style.setProperty("--mx", `${px * 100}%`);
      node.style.setProperty("--my", `${py * 100}%`);
    });
  }

  function handleLeave() {
    const node = ref.current;
    if (!node) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    node.style.setProperty("--rx", `0deg`);
    node.style.setProperty("--ry", `0deg`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group/tilt relative [transform-style:preserve-3d] [transition:transform_300ms_cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        transform: "perspective(1200px) rotateX(var(--rx,0)) rotateY(var(--ry,0))",
        ...style,
      }}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.14), transparent 45%)",
          }}
        />
      )}
    </div>
  );
}
