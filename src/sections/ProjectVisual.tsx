import Image from "next/image";
import type { Project } from "@/content/projects";
import { KafFlowDiagram, PshDiagram } from "./Diagram";
import { TerminalPanel } from "./TerminalPanel";

export function ProjectVisual({
  project,
  sizes,
}: {
  project: Project;
  /** Rendered width hint for the screenshot, passed to next/image. */
  sizes: string;
}) {
  switch (project.visual) {
    case "terminal":
      return <TerminalPanel />;
    case "kafflow":
      return <KafFlowDiagram />;
    case "psh":
      return <PshDiagram />;
    case "screenshot": {
      if (!project.image) return <div className="bg-fill size-full" />;
      const image = (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      );
      return (
        <div className="border-rule bg-fill relative size-full overflow-hidden border">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
            >
              {image}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            image
          )}
        </div>
      );
    }
  }
}
