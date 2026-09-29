import { FallbackImage } from "./FallbackImage";
import { PROFILE_PHOTO, identity } from "@/data/portfolio";

interface ProfileAvatarProps {
  className?: string;
}

/** Profile photo; falls back to "LB" initials if the file is missing. */
export function ProfileAvatar({ className = "" }: ProfileAvatarProps) {
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-full border border-white/10 bg-surface ${className}`}
    >
      <FallbackImage
        src={PROFILE_PHOTO}
        alt={identity.name}
        className="h-full w-full object-cover"
        fallback={
          <div
            role="img"
            aria-label={identity.name}
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/40 via-surface to-accent-2/40 font-mono text-[clamp(1rem,30cqw,4rem)] font-semibold tracking-wider text-foreground [container-type:inline-size]"
          >
            {identity.initials}
          </div>
        }
      />
    </div>
  );
}
