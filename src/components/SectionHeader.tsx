import { Label } from "./Label";

export function SectionHeader({
  title,
  label,
}: {
  title: string;
  label: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
      <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-none font-bold tracking-[-0.035em]">
        {title}
      </h2>
      <Label>{label}</Label>
    </div>
  );
}
