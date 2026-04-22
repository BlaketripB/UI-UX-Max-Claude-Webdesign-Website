import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: "slow" | "normal";
  className?: string;
  reverse?: boolean;
};

export default function Marquee({
  children,
  speed = "normal",
  className = "",
  reverse = false,
}: Props) {
  const anim = speed === "slow" ? "animate-marquee-slow" : "animate-marquee";
  return (
    <div
      className={`relative flex w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      <div
        className={`flex min-w-full shrink-0 items-center gap-10 whitespace-nowrap ${anim}`}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className="flex items-center gap-10">{children}</div>
        <div aria-hidden className="flex items-center gap-10">
          {children}
        </div>
      </div>
    </div>
  );
}
