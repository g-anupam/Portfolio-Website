import Image from "next/image";
import { ArrowLink } from "@/components/ArrowLink";
import { Label } from "@/components/Label";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";

export function Hero() {
  const { tagline, about, photo } = profile;
  const [lead, ...rest] = about;

  return (
    <section className="flex flex-wrap items-end gap-x-16 gap-y-14 pt-[clamp(48px,7vw,88px)] pb-18">
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-8">
        {tagline && <Label>{tagline}</Label>}
        <h1 className="font-display text-[clamp(56px,8.4vw,120px)] leading-[0.9] font-extrabold tracking-[-0.045em]">
          {site.name}
        </h1>
        {lead && (
          <div className="flex max-w-[560px] flex-col gap-4">
            <p className="text-[21px] leading-normal">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph} className="text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-x-7 text-base font-medium">
          <ArrowLink href={site.links.github}>GitHub</ArrowLink>
          <ArrowLink href={site.links.leetcode}>LeetCode</ArrowLink>
          <ArrowLink href={site.links.linkedin}>LinkedIn</ArrowLink>
          <ArrowLink href="/#contact" className="text-accent">
            Get in touch
          </ArrowLink>
        </div>
      </div>
      {photo && (
        <figure className="flex min-w-[260px] flex-[0_1_420px] flex-col gap-3">
          <div className="bg-fill relative aspect-[4/5]">
            <span
              aria-hidden="true"
              className="bg-accent absolute -top-2.5 -left-2.5 z-10 size-5"
            />
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1000px) 420px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="text-muted flex justify-between gap-4 font-mono text-xs">
            <span>Fig. 1</span>
            <span>{photo.caption}</span>
          </figcaption>
        </figure>
      )}
    </section>
  );
}
