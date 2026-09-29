import { FallbackImage } from "./FallbackImage";
import { PROFILE_PHOTO, PROFILE_PHOTO_POSITION, identity } from "@/data/portfolio";

interface ProfileImageProps {
  className?: string;
  /** Initials size in the fallback. */
  initialsClassName?: string;
}

/** "LB" initials shown when the profile photo is missing. */
function InitialsFallback({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label={identity.name}
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/40 via-surface to-accent-2/40"
    >
      <span className={`font-display font-semibold tracking-tight text-foreground ${className}`}>
        {identity.initials}
      </span>
    </div>
  );
}

/** Profile photo filling its container (object-cover, face centered); falls back to initials. */
export function ProfileImage({ className = "", initialsClassName = "text-6xl" }: ProfileImageProps) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <FallbackImage
        src={PROFILE_PHOTO}
        alt={identity.name}
        className="h-full w-full object-cover"
        style={{ objectPosition: PROFILE_PHOTO_POSITION }}
        fallback={<InitialsFallback className={initialsClassName} />}
      />
    </div>
  );
}

/** Round avatar variant. */
export function ProfileAvatar({ className = "" }: { className?: string }) {
  return (
    <ProfileImage
      className={`aspect-square rounded-full border border-white/10 ${className}`}
      initialsClassName="text-3xl"
    />
  );
}
