import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ArrowLink";
import { Container } from "@/components/Container";
import { Label } from "@/components/Label";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";
import { ResumeViewer } from "@/sections/ResumeViewer";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  const file = profile.resume;
  if (!file) notFound();

  const downloadName = `${site.name.replace(/\s+/g, "-")}-Resume.pdf`;

  return (
    <main id="top" tabIndex={-1} className="flex-1 outline-none">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6 pt-[clamp(48px,7vw,88px)] pb-10">
          <div className="flex flex-col gap-4">
            <Label>{site.name}</Label>
            <h1 className="font-display text-[clamp(48px,7vw,96px)] leading-[0.9] font-extrabold tracking-[-0.045em]">
              Résumé
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={file}
              download={downloadName}
              className="bg-accent text-on-accent px-5 py-[13px] font-semibold hover:opacity-90"
            >
              Download PDF
            </a>
            <ArrowLink href={file} className="font-medium">
              Open PDF
            </ArrowLink>
          </div>
        </div>
      </Container>

      {/* Full-bleed stage with the paper on it. */}
      <div className="bg-fill border-rule border-y px-[clamp(12px,4vw,48px)] py-[clamp(20px,5vw,64px)]">
        <div className="flex justify-center">
          <ResumeViewer
            file={file}
            fallback={
              <>
                Your browser can&apos;t show the résumé here.{" "}
                <a href={file} className="text-ink underline">
                  Open the PDF
                </a>
              </>
            }
          />
        </div>
      </div>

      <Container>
        <div className="flex justify-end pt-5 pb-16 font-medium">
          <ArrowLink href="/">Back to the home page</ArrowLink>
        </div>
      </Container>
    </main>
  );
}
