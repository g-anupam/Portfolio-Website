// Example prompts from the NaturalShell README, shown as a terminal.
const prompts = [
  "find all python files modified this week",
  "what was that ffmpeg command I used to compress a video",
  "show me disk usage sorted by size",
];

export function TerminalPanel() {
  return (
    <div
      role="img"
      aria-label="Terminal showing example NaturalShell prompts"
      className="bg-term-bg text-term-fg flex size-full flex-col gap-2 overflow-hidden p-4 font-mono text-xs leading-normal"
    >
      {prompts.map((prompt) => (
        <div key={prompt}>
          <span className="text-term-muted">$</span> agent &quot;{prompt}&quot;
        </div>
      ))}
    </div>
  );
}
