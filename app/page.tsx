import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { IconSprite } from "@/components/ui/TechIcon";
import { personJsonLd } from "@/data/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe here: "<" is escaped so the payload can't close the tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
      />
      <IconSprite />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Certificates />
      <Contact />
    </>
  );
}
