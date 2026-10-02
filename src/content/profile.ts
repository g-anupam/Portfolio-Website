export type Fact = { label: string; value: string };

export type Profile = {
  /** Small line above the name, e.g. "Software engineer · Bengaluru". */
  tagline: string | null;
  /** About paragraphs for the hero. */
  about: string[];
  /** Portrait in /public, 4:5. */
  photo: { src: string; alt: string; caption: string | null } | null;
  /** At-a-glance strip under the hero. */
  facts: Fact[];
  /** One line under the DSA heading. */
  practiceIntro: string | null;
  /** Path to the résumé PDF in /public. */
  resume: string | null;
  leetcodeUsername: string;
};

// Anything left null or empty is simply not rendered, so the site never shows placeholders.
export const profile: Profile = {
  tagline: "Final-year CSE · PES University",
  about: [
    "I'm a final-year computer science student at PES University, working across machine learning, full-stack applications and systems programming.",
    "Right now I'm building a semantic cache for LLM applications. Before that I built agentic tools and full-stack apps.",
    "Away from code I like volunteer work: I chaired the IEEE Student Branch and led tech for the university fest.",
  ],
  photo: {
    src: "/anupam.jpg",
    alt: "Anupam G smiling, in a black IEEE student branch hoodie",
    caption: "CTF 2025, hosted by IEEE SB, PESU ECC · October 2025",
  },
  facts: [
    { label: "Studying", value: "B.Tech CSE, PES University, 2027" },
    { label: "Based in", value: "Bengaluru, India" },
    { label: "Interned at", value: "4 Good AI, full stack" },
    { label: "Teaching", value: "Machine learning TA" },
  ],
  practiceIntro:
    "I've completed 80% of Striver's sheet, and I'm strongest in graphs, dynamic programming and binary trees.",
  resume: "/resume.pdf",
  leetcodeUsername: "anupam2606",
};
