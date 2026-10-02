import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/content/projects";
import { LeadProject } from "./LeadProject";

const indexLabel = (i: number) => String(i + 1).padStart(2, "0");

export function Work() {
  const [lead] = projects;

  return (
    <section id="work" className="scroll-mt-6 pt-[clamp(72px,9vw,120px)]">
      <div className="pb-10">
        <SectionHeader title="Selected work" label="01 — Projects" />
      </div>
      <LeadProject project={lead} index={indexLabel(0)} />
    </section>
  );
}
