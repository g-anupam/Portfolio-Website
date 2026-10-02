import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-block py-[11px] underline decoration-1 underline-offset-[5px] hover:decoration-2";

// Text link with a 44px tap target. External links open in a new tab and get an arrow.
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = /^https?:\/\//.test(href);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${className}`}
      >
        {children} <span aria-hidden="true">↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${className}`}>
      {children}
    </Link>
  );
}
