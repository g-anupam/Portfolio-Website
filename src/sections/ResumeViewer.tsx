"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

// PDF.js only runs in the browser, so the viewer is never server-rendered.
const ResumeDocument = dynamic(() => import("./ResumeDocument"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[816px]">
      <div className="text-muted flex aspect-[8.5/11] w-full items-center justify-center bg-white font-mono text-xs">
        Loading résumé…
      </div>
    </div>
  ),
});

export function ResumeViewer({
  file,
  fallback,
}: {
  file: string;
  fallback: ReactNode;
}) {
  return <ResumeDocument file={file} fallback={fallback} />;
}
