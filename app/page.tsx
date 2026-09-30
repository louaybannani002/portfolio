import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { navLinks } from "@/data/site";

const BUILT = ["about", "experience", "projects", "skills", "certificates"];

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certificates />

      {/* Section shells — content is built in later tasks */}
      {navLinks
        .filter((link) => !BUILT.includes(link.id))
        .map((link) => (
          <section
            key={link.id}
            id={link.id}
            aria-labelledby={`${link.id}-heading`}
            className="mx-auto min-h-[80svh] max-w-content px-gutter py-section"
          >
            <SectionHeading section={link.id} />
          </section>
        ))}
    </>
  );
}
