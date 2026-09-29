"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type SectionLinkProps = Omit<ComponentProps<"a">, "href"> & {
  /** Section id on the home page ("top" = page top). */
  section: string;
};

/**
 * Link to a home-page section that works from any route:
 * on "/" it is a plain hash anchor (smooth-scrolled by SmoothScrollProvider),
 * elsewhere a Next link to "/#section" (client-side navigation).
 */
export function SectionLink({ section, ...props }: SectionLinkProps) {
  const onHome = usePathname() === "/";
  if (onHome) return <a href={`#${section}`} {...props} />;
  return <Link href={section === "top" ? "/" : `/#${section}`} {...props} />;
}
