// Site-wide facts used by metadata and page content.
export const site = {
  name: "Anupam G",
  title: "Anupam G — Projects and DSA practice",
  description:
    "Portfolio of Anupam G: selected projects and data structures and algorithms practice.",
  // Canonical address, used for the sitemap, robots file and social previews.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anupamg.in",
  links: {
    github: "https://github.com/g-anupam",
    linkedin: "https://linkedin.com/in/g-anupam",
    leetcode: "https://leetcode.com/u/anupam2606/",
    source: "https://github.com/g-anupam/Portfolio-Website",
  },
} as const;
