import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { footerText, identity } from "@/data/portfolio";
import { footerLabels, navLinks, socialLabels } from "@/data/site";
import { BackToTop } from "./BackToTop";
import { SectionLink } from "./SectionLink";

const socials = [
  { label: socialLabels.github, href: identity.github.url, icon: FaGithub, external: true },
  { label: socialLabels.linkedin, href: identity.linkedin.url, icon: FaLinkedinIn, external: true },
  { label: socialLabels.email, href: `mailto:${identity.email}`, icon: Mail, external: false },
];

// Static export: the year is fixed at build time
const YEAR = new Date().getFullYear();

/** Site footer (all routes). Tagline falls back to the CV title while footerText is empty. */
export function Footer() {
  return (
    <footer className="cv-auto relative border-t border-border">
      <div
        aria-hidden
        className="bg-accent-gradient absolute inset-x-0 top-0 mx-auto h-px max-w-3xl opacity-40"
      />
      <div className="mx-auto grid max-w-content gap-10 px-gutter py-14 md:grid-cols-[1fr_auto] md:items-start">
        <div className="max-w-sm">
          <p className="font-display font-semibold text-foreground">{identity.name}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{footerText || identity.title}</p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="glass flex h-10 w-10 items-center justify-center rounded-pill text-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  <Icon aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={footerLabels.navAriaLabel}>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <SectionLink
                  section={link.id}
                  className="group inline-flex items-baseline gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <span className="font-mono text-[0.65rem] text-subtle transition-colors group-hover:text-accent-2">
                    {link.index}
                  </span>
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto flex max-w-content flex-col-reverse items-start justify-between gap-4 border-t border-border px-gutter py-6 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-subtle">
          © {YEAR} {identity.name}
        </p>
        <BackToTop label={footerLabels.backToTop} />
      </div>
    </footer>
  );
}
