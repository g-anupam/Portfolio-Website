import { Container } from "@/components/Container";
import { Glance } from "@/sections/Glance";
import { Hero } from "@/sections/Hero";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <Container>
        <Hero />
        <Glance />
      </Container>
    </main>
  );
}
