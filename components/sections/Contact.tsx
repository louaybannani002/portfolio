import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/data/portfolio";
import { ContactChannels } from "./contact/ContactChannels";
import { ContactForm } from "./contact/ContactForm";

/** Heading/text come from data (heading falls back to the nav label; empty text is hidden). */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative mx-auto max-w-content px-gutter py-section cv-auto">
      <div
        aria-hidden
        className="bg-accent-gradient pointer-events-none absolute top-1/3 left-1/2 -z-10 h-80 w-80 max-w-full -translate-x-1/2 rounded-full opacity-[0.08] blur-[120px] lg:left-1/4 lg:translate-x-0"
      />
      <SectionHeading
        section="contact"
        title={contact.heading || undefined}
        description={contact.text || undefined}
        gradient
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <Reveal>
          <ContactChannels />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
