import { site } from "@/lib/site";

export default function Home() {
  return (
    <main
      id="top"
      className="flex flex-1 flex-col items-center justify-center gap-4 p-6"
    >
      <p className="text-muted font-mono text-xs tracking-[0.06em] uppercase">
        Under construction
      </p>
      <h1 className="font-display text-[clamp(56px,8.4vw,120px)] leading-[0.9] font-extrabold tracking-[-0.045em]">
        {site.name}
      </h1>
      <p>Projects and DSA practice, coming soon.</p>
    </main>
  );
}
