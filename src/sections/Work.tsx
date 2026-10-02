import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/content/projects";
import { ArrowLink } from "@/components/ArrowLink";
import { site } from "@/lib/site";
import { LeadProject } from "./LeadProject";
import { ProjectRow } from "./ProjectRow";

const indexLabel = (i: number) => String(i + 1).padStart(2, "0");

export function Work() {
  const [lead, ...rest] = projects;

  return (
    <section id="work" className="scroll-mt-6 pt-[clamp(72px,9vw,120px)]">
      <div className="pb-10">
        <SectionHeader title="Selected work" label="01 — Projects" />
      </div>
      <LeadProject project={lead} index={indexLabel(0)} />
      {rest.map((project, i) => (
        <ProjectRow
          key={project.slug}
          project={project}
          index={indexLabel(i + 1)}
        />
      ))}
      <div className="border-rule flex justify-end border-t pt-5 font-medium">
        <ArrowLink href={site.links.github}>
          Everything else on GitHub
        </ArrowLink>
      </div>
    </section>
  );
}
