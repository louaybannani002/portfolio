import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { navLinks } from "@/data/site";

const BUILT = ["about", "experience", "projects"];

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />

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
