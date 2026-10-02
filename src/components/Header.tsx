import Link from "next/link";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/#practice", label: "Practice" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header>
      <Container>
        {/* Phone: name and toggle on one row, links below. Wider: one row. */}
        <div className="border-rule flex flex-wrap items-center gap-x-6 border-b py-3.5 font-mono text-[13px]">
          <Link
            href="/#top"
            className="flex items-center gap-2.5 py-3.5 font-medium"
          >
            <span aria-hidden="true" className="bg-accent block size-2.5" />
            {site.name}
          </Link>
          <nav
            aria-label="Primary"
            className="order-3 flex basis-full flex-wrap items-center gap-x-6 sm:order-none sm:ml-auto sm:basis-auto"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3.5 decoration-1 underline-offset-[5px] hover:underline"
              >
                {item.label}
              </Link>
            ))}
            {profile.resume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 underline decoration-1 underline-offset-[5px] hover:decoration-2"
              >
                Résumé <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </nav>
          <div className="ml-auto sm:ml-0">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
