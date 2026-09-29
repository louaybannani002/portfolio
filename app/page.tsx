import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { identity } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <ProfileAvatar className="w-32" />
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{identity.name}</h1>
      <p className="text-lg text-muted">{identity.title}</p>
    </main>
  );
}
