import { useId } from "react";

type Box = { x: number; y: number; w?: number; h?: number; lines: string[] };
type Arrow = {
  /** Polyline points, "x,y x,y ...", ending where the arrowhead goes. */
  points: string;
  label?: {
    x: number;
    y: number;
    text: string;
    anchor?: "start" | "middle" | "end";
  };
};

const BOX_W = 84;
const BOX_H = 36;

// Small box-and-arrow diagram drawn on a 320x200 grid; colours follow the theme.
function Diagram({
  label,
  boxes,
  arrows,
}: {
  label: string;
  boxes: Box[];
  arrows: Arrow[];
}) {
  const markerId = useId();

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 320 200"
      className="bg-fill size-full font-mono"
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 8 4 0 8z" fill="var(--muted)" />
        </marker>
      </defs>
      {arrows.map((arrow) => (
        <g key={arrow.points}>
          <polyline
            points={arrow.points}
            fill="none"
            stroke="var(--muted)"
            strokeWidth="1"
            markerEnd={`url(#${markerId})`}
          />
          {arrow.label && (
            <text
              x={arrow.label.x}
              y={arrow.label.y}
              textAnchor={arrow.label.anchor ?? "middle"}
              fontSize="8.5"
              fill="var(--muted)"
            >
              {arrow.label.text}
            </text>
          )}
        </g>
      ))}
      {boxes.map((box) => {
        const w = box.w ?? BOX_W;
        const h = box.h ?? BOX_H;
        const firstLine = box.y + h / 2 - (box.lines.length - 1) * 5.5 + 3.5;
        return (
          <g key={box.lines.join(" ")}>
            <rect
              x={box.x}
              y={box.y}
              width={w}
              height={h}
              fill="var(--bg)"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            {box.lines.map((line, i) => (
              <text
                key={line}
                x={box.x + w / 2}
                y={firstLine + i * 11}
                textAnchor="middle"
                fontSize="10"
                fill="var(--ink)"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function KafFlowDiagram() {
  return (
    <Diagram
      label="KafFlow architecture: a producer requests a topic from the admin API, which records state in SQLite and creates approved topics in Kafka. The producer publishes to Kafka and consumers subscribe."
      boxes={[
        { x: 16, y: 30, lines: ["Producer"] },
        { x: 118, y: 30, lines: ["Admin API"] },
        { x: 220, y: 30, lines: ["SQLite"] },
        { x: 118, y: 134, lines: ["Kafka broker"] },
        { x: 220, y: 134, lines: ["Consumers"] },
      ]}
      arrows={[
        { points: "100,48 118,48", label: { x: 109, y: 22, text: "request" } },
        { points: "202,48 220,48", label: { x: 211, y: 22, text: "state" } },
        {
          points: "160,66 160,134",
          label: {
            x: 166,
            y: 103,
            text: "approve, create topic",
            anchor: "start",
          },
        },
        {
          points: "58,66 58,152 118,152",
          label: { x: 64, y: 144, text: "publish", anchor: "start" },
        },
        {
          points: "202,152 220,152",
          label: { x: 211, y: 186, text: "subscribe" },
        },
      ]}
    />
  );
}

export function PshDiagram() {
  return (
    <Diagram
      label="psh loop: read a line, tokenize, parse, run it as a built-in or fork and exec, wait for the process, then show the prompt again."
      boxes={[
        { x: 16, y: 30, lines: ["read line"] },
        { x: 118, y: 30, lines: ["tokenize"] },
        { x: 220, y: 30, lines: ["parse"] },
        { x: 220, y: 134, lines: ["built-in or", "fork + exec"] },
        { x: 118, y: 134, lines: ["wait"] },
        { x: 16, y: 134, lines: ["prompt"] },
      ]}
      arrows={[
        { points: "100,48 118,48" },
        { points: "202,48 220,48" },
        { points: "262,66 262,134" },
        { points: "220,152 202,152" },
        { points: "118,152 100,152" },
        { points: "58,134 58,66" },
      ]}
    />
  );
}
