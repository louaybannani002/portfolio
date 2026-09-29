import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { navLinks } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      {/* Section shells — content is built in later tasks */}
      {navLinks
        .filter((link) => link.id !== "about")
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
