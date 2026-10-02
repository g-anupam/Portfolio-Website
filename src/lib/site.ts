// Site-wide facts used by metadata now and by page content later.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "Anupam G",
  title: "Anupam G — Projects and DSA practice",
  description:
    "Portfolio of Anupam G: selected projects and data structures and algorithms practice.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (productionHost ? `https://${productionHost}` : "http://localhost:3000"),
  links: {
    github: "https://github.com/g-anupam",
    linkedin: "https://linkedin.com/in/g-anupam",
    leetcode: "https://leetcode.com/u/anupam2606/",
    source: "https://github.com/g-anupam/Portfolio-Website",
  },
} as const;
