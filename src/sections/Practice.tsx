import { Label } from "@/components/Label";
import { SectionHeader } from "@/components/SectionHeader";
import { profile } from "@/content/profile";
import { getLeetCode } from "@/lib/leetcode";
import { buildPracticeYear } from "@/lib/practice";

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col-reverse gap-2 pt-6 pb-7">
      <Label as="dt">{label}</Label>
      <dd className="font-display text-[clamp(40px,5vw,56px)] leading-none font-bold tracking-[-0.03em]">
        {value}
      </dd>
    </div>
  );
}

export async function Practice() {
  const data = await getLeetCode(profile.leetcodeUsername);
  const year = buildPracticeYear(data.calendar, new Date(data.fetchedAt));
  const difficulties = [
    { label: "Easy", count: data.solved.easy },
    { label: "Medium", count: data.solved.medium },
    { label: "Hard", count: data.solved.hard },
  ];

  return (
    <section id="practice" className="scroll-mt-6 pt-[clamp(72px,9vw,120px)]">
      <div className="pb-5">
        <SectionHeader
          title="Data structures &amp; algorithms"
          label="02 — Practice"
        />
      </div>
      {profile.practiceIntro && (
        <p className="text-muted max-w-[560px]">{profile.practiceIntro}</p>
      )}

      <div className="border-ink mt-12 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-8 border-t">
        <dl className="contents">
          <Stat value={data.solved.all} label="Problems solved" />
          <Stat value={year.activeDays} label="Active days, last 12 months" />
          <Stat value={year.longestStreak} label="Longest streak, days" />
        </dl>
        <dl className="flex flex-col gap-2 pt-6 pb-7 font-mono text-[13px]">
          {difficulties.map((difficulty) => (
            <div
              key={difficulty.label}
              className="border-rule flex justify-between gap-3 border-b pb-2 last:border-b-0 last:pb-0"
            >
              <dt className="text-muted">{difficulty.label}</dt>
              <dd>{difficulty.count}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
