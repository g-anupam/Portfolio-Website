export type Experience = {
  role: string;
  organisation: string;
  /** Shown in the left column; leave null when there is no date to show. */
  period: string | null;
  summary: string;
};

// Order here is the order on the page.
export const experience: Experience[] = [
  {
    role: "Software Developer Intern",
    organisation: "4 Good AI",
    period: "Jun – Jul 2025",
    summary:
      "Worked on an agentic AI platform that automates business processes for e-commerce clients. Rebuilt the in-app chat and cut API response times from 10–20 seconds to under one.",
  },
  {
    role: "Teaching Assistant, Machine Learning",
    organisation: "PES University",
    period: "Aug 2026 – now",
    summary:
      "Guiding students through core ML concepts and their code implementations.",
  },
  {
    role: "Chair, IEEE Student Branch",
    organisation: "PES University",
    period: "2025 – 2026",
    summary:
      "Led the branch's technical initiatives, including two hackathons with 250+ participants, and taught a Git workshop on clean pull-request workflows.",
  },
  {
    role: "Tech Head, Maaya",
    organisation: "PES University fest",
    period: null,
    summary:
      "Built and ran the live fest platform, with Razorpay ticketing for 2,000+ customers and fixes shipped during the event without downtime.",
  },
  {
    role: "2nd place, Ingenious Hackathon",
    organisation: "Hackathon",
    period: null,
    summary:
      "Built a C/Python AST parser that inserts missing free() calls to prevent memory leaks in legacy code.",
  },
];
