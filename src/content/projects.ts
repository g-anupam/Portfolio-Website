export type ProjectVisual = "screenshot" | "terminal" | "kafflow" | "psh";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  /** Short mono lines shown beside the description: stack first, then context. */
  meta: string[];
  codeUrl: string;
  /** Set when the project is deployed somewhere visitors can use it. */
  liveUrl?: string;
  visual: ProjectVisual;
};

// Order here is the order on the page. The first project gets the lead block.
export const projects: Project[] = [
  {
    slug: "quickbyte",
    name: "QuickByte",
    summary:
      "A food-delivery platform with three sides. Customers place orders, restaurants manage their menu and accept them, and drivers deliver, each behind their own role-based login.",
    meta: ["Next.js · MySQL"],
    codeUrl: "https://github.com/g-anupam/QuickBite",
    liveUrl: "https://quick-bite-inky.vercel.app",
    visual: "screenshot",
  },
  {
    slug: "naturalshell",
    name: "NaturalShell",
    summary:
      "Plain English in, shell commands out. A hand-written ReAct loop grounds each command in your own zsh history and the directory you're standing in, with no agent framework underneath.",
    meta: ["Python · ChromaDB", "CLI · local RAG"],
    codeUrl: "https://github.com/g-anupam/NaturalShell",
    visual: "terminal",
  },
  {
    slug: "kafflow",
    name: "KafFlow",
    summary:
      "Kafka with a gatekeeper. Topics are requested, approved by an admin, then created and picked up by producers and consumers without a restart. A multi-threaded producer keeps ingesting while approvals are pending.",
    meta: ["Python · FastAPI", "Kafka · SQLite"],
    codeUrl: "https://github.com/g-anupam/KafFlow",
    visual: "kafflow",
  },
  {
    slug: "psh",
    name: "psh",
    summary:
      "A POSIX-like shell in C: built-in commands, external programs resolved through PATH, process management and tab completion, all on raw system calls. I mentored the five students who built it.",
    meta: ["C", "Tilde 3.0 · HSP PESU-ECC"],
    codeUrl: "https://github.com/homebrew-ec-foss/psh",
    visual: "psh",
  },
];
