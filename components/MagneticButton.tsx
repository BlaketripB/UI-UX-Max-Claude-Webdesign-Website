"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 14,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  function move(e: MouseEvent<HTMLAnchorElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${(x / rect.width) * strength}px, ${
      (y / rect.height) * strength
    }px)`;
  }
  function leave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0,0)";
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`inline-flex items-center justify-center transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] ${className}`}
    >
      {children}
    </Link>
  );
}
