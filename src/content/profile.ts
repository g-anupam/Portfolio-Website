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
  email: string | null;
  /** Path to the résumé PDF in /public. */
  resume: string | null;
  leetcodeUsername: string;
};

// Anything left null or empty is simply not rendered, so the site never shows placeholders.
export const profile: Profile = {
  tagline: null,
  about: [],
  photo: {
    src: "/anupam.jpg",
    alt: "Anupam G smiling, in a black IEEE student branch hoodie",
    caption: null,
  },
  facts: [],
  practiceIntro: null,
  email: null,
  resume: "/resume.pdf",
  leetcodeUsername: "anupam2606",
};
