import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-[clamp(20px,4vw,40px)] ${className}`}
    >
      {children}
    </div>
  );
}
