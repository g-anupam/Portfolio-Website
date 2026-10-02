import { Container } from "@/components/Container";
import { Contact } from "@/sections/Contact";
import { Glance } from "@/sections/Glance";
import { Hero } from "@/sections/Hero";

import { Work } from "@/sections/Work";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <Container>
        <Hero />
        <Glance />
        <Work />
        <Contact />
      </Container>
    </main>
  );
}
