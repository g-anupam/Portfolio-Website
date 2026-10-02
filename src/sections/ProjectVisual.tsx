import type { Project } from "@/content/projects";
import { TerminalPanel } from "./TerminalPanel";

// Screenshot and diagrams are stand-ins until the real ones land (plan step 20).
export function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "terminal") return <TerminalPanel />;

  return (
    <div
      aria-hidden="true"
      className="bg-fill size-full"
      data-visual={project.visual}
    />
  );
}
