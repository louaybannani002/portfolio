import { identity } from "@/data/portfolio";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label={`${identity.name} — back to top`}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-control"
    >
      <span
        aria-hidden
        className="bg-accent-gradient absolute inset-0 rounded-control opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span aria-hidden className="absolute inset-px rounded-[calc(var(--radius-control)-1px)] bg-background" />
      <span className="text-gradient relative font-display text-sm font-bold tracking-tight">
        {identity.initials}
      </span>
    </a>
  );
}
