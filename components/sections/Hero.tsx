"use client";

import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { CSSProperties, ReactNode } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CV_PATH, availability, heroRoles, identity, tagline } from "@/data/portfolio";
import { downloadCvLabel, heroLabels, socialLabels } from "@/data/site";
import { AnimatedName } from "./hero/AnimatedName";
import { HeroBackground } from "./hero/HeroBackground";
import { RotatingRole } from "./hero/RotatingRole";
import { ScrollIndicator } from "./hero/ScrollIndicator";

const socials = [
  { label: socialLabels.github, href: identity.github.url, icon: FaGithub, external: true },
  { label: socialLabels.linkedin, href: identity.linkedin.url, icon: FaLinkedinIn, external: true },
  { label: socialLabels.email, href: `mailto:${identity.email}`, icon: Mail, external: false },
];

/**
 * Fades a hero element in. Pure CSS (`.hero-enter` in globals.css), so it starts at first paint
 * instead of waiting for JS hydration — this keeps LCP fast. The intro loader and
 * reduced motion are handled in CSS too.
 */
function Enter({ delay, children, className = "" }: { delay: number; children: ReactNode; className?: string }) {
  return (
    <div className={`hero-enter ${className}`} style={{ "--d": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-label={identity.name}
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-gutter pt-nav pb-28"
    >
      <HeroBackground />

      <div className="flex max-w-4xl flex-col items-center text-center">
        {availability.available && (
          <Enter delay={0}>
            <span className="glass inline-flex items-center gap-2.5 rounded-pill px-4 py-1.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {availability.label}
            </span>
          </Enter>
        )}

        <AnimatedName
          name={identity.name}
          delay={0.1}
          className="mt-8 font-display text-[clamp(3rem,11vw,8rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-foreground"
        />

        <Enter delay={0.3} className="mt-6">
          <RotatingRole roles={heroRoles} className="font-mono text-sm tracking-wide sm:text-lg" />
        </Enter>

        {tagline && (
          <Enter delay={0.35} className="mt-6">
            <p className="max-w-2xl text-base text-pretty text-muted sm:text-lg">{tagline}</p>
          </Enter>
        )}

        <Enter delay={0.4} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <MagneticButton href="#projects" variant="primary">
            {heroLabels.viewWork}
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton href={CV_PATH} download="Louay_Bannani_CV.pdf" variant="secondary">
            <Download aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            {downloadCvLabel}
          </MagneticButton>
        </Enter>

        <Enter delay={0.5} className="mt-10">
          <ul className="flex items-center gap-3">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="glass flex h-11 w-11 items-center justify-center rounded-pill text-muted transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground"
                >
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </Enter>
      </div>

      <Enter
        delay={0.8}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 [@media(max-height:640px)]:hidden"
      >
        <ScrollIndicator href="#about" label={heroLabels.scroll} />
      </Enter>
    </section>
  );
}
