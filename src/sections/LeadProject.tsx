import { ArrowLink } from "@/components/ArrowLink";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "./ProjectVisual";

export function LeadProject({
  project,
  index,
}: {
  project: Project;
  index: string;
}) {
  const liveHost = project.liveUrl ? new URL(project.liveUrl).host : undefined;

  return (
    <article className="border-ink flex flex-wrap items-start gap-x-14 gap-y-8 border-t py-10">
      <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-4">
        <div className="text-muted flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[13px]">
          <span>{index}</span>
          {project.liveUrl && (
            <span className="text-accent flex items-center gap-2">
              <span
                aria-hidden="true"
                className="bg-accent block size-2 rounded-full"
              />
              Live
            </span>
          )}
        </div>
        <h3 className="font-display text-[clamp(36px,4.4vw,52px)] leading-[1.05] font-bold tracking-[-0.03em]">
          {project.name}
        </h3>
        <p className="max-w-[460px]">{project.summary}</p>
        <div className="text-muted font-mono text-[13px]">
          {project.meta.join(" · ")}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-on-accent px-5 py-[13px] font-semibold hover:opacity-90"
            >
              Open the live app <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          <ArrowLink href={project.codeUrl} className="font-medium">
            Code
          </ArrowLink>
        </div>
      </div>
      <figure className="flex min-w-0 flex-[1.4_1_480px] flex-col gap-2.5">
        <div className="aspect-[16/10]">
          <ProjectVisual project={project} />
        </div>
        {liveHost && (
          <figcaption className="text-muted font-mono text-xs">
            {liveHost}
          </figcaption>
        )}
      </figure>
    </article>
  );
}
