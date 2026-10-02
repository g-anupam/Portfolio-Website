import { Label } from "@/components/Label";
import { profile } from "@/content/profile";

export function Glance() {
  if (profile.facts.length === 0) return null;

  return (
    <section aria-label="At a glance">
      <dl className="border-ink border-b-rule grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-8 border-t border-b">
        {profile.facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1.5 py-5">
            <Label as="dt">{fact.label}</Label>
            <dd className="font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
