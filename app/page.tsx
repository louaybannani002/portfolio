import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { identity } from "@/data/portfolio";
import { navLinks } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* Temporary hero — replaced when the Hero section is built */}
      <section
        id="top"
        className="relative flex min-h-svh items-center justify-center overflow-hidden px-gutter"
      >
        <div
          aria-hidden
          className="bg-accent-gradient pointer-events-none absolute top-1/4 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        />
        <Reveal stagger={0.12} className="relative flex flex-col items-center gap-6 text-center">
          <ProfileAvatar className="w-28 sm:w-32" />
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-7xl">
            {identity.name}
          </h1>
          <p className="label-mono text-muted">{identity.title}</p>
        </Reveal>
      </section>

      {/* Section shells — content is built in later tasks */}
      {navLinks.map((link) => (
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
