import type { ElementType, ReactNode } from "react";

// Small uppercase mono text used for section numbers, captions and metadata.
export function Label({
  children,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag
      className={`text-muted font-mono text-xs tracking-[0.06em] uppercase ${className}`}
    >
      {children}
    </Tag>
  );
}
