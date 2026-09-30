import { ArrowUpRight, Award } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certificates, type Certificate } from "@/data/portfolio";
import { certificateLabels } from "@/data/site";
import { IssuerLogo, hasIssuerLogo } from "@/components/ui/TechIcon";
import { Extras } from "./certificates/Extras";

const issuers = [...new Set(certificates.map((c) => c.issuer).filter(Boolean))];

function IssuerIcon({ issuer, className }: { issuer: string; className?: string }) {
  return hasIssuerLogo(issuer) ? (
    <IssuerLogo issuer={issuer} className={className} />
  ) : (
    <Award aria-hidden className={className} />
  );
}

/** Leading tile: total count + issuer logos. Also rounds the grid out to full rows of 4. */
function SummaryTile() {
  return (
    <div className="gradient-border h-full rounded-card p-px">
      <div className="flex h-full flex-col justify-between gap-6 rounded-[calc(var(--radius-card)-1px)] bg-background p-6">
        <div>
          <span className="text-gradient font-display text-6xl leading-none font-semibold tracking-tight">
            {String(certificates.length).padStart(2, "0")}
          </span>
          <p className="label-mono mt-3 text-muted">{certificateLabels.total}</p>
        </div>
        {issuers.length > 0 && (
          <ul className="flex flex-wrap items-center gap-2">
            {issuers.map((issuer) => (
              <li
                key={issuer}
                className="inline-flex items-center gap-1.5 rounded-pill border border-border px-2.5 py-1 text-xs text-muted"
              >
                <IssuerIcon issuer={issuer} className="h-3.5 w-3.5 text-foreground/80" />
                {issuer}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CertificateCard({ cert }: { cert: Certificate }) {
  // Phones: icon beside the text (compact rows). sm+: vertical card.
  return (
    <article className="group/cert glass relative flex h-full gap-4 overflow-hidden rounded-card p-5 transition-colors duration-300 hover:border-border-strong sm:flex-col sm:gap-0 sm:p-6">
      {/* Shine sweep: slides across on hover-in, snaps back instantly on hover-out */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent transition-none group-hover/cert:translate-x-[400%] group-hover/cert:transition-transform group-hover/cert:duration-1000 group-hover/cert:ease-out"
      />
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-border bg-white/[0.03]">
        <IssuerIcon issuer={cert.issuer} className="h-5 w-5 text-foreground/85" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col sm:mt-5">
        {cert.issuer && <p className="label-mono mb-1.5 text-[0.65rem] text-subtle">{cert.issuer}</p>}
        <h3 className="leading-snug font-medium text-foreground">{cert.name}</h3>
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${certificateLabels.viewCredential}: ${cert.name}`}
            className="group/link mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition-colors hover:text-foreground sm:mt-auto sm:pt-5"
          >
            {certificateLabels.viewCredential}
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
        )}
      </div>
    </article>
  );
}

export function Certificates() {
  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="mx-auto max-w-content px-gutter py-section cv-auto"
    >
      <SectionHeading section="certificates" />

      <Reveal as="ul" stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryTile />
        {certificates.map((cert) => (
          <CertificateCard key={cert.name} cert={cert} />
        ))}
      </Reveal>

      <Extras className="mt-16" />
    </section>
  );
}
