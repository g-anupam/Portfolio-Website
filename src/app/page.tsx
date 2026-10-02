import { site } from "@/lib/site";

export default function Home() {
  return (
    <main id="top" className="flex flex-1 items-center justify-center p-6">
      <h1 className="text-2xl font-semibold">{site.name}</h1>
    </main>
  );
}
