import { SectionHeader } from "@/components/SectionHeader";
import { experience } from "@/content/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-6 pt-[clamp(72px,9vw,120px)]">
      <div className="pb-10">
        <SectionHeader title="Experience" label="02 — Experience" />
      </div>
      <ol className="border-rule border-b">
        {experience.map((item) => (
          <li
            key={item.role}
            className="border-rule first:border-ink flex flex-wrap gap-x-10 gap-y-3 border-t py-7"
          >
            <div className="text-muted flex-[0_0_150px] pt-1.5 font-mono text-[13px]">
              {item.period}
            </div>
            <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-1">
              <h3 className="font-display text-2xl leading-[1.15] font-bold tracking-[-0.02em]">
                {item.role}
              </h3>
              <div className="text-muted font-mono text-[13px]">
                {item.organisation}
              </div>
            </div>
            <p className="min-w-0 flex-[1.4_1_360px]">{item.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
