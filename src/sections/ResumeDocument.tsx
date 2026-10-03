"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Must be set in the same module that renders <Document>, per react-pdf's docs.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

/** US Letter at 96 dpi; pages never render wider than this. */
const MAX_WIDTH = 816;

export function PagePlaceholder({ children }: { children?: React.ReactNode }) {
  return (
    <div className="text-muted flex aspect-[8.5/11] w-full items-center justify-center bg-white p-6 text-center font-mono text-xs">
      {children}
    </div>
  );
}

export default function ResumeDocument({
  file,
  fallback,
}: {
  file: string;
  /** Shown if the PDF can't be displayed, e.g. in an older browser. */
  fallback: React.ReactNode;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();
  const [pages, setPages] = useState(0);

  // Render the pages at the frame's width, re-rendering when it changes.
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.min(entry.contentRect.width, MAX_WIDTH)),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frame} className="w-full max-w-[816px]">
      {width && (
        <Document
          file={file}
          suspense={false}
          onLoadSuccess={({ numPages }) => setPages(numPages)}
          loading={<PagePlaceholder>Loading résumé…</PagePlaceholder>}
          error={<PagePlaceholder>{fallback}</PagePlaceholder>}
          className="flex flex-col gap-6"
        >
          {Array.from({ length: pages }, (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              width={width}
              suspense={false}
              loading={<PagePlaceholder />}
              className="bg-white shadow-[0_1px_2px_rgb(0_0_0/0.08),0_12px_40px_-12px_rgb(0_0_0/0.25)]"
            />
          ))}
        </Document>
      )}
    </div>
  );
}
