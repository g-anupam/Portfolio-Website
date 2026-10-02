import { ArrowLink } from "@/components/ArrowLink";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: string;
}) {
  return (
    <article className="border-rule flex flex-wrap gap-x-10 gap-y-6 border-t py-9">
      <div className="text-muted flex-[0_0_40px] pt-2.5 font-mono text-[13px]">
        {index}
      </div>
      <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
        <h3 className="font-display text-4xl leading-[1.1] font-bold tracking-[-0.025em]">
          {project.name}
        </h3>
        <p className="max-w-[460px]">{project.summary}</p>
      </div>
      <div className="flex flex-[0_1_190px] flex-col gap-1.5 pt-2.5 font-mono text-[13px]">
        {project.meta.map((line) => (
          <div key={line} className="text-muted">
            {line}
          </div>
        ))}
        <div className="flex gap-5">
          {project.liveUrl && (
            <ArrowLink href={project.liveUrl}>Live</ArrowLink>
          )}
          <ArrowLink href={project.codeUrl}>Code</ArrowLink>
        </div>
      </div>
      <div className="aspect-[8/5] max-w-[360px] min-w-0 flex-[1_1_280px]">
        <ProjectVisual project={project} />
      </div>
    </article>
  );
}
