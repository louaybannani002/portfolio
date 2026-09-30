import type { ReactElement, ReactNode } from "react";
import { ALL_ICONS, getIssuerIcon, getTechIcon, iconId } from "@/lib/techIcons";

/**
 * Hidden sprite with one <symbol> per brand icon. Brand logos have long paths and appear many
 * times (marquee ×2, cards, React payload); referencing them with <use> cut the home HTML by
 * ~60%. Render once per page that uses <TechIcon>/<IssuerIcon>.
 */
export function IconSprite() {
  return (
    <svg aria-hidden width="0" height="0" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      {ALL_ICONS.map(([id, Icon]) => {
        // react-icons components return <IconBase attr={svg attributes}>{paths}</IconBase>
        const el = Icon({}) as ReactElement<{ attr: Record<string, string>; children?: ReactNode }>;
        const { viewBox, ...attr } = el.props.attr;
        return (
          <symbol key={id} id={id} viewBox={viewBox} stroke="currentColor" fill="currentColor" strokeWidth="0" {...attr}>
            {el.props.children}
          </symbol>
        );
      })}
    </svg>
  );
}

function SpriteIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg aria-hidden className={className}>
      <use href={`#${id}`} />
    </svg>
  );
}

/** Brand icon for a technology name, or null when none is mapped (callers show a text pill). */
export function TechIcon({ name, className }: { name: string; className?: string }) {
  return getTechIcon(name) ? <SpriteIcon id={iconId(name)} className={className} /> : null;
}

export const hasTechIcon = (name: string) => !!getTechIcon(name);

export const hasIssuerLogo = (issuer: string) => !!getIssuerIcon(issuer);

/** Issuer logo, or null for unknown/empty issuers (callers show a generic icon). */
export function IssuerLogo({ issuer, className }: { issuer: string; className?: string }) {
  return getIssuerIcon(issuer) ? <SpriteIcon id={iconId(issuer)} className={className} /> : null;
}
