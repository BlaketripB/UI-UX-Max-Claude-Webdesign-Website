"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
} & HTMLAttributes<HTMLElement>;

export default function ScrollReveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  once = true,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("in-view");
            if (once) io.disconnect();
          } else if (!once) {
            node.classList.remove("in-view");
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [delay, once]);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={`reveal ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
