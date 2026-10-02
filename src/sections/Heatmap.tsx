"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { HeatmapWeek } from "@/lib/practice";

const levelClass = [
  "bg-heat-0",
  "bg-heat-1",
  "bg-heat-2",
  "bg-heat-3",
  "bg-heat-4",
];

// Sunday to Saturday; only alternate rows are labelled, like GitHub's graph.
const weekdayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

type Tooltip = { text: string; left: number; top: number };

export function Heatmap({
  weeks,
  summary,
}: {
  weeks: HeatmapWeek[];
  summary: string;
}) {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  // On narrow screens the graph scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    const element = scroller.current;
    if (element) element.scrollLeft = element.scrollWidth;
  }, []);

  function showTooltip(event: PointerEvent<HTMLDivElement>) {
    const cell = event.target as HTMLElement;
    const text = cell.dataset.tip;
    if (!text) {
      setTooltip(null);
      return;
    }
    const box = cell.getBoundingClientRect();
    setTooltip({ text, left: box.left + box.width / 2, top: box.top });
  }

  return (
    <div
      ref={scroller}
      className="overflow-x-auto pb-2"
      onScroll={() => setTooltip(null)}
    >
      <div
        role="img"
        aria-label={summary}
        className="flex w-max gap-1"
        onPointerOver={showTooltip}
        onPointerLeave={() => setTooltip(null)}
      >
        <div className="text-muted flex w-9 flex-col gap-1 font-mono text-[11px] leading-[15px]">
          <div className="h-[18px]" />
          {weekdayLabels.map((label, i) => (
            <div key={i} className="h-[15px]">
              {label}
            </div>
          ))}
        </div>
        {weeks.map((week, w) => (
          <div key={w} className="flex w-[15px] flex-col gap-1">
            <div className="text-muted h-[18px] font-mono text-[11px] leading-[15px] whitespace-nowrap">
              {week.label}
            </div>
            {week.days.map((day, d) =>
              day ? (
                <div
                  key={d}
                  data-tip={day.tip}
                  className={`size-[15px] rounded-[3px] ${levelClass[day.level]}`}
                />
              ) : (
                <div key={d} className="size-[15px]" />
              ),
            )}
          </div>
        ))}
      </div>
      {tooltip && (
        <div
          role="presentation"
          className="bg-ink text-bg pointer-events-none fixed z-20 -translate-x-1/2 -translate-y-full px-2 py-1 font-mono text-xs whitespace-nowrap"
          style={{ left: tooltip.left, top: tooltip.top - 6 }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

export function HeatmapLegend() {
  return (
    <div className="text-muted flex items-center gap-2 font-mono text-xs">
      <span>Less</span>
      <div className="flex gap-1" aria-hidden="true">
        {levelClass.map((className) => (
          <span
            key={className}
            className={`block size-[15px] rounded-[3px] ${className}`}
          />
        ))}
      </div>
      <span>More</span>
    </div>
  );
}
