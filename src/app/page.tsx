import { Container } from "@/components/Container";
import { Contact } from "@/sections/Contact";
import { Glance } from "@/sections/Glance";
import { Hero } from "@/sections/Hero";

import { Practice } from "@/sections/Practice";
import { Work } from "@/sections/Work";

// Rebuild the page in the background at most every 6 hours to refresh LeetCode data.
export const revalidate = 21600;

export default function Home() {
  return (
    <main id="top" tabIndex={-1} className="flex-1 outline-none">
      <Container>
        <Hero />
        <Glance />
        <Work />
        <Practice />
        <Contact />
      </Container>
    </main>
  );
}
