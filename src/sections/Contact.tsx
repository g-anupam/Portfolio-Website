import { ArrowLink } from "@/components/ArrowLink";
import { Label } from "@/components/Label";
import { contactFormEnabled } from "@/lib/contact";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const formEnabled = contactFormEnabled();

  return (
    <section
      id="contact"
      className="flex scroll-mt-6 flex-col gap-7 pt-[clamp(88px,11vw,140px)] pb-[clamp(64px,7vw,96px)]"
    >
      <Label>05 — Contact</Label>
      <h2 className="font-display text-[clamp(56px,8.4vw,120px)] leading-[0.9] font-extrabold tracking-[-0.045em]">
        Say hello.
      </h2>
      {formEnabled ? (
        <div className="flex flex-wrap items-start gap-x-16 gap-y-8 pt-4">
          <div className="min-w-0 flex-[1.6_1_420px]">
            <ContactForm />
          </div>
          <div className="flex flex-[1_1_220px] flex-col gap-1">
            <Label>Or find me on</Label>
            <div className="flex flex-wrap gap-x-7 text-[21px] font-medium">
              <ArrowLink href={site.links.linkedin}>LinkedIn</ArrowLink>
              <ArrowLink href={site.links.github}>GitHub</ArrowLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-baseline gap-x-10 gap-y-2 text-[clamp(20px,2.4vw,28px)] font-medium">
          <ArrowLink href={site.links.linkedin} className="text-accent">
            LinkedIn
          </ArrowLink>
          <ArrowLink href={site.links.github}>GitHub</ArrowLink>
        </div>
      )}
    </section>
  );
}
