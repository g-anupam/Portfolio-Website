import { Container } from "@/components/Container";
import { experience, volunteering } from "@/content/experience";
import { Contact } from "@/sections/Contact";
import { Glance } from "@/sections/Glance";
import { Hero } from "@/sections/Hero";
import { Practice } from "@/sections/Practice";
import { Timeline } from "@/sections/Timeline";
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
        <Timeline
          id="experience"
          title="Experience"
          label="02 — Experience"
          items={experience}
        />
        <Timeline
          id="volunteering"
          title="Volunteering"
          label="03 — Volunteering"
          items={volunteering}
        />
        <Practice />
        <Contact />
      </Container>
    </main>
  );
}
