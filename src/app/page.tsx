import { Container } from "@/components/Container";
import { Hero } from "@/sections/Hero";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <Container>
        <Hero />
      </Container>
    </main>
  );
}
