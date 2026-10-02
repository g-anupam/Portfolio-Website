import type { Project } from "@/content/projects";

// Stand-in until each project's real image or diagram lands (plan step 20).
export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      aria-hidden="true"
      className="bg-fill size-full"
      data-visual={project.visual}
    />
  );
}
