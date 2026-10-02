import { ArrowLink } from "@/components/ArrowLink";
import { Label } from "@/components/Label";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="flex scroll-mt-6 flex-col gap-7 pt-[clamp(88px,11vw,140px)] pb-[clamp(64px,7vw,96px)]"
    >
      <Label>04 — Contact</Label>
      <h2 className="font-display text-[clamp(56px,8.4vw,120px)] leading-[0.9] font-extrabold tracking-[-0.045em]">
        Say hello.
      </h2>
      <div className="flex flex-wrap items-baseline gap-x-10 gap-y-2 text-[clamp(20px,2.4vw,28px)] font-medium">
        <ArrowLink href={site.links.linkedin} className="text-accent">
          LinkedIn
        </ArrowLink>
        <ArrowLink href={site.links.github}>GitHub</ArrowLink>
      </div>
    </section>
  );
}
