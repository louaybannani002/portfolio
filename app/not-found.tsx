import { ArrowLeft, FolderGit2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFoundLabels as L } from "@/data/site";

export const metadata: Metadata = {
  title: L.title,
  robots: { index: false, follow: true },
};

/** Exported as out/404.html (served by Netlify for unknown paths). */
export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-gutter pt-nav pb-20 text-center"
    >
      <div
        aria-hidden
        className="bg-accent-gradient absolute top-1/4 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full opacity-[0.12] blur-[120px]"
      />
      {/* Faint dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      <p className="label-mono text-muted">
        <span className="text-gradient">{L.code}</span> — {L.title}
      </p>
      <p
        aria-hidden
        className="text-gradient-animated mt-4 font-display text-[clamp(7rem,28vw,14rem)] leading-none font-bold tracking-[-0.06em] select-none"
      >
        {L.code}
      </p>
      <h1 id="not-found-title" className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {L.title}
      </h1>
      <p className="mt-4 max-w-md text-muted">{L.text}</p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="bg-accent-gradient inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgb(139_92_246/0.6)]"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          {L.home}
        </Link>
        <Link
          href="/#projects"
          className="glass inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
        >
          <FolderGit2 aria-hidden className="h-4 w-4" />
          {L.projects}
        </Link>
      </div>
    </section>
  );
}
