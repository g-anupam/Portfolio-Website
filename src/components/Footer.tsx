import { site } from "@/lib/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="border-rule text-muted flex flex-wrap justify-between gap-x-8 gap-y-2 border-t pt-6 pb-10 font-mono text-xs">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Set in Bricolage Grotesque and Hanken Grotesk</span>
          <a
            href={site.links.source}
            target="_blank"
            rel="noopener noreferrer"
            className="-my-3 py-3 underline decoration-1 underline-offset-[5px] hover:decoration-2"
          >
            Source <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
