import { ArrowLink } from "@/components/ArrowLink";
import { Container } from "@/components/Container";
import { Label } from "@/components/Label";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main id="top" className="flex-1 py-16">
      <Container className="flex flex-col gap-8">
        <Label>Under construction</Label>
        <h1 className="font-display text-[clamp(56px,8.4vw,120px)] leading-[0.9] font-extrabold tracking-[-0.045em]">
          {site.name}
        </h1>
        <div className="flex flex-wrap items-center gap-x-7 font-medium">
          <ArrowLink href={site.links.github}>GitHub</ArrowLink>
          <ArrowLink href={site.links.leetcode}>LeetCode</ArrowLink>
          <ArrowLink href={site.links.linkedin}>LinkedIn</ArrowLink>
        </div>
        <div className="border-ink border-t pt-10">
          <SectionHeader title="Selected work" label="01 — Projects" />
        </div>
      </Container>
    </main>
  );
}
