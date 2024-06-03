import { threads } from "@/lib/data";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-2">
      {Object.values(threads).map((thread) => (
        <Link
          key={thread.id}
          href={`/${thread.id}`}
          className="flex items-center rounded-lg px-2 py-1 gap-1 text-sm text-muted-foreground transition-all hover:text-primary"
        >
          # {thread.title}
        </Link>
      ))}
    </main>
  );
}
